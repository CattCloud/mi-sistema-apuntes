@AGENTS.md

## Solo en Claude Code

- **Procedimientos = skills.** Los de la tabla "Dónde vive cada cosa" están en `.claude/skills/` y se invocan por nombre (`/generar-apunte`) o se activan por su descripción. Si la tarea coincide con uno, se carga **antes** de actuar. La carpeta `notebooklm/` está en construcción (plan en `contexto/plan_notebooklm.md`): mientras no tenga `SKILL.md`, la consolidación con NotebookLM sigue en `repasar`.
- **Antes de editar** `AGENTS.md`, este archivo o las reglas de carpeta, pasar por el gate de entrada de `claude-md-architect`.
- **Guardianes** (`.claude/settings.json` → `.claude/hooks/`): al empezar, retomar o compactar la conversación derivan de los índices qué apuntes están en progreso o pausados y qué cierres y repasos quedan pendientes; al guardar un archivo revisan lo medible; antes de terminar recuerdan lo que quedó pendiente. Modo actual: **avisar** (`.claude/hooks/reglas.json`). Un aviso se corrige antes de cerrar la tarea, o se le explica al usuario por qué no aplica.
- **Revisor** (`.claude/agents/revisor-tesla.md`): al terminar una sección o un cierre, delegarle la revisión y corregir lo que confirme.
- **Memoria automática:** solo preferencias de esta máquina. Las reglas del sistema viven en el repositorio (R12).
