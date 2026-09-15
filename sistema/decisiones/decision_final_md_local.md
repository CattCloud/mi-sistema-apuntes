# 📌 Decisión Final — Rediseño del sistema Tesla: de Notion a Markdown local

> **Estado:** ✅ Implementada (ver D2: "Implementación del rediseño COMPLETA"). Documento histórico: las reglas vigentes viven en `AGENTS.md`, `apuntes/AGENTS.md` y `.claude/skills/` (ver `decision_arquitectura_reglas.md`).
> **Regla:** Las reformas de estructura **seguras e independientes** se aplican incrementalmente con visto bueno del usuario (rename del motor, limpieza, agrupados). Lo que SÍ espera a cerrar el doc: el contenido/formato (manual, prompts) y el **interior de los apuntes** (depende de D1).
> **Propósito:** Consolidar en un solo lugar TODOS los cambios decididos en esta ola de rediseño, con su estado y sus puntos abiertos.
> **Relacionado:** `sistema/decisiones/intento_cambio_notion_a_obsidian.md`

---

## 🎯 Principio rector

> **El objetivo es estructurar el apunte para FACILITAR LA LECTURA y LA REDACCIÓN vía VSCode (markdown-nativo).**

Todo lo demás se subordina a esto. Cuando una regla del sistema actual exista solo porque el destino era Notion, se revisa contra este principio: ¿sigue facilitando la lectura/redacción en md, o era andamiaje de Notion?

---

## Por qué este rediseño

Notion se había elegido por dos cosas concretas, no por sus bases de datos ni la colaboración:

1. **La experiencia de redacción** se sentía limpia (vista sin sintaxis markdown, pero permitía insertar elementos con el menú `/`).
2. **La lectura** (jerarquías y elementos que facilitaban el escaneo).

El intento de Obsidian (ver doc relacionado) validó con datos que **pelear contra Markdown para imitar Notion no compensa**. La conclusión no es imitar Notion en otra herramienta, sino **rediseñar el sistema pensando en md desde el principio**, con la lectura y la redacción en VSCode como norte.

---

## Decisiones

### D1 — El destino final es este repo en `.md`, no Notion
**Estado:** ✅ Decidida — diseño del interior cerrado; implementación pendiente

- Los apuntes viven en el proyecto como `.md`, versionados en git, leídos/escritos en VSCode (Markdown Preview + extensiones por definir).
- **Un tema = varios `.md`** (uno por sección), no un único apunte extenso. Razón: archivos pequeños = menos fricción de lectura + enfoque por sección.
- Hace falta un **mapa/índice** que preserve el orden y la conexión entre los `.md` (y que sirva a la IA que opere el sistema más adelante).

**Interior de cada apunte — diseño DECIDIDO:**
- **Granularidad:** 1 archivo = 1 sección **H2** (sus H3 viven dentro). Excepción: agrupar 2 H2 muy cortos y relacionados si separarlos crea archivos triviales.
- **Orden:** **prefijos numéricos** (`01_`, `02_`…) marcan el orden en el filesystem.
- **Mapa / superficie de control:** `00_indice.md` por apunte = cabecera con metadata + estado del apunte (`EN PROGRESO/PAUSADO/FINALIZADO`) + lista ordenada de secciones con su estado (`⬜/🔄/✅`). (Absorbe el viejo `ESTADO.md`.)
- **Navegación prev/next (pedida):** cada archivo de sección lleva al pie links clicables `← anterior · índice · siguiente →` (wiki-links `[[ ]]` de Markdown Memo) **y** `prev`/`next` en frontmatter (para la IA). El mantenimiento de prev/next lo hace la IA, no el usuario.
- **Frontmatter por sección:** `tema`, `workspace`, `seccion: N`, `titulo`, `estado`, `prev`, `next`.
- **Identidad cromática:** ❌ **soltada.** La identidad del workspace la dan la carpeta (`apuntes/[workspace]/`) + el emoji en el índice. Sin colores por heading (era andamiaje de Notion, no se ve en el editor 0.1.9, y recuperarlo sería sobre-configurar).
- **Estructura de carpeta del apunte (plana):** dentro de cada apunte solo viven `00_indice.md` (entrada, sale primero), los archivos de sección numerados (`01_…`, `02_…`) y `_input/` (material fuente, secundario). **Desaparecen** `final/` (las secciones SON el apunte), `borradores/` (esqueleto→índice, P1/alcance→cabecera del índice, P3→secciones, autocrítica interna) y `ESTADO.md` (→ índice). Así el apunte a leer salta a la vista sin excavar. ✅ **Ya aplicada a los 2 apuntes existentes:** `claude-md-arquitectura-contexto` (finalizado → 9 secciones + índice) y `claude-code-arquitectura` (pausado → sección 1 + plan de 8 en el índice; `input/`→`_input/`).

#### Pack de extensiones VSCode (sub-decisión de D1)
**Estado:** ✅ Cerrado (MPE en uso · zaaack probado apto · Memo decidido)

| Necesidad | Extensión | Estado | Razón |
|---|---|---|---|
| **Lectura** (motor de preview) | **Markdown Preview Enhanced** | ✅ En uso | Lectura muy limpia. Único motor de preview. Renderiza Mermaid/diagramas/TOC → no hace falta extensión de Mermaid aparte. |
| **Edición** (editor WYSIWYG) | **Markdown Editor (zaaack)** | ✅ Decidida · ✅ test hecho | WYSIWYG real (Vditor: modos WYSIWYG / instant-render tipo Typora / split; Mermaid y KaTeX nativos). Se abre con clic derecho → "Open with markdown editor" (`Ctrl+Shift+Alt+M`). Complementa a MPE (lectura). **Config aplicada:** `markdown-editor.useVscodeThemeColor: false` → fondo blanco. **Entorno:** el editor es **Antigravity** (compatible con extensiones VSCode), no VSCode. Extensión pinneada en **v0.1.9** → NO soporta `customCss` (se agregó en 0.1.13+) y aquí no se puede actualizar → el leve "celeste" del bloque en foco se **acepta** como limitación cosmética conocida. **Test de reformateo (D3) — HECHO ✅ apto:** preserva todos los constructos Tesla (quote con `>` vacío, listas `-` con indentación, `---`, code fences, bold/itálica) y NO cambia fin-de-línea (mantiene LF). Único reformateo: **re-padea/alinea tablas** (`\|---\|` → `\| --- \|` con celdas alineadas; determinista y estable tras el 1er guardado) + alguna línea en blanco extra. Caveat: las listas creadas en el editor usan `*` (las existentes `-` se respetan) → ver D2 (estandarizar marcador). Plan B: Markdown WYSIWYG Editor (shuheilocale, slash `/` estilo Notion). |
| **Conexión** entre archivos | **Markdown Memo** | ✅ Decidida | Wiki-links `[[ ]]` + backlinks minimalistas. **Foam se descartó:** su grafo es excesivo para apuntes "paso a paso". Memo mantiene los archivos ordenados uno detrás de otro, legibles por el usuario o por una IA siguiendo la ruta de aprendizaje trazada. |

**Reglas del pack:**
- **Un solo motor de preview** (MPE). Las demás extensiones deben ser de edición/navegación, no de preview → para que no choquen con MPE.
- **No** instalar extensión de Mermaid (MPE ya lo hace).
- **Memo = conexión/navegación, NO orden canónico.** El orden secuencial lo dan el `00_indice.md` + prefijos numéricos + frontmatter `prev/next` (D1). Memo complementa, no reemplaza.

### D2 — El estilo se re-deriva pensando en md, no en Notion
**Estado:** ✅ Decidida — inventario md-nativo cerrado; reescritura del manual = implementación

El manual de estilo actual (`manual_apuntes.md`) se construyó tomando Notion como destino. Hay que separar dos cosas que hoy están mezcladas:

- **Andamiaje de Notion (se revisa o reemplaza):** toggles en todo H2/H3, colores de heading por workspace, callouts `:::💡`, el paso de "pegar y convertir a toggle".
- **Legibilidad genuina (sobrevive, es independiente de la herramienta):** quote-gancho tras el heading, sin preámbulo ni conclusión, las listas reducen fricción, definir términos donde se introducen, jerarquía por encabezados, voz didáctica + spanglish, patrón dolor/problema, analogías, mito/realidad.

**Oportunidad:** el sistema de redacción del usuario "evolucionó pero aún no está claro". Este es el momento de **formalizar un sistema de redacción md-nativo claro**, no de portar el de Notion.

**Inventario md-nativo — DECIDIDO** (traducción desde Notion):
- **Se suelta:** toggles (la densidad la dan el split + plegado de MPE), colores por workspace (D1), columnas (`column_list`).
- **Sobrevive nativo:** quote-gancho (`> **…**` tras cada heading), tablas, ASCII (```` ```text ````), Mito/Realidad (❌/✅), y toda la voz/tono/spanglish/muletillas/arquetipos/dolor/analogías.
- **Mejora:** Mermaid nativo (```` ```mermaid ````, MPE lo renderiza) → se elimina el paso de render-SVG-a-mano.
- **Código:** fenced ```` ```lang ```` con label **Sintaxis**/**Ejemplo** (ya no envuelto en callout).
- **Callouts → blockquote con emoji + label:** `> 💡 **Tip:** …`, `> ⚠️ **Importante:** …`. Robusto (renderiza en MPE / preview nativo / GitHub Pages / editor) y ecoa el estilo Tesla. (Descartado `> [!TIP]` de GitHub alerts por soporte no confirmado en MPE.)
- **Headings:** cada archivo de sección empieza con `#` (un H1 por archivo) y usa `##`/`###` para subsecciones. Mapeo Notion→md: H2→`#`, H3→`##`. El quote-gancho va tras cada heading que abre sección/subsección.
- **Listas:** marcador `-` canónico (la IA escribe `-`; si el editor mete `*` en listas nuevas, se normaliza en la siguiente pasada).
- **Tablas:** forma **padeada/alineada** del editor = canónica; la IA las escribe ya padeadas para minimizar churn (la 1ª normalización del editor es tolerable y estable).

**Implementación:** ✅ `sistema/manual_apuntes.md` reescrito a **v3.0 md-nativa** (respaldo del v2-Notion en `_manual_apuntes_v2_notion.md`). ✅ Prompts **P1–P4** ajustados (rutas `apuntes/[ws]/[tema]`, salida = secciones + `00_indice.md`, callouts blockquote, Mermaid nativo, código fenced, co-edición D3, estados). ✅ `mecanismo_pausa_retomar.md` reescrito (modelo de estados). ✅ README y `CLAUDE.md` reconciliados a md-local. **→ Implementación del rediseño COMPLETA.**

### D3 — La propuesta se redacta directo al `.md` (edición humana en vivo), no vive en el chat
**Estado:** 🔄 En discusión

Cambio de fondo en la dinámica P3–P4. **Hoy:** el agente mantiene la sección viva en el chat y solo escribe al `.md` lo ya aprobado (todo el ida y vuelta de ajustes es por chat). **Se propone:** el agente **escribe la propuesta directamente al `.md`** y el usuario **corrige en vivo** en VSCode, en vez de pedir cada ajuste por chat.

**Por qué (fricciones observadas en el uso real):**
- Pedir por chat un cambio pequeño y esperar a que la IA lo rehaga cuesta tiempo; a veces no lo hace bien.
- Re-redactar toda la sección en el chat por un ajuste menor es engorroso.

**División del trabajo:**
- **IA = contenido** (genera + sintetiza). El usuario casi no toca contenido.
- **Usuario = legibilidad/formato**, en vivo sobre el `.md` (listas, citas, jerarquía).
- **Bucle de estandarización:** si un ajuste de legibilidad se repite y se ve patrón → se anota como posible adición/regla del sistema. Alimenta D2 (el estilo md-nativo) y va convergiendo: cuanto más se estandariza, menos corrige el usuario a mano. Es, además, un mecanismo de descubrimiento para D2 (el sistema de lectura cero-fricción aún no está establecido del todo).

**Estados de progreso** (ahora que vive en md, no en chat). Dos niveles:
- **Apunte:** `EN PROGRESO` (activamente en desarrollo) · `PAUSADO` (pospuesto a propósito, retomable) · `FINALIZADO`. ✅ **Decidido añadir `PAUSADO`** como estado explícito, distinto de `EN PROGRESO` ("en progreso" implica trabajo activo, no algo pospuesto; el mecanismo de pausa necesita una señal propia).
- **Sección:** `⬜ pendiente` · `🔄 en progreso` · `✅ finalizada`. El estado del apunte se deriva (todas ✅ → `FINALIZADO`).
- Ubicación: cabecera/frontmatter del `00_indice.md` (estado del apunte) + estado por sección en el índice (definición fina en D1).

**Por pulir / riesgos:**
- ⚠️ **Protocolo de co-edición (lo más delicado):** si el usuario edita el `.md` en vivo, la IA debe **releer el archivo antes de volver a tocarlo** y tratar el `.md` como única fuente de verdad — nunca trabajar desde su memoria del borrador en el chat, o pisaría las ediciones del usuario.
- Dónde viven exactamente los estados (frontmatter vs índice vs ambos).
- Cómo se marca "aprobado/finalizado" ahora que ya no hay un gate de aprobación en el chat.
- ✅ **Mecanismo *Pausa y Retomar* reconciliado:** se elimina el folder-checkpoint aparte. **Pausar** = marcar el apunte `PAUSADO` en el `00_indice.md` (que ya carga el progreso por sección + pendientes/`⚠️ verificar`). **Retomar** = volver a `EN PROGRESO` y seguir desde la primera sección `⬜`. El `00_indice.md` absorbe el rol del viejo `ESTADO.md` (una sola superficie de control). Pendiente de implementación: reescribir `sistema/mecanismos/mecanismo_pausa_retomar.md` (describe el modelo viejo de checkpoint). (Lo detonó el folder duplicado del tema *Claude Code*, un checkpoint de pausa ya obsoleto → eliminado.)

### D4 — Limpiar y estandarizar la estructura del repositorio
**Estado:** 🔄 Estructura ✅ ejecutada · narrativa (README/CLAUDE) pendiente para la pasada final

Ahora que los apuntes viven en el repo, la estructura debe quedar limpia: **cada carpeta con un objetivo, calidad sobre cantidad** (no proliferar carpetas).

**Problemas detectados (análisis del estado actual):**
- **A. Apuntes duplicados / fuera de sitio:** `CLAUDE.md — Arquitectura de Contexto/` (raíz) es un apunte completado fuera de `temas/`; `Claude Code — Arquitectura Interna/` (raíz) es un `ESTADO.md` viejo superado por `temas/ia_claude-code-arquitectura/`. Doble fuente de verdad con el `CLAUDE.md` del proyecto (dice "pausado pre-P2" pero `temas/` está más avanzado) → reconciliar.
- **B. Restos del intento Obsidian:** `.obsidian/` (raíz) y `.agente/obsidian/notion-indent.css` — sin uso (md-local + Antigravity).
- **C. Basura de sesión / huérfanos:** capturas `image*.png` en raíz; `transcripcion.md.md` (huérfano, doble extensión, ~81 KB); `_pruebas_reformateo/` (vacía).
- **D. Colisión de nombres:** `.agent/` (skills genéricas) vs `.agente/` (motor Tesla). ⚠️ **Por confirmar con el usuario:** si `.agent/` lo usa Antigravity o es resto.
- **E. Vacío:** `.agente/skill_generar_apunte/` (T10 nunca construida).
- **F. Nomenclatura:** estandarizar todos los temas a `[workspace]_[tema]` dentro de `temas/`.

**Estructura objetivo (mínima):**
- Raíz: `CLAUDE.md`, `README.md`, `NOTAS.md`. Perfiles del usuario en `sistema/perfil/` (`yo.md`, `yo_profesional.md`).
- **`sistema/`** = EL MOTOR. ✅ **Decidido: renombrar `.agente/` → `sistema/`** (visible, en español, por propósito; "agente" era semánticamente impreciso —es el método que el agente sigue, no un agente— y `.agente` colisionaba con `.agent/`). Contiene: manual, análisis, historial, `prompts/`, `mecanismos/` ← agrupar los 2 `mecanismo_*.md` sueltos, `decisiones/`. **Ejecución:** ✅ hecho esta sesión (rename + refs funcionales actualizadas en CLAUDE.md, README, roadmap, p4; refs históricas conservadas en los docs de decisiones).
- `apuntes/` = LOS APUNTES, agrupados por **workspace** → `apuntes/[workspace]/[tema]/` (ej. `apuntes/ia/claude-code-arquitectura/`; el apunte suelta el prefijo `ia_`). Cada workspace lleva un **índice propio** `00_indice.md` (lista de apuntes + estado). El interior de cada apunte (secciones + índice) lo define D1.
- `contexto/` = DOCS del proyecto (`*.md` + `assets/` para imágenes y `.excalidraw`).

**Ejecución (estado real):**
- ✅ **Limpieza segura:** borradas capturas de sesión, `_pruebas_reformateo/`, restos de Obsidian (`.obsidian/` + `notion-indent.css`).
- ✅ **Estructura (esta sesión):** rename `.agente/` → `sistema/`; mecanismos agrupados en `sistema/mecanismos/`; imágenes/excalidraw a `contexto/assets/`.
- ✅ **Apuntes consolidados en `apuntes/`:** *Claude Code* → canónica en `apuntes/ia/claude-code-arquitectura/` (duplicado de raíz eliminado). Apunte completado en `apuntes/ia/claude-md-arquitectura-contexto/`. `contexto/notas.txt` consolidado en `NOTAS.md`. Ya no quedan apuntes ni huérfanos en la raíz.
- ✅ **Resuelto:** `.agent/` eliminado (no era necesario) y `sistema/skill_generar_apunte/` (vacía) eliminado.
- ✅ **Estructura de `apuntes/`:** `temas/` → `apuntes/` con nivel de **workspace** (`apuntes/ia/…`) e **índice por workspace** (`apuntes/ia/00_indice.md` creado).
- ✅ **Hecho:** árbol del README reescrito; prompts P1–P4 con el patrón `apuntes/[workspace]/[tema]/`; narrativa de `CLAUDE.md` reconciliada (Notion→md, ESTADO→índice, sin colores). El interior de cada apunte ya migrado.

**Por pulir:**
- Confirmar propiedad de `.agent/` (¿tooling de Antigravity o resto?).
- ✅ Resuelto: `temas/` → `apuntes/` con workspace e índice por workspace (ver arriba).
- Perfiles `yo*.md`: ¿quedan en raíz o se agrupan?
- `skill_generar_apunte/` vacía: ¿borrar o dejar como placeholder consciente de T10?

### D5 — (pendiente)
_El usuario seguirá compartiendo decisiones; se agregan aquí a medida que se pulen._

---

## Preguntas abiertas transversales

- ¿El sistema apunta a una sola herramienta (VSCode/md) o pueden coexistir (p. ej., estudiar en otra)? → por ahora: una sola, md local.
- ¿Qué pasa con los apuntes ya hechos pensados para Notion (*CLAUDE.md — Arquitectura de Contexto*, Sección 1 de *Claude Code*)? ¿Se migran al nuevo formato o se dejan como están?

---

## Impacto cuando se implemente (NO tocar aún)

| Artefacto | Cambio esperado |
|---|---|
| `manual_apuntes.md` | Reescribir reglas Notion-only; formalizar estilo md-nativo |
| `p4_sintesis_estilo_propio.md` | Escribir 1 archivo por sección + actualizar índice; formato md (alerts, no toggles) |
| `p3_prompts_ias_externas.md` | Ajustar formato de salida si cambia el set de elementos |
| `apuntes/[workspace]/[tema]/` | Workspace + índice de workspace; interior: índice + archivos por sección + frontmatter (D1) |
| `README.md` / `CLAUDE.md` / roadmap | Actualizar destino y flujo |

---

## Checklist de cierre (cuándo esto está listo para implementar)

- [ ] Todas las decisiones de esta ola capturadas
- [ ] Cada decisión con estado ✅ y puntos abiertos resueltos
- [ ] Inventario de elementos md-nativos definido (D2)
- [ ] Estructura de carpetas + mapa decididos (D1)
- [ ] Lista de archivos a modificar confirmada
