---
tema: M2 — Tipos básicos e inferencia
workspace: typescript
seccion: 3
titulo: "Cuándo anotar vs callarse"
estado: en progreso
prev: 02_inferencia
next: 04_arrays-y-tuplas
---

# 🟦 Cuándo anotar vs callarse

> **La pregunta al escribir TypeScript no es *"¿qué tipo le pongo a esto?"*, sino *"¿hace falta que yo diga algo aquí?"*.**
>
> La sección anterior mostró que TypeScript deduce casi todo. Esta da el criterio para decidir cuándo escribir la anotación de todas formas — y cuándo escribirla estorba.

## Los tres casos donde SÍ hay que anotar

Son los sitios donde la inferencia no puede llegar. En estos no es opcional.

### 1. Parámetros de una función

```ts
function aplicarDescuento(precio, porcentaje) {
  // ❌ Parameter 'precio' implicitly has an 'any' type.
}

function aplicarDescuento(precio: number, porcentaje: number) {
  // ✅
}
```

Ya sabes el porqué: no hay valor del que deducir hasta que alguien llame a la función.

### 2. Variables declaradas sin valor inicial

```ts
let respuesta            // any — sin protección
let respuesta: string    // ✅
```

### 3. Cuando el valor inicial **no representa** el tipo real

Este es el que se pasa por alto. A veces sí hay valor inicial, pero ese valor no dice nada útil sobre lo que la variable va a guardar de verdad:

```ts
const items = []
// TypeScript no tiene de dónde deducir qué va adentro

const items: string[] = []
// ✅ ahora sí: es una lista de textos que empieza vacía
```

⚠️ Pasa el mouse por encima del primer `items` para ver qué tipo le puso TypeScript. Es de los resultados que sorprenden, y depende de si es `const` o `let`.

El mismo caso con un objeto que arranca vacío o en `null`:

```ts
let usuarioActual = null
// el valor inicial no describe lo que esta variable va a contener

let usuarioActual: Usuario | null = null
// ✅ ahora sí dice la verdad: a veces hay usuario, a veces no
```

> 🎯 **La regla de los tres:** hay que anotar **cuando TypeScript no tiene de dónde deducir**, o cuando lo que tiene delante **le miente**. En todo lo demás, la inferencia gana.

## Los casos donde anotar ayuda aunque no obligue

Aquí no hay error si te callas — pero la anotación aporta algo real.

### El retorno de las funciones que otros usan

Aunque el retorno se infiera perfectamente, anotarlo cambia **dónde aparece el error** si te equivocas:

```ts
// Sin anotar el retorno
function resumenPedido(items: Item[]) {
  return items.length          // ups: querías devolver el resumen, no un conteo
}

const resumen = resumenPedido(pedido)
resumen.total                  // ❌ el error salta AQUÍ, en quien la usa
```

```ts
// Anotando el retorno
function resumenPedido(items: Item[]): { total: number; cantidad: number } {
  return items.length          // ❌ el error salta AQUÍ, dentro de la función
}
```

> 💡 **Tip:** la anotación del retorno funciona como una **promesa que se verifica adentro**. Sin ella, el error viaja hasta el primero que llame a la función, y ahí es más difícil ver qué pasó. En funciones internas de tres líneas no vale la pena; en las que otros archivos importan, sí.

### Objetos de configuración y constantes exportadas

Cuando algo cruza de un archivo a otro, la anotación deja escrito el contrato:

```ts
export const configPorDefecto: ConfigApp = {
  reintentos: 3,
  timeoutMs: 5000,
}
```

Sin la anotación funciona igual, pero nadie sabe qué forma se espera ahí — y si le falta un campo, el error aparecerá lejos.

## Los casos donde anotar estorba

### Valores obvios

```ts
const nombre: string = "Erick"     // ⚠️ TypeScript ya lo sabía
const nombre = "Erick"             // ✅
```

No aporta seguridad — solo algo más que mantener el día que el valor cambie.

### Y el peor: anotar **más ancho** de lo que TypeScript dedujo

Este no es solo ruido: **destruye información**.

```ts
const moneda = "PEN"               // tipo: "PEN"   ← preciso
const moneda: string = "PEN"       // tipo: string  ← acabas de perder la precisión
```

Al escribir `: string` le dijiste a TypeScript *"trátalo como cualquier texto"*, y él tenía algo mejor. Es exactamente lo contrario de lo que creías estar haciendo al ser explícito.

> ⚠️ **Cuidado:** este es el error de quien viene de un lenguaje donde anotar todo era obligatorio. En TypeScript, **una anotación puede ser peor que ninguna** — porque sustituye lo que el compilador dedujo por lo que tú escribiste, y muchas veces él tenía razón.

## La tabla de decisión

| Situación | ¿Anotar? | Por qué |
|-----------|:--------:|---------|
| Parámetro de función | **Sí** | No hay valor del que deducir |
| Variable sin valor inicial | **Sí** | Ídem |
| Valor inicial vacío o `null` | **Sí** | El valor está, pero no describe lo real |
| Retorno de función que otros importan | **Conviene** | El error aparece dentro y no en quien la llama |
| Constante exportada / configuración | **Conviene** | Deja escrito el contrato que cruza archivos |
| Variable con valor claro | **No** | TypeScript ya lo dedujo, igual de bien |
| Retorno de función interna y corta | **No** | Se infiere, y anotarlo es mantenimiento extra |
| Con un tipo más ancho del inferido | **Nunca** | Pierdes precisión que ya tenías |

> 🎯 **La regla que resume la tabla:** **anota en las fronteras, cállate en el interior.** Lo que entra a una función y lo que sale hacia otros archivos merece estar escrito; lo que ocurre adentro, TypeScript lo sigue solo.

## Por qué anotar de más es tan malo como anotar de menos

Es la pregunta que da nombre a esta sección, y los dos extremos fallan por motivos distintos:

**Anotar de menos** deja agujeros de `any` — puntos donde el compilador se apaga y no te avisa de nada. El daño es evidente.

**Anotar de más** hace tres cosas, y ninguna es evidente:

- **Duplica el mantenimiento.** Cada anotación que sobra es una línea más que actualizar cuando el valor cambie. Y si te olvidas de una, tienes una anotación que miente.
- **Pierde precisión**, como acabas de ver con `const moneda: string = "PEN"`.
- **Esconde las anotaciones que sí importan.** Si todo está anotado, no hay forma de distinguir de un vistazo cuáles cargan información real — las de las fronteras — y cuáles son ruido. La señal se pierde en el volumen.

> 💡 **En la práctica:** escribe primero sin anotar nada más que los parámetros. Deja que el editor te muestre lo que dedujo. Y agrega anotaciones solo donde TypeScript se queje o donde quieras fijar un contrato a propósito.

Ahora bien, todo lo visto hasta aquí trabaja con valores sueltos. Falta el caso más común de todos en código real — **colecciones**: listas de cosas, y una variante suya que casi nadie usa bien. Eso es lo que viene.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- La pregunta correcta no es *"¿qué tipo le pongo?"* sino **"¿hace falta que yo diga algo aquí?"**.
- **Anota siempre en tres sitios:** parámetros, variables sin valor inicial, y variables cuyo valor inicial no describe lo real (`[]`, `null`).
- **Conviene anotar el retorno de las funciones que otros importan:** hace que el error aparezca *dentro* de la función y no en quien la llama.
- **Anotar con un tipo más ancho del inferido destruye información.** `const moneda: string = "PEN"` es peor que no anotar nada.
- La regla que lo resume todo: **anota en las fronteras, cállate en el interior.**

---
[[02_inferencia|← anterior]] · [[00_indice|índice]] · [[04_arrays-y-tuplas|siguiente →]]
