---
origen: notion
tier: referencia
teamspace: 🐤 JavaScript
categoria: DOM
url: https://app.notion.com/p/1fb58a8978c780468273d863247df99a
migrado: 2026-06-27
---

# Leer o Modificar el Contenido de los elementos

Es el proceso de **leer o cambiar el contenido** de un elemento HTML desde JavaScript: texto, HTML interior, o reemplazar elementos completos.

## Métodos/propiedades para acceder y modificar contenido

| Propiedad | Tipo de contenido | Qué hace |
|---|---|---|
| `textContent` | Solo texto | Lee o reemplaza **todo el texto** del elemento. |
| `innerText` | Solo texto visible | Similar a `textContent`, pero considera visibilidad/CSS. |
| `innerHTML` | HTML interpretado | Lee o reemplaza el contenido **incluyendo etiquetas HTML**. |
| `outerHTML` | HTML + el propio elemento | Reemplaza el **elemento completo** con su contenido. |

## `textContent`: contenido de texto

> Hace referencia al texto del elemento; lo usamos para **leer o modificar**.

```javascript
const parrafo = document.getElementById("miParrafo");
console.log(parrafo.textContent);              // lee el texto
parrafo.textContent = "Texto que reemplaza";   // lo modifica
```

## `innerHTML`: contenido HTML (hijos del elemento)

> Hace referencia al contenido HTML del elemento. La cadena que asignas está **formateada como HTML** y el navegador la interpreta y renderiza.

```javascript
titulo.innerHTML = "<em>Nuevo Título</em>";
elemento.innerHTML = ""; // borra todo el contenido HTML
```

> ⚠️ **Inyección de código (XSS):** `innerHTML` es vulnerable si el HTML proviene de una fuente externa (ej. un formulario de usuario). **Valida** el contenido antes de asignarlo. Si solo necesitas texto, usa `textContent`.
