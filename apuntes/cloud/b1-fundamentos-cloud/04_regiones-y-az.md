---
tema: B1 — Fundamentos de Cloud
workspace: cloud
seccion: 4
titulo: "Regiones y zonas de disponibilidad"
estado: finalizada
prev: 03_responsabilidad-compartida
next: 99_cierre
---

# ☁️ Regiones y zonas de disponibilidad

> **Una región es un grupo de datacenters en un punto del mundo, y casi todo lo que crees en la nube vive dentro de una sola.**
>
> Elegir región no es un detalle de configuración. Fija tu latencia, tu factura, qué servicios tienes disponibles y bajo qué leyes viven tus datos.

## Región, zona de disponibilidad, data center

Son tres cosas distintas, una dentro de la otra, y se confunden constantemente porque los tres suenan a "sitio donde están las máquinas".

> **Región:** una ubicación geográfica donde el proveedor agrupa varios datacenters. Es la unidad que tú eliges. Se nombran por zona y número: `us-east-1` (Norte de Virginia), `eu-west-3` (París), `sa-east-1` (São Paulo).
>
> **Zona de disponibilidad (AZ):** uno o más datacenters dentro de esa región, con energía, refrigeración y red **independientes**. Se nombran con la región más una letra: `us-east-1a`, `us-east-1b`.
>
> **Data center:** el edificio. Tú nunca interactúas con este nivel; es la unidad interna del proveedor.

```text
REGIÓN  (us-east-1)
│
├── AZ  us-east-1a ──┐
│   └── data center  │
├── AZ  us-east-1b   │  separadas físicamente (km de distancia)
│   └── data center  │  unidas por red propia de latencia muy baja
└── AZ  us-east-1c ──┘
    └── data center
```

La pregunta importante es **por qué existe la capa del medio**. Si una región fuera un solo edificio, un incendio, una inundación o un corte de energía se llevaría por delante todo lo que tienes ahí. Al partirla en zonas independientes y separadas por kilómetros, un desastre físico tumba **una** zona, no la región. Y como están unidas por red propia de latencia muy baja, puedes tener tu app corriendo en dos zonas a la vez sin que se note la distancia.

De ahí sale el consejo que vas a escuchar en todos lados: *"despliega en al menos dos zonas"*. En nivel 2 no vas a diseñar eso a mano —los servicios gestionados suelen hacerlo por ti si se lo pides—, pero ahora ya sabes de qué te protege y de qué no: **te protege del incendio, no de tu propio error de configuración**.

> ⚠️ *verificar:* una región suele tener **tres** zonas de disponibilidad; el mínimo habitual son 3 y el máximo ronda las 6, aunque algunas regiones antiguas tienen solo 2. El número exacto por región conviene mirarlo en la documentación, no memorizarlo.

> 🔑 **Matiz — la letra no es la máquina:** `us-east-1a` no apunta al mismo datacenter físico para tu cuenta que para la mía. El proveedor mapea las letras por cuenta, para repartir la carga y que todo el mundo no elija "la a". ⚠️ *verificar:* existe un identificador estable por debajo para cuando dos cuentas necesitan coordinarse de verdad.

## Servicios regionales vs globales — la trampa

La mayoría de los servicios son **regionales**: lo que creas en una región no existe en las demás. Y esto produce el susto clásico del primer mes.

❌ **Mito:** "Cambié de región y desapareció mi instancia."
✅ **Realidad:** Sigue donde la dejaste, encendida y facturando. Lo que cambió es **desde dónde estás mirando**. La consola solo te muestra los recursos de la región seleccionada; no hay una vista "todas mis cosas" por defecto.

Paso a paso, para que no quede duda: creas una instancia en Virginia (`us-east-1`) y cambias el selector a Ohio (`us-east-2`). La lista aparece vacía. Esa instancia **no se eliminó ni se apagó** — sigue corriendo en Virginia, sirviendo tráfico y facturando cada hora. Vuelves a Virginia y ahí está, igual que la dejaste. Lo único que cambió fue desde dónde estabas mirando.

❌ **Mito:** "Todas las regiones están disponibles desde el primer día."
✅ **Realidad:** Las regiones más nuevas hay que **habilitarlas explícitamente** por cuenta. Hasta que lo hagas no aparecen en el selector y no puedes crear nada ahí — el propio desplegable te avisa con una línea del tipo *"hay N regiones que no están habilitadas para esta cuenta"*. Es el mismo error que el siguiente, pero un nivel más arriba: no solo puede faltarte un servicio en una región, puede faltarte la región entera.

❌ **Mito:** "Todos los servicios están en todas las regiones."
✅ **Realidad:** Los servicios nuevos llegan primero a unas pocas regiones y pueden tardar meses o años en el resto. Antes de casarte con una región, verifica que tenga lo que vas a usar.

❌ **Mito:** "El precio es el mismo en todas partes."
✅ **Realidad:** Varía por región, y a veces bastante. La misma máquina puede costar notablemente más en São Paulo que en Virginia. Los precios son públicos y por región — no hay letra chica, pero hay que mirarla.

Algunos pocos servicios son **globales**: no te piden región porque no viven en ninguna. Es el caso de IAM (identidades), Route 53 (DNS), CloudFront (CDN) y WAF (firewall de aplicación). Cuando abres uno de estos, el selector de región se bloquea y muestra `Global`.

| Tipo | Qué significa | Ejemplos |
|------|---------------|----------|
| **Regional** | Vive en una región concreta; solo se ve desde ahí | EC2, S3, RDS, Lambda, SQS |
| **Global** | No pertenece a ninguna región; se ve desde cualquiera | IAM, Route 53, CloudFront, WAF |

> 💸 **La trampa que cuesta dinero:** un recurso olvidado en una región que ya no visitas sigue facturando y es dificilísimo de encontrar, porque no aparece cuando revisas "tu" región. Es una de las fuentes clásicas de la factura que no cuadra — el desglose por servicio de **B2** es donde se cazan.

> ⚠️ *verificar:* algunos servicios "globales" tienen su plano de control anclado a una región concreta (típicamente `us-east-1`), y eso obliga a crear ciertos recursos ahí aunque el servicio sea global — el caso conocido son los certificados para CloudFront. Aparece de verdad en **B7**; anótalo y confírmalo allá.

## Cómo eliges una región — los cuatro criterios

En la práctica eliges una vez y te quedas ahí mucho tiempo, así que vale la pena elegir con estos cuatro criterios delante:

| Criterio | La pregunta | Qué pasa si te equivocas |
|----------|-------------|--------------------------|
| **Cumplimiento legal** | ¿Las leyes de tus usuarios exigen que sus datos estén en cierto territorio? | Incumples una normativa, y eso no se arregla con un redeploy |
| **Latencia** | ¿Dónde están físicamente tus usuarios? | Cada request paga el viaje. Tu app se siente lenta y no es tu código |
| **Servicios disponibles** | ¿La región tiene todo lo que vas a usar? | Te falta una pieza a mitad del proyecto y tienes que migrar o partir la arquitectura |
| **Precio** | ¿Cuánto cuesta lo mismo aquí y allá? | Pagas de más por la misma máquina, indefinidamente |

Y un quinto criterio práctico que no sale en las diapositivas: **la coherencia**. Mantén todo junto. El tráfico entre regiones se paga y suma latencia, así que repartir tu app en dos regiones "porque sí" te cuesta dinero y complejidad sin darte nada a cambio.

> 💡 **Tip para practicar:** elige **una sola región y no la muevas** durante todo el temario. Casi toda la documentación y los tutoriales asumen `us-east-1`, que además es donde los servicios nuevos aparecen primero — es la opción con menos fricción para aprender. Cuando lo que despliegues tenga usuarios reales en Perú, ahí sí la latencia manda y la conversación cambia. ⚠️ *verificar: la diferencia de precio entre `us-east-1` y `sa-east-1` para lo que vayas a usar.*

## Puntos de presencia (edge locations) — qué son y qué NO son

> **Un punto de presencia (edge location) es una ubicación pequeña, mucho más numerosa que las regiones, cuya función es guardar copias de contenido cerca del usuario final.**
>
> No es una región en miniatura: ahí no vive tu infraestructura.

La diferencia práctica es simple. Tú **no creas recursos** en un punto de presencia y no eliges uno: son la infraestructura interna que usa el CDN para que un usuario en Lima reciba tus imágenes desde un servidor cercano en vez de cruzar el continente hasta Virginia. Tu app sigue corriendo en su región, siempre.

Hay cientos repartidos por el mundo y el número crece cada año — es un dato que caduca rápido, así que no lo memorices. ⚠️ *verificar si necesitas la cifra actual: cualquier número que veas en un curso ya está viejo.*

Cuándo te va a importar de verdad: cuando pongas un CDN delante de tu app, que es **B7**. Aquí basta con que no lo confundas con una región.

## Recorrer la consola: región, servicios, cuenta activa

> ⚠️ **Cómo leer esto:** lo que sigue registra **qué buscar y por qué**, no dónde está cada botón. La consola se rediseña seguido; la intención no cambia.

**Antes de empezar:** tener la cuenta creada y la sesión iniciada. Nada más — este recorrido no crea ningún recurso y no cuesta nada.

**Dónde:** la barra superior de la consola concentra las tres cosas que necesitas ubicar sin pensar. A la derecha, la identidad de la cuenta y el selector de región. A la izquierda, el buscador de servicios.

| Qué ubicar | Qué es | Por qué importa |
|------------|--------|-----------------|
| **Selector de región** | El desplegable con las regiones disponibles | Todo lo que crees se crea *ahí*. Es el error número uno de los primeros meses |
| **Identidad de la cuenta** | Tu usuario y el identificador de la cuenta | Con varias cuentas (personal, trabajo, cliente) confundirte es cuestión de tiempo |
| **Buscador de servicios** | Busca por nombre y también por categoría | Es más rápido que navegar el menú, y te muestra documentación del servicio |
| **Panel de costo y uso** | Cuánto llevas gastado, desglosado | Míralo desde el primer día, aunque marque cero. En **B2** se vuelve el centro |

**⚠️ Trampas:**

- Crear un recurso en una región y buscarlo en otra. No se borró: no estás mirando donde está.
- Abrir un servicio global (IAM, Route 53) y ver el selector bloqueado en `Global`. No está roto — ese servicio no entiende de regiones.
- Confundir el idioma o el país de tu sesión con la región de tus recursos. No tienen nada que ver: puedes estar en Lima operando en Virginia, que es exactamente lo normal.

**✅ Sabes que salió bien si:** entras a la lista de instancias EC2, **cambias de región y la lista queda vacía**, y al volver reaparecen. Esa desaparición es la lección entera de esta sección: los recursos son regionales y la consola solo te enseña una región a la vez. Y como cierre, sin mirar la pantalla: poder decir en qué región estás y con qué cuenta.

> 📝 **Nota — si todavía no tienes nada creado:** no vas a ver ninguna lista vaciarse, y no pasa nada. Fíjate en otra señal: al cambiar de región **la página recarga completa**. No es un filtro que se aplica sobre lo que estabas viendo — la región es parte del contexto de la consola, así que literalmente estás abriendo otra ventana. La versión con recursos la comprobarás en **B4**.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- Una región es un grupo de datacenters que tú eliges; una zona de disponibilidad es una porción independiente de esa región, y existe para que un desastre físico no se lleve todo.
- Casi todo lo que creas es regional: si cambias de región tus recursos no desaparecen, simplemente dejas de verlos — y siguen facturando.
- Unos pocos servicios son globales (IAM, Route 53, CloudFront, WAF) y por eso no te piden región.
- La región se elige por cumplimiento legal, latencia, servicios disponibles y precio — y una vez elegida, conviene mantener todo junto porque cruzar regiones cuesta dinero y latencia.
- Un punto de presencia acerca contenido al usuario final, pero no es una región: tu infraestructura nunca vive ahí.

---
[[03_responsabilidad-compartida|← anterior]] · [[00_indice|índice]] · [[99_cierre|cierre →]]
