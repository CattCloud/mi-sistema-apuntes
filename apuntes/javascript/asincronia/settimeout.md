---
origen: notion
tier: referencia
teamspace: 🐤 JavaScript
categoria: Asincronía
url: https://app.notion.com/p/21158a8978c7805f915bee3aed2ceea3
migrado: 2026-06-27
---

# Función `setTimeout`

## ¿Qué es `setTimeout`?

> Función para **ejecutar código después de un tiempo**. Retrasa la ejecución de una función por un periodo determinado (en milisegundos).

- Es una forma sencilla de programar tareas asincrónicas sin usar promesas.
- Es nativa de JavaScript y se ejecuta en el **Event Loop, no en el hilo principal** → no bloquea el resto del código.
- El tiempo **no es exacto**: depende de la carga del navegador y el Event Loop.

**Casos de uso comunes:** simular operaciones asincrónicas, crear retrasos intencionales, ejecutar tareas después de animaciones/interacciones.

## Sintaxis básica

```javascript
setTimeout(funcion, tiempoEnMilisegundos);
```

| Parámetro | Descripción |
|---|---|
| `funcion` | Código o función que se ejecutará una vez pasado el tiempo. |
| `tiempoEnMilisegundos` | Milisegundos a esperar antes de ejecutar. |

> El código dentro de `setTimeout` se ejecuta **una sola vez** después del tiempo indicado.

```javascript
console.log("⏱️ Esperando 3 segundos...");

setTimeout(() => {
  console.log("🎉 Han pasado 3 segundos!");
}, 3000);

console.log("📌 Esto se muestra inmediatamente."); // No espera
```

**Pasar argumentos a la función** (van después del tiempo):

```javascript
function saludar(nombre) {
  console.log(`👋 Hola, ${nombre}!`);
}

setTimeout(saludar, 2000, "Erick"); // Después de 2s → "👋 Hola, Erick!"
```

## Cancelar un `setTimeout`

> `setTimeout` retorna un **ID de temporizador** (un número) que sirve para cancelarlo con `clearTimeout`.

```javascript
const temporizador = setTimeout(() => {
  console.log("Esto no debería verse 😅");
}, 5000);

clearTimeout(temporizador);
console.log("🚫 Temporizador cancelado.");
```
