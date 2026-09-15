# Reglas de `apuntes/` — estructura, formato y redacción

> Aplican a todo archivo de esta carpeta, salvo `_input/` (materia prima) y `notion/` (referencia trasladada, no se reescribe). Procedimientos: `generar-apunte`, `cerrar-modulo`, `repasar` (`.claude/skills/`). Voz, formato visual, arquetipos y diagramas: `.claude/skills/generar-apunte/estilo.md`. Las reglas generales R1-R12 están en `/AGENTS.md`.

## Estructura

**A1 · Carpetas y archivos.**

```text
apuntes/<workspace>/
├── 00_indice.md             ← índice del workspace: sus apuntes y su estado
└── <modulo-o-tema>/
    ├── 00_indice.md         ← superficie de control del apunte (A2)
    ├── 01_<slug>.md         ← una sección = un archivo (A3)
    ├── …
    ├── 99_cierre.md         ← la evaluación del módulo (A10)
    ├── guia_<slug>.md       ← guía de referencia: se consulta, no entra al repaso
    ├── img/                 ← imágenes, con prefijo de la sección que las usa (A9)
    └── _input/              ← material fuente: no se repasa, no se publica
```

Workspace = slug corto (`ia`, `cloud`, `typescript`, `arquitectura`…); tema = kebab-case sin el prefijo del workspace. Un archivo de sección corresponde a una sección H2 del esqueleto y abre con `#`; sus subsecciones van con `##`/`###` dentro. Excepción: dos secciones muy cortas y relacionadas pueden ir juntas. Cada apunte es autocontenido.

**A2 · El índice es superficie de control, no contenido.** Frontmatter: `tema`, `workspace`, `estado` (`EN PROGRESO` · `PAUSADO` · `FINALIZADO`), `arquetipo`, y cuando aplica `modulo`, `temario`, `repaso:` (`ultimo`, `proximo`, `nivel`, `reforzar`) y `notebooklm`. Cuerpo: alcance (incluye / excluye), `## Secciones` con su estado ⬜ 🔄 ✅ y sus códigos de indicación, `## Cierre` (puntero a `99_cierre.md` y su estado), `## Fuentes`. **Nunca** material de estudio ni ejercicios: si hay que hacerlo, va en `99_cierre.md`; si hay que leerlo, en su sección. `FINALIZADO` = todas las secciones ✅. Pausar = `PAUSADO` + pendientes + una línea "Siguiente paso al retomar".

**A3 · Frontmatter y navegación de cada sección.** Frontmatter: `tema`, `workspace`, `seccion`, `titulo`, `estado` (`en progreso` · `finalizada`), `prev`, `next` (los mantiene la IA). Al pie, después de `---`: `[[anterior|← anterior]] · [[00_indice|índice]] · [[siguiente|siguiente →]]`. Una sección no se marca `finalizada` sin su bloque A7.

## Redacción

**A4 · Quote-gancho.** Lo primero después del `#` de cada archivo, y de cada subsección que abre un concepto, es un quote (`>`) con la definición o idea central y la **primera línea en negrita**. Para separar ideas dentro del quote, una línea `>` vacía. Excepción: una sección con código `[DOLOR]` abre con el párrafo del problema y el quote va justo después.

**A5 · Sin preámbulo, sin conclusión.** Ninguna sección abre con introducción ni cierra con "Conclusión", "Resumen" o "Próximos pasos"; termina cuando se agota su contenido. La única excepción es el bloque A7. El único bloque de cierre del índice es `## Fuentes`.

**A6 · Específico, no ambiguo.** El apunte se lee semanas después, sin el hilo de la conversación que lo generó. Controles, todos verificables:

- **Cada `esto` / `eso` / `las dos` / `ambos` tiene su referente escrito a menos de una línea.** *(Falló: "cuando una de las dos cambie" — ¿los códigos o los módulos?)*
- **Ningún término se usa antes de definirse**, ni de paso. Si tiene que aparecer, va con una glosa de una línea y un puntero a dónde se estudia. *(Falló: `interface`, `type`, `<T>` en un temario con piso en cero; *bucket*, *hipervisor*, *acceso programático*, *entidad*, *CLI*.)* El quote-gancho no puede apoyarse en vocabulario que el apunte presenta después. *(Falló: "la CLI no es el objeto de estudio", cuando la CLI no se había nombrado.)*
- **Una metáfora no es una explicación.** Se queda si **es** el mecanismo (la puerta de un módulo, la cocina por estaciones); se borra si solo adorna. *(Falló: "la costura", "el `if` delator".)* Una metáfora tiene **un solo significado** en todo el módulo. *(Falló: "reloj" como contador de cobro en una sección y como plazo que caduca en la siguiente.)*
- **Nada de verbos vagos donde hay un mecanismo con nombre.** *(Falló: "te rebota" → "AWS deniega la acción y responde «no está autorizado»".)* Repetir la palabra técnica exacta es mejor que buscar sinónimos.
- **Nada de explicaciones circulares:** repetir el fenómeno con otras palabras no es su causa. *(Falló: "la salida se paga porque sacar datos te aleja del proveedor".)* Si la causa real es comercial, se dice con su mecanismo y su evidencia; si no se sabe, se dice que no se sabe.
- **Las definiciones son aplicables:** sirven para decidir un caso concreto, sin juegos de palabras. *(Falló: "un módulo cohesivo se describe sin usar la palabra *y*".)*
- **Los ejemplos aguantan que los piensen.** *(Falló: "el correo de bienvenida que solo se dispara los martes".)*
- **Ninguna definición se apoya en otro documento.** Un concepto se sostiene completo donde se define; una referencia cruzada añade contexto o señala profundidad, pero nunca carga el significado. *(Falló: "EC2 es el IaaS de B1, hecho concreto".)* **La prueba:** tapar la referencia; si la frase deja de explicar, se reescribe. Los códigos de módulo se citan **con su nombre** (*"→ **B2 · Costos y facturación**"*), entre paréntesis o en cursiva, nunca en el título ni en el quote-gancho.
- **Segunda persona de instrucción sí; biográfica no.** *"Debes recordar"*, *"imagina que tu app"* van bien; *"la web que has estado usando"*, *"como ya viste"*, *"lo que hiciste en B1"* rompen: el apunte funciona para alguien que llega de cero, y para el usuario dentro de un año.
- **Encabezados y etiquetas dicen de qué son**, no su idea más vistosa ni una metáfora. *(Falló: "Lo atrapa" en vez de "Bugs que TypeScript detecta"; "La CLI — donde una credencial se vuelve concreta" para una sección sobre las tres formas de entrar a la cuenta.)*

> 💡 **Prueba antes de dar una sección por buena:** leerla como si no hubiera existido la conversación. Cada vez que haya que completar algo con contexto del chat, hay una ambigüedad que corregir.

**A7 · "Lo que debiste llevarte".** Cada archivo de sección cierra, justo antes del `---` de navegación, con:

```markdown
## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- [Idea afirmada en una oración]
```

Entre **3 y 5** ideas, cada una una oración completa (no un título), sin enlaces, escritas junto con la sección. No es una conclusión: es el piso de lo que debe quedar. Las líneas que el usuario no logra recordar sin mirar alimentan `reforzar:` en el índice.

**A8 · Reescritura total.** Nada se lee como copia de documentación oficial ni de la transcripción: todo pasa por *"¿cómo lo explicaría para que se entienda de verdad?"*. Tecnicismos en inglés con estatus técnico preciso; explicaciones en español.

**A9 · Imágenes.** Entran capturas de interfaz (solo en apuntes con `[CONSOLA]`) e imágenes que el usuario deje —diagramas de un curso, mapas visuales— cuando facilitan entender.

| Vale una imagen | No vale |
|---|---|
| La disposición espacial importa (dónde vive cada cosa en la pantalla) | Ilustrar un concepto: eso es un diagrama nativo (ASCII o Mermaid, `estilo.md` §5) |
| Muestra un estado real que sorprende (un aviso, "datos no disponibles", un número propio) | Reemplazar la explicación en texto |
| Es más corta que describirla en tres párrafos | Documentar cada paso de un asistente |

- **El texto manda:** el apunte se entiende sin ver la imagen.
- **Toda imagen lleva `alt` descriptivo** (no "captura de pantalla") **y pie de foto en cursiva** en la línea siguiente, que dice qué retener de ella y qué no.
- **Sin datos sensibles** (R9): recortar o tapar ID de cuenta, ARN, correos, claves y nombres de recursos privados antes de guardarla.
- **Una imagen por pantalla**; nunca dos vistas del mismo sitio.
- **Dónde:** `img/NN_slug-descriptivo.png`, con `NN` = número de la sección que la usa; ruta relativa.
- **Durabilidad:** el texto registra la intención; una captura vieja junto a un texto correcto sigue sirviendo, al revés no.

## Cierre, adiciones y repaso

**A10 · El cierre del módulo.** Vive en `99_cierre.md`, con `seccion: cierre` en el frontmatter. Cada prueba declara **`Qué mide:`**. Nunca exige un concepto que el temario aún no cubrió. El quiz nunca se escribe en el apunte (R7): el archivo solo lleva el disparador y el protocolo. El índice solo apunta al cierre y muestra su estado. Formas y reglas: skill `cerrar-modulo`.

**A11 · Apunte abierto.** Cuando una explicación dada en el chat enriquece el apunte (define un término, trae un ejemplo o una analogía mejor, añade un matiz), se propone integrarla en la sección donde conceptualmente pertenece —actual, previa o futura—, no donde surgió la pregunta. Lo que excede el alcance va a `NOTAS.md` (R10). Procedimiento: `generar-apunte`.

**A12 · El bloque `repaso:`.** Lo escribe la IA al cerrar una sesión de repaso, en el frontmatter del índice, y se sobrescribe cada vez (solo el último estado). Un apunte `FINALIZADO` sin bloque `repaso:` es un apunte nunca repasado. Procedimiento: `repasar`.
