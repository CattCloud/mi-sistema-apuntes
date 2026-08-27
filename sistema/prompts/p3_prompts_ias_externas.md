# P3: Generación de Contenido (Fuente Única + Auto-Contraste)

> **Fase:** 3 de 4 del flujo de generación de apuntes  
> **Input:** El `00_indice.md` del apunte (alcance + esqueleto con códigos, de P1/P2)  
> **Output:** Contenido generado por el agente + su autocrítica, listo para que P4 lo sintetice  
> **Checkpoint:** Se procesa sección por sección — cada sección se valida antes de pasar a la siguiente

---

## Instrucciones para el Agente

Tienes un esqueleto aprobado con headings y códigos de indicación ([DEF], [TABLA], [FLUJO], etc.). El sistema opera con **una sola fuente de contenido: tú**. Ya no hay IA externa ni segundo hilo de trabajo — todo ocurre en una sola línea de contexto continua. Esto significa que el usuario puede preguntar, repreguntar y ajustar libremente, y todo queda en el mismo hilo.

Como eres la única fuente, conservas el valor del contraste haciéndolo **internamente**: generas el contenido y luego lo criticas a ti mismo antes de pasarlo a P4. Tu trabajo tiene **dos partes por cada sección**:

1. **Generar el contenido** de la sección (borrador).
2. **Autocriticar ese borrador** — qué le falta, qué podría estar mal o ser dudoso, qué se explica mejor de otra forma, qué ángulo no tocaste.

**Flujo por sección:**
1. El agente genera el borrador de contenido de la sección.
2. El agente hace un paso de autocrítica sobre ese borrador.
3. El borrador + la autocrítica pasan a P4 para síntesis inmediata en estilo Tesla.

**Por qué el auto-contraste:** El contraste entre dos fuentes tenía valor (distintos puntos de vista, datos que una veía y otra no), pero procesarlo cargaba al usuario y cansaba. Moviéndolo adentro del agente, el usuario recibe una sola versión ya reconciliada y conserva un único hilo vivo. (El modelo anterior de dos fuentes está documentado en `historial_version_ia_externa.md`.)

**Límite honesto del auto-contraste:** Una sola IA criticándose a sí misma comparte sus propios puntos ciegos. Atrapa bien lo incompleto, lo mal explicado y lo internamente inconsistente; atrapa peor los errores donde el agente simplemente está seguro y equivocado. Por eso, en datos que importan (cifras, comandos, sintaxis de APIs, versiones), la autocrítica debe **marcar explícitamente lo que no está 100% seguro** para que el usuario lo verifique.

**Principios:**
- Un bloque de contenido por sección lógica del esqueleto, no por cada heading individual (agrupar H2 + sus H3s).
- El contenido va en español, los tecnicismos en inglés (spanglish controlado, consistente con el manual).
- El borrador no necesita estar pulido en estilo Tesla — ese pulido es trabajo de P4. Aquí prioriza que el contenido sea correcto, completo y claro.

---

## Paso 1: Leer los Inputs

Abre los archivos del tema activo:

| Archivo | Qué extraer |
|---------|-------------|
| `00_indice.md` → cabecera + Alcance | Tema, alcance (incluye/excluye), workspace, arquetipo |
| `00_indice.md` → `## Secciones` | Las secciones con sus códigos de indicación (el esqueleto) |

---

## Paso 2: Agrupar Headings en Bloques de Trabajo

No proceses un heading individual a la vez. Agrupa por **sección lógica**:

| Situación | Agrupación |
|-----------|------------|
| H2 con 2-4 H3s relacionados | 1 bloque para todo el conjunto |
| H2 sin H3s (sección simple) | 1 bloque solo para ese H2 |
| H2 con 5+ H3s | Dividir en 2 bloques (mitad y mitad) |
| Varios H2s de un mismo macro-concepto | Pueden ir en 1 bloque si son cortos |

**Objetivo:** Entre 3 y 7 bloques por apunte. Menos de 3 = bloques demasiado grandes (pierde foco). Más de 7 = demasiada fragmentación (pierde coherencia).

---

## Paso 3: Generar el Contenido del Bloque

Genera el contenido cubriendo lo que pide el esqueleto para ese bloque. Usa los **códigos de indicación** para saber qué estructura debe tener cada parte: una definición ([DEF]) pide una oración clara; un flujo ([FLUJO]) pide pasos numerados; una analogía ([ANALOGÍA]) pide una comparación cotidiana con su mapeo; etc.

Apóyate en las plantillas de la sección siguiente como **guía de qué información producir** por cada código. No necesitas formatear el borrador con el estilo visual final (eso lo hace P4) — pero sí debes cubrir todos los elementos que la plantilla pide, para que P4 tenga material completo con que trabajar.

**Nivel de detalle:** ajústalo al tipo de tema (ver tabla al final del documento).

---

## Plantillas de Contenido por Código de Indicación

Cada código de indicación define qué información debe producir el agente para esa parte de la sección. Son la guía de cobertura del borrador.

**Regla global de formato:** Todas las plantillas deben instruir a la IA a usar formato markdown para jerarquía visual: `###` para títulos de sección, `**negrita**` para nombres/etiquetas clave, `---` para separadores entre bloques, y tablas markdown cuando aplique. El objetivo es que la respuesta sea fácil de leer y comparar a primera vista.

### [DEF] — Definición

```
### [CONCEPTO]

**Definición:** 1 oración clara y directa (no textbook, no Wikipedia)

**Contexto de uso:** 1-2 oraciones de cuándo/dónde se aplica

**Error común:** 1 oración sobre confusiones frecuentes (si aplica)
```

### [DOLOR] — Problema que resuelve

```
### El problema

**Problema concreto:** Describe el dolor que existía ANTES de [X] (2-3 oraciones, con ejemplo real)

**Las [N] fricciones principales:**

**1. [Nombre de la fricción]**
- **Qué pasa exactamente:** [descripción]
- **Ejemplo real:** [situación concreta donde duele]

**2. [Nombre de la fricción]**
- **Qué pasa exactamente:** [descripción]
- **Ejemplo real:** [situación concreta donde duele]

**Consecuencia acumulada:** 1 oración resumiendo el impacto total
```

### [TABLA] — Comparativa o características

```
### [Nombre de la comparativa]

[1-2 oraciones de contexto para la tabla]

| [Columna 1] | [Columna 2] | [Columna 3] |
|---|---|---|
| [Dato] | [Dato] | [Dato] |

**Diferencia clave:** 1 oración de resumen
```

### [FLUJO] — Diagrama de flujo

```
### [Nombre del flujo]

**Paso 1 — [Nombre]:** Qué actor lo ejecuta + Qué sucede + Qué produce
**Paso 2 — [Nombre]:** ...
**Paso N — [Nombre]:** ...

---

**Resumen del flujo:** A → B → C → D (en una línea)
```

### [ANALOGÍA] — Analogía para concepto abstracto

```
### Analogía: [Nombre de la analogía]

**Comparación:** [X] es como [algo cotidiano] porque...

**Mapeo:**
| Elemento técnico | Elemento de la analogía |
|---|---|
| [componente A] | [equivalente cotidiano] |
| [componente B] | [equivalente cotidiano] |

**Límite de la analogía:** 1 oración sobre dónde deja de funcionar
```

### [CÓDIGO] — Sintaxis y ejemplo práctico

```
### [Herramienta/Propiedad]

**Sintaxis:**
```[lenguaje]
[código abstracto con placeholders]
```

**Ejemplo práctico:**
```[lenguaje]
[código real funcional con comentarios]
```

**Resultado esperado:** Qué produce al ejecutarse

**Variación:** 1 caso de uso alternativo breve
```

### [MITO] — Mito / Realidad

```
### Mitos comunes sobre [CONCEPTO]

❌ **Mito:** "[afirmación falsa común]"
✅ **Realidad:** [corrección concisa]

---

❌ **Mito:** "[siguiente mito]"
✅ **Realidad:** [corrección]

(Ordenar del más común al menos conocido, 3-5 pares)
```

### [FASES] — Proceso por fases

```
### [Nombre del proceso]

**FASE 1: [Nombre]**
- **Qué sucede:** [descripción]
- **Quién lo hace:** [actor]
- **Qué produce:** [output]

---

**FASE 2: [Nombre]**
- **Qué sucede:** [descripción]
- **Quién lo hace:** [actor]
- **Qué produce:** [output]

---

**Resumen del proceso:** 1 oración del flujo completo
```

### [CONSOLA] — Procedimiento en interfaz gráfica

> **Cuándo:** temas procedimentales donde el objeto de estudio *es* una interfaz (consola cloud, panel de administración). No aplica a secciones puramente conceptuales.
>
> ⚠️ **Regla de durabilidad:** registrar la **intención**, no los clics. *"Adjuntar el rol en Configuration → Permissions"* sobrevive un rediseño; *"clic en el botón naranja de arriba a la derecha"* no.

```
### [Nombre del procedimiento]

**Antes de empezar:** qué debe existir ya (recursos, permisos, credenciales)

**Dónde:** a qué pantalla se llega y por qué ruta (a nivel de intención)

**Qué configurar:**

| Campo | Valor | Por qué |
|---|---|---|
| [campo] | [valor] | [razón — no solo qué, sino por qué ese] |

**⚠️ Trampas:**
- [Lo que está escondido en otra pestaña o sección "Advanced"]
- [Lo que rompe silenciosamente si se omite]

**✅ Sabes que salió bien si:** criterio verificable, observable sin adivinar
```

### [COSTO_SERVICIO] — Modelo de precio

> **Cuándo:** cualquier servicio de pago por uso — cloud, API de LLM, PaaS, base gestionada. Se asigna solo a headings donde hay un servicio con precio; un concepto abstracto no lo lleva.

```
### Qué cuesta [SERVICIO]

**Qué se cobra:** la unidad real de facturación (request, GB-mes, GB de **salida**, token, hora de cómputo)

**Free tier:** qué cubre exactamente y hasta qué límite — y si caduca

**💸 El gatillo:** qué dispara la factura sin que lo notes (el costo oculto típico de este servicio)

**Estimación concreta:** cuánto sería para un volumen realista del usuario, con el cálculo a la vista
```

---

## Combinaciones de Códigos

Cuando un heading tiene múltiples códigos (ej: `[DEF] [ANALOGÍA]`), **combina las plantillas** en un solo bloque de contenido, cubriendo los elementos de ambas:

**Ejemplo para `H2: ¿Qué es OAuth2? [DEF] [ANALOGÍA]`:**

```
Para "¿Qué es OAuth2?":
→ Definición: 1 oración clara y directa
→ En qué contexto se usa: 1-2 oraciones
→ Analogía: Compara OAuth2 con algo cotidiano
→ Mapeo: Qué elemento técnico corresponde a qué elemento de la analogía
→ Límite de la analogía: dónde la comparación deja de funcionar
```

**Ejemplo para `H2: Flujo de autorización [FASES] [FLUJO:mermaid]`:**

```
Para "Flujo de autorización":
→ Describe cada fase:
   FASE [N]: [Nombre]
   - Qué sucede / Quién lo hace / Qué produce
→ Flujo paso a paso numerado:
   Por cada paso: Actor + Acción + Resultado
→ Secuencia resumida: "A → B → C → D" en una línea
```

---

## Paso 4: Autocrítica del Borrador

Antes de pasar el contenido a P4, critícate a ti mismo. Este es el paso que recupera el valor del contraste sin un segundo hilo. Hazlo como análisis interno y respóndete con honestidad:

| Pregunta de autocrítica | Qué buscas |
|-------------------------|------------|
| ¿Qué le falta a esto? | Conceptos, pasos o matices que el esqueleto pedía y omitiste |
| ¿Hay algo que podría estar mal o ser dudoso? | Afirmaciones, cifras, comandos o sintaxis de los que no estás 100% seguro |
| ¿Hay una forma más clara de explicar alguna parte? | Explicaciones enredadas, jerga innecesaria, falta de ejemplo o analogía |
| ¿Qué ángulo no toqué? | Error común, caso de uso, contexto de cuándo aplica |

**Marca lo dudoso explícitamente.** Todo lo que caiga en "podría estar mal" (especialmente datos verificables: versiones, flags, nombres de funciones, cifras) se etiqueta con `⚠️ verificar` para que el usuario lo confirme. No lo escondas — es la red de seguridad que reemplaza a la segunda fuente.

El resultado de este paso es un borrador mejorado + una lista corta de banderas `⚠️ verificar` (si las hay). Eso es lo que recibe P4.

---

## Paso 5: Flujo de Ejecución Sección por Sección

El flujo es **progresivo por sección**, en un único hilo continuo:

```
Por cada sección del esqueleto:
  1. Agente genera el borrador de contenido de la sección
  2. Agente se autocritica (qué falta / qué es dudoso / qué explicar mejor) y marca ⚠️ verificar
  3. → Pasa a P4 para síntesis de esta sección en estilo Tesla
  4. → Validación conjunta (aquí pueden surgir preguntas y adiciones — ver mecanismo apunte abierto)
  5. → Sección aprobada se escribe al .md inmediatamente
  6. Siguiente sección
```

**Nota sobre P3 y P4:** Como ahora todo ocurre en un solo hilo, P3 (generar + autocriticar) y P4 (sintetizar) son pasos internos consecutivos del mismo turno. El usuario no ve el borrador crudo ni la autocrítica — recibe directamente la síntesis de P4, ya pulida en estilo Tesla, con las banderas `⚠️ verificar` señaladas si las hay. La presentación al usuario ocurre en P4.

---

## Paso 6: Registrar Progreso

P3 **no guarda un archivo aparte**. Su borrador + autocrítica son pasos internos que pasan a P4 en el mismo turno; P4 escribe la sección directamente al `.md` (`01_…`, `02_…`). El progreso vive en el `00_indice.md`:

- La entrada de la sección en `## Secciones` pasa a `🔄 en progreso` mientras se trabaja, y a `✅` cuando se aprueba.
- Las banderas `⚠️ verificar` de la autocrítica viajan a P4 para señalarse al usuario y quedar marcadas en el contenido de la sección — ya **no** se persisten en un `borradores/` (no existe).

---

## Guía de Nivel de Detalle por Tipo de Tema

No todos los prompts necesitan la misma profundidad. Ajusta según el tema:

| Tipo de tema | Nivel en el prompt | Ejemplo de instrucción |
|-------------|-------------------|------------------------|
| Concepto introductorio | "Explica como si fuera la primera vez que escucho esto" | "nivel introductorio, sin asumir conocimientos previos" |
| Herramienta específica | "Asume que ya sé el lenguaje base" | "nivel intermedio, ya conozco [lenguaje/framework]" |
| Protocolo/arquitectura | "Necesito entender el sistema completo" | "nivel intermedio-avanzado, incluye detalles de implementación" |
| Tema avanzado | "Asume que tengo la base teórica" | "nivel avanzado, enfócate en matices y edge cases" |

---

## Conexión con la Fase Siguiente

P3 y P4 operan **entrelazados** dentro del mismo turno: por cada sección, P3 genera el contenido y se autocritica, y P4 sintetiza inmediatamente en estilo Tesla. No se espera a tener todas las secciones para sintetizar.

El flujo completo por sección es: P3 (generar + autocriticar) → P4 (sintetizar) → validar → escribir al .md → siguiente sección.

Durante la validación, el usuario puede hacer preguntas o pedir adiciones (mecanismo de apunte abierto). Si la adición encaja en la sección actual, se integra. Si excede el alcance, el guardián de alcance la redirige a NOTAS.md.
