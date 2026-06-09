# 🗄️ Historial — Versión con IA Externa (dos fuentes)

> **Qué es este archivo:** Un registro de cómo funcionaba el flujo P3⇄P4 cuando el sistema usaba **dos fuentes de contenido** (el agente + una IA externa). Se conserva por si conviene retomar este modelo. Toda la información necesaria para reconstruirlo está aquí.

---

## Resumen del modelo de dos fuentes

El sistema producía cada sección del apunte a partir de **dos respuestas independientes** sobre el mismo prompt:

1. **El agente (Cowork)** — generaba su propia respuesta internamente.
2. **Una IA externa** — el usuario copiaba el prompt, lo ejecutaba en una IA externa (por ejemplo Perplexity Academic) y traía la respuesta de vuelta.

Luego el agente **comparaba ambas** y sintetizaba lo mejor de cada una en estilo Tesla.

**Metáfora del usuario:** dos hilos de trabajo. El hilo principal (el agente) recorría P1→P2→P3→P4. En P3 el hilo se subdividía: el hilo secundario era la IA externa. El problema era que el hilo principal no sabía qué pasaba en el secundario salvo por la respuesta final que el usuario traía — la interacción intermedia con la IA externa se perdía.

**Razón del cambio a fuente única:** el contraste entre dos fuentes tenía valor pedagógico (distintos puntos, formas de explicar, datos que una veía y otra no), pero el costo de procesar ese contraste lo cargaba el usuario, lo cual cansaba y erosionaba la motivación/disciplina para estudiar. El usuario ya había reducido de 3-4 IAs externas a una; eliminar el segundo hilo es el siguiente paso de esa misma trayectoria.

---

## Cómo funcionaba P3 (versión dos fuentes)

**Título original:** "P3: Generación de Prompts y Contenido"

El trabajo de P3 tenía **dos partes por cada sección**:

1. **Generar la propia respuesta del agente** al prompt (el agente era una de las 2 fuentes).
2. **Generar el prompt para la IA externa** para que el usuario lo copiara y pegara.

**Flujo por sección:**
1. El agente presentaba el prompt de la sección al usuario.
2. El agente generaba su propia respuesta al prompt.
3. El usuario copiaba el mismo prompt en la IA externa y traía la respuesta.
4. El agente comparaba ambas respuestas y sintetizaba (en P4).

**Principios clave del prompt para la IA externa:**
- Debía ser **autocontenido** — la IA externa no tenía contexto previo.
- Debía incluir **estructura de respuesta obligatoria en markdown** — el agente dictaba el formato, la IA no lo decidía.
- Un prompt por sección lógica del esqueleto (agrupar H2 + sus H3s), no por heading individual.
- Objetivo: entre 3 y 7 prompts por apunte.
- **El agente usaba el mismo prompt internamente** para generar su propia respuesta, asegurando formato comparable entre ambas fuentes.

**Estructura de cada prompt (3 secciones fijas):**
- **Sección A — Contexto:** breve contexto para que la IA entendiera el tema y el nivel.
- **Sección B — Qué necesito:** lista concreta derivada de los headings y códigos de indicación.
- **Sección C — Formato de respuesta obligatorio:** plantilla de formato según los códigos de indicación ([DEF], [DOLOR], [TABLA], [FLUJO], [ANALOGÍA], [CÓDIGO], [MITO], [FASES]). Cada código tenía su plantilla específica de estructura markdown.

**Cierre obligatorio del prompt:** "No agregues secciones extra. No incluyas introducción ni conclusión. Sigue el formato tal cual." — sin esta línea las IAs agregaban preámbulos y cierres que ensuciaban la respuesta.

**Presentación al usuario en P3:**
```
──────────────────────────────────────
📋 SECCIÓN [N] de [TOTAL]: [Nombre]
──────────────────────────────────────

🤖 Mi respuesta:
[Respuesta del agente al prompt]

──────────────────────────────────────
📋 Prompt para la IA externa (copia y pega):

[Prompt completo listo para copiar]

──────────────────────────────────────
Cuando tengas la respuesta de la IA externa, compártela
y sintetizamos juntos.
```

**Guardado:** archivo progresivo `borradores/03_prompts_y_respuestas.md` con cada prompt, la respuesta del agente y la de la IA externa.

---

## Cómo funcionaba P4 (versión dos fuentes)

**Input:** 2 respuestas para la sección — la del agente (de P3) y la de la IA externa (traída por el usuario), ambas en el mismo formato estandarizado.

**Trabajo:** compararlas, extraer lo mejor de cada una, y redactar una síntesis en estilo Tesla.

**Paso de comparación (análisis interno, no mostrado al usuario):**

| Dimensión | Cowork (agente) | IA externa |
|-----------|-----------------|------------|
| ¿Definición más clara? | | |
| ¿Mejor ejemplo o analogía? | | |
| ¿Dato o matiz único que el otro no tiene? | | |
| ¿Algo incorrecto o impreciso a descartar? | | |

Se seleccionaba lo mejor de cada columna; el resto se descartaba. Regla anti-sesgo: no favorecer la propia respuesta del agente — el objetivo era el mejor apunte posible, integrando datos valiosos de la IA externa cuando los aportaba.

**Presentación de la síntesis incluía:** `Fuentes: Cowork + la IA externa`.

> El resto de P4 (voz del manual, formato visual por código de indicación, estrategia de descarte, escritura progresiva al `.md`, mecanismo de apunte abierto) **es idéntico en ambas versiones** y no cambia. Lo único que cambió al pasar a fuente única fue: de dónde vienen las respuestas (dos fuentes → una) y el paso de comparación (comparar dos respuestas → autocrítica de una sola).

---

## Para retomar la versión de dos fuentes

Si se decide volver a este modelo:

1. En **P3**: restaurar la generación del prompt autocontenido para la IA externa (las plantillas de formato por código de indicación se conservan tal cual en el P3 actual — solo hay que reactivar la parte de "generar prompt para que el usuario lo lleve afuera" y la presentación con el bloque de prompt copiable).
2. En **P4**: restaurar el Paso 1 como tabla comparativa de dos fuentes (en vez de autocrítica de una sola) y la etiqueta `Fuentes: Cowork + la IA externa`.
3. En **CLAUDE.md**: restaurar la descripción del flujo P3⇄P4 con el hilo secundario de la IA externa.

Todo lo demás del sistema (P1, P2, manual de estilo, mecanismo de apunte abierto, estructura de carpetas) es independiente de esta decisión y no se toca.
