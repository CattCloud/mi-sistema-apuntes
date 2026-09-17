---
tema: M3 — Objetos y tipado estructural
workspace: typescript
seccion: 1
titulo: "Tipar un objeto"
estado: finalizada
prev: null
next: 02_opcionales-y-readonly
---

# 🟦 Tipar un objeto

> **Tipar un objeto es describir su forma: qué propiedades tiene y de qué tipo es cada una.**
>
> Para TypeScript, el tipo de un objeto es la lista de sus propiedades con el tipo de cada una; cada asignación y cada lectura se revisan contra esa lista.

## La sintaxis: una lista de propiedades con su tipo

**Sintaxis:**

```ts
let variable: { propiedad1: Tipo1; propiedad2: Tipo2 }
```

**Ejemplo:**

```ts
let usuario: { nombre: string; edad: number; activo: boolean }

usuario = { nombre: "Erick", edad: 30, activo: true }   // ✅
```

Se lee: "`usuario` es un objeto con `nombre` de tipo `string`, `edad` de tipo `number` y `activo` de tipo `boolean`".

Entre propiedades se puede usar `;` o `,`: TypeScript acepta los dos. Lo habitual es `;`, y cuando cada propiedad va en su propia línea se puede omitir el separador:

```ts
let usuario: {
  nombre: string
  edad: number
  activo: boolean
}
```

> 🔑 **Matiz:** la forma `{ nombre: string }` se parece a un objeto de JavaScript, pero no lo es. Después de `:` cada propiedad lleva un **tipo** (`string`), no un **valor** (`"Erick"`). Es la descripción del objeto, no el objeto.

## Qué revisa TypeScript contra esa forma

Con la forma declarada, TypeScript revisa cuatro cosas. Las tres primeras al asignar; la cuarta al leer.

**1. Que no falte ninguna propiedad:**

```ts
usuario = { nombre: "Erick", edad: 30 }
// ❌ Property 'activo' is missing in type '{ nombre: string; edad: number; }'
//    but required in type '{ nombre: string; edad: number; activo: boolean; }'.
```

**2. Que cada propiedad tenga su tipo:**

```ts
usuario = { nombre: "Erick", edad: "treinta", activo: true }
// ❌ Type 'string' is not assignable to type 'number'.
```

**3. Que un objeto escrito directamente en la asignación no traiga propiedades de más:**

Un objeto escrito directamente en la asignación, entre llaves, se llama *object literal*. Si trae una propiedad que la forma no declara, TypeScript da error:

```ts
usuario = { nombre: "Erick", edad: 30, activo: true, email: "e@correo.com" }
// ❌ Object literal may only specify known properties,
//    and 'email' does not exist in type '{ nombre: string; edad: number; activo: boolean; }'.
```

> ⚠️ **Cuidado:** esta tercera revisión solo aplica a un *object literal*. Si el mismo objeto se guarda antes en una variable y después se asigna, la propiedad de más sí pasa. El porqué es el tema de la sección 5 (Tipado estructural).

**4. Que no leas una propiedad que la forma no declara:**

```ts
usuario.email
// ❌ Property 'email' does not exist on type '{ nombre: string; edad: number; activo: boolean; }'.
```

## Sin anotar: TypeScript infiere la forma

Si el objeto tiene valor inicial, no hace falta escribir la forma: TypeScript la deduce de las propiedades que ve.

```ts
const producto = { nombre: "Teclado", precio: 120 }
// tipo: { nombre: string; precio: number }

producto.precio = "caro"
// ❌ Type 'string' is not assignable to type 'number'.
```

Cada propiedad se ensancha a su tipo general (`string`, no `"Teclado"`), porque las propiedades de un objeto se pueden reasignar aunque la variable sea `const` (→ **M2 · Tipos básicos e inferencia**, sección 7, Literal types y `as const`).

Se anota la forma donde TypeScript no tiene de dónde deducirla (parámetros de funciones y variables sin valor inicial) y en lo que se exporta a otros archivos; en el resto del código se deja inferir (→ **M2 · Tipos básicos e inferencia**, sección 3, Cuándo anotar vs callarse).

## Definir un tipo con nombre: `type`

> **`type` define un tipo con nombre, que después usas para declarar variables, parámetros o propiedades de ese tipo.**
>
> Se define una vez y se usa en todos los lugares donde haga falta.

Sin `type`, escribir la forma completa en cada parámetro es largo y se repite:

```ts
function saludar(usuario: { nombre: string; edad: number; activo: boolean }) { … }
function desactivar(usuario: { nombre: string; edad: number; activo: boolean }) { … }
```

**Sintaxis:**

```ts
type NombreDelTipo = { propiedad1: Tipo1; propiedad2: Tipo2 }
```

**Ejemplo:** se define `Usuario` y se usa en una variable, en dos parámetros y dentro de otro tipo.

```ts
type Usuario = {
  nombre: string
  edad: number
  activo: boolean
}

let admin: Usuario = { nombre: "Ana", edad: 25, activo: true }   // variable de tipo Usuario

function saludar(usuario: Usuario) {                              // parámetro de tipo Usuario
  return `Hola ${usuario.nombre}`
}

function desactivar(usuario: Usuario) {
  usuario.activo = false
}

type Sesion = {
  usuario: Usuario                                                // propiedad de tipo Usuario
  inicio: string
}
```

Ahora la forma vive en un solo lugar: si mañana `Usuario` necesita `email`, se agrega en su definición y TypeScript revisa contra la forma nueva cada variable, parámetro y propiedad que lo usa.

### No solo para objetos

`type` define un tipo con nombre a partir de cualquier tipo, incluidas las uniones y los literal types:

```ts
type Id = string | number
type Estado = "pendiente" | "pagado" | "enviado"

let pedidoId: Id = 42           // ✅ number cabe en Id
let estado: Estado = "pagado"   // ✅
estado = "cancelado"            // ❌ Type '"cancelado"' is not assignable to type 'Estado'.
```

- **Por convención, el nombre va en *PascalCase*** (cada palabra empieza con mayúscula y van juntas, sin guiones): `Usuario`, `Estado`, `PedidoPagado`.
- **Se borra al compilar**, como cualquier tipo: en el `.js` no queda rastro de `type Usuario`.
- **Hay otra forma de definir con nombre la forma de un objeto, `interface`.** Cuál elegir y en qué se diferencian es la sección 4 (`type` vs `interface`).

## Objetos dentro de objetos

Una propiedad puede ser otro objeto o un array de objetos. Se describe igual, anidando:

```ts
type PedidoAnidado = {
  id: number
  cliente: { nombre: string; email: string }      // un objeto dentro
  items: { producto: string; precio: number }[]   // un array de objetos
}
```

Cuando la forma interna se repite o se lee mejor con nombre, se extrae a su propio `type`:

```ts
type Item = {
  producto: string
  precio: number
}

type Pedido = {
  id: number
  cliente: { nombre: string; email: string }
  items: Item[]   // se lee: "array de Item"
}
```

`PedidoAnidado` y `Pedido` describen exactamente la misma forma; la segunda solo es más fácil de leer y permite reutilizar `Item`.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- **Tipar un objeto es describir su forma:** la lista de propiedades con el tipo de cada una, como `{ nombre: string; edad: number }`.
- Dentro de la forma cada propiedad lleva un tipo, no un valor: es la descripción del objeto, no el objeto.
- **Al asignar, TypeScript revisa que no falte ninguna propiedad y que cada una tenga su tipo;** al leer, que la propiedad exista en la forma.
- Un *object literal* (el objeto escrito directamente en la asignación) tampoco puede traer propiedades de más; si el objeto se guarda antes en una variable, esa revisión no aplica.
- Con valor inicial, TypeScript infiere la forma, con cada propiedad ensanchada a su tipo general (`string`, no `"Teclado"`).
- **`type` define un tipo con nombre** que después usas para declarar variables, parámetros o propiedades de ese tipo; se escribe una sola vez y se borra al compilar.
- `type` no es solo para objetos: también nombra uniones y literal types, como `type Estado = "pendiente" | "pagado"`.

---
[[00_indice|índice]] · [[02_opcionales-y-readonly|siguiente →]]
