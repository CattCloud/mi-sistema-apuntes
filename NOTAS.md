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

### Pendientes a futuro — NotebookLM / deploy (consolidado de `contexto/notas.txt`)

- [ ] **NotebookLM — definir uso:** hay skills sobre NotebookLM; definir exactamente para qué se necesitan (relacionado con T11 del roadmap).
- [ ] **MCP Claude ↔ NotebookLM:** ¿existe un MCP que conecte Claude con NotebookLM?
- [ ] **PUBLICACION: Deploy con GitHub Pages:** publicar los apuntes vía GitHub Pages — pendiente resolver qué pasa con los videos e imágenes de infografías generadas. Ref: https://www.youtube.com/watch?v=rByIDQYu4jQ
