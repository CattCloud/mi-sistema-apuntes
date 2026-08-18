# Migración Ligera de Notion (just-in-time por bloque)

> **Etapa:** Práctica (paso 1 del ciclo por bloque — capa concepto)
> **Metodología:** `sistema/metodologia_practica_guiada.md`
> **Input:** Las tecnologías del bloque que se va a iniciar + el MCP de Notion conectado
> **Output:** Apuntes-referencia `.md` en `apuntes/[workspace]/notion/` + registro en el `00_indice.md` del workspace
> **Trigger:** Se arranca un bloque y sus techs tienen notas en Notion

---

## Qué es este protocolo

Erick ya tiene apuntes en Notion de varias tecnologías. En vez de regenerarlos desde cero, se hace un **traslado ligero**: traer las notas casi tal cual al repo como **material de referencia** (tier referencia), para que sirvan de apunte-concepto en la práctica.

> 🎯 **Traslado ligero, no reescritura.** Las notas migradas NO pasan por P1–P4 (estilo Tesla) salvo que el usuario lo pida. Se conservan como están, reformateadas lo mínimo. (Decisión "traslado ligero"; opción "Híbrido" = reescribir a Tesla solo las notas de los temas que el usuario termine repasando.)

> 🧱 **Anti-perfeccionismo:** se migra **solo el bloque que toca**, justo antes de necesitarlo. El resto de teamspaces se queda en Notion hasta su turno. Nada de "migrar todo Notion" de una.

---

## Mapeo teamspace Notion → repo

| Teamspace Notion | Workspace repo | Carpeta destino |
|------------------|----------------|-----------------|
| 🐤 JavaScript | javascript | `apuntes/javascript/notion/` |
| 🐞 Tailwind | tailwind | `apuntes/tailwind/notion/` |
| 🐦 CSS | css | `apuntes/css/notion/` |
| 🦖 HTML 5 | html | `apuntes/html/notion/` |
| 🐖 SQL | sql | `apuntes/sql/notion/` |
| 🐢 MongoDB | mongodb | `apuntes/mongodb/notion/` |
| 🐙 Git - GitHub | git | `apuntes/git/notion/` |
| 🐸 UX/UI | uxui | `apuntes/uxui/notion/` |
| 🦉 Code 301 - Full Stack | code301 | `apuntes/code301/notion/` |
| 🎮 IA | ia | `apuntes/ia/notion/` |

> Los `00_indice.md` de cada workspace y los apuntes Tesla generados (P1–P4) viven junto a la carpeta `notion/`, no dentro de ella. La subcarpeta `notion/` deja claro el **tier referencia**.

---

## Paso 1: Listar las notas del teamspace del bloque

1. Identificar el `teamspace_id` (con `notion-get-teams`, filtrando por nombre si hace falta).
2. Listar las notas con `notion-search` pasando `teamspace_id` y una query del dominio (ej. *"conceptos apuntes [tech]"*). Subir `page_size` si hay muchas.
3. Presentar al usuario la lista encontrada y confirmar cuáles migrar (por defecto, todas las del bloque).

---

## Paso 2: Traer cada nota

Por cada página a migrar:

1. `notion-fetch` con su `id` → contenido en Markdown.
2. Limpieza mínima (NO reescritura): conservar títulos, código, tablas y el texto tal cual. Quitar artefactos de Notion que no aporten (IDs sueltos, callouts vacíos). Mantener el spanglish original.
3. Escribir a `apuntes/[workspace]/notion/[slug].md` con frontmatter de procedencia:

```markdown
---
origen: notion
tier: referencia
teamspace: [nombre del teamspace]
url: [url de la página en Notion]
migrado: [fecha actual del contexto]
---

# [Título de la nota]

[contenido trasladado, reformateo mínimo]
```

- `[slug]` = kebab-case del título, sin prefijo del workspace.

---

## Paso 3: Registrar en el índice del workspace

Crear o actualizar `apuntes/[workspace]/00_indice.md` listando las notas migradas:

```markdown
---
workspace: [slug]
---

# [Emoji] [Workspace]

> Apuntes de [tecnología]. `notion/` = referencia trasladada de Notion (tier referencia); los apuntes en estilo Tesla (P1–P4), si los hay, van como carpetas de tema.

## Referencia (migrado de Notion)
- [[notion/slug|Título]] — [tema]
- ...

## Apuntes Tesla (generados)
_(ninguno aún / lista)_
```

---

## Paso 4: Marcar candidatos a reescritura (opcional, decisión "Híbrido")

Si el usuario eligió "Híbrido", anotar en `NOTAS.md` qué notas, cuando se repasen, valdría reescribir a estilo Tesla. No hacerlo ahora — es una capa futura, a demanda.

---

## Reglas anti-fricción

- **Solo el bloque que toca**, just-in-time. No migrar teamspaces que aún no se estudian.
- **Conservar, no reescribir.** El traslado es ligero por diseño; la calidad ya está en las notas.
- **Confirmar la lista** antes de volcar, pero sin fricción (por defecto: todas).
- **Tier explícito:** la carpeta `notion/` y el frontmatter `tier: referencia` evitan confundir estas notas con apuntes Tesla.
