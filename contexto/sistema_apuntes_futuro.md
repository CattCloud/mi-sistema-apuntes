# 🚀 Sistema de Generación de Apuntes — Sistema Futuro (v1)

> Documento que describe cómo **funcionará** el sistema automatizado de generación de apuntes.  
> Primera versión: sin frontend, interacción vía chat con el Agente de Codificación.  
> Fecha: 22 de Marzo, 2026

---

## 1. Objetivo del Sistema Futuro

Automatizar y delegar a un Agente de Codificación (vía skill) las tareas de **toma de decisiones** que hoy consumen más tiempo y energía:

- Identificación del tema a estudiar
- Definición de la estructura/esqueleto del apunte
- Generación de prompts para las IAs externas
- Propuesta de síntesis final basada en mi estilo de redacción

**Lo que NO se automatiza:** la creación de la página en Notion y la colocación del contenido (proceso manual mío).

---

## 2. Actores del Sistema

| Actor | Rol |
|---|---|
| **Yo (usuario)** | Proveo el input/contexto inicial. Ejecuto los prompts en las IAs externas. Creo la página en Notion. Reviso y ajusto la síntesis final. |
| **Agente de Codificación (skill)** | Identifica el tema. Define la estructura. Genera los prompts. Propone la síntesis. Genera archivos y carpetas necesarias. |
| **ChatGPT / Gemini / Claude** | Generan contenido de apuntes a partir de los prompts que les comparto manualmente. |
| **Notion** | Destino final del apunte. Gestión manual. |

---

## 3. Recursos que Consulta el Agente

Antes de ejecutar cualquier paso, el agente revisa los siguientes recursos del repositorio `mis-apuntes-dev`:

| Recurso | Propósito |
|---|---|
| **Skill de Generación de Apuntes** | Instrucciones del flujo completo a ejecutar |
| **`manual_apuntes.md`** (patrones de estilo) | Cómo deben verse y estructurarse los apuntes: arquetipos, jerarquía, voz, tratamiento de código |
| **Apuntes existentes de referencia** (Notion) | Material para comprender el tono de redacción y estilo de síntesis del usuario |
| **Documentación de contexto** | Cualquier doc adicional del repo que aporte al tema |

---

## 4. Flujo de Interacción Completo

### Fase 1: Input del Usuario

```
YO ──────► Agente
           "Aquí tienes [video/PDF/tema/roadmap]"
```

- Le doy al agente el **contexto inicial**: puede ser un archivo, un enlace, una transcripción, o simplemente una descripción del tema.
- El agente recibe este input y comienza a procesar.

---

### Fase 2: Identificación del Tema

```
Agente ──────► YO
               "El tema identificado es: [X]. ¿Confirmas?"
```

- El agente analiza el input y **propone el tema** identificado.
- Si el tema es demasiado amplio, sugiere **dividirlo** en partes.
- **Yo confirmo o ajusto** antes de continuar.

---

### Fase 3: Definición de la Estructura / Esqueleto

```
Agente ──────► YO
               "Esta es la estructura propuesta:
                1. Subtema A
                2. Subtema B
                3. Subtema C
                ¿Apruebas?"
```

- El agente propone la estructura (puntos y subsecciones) basándose en:
  - El tema identificado
  - Los patrones de `manual_apuntes.md`
  - El arquetipo que mejor aplica (Constructor Teórico, Sintaxis Coder, Flujo Analógico, o Documento Técnico)
- **Yo confirmo, ajusto o reorganizo** la estructura.

---

### Fase 4: Generación de Prompts para las IAs Externas

```
Agente ──────► YO
               "Aquí están los prompts para cada subsección.
                Ejecútalos en ChatGPT, Gemini y Claude."
```

- Para **cada subsección** del esqueleto, el agente genera un prompt optimizado.
- Cada prompt debe:
  - Estar contextualizado al tema y la subsección específica
  - Indicar el nivel de detalle y enfoque esperado
  - Ser listo para copiar y pegar directamente en cada IA
- **Yo tomo esos prompts y los ejecuto** manualmente en ChatGPT, Gemini y Claude.

---

### Fase 5: Síntesis Propuesta por el Agente

```
YO ──────► Agente
           "Aquí están las 3 respuestas de las IAs para [subsección X]"

Agente ──────► YO
               "Esta es mi propuesta de síntesis para [subsección X]."
```

- Le paso al agente los **3 outputs** (de ChatGPT, Gemini y Claude).
- El agente los compara y propone una **síntesis unificada** que:
  - Respeta mi tono de redacción y estilo (aprendido de mis apuntes existentes)
  - Integra lo mejor de cada IA
  - Sigue el arquetipo y formato que corresponda
- **Yo reviso, ajusto y apruebo** la síntesis.
- Este paso se **repite por cada subsección** del esqueleto.

---

### Fase 6: Proceso Manual en Notion

```
YO ──────► Notion
           Creo la página y coloco el contenido aprobado
```

- Creo la página en Notion **desde cero** en el workspace correspondiente.
- Coloco la síntesis aprobada de cada subsección.
- Aplico estilos y formateo (toggles, callouts, colores, imágenes).
- **Este paso es 100% manual mío.**

---

## 5. Diagrama del Flujo Futuro

```
┌──────────────────────────┐
│  YO: Proveo input        │
│  (video, PDF, tema, etc.)│
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│  AGENTE: Identifica tema │──► YO confirmo/ajusto
│  (propone + divide       │
│   si es necesario)       │
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│  AGENTE: Define          │──► YO confirmo/ajusto
│  esqueleto/estructura    │
│  (basado en patrones     │
│   y arquetipo)           │
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│  AGENTE: Genera prompts  │
│  por cada subsección     │
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────────────────────────┐
│  BUCLE POR CADA SUBSECCIÓN                   │
│ ┌──────────────────────────────────────────┐ │
│ │ 1. YO ejecuto prompt en 3 IAs           │ │
│ │ 2. YO le paso los 3 outputs al Agente   │ │
│ │ 3. AGENTE propone síntesis              │ │
│ │    (con mi tono y estilo)               │ │
│ │ 4. YO reviso y apruebo                  │ │
│ └────────────────┬─────────────────────────┘ │
│                  │ Repetir                    │
│                  ▼                            │
│         ¿Más subsecciones? ──Sí──►(volver)   │
│                  │ No                         │
└──────────────────┼───────────────────────────┘
                   │
                   ▼
┌──────────────────────────┐
│  YO: Creo página Notion  │
│  + coloco contenido      │
│  + aplico estilos        │
│  (100% manual)           │
└──────────────────────────┘
```

---

## 6. Diferencia Clave: Actual vs. Futuro

| Paso | Sistema Actual | Sistema Futuro |
|---|---|---|
| Identificar tema | **Yo decido** (mental, agotador) | **Agente propone**, yo confirmo |
| Definir estructura | **Yo + IA mixto** (sin prompt fijo) | **Agente propone** basado en patrones |
| Generar prompts | **No existen** (todo en mi cabeza) | **Agente los genera** listos para copiar |
| Ejecutar prompts en IAs | Yo manualmente | Yo manualmente (sin cambio) |
| Síntesis | **Yo sintetizo** (intuitivo, agotador) | **Agente propone** síntesis, yo reviso |
| Notion | Yo creo desde cero | Yo creo desde cero (sin cambio) |

---

## 7. Producto Final: La Skill

Todo este flujo se encapsulará en una **skill del agente** que:
- Se invoca desde el chat del editor
- Recibe el input/contexto del usuario
- Ejecuta los pasos de forma secuencial con checkpoints de aprobación
- Genera archivos intermedios (prompts, estructuras, síntesis)
- Consulta los documentos de contexto del repo `mis-apuntes-dev`

### Dependencias para construir la skill:
1. `manual_apuntes.md` — finalizado y validado
2. Apuntes de referencia recopilados de Notion
3. Prompts internos del agente diseñados y probados
4. Flujo definido y documentado (este documento)

---

> Este documento refleja la **visión v1** del sistema futuro al **22 de Marzo de 2026**.  
> v1 = sin frontend, solo interacción por chat con el Agente de Codificación.
