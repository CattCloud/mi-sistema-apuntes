# Repaso: Recall Conversacional (v1)

> **Etapa:** Repaso (etapa 4 del ciclo de vida del conocimiento)
> **Metodología:** `sistema/metodologia_repaso.md` (fuente de verdad del *porqué*)
> **Input:** Un apunte ya escrito (`apuntes/[ws]/[tema]/`)
> **Output:** Una sesión de recall activo + una entrada en `repaso/bitacora.md`
> **Trigger:** El usuario dice *"repasemos [apunte]"* / *"quiero repasar X"*

---

## Qué es este protocolo

Es el equivalente, para la etapa de **repaso**, de lo que los prompts P1–P4 son para la etapa de **generación**. Le dice al agente **cómo conducir una sesión de recall activo** sobre un apunte ya escrito, respetando la metodología: recuperación primero, feedback inmediato, lo visual como premio (diferido en v1), y cierre con registro para el espaciado.

**Modalidades que cubre el v1:**
- **Recall conversacional** — la IA interroga, el usuario responde a libro cerrado.
- **Feynman** — variante: el usuario explica un concepto con sus palabras y la IA caza los huecos.

**Lo que el v1 NO hace todavía** (capas siguientes): mazo formal con SRS, integración con Anki/NotebookLM, generación de contenido visual, enganche automático con P4.

---

## Regla de oro (no negociable)

> 🎯 **El usuario recupera PRIMERO, a libro cerrado. La IA nunca muestra la respuesta antes de que el usuario intente.**

- El agente **tiene** el apunte; el usuario responde **de memoria**. No se le pega el contenido del apunte como pista inicial.
- Quedarse en blanco es esperado y válido — **es el mecanismo, no el fallo**. Pero nunca se deja al usuario colgado: ver "pistas escalonadas".
- El feedback (la respuesta correcta) llega **después** del intento, siempre.

---

## Paso 1: Cargar el apunte

1. Leer el `00_indice.md` del apunte (alcance + lista de secciones).
2. Leer las secciones (`01_…`, `02_…`) que se van a repasar. **El `.md` es la única fuente de verdad** — si el usuario lo editó, esas ediciones mandan.
3. Si el usuario no especifica secciones, repasar el apunte completo, sección por sección, en orden.

> 💡 Si el apunte está incompleto (secciones `⬜` en el índice), repasar solo lo que está `✅` y avisarlo.

---

## Paso 2: Preparar la interrogación

De cada sección, derivar preguntas que ataquen lo esencial (no trivias). Mezclar tres niveles, de menor a mayor exigencia:

| Nivel | Qué pide | Ejemplo (apunte de Claude Code) |
|-------|----------|--------------------------------|
| **Recall directo** | Recuperar una definición o hecho central | *"¿Qué es tool calling?"* |
| **Comprensión / aplicación** | Explicar un porqué, conectar causas | *"¿Por qué agregar un `if` controlador puede empeorar el resultado del modelo?"* |
| **Feynman / elaboración** | Explicar el concepto entero con sus palabras | *"Explícame con tus palabras cómo funciona el query loop."* |

- Priorizar lo que el apunte marcó como núcleo (los quotes en negrita, las ideas clave, las analogías, los flujos).
- **Una pregunta a la vez.** No vaciar un cuestionario completo de golpe.

---

## Paso 3: Conducir el recall

Por cada pregunta:

1. **Pregunta** y espera la respuesta del usuario (de memoria).
2. **Si responde bien** → confírmalo, refuerza lo correcto, y si hay un matiz que faltó, agrégalo brevemente.
3. **Si se queda en blanco o falla** → aplica **pistas escalonadas** (no des la respuesta de golpe):
   - **Pista 1:** una señal pequeña (la categoría, la primera idea, un ejemplo análogo).
   - **Pista 2:** una pista más fuerte (la mitad de la respuesta, el "empieza por…").
   - **Respuesta:** si aún no sale, dásela completa y clara. El intento fallido + la respuesta inmediata es lo que fija.
4. **Crédito parcial:** reconoce lo que sí acertó antes de corregir lo que faltó. Nunca "está mal" a secas.

> ⚠️ **Tono:** alentador, nunca de examen que castiga. El blanco no se penaliza — se acompaña. La motivación es parte del diseño (un método que desmotiva se abandona).

**Variante Feynman:** si el usuario explica con sus palabras, escucha la explicación completa, luego señala (a) lo que quedó bien, (b) los huecos o imprecisiones, (c) lo que se saltó. Compara contra el apunte.

---

## Paso 4: Cerrar huecos y dudas

Durante el recall pueden pasar dos cosas distintas:

- **El usuario no recordaba** algo que sí está en el apunte → es repaso normal, se corrige y sigue.
- **El apunte no lo explicaba bien** (el usuario pregunta algo que el `.md` no cubre o cubre mal) → esto es una **mejora al apunte**, no solo un repaso. Activa el **mecanismo de Apunte Abierto** (`sistema/mecanismos/mecanismo_apunte_abierto.md`):
  - Responde la duda con la mejor explicación.
  - Si esa explicación enriquece el apunte (analogía nueva, término sin definir, matiz que faltaba), propón: *"Esto enriquece la sección [X]. ¿La integro al apunte?"*
  - Si excede el alcance → guardián de alcance → NOTAS.md.

> 🔑 El repaso es también un **control de calidad** del apunte: lo que no pudiste recordar *porque estaba mal explicado* es señal de parchear, no de tu memoria.

---

## Paso 5: Consolidación multimodal (diferida en v1)

En la metodología, aquí va el premio visual/multimodal (audio, infografía). **En el v1 esto está diferido** — no se genera contenido visual todavía.

Lo único que hace el v1: si un concepto quedó especialmente flojo, el agente puede ofrecer un **cierre verbal breve** (un resumen de una línea, una analogía) como consolidación. Nada más.

---

## Paso 6: Cerrar la sesión y registrar (bitácora)

Al terminar, el agente **escribe en `repaso/bitacora.md`** (lo escribe la IA, no el usuario → fricción casi cero):

1. **Agregar una entrada al historial** (la más reciente arriba) con: fecha, apunte, secciones repasadas, modalidad, resultado (qué quedó firme / qué falló), próximo repaso sugerido.
2. **Actualizar la agenda** ("Próximos repasos") con la nueva fecha para ese apunte.

**Fecha:** usar la fecha actual del contexto.

**Cálculo del próximo repaso** (heurística simple v1 — se reemplazará por un SRS real más adelante):

| Cómo fue la sesión | Próximo intervalo |
|--------------------|-------------------|
| **Flojo** (muchos blancos, pistas fuertes) | 1–2 días |
| **Regular** (recall con pistas leves) | 4–7 días |
| **Sólido** (recall limpio, pocas pistas) | 2–3 semanas |
| **Dominado** (2+ sesiones sólidas seguidas) | 1+ mes |

> 📝 Próximo repaso = fecha de la sesión + intervalo según cómo fue. Es una heurística, no un algoritmo; basta para que el espaciado exista en el v1.

3. **Cierre al usuario** (corto, sin re-pegar todo):

```
✅ Sesión de repaso cerrada — [Apunte]
Firme: [lo que recordaste bien]
A reforzar: [lo que falló]
Próximo repaso sugerido: [fecha]  → registrado en repaso/bitacora.md
```

---

## Reglas anti-fricción

- **Recall primero, siempre.** Si el agente se descubre explicando antes de preguntar, se detiene y pregunta.
- **Una pregunta a la vez**, no cuestionarios masivos.
- **No castigar el blanco.** Acompañar con pistas, no con juicio.
- **La bitácora la escribe la IA**, el usuario no llena nada.
- **Sesiones cortas valen.** No exigir repasar el apunte entero; un par de secciones bien recuperadas es una sesión válida.
