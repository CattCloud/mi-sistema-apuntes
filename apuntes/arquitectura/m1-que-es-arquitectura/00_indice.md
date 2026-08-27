---
tema: M1 — Qué es arquitectura (y qué no)
workspace: arquitectura
modulo: M1
temario: contexto/plan_estudio/temario_arquitectura_software.md
estado: FINALIZADO
arquetipo: Constructor Teórico + Documento Técnico
caso: resuelto 2026-08-21 — clasificación 5/5, orden de reversión correcto y coherente
repaso:
  ultimo: 2026-08-21
  proximo: 2026-08-28
  nivel: bueno
  reforzar:
    - el trade-off como unidad (§4) — quedó a medias en la primera pasada; se termina de asentar en M5 y al pagar un trade-off malo en un proyecto propio
    - usar UN criterio único al clasificar (§1) — en el caso usó tres justificaciones distintas; llegó al resultado correcto pero sin unificar
    - "toca muchos archivos" NO es criterio de alcance (§1) — lo usó para justificar E; con A daría la respuesta equivocada
    - desempate entre dos decisiones caras (§2) — enumerar qué se toca / quién se entera / si hay datos en vivo
notebooklm: pendiente
---

# 🏛️ M1 — Qué es arquitectura (y qué no)

> **Módulo 1 del temario de Arquitectura de Software (nivel 3).** Estado: 🔄 EN PROGRESO · 5 secciones.
>
> El módulo que evita que compres un curso de SOLID pensando que es arquitectura.

## Pregunta que responde

¿Qué convierte una decisión técnica en **arquitectónica**? ¿Y por qué esas se deciden temprano y las otras no?

## Alcance

Cubre: qué distingue una decisión arquitectónica de una de diseño, el costo de reversión como criterio, los atributos de calidad (arquitectura *para qué*), el trade-off como unidad de decisión, y la arquitectura implícita de un proyecto donde nadie decidió nada.

Excluye: el rol de "arquitecto de software" como carrera, certificaciones y organigramas de equipo — aquí interesa la **disciplina**, no el puesto. Fuera de nivel 3: SOLID y patrones (nivel 2), system design (nivel 4) y arquitectura de IA (nivel 5) tienen temario propio.

> 📝 **Nota de método:** sin marcado ✅/🔄/❌. Todas las temáticas se desarrollan completas, sin obviar ninguna.

## Secciones

1. [[01_decision-arquitectonica|¿Qué distingue una decisión arquitectónica?]] — ✅ `[DOLOR] [DEF] [TABLA]` *(temática 1.1)*
2. [[02_costo-de-reversion|Costo de reversión]] — ✅ `[DEF] [ANALOGÍA] [TABLA]` *(temática 1.2)*
3. [[03_atributos-de-calidad|Atributos de calidad — arquitectura ¿para qué?]] — ✅ `[DEF] [TABLA]` *(temática 1.3)*
4. [[04_trade-off-como-unidad|El trade-off como unidad]] — ✅ `[DEF] [MITO]` *(temática 1.4)*
5. [[05_arquitectura-implicita|Arquitectura implícita]] — ✅ `[DOLOR] [DEF] [MITO]` *(temática 1.5)*

## Cierre del módulo

- [[99_cierre|🧩 Cierre — el caso]] — ✅ resuelto el 2026-08-21 (clasificación 5/5, orden correcto)

## Fuentes

- `contexto/plan_estudio/temario_arquitectura_software.md` — esqueleto (temáticas) y caso de cierre.
- Generación P3⇄P4 con el agente (fuente única + auto-contraste).
