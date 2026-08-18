---
origen: notion
tier: referencia
teamspace: 🐤 JavaScript
categoria: Asincronía
url: https://app.notion.com/p/21058a8978c780038326d53321151849
migrado: 2026-06-27
---

# Introducción a la Asincronía: Operaciones Asíncronas

## ¿Qué es la Asincronía?

> La asincronía es la **capacidad de ejecutar tareas sin bloquear el flujo principal del programa** mientras se espera un resultado que puede tardar (pedir datos a una API, leer un archivo, esperar una animación o temporizador).

**Operación asíncrona (palabra clave: "segundo plano"):** una tarea que **no se ejecuta inmediatamente** y **su resultado llega después**, sin detener el resto del programa.

> **Analogía:** metes una pizza al horno. No te quedas mirando el horno 20 minutos; mientras se cocina (tarea asíncrona) sigues preparando la ensalada (tareas síncronas). La tarea corre "en segundo plano" y tú no te bloqueas esperando.

En lugar de esperar a que una tarea termine para seguir, JavaScript ejecuta el resto del código y vuelve a la operación asíncrona cuando esté lista.

## JavaScript es Single-Thread (un solo hilo)

> JavaScript **ejecuta el código línea por línea** en un solo hilo (una cosa a la vez). Si una tarea tarda mucho, **bloquea todo lo demás** — por eso necesitamos la asincronía.

Ejemplo de tarea bloqueante (síncrona):

```javascript
while (true) {
  // bloquea todo el programa
}
```

## ¿Por qué es importante la asincronía?

Porque JavaScript tiene un único hilo: si algo toma mucho tiempo y es síncrono, **congela todo** (incluida la UI del navegador). Por eso existen las promesas y los mecanismos asíncronos: mantener la fluidez sin bloquear el flujo.

| Razón | Explicación breve |
|---|---|
| ✅ Mejora el rendimiento | Permite hacer otras tareas mientras se espera el resultado. |
| 📱 Experiencia de usuario | Evita que la interfaz se congele. |
| 🌐 Operaciones lentas | Ideal para APIs, archivos, bases de datos, timers. |
| 🔄 Código reactivo | Permite reaccionar cuando algo termine, sin bloquear. |

## Tareas asincrónicas comunes

| Tarea | ¿Por qué es asincrónica? |
|---|---|
| `fetch()` (peticiones HTTP) | Puede tardar segundos según el servidor. |
| `setTimeout()` / `setInterval()` | Ejecutan algo después de un tiempo. |
| Acceso a base de datos | Lectura/escritura puede demorar. |
| Animaciones y eventos del DOM | Esperan una acción del usuario o del sistema. |

## ¿Cómo se maneja la asincronía en JavaScript?

| Técnica | Descripción breve |
|---|---|
| **Callbacks** | Funciones que se pasan como argumento y se ejecutan al terminar una tarea. |
| **Promises** | Objetos que representan el resultado futuro de una operación. |
| **Async/Await** | Sintaxis moderna para escribir código asincrónico como si fuera síncrono. |
