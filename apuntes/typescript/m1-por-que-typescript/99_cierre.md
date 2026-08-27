---
tema: M1 — Por qué TypeScript y cómo corre
workspace: typescript
seccion: cierre
titulo: "Cierre del módulo — micro-ejercicio y quiz"
estado: pendiente
prev: 05_tsconfig-y-strict
next: null
---

# 🟦 Cierre del módulo — micro-ejercicio y quiz

> **El módulo no cierra al terminar de leer las secciones.** Cierra aquí: haciendo el ejercicio con el compilador delante y respondiendo el quiz sin mirar los apuntes.

## 🧪 Micro-ejercicio — ver el borrado con tus propios ojos

**No es opcional.** El objetivo **no es practicar sintaxis de tipos** (eso es M2–M4): es ver, en tu propia pantalla, que las anotaciones no llegan al archivo que se ejecuta. Por eso el archivo de partida viene dado — tu trabajo es compilarlo y mirar el resultado.

### 1. Crea `ejemplo.ts` y copia esto tal cual

```ts
interface Producto {
  nombre: string
  precio: number
}

type Moneda = "PEN" | "USD"

function mostrarPrecio(p: Producto, moneda: Moneda = "PEN"): string {
  return `${p.nombre}: ${moneda} ${p.precio}`
}

const teclado: Producto = { nombre: "Teclado", precio: 120 }
console.log(mostrarPrecio(teclado))
```

### 2. Compílalo

```bash
npx tsc ejemplo.ts
```

> 📝 `npx` es una herramienta de **npm** (viene con Node) que ejecuta programas instalados dentro de `node_modules`. Se usa aquí porque `tsc` instalado local no queda disponible como comando suelto. **Si lo instalaste global, `tsc ejemplo.ts` a secas funciona igual** — ver sección 4.

### 3. Abre el `ejemplo.js` que apareció al lado y cuenta

**¿Cuántas de las anotaciones de tipo sobrevivieron?**

### 4. Ejecútalo y comprueba que funciona igual

```bash
node ejemplo.js
```

### 5. Prueba el modo vigilante

```bash
npx tsc ejemplo.ts --watch
```

Cambia el precio, guarda, y mira cómo el `.js` se regenera solo.

### 6. *(Opcional, para ver la fase 3)* Compílalo a JavaScript antiguo

```bash
npx tsc ejemplo.ts --target ES5
```

Compara la salida con la anterior: `const` pasa a `var`, la plantilla `` `...` `` pasa a concatenación.

> 🎯 La respuesta del paso 3 es **cero**, y ya la sabes de haberla leído. Verla es distinto de saberla — ese es el punto del ejercicio.

### ⚠️ El error que te va a salir después de compilar

Al generarse el `ejemplo.js` **al lado** del `ejemplo.ts`, el editor va a empezar a marcarte un error en el `.ts` que antes no estaba:

```text
Cannot redeclare block-scoped variable 'teclado'.
Duplicate function implementation.
```

**Tu código no tiene nada malo.** Lo que pasa es esto:

> Un archivo que **no tiene ningún `import` ni `export`** no cuenta como módulo: TypeScript lo trata como un **script**, y todo lo que declara en el nivel superior va al **ámbito global**.

Tus dos archivos son scripts, los dos declaran `mostrarPrecio` y `teclado` en el ámbito global, y el editor ve dos declaraciones con el mismo nombre. Como en esa carpeta no hay `tsconfig.json`, el editor arma un proyecto improvisado y mete ambos archivos en él.

Tres salidas, de mejor a más rápida:

| | Qué hacer | Cuándo |
|---|-----------|--------|
| **1** | Un `tsconfig.json` con `rootDir: "./src"` y `outDir: "./dist"`, y correr `npx tsc` **sin nombre de archivo** | Es la solución real, y es exactamente el tip de la sección 5 |
| **2** | Agregar `export {}` al final del `.ts` — lo convierte en módulo y sus declaraciones dejan de ser globales | Parche de una línea |
| **3** | Borrar el `.js` | Ya lo miraste, el ejercicio cumplió |

Que este error exista es la mejor demostración del tip de la sección 5: sin `outDir`, el compilado no solo queda revuelto con el código fuente — **choca con él**.

## ❓ Quiz de lectura

> 🎙️ **El quiz NO se hace leyendo: se hace en vivo con el agente.** Las preguntas no están escritas aquí a propósito — verlas de antemano lo convierte en un ejercicio de copiar.
>
> Cuando estés listo, dile al agente: **"hagamos el quiz del M1 de TypeScript"**. Te dará **una pregunta a la vez**, esperará tu respuesta, la evaluará, y recién entonces pasará a la siguiente.
>
> Son 3 preguntas sobre código real, no sobre definiciones. Sin mirar los apuntes.

---

## Estado del cierre

- [ ] Micro-ejercicio hecho (con el compilador, no de memoria)
- [ ] Quiz respondido

Cuando ambos estén marcados, el módulo pasa a ✅ en `00_indice.md` y en el índice del workspace.

---
[[05_tsconfig-y-strict|← anterior]] · [[00_indice|índice]]
