---
tema: M4 — Funciones
workspace: typescript
modulo: M4
temario: contexto/plan_estudio/temario_typescript.md
estado: FINALIZADO
arquetipo: Sintaxis Coder + Documento Técnico
ritmo: 🏃
repaso:
  ultimo: null
  proximo: null
  nivel: null
  reforzar:
    - "Un parámetro con valor por defecto tiene tipo `string` a secas dentro de la función, no `string | undefined`: por eso no hay nada que comprobar antes de usarlo (sección 2)"
    - "Un requerido después de un `?` no compila y no se arregla pasando `undefined`; lo que sí compila es un requerido después de un parámetro con valor por defecto, y ahí quien llama queda obligado a escribir `undefined` (sección 2)"
    - "En un callback `=> void`, el que ignora el valor es quien recibe el callback, no el callback; el valor sigue existiendo en ejecución y solo queda inalcanzable por el tipo (sección 3)"
notebooklm: pendiente
---

# 🟦 M4 — Funciones

> **Módulo 4 del temario de TypeScript.** Estado: ✅ FINALIZADO · 4 secciones · ritmo 🏃 · cierre pendiente.
>
> Tu JavaScript de funciones ya es sólido: aquí solo aprendes a describirlo. Módulo corto a propósito.

## Pregunta que responde

¿Cómo describo lo que entra y lo que sale de una función, incluyendo las funciones que recibo como argumento?

## Alcance

Cubre: anotar parámetros y retorno (y cuándo conviene callarse y dejar que se infiera), parámetros opcionales, con valor por defecto y rest, cómo se tipa una función que se pasa como argumento (callback), y cómo se leen las sobrecargas que traen las librerías.

Excluye: `this` tipado y decoradores — casi no aparecen en código funcional moderno. Tipar una función que sirva *para cualquier tipo* necesita genéricos, y eso es → **M6 · Genéricos**.

> 📝 **Nota de método:** sin marcado previo. Las cuatro temáticas se desarrollan completas. Piso en cero.
>
> 📝 **Sobre 4.4:** las sobrecargas entran en modo *reconocer*, no en modo *escribir*. El objetivo es que no te bloquees al abrir el `.d.ts` de una librería y ver la misma función declarada tres veces.

## Secciones

1. [[01_parametros-y-retorno|Parámetros y retorno]] — ✅ `[DEF] [CÓDIGO] [TABLA]` *(temática 4.1)*
2. [[02_opcionales-default-y-rest|Opcionales, default y rest]] — ✅ `[CÓDIGO] [TABLA]` *(temática 4.2)*
3. [[03_tipar-callbacks|Tipar callbacks]] — ✅ `[DOLOR] [DEF] [CÓDIGO]` *(temática 4.3)*
4. [[04_sobrecargas|Sobrecargas (reconocer)]] — ✅ `[DOLOR] [DEF] [CÓDIGO]` *(temática 4.4)*

## Cierre del módulo

- [[99_cierre|🧪 Cierre — micro-ejercicio y quiz]] — ⬜ pendiente

## Fuentes

- `contexto/plan_estudio/temario_typescript.md` — esqueleto, micro-ejercicio y quiz.
- Generación P3⇄P4 con el agente.
