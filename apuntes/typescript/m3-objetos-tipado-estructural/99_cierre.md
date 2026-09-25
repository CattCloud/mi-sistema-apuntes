---
tema: M3 — Objetos y tipado estructural
workspace: typescript
seccion: cierre
titulo: "Cierre del módulo — micro-ejercicio y quiz"
estado: superado
prev: 06_index-signatures-y-record
next: null
---
# 🟦 Cierre del módulo — micro-ejercicio y quiz

> **El módulo no cierra al terminar de leer las secciones.** Cierra aquí.

## 🧪 Micro-ejercicio — *excess property checking* con tus propias manos

Escribe en tu editor:

```ts
type Usuario = { id: number; nombre: string }

function saludar(usuario: Usuario) {
  return `Hola ${usuario.nombre}`
}
```

1. Llama a `saludar` pasándole un objeto **literal** (escrito entre llaves ahí mismo) con una propiedad de más, por ejemplo `edad`. Anota el error exacto que da TypeScript.

   Object literal may only specify known properties, and 'edad' does not exist in type 'Usuario'.(2353)

   Esto ya lo vimos, aqui no aplica el "AL MENOS"
2. Guarda ese mismo objeto en una `const` primero, y pásale la `const` a `saludar`. Anota qué pasa esta vez.

   No hay error, lo acepta y aplica el AL MENOS , pero por detras para el tipado estructural osea tienen la misma forma (id y nombre)
3. Antes de seguir, escribe en una línea **por qué** el paso 1 falla y el paso 2 no. No mires la sección 5 todavía.

   Esto es porque cuando se pasa directamente el objeto compara y considera esa propiedad de mas como una forma diferente , mientras que cuando le pasas a travez de una variable aplica tipado estructural con id-nombre concordando y aplicando AL MENOS con la propiedad adicional
4. Recién después, compara tu respuesta con la sección 5 (*excess property checking*) y corrígela si hace falta.

   Para corregirlo es simplemente pasarlo asi

   `type Usuario = { id: number; nombre: string }

   function saludar(usuario: Usuario) {
   return `Hola ${usuario.nombre}`
   }

   const usuario1={id:4,nombre:"Erick",edad:18};

   saludar(usuario1);`

**Qué mide:** si reconstruyes, sin el apunte delante, por qué el mismo objeto se trata distinto según cómo llega — la intención con la que se escribe (sección 5) —, no solo si recuerdas que "uno falla y el otro no".

## ❓ Quiz de lectura

> 🎙️ **El quiz NO se hace leyendo: se hace en vivo con el agente.** Las preguntas no están escritas aquí a propósito — verlas de antemano lo convierte en un ejercicio de copiar.
>
> Cuando estés listo, dile al agente: **"hagamos el quiz del M3 de TypeScript"**. Te dará **una pregunta a la vez**, esperará tu respuesta, la evaluará, y recién entonces pasará a la siguiente.
>
> Son 4 preguntas sobre código real, no sobre definiciones. Sin mirar los apuntes.

**Qué mide:** si aplicas, sobre código que no has visto, el tipado estructural con propiedades de más vía variable (sección 5), la diferencia entre `type` e `interface` (sección 4), cómo tipar un objeto de claves desconocidas (sección 6) y la diferencia entre `?.`, `??` y `!` — incluida cuál de las tres apaga la protección (sección 3).

---

## Estado del cierre

- [x] Micro-ejercicio hecho — 2026-09-17. Error exacto y corrección correctos. Un matiz: "al menos" sí aplica siempre (tiene id y nombre); *excess property checking* es una revisión extra que se suma en el objeto literal, no un reemplazo de "al menos". Falta el porqué de fondo: armado para ese tipo vs. reutilizado desde otro lado.
- [x] Quiz respondido — 2026-09-17. 2/4 completas (tipado estructural con variable, Record<string,string>), 2/4 con un hueco (declaration merging; usuario.direccion?.calle sin proteger usuario). Lo que falla queda en `reforzar:` del índice.

Al resolverlo se anota el resultado aquí y en el bloque `repaso:` del `00_indice.md`.

---

[[00_indice|índice]]
