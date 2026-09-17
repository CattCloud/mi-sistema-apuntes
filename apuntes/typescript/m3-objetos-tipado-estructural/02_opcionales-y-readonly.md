---
tema: M3 — Objetos y tipado estructural
workspace: typescript
seccion: 2
titulo: "Opcionales y readonly"
estado: finalizada
prev: 01_tipar-un-objeto
next: 03_leer-lo-opcional
---

# 🟦 Opcionales y `readonly`

> **Una propiedad opcional (`?`) es una propiedad que el objeto puede no tener. Una propiedad `readonly` es una propiedad que, una vez creado el objeto, TypeScript no deja asignar.**
>
> Los dos son modificadores que se escriben en la forma del objeto, uno por propiedad: `?` después del nombre, `readonly` antes.

## Propiedades opcionales: `?`

Por defecto, toda propiedad de la forma es obligatoria (sección 1). Con `?` después del nombre, la propiedad puede faltar.

**Sintaxis:**

```ts
type NombreDelTipo = {
  propiedadObligatoria: Tipo
  propiedadOpcional?: Tipo
}
```

**Ejemplo:** en un formulario de registro, el teléfono no es obligatorio.

```ts
type Registro = {
  nombre: string
  email: string
  telefono?: string
}

const conTelefono: Registro = { nombre: "Ana", email: "ana@correo.com", telefono: "999111222" }  // ✅
const sinTelefono: Registro = { nombre: "Luis", email: "luis@correo.com" }                        // ✅ telefono puede faltar
```

### Leer una opcional: puede venir `undefined`

Si la propiedad puede faltar, al leerla puede no haber nada. Por eso TypeScript le da al leerla el tipo `string | undefined`, no `string`:

```ts
function mostrarTelefono(registro: Registro) {
  registro.telefono              // tipo: string | undefined

  registro.telefono.toUpperCase()
  // ❌ 'registro.telefono' is possibly 'undefined'.
}
```

TypeScript no deja usar el valor como `string` hasta que el código compruebe que no es `undefined`. Las formas de leer un valor que puede no existir (`?.`, `??` y `!`) son la sección 3 (Leer lo opcional).

## `edad?: number` vs `edad: number | undefined`

Parecen lo mismo, porque en los dos casos leer la propiedad da `number | undefined`. La diferencia está en **si la propiedad puede no estar escrita en el objeto**:

- **`edad?: number`**: la propiedad puede **faltar por completo**, o estar escrita con valor `undefined`.
- **`edad: number | undefined`**: la propiedad **tiene que estar escrita**, aunque su valor sea `undefined`.

```ts
type ConOpcional = { nombre: string; edad?: number }
type ConUnion    = { nombre: string; edad: number | undefined }

const a: ConOpcional = { nombre: "Ana" }                    // ✅ edad falta, y está permitido
const d: ConOpcional = { nombre: "Ana", edad: undefined }   // ✅ con la configuración habitual (ver matiz)

const b: ConUnion    = { nombre: "Ana" }
// ❌ Property 'edad' is missing in type '{ nombre: string; }'
//    but required in type 'ConUnion'.

const c: ConUnion    = { nombre: "Ana", edad: undefined }   // ✅ edad está escrita, con valor undefined
```

> 🔑 **Matiz:** existe una opción de `tsconfig.json`, `exactOptionalPropertyTypes`, que `strict` no enciende. Con esa opción en `true`, `edad?: number` solo permite **omitir** la propiedad: escribirla con valor `undefined` (el caso `d`) da error. Si un proyecto la activa, `?` y `| undefined` dejan de solaparse del todo.

**Cuándo usar cada una:**

- **`?`**: cuando el dato de verdad puede no existir (un campo no obligatorio, un filtro que no siempre se envía). Es la forma habitual.
- **`| undefined` sin `?`**: cuando quieres obligar a quien crea el objeto a escribir la propiedad y decidir su valor a propósito, aunque ese valor sea `undefined`. Se usa poco.

## `readonly`: propiedades que no se reasignan

> **`readonly` antes del nombre de una propiedad hace que TypeScript dé error si se intenta asignar esa propiedad después de crear el objeto.**

**Sintaxis:**

```ts
type NombreDelTipo = {
  readonly propiedad: Tipo
}
```

**Ejemplo:** el `id` de un pedido no debería cambiar nunca; el estado sí.

```ts
type Pedido = {
  readonly id: number
  estado: "pendiente" | "pagado"
}

const pedido: Pedido = { id: 1, estado: "pendiente" }

pedido.estado = "pagado"   // ✅
pedido.id = 2
// ❌ Cannot assign to 'id' because it is a read-only property.
```

Dos límites de `readonly`, los dos importantes:

**1. Solo existe al compilar.** Como todo tipo, se borra: `readonly` hace que TypeScript marque error en `pedido.id = 2` al compilar, pero no congela el objeto. Si ese JavaScript llega a ejecutarse, la reasignación funciona.

**2. Protege solo el primer nivel.** `readonly` impide reasignar esa propiedad, pero si la propiedad es un objeto, lo que hay adentro sí se puede cambiar:

```ts
type PedidoConCliente = {
  readonly id: number
  readonly cliente: { nombre: string }
}

const conCliente: PedidoConCliente = { id: 1, cliente: { nombre: "Ana" } }

conCliente.cliente = { nombre: "Luis" }   // ❌ no se puede reasignar cliente
conCliente.cliente.nombre = "Luis"        // ✅ sí se puede cambiar lo de adentro
```

Para que el interior también quede protegido, cada nivel necesita su propio `readonly`:

```ts
type PedidoProtegido = {
  readonly id: number
  readonly cliente: { readonly nombre: string }
}
```

### Arrays `readonly`

`readonly` también se escribe antes del tipo de un array. Así el array no se puede modificar con `push`, `pop` ni asignando por índice:

```ts
const etiquetas: readonly string[] = ["nuevo", "oferta"]

etiquetas.push("agotado")
// ❌ Property 'push' does not exist on type 'readonly string[]'.

etiquetas[0] = "usado"
// ❌ Index signature in type 'readonly string[]' only permits reading.
```

Un array con `as const` tampoco se puede modificar, pero fija más cosas: los valores exactos y el largo. `readonly string[]` solo promete "un array de textos que no se modifica", de cualquier largo y contenido. Por eso cada uno tiene su lugar:

- **Lista fija que escribes tú** (las opciones de un `<select>`, los roles de la app): `as const`.
- **Array que llega de afuera y no quieres modificar** (una respuesta de API, un parámetro de función): `readonly string[]`. `as const` solo se puede escribir sobre un valor escrito literalmente en el código (`["a", "b"]`, `{ … }`), no sobre una variable ni sobre lo que devuelve una función; un array que llega de afuera nunca es un literal, así que ahí no se puede usar.

El uso más común de `readonly string[]` es en parámetros, para prometer que la función no modifica el array que recibe:

```ts
function mostrar(etiquetas: readonly string[]) {
  etiquetas.push("x")
  // ❌ Property 'push' does not exist on type 'readonly string[]'.
}

mostrar(["a", "b", "c"])                // ✅ cualquier array de textos
mostrar(["nuevo", "oferta"] as const)   // ✅ también uno con as const
```

### `readonly` vs `as const`

> **`readonly` marca propiedades de un tipo para que no se reasignen; `as const` toma un valor concreto y lo fija entero, con su valor exacto, en todos los niveles.**
>
> Los dos impiden modificar, pero se escriben en lugares distintos y garantizan cosas distintas.

`as const` se estudia en → **M2 · Tipos básicos e inferencia** (sección 7, Literal types y `as const`). Lado a lado:

```ts
// readonly: se escribe en el tipo y aplica a cualquier objeto de ese tipo
type Config = {
  readonly reintentos: number
  opciones: { modo: string }
}

const c1: Config = { reintentos: 3, opciones: { modo: "rapido" } }
const c2: Config = { reintentos: 5, opciones: { modo: "lento" } }   // ✅ cualquier número al crear

c1.reintentos = 4          // ❌ Cannot assign to 'reintentos' because it is a read-only property.
c1.opciones.modo = "otro"  // ✅ opciones no es readonly, y lo de adentro tampoco

// as const: se escribe sobre un valor y lo fija entero
const config = { reintentos: 3, opciones: { modo: "rapido" } } as const
// tipo: { readonly reintentos: 3; readonly opciones: { readonly modo: "rapido" } }

config.reintentos = 4          // ❌ read-only
config.opciones.modo = "otro"  // ❌ read-only: as const llegó al interior
```

| | `readonly` | `as const` |
|-|------------|------------|
| **Dónde se escribe** | En la declaración de un tipo, antes de cada propiedad (`readonly id: number`) o antes de un array (`readonly string[]`) | Después de un valor escrito literalmente (`{ … } as const`) |
| **A qué aplica** | A todo acceso hecho a través de ese tipo, sin importar el valor del objeto | Solo a ese valor |
| **Qué eliges** | Qué propiedades proteger, una por una | Nada: aplica a todo el valor |
| **¿Fija el valor exacto?** | No: `readonly reintentos: number` acepta cualquier número al crear el objeto | Sí: el tipo pasa a ser el literal (`3`, no `number`) |
| **Qué impide** | Asignar la propiedad después de crear el objeto; en arrays, también `push`, `pop` y asignar por índice | Asignar o modificar cualquier parte del valor |
| **Profundidad** | Solo el nivel donde se escribe; lo de adentro se protege repitiendo `readonly` | Todos los niveles de una vez |
| **Con arrays** | `readonly string[]`: sin `push` ni asignar por índice, pero el largo no queda fijo | Convierte el array en tupla `readonly` con los valores exactos (`readonly ["a", "b"]`) |
| **¿Existe en ejecución?** | No, se borra al compilar | No, se borra al compilar |
| **Cuándo se usa** | Al diseñar un tipo: datos que no deberían cambiar en ningún objeto de ese tipo (un `id`, una fecha de creación) | Al declarar un valor fijo: listas de opciones, configuraciones constantes, objetos que reemplazan un `enum` |

> 🎯 **Idea clave:** `readonly` responde "¿qué propiedades de este tipo no se reasignan?"; `as const` responde "¿este valor queda fijo tal cual está escrito?".

## Las cuatro variantes de un vistazo

| Declaración | ¿Puede faltar al crear el objeto? | ¿Acepta `undefined` como valor? | ¿Se puede asignar después? |
|-------------|:---------------------------------:|:-------------------------------:|:--------------------------:|
| `edad: number` | No | No | Sí |
| `edad?: number` | Sí | Sí (salvo con `exactOptionalPropertyTypes`) | Sí |
| `edad: number \| undefined` | No | Sí | Sí |
| `readonly edad: number` | No | No | No |

Los modificadores se combinan: `readonly edad?: number` es una propiedad que puede faltar al crear el objeto y que después no se puede asignar, ni para cambiarla ni para agregarla si faltó.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- **`?` después del nombre hace opcional una propiedad:** el objeto puede no tenerla.
- Al leer una propiedad opcional, su tipo es `Tipo | undefined`, y TypeScript no deja usarla como `Tipo` hasta que el código compruebe que no es `undefined`.
- **`edad?: number` permite que la propiedad falte; `edad: number | undefined` obliga a escribirla**, aunque su valor sea `undefined`.
- **`readonly` antes del nombre impide asignar la propiedad después de crear el objeto**, pero solo al compilar: en ejecución el objeto no queda congelado.
- `readonly` protege solo el primer nivel: si la propiedad es un objeto, lo que tiene adentro sí se puede cambiar.
- `readonly string[]` es un array que no se puede modificar con `push`, `pop` ni asignando por índice.
- **`readonly` se escribe en un tipo y elige qué propiedades proteger, sin fijar su valor; `as const` se escribe sobre un valor escrito literalmente y lo fija entero**, con su valor exacto y en todos los niveles.

---
[[01_tipar-un-objeto|← anterior]] · [[00_indice|índice]] · [[03_leer-lo-opcional|siguiente →]]
