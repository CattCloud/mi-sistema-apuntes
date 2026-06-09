---
tema: CLAUDE.md — Arquitectura de Contexto
workspace: ia
seccion: 4
titulo: "¿Cuándo se carga CLAUDE.md? El presupuesto en cada interacción"
estado: finalizada
prev: 03_mecanica-system-reminder
next: 05_sistema-de-archivos-scope
---

# 🤖 ¿Cuándo se carga CLAUDE.md? El presupuesto en cada interacción

> **CLAUDE.md no se carga una sola vez al inicio de la conversación — se carga en cada interacción, junto con todo lo demás que se va acumulando: tus mensajes, las respuestas del agente, los resultados de las herramientas que usa.**
>
> Esa carga repetida en cada turno es lo que hace que el "costo" real de CLAUDE.md en el presupuesto sea mucho más alto de lo que parece.

Hasta aquí ya vimos que el modelo tiene un presupuesto limitado de instrucciones que puede seguir consistentemente. Pero falta una pieza clave para entender por qué la disciplina de "menos es más" es tan estricta: **cuándo y cómo se evalúa ese presupuesto**.

La intuición natural es pensar que CLAUDE.md se carga una vez al ejecutar `claude` en la terminal y ya queda "instalado" para toda la sesión. La realidad es distinta — y entenderla cambia completamente cómo decides qué meter en el archivo.

## 🤖 Stateless no es solo entre conversaciones — también entre mensajes

> **Cada vez que el modelo tiene que generar una respuesta, recibe de nuevo toda la conversación desde el principio. No "recuerda" lo que pasó en el mensaje anterior — se le vuelve a mandar todo el contexto acumulado, en cada turno.**
>
> Es decir, la naturaleza stateless (sin estado) no opera solo entre una conversación y otra, sino entre **cada mensaje individual** de una misma conversación.

En la sección 1 dijimos que los modelos son funciones sin estado y que cada llamada es independiente. Aplicado solo entre conversaciones distintas, esto suena lógico: cierras una sesión, abres otra, el agente arranca de cero. Pero la naturaleza stateless va más profundo que eso.

Dentro de una misma conversación, **cada turno también es una llamada independiente al modelo**. Lo que pasa internamente es esto:

1. Tú escribes tu mensaje 5.
2. Claude Code toma**todos los mensajes anteriores** (1, 2, 3, 4) más el tuyo nuevo (5) más CLAUDE.md más las instrucciones internas del agente.
3. Le manda**todo ese paquete completo** al modelo como si fuera la primera vez.
4. El modelo genera la respuesta basándose en ese paquete entero.
5. Para el siguiente turno (mensaje 6), el ciclo se repite: se vuelve a mandar todo desde el principio + el mensaje 6.

Esto explica por qué las conversaciones largas se "sienten" lentas y costosas: cada turno está reprocesando toda la conversación previa, no solo el último mensaje.

La razón por la que parece que el agente "recuerda" lo que pasó antes en la conversación no es que tenga memoria — es que Claude Code está **reenviándole la conversación entera en cada turno** para simular esa memoria.

## 🤖 Qué compite por el presupuesto en cada turno

> **En cada turno, el presupuesto del modelo se reparte entre cuatro capas que se acumulan: instrucciones internas del agente, CLAUDE.md, todos los mensajes de la conversación, y todos los resultados de herramientas usadas hasta ese momento.**
>
> Todas estas capas compiten por el mismo espacio limitado.

Hay cuatro tipos de contenido que ocupan presupuesto en cada llamada al modelo:


| Capa                              | Qué contiene                                                 | Cuándo entra                       | Cuánto persiste |
| ----------------------------------- | --------------------------------------------------------------- | ------------------------------------- | ------------------ |
| Instrucciones internas del agente | Reglas de cómo opera Claude Code (no las controlas tú)      | Desde el primer turno               | Toda la sesión  |
| **CLAUDE.md**                     | El archivo que tú diseñas — onboarding del proyecto        | Desde el primer turno               | Toda la sesión  |
| Mensajes de la conversación      | Lo que tú escribes y lo que el agente responde               | Desde el turno donde se escriben    | Toda la sesión  |
| Resultados de herramientas        | Contenido de archivos leídos, salidas de comandos ejecutados | Desde que se ejecuta la herramienta | Toda la sesión  |

**Implicación práctica:** en el primer turno (justo después de tu primer mensaje), las capas principales que compiten son las instrucciones internas + CLAUDE.md + tu primer mensaje. Es cuando hay más espacio "libre". A medida que la conversación avanza, las otras dos capas (mensajes acumulados + resultados de herramientas) van creciendo y comiendo presupuesto.

Es decir, **una conversación larga le deja al modelo cada vez menos espacio para procesar bien CLAUDE.md**, incluso si el archivo no cambió.

## 🤖 Por qué CLAUDE.md tiene "costo persistente"

> **A diferencia de tus mensajes o los resultados de herramientas, CLAUDE.md está presente en absolutamente todos los turnos de la sesión. Su costo no es "una vez", sino "una vez por cada respuesta del agente".**
>
> Eso convierte cada línea de CLAUDE.md en una decisión de impacto multiplicado.

Una línea en CLAUDE.md no se paga "una vez al inicio" — se paga **una vez por cada respuesta** que el agente genera. En una conversación de 50 turnos, una línea inútil en CLAUDE.md es ruido evaluado 50 veces. Y al revés, una línea bien escogida es onboarding aplicado 50 veces.


| Capa                                 | Costo por turno                    | Costo total en 50 turnos |
| -------------------------------------- | ------------------------------------ | -------------------------- |
| Tu mensaje #5                        | Se evalúa desde el turno 5 al 50  | 46 evaluaciones          |
| Resultado de un`Read` en el turno 10 | Se evalúa desde el turno 10 al 50 | 41 evaluaciones          |
| **Cualquier línea de CLAUDE.md**    | Se evalúa en todos los turnos     | **50 evaluaciones**      |

**Lo que esto cambia en cómo piensas el archivo:** cada línea de CLAUDE.md tiene **el costo persistente más alto de todo lo que entra al modelo durante la sesión**. Por eso meter algo "por si acaso" no es neutral — es decidir que ese contenido va a ser pagado en cada respuesta del agente, durante toda la sesión, sin importar si aplicó o no.

Debes recordar que esta es la razón mecánica detrás de toda la disciplina del apunte: la cifra de "menos de 200 líneas" no es estética ni arbitraria — es la consecuencia directa de que cada línea se evalúa **una vez por turno, multiplicado por todos los turnos de la sesión**.


---
[[03_mecanica-system-reminder|← anterior]] · [[00_indice|índice]] · [[05_sistema-de-archivos-scope|siguiente →]]
