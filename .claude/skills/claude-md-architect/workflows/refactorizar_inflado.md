# Workflow: Refactorizar CLAUDE.md inflado

> **Cuándo usar este workflow:** después de `auditar_existente.md` (con plan aprobado por el usuario) O cuando el usuario ya sabe qué quiere refactorizar y va directo al grano.

> **Salida esperada:** un CLAUDE.md reorganizado, con bloques movidos a los lugares correctos (`agent_docs/`, `.claude/rules/`, `CLAUDE.local.md`), y un resumen de lo que cambió.

> **Regla de oro:** este workflow modifica archivos reales del proyecto. Cada cambio debe ser presentado al usuario antes de aplicarse, y el agente debe sugerir un commit limpio al final para que el refactor sea reversible.

---

## Paso 1: Confirmar el plan aprobado

Antes de tocar nada, recapitula el plan que el usuario aprobó (viene del Paso 5 de `auditar_existente.md` o de lo que el usuario describió directamente):

```
PLAN DE REFACTOR APROBADO

1. Mover sección "Features recientes" (líneas 97-153) → archivos en agent_docs/features/
2. Mover PLAN_*.md sueltos en raíz → agent_docs/features/
3. Eliminar Critical Boundaries del CLAUDE.md → migrar a hooks PreToolUse
4. Actualizar CLAUDE.md raíz con índice de agent_docs/features/

¿Procedo en este orden?
```

Espera confirmación. Si el usuario quiere reordenar o saltarse algún paso, ajusta.

---

## Paso 2: Aplicar cambios uno por uno, NO en bloque

La clave para que el refactor sea seguro y reversible es **un cambio a la vez**, presentado al usuario, aplicado solo después de su OK.

### Patrón general por cada cambio:

1. **Anunciar el cambio:** *"Voy a mover X a Y. Esto implica: [descripción concreta]."*
2. **Mostrar el contenido que se mueve y dónde va a quedar.**
3. **Aplicar el cambio:** crear nuevos archivos, mover contenido, actualizar el CLAUDE.md.
4. **Confirmar al usuario qué quedó hecho.**
5. **Continuar con el siguiente cambio.**

---

## Paso 3: Movimientos típicos y cómo hacerlos

### Movimiento A: De CLAUDE.md a `agent_docs/`

Para bloques largos de procedimientos, decisiones por feature, o bitácora vencida que sí aporta contexto.

**Pasos concretos:**

1. Crear la carpeta `agent_docs/` si no existe.
2. Crear subcarpetas según categoría: `features/`, `procedures/`, `history/` (esta última solo si hay contexto histórico que vale la pena conservar).
3. Por cada bloque a mover:
   - Crear archivo nuevo en la subcarpeta correspondiente con nombre descriptivo (ej. `agent_docs/features/student_activation_email.md`).
   - Copiar el contenido del bloque al archivo nuevo.
   - Reescribir el bloque en CLAUDE.md como **una línea de índice**: `- agent_docs/features/student_activation_email.md — Para tareas relacionadas con el correo de activación del estudiante.`
4. Si hay varios bloques, agruparlos bajo una sección de índice única en CLAUDE.md:

```markdown
## Decisiones por feature (lee solo si vas a tocar ese feature)

- `agent_docs/features/auth_oauth_decision.md` — ...
- `agent_docs/features/cart_persistence_design.md` — ...
- `agent_docs/features/payment_provider_choice.md` — ...
```

### Movimiento B: De CLAUDE.md a `.claude/rules/`

Para reglas que aplican a tipos de archivo específicos (todos los tests, todas las migraciones, todos los componentes React).

**Pasos concretos:**

1. Crear `.claude/rules/` si no existe.
2. Por cada conjunto de reglas a mover:
   - Crear archivo `.claude/rules/[nombre_descriptivo].md`.
   - Agregar frontmatter YAML con `paths:` y los patrones glob aplicables.
   - Mover las reglas al archivo.
   - Eliminar la sección equivalente del CLAUDE.md raíz.

**Ejemplo:**

```markdown
---
paths:
  - "**/*.test.ts"
  - "**/*.spec.ts"
  - "__tests__/**/*"
---

# Reglas para tests

[contenido movido desde CLAUDE.md]
```

⚠️ Verificar la sintaxis exacta del frontmatter contra la doc oficial de Claude Code de la versión que el usuario tiene instalada.

### Movimiento C: De CLAUDE.md a `CLAUDE.local.md`

Para contenido personal que no debería estar versionado: URLs de sandbox propias, credenciales de dev, preferencias del usuario.

**Pasos concretos:**

1. Crear `CLAUDE.local.md` en la raíz del proyecto.
2. Agregarlo a `.gitignore` (verificar primero si ya está).
3. Mover el contenido personal a `CLAUDE.local.md`.
4. Eliminarlo del CLAUDE.md raíz.

### Movimiento D: De CLAUDE.md a hooks (`.claude/settings.json`)

Para reglas que NO admiten excepción (las "Critical Boundaries" tipo *"NEVER hacer X"*).

**Pasos concretos:**

1. Por cada regla crítica, evaluar: *¿esto se puede convertir en un script bash que devuelva exit code 0 (permitido) o ≠0 (bloqueado)?*
2. Si sí: crear `.claude/scripts/check_[nombre].sh`, escribir el script, configurar el hook PreToolUse en `.claude/settings.json` con el matcher apropiado.
3. Eliminar la regla del CLAUDE.md.
4. **Importante:** este paso requiere conocimiento técnico de hooks que excede el alcance de esta skill. Si el usuario no está cómodo con hooks, deja la regla en CLAUDE.md y anota en una nota que "idealmente esto debería ser hook" pero no lo hagas tú mismo.

### Movimiento E: Eliminación pura

Para bitácora vencida que ya no aporta (PRs viejos, decisiones de sprints terminados, fixes históricos).

**Pasos concretos:**

1. Confirmar con el usuario que el contenido se puede eliminar (no archivar).
2. Eliminarlo del CLAUDE.md.
3. Si el usuario duda, ofrecer la opción intermedia: mover a `agent_docs/history/` con el nombre `[YYYY-MM]_[descripcion].md` para que quede como registro pero fuera del onboarding activo.

---

## Paso 4: Reorganizar archivos sueltos en la raíz

Para proyectos con `PLAN_*.md`, `HITO_*.md`, `TODOS.md`, `VERIFICACION_*.md` y similares dispersos en la raíz:

1. **Clasificar cada archivo:**
   - ¿Es un plan de feature todavía vigente? → `agent_docs/features/[nombre_feature].md`
   - ¿Es un plan de feature ya completado pero con decisiones que pueden necesitarse al retomar? → `agent_docs/features/[nombre_feature].md` (mismo lugar — el agente decide cuándo leerlo según el índice).
   - ¿Es contexto histórico que ya no aporta? → eliminar o `agent_docs/history/`.
   - ¿Es un TODO/backlog operativo? → NO va en `agent_docs/`. Pertenece al sistema de tracking externo (Linear, Jira, Notion).
2. **Mover archivos a su destino.**
3. **Actualizar el índice en CLAUDE.md** para que el agente sepa que existen.
4. **Verificar que ningún archivo del código fuente los referencia con rutas que se rompan al moverlos.** Usa grep para confirmar.

---

## Paso 5: Validar el resultado

Una vez aplicados todos los cambios:

1. **Contar líneas del CLAUDE.md final.** Debe estar bajo 150 líneas idealmente, <200 como tope.
2. **Aplicar el filtro de universalidad** a cada línea restante: *"¿esto sirve para onboardear al agente en cualquier sesión futura?"*. Si una línea no pasa el filtro, reconsiderar si moverla o eliminarla.
3. **Verificar que el archivo todavía cubre los 4 bloques del núcleo mínimo:**
   - QUÉ (proyecto + stack)
   - Mapa del repo
   - CÓMO (comandos)
   - PORQUÉ no obvio (decisiones de arquitectura)
4. **Verificar que el índice de `agent_docs/` (si se creó) tiene una línea por archivo y una descripción clara de cuándo leer cada uno.**

---

## Paso 6: Sugerir commit del refactor

Una vez validado, sugerir al usuario un commit limpio:

```
refactor: reorganizar CLAUDE.md siguiendo principio de núcleo mínimo

- Mover N bloques de features recientes a agent_docs/features/
- Mover M planes sueltos de raíz a agent_docs/features/
- [Otros cambios]

CLAUDE.md pasó de XXX a YYY líneas.
Refactor reversible vía git revert si hace falta.
```

**NO ejecutar el commit automáticamente.** Solo sugerir el mensaje y dejar que el usuario lo aplique.

---

## Paso 7: Reporte final al usuario

Mostrar un resumen claro de lo que cambió:

```
──────────────────────────────────────
✅ REFACTOR COMPLETADO
──────────────────────────────────────

ANTES:
- CLAUDE.md: XXX líneas
- Archivos sueltos en raíz: N
- agent_docs/: no existía

DESPUÉS:
- CLAUDE.md: YYY líneas (reducción del Z%)
- Archivos sueltos en raíz: 0
- agent_docs/features/: N archivos organizados con índice
- .claude/rules/: [cambios si los hubo]
- CLAUDE.local.md: [creado/no aplicó]

CAMBIOS APLICADOS:
1. [Resumen del cambio 1]
2. [Resumen del cambio 2]
...

PRÓXIMOS PASOS RECOMENDADOS:
- Commitear el refactor con el mensaje sugerido.
- Probar el agente en una sesión nueva para verificar que el onboarding sigue funcionando.
- Si detectas que falta algo, anótalo y considera si va al CLAUDE.md o a otro lugar.
──────────────────────────────────────
```

---

## Conexión con otros workflows

| Después de este workflow | Workflow siguiente |
|---|---|
| Refactor completo, usuario satisfecho | Cerrar. La skill terminó su trabajo. |
| El usuario detecta que el resultado todavía no se siente bien | Volver a `auditar_existente.md` para una segunda pasada con nuevo plan. |
| El usuario duda sobre si agregar una capa adicional que no estaba en el plan original | `decidir_capa.md` |
