---
tema: M3 — Objetos y tipado estructural
workspace: typescript
seccion: 5
titulo: "Tipado estructural"
estado: finalizada
prev: 04_type-vs-interface
next: 06_index-signatures-y-record
---

# 🟦 Tipado estructural

> **TypeScript decide si un objeto sirve donde se pide un tipo mirando su forma, no el nombre de su tipo: si el objeto tiene al menos las propiedades que el tipo exige, con tipos compatibles (el tipo de cada propiedad cabe en el que pide el tipo), sirve.**
>
> A esto se le llama *tipado estructural*. Explica por qué un objeto que nunca se declaró con un tipo con nombre, como `Usuario`, puede pasar como `Usuario`.

## Qué es la forma de un objeto

> **La forma de un objeto es la lista de sus propiedades, con el tipo de cada una.**

```ts
const cliente = { nombre: "Ana", email: "ana@correo.com" }
// forma de cliente:  nombre → string,  email → string
```

`cliente` nunca se declaró con ningún tipo con nombre. Aun así tiene una forma: dos propiedades, `nombre` y `email`, las dos de tipo `string`.

## Forma, no nombre

Cuando se pasa `cliente` a una función que pide un `Usuario`, TypeScript no pregunta "¿`cliente` se declaró como `Usuario`?". Compara la forma que `Usuario` exige con la forma que `cliente` tiene:

```ts
type Usuario = {
  nombre: string
  email: string
}

function enviarBienvenida(usuario: Usuario) {
  return `Hola ${usuario.nombre}, te escribimos a ${usuario.email}`
}

enviarBienvenida(cliente)   // ✅ cliente tiene la forma que Usuario exige
```

La comparación, propiedad por propiedad:

```text
Usuario exige            cliente tiene
─────────────────────    ───────────────────────────────
nombre de tipo string →  nombre: "Ana"             (string) ✅
email de tipo string  →  email: "ana@correo.com"   (string) ✅

Todo lo que Usuario exige está en cliente → cliente sirve como Usuario
```

Aunque `cliente` no se declaró como `Usuario`, tiene `nombre` y `email` de tipo `string`, y eso es lo único que TypeScript revisa.

En otros lenguajes, como Java o C#, la regla es otra: un objeto solo sirve como `Usuario` si su clase es `Usuario` o declara explícitamente que lo extiende o lo implementa (`class Cliente implements Usuario`). Aunque `Cliente` tenga exactamente las mismas propiedades, sin esa declaración no sirve: se compara el **nombre** del tipo. Eso se llama *tipado nominal*. TypeScript compara la **estructura** (la forma), y por eso se llama *tipado estructural*.

## "Al menos": las propiedades de más no molestan

La regla exige **al menos** las propiedades del tipo. Si el objeto trae más, sirve igual:

```ts
const proveedor = {
  nombre: "Distribuidora Sur",
  email: "ventas@sur.com",
  ruc: "20123456789",
  telefono: "014445566",
}

enviarBienvenida(proveedor)   // ✅ tiene nombre y email; ruc y telefono sobran, y no importa
```

Dentro de `enviarBienvenida`, el parámetro es de tipo `Usuario`, así que solo se puede leer `nombre` y `email`. Las demás propiedades siguen existiendo en el objeto, pero la función no las ve.

Lo que sí da error es que **falte** algo:

```ts
const invitado = { nombre: "Luis" }

enviarBienvenida(invitado)
// ❌ Argument of type '{ nombre: string; }' is not assignable to parameter of type 'Usuario'.
//    Property 'email' is missing in type '{ nombre: string; }' but required in type 'Usuario'.
```

## La excepción: el objeto escrito directamente (*excess property checking*)

> ***Excess property checking* ("revisión de propiedades sobrantes") es una revisión extra que TypeScript hace solo cuando un objeto se escribe entre llaves justo donde se pide un tipo: además de la regla de "al menos", exige que el objeto no traiga propiedades que el tipo no declara.**
>
> Si el mismo objeto viene de una variable, esa revisión no se hace y vale solo la regla de "al menos".

El ejemplo más corto: el mismo objeto, llegando de dos maneras.

```ts
type Contacto = { nombre: string }

const c1: Contacto = { nombre: "Ana", edad: 30 }
// ❌ Object literal may only specify known properties, and 'edad' does not exist in type 'Contacto'.

const datos = { nombre: "Ana", edad: 30 }
const c2: Contacto = datos
// ✅ compila, aunque datos también trae edad
```

En ejecución, `c1` y `c2` reciben un objeto idéntico: a JavaScript le da igual cómo llega. La diferencia existe solo en lo que revisa TypeScript, y se explica por **la intención con la que se escribió el objeto**:

- **`c1`: el objeto se escribe entre llaves justo donde se pide `Contacto`** (un *object literal*, sección 1). Se armó en ese momento **para** `Contacto`, así que debería tener lo que `Contacto` pide. Si trae algo que `Contacto` no declara, lo más probable es un error, y TypeScript avisa.
- **`c2`: el objeto viene de la variable `datos`.** Ese objeto casi siempre se creó **para otra cosa** y se está reutilizando, así que es normal que traiga propiedades de más. TypeScript solo aplica la regla de siempre: ¿tiene al menos `nombre`? Sí, así que pasa.

El caso más común de reutilización es una respuesta que llega de una API:

```ts
const respuesta = await obtenerUsuarioDeLaApi()
// tipo: { nombre: string; email: string; edad: number; direccion: { … }; creadoEn: string }

enviarBienvenida(respuesta)   // ✅ la función solo necesita nombre y email
```

`respuesta` no se armó para `enviarBienvenida`: trae todo lo que devuelve la API. Si TypeScript diera error por las propiedades sobrantes, habría que copiar `nombre` y `email` a un objeto nuevo cada vez que se llama a una función.

En resumen: **si escribes el objeto directo, las propiedades de más dan error; si viene de una variable, no.**

| Cómo llega el objeto | ¿Propiedades de más? |
|----------------------|----------------------|
| Escrito entre llaves justo donde se pide el tipo (`const c1: Contacto = { … }`, `enviarBienvenida({ … })`) | ❌ Error: *excess property checking* |
| Desde una variable (`const c2: Contacto = datos`, `enviarBienvenida(proveedor)`) | ✅ Se aceptan: vale la regla de "al menos" |

### Dónde *excess property checking* salva un error real

El caso típico es un error de tipeo en una propiedad opcional:

```ts
type OpcionesConexion = {
  reintentos?: number
  timeout?: number
}

function conectar(opciones: OpcionesConexion) { … }

conectar({ reintentos: 3, timout: 500 })
// ❌ Object literal may only specify known properties,
//    but 'timout' does not exist in type 'OpcionesConexion'. Did you mean to write 'timeout'?
```

`timout` está mal escrito, y `timeout` quedaría sin configurar sin que nadie se entere. *Excess property checking* lo detecta porque el objeto se escribió directo en la llamada.

Si el mismo objeto se guarda antes en una variable, esa revisión no se hace y el error de tipeo pasa en silencio:

```ts
const opciones = { reintentos: 3, timout: 500 }

conectar(opciones)
// ✅ compila: timout sobra y nadie avisa
```

> 🔑 **Matiz:** cuando **todas** las propiedades de un tipo son opcionales, como en `OpcionesConexion`, TypeScript exige además que el objeto comparta **al menos una** de ellas (*weak type detection*). `opciones` pasa porque comparte `reintentos`. Un objeto que solo trae la propiedad mal escrita sí da error, aunque venga de una variable:
>
> ```ts
> const soloTypo = { timout: 500 }
> conectar(soloTypo)
> // ❌ Type '{ timout: number; }' has no properties in common with type 'OpcionesConexion'.
> ```

⚠️ verificar el texto exacto de los mensajes de error de esta sección.

## Consecuencia 1: un nombre de tipo no crea un tipo distinto

`type` define un tipo con nombre (sección 1), pero ese nombre no crea una categoría aparte: es solo otro nombre para una forma. Por eso a lo que declara `type` se le llama *type alias* (alias: otro nombre para lo mismo). Con `interface` pasa igual. Dos tipos con distinto nombre y la misma forma son intercambiables:

```ts
type Cliente   = { nombre: string; email: string }
type Proveedor = { nombre: string; email: string }

const c: Cliente = { nombre: "Ana", email: "ana@correo.com" }
const p: Proveedor = c   // ✅ misma forma, aunque los nombres sean distintos
```

Lo mismo pasa con tipos que no son objetos, y ahí la regla puede esconder un error real:

```ts
type UsuarioId = string
type ProductoId = string

function borrarUsuario(id: UsuarioId) { … }

const idProducto: ProductoId = "prod-123"
borrarUsuario(idProducto)   // ✅ compila: los dos son string, aunque el nombre diga otra cosa
```

El nombre `UsuarioId` documenta la intención, pero TypeScript no impide pasarle un `ProductoId`.

## Consecuencia 2: `readonly` protege solo a través de su tipo

`readonly` impide asignar una propiedad cuando se accede a ella **a través de un tipo que la marca `readonly`** (sección 2). Al comparar dos formas, TypeScript mira las propiedades y sus tipos, pero **no tiene en cuenta `readonly`**. Por eso `{ readonly id: number }` y `{ id: number }` son la misma forma para la comparación: el mismo objeto puede asignarse a una variable del tipo sin `readonly`, y a través de esa variable sí se puede modificar.

```ts
type PedidoLectura = { readonly id: number }
type PedidoEditable = { id: number }

const soloLectura: PedidoLectura = { id: 1 }
soloLectura.id = 2   // ❌ Cannot assign to 'id' because it is a read-only property.

const editable: PedidoEditable = soloLectura   // ✅ readonly no cuenta al comparar formas
editable.id = 3                                // ✅ compila, y cambia el mismo objeto
// soloLectura.id ahora vale 3
```

`soloLectura` y `editable` son dos variables que apuntan al **mismo objeto**. `readonly` protegía las líneas escritas con `soloLectura`, no el objeto.

## Mitos sobre el tipado estructural

❌ **Mito:** "Solo pasan como `Usuario` los objetos declarados como `Usuario`."
✅ **Realidad:** Pasa cualquier objeto que tenga al menos las propiedades de `Usuario` con tipos compatibles, se haya declarado como sea.

❌ **Mito:** "Una propiedad de más siempre da error."
✅ **Realidad:** Solo en un objeto escrito directamente donde se pide el tipo. Si viene de una variable, se acepta.

❌ **Mito:** "Dos tipos con distinto nombre son tipos distintos."
✅ **Realidad:** Si tienen la misma forma, son intercambiables: `type UsuarioId = string` y `type ProductoId = string` aceptan los mismos valores.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- **TypeScript compara la forma, no el nombre:** un objeto sirve donde se pide un tipo si tiene al menos sus propiedades, con tipos compatibles.
- Las propiedades de más no molestan; lo que da error es que falte una propiedad.
- **Excepción: un objeto escrito directamente donde se pide el tipo no puede traer propiedades de más** (*excess property checking*): se armó para ese tipo, así que lo que sobra probablemente es un error.
- **Si el mismo objeto viene de una variable, las propiedades de más se aceptan**, porque suele ser un objeto creado para otra cosa y reutilizado; a cambio, un error de tipeo en una propiedad opcional puede pasar en silencio si el objeto trae además alguna propiedad correcta.
- **Un nombre de tipo no crea un tipo distinto:** dos tipos con distinto nombre y la misma forma son intercambiables, incluso `type UsuarioId = string` y `type ProductoId = string`.
- `readonly` protege los accesos hechos a través de su tipo; como TypeScript no lo tiene en cuenta al comparar formas, el mismo objeto asignado a un tipo sin `readonly` se puede modificar.

---
[[04_type-vs-interface|← anterior]] · [[00_indice|índice]] · [[06_index-signatures-y-record|siguiente →]]
