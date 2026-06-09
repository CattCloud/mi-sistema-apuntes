---
tema: CLAUDE.md — Arquitectura de Contexto
workspace: ia
seccion: 2
titulo: "¿Qué es CLAUDE.md realmente?"
estado: finalizada
prev: 01_dolor-que-resuelve
next: 03_mecanica-system-reminder
---

# 🤖 ¿Qué es CLAUDE.md realmente?

> **CLAUDE.md es un documento de onboarding para el agente, no una bitácora de trabajo.**
>
> Su trabajo es transmitir lo esencial del proyecto en pocas líneas, no acumular todo lo que vas descubriendo a lo largo del tiempo.

Antes de seguir, conviene aclarar el término que acabamos de usar:

> **Onboarding es el proceso de darle a alguien (o algo) la información mínima necesaria para que pueda empezar a trabajar en un entorno nuevo.**
>
> Se usa típicamente en RR.HH. para describir cómo se integra a un empleado nuevo a la empresa: presentación del equipo, herramientas, procesos básicos. En el contexto de Claude, el onboarding es lo que el agente necesita saber del proyecto para poder operar — no todo lo que existe, solo lo esencial para arrancar.

La mayoría de la gente arranca usando CLAUDE.md como un cuaderno donde anota cosas: el comando raro que funcionó, el fix del bug que tomó horas, la decisión de arquitectura del martes pasado. Tiene lógica intuitiva — *"si Claude lee este archivo, lo escribo todo aquí para que lo sepa"*. El problema es que ese uso entra en conflicto directo con cómo funciona el archivo en la práctica.

## 🤖 Mito vs Realidad — Onboarding, no bitácora

> **Las ideas erróneas más comunes sobre CLAUDE.md vienen de tratarlo como cuaderno o como configuración forzada, cuando no es ninguna de las dos.**
>
> Desmontar estos mitos antes de seguir es lo que permite tomar decisiones correctas sobre qué entra al archivo y qué no.


| ❌ Mito                                                                                | ✅ Realidad                                                                                                                                                                                                       | 🔍 Por qué                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| *"CLAUDE.md es donde anoto fixes, comandos y cosas que voy aprendiendo del proyecto."* | Eso es una bitácora. La bitácora la hace Claude solo, con su propio sistema de memoria — no es trabajo tuyo y no va en CLAUDE.md.                                                                              | Claude tiene un mecanismo aparte (auto memory) donde guarda sus propios hallazgos entre sesiones. Mezclar tu onboarding con notas de bitácora confunde al agente: deja de saber qué es regla del proyecto y qué fue un fix puntual de hace dos semanas.                                                             |
| *"Mientras más información meta, mejor preparado va a estar el agente."*             | Es al revés. Cuanta más información no universalmente aplicable metes, más probable es que Claude termine ignorando las instrucciones del archivo completo.                                                   | El modelo tiene un**presupuesto de instrucciones** que puede seguir con consistencia (lo veremos en la siguiente sección). Cuando te pasas de ese presupuesto, no ignora solo las últimas reglas — empieza a ignorarlas todas por igual. Más volumen NO equivale a más adherencia; típicamente equivale a menos. |
| *"CLAUDE.md es como un archivo de configuración — lo que escribo ahí se cumple."*   | Claude trata CLAUDE.md como**contexto**, no como configuración forzada. Es guía blanda, no reglas duras. Si necesitas imposición real, hay otras herramientas (las veremos más adelante).                     | Internamente, Claude Code inyecta el contenido como un mensaje de usuario marcado con una nota que dice*"este contexto puede o no ser relevante"*. El modelo lo lee como sugerencia, no como orden. Por eso poner reglas críticas en CLAUDE.md y asumir que se cumplirán siempre es un error de diseño.             |
| *"Cuando descubro algo nuevo del proyecto, lo agrego a CLAUDE.md."*                    | Eso es justo lo que dispara que el archivo se vuelva ruido y Claude lo ignore. CLAUDE.md se construye con**decisiones editoriales conscientes**, no agregando cosas por reflejo cada vez que aprendes algo nuevo. | El "yo lo agrego cada vez que descubro algo" termina creando un archivo de 500 líneas lleno de hotfixes que solo aplicaron una vez. El archivo se infla, pierde calidad de señal, y el agente empieza a tratarlo como ruido. La regla es: agregar algo a CLAUDE.md es una decisión editorial, no un reflejo.        |

Sobre ese último punto, vale la pena detenerse. La diferencia entre un CLAUDE.md útil y uno que Claude ignora suele estar exactamente ahí: en el **filtro que aplicas antes de agregar cada línea**.

La pregunta que tienes que hacerte antes de meter algo nuevo al archivo es siempre la misma: *"¿esto sirve para onboardear a Claude en cualquier sesión futura, o es algo puntual que aplicó solo a un caso de hoy?"*. Si la respuesta es lo primero (información estable, universalmente aplicable, parte del onboarding del proyecto), entra. Si es lo segundo (un fix de una hora, una decisión que ya tomaste, una observación de algo que te pasó hoy), no entra — por más útil que parezca en el momento.

Esto suena obvio escrito así, pero es el error más frecuente en la práctica. La tentación de *"esto me sirvió, lo agrego para acordarme"* es muy fuerte. El problema es que CLAUDE.md no es **tu** memoria — es la **del agente al arrancar una sesión nueva**. Si lo tratas como tu cuaderno personal, terminas con un archivo lleno de cosas que solo tenían sentido para ti en un momento específico, y el agente recibe un onboarding inflado y ruidoso.

En otras palabras, el reencuadre central es este: piensa en CLAUDE.md como el **manual de bienvenida de un empleado nuevo**, no como su diario de trabajo. El manual de bienvenida cabe en pocas páginas, es estable, y explica lo esencial para que el empleado pueda empezar a operar. El diario, en cambio, crece todos los días y nadie lo lee de un tirón.

## 🤖 Qué transmite — el QUÉ, el PORQUÉ y el CÓMO

> **Un CLAUDE.md bien hecho cubre tres ejes: QUÉ es el proyecto, PORQUÉ está hecho así, y CÓMO se trabaja en él.**
>
> De los tres, el PORQUÉ es el más valioso porque es el único que el agente no puede descubrir leyendo archivos por su cuenta.

La comunidad de desarrolladores consolidó estos tres ejes como el contenido mínimo que cubre lo esencial del onboarding:


| Eje           | Qué responde                                                                        | Ejemplos de contenido                                                                     |
| --------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 🔵**QUÉ**    | ¿De qué se trata este proyecto? ¿Qué tecnologías usa? ¿Cómo está organizado? | Stack técnico, mapa de carpetas del repo, descripción breve del producto                |
| 🔴**PORQUÉ** | ¿Por qué cada parte existe? ¿Qué propósito cumple?                              | Razón de las decisiones de arquitectura clave, por qué se eligió X tecnología sobre Y |
| 🟡**CÓMO**   | ¿Cómo se trabaja aquí? ¿Cómo verifico mis cambios?                              | Comandos de build, test, lint, deploy. Flujo de trabajo del equipo                        |

🔵 = Estructura · 🔴 = Razones · 🟡 = Forma de operar

**Diferencia clave:** el QUÉ y el CÓMO los puede descubrir Claude leyendo archivos (package.json, README, configs), pero gasta contexto y tiempo en hacerlo. El PORQUÉ, en cambio, **no está escrito en ningún archivo** — vive solo en tu cabeza o en el chat de tu equipo. Por eso es el eje más valioso de capturar en CLAUDE.md: es la única información que el agente no puede recuperar por su cuenta.

Debes recordar que esta distinción cambia completamente cómo decides qué entra en el archivo. La pregunta deja de ser *"¿esto le puede servir a Claude?"* y pasa a ser *"¿esto es onboarding o esto es bitácora?"*. Si es bitácora, no va.


---
[[01_dolor-que-resuelve|← anterior]] · [[00_indice|índice]] · [[03_mecanica-system-reminder|siguiente →]]
