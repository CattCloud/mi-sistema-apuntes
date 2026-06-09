---
tema: CLAUDE.md — Arquitectura de Contexto
workspace: ia
seccion: 9
titulo: "La estructura práctica — núcleo mínimo vs capas que se ganan"
estado: finalizada
prev: 08_guiar-vs-imponer
next: null
---

# 🤖 La estructura práctica — núcleo mínimo vs capas que se ganan

Hasta aquí hemos cubierto toda la teoría: qué es CLAUDE.md, cómo se carga, el presupuesto, la jerarquía por scope, los mecanismos para escalar, qué herramienta usar para qué. Toca aterrizar todo en algo concreto: **¿cómo debe verse la estructura real de un proyecto?**

Aquí hay una trampa común que conviene desmontar antes de seguir:

> **No existe una única estructura "correcta" de CLAUDE.md para todos los proyectos. Hay un núcleo mínimo universal que sí aplica a cualquier repo, y un conjunto de capas opcionales que se agregan solo cuando un dolor concreto del proyecto las pide.**
>
> Adoptar toda la arquitectura desde el día uno sería, irónicamente, violar el propio principio de "menos es más" que aprendimos a lo largo del apunte.

La filosofía que la comunidad consolidó es **"las capas se ganan, no se adoptan"**. Cada complejidad extra que agregas (subdirectorios, `agent_docs/`, `.claude/rules/`, CLAUDE.md por componente) debe justificarse con un problema real que estés enfrentando, no con la fantasía de *"por si en algún momento crece el proyecto"*.

## 🤖 El núcleo mínimo para cualquier repo

> **El núcleo mínimo es lo que debe tener todo CLAUDE.md de cualquier proyecto, sin importar su tamaño ni complejidad. Cubre los tres ejes (QUÉ / PORQUÉ / CÓMO) en pocas líneas, sin entrar en detalles innecesarios.**
>
> Si tu proyecto no necesita más que esto, no agregues más. Es lo bastante para que el agente arranque.

Los bloques que componen el núcleo mínimo son:

**BLOQUE 1: El QUÉ del proyecto (2-4 líneas)**

- Qué hace el proyecto en una oración.
- Stack principal en una línea.

**BLOQUE 2: Mapa del repo (5-10 líneas)**

- Estructura de carpetas principales con una línea por cada una explicando para qué sirve.

**BLOQUE 3: El CÓMO operativo (3-5 líneas)**

- Comando para correr el proyecto (`pnpm dev`,`npm start`, etc.).
- Comando para correr los tests.
- Comando para validar con linter / typecheck.
- Comando para hacer build.

**BLOQUE 4: El PORQUÉ no obvio (2-5 líneas)**

- 1-2 decisiones de arquitectura clave que no se entienden con solo leer el código.
- 1-2 convenciones del equipo que no son universales.

Un ejemplo de núcleo mínimo (~30-40 líneas en total) se ve así:

```markdown
# Min-Commerce

E-commerce con carrito persistente, auth con Google y panel admin con estadísticas.

**Stack:** Next.js 15 + TypeScript + PostgreSQL + Prisma + NextAuth + Zustand.

## Mapa del repo

- `src/app/` — Rutas de Next.js (App Router).
- `src/components/` — Componentes React reutilizables.
- `src/lib/` — Lógica de negocio y helpers.
- `src/lib/db/` — Capa de acceso a datos vía Prisma.
- `prisma/` — Schema y migraciones de la base de datos.
- `src/types/` — Tipos compartidos del proyecto.

## Comandos

- `pnpm dev` — Levanta el servidor de desarrollo.
- `pnpm test` — Corre los tests con Vitest.
- `pnpm lint` — Valida con ESLint (corre después de cualquier cambio).
- `pnpm typecheck` — Valida tipos de TypeScript.
- `pnpm build` — Build de producción.

## Decisiones de diseño

- **Carrito en Zustand + localStorage**, no en base de datos. Razón: queremos que sobreviva al refresh sin requerir sesión activa. Si el usuario inicia sesión, se hace merge con su carrito remoto.
- **Auth solo con Google**, no se acepta email/password. Razón: simplifica seguridad y el público objetivo ya está en Google.
```

**Observación clave:** este archivo cabe holgado en 40 líneas y cubre los 4 bloques. Eso es lo que debe ser un CLAUDE.md por defecto. **Si tu archivo ya tiene más de 100 líneas para un proyecto típico, algo está mal** — o estás metiendo bitácora, o estás duplicando información que vive en otros lados.

## 🤖 Las 4 capas que se ganan con dolor concreto

> **Cada capa adicional de complejidad en la arquitectura de CLAUDE.md debe responder a un dolor concreto del proyecto, no a una fantasía de futuro. La regla práctica es: si todavía no te duele, no la agregues.**
>
> Conocer las señales que indican "ya toca agregar esta capa" te evita dos errores: sobreingeniería temprana (todo desde día uno) y subingeniería tardía (seguir empujando un archivo gigante porque "siempre lo hicimos así").

Las cuatro capas, ordenadas por orden típico de aparición:


| # | Capa                                          | Señal que la dispara                                                                                                                                                                             | Qué hacer                                                                                                                                 |
| --- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | **Progressive disclosure con `agent_docs/`**  | Tu CLAUDE.md raíz pasa de ~150 líneas porque sigues metiendo procedimientos largos (cómo correr migraciones, cómo desplegar, decisiones por feature, planes de versiones futuras).            | Mover esos bloques largos a archivos en`agent_docs/`. En CLAUDE.md queda solo el índice.                                                  |
| 2 | **`.claude/rules/` con path-scoping**         | Tienes reglas que aplican solo a ciertos tipos de archivo (todos los tests, todas las migraciones, todos los componentes React), y ensucian el contexto general cuando están en CLAUDE.md raíz. | Mover esas reglas a`.claude/rules/` con `paths:` glob patterns. Solo se cargan cuando se tocan esos archivos.                              |
| 3 | **CLAUDE.md por componente (subdirectorios)** | Tu proyecto es un monorepo real con apps genuinamente distintas (frontend + backend + paquetes compartidos), cada uno con sus propias convenciones que no aplican a los demás.                   | Crear`./frontend/CLAUDE.md`, `./backend/CLAUDE.md`, etc. La carga perezosa hace que solo entren al contexto cuando se trabaja en esa zona. |
| 4 | **`CLAUDE.local.md` en `.gitignore`**         | Tienes URLs de sandbox personales, credenciales de dev, preferencias tuyas que no quieres que aparezcan en el repo compartido del equipo.                                                         | Crear`./CLAUDE.local.md` y agregarlo a `.gitignore`. El nivel local te acompaña sin contaminar a tus compañeros.                         |

**Filosofía detrás de la tabla:** cada capa resuelve un dolor concreto. Si ese dolor no existe en tu proyecto, **no la necesitas**. Adoptar capas preventivamente es exactamente el tipo de sobreingeniería que el propio apunte argumenta en contra.

**Una señal extra que conviene reconocer:** si te descubres escribiendo reglas de estilo de código en CLAUDE.md (indentación, comillas, semicolons, etc.), **detente**. Eso no es una capa nueva del archivo — eso va a un linter + hook. Recuerda: Claude no es un linter.

## 🤖 Interop con AGENTS.md

> **Si tu proyecto ya usa `AGENTS.md` (la convención que adoptaron otras herramientas de coding como Cursor, Aider, OpenAI Codex), puedes crear un `CLAUDE.md` que importe su contenido con `@AGENTS.md` y añadir solo lo específico de Claude debajo.**
>
> Es decir, no tienes que duplicar contenido — apuntas a lo común y agregas solo las diferencias.

Claude Code lee `CLAUDE.md`, **no lee `AGENTS.md` directamente**. Pero la sintaxis de `@imports` te permite construir un puente sin duplicar trabajo:

```markdown
# CLAUDE.md raíz

@AGENTS.md

## Instrucciones específicas para Claude

- Cuando uses la herramienta Bash, prefiere `pnpm` sobre `npm`.
- Para hacer commits, usa el formato del equipo: `tipo(scope): descripción`.
```

**Qué pasa cuando Claude Code arranca:**

1. Lee tu`CLAUDE.md`.
2. Encuentra`@AGENTS.md` → reemplaza esa línea con el contenido completo de`AGENTS.md`.
3. Continúa leyendo tus instrucciones específicas.
4. Resultado: el agente ve un solo archivo combinado, sin que tú hayas tenido que mantener dos copias sincronizadas.

**Recordatorio importante sobre `@imports`:** esto sigue siendo eager (todo se expande al arranque). No ahorra presupuesto — solo evita duplicación. Si tu `AGENTS.md` es enorme, ese tamaño se hereda completo al `CLAUDE.md`. Para proyectos con `AGENTS.md` ya inflado, conviene primero adelgazarlo (o usar progressive disclosure dentro de `AGENTS.md` mismo) antes de heredarlo.

**Cuándo NO usar `@AGENTS.md`:**

- Si tu proyecto**solo** usa Claude Code, no tiene sentido pasar por`AGENTS.md` — escribe directo en`CLAUDE.md`.
- Si las instrucciones para Claude son**muy distintas** a las del resto de herramientas, mantenerlas separadas conceptualmente puede ser más claro que mezclarlas.

Debes recordar que esta interoperabilidad es solo una herramienta de organización para equipos que trabajan con varias herramientas de coding asistido. Si tu caso es más simple, no la necesitas.

---
[[08_guiar-vs-imponer|← anterior]] · [[00_indice|índice]]
