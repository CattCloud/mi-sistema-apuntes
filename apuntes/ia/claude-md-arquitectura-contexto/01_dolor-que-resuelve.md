---
tema: CLAUDE.md — Arquitectura de Contexto
workspace: ia
seccion: 1
titulo: "¿Qué dolor resuelve CLAUDE.md?"
estado: finalizada
prev: null
next: 02_que-es-realmente
---

# 🤖 ¿Qué dolor resuelve CLAUDE.md?



Cada vez que abres una conversación nueva con Claude Code, el agente llega **sin recordar absolutamente nada** de tu proyecto. En concreto, no sabe:

- Qué**stack** usas.
- Dónde viven tus archivos importantes.
- Cómo corres los**tests**.
- Qué decisiones de arquitectura tomaste la semana pasada.

Esto pasa porque los modelos de lenguaje son lo que se llama **funciones sin estado**.

> **Una función sin estado (stateless) es aquella que no guarda memoria entre una ejecución y la siguiente.**
>
> Cada llamada al modelo es independiente: no hay nada que sobreviva por sí solo. El modelo no "acumula experiencia" — cada vez empieza desde cero. (En la sección 4 veremos por qué esto aplica no solo entre conversaciones, sino también entre cada mensaje dentro de una misma conversación.)

En la práctica, esa naturaleza sin estado tiene tres consecuencias directas en tu día a día como desarrollador:


| Característica del modelo              | Consecuencia para el desarrollo                     |
| ----------------------------------------- | ----------------------------------------------------- |
| Sin memoria persistente                 | Pierde contexto del proyecto en cada sesión        |
| No explora automáticamente el codebase | Ignora patrones arquitectónicos existentes         |
| Sin conocimiento de convenciones        | Genera código inconsistente al estilo del proyecto |

Aquí es donde entra CLAUDE.md.

> **CLAUDE.md es el único archivo que Claude Code inyecta automáticamente en cada conversación nueva, sin que tú tengas que pedírselo.**
>
> Es decir, es la única hoja informativa que el agente sí va a leer de entrada. Todo lo demás tiene que descubrirlo abriendo archivos uno por uno, lo cual gasta contexto y tiempo.

Imagina que tienes un empleado nuevo (cada sesión nueva de Claude Code) que llega cada mañana a la empresa (tu codebase) con **amnesia total**. Ayer cerró tres tickets contigo, pero hoy no recuerda ni tu nombre ni cómo se llama el proyecto. Lo único que puedes hacer es dejarle una carpeta en su escritorio que diga *"léeme primero"* (CLAUDE.md) — un documento que en pocas líneas le explique qué hace la empresa, dónde están las herramientas y cómo trabajamos aquí. Lo demás (el resto de los archivos del repo) tendría que buscarlo uno por uno, perdiendo tiempo y contexto en el proceso.

**Dónde deja de funcionar la analogía:** un empleado humano va consolidando memoria con el tiempo. Claude no. Por más sesiones que tengas con él, **siempre** llega con amnesia. Por eso CLAUDE.md no es un lujo de proyectos grandes — es la condición mínima para que el agente pueda ser útil sin pedirte que le expliques el repo cada vez.

Debes recordar que ese dolor — *"tener que explicarle el proyecto desde cero en cada conversación"* — es la razón por la que CLAUDE.md existe. Todo lo que veremos después son refinamientos sobre cómo darle al empleado amnésico la mejor hoja informativa posible.


---
[[00_indice|índice]] · [[02_que-es-realmente|siguiente →]]
