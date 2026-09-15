---
name: repasar
description: Conducir una sesión de repaso de un apunte de Tesla (recall a libro cerrado, variante Feynman, calibración 1-10) y registrar el bloque repaso del índice; también responder "¿qué repaso hoy?" y preparar los prompts de NotebookLM. Usar cuando el usuario dice "repasemos X", "quiero repasar", "¿qué me toca repasar?" o pide audio o video de NotebookLM de un apunte.
---

# Repaso: Recall Conversacional (v1)

> **Etapa:** Repaso (etapa 4 del ciclo de vida del conocimiento)
> **Metodología:** `sistema/metodologia_repaso.md` (fuente de verdad del *porqué*)
> **Input:** Un apunte ya escrito (`apuntes/[ws]/[tema]/`)
> **Output:** Una sesión de recall activo + el bloque `repaso:` actualizado en el `00_indice.md` del apunte
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

> 🔗 **Enganche con generación:** un apunte es candidato a repaso solo si su `estado` es `FINALIZADO`. Si el índice **no** tiene bloque `repaso:`, significa que nunca se repasó (estado derivado: *por repasar*) — es normal en la primera sesión; el bloque se crea al cerrar (Paso 6).

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
5. **Calibración 1–10 (opcional, recomendado):** en las respuestas/explicaciones de peso, ponle una nota del 1 al 10 según qué tan **completa y precisa** quedó tu reconstrucción **contra el apunte**, y di qué falta para el 10. Es **calibración, no calificación**: marca dónde estás en el camino (*"vas en 7, te falta X"*), nunca un "reprobaste". La IA sigue eligiendo qué se evalúa (apuntando al `reforzar:`); el número solo mide tu reconstrucción, y luego alimenta el `nivel:` y el `reforzar:` del cierre (Paso 6).

> ⚠️ **Tono:** alentador, nunca de examen que castiga. El blanco no se penaliza — se acompaña. La motivación es parte del diseño (un método que desmotiva se abandona).

**Variante Feynman:** si el usuario explica con sus palabras, escucha la explicación completa, luego señala (a) lo que quedó bien, (b) los huecos o imprecisiones, (c) lo que se saltó, y (d) una **nota 1–10** de la explicación vs el apunte (misma lógica de calibración del punto 5). Compara contra el apunte.

> 🔸 **Sub-modo "el usuario elige" (on-demand):** por defecto **la IA elige** qué evaluar — así se cubre lo flojo y se evita el sesgo de elegir solo lo cómodo (que reforzaría fortalezas e ignoraría debilidades). Pero si el usuario quiere verificar algo puntual (*"déjame explicarte X que no me cierra"*), corre el Feynman auto-puntuado sobre ese concepto. Es la excepción, no el motor.

---

## Paso 4: Cerrar huecos y dudas

Durante el recall pueden pasar dos cosas distintas:

- **El usuario no recordaba** algo que sí está en el apunte → es repaso normal, se corrige y sigue.
- **El apunte no lo explicaba bien** (el usuario pregunta algo que el `.md` no cubre o cubre mal) → esto es una **mejora al apunte**, no solo un repaso. Activa el **apunte abierto** (`apuntes/AGENTS.md` A11; procedimiento en la skill `generar-apunte`, "Durante: preguntas y adiciones"):
  - Responde la duda con la mejor explicación.
  - Si esa explicación enriquece el apunte (analogía nueva, término sin definir, matiz que faltaba), propón: *"Esto enriquece la sección [X]. ¿La integro al apunte?"*
  - Si excede el alcance → guardián de alcance → NOTAS.md.

> 🔑 El repaso es también un **control de calidad** del apunte: lo que no pudiste recordar *porque estaba mal explicado* es señal de parchear, no de tu memoria.

---

## Paso 5: Consolidación multimodal (NotebookLM)

El premio de salida: **audio + video de NotebookLM**, consumidos **después** del recall (nunca antes → evita ilusión de fluidez). El agente no genera el audio/video; redacta los **prompts de Customize** que el usuario pega en NotebookLM. Protocolo completo: `consolidacion-notebooklm.md` (en esta carpeta).

Dos momentos donde aplica:

- **Al finalizar el apunte (prep):** generar los prompts base (audio + video) para que el usuario tenga el material listo.
- **Tras esta sesión:** si el recall reveló huecos nuevos, ofrecer **regenerar el prompt enfatizando el `reforzar:` recién actualizado** — así el próximo audio/video ataca justo lo que falló hoy.

> 💡 La consolidación es **premio, no requisito**. Si el usuario solo quiere recall hoy, no se fuerza; sigue siendo una sesión válida. Si un concepto quedó muy flojo, también vale un cierre verbal breve (una analogía) como mínimo.

---

## Paso 6: Cerrar la sesión y registrar (en el índice del apunte)

Al terminar, el agente **actualiza el bloque `repaso:` del `00_indice.md` del apunte** (lo escribe la IA, no el usuario → fricción casi cero). Ese bloque es la **fuente única** del estado de repaso y se **sobrescribe** cada sesión (modelo minimalista: solo el último estado, sin historial acumulado).

El bloque vive en el frontmatter del índice:

```yaml
repaso:
  ultimo: 2026-06-19          # fecha de esta sesión
  proximo: 2026-06-24         # ultimo + intervalo según cómo fue
  nivel: regular              # flojo | regular | solido | dominado
  reforzar:                   # qué atacar primero el próximo repaso
    - modelos stateless
    - curva de degradación
```

**Fecha:** usar la fecha actual del contexto.

**Cálculo del `nivel` y el próximo repaso** (heurística simple v1 — se reemplazará por un SRS real más adelante):

El `nivel` se **computa desde las notas de calibración** del Paso 3 (promedio de la sesión), no se juzga a ojo. Y los conceptos con **nota baja** son los que entran al `reforzar:`.

| Score promedio | `nivel` | Próximo intervalo |
|---|---|---|
| **≤ 5** (blancos o huecos grandes) | `flojo` | 1–2 días |
| **6–7** (recall con huecos leves) | `regular` | 4–7 días |
| **8–9** (recall limpio, casi completo) | `solido` | 2–3 semanas |
| **10** (impecable, y 2+ sesiones seguidas así) | `dominado` | 1+ mes |

> 📝 `proximo` = fecha de la sesión + intervalo según `nivel`. Es una heurística, no un algoritmo; basta para que el espaciado exista en el v1.

> 💡 Si la sesión fue corta y no se puntuó, caer al juicio cualitativo equivalente (blancos→flojo, pistas leves→regular, limpio→sólido).

> 🔑 **No hay archivo de agenda.** La pregunta *"¿qué me toca repasar hoy?"* se **deriva**: leer el campo `repaso.proximo` de cada `00_indice.md` finalizado y filtrar los que ya vencieron. La agenda es una **vista**, no un documento que se mantiene aparte (evita duplicar y desincronizar).

3. **Cierre al usuario** (corto, sin re-pegar todo):

```
✅ Sesión de repaso cerrada — [Apunte]
Firme: [lo que recordaste bien]
A reforzar: [lo que falló]
Próximo repaso sugerido: [fecha]  → registrado en el índice del apunte
```

---

## Reglas anti-fricción

- **Recall primero, siempre.** Si el agente se descubre explicando antes de preguntar, se detiene y pregunta.
- **Una pregunta a la vez**, no cuestionarios masivos.
- **No castigar el blanco.** Acompañar con pistas, no con juicio.
- **El estado de repaso lo escribe la IA** en el índice, el usuario no llena nada.
- **Sesiones cortas valen.** No exigir repasar el apunte entero; un par de secciones bien recuperadas es una sesión válida.
