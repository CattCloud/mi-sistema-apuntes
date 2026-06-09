---
tema: CLAUDE.md — Arquitectura de Contexto
workspace: ia
seccion: 3
titulo: "¿Por qué importa tanto la cantidad? La mecánica del system-reminder"
estado: finalizada
prev: 02_que-es-realmente
next: 04_cuando-se-carga
---

# 🤖 ¿Por qué importa tanto la cantidad? La mecánica del system-reminder

> **CLAUDE.md no se le entrega a Claude como un archivo de configuración que él esté obligado a obedecer — se le entrega como un mensaje más en la conversación, marcado con una nota que dice "esto puede o no ser relevante".**
>
> Esa diferencia explica por qué la cantidad de texto que metes en el archivo afecta directamente cuánto caso te hace el agente.

Para entender el resto del apunte, primero hay que ver qué pasa **internamente** cuando Claude Code arranca una sesión. La gente suele imaginar que CLAUDE.md funciona como un archivo de configuración (tipo `.env` o `eslintrc`), donde lo que escribes es ley. La realidad es muy distinta.

Lo que hace Claude Code al inicio de cada sesión es esto:

1. Lee el contenido de tu CLAUDE.md.
2. Lo inyecta dentro de la conversación como si fuera**un mensaje más del usuario**.
3. Lo envuelve en una etiqueta especial llamada**system-reminder** que dice algo como:*"Este contexto puede o no ser relevante a la tarea actual. No respondas a él salvo que sea altamente relevante."*

> **Un system-reminder es una etiqueta interna que Claude Code usa para marcar contenido como "contexto sugerido" en vez de "instrucción obligatoria".**
>
> Le indica al modelo que ese bloque de texto está ahí por si ayuda, pero que no tiene que tratarlo como una orden literal. Es la diferencia entre *"esto es la regla"* y *"esto puede ayudarte si aplica"*.

La consecuencia de este diseño es contraintuitiva pero importantísima: **cuanta más información metas en CLAUDE.md, especialmente información que no aplica a todas las tareas, más probabilidad hay de que Claude termine ignorando el archivo entero**. No solo las reglas que no aplican — todas. Es decir, el ruido envenena la señal.

## 🤖 Presupuesto de instrucciones

> **Cada modelo tiene un límite aproximado de instrucciones que puede seguir consistentemente. Superarlo reduce el seguimiento de todas las instrucciones, no solo las nuevas.**
>
> No es un corte duro ("después de X líneas deja de leer"), sino un límite blando donde la calidad de seguimiento empieza a disminuir gradualmente.

Las cifras que la investigación de la comunidad ha consolidado son las siguientes:


| Tipo de modelo                                                         | Presupuesto aproximado |
| ------------------------------------------------------------------------ | ------------------------ |
| Modelos frontera con razonamiento (Claude Opus, Sonnet más recientes) | ~150-200 instrucciones |
| Modelos más pequeños (Haiku, modelos de menor tamaño)               | Bastante menos         |

**Lo que esto significa en la práctica:** cuando diseñas tu CLAUDE.md, las instrucciones que escribes compiten por el espacio dentro de ese presupuesto. Si tu archivo tiene 80 instrucciones bien escogidas, te queda margen. Si tiene 300, ya te pasaste — y no por poco.

Por eso la pregunta correcta al diseñar un CLAUDE.md no es *"¿qué más le puedo poner?"*, sino *"¿qué tengo que sacar para que lo que queda funcione?"*. Es un ejercicio de **edición**, no de **acumulación**.

## 🤖 La curva de degradación

> **Cuando te pasas del presupuesto de instrucciones, el modelo no ignora solo las últimas instrucciones — empieza a ignorarlas todas por igual.**
>
> Esta es la parte más contraintuitiva del comportamiento. Mucha gente asume que el modelo es como una pila ordenada (último que entra, primero que se ignora). No es así: la degradación es **uniforme**.

Imagina que cargas una mochila para ir a caminar. Si metes lo justo (agua, snack, chamarra), caminas ágil y respondes bien a los giros del camino. Si la sobrecargas (libros, herramientas, peso extra que no necesitas), no es que solo se te caigan las cosas de arriba — **todo el movimiento se vuelve torpe**. Te cuesta cada paso, cada giro, cada decisión rápida. La sobrecarga afecta la operación completa, no solo lo último que metiste.

Eso es exactamente lo que le pasa al modelo cuando CLAUDE.md se infla. No es que ignore *"las últimas reglas que pusiste"* — empieza a tener **adherencia más floja a TODAS las reglas del archivo**, incluyendo las que estaban perfectas desde el día uno.

**Implicación práctica:** una sola regla mala (poco aplicable, demasiado específica, hotfix puntual) no solo es ruido por sí misma — **degrada la efectividad de todas las demás reglas que sí estaban bien escritas**. Por eso meter "cualquier cosa por si acaso" es activamente perjudicial, no neutral.

## 🤖 Tamaño recomendado

> **Mientras más corto, mejor. El consenso converge en archivos por debajo de las 200-300 líneas, y los ejemplos de referencia de la industria están incluso más cortos.**
>
> Esta no es una regla estética — es la consecuencia directa del presupuesto de instrucciones y de la curva de degradación.

Las tres referencias que circulan en la comunidad son las siguientes:


| Fuente                                                          | Recomendación                                  |
| ----------------------------------------------------------------- | ------------------------------------------------- |
| Documentación oficial de Claude Code                           | Menos de 200 líneas por archivo                |
| Consenso de la comunidad de desarrolladores                     | Menos de 300 líneas, mientras más corto mejor |
| HumanLayer (referencia que la industria cita como buen ejemplo) | Menos de 60 líneas en su CLAUDE.md raíz       |

**Diferencia clave:** la cifra de HumanLayer no es porque su proyecto sea trivial — es porque ellos llevan al extremo el principio de que CLAUDE.md es el **núcleo mínimo** del onboarding. Todo lo demás vive en otros lados (lo veremos más adelante).

En otras palabras, si tu CLAUDE.md ya pasa de 200 líneas, esa es la señal de que algo más necesita cambiar — no que necesitas escribir mejor, sino que necesitas **dejar de meter en este archivo cosas que no son onboarding universal**. La solución no es ser más conciso. La solución es **mover contenido a otros lugares** que también veremos más adelante.


---
[[02_que-es-realmente|← anterior]] · [[00_indice|índice]] · [[04_cuando-se-carga|siguiente →]]
