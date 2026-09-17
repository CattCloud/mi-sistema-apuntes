# 🎬 Plan: NotebookLM como herramienta independiente

> **Qué es:** el plan para sacar NotebookLM del ciclo de repaso y convertirlo en una pieza propia del sistema: apuntes exportados en un formato que la herramienta aproveche, una skill que le enseñe al agente cómo funciona (sin inventar campos) y cómo escribir prompts pedagógicos, y un menú flexible de videos.
> **Inicio:** 11 de septiembre, 2026 · **Estado:** 🔄 Giro a mapa mental y presentación (D31–D36). Export listo y probado en los 10 módulos (D28–D30). Skill v1 construida (F2); falta su primer uso real y desacoplar el repaso (F4).
> **Cómo leerlo:** de arriba abajo. La **sección 5** muestra lo que falte responder. La **sección 6** guarda todas tus respuestas, con mis notas donde había dudas.

---

## 1. De dónde venimos

- **19–20 de junio, 2026:** NotebookLM entró al sistema como **Paso 3 del ciclo de repaso** (consolidación multimodal *después* del recall). Resultado: `sistema/prompts/repaso_consolidacion_notebooklm.md`. Decisiones de entonces que siguen vigentes:
  - video **y** audio, en modo manual;
  - la IA redacta los prompts, con personalidad (emoción al servicio del contenido, nunca decoración);
  - el material cubre el apunte completo, no solo lo débil;
  - puede haber varios tipos de material por apunte (incluido uno corto);
  - cada prompt es independiente: el generador de video no ve el del audio.
- **Migración de equipo:** las respuestas del agente de esas sesiones se perdieron. Se rescataron tus prompts desde `D:\migracion_tesla`. Nunca existió documentación de los campos de la herramienta: solo el protocolo.
- **11 de septiembre, 2026:** se decide **independizar** NotebookLM del flujo de estudio. El caso que lo disparó: volver a un curso tras días y preferir un video de lo ya estudiado antes que releer los apuntes.

---

## 2. Decisiones tomadas


| #   | Decisión                                                                                                                                              | Sale de       | Fecha      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | ---------- |
| D1  | NotebookLM es una herramienta**independiente** del flujo de estudio, no atada al Paso 3 del repaso                                                     | conversación | 2026-09-11 |
| D2  | ~~**Video primero**, audio secundario~~ → reemplazada por D31                                                                                                                    | conversación | 2026-09-11 |
| D3  | ~~Videos**adaptables, sin regla dura**: cortos para poco tiempo o poco ánimo, largos para estudio completo~~ → reemplazada por D32                                              | conversación | 2026-09-11 |
| D4  | Se crea una**skill de documentación** de NotebookLM. Ninguna publicada cubre interfaz + prompts pedagógicos + fuentes                                | conversación | 2026-09-11 |
| D5  | Los apuntes se**exportan** a un formato apto para NotebookLM **sin tocar el original**                                                                 | conversación | 2026-09-11 |
| D6  | El export vive en una**carpeta aparte** y no se mezcla con los apuntes de estudio                                                                      | conversación | 2026-09-11 |
| D7  | La**subida es manual**: tú cargas los archivos y pegas los prompts                                                                                    | conversación | 2026-09-11 |
| D8  | **Obsidian queda fuera del sistema.** Los `.md` se ven con Markdown Preview de VS Code                                                                 | P1            | 2026-09-11 |
| D9  | El export vive en**`notebooklm/`** en la raíz del repo, **ignorado por git**                                                                          | P1            | 2026-09-11 |
| D10 | **Un notebook por módulo**                                                                                                                            | P2            | 2026-09-11 |
| D11 | **Una fuente por clase**                                                                                                                               | P3            | 2026-09-11 |
| D12 | Se diseña para el**plan gratis** (el de pago vence en noviembre de 2026): 100 notebooks y 50 fuentes por notebook                                     | P4            | 2026-09-11 |
| D13 | **Solo clases teóricas.** Fuera: cierres, índices, guías de práctica y `_input/`                                                                   | P5, P6        | 2026-09-11 |
| D14 | **El agente conoce el sistema; el sistema no viaja en las fuentes.** El agente lee índices, `reforzar:` y datos sin verificar para redactar el prompt | P6, P7        | 2026-09-11 |
| D15 | Las**imágenes pedagógicas** se suben como fuente aparte                                                                                              | P8            | 2026-09-11 |
| D16 | El export lo genera**un script** que el agente ejecuta, guardado dentro de la skill                                                                    | P9            | 2026-09-11 |
| D17 | El export**avisa qué archivos cambiaron** desde la última exportación                                                                               | P10           | 2026-09-11 |
| D18 | ~~Plantillas de prompt en la v1:**solo video y audio**~~ → reemplazada por D31                                                                                                   | P11           | 2026-09-11 |
| D19 | ~~El tono de junio aplica**también al video** (narrado, con energía, humor contenido). A prueba~~ → sin uso tras D31                                                        | P12           | 2026-09-11 |
| D20 | Videos**siempre en español**                                                                                                                          | P13           | 2026-09-11 |
| D21 | Peso de la skill:**fuentes > prompts > interfaz**, sin restarle importancia al prompt                                                                  | P14           | 2026-09-11 |
| D22 | **No se registra qué videos existen:** el propio notebook es el registro                                                                              | P16           | 2026-09-11 |
| D23 | **No se guarda el link del notebook:** se encuentra por su nombre estandarizado                                                                        | P18           | 2026-09-11 |
| D24 | **Imagen pedagógica** = la que muestra un concepto o una estructura. Fuera: capturas de dónde hacer clic o del estado de tu cuenta. El agente propone la lista por módulo y tú apruebas | P19 | 2026-09-11 |
| D25 | **Nombre del notebook:** `Ruta-MX-Tema`, con guiones, donde X es el número del módulo (B3 de Cloud → `Cloud-M3-Identidad`). `MX` es también el prefijo de sus archivos | P20 | 2026-09-11 |
| D26 | ~~Para recomendar un video, el agente usa **cuatro datos**: tiempo, ánimo, qué clases y para qué. No hace falta darlos todos~~ → reemplazada por D32 (el menú es el Paso 2 de la skill) | P15 | 2026-09-11 |
| D27 | ~~**Dos usos de NotebookLM:** después de un repaso, el Paso 3 delega en la skill y el video se enfoca en lo que fallaste; fuera del repaso (volver tras días), el video recorre las clases completas, sin práctica previa~~ → reemplazada por D35 | P17 | 2026-09-11 |
| D28 | Las marcas **⚠️ verificar se quitan enteras** (bloque, párrafo o marca en línea) y el export **no las reporta**: la fuente llega limpia, sin avisos. Reemplaza la parte de D14 sobre los datos sin verificar | conversación | 2026-09-15 |
| D29 | **Cada clase exportada es autocontenida:** sin referencias a otras clases, módulos, índice, cierre ni guías. Reglas genéricas + reemplazos por módulo en `limpieza/`; si queda una referencia, el export no escribe nada | conversación | 2026-09-15 |
| D30 | **Las imágenes suben como fuente**, junto a su clase. Cada una se revisa y se registra como `subir` o `excluir` (R9: nada con datos de la cuenta) en `limpieza/<ruta>/<modulo>.json`; sin registro, el export no escribe. Reemplaza D24 | conversación | 2026-09-15 |
| D31 | **Materiales de la v1: mapa mental y presentación.** Video y audio salen: el resultado no convenció y abarcaban más de lo necesario. Reemplaza D2, D18 y D19 | PROMPT.md | 2026-09-15 |
| D32 | **Un material por clase**, dentro del notebook del módulo (D10 sigue). La clase se elige **marcando su fuente en el selector del diálogo**; el prompt nunca nombra clases ni fuentes. Reemplaza D3 y D26 | PROMPT.md | 2026-09-15 |
| D33 | **Cobertura pareja:** todas las temáticas de la clase valen lo mismo y ninguna se omite; lo más difícil puede recibir más explicación | PROMPT.md | 2026-09-15 |
| D34 | **Calidad pedagógica sobre estética:** código literal de las fuentes cuando se explica un ejemplo, tablas y diagramas cuando ordenan; nada de imágenes o gráficos de relleno | PROMPT.md y guía de presentaciones | 2026-09-15 |
| D35 | **NotebookLM no se integra al repaso:** el material recorre siempre la clase completa y no usa `reforzar:`. Reemplaza D27 | PROMPT.md | 2026-09-15 |
| D36 | **Presentación por defecto: *Presentación detallada* + *Predeterminada*.** La interfaz la describe "para leerla por sí sola", que es el uso de estudio; *Diapositivas del presentador* ("mientras hablas") queda para exponer la clase. Contradice la recomendación de la guía de presentaciones. A prueba | propuesta del agente | 2026-09-15 |
| D37 | **El mapa mental es un índice que pregunta:** cada nodo, al hacer clic, lanza al chat *"Discuss what these sources say about [nodo], in the larger context of [padre]"*. Sus títulos se piden como frases que dicen de qué tratan, con el término exacto; la explicación y el código llegan en el chat. Mapa en cascada para ramas densas | PROMPT.md + captura del mapa | 2026-09-15 |
| D38 | **Ramas del mapa mental = temáticas; hojas = preguntas.** Cada pregunta se entiende sola (lenguaje claro, sin fragmentos de código), es específica y cabe en una línea, pide un porqué, una diferencia, una consecuencia o un cuándo, y se responde con la clase. El mapa ya no muestra el contenido: la explicación llega en el chat al hacer clic, y ahí se profundiza | conversación | 2026-09-15 |
| D39 | **Sin número fijo de hojas por rama, y ninguna se repite.** Una hoja por cada idea distinta; pedir una cantidad fija fuerza a NotebookLM a rellenar con preguntas que repiten lo mismo. Las ramas nacen de los `##` de la clase (ya lo decía D33), sin fusionarse ni dividirse | conversación | 2026-09-16 |

---

## 3. Lo que sabemos de la herramienta (web el 2026-09-11; interfaz real el 2026-09-12)

> **Histórico desde el 2026-09-15.** La referencia vigente, con los diálogos de Mapa mental y Presentación, es `.claude/skills/notebooklm/referencias/herramienta.md`. Esta tabla ya no se actualiza.


| Tema                      | Dato                                                                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Nombre**                | Desde el 16 de julio de 2026 se llama**Gemini Notebook** (`notebook.google.com`). Es el mismo producto; los links viejos redirigen                     |
| **Pantalla**              | Fuentes a la izquierda, chat al centro,**Studio** (donde se generan los materiales) a la derecha                                                       |
| **Tipos de fuente**       | `.md`, PDF, .docx, .pptx, .txt, CSV, ePub, Google Docs/Slides/Sheets, audio, imágenes, webs, YouTube, texto pegado                                    |
| **Límite por fuente**    | 500.000 palabras o 200 MB                                                                                                                              |
| **Plan gratis**           | 100 notebooks · 50 fuentes por notebook · 50 preguntas de chat al día                                                                               |
| **Selección de fuentes** | Studio y el chat usan**solo las fuentes marcadas** en su checkbox                                                                                      |
| **Renombrar un notebook** | Clic en el título, editar, Enter                                                                                                                      |
| **Video — formatos** | En la interfaz en español: **Corto** (vertical, para móvil) y **Vídeo explicativo** (completo). Cinematic no aparece en esta cuenta |
| **Video — fuentes** | El propio diálogo trae un selector ("5 fuentes"): eliges ahí qué fuentes entran en ese video |
| **Video — cuota** | El diálogo muestra una barra **"Uso de IA"** con lo ya usado y lo estimado de esa generación |
| **Video — cola** | Además de **Generar ahora**, hay **Generar más tarde** |
| **Video — estilos** | Selección automática, Personalizado (lo describes tú), Clásico, Pizarra, Kawaii y más en el carrusel |
| **Video — foco** | La caja libre **"Personalizar tema"** es un textarea y aceptó completo un prompt de siete párrafos (probado el 2026-09-12). Encima hay botones de tema sugerido que la herramienta genera desde tus fuentes (salieron "Funcionamiento interno", "Mitos comunes" y "Momento ejecución"): son opcionales y no hace falta tocarlos. En español no se llama "Steering prompt" |
| **Video — espera**       | Puede tardar**más de 30 minutos** en generarse                                                                                                        |
| **Audio — formatos** | En la interfaz en español: **Información detallada** (por defecto), **Breve**, **Crítica** y **Debate** |
| **Audio — duración** | Control aparte con dos opciones: **Corto** y **Predeterminada**. No se pide por texto: pedir minutos en el prompt es inútil |
| **Audio — foco** | Textarea: "¿En qué deben centrarse los presentadores de IA en este episodio?", con un ejemplo de relleno generado desde tus fuentes. Debajo, botones **aditivos** (+ Enfoque Práctico, + Guía Estudiante, + Flujo Trabajo) |
| **Audio — fuentes** | El mismo selector de fuentes que el video, dentro del diálogo |
| **Resto de Studio**       | Mind Map, Reports (Study Guide, Briefing Doc, FAQ…), Flashcards, Quiz, Slide Decks, Infografías, Data Tables                                         |
| **Advertencia**           | La propia herramienta avisa que el material puede tener errores                                                                                        |

Capturas de los diálogos reales, en `.claude/skills/notebooklm/referencias/img/`: `dialogo_personalizar-resumen-video_2026-09-12.png` y `dialogo_personalizar-resumen-audio_2026-09-12.png`.

**Sin verificar todavía:** si se pueden renombrar los videos generados · cuántos videos por día permite cada plan · cómo narra los bloques de código. (El límite del campo de texto quedó descartado el 2026-09-12: es un textarea y no cortó el prompt.)

Fuentes consultadas:

- [Generate Video Overviews — ayuda oficial](https://support.google.com/notebooklm/answer/16454555?hl=en)
- [NotebookLM is now Gemini Notebook — Google Blog](https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/)
- [Understanding the Sources Panel — University of Guelph](https://guides.lib.uoguelph.ca/c.php?g=748893&p=5430900)
- [NotebookLM Source Limits (2026) — Sourclip](https://www.sourclip.com/blog/notebooklm-source-limits)
- [NotebookLM Limits Explained (2026) — Elephas](https://elephas.app/blog/notebooklm-source-limits)
- [Is NotebookLM Free? Limits & Plans Explained (2026) — Fello AI](https://felloai.com/is-notebooklm-free/)
- [NotebookLM: A Guide With Practical Examples — DataCamp](https://www.datacamp.com/tutorial/notebooklm)
- [NotebookLM Audio Overview Formats — BibiGPT](https://bibigpt.co/en/features/notebooklm-audio-overview-formats-explained)

---

## 4. Fases

```text
F0 Investigación ✅
        │
        ▼
F1 Export de apuntes ──► F2 Skill notebooklm ──► F3 Menú de videos
                                  │
                                  ▼
                         F4 Desacoplar del repaso
```

### F0 — Investigación ✅

- [X]  Rescatar la conversación de junio desde el paquete de migración
- [X]  Verificar los campos actuales de la herramienta
- [X]  Buscar skills existentes. Revisadas: PleasePrompto, claude-world, BayramAnnakov y las tres de junio. Todas automatizan (navegador, CLI, MCP); ninguna documenta ni enseña a escribir prompts
- [X]  Relevar la sintaxis real de los apuntes (base de F1)

### F1 — Export de apuntes para NotebookLM 🔄 script listo; falta el primer uso real

**Objetivo:** convertir los apuntes a archivos que NotebookLM lea sin ruido, en una carpeta aparte, listos para subir a mano.

**Regla:** el original nunca se toca. El export es **derivado**: se regenera desde los apuntes y nunca se edita a mano.

**Por qué hace falta:** NotebookLM trata *todo* el archivo como contenido. Lo que no se limpia puede terminar narrado en el video.

**Dónde vive (D9):** `notebooklm/` en la raíz del repo, ignorado por git. VS Code tampoco lo muestra en su búsqueda, porque respeta `.gitignore`.

**Estructura:** una carpeta por módulo, que equivale a un notebook (D10).

```text
notebooklm/                                      ← ignorado por git; se regenera
└── cloud/
    └── b3-identidad/                            ← notebook Cloud-M3-Identidad
        ├── M3-01_usuarios-y-grupos.md           ← una fuente por clase (D11)
        ├── M3-02_politicas.md
        ├── M3-02_img_<nombre sin número>.png    ← solo imágenes pedagógicas (D24)
        ├── …
        └── _manifest.json                       ← huellas para saber qué cambió; no se sube
```

**Qué entra (D13):**

- Solo **clases**: archivos numerados del `01_` al `98_`.
- Solo clases con **`estado: finalizada`** en su frontmatter. Hoy son 39 de 43. Las que están en progreso se omiten y el export avisa, para no subir contenido a medio escribir.
- **Fuera:** `00_indice.md`, `99_cierre.md`, guías de práctica (hoy `cloud/b3-identidad/guia_cli-instalacion-configuracion.md`), todo `_input/`, y las imágenes que no sean pedagógicas.

**Imágenes (D30, reemplaza D24):** todas suben como fuente aparte, salvo las que muestran datos de la cuenta (ID, ARN, alias, usuario IAM, correo, estado de MFA). El agente abre cada imagen antes del primer export del módulo y la registra como `subir` o `excluir — motivo` en `.claude/skills/notebooklm/limpieza/<ruta>/<modulo>.json`, que viaja con git. Una imagen excluida sale del texto junto con su leyenda; si la leyenda enseña algo, se reescribe como frase normal con un reemplazo. Revisión del 2026-09-15: de 23 imágenes, 7 excluidas (6 de B3, 1 de B2).

> ⚠️ **Dos clases en progreso dentro de módulos finalizados.** `cloud/b3-identidad/06_proteger-la-cuenta.md` y `arquitectura/m1-que-es-arquitectura/04_trade-off-como-unidad.md` dicen `estado: en progreso`, pero su índice dice `FINALIZADO`. Si ya están terminadas, basta cambiar ese campo a `finalizada` para que entren al export.

**Transformaciones** (medidas el 2026-09-11 sobre las clases reales):


| En la clase                                                             | En el export                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontmatter** (`tema`, `seccion`, `titulo`, `estado`, `prev`, `next`) | Se quita. En su lugar va una línea de contexto:*Ruta Cloud · Módulo 3: Identidad · Clase 2: Políticas — qué puedes hacer*                                                                                                                                                            |
| **Wikilinks** (116, todos con texto visible)                            | Queda solo el texto visible:`[[01_usuarios-y-grupos|Usuarios y grupos]]` → *Usuarios y grupos*                                                                                                                                                                                   |
| **Imágenes** `![descripción](img/…)` (30, todas en Cloud)            | Si sube (D30): `[Imagen: descripción — fuente MX-NN_img_nombre.png]` y la imagen se copia como fuente aparte. Si se excluye: desaparece del texto con su leyenda                                                                                                                               |
| **`*(⚠️ verificar …)*`**                                             | Se quita todo (D28): un bloque `> ⚠️ *verificar:*` o `> ⚠️ **Para verificar:**` sale entero; una marca en línea sale y la frase queda. Sin aviso. Formatos medidos el 2026-09-15: 24 marcas en 10 clases |
| **Pie de navegación** (`---` y `← anterior · índice · siguiente →` al final de cada clase) | Se quita entero: es navegación del sistema, no contenido (D14) |
| **Referencias a otras clases o módulos** ("sección 3", "la sección anterior", "(→ **B6 · Datos**)", "es el M5", `00_indice.md`, wikilinks del cuerpo) — unas 105 en 39 clases | Los paréntesis-puntero se quitan solos. El resto se reescribe con reemplazos exactos por clase en `limpieza/`, para que la frase se sostenga sin la otra clase (D29). Si el export detecta una referencia sin resolver, no escribe |
| **Columnas "Dónde se estudia / se trabaja / se ve"** en tablas | Se quita la columna entera (D29) |
| **Datos de la cuenta en el texto** (nombre de usuario IAM) | Se reemplazan por un nombre genérico con un reemplazo (R9) |
| **Bloques de código y tablas**                                         | Se conservan tal cual                                                                                                                                                                                                                                                             |

**Nombres de archivo (D25):** `MX-` + nombre original de la clase, donde X es el número del módulo: `M3-02_politicas.md`. Las imágenes llevan el número de la clase que las usa: `M3-02_img_editor-json.png`. El número sale del campo `modulo:` del índice (en Cloud dice `B3` y el export toma solo el `3`); el índice se lee, pero no se exporta. Los dos apuntes de IA no tienen `modulo:` porque son apuntes sueltos: sus archivos van sin prefijo.

**Nombre del notebook (D25):** `Ruta-MX-Tema`, con guiones: `Cloud-M3-Identidad`. El export te lo dice al terminar, para que crees o encuentres el notebook con ese nombre exacto.

**Qué te dice el export al terminar (D17):**

- qué archivos son **nuevos** y hay que subir;
- cuáles **cambiaron** desde la última exportación: en NotebookLM hay que quitar esa fuente y volver a subirla, porque un archivo subido es una copia fija;
- qué clases **se omitieron** y por qué;
- si **no puede exportar**: qué referencias quedan sin limpiar, qué imágenes falta revisar y qué reemplazos ya no encuentran su texto. En ese caso no escribe nada (D29, D30).

Para detectar cambios, el export guarda en `_manifest.json` una **huella del contenido** de cada archivo. Si el apunte no cambió, la huella es la misma aunque cambie la fecha del archivo, por ejemplo al clonar el repo en otro equipo.

**Cómo se ejecuta (D16):** un script de Node (ya instalado, v22) dentro de la skill: `.claude/skills/notebooklm/scripts/exportar.mjs`. El agente lo corre por módulo; tú no ejecutas nada.

**Capacidad en el plan gratis (D12):** el módulo más grande hoy es B3, con 6 clases + hasta 15 imágenes = 21 fuentes, de un tope de 50. Las tres rutas completas suman unos 30 módulos, o sea unos 30 notebooks de un tope de 100.

**Entregables:** el script · la entrada `notebooklm/` en `.gitignore` · el primer módulo exportado.
**Primer uso real:** el primer módulo que decidas repasar. Recién ahí el agente te propone sus imágenes, hace la exportación en `notebooklm/` y te dice qué subir. No se exporta nada por adelantado.
**Criterio de completado:** ese primer módulo exportado, subido a su notebook, y un video generado sin ruido de metadata.

### F2 — Skill `notebooklm` 🔄 v1 construida el 2026-09-15; falta el primer uso real

**Objetivo:** que cualquier agente sepa usar NotebookLM sin inventar campos, prepare bien las fuentes y redacte prompts pedagógicos.

**Estructura propuesta** (misma forma que `.claude/skills/claude-md-architect/`, pero más liviana):

```text
.claude/skills/notebooklm/
├── SKILL.md                        reglas y flujo en 4 pasos: fuentes → material → prompt → entrega
├── referencias/
│   ├── herramienta.md              campos verificados de la interfaz, con fecha y fuente
│   ├── fuentes.md                  qué entra, transformaciones, limpieza/, nombres
│   ├── principios.md               cómo redactar prompts pedagógicos para NotebookLM
│   └── img/                        capturas de los diálogos reales
├── plantillas/
│   ├── presentacion.md             prompt de presentación por clase, con un ejemplo real
│   └── mapa-mental.md              prompt de mapa mental por clase, con un ejemplo real
├── scripts/
│   └── exportar.mjs                el export de F1
└── limpieza/
    └── <ruta>/<modulo>.json        reemplazos e imágenes (subir/excluir) de cada módulo
```

**Principios de la skill:**

- **Regla anti-invención:** si un campo no está en la referencia, el agente no lo nombra; lo verifica o pregunta. Ya pasó en esta misma conversación: se habló de "Customize" y de "Brief vs Explainer" de memoria, y los dos estaban desactualizados.
- **Cada dato de la interfaz lleva fecha de verificación y fuente.**
- **Fuentes > prompts > interfaz (D21).** La herramienta es *grounded*: el prompt solo puede elegir y enfatizar dentro de lo que subiste. El prompt sigue siendo la pieza que más se trabaja.
- **Los `workflows/` del borrador se fundieron en los pasos de `SKILL.md`:** con cuatro pasos cortos, un archivo por paso no se ganaba su lugar (R12).
- **El agente conoce el sistema (D14).** Antes de redactar lee la clase exportada. El sistema (índice, `reforzar:`, repaso) no viaja ni en las fuentes ni en el prompt (D33, D35).
- **Idioma (D20):** siempre español.
- **Vive en el repo** (`.claude/skills/`), así viaja con git. La migración demostró que lo que no está en git se pierde.
- **Bloques de código (D34):** en una presentación, cada ejemplo se muestra con su código literal de la fuente junto a la explicación; en un mapa mental, solo los nombres exactos de comandos y palabras clave.

**Alcance v1 (D31):** mapa mental y presentación, con plantillas. Video, audio y el resto de Studio aparecen en la referencia, para que el agente no invente, pero sin plantillas.

**Criterio de completado:** un agente sin contexto previo arma un mapa mental o una presentación correctos (fuentes + opciones del diálogo + prompt) sin inventar un solo campo.

### F3 — Menú de materiales ✅ vive en la skill

> **2026-09-15:** con D31–D36 el menú de videos quedó sin uso. El menú vigente es el Paso 2 de `.claude/skills/notebooklm/SKILL.md`. Lo que sigue es el borrador de videos, como histórico.

**Objetivo:** un menú de combinaciones, no una regla fija, para elegir qué video generar según el momento. Para elegir, el agente usa los cuatro datos de D26.

**Las palancas reales** (no existe un campo de duración):

1. **Qué fuentes marcas** — la palanca fuerte. Un video corto es, sobre todo, menos alcance.
2. **Formato** — Short o Explainer.
3. **Steering prompt** — el foco dentro de esas fuentes.

**Borrador del menú**, ajustado a un notebook por módulo (se afina en esta fase):


| Momento                 | Fuentes marcadas                               | Formato           | Foco del prompt                                        |
| ----------------------- | ---------------------------------------------- | ----------------- | ------------------------------------------------------ |
| Poco tiempo o sin ganas | 1 clase                                        | Short             | la idea central y un ejemplo                           |
| Tiempo medio            | 2 o 3 clases                                   | Explainer         | recorrido de esas clases                               |
| Módulo terminado       | todas las clases del módulo                   | Explainer         | recorrido completo del módulo                         |
| Volver tras días | las clases previas que necesitas para seguir | Explainer (Short si hay poco tiempo) | recorrido completo de esas clases, sin enfocarse en fallos |
| Después de un repaso | las clases donde fallaste | Short | solo lo que fallaste (`reforzar:`) |

**Dos usos distintos (D27):**

- **Volver tras días** no pasa por el repaso: no hay preguntas previas ni se buscan fallos. El video recorre completas las clases que necesitas para seguir.
- **Después de un repaso**, el Paso 3 del repaso usa la skill y el video se enfoca en lo que fallaste.

**Casos de varios módulos:** son pocos y se resuelven con un notebook temporal (ver mi nota en P2, sección 6).

**Consecuencia de la espera de +30 minutos:** el video para un momento de poco tiempo **tiene que existir antes**. Se generan cuando tienes energía y se consumen cuando no. El propio notebook es el registro (D22).

### F4 — Desacoplar del sistema de repaso ⬜

**Objetivo (D35):** que el repaso deje de usar y de definir NotebookLM. El repaso termina en el recall y su registro; NotebookLM vive solo en su skill. Toca `AGENTS.md` y `CLAUDE.md`, así que pasa antes por el gate de `claude-md-architect` y se presenta antes de ejecutarse (R4).

**Archivos afectados:**

- `.claude/skills/repasar/consolidacion-notebooklm.md` — se archiva (sus principios útiles ya están en `notebooklm/referencias/principios.md`)
- `.claude/skills/repasar/SKILL.md` — se quita el Paso 5 y la mención a NotebookLM de su `description`
- `sistema/metodologia_repaso.md` — tabla de herramientas y la decisión v1 del Paso 3
- `AGENTS.md` — fila "Preparar audio o video de NotebookLM" de la tabla "Dónde vive cada cosa"
- `CLAUDE.md` — la nota "la carpeta `notebooklm/` está en construcción"
- `apuntes/AGENTS.md` — A2 menciona el campo `notebooklm` del índice
- `NOTAS.md` — ítem "NotebookLM — uso definido"
- Campo `notebooklm:` — **se elimina** de los 10 `00_indice.md` y de donde se defina su plantilla (D23)

---

## 5. Preguntas abiertas

No hay preguntas abiertas: todas quedaron respondidas el 2026-09-11. Las nuevas aparecerán aquí.

---

## 6. Preguntas respondidas

### Ronda 2 — P19, P20, P15 y P17

**P19. ¿Qué cuenta como imagen pedagógica?**
Dijiste que sí subirías imágenes "mientras sea pedagógica". Hoy hay 30, todas en Cloud (B2: 7, B3: 15, B4: 8), y casi todas son capturas de consola. Propongo este criterio:

- **Entra** una imagen que muestra **un concepto o una estructura**: algo que se entiende mejor viéndolo. Ejemplos reales: las familias de instancias (B4 clase 02), el editor de políticas con su esqueleto Version / Statement / Effect (B3 clase 02), los tipos de entidad de confianza al crear un rol (B3 clase 05), la comparativa plan gratuito vs de pago (B2 clase 02).
- **No entra** una captura que solo muestra **dónde hacer clic o el estado de tu cuenta**: listas con tus recursos, formularios de inicio de sesión, el diálogo del alias, la pantalla de créditos. Eso es guía de consola, o sea práctica (tu respuesta en P5). Además, varias muestran datos de tu cuenta (el alias, un ARN con el número de cuenta) que se subirían a Google.

Opciones:

- (a) **Ese criterio: el agente elige por módulo y te muestra la lista antes de exportar.** 💡 Lo que apruebes queda guardado para las siguientes exportaciones.
- (b) Todas las imágenes, sin filtro.
- (c) Tú eliges cada vez.

> **Recomendación del agente: (a).**
>
> - **Cumple tu condición sin trabajo de tu parte.** Pediste imágenes "mientras sea pedagógica". Con (a) no revisas imagen por imagen: el agente propone la lista y tú solo apruebas o tachas.
> - **Las capturas de "dónde hacer clic" no enseñan un concepto en un video de repaso**, y cada una gasta una fuente. A primera vista, en B3 pasarían unas 3 de las 15: el editor de políticas, los tipos de entidad de confianza y, quizá, los casos de uso de la clave de acceso.
> - **No sube datos de tu cuenta a Google.** Quedan fuera el alias y el ARN con tu número de cuenta.
> - **Por qué no las otras:** (b) llenaría B3 de formularios, y (c) te devuelve la fricción que este plan busca quitar.

Respuesta: Dale sigamos tu recomendacion

> **Nota del agente:** → **D24**. La lista de imágenes que propongo para B3 te la muestro al construir el export.

**P20. ¿Cómo se nombran los notebooks?**
Como no se guarda el link (D23), el nombre es lo que te permite encontrar cada notebook. Se puede cambiar en cualquier momento.

- (a) **`Cloud · B3 · Identidad`** (ruta · módulo · tema). 💡 Se lee de un vistazo, y los M1 de TypeScript y de Arquitectura no se confunden. Los apuntes sueltos de IA quedarían como `IA · CLAUDE.md — Arquitectura de Contexto`.
- (b) `B3 — Identidad`: igual que el título del módulo, sin la ruta.
- (c) Otro: ___

> **Recomendación del agente: (a) `Cloud · B3 · Identidad`.**
>
> - **Tu lista de notebooks va a mezclar las tres rutas.** Con la ruta al inicio, sabes de qué ruta es cada notebook sin leer el tema, y los dos M1 y los dos M2 (TypeScript y Arquitectura) no se confunden.
> - **El nombre sale solo de datos que ya existen:** la carpeta de la ruta, el campo `modulo:` y el tema del índice. Por eso el export puede decirte el nombre exacto con el que crear el notebook, sin que tengas que pensarlo.
> - **Sirve también para los apuntes sin módulo** (los de IA): se quita la parte del módulo y el patrón se mantiene.
> - **Por qué no (b):** funciona, pero pierde la ruta y deja a los apuntes de IA sin un patrón común.

Respuesta: Deacuerdo con tu recomendacion siempre y cuando no sean puntos modulo sino guiones Cloud-M3-Identidad y ademas el modulo debe ser MX (siendo X el numero del modulo)

> **Nota del agente:** anotado con tus dos ajustes, guiones y `MX`. En Cloud el campo `modulo:` dice `B3`; el export toma solo el número, así que B3 queda `Cloud-M3-Identidad` sin tocar tus apuntes. También uso `MX` como prefijo de los archivos (`M3-02_politicas.md`), para que el notebook y sus fuentes se llamen igual. Los apuntes sueltos de IA quedan como `IA-CLAUDE.md — Arquitectura de Contexto`. → **D25**

**P15. ¿Qué necesita saber el agente para recomendarte un video?** *(antes decía "ejes del menú")*
Preguntaste qué significaba. "Eje" era una forma poco clara de decir **cada dato que el agente usa para decidir qué video armarte**. Cada dato controla una parte distinta del video:


| Dato                     | Qué decide                                                    | Ejemplo                                                                  |
| ------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Tiempo que tienes**    | El formato: Short si son minutos, Explainer si hay más        | "Tengo 10 minutos" → Short                                              |
| **Cómo te sientes**     | La intensidad: corto y ligero sin ganas, completo con energía | "Estoy cansado" → Short, tono ligero                                    |
| **Qué clases**          | Qué fuentes se marcan                                         | "La clase 05 de B3" → solo esa fuente                                   |
| **Para qué lo quieres** | El foco del prompt                                             | "Vuelvo después de una semana" → lo que necesitas recordar para seguir |

Ejemplo completo: *"Tengo 10 minutos, estoy cansado y vuelvo a B3 después de días"* → un Short sobre las clases que la siguiente da por sabidas, enfocado en lo esencial.

- (a) **Los cuatro datos.** 💡 Si no me das alguno, lo deduzco o te pregunto solo ese.
- (b) Solo tiempo y clases; el resto lo deduzco.
- (c) Otro: ___

> **Recomendación del agente: (a), sin obligarte a dar los cuatro.**
>
> - **Cada dato decide una parte distinta del video.** Si falta uno, esa parte queda genérica.
> - **"Para qué lo quieres" es el más importante.** Es lo que distingue un video para volver tras días (el caso que originó este plan) de uno de repaso o de primera vista. La opción (b) lo descarta, justo el dato de tu caso.
> - **En la práctica no hay fricción.** Una frase como *"vuelvo a B3, tengo 10 minutos"* ya trae tres datos. Si falta uno, lo deduzco; solo pregunto cuando cambia el video.
> - **Tiempo y ánimo se parecen:** si solo mencionas uno de los dos, basta.

Respuesta:Buena , sigo tu recomendacion

> → **D26**

**P17. ¿Qué pasa con NotebookLM dentro del ciclo de repaso?** *(pediste que explique la opción a)*

**Cómo funciona hoy:** cuando haces un repaso, el agente te pregunta a libro cerrado y anota lo que fallaste en el campo `reforzar:` del índice. Después, el **Paso 3** del repaso redacta prompts de NotebookLM que enfatizan justo eso. Las reglas y plantillas de ese paso viven en `sistema/prompts/repaso_consolidacion_notebooklm.md`, que ya está desactualizado (dice "Customize").

**Qué cambia con cada opción:**

- (a) **El Paso 3 se queda, pero delega en la skill.** 💡 El repaso deja de tener reglas propias de NotebookLM: solo le pasa a la skill dos datos, qué clases y qué reforzar, y la skill arma el video con sus plantillas. Así, un solo lugar sabe de NotebookLM: si mañana cambia un campo, se corrige en la skill y el repaso queda al día sin tocarlo.
  *Ejemplo:* terminas el repaso de B3 y fallaste "un Deny explícito gana sobre cualquier Allow". Al cerrar, el agente te ofrece: *"¿Te armo un Short enfocado en el Deny explícito, con la clase donde se explica?"*
- (b) **Se quita NotebookLM del repaso.** El repaso termina en las preguntas; si quieres un video, lo pides tú aparte. Se pierde esa oferta al cerrar.
- (c) **Queda igual por ahora.** Quedan dos documentos definiendo NotebookLM, y uno está desactualizado.

> **Recomendación del agente: (a).**
>
> - **Conserva lo mejor que dejó junio:** un video que ataca justo lo que fallaste. Ningún video genérico puede hacer eso, porque solo el repaso sabe qué fallaste.
> - **Respeta la independencia (D1):** NotebookLM se define en un solo lugar, la skill. El repaso solo la usa, igual que usaría cualquier otra herramienta.
> - **Cuesta poco:** en F4 se reemplaza el contenido de `repaso_consolidacion_notebooklm.md` por una referencia a la skill y se ajusta el Paso 5 de `repaso_recall.md`.
> - **Sigue siendo opcional:** en junio ya se definió como "premio, no requisito". Si al cerrar un repaso no quieres video, dices que no.
> - **Por qué no las otras:** (b) pierde el video personalizado, y (c) deja vivo el documento con "Customize", que ya provocó errores en esta conversación.

Respuesta: Yo creo que a y b porque veo a A solo estar en la situaciones donde solo falle, que pasa en el caso que te explique , cuando vuelvo despues de dias y quiero repasar ciertos apuntes,  ahi no fue por fallo fue porque la necesidad de entender los temas posteriores y para este caso no quiero una practica previa para identificar donde solo falle sino ver los apuntes completos.

> **Nota del agente:** tienes razón: la opción (a) solo cubre el video de lo que fallaste, y tu caso de volver tras días es otro uso, que no pasa por el repaso. Quedan los dos:
>
> 1. **Después de un repaso**, el Paso 3 delega en la skill y el video se enfoca en lo que fallaste (`reforzar:`).
> 2. **Fuera del repaso**, cuando vuelves tras días, el video recorre las clases completas, sin práctica previa y sin buscar fallos.
>
> Actualicé el menú de F3 con los dos. → **D27**

---

### Ronda 1 — P1 a P18

**P1. ¿Dónde vive la carpeta del export?**

- (a) **Dentro del repo** (`notebooklm/` en la raíz), excluida en Obsidian y en `.gitignore`. Se regenera cuando haga falta. 💡
- (b) **Fuera del repo** (por ejemplo `C:\dev\Mis Creaciones\Tesla-notebooklm\`).
- (c) Dentro del repo, excluida en Obsidian pero **versionada** en git.

Respuesta: el repo Tesla ya no es un vault de Obsidian o se dejo de usar ese medio para visualizar los md para ello directamente los hago desde la extension de VSCODE Markdown Preview , Obsidian ya no se usa de mi parte hoy en dia asi que consideralo fuera del sistema Tesla

> **Nota del agente:** anotado, y guardado en la memoria del agente para que no se vuelva a asumir. Sin Obsidian, queda la opción (a) sin esa parte: `notebooklm/` en la raíz, ignorado por git. VS Code tampoco lo muestra en su búsqueda, porque respeta `.gitignore`. Si prefieres otra ubicación, dime. → **D8, D9**

**P2. ¿Cuántos notebooks?**

- (a) **Uno por ruta** (Cloud, TypeScript, Arquitectura…). 💡
- (b) Uno por módulo.
- (c) Uno por ruta, más notebooks puntuales cuando quieras mezclar rutas.

Respuesta: Creo que por las limitaciones que mencionaste sobre la version gratism Considero uno por modulo creo que la informacion que ofrece un modulo es lo suficientemente independiente y tambien extenso para brindar incluso todo un video, no se , no se me ocurre repasar o generar videos de varios modulos juntos o tu si detectas casos?

> **Nota del agente:** sí hay casos, pero pocos:
>
> 1. **Volver tras días cuando el módulo nuevo se apoya en el anterior.** B4 incluye el rol de instancia, que usa los roles explicados en B3.
> 2. **El proyecto integrador de TypeScript**, que junta lo de todos los módulos.
>
> Los dos son ocasionales. Se resuelven con un **notebook temporal**: subes las 2 o 3 clases necesarias de cada módulo desde sus carpetas del export y lo borras al terminar. No justifican cambiar tu decisión. → **D10**

**P3. ¿Una fuente por sección o por módulo?**

- (a) **Por sección.** 💡
- (b) Por módulo (todas sus secciones en un archivo).
- (c) Ambas.

Respuesta:  Considero una fuente por clase porque recuerda que aveces estudiare simplemente clases de forma independiente, o 2 o 3 clases hasta llegar a un modulo

> **Nota del agente:** desde ahora el plan dice *clase* en vez de *sección*. → **D11**

**P4. ¿Qué plan de NotebookLM tienes?**

- (a) Gratis
- (b) De pago (¿cuál?)

Respuesta: Tengo de pago pero lamentablemente vence en noviembre asi que mejor estar preparado

> **Nota del agente:** se diseña para el gratis: 100 notebooks y 50 fuentes por notebook. Con un notebook por módulo sobra espacio (ver capacidad en F1). → **D12**

**P5. ¿Los cierres (`99_cierre.md`) entran al export?**

- (a) **No.** 💡
- (b) Sí.

Respuesta: No , solo material de teoricos o de apuntes, nada de practicas para los videos

> **Nota del agente:** por la misma razón queda fuera `guia_cli-instalacion-configuracion.md` de B3, que es una guía de práctica. → **D13**

**P6. ¿Qué pasa con los índices (`00_indice.md`)?**

- (a) No se exporta nada del índice.
- (b) **El Alcance va como cabecera de la clase 01 del módulo.** 💡
- (c) El Alcance va como fuente propia.

Respuesta: Siento que no es necesario colocar los indices haber no quiero meter todo el sistema Tesla tampoco mi objetivo es repasar y creo que eso me basta con los apuntes teoricos o de apuntes,  mientras tu conozcas el sistema(incluido los indices) es suficiente porque el agente es el que genera el prompt.

> → **D13, D14**

**P7. ¿Qué hacer con los `⚠️ verificar`?**

- (a) Se quedan, con una marca en el texto: *(dato sin verificar)*.
- (b) Se quita la frase marcada.
- (c) **Se verifican antes de exportar el módulo que los tenga.** 💡

Respuesta: Misma respuesta que la anterior

> **Nota del agente:** lo interpreté así: igual que en P6, lo del sistema no viaja en las fuentes y el agente lo sabe. El export quita la marca `*(⚠️ verificar …)*`, deja la frase, y avisa qué clases tenían datos sin verificar para que el agente no los ponga en el foco del prompt. Queda un riesgo: el dato sigue en el texto y el video podría mencionarlo como cierto. Hoy son 6 datos, todos precios de B4 clase 02. Si querías otra cosa, dime. → **D14**

**P8. ¿Qué hacer con las imágenes?**

- (a) **Solo su descripción, como texto:** `[Imagen: …]`. 💡
- (b) Además, subir aparte las imágenes clave (diagramas).

Respuesta: creo que si adicionaria las imagenes de echo es una imagen es mas clara que una descripcion , mientras dicha imagen sea pedagogica claro , ademas debido a que ahora sera por modulo tenemos mas capacidad de imagenes

> **Nota del agente:** → **D15**. Qué cuenta como pedagógica: **P19**.

**P9. ¿Cómo se genera el export?**

- (a) **Un script que el agente ejecuta**, guardado dentro de la skill. 💡
- (b) El agente transforma los archivos a mano cada vez.

Respuesta: Tu recomendacion

> → **D16**

**P10. ¿El export te avisa qué archivos cambiaron desde la última subida?**

- (a) **Sí.** 💡
- (b) No por ahora.

Respuesta: Tu recomendacion

> **Nota del agente:** guarda una huella del contenido, no la fecha (detalle en F1). → **D17**

**P11. ¿Qué materiales de Studio llevan plantilla de prompt en la v1?**

- (a) **Solo video y audio.** 💡
- (b) También quiz y flashcards.
- (c) Otros: ___

Respuesta: Solo video y audio

> → **D18**

**P12. ¿El tono de junio aplica también al video?**

- (a) **Sí, con ese matiz:** video narrado, con energía, humor contenido. 💡
- (b) Video sobrio; la personalidad queda solo para el audio.
- (c) Otro: ___

Respuesta: Dale probemos

> → **D19**

**P13. ¿Idioma de los videos?**

- (a) **Español siempre.** 💡
- (b) Español por defecto; inglés a veces, para usar Cinematic.

Respuesta: Español siempre

> → **D20**

**P14. ¿De acuerdo con el orden de peso fuentes > prompts > interfaz?**

- (a) **Sí.** 💡
- (b) Prompts primero.

Respuesta: Dale ,sigo tu  recomendacion , solo queria resalta la importancia del prompt mas no opacar los demas

> → **D21**

**P16. ¿Se lleva registro de qué videos ya existen?**

- (a) **No: el propio notebook es el registro.** 💡
- (b) Sí: una lista en el repo con qué video, qué fuentes y qué formato.

Respuesta: El propio notebook es el registro

> → **D22**

**P18. ¿Dónde va el link del notebook?**

- (a) **En el índice del workspace**, un link por ruta. 💡
- (b) Se mantiene en cada índice de módulo.
- (c) Se elimina el campo.

Respuesta: Deduzcamoslo de las anteriores respuestas, pero es necesario guardar el link? osea el notebookLM puede ser el mismo registro siempre y cuando estandarizemos nombres para cada cuaderno

> **Nota del agente:** de acuerdo. Con un notebook por módulo y nombres estándar no hace falta guardar el link. Verifiqué que un notebook se puede renombrar (clic en el título, editar, Enter). El campo `notebooklm:` se elimina de los índices en F4. El formato del nombre queda en **P20**. → **D23**

---

## 7. Registro de avance


| Fecha      | Qué pasó                                                                                                                                                              |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-09-11 | F0 cerrada: conversación de junio rescatada, herramienta verificada, skills existentes revisadas, sintaxis de apuntes relevada. Se crea este plan.                     |
| 2026-09-11 | Respuestas P1–P18 incorporadas: 16 decisiones nuevas (D8–D23). F1 especificada con datos reales de los apuntes. Preguntas nuevas: P19 y P20. Reformuladas: P15 y P17. |
| 2026-09-11 | Respuestas P15, P17, P19 y P20 incorporadas (D24–D27). Sin preguntas abiertas. `notebooklm/` agregado a `.gitignore`. Empieza la construcción del export. |
| 2026-09-11 | Script `exportar.mjs` construido y probado fuera del repo sobre B3, B4 y el apunte de CLAUDE.md: frontmatter, wikilinks, imágenes, `⚠️` y clases en progreso, bien; exportar dos veces sin cambios da "Sin cambios". Se agrega la limpieza del pie de navegación. Pendiente: aprobar las imágenes de B3 y hacer la exportación real. |
| 2026-09-11 | Aclaración: el export no se genera por adelantado. Se hace cuando eliges qué repasar; el piloto fijo con B3 se descarta. |
| 2026-09-12 | Primer uso real: exportado TypeScript M1 (5 clases, sin imágenes) a `notebooklm/typescript/m1-por-que-typescript/`. Notebook: `TypeScript-M1-Por qué TypeScript y cómo corre`. Prompts de video y audio entregados en el chat. Pendiente: subir, generar y anotar lo que no se pudo verificar en la web. |
| 2026-09-15 | Filtro del export endurecido (D28–D30): marcas ⚠️ verificar fuera sin aviso, clases autocontenidas (reglas genéricas + `limpieza/` con reemplazos de los 9 módulos con clases finalizadas) e imágenes como fuente con revisión R9 (7 de 23 excluidas). Probado en los 10 módulos: todos exportan limpios. TypeScript M1 re-exportado. Hallazgo R9 fuera del export: capturas versionadas de B2 y B3 y dos líneas de B3 muestran datos de la cuenta. |
| 2026-09-15 | Giro de `PROMPT.md` registrado (D31–D36): mapa mental y presentación por clase, cobertura pareja, código literal, sin relleno, fuera del repaso. Skill v1 construida: `SKILL.md`, `referencias/` (herramienta, fuentes, principios), `plantillas/` (presentación y mapa mental, con ejemplo de TypeScript M1-04). Capturas de los dos diálogos movidas a `referencias/img/`; las dos guías del usuario, a `_archivo/notebooklm/`. F3 queda en la skill; F4 replanteada según D35. |
| 2026-09-15 | Primer uso de la skill con TypeScript M1. Al leer la clase exportada apareció un gancho de cierre hacia la clase siguiente ("es lo que viene") que el filtro no detectaba: se agrega el patrón y se limpian 9 ganchos en 5 módulos. Los 10 módulos siguen exportando limpios. Prompts de presentación y mapa mental de la clase 1 entregados en el chat. |
| 2026-09-15 | Primer mapa mental real (TypeScript M1, clase 1): respetó nodo central, las 8 temáticas y su orden, en español. Se verifica que cada nodo lanza una consulta al chat (D37). Actualizados `herramienta.md`, `principios.md` §10, la plantilla del mapa mental, el Paso 2 de la skill y el prompt de la clase 1. Los prompts pasan a entregarse en `notebooklm/<ruta>/<modulo>/_prompts/`. Guía del usuario archivada en `_archivo/notebooklm/`. Falta ver el resultado de la presentación. |
| 2026-09-15 | D38: hojas del mapa mental como preguntas que se entiendan solas (criterio del usuario: específicas pero cortas, sin código suelto). El usuario confirma el máximo de 3 niveles y que el clic ejecuta la consulta solo. Actualizados `principios.md` §10, la plantilla del mapa mental, el Paso 2 de la skill y el prompt de la clase 1. |
| 2026-09-16 | D39: el usuario siente el mapa de la clase 1 cargado (8 ramas × ~3-4 hojas ≈ 24-28 nodos) y pide sin repetición entre nodos. Se confirma que las ramas son los `##` de la clase y que el conteo de hojas nunca estuvo fijado por el prompt — lo decidió NotebookLM solo. Se agrega la regla "sin número fijo, sin repetición" a `principios.md` §10, a la plantilla y al prompt de la clase 1, con el riesgo concreto entre "Qué es el tipado estático" y "JavaScript vs TypeScript, lado a lado". Pendiente: regenerar y comparar el total de nodos. |
| 2026-09-16 | Prompts de las clases 2-5 de TypeScript M1 preparados (presentación + mapa mental), con las temáticas de cada clase y el aviso de solape donde aplica (M1-02: el ejemplo vs la tabla de qué se borra; M1-04: comandos vs flujo de trabajo; M1-05: tabla de opciones vs strict). Con esto el módulo completo tiene sus 5 clases listas en `notebooklm/typescript/m1-por-que-typescript/_prompts/`. Falta que el usuario las pruebe. |
