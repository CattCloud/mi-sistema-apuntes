# Workflow: Auditoría periódica — mantener el sistema saludable

> **Cuándo usar este workflow:** revisión ligera y recurrente del sistema de CLAUDE.md. NO es un refactor completo — es un chequeo de salud + mantenimiento menor.

> **Salida esperada:** reporte de salud + recomendaciones priorizadas. Aplicar los arreglos pequeños en el momento; los grandes derivan a `auditar_existente.md`.

> **Frecuencia recomendada:** cada 1-3 meses, o cuando un trigger de `checklists/triggers_reevaluacion.md` lo dispara.

> **Diferencia con `auditar_existente.md`:** este workflow es más liviano, asume que el sistema ya está bien diseñado y solo busca mantenerlo así. `auditar_existente.md` es para refactor profundo cuando hay problemas estructurales.

---

## Paso 1: Chequeo de métricas básicas

Calcular rápido (lee `checklists/presupuesto.md` para los criterios):

- Líneas actuales del CLAUDE.md raíz.
- Comparación con la última auditoría (si existe registro). ¿Creció?
- Cantidad de archivos en `agent_docs/` y `.claude/rules/`.

**Reportar al usuario:**

```
📊 SALUD DEL SISTEMA — [Fecha]

CLAUDE.md raíz:
- Líneas actuales: [N]
- Última auditoría: [N en fecha X]  (si hay)
- Tendencia: [✅ estable / ⚠️ creció X líneas / 🔴 creció demasiado]

agent_docs/:
- Total de archivos: [N]
- Crecimiento desde última auditoría: [+N nuevos]

.claude/rules/:
- Total de archivos: [N]
- Crecimiento: [+N nuevos]
```

---

## Paso 2: Verificar antipatrones recientes

Pasada rápida del CLAUDE.md raíz buscando contenido que haya entrado desde la última revisión:

- ¿Hay líneas nuevas que parezcan **bitácora reciente**? (referencias a PRs, fechas, ramas, nombres del equipo)
- ¿Hay líneas nuevas que parezcan **hotfixes**? (prohibiciones específicas con olor a "me pasó esto la semana pasada")
- ¿Aparecieron **reglas de estilo de código** que deberían estar en linter?

**Por cada antipatrón nuevo encontrado:**

1. Anotarlo.
2. Decidir severidad: 🔴 reemplazar ahora / 🟡 sugerir mover / 🟢 monitorear.
3. Si es leve, aplicar arreglo en el momento. Si es grave, derivar al workflow de refactor.

---

## Paso 3: Mantenimiento de `agent_docs/`

Este es el paso que más se olvida y donde más se acumula entropía. Revisar:

### 3.1 Detectar archivos huérfanos

Listar archivos en `agent_docs/` y verificar que TODOS estén referenciados en el índice de CLAUDE.md raíz.

- **Archivo sin referencia en CLAUDE.md:** el agente no sabe que existe. Decidir: ¿agregarlo al índice o eliminarlo?
- **Referencia en CLAUDE.md a un archivo que ya no existe:** entrada rota, eliminar del índice.

### 3.2 Detectar archivos de features ya completadas

Por cada archivo en `agent_docs/features/`:

- ¿El feature está activamente en desarrollo? → mantener.
- ¿El feature se completó pero las decisiones documentadas pueden necesitarse al retomar? → mantener (sigue siendo onboarding del *por qué*).
- ¿El feature se completó hace mucho y el archivo es básicamente bitácora histórica vencida? → considerar mover a `agent_docs/history/` o eliminar.

### 3.3 Detectar referencias rotas en el contenido

Por cada archivo en `agent_docs/` que use referencias `archivo:línea` al código:

- Hacer un sample (no todas, 2-3 por archivo) y verificar que el archivo+línea siga existiendo.
- Si las referencias se rompieron, el contenido del archivo probablemente está desactualizado en muchas partes. Marcarlo para revisión.

### 3.4 Detectar contenido duplicado entre `agent_docs/` y CLAUDE.md

A veces, lo que empezó en `agent_docs/` termina siendo copiado parcialmente a CLAUDE.md (o viceversa). Detectar y consolidar.

---

## Paso 4: Mantenimiento de `.claude/rules/`

Por cada archivo en `.claude/rules/`:

- ¿Los patrones `paths:` siguen siendo correctos? (los paths del proyecto pueden haber cambiado)
- ¿Las reglas todavía aplican? (a veces una convención se elimina pero el archivo de reglas queda)
- ¿Aparecieron nuevas convenciones que deberían tener su propio archivo de reglas?
- ¿Hay archivos de reglas muy chicos (< 5 reglas) que podrían fusionarse con otro?

---

## Paso 5: Validar el núcleo mínimo de CLAUDE.md

Verificar rápido que CLAUDE.md raíz todavía cumple su función:

| Bloque | Verificar |
|---|---|
| QUÉ | ¿La descripción del proyecto sigue siendo correcta? El stack puede haber cambiado. |
| Mapa del repo | ¿Las carpetas mencionadas existen? ¿Aparecieron carpetas nuevas importantes? |
| CÓMO | ¿Los comandos siguen funcionando? `pnpm dev` vs `npm run dev` puede haber cambiado. |
| PORQUÉ | ¿Las decisiones de diseño documentadas siguen vigentes, o alguna fue reemplazada? |

---

## Paso 6: Generar reporte de auditoría periódica

```
──────────────────────────────────────
📋 AUDITORÍA PERIÓDICA — [Fecha]
──────────────────────────────────────

📊 MÉTRICAS
[Resumen del Paso 1]

🔍 ANTIPATRONES RECIENTES
[Lista del Paso 2 con severidad]

📂 MANTENIMIENTO DE agent_docs/
- Archivos huérfanos: [lista]
- Features cerrados a evaluar: [lista]
- Referencias rotas detectadas: [lista]
- Duplicaciones con CLAUDE.md: [lista]

⚙️ MANTENIMIENTO DE .claude/rules/
- Reglas con paths posiblemente obsoletos: [lista]
- Reglas que parecen ya no aplicar: [lista]
- Sugerencias de fusión: [lista]

✅ VALIDACIÓN DEL NÚCLEO MÍNIMO
- QUÉ: [✅ vigente / ⚠️ desactualizado]
- Mapa del repo: [✅ vigente / ⚠️ desactualizado]
- CÓMO: [✅ vigente / ⚠️ desactualizado]
- PORQUÉ: [✅ vigente / ⚠️ desactualizado]

──────────────────────────────────────
🛠 PLAN DE MANTENIMIENTO

ACCIONES INMEDIATAS (aplicar ahora, son rápidas):
1. [Acción 1]
2. [Acción 2]

ACCIONES DIFERIDAS (recomendar al usuario):
1. [Acción 1] — justificación
2. [Acción 2] — justificación

¿REQUIERE REFACTOR FORMAL?
[✅ No, el sistema está saludable / 🟡 Considerar / 🔴 Sí — derivar a auditar_existente.md]

──────────────────────────────────────
```

---

## Paso 7: Aplicar acciones inmediatas

Por cada acción marcada como inmediata:

- Aplicar el cambio.
- Si el cambio es no trivial, invocar `gate_de_entrada.md` antes de aplicarlo.

---

## Paso 8: Registrar la auditoría (recomendado)

Para que la PRÓXIMA auditoría periódica tenga referencia, sugerir al usuario llevar un registro mínimo. Opciones:

- Un comentario al final del CLAUDE.md raíz tipo `<!-- Última auditoría: 2026-06-01 — N líneas, sin antipatrones graves -->`. **Cuidado:** el comentario también consume presupuesto, mantenerlo a una sola línea.
- Un archivo en `agent_docs/history/auditoria_log.md` con una línea por auditoría.
- Un issue/ticket en el sistema de tracking del equipo.

---

## Casos especiales

### Caso: el sistema está saludable, no hay nada que hacer

Perfecto. Eso significa que la disciplina está funcionando. Reportar brevemente y cerrar. No inventar trabajo solo para "haber hecho algo".

### Caso: el sistema tiene tantos problemas que un refactor pequeño no alcanza

Derivar a `auditar_existente.md`. No intentar arreglar problemas estructurales con cambios menores.

### Caso: el usuario hace auditorías pero nunca aplica los cambios

Señal de que el mantenimiento se está volviendo ritual sin función. Conversar con el usuario sobre **por qué** no aplica las recomendaciones — puede ser que las recomendaciones sean demasiado conservadoras, o que el sistema esté realmente bien y la auditoría sobre-detecte.

---

## Conexión con otros workflows

| Después de este workflow | Workflow siguiente |
|---|---|
| Sistema saludable, mantenimiento aplicado | Cerrar. Próxima auditoría en 1-3 meses o por trigger. |
| Detectó problema estructural grave | `auditar_existente.md` para refactor profundo |
| Detectó que conviene agregar/quitar una capa | `decidir_capa.md` |
| Detectó intentos recientes de meter cosas malas que el gate no bloqueó | Revisar `workflows/gate_de_entrada.md` con el usuario para entender qué falló |
