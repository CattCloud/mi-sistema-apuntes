---
tema: M2 — Tipos básicos e inferencia
workspace: typescript
seccion: 6
titulo: "Uniones: introducción"
estado: finalizada
prev: 05_any-unknown-never-void
next: 07_literal-types-y-as-const
---

# 🟦 Uniones: introducción

> **Un tipo unión junta varios tipos con `|` y dice que el valor puede ser de cualquiera de ellos, pero de uno solo a la vez.**
>
> `|` se lee **"o"**: `string | number` se lee "string o number".

**Sintaxis:**

```ts
let variable: TipoA | TipoB | TipoC
```

**Ejemplo:**

```ts
let id: string | number

id = "abc-123"   // ✅ es string
id = 42          // ✅ es number
id = true        // ❌ Type 'boolean' is not assignable to type 'string | number'.
```

Una unión puede juntar dos tipos o más, y el orden en que se escriben no cambia nada: `string | number` y `number | string` son el mismo tipo.

## Una unión guarda un solo valor a la vez

> ⚠️ **Cuidado — la unión no guarda varios valores:** dice **qué tipos están permitidos**, no cuántos valores guarda la variable. En cada momento `id` tiene un único valor, que es `string` o `number`.

```ts
let id: string | number

id = "abc-123"   // ahora id vale "abc-123"
id = 42          // ahora id vale 42; "abc-123" ya no está
```

Si lo que necesitas es guardar un texto **y** un número al mismo tiempo, no es una unión: es una tupla (sección 4, Arrays y tuplas) o un objeto (→ **M3 · Objetos y tipado estructural**). La diferencia se ve lado a lado:

| Tipo | Se lee | Qué guarda | Ejemplo válido |
|------|--------|------------|----------------|
| `string \| number` | "string **o** number" | Un solo valor, de uno de los dos tipos | `"abc"` · `42` |
| `[string, number]` | "tupla de string **y** number" | Dos valores a la vez, en ese orden | `["abc", 42]` |
| `(string \| number)[]` | "array de elementos string **o** number" | Muchos valores; cada uno es de uno de los dos tipos | `["abc", 42, "x"]` |

> 🎯 **Idea clave:** `|` es **"o"**, nunca **"y"**. Si al leer el tipo en voz alta necesitas decir "y", no es una unión.

## Uniones con `null` y `undefined`: "a veces hay valor"

El uso más frecuente de una unión es decir que un valor puede faltar. Con `strict` activo (en concreto, la opción `strictNullChecks` que `strict` enciende), una variable de tipo `string` no acepta `null`. Para que lo acepte, el tipo tiene que ser la unión `string | null`:

```ts
let nombreSinUnion: string = null
// ❌ Type 'null' is not assignable to type 'string'.

let nombreUsuario: string | null = null
// ✅ se lee: "un texto, o null"
```

La unión deja escrito en el tipo que hay dos situaciones posibles: hay nombre (un `string`) o no lo hay (`null`). Muchas funciones del navegador ya vienen tipadas así, por ejemplo:

```ts
const token = localStorage.getItem("token")
// tipo: string | null  → el texto guardado, o null si esa clave no existe
```

## Uniones y arrays: dónde van los paréntesis

Con arrays, la posición de los paréntesis cambia el significado por completo:

| Tipo | Se lee | Ejemplo válido | Ejemplo inválido |
|------|--------|----------------|------------------|
| `(string \| number)[]` | "array de elementos string o number" | `["a", 1, "b"]` | `[true]` |
| `string[] \| number[]` | "array de strings, o array de numbers" | `["a", "b"]` · `[1, 2]` | `["a", 1]` (mezcla) |
| `string \| number[]` | "un string, o un array de numbers" | `"a"` · `[1, 2]` | `["a"]` |

En otras palabras: `(string | number)[]` permite **mezclar** dentro del mismo array; `string[] | number[]` exige que **todo** el array sea de un solo tipo. Y sin paréntesis, `[]` se aplica solo al tipo que tiene pegado.

## Uniones de valores exactos

Una unión también puede juntar literal types, los tipos de un único valor exacto como `"pagado"` o `200` (sección 2, Inferencia). Así se escribe "este valor es uno de estos, y ningún otro":

```ts
let estado: "pendiente" | "pagado" | "enviado"

estado = "pagado"     // ✅
estado = "cancelado"  // ❌ Type '"cancelado"' is not assignable to type '"pendiente" | "pagado" | "enviado"'.
```

La lectura es la misma: `estado` vale `"pendiente"`, **o** `"pagado"`, **o** `"enviado"`, uno solo a la vez. Cómo se aprovechan en la práctica, y cómo evitar que la inferencia los pierda, es la sección 7 (Literal types y `as const`).

## Usar el valor de una unión: solo operaciones comunes a todos sus tipos

Asignar a una unión es directo. Usar su valor tiene una restricción cuando TypeScript no sabe cuál de los tipos llegó: solo permite las operaciones que sirven para **todos** los tipos de la unión. El caso típico es un parámetro de función:

```ts
function mostrar(id: string | number) {
  id.toUpperCase()
  // ❌ Property 'toUpperCase' does not exist on type 'string | number'.
  //      Property 'toUpperCase' does not exist on type 'number'.
}
```

`toUpperCase` existe en `string` pero no en `number`, y dentro de la función `id` puede llegar como cualquiera de los dos. ⚠️ verificar el texto exacto pasando el mouse sobre `toUpperCase`.

> 🔑 **Matiz:** si la variable se declara con un valor delante (`let id: string | number = "abc-123"`), TypeScript sigue lo que se asignó y en la línea siguiente ya sabe que `id` es `string`, así que `id.toUpperCase()` compila. La restricción aparece donde el valor puede ser cualquiera de los tipos, como en un parámetro.

Qué operaciones sí se permiten y cómo distinguir el tipo antes de usarlo (narrowing) se estudian en → **M5 · Uniones, narrowing y discriminadas**.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- **Un tipo unión junta tipos con `|`, y `|` se lee "o":** `string | number` es "string o number".
- **La unión dice qué tipos están permitidos, no cuántos valores se guardan:** la variable tiene un solo valor a la vez.
- Si al leer el tipo necesitas decir "y" (un texto y un número a la vez), no es una unión: es una tupla o un objeto.
- Con `strict` activo, una variable `string` no acepta `null`; para que lo acepte, el tipo tiene que ser la unión `string | null`, que se lee "a veces hay valor, a veces no".
- **Los paréntesis cambian el significado:** `(string | number)[]` permite mezclar en el array; `string[] | number[]` exige que todo el array sea de un solo tipo.
- Una unión de literal types, como `"pendiente" | "pagado" | "enviado"`, limita el valor a una lista cerrada de opciones.
- Cuando no sabe cuál de los tipos llegó, como en un parámetro `string | number`, TypeScript solo permite las operaciones que sirven para todos los tipos de la unión.

---
[[05_any-unknown-never-void|← anterior]] · [[00_indice|índice]] · [[07_literal-types-y-as-const|siguiente →]]
