# 📝 NOTAS

> Archivo centralizado para anotar ideas, preguntas y adiciones que surgen durante o después del armado de apuntes.
> El agente procesa este archivo cuando el usuario lo indique.

---

## Por tema

<!-- 
Formato por entrada:
- [ ] [Nota o pregunta] — breve contexto de por qué es relevante

Cuando el agente procese estas notas, marcará con [x] las procesadas 
y anotará qué hizo: integró en sección X, creó nuevo H3, o descartó.
-->

### CLAUDE.md — Arquitectura de Contexto

- [ ] **Redacción profunda por nivel de scope** — El apunte actual cubre el reencuadre conceptual y la estructura general, pero no la redacción específica de cada nivel (usuario, proyecto, local). Pendiente decidir: ¿se agrega un H3 con ejemplos concretos por nivel en este apunte, o se hace un apunte aparte tipo *"CLAUDE.md — Plantillas y ejemplos por nivel"* con plantillas reales de cómo se vería un CLAUDE.md de usuario vs proyecto vs local, en distintos tipos de proyecto (web típico, monorepo, etc.)? Decidir al cerrar el apunte actual.

---

## Ideas de temas nuevos

<!-- 
Temas que se me ocurren para futuros apuntes.
No pertenecen a ningún apunte existente.
Cuando quiera iniciar uno, le digo al agente que tome la idea de aquí.

Formato:
- [ ] [Tema] — [breve descripción de qué cubriría]
- [ ] En un futuro que no solo sea mi estructura de apuntes sino basandose en los apuntes que tenga vea lo que me falta o me recomiende que estudiar segun lo que necesito, porque aqui voy a recopilar todos los apuntes que tengo
-->

- [ ] **AWS Solutions Architect Associate (SAA)** — Pospuesto. Plan intensivo de 30 días para la certificación. Retomar en el futuro; ahora el foco está en IA.
- [ ] **Hooks de Claude Code** — Cómo se definen, qué eventos existen (PreToolUse, PostToolUse, Stop, SessionStart), cómo escribir matchers, ejemplos prácticos de scripts (bash/node/python), cómo se integran con linters y CI. Complemento natural del apunte de CLAUDE.md (imposición técnica vs guía blanda).
- [ ] **Auto memory de Claude Code** — Mecanismo de memoria automática del agente. Por proyecto, persiste entre sesiones, agente decide qué guardar. Profundizar: ubicación exacta, tipos de notas que guarda, política de poda/olvido, límites de tamaño, cómo inspeccionarla. Complemento del apunte de CLAUDE.md.

---

## Mejoras al sistema

- [ ] Archivos de conceptos nuevos, solo conceptos que viste durante un apunte para repasarlo
- [ ] Repasar un tema con la IA
- [ ] Al leer , agregar la capacidad de comentar una seccion donde tienes preguntas para que luego se lo digas a la IA y aclare esos comentarios o los resuelva

### Ideas de `video.md` (7 prompts de estudio con IA) — para etapas futuras

- [ ] **Modalidad "examen de simulacro" (etapa Repaso):** una modalidad *distinta* del recall conversacional — un examen completo en lote, con preguntas trampa, que se responde de corrido y se puntúa al final (resultado + análisis de qué mejorar). Va *después* de estudiar, como ensayo de un examen real. Mantenerlo **abierto/mixto, no opción múltiple** (para no caer en la ilusión de fluidez que el propio video critica). Encaja en las "modalidades adicionales" pendientes de `metodologia_repaso.md`.
- [ ] **"Plan de estudio / mapa por dificultad" (etapas Conectar + Recomendar, NO repaso):** dado un material o un set de apuntes, generar un esquema de temas/subtemas ordenado de fundamental → complejo, con nivel de dificultad por tema ("GPS del estudio"). Es materia prima para la **etapa 3 (Conectar)** y la **etapa 5 (Recomendar qué estudiar)** del ciclo de vida. Conecta con la visión ya anotada de "que el sistema me recomiende qué me falta estudiar".

- [ ] Revisa esto https://www.reddit.com/r/PromptEngineering/comments/1tz5yit/how_i_built_a_full_knowledge_system_around/

- [ ] Practica actualmente es solo al final de un apunte pero van a haber situaciones donde seran entre un apunte -> De echo van a haber momentos donde se va a comprender mejor con practicas(codigo,visual,manual) luego de un breve teoria  


### Pendientes a futuro — NotebookLM / deploy (consolidado de `contexto/notas.txt`)

- [x] **NotebookLM — uso definido:** consolidación multimodal del Paso 3 (audio + video), modo manual; la IA redacta los prompts de Customize. Ver `.claude/skills/repasar/consolidacion-notebooklm.md`.
- [ ] **Automatizar NotebookLM (capa futura):** hoy es manual (subir fuentes + pegar prompt + clic). Candidatos evaluados para automatizar (todos browser-automation / MCP, con fragilidades):
  - `teng-lin/notebooklm-py` — 5.9K instalaciones, el más completo (crear notebooks, ingerir multi-formato, generar artefactos, descargar). ⚠️ bug de auth por cookies en Python 3.13+. Mejor para control total / scripting.
  - `joeseesun/anything-to-notebooklm` — 515 inst., "cualquier cosa → NotebookLM" (genera podcasts/PPT/mapas mentales). Usa servidor MCP. ⚠️ auditoría de seguridad mixta.
  - `giuseppe-trisciuoglio/developer-kit@notebooklm` — 1K inst., orientado a RAG/docs. Requiere `notebooklm-mcp-cli`. Mejor como base de conocimiento de proyecto.
  - Decisión: **no adoptar todavía** (se gana con dolor). Reevaluar cuando el hábito manual esté firme y la fricción de pegar prompts moleste de verdad.
- [ ] **MCP Claude ↔ NotebookLM:** ¿existe un MCP que conecte Claude con NotebookLM? (cubierto en parte por los candidatos de arriba).
- [ ] **PUBLICACION: Deploy con GitHub Pages:** publicar los apuntes vía GitHub Pages — pendiente resolver qué pasa con los videos e imágenes de infografías generadas. Ref: https://www.youtube.com/watch?v=rByIDQYu4jQ


- [ ] **AWS CLI en profundidad (tema propio, fuera del curso):** en B3 el CLI entra solo como *superficie de práctica* — el sitio donde una credencial se vuelve concreta. Lo que queda pendiente y **el curso no cubre**: perfiles múltiples (`--profile`, `~/.aws/config`), scripting y automatización, `--query` con JMESPath, salida en JSON para encadenar comandos, y cuándo el CLI le gana a la consola. Fuente: propia. Decidido el 2026-08-25 al separar B3 de B3b.
