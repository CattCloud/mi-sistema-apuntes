# 🧠 Tesla — Mi Sistema de Estudio

Sistema para generar apuntes de programación con IA, replicando el estilo personal de toma de notas. Los apuntes **viven en este repositorio como Markdown** y se leen/editan en VSCode/Antigravity — ya no en Notion.

---

## ¿Qué hace este sistema?

En lugar de pasar 1+ hora sintetizando manualmente notas desde cursos y documentación, el agente orquesta el proceso completo: identifica el tema, propone la estructura, genera el contenido (autocriticándose para conservar el contraste sin un segundo hilo) y lo redacta en el estilo personal del usuario **directamente al `.md`**, donde el usuario lo ajusta en vivo.

---

## Estructura del Repositorio

```
mi-sistema-estudio/
├── README.md  NOTAS.md
│
├── sistema/                  ← EL MOTOR (estilo, prompts, mecanismos, decisiones)
│   ├── manual_apuntes.md     ← guía de estilo md-nativa (fuente de verdad)
│   ├── analisis_patrones_apuntes.md
│   ├── historial_version_ia_externa.md
│   ├── perfil/              ← yo.md, yo_profesional.md (lo que el sistema sabe del usuario)
│   ├── prompts/              ← p1..p4 (las 4 fases del flujo)
│   ├── mecanismos/           ← apunte_abierto, pausa_retomar
│   └── decisiones/           ← intento_obsidian, decision_final_md_local
│
├── contexto/                 ← documentación del proyecto
│   ├── *.md (actual, futuro, roadmap, preguntas)
│   └── assets/               ← imágenes y diagramas
│
└── apuntes/                  ← LOS APUNTES (el output, viven aquí)
    └── [workspace]/          ← ej. ia/  (un emoji por dominio)
        ├── 00_indice.md      ← índice del workspace (sus apuntes + estado)
        └── [tema]/
            ├── 00_indice.md  ← entrada del apunte: alcance + estado + secciones
            ├── 01_seccion.md ← una sección por archivo (abre con #)
            ├── 02_seccion.md
            └── _input/       ← material fuente (transcripciones, links)
```

---

## Cómo usar el sistema

1. Dile al agente: *"Quiero hacer un apunte sobre [tema]"* y comparte tu material (PDF, link, transcripción, descripción).
2. **P1** — identifica tema, alcance, workspace y arquetipo → **tú apruebas**.
3. **P2** — propone el esqueleto (las secciones) → **tú apruebas**.
4. **P3 ⇄ P4** — por cada sección: el agente genera el contenido, se autocritica (marca lo dudoso con `⚠️ verificar`) y lo **escribe directo al `.md`** en estilo Tesla; **tú lo lees y ajustas en vivo** en el editor.
5. El apunte queda en `apuntes/[workspace]/[tema]/`, legible en **Markdown Preview Enhanced**.

> **Herramientas:** lectura = Markdown Preview Enhanced · edición WYSIWYG = Markdown Editor (zaaack) · navegación entre archivos = Markdown Memo.

---

## Reglas de la carpeta `apuntes/`

- **Nombrar:** `apuntes/[workspace]/[tema]/`. Workspace = slug corto (`ia`, `cloud`, `css`, `node`, `git`, `js`, `code301`); tema = kebab-case sin el prefijo del workspace.
- **Un folder por apunte.** El `00_indice.md` es la entrada y la superficie de control (alcance + estado + lista de secciones).
- **Una sección = un archivo** (`01_…`, `02_…`), que abre con `#`. La navegación prev/next va al pie de cada sección.
- **Estados** (en el frontmatter del índice): `EN PROGRESO` · `PAUSADO` · `FINALIZADO`.
- **No mezclar temas** — cada apunte es autocontenido.

---

## Estado del proyecto

El sistema se **rediseñó de Notion a Markdown local** (ver `sistema/decisiones/decision_final_md_local.md`). Hecho: estructura del repo, manual de estilo v3.0 md-nativo, prompts P1–P4, mecanismos, y migración de los apuntes existentes. Pendiente: empaquetar el flujo como skill (T10) e integración con NotebookLM (T11).

> **Referencia de estilo:** `sistema/manual_apuntes.md`
> **Decisiones de diseño:** `sistema/decisiones/decision_final_md_local.md`
> **Roadmap histórico:** `contexto/tareas_transicion.md`
