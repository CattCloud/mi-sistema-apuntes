---
tema: B1 — Fundamentos de Cloud
workspace: cloud
seccion: 1
titulo: "¿Qué es la nube y qué alquilas?"
estado: finalizada
prev: null
next: 02_modelos-servicio
---

# ☁️ ¿Qué es la nube y qué alquilas?

> **Usar la nube es alquilar cómputo, almacenamiento y red por internet, y pagar solo por el tiempo que los tienes encendidos.**
>
> Pero lo que de verdad cambia tu día a día no es el alquiler en sí, sino todo lo que **dejas de administrar** cuando alquilas.

## El dolor

Imagina que lanzas tu gestor de correos con IA. Un martes cualquiera te sobra con **un servidor**. El día que te publican en Product Hunt, con ese mismo servidor te caes: necesitarías **veinte**. Antes de la nube tenías que decidir eso por adelantado, con dinero por adelantado, y quedarte con la decisión durante años.

Ese mundo —comprar el hardware y administrarlo tú— tiene nombre propio, y lo vas a ver en cada tabla comparativa del resto del temario:

> **On-premise es tener la infraestructura en propiedad: tú compras los servidores, tú los operas y tú los reemplazas.**
>
> Lo que lo define no es *dónde* están las máquinas, sino **de quién son y quién las administra**. Un rack alquilado en un datacenter ajeno, con hardware tuyo que tú mantienes, sigue siendo on-premise. Lo contrario de la nube no es "estar en tu oficina": es ser dueño del fierro.

Y siendo dueño del fierro, las dos opciones que tenías eran malas, cada una a su manera:

| Opción | Qué compras | Qué te pasa |
|--------|-------------|-------------|
| Dimensionar para el pico | 20 servidores | 19 están apagados o al 5% durante 360 días. Pagaste por aire |
| Dimensionar para el promedio | 1 servidor | El único día que importaba, tu app no responde |

Y encima de esa apuesta había una segunda fricción, más aburrida pero igual de cara: **el tiempo**. Pedir un servidor no era un clic. Era un ticket, una aprobación, una compra, un envío, un técnico instalando. Semanas. Para cuando el servidor estaba listo, el pico ya había pasado.

> ⚠️ **Importante:** hay una tercera fricción que casi nadie cuenta al principio. Al comprar el hardware te vuelves **administrador de sistemas sin haberlo pedido**: parches del sistema operativo, discos que fallan, backups, electricidad, refrigeración. Nada de eso es tu producto, pero todo eso es tu trabajo.

La nube no aparece para hacer los servidores más baratos. Aparece para que **dejes de tener que adivinar** cuántos vas a necesitar.

## ¿Qué es cloud computing?

> **Cloud computing es la entrega bajo demanda de recursos de cómputo por internet, operados por un proveedor, y facturados por uso.**
>
> En términos simples: alquilas infraestructura en vez de comprarla, la enciendes en minutos y la apagas cuando no la necesitas.

Debes recordar que *"bajo demanda"* es la parte que hace todo el trabajo. No significa "está disponible": significa que **tú lo aprovisionas solo, cuando quieras, sin que ningún humano del proveedor apruebe nada**. Ese cambio es el que convierte un mes de espera en dos minutos.

> 🔑 **Matiz:** la nube sí son servidores físicos, en edificios reales, con cables y aire acondicionado. Simplemente **no son tuyos** y no los ves. "La nube" no es una metáfora de que no hay hardware — es una metáfora de que el hardware dejó de ser tu problema.

## Qué alquilas exactamente

Cuando dices *"alquilé un servidor"*, en realidad estás alquilando **varias cosas que se facturan por separado**. Esa separación es la que después explica una factura que no entiendes.

| Recurso | Qué es | Cómo te lo cobran | Ejemplo en AWS |
|---------|--------|-------------------|----------------|
| **Cómputo** | CPU y memoria ejecutando tu código | Por tiempo encendido (hora o segundo), o por invocación | EC2, Lambda |
| **Almacenamiento** | El disco donde viven tus datos y archivos | Por GB al mes, lo uses o no | EBS (disco), S3 (archivos) |
| **Red** | El tráfico que entra y sale | Por GB **de salida** | Data transfer out |
| **Servicios gestionados** | Piezas ya operadas: base de datos, cola, correo | Mixto: tiempo encendido + volumen | RDS, SQS |

> 💸 **El detalle que sorprende a todos:** meter datos a la nube suele ser gratis; **sacarlos se paga**. Es el costo que nadie ve venir porque no aparece en el precio del servidor. El desglose completo es tema de **B2**, pero conviene que ya te suene raro cuando alguien diga *"un servidor cuesta 7 dólares al mes"*.

> 🎯 **Idea clave:** no alquilas "una computadora". Alquilas cuatro cosas distintas con cuatro relojes distintos corriendo. Apagar el cómputo no apaga el almacenamiento.

## Las 5 características que hacen que algo sea nube

No todo lo que está en internet es nube. Un servidor alquilado por año, con precio fijo, que tarda un día en entregarse, es **hosting** — y está perfectamente bien, pero no es nube. Estas cinco características son las que marcan la diferencia:

| Característica | Qué significa | Cómo lo notas tú |
|----------------|---------------|------------------|
| **On-demand self-service** | Creas y destruyes recursos solo, sin pedir permiso a nadie | Levantas una base de datos a las 2 a.m. sin hablar con un humano |
| **Broad network access** | Se accede por red estándar (HTTP, SSH, APIs), desde cualquier lado | Lo manejas igual desde tu laptop que desde un pipeline de CI/CD |
| **Resource pooling** | El hardware del proveedor se comparte entre miles de clientes, aislados entre sí | No sabes en qué máquina física estás, y no te importa |
| **Rapid elasticity** | La capacidad sube **y baja** según la demanda | Tu app aguanta el lanzamiento y el lunes vuelve a costar poco |
| **Measured service** | Todo se mide y se cobra por consumo real | Enciendes cinco minutos, pagas cinco minutos |

> 🔑 **Matiz — escalabilidad no es elasticidad:** escalar es poder crecer. Ser elástico es crecer **y volver a encogerse solo**. La primera te salva el lanzamiento; la segunda es la que evita que la factura se quede grande para siempre. Casi todo el ahorro de la nube vive en el *"y volver a encogerse"*.

Imagina la electricidad de tu casa. No pagas una cuota fija por *tener derecho* a electricidad: pagas los kWh que consumes, la compañía los mide sola, y si te vas de viaje y apagas todo, tu recibo se va casi a cero. La nube funciona igual — con una diferencia incómoda que conviene tener presente desde ahora: **un servidor encendido que no usas sigue consumiendo**. La luz apagada no cuesta; una instancia olvidada sí.

## Servicio gestionado — qué dejas de administrar

> **Un servicio gestionado es aquel donde el proveedor opera la pieza completa y tú solo la consumes por un endpoint o una API.**
>
> Sigue siendo una base de datos, una cola o un servidor de correo. Lo que cambia es que **nadie de tu lado la instala, la parchea ni la levanta cuando se cae**.

La forma más rápida de entenderlo es comparar la misma pieza en sus dos versiones. Aquí está Postgres: primero instalado por ti en una máquina virtual, después como servicio gestionado.

| Tarea | Postgres que tú instalas | Postgres gestionado |
|-------|--------------------------|---------------------|
| Instalar el motor y sus dependencias | 🔵 Tuyo | 🔴 Del proveedor |
| Parches de seguridad del motor y del SO | 🔵 Tuyo | 🔴 Del proveedor |
| Backups automáticos y restauración | 🔵 Tuyo | 🔴 Del proveedor |
| Levantarlo cuando el disco falla a las 3 a.m. | 🔵 Tuyo | 🔴 Del proveedor |
| Diseñar el esquema y las tablas | 🔵 Tuyo | 🔵 Tuyo |
| Escribir las queries y poner los índices | 🔵 Tuyo | 🔵 Tuyo |
| Que la contraseña no acabe en el repo | 🔵 Tuyo | 🔵 Tuyo |
| Que el gasto no se dispare | 🔵 Tuyo | 🔵 Tuyo |

🔵 = tu responsabilidad · 🔴 = del proveedor

Fíjate en dónde cae la línea. **Se va todo lo operativo y se queda todo lo que tiene que ver con tu producto.** Un servicio gestionado te quita trabajo de administrador; no te quita ni una sola decisión de diseño.

Piénsalo como una lavandería. Con lavadora propia eres dueño de la máquina: la compras, la reparas, la reemplazas cuando muere. En la lavandería pagas por carga y la máquina es problema de otro — pero **la ropa sigue siendo tuya**, y si la metes mal se arruina exactamente igual. El motor de base de datos es la lavadora; tus datos y tus queries son la ropa. Donde la analogía deja de funcionar: con lavadora propia eliges cualquier modelo del mercado; en la lavandería usas las máquinas que hay — es decir, un servicio gestionado te limita a las versiones y extensiones que el proveedor soporte.

> ⚠️ **Cuidado:** "gestionado" no significa "ya está bien configurado". La configuración por defecto casi nunca es la que tú necesitas, y el reloj de la factura corre igual aunque nadie lo esté usando. Lo gestionado te ahorra operación, no criterio.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- La nube existe para que no tengas que adivinar por adelantado cuánta capacidad vas a necesitar ni comprometer dinero en esa apuesta.
- Cuando alquilas no alquilas "un servidor": alquilas cómputo, almacenamiento y red por separado, y cada uno se factura con su propio reloj.
- Elasticidad es crecer **y volver a encogerse solo**; ahí vive casi todo el ahorro, no en que la nube sea barata por defecto.
- Un servicio gestionado te quita la operación (instalar, parchear, respaldar, levantar) y te deja intactas todas las decisiones de diseño y todos los datos.
- Gestionado no es sinónimo de bien configurado ni de gratis: lo que dejas encendido lo sigues pagando.

---
[[00_indice|índice]] · [[02_modelos-servicio|siguiente →]]
