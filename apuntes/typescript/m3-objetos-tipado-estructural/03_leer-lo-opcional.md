---
tema: M3 — Objetos y tipado estructural
workspace: typescript
seccion: 3
titulo: "Leer lo opcional: ?., ?? y !"
estado: finalizada
prev: 02_opcionales-y-readonly
next: 04_type-vs-interface
---

# 🟦 Leer lo opcional: `?.`, `??` y `!`

> **`?.` lee una propiedad solo si lo que está a su izquierda existe; `??` da un valor de respaldo cuando algo vale `null` o `undefined`; `!` le dice a TypeScript "confía en mí, esto existe", sin comprobar nada.**
>
> `?.` y `??` son operadores de JavaScript: funcionan igual en un `.js` y protegen en ejecución. `!` es solo de TypeScript, se borra al compilar y no protege nada.

## El problema: leer dentro de algo que puede no existir

Una propiedad opcional puede faltar (sección 2). Si esa propiedad es un objeto y se lee algo de adentro, JavaScript falla en ejecución cuando falta:

```ts
type Pedido = {
  id: number
  envio?: { ciudad: string; referencia?: string }
}

const pedido: Pedido = { id: 1 }   // sin envío: el cliente recoge en tienda

pedido.envio.ciudad
// En JavaScript, al ejecutar: TypeError: Cannot read properties of undefined (reading 'ciudad')
```

TypeScript detecta el riesgo antes de ejecutar y da error al compilar:

```ts
pedido.envio.ciudad
// ❌ 'pedido.envio' is possibly 'undefined'.
```

Hay tres formas de leerlo. Dos protegen de verdad; la tercera solo calla el error. ⚠️ verificar el texto exacto de los dos mensajes.

## `?.`: leer solo si existe (*optional chaining*)

> **`?.` lee la propiedad si lo que está a su izquierda existe; si vale `null` o `undefined`, detiene la lectura y la expresión entera da `undefined`, sin lanzar error.**

**Sintaxis:**

```ts
objeto?.propiedad
```

Se lee: **"si `objeto` existe, dame su `propiedad`; si `objeto` es `null` o `undefined`, dame `undefined`"**.

El `?` va pegado al punto y pregunta por lo que está **a su izquierda**, no por la propiedad: `objeto?.propiedad` comprueba `objeto`. Si lo que puede faltar es la propiedad misma, no hace falta `?.` para leerla: `objeto.propiedad` ya da `undefined` cuando falta. El `?.` se necesita para seguir leyendo **dentro** de algo que puede faltar:

```text
pedido.envio?.ciudad
└──┬───────┘ └──┬──┘
   │            └── lo que se lee si envio existe
   └── lo que se comprueba: ¿pedido.envio es null o undefined?
```

**Ejemplo:**

```ts
const ciudad = pedido.envio?.ciudad
// tipo: string | undefined
// sin envío → undefined · con envío → la ciudad
```

Se lee: "si `pedido.envio` existe, dame su `ciudad`; si no, `undefined`".

- **El resultado incluye `undefined`**: `ciudad` es `string | undefined`, así que TypeScript sigue exigiendo cuidado al usarla.
- **Se encadena** cuando hay varios niveles opcionales: `pedido.envio?.referencia?.toUpperCase()` da `string | undefined`. En cuanto un eslabón vale `null` o `undefined`, el resto no se evalúa.
- **Funciona también con funciones y posiciones:** `lista?.[0]` lee la primera posición solo si `lista` existe, y `callback?.()` llama a la función solo si `callback` existe.

## `??`: un valor de respaldo (*nullish coalescing*)

> **`??` devuelve lo que está a su izquierda, salvo que valga `null` o `undefined`; en ese caso devuelve lo que está a su derecha.**

**Sintaxis:**

```ts
valorQuePuedeFaltar ?? valorDeRespaldo
```

**Ejemplo:** se combina con `?.` para leer y dar un respaldo en una sola expresión.

```ts
const destino = pedido.envio?.ciudad ?? "Recojo en tienda"
// tipo: string   ← ya no incluye undefined: siempre hay un texto
```

Por eso `??` es el complemento natural de `?.`: `?.` evita el error y produce `undefined`; `??` reemplaza ese `undefined` por un valor útil.

### `??` vs `||`: el caso del `0`

> 📝 **Recordatorio — `||` (OR) devuelve uno de los dos valores, no solo `true` o `false`.**
>
> `a || b` se lee: "si `a` es *truthy*, dame `a`; si no, dame `b`".
>
> - **Falsy** son los valores que JavaScript trata como falsos en una condición: `false`, `0` (y `-0`), `""` (texto vacío), `null`, `undefined`, `NaN` y `0n` (el cero de tipo BigInt).
> - **Truthy** es todo lo demás: cualquier texto con contenido, cualquier número distinto de `0` y de `NaN`, cualquier objeto o array (aunque esté vacío).
>
> ```js
> "Ana" || "Invitado"      // "Ana"       → "Ana" es truthy, se queda
> undefined || "Invitado"  // "Invitado"  → undefined es falsy, usa el de la derecha
> "" || "Invitado"         // "Invitado"  → "" es falsy
> 0 || 10                  // 10          → 0 es falsy
> ```
>
> Por eso durante años se usó `||` para dar valores por defecto (`nombre || "Invitado"`). Falla cuando `0`, `""` o `false` son valores válidos: `||` los trata como "no hay valor" y los reemplaza.

`??` se agregó a JavaScript (ES2020) justo para ese problema: reemplaza **solo** `null` y `undefined`, y respeta `0`, `""` y `false`. El bloque siguiente muestra los valores en JavaScript; en un `.ts`, TypeScript da error si a la izquierda de `??` hay un valor escrito que nunca es `null` ni `undefined`, porque el respaldo nunca se usaría (⚠️ verificar desde qué versión).

```js
0 || 10            // 10          → reemplazó un 0 válido
0 ?? 10            // 0           → el 0 se respeta

"" || "Sin nota"   // "Sin nota"
"" ?? "Sin nota"   // ""
```

El mismo problema con un objeto real:

```ts
type Carrito = { cantidad?: number }

const carrito: Carrito = { cantidad: 0 }   // el usuario dejó la cantidad en 0 a propósito

carrito.cantidad || 1   // 1  ❌ trató el 0 como "no hay valor"
carrito.cantidad ?? 1   // 0  ✅ el 0 es un valor, se respeta
```

> 💡 **Tip:** para dar un valor por defecto a algo que puede faltar, usa `??`. Usa `||` solo cuando de verdad quieras reemplazar también `0`, `""` y `false`.

## `!`: "confía en mí" (*non-null assertion*)

> **`!` después de una expresión le dice a TypeScript que no es `null` ni `undefined`. TypeScript le cree sin comprobar nada, y el `!` se borra al compilar.**

**Sintaxis:**

```ts
expresionQuePuedeFaltar!
```

Se lee: **"TypeScript, confía en mí: `expresionQuePuedeFaltar` no es `null` ni `undefined`"**.

El `!` va pegado **después** de lo que se afirma, y la afirmación es sobre eso que está a su izquierda. No es el `!` de negación de JavaScript (`!activo`, que va **antes** y convierte a `true`/`false`): es otro operador que se escribe con el mismo símbolo.

**Ejemplo:**

```ts
const ciudad = pedido.envio!.ciudad
// ✅ compila · tipo: string
```

Se lee: "confía en mí, `pedido.envio` existe; dame su `ciudad`".

```text
pedido.envio!.ciudad
└──┬───────┘  └──┬──┘
   │             └── lo que se lee, sin ninguna comprobación
   └── lo que se afirma que existe (sin comprobarlo)
```

El error de compilación desaparece, pero el riesgo no. Al compilar, el `!` se borra y el JavaScript queda así:

```js
const ciudad = pedido.envio.ciudad
// sin envío → TypeError: Cannot read properties of undefined (reading 'ciudad')
```

Es exactamente el código que TypeScript estaba intentando evitar. El `!` no hizo que `envio` exista: solo apagó el error de compilación.

> ⚠️ **Cuidado:** `!` es la única de las tres formas que **apaga la protección**. Usarlo es afirmar algo que TypeScript no puede comprobar; si la afirmación es falsa, el error aparece en ejecución.

**Cuándo tiene sentido:** cuando sabes algo que TypeScript no puede saber. El caso típico es el DOM:

```ts
const app = document.querySelector("#app")!
// querySelector devuelve Element | null, porque TypeScript no ve tu HTML.
// Si el HTML siempre tiene #app, el ! evita comprobar algo que sabes que existe.
```

Aun ahí es una apuesta: si alguien cambia el `id` en el HTML, el error aparece en ejecución. La alternativa que sí comprueba es un `if`:

```ts
if (pedido.envio) {
  pedido.envio.ciudad   // ✅ dentro del if, TypeScript sabe que envio existe
}
```

Que TypeScript cambie el tipo dentro del `if` se llama *narrowing* y se estudia en → **M5 · Uniones, narrowing y discriminadas**.

## Las tres de un vistazo

| | `?.` | `??` | `!` |
|-|------|------|-----|
| **Nombre** | *Optional chaining* | *Nullish coalescing* | *Non-null assertion* |
| **De dónde es** | JavaScript | JavaScript | Solo TypeScript |
| **Qué hace si el valor es `null` o `undefined`** | Detiene la lectura y da `undefined` | Devuelve el valor de respaldo | Nada: TypeScript asume que no lo es |
| **Tipo resultante** | Incluye `undefined` | Sin `null` ni `undefined` (si el respaldo no los incluye) | Sin `null` ni `undefined` |
| **¿Protege en ejecución?** | Sí | Sí | No: se borra al compilar |
| **Riesgo** | Arrastrar `undefined` si no se completa con `??` | Confundirlo con `\|\|` y perder un `0`, `""` o `false` | Error en ejecución si la afirmación era falsa |

> 🎯 **Idea clave:** `?.` y `??` resuelven el problema; `!` solo quita el error de compilación. Si dudas entre usar `!` o no, la respuesta segura es `?.` con `??`, o un `if`.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- **Leer una propiedad dentro de algo que vale `null` o `undefined` lanza un `TypeError` en ejecución**, y TypeScript lo detecta antes con el error "is possibly 'undefined'".
- **`?.` lee solo si lo de la izquierda existe;** si no, la expresión da `undefined` sin error, y su tipo incluye `undefined`.
- **`??` da un valor de respaldo solo cuando lo de la izquierda es `null` o `undefined`**; combinado con `?.` produce un tipo sin `undefined`.
- **`||` reemplaza cualquier valor falsy (`0`, `""`, `false`), `??` solo `null` y `undefined`:** para valores por defecto, `??`.
- `?.` y `??` son de JavaScript y protegen en ejecución.
- **`!` es solo de TypeScript, se borra al compilar y no comprueba nada:** apaga el error de compilación, y si la afirmación es falsa el error aparece en ejecución.
- La alternativa a `!` que sí comprueba es un `if`: dentro de él, TypeScript sabe que el valor existe (*narrowing*, que se estudia a fondo en M5).

---
[[02_opcionales-y-readonly|← anterior]] · [[00_indice|índice]] · [[04_type-vs-interface|siguiente →]]
