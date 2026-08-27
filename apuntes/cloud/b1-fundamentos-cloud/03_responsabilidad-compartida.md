---
tema: B1 — Fundamentos de Cloud
workspace: cloud
seccion: 3
titulo: "Modelo de responsabilidad compartida"
estado: finalizada
prev: 02_modelos-servicio
next: 04_regiones-y-az
---

# ☁️ Modelo de responsabilidad compartida

> **El proveedor asegura la nube; tú aseguras lo que pones dentro de ella.**
>
> No es un eslogan de marketing: es un reparto con consecuencias. Cada fallo tiene dueño, y la mayoría de los incidentes reales caen del lado del cliente.

## El dolor: el bucket que quedó público

> **Un bucket es el contenedor donde guardas archivos en un servicio de object storage** — en AWS, S3.
>
> Es "la carpeta en la nube" donde subes imágenes, PDFs o backups, con dos diferencias que aquí importan: **cada archivo tiene su propia dirección web**, y **quién puede leerlo es una casilla que marcas tú**. No hay que entrar a ningún servidor para leer un archivo: basta con conocer su URL. El tema completo es de **B6**; por ahora alcanza con eso.

Subes los adjuntos de tus usuarios a un bucket. Para que el frontend pueda mostrar las imágenes sin complicarte con permisos, marcas el acceso como público — funciona, sigues con tu vida. Cuatro meses después, alguien encuentra esa URL y con ella todos los archivos que hay dentro.

Ahora la pregunta incómoda: **¿quién falló?**

Nadie *hackeó* nada. El proveedor no tuvo una brecha. El servicio hizo exactamente lo que le pediste: servir esos archivos a cualquiera que los solicite. La configuración era la que tú elegiste, y era una configuración válida — hay casos donde un bucket público es justo lo correcto. El proveedor no tiene forma de saber que el tuyo no era uno de ellos.

El mismo patrón aparece en otra forma, más silenciosa: levantas una máquina virtual, instalas tu app y la dejas corriendo. Ocho meses después sigue con el sistema operativo sin actualizar. El proveedor parchea su **hipervisor** —el software que reparte un servidor físico entre muchas máquinas virtuales aisladas— sus discos y su red religiosamente — **pero dentro de tu máquina no entra**.

> ⚠️ **Importante:** la factura sorpresa al menos te llega por correo. Un permiso mal puesto no avisa nunca. Puede estar mal durante meses y todo se ve perfectamente bien desde tu lado.

Ese dolor —*no saber dónde termina lo que el proveedor cuida*— es exactamente el que este modelo viene a resolver.

## Seguridad DE la nube vs seguridad EN la nube

> **El modelo de responsabilidad compartida es el reparto formal de quién responde por cada capa: el proveedor responde por la seguridad *de* la nube, y tú por la seguridad *en* la nube.**
>
> La preposición no es un juego de palabras. Marca la frontera exacta entre su trabajo y el tuyo.

```text
┌──────────────────────────────────┐
│  SEGURIDAD  EN  LA NUBE          │  ← TÚ
│  Tus datos · quién accede        │
│  Configuración de tus recursos   │
│  Tu código · tu sistema operativo│
├──────────────────────────────────┤
│  SEGURIDAD  DE  LA NUBE          │  ← EL PROVEEDOR
│  Hipervisor · hardware · discos  │
│  Red física · energía · edificio │
└──────────────────────────────────┘
```

Es decir: el proveedor garantiza que la infraestructura sea confiable, que nadie entre físicamente al datacenter, que tu máquina virtual esté aislada de la del vecino y que el servicio gestionado que usas funcione por dentro. Tú garantizas que lo que pusiste encima esté bien cerrado.

Imagina la caja de seguridad de un banco. El banco pone la bóveda blindada, las cámaras, los guardias y el control de acceso al edificio — nadie duda de que eso es su trabajo. Pero dentro de tu caja hay lo que tú metiste, la llave la tienes tú, y si le das una copia a la persona equivocada o la dejas puesta en la cerradura, el banco no tiene ni la culpa ni forma de enterarse. **Donde la analogía deja de funcionar** —y es justo donde está el peligro real— es que en un banco tú no puedes desactivar la bóveda. En la nube, con dos clics puedes dejar tu propia caja abierta de par en par, y el sistema te dejará hacerlo porque asume que sabes lo que haces.

## La línea se mueve según el modelo de servicio

Aquí es donde la Sección 2 y esta se juntan: **son la misma tabla vista dos veces**. Donde antes preguntábamos *"¿quién administra esta capa?"*, ahora preguntamos *"¿quién responde si esta capa falla?"*. La respuesta es la misma persona.

| Responsabilidad | IaaS | PaaS | SaaS |
|-----------------|:----:|:----:|:----:|
| Seguridad física del datacenter | 🔴 | 🔴 | 🔴 |
| Hipervisor y aislamiento entre clientes | 🔴 | 🔴 | 🔴 |
| Parches del sistema operativo | 🔵 | 🔴 | 🔴 |
| Parches del runtime y dependencias | 🔵 | 🟡 | 🔴 |
| Configuración de red y firewall | 🔵 | 🟡 | 🔴 |
| Configuración del servicio (¿público o privado?) | 🔵 | 🔵 | 🔵 |
| Quién accede y con qué credenciales | 🔵 | 🔵 | 🔵 |
| Tus datos y su clasificación | 🔵 | 🔵 | 🔵 |

🔵 = tuyo · 🔴 = del proveedor · 🟡 = compartido

> 🎯 **Idea clave:** cuanto más alto es el modelo, menos superficie te queda — pero **nunca llega a cero**. Las tres últimas filas son tuyas en los tres modelos, sin excepción. Subir de abstracción reduce tu trabajo de operación; no te devuelve la responsabilidad sobre tus datos ni sobre quién entra.

## Lo que es tuyo siempre — datos, identidades, configuración

Estas cuatro cosas no cambian de dueño por más que subas de modelo. Vale la pena memorizarlas, porque son el checklist mental cuando algo huele mal:

| Qué | Por qué nunca es del proveedor | Dónde se trabaja |
|-----|-------------------------------|------------------|
| **Tus datos** | Solo tú sabes qué guardaste, qué es sensible y a qué terceros se lo mandas | B6 |
| **Las identidades y credenciales** | El proveedor te da la cerradura; a quién le das llave es decisión tuya | **B3** |
| **La configuración de tus recursos** | Público o privado, qué puerto abierto, qué permiso amplio: todas son órdenes tuyas | B7 |
| **Lo que gastas** | Nadie va a apagar un recurso olvidado por ti | **B2** |

La razón de fondo es una sola y conviene decirla explícita: **el proveedor no conoce la intención de tu sistema**. No puede saber si ese bucket público es una galería de imágenes que debe verse o los adjuntos privados de tus clientes. Ambos se ven idénticos desde su lado. La intención vive solo en tu cabeza, así que la responsabilidad se queda con ella.

> 💡 **Tip:** cuando algo falle en producción, la primera pregunta útil no es *"¿qué se rompió?"* sino **"¿en qué capa está, y esa capa de quién es?"**. Si es tuya, deja de buscar el status page del proveedor: la respuesta está en tu configuración.

## Lo que la nube NO hace por ti

Estas cuatro creencias son las que más caro se pagan, y las cuatro suenan razonables hasta que las miras de cerca.

❌ **Mito:** "Está en la nube, entonces está respaldado."
✅ **Realidad:** Está *replicado*, que no es lo mismo. La replicación entre zonas te protege de que se incendie un datacenter; no te protege de que tú borres una tabla. Un `DELETE` se replica igual de rápido que un `INSERT`. Los backups existen, pero en la mayoría de los servicios **los activas y los configuras tú**.

❌ **Mito:** "Si alguien entra a mi cuenta, el proveedor responde."
✅ **Realidad:** Si el acceso ocurrió con credenciales válidas, para el proveedor **eras tú**. Una API key filtrada no es una brecha suya: es un uso legítimo desde su punto de vista. Y lo que el atacante consuma se factura a tu cuenta.

❌ **Mito:** "Todo viene cifrado por defecto, así que estoy cubierto."
✅ **Realidad:** El cifrado en reposo protege contra el robo del disco físico — un escenario que casi nunca es tu riesgo real. **No protege de un permiso mal puesto**: quien tiene permiso ve el dato ya descifrado, porque para eso está el permiso. ⚠️ *verificar: qué servicios cifran por defecto y cuáles hay que activar varía por servicio y ha cambiado con los años.*

❌ **Mito:** "Cumplo con la normativa porque mi proveedor cumple."
✅ **Realidad:** Heredas las certificaciones de **la infraestructura**, no del uso que le des. En qué región pusiste los datos, quién puede verlos y cuánto tiempo los conservas siguen siendo decisiones tuyas — y son justo las que audita un regulador. La primera de esas decisiones, la región, es la Sección 4.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- El proveedor responde por la seguridad *de* la nube (hardware, red física, hipervisor) y tú por la seguridad *en* la nube (datos, accesos, configuración).
- La línea se mueve con el modelo de servicio, pero nunca llega a cero: datos, identidades y configuración son tuyos en IaaS, en PaaS y en SaaS por igual.
- El proveedor no conoce la intención de tu sistema, y por eso no puede protegerte de una configuración que tú pediste explícitamente.
- Replicado no es respaldado: la nube te cubre del incendio en el datacenter, no de tu propio borrado.
- Un acceso con credenciales válidas no es una brecha del proveedor — eres tú a sus ojos, y el consumo se te factura.
- Heredas las certificaciones de la infraestructura, nunca el cumplimiento de lo que haces con ella.

---
[[02_modelos-servicio|← anterior]] · [[00_indice|índice]] · [[04_regiones-y-az|siguiente →]]
