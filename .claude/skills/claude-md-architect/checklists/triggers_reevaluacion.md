# Checklist: Triggers de re-evaluación del sistema

> Lista de eventos que **disparan obligatoriamente** alguno de los workflows de mantenimiento. El agente debe estar atento a estos triggers durante cualquier sesión y proponer el workflow correspondiente al detectarlos.

> **Principio:** sin triggers, el mantenimiento del sistema depende solo de que el usuario lo recuerde — y eso falla con el tiempo. Los triggers convierten al agente en parte activa de la sostenibilidad.

---

## Triggers que disparan `gate_de_entrada.md`

El gate de entrada se invoca **siempre** que se vaya a modificar uno de estos archivos. Sin excepciones.

| Evento | Acción |
|---|---|
| El agente va a editar `CLAUDE.md` (raíz o subdirectorio) | Invocar `gate_de_entrada.md` antes de aplicar el cambio |
| El agente va a crear/editar un archivo en `.claude/rules/` | Invocar gate |
| El agente va a crear/editar un archivo en `agent_docs/` | Invocar gate |
| El agente va a crear `CLAUDE.local.md` por primera vez | Invocar gate (verificar también `.gitignore`) |
| El usuario dice *"agrega esto a CLAUDE.md"* | Invocar gate antes de aplicar |
| El usuario dice *"para que no se vuelva a equivocar, anota esto"* | Invocar gate — alta probabilidad de hotfix |

---

## Triggers que disparan `auditoria_periodica.md`

Estos triggers son señales tempranas de degradación. Cuando ocurra alguno, sugerir al usuario correr la auditoría periódica (o correrla automáticamente si la conversación lo permite).

### Triggers por crecimiento

| Evento | Severidad |
|---|---|
| CLAUDE.md raíz cruzó 150 líneas | 🟡 Sugerir auditoría |
| CLAUDE.md raíz cruzó 200 líneas | 🔴 Auditoría obligatoria + considerar refactor formal |
| Se agregaron >5 líneas a CLAUDE.md raíz en un solo cambio | 🟡 Verificar que el cambio era necesario |
| Se agregaron >3 archivos nuevos a `agent_docs/` en una semana | 🟡 Sugerir auditoría para verificar que el índice está limpio |
| Un archivo en `agent_docs/` cruzó 300 líneas | 🟡 Considerar partir en archivos más pequeños |

### Triggers por tiempo

| Evento | Acción |
|---|---|
| Pasaron 3 meses desde la última auditoría | Sugerir auditoría periódica |
| Pasaron 6 meses sin tocar CLAUDE.md | Verificar que no esté desactualizado (stack, comandos, etc.) |

### Triggers por evento del proyecto

| Evento | Acción |
|---|---|
| Cambio de stack mayor (cambia framework, base de datos, lenguaje) | Auditoría obligatoria — el QUÉ y CÓMO del núcleo mínimo cambian |
| Se completó un feature grande que tenía archivo en `agent_docs/features/` | Decidir si el archivo se mantiene, se mueve a history, o se elimina |
| Se renombró/reorganizó una carpeta principal del repo | Verificar que el mapa del repo en CLAUDE.md esté actualizado |
| Se cambió la herramienta de tests, linter, o build | Verificar que la sección "Comandos" en CLAUDE.md esté actualizada |
| El equipo adoptó una nueva convención del equipo | Decidir si va a CLAUDE.md, `.claude/rules/`, o queda como comentario en código |

### Triggers por comportamiento del agente

| Evento | Acción |
|---|---|
| El agente se equivoca repetidamente en el mismo tipo de tarea (>2 veces) | Investigar: ¿es un problema de CLAUDE.md (falta info)? ¿de las reglas? ¿de los `agent_docs/`? Auditoría enfocada |
| El agente ignora una regla de CLAUDE.md que claramente debería seguir | Señal de que CLAUDE.md puede estar sobrecargado (degradación uniforme). Auditoría obligatoria |
| El usuario tiene que recordarle al agente cosas que están en CLAUDE.md | Mismo síntoma — auditoría obligatoria |

---

## Triggers que disparan `decidir_capa.md`

| Evento | Acción |
|---|---|
| CLAUDE.md raíz sigue creciendo a pesar del gate | Considerar si necesita `agent_docs/` (si aún no existe) o si una capa más es necesaria |
| Aparecen reglas que solo aplican a tipos de archivo específicos | Considerar `.claude/rules/` con path-scoping |
| El proyecto pasa a ser monorepo (se agregan apps independientes) | Considerar CLAUDE.md por subdirectorio |
| El usuario empieza a tener configuración personal que no quiere versionar | Considerar `CLAUDE.local.md` |

---

## Triggers que disparan `auditar_existente.md` (refactor profundo)

Estos son los casos donde el mantenimiento ligero ya no alcanza:

| Evento | Severidad |
|---|---|
| CLAUDE.md raíz cruzó 250 líneas | 🔴 |
| La auditoría periódica detectó >3 antipatrones de severidad alta | 🔴 |
| El agente ignora consistentemente las reglas (síntoma de degradación uniforme grave) | 🔴 |
| Hubo un override del gate de entrada en varios cambios recientes sin que se revisara | 🔴 |
| Cambio de stack mayor con el sistema actual desactualizado | 🔴 |
| El equipo cambió radicalmente (nuevo CTO, nuevo lead, refundación) | 🔴 — el "PORQUÉ" puede haber cambiado entero |

---

## Triggers que NO requieren acción

Importante también listar lo que **no** dispara nada — para evitar paranoia de mantenimiento.

| Evento | Por qué no dispara |
|---|---|
| Se hicieron varios PRs grandes esta semana | El código cambia constantemente; CLAUDE.md no necesita actualizarse en cada PR si lo que cambia no es onboarding del proyecto |
| El agente cometió un error puntual | Un error aislado NO es señal para agregar una regla a CLAUDE.md. Solo cuando el error se repite consistentemente |
| Aparecieron nuevas decisiones de implementación en archivos específicos | Eso vive en comentarios del código, no en CLAUDE.md |
| Cambió alguna versión de una dependencia menor | A menos que cambie el stack en el bloque QUÉ, no es relevante para CLAUDE.md |

---

## Cómo el agente debe usar este checklist

**Modo proactivo:** durante cualquier sesión, si el agente detecta uno de los triggers, debe **mencionarlo al usuario** aunque la conversación esté sobre otra cosa. Ejemplo:

> *"Observación: noté que vas a agregar 8 líneas a CLAUDE.md en este cambio. Antes de aplicarlo, ¿corremos rápido el gate de entrada? Es 1-2 minutos."*

**Modo reactivo:** cuando el usuario invoca la skill explícitamente, el agente revisa esta lista para confirmar qué workflow es el correcto.

**No abusar:** no convertir cada interacción en una excusa para correr workflows. Solo cuando el trigger es **claro y aplicable**.

---

## Cómo el usuario debe usar este checklist

Como referencia para entender **cuándo conviene volver a esta skill**. No es una lista para revisar manualmente cada día — es contexto sobre qué señales indican que el sistema necesita atención.

Si el usuario nunca ve ningún trigger dispararse en meses, probablemente el sistema está saludable. Si los ve dispararse seguido, hay algo en el proceso del equipo que está empujando bitácora/hotfixes/sobrecarga hacia CLAUDE.md, y vale la pena ajustar el proceso, no solo aplicar workflows reactivos.
