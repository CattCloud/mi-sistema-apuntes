---
tema: M2 — Tipos básicos e inferencia
workspace: typescript
modulo: M2
temario: contexto/plan_estudio/temario_typescript.md
estado: FINALIZADO
arquetipo: Sintaxis Coder + Constructor Teórico
ritmo: 🏃
repaso:
  ultimo: null
  proximo: null
  nivel: null
  reforzar:
    - "Por qué config.modo se ensancha a string aunque config sea const: la propiedad se puede reasignar, así que TypeScript no puede prometer el literal exacto (sección 7)"
    - "Un array literal sin anotar nunca infiere tupla: [1, "a", true] es (number | string | boolean)[], no [number, string, boolean] — la tupla se declara a mano (secciones 4 y 6)"
notebooklm: pendiente
---

# 🟦 M2 — Tipos básicos e inferencia

> **Módulo 2 del temario de TypeScript.** Estado: ✅ FINALIZADO · 7 secciones · ritmo 🏃.
>
> El módulo que te enseña a escribir **menos** tipos, no más. La mitad de TypeScript es saber cuándo callarte.

## Pregunta que responde

¿Cuándo tengo que anotar un tipo y cuándo TypeScript ya lo sabe mejor que yo?

## Alcance

Cubre: los tipos primitivos y cómo se anotan, la inferencia y sus sorpresas, el criterio para decidir cuándo anotar y cuándo callarse, arrays y tuplas, los cuatro tipos especiales (`any`, `unknown`, `never`, `void`), la introducción a las uniones (`|`) y los literal types con `as const`. Las uniones a fondo (operar antes de distinguir, narrowing, discriminadas) quedan para M5.

Excluye: los `enum` — se mencionan y se explica por qué se usan poco hoy. Símbolos y BigInt: solo se nombran para que los reconozcas.

> 📝 **Nota de método:** sin marcado. Todas las temáticas se desarrollan completas. Piso en cero.

## Secciones

1. [[01_primitivos-y-anotacion|Primitivos y anotación]] — ✅ `[DEF] [CÓDIGO] [TABLA]` *(temática 2.1)*
2. [[02_inferencia|Inferencia]] — ✅ `[DEF] [CÓDIGO] [MITO]` *(temática 2.2)*
3. [[03_cuando-anotar|Cuándo anotar vs callarse]] — ✅ `[TABLA] [CÓDIGO]` *(temática 2.3)*
4. [[04_arrays-y-tuplas|Arrays y tuplas]] — ✅ `[DEF] [CÓDIGO] [TABLA]` *(temática 2.4)*
5. [[05_any-unknown-never-void|`any`, `unknown`, `never`, `void`]] — ✅ `[DEF] [TABLA] [CÓDIGO]` *(temática 2.5)*
6. [[06_uniones-introduccion|Uniones: introducción]] — ✅ `[DEF] [CÓDIGO] [TABLA]` *(temática 2.6)*
7. [[07_literal-types-y-as-const|Literal types y `as const`]] — ✅ `[DEF] [CÓDIGO]` *(temática 2.7)*

## Cierre del módulo

### 🧪 Micro-ejercicio

Declarar cinco variables **sin anotar ninguna**, pasar el mouse por encima en el editor y anotar qué tipo infirió TypeScript en cada una. Tres de las cinco sorprenden. El código está en el temario, sección M2.

### ❓ Quiz de lectura

3 preguntas sobre código real. En el temario, sección M2.

## Fuentes

- `contexto/plan_estudio/temario_typescript.md` — esqueleto, micro-ejercicio y quiz.
- `../m1-por-que-typescript/_input/notion_introduccion-typescript.md` — la sección 1.2 de esa nota cubre inferencia y tipado explícito/implícito (material para las secciones 2 y 3).
- Generación P3⇄P4 con el agente.
