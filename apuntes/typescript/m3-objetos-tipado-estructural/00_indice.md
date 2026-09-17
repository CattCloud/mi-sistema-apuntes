---
tema: M3 — Objetos y tipado estructural
workspace: typescript
modulo: M3
temario: contexto/plan_estudio/temario_typescript.md
estado: EN PROGRESO
arquetipo: Sintaxis Coder + Constructor Teórico
ritmo: 🏃
repaso:
  ultimo: null
  proximo: null
  nivel: null
  reforzar: []
notebooklm: pendiente
---

# 🟦 M3 — Objetos y tipado estructural

> **Módulo 3 del temario de TypeScript.** Estado: 🔄 EN PROGRESO · 6 secciones · ritmo 🏃.
>
> TypeScript no compara nombres, compara **forma**. Ese detalle explica el 90% de sus mensajes de error.

## Pregunta que responde

¿Cómo describo la forma de un objeto, y por qué TypeScript acepta cosas que yo no declaré compatibles?

## Alcance

Cubre: tipar la forma de un objeto, propiedades opcionales y `readonly`, leer un valor que puede no existir (`?.`, `??`, `!`), `type` vs `interface`, el tipado estructural (por qué un objeto sin declarar como un tipo puede pasar como ese tipo) e index signatures / `Record` para objetos con claves desconocidas.

Excluye: clases y modificadores de acceso (`private`, `protected`) — se ven de pasada; el stack real del usuario usa funciones y objetos, no jerarquías de clases.

> 📝 **Nota de método:** sin marcado. Todas las temáticas se desarrollan completas. Piso en cero.
>
> 📝 **Sobre 3.3:** `?.` y `??` son operadores de JavaScript, no de TypeScript — funcionan igual en un `.js`. Entran aquí porque es donde se vuelven necesarios: justo después de declarar una propiedad opcional, hay que leerla. El `!` sí es exclusivo de TypeScript y es el que se mira con cuidado: no comprueba nada, solo silencia al compilador. La comprobación real con `if` y cómo TypeScript razona sobre ella es de → **M5 · Uniones, narrowing y discriminadas**.

## Secciones

1. [[01_tipar-un-objeto|Tipar un objeto]] — ✅ `[DEF] [CÓDIGO]` *(temática 3.1)*
2. [[02_opcionales-y-readonly|Opcionales y `readonly`]] — ✅ `[DEF] [CÓDIGO] [TABLA]` *(temática 3.2)*
3. [[03_leer-lo-opcional|Leer lo opcional: `?.`, `??` y `!`]] — ✅ `[CÓDIGO] [TABLA]` *(temática 3.3)*
4. [[04_type-vs-interface|`type` vs `interface`]] — ✅ `[TABLA] [CÓDIGO]` *(temática 3.4)*
5. [[05_tipado-estructural|Tipado estructural]] — ✅ `[DEF] [CÓDIGO] [MITO]` *(temática 3.5)*
6. [[06_index-signatures-y-record|Index signatures y `Record`]] — 🔄 `[DEF] [CÓDIGO]` *(temática 3.6)*

## Cierre del módulo

Se arma con `cerrar-modulo` al terminar las secciones. Por T6 (ruta TypeScript): micro-ejercicio con el compilador (*excess property checking*) + quiz de lectura en vivo, 4 preguntas. Vive en `99_cierre.md` cuando se cree.

## Fuentes

- `contexto/plan_estudio/temario_typescript.md` — esqueleto, micro-ejercicio y quiz.
- Generación P3⇄P4 con el agente.
