---
tema: M2 — Tipos básicos e inferencia
workspace: typescript
seccion: 1
titulo: "Primitivos y anotación"
estado: finalizada
prev: null
next: 02_inferencia
---

# 🟦 Primitivos y anotación

> **Una anotación de tipo son los dos puntos y el tipo que van después del nombre: `: number`.**
>
> Es prácticamente lo único que TypeScript le agrega a la sintaxis de JavaScript. Todo lo demás que escribas en un `.ts` es JavaScript de siempre.

El M1 fue sobre la maquinaria: qué hace TypeScript, cuándo lo hace y qué queda al ejecutar. Aquí empieza el lenguaje, y lo primero es la pieza más pequeña de todas: cómo se escribe esa anotación para el tipo más simple, *"esto es un número"*.

**Sintaxis:**

```ts
let nombreVariable: Tipo = valor
```

**Ejemplo:**

```ts
let edad: number = 30
let nombre: string = "Erick"
let activo: boolean = true
```

Quítale las tres anotaciones a ese ejemplo y tienes JavaScript válido. Eso es todo lo que cambió.

## Los tipos primitivos

Son los tipos de dato básicos, los que no están hechos de otros:

| Tipo | Qué guarda | Ejemplo |
|------|------------|---------|
| `string` | Texto | `"Erick"`, `` `Hola ${nombre}` `` |
| `number` | **Cualquier número**: enteros y decimales | `30`, `19.9`, `-4` |
| `boolean` | Verdadero o falso | `true`, `false` |
| `null` | La ausencia deliberada de valor | `null` |
| `undefined` | Algo que no se ha asignado | `undefined` |

Dos observaciones que ahorran confusión:

> 🔑 **No existen `int` ni `float`.** Si vienes de otros lenguajes los vas a buscar y no están: JavaScript tiene **un solo tipo numérico**, y TypeScript lo hereda tal cual. `30` y `19.9` son ambos `number`.

> 📝 **Nota:** existen dos primitivos más — `bigint` (para números enormes) y `symbol` (para claves únicas de objeto). Se nombran aquí para que los reconozcas si los ves; **no los vas a usar** y quedan fuera del temario.

### Estos no son todos los tipos que existen

Los primitivos son los **ladrillos básicos**, no el inventario completo. Después de los dos puntos puede ir bastante más que `string` o `number`:

| Qué puedes poner como tipo | Ejemplo | Dónde se ve |
|----------------------------|---------|-------------|
| Un primitivo | `string`, `number`, `boolean` | Esta sección |
| Una **lista** de algo | `string[]` | Sección 4 |
| Los cuatro **especiales** | `any`, `unknown`, `never`, `void` | Sección 5 |
| Uno **entre varios tipos** | `string \| null` | Sección 6 |
| Un **valor exacto** | `"oscuro"`, `5` | Sección 7 |
| La **forma de un objeto** | `{ nombre: string }` | M3 |

Sí, leíste bien la cuarta fila: **un valor puede ser un tipo**. `let tema: "oscuro"` es válido, y significa *"esta variable solo puede contener ese texto exacto"*. Es raro al principio y tiene su propia sección — por ahora quédate con que existe.

## Dónde se ponen las anotaciones

En tres lugares, y siempre con la misma forma — dos puntos y el tipo:

```ts
// 1. En una variable
let precio: number = 120

// 2. En los parámetros de una función
function aplicarDescuento(precio: number, porcentaje: number) { }

// 3. En lo que la función devuelve  ← ojo dónde va: después del paréntesis
function aplicarDescuento(precio: number, porcentaje: number): number {
  return precio * (1 - porcentaje / 100)
}
```

De los tres, **el de los parámetros es el que casi nunca puedes omitir**. La razón la verás en la sección siguiente: TypeScript puede deducir el tipo de una variable mirando su valor, pero un parámetro no tiene valor hasta que alguien llama a la función — así que no hay nada de dónde deducirlo.

## Una anotación no convierte: verifica

Este es el malentendido que conviene desactivar temprano.

```ts
let edad: number = "30"
// ❌ Type 'string' is not assignable to type 'number'.
```

TypeScript **no convierte** ese `"30"` en el número `30`. Lo que hace es comparar lo que prometiste con lo que pusiste, ver que no coinciden y detenerte.

> 🎯 **Idea clave:** la anotación es una **promesa que el compilador verifica**, no una instrucción que transforma el dato. Si necesitas convertir de verdad, eso es JavaScript corriendo — `Number("30")` — y ocurre en runtime, no al anotar.

Es coherente con todo el M1: la anotación se borra al compilar, así que **no puede hacer nada al ejecutar**. Difícilmente va a convertir algo si para entonces ya no existe.

## Cuidado con las mayúsculas

Un error que da mensajes muy confusos la primera vez:

```ts
let nombre: string = "Erick"    // ✅ correcto
let nombre: String = "Erick"    // ⚠️ compila, pero no es lo que quieres
```

`string` en minúscula es **el tipo primitivo**, el que usas siempre. `String` con mayúscula es el objeto envoltorio de JavaScript, una cosa distinta y más grande que casi nunca necesitas. Lo mismo con `number`/`Number` y `boolean`/`Boolean`.

> 💡 **Regla simple:** en las anotaciones, los tipos primitivos van **siempre en minúscula**. Si escribiste una mayúscula, está mal aunque compile.

## Y ahora la parte importante

Todo lo de arriba es cómo se escribe una anotación. Pero mira este ejemplo otra vez:

```ts
let edad: number = 30
```

Ese `: number` **está de más**. TypeScript ve el `30` y ya sabe perfectamente que es un número; no necesitaba que se lo dijeras. Escribirlo no aporta nada y hay que mantenerlo si el valor cambia.

Saber cuáles de tus anotaciones sobran — y qué tipo exactamente deduce TypeScript cuando te callas, que a veces no es el que esperas — es lo que viene.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- Una **anotación de tipo** son los dos puntos y el tipo después del nombre (`: number`). Es prácticamente lo único que TypeScript le agrega a la sintaxis de JavaScript.
- Los primitivos que vas a usar son `string`, `number`, `boolean`, `null` y `undefined`. **No existen `int` ni `float`**: hay un solo tipo numérico.
- Se anotan tres cosas: variables, parámetros y retorno. **El de los parámetros es el que casi nunca puedes omitir**, porque no hay valor del que deducirlo.
- **Una anotación verifica, no convierte.** `let edad: number = "30"` no transforma nada: falla. Convertir es JavaScript en runtime (`Number("30")`).
- Los primitivos van **en minúscula**. `String` con mayúscula es otra cosa y casi nunca es lo que quieres.

---
[[00_indice|índice]] · [[02_inferencia|siguiente →]]
