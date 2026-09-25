---
tema: M4 — Funciones
workspace: typescript
seccion: 4
titulo: Sobrecargas (reconocer)
estado: finalizada
prev: 03_tipar-callbacks
next: null
---

# 🟦 Sobrecargas (reconocer)

Abres el archivo de tipos de una librería para averiguar qué espera una función, y te encuentras con que **la misma función está declarada dos o tres veces seguidas**, con parámetros distintos y sin cuerpo. Parece código duplicado, o un error de quien lo escribió. El editor refuerza la sospecha: al escribir la llamada avisa que esa función tiene varias firmas y te deja pasar de una a otra.

No hay ningún error. Es una función con **sobrecargas**. En código de aplicación casi nunca hace falta escribirlas; lo que sí pasa seguido es tener que leerlas.

> **Una sobrecarga es declarar la misma función varias veces con firmas distintas, para que el compilador elija la que corresponde según los argumentos de cada llamada.**
>
> La **firma** es la línea que declara nombre, parámetros y retorno, sin el cuerpo. Cada firma de una sobrecarga es un contrato independiente y completo: qué recibe, y qué devuelve exactamente con eso.

## Cómo se escribe una función con sobrecargas

> **Se escriben las firmas una debajo de otra, sin cuerpo, y al final una implementación única que las cubre todas.**

**Sintaxis:**

```ts
function nombre(parametro: TipoA): RetornoA      // firma 1, sin cuerpo
function nombre(parametro: TipoB): RetornoB      // firma 2, sin cuerpo
function nombre(parametro: TipoA | TipoB): RetornoA | RetornoB {
  // la implementación: una sola, y no se puede llamar desde fuera
}
```

**Ejemplo:**

```ts
function invertir(valor: string): string
function invertir(valor: number[]): number[]
function invertir(valor: string | number[]): string | number[] {
  return typeof valor === "string"        // este typeof es narrowing, y es tema de M5:
    ? valor.split("").reverse().join("")  // es lo que permite usar .split() en esta rama
    : [...valor].reverse()
}

const texto = invertir("hola")     // texto es string
const lista = invertir([1, 2, 3])  // lista es number[]
```

Hay una regla que vale la pena tener clara desde el principio, porque es la que más confunde: **la última firma, la que sí tiene cuerpo, no es una de las que puedes llamar**. Existe solo para que la implementación cubra todos los casos a la vez. Si intentas `invertir(true)` apoyándote en que la implementación acepta una unión, el compilador arranca su queja con *"No overload matches this call."* y después enumera por qué no encaja con ninguna de las dos firmas declaradas.

> 📝 **Por eso en un archivo de tipos aparecen apiladas y sin cuerpo.** Un `.d.ts` describe formas y no ejecuta nada (→ **M9 · Librerías, `.d.ts` y async**), así que solo lleva las firmas públicas: la implementación vive en el JavaScript que se ejecuta. Leer tres declaraciones seguidas del mismo nombre es leer tres contratos, no tres funciones.

## Para qué sirven: el retorno que depende de la entrada

> **Una sobrecarga conserva la relación entre lo que entra y lo que sale; una sola firma con una unión en el retorno la pierde.**

La pregunta razonable es por qué no basta con una unión. Se ve comparando `invertir` con sobrecargas contra la misma función escrita con una sola firma:

```ts
declare function invertirUnion(valor: string | number[]): string | number[]

const r = invertirUnion("hola") // r es string | number[]
r.toUpperCase()
// ❌ Property 'toUpperCase' does not exist on type 'string | number[]'.
```

El motivo del error es concreto: sobre una unión solo se pueden usar los miembros que existen en **todos** sus tipos, y `toUpperCase` no existe en `number[]`. Así que la versión con unión pierde información en el camino — tú sabes que le pasaste un texto, pero el tipo de salida no lo refleja, y quien recibe el resultado queda obligado a comprobar cuál de los dos tipos vino antes de poder usarlo.

Las sobrecargas conservan esa relación: *si entra un texto, sale un texto*. Por eso las usan las librerías, donde una misma función atiende casos distintos y sería insoportable que cada llamada devolviera una unión que hay que comprobar.

> 🔑 **Matiz:** comprobar cuál de los tipos vino, para poder usarlo, se llama **narrowing** y es el tema de → **M5 · Uniones, narrowing y discriminadas**. El `typeof` de la implementación del ejemplo anterior ya es narrowing. Aquí basta con retener el problema: una unión en el retorno traslada trabajo a quien llama; una sobrecarga se lo ahorra.

## Cuándo no hacen falta

> **Aceptar entradas de tipos distintos no justifica una sobrecarga: lo que la justifica es que el retorno cambie según la entrada.**

Dos cosas se confunden seguido y conviene separarlas, porque son las que deciden si necesitas una sobrecarga o algo más simple:

| Situación | Herramienta |
|---|---|
| La función acepta varios tipos y siempre devuelve lo mismo | Una unión en el parámetro |
| Algunos argumentos se pueden omitir | Parámetro opcional o valor por defecto |
| El tipo de retorno **depende** de qué tipo entró | Sobrecargas |

> 💡 **Tip:** si al escribir una sobrecarga las dos firmas devuelven exactamente lo mismo, no era una sobrecarga: era una unión, y una unión se lee mucho más rápido.

## Cómo se leen cuando te las encuentras

> **Se cuentan las firmas, se busca la que encaja con la llamada, y se lee solo su retorno.**

Al abrir los tipos de una librería y ver varias declaraciones del mismo nombre, el orden de lectura es siempre el mismo:

1. **Contarlas.** Cada declaración sin cuerpo es una forma válida de llamar a esa función.
2. **Buscar la que encaja con tu llamada**, emparejando por cantidad y tipo de argumentos. Si dos encajaran, gana **la primera declarada**: el orden en que están escritas no es decorativo.
3. **Leer su retorno**, que es el único que te importa: el de las otras firmas no aplica a tu caso.
4. **Ignorar la última si tiene cuerpo**, porque no es una firma que puedas llamar.

Un caso que vas a encontrar temprano es el `replace` de los textos. No es una función suelta, sino un método declarado dentro del tipo `String`, así que no verás la forma dibujada más arriba: verás varias firmas apiladas dentro de una llave. Tiene **al menos dos** — una que recibe un texto de reemplazo y otra que recibe una función que calcula el reemplazo de cada coincidencia —, y según la versión de la librería estándar que declare tu `tsconfig` pueden aparecer más.

> ⚠️ **verificar:** el número exacto de firmas de `replace` depende de tu configuración. Pasa el mouse por encima en tu editor y cuenta las que te ofrece — lo que veas ahí manda sobre este apunte.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- Una sobrecarga es la misma función declarada varias veces con firmas distintas, y el compilador elige la que encaja con los argumentos de cada llamada.
- La firma es la línea que declara nombre, parámetros y retorno sin el cuerpo, así que ver un nombre repetido en un archivo de tipos significa leer varios contratos, no varias funciones.
- La firma que tiene cuerpo es la implementación y no se puede llamar desde fuera, aunque acepte más casos que las firmas declaradas arriba de ella.
- Si dos firmas encajan con la misma llamada, gana la primera declarada.
- Las sobrecargas existen para conservar la relación entre lo que entra y lo que sale, que una unión en el retorno perdería.
- Aceptar entradas de tipos distintos no justifica una sobrecarga: lo que la justifica es que el tipo de retorno dependa del tipo que entró.
- Para leer una función con varias firmas se busca la que encaja con la llamada y se lee solo su retorno, ignorando la que tiene cuerpo.

---

[[03_tipar-callbacks|← anterior]] · [[00_indice|índice]]
