# Referencia: Conceptos clave

> Mini-glosario de los términos técnicos que usa esta skill. Leer solo si necesitas refrescar un concepto concreto — no leer todo de entrada.

> Cada concepto incluye una definición operativa + cuándo aplica + para qué sirve en el contexto de la skill.

---

## Stateless (sin estado)

**Definición:** característica de un sistema donde cada operación es independiente y no recuerda nada de operaciones anteriores.

**Aplicado a Claude:** cada llamada al modelo es una operación independiente. Esto incluye dos niveles:
1. **Entre conversaciones:** cierras una sesión y abres otra → el agente arranca de cero.
2. **Entre mensajes de la misma conversación:** cada turno, el modelo recibe toda la conversación anterior reenviada — no "recuerda" lo que pasó por sí solo. La sensación de memoria viene del reenvío completo del contexto en cada turno.

**Por qué importa para la skill:** todo lo que esté en CLAUDE.md se evalúa en cada turno, no una sola vez. Por eso "costo persistente" (ver abajo).

---

## System-reminder

**Definición:** etiqueta interna que Claude Code usa para marcar contenido como "contexto sugerido" en vez de "instrucción obligatoria".

**Aplicado a CLAUDE.md:** el contenido del archivo se inyecta en la conversación envuelto en una nota que dice *"este contexto puede o no ser relevante, no respondas a él salvo que sea altamente relevante"*. Esto convierte CLAUDE.md en **guía blanda**, no en configuración forzada.

**Por qué importa para la skill:** explica por qué meter "reglas críticas" en CLAUDE.md y asumir que se cumplirán siempre es un error de diseño. Para imposición real, ver "hook".

---

## Presupuesto de instrucciones

**Definición:** número aproximado de instrucciones que un modelo puede seguir consistentemente. Cifras: ~150-200 para modelos frontera, menos para modelos pequeños.

**Aplicado a CLAUDE.md:** cada línea con instrucciones efectivas compite por ese presupuesto. Pasarse degrada la adherencia a TODAS las instrucciones (degradación uniforme, ver abajo).

**Por qué importa para la skill:** justifica la regla "mientras más corto, mejor". <100 líneas es el ideal; <200 es el techo razonable.

---

## Degradación uniforme

**Definición:** cuando un modelo se pasa del presupuesto de instrucciones, no ignora solo las últimas — empieza a ignorarlas todas por igual.

**Aplicado a CLAUDE.md:** una sola regla mala (puntual, hotfix, bitácora) no solo es ruido por sí misma — degrada la efectividad de TODAS las reglas que sí estaban bien. Por eso "agregar por si acaso" es activamente perjudicial.

**Por qué importa para la skill:** justifica la disciplina defensiva — lo importante no es lo que metes, sino lo que dejas afuera.

---

## Costo persistente

**Definición:** una línea en CLAUDE.md se paga una vez por cada turno de la sesión, no una vez al inicio.

**Aplicado a CLAUDE.md:** en una conversación de 50 turnos, una línea inútil es ruido evaluado 50 veces. Una línea bien escogida es onboarding aplicado 50 veces.

**Por qué importa para la skill:** convierte cada línea en una decisión de impacto multiplicado. Por eso el filtro de universalidad es estricto.

---

## Scope (4 niveles)

**Definición:** alcance de aplicación de un archivo, en cuanto a a quién afecta. CLAUDE.md soporta 4 niveles, de más amplio a más específico:

| Nivel | Ubicación | A quién afecta |
|---|---|---|
| **Gestionada** | Configurada por administradores de la organización | Todos los desarrolladores de la empresa |
| **Usuario** | `~/.claude/CLAUDE.md` | Solo tú, en todos tus proyectos |
| **Proyecto** | `./CLAUDE.md` o `./.claude/CLAUDE.md` | Todos los que clonen el repo |
| **Local** | `./CLAUDE.local.md` (gitignored) | Solo tu copia personal del repo |

**Orden de carga:** de más amplio a más específico. Cuando hay conflicto, el más específico gana.

**Por qué importa para la skill:** ayuda a decidir DÓNDE va cada instrucción según a quién afecta.

---

## Lazy loading (carga perezosa)

**Definición:** mecanismo donde algo no se carga al inicio, sino solo cuando se va a usar. Lo opuesto es eager (cargar todo de entrada por si acaso).

**Aplicado a CLAUDE.md:** Claude Code no carga al arranque los CLAUDE.md de subdirectorios — solo los carga cuando el agente lee archivos en ese subdirectorio. Esto permite tener mucho contexto modular sin pagar el costo de todo simultáneo.

**Por qué importa para la skill:** habilita la arquitectura modular para monorepos (CLAUDE.md por componente).

---

## Path-scoping (alcance por ruta)

**Definición:** mecanismo que limita el alcance de un archivo a un patrón de archivos específico mediante frontmatter YAML con `paths:`.

**Aplicado a `.claude/rules/`:** archivos de reglas que solo se cargan cuando el agente trabaja con archivos que coinciden con su patrón glob. Ejemplo: una regla con `paths: ["**/*.test.ts"]` solo se carga cuando se tocan tests.

**Diferencia con lazy loading:** lazy loading es por **carpeta**; path-scoping es por **patrón de archivos** (puede atravesar carpetas).

---

## Progressive disclosure (revelación progresiva)

**Definición:** principio de diseño donde se muestra primero solo lo esencial y se revela el detalle a medida que se necesita.

**Aplicado a CLAUDE.md:** mantener en CLAUDE.md solo un índice corto que apunta a archivos en `agent_docs/`. El agente decide leer cada archivo solo si la tarea actual lo requiere. Es la versión "lazy" de incluir documentación detallada.

**Por qué importa para la skill:** permite mantener CLAUDE.md pequeño aunque el proyecto tenga mucha documentación.

---

## Frontmatter

**Definición:** bloque al inicio de un archivo markdown, delimitado por `---`, donde se ponen metadatos del archivo (no contenido visible).

**Aplicado a esta skill:** los archivos en `.claude/rules/` usan frontmatter YAML para declarar su `paths:`. Los SKILL.md también usan frontmatter para `name:` y `description:`.

---

## Hook

**Definición:** mecanismo técnico de Claude Code que se ejecuta automáticamente en momentos específicos (antes/después de usar herramientas, al iniciar/terminar sesión) y puede bloquear acciones del agente.

**Eventos comunes:** `PreToolUse`, `PostToolUse`, `Stop`, `SessionStart`.

**Aplicado a la skill:** los hooks son la única forma de imposición técnica real. Si una regla NO admite excepción, debería ser hook, no línea en CLAUDE.md.

**Por qué importa:** justifica la distinción "guiar (CLAUDE.md) vs imponer (hook)".

---

## Auto memory

**Definición:** sistema de memoria que Claude lleva por sí solo, donde acumula hallazgos entre sesiones del mismo proyecto.

**Características:**
- Por proyecto (no se mezcla entre proyectos).
- La controla el agente, no tú.
- Persistente entre sesiones del mismo proyecto.
- Contiene: comandos descubiertos, soluciones a bugs, notas de arquitectura inferidas.

**Aplicado a la skill:** la auto memory es donde vive la BITÁCORA — no debería duplicarse en CLAUDE.md.

---

## Antipatrón

**Definición:** práctica que parece una buena idea al principio pero que en la práctica produce resultados negativos consistentemente. Es "una mala práctica que engaña" porque tiene apariencia razonable.

**Aplicado a la skill:** los 3 antipatrones principales (bitácora disfrazada, hotfixes acumulados, reglas de estilo en CLAUDE.md) son lo que esta skill ayuda a detectar y corregir.

---

## `@imports`

**Definición:** sintaxis de Claude Code que permite incluir contenido de otro archivo dentro de CLAUDE.md usando `@ruta/al/archivo`. Los archivos se expanden al arranque (eager).

**Diferencia con progressive disclosure:**
- `@imports`: cargar al arranque, separación organizativa para humanos. No ahorra presupuesto.
- Progressive disclosure: cargar bajo demanda según necesidad del agente. Sí ahorra presupuesto.

**Por qué importa:** evitar el mito común de "uso @imports para reducir presupuesto" — no funciona así.

---

## AGENTS.md

**Definición:** convención adoptada por otras herramientas de coding asistido (Cursor, Aider, OpenAI Codex) para el archivo de contexto del agente.

**Interop con CLAUDE.md:** Claude Code NO lee AGENTS.md directamente, pero puedes crear un CLAUDE.md con `@AGENTS.md` que herede su contenido y agregar solo lo específico de Claude debajo.

**Por qué importa:** si tu proyecto trabaja con varias herramientas, evitas mantener dos copias sincronizadas.

---

## Núcleo mínimo (4 bloques)

**Definición:** lo que debe tener todo CLAUDE.md, sin importar tamaño ni complejidad del proyecto. Cubre 4 bloques:

1. **QUÉ** — descripción del proyecto + stack.
2. **Mapa del repo** — estructura de carpetas con una línea por cada una.
3. **CÓMO** — comandos operativos (dev, test, lint, build).
4. **PORQUÉ no obvio** — 1-2 decisiones de arquitectura clave.

**Por qué importa:** es la baseline contra la que se compara cualquier CLAUDE.md. Las capas adicionales se ganan después.

---

## "Las capas se ganan, no se adoptan"

**Definición:** filosofía de la comunidad para escalar la arquitectura de CLAUDE.md: cada complejidad extra (`agent_docs/`, `.claude/rules/`, subdirectorios) debe responder a un dolor concreto del proyecto, no a una fantasía de futuro.

**Por qué importa:** evita la sobreingeniería temprana. Si todavía no te duele, no lo agregues.
