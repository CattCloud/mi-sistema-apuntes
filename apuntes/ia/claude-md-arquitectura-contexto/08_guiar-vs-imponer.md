---
tema: CLAUDE.md — Arquitectura de Contexto
workspace: ia
seccion: 8
titulo: "Guiar vs imponer — la línea técnica exacta"
estado: finalizada
prev: 07_mecanismos-escalar
next: 09_nucleo-minimo-vs-capas
---

# 🤖 Guiar vs imponer — la línea técnica exacta

A lo largo del apunte hemos repetido una idea clave: CLAUDE.md es **guía blanda**, no configuración forzada. El modelo puede ignorar lo que está ahí si decide que no aplica. Esa es una característica, no un bug.

Pero entonces surge una pregunta legítima: **¿qué pasa cuando una regla SÍ tiene que cumplirse pase lo que pase?** Por ejemplo:

- *"Nunca usar `eval()` por seguridad."*
- *"Todos los commits deben pasar por linter antes de mergear."*
- *"Prohibido escribir directo a producción sin pasar por staging."*

Si pones eso en CLAUDE.md y el modelo lo ignora un día, el costo puede ser real. Aquí es donde entra la distinción técnica más importante de todo el apunte:

> **CLAUDE.md no es la única herramienta del ecosistema. Hay otras dos que cubren lo que CLAUDE.md no debería intentar cubrir: hooks (para imposición técnica) y auto memory (para la bitácora que el agente lleva por sí solo).**
>
> Las tres conviven y cada una tiene un rol distinto. Confundir cuál usar para qué es el error de diseño más caro.

## 🤖 CLAUDE.md vs Hooks vs Auto Memory

> **Claude Code tiene tres mecanismos de "memoria" o "instrucciones" que cumplen funciones complementarias: CLAUDE.md guía blandamente, los hooks imponen reglas duras, y la auto memory acumula el aprendizaje del agente entre sesiones.**
>
> Saber cuál usar para qué te ahorra meter en CLAUDE.md cosas que pertenecen a otro lado.

Antes de seguir, conviene aclarar los dos términos nuevos:

> **Un hook es un mecanismo técnico de Claude Code que se ejecuta automáticamente en momentos específicos (antes o después de usar una herramienta, al iniciar o terminar una sesión) y puede bloquear acciones del agente.**
>
> Es decir, los hooks no son sugerencias — son **imposición técnica**. Si un hook PreToolUse decide que el agente no puede ejecutar `rm -rf`, no se ejecuta. No hay negociación con el modelo. Es la única forma de tener garantías reales de cumplimiento.

> **La auto memory es un sistema de memoria que Claude lleva por sí solo, donde acumula hallazgos entre sesiones: comandos que descubrió, soluciones a bugs, notas de arquitectura que infirió leyendo el código.**
>
> Es decir, es la "bitácora" del agente — pero la escribe él mismo, no tú. Tú no controlas qué entra ni cuándo. El sistema vive en una carpeta interna y se actualiza solo.

La comparativa de las tres herramientas es la siguiente:


| Mecanismo         | Tipo                             | Quién la controla               | Cuándo usarla                                                                               |
| ------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| 🟢**CLAUDE.md**   | Guía blanda (sugerencia)        | Tú la escribes y la curas       | Onboarding del proyecto: stack, arquitectura, convenciones, decisiones de diseño            |
| 🔴**Hooks**       | Imposición dura (bloqueo)       | Tú los configuras técnicamente | Reglas que**no admiten excepción**: seguridad, compliance, prevención de errores críticos |
| 🟡**Auto memory** | Bitácora automática (registro) | Claude la escribe por sí solo   | Aprendizaje acumulado del agente: comandos descubiertos, fixes, hallazgos de debugging       |

🟢 = Sugerencia que el modelo puede ignorar · 🔴 = Bloqueo técnico que no puede ignorar · 🟡 = Memoria automática del agente

**Caso de uso real para ver la diferencia:**

Imagina que en tu equipo decidieron *"nunca commitear directo a main, siempre por PR"*. Tienes tres formas de manejarlo:

- **Mala forma:** poner en CLAUDE.md*"NUNCA commitear directo a main, usar siempre PR"*. Esto es guía blanda — el modelo puede decidir saltársela en un momento de "urgencia".
- **Forma correcta:** configurar un**hook PreToolUse** que detecte si el agente intenta ejecutar`git push origin main` y lo bloquee con un mensaje*"Push directo a main bloqueado, usa PR"*. El agente no puede saltarse esto, ni queriendo.
- **Auto memory:** ni siquiera entra acá — la auto memory es para cosas que el agente**descubre solo** (por ejemplo, que`pnpm run test:integration` funciona mejor que`pnpm test` para un caso específico).

**Implicación práctica:** la pregunta clave antes de escribir algo en CLAUDE.md es: *"¿esto puede ser ignorado por el modelo sin que el mundo se rompa?"*. Si la respuesta es sí, va en CLAUDE.md. Si la respuesta es no, va en un hook.

## 🤖 Claude no es un linter

> **Una de las tentaciones más comunes es usar CLAUDE.md para imponer reglas de estilo de código. Esto es un error grave: el modelo no es la herramienta correcta para eso, y meterlas ahí degrada la efectividad del archivo entero.**
>
> Para reglas de estilo existen herramientas determinísticas (ESLint, Prettier, Biome, TypeScript) que son más rápidas, más confiables y más baratas. Claude debe usarlas, no reemplazarlas.

Imagina que contratas a un escritor profesional (Claude) para que te ayude a redactar un libro. Sería absurdo pedirle que también haga el trabajo de un corrector ortográfico (linter): es lento, costoso, y se va a equivocar más que un programa especializado. Lo correcto es que el escritor escriba, y un corrector ortográfico separado revise la ortografía después. Cada herramienta hace lo que mejor sabe hacer.


| ❌ Mito                                                                             | ✅ Realidad                                                                                                                                                                  |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| *"Si pongo todas mis reglas de estilo en CLAUDE.md, el agente las va a seguir."*    | El agente**a veces** las sigue, a veces no. Y meterlas degrada la efectividad de TODAS las reglas del archivo (recuerda la curva de degradación).                           |
| *"Es más rápido decirle a Claude las reglas de estilo que configurar un linter."* | A corto plazo sí, a mediano plazo no. Un linter las aplica al 100% en milisegundos; Claude las aplica al 70% en segundos costosos.                                          |
| *"El linter no entiende contexto, Claude sí."*                                     | Cierto, pero las reglas de estilo (indentación, comillas, semicolons, naming) son**justo el tipo de regla que no necesita contexto**. Son determinísticas por definición. |

**Lo que sí debe estar en CLAUDE.md sobre estilo de código:**

- *"Este proyecto usa ESLint con la configuración de `.eslintrc.json`."*
- *"Después de cualquier cambio, correr `pnpm lint` para validar."*

Es decir, **señalar la existencia del linter y los comandos para usarlo** — no replicar sus reglas en el archivo.

**Por qué esto importa más de lo que parece:** los LLMs aprenden por contexto. Si tu código sigue ciertas convenciones, con un par de búsquedas en el codebase el agente tiende a seguir esas convenciones sin que se lo digas. Esa es la versión más profunda de *"guiar sin obstruir"*: confías en que el modelo aprende leyendo, en lugar de precargarle reglas que de todos modos un linter aplica mejor.

## 🤖 Tres antipatrones que disparan que Claude ignore el archivo

> **Hay tres formas concretas de matar la efectividad de tu CLAUDE.md, todas relacionadas con tratarlo como algo que no es. Conocerlas te ayuda a evitarlas activamente.**
>
> Estos antipatrones no son teóricos: son los errores más documentados que la comunidad ha identificado al revisar CLAUDE.md de proyectos reales.

Antes de la tabla, conviene aclarar el término:

> **Un antipatrón (anti-pattern) es una práctica que parece una buena idea al principio pero que en la práctica produce resultados negativos consistentemente.**
>
> Es decir, no es solo "una mala práctica" — es una mala práctica que **engaña** porque tiene apariencia razonable. Reconocer antipatrones es parte importante de la madurez técnica.

Los tres antipatrones más comunes con CLAUDE.md son:


| # | Antipatrón                                                                                                                  | Por qué parece buena idea                      | Por qué falla                                                                                                                                                                                                                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | **Autogenerar el archivo** (con scripts, IAs, o copiando templates sin curar)                                                | *"Me ahorro el tiempo de escribirlo a mano."*   | El archivo termina lleno de cosas no aplicables a tu proyecto real. Pierde precisión y el modelo lo trata como ruido. CLAUDE.md es el punto de mayor apalancamiento del sistema — cada línea merece ser revisada manualmente. |
| 2 | **Usarlo para hotfixes** (cada vez que Claude se equivoca en algo, agregas una nota *"no hagas X"*)                          | *"Así no se vuelve a equivocar."*              | El archivo crece sin control con correcciones específicas que no aplican universalmente. La curva de degradación se dispara y el modelo termina ignorando reglas que sí importaban.                                           |
| 3 | **Meter cosas no universalmente aplicables** (procedimientos de tareas puntuales, decisiones de un sprint, fixes temporales) | *"Por si acaso lo necesito en alguna sesión."* | Cada línea no universal degrada la adherencia a TODAS las reglas (no solo a esa). El "por si acaso" es activamente perjudicial, no neutral.                                                                                     |

**Cómo evitarlos en la práctica:**

1. **No autogenerar:** usa`/init` solo como**punto de partida**. Cada línea que quede en el archivo debe pasar por una revisión consciente tuya.
2. **No usarlo para hotfixes:** si el agente se equivocó en algo específico, en lugar de agregar*"no hagas X"* a CLAUDE.md, evalúa: ¿es una regla universal (sí va) o un caso puntual (no va)?. Si es puntual, deja que el agente aprenda por contexto leyendo el código.
3. **Filtrar por universalidad:** antes de agregar cualquier línea, hazte la pregunta del filtro:*"¿esto sirve para onboardear a Claude en cualquier sesión futura, o es algo puntual?"*. Si es puntual, no entra.

Debes recordar que CLAUDE.md no se vuelve inútil porque está mal escrito — se vuelve inútil porque acumula contenido que no debería estar ahí. La disciplina es **defensiva**: lo importante no es lo que metes, sino lo que dejas afuera.


---
[[07_mecanismos-escalar|← anterior]] · [[00_indice|índice]] · [[09_nucleo-minimo-vs-capas|siguiente →]]
