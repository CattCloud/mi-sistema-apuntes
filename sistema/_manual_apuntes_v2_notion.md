# 📘 Manual de Patrones de Estilo — Tesla

> **Versión:** 2.0 (Definitiva)
> **Última actualización:** 9 de Abril, 2026
> **Fuente:** Análisis de 11 notas reales en `analisis_patrones_apuntes.md`
> **Propósito:** Documento de referencia para que el agente genere apuntes que repliquen fielmente el estilo del usuario.

---

## Cómo Usar Este Manual

Este manual describe **cómo deben verse, sonar y estar estructurados** los apuntes generados. Está organizado en 7 secciones:

1. **Reglas Invariables** — Lo que SIEMPRE se cumple, sin excepción
2. **Sistema Visual** — Colores, emojis, bloques de Notion
3. **Voz y Tono** — Cómo suena la redacción
4. **Arquetipos** — Las 4 plantillas base y cómo se combinan
5. **Diagramas** — Cuándo usar ASCII vs Mermaid
6. **Patrones de Síntesis** — Cómo se procesa y reescribe la información
7. **Referencia Rápida** — Checklist para validar cualquier apunte generado

---

## 1. Reglas Invariables

Estos patrones se mantienen en **todas** las notas, independientemente del tema, workspace o arquetipo. Son el ADN del estilo.

### 1.1 Toggles en todo

Todo H2 y H3 es un toggle en Notion. Sin excepción. El contenido vive dentro de los toggles. La página se ve limpia por fuera y revela densidad al expandir.

**Sintaxis en el `.md`:** NO usar `{toggle="true"}` en el archivo — esa sintaxis se ve como texto literal en Obsidian (donde el usuario revisa). El `.md` final usa **Markdown estándar**. La conversión a toggles se hace manualmente al pegar en Notion: clic derecho en el heading → "Turn into" → "Toggle heading". Los colores de H2/H3 también se asignan desde Notion al pegar.

### 1.2 Quote inmediatamente después del toggle

La **primera pieza de contenido** dentro de cualquier toggle (H2 o H3) es siempre un quote (`>`) con la definición o concepto central. La primera línea del quote va en **negrita**. Para separar definición de contexto dentro del mismo quote, usar una línea de quote vacía (`>` solo) — NO usar `<br>` (se ve como texto literal en Obsidian).

```
## ¿Qué es Cloud Computing?

> **Cloud Computing es un modelo de entrega de servicios...**
>
> En lugar de comprar servidores, alquilas capacidad bajo demanda.
```

Nunca hay contenido entre el header del toggle y el quote. Es inmediato.

### 1.3 Sin preámbulo, sin conclusión

- La nota empieza directamente con el primer H2 toggle. No hay párrafo introductorio.
- La nota termina cuando se agota el contenido. No hay sección de "Conclusión", "Resumen" ni "Próximos pasos".

### 1.4 Reescritura total

Nada lee como copia de documentación oficial o textbook. Todo está procesado a través de la pregunta: *"¿Cómo explicaría esto a alguien (o a mí mismo) de forma que lo entienda realmente?"*

Las definiciones son personalizadas, los ejemplos son creativos, el flujo es didáctico.

### 1.5 Spanglish controlado

Los tecnicismos fundamentales permanecen en inglés: Working Directory, Staging Area, Scope, Access Token, Refresh Token, IaaS, PaaS, SaaS, etc. Las explicaciones y contexto van siempre en español. Esto no es caótico — es estratégico. Cada palabra en inglés tiene estatus técnico específico.

---

## 2. Sistema Visual

### 2.1 Identidad Cromática por Workspace

Cada workspace tiene su propia combinación de colores. El H2 actúa como identidad del área temática.

| Workspace | Emoji | Color H2 | Color H3/Sub |
|-----------|-------|----------|--------------|
| CSS | 🎨 | Rojo (`red`) | Azul (`blue`) |
| GIT | 🐙 | Rojo (`red`) | Azul (`blue`) |
| JavaScript | 🐤 | Rojo (`red`) | Azul (`blue`) |
| Node.js | 🐶 | Marrón (`brown`) | Azul (`blue`) |
| Cloud Computing | 💭 | Azul (`blue`) | Rojo (`red`) |
| IA / LLMs | 🤖 | Rosa (`pink`) | Rojo (`red`) |
| Code 301 (Full Stack) | 🦉 | Marrón (`brown`) | Naranja (`orange`) |

**Para nuevos workspaces:** Asignar un color H2 único que no colisione con los existentes. El emoji del workspace se coloca antes del título de la nota.

**Evolución de emojis:** Los workspaces antiguos usaban emojis temáticos/divertidos (🎨🐙🐤🐶). Los actuales usan emojis conceptuales que representan el dominio (💭 nube para Cloud, 🤖 robot para IA, 🦉 búho para Full Stack). Para nuevos workspaces, preferir emojis conceptuales.

### 2.2 Niveles de Profundidad

Las notas utilizan 3-4 niveles de profundidad jerárquica:

- **Nivel 1 (H2):** Tema principal — toggle con color de workspace
- **Nivel 2 (H3):** Subtemas específicos — toggle con color secundario
- **Nivel 3:** Contenido dentro del toggle (quotes, callouts, listas, diagramas)
- **Nivel 4 (ocasional):** Sub-subtemas cuando la complejidad lo requiere

### 2.3 Callouts

Los callouts (`:::`) son contenedores de información secundaria o de énfasis.

**Uso histórico (workspaces antiguos):**
- 💡 amarillo (`yellow_bg`) — ~90% de los callouts. Ejemplos, sintaxis, tips, reglas.
- Naranja (`orange_bg`) — ~10%. Bloques de código, info menos prominente.
- Ocasionalmente anidados: orange contiene un 💡 yellow.

**Uso actual (workspaces nuevos):**
- Más variados y simples. A veces sin icono ni color de fondo específico.
- Se usan como contenedores funcionales, no siempre como elementos de énfasis.
- La función de "atención visual" la comparten ahora con diagramas ASCII y tablas.

**Regla:** No forzar 💡 amarillo en cada callout. Usar según necesidad del contenido.

### 2.4 Quotes

Posición invariable: inmediatamente después del header H2 o H3.

```
> **Definición central en negrita**
>
> Contexto adicional o aclaración
```

- Primera línea siempre en **negrita**
- Para separar ideas dentro del quote, usar línea de quote vacía (`>` solo). NO usar `<br>`.
- Ocasionalmente contiene spans subrayados para énfasis
- Actúa como **gancho conceptual** — la esencia de la sección en 1-2 líneas

### 2.5 Emojis

- **En títulos de página:** Siempre. El emoji del workspace precede al título.
- **En callouts:** 💡 como icono principal (especialmente en workspaces antiguos).
- **En tablas comparativas:** 🔵🔴🟡 como leyenda de categorías.
- **En formato Mito/Realidad:** ❌ y ✅.
- **Dentro de párrafos:** NO. Los emojis nunca aparecen dispersos en texto corrido.

### 2.6 Código

**En workspaces de programación (CSS, JS, Node, Code 301):**
- Siempre dentro de callouts 💡 o naranja
- Secuencia: sintaxis abstracta primero → ejemplo práctico después (etiquetado "**Ejemplo**")
- Comentarios extensivos dentro del código: `/* ¿Qué hace esto? ¿Por qué? */`

**En workspaces conceptuales (Cloud, IA):**
- Bloques `plain text` para diagramas ASCII (no es código de programación)
- Code blocks estándar para fragmentos técnicos cuando aplica

---

## 3. Voz y Tono

### 3.1 Persona Gramatical

Se mezclan estratégicamente tres personas:

| Contexto | Persona | Ejemplo |
|----------|---------|---------|
| Definiciones y quotes | Impersonal / 3ra persona | "Es un protocolo de autorización" |
| Explicaciones | 1ra plural inclusiva ("nosotros") | "Vamos a ver", "podemos utilizar" |
| Instrucciones directas | 2da persona informal (tú) | "Debes recordar", "Imagina que tu código" |

### 3.2 Nivel de Formalidad

**Didáctico-casual.** Como un tutor amable explicando a un estudiante:
- No es académico (evita jerga innecesaria)
- No es demasiado informal (mantiene claridad)
- Equilibra accesibilidad con precisión técnica

### 3.3 Muletillas y Conectores Característicos

Estas frases aparecen consistentemente y le dan "voz propia" a los apuntes:

| Frase | Función |
|-------|---------|
| "En otras palabras" | Reformulación para claridad |
| "En términos simples" | Simplificación de conceptos complejos |
| "Es decir" | Conector frecuente entre ideas |
| "Debes recordar que" | Énfasis en información clave |
| "Importante:" | Flag visual en callouts |
| "Se utiliza para..." | Explicación de propósito |
| "Se usa frecuentemente para..." | Uso común |
| "**Ejemplo**" | Etiqueta de inicio de sección de ejemplo |

### 3.4 Preguntas Retóricas

Muy presentes. Cumplen tres funciones:

1. **Marcadores de sección:** "¿Qué significa?" / "¿Cómo llega a este estado?" como headers H3
2. **Ganchos didácticos:** "¿Por qué necesitamos el DOM?" — provocan reflexión antes de la explicación
3. **Formato visual:** A menudo con spans azules subrayados

### 3.5 Patrón "Dolor/Problema que resuelve"

**Este es un patrón clave del estilo actual.** Antes de explicar qué es algo, se explica **por qué lo necesitas**.

Secuencia:
1. ¿Qué problema existe? / ¿Qué dolor resuelve esto?
2. ¿Qué es?
3. ¿Cómo funciona?
4. Detalles y ejemplos

Ejemplos reales:
- Cloud Computing: abre con "el problema de tener servidores propios"
- Modelos de Servicio: abre con "el dolor de gestionar infraestructura"
- Tokenización: sección explícita "Dolor que resuelve"
- OAuth2: sección "Problema que resuelve OAuth2"

### 3.6 Formato "Mito / Realidad"

Cuando el tema tiene concepciones erróneas comunes (tecnologías con mucho hype, conceptos que se confunden frecuentemente):

```
❌ Mito: "Los LLMs entienden lo que dicen"
✅ Realidad: Los LLMs predicen la siguiente palabra más probable basándose en patrones estadísticos
```

Aparece al inicio de secciones para desmontar ideas falsas antes de la explicación real.

---

## 4. Arquetipos de Notas

Existen 4 arquetipos base. En notas avanzadas, **se combinan** (arquetipos híbridos). El tema dicta la combinación.

### 4.1 El Constructor Teórico

**Cuándo usarlo:** Para definir de cero un concepto, lenguaje, paradigma o elemento.

**Estructura:**
```
¿Qué es X? → Tipos / Clasificaciones → Detalles de cada tipo
```

**Secuencia de bloques:**
1. H2: Pregunta inicial con toggle (¿Qué es X?)
2. Quote: Definición en 1-2 líneas en negrita
3. Lista de características rápidas
4. Callout 💡: Casos de uso / Para qué sirve
5. H3s: Tipos o categorías principales (cada uno con su quote + contenido)

**Notas modelo:** "Que es CSS y como usarlo?", "Introducción: DOM", "¿Qué es Cloud Computing?"

### 4.2 El Sintaxis Coder

**Cuándo usarlo:** Para enseñar a usar un comando, propiedad, método o herramienta específica.

**Estructura:**
```
Intro → Categoría → Subcategoría con Sintaxis → Ejemplo → Screenshot/Resultado
```

**Secuencia de bloques:**
1. H3: Atributo/método a estudiar (toggle)
2. Quote: Qué soluciona exactamente
3. Callout 💡: **Sintaxis** — código abstracto
4. Callout 💡: **Ejemplo** — código real funcional
5. Captura de pantalla del resultado (o diagrama si aplica)

**Nota modelo:** "Selectores CSS"

### 4.3 El Flujo Analógico

**Cuándo usarlo:** Para flujos de trabajo multi-paso, procesos complejos, lógica abstracta. Siempre que el tema requiera hacer intuitivo algo abstracto.

**Estructura:**
```
Conceptos/Áreas → Estados/Lifecycle → Analogía(s) extendida(s)
```

**Secuencia de bloques:**
1. H2: Concepto del flujo
2. Explicación de las áreas/estados involucrados
3. Analogía(s) integradas en la explicación (ver sección de analogías abajo)
4. Diagrama de flujo (ASCII o Mermaid según complejidad)
5. Síntesis visual

**Sobre las analogías:**
- Usar escenarios cotidianos accesibles (hotel, restaurante, transporte, teatro, fotografía)
- En notas actuales: **múltiples analogías por nota**, integradas en el flujo (no en sección aparte)
- Cada analogía mapea componentes técnicos a elementos de la vida real
- Pueden usarse en serie para construir comprensión progresiva de un mismo concepto

**Analogías reales del usuario:**
- GIT: "Camarógrafo y sesión de fotos" (backstage → escena → posando → foto tomada)
- Node.js: "Actor de teatro" (código = actor, runtime = escenario)
- Cloud: "Hotel" (shared hosting), "Auto propio vs Uber" (on-premise vs cloud), "Electricidad" (servidores propios vs red)
- IaaS/PaaS/SaaS: "Cocinar en casa vs pedir delivery vs ir al restaurante"
- LLMs: "Consultor Junior con Traje Caro", "Pianista prodigio ciego", "Chinese Room", "Auto-completado del teléfono"

**Nota modelo:** "Ciclo de Vida de un archivo GIT", "¿Qué es Cloud Computing?"

### 4.4 El Documento Técnico

**Cuándo usarlo:** Para protocolos, arquitecturas, comparaciones multi-dimensionales, temas donde la información densa y las tablas son más útiles que la narrativa.

**Estructura:**
```
¿Qué es? → Tabla de características → Tabla comparativa → Flujo por fases → Diagrama
```

**Secuencia de bloques:**
1. H2: Definición del protocolo/arquitectura
2. Quote: Síntesis en 1-2 líneas
3. Tablas como estructura principal (características, comparaciones, estados)
4. Procesos por fases: "Paso 1, Paso 2..." o "FASE 1, FASE 2..."
5. Diagrama Mermaid para flujos complejos con múltiples actores
6. Callout con contexto "big picture"

**Notas modelo:** "Introducción a NODE.js", "Modelos de Servicio: IaaS, PaaS, SaaS", "El Protocolo OAuth2"

### 4.5 Arquetipos Híbridos (Estilo Actual)

Las notas del estilo actual **combinan arquetipos**. No forzar uno solo por nota.

| Nota | Combinación |
|------|-------------|
| ¿Qué es Cloud Computing? | Constructor Teórico + Flujo Analógico |
| Modelos de Servicio | Documento Técnico + Flujo Analógico |
| Que es LLMs? | Constructor Teórico + Flujo Analógico + Desmitificación |
| Tokenización | Documento Técnico (pragmático) |
| El Protocolo OAuth2 | Flujo Analógico + Documento Técnico |

**Regla:** Dejar que la naturaleza del tema dicte la combinación. Temas conceptuales nuevos con procesos complejos serán naturalmente híbridos.

---

## 5. Diagramas

Los diagramas son fundamentales cuando el tema involucra flujos, procesos o interacciones entre componentes. Hay dos tipos según la complejidad.

### 5.1 Diagramas ASCII en `plain text`

**Cuándo:** Flujos lineales simples, árboles de decisión, comparaciones lado a lado, líneas de tiempo.

Se escriben directamente en la nota dentro de bloques ` ```plain text ``` `.

**Árbol de decisión:**
```plain text
¿Necesitas control total del servidor?
├── SÍ → IaaS
└── NO → ¿Necesitas control del código?
    ├── SÍ → PaaS
    └── NO → SaaS
```

**Comparación lado a lado:**
```plain text
SIN CLOUD                    CON CLOUD
┌─────────────┐             ┌─────────────┐
│ Tu servidor │             │   AWS/GCP   │
│ Tu mantenim.│             │  Ellos lo   │
│ Tu problema │             │  mantienen  │
└─────────────┘             └─────────────┘
```

**Flujo por fases:**
```plain text
FASE 1: LOGIN
Usuario → Login → Authorization Server
         ↓
Emite: Access Token (30 min) + Refresh Token (30 días)
         ↓
FASE 2: USO NORMAL
App usa Access Token para llamar APIs
```

**Tablas con leyenda emoji:**
```plain text
🔵 = Tú gestionas    🔴 = El proveedor gestiona    🟡 = Compartido
```

### 5.2 Diagramas Mermaid → SVG

**Cuándo:** Flujos con múltiples actores, diagramas de secuencia (request/response), protocolos con bifurcaciones, arquitecturas de sistema.

El agente genera el código Mermaid, lo renderiza como SVG y lo inserta en la nota.

**Tipos de diagramas Mermaid usados:**
- **Diagramas de flujo (flowchart):** Para procesos de autorización, decision flows
- **Diagramas de secuencia (sequenceDiagram):** Para interacciones entre actores (Usuario ↔ App ↔ Auth Server ↔ Resource Server)
- **Diagramas de arquitectura:** Para mostrar cómo se conectan componentes de un sistema

**Posición:** Siempre inmediatamente después de la explicación textual del flujo que representan.

**Caso real — OAuth2:** 10 diagramas Mermaid en una sola nota, cubriendo cada flujo de autorización, validación de tokens, y comparación entre grant types.

**Nota sobre automatización:** Actualmente el usuario genera estos diagramas manualmente (IA genera código Mermaid → usuario pega en editor → descarga SVG → inserta en Notion). El agente debe automatizar este paso: generar el código Mermaid Y el SVG renderizado directamente.

**Criterio de selección:**

| Situación | Usar |
|-----------|------|
| Flujo lineal A → B → C | ASCII |
| Árbol de decisión | ASCII |
| Comparación visual | ASCII |
| Múltiples actores interactuando | Mermaid |
| Request/response bidireccional | Mermaid |
| Protocolo con bifurcaciones | Mermaid |
| Arquitectura de sistema | Mermaid |

---

## 6. Patrones de Síntesis

### 6.0 Densidad y Extensión

Las notas actuales son significativamente más largas y densas que las antiguas. Esto no es un defecto — refleja temas más complejos (Cloud, IA, protocolos) y mayor madurez editorial.

**Regla:** No comprimir artificialmente. Si el tema lo requiere, la nota puede y debe ser extensa. La densidad es aceptable siempre que esté bien estructurada con toggles. Los toggles mantienen la página limpia aunque el contenido sea masivo.

**Recurso adicional — Columnas (column_list):** Cuando dos conceptos necesitan comparación directa visual, se pueden usar columnas lado a lado en Notion, además de tablas. Observado en notas de IA.

### 6.1 Criterio de Selección

- Se favorecen definiciones que se expresan en una oración
- Se prioriza comprensión sobre completitud
- Los conceptos complejos se descomponen en unidades simples
- La redundancia se elimina activamente

### 6.2 Nivel de Reescritura

**Muy alto.** Nada lee como copia. Todo está filtrado por:

> "¿Cómo explicaría esto de forma que lo entienda realmente?"

Indicadores: definiciones personalizadas, ejemplos creativos, flujo didáctico (no enciclopédico).

### 6.3 Fusión de Fuentes

El usuario sintetiza información de múltiples fuentes (ChatGPT, Gemini, Claude, documentación, cursos) en una narrativa coherente:

1. **Definición conceptual** (de documentación o fuentes oficiales)
2. **Caso de uso práctico** (de tutoriales o experiencia)
3. **Analogía o reformulación personal** (creación propia)
4. **Ejemplo concreto** (síntesis de lo anterior)

El resultado tiene una **capa de análisis personal** evidente.

### 6.4 Estrategia de Descarte

| Se descarta | Razón |
|------------|-------|
| Explicaciones teóricas largas | Se comprimen en 1 oración en negrita (el quote) |
| Casos extremos o edge cases | Se guardan para notas separadas |
| Información repetida | Se consolida en tablas de comparación |
| Contexto histórico irrelevante | Se omite si no ayuda al aprendizaje |
| Alternativas genéricas | Se selecciona la opción más clara |

### 6.5 Aporte Personal Identificable

1. **Analogías originales** — Creaciones propias, no encontradas en documentación
2. **Puentes de reformulación** — "Es decir" + explicación alternativa personal
3. **Tablas de comparación** — Estructura propia que sintetiza info dispersa
4. **Callouts de advertencia** — "No es recomendable usar var" — juicio personal
5. **Énfasis selectivo** — Qué va en negrita, qué en callout, qué en quote — decisiones editoriales personales

---

### 6.6 Listas Reducen Fricción

Cuando una explicación contenga **ítems paralelos** (causas, características, ejemplos, pasos no secuenciales, condiciones), **preferir lista sobre párrafo**. La lista reduce fricción de lectura y mejora el escaneo visual cuando el usuario relee el apunte semanas después.

**Cuándo lista:**

- Tres o más ítems comparables o paralelos.
- El orden no importa demasiado (o es opcional).
- Cada ítem se puede leer de forma independiente.

**Cuándo párrafo (no forzar lista):**

- Una secuencia argumentativa que necesita conectores ("primero... entonces... por eso...").
- Solo 1-2 ítems (no justifica el formato).
- Cuando partir en lista rompería el hilo narrativo de una idea.

**Origen:** Validado durante el apunte de Claude Code (Sección 1). El usuario corrigió un párrafo de "los modelos aprendieron a X, a Y, a Z, a W" pidiendo que fuera lista. Aplica desde entonces como patrón por defecto.

---

### 6.7 Definir Términos Donde Se Introducen

Si un término técnico aparece por primera vez en una sección, **su definición va en esa misma sección**, no como apéndice al final del apunte. Forzar al lector a saltar al final para entender un término rompe la lectura lineal y se siente como "regreso de tiempo".

**Cómo:**

- Definición corta (1-2 oraciones): inline en el párrafo con `**negrita**`.
- Definición media (3-5 líneas): en un quote `>` inmediatamente después del párrafo donde se introduce.
- Definición que necesita ejemplos o contexto extra: en un H3 propio (ej. `### 💡 Contexto: ¿qué es X?`) **inmediatamente después** del bloque donde aparece, no al final de la sección.

**Origen:** Validado durante el apunte de Claude Code (Sección 1). El usuario corrigió que el bloque "¿qué es el sistema?" estaba al final de la sección cuando el término aparecía en el primer punto. Se movió al sitio natural.

**Excepción:** Términos que aparecen mencionados de pasada sin ser centrales para entender el párrafo pueden ir a un glosario aparte. Pero por defecto, definir donde se introducen.

---

## 7. Referencia Rápida — Checklist de Validación

Usar este checklist para verificar que cualquier apunte generado cumple con el estilo:

### Estructura
- [ ] ¿Todo H2 y H3 es toggle?
- [ ] ¿Hay un quote inmediatamente después de cada toggle?
- [ ] ¿La primera línea del quote es en negrita?
- [ ] ¿No hay preámbulo antes del primer H2?
- [ ] ¿No hay sección de conclusión o resumen final?
- [ ] ¿Los colores de H2/H3 corresponden al workspace?

### Voz
- [ ] ¿Suena a tutor explicando, no a enciclopedia?
- [ ] ¿Usa "nosotros" en explicaciones, impersonal en definiciones?
- [ ] ¿Los tecnicismos están en inglés, las explicaciones en español?
- [ ] ¿Incluye muletillas características ("Es decir", "En otras palabras")?
- [ ] ¿Nada lee como copia de documentación oficial?

### Contenido
- [ ] ¿Abre con "Dolor/Problema que resuelve" antes de definir? (estilo actual)
- [ ] ¿Tiene analogías integradas si el tema involucra procesos?
- [ ] ¿Usa formato ❌ Mito / ✅ Realidad si hay concepciones erróneas comunes?
- [ ] ¿Las tablas comparativas tienen leyenda emoji si hay 3+ categorías?

### Diagramas
- [ ] ¿Usa ASCII para flujos lineales y árboles de decisión?
- [ ] ¿Usa Mermaid → SVG para flujos con múltiples actores o secuencias complejas?
- [ ] ¿Los diagramas están posicionados justo después de la explicación textual?

### Arquetipos
- [ ] ¿El arquetipo (o combinación) es apropiado para el tema?
- [ ] ¿Se permite hibridación si el tema lo requiere?

---

> **Este manual es la versión definitiva para el agente.**
> Fuente de verdad: `analisis_patrones_apuntes.md` (T2)
> Próximo paso: T4 (Definir estructura de carpetas del repositorio)
