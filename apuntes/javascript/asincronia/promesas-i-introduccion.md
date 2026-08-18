---
origen: notion
tier: referencia
teamspace: 🐤 JavaScript
categoria: Asincronía
url: https://app.notion.com/p/21058a8978c78078b600d82f2cea03f6
migrado: 2026-06-27
---

# Promesas I: Introducción

## ¿Qué son las promesas?

> Una **Promesa** es un objeto que **representa el resultado (éxito o error) de una operación asincrónica**.

- Se aplica en **operaciones asincrónicas**: necesita tiempo para resolverse; **no entrega el resultado inmediatamente**.
- Se usa para manejar código asincrónico (peticiones a una API, timers, lectura de archivos) de manera **más legible** que los callbacks.

## Estados de una promesa

> Piensa en una promesa como un "compromiso" que eventualmente se cumple... o no.

| Estado | Descripción |
|---|---|
| **`pending`** (pendiente) | La promesa aún no se ha resuelto ni rechazado. |
| **`fulfilled`** (cumplida) | Se resolvió correctamente (`resolve`). |
| **`rejected`** (rechazada) | Fue rechazada por un error (`reject`). |

> **Analogía (pedir pizza 🍕):**
> 1. **Haces el pedido** → creas la promesa.
> 2. **Esperas** → no sabes cuándo llegará, pero eventualmente pasará algo. Estado `pending`.
> 3. **Llega la pizza** → `resolve()`.
> 4. **Se pierde el repartidor** → `reject()`.
>
> Pedir pizza es asíncrono: mientras esperas, sigues viendo tu serie. No detienes tu vida (ni el código).

## ¿Pero qué son las promesas?

Cuando trabajamos con operaciones asíncronas, el código no devuelve el valor inmediatamente; devuelve una **promesa que representa la eventual entrega del valor en el futuro**.

- Mientras está `pending`, el resultado no está definido.
- Cuando se cumple, el resultado es un valor.
- Cuando es rechazada, el resultado es un objeto error.

> **Certeza vs promesa:**
> - `const miNumero = 5;` → una **certeza** (es 5 sí o sí).
> - `const datos = fetch("/api");` → una **promesa** (devuelve una `Promise`); debes esperar el resultado con `datos.then(res => ...)`.
