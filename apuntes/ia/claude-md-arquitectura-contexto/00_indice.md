---
tema: CLAUDE.md — Arquitectura de Contexto
workspace: ia
estado: FINALIZADO
arquetipo: Constructor Teórico + Documento Técnico
repaso:
  ultimo: 2026-06-19
  proximo: 2026-06-24
  nivel: regular
  reforzar:
    - modelos stateless (por qué existe el system-reminder)
    - curva de degradación (no "corta" CLAUDE.md, degrada adherencia)
    - nivel Local (CLAUDE.local.md)
    - hooks vs .claude/rules (imposición dura)
notebooklm: pendiente
---

# 🤖 CLAUDE.md — Arquitectura de Contexto

> **Apunte sobre CLAUDE.md como sistema de contexto de Claude Code.** Estado: ✅ FINALIZADO · 9 secciones.

## Alcance

Cubre: reencuadre onboarding-vs-bitácora, mecánica del system-reminder, presupuesto de instrucciones y degradación, jerarquía por scope, carga perezosa, `.claude/rules/` + path-scoping, progressive disclosure (`agent_docs/`), `@imports`, CLAUDE.md vs hooks vs auto memory, y núcleo mínimo vs capas. Excluye: query loop, skills/sub-agentes, config de hooks paso a paso.

## Secciones

1. [[01_dolor-que-resuelve|¿Qué dolor resuelve CLAUDE.md?]] — ✅
2. [[02_que-es-realmente|¿Qué es CLAUDE.md realmente?]] — ✅
3. [[03_mecanica-system-reminder|¿Por qué importa tanto la cantidad? La mecánica del system-reminder]] — ✅
4. [[04_cuando-se-carga|¿Cuándo se carga CLAUDE.md? El presupuesto en cada interacción]] — ✅
5. [[05_sistema-de-archivos-scope|El sistema de archivos — jerarquía por scope]] — ✅
6. [[06_carga-perezosa|Carga perezosa — la pieza que evita inflar el contexto]] — ✅
7. [[07_mecanismos-escalar|Mecanismos para escalar sin inflar]] — ✅
8. [[08_guiar-vs-imponer|Guiar vs imponer — la línea técnica exacta]] — ✅
9. [[09_nucleo-minimo-vs-capas|La estructura práctica — núcleo mínimo vs capas que se ganan]] — ✅

## Fuentes

- Investigación consolidada (hilo P1). Links oficiales de Claude Code / HumanLayer: pendientes.

## Adiciones pendientes

- Ver `NOTAS.md` (redacción por nivel de scope; temas asociados: hooks, auto memory).
