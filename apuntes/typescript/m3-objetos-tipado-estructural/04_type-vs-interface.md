---
tema: M3 — Objetos y tipado estructural
workspace: typescript
seccion: 4
titulo: "type vs interface"
estado: finalizada
prev: 03_leer-lo-opcional
next: 05_tipado-estructural
---

# 🟦 `type` vs `interface`

> **`interface` es otra forma de definir con nombre la forma de un objeto. Para describir objetos, `type` e `interface` sirven casi igual; cada uno tiene una sola capacidad que el otro no tiene.**
>
> Solo `type` puede nombrar algo que no es un objeto (una unión, un literal type, una tupla). Solo `interface` se puede declarar dos veces con el mismo nombre para sumar propiedades. Además, los dos pueden extender otro tipo, cada uno con su propia sintaxis.

## La sintaxis de `interface`

**Sintaxis:**

```ts
interface NombreDelTipo {
  propiedad1: Tipo1
  propiedad2: Tipo2
}
```

**Ejemplo:** el mismo `Usuario`, escrito de las dos formas.

```ts
type UsuarioType = {
  nombre: string
  edad?: number
  readonly id: number
}

interface UsuarioInterface {
  nombre: string
  edad?: number
  readonly id: number
}
```

Dos diferencias de escritura, nada más:

- **`interface` no lleva `=`:** va directo el nombre y las llaves.
- **El cuerpo de una `interface` es siempre una forma de objeto entre llaves:** no puede ir una unión ni un literal type.

Todo lo demás de las secciones 1 a 3 funciona igual con los dos: propiedades opcionales con `?`, `readonly`, objetos anidados, y se usan igual para declarar variables y parámetros:

```ts
const a: UsuarioType      = { nombre: "Ana", id: 1 }   // ✅
const b: UsuarioInterface = { nombre: "Ana", id: 1 }   // ✅
```

Y los dos se borran al compilar.

## Capacidad que solo tiene `type`: nombrar lo que no es un objeto

`interface` solo describe objetos. Para darle nombre a una unión, un literal type, una tupla o un primitivo, la única opción es `type`:

```ts
type Id = string | number                          // unión
type Estado = "pendiente" | "pagado" | "enviado"   // unión de literal types
type Coordenada = [number, number]                 // tupla

interface Estado = "pendiente" | "pagado"
// ❌ error de sintaxis: interface solo acepta { … }
```

Este es el caso donde **solo sirve `type`**, y en código real aparece todo el tiempo.

## Los dos pueden: extender un tipo

A veces un tipo es otro con propiedades de más: un `Admin` es un `Usuario` que además tiene `permisos`. Los dos pueden expresarlo, con sintaxis distinta.

**Con `interface`: `extends`**

```ts
interface Usuario {
  nombre: string
  email: string
}

interface Admin extends Usuario {
  permisos: string[]
}

// Admin tiene nombre, email y permisos
const admin: Admin = { nombre: "Ana", email: "ana@correo.com", permisos: ["borrar"] }   // ✅
```

Se lee: "`Admin` tiene todo lo de `Usuario`, más `permisos`".

**Con `type`: `&` (intersección)**

> **`A & B` es un tipo que tiene las propiedades de `A` y también las de `B`.**
>
> Se lee **"y"**: `Usuario & { permisos: string[] }` es "Usuario y además permisos", así como la unión `|` se lee "o".

```ts
type Usuario = {
  nombre: string
  email: string
}

type Admin = Usuario & {
  permisos: string[]
}

const admin: Admin = { nombre: "Ana", email: "ana@correo.com", permisos: ["borrar"] }   // ✅
```

El resultado es el mismo, y `&` es la forma habitual de escribir "este tipo, más estas propiedades" con `type`. Aparece seguido en código real, por ejemplo al tipar las props (los parámetros) de un componente de React, o en un tipo base más los datos que agrega la base de datos:

```ts
type UsuarioGuardado = Usuario & { id: string; creadoEn: Date }
```

> 🔑 **Matiz:** si la parte agregada le da a una propiedad existente un tipo incompatible (por ejemplo, `email: number` donde era `string`), `extends` da error al declarar. `&` no da error al declarar: la propiedad queda de tipo `never`, sin ningún valor posible, y el error aparece recién al crear un objeto de ese tipo. Es un caso raro.

## Capacidad que solo tiene `interface`: declarar dos veces el mismo nombre

Si se declara dos veces una `interface` con el mismo nombre, TypeScript **suma** las propiedades de las dos declaraciones. Se llama *declaration merging*:

```ts
interface Configuracion {
  tema: string
}

interface Configuracion {
  idioma: string
}

// Configuracion ahora exige tema e idioma
const config: Configuracion = { tema: "oscuro", idioma: "es" }   // ✅
```

Con `type`, un nombre repetido es un error:

```ts
type Preferencias = { tema: string }
type Preferencias = { idioma: string }
// ❌ Duplicate identifier 'Preferencias'.
```

Este es el caso donde **solo sirve `interface`**. En una aplicación casi nunca se declara el mismo nombre dos veces a propósito. Donde importa es al **agregar propiedades a un tipo que una librería declaró como `interface`**. Las librerías suelen declarar sus tipos con `interface` justamente para permitirlo. El ejemplo típico es Express: un middleware de autenticación le agrega el `usuario` al objeto `req` de la petición, y para que TypeScript lo sepa se suma esa propiedad a la `interface Request` de Express. Si la librería hubiera usado `type`, no habría forma de agregarle propiedades. Los tipos de las librerías se estudian en → **M9 · Librerías, `.d.ts` y async**.

> ⚠️ **Cuidado:** el *declaration merging* también puede pasar sin querer. En un archivo sin `import` ni `export`, lo que se declara es visible en todo el proyecto (es *global*). Ahí, una `interface` con el nombre de otra ya existente, incluidas las que trae el navegador como `Request` o `Event`, se suma a ella en silencio; un `type` con ese nombre da `Duplicate identifier`. En archivos con `import` o `export`, que es lo normal en un proyecto actual, cada declaración queda dentro de su archivo y no se mezcla. ⚠️ verificar el caso de los tipos del navegador.

## Las diferencias de un vistazo

| Capacidad | `type` | `interface` |
|-----------|:------:|:-----------:|
| Describir la forma de un objeto | ✅ | ✅ |
| Propiedades opcionales (`?`) y `readonly` | ✅ | ✅ |
| Nombrar una unión, un literal type o una tupla | ✅ | ❌ |
| Extender otro tipo | ✅ con `&` | ✅ con `extends` |
| Avisar al declarar si la extensión choca con una propiedad | ❌ no avisa al declarar; la propiedad queda `never` | ✅ error al declarar |
| Declarar dos veces el mismo nombre y sumar propiedades | ❌ `Duplicate identifier` | ✅ *declaration merging* |
| Agregar propiedades a un tipo que una librería declaró como `interface` | ❌ | ✅ |
| ¿Existe en ejecución? | No, se borra | No, se borra |

## ¿Cuál usar?

No hay una respuesta única, y en la comunidad las dos posturas son comunes:

- **La documentación oficial de TypeScript** sugiere usar `interface` hasta que haga falta algo que solo tiene `type`. ⚠️ verificar la redacción actual del Handbook.
- **Muchos proyectos usan `type` para todo**, porque cubre objetos y además uniones, y así hay una sola forma de escribir tipos.

Una regla práctica que evita discutirlo en cada archivo:

- **Uniones, literal types, tuplas:** `type`, porque es la única opción.
- **Agregar propiedades a un tipo que una librería declaró como `interface`:** `interface`, porque es la única opción.
- **Formas de objetos en tu propio código:** la que ya use el proyecto. Si empiezas uno desde cero, elige una y mantenla en todo el proyecto.

> 🎯 **Idea clave:** para describir un objeto, `type` e `interface` dan la misma protección. La elección importa en dos casos: nombrar algo que no es un objeto (solo `type`) y sumar propiedades a una declaración existente (solo `interface`).

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- **`interface` define con nombre la forma de un objeto**; se escribe sin `=`, y para describir objetos da la misma protección que `type`.
- **Solo `type` puede nombrar una unión, un literal type o una tupla**, porque `interface` solo describe objetos.
- `interface` extiende con `extends`; `type` combina con `&` (intersección, "y"), que exige las propiedades de los dos tipos.
- **Solo `interface` se puede declarar dos veces con el mismo nombre y sumar sus propiedades** (*declaration merging*); con `type` es `Duplicate identifier`.
- Para formas de objetos en tu propio código, lo que importa es usar una sola convención en todo el proyecto.

---
[[03_leer-lo-opcional|← anterior]] · [[00_indice|índice]] · [[05_tipado-estructural|siguiente →]]
