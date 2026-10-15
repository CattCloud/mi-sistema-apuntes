# Contexto — Tesla

<!-- Memoria de trabajo: menos de 150 líneas. Fechas absolutas. Sin secretos. La mantienen handoff y tidy-memory. -->
<!-- Solo el rediseño del sistema. El estado de cada apunte vive en su 00_indice.md (R1). Repo público: nada personal. -->

> Última actualización: 2026-10-15

## Estado
Tesla está en etapa de **descubrimiento de mecanismos**: no se ha cambiado nada del sistema todavía.
El diagnóstico (2026-10-09) mostró que el uso real se concentra en leer: 57 secciones y 9 cierres, frente a 1 ejercicio de práctica (`practica/typescript/m1/ejemplo.ts`), 0 proyectos de bloque y 2 apuntes repasados alguna vez, ambos con el siguiente repaso vencido (arquitectura M1 desde 2026-08-28 y CLAUDE.md desde 2026-06-24); 7 módulos finalizados nunca se repasaron.
La causa no es la redacción de los apuntes (sirven y se mantienen), sino el recorrido: se entra por la lectura, la práctica espera al cierre del bloque (T7) y nada empuja al repaso.
Artefactos de apoyo (privados): mapa del sistema actual https://claude.ai/artifact/F3uKXaCMZphr5QpRRyMnQ8 · PRIMM aplicado a M3 §5 https://claude.ai/artifact/E5YuqfY3WZ98c1d2uMyLke

## Decisiones
| Fecha | Decisión | Por qué |
|---|---|---|
| 2026-10-09 | El análisis se hace sin tocar el sistema hasta que Erick lo ordene | Etapa de análisis; el cambio puede dar un giro al sistema |
| 2026-10-15 | Se mantiene la metodología actual y se le agregan mecanismos dirigidos a los problemas detectados | Adoptar una metodología nueva cuesta tiempo y puede no funcionar; la actual sí funciona para entender |
| 2026-10-15 | Descartado adoptar PRIMM completo; queda como fuente de ideas (las apuestas «¿compila?» antes de leer) | Mismo motivo: costo de adaptación |
| 2026-10-15 | Mecanismos candidatos: system.html de Tesla (eje central, como en Okaeri), temporizador de lectura, gamificación de la práctica, mini-reto al final de cada sección, 2–3 apuestas al inicio de la sección, vista que muestra primero los repasos vencidos | Cada uno ataca un problema: fricción de entrada, lectura sin fin, práctica aburrida o tardía, respuestas ya escritas en el apunte, repaso olvidado |
| 2026-10-15 | El temporizador va como **límite** (p. ej. 25 min y pasas a la acción), no como contador de tiempo leído | Un contador premiaría leer más, justo lo que se quiere bajar |
| 2026-10-15 | La gamificación premia lo que haces (retos, cierres, repasos), nunca la lectura, y evita rachas que se rompen | Una racha rota se vive como fracaso y desmotiva |

Hallazgos sueltos para el rediseño: `sistema/perfil/` está vacía pero `AGENTS.md`, `practicar` y `repasar` la citan; `NOTAS.md` numera las etapas distinto que las metodologías (Conectar es la 5, no la 3); el micro-ejercicio de M3 en el temario adelanta el resultado («Falla… compila»).

## Siguiente paso
Elegir con Erick qué mecanismo se pule primero: la gamificación (dijo que aún le falta pulirla) o qué debe mostrar el system.html de Tesla. Después, dibujar la propuesta en el mismo formato de 5 pasos que el mapa actual para compararlas lado a lado.
Al construir el system.html: usar `agatha:impeccable` en Sonnet (preferencia global de interfaces).

Última conversación: Análisis de metodología y mecanismos de Tesla · 2026-10-15 · `claude --resume b7a6f6dc-11ec-4ceb-8503-57624775da47`
