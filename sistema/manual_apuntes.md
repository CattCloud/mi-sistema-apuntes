# 📘 Manual de Estilo — Tesla

> **Versión:** 3.0 (md-nativa)
> **Última actualización:** 8 de Junio, 2026
> **Reemplaza a:** v2.0 (orientada a Notion), respaldada en `_manual_apuntes_v2_notion.md`
> **Fuente de las decisiones:** `decisiones/decision_final_md_local.md` (D1–D4)
> **Propósito:** Referencia única de cómo deben **leerse, sonar y estructurarse** los apuntes, ahora que viven como `.md` en el repo (no en Notion).

---

## Cómo usar este manual

El destino de los apuntes cambió: ya **no se pegan en Notion**, viven como `.md` en el repo y se leen en VSCode/Antigravity (Markdown Preview Enhanced). El norte es **facilitar la lectura y la redacción en markdown**. Todo lo que antes era andamiaje de Notion (toggles, colores de heading, callouts `:::`) se reemplazó por su equivalente md-nativo o se soltó.

Secciones:

1. **Reglas Invariables** — el ADN, lo que siempre se cumple.
2. **Formato visual md-nativo** — jerarquía, quotes, callouts, código, tablas.
3. **Voz y Tono** — cómo suena la redacción (sin cambios respecto a v2).
4. **Arquetipos** — las 4 plantillas base y sus combinaciones.
5. **Diagramas** — ASCII y Mermaid (ahora nativo).
6. **Patrones de Síntesis** — cómo se procesa y reescribe la información.
7. **Estructura del apunte** — archivos, índice, frontmatter, estados.
8. **Checklist de validación.**

---

## 1. Reglas Invariables

Patrones que se mantienen en **todas** las notas, sin importar tema, workspace o arquetipo.

### 1.1 Un apunte = varios archivos (la densidad se maneja partiendo, no plegando)

En Notion la densidad se escondía en toggles. Aquí **cada sección vive en su propio archivo `.md`**. Eso mantiene cada archivo corto, enfocado y fácil de leer/editar. No hay toggles: la jerarquía la dan los encabezados dentro del archivo y el split entre archivos.

- 1 archivo = 1 sección de nivel **H2** del apunte (sus subsecciones H3 viven dentro).
- Excepción: agrupar 2 secciones muy cortas y relacionadas si separarlas crea archivos triviales.
- Cada archivo de sección **abre con `#`** (es el título de ese archivo) y usa `##`/`###` para subsecciones.

### 1.2 Quote-gancho inmediatamente después de cada heading

La **primera pieza de contenido** tras cualquier heading que abre sección o subsección es siempre un quote (`>`) con la definición o concepto central. La primera línea del quote va en **negrita**.

```markdown
# ¿Qué es Cloud Computing?

> **Cloud Computing es un modelo de entrega de servicios bajo demanda.**
>
> En lugar de comprar servidores, alquilas capacidad según la necesitas.
```

Para separar definición de contexto dentro del mismo quote, usar una **línea de quote vacía** (`>` solo). Nunca hay contenido entre el heading y el quote: es inmediato. El quote actúa como **gancho conceptual** — la esencia de la sección en 1-2 líneas.

### 1.3 Sin preámbulo, sin conclusión

- Cada archivo de sección empieza directamente con su `#` y su quote. No hay párrafo introductorio.
- El apunte termina cuando se agota el contenido. No hay sección de "Conclusión", "Resumen" ni "Próximos pasos".
- Único bloque permitido al cierre del índice: **Fuentes** (links).

### 1.4 Reescritura total

Nada lee como copia de documentación oficial o textbook. Todo está procesado a través de la pregunta: *"¿Cómo explicaría esto a alguien (o a mí mismo) de forma que lo entienda realmente?"* Definiciones personalizadas, ejemplos creativos, flujo didáctico.

### 1.5 Spanglish controlado

Los tecnicismos fundamentales permanecen en inglés (Working Directory, Access Token, Scope, tool calling, query loop, etc.). Las explicaciones y el contexto van siempre en español. Cada palabra en inglés tiene estatus técnico específico; no es caótico, es estratégico.

---

## 2. Formato visual (md-nativo)

### 2.1 Jerarquía y la identidad del workspace

La jerarquía se expresa con **encabezados estándar** + el **split por archivos**:

- `#` — título de la sección (uno por archivo).
- `##` — subsección.
- `###` — sub-subsección (ocasional, si la complejidad lo pide).

**Identidad del workspace:** ya **no se usan colores** de heading (eran de Notion y no se ven en md). La identidad la dan **la carpeta del workspace** (`apuntes/ia/…`) y **el emoji** del workspace en el `#` del título y en el índice.

| Workspace | Emoji |
|-----------|-------|
| IA / LLMs | 🤖 |
| Cloud Computing | 💭 |
| Code 301 (Full Stack) | 🦉 |
| CSS | 🎨 |
| GIT | 🐙 |
| JavaScript | 🐤 |
| Node.js | 🐶 |

Para un workspace nuevo: asignar un emoji conceptual que represente el dominio.

### 2.2 Quotes (el gancho)

Posición invariable: inmediatamente después del heading. Blockquote nativo de markdown.

```markdown
> **Definición central en negrita.**
>
> Contexto adicional o aclaración en la misma voz.
```

- Primera línea siempre en **negrita**.
- Para separar ideas dentro del quote: línea de quote vacía (`>` solo).

### 2.3 Callouts → blockquote con emoji + label

Los callouts de Notion (`:::💡`) se reemplazan por un **blockquote con emoji y label en negrita**. Renderiza limpio en MPE, en el preview nativo, en GitHub Pages y en el editor — sin depender de plugins.

```markdown
> 💡 **Tip:** preferir `const` salvo que necesites reasignar.

> ⚠️ **Importante:** este token expira en 30 minutos.

> 🎯 **Idea clave:** el modelo pide, el sistema ejecuta.
```

Emojis/labels sugeridos (no forzar uno en cada bloque, usar según el contenido):

- 💡 **Tip** — consejo, atajo, buena práctica.
- ⚠️ **Importante / Cuidado** — advertencia, error común.
- 🎯 **Idea clave** — el núcleo que hay que retener.
- 🔑 **Matiz** — distinción fina, excepción.
- 📝 **Nota** — aclaración secundaria.

### 2.4 Código → fenced code blocks

Bloques de código estándar con su lenguaje. Ya **no** van envueltos en callouts.

````markdown
**Sintaxis:**

```js
const [nombre] = [valor]
```

**Ejemplo:**

```js
const saludo = "hola" // valor que no se reasignará
```
````

- Secuencia: sintaxis abstracta primero → ejemplo práctico después (etiquetado **Ejemplo**).
- Comentarios extensivos dentro del código cuando aclaran el porqué.
- Para diagramas ASCII usar ```` ```text ```` (no es código de programación).

### 2.5 Tablas

Tablas markdown nativas. El editor las **re-padea/alinea** al guardar — esa forma alineada es la **canónica** (escribirlas ya alineadas evita ruido en git).

- Para comparativas con 3+ categorías, agregar **leyenda emoji**: `🔵 = X · 🔴 = Y · 🟡 = Z`.
- Cuando dos conceptos piden comparación directa, la tabla es preferible a apilar párrafos.

### 2.6 Emojis

- **En títulos:** sí. El emoji del workspace precede al título de la sección.
- **En callouts:** sí (son parte del label).
- **En tablas comparativas:** 🔵🔴🟡 como leyenda.
- **En formato Mito/Realidad:** ❌ y ✅.
- **Dentro de párrafos de texto corrido:** NO. Los emojis nunca aparecen dispersos en la prosa.

### 2.7 Listas

- Marcador canónico: **`-`** (guion). Consistencia en todo el apunte.
- **Las listas reducen fricción:** cuando una explicación tiene ítems paralelos (causas, características, pasos no secuenciales, condiciones), preferir lista sobre párrafo. Mejora el escaneo al releer semanas después.
- **Cuándo lista:** 3+ ítems comparables, el orden importa poco, cada ítem se lee independiente.
- **Cuándo párrafo:** secuencia argumentativa con conectores ("primero… entonces… por eso…"), solo 1-2 ítems, o cuando partir rompería el hilo de una idea.

---

## 3. Voz y Tono

### 3.1 Persona gramatical

| Contexto | Persona | Ejemplo |
|----------|---------|---------|
| Definiciones y quotes | Impersonal / 3ra persona | "Es un protocolo de autorización" |
| Explicaciones | 1ra plural inclusiva | "Vamos a ver", "podemos utilizar" |
| Instrucciones directas | 2da persona informal (tú) | "Debes recordar", "Imagina que tu código" |

### 3.2 Nivel de formalidad

**Didáctico-casual.** Como un tutor amable explicando a un estudiante: ni académico (evita jerga innecesaria) ni demasiado informal (mantiene claridad). Equilibra accesibilidad con precisión técnica.

### 3.3 Muletillas y conectores característicos

Usar con naturalidad: *"En otras palabras"*, *"En términos simples"*, *"Es decir"*, *"Debes recordar que"*, *"Se utiliza para…"*, *"Se usa frecuentemente para…"*, y la etiqueta **"Ejemplo"** para abrir ejemplos.

### 3.4 Preguntas retóricas

Muy presentes. Tres funciones: (1) marcadores de sección como heading (*"¿Qué significa?"*, *"¿Cómo llega a este estado?"*), (2) ganchos didácticos antes de explicar (*"¿Por qué necesitamos el DOM?"*), (3) formato visual.

### 3.5 Patrón "Dolor / Problema que resuelve"

**Patrón clave del estilo.** Antes de explicar qué es algo, explicar **por qué lo necesitas**. Secuencia: (1) ¿Qué problema/dolor existe? → (2) ¿Qué es? → (3) ¿Cómo funciona? → (4) Detalles y ejemplos.

### 3.6 Formato "Mito / Realidad"

Cuando el tema tiene concepciones erróneas comunes (tecnologías con hype, conceptos que se confunden):

```markdown
❌ **Mito:** "Los LLMs entienden lo que dicen."
✅ **Realidad:** Los LLMs predicen la siguiente palabra más probable según patrones estadísticos.
```

Aparece al inicio de secciones para desmontar ideas falsas antes de la explicación real.

---

## 4. Arquetipos de Notas

Existen 4 arquetipos base. En notas avanzadas **se combinan**. El tema dicta la combinación.

### 4.1 El Constructor Teórico

**Cuándo:** definir de cero un concepto, lenguaje, paradigma o elemento.
**Estructura:** ¿Qué es X? → Tipos/Clasificaciones → Detalles de cada tipo.
**Secuencia:** heading con pregunta → quote (definición) → lista de características → callout de casos de uso → subsecciones por tipo (cada una con su quote).

### 4.2 El Sintaxis Coder

**Cuándo:** enseñar a usar un comando, propiedad, método o herramienta.
**Estructura:** Intro → Categoría → Sintaxis → Ejemplo → Resultado.
**Secuencia:** heading del atributo → quote (qué soluciona) → bloque **Sintaxis** (código abstracto) → bloque **Ejemplo** (código real) → resultado/diagrama.

### 4.3 El Flujo Analógico

**Cuándo:** flujos multi-paso, procesos complejos, lógica abstracta; hacer intuitivo algo abstracto.
**Estructura:** Conceptos/Áreas → Estados/Lifecycle → Analogía(s) extendida(s).
**Sobre las analogías:** escenarios cotidianos (hotel, restaurante, transporte, teatro, fotografía); múltiples analogías por nota, integradas en el flujo (no en sección aparte); cada una mapea componentes técnicos a elementos reales; señalar **dónde deja de funcionar** la analogía.

### 4.4 El Documento Técnico

**Cuándo:** protocolos, arquitecturas, comparaciones multi-dimensionales; donde tablas e información densa sirven más que la narrativa.
**Estructura:** ¿Qué es? → Tabla de características → Tabla comparativa → Flujo por fases → Diagrama.

### 4.5 Arquetipos híbridos

Las notas actuales **combinan arquetipos**. No forzar uno solo. Ejemplos: *¿Qué es Cloud Computing?* = Constructor + Flujo Analógico; *Modelos de Servicio* = Documento Técnico + Flujo Analógico; *Qué es LLMs?* = Constructor + Flujo Analógico + Desmitificación. Dejar que la naturaleza del tema dicte la combinación.

---

## 5. Diagramas

### 5.1 ASCII en ```` ```text ````

**Cuándo:** flujos lineales simples, árboles de decisión, comparaciones lado a lado, líneas de tiempo, fases.

```text
¿Necesitas control total del servidor?
├── SÍ → IaaS
└── NO → ¿Necesitas control del código?
    ├── SÍ → PaaS
    └── NO → SaaS
```

### 5.2 Mermaid nativo (ya no se genera SVG a mano)

**Gran simplificación respecto a Notion:** Markdown Preview Enhanced **renderiza Mermaid directamente**. El agente escribe el bloque ```` ```mermaid ```` y MPE lo muestra como diagrama. Ya no hay paso manual de generar SVG y pegar imágenes.

````markdown
```mermaid
sequenceDiagram
    Usuario->>App: login
    App->>AuthServer: credenciales
    AuthServer-->>App: access token
```
````

**Cuándo Mermaid:** flujos con múltiples actores, diagramas de secuencia (request/response), protocolos con bifurcaciones, arquitecturas de sistema.

**Posición:** siempre inmediatamente después de la explicación textual del flujo que representan.

### 5.3 Criterio de selección

| Situación | Usar |
|-----------|------|
| Flujo lineal A → B → C | ASCII |
| Árbol de decisión | ASCII |
| Comparación visual lado a lado | ASCII |
| Múltiples actores interactuando | Mermaid |
| Request/response bidireccional | Mermaid |
| Protocolo con bifurcaciones | Mermaid |
| Arquitectura de sistema | Mermaid |

---

## 6. Patrones de Síntesis

### 6.1 Densidad y extensión

No comprimir artificialmente. Si el tema lo requiere, la sección puede ser extensa. Pero la **densidad ahora se reparte entre archivos** (un archivo por sección), así que cada archivo individual se mantiene legible.

### 6.2 Criterio de selección

Favorecer definiciones que caben en una oración; priorizar comprensión sobre completitud; descomponer lo complejo en unidades simples; eliminar redundancia activamente.

### 6.3 Nivel de reescritura

**Muy alto.** Todo filtrado por *"¿cómo explicaría esto de forma que lo entienda realmente?"*. Definiciones personalizadas, ejemplos creativos, flujo didáctico (no enciclopédico).

### 6.4 Estrategia de descarte

| Se descarta | Por qué |
|------------|---------|
| Explicaciones teóricas largas | Se comprimen en 1 oración en negrita (el quote) |
| Casos extremos / edge cases | Van a notas separadas |
| Información repetida | Se consolida en tablas |
| Contexto histórico irrelevante | Se omite si no ayuda al aprendizaje |
| Disclaimers genéricos | Se eliminan (ruido) |

### 6.5 Aporte personal identificable

Analogías originales, puentes de reformulación ("Es decir" + explicación propia), tablas de comparación de estructura propia, callouts de juicio personal, y énfasis selectivo (qué va en negrita, quote o callout).

### 6.6 Definir términos donde se introducen

Si un término técnico aparece por primera vez en una sección, su definición va **en esa misma sección**, no como apéndice. Definición corta: inline en negrita. Definición media: en un quote inmediatamente después. Definición con ejemplos: en una subsección propia justo después del bloque donde aparece.

---

## 7. Estructura del apunte (md-nativo)

> Detalle completo en `decisiones/decision_final_md_local.md` (D1/D3). Resumen operativo:

### 7.1 Carpeta del apunte

```text
apuntes/[workspace]/[tema]/
├── 00_indice.md                ← ENTRADA: metadata + alcance + estado + secciones
├── 01_[slug-seccion].md        ← una sección H2 por archivo
├── 02_[slug-seccion].md
├── …
└── _input/                     ← material fuente (transcripciones, links), secundario
```

- Prefijos numéricos (`01_`, `02_`…) fijan el orden.
- `00_indice.md` sale primero: es la entrada y la **superficie de control** del apunte.

### 7.2 Frontmatter por sección

```yaml
---
tema: Claude Code — Arquitectura Interna
workspace: ia
seccion: 2
titulo: "El Query Loop"
estado: en progreso
prev: 01_filosofia.md
next: 03_tools.md
---
```

### 7.3 Navegación al pie de cada sección

Links clicables (wiki-links de Markdown Memo):

```markdown
---
[[01_filosofia|← anterior]] · [[00_indice|índice]] · [[03_tools|siguiente →]]
```

### 7.4 El `00_indice.md`

Cabecera con metadata (tema, workspace, arquetipo) + **estado del apunte** + **alcance** (incluye/excluye) + **lista ordenada de secciones con su estado** + **Fuentes**. Absorbe el rol del viejo `ESTADO.md`.

### 7.5 Estados de progreso

- **Apunte:** `EN PROGRESO` · `PAUSADO` (pospuesto a propósito, retomable) · `FINALIZADO`.
- **Sección (en el índice):** `⬜ pendiente` · `🔄 en progreso` · `✅ finalizada`.
- **Pausar** = marcar el apunte `PAUSADO` en el índice. **Retomar** = volver a `EN PROGRESO` y seguir desde la primera sección `⬜`. No hay checkpoint aparte: el índice es el checkpoint.

---

## 8. Checklist de validación

### Estructura
- [ ] ¿Cada sección H2 es su propio archivo, abriendo con `#`?
- [ ] ¿Hay un quote en negrita inmediatamente después de cada heading?
- [ ] ¿No hay preámbulo ni conclusión?
- [ ] ¿El `00_indice.md` lista las secciones con su estado?
- [ ] ¿Frontmatter + navegación prev/next en cada sección?

### Voz
- [ ] ¿Suena a tutor, no a enciclopedia?
- [ ] ¿"Nosotros" en explicaciones, impersonal en definiciones?
- [ ] ¿Tecnicismos en inglés, explicaciones en español?
- [ ] ¿Incluye muletillas características?
- [ ] ¿Nada lee como copia de documentación oficial?

### Contenido
- [ ] ¿Abre con "Dolor / Problema que resuelve" antes de definir?
- [ ] ¿Analogías integradas si el tema involucra procesos?
- [ ] ¿Mito/Realidad ❌✅ si hay concepciones erróneas?
- [ ] ¿Tablas con leyenda emoji si hay 3+ categorías?
- [ ] ¿Términos definidos donde se introducen?

### Formato md-nativo
- [ ] ¿Callouts como blockquote `> 💡 **Label:**`?
- [ ] ¿Código en fenced blocks con label Sintaxis/Ejemplo?
- [ ] ¿Listas con marcador `-`?
- [ ] ¿ASCII en ```` ```text ````, Mermaid en ```` ```mermaid ````?
- [ ] ¿Sin restos de Notion (toggles, `:::`, colores, columnas)?

### Diagramas
- [ ] ¿ASCII para flujos lineales/árboles; Mermaid para múltiples actores?
- [ ] ¿El diagrama va justo después de la explicación textual?

---

> **Esta es la versión definitiva md-nativa para el agente.**
> Lo que sobrevive de v2 (voz, arquetipos, síntesis) se conservó; lo Notion (toggles, colores, callouts `:::`, "pegar y convertir", columnas, SVG manual) se reemplazó o soltó.
