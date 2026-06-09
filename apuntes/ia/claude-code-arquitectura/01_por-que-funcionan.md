---
tema: Claude Code — Arquitectura Interna
workspace: ia
seccion: 1
titulo: "¿Por qué los agentes de código por fin funcionan?"
estado: finalizada
prev: null
next: null
---

# 🤖 ¿Por qué los agentes de código por fin funcionan?

> **Los coding agents existen desde hace años, pero hasta hace poco eran malos. El cambio no vino de una arquitectura más sofisticada, sino de lo contrario: modelos mucho mejores + una arquitectura mucho más simple.**
>
> Esta es la tesis que recorre todo el apunte: entender Claude Code es entender qué dejaron de hacer, no qué agregaron. 

Si llevas un tiempo en este mundo, probablemente lo recuerdes. Los primeros agentes autónomos de código eran frustrantes: se perdían a mitad de tarea, ejecutaban comandos sin sentido, alucinaban funciones que no existían. La promesa de "dile al agente qué quieres y se va solo a hacerlo" sonaba genial, pero en la práctica acababas peleándote con la herramienta más que con el problema. Mucha gente probó y desistió.

Es decir, durante años el campo intentó resolver el problema **alrededor del modelo**: armando arquitecturas complejas para compensar lo que el modelo no podía hacer bien. Aparecieron los **DAGs**, grafos donde cada nodo era un prompt especializado y el flujo se ramificaba según clasificadores ("si el usuario pide X, ve por esta rama; si pide Y, por esta otra"). Aparecieron capas de **RAG** con bases de datos vectoriales para que el agente "recordara" el código del proyecto. Aparecieron pipelines con decenas de prompts en cadena, cada uno tratando de prevenir un error específico. Todo eso eran **andamios** para sostener un modelo que aún no daba la talla.

Entonces, ¿qué cambió para que de pronto Claude Code, Codex y otros funcionaran de verdad? Dos cosas, en este orden:

**1. Los modelos se volvieron mucho mejores en tool calling.**

> **Tool calling:** capacidad del modelo para **pedirle al sistema** que ejecute acciones a través de **herramientas** declaradas (funciones como `read`, `bash`, `web_search`). El modelo no actúa por sí mismo: genera una llamada estructurada — qué herramienta usar y con qué parámetros — y el sistema la ejecuta y le devuelve el resultado.

Los LLMs aprendieron a:

- Llamar herramientas de forma **estructurada** (en un formato que el sistema puede ejecutar sin ambigüedad).
- Decidir **cuándo** usar cada una según lo que pide la tarea.
- **Recuperarse de errores** cuando una llamada falla, reintentar o cambiar de estrategia.
- Seguir instrucciones con **consistencia** — algo crítico, porque sin esto todo lo demás se cae.

Antes, pedirle a un modelo "usa esta herramienta cuando corresponda" era una lotería. Hoy es algo en lo que está entrenado.

## 💡 Contexto: ¿qué es "el sistema"?

> Cuando hablamos de "el sistema" en estos apuntes, **no nos referimos al sistema operativo**. Nos referimos al **programa cliente** que ejecuta el agente — el software que arranca cuando corres `claude` en tu terminal.

**¿Por qué se llama "programa cliente"?** Por el patrón clásico **cliente-servidor**. En esa relación, el **servidor** tiene el recurso central (aquí: el modelo viviendo en los servidores de Anthropic), y el **cliente** es el programa que vive en *tu* lado y se conecta al servidor para usar ese recurso.

En el mundo de los agentes de IA:

- **Claude Code** es un cliente que se conecta a la API de Anthropic.
- **Cursor, Codex CLI, Aider** son otros clientes de agentes de IA.

**La cadena real de comunicación es:**

```
Modelo (servidores Anthropic) ↔ API de Anthropic ↔ Claude Code (tu máquina) ↔ Sistema operativo ↔ Disco / red / procesos
```

Hay un matiz importante en esa cadena: Claude Code no se conecta "al modelo" directamente, sino a la **API de Anthropic** (la puerta de entrada). Es la diferencia entre *"llamé a una empresa"* (llamaste a la central) y *"hablé con el CEO directamente"* (no, hablaste con quien la central te pasó).

En la práctica, cada vez que escribes un prompt:

- Claude Code empaqueta tu prompt + el `CLAUDE.md` + las herramientas disponibles + el historial, y lo manda a la API.
- La API se lo pasa al modelo, este genera una respuesta (texto o llamada a herramienta), y la API te la devuelve.
- Si es una llamada a herramienta, Claude Code la ejecuta en tu máquina y le devuelve el resultado a la API para que el modelo siga trabajando.

Por eso Claude Code consume **tokens** de tu cuenta de Anthropic (o de tu plan Pro/Max): cada ida y vuelta cliente-servidor se factura. Y por eso **sin internet Claude Code no funciona** — el cliente no tiene a quién pedirle pensamiento. (Para trabajar offline existen modelos locales como Llama 3, donde el "servidor" vive en tu propia máquina — pero ese es otro modelo de despliegue, fuera del alcance de este apunte.)

> 🎯 **Idea clave:** el modelo nunca toca tu máquina directamente — **pide, el sistema (Claude Code) ejecuta**.

**2. La arquitectura se simplificó.**

Una vez que los modelos podían orquestar herramientas solos, todo el andamiaje sobraba:

- En vez de un DAG con cien nodos, un bucle simple.
- En vez de RAG con vectores, una herramienta `grep` que el modelo usa cuando necesita buscar.
- En vez de clasificadores que decidían por adelantado qué hacer, un modelo que explora y decide en el momento.

> **En otras palabras:** el avance no vino de programar más alrededor del modelo, sino de quitarle el andamio y dejarlo trabajar.

Esto tiene una implicación incómoda para quienes venimos del desarrollo tradicional: nuestra intuición de ingenieros nos empuja a controlar cada paso, a anticipar cada caso borde con un `if`. Pero en este paradigma, **menos andamiaje = más capacidad**. Cada `if` que agregas para "ayudar" al modelo termina muchas veces estorbándole.



## 🔴 Ejemplo: el `if` que encarcela al modelo

Imagina que le pides a Claude Code *"arregla el bug en el sistema de login"*. Sin más instrucciones, el modelo va a buscar archivos relacionados con `grep`, leer los más relevantes, identificar el bug y proponer un fix.

Ahora, con buena intención, le agregas instrucciones controladoras: *"primero abre `auth.js`, luego `login-form.jsx`, después el endpoint en `routes/auth.ts`, y corrige el bug en `validatePassword`"*. Acabas de meterle cuatro `if`s mentales. ¿Qué pasa?

- Si tu suposición de los archivos era **correcta**, ahorraste tiempo. Bien.
- Si era **incorrecta** (el bug real estaba en `session.js`, que ni mencionaste), el modelo obedece tu orden, no encuentra nada raro, y te reporta que "todo se ve bien". **Lo encarcelaste en tu mapa mental equivocado.** Si lo hubieras dejado explorar, habría encontrado el archivo correcto solo.

Cada paso que controlas le quita la oportunidad de descubrir algo que tú no viste. Y como ya tomaste las decisiones, no se va a desviar para corregirte.

Es el mismo principio que aplica al desarrollo de los agentes (los DAGs, los clasificadores rígidos): cuando los ingenieros "ayudaban" al modelo armando árboles de decisión, lo encarcelaban. Cuando dejaron de hacerlo, el modelo demostró ser más capaz de lo asumido. **El mismo error en dos escalas: sobre-controlar le quita capacidad al modelo.**

> 🔑 **Matiz importante (controla los límites, no los pasos):**
>
> "Soltar el control" no significa "no controles nada". Significa controlar los **límites**, no los **pasos**.
>
> - *"No toques la base de datos"* → límite válido ✅
> - *"Hazlo en este orden exacto"* → `if` que probablemente sobra ❌
>
> Decir qué **no** puede hacer mantiene el modelo seguro. Decir cómo **tiene** que hacerlo lo encarcela.


> 🎯 **Less scaffolding, more model**
>
> Esta es la frase que la comunidad usa para resumir todo lo anterior. Literal: *"menos andamiaje, más modelo"*.
>
> - **Scaffolding** = todo el código que rodea al modelo para "guiarlo": DAGs, clasificadores, validaciones rígidas, instrucciones que controlan cada paso.
> - **Model** = la capacidad del modelo de explorar, decidir y recuperarse de errores por sí mismo.
>
> La frase es una orden de diseño: cuando estés tentado a agregar más andamiaje, **quita** en su lugar y deja que el modelo trabaje. La intuición de ingeniero dice "más control = más calidad". En este paradigma, es al revés.

Debes recordar que esto no significa que la arquitectura sea trivial — significa que la complejidad se movió de sitio. Ya no está en el código que rodea al modelo; está en el modelo mismo y en saber **qué herramientas darle** y **cuándo confiar**. El resto del apunte se trata exactamente de eso.

---
[[00_indice|índice]]
