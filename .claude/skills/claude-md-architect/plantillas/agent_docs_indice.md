# Plantilla: Índice de `agent_docs/` dentro de CLAUDE.md

> Plantilla para el bloque que va en CLAUDE.md raíz cuando se usa progressive disclosure con `agent_docs/`. **El índice vive en CLAUDE.md; los archivos detallados viven en `agent_docs/`.**

> **Importante:** los ejemplos cubren proyectos de tipos distintos (web app, microservicio backend, data pipeline) para mostrar que el patrón es universal. Adaptar al tipo y stack real del proyecto del usuario.

---

## Estructura recomendada de `agent_docs/`

```plain text
agent_docs/
├── features/                     ← Decisiones, planes, contexto por feature
│   ├── [feature_1].md
│   ├── [feature_2].md
│   └── ...
├── procedures/                   ← Procedimientos operativos detallados
│   ├── deploying.md
│   ├── running_migrations.md
│   └── ...
└── history/ (opcional)           ← Contexto histórico que sigue siendo útil
    └── [migracion_x].md
```

---

## Plantilla del índice en CLAUDE.md

```markdown
## Decisiones por feature (lee solo si vas a tocar ese feature)

- `agent_docs/features/[feature_1].md` — [Cuándo leerlo. Ej: "Para tareas que toquen autenticación."]
- `agent_docs/features/[feature_2].md` — [Cuándo leerlo.]
- `agent_docs/features/[feature_3].md` — [Cuándo leerlo.]

## Procedimientos operativos

- `agent_docs/procedures/[proceso_1].md` — [Cuándo leerlo. Ej: "Para tareas de deploy."]
- `agent_docs/procedures/[proceso_2].md` — [Cuándo leerlo.]
```

---

## Ejemplos reales

### Ejemplo A: E-commerce con varias features documentadas

```markdown
## Decisiones por feature (lee solo si vas a tocar ese feature)

- `agent_docs/features/auth_oauth_decision.md` — Para tareas que tocan autenticación, OAuth o NextAuth.
- `agent_docs/features/cart_persistence_design.md` — Para tareas del carrito o persistencia de estado.
- `agent_docs/features/payment_provider_choice.md` — Para integraciones de pago.
- `agent_docs/features/notifications_v2_plan.md` — Si vas a trabajar en la siguiente versión de notificaciones.

## Procedimientos operativos

- `agent_docs/procedures/running_tests.md` — Para correr tests o entender por qué fallan.
- `agent_docs/procedures/deploying.md` — Para tareas de despliegue.
```

### Ejemplo B: Microservicio backend con varias integraciones

```markdown
## Decisiones por feature (lee solo si vas a tocar ese feature)

- `agent_docs/features/event_publishing.md` — Para tareas que publican eventos al broker. Convenciones de naming de topics y schema evolution.
- `agent_docs/features/idempotency_keys.md` — Para endpoints que aceptan operaciones reintentables.
- `agent_docs/features/payment_provider_integration.md` — Para integraciones con pasarelas de pago.

## Procedimientos operativos

- `agent_docs/procedures/db_migration_to_prod.md` — Cómo aplicar migraciones en producción (proceso manual con infra).
- `agent_docs/procedures/replaying_failed_events.md` — Cómo reprocesar eventos que fallaron en el consumidor.

## Contexto histórico

- `agent_docs/history/v1_to_v2_api_migration.md` — Por qué se rediseñó la API y qué endpoints quedaron deprecados.
```

### Ejemplo C: Data pipeline / proyecto de procesamiento

```markdown
## Decisiones por feature (lee solo si vas a tocar ese pipeline)

- `agent_docs/features/ingest_pipeline.md` — Pipeline de ingesta de logs crudos. Particionamiento por día y formato Parquet.
- `agent_docs/features/aggregation_jobs.md` — Jobs de agregación nocturna. SLA, dependencias entre jobs, política de reintento.
- `agent_docs/features/data_quality_checks.md` — Validaciones de calidad de datos. Qué se valida, dónde, qué hacer si falla.

## Procedimientos operativos

- `agent_docs/procedures/running_backfill.md` — Cómo correr un backfill manual cuando se detecta data faltante.
- `agent_docs/procedures/promoting_dataset_to_prod.md` — Pasos para promover un dataset de staging a producción.
```

---

## Cómo escribir cada archivo de `agent_docs/`

Cada archivo en `agent_docs/` debe ser **autónomo**: el agente lo lee sin más contexto que el del CLAUDE.md y debe poder entenderlo.

Estructura recomendada por archivo:

```markdown
# [Título descriptivo del feature/procedimiento]

> [Una oración que diga cuándo este archivo es relevante.]

## Contexto

[Por qué este feature/procedimiento existe. Qué problema resuelve.]

## Decisiones tomadas

- **[Decisión 1].** Razón: [por qué].
- **[Decisión 2].** Razón: [por qué].

## Implementación clave

[Punteros a archivos específicos del código — no copias.]

- `src/lib/auth.ts:42` — Lógica central del flujo.
- `src/components/AuthButton.tsx` — Componente del botón.

## Gotchas

- [Cosas no obvias que pueden tropezarte.]

## Trabajo pendiente / siguiente versión

[Solo si aplica. Ideas para la próxima iteración.]
```

---

## Regla de oro: punteros, no copias

En `agent_docs/`, prefiere referencias `archivo:línea` sobre fragmentos de código copiados. Las copias se desactualizan; las referencias siempre apuntan al estado actual del código.

**Bien:**
```markdown
La validación del token vive en `src/lib/auth.ts:42` (función `validateToken`).
```

**Mal:**
```markdown
La validación del token se hace así:
\`\`\`ts
export function validateToken(token: string) {
  // ... 30 líneas de código ...
}
\`\`\`
```

El segundo caso significa que cada cambio al código requiere acordarte de actualizar `agent_docs/`. En la práctica nadie lo hace y el archivo se desactualiza.

---

## Cuándo NO crear un archivo en `agent_docs/`

- **Cuando el contenido cabe en 5 líneas.** Esas 5 líneas pueden vivir directamente en CLAUDE.md o en el código mismo (comentarios). No vale la pena el overhead del archivo separado.
- **Cuando el contenido es bitácora vencida.** Si el feature ya cerró y no se va a volver a tocar, evalúa si vale la pena guardarlo o si es solo ruido histórico.
- **Cuando el contenido es estilo de código.** Eso va a linter, no a `agent_docs/`.
