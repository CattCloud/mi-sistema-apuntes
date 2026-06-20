# Tesla — Mi Sistema de Estudio

## Qué es este proyecto

Sistema para estudiar programación con IA de punta a punta, no solo para tomar apuntes. El objetivo se entiende como un **ciclo de vida del conocimiento**: **generar** apuntes que replican mi estilo → **repasarlos** para retenerlos de verdad → a futuro **conectarlos** y **recomendarme qué estudiar**. Hoy la etapa de **generación** está implementada y la de **repaso** tiene un **v1** funcional (recall conversacional; ver `sistema/metodologia_repaso.md` y `sistema/prompts/repaso_recall.md`); conectar/recomendar/publicar quedan para más adelante.

Los apuntes viven en este repo como **Markdown** (ya no en Notion; ver `sistema/decisiones/decision_final_md_local.md`). En la etapa de generación, el agente orquesta el proceso completo: identifica el tema, propone estructura, genera contenido junto conmigo, y lo redacta en mi estilo **directamente al `.md`**, donde lo ajusto en vivo.

## Flujo de generación (4 fases)

El flujo opera **progresivamente, sección por sección**:

1. **P1** — Identificar y acotar el tema (`p1_identificar_tema.md`)
2. **P2** — Proponer esqueleto/estructura con códigos de indicación (`p2_esqueleto_estructura.md`)
3. **P3 ⇄ P4** — Por cada sección del esqueleto (en un único hilo de contexto):
   - P3: El agente genera el contenido de la sección y se autocritica (qué falta, qué es dudoso, qué explicar mejor; marca `⚠️ verificar` los datos no confirmados)
   - P4: El agente integra su autocrítica y sintetiza en estilo Tesla, señalando lo que conviene verificar
   - El agente escribe la sección al `.md` → el usuario la ajusta en vivo en el editor
   - Siguiente sección

**Importante:** El agente es la **única fuente de contenido** Y el sintetizador (fuente única + auto-contraste). No hay IA externa — todo ocurre en un solo hilo, así el usuario puede preguntar y ajustar libremente sin perder contexto. El modelo anterior de dos fuentes (con IA externa) está preservado en `sistema/historial_version_ia_externa.md` por si conviene retomarlo.

## Archivos clave

| Archivo                                        | Propósito                                                                           |
| ---------------------------------------------- | ----------------------------------------------------------------------------------- |
| `sistema/manual_apuntes.md`                    | Guía de estilo definitiva md-nativa (fuente de verdad para voz y formato — etapa de generación) |
| `sistema/metodologia_repaso.md`                | Metodología de la etapa de repaso (recall activo primero, ciclo de 4 pasos, progresión de fricción) |
| `sistema/prompts/repaso_recall.md`             | Protocolo operativo del repaso v1: cómo el agente corre una sesión de recall conversacional |
| `sistema/prompts/p1_identificar_tema.md`       | Prompt P1: identificación y acotación del tema                                      |
| `sistema/prompts/p2_esqueleto_estructura.md`   | Prompt P2: esqueleto con códigos de indicación                                      |
| `sistema/prompts/p3_prompts_ias_externas.md`   | Prompt P3: generación de contenido + autocrítica (fuente única)                     |
| `sistema/historial_version_ia_externa.md`      | Registro del modelo anterior de dos fuentes (IA externa), por si conviene retomarlo |
| `sistema/prompts/p4_sintesis_estilo_propio.md` | Prompt P4: síntesis progresiva en estilo Tesla                                      |
| `sistema/mecanismos/mecanismo_apunte_abierto.md`          | Diseño del sistema de adiciones durante/después del armado                          |
| `sistema/mecanismos/mecanismo_pausa_retomar.md`           | Diseño del mecanismo para pausar/retomar apuntes entre temas sin perder contexto    |
| `apuntes/[ws]/[tema]/00_indice.md`                     | Entrada y **fuente única** del apunte: alcance, secciones, estado de generación (EN PROGRESO/PAUSADO/FINALIZADO) y estado de repaso (bloque `repaso:` con último/próximo/nivel/reforzar) |
| `sistema/perfil/yo.md`                         | Perfil personal/emocional del usuario                                               |
| `sistema/perfil/yo_profesional.md`             | Perfil profesional (rol, stack, objetivos) — P1 lo lee para recomendar temas        |
| `NOTAS.md`                                     | Ideas y adiciones centralizadas (NO distribuido por carpeta)                        |
| `contexto/tareas_transicion.md`                | Roadmap T1-T11 con estado de progreso                                               |

## Estado del roadmap

- **T1-T8:** ✅ Completadas (documentación, análisis, manual, prompts de las 4 fases)
- **T9:** 🔄 En progreso — Prueba end-to-end con tema real
- **T10-T11:** ⬜ Pendientes (skill del agente, NotebookLM)

## Estado de T9 (prueba end-to-end)

- **Tema:** Claude Code — Arquitectura Interna
- **Estado:** ⏸️ Pausado en P3⇄P4 (Sección 1 de 8; P2 ✅). Fuente de verdad: `apuntes/ia/claude-code-arquitectura/00_indice.md`
- **Input:** 3 transcripciones de video sobre la arquitectura de Claude Code
- **P1 aprobada:** El tema se dividió en 2 apuntes:
  1. "Claude Code — Arquitectura Interna" (query loop, tools, contexto, CLAUDE.md, skills) ← **este primero**
  2. "Claude Code — Patrones Agénticos y Modo Avanzado" (patrones, sub-agentes, seguridad) ← después
- **Workspace:** IA / LLMs 🤖
- **Arquetipo:** Constructor Teórico + Flujo Analógico
- **Siguiente paso al retomar:** Continuar P3⇄P4 desde la Sección 2 (ver `apuntes/ia/claude-code-arquitectura/00_indice.md`)

## Apuntes pausados

| Apunte | Fase al pausar | Checkpoint |
|--------|----------------|------------|
| Claude Code — Arquitectura Interna | P2 ✅, en P3⇄P4 (Sección 1 de 8) | `apuntes/ia/claude-code-arquitectura/00_indice.md` |

## Apuntes completados

| Apunte | Estado | Notas |
|--------|--------|-------|
| CLAUDE.md — Arquitectura de Contexto | ✅ Listo | 9 secciones. Ver `apuntes/ia/claude-md-arquitectura-contexto/00_indice.md`. Temas asociados pendientes en NOTAS.md (hooks, auto memory, plantillas por nivel). |

## Mecanismos de flexibilidad

**Apunte Abierto** (`sistema/mecanismos/mecanismo_apunte_abierto.md`) — adiciones *dentro* de un apunte activo:
1. **Pregunta Rápida / Apunte Vivo** — se integra al esqueleto si enriquece la sección
2. **Guardián de Alcance** — redirige temas nuevos a NOTAS.md (anti-perfeccionismo)
3. **NOTAS.md centralizado** — un solo archivo en raíz con secciones por tema

**Pausa y Retomar** (`sistema/mecanismos/mecanismo_pausa_retomar.md`) — interrupciones *entre* apuntes:
4. **Estado en el `00_indice.md`** (`EN PROGRESO`/`PAUSADO`/`FINALIZADO`) — el índice es el checkpoint; permite retomar sin perder contexto

**Estado de repaso en el `00_indice.md`** — el índice es también la **fuente única** del repaso: cuando un apunte está `FINALIZADO`, su bloque `repaso:` (último/próximo/nivel/reforzar) guarda cuándo toca repasarlo. La agenda *"¿qué repaso hoy?"* se **deriva** de esos campos, no se almacena aparte (ver `sistema/metodologia_repaso.md`).

## Reglas importantes

- Leer los prompts de cada fase ANTES de ejecutarla (están en `sistema/prompts/`)
- Leer el manual de estilo para voz y formato md-nativo (`sistema/manual_apuntes.md`)
- El usuario prefiere pragmatismo: avanzar > pulir. No iterar indefinidamente.
- Preguntas con alternativas concretas, no abiertas. Minimizar fricción.
- Los tecnicismos van en inglés, las explicaciones en español (spanglish controlado).
