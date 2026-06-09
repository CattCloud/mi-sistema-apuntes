# Workflow: Decidir si agregar una capa adicional

> **Cuándo usar este workflow:** el usuario duda si su proyecto necesita una capa adicional (`agent_docs/`, `.claude/rules/`, CLAUDE.md por subdirectorio, `CLAUDE.local.md`). Este workflow es un decision tree basado en señales reales del proyecto, no en hipótesis.

> **Principio guía:** las capas se ganan, no se adoptan. Si el dolor que la capa resuelve no se está manifestando, **no agregar la capa**.

---

## Paso 1: Identificar qué capa está considerando

Preguntar al usuario cuál de las 4 capas tiene en mente:

| Capa | Pregunta de identificación |
|---|---|
| `agent_docs/` | *¿Estás pensando en mover documentación larga (procedimientos, decisiones por feature) fuera del CLAUDE.md raíz?* |
| `.claude/rules/` | *¿Tienes reglas que solo aplican a ciertos tipos de archivo (todos los tests, todas las migraciones)?* |
| CLAUDE.md por subdirectorio | *¿Es un monorepo donde distintas zonas tienen reglas muy distintas (frontend vs backend)?* |
| `CLAUDE.local.md` | *¿Tienes preferencias personales o URLs/credenciales que no quieres versionar?* |

Si el usuario no sabe cuál es relevante, presentar la tabla y dejar que escoja según el dolor que está sintiendo.

---

## Paso 2: Verificar la señal disparadora real

Para cada capa, hay una señal específica que justifica agregarla. Si la señal NO está presente, recomendar **no agregar la capa**.

### Para `agent_docs/`

**Señal disparadora:** el CLAUDE.md raíz pasa de ~150 líneas porque contiene procedimientos largos o decisiones por feature que el agente raramente necesita pero que cuando las necesita son valiosas.

**Preguntas concretas para verificar:**
1. *¿Tu CLAUDE.md raíz tiene más de 150 líneas?*
2. *¿Hay secciones de >20 líneas que son procedimientos detallados (cómo hacer deploy, cómo correr migraciones)?*
3. *¿Hay decisiones por feature documentadas que solo importan cuando se retoma ese feature?*
4. *¿Tienes archivos sueltos de planeación (`PLAN_*.md`, `HITO_*.md`) en la raíz del repo?*

**Si 2 o más son SÍ →** la capa está justificada. Pasar a Paso 3.
**Si solo 1 o ninguno es SÍ →** todavía no la necesitas. Esperar.

### Para `.claude/rules/`

**Señal disparadora:** hay reglas que aplican a un patrón de archivos específicos (no a una carpeta entera) y ensucian el contexto cuando están en el CLAUDE.md raíz porque solo son relevantes en una fracción de las tareas.

**Preguntas concretas para verificar:**
1. *¿Tienes reglas que solo aplican a ciertos tipos de archivo (`*.test.ts`, `*.sql`, componentes React)?*
2. *¿Esas reglas son específicas (estructura interna, patrones de naming) que no aplican al resto del código?*
3. *¿Esas reglas viven actualmente en el CLAUDE.md y "molestan" cuando trabajas en otras zonas?*

**Si las 3 son SÍ →** la capa está justificada. Pasar a Paso 3.
**Si no →** las reglas probablemente son universales (aplican a todo el proyecto) y deben quedarse en CLAUDE.md, o son demasiado puntuales y no deben estar en ningún lado del onboarding.

### Para CLAUDE.md por subdirectorio

**Señal disparadora:** es un monorepo real con apps genuinamente distintas, cada una con su propio stack, convenciones, y comandos.

**Preguntas concretas para verificar:**
1. *¿Tu proyecto tiene >1 app o paquete con su propio `package.json` (u equivalente)?*
2. *¿Las convenciones de cada zona son materialmente distintas (no es solo "el frontend usa React, el backend Node")?*
3. *¿Trabajas a menudo en una zona sin tocar las otras?*

**Si las 3 son SÍ →** la capa está justificada. Pasar a Paso 3.
**Si no →** un solo CLAUDE.md raíz alcanza. Subdirectorios separados sería sobreingeniería.

### Para `CLAUDE.local.md`

**Señal disparadora:** tienes contenido que SÍ quieres que el agente vea pero que NO quieres versionar (porque es personal o sensible).

**Preguntas concretas para verificar:**
1. *¿Tienes URLs de sandbox/staging propias que el equipo no necesita ver?*
2. *¿Tienes credenciales de dev (no de prod) o tokens locales?*
3. *¿Tienes preferencias personales de respuesta del agente que no quieres imponerle al equipo?*

**Si al menos 1 es SÍ →** la capa está justificada. Pasar a Paso 3.
**Si no →** no necesitas la capa local.

---

## Paso 3: Confirmar que NO existe un mejor mecanismo

Antes de agregar la capa, verificar que no haya una opción más simple:

| Capa propuesta | ¿Hay alternativa más simple? |
|---|---|
| `agent_docs/` | ¿Las decisiones por feature pueden vivir en commits / PRs / archivos de issues? Si el equipo ya tiene un sistema externo (Linear, Jira), considerar eso antes de agregar `agent_docs/`. |
| `.claude/rules/` | ¿Las reglas son determinísticas (estilo, formato)? Si sí, van en linter + hook, NO en `.claude/rules/`. Las reglas en path-scoping son para guía contextual al agente, no para reemplazar linters. |
| CLAUDE.md por subdirectorio | ¿El proyecto es genuinamente un monorepo o son features de una misma app? Features de una misma app rara vez justifican subdirectorios — un solo CLAUDE.md raíz funciona. |
| `CLAUDE.local.md` | ¿El contenido podría vivir en variables de entorno o configuración local? Si es algo que el agente NO necesita ver, ni siquiera va en CLAUDE.local. |

---

## Paso 4: Si la capa está justificada, planear su introducción

No agregar todo de golpe. Para cada capa que pase los filtros anteriores:

### Si va `agent_docs/`:
1. Crear la carpeta vacía con un README corto explicando la convención.
2. Mover **un solo bloque o archivo** para probar.
3. Actualizar el índice en CLAUDE.md.
4. Trabajar con el agente unas sesiones y verificar que el bloque se carga cuando aplica y no estorba cuando no.
5. Si funciona, expandir gradualmente.

### Si va `.claude/rules/`:
1. Crear `.claude/rules/` si no existe.
2. Empezar con **un solo archivo de reglas** con su frontmatter `paths:`.
3. Mover las reglas correspondientes desde CLAUDE.md.
4. Probar y validar.
5. Si funciona, agregar más archivos según haya más casos.

### Si va CLAUDE.md por subdirectorio:
1. Empezar con **un solo subdirectorio** (el más distinto al resto).
2. Crear su `CLAUDE.md` con su propio núcleo mínimo aplicado a esa zona.
3. Eliminar del CLAUDE.md raíz lo que ya está cubierto en el subdirectorio.
4. Validar que la carga perezosa funciona como se espera.

### Si va `CLAUDE.local.md`:
1. Agregarlo a `.gitignore`.
2. Crearlo con el contenido personal.
3. Eliminarlo del CLAUDE.md raíz si estaba ahí.
4. Validar que git ignora el archivo correctamente.

---

## Paso 5: Reporte al usuario

```
──────────────────────────────────────
📋 DECISIÓN: AGREGAR CAPA [Nombre]
──────────────────────────────────────

CAPA EVALUADA: [agent_docs / .claude/rules/ / subdirectorio / CLAUDE.local.md]

SEÑAL DISPARADORA: ✅ Presente
- [Listar las señales que se cumplieron]

ALTERNATIVAS DESCARTADAS:
- [Por qué no encaja mejor en otro mecanismo]

PLAN DE INTRODUCCIÓN GRADUAL:
1. [Paso concreto]
2. [Paso concreto]
3. [Paso concreto]

──────────────────────────────────────
¿Procedo con el paso 1, o lo dejas para hacer tú con calma?
──────────────────────────────────────
```

O si la decisión es no agregar la capa:

```
──────────────────────────────────────
📋 DECISIÓN: NO AGREGAR CAPA [Nombre] AÚN
──────────────────────────────────────

SEÑAL DISPARADORA: ❌ No suficientemente presente

Las señales que verificamos:
- [Lista de preguntas con respuesta]

RECOMENDACIÓN: esperar a que el dolor concreto aparezca. Específicamente:
- [Qué tendría que pasar para que sí valga la pena agregar la capa]

ALTERNATIVA INMEDIATA (si aplica):
- [Sugerir otra cosa que sí resuelva el problema del usuario]
──────────────────────────────────────
```

---

## Conexión con otros workflows

| Después de este workflow | Workflow siguiente |
|---|---|
| Se decidió agregar la capa y aplicar cambios al CLAUDE.md existente | `refactorizar_inflado.md` (con plan reducido al cambio aprobado) |
| Se decidió no agregar la capa | Cerrar. Volver a esta skill cuando el dolor aparezca. |
| Resultado revela que el CLAUDE.md tiene otros problemas que la capa no resuelve | `auditar_existente.md` para diagnóstico completo |
