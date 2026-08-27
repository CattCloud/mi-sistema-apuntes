---
tema: M2 — Límites: cómo se parte un sistema
workspace: arquitectura
seccion: 1
titulo: "Módulo, componente, servicio"
estado: finalizada
prev: null
next: 02_cohesion
---

# 🏛️ Módulo, componente, servicio

**Ejemplo — el proyecto que creció sin que nadie lo partiera:** arrancó con tres carpetas y hoy tiene cuarenta archivos. Llega una feature nueva — *"cupones de descuento"* — y aparece la pregunta que nadie sabe responder: **¿dónde pongo esto?** Le preguntas a dos compañeros y te dan dos respuestas distintas, las dos defendibles. Nadie está equivocado, y ese es justamente el síntoma: el proyecto tiene **carpetas**, pero no tiene **límites**.

> **Un límite es una frontera dentro del sistema que separa dos partes y define qué puede cruzarla.**
>
> Partir un sistema no es repartir archivos en carpetas: es decidir **qué queda adentro de cada parte, qué expone hacia afuera y qué tiene prohibido entrar**.

Antes de poder discutir dónde cortar, hay que ponerle nombre a lo que estamos cortando. Ese es el trabajo de esta sección.

## Una carpeta no es un módulo

Esta distinción es la que más rápido ordena el desorden:

> 🎯 **Idea clave:** una **carpeta** es organización visual — agrupa archivos para que los encuentres. Un **módulo** es una unidad con **contrato**: tiene una puerta de entrada, expone unas cuantas cosas y esconde el resto.

La prueba para saber cuál de las dos tienes se ejecuta con un buscar en el editor:

> 🔍 **El test:** busca cuántos archivos **distintos** de esa carpeta importa el resto del sistema.
>
> - **Uno solo** (el `index`) → es un módulo: hay una puerta y todos entran por ahí.
> - **Varios, según le convino a cada quien** → es una carpeta: cada uno entró por donde le quedaba más cerca.

```text
MÓDULO (tiene puerta)              CARPETA (no la tiene)

  pedidos/                           pedidos/
  ├── index.ts     ← la puerta       ├── crear.ts
  ├── crear.ts                       ├── validar.ts
  ├── validar.ts                     └── repo.ts
  └── repo.ts
                                     Otros importan:
  Otros importan:                      pedidos/repo.ts
    from "pedidos"                      pedidos/validar.ts
                                       ...cualquier archivo
  Solo ven lo que index expone
```

Y aquí está la consecuencia que hay que ver de frente. 
> Llamamos **contrato** a la lista de cosas que otros pueden usar de tu módulo — y por lo tanto, a **lo que no puedes cambiar sin romperle algo a alguien**.

Tú creaste `pedidos/repo.ts` pensando *"esto es un detalle interno mío, lo cambio cuando quiera"*. Pero ocho archivos del sistema lo importan directo. El día que le renombras una función o cambias cómo devuelve los datos, **esos ocho archivos se rompen**. Nunca fue interno: era público y tú no lo sabías.

> 🎯 **Idea clave:** **lo interno no lo decide tu intención, lo decide quién lo está usando.** `repo.ts` no era *privado*, era *no documentado* — y en programación, lo que nada impide, alguien termina haciéndolo.

> ⚠️ **Cuidado:** un límite que nadie hace cumplir **no existe**. Puedes dibujar la separación más elegante del mundo en un diagrama; si el código puede saltársela y nadie lo nota en el code review, es decoración.

## Los nombres de las piezas: módulo, componente y servicio

> **Cuando decimos "una parte del sistema", ¿de qué tamaño de pedazo estamos hablando?**
>
> Módulo, componente y servicio son **tres nombres para el mismo concepto** — una parte con su límite. Lo que cambia entre ellos es **cuánto los separa** del resto.


### Módulo

> **Un módulo es una parte del sistema con una puerta: expone unas pocas cosas hacia afuera y esconde todo lo demás adentro.**
>
> Vive dentro de tu mismo programa, y le hablas con un `import`.

Es lo que vimos arriba: `src/pedidos/` con su `index.ts`. Adentro puede haber diez archivos; hacia afuera solo se ven las tres o cuatro funciones que el `index` decidió exponer. Lo que **no** exporta es asunto interno, y por eso lo puedes cambiar sin avisarle a nadie.

### Componente

> **Un componente es un módulo cuyo contrato está tan bien definido que puedes reemplazar *todo* lo de adentro sin que nadie afuera se entere.**
>
> La palabra clave es **reemplazable**: no se le conoce por cómo funciona por dentro, solo por lo que promete.

**Ejemplo:** un módulo que entrega el clima de una ciudad. Adentro hace varias cosas — llama a una API externa, limpia la respuesta, convierte unidades, maneja el error si la API no responde. Hacia afuera expone una sola cosa:

```ts
obtenerClima("Lima")
```

El día que cambias de proveedor de clima, reescribes todo lo de adentro. **Afuera nadie cambia una línea**, porque nadie sabía qué había adentro: solo sabían pedir el clima y recibirlo.

Un módulo cualquiera no aguanta eso: si su contrato está a medias, cambiarle las tripas rompe cosas. Por eso es una diferencia de **grado, no de clase** — un componente es un módulo que se tomó su contrato en serio.

**Pero exponer una sola función no basta.** La pregunta que decide si de verdad es reemplazable es otra: **¿de quién es la forma de lo que devuelve?**

```ts
// ❌ El contrato filtró la implementación
function obtenerClima(ciudad: string): OpenWeatherResponse
// Devuelve { main: { temp }, weather: [{ description }] }
// ...que es la forma que inventó el proveedor, no tú.
```

```ts
// ✅ El contrato es tuyo
function obtenerClima(ciudad: string): { tempC: number; descripcion: string }
```

En el primero, todo el sistema escribe `clima.main.temp` y `clima.weather[0].description`. El día que cambias de proveedor tienes dos salidas, las dos malas: **rompes a todos**, o te quedas traduciendo la API nueva al formato del proveedor viejo para siempre — pagándole tributo a alguien que ya ni usas.

En el segundo, cambias el proveedor y traduces adentro. Afuera, nadie se entera.

> 🎯 **Idea clave:** lo que hace reemplazable a un componente no es cuántas funciones expone, sino que **la forma de lo que entra y lo que sale sea suya**, no del detalle que está escondiendo. Si tu contrato habla el idioma del proveedor, el proveedor ya se filtró hacia afuera.

Y cada cosa que expones es una cosa que **no vas a poder cambiar después** sin avisar. Por eso un contrato se diseña, no se acumula.

#### ¿Cuándo un módulo NO es componente?

Tener puerta es **necesario pero no suficiente**. Se puede respetar el límite perfectamente y aun así no poder reemplazar nada. Mira este `pedidos/` con su `index.ts` en regla:

```ts
// pedidos/index.ts — tiene puerta, todos entran por aquí
export { crearPedido } from "./crear"
export { validarPedido } from "./validar"
export { pedidoRepo } from "./repo"           // ← expone el repositorio
export type { PedidoPrisma } from "./repo"    // ← y el modelo de Prisma
```

Nadie importa archivos sueltos: la puerta se respeta. Pero por esa puerta salió Prisma, así que el día que quieras cambiar de ORM **rompes a todos**. Hay límite, no hay reemplazo.

Son cuatro las formas de tener puerta y no ser componente:

| # | La falla | Cómo se ve |
|---|----------|------------|
| 1 | **Expones de más** | El `index` re-exporta veinte cosas *"por si acaso"*. Cada export es una promesa: con veinte no puedes cambiar nada adentro. Hay puerta, pero es un portón de garaje |
| 2 | **El contrato filtra el adentro** | Sale el modelo de Prisma, o la respuesta cruda del proveedor. Lo que cruza pertenece a lo que estabas escondiendo |
| 3 | **El contrato describe el *cómo*, no el *qué*** | Ver abajo |
| 4 | **Comparte estado por debajo** | Tu módulo y otro escriben en la misma tabla. Por delante separados, por detrás amarrados — el interior no es solo tuyo (Sección 3) |

La tercera merece verse en código, porque es la más sutil:

```ts
// ❌ Obliga al de afuera a seguir tu mecánica interna
conectar()
consultar("Lima")
desconectar()

// ✅ Describe la necesidad, no el mecanismo
obtenerClima("Lima")
```

Con el primero le enseñaste al mundo cómo funcionas por dentro. El día que cambias a un proveedor que no necesita conexiones persistentes, el contrato entero deja de tener sentido.

> 🎯 **El test, en una pregunta:** *¿puedo tirar todo lo de adentro y reescribirlo de otra forma, sin que nadie afuera toque una línea?* Si es un sí limpio → componente. Si es *"sí, pero habría que ajustar unas cosas"* → módulo.

#### No todos los módulos deben ser componentes

> ⚠️ **Cuidado:** blindar el contrato de **todos** los módulos es sobre-ingeniería. Cada contrato bien cerrado cuesta indirección, traducción y ceremonia — y como vimos en el M1, **flexibilidad que nunca se usa es complejidad pura**.

Merece ser componente el módulo que cumple alguna de estas tres:

- **Esconde algo externo que podría cambiar** — una API de terceros, el ORM, la pasarela de pagos, el proveedor de LLM.
- **Esperas reemplazarlo de verdad**, no *"por si algún día"*.
- **Quieres testearlo sin lo de afuera** — cambiar el proveedor real por uno falso en los tests *es* reemplazar el interior.

El resto — `pedidos`, `carrito`, `reportes` — con ser módulos bien cortados ya cumplen. No necesitan blindaje porque no hay nada adentro que planees intercambiar.

### Servicio

> **Un servicio es una parte del sistema que corre como un programa aparte y al que solo puedes hablarle por la red.**
>
> Tiene su propio proceso, su propio despliegue y — esto es lo importante — **su propia posibilidad de estar caído**.

**Ejemplo:** la pasarela de pagos. No la importas ni podrías: no está en tu código ni en tu máquina. Le haces un POST y esperas respuesta. Y a diferencia de un módulo o un componente, **puede no responderte**, aunque tu aplicación esté perfectamente viva.

Esa última frase es la que separa de verdad los dos mundos del diagrama, y por eso vale la pena verla 

*Importante* : No son tres categorías al mismo nivel: hay **dos mundos**, y componente vive dentro del primero.

```text
        MISMO PROGRAMA                      │       PROGRAMA APARTE
        le hablas con un import             │       le hablas por la red
                                            │
   Módulo  ────────►  Componente            │          Servicio
   una carpeta        un módulo que además  │          corre en otra
   con puerta         puedes reemplazar     │          máquina
                      entero                │
                                            │
   ◄─────── el límite lo sostiene ────────► │  ◄─ lo sostiene la física ─►
            el acuerdo del equipo           │
```


| | **Módulo** | **Componente** | **Servicio** |
|---|---|---|---|
| **Qué es, en concreto** | La carpeta `src/pedidos/` con su `index.ts` | El módulo del clima detrás de `obtenerClima("Lima")`: hoy llama a un proveedor, mañana a otro, y el resto del sistema ni se entera | La pasarela de pagos: un programa que no es tuyo, corriendo en otro lado |
| **¿Dónde corre?** | Dentro de tu programa | Dentro de tu programa | En otra máquina o contenedor |
| **¿Cómo le hablas?** | `import` | `import`, pero **solo a su contrato** — nunca a sus tripas | Por red: un POST, un mensaje en una cola |
| **¿Qué pasa si falla?** | Se cae todo: es el mismo programa | Se cae todo: es el mismo programa | **Tu app sigue viva** y tiene que decidir qué hacer sin él |
| **Quién sostiene el límite** | 🔵 La disciplina del equipo | 🟡 El contrato, que hace la disciplina más fácil | 🔴 La física: no puedes importar algo que está en otra máquina |

🔵 = lo sostiene un acuerdo · 🟡 = un acuerdo con ayuda · 🔴 = la imposibilidad técnica

Tres cosas que sacar de esa tabla:

- **Si no sabes si lo tuyo es un módulo o un componente, di "módulo"** y no te vas a equivocar mucho. La diferencia es de grado, y casi nadie la usa con precisión.
- **La fila que sí marca un antes y un después es la del fallo.** Un módulo no se puede caer solo, porque es el mismo programa. Un servicio sí — y eso obliga a tu app a tener un plan para cuando no responda. Ahí nace una clase entera de problemas que no existía antes (es el M7).
- **El límite es el mismo concepto en los tres casos; lo que cambia es qué lo hace cumplir.** En un módulo se respeta porque el equipo decidió respetarlo. En un servicio se respeta porque **no hay forma de saltárselo**.

## Por qué esto explica la fiebre de los microservicios

Esa última idea explica un fenómeno completo de la industria, y conviene verlo ahora porque te va a ahorrar una decisión cara más adelante.

Cuando un equipo tiene límites que nadie respeta — todos importando de todos, el módulo de pedidos metiéndose en las tablas de pagos — la tentación es partir el sistema en servicios. Y funciona: los límites empiezan a respetarse solos.

> ⚠️ **Cuidado:** pero fíjate qué compraste. Estás pagando latencia de red, fallos parciales, despliegues coordinados y toda una capa de operación… **para obtener disciplina**. Es una factura carísima por algo que un `import` bien puesto y un code review te daban gratis.

Por eso el orden correcto es: **primero límites lógicos bien puestos, y solo después — si hay una razón real de escala o de equipos independientes — separación física**. Un monolito con módulos de verdad se puede partir en servicios cuando haga falta. Un monolito sin límites no se puede partir en nada: se convierte en varios servicios igual de enredados, pero ahora con red en medio.

> 🔑 **Matiz:** los microservicios como arquitectura distribuida son **nivel 4**, fuera de este temario. Aquí aparecen solo por lo que enseñan sobre los límites — que su valor no está en la tecnología, sino en que vuelven imposible cruzarlos por accidente.

## La pregunta que queda abierta

Ya sabes **qué** es una parte y **qué** la delimita. Falta lo difícil: decidir **dónde** trazar la línea. Porque un módulo `/pedidos` bien encapsulado no sirve de nada si resulta que los pedidos y los pagos eran, en realidad, una sola cosa que nunca debiste separar.

Eso depende de qué hace que dos cosas **merezcan vivir juntas** — y eso tiene nombre propio. Es lo que viene.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- Partir un sistema **no es repartir archivos en carpetas**: una carpeta agrupa, un **módulo** tiene puerta y contrato. El test: cuántos archivos distintos de esa carpeta importa el resto del sistema — uno solo, o varios.
- **Lo interno no lo decide tu intención, lo decide quién lo está usando.** Si ocho archivos importan tu `repo.ts`, ya es parte del contrato aunque tú lo creyeras privado.
- Un **componente** es reemplazable por dentro solo si la forma de lo que expone es **tuya**. El test: *¿puedo tirar todo lo de adentro y reescribirlo sin que nadie afuera toque una línea?* Y **no todos los módulos deben serlo** — blindarlos todos es sobre-ingeniería.
- **Un límite que nadie hace cumplir no existe.** Módulo, componente y servicio son el mismo concepto de límite; lo que cambia es **quién lo sostiene**: la disciplina, el contrato, o la física.
- Partir en servicios para conseguir disciplina es pagar red, fallos parciales y operación por algo que un `import` bien puesto daba gratis. **Primero límites lógicos; separación física solo con una razón real.**

---
[[00_indice|índice]] · [[02_cohesion|siguiente →]]
