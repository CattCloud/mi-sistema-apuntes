# 🧠 Tesla — Mi Sistema de Estudio

Sistema para estudiar programación con IA como un **ciclo de vida del conocimiento**: generar apuntes en el estilo personal del usuario → practicar construyendo → repasar para retener → (a futuro) conectar y recomendar qué estudiar. Los apuntes viven en este repositorio como **Markdown** y se leen y editan en VS Code / Antigravity.

---

## Cómo se usa

1. **Estudiar un tema o un módulo:** dile al agente *"quiero hacer un apunte sobre [tema]"* o *"sigamos con B4"*. Si viene de un temario, el esqueleto ya está hecho; si no, el agente propone tema y alcance (P1) y el esqueleto (P2), y **tú apruebas**.
2. **Sección por sección:** el agente genera, se autocritica y escribe cada sección **directo al `.md`**, marcando con `⚠️ verificar` lo dudoso. Tú la lees y la ajustas en vivo en el editor.
3. **Cerrar el módulo:** una evaluación sin el material delante (caso, predicción, consola, micro-ejercicio o quiz en vivo), en `99_cierre.md`.
4. **Repasar:** *"repasemos X"* o *"¿qué repaso hoy?"*. Recall a libro cerrado; lo que falla queda en el índice del apunte para el próximo repaso.
5. **Ideas que salen por el camino:** van a `NOTAS.md`; *"procesa mis notas"* las ubica.

**Dónde ver cómo vas:** el `00_indice.md` de cada apunte (y el índice de cada workspace).

> **Herramientas:** lectura con Markdown Preview Enhanced (renderiza Mermaid) · edición WYSIWYG con Markdown Editor (zaaack) · navegación entre archivos con Markdown Memo (`[[wiki-links]]`). Obsidian quedó fuera del sistema.

---

## Cómo trabajan los agentes aquí

Las reglas para cualquier agente de IA están en **`AGENTS.md`** (la constitución: 12 reglas). Las reglas de redacción y estructura de los apuntes están en `apuntes/AGENTS.md`, y las de los temarios en `contexto/plan_estudio/AGENTS.md`. Los procedimientos paso a paso (generar, cerrar, repasar, integrar un curso, practicar…) viven en `.claude/skills/`. En Claude Code, además, unos guardianes automáticos revisan cada archivo al guardarlo y un revisor independiente relee lo escrito. El porqué de esta organización: `sistema/decisiones/decision_arquitectura_reglas.md`.

---

## Estructura del repositorio

```
tesla/
├── AGENTS.md · CLAUDE.md        ← reglas para agentes (constitución · lo propio de Claude)
├── README.md · NOTAS.md · PROMPT.md
│
├── .claude/                     ← procedimientos (skills), guardianes (hooks) y revisor
│
├── contexto/plan_estudio/       ← ⭐ los temarios de las rutas y el sílabo del curso externo
│
├── apuntes/                     ← LOS APUNTES
│   └── [workspace]/             ← arquitectura/ · typescript/ · cloud/ · ia/
│       ├── 00_indice.md         ← índice del workspace
│       └── [modulo]/
│           ├── 00_indice.md     ← alcance, secciones, estado y repaso del apunte
│           ├── 01_seccion.md    ← una sección por archivo
│           ├── 99_cierre.md     ← la evaluación del módulo
│           ├── img/             ← capturas e imágenes de apoyo
│           └── _input/          ← material fuente (transcripciones, capturas crudas)
│
├── sistema/
│   ├── metodologia_repaso.md · metodologia_practica_guiada.md   ← el porqué
│   ├── perfil/                  ← quién es el usuario y su entorno AWS
│   └── decisiones/              ← registro de decisiones y de reglas
│
├── practica/                    ← código de práctica
└── _archivo/                    ← diseño e historial del sistema (solo consulta)
```
