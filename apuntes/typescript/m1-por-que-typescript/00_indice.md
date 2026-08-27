---
tema: M1 — Por qué TypeScript y cómo corre
workspace: typescript
modulo: M1
temario: contexto/plan_estudio/temario_typescript.md
estado: FINALIZADO       # generación ✅ (5 secciones). El cierre —micro-ejercicio y quiz— va aparte, en 99_cierre.md
arquetipo: Constructor Teórico + Flujo Analógico
ritmo: 🐢
repaso:
  ultimo: null
  proximo: null
  nivel: null
  reforzar: []
notebooklm: pendiente
---

# 🟦 M1 — Por qué TypeScript y cómo corre

> **Módulo 1 del temario de TypeScript.** Estado: 📝 secciones ✅ — falta el micro-ejercicio y el quiz · ritmo 🐢.
>
> El módulo que evita el malentendido más caro: creer que TypeScript te protege en runtime.

## Pregunta que responde

¿Qué hace TypeScript exactamente, en qué momento lo hace, y qué pasa con todo eso cuando tu código finalmente se ejecuta?

## Alcance

Cubre: qué clase de bugs atrapa y cuáles se le escapan siempre, el borrado de tipos, la frontera compile time / runtime, qué hace `tsc` y qué produce, y `tsconfig.json` con `strict`.

Excluye: configuración de bundlers, monorepos y build pipelines. Aquí solo `tsc`, `tsconfig` y correrlo en Node.

> 📝 **Nota de método:** sin marcado ✅/🔄/❌. Todas las temáticas se desarrollan completas. Piso en cero — los tipos que ya existen en Min-Commerce o FastCRM los escribió la IA y no cuentan.

## Secciones

1. [[01_que-problema-resuelve|Qué problema resuelve (y cuál no)]] — ✅ `[DOLOR] [DEF] [TABLA]` *(temática 1.1)*
2. [[02_los-tipos-se-borran|Los tipos se borran]] — ✅ `[DEF] [CÓDIGO] [FLUJO:ascii]` *(temática 1.2)*
3. [[03_compile-time-vs-runtime|Compile time vs runtime]] — ✅ `[DEF] [ANALOGÍA] [MITO] [TABLA]` *(temática 1.3)*
4. [[04_tsc-y-el-flujo|`tsc` y el flujo de trabajo]] — ✅ `[FASES] [CÓDIGO]` *(temática 1.4)*
5. [[05_tsconfig-y-strict|`tsconfig.json` y `strict`]] — ✅ `[DEF] [CÓDIGO] [TABLA]` *(temática 1.5)*

## Cierre del módulo

El módulo **no cierra al terminar las secciones**. Su micro-ejercicio y su quiz viven en su propio archivo:

- [[99_cierre|🧪 Cierre — micro-ejercicio y quiz]] — ⬜ pendiente

## Fuentes

- `contexto/plan_estudio/temario_typescript.md` — esqueleto (temáticas), micro-ejercicio y quiz.
- `_input/notion_introduccion-typescript.md` — apunte propio traído de Notion. Cubre material para las secciones 1, 2, 3, 4 y 5 (y también inferencia, que pertenece al M2).
- Generación P3⇄P4 con el agente (fuente única + auto-contraste).
