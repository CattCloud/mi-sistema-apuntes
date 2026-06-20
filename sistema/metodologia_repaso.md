# Metodología de Repaso

> **Propósito:** Definir *cómo* se repasa un tema en este sistema, de forma independiente de las herramientas. Es a la **etapa de práctica/repaso** lo que `manual_apuntes.md` es a la etapa de generación.
> **Estado:** Metodología definida ✅ · Implementación pendiente ⬜ (nueva etapa del sistema, fuera del roadmap T1–T11 original).
> **Fecha de diseño:** 19 de Junio, 2026

---

## Contexto

El sistema se llama "Mi Sistema de Estudio", pero hasta ahora solo cubría **una** etapa: *generar* apuntes (flujo P1–P4). Todo lo que viene después de escribir un apunte —repasarlo, retenerlo, conectarlo— no existía. Este documento abre la **etapa 4 (Repasar)** del ciclo de vida del conocimiento:

| # | Etapa | Estado |
|---|-------|--------|
| 1 | Capturar (material fuente) | 🟡 parcial (`_input/`) |
| 2 | **Generar** apuntes (P1–P4) | ✅ implementado |
| 3 | Conectar (mapa, prerequisitos, índice global) | ⬜ futuro |
| 4 | **Repasar** (esta metodología) | 🔄 en diseño |
| 5 | Diagnosticar / recomendar qué estudiar | ⬜ futuro |
| 6 | Publicar / consumir (GitHub Pages, móvil) | ⬜ futuro |

**Objetivo de la etapa de repaso:** que un apunte ya escrito deje de ser solo lectura y se convierta en conocimiento **retenido**, con la **mínima fricción posible** — porque un método que se abandona no sirve, por bueno que sea.

---

## Los 4 pilares (el *porqué*)

Todo repaso en este sistema respeta cuatro principios de la ciencia del aprendizaje:

| Pilar | Qué exige | Por qué |
|-------|-----------|---------|
| **Recall activo** | Recuperar a libro cerrado, no releer | Recordar es lo que construye memoria; reconocer no (testing effect) |
| **Codificación dual** | Combinar texto con visual/audio | El cerebro retiene más con dos canales que con texto solo |
| **Repaso espaciado** | Repetir en el tiempo, no de una sentada | El olvido parcial entre sesiones es lo que fortalece la huella |
| **Elaboración** | Conectar con lo que ya sabes / otros apuntes | Comprender, no memorizar aislado |

---

## La regla de oro: recuperación PRIMERO

> 🎯 **Quedarse en blanco no es el fallo del método — es el método.**

La decisión metodológica central, respaldada por la evidencia:

- **Testing effect:** intentar recordar *antes* de re-estudiar fija más que volver a leer.
- **Pretesting / generación con error:** incluso intentar y **fallar** antes de saber la respuesta prepara al cerebro para codificarla cuando llega. El esfuerzo en vano no se desperdicia.
- **Dificultades deseables (Bjork):** lo que se *siente* más difícil y lento retiene mejor a largo plazo.
- **Ilusión de fluidez:** releer/ver algo se siente como saberlo, pero es reconocimiento, no memoria. Es la trampa a evitar.

Por eso lo visual-multimodal va **después** del recall (como consolidación y premio), nunca antes (sería ilusión de fluidez).

> ⚠️ **Condición innegociable:** el "blanco" solo sirve con **feedback inmediato**. No te quedas en blanco y te rindes — intentas, forcejeas, y *enseguida* viene la corrección. Para que el blanco no desmotive, la IA da **pistas escalonadas** y crédito parcial: sigue siendo recall, pero no te deja colgado.

---

## El ciclo de repaso (el *cómo*)

Proceso repetible por tema:

```text
1. RECUPERACIÓN ACTIVA        → a libro cerrado: la IA te interroga / explicas (Feynman).
   (el trabajo real)             Con pistas escalonadas para que el blanco no te deje colgado.

2. FEEDBACK Y CIERRE           → corrección inmediata, resolver dudas marcadas,
                                  parchear el apunte si faltó algo.

3. CONSOLIDACIÓN MULTIMODAL    → audio / video / infografía. Premio + codificación dual.
   (premio, baja fricción)        AHORA: la herramienta lo genera.  DESPUÉS: la estructura la creas tú.

4. PROGRAMACIÓN ESPACIADA      → según cómo te fue, cuándo toca repetir.
```

> 📝 **Nota de diseño:** el visual pasó de "gancho de entrada" a "premio de salida". Así se resuelve la tensión del orden — consolida y motiva *sin* arruinar el recall.

---

## La progresión de fricción

El sistema sube su potencia **gradualmente**, para no espantar al usuario en la fase frágil (la adopción).

> 🎯 **Energía de activación:** un método mejor que abandonas pierde contra un método peor que mantienes. Primero se baja la barrera de entrada; la potencia se sube cuando el hábito ya está formado.

|  | **Ahora (adopción)** | **Después (ya adaptado)** |
|---|---|---|
| Visual del paso 3 | Lo **genera** la herramienta (consumes) | La **estructura la decides tú** (creas) |
| Fricción | Mínima | Media, solo en temas clave |
| Objetivo | Construir el hábito | Subir la potencia |

> 🔑 **Lo que se aplaza es la *creación* del visual (cara en fricción), NO el *recall-primero* (que no cuesta fricción extra — es solo el orden). El recall activo aplica desde el día uno.**

**Por qué "crear tú" es más potente (para cuando se active):** producir tú el visual ejecuta varios pilares en un solo acto — recall (sacas el contenido), elaboración (decides qué conecta con qué), codificación dual (lo traduces a forma visual) y comprensión (comprimir obliga a entender). Consumir un visual activa solo uno (codificación dual). El reparto ideal: **tú decides la estructura** (lo que enseña), **la herramienta renderiza** (lo tedioso).

---

## Dónde entran las herramientas (complementos, no el método)

Las herramientas son **motores** que llenan los pasos del ciclo. El método manda; la herramienta se elige después. Mapa tentativo (no decidido aún):

| Paso del ciclo | Herramienta candidata | Rol |
|----------------|----------------------|-----|
| 1. Recuperación activa | La IA (interrogación conversacional) · Anki (tarjetas) | Generar preguntas, corregir, dar pistas |
| 3. Consolidación multimodal | **NotebookLM — Audio + Video Overview** (manual) ✅ | El usuario sube el apunte; **la IA redacta los prompts de Customize** (pedagógicos, con personalidad calibrada por arquetipo, enfatizando `reforzar:`). Protocolo: `prompts/repaso_consolidacion_notebooklm.md` |
| 4. Programación espaciada | Anki / registro con fechas | Algoritmo de repaso espaciado |

> 💡 **Principio:** elegir la herramienta *después* de fijar el método evita amoldar el estudio a la herramienta en vez de al revés.

---

## Decisiones de implementación

La metodología está fija. Algunas decisiones de implementación ya se tomaron (v1); otras siguen abiertas.

**Resueltas (v1):**

- [x] **Persistencia → minimalista en el índice.** El estado de repaso (último, próximo, nivel, qué reforzar) vive en un bloque `repaso:` del `00_indice.md` de cada apunte. **Fuente única**: no hay archivo de bitácora ni mazo aparte. Se sobrescribe cada sesión (sin historial acumulado).
- [x] **Enganche con la generación → on-demand + estado en el índice.** El repaso se dispara cuando el usuario lo pide (*"repasemos X"*) sobre un apunte `FINALIZADO`, no se autodispara. La conexión generación↔repaso es el propio índice: el mismo archivo que marca `estado: FINALIZADO` aloja el estado de repaso.
- [x] **Espaciado → heurística propia simple.** Tabla flojo/regular/sólido/dominado → intervalo (ver `prompts/repaso_recall.md`). No se delega en Anki todavía.
- [x] **Agenda → derivada, no almacenada.** *"¿Qué repaso hoy?"* se calcula leyendo `repaso.proximo` de los índices finalizados; no es un documento que se mantenga.
- [x] **Consolidación multimodal (Paso 3) → NotebookLM manual, audio + video.** La IA redacta los prompts de Customize (calibrados por arquetipo, enfocados en `reforzar:`); el usuario los pega y genera. Ver `prompts/repaso_consolidacion_notebooklm.md`.

**Pendientes (capas futuras):**

- [ ] **Modalidades adicionales:** dudas marcadas, mazo formal con SRS — ¿cuáles y cuándo.
- [ ] **Dudas marcadas:** sintaxis para comentar dudas en el `.md` durante la lectura y cómo la IA las resuelve (conecta con `mecanismos/mecanismo_apunte_abierto.md`).
- [ ] **Anki + automatización NotebookLM:** Anki para el espaciado real, y los tools MCP/browser para automatizar NotebookLM (hoy es manual). Candidatos anotados en `NOTAS.md`. Capa futura — se gana con dolor.
- [ ] **Trazabilidad:** si más adelante se quiere ver la *evolución* (curva de dominio en el tiempo), habrá que pasar del modelo minimalista (último estado) a un log histórico.

---

## Relación con el resto del sistema

- **Etapa 2 (Generar):** el repaso consume lo que produce P1–P4. La calidad del apunte condiciona la calidad del repaso. El **puente** entre ambas etapas es el `00_indice.md`: es el checkpoint de generación (`estado`) **y** el hogar del estado de repaso (`repaso:`) — un solo archivo conecta las dos etapas, sin documentos paralelos.
- **Etapa 3 (Conectar) y 5 (Recomendar):** dependen de una capa de metadata/índice global que aún no existe. El repaso puede empezar sin ellas (por tema aislado), pero el recomendador las necesitará.
- **`mecanismo_apunte_abierto.md`:** las "dudas marcadas" del paso 2 son una extensión natural del Apunte Vivo — una duda resuelta que enriquece puede integrarse al apunte.
