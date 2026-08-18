---
origen: notion
tier: referencia
teamspace: 🐤 JavaScript
categoria: Manejo de APIs en JS
url: https://app.notion.com/p/23258a8978c780cf8e64c2c94462382a
migrado: 2026-06-27
---

# Fetch: Realizar peticiones HTTP en JS

## ¿Qué es `fetch()`?

> `fetch()` es una función nativa de JavaScript que permite **realizar peticiones HTTP** a servidores (internos o externos), APIs RESTful u otros servicios web. Es la forma moderna de consumir APIs, reemplazando al antiguo `XMLHttpRequest`.

## Sintaxis (con `.then()`)

```javascript
fetch("URL_DEL_ENDPOINT", {
  method: "HTTP_VERB", // GET, POST, PUT, etc.
  headers: {
    "Content-Type": "application/json",
    // "Authorization": "Bearer TOKEN",
  },
  body: JSON.stringify({ /* datos a enviar */ }) // solo en métodos que lo permitan
})
  .then(respuesta => {
    if (!respuesta.ok) throw new Error("HTTP " + respuesta.status);
    return respuesta.json(); // convierte el body en objeto JS
  })
  .then(data => {
    console.log("Datos recibidos:", data);
  })
  .catch(error => {
    console.error("Ocurrió un error:", error);
  });
```

`fetch()` recibe dos argumentos: la `url` del endpoint y un objeto `opciones` (método, headers, body, mode CORS, credentials, cache, redirect…).

## ¿Qué retorna `fetch()`?

Siempre una **Promise**. Si resuelve, da un objeto `Response`; si se rechaza, un `Error`.

| Situación | ¿Resuelta o rechazada? | Retorna | ¿`.catch()`? |
|---|---|---|---|
| ✅ API responde `200` | ✅ Resuelta | `Response` | Opcional |
| ⚠️ API responde `404`/`500` | ✅ Resuelta | `Response` | Validar `res.ok` |
| ❌ Fallo de red / sin conexión | ❌ Rechazada | `Error` | ✅ Sí |

> ⚠️ **Clave:** `fetch()` **NO lanza error automáticamente** con `404` o `500`. Debes verificarlo manualmente:
> ```javascript
> if (!response.ok) throw new Error("HTTP " + response.status);
> ```

## Objeto `Response`

Cuando haces `fetch()`, lo primero que obtienes es una Promesa que resuelve en un objeto `Response` (la respuesta HTTP del servidor):

| Propiedad | Tipo | Descripción |
|---|---|---|
| `status` | `number` | Código HTTP (200, 404, 500…). |
| `ok` | `boolean` | `true` si `status` está entre 200–299. |
| `statusText` | `string` | Descripción textual ("OK", "Not Found"). |
| `headers` | `Headers` | Headers devueltos por el servidor. |
| `url` | `string` | URL final (puede variar si hubo redirección). |

**Métodos para leer el body** (todos retornan una Promesa; solo puedes usar **uno** por respuesta):

| Método | Transforma | Uso típico |
|---|---|---|
| `.json()` | JSON → objeto JS | API REST |
| `.text()` | string | HTML, texto plano |
| `.blob()` | Blob | Archivos binarios (imágenes, PDF) |
| `.formData()` | FormData | Formularios |

> Por eso se usan **dos `.then()`**: el primero transforma el `Response` (`res.json()`), el segundo manipula los datos reales. `fetch()` solo da el `Response`, no los datos directamente.

## Patrón seguro recomendado

```javascript
fetch(url)
  .then(res => {
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return res.json();
  })
  .then(data => { /* procesar datos */ })
  .catch(error => {
    // captura errores de red y los "throw"
    console.error("Ocurrió un error:", error.message);
  });
```

## Métodos HTTP con `fetch()`

| Método | Uso | Body |
|---|---|---|
| `GET` | Obtener datos | No |
| `POST` | Crear un recurso | Sí (`Content-Type` + JSON) |
| `PUT` | Reemplazar **todo** el recurso | Sí (todos los campos) |
| `PATCH` | Modificar **parte** del recurso | Sí (solo el campo a cambiar) |
| `DELETE` | Eliminar un recurso | Normalmente no (depende del backend) |

```javascript
fetch("https://api.ejemplo.com/usuarios", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nombre: "Erick", email: "erick@mail.com" })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## Fetch con async/await

```javascript
async function hacerPeticion() {
  try {
    const respuesta = await fetch("URL_DEL_ENDPOINT", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`); // 404, 500…

    const datos = await respuesta.json(); // convertir el body a objeto JS
    console.log("Datos recibidos:", datos);
  } catch (error) {
    console.error("Ocurrió un error:", error.message); // red, URL inválida, throw
  }
}
```

Pasos: (1) función `async` obligatoria para usar `await`; (2) `await fetch(...)` → `Response`; (3) validar `respuesta.ok`; (4) `await respuesta.json()` → datos reales; (5) `catch` para errores de red, URL inválida o `throw`.
