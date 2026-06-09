# Checklist: Antipatrones en CLAUDE.md

> Detector de los 3 antipatrones principales (alta severidad) y 4 secundarios (media-baja). Aplicar al CLAUDE.md actual durante el workflow `auditar_existente.md`.

---

## Antipatrones principales (severidad 🔴 alta)

### Antipatrón 1: Bitácora disfrazada de "features recientes"

**Definición:** secciones del archivo que describen PRs específicos, ramas en curso, fixes puntuales, decisiones de sprints pasados.

**Cómo detectarlo:**

- Buscar títulos sospechosos: `"Features recientes"`, `"Cambios recientes"`, `"Lo último"`, `"Notas del sprint"`, `"Última versión"`, `"Histórico"`.
- Buscar patrones lingüísticos: nombres de personas del equipo, números de PR (`PR #77`), nombres de ramas (`feature/email-blackboard-only`), fechas específicas (`Mayo 2025`).
- Buscar enlaces a archivos muy específicos con detalles de implementación de un PR concreto.

**Por qué falla:**
Cada línea de esta sección se evalúa en cada turno del agente. La bitácora de PRs **degrada la adherencia a TODAS las reglas** del archivo, no solo a sí misma. Además, esa información debería vivir en git log + auto memory del agente, no en CLAUDE.md.

**Acción recomendada:**
Mover a `agent_docs/features/[nombre_feature].md` con índice en CLAUDE.md, O eliminar si el feature ya cerró y no aporta más.

---

### Antipatrón 2: Hotfixes acumulados

**Definición:** instrucciones tipo *"NUNCA hacer X"* / *"SIEMPRE hacer Y"* agregadas reactivamente cuando el agente se equivocó en una sesión específica.

**Cómo detectarlo:**

- Buscar prohibiciones muy específicas: *"NUNCA modificar `lib/timezone-utils.ts` sin preguntar"*, *"NUNCA exportar Zod schemas desde Server Actions"*.
- Detectar patrones repetitivos de tipo "no hacer X" sin razón explicada.
- Síntoma: el archivo tiene una sección "Critical Boundaries" / "Don'ts" / "Prohibido" con varias entradas que parecen agregadas en distintos momentos.

**Por qué falla:**
Cada hotfix individual parece útil ("ya no se va a equivocar en eso"), pero acumulados degradan el archivo:
- El modelo NO está obligado a obedecer reglas de CLAUDE.md — pueden ignorarse igual.
- Si la regla NO admite excepción, debería ser un **hook**, no una línea en CLAUDE.md.
- Acumular prohibiciones específicas dispara la curva de degradación uniforme.

**Acción recomendada:**
Por cada hotfix, decidir:
- ¿La regla SÍ admite excepción? → Reformular como guía con razón, o eliminar si la razón no se sostiene.
- ¿La regla NO admite excepción? → Migrar a hook PreToolUse, eliminar del CLAUDE.md.
- ¿La regla nunca fue universal? → Eliminar.

---

### Antipatrón 3: Reglas de estilo de código

**Definición:** convenciones de indentación, comillas, semicolons, naming, formato — todo lo que un linter aplica determinísticamente.

**Cómo detectarlo:**

- Buscar reglas tipo: *"usar comillas simples"*, *"indentación de 2 espacios"*, *"nombres de variables en camelCase"*, *"no usar semicolons al final"*.
- Listas largas de convenciones de naming.
- Reglas sobre orden de imports, agrupación de exports, etc.

**Por qué falla:**
- Los linters aplican estas reglas al 100% en milisegundos. Claude las aplica al 70% en segundos costosos.
- Estas reglas **no necesitan contexto** — son determinísticas por definición.
- Meterlas degrada el archivo entero (curva de degradación uniforme).

**Acción recomendada:**
Eliminar de CLAUDE.md. En su lugar, dejar una sola línea: *"Este proyecto usa [ESLint/Prettier/Biome]. Después de cualquier cambio, correr `npm run lint`."*. Configurar un hook `Stop` que corra el linter automáticamente y devuelva los errores al agente.

---

## Antipatrones secundarios (severidad 🟡 media / 🟢 baja)

### Antipatrón 4: Procedimientos largos inline (🟡 media)

**Definición:** secciones de >20 líneas que describen un procedimiento operativo paso a paso (cómo hacer deploy, cómo correr migraciones, cómo configurar el ambiente).

**Cómo detectarlo:**
- Secciones con listas numeradas largas de pasos.
- Bloques que describen interacciones con sistemas externos (infra, deploy, DB) con muchos detalles.

**Por qué falla:**
Estos procedimientos son útiles **cuando se ejecutan**, pero ocupan presupuesto todo el tiempo aunque no se usen en la sesión actual.

**Acción recomendada:**
Mover a `agent_docs/procedures/[proceso].md` y dejar índice en CLAUDE.md.

---

### Antipatrón 5: Reglas para tipos de archivo específicos (🟡 media)

**Definición:** reglas que aplican solo a un tipo de archivo (todos los tests, todas las migraciones, todos los componentes de un tipo).

**Cómo detectarlo:**
- Secciones tipo "Para los tests..." / "Para las migraciones..." / "Para los componentes React...".
- Reglas con patrones de archivos implícitos.

**Por qué falla:**
Se evalúan en cada turno aunque la tarea actual no toque esos archivos.

**Acción recomendada:**
Mover a `.claude/rules/[nombre].md` con frontmatter `paths:`.

---

### Antipatrón 6: Información duplicada con archivos referenciados (🟢 baja)

**Definición:** CLAUDE.md describe algo que ya está descrito en otro archivo del proyecto que el agente puede leer (ARCHITECTURE.md, README.md, etc.).

**Cómo detectarlo:**
- Verificar si hay un mapa del repo duplicado entre CLAUDE.md y un ARCHITECTURE.md.
- Si CLAUDE.md ya referencia el archivo, ¿está duplicando contenido?

**Por qué falla:**
Inflar el archivo con contenido que vive en otro lado. Cuando el otro archivo se actualice, CLAUDE.md queda desactualizado silenciosamente.

**Acción recomendada:**
En CLAUDE.md, dejar solo una referencia: *"Arquitectura detallada: ver `ARCHITECTURE.md`"*. Eliminar la duplicación.

---

### Antipatrón 7: Comandos / configuración obsoletos (🟢 baja)

**Definición:** comandos que ya no se usan, paths antiguos, configuración de tecnologías que el proyecto ya no tiene.

**Cómo detectarlo:**
- Verificar que cada comando del CLAUDE.md realmente existe en `package.json` (o equivalente).
- Verificar que cada path mencionado existe en el repo actual.

**Por qué falla:**
Engaña al agente con información incorrecta.

**Acción recomendada:**
Eliminar lo obsoleto. Actualizar a lo vigente.

---

## Plantilla del reporte por antipatrón

Cuando detectes un antipatrón, reportarlo así:

```
🔴 ANTIPATRÓN: [Nombre del antipatrón]
   Severidad: [Alta / Media / Baja]
   Líneas afectadas en CLAUDE.md: [rango, ej. 97-153]
   Por qué califica como [este antipatrón]: [criterio del checklist]
   Costo en el presupuesto: [estimación, ej. "~60 líneas evaluadas cada turno"]
   Acción recomendada: [mover a X / eliminar / migrar a hook]
```

---

## Notas para el agente al aplicar este checklist

- **Sé honesto al diagnosticar.** Si solo encuentras un antipatrón leve, no infles el reporte para parecer útil.
- **Reportá severidad realista.** Una sección de 5 líneas con un antipatrón medio NO tiene la misma severidad que una sección de 60 líneas con un antipatrón alto.
- **Considera el contexto del proyecto.** Un proyecto de 3 años con 200 PRs naturalmente acumuló más bitácora que uno de 3 meses. La acción recomendada puede ser gradual.
- **No moralices.** El usuario está aquí porque quiere mejorar — no le hagas sentir mal por el estado actual.
