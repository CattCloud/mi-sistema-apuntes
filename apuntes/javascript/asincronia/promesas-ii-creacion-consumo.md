---
origen: notion
tier: referencia
teamspace: 🐤 JavaScript
categoria: Asincronía
url: https://app.notion.com/p/21058a8978c781968fbdc0b987cac11f
migrado: 2026-06-27
---

# Promesas II: Creación y Consumo

## Fases de una promesa

| Concepto | ¿Qué significa? |
|---|---|
| 🛠️ **Creación** | Cuando defines la promesa con el constructor `new Promise(...)`. |
| 🍽️ **Consumo** | Cuando usas `.then()`, `.catch()` o `await` para **trabajar con el resultado**. |

> Crear es como pedir comida a domicilio; consumir (`resolve`) es recibir el pedido y comerlo; si falla (`reject`), pides otra cosa. Puedes consumir promesas propias o de librerías/APIs (como `fetch()`).

## 1. Creación de una promesa

Las promesas son **objetos**. Se crean con el constructor `new Promise()`, que recibe una función con `resolve` y `reject` como parámetros:

- `resolve(valor)` → resuelve la promesa con un **resultado exitoso**.
- `reject(error)` → rechaza la promesa con un **motivo/error**.

Esa función determina el estado final de la promesa y debe contener el código asincrónico.

```javascript
const promesa = new Promise((resolve, reject) => {
  // Lógica asincrónica
  resolve(valor);  // Éxito
  reject(error);   // Fallo
});
```

```javascript
new Promise((resolve, reject) => {
  const number = 1 + Math.floor(Math.random() * 6);
  if (number === 6) {
    resolve(number); // cumplimos la promesa
  }
  reject(number);    // si no es 6, la rechazamos
});
```

### `resolve` y `reject` no se definen manualmente

> Son funciones que JavaScript proporciona **automáticamente** dentro del constructor `Promise()`. Sirven para finalizar la promesa y pasar un valor al consumidor:
> - El valor de `resolve(valor)` se recibe en `.then()`.
> - El valor de `reject(error)` se recibe en `.catch()`.

```javascript
const verificarEdad = new Promise((resolve, reject) => {
  const edad = 17;
  if (edad >= 18) {
    resolve("✅ Acceso permitido");
  } else {
    reject("🚫 Acceso denegado");
  }
});

verificarEdad
  .then(mensaje => console.log(mensaje))   // valor de resolve
  .catch(error => console.error(error));   // valor de reject
```

## 2. Consumir una promesa

> Esperar y **usar el resultado** (o manejar el error) una vez que la promesa se resolvió o rechazó.

- `resolve`/`reject` solo **envían** el resultado, no lo procesan.
- Si no consumes una promesa, nunca usas su resultado.

Dos formas de consumir:
- Con `.then()` / `.catch()` / `.finally()`
- Con `async` / `await` (dentro de funciones `async`)

## Consumo con `.then()`, `.catch()` y `.finally()`

Son **métodos** del objeto Promesa; se ejecutan automáticamente según su estado:

- `.then()` → cuando la promesa **se resuelve** (`resolve`). Maneja el éxito.
- `.catch()` → cuando la promesa **falla** (`reject`). Maneja errores.
- `.finally()` → se ejecuta **siempre** tras `then`/`catch`, sin importar el resultado.

```javascript
promesa
  .then((resultado) => { /* éxito: promesa cumplida */ })
  .catch((error) => { /* error: promesa rechazada */ })
  .finally(() => { /* algo sin importar el resultado */ });
```

```javascript
function pedirComida(plato) {
  return new Promise((resolve, reject) => {
    console.log(`🍽️ Pedido recibido: ${plato}`);
    setTimeout(() => {
      const exitoso = Math.random() > 0.3; // 70% de éxito
      if (exitoso) {
        resolve(`✅ Tu plato "${plato}" está listo! 🍲`);
      } else {
        reject(`❌ No tenemos ingredientes para "${plato}".`);
      }
    }, 2000);
  });
}

pedirComida("Pasta Alfredo")
  .then(respuesta => console.log(respuesta))
  .catch(error => console.error(error))
  .finally(() => console.log("🔚 Pedido finalizado!"));
```
