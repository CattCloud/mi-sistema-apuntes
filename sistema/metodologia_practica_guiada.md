# Metodología de Práctica Guiada por Proyecto

> **Propósito:** Definir *cómo* se refuerza un conocimiento construyendo, de forma independiente de la tecnología concreta. Es el *porqué* de la etapa de práctica; el procedimiento operativo es la skill `practicar`.
> **Estado:** Metodología definida ✅ · Sin estrenar 🔄 — el primer proyecto es PB1 de TypeScript.
> **Fecha de diseño:** 27 de junio de 2026 · **Reescrita** el 18 de setiembre de 2026 para engancharla al bloque de T7.

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

## Un proyecto por bloque, encadenados

La práctica se engancha al bloque del temario (T7): un grupo de módulos cierra en **su propio proyecto**, y el proyecto del bloque siguiente **parte del anterior** en vez de empezar de cero.

- **Acotado:** mejor pequeño y terminado que grande y abandonado. Nunca un monolito que pretenda cubrirlo todo de una vez.
- **Aditivo:** cada proyecto reutiliza lo construido y le quita una limitación con lo que el bloque nuevo enseñó. Eso hace visible *para qué servía* el módulo.
- **En espiral:** volver a tocar un concepto en un contexto nuevo es repaso espaciado natural más elaboración. No es repetir: es profundizar sobre lo ya anclado.

---

## El ciclo por bloque

```text
1. CONCEPTO                 → los apuntes del bloque, generados con P1–P4 y cerrados
                              módulo por módulo (micro-ejercicio + quiz).

2. ENTORNO Y FASES          → las fases ya están en la ficha del proyecto, en el
                              temario. El agente monta el andamiaje; el alumno construye.

3. PRÁCTICA POR FASES       → por sesión: una HU en vivo con criterios de aceptación →
   (el trabajo real)          el alumno desarrolla → pistas a petición → revisión
                              socrática sobre el código del repositorio.

4. CIERRE                   → lo que costó alimenta el `reforzar:` del repaso, y queda
                              una pieza real construida (portafolio).
```

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

### Por qué las pistas son escalonadas

> 🎯 **El alumno forcejea PRIMERO. La IA nunca entrega la solución; orienta para que la encuentre.**

Una pista que resuelve ahorra dos minutos y borra el aprendizaje entero: lo que cuesta resolver se fija, lo que te dan no. Por eso se dan **a petición** y se escalan de a una, y por eso quedarse trabado un rato no es un fallo del método — es el método.

Los tres niveles concretos y qué puede decir cada uno están en la skill `practicar`, que es lo que se carga durante la sesión.

---

## Decisiones de implementación

**Resueltas:**

- [x] **Forma del proyecto → uno por bloque del temario (T7), encadenados.** No un monolito, y no un ejercicio suelto por módulo.
- [x] **Práctica guiada, no copiada → HU con criterios de aceptación; cero código; pistas escalonadas a petición.**
- [x] **Las HU no se archivan → se dan en vivo, una por sesión.** Las fases viven en la ficha del proyecto, dentro del temario; un backlog escrito envejece mal y adelanta lo que no toca (mismo criterio que el quiz, R7).
- [x] **El andamiaje sí, el ejercicio no.** El agente monta entorno, configuración y archivos vacíos; los tipos, las firmas y la lógica los escribe el alumno.
- [x] **Persistencia minimalista → un solo archivo por proyecto, `00_proyecto.md`**, con el mismo rol que el `00_indice.md` de un apunte (R1). Sin carpeta de fases y sin bitácora aparte.
- [x] **Ubicación → `practica/<ruta>/<id>-<slug>/`,** con la ruta en el path para que no choquen los bloques de temarios distintos. El código vive en el repositorio porque es lo que hace posible la revisión.

**Pendientes (capas futuras):**

- [ ] **Estado de práctica en el `00_indice.md` del apunte** (flag `practica:` que enlace qué proyecto reforzó el concepto) — se gana con dolor.
- [ ] **Enganche práctica → repaso automático** (lo que costó en la práctica entra al `reforzar:` del repaso).

---

## Relación con el resto del sistema

- **Etapa 2 (Generar):** la práctica consume los apuntes del bloque, ya cerrados. El temario fija qué se ejercita, y la ficha del proyecto fija sus fases (T7).
- **Etapa 4 (Repasar):** complementaria. El repaso fija la teoría a libro cerrado; la práctica fija el criterio construyendo. Lo que cuesta en la práctica es candidato natural a repaso.
- **Guardián de alcance** (skill `generar-apunte`, R10): se reutiliza tal cual para frenar el scope creep dentro de un proyecto (una feature que se sale del alcance se redirige a `NOTAS.md`, no se mete a la fuerza).
- **Pausa y retomar** (skill `generar-apunte`): los estados `EN PROGRESO / PAUSADO / FINALIZADO` y el patrón de pausa/retomar aplican igual al `00_proyecto.md` de cada mini-proyecto.
- **Perfil (`yo_profesional.md`, `contexto_carrera_ia.md`):** sesga la definición de cada proyecto hacia su meta (empleo, IA aplicada) y calibra el nivel (no explicar fundamentos que ya domina).
