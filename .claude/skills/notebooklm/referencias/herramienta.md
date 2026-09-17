# Referencia: la interfaz de NotebookLM

> **Solo lo verificado, con fecha y fuente.** La herramienta cambia casi cada mes. Si el usuario ve otra cosa, manda lo que ve (R8): se le pide la captura y esta página se corrige antes de seguir. Lo que no está aquí no se nombra.

## General

| Dato | Verificado | Fuente |
|---|---|---|
| Desde el 16 de julio de 2026 se llama **Gemini Notebook** (`notebook.google.com`). Es el mismo producto y los links viejos redirigen | 2026-09-11 | Blog de Google |
| Pantalla: fuentes a la izquierda, chat al centro, **Studio** (donde se generan los materiales) a la derecha | 2026-09-11 | Ayuda oficial |
| Tipos de fuente: `.md`, PDF, .docx, .pptx, .txt, CSV, ePub, Google Docs/Slides/Sheets, audio, imágenes, webs, YouTube, texto pegado | 2026-09-11 | Web |
| Límite por fuente: 500.000 palabras o 200 MB | 2026-09-11 | Web |
| Plan gratis: 100 notebooks · 50 fuentes por notebook · 50 preguntas de chat al día | 2026-09-11 | Web |
| Renombrar un notebook: clic en el título, editar, Enter | 2026-09-11 | Web |
| Studio y el chat usan solo las fuentes marcadas. Cada diálogo de Studio trae además su propio selector **Fuentes** | 2026-09-15 | Capturas de los diálogos |
| Cada diálogo de Studio muestra una barra **Uso de IA** (lo usado y lo estimado) y dos botones: **Generar más tarde** y **Generar ahora** | 2026-09-15 | Capturas de los diálogos |
| La herramienta avisa que el material generado puede tener errores | 2026-09-11 | Web |

## Presentación

Diálogo **"Personalizar presentación de diapositivas"**. Captura: `img/dialogo_presentacion-diapositivas_2026-09-15.png`.

| Campo | Qué ofrece |
|---|---|
| **Formato** | **Presentación detallada** — *"Una presentación completa con texto y detalles, perfecta para enviarla por correo o leerla por sí sola"* · **Diapositivas del presentador** — *"Diapositivas visuales y claras con puntos clave que te ayudarán mientras hablas"* |
| **Seleccionar idioma** | Desplegable. En la captura: *español* |
| **Duración** | **Corto** · **Predeterminada** |
| **Fuentes** | Selector con el número de fuentes marcadas (*"1 fuente"*) |
| **Describe la presentación que quieres crear** | Caja de texto. Texto de ejemplo: *"Añade un esquema general, o guía a la audiencia, y el estilo y el enfoque: «Crea una presentación para principiantes con un estilo llamativo y divertido. Céntrate en las instrucciones paso a paso»"* |

## Mapa mental

Diálogo **"Mapa mental"**. Captura: `img/dialogo_mapa-mental_2026-09-15.png`.

| Campo | Qué ofrece |
|---|---|
| **Fuentes** | Selector con el número de fuentes marcadas (*"1 fuente"*) |
| **¿Cuál debería ser el tema?** | Caja de texto. Ejemplos que muestra: limitar el mapa a una fuente concreta, centrarlo solo en los conceptos clave de un tema, o hacer un mapa para estudiar las causas de algo |

No tiene formato, duración ni selector de idioma.

### El mapa generado

Captura: `img/mapa-mental-resultado-y-chat_2026-09-15.png` (mapa de TypeScript M1, clase 1).

| Dato | Verificado | Fuente |
|---|---|---|
| El mapa aparece en Studio con un nombre propio (en la captura, *"TypeScript Mapa"*) y un botón **Ver petición y 1 fuente**, que muestra el prompt y las fuentes usadas | 2026-09-15 | Captura |
| Se despliega de izquierda a derecha: nodo central, ramas y hojas. Cada nodo con hijos se pliega y despliega desde su borde | 2026-09-15 | Captura |
| **Máximo 3 niveles** (nodo central, ramas y hojas). Es un límite fijo de la herramienta: ningún prompt lo cambia | 2026-09-15 | Reporte del usuario |
| Respetó el prompt: el nodo central pedido y las 8 temáticas como ramas, en el orden pedido. Los nodos salieron en español | 2026-09-15 | Captura |
| El código dentro de un nodo se ve como texto plano (*"Anotación de forma: : { nombre: string }"*) | 2026-09-15 | Captura |
| **Clic en un nodo → la consulta se ejecuta sola en el chat**, con una plantilla fija en inglés: *"Discuss what these sources say about [nodo], in the larger context of [nodo padre]."* Para el nodo central la consulta no lleva *"in the larger context"* | 2026-09-15 | Captura y reporte del usuario |
| El chat respondió en español, con citas numeradas a la fuente, código en línea y el botón **Guardar en una nota** | 2026-09-15 | Captura |
| La caja del chat muestra cuántas fuentes usa (*"1 fuente"*): responde con las fuentes marcadas | 2026-09-15 | Captura |
| Debajo del mapa: **Contenido adecuado** · **Contenido inadecuado**. A la derecha, botones sin texto de plegar o desplegar, acercar (+), alejar (−) y descargar | 2026-09-15 | Captura |

## Fuera de la v1 (sin plantilla, D31)

Se registran para no inventarlos si el usuario pregunta.

| Material | Qué se sabe | Verificado |
|---|---|---|
| **Video** | Formatos **Corto** (vertical) y **Vídeo explicativo**; estilos (Selección automática, Personalizado, Clásico, Pizarra, Kawaii…); caja **"Personalizar tema"**, que aceptó un prompt de siete párrafos; puede tardar más de 30 minutos | 2026-09-12, captura `img/dialogo_personalizar-resumen-video_2026-09-12.png` |
| **Audio** | Formatos **Información detallada**, **Breve**, **Crítica** y **Debate**; **Duración** Corto o Predeterminada; caja de foco con botones aditivos | 2026-09-12, captura `img/dialogo_personalizar-resumen-audio_2026-09-12.png` |
| **Resto de Studio** | Mind Map, Reports (Study Guide, Briefing Doc, FAQ…), Flashcards, Quiz, Slide Decks, Infographics, Data Tables (nombres de la web en inglés; en la interfaz en español pueden llamarse distinto) | 2026-09-11, web |

## Sin verificar

- Si la presentación muestra los bloques de código de las fuentes como código. El usuario reporta que lo hace bien (2026-09-15), sin captura del resultado.
- Si una presentación usa las imágenes subidas como fuente, o si inserta imágenes propias.
- Cuántas diapositivas produce cada **Duración**.
- Si un nodo del mapa mental sigue la jerarquía de títulos de la fuente o la del prompt cuando no coinciden.
- El largo máximo de las cajas de texto de Presentación y de Mapa mental.
- Si se pueden renombrar los materiales generados, y cuántos por día permite cada plan.
- Cómo procesa la herramienta, por dentro, el texto que se escribe en la caja. Las guías del usuario de septiembre suponen que se inserta dentro de unas instrucciones ocultas de Google que fuerzan el formato del material; eso no se puede ver desde fuera. Las reglas que salen de esa idea (no pedir estilos visuales ni otros formatos) se siguen igual, porque funcionan en la práctica.

## Fuentes consultadas

- [Generate Video Overviews — ayuda oficial](https://support.google.com/notebooklm/answer/16454555?hl=en)
- [NotebookLM is now Gemini Notebook — Google Blog](https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/)
- [Understanding the Sources Panel — University of Guelph](https://guides.lib.uoguelph.ca/c.php?g=748893&p=5430900)
- [NotebookLM Source Limits (2026) — Sourclip](https://www.sourclip.com/blog/notebooklm-source-limits)
- [NotebookLM Limits Explained (2026) — Elephas](https://elephas.app/blog/notebooklm-source-limits)
- [Is NotebookLM Free? Limits & Plans Explained (2026) — Fello AI](https://felloai.com/is-notebooklm-free/)
- Capturas de la interfaz del usuario: `img/`
