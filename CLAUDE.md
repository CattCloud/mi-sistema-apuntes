# Tesla — Mi Sistema de Estudio

## Qué es este proyecto

Sistema para estudiar programación con IA de punta a punta, no solo para tomar apuntes. El objetivo se entiende como un **ciclo de vida del conocimiento**: **generar** apuntes que replican mi estilo → **practicar** construyendo para fijar el criterio → **repasarlos** para retenerlos de verdad → a futuro **conectarlos** y **recomendarme qué estudiar**. Hoy la etapa de **generación** está implementada, la de **repaso** tiene un **v1** funcional (recall conversacional + consolidación multimodal con NotebookLM; ver `sistema/metodologia_repaso.md`, `sistema/prompts/repaso_recall.md` y `sistema/prompts/repaso_consolidacion_notebooklm.md`), y la de **práctica guiada por proyecto** está en implementación (ver `sistema/metodologia_practica_guiada.md`); conectar/recomendar/publicar quedan para más adelante.

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
| `sistema/prompts/repaso_consolidacion_notebooklm.md` | Protocolo del Paso 3: cómo la IA redacta los prompts de Customize de NotebookLM (audio + video) para la consolidación multimodal |
| `sistema/metodologia_practica_guiada.md`       | Metodología de la etapa de práctica (criterio>memoria, IA instructor no autocompletado, bloques aditivos, pistas escalonadas) |
| `sistema/formas_de_cierre.md`                  | **Catálogo de formas de cerrar un módulo** (caso, predicción, auditoría, diagnóstico, consola, micro-ejercicio, quiz, explicación, diseño) + las 4 reglas. La primera: un cierre **no puede exigir un tema que el temario aún no cubrió** |
| `sistema/prompts/diagnostico_bloque.md`        | Protocolo: generar el diagnóstico Pareto por bloque (just-in-time) antes de practicar |
| `sistema/prompts/practica_guiada_proyecto.md`  | Protocolo operativo de la práctica: define mini-proyecto, fases, HU con criterios de aceptación, pistas escalonadas (nunca el código) |
| `sistema/prompts/migracion_notion.md`          | Protocolo: traslado ligero just-in-time de notas de Notion al repo (tier referencia) vía MCP |
| `contexto/plan_estudio/temario_arquitectura_software.md` | **Ruta actual (1/3).** Arquitectura de Software (nivel 3): 8 módulos, 37 temáticas. Evaluación por **caso** (criterio, sin código) |
| `contexto/plan_estudio/temario_typescript.md`  | **Ruta actual (2/3).** TypeScript de cero: 9 módulos + proyecto integrador, 45 temáticas. Evaluación por **micro-ejercicio + quiz de lectura de tipos**; cierra con un cliente tipado de la API de Claude |
| `contexto/plan_estudio/temario_cloud_developers.md` | **Ruta actual (3/3).** Cloud for Developers (nivel 2): 9 módulos, 47 temáticas. Evaluación por **práctica en consola + caso**. Única ruta apoyada en curso externo — ver `sistema/prompts/integracion_curso_sistema.md` |
| `sistema/prompts/integracion_curso_sistema.md` | Protocolo curso ↔ sistema: el temario manda, el curso alimenta. Qué se descarta de una transcripción, diapositivas vs. interfaz, notas previas como tier referencia o materia prima |
| `contexto/plan_estudio/silabo_curso_aws_dva.md` | Sílabo del curso AWS DVA-C02 (Udemy) **filtrado clase por clase**: 39h33 → ~14h. Insumo del temario cloud, no ruta de estudio |
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

## Etapa de práctica (Practicar)

Refuerza el conocimiento **construyendo**, no memorizando. Diseño en `sistema/metodologia_practica_guiada.md`; el agente lee los protocolos de `sistema/prompts/` antes de ejecutar.

- **Regla de oro:** la IA es **instructor, no autocompletado** — entrega criterios de aceptación y **pistas escalonadas a petición**, **nunca el código**. El alumno desarrolla la lógica (criterio > memoria).
- **Diagnóstico Pareto just-in-time:** antes de estudiar algo se marca qué se domina (✅), qué está oxidado (🔄) y qué no se sabe (❌). Solo se estudia lo marcado ❌. Protocolo en `sistema/prompts/diagnostico_bloque.md`.
- **Concepto:** traslado ligero de Notion (`migracion_notion.md`, tier referencia en `apuntes/[ws]/notion/`) + generación Tesla (P1–P4) solo para los huecos reales.
- **Evaluación por caso** *(mecanismo nuevo, en prueba)*: para temas de criterio (arquitectura), el cierre no es construir ni recitar — es resolver un **escenario de decisión** y justificar el costo de las alternativas. Ver `contexto/plan_estudio/temario_arquitectura_software.md`.

> ⚠️ **Nota de estado:** la maquinaria de *bloques aditivos B1–B5* y los mini-proyectos en `practica/` fueron eliminados. Se conserva la **técnica** (Pareto, criterio>memoria, IA instructor), no el roadmap. Los prompts `diagnostico_bloque.md` y `practica_guiada_proyecto.md` aún mencionan `plan_bloques.md`, que ya no existe — pendiente de limpiar.

## Reglas importantes

- Leer los prompts de cada fase ANTES de ejecutarla (están en `sistema/prompts/`)
- Leer el manual de estilo para voz y formato md-nativo (`sistema/manual_apuntes.md`)
- El usuario prefiere pragmatismo: avanzar > pulir. No iterar indefinidamente.
- Preguntas con alternativas concretas, no abiertas. Minimizar fricción.
- Los tecnicismos van en inglés, las explicaciones en español (spanglish controlado).
