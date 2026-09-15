# Reglas de `contexto/plan_estudio/` — temarios y sílabos

> Aplican a los temarios de las rutas y a los sílabos de cursos externos. Las reglas generales R1-R12 están en `/AGENTS.md`.

**T1 · Un temario es el mapa de una ruta.** Módulos en orden de estudio (el orden de los números **es** el orden), temáticas por módulo, la pregunta que responde cada módulo, qué no entra, sus fuentes y cómo se cierra. Un módulo = un apunte (carpeta con `00_indice.md`); una temática = un archivo de sección. Cuando el temario ya fija el esqueleto, se entra casi directo a P3⇄P4 (skill `generar-apunte`).

**T2 · Las preguntas de evaluación viven aquí.** Las preguntas de quiz y los enunciados base de cada cierre son fuente para el agente: nunca se copian al apunte (R7). Los casos de decisión sí pueden escribirse en `99_cierre.md`, porque no tienen respuesta que copiar.

**T3 · Un sílabo externo es insumo, no ruta.** `silabo_curso_*.md` se filtra clase por clase contra el temario (✅ ver · 🔶 parcial · ⬜ saltar), con la duración real calculada y cada sección mapeada a su módulo. Protocolo: skill `integrar-curso`.

**T4 · Reordenar o dividir un módulo lo decide el usuario** (R4). Se presenta la propuesta y, si se aprueba, la división queda escrita en el temario con su porqué (así se hicieron B3 / B3b y B4 / B4b).

**T5 · El estado de un módulo se toma de su apunte** (R1). La columna de estado del índice del temario y la del índice del workspace son resúmenes: se actualizan al cerrar el módulo, nunca antes que el `00_indice.md` del apunte.

**T6 · Cada ruta tiene su regla de cierre.** Arquitectura: el caso se resuelve sin ayuda. TypeScript: micro-ejercicio con el compilador + quiz de lectura en vivo. Cloud: práctica en consola + caso. Un módulo pasa a ✅ cuando cumple la suya, no cuando se terminan de escribir las secciones.
