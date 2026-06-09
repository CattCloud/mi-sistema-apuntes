# P2: Definición del Esqueleto / Estructura del Apunte

> **Fase:** 2 de 4 del flujo de generación de apuntes  
> **Input:** Output de P1 (tema identificado, alcance, workspace, arquetipo)  
> **Output:** Jerarquía de headings (H2/H3) con indicaciones de contenido por sección  
> **Checkpoint:** El usuario confirma el esqueleto antes de pasar a Fase 3 (Prompts)

---

## Instrucciones para el Agente

Tienes un tema identificado, su alcance definido, un workspace asignado y un arquetipo sugerido (todo esto viene de P1). Tu trabajo es **construir la jerarquía de headings** que tendrá el apunte.

Cada **H2 del esqueleto será un archivo de sección** (`01_`, `02_`…) que abre con `#`; cada **H3 será una subsección** (`##`) dentro de ese archivo (ver `manual_apuntes.md` §1.1 y §7).

**Antes de empezar:** Lee `manual_apuntes.md` — secciones 1 (Reglas Invariables), 2 (Formato visual md-nativo) y 4 (Arquetipos). Estos son tu marco de referencia.

**Principios:**
- El esqueleto es una propuesta, no un dictado. El usuario puede reordenar, agregar o quitar secciones.
- Cada heading debe justificar su existencia. Si no aporta, no va.
- El orden de los headings sigue una lógica didáctica: de lo más básico a lo más complejo, de lo conceptual a lo práctico.
- Nunca incluir una sección de "Introducción", "Conclusión", "Resumen" ni "Próximos pasos" (Regla 1.3 del manual).

---

## Paso 1: Leer el Output de P1

Abre el `00_indice.md` de la carpeta del apunte activo en `apuntes/[workspace]/[tema]/`. Extrae:

| Campo | Para qué lo usas |
|-------|-------------------|
| Tema | Define el alcance general del esqueleto |
| Alcance (incluye/excluye) | Limita qué secciones son válidas |
| Arquetipo | Determina la estructura base a seguir |
| Workspace | El emoji del workspace precede al título de cada sección |

---

## Paso 2: Seleccionar la Estructura Base según Arquetipo

Cada arquetipo tiene un patrón de headings natural. Usa estos como **punto de partida**, no como camisa de fuerza.

### Constructor Teórico

```
H2: ¿Qué es [X]? / ¿Qué problema resuelve [X]?
H2: [Concepto central o clasificación principal]
  H3: [Tipo/categoría A]
  H3: [Tipo/categoría B]
  H3: [Tipo/categoría C]
H2: [Aspecto secundario relevante]
  H3: [Detalle A]
  H3: [Detalle B]
```

**Lógica:** Va de lo general a lo particular. Abre con la pregunta que motiva aprender el tema, luego desglosa.

**Notas reales de referencia:** "¿Qué es CSS?", "Introducción: DOM", "¿Qué es Cloud Computing?"

---

### Sintaxis Coder

```
H2: [Categoría de herramientas/propiedades A]
  H3: [Herramienta/propiedad específica 1]
  H3: [Herramienta/propiedad específica 2]
  H3: [Herramienta/propiedad específica 3]
H2: [Categoría de herramientas/propiedades B]
  H3: [Herramienta/propiedad específica 4]
  H3: [Herramienta/propiedad específica 5]
```

**Lógica:** Agrupado por categoría funcional. Cada H3 es una unidad autónoma (sintaxis + ejemplo). No necesita pregunta de apertura — el usuario ya sabe qué es, viene a aprender cómo se usa.

**Nota real de referencia:** "Selectores CSS"

---

### Flujo Analógico

```
H2: ¿Qué problema resuelve [X]? / ¿Por qué necesitamos [X]?
H2: ¿Qué es [X]?
H2: [Fase/Etapa 1 del flujo]
  H3: [Componente o detalle de la fase]
H2: [Fase/Etapa 2 del flujo]
  H3: [Componente o detalle de la fase]
H2: [Fase/Etapa N del flujo]
H2: [Visión completa / Diagrama general] (opcional)
```

**Lógica:** Abre con el dolor/problema, define, luego recorre el flujo paso a paso. Las analogías se integran dentro de las fases, no en sección aparte.

**Notas reales de referencia:** "Ciclo de Vida de un archivo GIT", "¿Qué es Cloud Computing?"

---

### Documento Técnico

```
H2: ¿Qué es [X]? / Problema que resuelve [X]
H2: [Componentes / Roles / Actores del sistema]
  H3: [Componente A]
  H3: [Componente B]
H2: [Proceso / Flujo principal]
  H3: [Fase 1]
  H3: [Fase 2]
H2: [Comparativa / Tipos / Variantes]
  H3: [Variante A vs Variante B]
H2: [Consideraciones avanzadas] (si el alcance lo incluye)
```

**Lógica:** Define, desglosa componentes, muestra el flujo, compara variantes. Más denso en tablas y datos que los otros arquetipos.

**Notas reales de referencia:** "Introducción a NODE.js", "Modelos de Servicio: IaaS, PaaS, SaaS", "El Protocolo OAuth2"

---

### Arquetipos Híbridos

Si P1 asignó una combinación (ej: Constructor Teórico + Flujo Analógico), **fusiona las estructuras**:

1. Toma la apertura del arquetipo dominante
2. Integra secciones del arquetipo secundario donde el tema lo pida
3. No repitas secciones equivalentes de ambos arquetipos

**Ejemplo real — "¿Qué es Cloud Computing?" (Constructor Teórico + Flujo Analógico):**
```
H2: ¿Qué es Cloud Computing?           ← Constructor Teórico
H2: Características Esenciales          ← Constructor Teórico
  H3: On-demand self-service
  H3: Broad network access
  H3: ...
H2: Modelos de Despliegue               ← Documento Técnico (emergente)
  H3: Nube Pública
  H3: Nube Privada
  H3: Nube Híbrida
H2: ¿Cómo funciona realmente?           ← Flujo Analógico (con analogías)
```

---

## Paso 3: Aplicar Criterios de Profundidad

### ¿Cuándo un tema merece ser H2?

| Criterio | H2 sí | H2 no (queda como H3 o contenido) |
|----------|-------|------------------------------------|
| ¿Es un concepto independiente que puede estudiarse solo? | ✅ | — |
| ¿Necesita su propio quote de definición? | ✅ | — |
| ¿Es un sub-aspecto de otro concepto más grande? | — | ❌ Hacerlo H3 |
| ¿Tiene suficiente contenido para justificar su propio archivo? | ✅ | ❌ Fusionar con otra sección |

### ¿Cuándo un H3 se justifica?

| Criterio | H3 sí | H3 no (queda como contenido interno) |
|----------|-------|-----------------------------------------|
| ¿Es una categoría, tipo o fase distinguible? | ✅ | — |
| ¿Tiene al menos 3-4 líneas de contenido propio? | ✅ | — |
| ¿Es una subdivisión clara dentro de la sección? | ✅ | — |
| ¿Es solo un detalle menor de una explicación más grande? | — | ❌ Dejarlo como párrafo o bullet |

### Cantidad orientativa de headings

| Tamaño del tema | H2s | H3s por H2 |
|-----------------|-----|-------------|
| Tema enfocado (1 concepto) | 3-5 | 0-3 |
| Tema medio (concepto + proceso) | 4-7 | 2-4 |
| Tema amplio (protocolo, arquitectura completa) | 5-9 | 2-5 |

Estos rangos son orientativos. Si el tema necesita más, que tenga más. La densidad está bien si cada heading se justifica (Regla 6.0 del manual).

---

## Paso 4: Anotar Indicaciones de Contenido

Para cada heading, agrega una **indicación breve** de qué tipo de contenido irá dentro. Esto guía la Fase 3 (generación de prompts).

**Códigos de indicación:**

| Código | Significado |
|--------|-------------|
| `[DEF]` | Definición con quote en negrita |
| `[DOLOR]` | Abre con el problema que resuelve |
| `[TABLA]` | Tabla comparativa o de características |
| `[FLUJO]` | Diagrama de flujo (ASCII o Mermaid — decidir aquí) |
| `[ANALOGÍA]` | Incluir analogía para hacer intuitivo el concepto |
| `[CÓDIGO]` | Bloque de sintaxis + ejemplo práctico |
| `[MITO]` | Formato ❌ Mito / ✅ Realidad |
| `[FASES]` | Proceso por fases numeradas |

**Ejemplo anotado:**
```
H2: ¿Qué problema resuelve OAuth2? [DOLOR]
H2: ¿Qué es OAuth2? [DEF] [ANALOGÍA]
H2: Roles del protocolo [TABLA]
  H3: Resource Owner [DEF]
  H3: Client [DEF]
  H3: Authorization Server [DEF]
  H3: Resource Server [DEF]
H2: Flujo de autorización [FASES] [FLUJO:mermaid]
  H3: Fase 1 — Solicitud de autorización [FLUJO:ascii]
  H3: Fase 2 — Intercambio de tokens [FLUJO:mermaid]
  H3: Fase 3 — Acceso al recurso [FLUJO:ascii]
H2: Tipos de Grant [TABLA]
  H3: Authorization Code [DEF] [FLUJO:mermaid]
  H3: Client Credentials [DEF] [FLUJO:ascii]
```

---

## Paso 5: Presentar el Esqueleto al Usuario

Usa este formato para que el usuario pueda revisar y editar fácilmente:

```
──────────────────────────────────────
📐 ESQUELETO: [Nombre del tema]
──────────────────────────────────────

🧩 Arquetipo: [Nombre(s)]
📊 Profundidad: [N] H2s, ~[N] H3s

──────────────────────────────────────

1. H2: [Título] [CÓDIGOS]
2. H2: [Título] [CÓDIGOS]
   2.1 H3: [Título] [CÓDIGOS]
   2.2 H3: [Título] [CÓDIGOS]
3. H2: [Título] [CÓDIGOS]
   3.1 H3: [Título] [CÓDIGOS]
   3.2 H3: [Título] [CÓDIGOS]
   3.3 H3: [Título] [CÓDIGOS]
4. H2: [Título] [CÓDIGOS]
...

──────────────────────────────────────
¿Apruebas este esqueleto, o quieres mover/agregar/quitar secciones?
```

**Si el usuario quiere cambios**, aplícalos y vuelve a presentar. Repite hasta aprobación.

---

## Paso 6: Guardar el Esqueleto en el Índice

Una vez aprobado, **volcar el esqueleto en la sección `## Secciones` del `00_indice.md`** (no se crea `borradores/`). Cada H2 del esqueleto = una entrada de sección, en orden, con su estado `⬜ pendiente` y sus códigos de indicación como anotación (guían a P3⇄P4):

```markdown
## Secciones

1. ¿Qué problema resuelve OAuth2? — ⬜ `[DOLOR]`
2. ¿Qué es OAuth2? — ⬜ `[DEF] [ANALOGÍA]`
3. Roles del protocolo — ⬜ `[TABLA]`
4. Flujo de autorización — ⬜ `[FASES] [FLUJO:mermaid]`
```

- Los H3 (subsecciones) se anotan bajo su H2 si ayudan a planear, pero **no son archivos**: viven dentro del archivo de su sección.
- Aún **no** se crean los archivos `01_…`, `02_…`: eso ocurre en P3⇄P4, cuando cada sección se redacta. La entrada del índice pasa de texto plano a `[[01_slug|Título]] — ✅` cuando su archivo existe.
- El apunte sigue en estado `EN PROGRESO` en el frontmatter del índice (no hay `ESTADO.md` ni "fase" aparte).

---

## Conexión con la Fase Siguiente

El esqueleto aprobado es el **input directo** de P3 (Generación de Prompts para IAs externas). Cada heading con sus códigos de indicación se convierte en un prompt específico. El agente NO debe proceder a P3 sin confirmación explícita del usuario.
