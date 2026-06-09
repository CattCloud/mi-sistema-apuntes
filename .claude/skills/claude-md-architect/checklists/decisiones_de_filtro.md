# Checklist: Filtro antes de agregar líneas

> La pregunta clave que cada línea de CLAUDE.md debe pasar antes de entrar al archivo. Aplicar siempre que el usuario o el agente considere agregar algo nuevo al CLAUDE.md.

---

## La pregunta filtro

> **"¿Esto sirve para onboardear al agente en CUALQUIER sesión futura del proyecto?"**

Si la respuesta es **sí**, la línea entra.
Si la respuesta es **no** (o "depende"), la línea NO entra al CLAUDE.md raíz. Probablemente va a otro lado, o no va a ningún lado.

---

## Sub-preguntas para casos ambiguos

Si no estás seguro de la respuesta a la pregunta filtro, aplicar estas sub-preguntas:

### Sub-pregunta 1: Universalidad

*"¿Esto aplica en cualquier tipo de tarea (feature nueva, bugfix, refactor, deploy, debugging) o solo en algunas?"*

- **Cualquier tarea:** universal → CLAUDE.md raíz.
- **Solo algunas:** puntual → considerar `agent_docs/` o `.claude/rules/`.

### Sub-pregunta 2: Estabilidad temporal

*"¿Esto va a ser cierto en 6 meses, o probablemente cambie?"*

- **Cierto en 6 meses:** estable → CLAUDE.md.
- **Probablemente cambie:** efímero → NO va en CLAUDE.md. Va a `CLAUDE.local.md` (si es personal) o a `agent_docs/` (si es de feature en evolución) o a ningún lado (si es contexto de sprint actual).

### Sub-pregunta 3: Descubrimiento por el agente

*"¿El agente puede descubrir esto fácilmente leyendo el código?"*

- **Sí, fácil (1-2 archivos):** NO va en CLAUDE.md. Confiar en que el agente lo descubrirá.
- **Sí, pero costoso (varios archivos, lectura lenta):** evaluar. Si la sesión típica lo necesita, sí va; si solo a veces, va a `agent_docs/`.
- **No, vive solo en tu cabeza o en el chat del equipo:** SÍ va en CLAUDE.md. Esto es exactamente lo que más valor tiene capturar.

### Sub-pregunta 4: Tipo de regla

*"¿Esto se puede aplicar mecánicamente (linter, hook) o requiere juicio?"*

- **Mecánico (estilo, formato, seguridad bloqueable):** NO va en CLAUDE.md. Va a linter + hook.
- **Requiere juicio:** SÍ va en CLAUDE.md o `.claude/rules/`.

---

## Casos de uso típicos

### Caso A: "Acabo de descubrir que hay que correr X comando antes de Y"

Aplicar el filtro:
- ¿Universal? Probablemente sí (procedimiento de build).
- ¿Estable? Sí, mientras la arquitectura no cambie.
- ¿Descubrible? Si está en `package.json`, sí. Si requiere conocimiento del flujo, no.

**Decisión:** si el comando es estándar (`npm run build`), no va. Si es un procedimiento no-obvio (correr esto antes de aquello con razón específica), va a `agent_docs/procedures/`.

### Caso B: "Quiero que Claude no se equivoque en este caso específico que me pasó hoy"

Aplicar el filtro:
- ¿Universal? **No** — es un caso específico de hoy.
- ¿Estable? Probablemente no.

**Decisión:** NO va en CLAUDE.md. Es un hotfix. Si el caso vuelve a aparecer 3+ veces, entonces sí amerita pensarlo como patrón. Mientras tanto, dejar que la auto memory del agente lo capture.

### Caso C: "Quiero documentar la decisión de por qué elegimos X tecnología"

Aplicar el filtro:
- ¿Universal? Sí, es contexto fundamental del proyecto.
- ¿Estable? Sí (las decisiones de arquitectura no suelen cambiar).
- ¿Descubrible? **No** — el por qué vive en tu cabeza, no en el código.

**Decisión:** SÍ va en CLAUDE.md, en la sección "Decisiones de diseño".

### Caso D: "Tenemos convenciones de naming muy específicas para los tests"

Aplicar el filtro:
- ¿Universal? **No** — solo aplica a tests.
- ¿Estable? Sí.
- ¿Mecánico? Algunas convenciones sí (linter rules), otras no (estructura del nombre).

**Decisión:** las mecánicas → linter. Las no mecánicas (estructura, lenguaje, formato) → `.claude/rules/` con `paths: "**/*.test.ts"`.

### Caso E: "Hay un plan de feature que estoy desarrollando esta semana"

Aplicar el filtro:
- ¿Universal? **No** — solo aplica si trabajas en ese feature.
- ¿Estable? **No** — el plan cambia conforme avanza el feature.

**Decisión:** NO va en CLAUDE.md. Va a `agent_docs/features/[feature].md`. Cuando el feature cierre, decidir si el archivo queda (como decisión documentada) o se elimina.

---

## Anti-respuestas comunes

Cuando el filtro dice "no entra", pero el usuario insiste, escuchar las razones y aplicar este checklist de anti-respuestas:

| Razón del usuario | Anti-respuesta |
|---|---|
| *"Quiero acordarme yo de esto"* | CLAUDE.md no es tu cuaderno. Eso va a un lugar tuyo (`CLAUDE.local.md`, notas personales, sistema de tareas). |
| *"Por si acaso lo necesito"* | El "por si acaso" es activamente perjudicial. Cada línea no usada degrada las que sí se usan. |
| *"Es solo una línea, no afecta"* | Una sola línea no, pero la mentalidad de "es solo una" es la que infla los archivos. Aplicar el filtro consistentemente. |
| *"Mejor explícito que implícito"* | Para reglas estables y universales, sí. Para casos puntuales, el "explícito" es ruido que degrada las reglas estables. |
| *"Otros proyectos similares lo tienen"* | Cada proyecto es distinto. Lo que funciona en otro proyecto puede ser sobreingeniería en el tuyo. Aplicar el filtro al CONTEXTO actual. |

---

## Cuándo SÍ flexibilizar el filtro

El filtro es una guía, no dogma. Hay casos donde sí vale la pena ser flexible:

- **Onboarding de devs nuevos al equipo.** Si una línea ayuda a un humano que está leyendo CLAUDE.md por primera vez, puede valer la pena aunque sea ligeramente menos universal.
- **Contexto crítico de seguridad/compliance.** Aunque idealmente vaya a hook, si el equipo aún no tiene infraestructura de hooks, una línea preventiva en CLAUDE.md es mejor que nada.
- **Proyectos pequeños.** Para repos de pocos archivos, mantener todo en un solo CLAUDE.md (sin `agent_docs/`) puede ser más práctico que la estructura completa.

Pero **estos son excepciones, no la regla**. Para la mayoría de los casos, el filtro estricto funciona mejor que el filtro flexible.
