---
tema: M2 — Tipos básicos e inferencia
workspace: typescript
seccion: 5
titulo: "any, unknown, never, void"
estado: finalizada
prev: 04_arrays-y-tuplas
next: 06_uniones-introduccion
---

# 🟦 `any`, `unknown`, `never`, `void`

> **Son los cuatro tipos que no describen una forma de dato, sino una situación límite: `any` apaga la revisión del compilador, `unknown` dice "no sé qué es, compruébalo antes de usarlo", `void` marca una función que vuelve sin nada útil y `never` marca una función que nunca devuelve el control a quien la llamó.**
>
> Dos de ellos van en pareja por el lado de "no sé qué es" (`any` y `unknown`) y dos por el lado de "no hay resultado" (`void` y `never`). Confundir los de cada pareja es el error típico.

## `any`: el tipo que apaga el compilador

> **`any` acepta cualquier valor y permite cualquier operación sobre él, sin que TypeScript revise nada.**
>
> En términos simples: TypeScript trata esa variable como en JavaScript puro y no revisa nada de lo que hagas con ella.

```ts
let dato: any = "hola"

dato.toFixed(2)      // TypeScript no da error
dato = 42            // tampoco
dato.lo.que.sea()    // tampoco
```

Las tres líneas compilan. La primera truena en ejecución con `TypeError: dato.toFixed is not a function`, porque un texto no tiene `.toFixed()`. TypeScript tenía todo para avisarte y no lo hizo: con `any` le pediste que no revisara.

`any` existe como vía de escape: permite convivir con código JavaScript sin tipos y migrar un proyecto a TypeScript por partes, sin tener que tipar todo de golpe.

### El problema real: `any` se contagia

```ts
let dato: any = "hola"
const largo = dato.length
// tipo de largo: any

const resultado = dato.procesar()
// tipo de resultado: any
```

Lo que leas, llames o devuelvas a partir de un `any` (propiedades, métodos, retornos) también sale `any`. Un solo `any` al inicio de un flujo desactiva la revisión en cada variable que dependa de él, y ninguna de esas variables muestra un error que te haga sospechar.

> 🔑 **Matiz:** las operaciones aritméticas sí devuelven un tipo concreto: `dato * 2` da `number` aunque `dato` sea `any`, porque `*` siempre produce un número.

**De dónde salen los `any`:**

- **Implícitos:** un parámetro sin anotar o una variable sin valor inicial. Con `noImplicitAny` (una de las verificaciones que `"strict": true` enciende en `tsconfig.json`), el parámetro sin anotar da error en vez de quedar `any` en silencio.
- **Explícitos:** alguien escribió `: any` para que el error desapareciera.
- **Heredados de funciones que devuelven `any`:** `JSON.parse(texto)` devuelve `any`. Por qué eso es peligroso y cómo se trata se estudia en → **M8 · La frontera: `unknown` y validación**.

> ⚠️ **Cuidado:** escribir `: any` para callar un error no arregla el error; lo esconde hasta que aparezca en ejecución.

## `unknown`: acepta cualquier valor, exige comprobarlo antes de usarlo

> **`unknown` también acepta cualquier valor, pero no permite usarlo hasta que compruebes qué es.**
>
> Es decir: lo que puedes asignarle es igual de libre que en `any`; la diferencia está en lo que puedes hacer con él después.

```ts
let dato: unknown = JSON.parse('"hola"')

dato.toUpperCase()
// ❌ 'dato' is of type 'unknown'.
```

`JSON.parse` devuelve `any`; anotar la variable como `unknown` es lo que activa la protección.

Para usarlo, primero compruebas su tipo con código que corre en ejecución:

```ts
if (typeof dato === "string") {
  dato.toUpperCase()   // ✅ dentro de este if, TypeScript sabe que dato es string
}
```

Que TypeScript cambie el tipo de `dato` dentro del `if` se llama **narrowing** (estrechar el tipo después de una comprobación) y se estudia en → **M5 · Uniones, narrowing y discriminadas**. Aquí basta con la idea: `unknown` no se usa a ciegas, se usa después de un `typeof`.

| | `any` | `unknown` |
|-|-------|-----------|
| ¿Qué valores acepta? | Cualquiera | Cualquiera |
| ¿Puedes llamar métodos o leer propiedades sin comprobar? | Sí | No |
| ¿Puedes asignarlo a una variable `string`? | Sí, sin aviso | No, hasta comprobar que es `string` |
| ¿Qué hace el compilador? | Deja de revisar | Te exige la comprobación |

> 🎯 **Idea clave:** `any` significa "no revises", `unknown` significa "no sé qué es". Cuando de verdad no sabes qué llega (el cuerpo de una petición que recibe tu servidor, el contenido de un archivo parseado con `JSON.parse`), el tipo honesto es `unknown`.

## `void`: la función que no devuelve nada útil

> **`void` es el tipo de retorno de una función que no devuelve un valor que se vaya a usar.**

```ts
function registrar(mensaje: string): void {
  console.log(mensaje)
}
```

No hace falta anotarlo: si una función no tiene `return` con valor, TypeScript infiere `void` solo.

```ts
function registrar(mensaje: string) {
  console.log(mensaje)
}
// retorno inferido: void
```

En ejecución, una función así devuelve `undefined`, como en JavaScript. `void` es la forma de decir "no cuentes con lo que devuelve":

```ts
const resultado = registrar("hola")
resultado.length
// ❌ Property 'length' does not exist on type 'void'.
```

> 🔑 **Matiz — dónde sí se escribe `void`:** en tus propias funciones casi nunca, porque se infiere (salvo cuando anotas el retorno de una función que otros archivos importan, sección 3). Donde no se puede omitir es al describir un callback, una función que se pasa como argumento, como en `(mensaje: string) => void`, porque ahí no hay cuerpo del que inferir. Esa sintaxis y los callbacks se estudian en → **M4 · Funciones**.

## `never`: después de llamarla, la línea siguiente no se ejecuta

> **`never` es el tipo que no tiene ningún valor posible.**
>
> Como retorno de una función, significa: **esta función nunca devuelve el control a la línea siguiente de quien la llamó.** No es algo que se busque; es un hecho que se le avisa a TypeScript para que razone con él.

### Dos formas de que una función deje de ejecutarse

Una función puede dejar de ejecutarse de dos maneras, y solo una de ellas vuelve:

- **Con `return` o al llegar a su última línea:** el control vuelve a quien la llamó y se ejecuta la línea siguiente. Es el caso de `void` y de cualquier función que devuelve un valor.
- **Lanzando un error:** el control **salta** la línea siguiente y sube buscando un `try/catch`. Si lo encuentra, sigue en el `catch`; si no, el programa se detiene. En ningún caso se ejecuta la línea siguiente a la llamada.

`never` describe la segunda forma. Una función que **siempre** lanza un error, que cierra el programa (`process.exit()` en Node.js) o que se queda en un bucle infinito, como un servidor que escucha en `while (true)`, nunca devuelve el control.

```ts
function registrar(mensaje: string): void {
  console.log(mensaje)
}

function fallar(mensaje: string): never {
  throw new Error(mensaje)
}

console.log("antes")
registrar("hola")         // se ejecuta y vuelve
console.log("después")    // ✅ se imprime

console.log("antes")
fallar("algo salió mal")  // lanza el error: el control no vuelve aquí
console.log("después")    // ❌ nunca se imprime
```

### Para qué le sirve a TypeScript saberlo

Si TypeScript sabe que después de `fallar(...)` no se ejecuta nada, puede sacar conclusiones sobre las líneas que siguen:

```ts
const token = process.env.TOKEN   // en Node.js, tipo: string | undefined (un texto, o undefined si la variable no existe)

if (!token) {
  fallar("Falta la variable TOKEN")
}

token.length   // ✅ aquí TypeScript sabe que token es string
```

Si `token` venía vacío, `fallar` lanzó el error y el programa nunca llega a `token.length`. Si llega, es porque `token` tenía valor. TypeScript razona igual y trata `token` como `string` después del `if` (el narrowing del apartado de `unknown`).

Con `fallar` anotada como `void`, ese razonamiento se cae: TypeScript supondría que después del `if` la ejecución puede seguir con `token` en `undefined`, y `token.length` daría error.

> 🔑 **Matiz:** el `never` tiene que estar escrito. Si declaras `function fallar(mensaje: string) { throw new Error(mensaje) }` sin anotar el retorno, TypeScript infiere `void`, no `never`, y el ejemplo de `token` deja de funcionar. Otras formas de escribir funciones sí infieren `never`; se ven en → **M4 · Funciones**.

`never` tiene un segundo uso, más importante en la práctica: que el compilador te avise cuando olvidas manejar un caso. Ese uso necesita uniones y narrowing, y se estudia en → **M5 · Uniones, narrowing y discriminadas** (exhaustividad con `never`).

## Los cuatro de un vistazo

| Tipo | Qué dice | Dónde aparece | Qué puedes hacer con el valor |
|------|----------|---------------|-------------------------------|
| `any` | "No revises" | `: any` escrito a mano, `JSON.parse`, variables sin valor inicial | Cualquier cosa, sin protección |
| `unknown` | "No sé qué es" | Donde tú lo anotas al recibir datos externos (`const dato: unknown = JSON.parse(...)`) | Nada, hasta comprobar su tipo |
| `void` | "No devuelve nada útil" | Retorno de funciones sin `return` con valor | Nada útil |
| `never` | "No vuelve" | Retorno anotado de funciones que siempre lanzan un error, cierran el programa o quedan en un bucle infinito | No existe valor que usar |

## Mitos sobre los tipos especiales

❌ **Mito:** "`any` hace que la variable sea dinámica, que no quede amarrada a un tipo."
✅ **Realidad:** La variable ya era dinámica en JavaScript, y `any` no cambia nada en ejecución. En compilación sí deja de exigir que la variable se mantenga en un tipo, pero es porque TypeScript dejó de revisarla, no porque la variable cambie. `unknown` también acepta cualquier valor, pero TypeScript sí revisa cada operación que hagas con él.

❌ **Mito:** "`unknown` es lo mismo que `any` con otro nombre."
✅ **Realidad:** Los dos aceptan cualquier valor, pero `any` permite usarlo sin comprobar y `unknown` lo prohíbe hasta que compruebes qué es.

❌ **Mito:** "`void` y `never` significan lo mismo: la función no devuelve nada."
✅ **Realidad:** Con `void`, después de llamar a la función se ejecuta la línea siguiente. Con `never` no: la función lanza un error, cierra el programa o no sale de un bucle, y el control nunca vuelve a esa línea.

❌ **Mito:** "Poner `any` es una solución temporal inofensiva."
✅ **Realidad:** `any` se contagia a lo que se lee, se llama o se devuelve a partir de él, y el error que escondía aparece en ejecución.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- **`any` apaga la revisión de TypeScript** sobre ese valor y sobre lo que leas, llames o devuelvas a partir de él.
- **`unknown` acepta cualquier valor pero no deja usarlo** hasta comprobar su tipo, por ejemplo con `typeof`.
- Cuando no sabes qué dato llega de afuera, el tipo honesto es `unknown`, no `any`.
- **`void` es el retorno de una función que vuelve a quien la llamó sin un valor útil**, y TypeScript lo infiere solo.
- **`never` como retorno significa que, después de llamar a la función, la línea siguiente no se ejecuta**, porque siempre lanza un error, cierra el programa o no sale de un bucle.
- Anotar `never` le permite a TypeScript razonar sobre lo que sigue: si pasaste la llamada a `fallar(...)`, la condición que la disparaba no se cumplió.

---
[[04_arrays-y-tuplas|← anterior]] · [[00_indice|índice]] · [[06_uniones-introduccion|siguiente →]]
