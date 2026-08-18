# Metodología de Práctica Guiada por Proyecto

> **Propósito:** Definir *cómo* se refuerza un conocimiento construyendo, de forma independiente de la tecnología concreta. Es a la **etapa de práctica** lo que `manual_apuntes.md` es a la generación y `metodologia_repaso.md` al repaso.
> **Estado:** Metodología definida ✅ · Implementación en curso 🔄 (nueva etapa del sistema).
> **Fecha de diseño:** 27 de Junio, 2026

---

## Contexto

El sistema cubría dos etapas: *generar* apuntes (P1–P4) y *repasar* (recall + NotebookLM). Faltaba la pieza que convierte el conocimiento en **criterio aplicado**: practicar construyendo. Este documento abre la **etapa "Practicar"**, ubicada entre *Generar* y *Repasar*:

| # | Etapa | Estado |
|---|-------|--------|
| 1 | Capturar (material fuente) | 🟡 parcial (`_input/`) |
| 2 | **Generar** apuntes (P1–P4) | ✅ implementado |
| 3 | **Practicar** (esta metodología) | 🔄 en implementación |
| 4 | **Repasar** (recall + NotebookLM) | ✅ v1 |
| 5 | Conectar (mapa, prerequisitos, índice global) | ⬜ futuro |
| 6 | Diagnosticar / recomendar qué estudiar | ⬜ futuro |
| 7 | Publicar / consumir | ⬜ futuro |

**Objetivo de la etapa:** que un concepto deje de ser algo que se *leyó* y se vuelva algo que el alumno **sabe construir**, re-activando la sintaxis dormida y, sobre todo, ejercitando el **criterio** — la habilidad cara que no se memoriza.

---

## El principio central: criterio y lógica, no memoria

> 🎯 **En programación importa más desarrollar el criterio y la lógica que memorizar conceptos. La sintaxis se recupera en días; el criterio se construye en años.**

Esto se apoya en la realidad del trabajo con IA (ver `sistema/perfil/contexto_carrera_ia.md`): los modelos son **amplificadores**. Si el alumno no entiende lo que hace, la IA solo amplifica su brecha y produce deuda técnica más rápido. El valor está en saber **qué** construir y **por qué**, no en teclear la sintaxis de memoria.

De ahí la regla operativa más importante de esta etapa:

> ⚠️ **La IA es instructor, no autocompletado. NUNCA entrega el código.** Da el problema (una Historia de Usuario con criterios de aceptación) y, solo si se piden, **pistas escalonadas que orientan pero no resuelven**. El alumno conceptualiza y codifica. Darle el código lo haría *10 veces más dependiente* — justo lo contrario del objetivo.

---

## Los pilares (el *porqué*)

| Pilar | Qué exige | Por qué |
|-------|-----------|---------|
| **Práctica deliberada** | Construir piezas reales, no ejercicios de juguete | Se transfiere al trabajo real; motiva porque se ve el resultado |
| **Recuperación aplicada** | Sacar el cómo desde el criterio, no copiando | Mismo testing effect del repaso, pero a nivel de código |
| **Dificultad deseable** | Forcejear antes de recibir ayuda | Lo que cuesta resolver se fija; lo que te dan, no |
| **Elaboración** | Conectar la pieza con conceptos y con piezas previas | Construir un sistema, no fragmentos sueltos |

---

## El modelo de bloques aditivos (espiral)

La práctica se organiza en **bloques**. Un bloque = un conjunto de tecnologías que se estudian juntas + un **mini-proyecto** que las combina.

- **Aditivo:** cada bloque **reutiliza** las tecnologías de bloques previos y **añade** nuevas. Lo que repasaste en el Bloque 1 lo vuelves a usar (y profundizar) en el 2.
- **En espiral:** una tecnología puede revisitarse en bloques posteriores para cubrir temas que no entraron antes (ej. Tailwind básico en B1; grid/dark mode en un bloque posterior).
- **No monolítico:** se evita un único proyecto que pretenda cubrir todo a la vez (sería forzado e inabarcable). Son mini-proyectos encadenados, cada uno acotado.

> 🎯 **Por qué espiral:** re-encontrar una tecnología en un contexto nuevo es repaso espaciado natural + elaboración. No es repetir; es profundizar sobre lo ya anclado.

---

## El ciclo por bloque

```text
0. DIAGNÓSTICO (Pareto)     → antes de empezar, se mide el punto de partida real
   just-in-time               de las techs del bloque. Solo lo de alta frecuencia/empleabilidad.

1. CONCEPTO (referencia)    → apuntes-base: traslado ligero de Notion + generación
                              Tesla (P1–P4) solo para los huecos sin nota.

2. DEFINICIÓN DEL PROYECTO  → la IA define un mini-proyecto que combina las techs
                              del bloque + las acumuladas, y lo parte en fases.

3. PRÁCTICA POR FASES       → por sesión: concepto del día → HU con criterios de
   (el trabajo real)          aceptación → el alumno desarrolla → pistas a petición →
                              revisión socrática → integrar la pieza a la app.

4. CIERRE                   → el bloque alimenta al repaso (lo que costó) y deja
                              una pieza real construida (portafolio).
```

> 📝 **Curaduría Pareto del diagnóstico:** el paso 0 NO es una checklist académica exhaustiva. Cubre a fondo el **20% de temas que se usan el 80% del tiempo** y que pesan en **empleabilidad hoy**. Mejor un diagnóstico corto y certero que una tabla enorme que nadie llena.

---

## El ciclo por sesión (dentro del paso 3)

```text
1. CONCEPTO DEL DÍA   → repaso breve del concepto que toca (apunte de referencia).
2. HU                 → la IA presenta la Historia de Usuario + criterios de aceptación.
3. DESARROLLO         → el alumno conceptualiza y escribe el código. A libro abierto.
4. PISTAS (a petición)→ solo si las pide: escalonadas, nunca la solución (ver abajo).
5. REVISIÓN SOCRÁTICA → la IA señala qué está bien, qué mejorar y por qué. No reescribe.
6. INTEGRAR + REGISTRAR→ la pieza entra a la app; se actualiza el estado del proyecto.
```

### Pistas escalonadas (la regla de oro de esta etapa)

> 🎯 **El alumno forcejea PRIMERO. La IA nunca entrega la solución; orienta para que la encuentre.**

| Nivel | Qué da | Qué NO da |
|-------|--------|-----------|
| **Pista 1** | Reorientar: reformular el problema, recordar qué se busca | El concepto a usar |
| **Pista 2** | Nombrar el concepto y **dónde mirar** (qué apunte/sección, qué método existe) | Cómo se escribe |
| **Pista 3** | Pseudocódigo parcial o el primer paso de la estructura | El código completo y funcional |

- Las pistas son **a petición**, no automáticas. Quedarse trabado un rato es parte del método.
- Nunca pistas obvias con la respuesta dentro. Si tras la Pista 3 sigue sin salir, se acompaña con preguntas socráticas, no con la solución pegada.

---

## Decisiones de implementación

**Resueltas (v1):**

- [x] **Forma del proyecto → mini-proyectos aditivos (espiral).** No un monolito; uno por bloque, acumulativo.
- [x] **Práctica guiada, no copiada → HU + criterios de aceptación; cero código; pistas escalonadas a petición.**
- [x] **Diagnóstico por bloque, no monolítico → curado por Pareto, just-in-time** antes de cada bloque (`prompts/diagnostico_bloque.md`).
- [x] **Concepto → traslado ligero de Notion (tier referencia), just-in-time por bloque** (`prompts/migracion_notion.md`); generación Tesla (P1–P4) solo para huecos.
- [x] **Persistencia minimalista → el estado de práctica vive en el `00_proyecto.md` del mini-proyecto** (no archivo de bitácora aparte), igual que el repaso vive en el índice del apunte.
- [x] **Ubicación → los mini-proyectos viven en `practica/` (top-level),** porque cruzan varios workspaces/tecnologías.

**Pendientes (capas futuras):**

- [ ] **Estado de práctica en el `00_indice.md` del apunte** (flag `practica:` que enlace qué proyecto reforzó el concepto) — se gana con dolor.
- [ ] **Enganche práctica → repaso automático** (lo que costó en la práctica entra al `reforzar:` del repaso).
- [ ] **Plantillas de proyecto por bloque** reutilizables.

---

## Relación con el resto del sistema

- **Etapa 2 (Generar):** la práctica consume apuntes-concepto. Para techs con nota previa (Notion), basta el traslado ligero; para huecos, se genera con P1–P4 en estilo Tesla.
- **Etapa 4 (Repasar):** complementaria. El repaso fija la teoría a libro cerrado; la práctica fija el criterio construyendo. Lo que cuesta en la práctica es candidato natural a repaso.
- **`mecanismo_apunte_abierto.md`:** el **Guardián de Alcance** se reutiliza tal cual para frenar el scope creep dentro de un proyecto (una feature que se sale del bloque se redirige a `NOTAS.md`, no se mete a la fuerza).
- **`mecanismo_pausa_retomar.md`:** los estados `EN PROGRESO / PAUSADO / FINALIZADO` y el patrón de pausa/retomar aplican igual al `00_proyecto.md` de cada mini-proyecto.
- **Perfil (`yo_profesional.md`, `contexto_carrera_ia.md`):** sesga la definición de cada proyecto hacia su meta (empleo, IA aplicada) y calibra el nivel (no explicar fundamentos que ya domina).
