---
origen: notion
tier: referencia
teamspace: 🐤 JavaScript
categoria: Eventos
url: https://app.notion.com/p/20e58a8978c7807eae3bc3486e0f81b8
migrado: 2026-06-27
---

# Eventos

## ¿Qué es un evento?

> Un **evento** es una señal de que algo ha ocurrido en la página: un clic, el paso del mouse, una tecla, la carga de la página, el envío de un formulario, etc.

Pueden ser generados por el **usuario** (clic, mover el mouse, presionar tecla) o por el **navegador** (cargar la página, cambiar el tamaño de ventana).

## Componentes clave

| Componente | Explicación |
|---|---|
| **Evento** | La acción que ocurre (`click`, `keydown`, `submit`…). |
| **Manejador (handler)** | Función que se ejecuta **cuando el evento ocurre**. |
| **Elemento (Target)** | El nodo del DOM donde ocurre / al que se le asigna el evento. |
| **Objeto del evento** | Información adicional (tipo, coordenadas, tecla…). |

## Formas de asignar un escuchador

| Forma | Código | Observación |
|---|---|---|
| Atributo HTML | `<button onclick="funcion()">` | No recomendado. |
| Propiedad JS | `element.onclick = funcion` | Sobrescribe eventos anteriores. |
| **`addEventListener`** | `element.addEventListener("click", funcion)` | ✅ Recomendado y flexible. |

## `addEventListener` (forma recomendada)

- Permite **múltiples escuchadores** en un mismo elemento sin sobrescribir.
- Mayor flexibilidad (distintos tipos de evento).

```javascript
elemento.addEventListener("evento", manejador);
```

```javascript
const boton = document.getElementById("miBoton");
boton.addEventListener("click", function () {
  alert("¡Hiciste clic!");
});
```

## El objeto `event`

El manejador recibe por defecto un parámetro `event` (o `e`) con información del evento: qué elemento lo desencadenó, métodos de propagación, etc.

```javascript
elemento.addEventListener("evento", function (event) {
  // event.target, event.preventDefault(), ...
});
```

## Propagación de eventos (3 fases)

| Fase | Dirección | ¿Cuándo? |
|---|---|---|
| **Captura** | `document → target` | Antes de llegar al elemento objetivo (requiere `true`). |
| **Objetivo** | `target` | Exactamente en el elemento donde ocurrió. |
| **Burbujeo** | `target → document` | Después del objetivo, hacia los ancestros (por defecto). |

> Por el **burbujeo**, si haces clic en un hijo y hay un handler en un ancestro, el del padre también se ejecuta (salvo que detengas la propagación).

## Métodos de control de propagación / comportamiento

| Método | Uso |
|---|---|
| `event.stopPropagation()` | Detiene la propagación del evento (no sigue al padre/document). |
| `event.stopImmediatePropagation()` | Detiene la propagación **y** los demás handlers del mismo elemento. |
| `event.preventDefault()` | Evita el comportamiento por defecto (ej. que un form se envíe o un link redirija). No afecta la propagación. |

```javascript
formulario.addEventListener("submit", function (event) {
  event.preventDefault(); // evita recargar la página al enviar
  // ... validar / procesar
});
```

## Tipos de eventos comunes

- **Mouse 🖱️:** `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove`, `mouseover`, `mouseout`, `contextmenu`.
- **Teclado ⌨️:** `keydown`, `keyup`.
- **Formulario 📝:** `submit`, `reset`, `focus`, `blur`, `change`, `input`.
- **Carga 🌍:** `load`, `DOMContentLoaded`, `error`, `beforeunload`, `unload`.
- **Ventana/Documento 📄:** `resize`, `scroll`, `visibilitychange`.
- **Otros:** Drag & Drop (`dragstart`, `drop`…), Clipboard (`copy`, `cut`, `paste`), Medios (`play`, `pause`, `ended`), Táctiles (`touchstart`, `touchmove`, `touchend`).
