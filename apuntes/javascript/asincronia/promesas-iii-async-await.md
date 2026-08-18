---
origen: notion
tier: referencia
teamspace: 🐤 JavaScript
categoria: Asincronía
url: https://app.notion.com/p/21058a8978c7809a99b5e8969717c5d6
migrado: 2026-06-27
---

# Promesas III: async/await

## ¿Qué es async/await?

> Palabras clave para **trabajar con promesas**. Forma moderna y más entendible que `then/catch`.

Permite escribir **código asincrónico como si fuera síncrono** (en línea) pero **sin bloquear el hilo principal**, lo que facilita comprensión y mantenimiento.

## 1. Tienes una promesa (creada o importada)

Puede venir de `new Promise(...)` o de una función que devuelve una promesa (como `fetch()`).

```javascript
const promesa = fetch("https://api.example.com/datos");

const miPromesa = new Promise((resolve, reject) => {
  setTimeout(() => resolve("🎉 Resultado correcto"), 2000);
});
```

## 2. Creas una función `async` (consumidor de promesas)

- `async` se coloca delante de una función y la convierte en asincrónica.
- Una función `async` **siempre devuelve una promesa**, incluso si usas `return` directo.

```javascript
async function nombreFuncion() {
  // aquí puedes usar await
}
```

## 3. Usas `await` para esperar el resultado

- Solo se usa **dentro de una función `async`**.
- Se pone delante de una **Promesa**.
- Hace que JavaScript **espere** a que la promesa se resuelva antes de continuar, y permite **asignar el resultado a una variable**.
- `await` **detiene temporalmente solo dentro de la función `async`**, no bloquea todo el programa.

> Si la promesa se cumple, el valor de `await` es el de `resolve(...)`. Si falla, se lanza un error que atrapas con `try/catch`.

```javascript
async function procesoSecuencial() {
  console.log("📌 Iniciando proceso...");
  const paso1 = await new Promise(r => setTimeout(() => r("✅ Paso 1"), 1000));
  console.log(paso1);
  const paso2 = await new Promise(r => setTimeout(() => r("✅ Paso 2"), 1000));
  console.log(paso2);
  console.log("🎉 Completado!");
}
procesoSecuencial();
```

## 4. Manejo de errores con `try`/`catch`

- `try` → bloque donde corre el código asincrónico.
- `catch` → captura cualquier error (equivale al `.catch()`).
- `finally` → opcional, se ejecuta siempre.

```javascript
async function consumirPromesa() {
  try {
    const resultado = await promesa; // resuelta (como then)
  } catch (error) {
    // rechazada (como catch)
  } finally {
    // siempre
  }
}
```

Ejemplo completo:

```javascript
function prepararCafe() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.2;
      exito ? resolve("☕ Tu café está listo!") : reject("⚠️ La cafetera falló.");
    }, 1500);
  });
}

async function servirCafe() {
  try {
    console.log("🕒 Preparando café...");
    const mensaje = await prepararCafe();
    console.log(mensaje);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("🔚 Fin del proceso.");
  }
}
servirCafe();
```

## ¿Qué retorna una función `async`?

Siempre una promesa, aunque no uses `await` ni retornes una promesa explícita.

| Retorno dentro de la función | Retorno real | Qué puedes hacer |
|---|---|---|
| `return 42` | `Promise<number>` | `await` o `.then(valor => ...)` |
| `return 'texto'` | `Promise<string>` | Tratarlo como string tras `await` |
| `return { ok: true }` | `Promise<Object>` | Manipularlo como objeto |
| `throw new Error('Ups')` | ❌ Rechaza la promesa | Capturable con `catch()` / `try/catch` |
| `return await otraPromesa` | ✅ Se encadena | Flujo continuo, sin nesting |

> ⚠️ Si una función `async` retorna un valor y **no** usas `await` (ni `.then`), obtienes **una promesa, no el valor**:
> ```javascript
> async function obtenerDato() { return 42; }
> const resultado = obtenerDato(); // Promise { 42 }, no 42
> ```
