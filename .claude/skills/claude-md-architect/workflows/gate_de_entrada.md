# Workflow: Gate de entrada — antes de editar CLAUDE.md

> **Cuándo usar este workflow:** ANTES de cualquier edición a CLAUDE.md, antes de agregar archivos a `agent_docs/` o `.claude/rules/`, antes de crear `CLAUDE.local.md`. Es la primera línea de defensa contra la degradación del sistema.

> **Salida esperada:** una decisión clara: *(a)* el cambio entra tal cual, *(b)* el cambio entra ajustado, *(c)* el cambio va a otro lugar, *(d)* el cambio no entra a ningún lado.

> **Quién lo invoca:** el AGENTE de forma automática cuando va a editar uno de estos archivos. El usuario también puede invocarlo manualmente si tiene dudas.

> **Tiempo esperado:** 2-5 minutos. Si toma más, el cambio probablemente amerita el workflow completo `auditar_existente.md` en lugar del gate.

---

## Paso 1: Identificar qué se está agregando

Antes de aplicar el filtro, clarifica:

- ¿A qué archivo va el cambio? (CLAUDE.md raíz / CLAUDE.md de subdirectorio / `agent_docs/X.md` / `.claude/rules/X.md` / `CLAUDE.local.md`)
- ¿Cuántas líneas se agregan?
- ¿Es contenido NUEVO o modificación de algo existente?
- ¿De dónde sale el contenido? (el agente lo descubrió, el usuario lo pidió, viene de una conversación de hoy, viene de un PR reciente)

**Señal temprana de problema:** si el origen del contenido es *"acabo de tener una conversación con el agente sobre esto"* o *"el agente se equivocó y quiero que no vuelva a pasar"*, encender la alarma — alto riesgo de hotfix.

---

## Paso 2: Aplicar el filtro de universalidad

Lee `checklists/decisiones_de_filtro.md` y aplica la pregunta filtro a cada línea (o bloque) que se está agregando:

> **"¿Esto sirve para onboardear al agente en CUALQUIER sesión futura del proyecto?"**

Si la respuesta es claramente sí → pasa al Paso 3 (verificar que va al archivo correcto).
Si la respuesta es claramente no → pasa al Paso 4 (redirigir a otro lugar o descartar).
Si la respuesta es "depende" → aplicar las sub-preguntas del checklist (universalidad, estabilidad temporal, descubrimiento por el agente, tipo de regla).

---

## Paso 3: Verificar que va al archivo correcto

Pasó el filtro de universalidad. Pero ¿es el archivo correcto? Aplicar esta tabla rápida:

| Características del contenido | Archivo correcto |
|---|---|
| Aplica universalmente a todo el proyecto, en cualquier tarea | CLAUDE.md raíz |
| Aplica solo a una zona del proyecto (monorepo con subapps) | CLAUDE.md de esa subzona |
| Aplica solo a tipos de archivo específicos (tests, migraciones) | `.claude/rules/X.md` con `paths:` |
| Es procedimiento/decisión por feature que solo importa cuando se toca ese feature | `agent_docs/features/X.md` o `agent_docs/procedures/X.md` |
| Es personal/sensible y no debe versionarse | `CLAUDE.local.md` |
| Debería cumplirse SIN excepción (seguridad, etc.) | NO va aquí — debe ser **hook** |

Si el contenido propuesto está yendo al archivo equivocado, redirigirlo.

---

## Paso 4: Aplicar checklist de antipatrones rápido

Lee `checklists/antipatrones.md` brevemente y verifica que el contenido NO cae en ninguno de estos:

| Antipatrón | Síntoma rápido |
|---|---|
| Bitácora disfrazada | El contenido menciona PRs, ramas, fechas, o nombres de personas del equipo |
| Hotfix acumulado | El contenido es una prohibición específica que viene de un error reciente del agente |
| Regla de estilo de código | El contenido es sobre indentación, comillas, naming, formato (eso va a linter) |
| Procedimiento largo | El contenido es >20 líneas describiendo paso a paso un proceso operativo (va a `agent_docs/procedures/`) |
| Información duplicada | Lo que se agrega ya está descrito en otro archivo del proyecto |

Si detecta un antipatrón → redirigir al lugar correcto o descartar.

---

## Paso 5: Verificar el impacto en el presupuesto

Antes de aplicar el cambio, **estima el impacto**:

1. Líneas actuales del archivo destino.
2. Líneas que se agregan.
3. Líneas resultantes.

Compara contra los umbrales:

| Archivo | Umbral cómodo | Umbral de alerta |
|---|---|---|
| CLAUDE.md raíz | < 150 líneas | > 200 líneas |
| CLAUDE.md de subdirectorio | < 100 líneas | > 150 líneas |
| Archivo en `.claude/rules/` | < 50 líneas | > 100 líneas |
| Archivo en `agent_docs/` | Sin tope estricto | > 300 líneas (considerar partir) |

**Si el cambio cruza el umbral de alerta:** sugerir al usuario que antes de agregar, evalúe si hay algo que pueda salir (refactor parcial). Si el usuario insiste, dejar el cambio pero **registrar el evento** para que la próxima auditoría periódica lo capture.

---

## Paso 6: Decisión final y aplicación

Reportar al usuario el resultado del gate:

```
──────────────────────────────────────
🚪 GATE DE ENTRADA — DECISIÓN
──────────────────────────────────────

CONTENIDO PROPUESTO:
[Resumen de lo que se quería agregar]

ARCHIVO DESTINO ORIGINAL: [archivo]

EVALUACIÓN:
- Filtro de universalidad: [✅ pasa / ❌ no pasa / ⚠️ marginal]
- Archivo correcto: [✅ sí / ⚠️ debería ir a Y en lugar de X]
- Antipatrones detectados: [ninguno / lista]
- Impacto en presupuesto: [tamaño antes → tamaño después, contra umbral]

DECISIÓN: [una de las 4]
  (a) ENTRA TAL CUAL → aplicar al archivo original.
  (b) ENTRA AJUSTADO → aplicar con [descripción del ajuste].
  (c) VA A OTRO LUGAR → redirigir a [archivo alternativo].
  (d) NO ENTRA → descartar y explicar por qué.

──────────────────────────────────────
¿Procedo con la decisión, o quieres revisar/forzar?
──────────────────────────────────────
```

**Si el usuario quiere forzar un cambio que el gate marcó como problemático:**

- Aceptar (el usuario tiene la última palabra).
- Anotar en una nota que el cambio se aplicó con override del gate.
- Sugerir que en la próxima auditoría periódica se revise si valió la pena.

---

## Paso 7: Aplicar el cambio

Una vez decidido, aplicar el cambio efectivamente en el archivo correcto. No olvidar:

- Si el cambio va a un archivo NUEVO en `agent_docs/`, actualizar el índice en CLAUDE.md raíz.
- Si el cambio va a un archivo nuevo en `.claude/rules/`, verificar que el frontmatter `paths:` esté correcto.
- Si el cambio crea `CLAUDE.local.md` por primera vez, verificar que esté en `.gitignore`.

---

## Casos especiales

### Caso: el usuario quiere agregar algo "rápido" sin justificar

Si el usuario dice *"agrégalo y ya, después lo refinamos"*, recordar gentilmente que el archivo se evalúa en cada turno → el costo se paga incluso mientras dice "después lo refino". Aceptar si insiste, pero registrar la nota.

### Caso: contenido razonable pero el archivo destino ya está sobrecargado

Si el cambio en sí es razonable pero el archivo destino ya pasó del umbral de alerta, sugerir hacer una mini-auditoría (no el workflow completo, solo identificar qué puede salir) ANTES de agregar lo nuevo. El archivo no debería seguir creciendo si ya está sobrecargado.

### Caso: contenido legítimo pero no encaja en ningún archivo existente

Por ejemplo: una decisión de arquitectura nueva que no aplica al núcleo mínimo pero tampoco a un feature. Considerar:

- ¿Justifica crear una sección nueva en CLAUDE.md? Solo si va a ser muy referenciado.
- ¿Justifica crear un archivo nuevo en `agent_docs/`? Solo si vale el overhead.
- ¿Puede vivir como comentario en el código? A veces es lo mejor.

---

## Conexión con otros workflows

| Después de este workflow | Workflow siguiente |
|---|---|
| Cambio aplicado limpio | Cerrar. Seguir con la tarea original del usuario. |
| Cambio revela que el archivo destino está muy degradado | `auditar_existente.md` para refactor formal |
| Cambio implica decidir si agregar una capa nueva | `decidir_capa.md` |
| Cambio forzado contra recomendación del gate | Registrar para próxima `auditoria_periodica.md` |
