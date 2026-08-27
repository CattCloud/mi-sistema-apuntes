---
tema: B1 — Fundamentos de Cloud
workspace: cloud
seccion: 2
titulo: "Modelos de servicio: IaaS, PaaS, SaaS"
estado: finalizada
prev: 01_que-es-la-nube
next: 03_responsabilidad-compartida
---

# ☁️ Modelos de servicio: IaaS, PaaS, SaaS

> **Un modelo de servicio define hasta qué altura administra el proveedor y desde dónde administras tú.**
>
> No es una clasificación de tecnologías. Es un reparto de trabajo: cambiar de modelo no cambia lo que tu app hace — cambia quién se levanta a las 3 a.m. cuando algo se rompe.

## ¿Qué es un modelo de servicio?

> **Es el contrato que dice qué capas del stack opera el proveedor y qué capas te quedan a ti.**
>
> A mayor abstracción, menos control técnico y menos trabajo operativo. Siempre es ese trueque, en los tres modelos.

Debajo de cualquier aplicación desplegada hay una pila de capas, siempre las mismas, desde el edificio hasta tu código:

```text
        TUS DATOS
        TU APLICACIÓN
        Runtime (Node, Python) y middleware
        Sistema operativo
        Virtualización
        Servidores físicos
        Red, energía y edificio
```

Lo único que hacen IaaS, PaaS y SaaS es **cortar esa pila a distinta altura**. Por debajo del corte administra el proveedor; por encima, tú.

Imagina que necesitas dónde vivir. Puedes **comprar el terreno y construir la casa** (eso es on-premise: es tuya, y también lo es cada gotera). Puedes **alquilar un departamento vacío**: las paredes, el agua y la luz ya están, pero los muebles los traes tú y los armas tú — eso es **IaaS**. Puedes alquilar uno **amueblado y con mantenimiento incluido**: llegas con tu ropa y ya, alguien más se ocupa si falla la caldera — eso es **PaaS**. O puedes irte a un **hotel**, donde no cambias ni las sábanas — eso es **SaaS**. Donde la analogía deja de funcionar: en un hotel no puedes tirar una pared, y en SaaS tampoco puedes cambiar cómo funciona el software por dentro. Esa limitación no es un defecto del modelo, es exactamente lo que estás comprando.

> 🔑 **Matiz:** el modelo no es una propiedad del producto, es una propiedad del **contrato**. Postgres es Postgres, pero instalado por ti en una máquina virtual lo consumes como IaaS, y como base de datos gestionada lo consumes casi como PaaS. La misma tecnología cambia de modelo según quién la opere.

## IaaS — te dan la máquina, tú la administras

> **IaaS (Infrastructure as a Service) es alquilar infraestructura virtualizada: máquinas, discos y red.**
>
> Desde el sistema operativo hacia arriba, todo es tuyo: instalar, configurar, parchear, monitorear.

En términos simples: te entregan una máquina virtual encendida y una llave. Lo que pasa dentro es asunto tuyo. Si tu app de Node tiene que correr ahí, tú instalas Node, tú pones nginx delante, tú configuras el servicio para que arranque solo, tú aplicas los parches de seguridad y tú miras los logs.

| Te dan | Te toca |
|--------|---------|
| Máquina virtual (CPU, RAM) | Sistema operativo y sus parches |
| Disco virtual | Runtime, dependencias, servidor web |
| Red virtual y firewall | Tu app, tus datos, tu configuración |
| La capacidad de crear y destruir todo eso en minutos | Que siga funcionando |

**Cuándo lo eliges:** cuando necesitas control real del sistema — un binario específico, una configuración de red particular, una app vieja que no se puede tocar — o cuando quieres portabilidad, porque una máquina Linux es una máquina Linux en cualquier proveedor.

**Qué pagas por ese control:** te vuelves administrador de sistemas. Es el modelo con más poder y más trabajo, y su ejemplo canónico en AWS es **EC2**.

## PaaS — subes código, la plataforma hace el resto

> **PaaS (Platform as a Service) es alquilar un entorno de ejecución listo: tú entregas el código y la plataforma se encarga del sistema operativo, el runtime y el despliegue.**
>
> El corte sube: ahora tu responsabilidad empieza en tu aplicación y tus datos.

Esto ya lo has vivido. Un `git push` y a los dos minutos hay una URL funcionando: eso es PaaS. Vercel, Railway, Render, Heroku, y del lado de AWS, Elastic Beanstalk o App Runner. Nadie te preguntó por el sistema operativo porque el sistema operativo dejó de ser una pregunta.

**Lo que ganas:** velocidad. Vas de idea a producción sin tocar un servidor, con el pipeline de despliegue ya incluido.

**A lo que renuncias:** a instalar lo que quieras. Corres en los runtimes que la plataforma soporta, con los límites que la plataforma impone, y migrar a otro proveedor implica rehacer la parte de despliegue.

> ⚠️ **Importante:** PaaS no es "el nivel de principiante". El problema del *"hago push y rezo"* no es usar PaaS — es **no saber dónde están sus paredes**. Toda plataforma tiene un tiempo máximo por request, un tamaño máximo de respuesta y una forma concreta de escalar. El día que tu app le pide un resumen a un LLM y la respuesta tarda tres minutos, esa pared aparece de golpe. Ubicarla con números es justo lo que hace **B5**.

## SaaS — solo lo usas

> **SaaS (Software as a Service) es consumir software ya terminado, normalmente por una interfaz web o una API.**
>
> No hay nada que desplegar, nada que actualizar y nada que operar. Pagas por usarlo.

Gmail, Slack o Notion son los ejemplos obvios, pero para ti hay unos mucho más relevantes: **la API de Claude, Stripe, Auth0, Resend**. Cuando tu producto llama a un modelo por API, ese modelo es SaaS. No sabes en qué máquina corre, no eliges su versión de sistema operativo y no te enteras cuando lo actualizan.

Aquí tu responsabilidad se reduce a tres cosas — y las tres importan:

- **La credencial**: quién puede usar la cuenta y dónde vive esa API key.
- **Los datos que le mandas**: si le envías información sensible, sale de tu sistema.
- **El costo por llamada**: es el único modelo donde tu factura crece con el uso de tus usuarios sin que tú levantes ningún recurso.

Debes recordar además que **SaaS no significa "tiene interfaz web"**. Gmail y OpenRouter son ambos SaaS, aunque uno se use con el mouse y el otro con un `fetch`. Lo que decide la etiqueta es la línea de responsabilidad, no si hay pantalla.

> 🔗 **Cuando el SaaS se apoya en otro SaaS:** un broker como OpenRouter no te vende el modelo, te vende el acceso a varios modelos ajenos. Sigue siendo SaaS, pero heredas dos cosas: **dependencia en cadena** (si cae el intermediario, no te salva que el proveedor final esté perfecto) y **un salto más para tus datos** (tus prompts atraviesan a un tercero antes de llegar al modelo). A cambio compras una sola key, un solo contrato y poder cambiar de modelo sin tocar código. El trueque de siempre: más abstracción, menos control.

> 🔑 **Matiz — las fronteras son borrosas, y no pasa nada:** una base de datos gestionada como RDS tiene algo de PaaS y algo de SaaS, según a quién le preguntes. Discutir la etiqueta es perder el tiempo. Lo que decides de verdad es **dónde queda la línea de responsabilidad**, y eso lo dice la tabla siguiente, no el nombre del modelo.

## La tabla que lo ordena todo: quién administra cada capa

Esta es la tabla que conviene que puedas dibujar de memoria. Se lee **por columnas**: bajas por una columna y donde el azul se convierte en rojo, ahí termina tu trabajo.

| Capa | On-premise | IaaS | PaaS | SaaS |
|------|:----------:|:----:|:----:|:----:|
| **Datos** | 🔵 | 🔵 | 🔵 | 🟡 |
| **Aplicación** | 🔵 | 🔵 | 🔵 | 🔴 |
| **Runtime y middleware** | 🔵 | 🔵 | 🔴 | 🔴 |
| **Sistema operativo** | 🔵 | 🔵 | 🔴 | 🔴 |
| **Virtualización** | 🔵 | 🔴 | 🔴 | 🔴 |
| **Servidores físicos** | 🔵 | 🔴 | 🔴 | 🔴 |
| **Red, energía y edificio** | 🔵 | 🔴 | 🔴 | 🔴 |

🔵 = tuyo · 🔴 = del proveedor · 🟡 = compartido

Dos lecturas que valen más que la tabla entera:

- **La fila de datos nunca se pone roja del todo.** Da igual cuánto subas en abstracción: tus datos siguen siendo tu responsabilidad, incluso cuando el proveedor los guarde, los replique y los respalde por ti. De ahí sale la Sección 3.
- **El corte sube, el trabajo baja, el control baja con él.** No existe el modelo que te dé menos operación y más control a la vez. Cada vez que alguien te venda eso, busca la letra chica.

## ¿Y serverless dónde entra?

Serverless suele presentarse como un cuarto modelo, y genera más confusión que los otros tres juntos. Vamos a desmontarla ahora, aunque el estudio serio del tema es **B5**.

❌ **Mito:** "Serverless significa que no hay servidores."
✅ **Realidad:** Servidores hay, y muchos. Lo que no hay es un servidor **tuyo**: no lo eliges, no lo ves, no lo enciendes. El proveedor levanta uno cuando llega una petición y lo suelta cuando termina.

❌ **Mito:** "Serverless es solo otro nombre para PaaS."
✅ **Realidad:** Comparten la idea de subir código y olvidarse del sistema operativo, pero cambia **la unidad**. En PaaS hay un proceso vivo esperando peticiones; en serverless la unidad es la **invocación**, y entre una y otra no existe nada. De ahí salen sus tres consecuencias características: cold start, tiempo máximo de ejecución, y nada de estado guardado en memoria local. Por eso se le llama también **FaaS** (Function as a Service).

❌ **Mito:** "Serverless siempre sale más barato."
✅ **Realidad:** Sale más barato cuando el uso es **intermitente**, porque pagas por ejecución y no por tiempo encendido. Con tráfico constante, un contenedor corriendo todo el día suele costar menos. Es una decisión de patrón de uso, no de modernidad.

> 🎯 **Idea clave:** serverless no reemplaza a nada de lo anterior. Es un punto más alto en la misma escalera de abstracción, con paredes muy concretas que se estudian en B5 y que definen si tu producto con LLM cabe o no cabe ahí.

## Cómo eliges — árbol de decisión

La pregunta no es *"¿cuál modelo es mejor?"*, sino *"¿cuál es el requisito más exigente que tengo?"*. Ese requisito es el que te ancla hacia abajo.

```text
¿Ya existe un producto que resuelve esto y no es tu diferencial?
├── SÍ → SaaS  (no lo construyas)
└── NO
    │
    ¿Necesitas control del sistema operativo, del kernel,
    de la red, o instalar software específico?
    ├── SÍ → IaaS
    └── NO
        │
        ¿La carga es intermitente y corta (eventos, jobs, picos)?
        ├── SÍ → serverless / FaaS   (ver B5)
        └── NO → PaaS o contenedor   (ver B4)
```

| Si tu necesidad principal es… | El modelo es |
|-------------------------------|--------------|
| No construir algo que ya existe | SaaS |
| Salir a producción rápido, sin operar nada | PaaS |
| Control total del entorno o software específico | IaaS |
| Pagar solo cuando algo ocurre | Serverless |
| Portabilidad entre proveedores | IaaS o contenedores |

> 🎯 **Regla de oro:** sube tan alto en la abstracción como te permita tu requisito más exigente. Bajar de nivel "por si acaso" se paga en trabajo operativo todos los días, no solo el día del despliegue.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- Un modelo de servicio no describe una tecnología: describe a qué altura del stack se corta la responsabilidad entre el proveedor y tú.
- IaaS te da la máquina y te deja el sistema operativo; PaaS te toma el código y te deja la app; SaaS te da el producto terminado y te deja solo tus datos y tus credenciales.
- No existe un modelo con menos operación y más control a la vez: cada escalón hacia arriba te quita trabajo y te quita poder de decisión.
- Tus datos nunca dejan de ser tu responsabilidad, por muy alto que subas en abstracción.
- Serverless no es "PaaS moderno": su unidad es la invocación, y de eso salen el cold start, el timeout y la ausencia de estado local.
- El modelo lo decide tu requisito más exigente, no tu preferencia — y conviene subir tan alto como ese requisito te deje.

---
[[01_que-es-la-nube|← anterior]] · [[00_indice|índice]] · [[03_responsabilidad-compartida|siguiente →]]
