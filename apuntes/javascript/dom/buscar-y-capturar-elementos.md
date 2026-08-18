---
origen: notion
tier: referencia
teamspace: 🐤 JavaScript
categoria: DOM
url: https://app.notion.com/p/1fb58a8978c780f994e0c08a34d9a4a1
migrado: 2026-06-27
---

# Buscar y Capturar elementos

## Objeto `document`: punto de partida

> Para interactuar con el DOM partimos del objeto **`document`**: buscar elementos, crear nuevos, modificar el contenido, agregar eventos, etc. Usamos sus métodos y propiedades para **manipular y controlar el DOM**.

**Capturar un elemento** = obtener una **referencia en JavaScript a un elemento HTML** para poder leer o modificar su contenido, atributos o estilos. Lo común es guardarlo en una variable (es un objeto).

```html
<h1 id="titulo">Hola, DOM</h1>
<p class="parrafo">Este es un párrafo.</p>
```

```javascript
let titulo = document.getElementById("titulo");
let parrafos = document.getElementsByClassName("parrafo"); // HTMLCollection
```

## Métodos clásicos de captura

| Método | Busca por | Retorna |
|---|---|---|
| `getElementById("id")` | ID | Un solo elemento (o `null`). |
| `getElementsByClassName("clase")` | Clase | `HTMLCollection` (en vivo). |
| `getElementsByTagName("tag")` | Etiqueta (`p`, `div`…) | `HTMLCollection` (en vivo). |

## Trabajar con `HTMLCollection`

> `HTMLCollection` es una **colección en vivo**: se actualiza automáticamente si el DOM cambia. No necesitas volver a seleccionar.

```javascript
// HTMLCollection (en vivo)
const collection = document.getElementsByTagName("div");
collection.length;       // 63
collection[62].remove(); // eliminamos del DOM el último
collection.length;       // 62  ← refleja el cambio

// Array (estático)
const arr = [...document.getElementsByTagName("div")];
arr.length;       // 63
arr[62].remove(); // eliminamos del DOM
arr.length;       // 63  ← NO cambia
```

- Recorrerla: `for (let el of elementos)`, acceso por `[index]`, propiedad `.length`.
- Para usar `map()`/`filter()`/`reduce()`, conviértela a array con `Array.from(coleccion)` o spread `[...coleccion]` (el resultado será **estático**).

## Métodos modernos (recomendado): selectores CSS

| Método | Busca | Retorna |
|---|---|---|
| `querySelector("selector")` | Primer elemento que coincida con el selector CSS | Un elemento (o `null`). |
| `querySelectorAll("selector")` | Todos los que coincidan | `NodeList` (estático). |

```javascript
let titulo = document.querySelector(".contenedor h1");        // primer h1 dentro de .contenedor
let parrafos = document.querySelectorAll(".contenedor p");
parrafos.forEach(p => console.log(p.innerText));               // NodeList sí tiene forEach
```

> `NodeList` tiene `.length`, `[index]` y `.forEach()`. Para métodos más avanzados (`map`, `filter`), conviértelo con `Array.from(nodeList)`.
