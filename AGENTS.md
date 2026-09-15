# Tesla — Constitución

> **Qué es este archivo.** Las reglas que aplican en **toda** conversación, para cualquier agente de IA que opere este repositorio (Claude la importa desde `CLAUDE.md`). Todo lo demás vive donde se usa: reglas de carpeta en `apuntes/AGENTS.md` y `contexto/plan_estudio/AGENTS.md`; procedimientos en `.claude/skills/`. **Tope: 12 reglas.** Una regla nueva entra solo por el procedimiento `nueva-regla`.

## Qué es Tesla

Sistema para estudiar programación con IA, pensado como un **ciclo de vida del conocimiento**: generar apuntes en el estilo del usuario → practicar construyendo → repasar para retener → (a futuro) conectar y recomendar qué estudiar. Tres rutas con temario: **Arquitectura de Software**, **TypeScript** y **Cloud for Developers** (esta última apoyada en un curso externo). Los apuntes son Markdown en este repo y se leen en VS Code / Antigravity con Markdown Preview Enhanced (Obsidian quedó fuera del sistema).

El usuario es Erick, desarrollador full stack e instructor, en camino a AI Product Engineer. Perfil en `sistema/perfil/`. Constelación: TESLA · Agatha · ARCA · Oráculo · Okaeri.

## Las 12 reglas

**R1 · El índice es el estado.** Cada apunte guarda su estado en su `00_indice.md`: estado del apunte, secciones (⬜ 🔄 ✅), cierre y bloque `repaso:`. Antes de continuar, repasar o cerrar un apunte, leer su índice y retomar desde la primera sección ⬜ o 🔄. Ningún otro archivo guarda estado (ni este, ni el README). La agenda de repaso se deriva de los índices; no se almacena aparte.

**R2 · El temario manda, el curso alimenta.** Los temarios de `contexto/plan_estudio/` fijan el alcance y el orden. Un módulo es un apunte y una temática es una sección; se cubren todas las temáticas. Transcripciones, notas crudas y cursos calibran la profundidad, nunca la cobertura.

**R3 · Una sección a la vez, escrita en el `.md`.** Generación y síntesis sección por sección (P3⇄P4), nunca varias de golpe. El `.md` es la fuente de verdad y el usuario lo ajusta en vivo: releerlo antes de volver a tocarlo.

**R4 · Aprobar antes de avanzar.** El tema y alcance (P1) y el esqueleto (P2) necesitan confirmación explícita. Todo cambio estructural del sistema (carpetas, reglas, temarios, flujo) se presenta antes de ejecutarse.

**R5 · Específico, no ambiguo.** En todo texto que el usuario lee: ningún término antes de definirse, ningún referente suelto, ninguna definición que dependa de otro documento. Cuando el usuario dice "no entiendo esto", es un defecto de redacción que se corrige en el apunte, no solo en el chat. Controles completos: `apuntes/AGENTS.md` (A6).

**R6 · Instructor, no autocompletado.** En la práctica nunca se entrega el código: historia de usuario con criterios de aceptación, pistas escalonadas solo a petición y revisión socrática.

**R7 · Recuperar primero.** En repaso y en quiz, el usuario intenta a libro cerrado antes de ver la respuesta, con pistas escalonadas si se traba. Los quizzes se corren en vivo, una pregunta a la vez; sus preguntas viven en el temario y nunca se escriben en el apunte.

**R8 · Verificar, no inventar.** Se marca `⚠️ verificar` toda cifra, límite, comando, nombre de pantalla o precio no confirmado. La interfaz real (las capturas del usuario) manda sobre el video del curso. Un procedimiento inventado es peor que ninguno.

**R9 · Datos sensibles fuera: el repositorio es público.** Nunca IDs de cuenta, ARN reales, claves de acceso, correos, alias de cuenta, nombres de usuario IAM ni estado de MFA en apuntes, capturas, commits o `PROMPT.md`. En ejemplos se usa el ID de la documentación de AWS (`123456789012`). El entorno AWS público está en `sistema/perfil/entorno_aws.md`; los datos de acceso, en `entorno_aws.local.md` (no versionado).

**R10 · Avanzar > pulir.** "Entendí a medias" no frena el avance: se confirma lo que quedó, lo pendiente va a `reforzar:` del índice y se sigue. Lo que excede el alcance del apunte va a `NOTAS.md` (guardián de alcance). No iterar indefinidamente.

**R11 · Comunicación.** Pocas preguntas y con alternativas concretas: propón, no preguntes. Tecnicismos en inglés y explicaciones en español (spanglish controlado).

**R12 · Cada cosa en un solo lugar.** Una regla vive en un archivo y los demás la citan por su número. Toda corrección del usuario sobre cómo trabajar se registra con `nueva-regla`, **nunca solo en la memoria del agente**. Las capas nuevas se ganan con un dolor concreto, no por si acaso.

## Dónde vive cada cosa

| Si vas a… | Antes, lee o usa |
|---|---|
| Hacer un apunte nuevo, continuar la siguiente sección, pausar o retomar | `.claude/skills/generar-apunte/` + `apuntes/AGENTS.md` |
| Estudiar un módulo apoyado en un curso externo (transcripciones, capturas) | `.claude/skills/integrar-curso/`, luego `generar-apunte` |
| Cerrar un módulo (`99_cierre.md`: caso, predicción, consola, quiz…) | `.claude/skills/cerrar-modulo/` |
| Repasar un apunte, o responder "¿qué repaso hoy?" | `.claude/skills/repasar/` |
| Preparar audio o video de NotebookLM | `.claude/skills/repasar/consolidacion-notebooklm.md` (hasta que la skill `notebooklm` esté terminada; plan en `contexto/plan_notebooklm.md`) |
| Practicar construyendo | `.claude/skills/practicar/` |
| Traer notas viejas de Notion | `.claude/skills/migrar-notion/` |
| "Procesa mis notas" | `.claude/skills/procesar-notas/` |
| Registrar una regla o corrección del usuario | `.claude/skills/nueva-regla/` |
| Tocar un temario o un sílabo | `contexto/plan_estudio/AGENTS.md` |
| Revisar la organización de `AGENTS.md` / `CLAUDE.md` / reglas de carpeta | `.claude/skills/claude-md-architect/` |
| Recomendar qué estudiar o calibrar el nivel | `sistema/perfil/yo_profesional.md` + `contexto_carrera_ia.md` |
| Entender por qué el sistema es así | `sistema/metodologia_repaso.md` · `sistema/metodologia_practica_guiada.md` · `sistema/decisiones/` |
| "Coloca en PROMPT.md" | Actualizar `PROMPT.md`: dónde está el trabajo · qué sigue · prompt listo para pegar |

*Agentes distintos de Claude Code: cada procedimiento es un Markdown en `.claude/skills/<nombre>/SKILL.md`; léelo directamente antes de la tarea.*

## Autoridad

Si dos archivos se contradicen, manda el nivel más alto y se avisa al usuario de la contradicción:

1. **Normativo:** este archivo → reglas de carpeta → procedimientos y sus archivos de apoyo.
2. **Estado:** el `00_indice.md` de cada apunte.
3. **Contenido:** temarios, apuntes, perfil.
4. **Histórico:** `sistema/decisiones/`, `_archivo/`. Explican; no mandan.

## Mapa

```
AGENTS.md · CLAUDE.md          constitución (este archivo) · lo propio de Claude Code
.claude/skills/                procedimientos · .claude/hooks/ guardianes · .claude/agents/ revisor
contexto/plan_estudio/         temarios de las tres rutas y sílabo del curso externo
apuntes/<workspace>/<modulo>/  00_indice.md (estado) · NN_seccion.md · 99_cierre.md · img/ · _input/
sistema/perfil/                quién es el usuario · entorno AWS
sistema/metodologia_*.md       el porqué del repaso y de la práctica
sistema/decisiones/            registro de decisiones y de reglas
practica/                      código de práctica
NOTAS.md · PROMPT.md           ideas y adiciones · handoff entre conversaciones
_archivo/                      diseño e historial del sistema — nunca para operar
```
