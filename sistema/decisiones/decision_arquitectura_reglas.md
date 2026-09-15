# Decisión: arquitectura de reglas — cada regla en un solo lugar, cargada en el momento

> **Estado:** ✅ vigente. **Fecha:** 2026-09-15. **Aprobada por el usuario** (camino A, aplicada primero en Okaeri y después en Tesla).

## Contexto

Los agentes olvidaban reglas del sistema. El diagnóstico, hecho sobre Okaeri y confirmado en Tesla, encontró que el problema no era el contenido sino su distribución:

- **Reglas copiadas en muchos archivos:** el spanglish controlado en 12, "Lo que debiste llevarte" en 5, "el temario manda" en 3.
- **Estado congelado en `CLAUDE.md`:** roadmap T9 "en progreso", "T10-T11 pendientes". El apunte activo real solo aparecía en `PROMPT.md`.
- **Referencias muertas:** a `plan_bloques.md` (ya no existe) y a `_manual_apuntes_v2_notion.md` (movido).
- **Reglas que vivían solo en la memoria del agente, fuera del repositorio:**
  - quiz en vivo;
  - imágenes de apoyo;
  - aprendizaje progresivo;
  - cinco patrones de "específico, no ambiguo";
  - la cuenta y la región de AWS.
  - La memoria además contradecía al `PROMPT.md`: `us-east-2` frente a `us-east-1`.
- **Ningún control automático.** Un conteo al 2026-09-15 mostró la regla de 3-5 ideas en "Lo que debiste llevarte" incumplida en 14 de 43 secciones.

## Decisión

Seis piezas, sobre estándares abiertos (`AGENTS.md`, Agent Skills) y funciones documentadas de Claude Code:

1. **Constitución:** `AGENTS.md` (R1-R12), importada por `CLAUDE.md`.
2. **Reglas de carpeta:**
   - `apuntes/AGENTS.md` (A1-A12);
   - `contexto/plan_estudio/AGENTS.md` (T1-T6).
3. **Procedimientos** en `.claude/skills/`:
   - `generar-apunte`, que absorbe P1-P4, el estilo y los mecanismos de apunte abierto y de pausa;
   - `cerrar-modulo`, `repasar`, `integrar-curso`, `practicar`, `migrar-notion`, `procesar-notas` y `nueva-regla`.
   - Se conserva `claude-md-architect`.
4. **Guardianes:** hooks que derivan el estado de los índices al iniciar y al compactar, revisan lo medible al guardar y recuerdan lo pendiente antes de terminar. Modo inicial: avisar.
5. **Revisor:** `.claude/agents/revisor-tesla.md`, con contexto limpio y solo lectura.
6. **Estado y registro:**
   - el estado sigue en cada `00_indice.md` (no se crea un archivo de estado global; el guardián lo deriva);
   - las reglas nuevas se anotan en `00_registro_reglas.md`.

## Qué cambió de lugar

| Antes | Ahora |
|---|---|
| `sistema/manual_apuntes.md` §1, §5.4, §7, §8 | `apuntes/AGENTS.md` (A1-A12) |
| `sistema/manual_apuntes.md` §2-§6 | `.claude/skills/generar-apunte/estilo.md` (misma numeración) |
| `sistema/prompts/p1…p4` | `.claude/skills/generar-apunte/p1-tema.md … p4-sintetizar.md` |
| `sistema/mecanismos/` (apunte abierto, pausa y retomar) | `generar-apunte` y `procesar-notas`; originales en `_archivo/sistema/mecanismos/` |
| `sistema/formas_de_cierre.md` | skill `cerrar-modulo` |
| `sistema/prompts/repaso_recall.md` · `repaso_consolidacion_notebooklm.md` | skill `repasar` (+ `consolidacion-notebooklm.md`) |
| `sistema/prompts/integracion_curso_sistema.md` | skill `integrar-curso` |
| `sistema/prompts/practica_guiada_proyecto.md` · `diagnostico_bloque.md` | skill `practicar` (+ `diagnostico-pareto.md`) |
| `sistema/prompts/migracion_notion.md` | skill `migrar-notion` |
| `contexto/` histórico (sistema actual/futuro, preguntas, tareas de transición, info, assets, manual v2) · `sistema/analisis_patrones_apuntes.md` · `historial_version_ia_externa.md` | `_archivo/` |
| Memoria del agente (6 notas) | R7, R9, R10 · A6, A9 · T2 · `sistema/perfil/entorno_aws.md` |
| Estado en `CLAUDE.md` y README | solo los `00_indice.md` |

## Consecuencias

- Lo que se carga en toda conversación no crece con los apuntes.
- Toda regla nueva entra por `nueva-regla`, que la ubica, la aplica hacia atrás y la suma al guardián si es medible.
- Guardianes y revisor son de Claude Code; otros agentes siguen `AGENTS.md` y los procedimientos, sin esos controles.
- La skill `notebooklm` (en construcción, sin commitear) reemplazará a `repasar/consolidacion-notebooklm.md` cuando esté lista.
