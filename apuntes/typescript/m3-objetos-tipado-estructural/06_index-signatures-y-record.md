---
tema: M3 — Objetos y tipado estructural
workspace: typescript
seccion: 6
titulo: "Index signatures y Record"
estado: finalizada
prev: 05_tipado-estructural
next: null
---
# 🟦 Index signatures y `Record`

> **Una *index signature* describe un objeto cuyas claves no se conocen de antemano: en vez de listar cada propiedad, dice de qué tipo son todas las claves y de qué tipo son todos los valores. `Record<Clave, Valor>` es otra forma de escribir lo mismo.**
>
> Se usan para objetos donde los nombres de propiedad no se conocen de antemano: un stock por código de producto, votos por candidato, precios por ciudad.

## El problema: objetos con propiedades que no conoces

Todas las formas de las secciones anteriores listan sus propiedades por nombre: `{ nombre: string; email: string }`. Eso funciona porque **tú sabes** que el objeto va a tener siempre esos dos nombres exactos.

Hay objetos donde eso no pasa: **no sabes de antemano qué nombres de propiedad van a existir**. El ejemplo típico es un objeto que guarda cuánto stock hay de cada producto:

```ts
const stock = {
  "TEC-01": 12,
  "MOU-02": 0,
}
```

> 📝 **Recuerda — las claves de un objeto son siempre texto, con o sin comillas.** `{ nombre: "Ana" }` y `{ "nombre": "Ana" }` son el mismo objeto: las comillas no convierten la clave en texto, porque ya lo era. Solo son obligatorias cuando el nombre de la clave no se puede escribir como identificador válido de JavaScript, por ejemplo si tiene un guion como `"TEC-01"`:
>
> ```js
> const stock = { TEC-01: 12 }    // ❌ SyntaxError: Unexpected token '-' — el guion rompe el nombre de la clave
> const stock = { "TEC-01": 12 }  // ✅ con comillas, es un solo nombre de clave
> ```

Hoy tiene esas dos claves. Mañana alguien agrega un producto nuevo y aparece `"AUD-11"`. Pasado mañana, otro. La lista de nombres de propiedad no es fija: crece con el tiempo, y al escribir el tipo hoy no puedes saber cuáles van a existir.

Tiparlo como antes obligaría a escribir cada clave a mano, para siempre:

```ts
type Stock = {
  "TEC-01": number
  "MOU-02": number
  // ...y cada producto nuevo que se agregue
}
```

Eso no es sostenible. Lo que sí se sabe, aunque no se sepan los nombres, es la **regla** que cumplen todas las claves y todos los valores: **todas las claves son textos y todos los valores son números**.

## Index signature: `[clave: string]: Tipo`

> **`{ [clave: string]: number }` describe un objeto que puede tener cualquier cantidad de claves de tipo `string`, y en el que cada valor es un `number`.**

**Sintaxis:**

```ts
type NombreDelTipo = {
  [nombreDeLaClave: TipoDeLaClave]: TipoDelValor
}
```

Se lee: **"cualquier clave de tipo `TipoDeLaClave`, con un valor de tipo `TipoDelValor`"**.

- **`nombreDeLaClave` es solo una etiqueta** para quien lee: puede llamarse `clave`, `sku` o `codigo`, y no cambia nada. Conviene elegir una que diga qué representan las claves.
- **El tipo de la clave** suele ser `string`. También puede ser `number`, para objetos cuyas claves son números.

**Ejemplo:**

```ts
type Stock = {
  [sku: string]: number
}

const stock: Stock = {
  "TEC-01": 12,
  "MOU-02": 0,
}

stock["AUD-11"] = 8        // ✅ cualquier clave nueva es válida
stock["TEC-01"] = "doce"   // ❌ Type 'string' is not assignable to type 'number'.
```

TypeScript no revisa qué claves existen: revisa que **cada valor sea del tipo declarado**.

> ⚠️ **Cuidado — un solo tipo de valor para todas las claves.** `TipoDelValor` es uno solo, y aplica a cualquier clave que exista: no hay forma de decir "esta clave es `number` y esa otra es `string`" dentro de la misma index signature.
>
> ```ts
> const stock: Stock = {
>   "TEC-01": 12,
>   "MOU-02": "cero",   // ❌ todas las claves comparten el mismo tipo de valor: number
> }
> ```
>
> Si de verdad se necesitan valores de distinto tipo, `TipoDelValor` se escribe como una unión (`|`, → **M2 · Tipos básicos e inferencia**, sección 6, Uniones: introducción): `{ [clave: string]: string | number }`. Sigue siendo una sola regla, aplicada por igual a todas las claves — no una regla distinta por clave. Vale igual para `Record`.

### Leer una clave que no existe

> ⚠️ **Cuidado:** al leer una clave, TypeScript le da el tipo del valor (`number`), aunque esa clave no exista en el objeto.

```ts
const cantidad = stock["NO-EXISTE"]
// tipo: number
// en ejecución: undefined

cantidad.toFixed(2)
// compila, pero en ejecución: TypeError: Cannot read properties of undefined (reading 'toFixed')
```

TypeScript no puede saber qué claves tendrá el objeto al ejecutar, y por defecto asume que la que pides existe. Hay dos formas de protegerse:

**1. Leer con `??`** (sección 3), tratando el valor como algo que puede faltar, y dando un respaldo:

```ts
const cantidad = stock["NO-EXISTE"] ?? 0
// tipo: number   ← ya no hay riesgo de undefined
cantidad.toFixed(2)   // ✅ siempre hay un number, aunque la clave no exista
```

**2. Activar `noUncheckedIndexedAccess`** en `tsconfig.json`. `strict` no la enciende; hay que agregarla aparte. Con ella, leer cualquier clave da `Tipo | undefined`, y TypeScript obliga a comprobarlo antes de usarlo:

```ts
const cantidad = stock["NO-EXISTE"]
// tipo: number | undefined   ← con noUncheckedIndexedAccess activo

cantidad.toFixed(2)
// ❌ 'cantidad' is possibly 'undefined'.   ← obliga a comprobar

if (cantidad !== undefined) {
  cantidad.toFixed(2)   // ✅ dentro del if, TypeScript sabe que es number
}
```

⚠️ verificar el texto exacto del error con `noUncheckedIndexedAccess`.

## `Record<Clave, Valor>`: lo mismo, más corto

> **`Record<Clave, Valor>` es un tipo que trae TypeScript para describir un objeto con claves de tipo `Clave` y valores de tipo `Valor`. `Record<string, number>` equivale a `{ [clave: string]: number }`.**

La etiqueta de la index signature (`sku`, `clave`) nunca cambiaba el tipo: solo ayudaba a leerlo. `Record` parte de esa idea y la quita del todo: en vez de `{ [etiqueta: TipoDeLaClave]: TipoDelValor }`, pide directamente los dos tipos, sin llaves ni etiqueta.

**Sintaxis:**

```ts
Record<TipoDeLaClave, TipoDelValor>
```

Se lee: **"objeto con claves `TipoDeLaClave` y valores `TipoDelValor`"**.

Los `<>` reciben tipos como parámetros, igual que en `Array<string>`: es un genérico, que se estudia en → **M6 · Genéricos**. Aquí basta con saber qué va en cada posición: primero el tipo de las claves, después el de los valores.

**Ejemplo:** el mismo stock, y un conteo de votos.

```ts
type Stock = Record<string, number>

const stock: Stock = { "TEC-01": 12, "MOU-02": 0 }
stock["AUD-11"] = 8        // ✅
stock["TEC-01"] = "doce"   // ❌ Type 'string' is not assignable to type 'number'.

const votos: Record<string, number> = {}
votos["Ana"] = (votos["Ana"] ?? 0) + 1   // ✅ suma un voto, o empieza en 0
```

Todo lo que vale para la index signature vale para `Record`, incluido el cuidado al leer una clave que no existe.

> 🔑 **Matiz:** `Record` también acepta como clave una unión de literal types, por ejemplo `Record<"lima" | "cusco", number>`. Ahí las claves sí se conocen y TypeScript exige que estén todas. Ese uso se estudia en → **M7 · Utility types**.

## Cuál usar

|                                            | Index signature                                                      | `Record`                                  |
| ------------------------------------------ | -------------------------------------------------------------------- | ----------------------------------------- |
| **Cómo se escribe**                       | `{ [sku: string]: number }`                                          | `Record<string, number>`                  |
| **Qué describe**                          | Claves de un tipo, valores de otro                                   | Lo mismo                                  |
| **Etiqueta para la clave**                 | Sí (`sku`), documenta qué representan las claves                   | No                                        |
| **Se puede mezclar con propiedades fijas** | Sí, dentro de las mismas llaves                                     | No directamente                           |
| **Uso habitual**                           | Cuando la etiqueta de la clave ayuda a leer, o hay propiedades fijas | La forma corta para un diccionario simple |

Para un diccionario simple, `Record<string, number>` es lo más común por ser más corto. La index signature se prefiere cuando nombrar la clave aclara el código (`[sku: string]`) o cuando el objeto tiene también propiedades fijas.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- **Una index signature describe un objeto cuyas claves no se conocen al escribir el tipo:** `{ [clave: string]: number }` es "cualquier clave `string`, con valor `number`".
- El nombre dentro de los corchetes (`clave`, `sku`) es solo una etiqueta; TypeScript revisa el tipo de cada valor, no qué claves existen.
- **Al leer una clave que no existe, TypeScript igual le da el tipo del valor**, aunque en ejecución sea `undefined`; se lee con `??` o se activa `noUncheckedIndexedAccess`, que `strict` no enciende.
- **`Record<Clave, Valor>` es la forma corta de lo mismo:** `Record<string, number>` equivale a `{ [clave: string]: number }`.
- Para un diccionario simple se suele usar `Record`; la index signature, cuando la etiqueta de la clave aclara el código o hay propiedades fijas.

---

[[05_tipado-estructural|← anterior]] · [[00_indice|índice]]
