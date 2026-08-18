---
origen: notion
tier: referencia
teamspace: 🐤 JavaScript
categoria: DOM
url: https://app.notion.com/p/1fb58a8978c780f0bfd6dad749d76c54
migrado: 2026-06-27
---

# Crear e Insertar elementos nuevos en el DOM

Podemos agregar elementos dinámicamente. Los pasos son: **(1) crear** el elemento, **(2) modificarlo**, **(3) insertarlo** en el DOM.

```javascript
const elemento = document.createElement("tag"); // 1. Crear
elemento.textContent = "Contenido";             // 2. Modificar
document.body.appendChild(elemento);            // 3. Insertar
```

## Resumen de métodos

| Categoría | Método | Inserta… |
|---|---|---|
| **Crear** | `createElement()` | Crea un nodo HTML vacío (aún no insertado). |
| **Insertar (hijo)** | `appendChild()` / `append()` | Al final del padre. |
| | `prepend()` | Al inicio del padre. |
| | `insertBefore()` | Antes de un hijo específico. |
| **Insertar (hermano)** | `before()` / `after()` | Antes o después del nodo referenciado. |

## `createElement()`

> Crea un nodo elemento (¡no insertado aún!). Recibe el nombre de la etiqueta como string y **retorna** el nuevo nodo.

```javascript
const nuevoParrafo = document.createElement("p");
const nuevaImagen = document.createElement("img");
```

## Métodos tradicionales de inserción

**`appendChild(node)`** — agrega el nodo como **último hijo** del padre:

```javascript
let nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Este es un nuevo párrafo";
document.body.appendChild(nuevoParrafo); // el que invoca es el PADRE
```

**`insertBefore(newNode, referenceNode)`** — inserta `newNode` **antes** de un nodo de referencia (hijo del padre). Si la referencia es `null`, actúa como `appendChild()`:

```javascript
const padre = document.querySelector("#contenedor");
const nuevoDiv = document.createElement("div");
const referencia = document.getElementById("referencia");
padre.insertBefore(nuevoDiv, referencia);
```

## Métodos modernos (más intuitivos)

| Método | Qué hace |
|---|---|
| `padre.append(newNode)` | Agrega al **final** del padre. |
| `padre.prepend(newNode)` | Agrega al **inicio** del padre. |
| `referencia.before(newNode)` | Inserta **antes** del nodo referencia (como hermano). |
| `referencia.after(newNode)` | Inserta **después** del nodo referencia (como hermano). |

```javascript
const padre = document.querySelector("#contenedor");
const nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Nuevo párrafo.";
padre.append(nuevoParrafo); // al final dentro de #contenedor
```
