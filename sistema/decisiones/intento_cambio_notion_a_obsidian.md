# 🔀 Intento de cambio: Notion → Obsidian (no completado)

> **Estado:** Intento explorado, no completado. Sistema Tesla sigue apuntando a Notion como destino final.
> **Para qué sirve este documento:** Dar contexto a futuras decisiones sobre la herramienta destino de los apuntes (Notion, Obsidian, otra). Evitar repetir la misma exploración sin necesidad.

---

## 1. Origen del intento

El detonante fue una observación durante la generación de la Sección 1 del apunte "Claude Code — Arquitectura Interna":

- El `.md` final estaba creciendo y se sentía largo de revisar.
- Surgió la idea de **partir cada sección en su propio `.md` + un índice** para reducir fricción de lectura y enfoque por sección.
- Al evaluar esa idea, apareció una alternativa más profunda: **cambiar el destino final de Notion a Obsidian**, lo cual resolvería la fricción del `.md` largo (headings plegables nativos) sin tener que partir archivos.

---

## 2. Por qué Notion había sido la elección original

Cuando el sistema Tesla se diseñó, Notion fue la herramienta destino por:

- **Bloques estilizados** que permiten "menú `/`" para insertar (texto, cita, heading, desplegable, callout, etc.).
- **Toggles (desplegables) nativos** que dan jerarquía visual con un solo clic.
- **Colores en headings** (rosa para H2 de workspace IA/LLMs, rojo para H3) asignables desde el menú del bloque.
- **Indentación visual real** de contenido subordinado a un heading (el contenido bajo un H3 se ve indentado respecto al H2 padre, porque Notion lo trata como hijo estructural en su árbol de bloques).
- **Apunte completo en una sola página** con sub-secciones colapsables — modelo mental ya familiar para el usuario.

El usuario tiene una segunda cuenta de Notion (la principal estaba desordenada con archivos viejos).

---

## 3. Por qué se consideró Obsidian como alternativa

Lo que Obsidian ofrecía y se evaluó:

- **Local-first:** los `.md` viven en disco como Markdown puro, alineado con cómo Tesla ya escribe el contenido.
- **Sin paso de "pegar":** el apunte se genera directamente donde se va a estudiar.
- **Headings plegables nativos** sin plugin.
- **Callouts** (`> [!info]`, `> [!tip]`, `> [!warning]`) nativos, con sintaxis Markdown estándar.
- **Diagramas Mermaid** nativos.
- **Tablas Markdown** idénticas a Notion.
- **Links internos `[[ ]]`** más potentes que los de Notion.

Limitaciones conocidas que aceptó el usuario antes de probar:

- No tiene bases de datos relacionales (no son necesarias para apuntes de estudio).
- No tiene compartición pública con un clic (Obsidian Publish es de pago).
- No tiene edición colaborativa en tiempo real.

Lo único que el usuario requería específicamente imitar: **la dinámica `/` para insertar bloques al estilo Notion**.

---

## 4. Lo que se probó (cronológico)

### a. Instalación de Obsidian + tema ObsidiaNotion
El usuario instaló Obsidian y aplicó el tema **ObsidiaNotion** para que la apariencia general se acercara a Notion (tipografía, espaciado, quotes con barra azul). **Resultado: visualmente convincente.**

### b. Plugin Slash Commander para el menú `/`
- Instalado y activado.
- El menú aparecía con configuración por defecto (pocos comandos visibles: Table, Callout, Code, Math, Embed, Attachment, Property).
- **Pendiente:** se planificó agregar comandos personalizados (H2, H3, Quote, Listas, Separador) pero no se completó porque surgió un problema mayor.

### c. Snippet CSS de indentado (`notion-indent.css`)
- Creado en `.agente/obsidian/notion-indent.css` y luego copiado a `.obsidian/snippets/`.
- Intentaba imitar la jerarquía visual de Notion indentando H3, H4, etc. con padding-left progresivo.
- **Resultado: no funcionó como se esperaba.** El snippet movía el heading pero **no el contenido subordinado**. La jerarquía visual quedaba rota — el heading indentado, los párrafos pegados al borde izquierdo.

### d. Investigación del plugin Heading Level Indent
- Se identificó el plugin `obsidian-heading-level-indent` (autor svonjoi) como solución real al problema del snippet CSS.
- Hace lo que CSS solo no puede: indenta heading + contenido subordinado juntos.
- Soporta callouts, blockquotes, tablas, code blocks, embeds — los elementos que el usuario más usa.
- Funciona en modo edición, lectura y export a PDF.
- **No llegó a instalarse ni probarse** — el usuario decidió volver a Notion antes.

---

## 5. Por qué no se completó el cambio

El usuario detectó tres fricciones al evaluar el camino hacia Obsidian:

1. **Markdown estándar no tiene jerarquía estructural en los headings.** En Notion, un H3 dentro de un H2 es literalmente un hijo (anidado en el árbol de bloques). En Markdown, son hermanos con nivel semántico. Esto significa que cualquier "indentación" en Obsidian es decoración visual (CSS o plugin), no estructura real. **Esta diferencia filosófica pesó.**

2. **Costo de configuración inicial alto.** Para llegar al nivel de Notion en Obsidian se requerían: tema (ya instalado), plugin Slash Commander con comandos personalizados (configuración manual), plugin Heading Level Indent (pendiente), snippet CSS para colores de workspace (pendiente), aprendizaje de la sintaxis de callouts. Cada paso individual era pequeño, pero acumulados generaban "más fricción para imitar Notion que para usar Notion directamente".

3. **Reconocimiento honesto del usuario:** *"si quiero que se vea como Notion, uso Notion"*. Aplicar el mismo principio que el manual Tesla recomienda — pragmatismo > perfeccionismo de herramienta. Notion ya funciona para él, aunque tenga sus fricciones propias (carga lenta al iniciar, cuenta vieja desordenada).

**Decisión tomada:** mantener Notion como destino final del sistema Tesla.

---

## 6. Estado actual del sistema (post-decisión)

Nada del sistema Tesla quedó "a medias" por este intento, pero sí quedaron **artefactos en disco** que vale registrar para que la próxima decisión los tenga en cuenta:

### Lo que sigue intacto (alineado con Notion)

- `manual_apuntes.md` — reglas de estilo orientadas a Notion (toggles, colores, callouts estilo Notion).
- Prompt P4 — escribe `.md` en Markdown limpio (sin `{toggle="true"}` ni `<br>`) listo para pegar en Notion y convertir headings a toggles con un clic.
- Sección 1 del apunte de Claude Code — ya escrita en Markdown limpio, lista para pegar en Notion.

### Artefactos del intento que quedaron en disco

- **`.obsidian/snippets/notion-indent.css`** — snippet CSS desactivable. El sandbox no pudo borrarlo (estaba bloqueado por Obsidian). Si el usuario decide quedarse con Notion definitivamente, puede borrarlo manualmente. Si decide volver a explorar Obsidian, ya está ahí.
- **`.obsidian/`** — carpeta de configuración de Obsidian (tema ObsidiaNotion, plugin Slash Commander instalado). No estorba a Notion, solo ocupa espacio.
- **Vault de Obsidian apuntando a `C:\cerebro\mi-sistema-estudio`** — el usuario puede abrir el proyecto en Obsidian igual, aunque el destino final sea Notion. De hecho esto es **útil**: Obsidian sirve bien como editor/lector intermedio mientras se genera el apunte, antes de pegar en Notion al final.

### Aprendizajes que sí se institucionalizaron en el sistema

Durante el intento se descubrieron y formalizaron en el manual:

- **Markdown limpio en el `.md` final** (sin `{toggle="true"}`, sin `<br>`). Esta regla ya quedó documentada en `manual_apuntes.md` y en P4. Aplica independientemente de si el destino es Notion u Obsidian.
- **Listas reducen fricción** (regla 6.6 del manual).
- **Definir términos donde se introducen** (regla 6.7 del manual).

---

## 7. Preguntas abiertas para la próxima decisión

Si se vuelve a evaluar el destino del sistema, conviene tener respuesta a:

- **¿Qué fricción específica de Notion está disparando el nuevo cambio?** (¿La carga lenta al iniciar? ¿La cuenta desordenada? ¿Otra cosa?). Saber esto evita probar herramientas que no resuelven el problema real.
- **¿El destino tiene que ser una sola herramienta, o pueden coexistir?** Por ejemplo: generar/revisar en Obsidian, presentar/estudiar en Notion. Esto cambia los criterios de evaluación.
- **¿Está abierta la posibilidad de mantener Notion pero limpiar la cuenta principal o crear estructura en la cuenta secundaria?** A veces el problema es organizacional, no de herramienta.
- **¿Hay alguna funcionalidad nueva (export, sincronización, IA, etc.) que esté motivando el cambio, más allá de la fricción de lectura?**

---

## 8. Resumen ejecutivo

| Aspecto | Estado |
|---|---|
| Notion como destino final | ✅ Mantenido |
| Obsidian instalado y configurado parcialmente | ✅ En disco, no en uso activo |
| Snippet CSS de indentado | ⚠️ Existe pero desactivado / no funciona bien sin plugin complementario |
| Plugin Heading Level Indent | ❌ No instalado (era el candidato real para resolver indentado en Obsidian) |
| Manual de estilo | ✅ Alineado con Notion + reglas nuevas institucionalizadas |
| Sección 1 del apunte | ✅ Escrita en Markdown limpio, lista para Notion |

**Conclusión:** el intento sirvió para validar con datos —no con suposición— que el costo de migrar a Obsidian no compensa el beneficio para este usuario en este momento. Si una nueva decisión vuelve a mover la herramienta, partir de este contexto evita repetir la misma exploración.
