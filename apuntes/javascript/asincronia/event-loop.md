---
origen: notion
tier: referencia
teamspace: 🐤 JavaScript
categoria: Asincronía
url: https://app.notion.com/p/23058a8978c7807b8f91dbc9bd080a43
migrado: 2026-06-27
---

# Event Loop

## ¿Qué es el Event Loop?

> Es el **mecanismo central** que permite a JavaScript manejar código **asincrónico** sin bloquear el hilo principal. Coordina la ejecución de tareas entre el Call Stack y las colas de tareas.

| Componente | Rol |
|---|---|
| **Call Stack** | Ejecuta funciones en orden, una por una. |
| **Web APIs** | Ejecuta tareas asincrónicas (temporizadores, fetch). |
| **Callback Queue** | Cola de tareas de Web APIs (menos prioritarias). |
| **Microtask Queue** | Cola de promesas resueltas / tareas críticas (más prioritarias). |
| **Event Loop** | Pasa tareas de las colas al Call Stack cuando está libre. |

## Flujo paso a paso

### 1. El código síncrono entra al Call Stack

> El **Call Stack** (pila de ejecución) es donde se ejecutan las funciones síncronas, **una por una, de arriba hacia abajo**. Funciona como pila **LIFO** (Last In, First Out): cada llamada se apila y, al terminar, se desapila.

```javascript
console.log("Inicio");
saludar();
console.log("Fin");
setTimeout(() => console.log("Timeout"), 1000); // no se apila directo

function saludar() {
  console.log("Hola desde saludar");
}
```

Si algo bloquea el Call Stack (`while (true) {}`), el stack nunca se vacía y la interfaz se congela — por eso importa la asincronía.

### 2. Las tareas asíncronas se delegan a Web APIs

`setTimeout`, `fetch` o `addEventListener` **no se ejecutan en el Call Stack**: se delegan a las **Web APIs del navegador** (que no son JS puro), las cuales registran el temporizador, hacen la petición HTTP o esperan el clic.

### 3. Las Web APIs trabajan en segundo plano

Mientras la Web API "espera", el Call Stack sigue ejecutando lo que viene después. Call Stack y Web APIs funcionan **en paralelo**.

### 4. Al terminar, el callback va a una cola

| Tipo de Cola | Prioridad | Ejemplos |
|---|---|---|
| **Callback Queue** | Baja | `setTimeout`, `setInterval`, DOM Events |
| **Microtask Queue** | Alta | `Promise.then()`, `await`, `MutationObserver` |

> El Event Loop da **prioridad a la Microtask Queue** sobre la Callback Queue: primero procesa `.then()` y promesas resueltas, **antes** que temporizadores o clics.

### 5. El Event Loop entra en acción

1. Revisa el Call Stack: si hay funciones ejecutándose, no hace nada.
2. Si el stack está vacío, **prioriza la Microtask Queue** (procesa **todas** las microtareas).
3. Luego atiende la **Callback Queue** (`setTimeout`, `onClick`, etc.).

```javascript
setTimeout(() => console.log("⏱ Timeout"), 0);
Promise.resolve().then(() => console.log("⚡ Microtask"));
console.log("🧩 Síncrono");

// Orden de ejecución:
// 🧩 Síncrono   → directo en el Stack
// ⚡ Microtask  → primero por el Event Loop (Microtask Queue)
// ⏱ Timeout    → luego (Callback Queue)
```

> 🧠 **Frase para recordar:** el Event Loop no ejecuta las tareas; **vigila** y **decide** cuándo es seguro hacerlo. Primero las microtareas, luego los callbacks.
