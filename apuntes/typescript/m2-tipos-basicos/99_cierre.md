---
tema: M2 — Tipos básicos e inferencia
workspace: typescript
seccion: cierre
titulo: "Cierre del módulo — micro-ejercicio y quiz"
estado: parcial
prev: 07_literal-types-y-as-const
next: null
---
# 🟦 Cierre del módulo — micro-ejercicio y quiz

> **El módulo no cierra al terminar de leer las secciones.** Cierra aquí.

## 🧪 Micro-ejercicio — qué infiere TypeScript cuando te callas

Declara estas cinco variables **sin anotar ninguna**. Pasa el mouse por encima de cada una en el editor y **anota qué tipo infirió TypeScript**:



```ts
const a = 5  Es tipo 5
let b = 5 Es tipo number
const c = [1, 2, 3] Es tipo number[]
const d = { nombre: "Erick" } Es tipo { nombre: string}
const e = ["a", "b"] as const  Es de tipo ["a", "b"]
```

Escribe tu predicción **antes** de pasar el mouse. Tres de los cinco resultados sorprenden.

**Qué mide:** si reconstruyes, sin ayuda del editor, las reglas de inferencia y ensanchamiento de las secciones 2 y 7 (`const` vs `let`, un array vacío, un objeto, `as const`), en vez de reconocerlas solo cuando las lees ya explicadas.

> 💡 Si te sale el error de declaraciones duplicadas al compilar, es lo mismo del M1: el `.js` generado choca con el `.ts`. Ver el cierre del M1.

## ❓ Quiz de lectura

> 🎙️ **El quiz NO se hace leyendo: se hace en vivo con el agente.** Las preguntas no están escritas aquí a propósito — verlas de antemano lo convierte en un ejercicio de copiar.
>
> Cuando estés listo, dile al agente: **"hagamos el quiz del M2 de TypeScript"**. Te dará **una pregunta a la vez**, esperará tu respuesta, la evaluará, y recién entonces pasará a la siguiente.
>
> Son 3 preguntas sobre código real, no sobre definiciones. Sin mirar los apuntes.

**Qué mide:** si aplicas, sobre código que no has visto, el ensanchamiento y las uniones (secciones 2, 6 y 7), la diferencia entre `any` y `unknown` (sección 5) y la inferencia de un array mezclado (secciones 2 y 6) — leer tipos ajenos, no recitar una definición.

---

## Estado del cierre

- [x] Micro-ejercicio hecho — 4/5 correctas. `const e = ["a", "b"] as const` es `readonly ["a", "b"]`, no `["a", "b"]`: falta el `readonly` que agrega `as const` (sección 7).
- [x] Quiz respondido — 2026-09-16. 1/3 completa (`any` vs `unknown`), 1/3 correcta sin el mecanismo del ensanchamiento, 1/3 incorrecta (confundió array de unión con tupla). Lo que falla queda en `reforzar:` del índice.

---

[[00_indice|índice]]
