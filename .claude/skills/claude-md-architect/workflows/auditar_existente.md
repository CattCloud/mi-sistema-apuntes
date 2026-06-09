# Workflow: Auditar CLAUDE.md existente

> **Cuándo usar este workflow:** el proyecto YA tiene un CLAUDE.md (en raíz o `.claude/`) y el usuario quiere saber si está bien diseñado o necesita refactor.

> **Salida esperada:** un reporte de diagnóstico con antipatrones detectados, razones, y plan de refactor priorizado. **NO se modifica ningún archivo del proyecto en este workflow** — la aplicación del refactor se hace en `refactorizar_inflado.md` después de la aprobación del usuario.

---

## Paso 1: Inventariar el sistema actual

Antes de auditar el contenido, mapea qué tiene el proyecto actualmente:

1. Listar archivos relacionados con contexto del agente:
   - `./CLAUDE.md` (raíz)
   - `./.claude/CLAUDE.md` (alternativa)
   - `./CLAUDE.local.md` (nivel local)
   - `./.claude/rules/` (path-scoping)
   - `./.claude/skills/` (skills locales)
   - `./.claude/settings.json` o `settings.local.json` (configuración + hooks)
   - `./agent_docs/` o equivalente (progressive disclosure)
   - CLAUDE.md en subdirectorios (buscar con `find . -name "CLAUDE.md"`)
2. Listar archivos sueltos en la raíz que parecen documentación de IA: `PLAN_*.md`, `HITO_*.md`, `TODOS.md`, `BACKLOG.md`, `ARCHITECTURE.md`, `VERIFICACION_*.md`, etc.
3. Contar líneas del CLAUDE.md principal.

**Reporta al usuario el inventario** antes de seguir, sin opinar todavía. Algo así:

```
INVENTARIO DEL SISTEMA ACTUAL

CLAUDE.md raíz: 153 líneas
Otros archivos:
  - .claude/rules/ con 3 archivos (date-timezone, module-grading, troubleshooting)
  - .claude/skills/ con 4 skills (frontend-design + 3 symlinks)
  - 15 archivos PLAN_*.md sueltos en la raíz
  - HITO_1_CONTEXTO.md (25 KB)
  - TODOS.md (12 KB)
  - VERIFICACION_FASE_06.md (6 KB)
  - ARCHITECTURE.md (16 KB, ya referenciado desde CLAUDE.md)
```

---

## Paso 2: Aplicar checklist de antipatrones

Lee `checklists/antipatrones.md` y aplica cada detector al CLAUDE.md actual. Para cada antipatrón detectado, anota:

- Qué líneas del archivo lo contienen (rango aproximado).
- Por qué es ese antipatrón (cita el criterio del checklist).
- Severidad: 🔴 alta / 🟡 media / 🟢 baja.

**Los 3 antipatrones principales que detectar:**

1. **Bitácora disfrazada de "features recientes"** — secciones que describen PRs específicos, fixes puntuales, decisiones de sprints pasados, ramas en curso. Típicamente bajo títulos como "Features recientes", "Cambios recientes", "Lo último", "Notas del sprint". Severidad alta.
2. **Hotfixes acumulados** — instrucciones tipo *"NUNCA hacer X"* que vienen de una mala respuesta del agente en una sesión pasada y se metieron al archivo "por si acaso". Difíciles de detectar — busca patrones repetitivos de prohibiciones muy específicas. Severidad media-alta.
3. **Reglas de estilo de código** — convenciones de indentación, comillas, naming, semicolons, etc. Severidad media (deberían ir a linter + hook).

**Antipatrones secundarios que también detectar:**

- **Procedimientos largos** que deberían estar en `agent_docs/` (cómo hacer deploy, cómo correr migraciones).
- **Reglas para tipos de archivo específicos** que deberían estar en `.claude/rules/` con path-scoping.
- **Información duplicada** con archivos referenciados (ej. mapa del repo + ARCHITECTURE.md que también lo describe).
- **Comandos obsoletos** o que ya no se usan.

---

## Paso 3: Evaluar el presupuesto

Lee `checklists/presupuesto.md` y aplica los criterios:

- ¿Cuántas líneas tiene el archivo? (rangos: <100 holgado, 100-200 al límite, >200 sobrecargado)
- ¿Cuántas son instrucciones efectivas? (no contar headers, líneas en blanco, separadores)
- ¿Qué porcentaje aproximado del archivo es onboarding universal vs contenido puntual?

**Resultado:** una métrica simple del tipo:

```
PRESUPUESTO ACTUAL
- Líneas totales: 153
- Instrucciones efectivas estimadas: ~80
- Universal vs puntual: 30% / 70%

DIAGNÓSTICO: El archivo está en el límite (153 líneas), pero el problema real
es la proporción. El 70% del contenido es bitácora de features, no onboarding.
```

---

## Paso 4: Detectar archivos sueltos que deberían estar organizados

Esto es específico de proyectos avanzados. Identifica:

- **Planes de feature sueltos en la raíz** (`PLAN_*.md`) → candidatos a moverse a `agent_docs/features/` con índice en CLAUDE.md.
- **Documentos de hitos/contexto histórico** (`HITO_*.md`, `VERIFICACION_*.md`) → evaluar si todavía aportan o si son bitácora vencida. Si aportan, a `agent_docs/history/`; si no, archivar fuera del repo de trabajo o eliminar.
- **TODOs/backlogs** (`TODOS.md`, `BACKLOG.md`) → estos NO van en CLAUDE.md jamás. Pertenecen al sistema de tracking (Linear/Jira/Notion) o quedan como archivos del usuario fuera del onboarding del agente.

---

## Paso 5: Generar reporte de diagnóstico

Consolida todo en un reporte estructurado para el usuario:

```
──────────────────────────────────────
📋 DIAGNÓSTICO DE CLAUDE.md — [Nombre del proyecto]
──────────────────────────────────────

🔍 INVENTARIO
[Resumen del Paso 1]

📏 PRESUPUESTO
[Métricas del Paso 3]

🚨 ANTIPATRONES DETECTADOS

🔴 ALTA: [Nombre del antipatrón]
   Líneas afectadas: [rango]
   Por qué: [criterio del checklist]
   Costo: [explicación de impacto, ej. "estas 60 líneas se evalúan en cada turno"]

🟡 MEDIA: [Nombre del antipatrón]
   ...

🟢 BAJA: [Nombre del antipatrón]
   ...

📂 ARCHIVOS SUELTOS A ORGANIZAR
[Lista del Paso 4]

──────────────────────────────────────
✅ PLAN DE REFACTOR PROPUESTO
──────────────────────────────────────

1. [Acción 1] — [bloque del archivo / archivos sueltos] → [destino]
   Beneficio: [reducción de líneas / mejora de señal / etc.]

2. [Acción 2] — ...

3. [Acción 3] — ...

[Continuar hasta cubrir todo lo detectado]

──────────────────────────────────────
¿Apruebas este diagnóstico y plan? Si sí, paso al workflow de
refactorización (refactorizar_inflado.md).
──────────────────────────────────────
```

---

## Paso 6: Esperar aprobación del usuario

**No modificar ningún archivo del proyecto hasta que el usuario apruebe el plan explícitamente.** El usuario puede:

- Aprobar todo el plan → pasar a `refactorizar_inflado.md`.
- Aprobar parcialmente → recortar el plan a lo aprobado y pasar a `refactorizar_inflado.md` con el plan reducido.
- Rechazar el plan → pedir feedback y reformular.
- Pedir más detalle sobre un punto específico → expandir ese punto, no aplicar nada.

---

## Conexión con otros workflows

| Después de este workflow | Workflow siguiente |
|---|---|
| Plan aprobado → aplicar refactor | `refactorizar_inflado.md` |
| Diagnóstico revela que falta `agent_docs/` o `.claude/rules/` y el usuario duda | `decidir_capa.md` |
| El usuario no quiere aplicar el refactor ahora, solo quería diagnóstico | Cerrar el workflow, dejar el reporte como referencia para después |
