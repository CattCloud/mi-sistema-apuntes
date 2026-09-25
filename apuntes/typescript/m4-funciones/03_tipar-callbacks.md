---
tema: M4 — Funciones
workspace: typescript
seccion: 3
titulo: Tipar callbacks
estado: finalizada
prev: 02_opcionales-default-y-rest
next: 04_sobrecargas
---

# 🟦 Tipar callbacks

Estás escribiendo una función que recibe **otra función**: un `repetir(veces, accion)` que ejecuta algo varias veces, o un buscador al que le pasas qué hacer con cada resultado. Al declarar ese parámetro te frenas, porque no es un `string` ni un objeto — es una función, y ninguna de las anotaciones de este módulo sirve para describir la forma de una función.

Dejarlo sin anotar no es opción: con `strict` activado eso es un error. Y existe un atajo que parece la solución y no lo es — anotarlo como `Function`, el tipo que TypeScript trae para decir "esto es una función". El problema es que `Function` acepta **cualquier** función, con los parámetros que sea, así que llamarla con los argumentos equivocados compila sin una queja. Y hay un daño extra: el resultado de llamarla es `any`, de modo que el descuido no se queda ahí, sino que se contagia a todo lo que toque ese valor. El compilador deja de revisar justo donde más falta hace.

> **Un tipo función describe la forma de una función —qué parámetros recibe y qué devuelve— sin decir nada de lo que hace por dentro.**
>
> Se escribe `(parametro: Tipo) => TipoDeRetorno` y se usa en cualquier lugar donde iría otro tipo.

> 📝 **El término:** se llama **callback** a la función que se pasa como argumento a otra para que esta la llame más tarde. No es una palabra de TypeScript ni una sintaxis especial: es el nombre del papel que cumple esa función.

## La sintaxis, y por qué se parece tanto a una arrow function

Esta es la confusión que hay que resolver primero, porque el tipo función y la arrow function se escriben las dos con `=>`:

```ts
// esto es un VALOR: una función que suma
const sumar = (a: number, b: number) => a + b

// esto es un TIPO: la forma de una función que suma
type Sumar = (a: number, b: number) => number
```

La diferencia está en **qué hay después de la flecha**. En un valor, después de `=>` va el cuerpo, o sea código que se ejecuta. En un tipo, después de `=>` va otro tipo: la descripción de lo que sale. Un tipo función no tiene cuerpo porque no ejecuta nada — solo describe.

> 📝 **Nota — las dos líneas dicen lo mismo, desde lados opuestos.** En JavaScript una función es un **valor**: por eso se puede guardar en una variable, pasar como argumento o devolver. Y como todo valor, en TypeScript tiene un tipo. Ese tipo es precisamente el que la segunda línea escribe a mano: al pasar el mouse por `sumar`, el editor muestra `(a: number, b: number) => number`, que es la definición de `Sumar` palabra por palabra. La diferencia es de dónde sale cada uno — el primero se deduce de un valor que ya existe, el segundo se declara sin ningún valor delante.

> ⚠️ **Cuidado con los nombres de los parámetros.** Dentro de un tipo función, el nombre de cada parámetro **es obligatorio** aunque solo sirva de documentación. Si escribes `type Manejador = (string) => void` creyendo que declaras "recibe un string", en realidad declaras un parámetro **llamado** `string` de tipo `any`, y con `strict` el compilador lo rechaza: *"Parameter 'string' implicitly has an 'any' type."* Lo correcto es `(mensaje: string) => void`.

## Recibir un callback

**Sintaxis:**

```ts
function nombre(callback: (parametro: Tipo) => TipoDeRetorno) { }
```

**Ejemplo:**

```ts
function repetir(veces: number, accion: (indice: number) => void) {
  for (let i = 0; i < veces; i++) {
    accion(i) // el compilador ya sabe que accion espera un number
  }
}
```

El nombre `indice` que aparece dentro del tipo hay que escribirlo, pero no obliga a quien pase la función a usar ese mismo nombre: puede llamar a su parámetro como quiera. Está ahí para que quien lea la firma entienda qué va a recibir.

## Tipado contextual: por qué no anotas los parámetros al pasar la función

> **Cuando escribes una función en un lugar que ya tiene un tipo esperado, TypeScript deduce los tipos de sus parámetros desde ese lugar en vez de exigírtelos.**
>
> Esa deducción se llama **tipado contextual**: el contexto en el que aparece la función le da el tipo.

En → **sección 1 de este módulo** quedó dicho que los parámetros se anotan casi siempre, con una excepción pendiente de explicar. Esta es:

```ts
repetir(3, (i) => console.log(i))
//          ^ i es number, y no hubo que escribirlo
```

Funciona porque el parámetro `accion` ya declara la forma que espera recibir, y ese es el tipo esperado que le falta a la función.

Lo que importa es **de dónde sale el tipo esperado**, no dónde escribes la función. El argumento de un parámetro tipado es un lugar con tipo esperado, pero también lo es una variable anotada:

```ts
const mostrar: (i: number) => void = (i) => console.log(i) // i es number sin anotarlo
repetir(3, mostrar)
```

> 🔑 **Matiz — dónde no hay contexto:** si declaras la función suelta y sin ninguna anotación, no hay nada que le dé el tipo esperado, y vuelve la regla de la sección 1:
>
> ```ts
> const mostrar = (i) => console.log(i)
> //               ^ Parameter 'i' implicitly has an 'any' type.
> ```
>
> La forma más cómoda de darle contexto a una función declarada aparte es anotarla con un tipo que ya tenga nombre, como se ve más abajo: `const mostrar: Manejador = (i) => ...`.

## `void` en un callback: se escribe a mano y admite funciones que devuelven valor

Aquí aparece el caso que → **M2 · Tipos básicos e inferencia** dejó anunciado: **en un callback, `void` —el tipo de retorno de una función que no entrega un valor aprovechable— hay que escribirlo**. En una función tuya el retorno se infiere del cuerpo, pero un tipo función no tiene cuerpo, así que no hay nada de donde deducirlo — si no escribes `=> void`, no hay tipo de retorno.

Y con eso viene un comportamiento que sorprende a todo el mundo la primera vez: **un callback declarado `=> void` acepta una función que sí devuelve algo**.

```ts
function repetir(veces: number, accion: (indice: number) => void) { }

const guardados: number[] = []

repetir(3, (i) => guardados.push(i)) // push devuelve number… y compila
```

No es un agujero del compilador, es deliberado. En un callback, `void` no significa *"no debes devolver nada"*, sino **"no voy a usar lo que devuelvas"**. Si significara lo primero, se rompería medio JavaScript: `array.forEach(x => guardados.push(x))` fallaría en todas partes, porque `push` devuelve un número que a nadie le importa.

La garantía sigue en pie del lado de quien recibe: dentro de `repetir`, el resultado de `accion(i)` es de tipo `void` y no se puede usar para nada. El valor se ignora, no se prohíbe.

> ⚠️ **La permisividad va en un solo sentido.** Que `=> void` acepte una función que devuelve algo no significa que la regla funcione al revés. Si el tipo pide un valor y la función no lo entrega, falta algo que se prometió y el compilador lo rechaza:
>
> ```ts
> const doble: (i: number) => number = (i) => { console.log(i) }
> //    ^ Type 'void' is not assignable to type 'number'.
> ```

## Darle nombre al tipo

> **Cuando la misma forma de función aparece en varios sitios, se le pone nombre con `type` y se reutiliza.**

Es el mismo `type` con el que se nombra la forma de un objeto en → **M3 · Objetos y tipado estructural**, solo que aquí lo que se nombra es una firma:

```ts
type Manejador = (evento: string) => void

function alIniciar(m: Manejador) { }
function alTerminar(m: Manejador) { }
```

> 💡 **Tip:** si una firma aparece dos veces, dale nombre. Además de ahorrar escritura, el nombre dice para qué sirve esa función, algo que `(evento: string) => void` repetido dos veces no dice.

## Cómo se lee un tipo función anidado

> **Un tipo función que contiene otro se lee de afuera hacia adentro, ubicando primero la flecha que está fuera de todo paréntesis.**

En las librerías vas a encontrar tipos función dentro de otros tipos función:

```ts
(alTerminar: (resultado: string) => void) => number
```

- La flecha final, la que está fuera de todo paréntesis, dice que **el conjunto devuelve `number`**.
- Lo que está antes es su único parámetro, llamado `alTerminar`.
- Ese parámetro es, a su vez, una función que recibe un `resultado: string` y cuyo retorno no se usará.

En una frase: *una función que recibe un callback de un string, y devuelve un número*.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- Un tipo función describe qué recibe y qué devuelve una función, y se escribe `(parametro: Tipo) => TipoDeRetorno`.
- Anotar un callback como `Function` compila pero apaga la revisión, porque acepta cualquier función con cualquier firma.
- En un tipo, después de la flecha va otro tipo; en un valor, después de la flecha va el cuerpo que se ejecuta.
- Dentro de un tipo función el nombre de cada parámetro es obligatorio, así que `(string) => void` declara un parámetro llamado `string` de tipo `any`, no un parámetro de tipo texto.
- El tipado contextual permite omitir las anotaciones de una función cuando el lugar donde se escribe ya tiene un tipo esperado, sea el argumento de un parámetro tipado o una variable anotada.
- En un callback el `void` se escribe a mano, porque un tipo función no tiene cuerpo del que inferirlo.
- Un callback declarado `=> void` acepta funciones que devuelven algo: `void` ahí significa que ese valor no se va a usar, no que esté prohibido devolverlo.

---

[[02_opcionales-default-y-rest|← anterior]] · [[00_indice|índice]] · [[04_sobrecargas|siguiente →]]
