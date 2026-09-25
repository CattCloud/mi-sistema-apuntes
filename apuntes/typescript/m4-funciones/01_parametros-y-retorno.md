---
tema: M4 — Funciones
workspace: typescript
seccion: 1
titulo: Parámetros y retorno
estado: finalizada
prev: null
next: 02_opcionales-default-y-rest
---

# 🟦 Parámetros y retorno

> **Los parámetros se anotan casi siempre; el retorno casi nunca hace falta anotarlo.**
>
> TypeScript puede leer el cuerpo de una función y deducir qué devuelve, pero no tiene de dónde deducir qué recibe.

## Los dos lugares donde se anota una función

> **Una función tiene dos lugares donde se puede escribir un tipo: después de cada parámetro y después de la lista de parámetros.**
>
> El primero describe lo que entra; el segundo, lo que sale.

**Sintaxis:**

```ts
function nombre(parametro: TipoDeEntrada): TipoDeSalida {
  // cuerpo
}
```

**Ejemplo:**

```ts
function saludar(nombre: string): string {
  return `Hola ${nombre}`
}
```

En una arrow function los dos lugares son los mismos, solo cambia dónde empieza el cuerpo:

```ts
const saludar = (nombre: string): string => `Hola ${nombre}`
```

> 📝 **Nota:** anotar el retorno es opcional en ambas formas. Si borras `: string` de cualquiera de los dos ejemplos, siguen compilando igual.

## Por qué los parámetros sí y el retorno no

> **El retorno se infiere porque TypeScript puede leer el cuerpo; los parámetros no se infieren porque son la entrada, y no hay nada anterior de dónde leerlos.**

Cuando escribes el cuerpo de una función, ya le diste al compilador todo lo que necesita para saber qué sale de ella: puede seguir las operaciones y quedarse con el tipo del resultado.

```ts
function doble(n: number) {
  return n * 2 // TypeScript deduce: doble devuelve number
}
```

Con los parámetros no tiene esa ventaja. Conviene separar aquí dos palabras que solemos usar como sinónimos y no lo son: los **parámetros** son los huecos que escribes al declarar la función, y los **argumentos** son los valores concretos que le pasas al llamarla. La razón de la asimetría está justo en esa frontera: **la inferencia de una función se hace dentro de su declaración**, no en los lugares que la llaman. Cuando TypeScript lee `function doble(n)`, el parámetro todavía no tiene ningún valor — es un hueco que se llenará en cada llamada, y el compilador no va a recorrer todas las llamadas para adivinar qué cabe ahí. Si no se lo dices tú, no lo sabe.

Por eso, con `strict` activado —la opción de `tsconfig.json` que obliga a anotar lo que el compilador no puede deducir (→ **M1 · Por qué TypeScript y cómo corre**)—, un parámetro sin anotar es un error, no una advertencia:

```ts
function doble(n) {
  //           ^ Parameter 'n' implicitly has an 'any' type.
  return n * 2
}
```

El compilador te está diciendo algo preciso: *"no puedo saber qué es `n`, así que tendría que tratarlo como `any` — y `any` apaga mi trabajo"*. Prefiere detenerse a mentirte.

> 🔑 **Matiz:** existe un caso donde sí se pueden omitir las anotaciones de los parámetros, y es cuando la función se pasa como argumento a otra función que ya declara qué va a recibir. Por ejemplo, `array.map` declara que le pasará un elemento del array a la función que le des, así que TypeScript deduce el parámetro desde ahí. Ese mecanismo se llama **tipado contextual** y se estudia en la **sección 3 de este módulo**, al tipar callbacks. Para una función que declaras por tu cuenta, la regla es la de arriba: se anotan.

## Cuándo el retorno no hace falta

Si el retorno se infiere solo, escribirlo es repetir lo que el compilador ya calculó. Pasar el mouse por encima del nombre de la función en el editor te muestra el tipo inferido, así que tampoco lo escribes "para documentar".

Hay un caso particular que conviene reconocer: **una función que no devuelve ningún valor infiere `void`**.

```ts
function registrar(mensaje: string) {
  console.log(mensaje) // sin return con valor: el tipo inferido es void
}
```

> 🔑 **Matiz — cuándo se infiere `never` en vez de `void`:** en → **M2 · Tipos básicos e inferencia** quedó dicho que `never` describe una función que **nunca devuelve el control a la línea siguiente de quien la llamó** —porque siempre lanza un error, cierra el programa o se queda en un bucle infinito—, y que escribiéndola como `function fallar(m: string) { throw new Error(m) }` TypeScript infiere `void`, no `never`. La forma que sí lo infiere sola es **la función escrita como expresión y asignada a una variable**:
>
> ```ts
> function fallarDeclarada(mensaje: string) {
>   throw new Error(mensaje)
> }
> // retorno inferido: void
>
> const fallar = (mensaje: string) => {
>   throw new Error(mensaje)
> }
> // retorno inferido: never
> ```
>
> Es una asimetría del compilador, no una regla con lógica detrás: en la declaración conserva `void` por compatibilidad con código antiguo. La consecuencia práctica es que si escribes la función con `function` y necesitas `never`, tienes que anotarlo a mano.

## Cuándo el retorno sí conviene anotarse

> **Anotar el retorno no es cuestión de estilo: cambia el lugar donde aparece el error.**
>
> Con la anotación, el compilador reclama dentro de la función que se equivocó. Sin ella, reclama donde alguien usa el resultado.

Imagina una función que, por un descuido, deja de devolver lo que prometía:

```ts
function obtenerNombre(usuario: { nombre: string }) {
  return usuario // ⚠️ el descuido: devolvió el objeto entero, no el nombre
}

const nombre = obtenerNombre({ nombre: "Erick" })
console.log(nombre.toUpperCase()) // ← el error explota AQUÍ
```

Sin anotación, TypeScript infiere obedientemente que la función devuelve un objeto. No hay error dentro de la función, porque la función no prometió nada. El reclamo aparece donde alguien intenta usar el resultado, que puede estar en otro archivo y a semanas de distancia del descuido.

Con la anotación puesta, la queja llega donde está el problema:

```ts
function obtenerNombre(usuario: { nombre: string }): string {
  return usuario // ← el error explota AQUÍ, donde se cometió
  //     ^ Type '{ nombre: string; }' is not assignable to type 'string'.
}
```

En otras palabras: anotar el retorno convierte a la función en una promesa que el compilador vigila. Sin anotar, la función no promete nada — solo informa de lo que resultó.

De ahí sale la tabla de decisión:

| Situación | Qué hacer | Por qué |
|---|---|---|
| Función corta, de uso interno, cuyo retorno es obvio | Dejar que se infiera | Escribirlo solo repite lo que el editor ya muestra |
| Función que otros módulos consumen | Anotar | Si el cuerpo cambia y deja de devolver lo prometido, el error aparece en la función y no en el archivo que la importa |
| Función recursiva cuyo retorno depende de su propia llamada | Anotar | El compilador no puede cerrar ese círculo —necesitaría el tipo para calcular el tipo— y exige la anotación |
| El tipo inferido no es el que querías | Anotar | Es la forma de decirle al compilador cuál es la intención, no el accidente |

> 💡 **Regla práctica para el día a día:** anota siempre lo que entra; deja que se infiera lo que sale, salvo que la función sea una frontera que otros van a usar. Ahí, escribe el contrato.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- Los parámetros de una función se anotan casi siempre, porque son la entrada y el compilador no tiene nada anterior de dónde deducirlos.
- El tipo de retorno se infiere leyendo el cuerpo de la función, así que escribirlo suele ser opcional.
- Con `strict` activado, un parámetro sin anotar es un error, porque el compilador tendría que tratarlo como `any` y eso apagaría su trabajo.
- Una función que no devuelve ningún valor tiene tipo de retorno `void`, y TypeScript lo infiere solo.
- Una función escrita como expresión que siempre lanza un error infiere `never`, mientras que la misma función escrita con `function` infiere `void` y obliga a anotar `never` a mano.
- Anotar el retorno cambia dónde aparece el error: dentro de la función que se equivocó, en vez de donde alguien usa su resultado.
- Conviene anotar el retorno cuando la función es una frontera que otros módulos consumen, cuando es recursiva, o cuando el tipo inferido no es el que querías.

---

[[00_indice|índice]] · [[02_opcionales-default-y-rest|siguiente →]]
