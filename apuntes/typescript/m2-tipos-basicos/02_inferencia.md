---
tema: M2 — Tipos básicos e inferencia
workspace: typescript
seccion: 2
titulo: "Inferencia"
estado: finalizada
prev: 01_primitivos-y-anotacion
next: 03_cuando-anotar
---

# 🟦 Inferencia

> **La inferencia es la capacidad de TypeScript de deducir el tipo mirando el valor que le asignas, sin que tú lo escribas.**
>
> Es la razón por la que TypeScript no se siente como estar poniendo etiquetas todo el día: la mayoría de las anotaciones no hacen falta.

```ts
let nombre = "Erick"
// TypeScript ya sabe: string
```

No pusiste `: string` y aun así el tipo quedó fijado. A partir de ahí:

```ts
nombre = "Catt"    // ✅ sigue siendo texto
nombre = 123       // ❌ Type 'number' is not assignable to type 'string'
```

> ⚠️ **Cuidado:** que no escribas el tipo **no significa que no haya tipo**. TypeScript lo dedujo y lo dejó fijo. La protección es idéntica a haberlo anotado a mano.

## La sorpresa: `const x = 5` no es `number`

Aquí está la parte que descoloca a casi todo el mundo. Mira estas dos líneas:

```ts
const a = 5    // tipo: 5
let   b = 5    // tipo: number
```

**No es un error de lectura.** El tipo de `a` es literalmente `5` — no `number`, sino el número cinco y nada más. Se llama **literal type**: un tipo que contiene un único valor posible.

¿Por qué la diferencia? Por una regla de JavaScript sobre `const` y `let`:

> 🎯 **Idea clave:** una `const` **nunca se va a reasignar**, así que TypeScript sabe que ese valor será exactamente `5` durante toda la vida del programa. Puede permitirse el tipo más preciso posible. Un `let` sí puede cambiar, así que TypeScript lo **ensancha** al tipo general — `number` — para dejarte espacio.

Pasa igual con el texto:

```ts
const moneda = "PEN"    // tipo: "PEN"
let   divisa = "PEN"    // tipo: string
```

Ese ensanchamiento del `let` tiene nombre: **widening**. TypeScript toma el tipo exacto del valor y lo sube al tipo general que lo contiene.

### Y con los objetos pasa algo distinto

Aquí viene el segundo escalón, y es donde la gente se estrella:

```ts
const usuario = { rol: "admin" }
// tipo: { rol: string }     ← ¡NO { rol: "admin" }!
```

La variable `usuario` es `const`, sí — pero eso solo significa que **no puedes reasignar `usuario` completo**. Sus propiedades sí se pueden cambiar:

```ts
usuario = { rol: "otro" }    // ❌ no puedes reasignar la const
usuario.rol = "otro"         // ✅ esto JavaScript sí lo permite
```

Como la propiedad puede cambiar, TypeScript la ensancha a `string`. La `const` protegía la variable, no lo que hay adentro.

> 💡 **Tip:** esa distinción explica una clase entera de errores del tipo *"esperaba tal valor exacto y recibió `string`"*. Cuando aparezca, la pregunta es: **¿el valor está en una `const` directa, o dentro de un objeto?** Hay una forma de pedirle a TypeScript que conserve el tipo exacto también en el interior del objeto, `as const`, y se estudia en la sección 7 (Literal types y `as const`).

### ¿Y el literal type cambia algo de cómo funciona el `const`?

No. **No cambia absolutamente nada del comportamiento.** Los tipos se borran al compilar (M1, sección 2), así que `const a = 5` produce el mismo JavaScript con o sin TypeScript. El literal type existe **solo para que el compilador se guíe**.

Y hay algo que conviene aclarar aquí, porque es la confusión natural al ver un valor escrito donde va un tipo:

#### TS compara tipos primero y luego valores o cual es prioridad?
> 🎯 **Idea clave:** **TypeScript nunca compara valores. Solo compara tipos.** Lo que despista es que un valor puede ser *también* un tipo — el texto `"oscuro"` aparece en dos papeles distintos, escritos igual:
>
> ```ts
> const a = "oscuro"     // aquí "oscuro" es un VALOR
> let   x: "oscuro"      // aquí "oscuro" es un TIPO
> ```
>
> Son dos mundos separados que comparten la escritura. Cuando el compilador compara, siempre está en el mundo de los tipos: nunca mira qué guarda la variable al ejecutar, porque para entonces ya no existe nada suyo ahí.

**¿Para qué sirve entonces que el tipo sea `5` y no `number`?** Para que TypeScript pueda exigir un valor exacto en vez de "cualquier número". Eso se vuelve útil de verdad al combinar varios literal types para decir *"esto solo puede ser uno de estos"*, que es lo que hacen las secciones 6 (Uniones: introducción) y 7 (Literal types y `as const`) de este módulo. Por ahora basta con que sepas que la precisión extra está ahí y no se pierde.

## Dónde infiere y dónde no

La regla de fondo es una sola: **TypeScript infiere cuando tiene un valor delante para mirar.** Si no lo hay, no puede.

| Situación | ¿Infiere? | Qué pasa |
|-----------|:---------:|----------|
| Variable con valor inicial | ✅ | Toma el tipo del valor |
| Retorno de una función | ✅ | Lo deduce de lo que devuelves |
| **Parámetro de una función** | ❌ | No hay valor del que deducir |
| Variable declarada sin valor | ❌ | Queda como `any` hasta que le asignes algo |

Los cuatro casos, en código:

### 1. Variable con valor inicial ✅

```ts
const precio = 120           // tipo: 120
let   stock = 40             // tipo: number
const activo = true          // tipo: true
const etiquetas = ["nuevo"]  // tipo: string[]

stock = "cuarenta"           // ❌ Type 'string' is not assignable to type 'number'
```

El valor está ahí, a la vista. TypeScript lo lee y fija el tipo.

### 2. Retorno de una función ✅

```ts
function multiplicar(a: number, b: number) {
  return a * b
}
// TypeScript infiere el retorno: number

const resultado = multiplicar(4, 5)
// y por lo tanto: resultado es number

resultado.toUpperCase()      // ❌ Property 'toUpperCase' does not exist on type 'number'
```

Fíjate en la cadena: anotaste **solo los dos parámetros**, y TypeScript dedujo el retorno de la función *y* el tipo de la variable que la recibe. **Una anotación, tres tipos.**

Y funciona igual con retornos que no son un cálculo:

```ts
function buscarNombre() {
  return { nombre: "Erick", edad: 30 }
}
// retorno inferido: { nombre: string; edad: number }
```

### 3. Parámetro de una función ❌

```ts
function saludar(nombre) {
  return `Hola ${nombre}`
}
// ❌ Parameter 'nombre' implicitly has an 'any' type.
```

Ya sabes por qué: cuando TypeScript lee esa función, **nadie la ha llamado todavía**. No hay ningún valor ahí de dónde deducir nada. Es el `noImplicitAny` de la sección 5 del M1 haciendo su trabajo.

```ts
function saludar(nombre: string) {   // ✅ se lo dices tú
  return `Hola ${nombre}`
}
```

> 🔑 **Matiz:** hay un caso en que un parámetro **sí** se infiere: cuando tiene valor por defecto, porque ahí sí hay un valor delante.
>
> ```ts
> function saludar(nombre = "invitado") {   // ✅ nombre: string
>   return `Hola ${nombre}`
> }
> ```

### 4. Variable declarada sin valor ❌

```ts
let valor
valor = "hola"
valor = 42        // no se queja: no había nada que fijar
```

⚠️ Sin valor inicial no hay nada que mirar, así que TypeScript lo trata como `any` y pierdes la protección. La regla práctica:

> 💡 **Si no tienes valor inicial, anota el tipo.** Es uno de los pocos casos donde la anotación es obligatoria aunque no lo parezca.

```ts
let valor: string
valor = "hola"    // ✅
valor = 42        // ❌ Type 'number' is not assignable to type 'string'
```

## Mitos sobre la inferencia

❌ **Mito:** "Si no anoto el tipo, TypeScript le pone `any`."
✅ **Realidad:** Solo cuando **no tiene de dónde deducirlo** — parámetros, o variables sin valor inicial. Con un valor a la vista, deduce y protege igual que si lo hubieras escrito.

❌ **Mito:** "Anotar siempre es más seguro."
✅ **Realidad:** Anotar de más **no agrega ninguna seguridad** — TypeScript ya lo sabía. Lo que agrega es mantenimiento: cada anotación de sobra es algo que hay que actualizar cuando el valor cambie.

❌ **Mito:** "`const x = 5` es de tipo `number`."
✅ **Realidad:** Es de tipo `5`. La `const` no se puede reasignar, así que TypeScript se queda con el tipo más preciso posible.

❌ **Mito:** "La inferencia es para prototipos; el código serio anota todo."
✅ **Realidad:** Es al revés. **La inferencia suele ser más precisa que lo que tú escribirías** — deduce `5` donde tú habrías puesto `number`. El código de las librerías buenas anota lo mínimo y deja que el compilador haga el resto.

## Lo que esto abre

La inferencia cambia la pregunta con la que escribes TypeScript. Deja de ser *"¿qué tipo le pongo a esto?"* y pasa a ser **"¿hace falta que yo diga algo aquí?"**.

Y esa pregunta tiene respuestas concretas — hay lugares donde anotar es obligatorio, otros donde es útil aunque no obligue, y otros donde estorba. Eso es lo que viene.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- **La inferencia deduce el tipo del valor.** No escribir la anotación no significa quedarse sin tipo ni sin protección.
- **`const a = 5` tiene tipo `5`, no `number`.** Como la `const` no se puede reasignar, TypeScript se queda con el tipo más preciso. Un `let` se **ensancha** al tipo general.
- **Con objetos es distinto:** `const usuario = { rol: "admin" }` da `{ rol: string }`, porque la `const` protege la variable pero **no lo que hay adentro**.
- **Los parámetros nunca se infieren** — no hay valor del que deducir hasta que alguien llame a la función. Ni las variables declaradas sin valor.
- **Anotar de más no da seguridad extra, da mantenimiento.** La inferencia suele ser más precisa que lo que tú escribirías.

---
[[01_primitivos-y-anotacion|← anterior]] · [[00_indice|índice]] · [[03_cuando-anotar|siguiente →]]
