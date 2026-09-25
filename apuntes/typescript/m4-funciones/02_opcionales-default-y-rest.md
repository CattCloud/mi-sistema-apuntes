---
tema: M4 — Funciones
workspace: typescript
seccion: 2
titulo: Opcionales, default y rest
estado: finalizada
prev: 01_parametros-y-retorno
next: 03_tipar-callbacks
---

# 🟦 Opcionales, default y rest

> **Dos formas de decir que un parámetro puede faltar —`?` y un valor por defecto— y una tercera, rest, para cuando lo que no sabes es cuántos valores te van a pasar.**
>
> Se escriben parecido y cambian cosas distintas dentro de la función: cuál de las tres eliges decide si hay que comprobar el valor antes de usarlo.

## El parámetro opcional: `?`

> **Un signo de interrogación después del nombre declara que ese valor se puede omitir al llamar la función.**

**Sintaxis:**

```ts
function nombre(requerido: Tipo, opcional?: Tipo) { }
```

**Ejemplo:**

```ts
function saludar(nombre: string, titulo?: string) {
  // titulo puede no haber llegado
}

saludar("Erick")            // válido
saludar("Erick", "Ing.")    // también válido
```

Lo importante es qué pasa **dentro** de la función: si el argumento se puede omitir, entonces el parámetro puede no tener valor, y TypeScript lo refleja en su tipo. Dentro de `saludar`, `titulo` no es `string`: es `string | undefined`.

Eso significa que no puedes usarlo directamente como si fuera un texto, y el compilador te frena:

```ts
function saludar(nombre: string, titulo?: string) {
  return `Hola ${titulo.toUpperCase()} ${nombre}`
  //             ^ 'titulo' is possibly 'undefined'
}
```

Para leerlo sin que truene se usa `??`, el operador que entrega el valor de su derecha cuando el de su izquierda es `null` o `undefined` (se estudió en → **M3 · Objetos y tipado estructural**):

```ts
function saludar(nombre: string, titulo?: string) {
  return `Hola ${titulo ?? "estimado"} ${nombre}` // ?? pone un valor cuando no vino nada
}
```

## El valor por defecto: `=`

> **Un valor por defecto va un paso más allá: no solo permite omitir el valor al llamar, sino que pone uno en su lugar cuando falta.**

**Sintaxis:**

```ts
function nombre(parametro: Tipo = valorPorDefecto) { }
```

**Ejemplo:**

```ts
function saludar(nombre: string, titulo = "estimado") {
  return `Hola ${titulo} ${nombre}` // titulo siempre tiene algo
}

saludar("Erick") // "Hola estimado Erick"
```

Fíjate en dos cosas de ese ejemplo. La primera: **no se anotó el tipo de `titulo`**, y no hace falta, porque el valor por defecto ya lo dice — TypeScript infiere `string` de `"estimado"`, igual que infiere el tipo de cualquier variable inicializada (→ **M2 · Tipos básicos e inferencia**).

La segunda, que es la que más se usa en el día a día: **dentro de la función, un parámetro con valor por defecto nunca es `undefined`**. Su tipo es `string` a secas, no `string | undefined`. Por eso no hay nada que comprobar antes de usarlo.

> 🔑 **Matiz — `undefined` sí dispara el valor por defecto, `null` no.** Con la firma de arriba, `saludar("Erick", undefined)` devuelve *"Hola estimado Erick"*: omitir el valor y pasar `undefined` son lo mismo. Con `null` no: en JavaScript el valor por defecto no se aplica y `null` se usa tal cual. En TypeScript ni siquiera llegas a probarlo, porque el tipo del parámetro quedó en `string` y el compilador rechaza la llamada. Para admitirlo tendrías que declarar `titulo: string | null = "estimado"`, y entonces `titulo` valdría `null` adentro.

## `?` o `=`: cuál de los dos

Los dos permiten omitir el argumento. La diferencia está en quién se hace cargo de la ausencia:

| | `titulo?: string` | `titulo = "estimado"` |
|---|---|---|
| Tipo dentro de la función | `string \| undefined` | `string` |
| ¿Hay que comprobarlo antes de usarlo? | Sí | No |
| Quién decide qué pasa si falta | Cada trozo de código que lo lea | La función, una sola vez, en su firma |
| Cuándo conviene | La ausencia **significa algo** y se maneja distinto | Existe un valor razonable para seguir adelante |

> 💡 **Tip:** si al leer tu función encuentras un `??` justo después de un parámetro opcional, casi siempre ese parámetro debió declararse con valor por defecto. Es la misma decisión, escrita más tarde y repetida en cada uso.

También hay un límite que conviene conocer antes de chocar con él: **no se pueden combinar**. Poner `?` y un valor por defecto a la vez es un error, porque son dos respuestas a la misma pregunta.

```ts
function saludar(nombre: string, titulo?: string = "estimado") { }
//                               ^ Parameter cannot have question mark and initializer
```

> 📝 **Nota — `?` en un parámetro frente a `| undefined`:** en un objeto, `edad?: number` y `edad: number | undefined` no son lo mismo (→ **M3 · Objetos y tipado estructural**): el primero permite que la propiedad no exista, y el segundo obliga a escribirla aunque sea vacía. En los parámetros aplica la misma distinción: con `titulo?: string` se puede llamar `saludar("Erick")`, mientras que con `titulo: string | undefined` hay que escribir `saludar("Erick", undefined)`. El `?` habla de **poder omitir**; la unión con `undefined` habla del **valor que llega**.

## Rest: cuando no sabes cuántos argumentos van a llegar

Necesitas una función que registre mensajes: a veces le pasas uno, a veces tres, y no hay forma de saber cuántos de antemano. Con lo visto hasta aquí solo te quedan dos salidas, y las dos son malas. La primera es declarar un puñado de parámetros opcionales —`(a?: string, b?: string, c?: string)`— y confiar en que nadie necesite un cuarto: el límite es inventado y dentro de la función tienes que comprobar los tres uno por uno. La segunda es obligar a quien llama a armar el array él mismo, `registrar(["falló", "reintento"])`, que traslada el trabajo a cada una de las llamadas.

JavaScript tiene una tercera salida, `arguments`, un objeto que aparece dentro de toda función declarada con `function` y contiene lo que se le pasó. Pero no es un array de verdad —no tiene `map` ni `reduce`— y sus elementos son `any`, así que TypeScript no revisa nada de lo que hay dentro.

> **Un parámetro rest recoge en un array todos los argumentos que se pasaron de más.**
>
> Se escribe con tres puntos antes del nombre y su tipo es el de un array, porque lo que recoge son varios valores. Resuelve las tres salidas anteriores de una vez: no hay límite inventado, quien llama escribe los argumentos sueltos, y lo que llega adentro es un array normal y tipado.

> 🎯 **Idea clave — lo que varía está en la llamada, no en la declaración.** Aquí se ve por qué convenía separar parámetro de argumento: `registrar(nivel: string, ...mensajes: string[])` declara siempre dos parámetros, y eso está escrito y no cambia nunca. Lo que cambia de una llamada a otra es **cuántos argumentos recibe**. Rest no hace variable a la función: hace variable lo que puede llegarle.

**Sintaxis:**

```ts
function nombre(...resto: Tipo[]) { }
```

**Ejemplo:**

```ts
function sumar(...numeros: number[]) {
  return numeros.reduce((total, n) => total + n, 0)
}

sumar()           // 0   → numeros es []
sumar(1, 2, 3)    // 6   → numeros es [1, 2, 3]
```

> ⚠️ **Cuidado:** el tipo que se anota es el del **array**, no el de cada argumento suelto. Se escribe `...numeros: number[]`, no `...numeros: number`. Es el error de escritura más común con rest, y el mensaje del compilador —*"A rest parameter must be of an array type"*— te lo dice literalmente.

Un rest puede convivir con parámetros normales, siempre que vaya al final:

```ts
function registrar(nivel: string, ...mensajes: string[]) { }

registrar("info")                     // mensajes es []
registrar("error", "falló", "reintento") // mensajes es ["falló", "reintento"]
```

### Rest o un parámetro array

Lo anterior también se resuelve declarando un parámetro normal de tipo array, y conviene saberlo porque **dentro de la función no hay ninguna diferencia**: en los dos casos el tipo es `number[]` y se recorre igual.

```ts
function sumarRest(...numeros: number[]) { }
function sumarArray(numeros: number[]) { }

sumarRest(1, 2, 3)      // los valores sueltos
sumarArray([1, 2, 3])   // el array ya armado
```

La diferencia está entera en el sitio de la llamada, así que para elegir hay que preguntarse de dónde vienen los valores.

> 🔑 **Matiz — los mismos tres puntos hacen lo contrario según el lado.** En una declaración, `...numeros` **recoge** argumentos sueltos y los mete en un array: eso es rest. En una llamada, `sumarRest(...misNumeros)` **desarma** un array en argumentos sueltos, y se llama **spread**. Mismo símbolo, lados opuestos de la función.

| Si los valores… | Conviene | Por qué |
|---|---|---|
| se escriben sueltos a mano en cada llamada | rest | Ahorra los corchetes cada vez. Es lo que hacen `console.log("a", "b")` o `Math.max(1, 2, 3)` |
| ya vienen juntos en una variable | parámetro array | Con rest habría que escribir `sumarRest(...misNumeros)` para desarmar el array y que la función lo vuelva a armar |

Y hay dos límites del rest que un parámetro array no tiene:

- **Nada puede ir después de un rest.** Un parámetro array se declara donde quieras y admite más parámetros detrás.
- **Rest no distingue "no me pasaron nada" de "me pasaron una lista vacía".** `sumarRest()` y `sumarRest(...[])` llegan las dos como `[]`. Con un parámetro array opcional sí se pueden diferenciar.

> 💡 **Tip — cuándo rest es la herramienta equivocada:** todos los argumentos que recoge tienen que significar **lo mismo** (un número más a sumar, un mensaje más a registrar). Si cada posición significara algo distinto —un nombre, una edad, un correo—, rest los mete en el mismo array y pierde esa distinción. Ahí van parámetros con nombre propio, o un objeto.

## El orden en que se declaran

Los tres tipos de parámetro conviven, pero no en cualquier orden. Este es el orden recomendado:

```text
(  requeridos  →  opcionales o con default  →  ...rest  )
```

La regla dura es una: **un parámetro requerido no puede ir después de uno opcional**. Tiene sentido si lo piensas desde quien llama: los argumentos se emparejan por posición, así que si el hueco de en medio se puede saltar, ya no hay forma de saber a qué parámetro corresponde lo que viene después.

```ts
function malo(titulo?: string, nombre: string) { }
//                             ^ A required parameter cannot follow an optional parameter
```

> 🔑 **Matiz:** con un valor por defecto sí se permite escribir `function raro(titulo = "estimado", nombre: string) {}`, pero quien la llame queda obligado a pasar `raro(undefined, "Erick")` para llegar al segundo. Compila, pero deja una llamada incómoda: si te ves escribiendo `undefined` como argumento, el orden de los parámetros está mal pensado.

La segunda regla dura es la del rest: va siempre al final, porque recoge todo lo que quede. El compilador la dice igual de directo — *"A rest parameter must be last in a parameter list."*

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- Un parámetro marcado con `?` se puede omitir al llamar, y por eso dentro de la función su tipo incluye `undefined`.
- Un parámetro con valor por defecto también se puede omitir, pero dentro de la función nunca es `undefined`, así que no hay nada que comprobar antes de usarlo.
- El valor por defecto se dispara cuando el argumento falta o llega `undefined`, y para poder pasar `null` habría que declararlo en el tipo del parámetro, en cuyo caso el valor por defecto ya no se aplica.
- No se puede poner `?` y un valor por defecto al mismo parámetro, porque son dos respuestas a la misma pregunta.
- Un parámetro rest recoge los argumentos sobrantes en un array, se anota como array y va siempre al final: el número de parámetros declarados sigue fijo, y lo que varía es cuántos argumentos llegan en cada llamada.
- Rest y un parámetro de tipo array son idénticos dentro de la función, así que la elección depende de si los valores se escriben sueltos o ya vienen juntos en una variable.
- Un parámetro requerido no puede declararse después de uno opcional, porque los argumentos se emparejan por posición.

---

[[01_parametros-y-retorno|← anterior]] · [[00_indice|índice]] · [[03_tipar-callbacks|siguiente →]]
