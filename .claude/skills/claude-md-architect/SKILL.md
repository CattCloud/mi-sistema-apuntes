---
name: claude-md-architect
description: Crear, auditar o refactorizar el sistema de CLAUDE.md de un proyecto siguiendo los principios de onboarding mínimo, presupuesto de instrucciones y capas que se ganan con dolor concreto. Útil tanto para proyectos nuevos como para proyectos avanzados con CLAUDE.md ya existente que necesita refactor.
---

# Skill: CLAUDE.md Architect

## Cuándo invocar esta skill

Invoca esta skill cuando el usuario quiera trabajar sobre la arquitectura de CLAUDE.md de un proyecto. Las señales típicas son:

- *"Vamos a crear un CLAUDE.md para este proyecto."*
- *"Revisa mi CLAUDE.md, creo que está muy inflado."*
- *"Tengo archivos de planeación sueltos en la raíz, ¿cómo los organizo?"*
- *"Claude ignora las reglas de mi CLAUDE.md, ¿qué está mal?"*
- *"Voy a refactorizar el contexto del proyecto para que sea más limpio."*
- *"¿Debo agregar `agent_docs/` / `.claude/rules/` / `CLAUDE.local.md` a este proyecto?"*

Si no estás seguro de si aplica, pregúntate: *"¿esto tiene que ver con cómo le doy contexto al agente sobre el proyecto?"*. Si sí, invoca la skill.

## Workflows disponibles

Esta skill tiene 6 workflows organizados en dos grupos: **trabajo inicial** y **mantenimiento continuo**.

### Trabajo inicial

| Workflow | Cuándo usarlo |
|---|---|
| `workflows/auditar_existente.md` | **Caso más común.** El proyecto YA tiene un CLAUDE.md y el usuario sospecha que está inflado, desordenado o ignorado por el agente. Diagnóstica antipatrones y propone refactor. |
| `workflows/refactorizar_inflado.md` | Después de auditar, aplicar el plan de refactor: mover bloques a `agent_docs/`, extraer reglas a `.claude/rules/`, separar `CLAUDE.local.md`, validar resultado. |
| `workflows/crear_desde_cero.md` | El proyecto NO tiene CLAUDE.md aún. Entrevista al usuario y genera el núcleo mínimo. |
| `workflows/decidir_capa.md` | El usuario duda si agregar una capa adicional (`agent_docs/`, `.claude/rules/`, CLAUDE.md por subdirectorio, `CLAUDE.local.md`). Decision tree basado en señales del proyecto. |

### Mantenimiento continuo (sostener el sistema en el tiempo)

| Workflow | Cuándo usarlo |
|---|---|
| `workflows/gate_de_entrada.md` | **ANTES** de cualquier edición a CLAUDE.md, `agent_docs/`, `.claude/rules/`, o `CLAUDE.local.md`. Filtro automático que detecta antipatrones y redirige contenido al lugar correcto. **El agente debe invocarlo proactivamente.** |
| `workflows/auditoria_periodica.md` | Revisión ligera del sistema cada 1-3 meses o cuando un trigger lo dispara. Detecta degradación temprana, mantenimiento de `agent_docs/`, validación del núcleo mínimo. |

**Regla de selección:**
- ¿Proyecto sin CLAUDE.md? → `crear_desde_cero.md`.
- ¿Proyecto con CLAUDE.md existente que necesita revisión? → `auditar_existente.md`.
- ¿Cualquier edición a archivos del sistema? → `gate_de_entrada.md` automáticamente.
- ¿Revisión periódica de salud? → `auditoria_periodica.md`.

## Principios que aplica esta skill

Toda decisión que tome la skill debe alinearse con estos cinco principios. Si una recomendación contradice alguno, la skill está mal aplicada.

1. **CLAUDE.md es onboarding, no bitácora.** Si una línea es contexto histórico ("el fix del PR #77", "decisión de Gaby del sprint pasado"), no va. El onboarding es estable; la bitácora la lleva el agente solo vía auto memory.
2. **Cada línea se evalúa en cada turno → costo persistente.** Una línea en CLAUDE.md es ruido o señal evaluado N veces en una conversación de N turnos. No hay "agregar por si acaso" sin costo.
3. **Presupuesto de instrucciones limitado → menos es más.** Modelos frontera siguen consistentemente ~150-200 instrucciones. Pasarse degrada la adherencia a TODAS las reglas, no solo a las nuevas (degradación uniforme).
4. **Las capas se ganan con dolor concreto, no se adoptan preventivamente.** No agregues `agent_docs/`, `.claude/rules/`, o subdirectorios "por si en algún momento crece". Solo cuando hay un síntoma real que la capa resuelve.
5. **Guiar (CLAUDE.md) vs imponer (hooks) vs registrar (auto memory).** Si una regla NO admite excepción → hook. Si es onboarding del proyecto → CLAUDE.md. Si es aprendizaje del agente → auto memory (que el agente maneja solo).

## Recursos de la skill

Los workflows y plantillas se cargan bajo demanda. No los leas todos al inicio — solo el que aplique al caso del usuario.

| Carpeta | Qué contiene |
|---|---|
| `workflows/` | Los 6 procesos paso a paso (4 de trabajo inicial + 2 de mantenimiento continuo). |
| `plantillas/` | 4 plantillas listas para adaptar (núcleo mínimo, CLAUDE.local, índice de agent_docs/, ejemplo de .claude/rules/). |
| `checklists/` | 4 checklists (antipatrones, evaluación de presupuesto, filtro antes de agregar líneas, triggers de re-evaluación). |
| `referencias/conceptos_clave.md` | Mini-glosario. Léelo solo si necesitas refrescar un término concreto (scope, lazy loading, path-scoping, progressive disclosure, system-reminder, antipatrón). |

## Reglas operativas para el agente

Cuando ejecutes esta skill, sigue estas reglas:

- **Antes de cualquier edición a CLAUDE.md, `agent_docs/`, `.claude/rules/`, o `CLAUDE.local.md`, invoca `workflows/gate_de_entrada.md` automáticamente.** Esto NO es opcional — es la primera línea de defensa contra la degradación. Si el cambio es trivial (1 línea ajustando un comando ya existente), el gate es rápido (1 minuto); si el cambio es grande, el gate ahorra mucho trabajo de refactor futuro.
- **Nunca modifiques archivos del proyecto sin presentar primero el plan al usuario y obtener aprobación.** Los workflows están diseñados para presentar diagnóstico y plan antes de aplicar cambios.
- **Trata cada decisión como reversible.** Si vas a mover contenido de CLAUDE.md a `agent_docs/`, deja un commit limpio para que el usuario pueda revertir.
- **Prioriza pragmatismo sobre purismo.** Si una recomendación del manual no encaja con el caso del usuario por una razón real, dilo abiertamente y propón una alternativa. No hagas refactor por refactor.
- **Mantente atento a los triggers.** Lee `checklists/triggers_reevaluacion.md` cuando uses la skill por primera vez. Durante cualquier sesión donde el usuario esté trabajando en el proyecto, si detectas un trigger, **menciónalo proactivamente** aunque la conversación esté sobre otra cosa.
- **Spanglish controlado.** Tecnicismos en inglés (scope, lazy loading, path-scoping, progressive disclosure, hooks, frontmatter), explicaciones en español.

## Mantenimiento del sistema (sostenibilidad)

Aplicar el sistema una vez no garantiza que se mantenga. La degradación entra por inercia: PRs grandes, debugging frustrante, decisiones de sprint, "agreguemos esto por si acaso". Para que el sistema se sostenga en el tiempo, esta skill incluye **3 mecanismos de defensa**:

1. **Gate de entrada (`workflows/gate_de_entrada.md`)** — protege contra cada edición individual al sistema. El agente lo invoca automáticamente.
2. **Auditoría periódica (`workflows/auditoria_periodica.md`)** — chequeo de salud cada 1-3 meses o al disparar un trigger.
3. **Triggers de re-evaluación (`checklists/triggers_reevaluacion.md`)** — eventos del proyecto que disparan obligatoriamente alguno de los workflows anteriores.

**Principio clave:** el sistema no se mantiene solo. Pero el agente, usando esta skill con disciplina, sí lo puede mantener — convirtiendo la sostenibilidad en parte del flujo de trabajo en vez de una tarea aparte que el usuario tiene que recordar.
