---
tipo: temario
tema: typescript
nivel: de cero a "leo cualquier librería sin bloquearme"
modulos: 9 + proyecto
tematicas: 46
estado: EN PROGRESO
---

# 🟦 Temario — TypeScript

> De cero, sin omitir nada. Lo que cambia no es la cobertura: es el **ritmo**, porque el JavaScript de abajo ya lo dominas.

## Qué es y qué no es

> 📌 **Alcance:** TypeScript aplicado a código real de aplicación — tipar lo que escribes, leer lo que importas, y saber dónde termina la garantía del compilador.

**Techo declarado — esto NO entra:**

| Fuera | Por qué |
|-------|---------|
| Conditional types (`T extends U ? A : B`) | Territorio de autor de librerías |
| Mapped types con remapeo (`as`) | Ídem |
| Template literal types | Ídem |
| Teoría de varianza | Académico para tu meta |

> Se mencionan para que los reconozcas al verlos. No se estudian.

**Piso:** cero. Aunque tus proyectos ya tengan TypeScript, esos tipos los escribió la IA — **no cuentan como conocimiento tuyo**.

## Cómo usarlo

**Se estudia dentro del sistema, temática por temática.** La fuente principal es el flujo de generación (P1–P4) con el agente. El temario ya resuelve P1 y buena parte de P2, así que se entra casi directo a **P3⇄P4**.

**Se recorren todas las temáticas, sin obviar ninguna.** No hay marcado previo ni autodiagnóstico: cada temática se desarrolla completa. La pregunta de cada fila no sirve para filtrar, sirve para saber **qué debes poder responder** cuando la sección esté cerrada.

**Mapeo con el flujo Tesla:** `1 módulo = 1 apunte (carpeta con 00_indice.md)` · `1 temática = 1 archivo de sección`. El temario ya *es* el esqueleto (P2). Ver `apuntes/AGENTS.md` (A1) — la densidad se maneja partiendo, no plegando.

**Ciclo por módulo:** generar el apunte sección por sección (P3⇄P4) en `apuntes/typescript/[modulo]/` → micro-ejercicio + quiz → cerrar.

**Material externo: opcional y de apoyo.** Videos o docs se anotan en `📚 Recursos` **solo si hicieron falta**. No hay curso que seguir.

**Ritmo, no omisión.** Buena parte de TS es *JavaScript que ya enseñas + una capa que lo describe*. Ahí avanzas rápido. Los módulos marcados 🐢 son los que no tienen análogo en JS: ahí se frena.

**Dos mecanismos de cierre por módulo:**

| Mecanismo | Para qué |
|-----------|----------|
| 🧪 **Micro-ejercicio** | 5–10 min con el compilador. Es el loop de feedback: escribes, se queja, entiendes |
| ❓ **Quiz de lectura** | Leer tipos ajenos. No definiciones — código real. **Se hace en vivo con el agente** |

> 🎙️ **Protocolo del quiz — en vivo, una pregunta a la vez.** Las preguntas de este archivo son **la fuente para el agente**, no material de lectura: **no se copian al apunte del módulo**, porque verlas de antemano convierte el quiz en un ejercicio de copiar.
>
> Cuando el usuario diga *"hagamos el quiz de MX"*, el agente:
>
> 1. Da **una sola pregunta** y espera. No adelanta las siguientes ni menciona cuántas partes tiene.
> 2. **No da pistas antes de que responda.** Si el usuario se traba y las pide, se dan escalonadas — nunca la respuesta.
> 3. Evalúa la respuesta: qué está bien, qué falta, qué está mal y por qué.
> 4. Recién entonces pasa a la siguiente.
> 5. Al final: resumen del resultado, y lo que falló va al bloque `repaso:` → `reforzar:` del `00_indice.md`.

> ⚠️ **Regla del micro-ejercicio:** **solo puede pedir sintaxis que ese módulo ya enseñó.** Si el ejercicio necesita algo de un módulo posterior, o el código de partida viene dado, o el ejercicio se reformula. Un ejercicio que exige lo que aún no viste no evalúa — frustra.

**Cada sección deja su piso de retención.** El archivo de cada sección cierra con un bloque `## 🎯 Lo que debiste llevarte` — ver `apuntes/AGENTS.md` (A7).

---

## 📊 Índice

| # | Módulo | Temáticas | Ritmo | Estado | Recursos |
|---|--------|:---------:|:-----:|--------|----------|
| M1 | Por qué TypeScript y cómo corre | 5 | 🐢 | 🔄 | — |
| M2 | Tipos básicos e inferencia | 6 | 🏃 | 🔄 | — |
| M3 | Objetos y tipado estructural | 6 | 🏃 | ⬜ | — |
| M4 | Funciones | 4 | 🏃 | ⬜ | — |
| M5 | Uniones, narrowing y discriminadas | 5 | 🐢 | ⬜ | — |
| M6 | Genéricos | 5 | 🐢 | ⬜ | — |
| M7 | Utility types | 5 | 🏃 | ⬜ | — |
| M8 | La frontera: `unknown` y validación | 5 | 🐢 | ⬜ | — |
| M9 | Librerías, `.d.ts` y async | 5 | 🏃 | ⬜ | — |
| **MF** | **Proyecto integrador** | — | — | ⬜ | — |

> **Ritmo:** 🏃 rápido (es JS con tipos) · 🐢 despacio (salto conceptual sin análogo en JS)
> **Orden:** secuencial hasta M6. M7–M9 se pueden reordenar por necesidad.

---

## M1 — Por qué TypeScript y cómo corre

> El módulo que evita el malentendido más caro: creer que TypeScript te protege en runtime.

### 🎯 Pregunta que responde

¿Qué hace TypeScript exactamente, en qué momento lo hace, y qué pasa con todo eso cuando tu código finalmente se ejecuta?

### 🚫 Qué NO entra

Configuración de bundlers, monorepos y build pipelines. Aquí solo: `tsc`, `tsconfig` y correrlo en Node.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 1.1 | Qué problema resuelve (y cuál no) | ¿Qué clase de bug atrapa TS y cuál se le escapa siempre? |
| 1.2 | **Los tipos se borran** | ¿Qué queda de tus tipos en el `.js` compilado? |
| 1.3 | Compile time vs runtime | ¿Por qué no puedes preguntar por un tipo mientras el programa corre? |
| 1.4 | `tsc` y el flujo de trabajo | ¿Qué hace el compilador y qué produce? |
| 1.5 | `tsconfig.json` y `strict` | ¿Qué activa `strict` y por qué conviene desde el día uno? |

### 🧪 Micro-ejercicio

> ⚠️ **El código de partida viene dado, a propósito:** escribir `interface` y funciones tipadas es M3 y M4. Aquí el objetivo no es practicar sintaxis, es **ver el borrado con tus propios ojos**.
>
> Copia el archivo de partida (está en `apuntes/typescript/m1-por-que-typescript/00_indice.md`), compílalo con `tsc` y **abre el `.js` resultante**.
>
> Cuenta cuántas anotaciones sobrevivieron. Esa cuenta es la lección entera del módulo. Después: ejecútalo con `node`, pruébalo con `--watch`, y recompílalo con `--target ES5` para ver la transpilación de sintaxis.

### ❓ Quiz de lectura

> **1.** Este código compila sin errores. ¿Truena en runtime? ¿Por qué?
> ```ts
> const datos: string[] = JSON.parse('{"a": 1}')
> datos.map(d => d.toUpperCase())
> ```
> **2.** ¿Por qué `if (typeof x === "Persona")` nunca funciona?
> **3.** ¿Qué diferencia hay entre un error de TS y una excepción de JS?

### 📚 Recursos

*(vacío)*

---

## M2 — Tipos básicos e inferencia

> El módulo que te enseña a escribir **menos** tipos, no más. La mitad de TS es saber cuándo callarte.

### 🎯 Pregunta que responde

¿Cuándo tengo que anotar un tipo y cuándo TypeScript ya lo sabe mejor que yo?

### 🚫 Qué NO entra

Enums (se mencionan y se explica por qué se usan poco hoy). Símbolos y BigInt.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 2.1 | Primitivos y anotación | ¿Cómo declaras el tipo de una variable y cuándo hace falta? |
| 2.2 | **Inferencia** | ¿Qué tipo le pone TS a `const x = 5` y por qué no es `number`? |
| 2.3 | Cuándo anotar vs callarse | ¿Por qué anotar de más es tan malo como anotar de menos? |
| 2.4 | Arrays y tuplas | ¿Cuál es la diferencia real y cuándo usas una tupla? |
| 2.5 | `any`, `unknown`, `never`, `void` | ¿Qué significa cada uno y por qué `any` desactiva el compilador? |
| 2.6 | Literal types y `as const` | ¿Qué hace `as const` y por qué cambia el tipo inferido? |

### 🧪 Micro-ejercicio

> Declara cinco variables **sin anotar ninguna**. Pasa el mouse por encima en VS Code y anota qué tipo infirió TS en cada una:
> ```ts
> const a = 5
> let b = 5
> const c = [1, 2, 3]
> const d = { nombre: "Erick" }
> const e = ["a", "b"] as const
> ```
> Tres de los cinco te van a sorprender.

### ❓ Quiz de lectura

> **1.** ¿Por qué esto falla?
> ```ts
> const config = { modo: "oscuro" }
> aplicar(config.modo) // aplicar espera "claro" | "oscuro"
> ```
> **2.** ¿Cuál es la diferencia entre `any` y `unknown` en una sola frase?
> **3.** ¿Qué tipo tiene `x`? → `const x = [1, "a", true]`

### 📚 Recursos

*(vacío)*

---

## M3 — Objetos y tipado estructural

> TypeScript no compara nombres, compara **forma**. Ese detalle explica el 90% de sus mensajes de error.

### 🎯 Pregunta que responde

¿Cómo describo la forma de un objeto, y por qué TS acepta cosas que yo no declaré compatibles?

### 🚫 Qué NO entra

Clases y modificadores de acceso (`private`, `protected`) — se ven de pasada; tu stack real usa funciones y objetos, no jerarquías de clases.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 3.1 | Tipar un objeto | ¿Cómo describes la forma de `{ nombre, edad, activo }`? |
| 3.2 | Opcionales y `readonly` | ¿Qué diferencia hay entre `edad?: number` y `edad: number \| undefined`? |
| 3.3 | **Leer lo opcional: `?.`, `??` y `!`** | Si algo puede no existir, ¿cómo lo lees sin que truene — y cuál de las tres formas apaga la protección? |
| 3.4 | `type` vs `interface` | ¿Cuál usas y por qué? ¿En qué caso solo sirve uno? |
| 3.5 | **Tipado estructural** | ¿Por qué un objeto que nunca declaraste como `Persona` puede pasar como `Persona`? |
| 3.6 | Index signatures y `Record` | ¿Cómo tipas un objeto cuyas claves no conoces de antemano? |

> 📝 **Sobre 3.3:** `?.` y `??` son **operadores de JavaScript**, no de TypeScript — funcionan igual en un `.js`. Entran aquí porque es donde se vuelven necesarios: acabas de declarar `edad?: number` y ahora tienes que leerlo. El `!` sí es exclusivo de TypeScript, y es el que hay que mirar con cuidado: **no comprueba nada, solo silencia al compilador**. La comprobación real con `if` y cómo TS razona sobre ella es M5 (narrowing).

### 🧪 Micro-ejercicio

> Escribe `type Usuario = { id: number; nombre: string }` y una función que lo reciba.
>
> Ahora pásale un objeto **literal** con una propiedad extra. Falla. Guarda ese mismo objeto en una `const` primero y vuelve a pasarlo: **compila**.
>
> Averigua por qué. (Se llama *excess property checking*, y entenderlo te ahorra horas de confusión.)

### ❓ Quiz de lectura

> **1.** ¿Compila? ¿Por qué?
> ```ts
> type Punto = { x: number; y: number }
> const p = { x: 1, y: 2, z: 3 }
> const q: Punto = p
> ```
> **2.** ¿Cuándo `interface` puede hacer algo que `type` no?
> **3.** ¿Qué tipo describe `{ "es": "hola", "en": "hello" }` con claves desconocidas?
> **4.** ¿Qué diferencia hay entre estas tres, y cuál es peligrosa?
> ```ts
> usuario?.direccion?.calle
> usuario.direccion?.calle ?? "sin dirección"
> usuario!.direccion!.calle
> ```

### 📚 Recursos

*(vacío)*

---

## M4 — Funciones

> Tu JS de funciones es sólido — aquí solo aprendes a describirlo. Módulo corto a propósito.

### 🎯 Pregunta que responde

¿Cómo describo lo que entra y lo que sale de una función, incluyendo las que recibo como argumento?

### 🚫 Qué NO entra

`this` tipado y decoradores. Casi no aparecen en código funcional moderno.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 4.1 | Parámetros y retorno | ¿Cuándo anotas el retorno y cuándo dejas que se infiera? |
| 4.2 | Opcionales, default y rest | ¿Cómo tipas `(a, b = 5, ...resto)`? |
| 4.3 | Tipar callbacks | ¿Cómo describes "una función que recibe un `string` y no devuelve nada"? |
| 4.4 | Sobrecargas *(reconocer)* | ¿Por qué algunas funciones de librería aceptan firmas distintas? |

### 🧪 Micro-ejercicio

> ⚠️ **Este ejercicio está diseñado para no poder terminarse aquí.** Es a propósito: sirve para que *sientas* el hueco que M6 (genéricos) viene a llenar. No es que te falte habilidad — te falta una pieza del lenguaje que aún no viste.
>
> Tipa esta función que ya sabes escribir en JS — parámetros sí, **retorno no**, dejando que TS lo infiera:
> ```ts
> function agrupar(items, clave) {
>   return items.reduce((acc, item) => { /* ... */ }, {})
> }
> ```
> **Lo que sí tienes que lograr:** que los parámetros queden tipados y entender qué te está reclamando el compilador en cada punto.
>
> **Lo que vas a chocar:** tiparla bien *para cualquier tipo de item* necesita genéricos. Anota qué te faltó y vuelve a este ejercicio al terminar M6 — ahí verás por qué `reduce` es la función más difícil de tipar de todo JS.

### ❓ Quiz de lectura

> **1.** ¿Qué significa este tipo? → `(cb: (e: Error) => void) => Promise<string>`
> **2.** ¿Por qué `() => void` acepta una función que sí devuelve algo?
> **3.** ¿Cuál es el tipo inferido de retorno de `(x: number) => x > 3`?

### 📚 Recursos

*(vacío)*

---

## M5 — Uniones, narrowing y discriminadas

> 🐢 El primer salto grande. Aquí el compilador empieza a **razonar** sobre tus `if`, y eso no existe en JavaScript.

### 🎯 Pregunta que responde

Cuando un valor puede ser varias cosas distintas, ¿cómo hago que TypeScript sepa cuál es en cada rama de mi código?

### 🚫 Qué NO entra

`satisfies` (se menciona), y assertion functions.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 5.1 | Uniones | ¿Qué puedes hacer con `string \| number` antes de distinguir cuál es? |
| 5.2 | **Narrowing** | ¿Cómo sabe TS que dentro del `if` ya es `string`? |
| 5.3 | Type guards propios (`x is Y`) | ¿Cómo le enseñas a TS a reconocer un tipo tuyo? |
| 5.4 | **Uniones discriminadas** | ¿Qué es el campo discriminante y por qué lo cambia todo? |
| 5.5 | Exhaustividad con `never` | ¿Cómo logras que el compilador te avise si olvidaste un caso? |

### 🧪 Micro-ejercicio

> Modela la respuesta de un LLM como unión discriminada:
> ```ts
> type Respuesta =
>   | { tipo: "texto"; contenido: string }
>   | { tipo: "tool"; nombre: string; args: unknown }
>   | { tipo: "error"; mensaje: string }
> ```
> Escribe un `switch` que maneje los tres. Ahora **borra un caso** y agrega el chequeo de exhaustividad con `never`. El compilador debe gritarte.
>
> *(Esto es literalmente el corazón del proyecto integrador.)*

### ❓ Quiz de lectura

> **1.** ¿Por qué falla la línea 3?
> ```ts
> function f(x: string | number) {
>   if (typeof x === "string") { /* ok */ }
>   return x.toFixed(2)
> }
> ```
> **2.** ¿Qué hace `x is Persona` como tipo de retorno?
> **3.** En una discriminada, ¿por qué el discriminante debe ser un *literal type* y no `string`?

### 📚 Recursos

*(vacío)*

---

## M6 — Genéricos

> 🐢 El segundo salto. Funciones que reciben **tipos** como parámetro. Cuando esto hace clic, TypeScript deja de sentirse arbitrario.

### 🎯 Pregunta que responde

¿Cómo escribo algo que funcione con cualquier tipo **sin perder** la información de cuál era?

### 🚫 Qué NO entra

Genéricos con constraints condicionales y inferencia avanzada (`infer`). Techo declarado.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 6.1 | Por qué existen | ¿Qué se pierde si usas `any` en vez de un genérico? |
| 6.2 | Genéricos en funciones | ¿Qué significa `<T>` y de dónde sale su valor? |
| 6.3 | Constraints (`extends`) | ¿Cómo exiges que `T` tenga cierta forma? |
| 6.4 | Genéricos en tipos e interfaces | ¿Cómo tipas un contenedor como `Resultado<T>`? |
| 6.5 | **Inferencia de genéricos** | ¿Por qué casi nunca escribes `<string>` explícitamente? |

### 🧪 Micro-ejercicio

> Escribe `primerElemento(arr)` que devuelva el primer ítem de un array.
>
> **Versión 1:** tipa `arr` como `any[]`. Verifica qué tipo devuelve.
> **Versión 2:** hazla genérica.
>
> Llama a ambas con `["a","b"]` y pasa el mouse por el resultado. La diferencia entre las dos respuestas **es** el módulo entero.

### ❓ Quiz de lectura

> **1.** ¿Qué devuelve `f(["a","b"])`? → `function f<T>(x: T[]): T`
> **2.** ¿Qué exige esto y para qué sirve? → `function g<T extends { id: number }>(x: T)`
> **3.** ¿Por qué `Array<string>` y `string[]` son lo mismo?

### 📚 Recursos

*(vacío)*

---

## M7 — Utility types

> Transformaciones de tipos que ya vienen hechas. Módulo rápido: son recetas, no conceptos.

### 🎯 Pregunta que responde

Ya tengo un tipo. ¿Cómo derivo otro a partir de él sin copiarlo y pegarlo?

### 🚫 Qué NO entra

Escribir tus propios utility types (requiere mapped/conditional types — techo declarado). Aquí solo se **usan**.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 7.1 | `Partial`, `Required`, `Readonly` | ¿Cuándo necesitas una versión "todo opcional" de un tipo? |
| 7.2 | `Pick` y `Omit` | ¿Cómo creas un tipo con solo algunos campos de otro? |
| 7.3 | `Record` | ¿Cómo describes un diccionario de claves conocidas? |
| 7.4 | `ReturnType`, `Parameters`, `Awaited` | ¿Cómo extraes el tipo que devuelve una función que no escribiste? |
| 7.5 | **`keyof` y `typeof` en type-space** | ¿Por qué `typeof` significa algo distinto arriba y abajo? |

### 🧪 Micro-ejercicio

> Parte de `type Usuario = { id: number; nombre: string; email: string; creado: Date }` y **deriva sin reescribir**:
> - `NuevoUsuario` — sin `id` ni `creado`
> - `UsuarioPublico` — solo `id` y `nombre`
> - `ActualizarUsuario` — todo opcional menos `id`
>
> 📝 El tercero necesita **combinar dos utility types con `&`** — la intersección, que se lee *"esto y además esto"*. No es una temática aparte: es una sola pieza de sintaxis y aquí la tienes.
>
> Si alguno te salió copiando campos a mano, ese es el que no aprendiste.

### ❓ Quiz de lectura

> **1.** ¿Qué tipo es? → `keyof { a: 1; b: 2 }`
> **2.** ¿Cuál es la diferencia entre `typeof x` en una expresión y en una posición de tipo?
> **3.** ¿Qué hace `Awaited<ReturnType<typeof fetchUser>>`?

### 📚 Recursos

*(vacío)*

---

## M8 — La frontera: `unknown` y validación

> 🐢 El módulo más profesional de todos. Aquí entiendes **hasta dónde llega la garantía del compilador** — y qué hacer después de ese punto.

### 🎯 Pregunta que responde

Los datos que vienen de fuera (API, formulario, archivo, **LLM**) no los controlas. ¿Cómo pasan de ser una promesa vacía a un tipo en el que puedes confiar?

### 🚫 Qué NO entra

Comparativa exhaustiva de librerías de validación. Se usa **Zod**, que ya está en tu stack.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 8.1 | Por qué lo externo es `unknown` | ¿Por qué `JSON.parse` devolviendo `any` es una mentira peligrosa? |
| 8.2 | Validación en runtime | ¿Qué hace Zod que TypeScript solo no puede hacer? |
| 8.3 | **Inferir el tipo desde el schema** | ¿Cómo obtienes un tipo TS a partir de un schema de Zod, sin duplicarlo? |
| 8.4 | Dónde poner la frontera | ¿En qué punto exacto del flujo se valida — y por qué solo una vez? |
| 8.5 | Errores tipados | ¿Cómo devuelves "falló" sin lanzar excepciones y sin perder el tipo? |

### 🧪 Micro-ejercicio

> Toma un JSON crudo (simula la respuesta de una API):
> ```ts
> const crudo: unknown = JSON.parse('{"nombre":"Erick","edad":"treinta"}')
> ```
> **1.** Intenta usar `crudo.nombre`. TS te frena — bien.
> **2.** Define un schema de Zod y valídalo.
> **3.** Observa qué tipo tiene el resultado **sin que tú lo hayas escrito**.
> **4.** Nota que `edad` era un string. TypeScript solo nunca lo habría atrapado.

### ❓ Quiz de lectura

> **1.** ¿Por qué esto es peligroso? → `const u = JSON.parse(txt) as Usuario`
> **2.** ¿Qué hace `z.infer<typeof miSchema>`?
> **3.** Si validas en el borde, ¿por qué las capas internas ya no revalidan?

### 📚 Recursos

*(vacío)*

---

## M9 — Librerías, `.d.ts` y async

> El módulo de la autonomía: dejar de depender de tutoriales porque puedes leer los tipos de cualquier librería.

### 🎯 Pregunta que responde

¿Cómo averiguo qué espera una librería que nunca usé, sin buscar un tutorial?

### 🚫 Qué NO entra

Publicar tus propios tipos en npm y configuración de `declaration` para librerías.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 9.1 | **Leer los tipos de una librería** | ¿Sabes hacer *go to definition* y entender lo que ves? |
| 9.2 | `@types` y declaration files | ¿Por qué algunas libs necesitan `@types/x` y otras no? |
| 9.3 | Tipar `async`/`await` y Promesas | ¿Qué tipo tiene una función `async` que devuelve un `string`? |
| 9.4 | Módulos ESM y tipos | ¿Cómo se importan y exportan tipos (y qué es `import type`)? |
| 9.5 | Cuando la lib no está tipada | ¿Qué haces si no hay tipos — y cuál es la salida menos mala? |

### 🧪 Micro-ejercicio

> Elige una librería que uses (Zod, Prisma o el SDK de Anthropic). Haz *go to definition* sobre su función principal y **lee el `.d.ts` real**.
>
> Escribe en dos líneas qué recibe y qué devuelve, con tus palabras. Si no puedes, ahí está el módulo.

### ❓ Quiz de lectura

> **1.** ¿Qué tipo tiene? → `async function f(): Promise<string>` … ¿y `await f()`?
> **2.** ¿Para qué sirve `import type { X } from "y"` en vez de `import { X }`?
> **3.** ¿Qué significa `declare module "libreria-sin-tipos"`?

### 📚 Recursos

*(vacío)*

---

## MF — Proyecto integrador

> Donde todo lo anterior se vuelve necesario a la vez. No es un ejercicio decorado: sin estos tipos, el programa no funciona.

### 🎯 Qué se construye

Un **cliente tipado para la API de Claude**, en Node + TypeScript, **sin frameworks**. Sin UI, sin base de datos. Corre en terminal.

```bash
$ npm start
> ¿Qué clima hace en Lima?

🔧 Ejecutando tool: obtener_clima({ ciudad: "Lima" })
✅ En Lima hay 19°C y está nublado.
```

**Tamaño:** 6–8 archivos, 200–400 líneas.

### 🔗 Qué módulo se cobra dónde

| Módulo | Dónde aparece en el proyecto |
|--------|------------------------------|
| M1 | `tsconfig` estricto desde el primer commit |
| M2–M4 | Tipar la config, las opciones y los handlers |
| **M5** | La respuesta del modelo como unión discriminada: `texto \| tool \| refusal \| error` |
| **M6** | Registrar tools cuyo input se tipa **solo**, derivado de su schema |
| M7 | `Partial` para la config, `Pick` para las opciones públicas |
| **M8** | La salida del LLM es `unknown` por definición. Zod en la frontera |
| M9 | Leer el `.d.ts` del SDK de Anthropic |

### 🧰 Estrategia: fixtures primero

Se construye contra **respuestas guardadas en JSON** — una de texto, una de tool, una de error, una mal formada. Costo cero, sin API key, y puedes provocar los casos raros a propósito.

Al final se cambia "leer del archivo" por "llamar por HTTP" y **no se toca nada más**, porque los tipos ya describen la forma.

> 💡 Ese último paso es un *port/adapter* — el mismo concepto de M3 del temario de arquitectura. Los dos temarios se tocan aquí.

### ⏭️ Pendiente

El **spec detallado** del proyecto (historias, criterios de aceptación, orden de construcción) se redacta al llegar aquí, no antes.

### 📚 Recursos

*(vacío)*

---

## Notas

- **Piso en cero, techo declarado.** No se omite ningún tema por "ya aparece en mis proyectos" — esos tipos los escribió la IA.
- **El ritmo lo pone tu JS**, no el temario. Los 🏃 se cruzan rápido porque debajo hay JavaScript que ya enseñas; los 🐢 son saltos sin análogo en JS.
- **Los micro-ejercicios no son opcionales.** TypeScript se aprende por el loop de feedback del compilador. Sin escribir código, se aprende *sobre* TS pero no se aprende TS.
- **Cada apunte generado** vive en `apuntes/typescript/[modulo]/` con su `00_indice.md`, siguiendo el flujo P1–P4.
- **Si un módulo se infla** con temas nuevos, no se estira: va a `NOTAS.md`.
