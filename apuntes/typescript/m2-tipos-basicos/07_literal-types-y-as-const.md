---
tema: M2 — Tipos básicos e inferencia
workspace: typescript
seccion: 7
titulo: "Literal types y as const"
estado: finalizada
prev: 06_uniones-introduccion
next: null
---

# 🟦 Literal types y `as const`

> **Un literal type es un valor concreto usado como tipo: `"GET"`, `5` o `true` escritos donde va un tipo, que admiten solo ese valor exacto.**
>
> `as const` le pide a TypeScript que infiera el tipo más preciso posible para un valor completo, incluido todo lo que tiene adentro. Los dos sirven para trabajar con valores exactos; `as const` además evita que la inferencia los ensanche (`"GET"` pasando a `string`).

## Literal types escritos a mano

La inferencia ya produce literal types solos: `const metodo = "GET"` tiene tipo `"GET"`. Escrito a mano, un literal type suelto sirve poco, porque una variable que solo admite `"GET"` nunca puede valer otra cosa. Su uso real es unir varios con `|` (sección 6, Uniones: introducción) para decir "esta variable vale uno de estos valores exactos, y ningún otro".

**Sintaxis:**

```ts
let variable: "valor1" | "valor2" | "valor3"
```

**Ejemplo:** una app cuya API solo acepta tres métodos HTTP.

```ts
let metodo: "GET" | "POST" | "DELETE"

metodo = "GET"      // ✅
metodo = "POST"     // ✅
metodo = "PUT"      // ❌ Type '"PUT"' is not assignable to type '"GET" | "POST" | "DELETE"'.
metodo = "POTS"     // ❌ error de tipeo detectado al escribirlo
```

La diferencia con anotar `metodo: string` está en cuándo aparece el problema. Con `string`, `"PUT"` y `"POTS"` pasan sin aviso aunque la app solo trabaje con esos tres métodos, y el problema aparece recién al ejecutar, si llega a aparecer. Con la unión de literal types, la lista cerrada de opciones queda escrita en el tipo y TypeScript la revisa mientras escribes.

Funciona igual con números y booleanos:

```ts
let reintentos: 1 | 2 | 3
let codigoExito: 200 | 201 | 204
```

> 💡 **Tip:** una unión de literal types es la forma más común de modelar "una de estas opciones" en TypeScript moderno: estados de un pedido, métodos HTTP, roles de usuario.

## El problema: el ensanchamiento pierde el valor exacto

> **Ensanchar (*widening*) es cambiar el tipo exacto de un valor por uno más general que lo contiene.**
>
> TypeScript lo hace cuando el valor puede cambiar más adelante: si dejara el tipo exacto, la reasignación daría error.

```ts
const a = "GET"   // tipo: "GET"   → exacto: solo ese texto
let   b = "GET"   // tipo: string  → ensanchado: cualquier texto
```

El valor es el mismo `"GET"`, pero el tipo de `b` es más ancho: acepta `"GET"`, `"POST"` o cualquier otro texto. `a` es `const` y nunca cambia, así que conserva el tipo exacto. `b` es `let` y puede reasignarse (`b = "POST"`); si su tipo fuera solo `"GET"`, esa reasignación daría error, y por eso TypeScript lo ensancha a `string`.

Con las propiedades de un objeto y los elementos de un array pasa lo mismo **aunque la variable sea `const`**, porque la `const` impide reasignar la variable, no su contenido:

```ts
const peticion = { metodo: "GET", url: "/pedidos" }
// tipo: { metodo: string; url: string }   ← "GET" se ensanchó a string

let metodo: "GET" | "POST" | "DELETE"
metodo = peticion.metodo
// ❌ Type 'string' is not assignable to type '"GET" | "POST" | "DELETE"'.
```

Aquí el ensanchamiento pierde justo lo que hacía falta: el valor es `"GET"`, pero TypeScript solo sabe que es un `string`, porque `peticion.metodo` se puede reasignar más adelante (`peticion.metodo = "otro"`). Y un `string` cualquiera no cabe en la unión.

## `as const`: la inferencia más precisa posible

> **`as const` escrito después de un valor le dice a TypeScript: "trata este valor como fijo; infiere su tipo exacto, con todo lo que tiene adentro".**

**Sintaxis:**

```ts
const nombre = valor as const
```

**Ejemplo con un objeto:**

```ts
const peticionFija = { metodo: "GET", url: "/pedidos" } as const
// tipo: { readonly metodo: "GET"; readonly url: "/pedidos" }

let metodo: "GET" | "POST" | "DELETE"
metodo = peticionFija.metodo    // ✅ ahora es "GET", y "GET" cabe en la unión
```

**Ejemplo con un array:**

```ts
const metodos = ["GET", "POST"]
// tipo: string[]

const metodosFijos = ["GET", "POST"] as const
// tipo: readonly ["GET", "POST"]
```

`as const` hace tres cosas a la vez:

- **No ensancha los literales:** `"GET"` se queda como `"GET"`, no pasa a `string`.
- **Marca todo como `readonly`:** `readonly` significa que TypeScript da error si intentas modificar esa propiedad o ese array. Se estudia en → **M3 · Objetos y tipado estructural**.
- **Convierte los arrays en tuplas:** `["GET", "POST"]` pasa a ser una tupla de largo 2 con un valor exacto en cada posición, en vez de `string[]`.

Los tres efectos van juntos por una razón: TypeScript solo puede prometer el valor exacto si ningún código puede modificarlo sin error. Por eso, a cambio de la precisión, se pierde la posibilidad de cambiarlo:

```ts
peticionFija.metodo = "POST"
// ❌ Cannot assign to 'metodo' because it is a read-only property.

metodosFijos.push("DELETE")
// ❌ Property 'push' does not exist on type 'readonly ["GET", "POST"]'.
```

> 🔑 **Matiz:** a diferencia de una tupla normal, que sí permite `.push()` (sección 4), la tupla que produce `as const` es `readonly` y no lo permite.

### `as const` llega a todos los niveles

> **`const` protege solo la variable; `as const` aplica sus tres efectos a todo el contenido, por más anidado que esté.**

```ts
const config = {
  api: { metodo: "GET", reintentos: [1, 2] },
} as const

// config.api.metodo      → tipo "GET", readonly
// config.api.reintentos  → tipo readonly [1, 2]

config.api.metodo = "POST"
// ❌ Cannot assign to 'metodo' because it is a read-only property.
```

No hace falta escribir `as const` en cada objeto interno: uno solo, al final del valor completo, alcanza a `api`, a `metodo`, a `reintentos` (que pasa a ser una tupla `readonly`) y a cada uno de sus elementos.

> ⚠️ **Cuidado — no confundir con `valor as Tipo`:** `as` seguido de un tipo le pide a TypeScript tratar el valor como ese tipo aunque no pueda comprobarlo; solo rechaza conversiones imposibles, como `"hola" as number`. `as const` no fuerza ningún tipo: pide la inferencia más precisa de un valor que TypeScript sí puede ver.

## Por qué los `enum` se usan poco hoy

> **Un `enum` es la forma clásica de TypeScript de declarar un conjunto de opciones con nombre, y a diferencia de los tipos, genera un objeto que existe en ejecución.**

```ts
enum Metodo {
  Get = "GET",
  Post = "POST",
}

let metodo: Metodo = Metodo.Get
```

Resuelve lo mismo que una unión de literal types, pero con costos. Casi toda la sintaxis propia de TypeScript (anotaciones, tipos) se borra al compilar (→ **M1 · Por qué TypeScript y cómo corre**); el `enum` es una de las pocas excepciones, porque se convierte en código JavaScript.

Costos prácticos:

- **El modo de Node.js que ejecuta `.ts` directamente no lo acepta.** Node.js puede correr un archivo `.ts` reemplazando las anotaciones por espacios, sin verificarlas ni generar un `.js`. Un `enum` no es una anotación sino código que hay que generar, así que ese modo lo rechaza. ⚠️ verificar con tu versión de Node.js.
- **No acepta el valor escrito directo:** una variable de tipo `Metodo` rechaza `"GET"` aunque sea el mismo texto (`let m: Metodo = "GET"` da `Type '"GET"' is not assignable to type 'Metodo'.` ⚠️ verificar el texto); hay que escribir `Metodo.Get`. Con una unión de literal types escribes `"GET"` y TypeScript lo revisa igual.

### Cómo se escribe hoy lo que antes era un `enum`

El mismo `enum Metodo` de arriba se reemplaza de dos formas. El criterio para elegir: si necesitas un nombre para cada opción (`Metodo.Get`) o las opciones también en ejecución, objeto con `as const`; si no, unión de literal types.

**1. Unión de literal types** — cuando basta con los valores:

```ts
let metodo: "GET" | "POST" = "GET"

metodo = "POST"   // ✅
metodo = "PUT"    // ❌ Type '"PUT"' is not assignable to type '"GET" | "POST"'.
```

No genera código: escribes el valor directo y TypeScript lo revisa. Es la opción por defecto.

**2. Objeto con `as const`** — cuando quieres nombres legibles, como `Metodo.Get`, o necesitas las opciones también en ejecución (para recorrerlas y llenar un `<select>`, por ejemplo):

```ts
const Metodo = {
  Get: "GET",
  Post: "POST",
} as const
// tipo: { readonly Get: "GET"; readonly Post: "POST" }

let metodo: "GET" | "POST" = Metodo.Get   // ✅ Metodo.Get es "GET", no string
```

Se usa igual que el `enum` (`Metodo.Get`), pero es un objeto normal de JavaScript: no hay código que generar, así que el modo de Node.js que ejecuta `.ts` directamente lo acepta. Sin `as const`, `Metodo.Get` sería `string` y no cabría en `"GET" | "POST"`.

> 🔑 **Matiz:** en código real, la unión `"GET" | "POST"` no se escribe a mano junto al objeto, sino que se deriva de él con `typeof` y `keyof` usados como tipo, para no repetir las opciones. Esa sintaxis se estudia en → **M7 · Utility types**.

> 🎯 **Idea clave:** hoy "una de estas opciones" se escribe como unión de literal types, o como objeto con `as const` si hacen falta nombres o las opciones en ejecución. Los `enum` se siguen encontrando en código existente, así que conviene reconocerlos.

## Mitos sobre `as const`

❌ **Mito:** "`as const` congela el objeto en ejecución, como `Object.freeze`."
✅ **Realidad:** `as const` solo cambia el tipo, y los tipos se borran al compilar. En ejecución el objeto se puede modificar igual; lo que lo impide es el error de TypeScript al compilar.

❌ **Mito:** "`const` y `as const` hacen lo mismo."
✅ **Realidad:** `const` impide reasignar la variable. `as const` hace que TypeScript infiera el valor exacto de todo el contenido y lo marque `readonly`.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- **Un literal type admite un único valor exacto**, y unidos con `|` modelan "una de estas opciones", como `"GET" | "POST"`.
- TypeScript ensancha al tipo general (`"GET"` a `string`, `5` a `number`) las propiedades de un objeto y los elementos de un array aunque la variable sea `const`, porque su contenido puede cambiar.
- **`as const` hace tres cosas:** no ensancha los literales, marca todo como `readonly` y convierte los arrays en tuplas, en todos los niveles del valor y no solo en el primero.
- `as const` solo cambia el tipo: en ejecución el objeto se puede modificar igual.
- **`as const` no es `as Tipo`:** el primero pide la inferencia más precisa; el segundo fuerza un tipo que TypeScript no puede comprobar.
- **Los `enum` se usan poco hoy porque generan código JavaScript.** Se reemplazan por una unión de literal types o, si hacen falta nombres como `Metodo.Get` u opciones en ejecución, por un objeto con `as const`.

---
[[06_uniones-introduccion|← anterior]] · [[00_indice|índice]]
