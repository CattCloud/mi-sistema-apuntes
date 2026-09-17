---
tema: M2 — Tipos básicos e inferencia
workspace: typescript
seccion: 4
titulo: "Arrays y tuplas"
estado: finalizada
prev: 03_cuando-anotar
next: 05_any-unknown-never-void
---

# 🟦 Arrays y tuplas

> **Un array es una lista de largo variable donde todos los elementos comparten el mismo tipo. Una tupla es una lista de largo fijo donde cada posición tiene su propio tipo declarado, que puede repetirse, como en `[number, number]`.**
>
> La diferencia no es de sintaxis — es de qué garantiza TypeScript. Un array protege el *tipo* de lo que guardas; una tupla protege además la *cantidad* de elementos y el *tipo de cada posición*.

## Arrays: sintaxis y qué infiere TypeScript

**Sintaxis:**

```ts
tipo[]
```

**Ejemplo:**

```ts
const nombres: string[] = ["Erick", "Catt"]
const edades: number[] = [30, 28]
```

Existe una segunda forma, equivalente:

```ts
const nombres: Array<string> = ["Erick", "Catt"]
```

Los `<>` reciben un tipo como parámetro: `Array<string>` se lee "array de `string`". Ese mecanismo se llama **genérico** y se estudia en → **M6 · Genéricos**; aquí basta con reconocerlo. Ambas formas producen el mismo tipo. `tipo[]` es la más común y la que conviene usar por defecto.

TypeScript también deduce el tipo de un array sin que lo anotes:

```ts
const etiquetas = ["nuevo"]
// tipo: string[]
```

> 🔑 **Matiz — `const` no le da literal type a un array:** con un valor suelto, `const` le da a TypeScript el tipo más preciso posible (`const a = 5` tiene tipo `5`, no `number`). Con un array eso **no pasa**: `const etiquetas = ["nuevo"]` sigue siendo `string[]`. La `const` impide reasignar la variable `etiquetas` a otro array, pero el contenido sí puede cambiar (`etiquetas.push("otro")` es válido), así que TypeScript ensancha cada elemento al tipo general — el mismo *widening* de la sección 2 (Inferencia) con las propiedades de un objeto.

Si el array mezcla tipos, TypeScript no elige uno: arma una unión con todos los que encontró.

```ts
const fila = ["Lima", 2026]
// tipo: (string | number)[]  → cada elemento puede ser string o number
```

Los paréntesis importan: `(string | number)[]` es "un array donde cada elemento es `string` o `number`". El orden dentro de la unión no cambia nada; el editor suele mostrar `string` primero. ⚠️ verificar pasando el mouse sobre `fila`. El `|` es el tipo unión, que se presenta en la sección 6 de este módulo (Uniones: introducción).

## Tuplas: cuando el orden y la cantidad importan

Un array no distingue posiciones: `string[]` acepta un elemento o mil, en cualquier orden. Hay casos donde eso es demasiado permisivo — cuando una lista siempre tiene un número fijo de elementos y cada posición significa algo distinto. Ahí es donde entra la tupla.

**Sintaxis:**

```ts
[tipo1, tipo2, tipo3]
```

**Ejemplo:**

```ts
let coordenada: [number, number] = [-12.05, -77.03]
// posición 0: latitud · posición 1: longitud
```

```ts
let usuario: [string, number, boolean] = ["Erick", 30, true]
// nombre, edad, activo — un tipo por posición
```

Si asignas algo que no respeta la forma declarada, TypeScript da error en tres casos — tipo de una posición, cantidad de elementos y tipos en otro orden:

```ts
let coordenada: [number, number] = [-12.05, -77.03]
coordenada = [-12.05, "-77.03"]      // ❌ tipo: el segundo elemento debe ser number
coordenada = [-12.05]                // ❌ cantidad: falta un elemento
coordenada = [-12.05, -77.03, 100]   // ❌ cantidad: sobra un elemento

let usuario: [string, number, boolean] = ["Erick", 30, true]
usuario = [30, "Erick", true]        // ❌ orden: posición 0 debe ser string y posición 1, number
```

Un array declarado como `(string | number | boolean)[]` no habría avisado de ninguno de esos errores: para él, cualquier cantidad y cualquier orden valen.

> ⚠️ **Cuidado — el orden solo se verifica a través de los tipos:** `coordenada = [-77.03, -12.05]` (longitud y latitud invertidas) compila sin error, porque las dos posiciones son `number`. Si dos posiciones comparten tipo, qué significa cada una lo sabe quien escribe el código, no TypeScript.

> ⚠️ **Cuidado — `.push()` no respeta la longitud de una tupla:** TypeScript **permite** `coordenada.push(100)` sobre una tupla `[number, number]`, y en ejecución el array queda con tres elementos. Lo que sí sigue vigilando es el acceso por índice: `coordenada[2]` da error porque la tupla declara solo las posiciones 0 y 1. Regla práctica: no uses `push` ni `pop` sobre una tupla. ⚠️ verificar con tu versión de TypeScript.

## La tabla de decisión

| Situación | Usa | Por qué |
|-----------|-----|---------|
| Lista de largo variable, todo del mismo tipo | **Array** (`tipo[]`) | No hay cantidad fija que proteger |
| Colección que crece o se filtra en tiempo de ejecución (resultados de una consulta, ítems de un carrito) | **Array** | El largo no se conoce de antemano |
| Pocos valores de largo fijo que se desestructuran en la misma línea donde se reciben (`const [valor, setValor] = useState(0)`) | **Tupla** (`[tipo1, tipo2, …]`) | Cada valor recibe su nombre al desestructurar |
| Varios campos que se van a leer lejos de donde se crearon (nombre, edad, activo de un usuario) | **Objeto** (→ **M3 · Objetos y tipado estructural**) | Cada campo se lee por nombre (`usuario.edad`), no por posición (`usuario[1]`) |

> 🎯 **La pregunta que decide:** ¿todas las posiciones significan lo mismo ("un nombre más de la lista")? Entonces es **array**. Si cada posición significa algo distinto, la siguiente pregunta es: ¿se desestructura en la misma línea donde se recibe? Si sí, **tupla**; si esos valores viajan por el código y se leen después, **objeto**.

> 🔑 **Matiz:** por eso en código real la tupla aparece poco. Su caso típico es el `const [valor, setValor] = useState(0)` de React: `useState` devuelve una tupla de dos posiciones y cada una recibe su nombre en esa misma línea.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- **Un array protege el tipo de lo que guarda; una tupla protege además la cantidad de elementos y el tipo de cada posición.**
- La sintaxis de array es `tipo[]` (o, equivalente, `Array<tipo>`).
- **`const` no le da literal type a un array:** `const etiquetas = ["nuevo"]` sigue siendo `string[]` y no guarda el valor exacto `"nuevo"` como pasa con `const a = 5`, porque el contenido del array puede cambiar.
- La sintaxis de tupla es `[tipo1, tipo2, …]`, un tipo por posición; si dos posiciones comparten tipo, TypeScript no detecta que las invertiste.
- **`.push()` no respeta la longitud de una tupla:** TypeScript lo permite aunque rompa la cantidad declarada, así que no se usa sobre tuplas.
- Si todas las posiciones significan lo mismo, es array; si cada una significa algo distinto y se desestructura en la misma línea donde se recibe, es tupla; si esos valores se leen después, es objeto.

---
[[03_cuando-anotar|← anterior]] · [[00_indice|índice]] · [[05_any-unknown-never-void|siguiente →]]
