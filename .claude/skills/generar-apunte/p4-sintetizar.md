# P4: Síntesis Progresiva con Estilo Tesla

> **Fase:** 4 de 4 del flujo de generación de apuntes  
> **Input:** Borrador del agente + su autocrítica (banderas `⚠️ verificar`) para la sección actual, de P3  
> **Output:** Síntesis de la sección en estilo Tesla, escrita al `.md` inmediatamente  
> **Checkpoint:** El usuario valida cada sección — pueden surgir adiciones (apunte abierto)

---

## Instrucciones para el Agente

Recibes de P3, para una sección específica, **un borrador de contenido + una autocrítica** (qué le falta, qué es dudoso, qué se explica mejor de otra forma, con banderas `⚠️ verificar` en los datos no confirmados). Trabajas con **una sola fuente: tú mismo**. Tu trabajo es **incorporar tu propia autocrítica al borrador y redactar una síntesis que suene como si el usuario la hubiera escrito él mismo**, en estilo Tesla.

**Tu rol:** Eres la fuente de contenido Y el sintetizador, en un único hilo de contexto continuo. Esto te da una ventaja: tienes contexto completo del tema, del estilo, y de las secciones anteriores ya sintetizadas. Úsalo para que las secciones fluyan como una narrativa coherente y para que las preguntas del usuario en secciones previas informen las siguientes.

**Lo que no haces:**
- No copias texto de ninguna fuente directamente.
- No promedias — seleccionas activamente la mejor explicación, el mejor ejemplo, la mejor analogía.
- No agregas secciones de "Resumen" ni "Conclusión".
- No usas lenguaje de enciclopedia o documentación oficial.

**Lo que sí haces:**
- Reescribes todo desde cero con la voz del manual.
- Priorizas comprensión sobre completitud.
- Produces el contenido ya con el formato visual md-nativo (quotes, callouts blockquote, emojis, tablas).
- Escribes la sección al `.md` inmediatamente después de aprobación.

---

## Paso 1: Integrar la Autocrítica al Borrador

Antes de redactar, incorpora lo que tu propia autocrítica de P3 detectó (análisis interno, no lo muestres al usuario):

| Señal de la autocrítica | Qué haces con ella |
|-------------------------|--------------------|
| Algo que faltaba | Lo agregas al contenido de la síntesis |
| Una explicación poco clara | La reescribes con la versión más clara que identificaste |
| Un ángulo no tocado (error común, caso de uso) | Lo integras si enriquece la sección |
| Bandera `⚠️ verificar` (dato dudoso) | Lo conservas en la síntesis **pero marcado**, para que el usuario lo confirme |

El objetivo es el mejor apunte posible: la autocrítica es tu red de seguridad de fuente única, así que tómala en serio en vez de pasar el primer borrador tal cual.

**Sobre las banderas `⚠️ verificar`:** no las borres silenciosamente. Los datos verificables de los que no estás seguro (versiones, flags, nombres de funciones, cifras, comandos) se quedan en el texto pero señalados de forma visible al usuario al presentar la sección (ver Paso 6). Es el reemplazo de la segunda fuente: en vez de contrastar contra otra IA, el usuario confirma los puntos marcados.

---

## Paso 2: Aplicar la Voz del Manual

Antes de escribir, recuerda las reglas de voz de `estilo.md` (§3):

### Persona gramatical

| Contexto | Persona |
|----------|---------|
| Definiciones y quotes | Impersonal / 3ra persona: "Es un protocolo que..." |
| Explicaciones | 1ra plural: "Vamos a ver", "podemos usar" |
| Instrucciones directas | 2da persona: "Imagina que tu aplicación..." |

### Muletillas características (úsalas naturalmente)

- "En otras palabras" — para reformular
- "En términos simples" — antes de simplificar algo complejo
- "Es decir" — conector entre ideas
- "Debes recordar que" — para énfasis en info clave
- "Se utiliza para..." / "Se usa frecuentemente para..." — propósito

### Nivel de formalidad

Didáctico-casual. Como un tutor explicando, no como documentación técnica. Accesible pero preciso.

### Spanglish controlado

Tecnicismos en inglés (Access Token, Refresh Token, Scope, Working Directory, etc.). Explicaciones en español. Nunca mezclar sin criterio.

---

## Paso 3: Aplicar el Formato Visual por Código de Indicación

Cada sección tiene códigos de indicación del esqueleto. Estos determinan qué formato md-nativo usar.

### [DEF] → Quote obligatorio

```
> **[Definición en 1-2 oraciones en negrita]**
>
> [Contexto adicional o aclaración en la misma voz]
```

La primera línea siempre en negrita. Para separar ideas dentro del mismo quote, deja una línea de quote vacía (`>` solo). Nunca hay contenido antes del quote — es lo primero después del heading.

### [DOLOR] → Párrafo de apertura antes del quote

```
[Párrafo describiendo el problema que existía antes de X.
Concreto, con ejemplo real. 2-3 oraciones máximo.]

> **[Definición de X en negrita]**
>
> [Cómo resuelve el problema]
```

El dolor abre la sección. El quote define la solución.

### [TABLA] → Tabla Markdown con leyenda

```
[Párrafo corto de contexto para la tabla]

| [Columna 1] | [Columna 2] | [Columna 3] |
|-------------|-------------|-------------|
| [Dato]      | [Dato]      | [Dato]      |

🔵 = [categoría A]   🔴 = [categoría B]   🟡 = [categoría C]
(solo si hay 3+ categorías con distinción visual)
```

### [FLUJO:ascii] → Bloque `text`

```
[Párrafo explicando el flujo antes del diagrama]

```text
[Diagrama ASCII con ├──, └──, →, ↓, ┌─, ┐, └─, ┘, │]
```

[1 oración de cierre resumiendo el flujo]
```

Tipos de ASCII según el subtipo:
- Flujo lineal: `A → B → C → D`
- Árbol de decisión: con `├──` y `└──`
- Comparación lado a lado: con `┌─────┐` bloques
- Fases: `FASE 1: ... → FASE 2: ...`

### [FLUJO:mermaid] → Bloque `mermaid` nativo

````
[Párrafo explicando el flujo]

```mermaid
[código Mermaid: flowchart / sequenceDiagram / graph, con sus actores y flujo]
```

[1 oración de cierre]
````

**Nota:** El agente escribe el bloque ```` ```mermaid ```` directamente y **Markdown Preview Enhanced lo renderiza como diagrama**. Ya no se genera SVG ni se pega imagen (gran simplificación respecto a Notion).

### [ANALOGÍA] → Integrada en la explicación, no en sección aparte

```
[Explicación técnica del concepto]

Imagina que [analogía cotidiana — hotel, restaurante, transporte, teatro, fotografía].
[Mapeo: elemento técnico A = elemento analógico A, elemento técnico B = elemento analógico B]
[Límite de la analogía si es relevante: "A diferencia del hotel, aquí..."]

[Continuación de la explicación técnica]
```

La analogía va integrada en el flujo, no como subsección separada. Es un párrafo dentro de la explicación.

### [CÓDIGO] → Fenced code blocks con label (ya no callout)

````
**Sintaxis:**

```[lenguaje]
[código abstracto con placeholders]
```

**Ejemplo:**

```[lenguaje]
[código real funcional con comentarios /* ¿Qué hace esto? */]
```
````

Sintaxis abstracta primero, ejemplo concreto después. Comentarios extensivos dentro del código.

### [MITO] → Formato ❌/✅

```
[Párrafo corto de contexto: "Hay varias ideas erróneas sobre X..."]

❌ **Mito:** "[Afirmación falsa común entre principiantes]"
✅ **Realidad:** [Corrección concisa y directa]

❌ **Mito:** "[Siguiente mito]"
✅ **Realidad:** [Corrección]
```

Ordenar del mito más común al menos conocido. Máximo 5 pares por sección.

### [FASES] → Lista numerada con estructura interna

```
[Párrafo de introducción al proceso]

**FASE 1: [Nombre]**
[Descripción: qué sucede, quién lo hace, qué produce. 2-4 oraciones]

**FASE 2: [Nombre]**
[Descripción]

**FASE N: [Nombre]**
[Descripción]

[Oración de cierre con el resultado final del proceso completo]
```

---

## Paso 4: Estrategia de Descarte

No todo el borrador entra en la síntesis. Reglas de descarte:

| Se descarta | Por qué | Qué hacer |
|-------------|---------|-----------|
| Explicaciones teóricas largas | Se comprime en 1 oración en negrita (el quote) | Extraer la esencia, descartar el relleno |
| Casos extremos o edge cases | Van en notas separadas si el tema lo amerita | Ignorar por ahora |
| Información repetida dentro del borrador | Consolidar en 1 versión | Elegir la más clara |
| Contexto histórico irrelevante | No ayuda al aprendizaje | Omitir |
| Disclaimers, advertencias genéricas | Ruido | Eliminar completamente |
| Ejemplos con tecnologías que el usuario no conoce | Generan más preguntas que respuestas | Sustituir por ejemplo más cercano |

**Criterio maestro:** ¿Esta información ayuda a entender el concepto o a usarlo? Si la respuesta es no, fuera.

---

## Paso 5: Estructura del Bloque Sintetizado

El output final para cada sección sigue este patrón:

```
# [Emoji del workspace] [Título de la sección]

> **[Quote de apertura en negrita]**
>
> [Segunda línea del quote si aplica]

[Contenido según códigos de indicación]
[Bloques md: párrafos, callouts blockquote, tablas, ASCII, Mermaid]

## [Subsección]

> **[Quote de la subsección]**

[Contenido de la subsección]
```

**Markdown estándar y limpio:** el `.md` es el destino final (ya no se pega en Notion). Nada de toggles, colores de heading ni `:::` — la jerarquía la dan los headings (`#`/`##`) y el split por archivos. Callouts como blockquote `> 💡 **Label:**`. Para saltos de línea dentro de un quote, usar línea de quote vacía (`>` solo).

**Verificar antes de entregar:**
- [ ] ¿El quote abre inmediatamente después del heading?
- [ ] ¿La primera línea del quote está en negrita?
- [ ] ¿No hay preámbulo antes del primer heading?
- [ ] ¿El archivo abre con `#` (título) y las subsecciones usan `##`?
- [ ] ¿Suena a tutor, no a documentación?
- [ ] ¿Los tecnicismos están en inglés?
- [ ] ¿Incluye alguna muletilla característica?
- [ ] ¿El tipo de diagrama (ASCII vs Mermaid) corresponde a la complejidad del flujo?

---

## Paso 6: Escribir la sección y co-editar (modelo D3)

**El agente escribe la sección directamente al `.md`** — ya no la mantiene viva en el chat. Por cada sección:

1. Crear el archivo `NN_slug.md` (frontmatter + contenido en estilo Tesla + **bloque de cierre "Lo que debiste llevarte"** + navegación al pie, ver `apuntes/AGENTS.md` A3 y A7), con `estado: en progreso`.

> 🎯 **Bloque de cierre obligatorio:** toda sección termina con `## 🎯 Lo que debiste llevarte` — 3-7 ideas **afirmadas como oración completa** (no títulos), sin enlaces, justo antes del `---` de navegación. Es el piso de retención de esa lectura: si el usuario olvida el resto, esas líneas deben quedar. Ver `apuntes/AGENTS.md` A7.

2. Marcar su entrada en `## Secciones` del `00_indice.md` como `🔄 en progreso`.
3. Avisar al usuario en el chat **sin re-pegar todo el contenido**:

```
✍️ Escribí la Sección [N] — [Título] → `NN_slug.md`
Ábrela en el editor para leerla y ajustarla en vivo (listas, citas, formato).

⚠️ Para verificar (si aplica):
- [Dato puntual que conviene confirmar]

Cuando la des por buena, la marco ✅. ¿O prefieres que ajuste algo del contenido?
```

> ⚠️ **Protocolo de co-edición:** si el usuario edita el archivo en vivo, **relee el `.md` antes de volver a tocarlo** y trátalo como única fuente de verdad — nunca redactes desde tu memoria del borrador, o pisarías sus ediciones. División: la IA hace contenido; el usuario hace legibilidad.

**Bloque `⚠️ Para verificar`:** Inclúyelo solo si la autocrítica de P3 dejó banderas. Lista ahí los datos puntuales de los que no estás seguro (versiones, comandos, cifras, nombres de funciones) para que el usuario los confirme. Si no hay nada que verificar, omite el bloque por completo — no lo muestres vacío. Este bloque es la red de seguridad que reemplaza el contraste contra una segunda IA.

**Si el usuario pide ajustes**, aplicarlos y presentar de nuevo. Los ajustes frecuentes revelan patrones — si el usuario corrige algo 2 veces, el agente debe aprenderlo para las secciones siguientes.

**Si el usuario hace una pregunta sobre el tema** (mecanismo apunte abierto + Apunte Vivo):
1. Responder la pregunta con la mejor explicación posible.
2. **Autoevaluar la respuesta** contra los disparadores de Apunte Vivo (ver `SKILL.md` de esta carpeta, "Durante: preguntas y adiciones"):
   - ¿Contiene analogía / ejemplo real / reformulación más clara que el apunte?
   - ¿Define un término que el apunte usaba sin definir?
   - ¿Conecta el concepto con algo que el usuario ya conoce?
   - ¿Añade un matiz importante que faltaba?
   - ¿Responde una pregunta que otro lector tendría?
   - Señales del usuario: *"ahora sí lo entiendo"*, *"así me tienes que explicar"*, *"no había escuchado eso"*, *"esto enriquece"*.
3. Si cumple alguno → **proponer integración con anclaje al lugar correcto**:
   - "Esto encaja en la sección [X] (actual / previa / futura). Te propongo integrarla como [forma]. ¿La integro?"
   - Si la sección destino es **previa y ya escrita**, editar ese archivo de sección (releyéndolo antes).
   - Si la sección destino es **futura**, anotarla en su entrada del `00_indice.md`.
4. Si amerita un H3 nuevo → "Esto merece su propio subtítulo en el esqueleto, ¿lo agrego?"
5. Si excede el alcance → Guardián de alcance: "Esto ya es otro tema. ¿Lo anoto en NOTAS.md?"
6. Si no cumple ningún disparador → la respuesta queda solo en el chat, no se integra (regla anti-fricción).

---

## Paso 7: Actualizar el índice y finalizar

Al aprobar cada sección:

- Cambiar su `estado` en el frontmatter a `finalizada` y su entrada en el `00_indice.md` a `[[NN_slug|Título]] — ✅`.
- Fijar `prev`/`next` de la sección y de sus vecinas (la IA mantiene estos enlaces).
- El apunte sigue `EN PROGRESO` en el frontmatter del índice mientras queden secciones `⬜`/`🔄`.

Cuando **todas** las secciones estén `✅`:

- Cambiar el `estado` del apunte en el `00_indice.md` a `FINALIZADO`.

**Fuentes:** ya viven en la sección `## Fuentes` del `00_indice.md` (las puso P1). No se agregan al pie de ninguna sección.

---

## Conexión con el Flujo Completo

P3 y P4 operan **entrelazados** dentro del mismo turno: por cada sección del esqueleto, P3 genera contenido y se autocritica, y P4 sintetiza + escribe inmediatamente. El flujo completo por sección es:

```
P3: Agente genera el borrador de la sección
P3: Agente se autocritica y marca ⚠️ verificar
P4: Agente integra la autocrítica y sintetiza en estilo Tesla
    ↕ Apunte abierto: preguntas, adiciones, guardián de alcance
P4: Escribe la sección al .md → usuario revisa/edita en vivo → ✅ en el índice
→ Siguiente sección
```

Después de completar todas las secciones:

1. El apunte vive completo en `apuntes/[workspace]/[tema]/` (índice + secciones), legible en MPE.
2. Su `00_indice.md` queda en estado `FINALIZADO` — puede recibir adiciones futuras vía NOTAS.md.

Los diagramas Mermaid se renderizan solos en MPE: no hay paso de exportar ni pegar imágenes.
