---
origen: notion
tier: referencia
teamspace: 🐤 JavaScript
categoria: Manejo de Errores
url: https://app.notion.com/p/1fb58a8978c780e0b10cc0b935bbc0cb
migrado: 2026-06-27
---

# Manejo de Errores

## ¿Por qué ocurren errores en JavaScript?

### Tipos de errores en JavaScript y sus causas

| Tipo de Error | Descripción | Ejemplo | Cómo prevenirlo |
|---|---|---|---|
| **SyntaxError** | Se produce cuando el código tiene un error de sintaxis. JavaScript no puede entenderlo. | `console.log("Hola"` ❌ (falta cerrar `)`) | Revisa la sintaxis antes de ejecutar. Usa linters como ESLint. |
| **ReferenceError** | Ocurre cuando intentamos acceder a una variable que no está definida. | `console.log(noExiste);` ❌ | Asegúrate de declarar las variables antes de usarlas. |
| **TypeError** | Sucede cuando se ejecuta una operación sobre un tipo de dato inválido. | `"Hola".push("Mundo");` ❌ (`push()` es de arrays) | Verifica el tipo antes de llamar métodos (`typeof`, `instanceof`). |
| **RangeError** | Un número está fuera del rango permitido (bucle infinito, array enorme). | `new Array(10**10);` ❌ | Limita valores y revisa que los cálculos sean razonables. |
| **URIError** | Se usa mal una función de codificación de URI, como `decodeURIComponent()`. | `decodeURIComponent("%")` ❌ | Revisa que las URLs estén bien codificadas. |
| **Errores en API y red** | Una conexión falla o la respuesta del servidor es inválida. | `fetch("https://api.invalida.com")` ❌ | Maneja con `try...catch` y `fetch().catch(...)`. |
| **Entrada de datos inesperada** | Los datos ingresados no tienen el formato esperado. | `parseInt("Hola")` ❌ | Valida entradas antes de procesar (`isNaN()`, `typeof`). |

## ¿Qué pasa si no manejamos errores?

> Sin manejo de errores, el script **se detiene inmediatamente** y muestra el error en la consola.

- El programa se **detiene abruptamente**.
- Se interrumpe la ejecución del código siguiente.
- Puede provocar una **mala experiencia de usuario**.

```javascript
console.log("Inicio del script");
console.log(nombre); // ❌ Error: `nombre` no está definido
console.log("Este código nunca se ejecutará");
```

## Manejo de errores: uso de `try...catch`

> Para manejar errores en JavaScript se usan los bloques `try-catch`. `try...catch` funciona como un mecanismo de control de errores.

| Fase | Acción |
|---|---|
| `try` | Bloque con el código a vigilar. Se ejecuta; si hay error, **salta al `catch`**. |
| `catch (error)` | Recibe el objeto de error y permite manejarlo o mostrarlo. |
| `finally` | **Siempre** se ejecuta (haya error o no), ideal para limpieza o mensajes finales. |

### Sintaxis básica

```javascript
try {
  // Código que puede lanzar un error
} catch (error) {
  // Código para manejar el error
} finally {
  // (Opcional) Código que se ejecuta siempre, ocurra o no un error
}
```

```javascript
function proceso() {
  try {
    console.log("Inicio del proceso...");
    let data = JSON.parse("{ dato incorrecto }"); // ❌ Esto causa un error
    console.log("Fin del proceso"); // 🚫 Nunca se ejecuta
  } catch (err) {
    console.log("¡Error detectado!");
    console.log("Nombre del error:", err.name);   // "SyntaxError"
    console.log("Mensaje:", err.message);
  } finally {
    console.log("Finalizando el proceso..."); // ✅ Siempre se ejecuta
  }
}

proceso();
```

## Flujo de ejecución: cómo funciona internamente

1. **Inicio de ejecución** — el código corre dentro de `try`. Si todo va bien, se ignora `catch`.
2. **Creación del objeto de error** — si ocurre un error en `try`, JavaScript crea automáticamente un objeto `Error`, detiene el resto de `try` y lo captura `catch(err)`.
3. **Ejecutar `catch`** — el programador decide cómo manejarlo: mostrar mensaje (`console.error(err.message)`), relanzar (`throw err`) o corregir y continuar.
4. **Ejecución de `finally`** — corre sin importar si hubo error o no (limpiar datos, cerrar conexiones).
5. **Propagación** — si no hay `try...catch`, el error se propaga al nivel superior y puede romper todo el programa.

## Objeto `Error`

> Todos los errores en JavaScript se basan en la clase **`Error`** (clase base). Al ocurrir un error en `try`, se crea una instancia de `Error` o de una subclase (`ReferenceError`, `TypeError`, `SyntaxError`, etc.).

### Propiedades del objeto Error

| Propiedad | Descripción |
|---|---|
| `name` | Tipo de error (ej. `ReferenceError`, `SyntaxError`). |
| `message` | Texto explicativo sobre el error. Útil para mostrar al usuario o registrar logs. |
| `stack` | Pila de ejecución: dónde ocurrió y la secuencia de llamadas que llevó al error. |

```javascript
try {
  noExiste();
} catch (err) {
  console.log(err.name);     // ReferenceError
  console.log(err.message);  // noExiste is not defined
  console.log(err.stack);    // Traza completa del error
}
```

## Mejores prácticas

- No ocultes errores silenciosamente: muestra mensajes útiles.
- Usa `finally` para liberar recursos o dejar mensajes.
- No pongas toda tu app dentro de un solo `try...catch`.
- Puedes lanzar errores personalizados con `throw`.
