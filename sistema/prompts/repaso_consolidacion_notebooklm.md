# Repaso: Consolidación Multimodal con NotebookLM (Paso 3)

> **Etapa:** Repaso — Paso 3 del ciclo (consolidación multimodal / "premio de salida")
> **Metodología:** `sistema/metodologia_repaso.md` (el *porqué*)
> **Hermano:** `sistema/prompts/repaso_recall.md` (el recall, Pasos 1–6)
> **Qué produce:** prompts de "Customize" listos para pegar en NotebookLM (Audio Overview + Video Overview)
> **Modo:** manual — el usuario sube las fuentes y pega los prompts; **la IA solo redacta los prompts**

---

## Qué hace este protocolo

NotebookLM convierte un apunte en **audio** (podcast de dos voces) y **video** (narración sobre estructura visual). Pero su salida depende casi por completo de lo que pongas en la caja **"Customize"**. Este protocolo le dice al agente **cómo redactar esos prompts** para que el resultado sea pedagógico, con personalidad y enfocado en lo que el usuario necesita retener — no el default plano y aburrido.

> 🔑 El agente **no genera** el audio/video (eso lo hace NotebookLM, manual). El agente entrega, en el chat, los **dos prompts listos para pegar**.

**Por qué audio + video (ambos):**
- 🎧 **Audio Overview** — fricción mínima (lo escuchas caminando), canal auditivo, espacio para emoción/debate.
- 🎬 **Video Overview** — codificación dual real: ves la estructura (diagramas/tablas) mientras la oyes explicada.

---

## Catálogo de tipos (no hay un solo audio/video por apunte)

Un apunte puede tener **varios artefactos** de consolidación, según el momento y la necesidad. El agente **ofrece** el tipo adecuado (según cómo fue el recall y el tamaño de `reforzar:`) y el usuario elige; todos viven en el mismo notebook.

| Tipo | Formato | Foco | Cuándo |
|---|---|---|---|
| **Consolidación completa** (default) | Audio (podcast) + Video | Núcleo completo, ponderado a `reforzar:` | Premio tras el recall / al finalizar el apunte |
| **Refuerzo express** | Audio corto (~3–4 min) | **Solo** `reforzar:` | Pinchazo rápido entre sesiones, sin re-escuchar todo |
| **Deep dive** | Audio o video enfocado | **Un** concepto que sigue atascado | Cuando un punto sigue flojo tras varios repasos |

> Las plantillas de abajo son para la **consolidación completa**. Las variantes son *deltas* sobre ellas (ver "Variantes").

---

## Principio grounded (no negociable)

> NotebookLM es **grounded** (anclado): el contenido sale SOLO de las fuentes subidas, no del conocimiento general del modelo. Por eso el prompt **no aporta hechos** — *dirige*: qué subconjunto enfatizar, para qué audiencia, con qué tono, formato, estructura y longitud.

Implicación práctica: el prompt nunca pide *"explica X"* si X no está en el apunte. Pide **"enfatiza"**, **"prioriza"**, **"rompe el mito de"**, **"estructura así"** — siempre sobre lo que ya vive en las fuentes.

---

## La regla de oro: emoción anclada al contenido

La emoción mejora la retención (arousal → consolidación vía amígdala-hipocampo; efecto Von Restorff; transporte narrativo). **PERO** el *seductive details effect* avisa: emoción que no enseña **roba atención y empeora** el aprendizaje.

> 🎯 Cada chiste, sarcasmo o debate debe **atacar el contenido**: el sarcasmo pincha un mito, el debate es *sobre* el concepto, la historia transporta a la idea. Emoción al servicio del material, **nunca** decoración suelta.

---

## Calibración de personalidad por arquetipo

El tono por defecto lo decide el campo `arquetipo:` del `00_indice.md`:

| Arquetipo del apunte | Tono default |
|---|---|
| **Documento Técnico / Constructor Teórico** (denso, preciso) | **Picante con freno**: debate con onda, humor y sarcasmo *solo* para pinchar mitos. Sin insultos. |
| **Flujo Analógico / narrativo** (más liviano) | **Puede subir**: sarcasmo más fuerte, pullas cómicas entre hosts, debate acalorado — si el tema lo aguanta. |

> Ante la duda: **picante con freno**. El show nunca tapa el contenido.

---

## El arma secreta: inyectar el `reforzar:`

Antes de redactar, **leer el bloque `repaso:` del índice**. El campo `reforzar:` lista lo que el usuario falló en el último recall. El prompt debe **ordenar a NotebookLM que enfatice y machaque esos puntos**, rompiéndolos como mitos.

> ⚠️ **Énfasis, no exclusividad.** El audio/video cubre el **núcleo completo** del apunte (es una repasada holística + codificación dual de todo + la curva del olvido aplica también a lo que ya sabías). El `reforzar:` recibe **más tiempo, más insistencia y el foco dramático** — como un profesor que repasa todo el capítulo pero se detiene en lo que la clase flaqueó. Nunca un piece de 4 puntos sueltos sin contexto.

Esto es lo que hace el contenido **personalizado a tus huecos**, no genérico — y es lo único que ni el default de NotebookLM ni un prompt a ciegas pueden lograr. Si no hay `reforzar:` todavía (apunte nunca repasado), cubrir el núcleo de forma pareja, enfatizando los quotes en negrita, las ideas clave y las analogías.

---

## Plantilla — Audio Overview (podcast)

Rellenar los `[corchetes]` con datos del apunte:

```
Audiencia: alguien que ya leyó esta nota una vez y necesita RETENERLA.
Español; tecnicismos en inglés.

Formato: debate animado entre dos hosts. Uno es escéptico y desafía
constantemente ("¿y eso por qué importa?", "¿no es sobreingeniería?"),
forzando al otro a justificar con las analogías de la nota:
[analogías clave del apunte].

Cubre el núcleo del apunte (repaso completo), PERO dale más tiempo, más
insistencia y el foco dramático a estos puntos que suelen malentenderse:
[reforzar: del índice; si no hay, repartir parejo por el núcleo].
Rompe cada uno como mito explícito ("mucha gente cree X… error, porque…").

Tono: [picante con freno | puede subir] según arquetipo. El sarcasmo SOLO
para pinchar un malentendido; cada broma debe enseñar. Usa solo las fuentes.

Longitud: ~10–14 min, tight. Cierra con un recap de 30s de los puntos difíciles.
```

---

## Plantilla — Video Overview

```
Audiencia: alguien que ya leyó esta nota una vez y necesita RETENERLA.
Español; tecnicismos en inglés.

Enfoque: apóyate en la estructura visual de la nota — los diagramas, tablas
y flujos: [visuales clave del apunte]. La narración explica mientras el
visual muestra (codificación dual).

Cubre la estructura completa de la nota, priorizando (más tiempo y detalle)
estos puntos: [reforzar: del índice, cada uno con su mini-explicación; si no
hay, repartir parejo].

Tono: claro y con energía, estilo "mapa visual hablado" — narración apoyada
en el visual, en formato narrado (no debate). Usa solo las fuentes.
Longitud: enfocada.
```

---

## Variantes (deltas sobre las plantillas)

**Refuerzo express (audio corto):** misma plantilla de audio, pero — longitud ~3–4 min; foco **exclusivo** en `reforzar:` (sin cubrir el núcleo completo); formato directo, va al grano del mito (menos banter). Es la **excepción** a la regla de "cobertura completa": acá sí es solo-los-huecos, *a propósito*, porque es un complemento rápido entre sesiones, no el repaso principal.

**Deep dive (un concepto):** misma plantilla, pero el "núcleo" se reduce a **un** concepto y sus conexiones; más profundidad, más analogías y más ejemplos sobre esa sola idea. Para cuando un punto sigue atascado tras varios repasos.

1. El agente entrega **los dos prompts** (audio + video) en el chat, listos para pegar en "Customize".
2. El usuario los pega en NotebookLM, genera, y consume el resultado **después** del recall (ver Paso 5 de `repaso_recall.md`).
3. El link al notebook se guarda en el `00_indice.md` del apunte:

```yaml
notebooklm: <url del notebook>   # contiene audio + video
```

Si aún no se generó: `notebooklm: pendiente`.

---

## Reglas anti-fricción

- **Cada prompt es autocontenido.** Audio y Video (y cualquier tipo del catálogo) se generan **por separado**; el generador de uno NO ve el otro. Nunca escribir *"igual que el audio"*, *"como arriba"*, *"menos banter que el audio"* — cada caja Customize debe repetir audiencia, foco y los puntos a enfatizar como si fuera la única.
- **La IA redacta, el usuario pega.** No se automatiza la generación en v1 (los tools MCP/browser son capa futura — anotados en `NOTAS.md`).
- **Consolidación es premio, no requisito.** Si el usuario solo quiere recall hoy, no se fuerza el audio/video.
- **Grounded siempre:** dirigir énfasis y tono, nunca pedir hechos fuera de las fuentes.
