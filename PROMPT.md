# Prompt de arranque — B4 Cómputo: la máquina virtual (continuación)

> Copiar y pegar el bloque de abajo al iniciar la nueva conversación.
> Última actualización: 2026-09-08.

---

Vamos a **continuar** el apunte del módulo **B4 — Cómputo: la máquina virtual** del temario de nube. El módulo ya está creado y su Sección 1 escrita. **Retomamos en la Sección 2**, siguiendo el flujo Tesla P3⇄P4, sección por sección.

## Lee esto antes de hacer nada

En este orden:

1. `contexto/plan_estudio/temario_cloud_developers.md` — el temario. **B4 es el módulo activo.** Fija el alcance: 5 temáticas.
2. `apuntes/AGENTS.md` — anatomía y redacción de los apuntes. Presta atención especial a **A6 (específico, no ambiguo)**, A7 ("Lo que debiste llevarte"), A9 (imágenes y capturas) y A1-A2 (estructura, incluido `99_cierre.md`). Voz y formato: `.claude/skills/generar-apunte/estilo.md`.
3. `.claude/skills/cerrar-modulo/SKILL.md` — catálogo de formas de cerrar un módulo y sus cuatro reglas. La primera es innegociable: *un cierre no puede exigir ningún concepto que el temario aún no haya cubierto*.
4. `.claude/skills/integrar-curso/SKILL.md` — el temario manda, el curso alimenta. La tabla de qué se descarta de una transcripción.
5. `.claude/skills/generar-apunte/p3-generar.md` y `p4-sintetizar.md` — generación + autocrítica, y síntesis.
6. `apuntes/cloud/b4-computo-maquina-virtual/00_indice.md` — el estado real del módulo.
7. `apuntes/cloud/b4-computo-maquina-virtual/01_que-es-una-instancia.md` — **léela entera.** Es el tono, la densidad y el nivel de la Sección 2 en adelante.

## Dónde estamos exactamente

**Módulo B4** — carpeta `apuntes/cloud/b4-computo-maquina-virtual/`

| Sección | Estado |
|---|---|
| 1 · Qué es una instancia y qué alquilas | ✅ escrita — el usuario la está revisando |
| **2 · Elegir el tamaño: tipos de instancia** | ⬜ **siguiente** |
| 3 · Lanzar una instancia | ⬜ |
| 4 · El ciclo de vida y lo que cuesta | ⬜ |
| 5 · El rol de instancia | ⬜ |
| `99_cierre.md` | ⬜ se escribe al terminar las secciones |

**El esqueleto ya está aprobado.** No lo vuelvas a proponer. Está en el `00_indice.md` con sus códigos de indicación y sus subsecciones.

## Las fuentes de B4

| Fuente | Ruta | Estado |
|---|---|---|
| 🎬 S5 — EC2, 3 clases | `apuntes/cloud/_input/transcripcion_s5_ec2.md` | ✅ visto |
| 📸 Capturas de la consola EC2 (9) | `apuntes/cloud/_input/img_ec2/` | disponibles |
| 🎬 S5 — *Demostración de roles de instancias EC2* (6 min) | — | ⬜ **sin ver.** El usuario la verá al llegar a la Sección 5 |

Las tres clases de la transcripción son: *Fundamentos de EC2*, *Crear una instancia con datos de usuario - Práctica*, y *Tipos básicos de instancia*.

> ⚠️ **No toques `diagrama_lanzamientoEC2.png` ni `ejemplo_diagrama_estilocloud.png`**, que están en la raíz del repo. Son para otra instrucción que el usuario dará aparte.

## Reglas críticas del sistema (leídas en carne propia esta sesión)

**El alcance lo fija el temario, no el curso.** Las 5 temáticas se cubren completas, se hayan mencionado o no en el video.

**Qué NO entra al apunte:** marketing del proveedor, historia corporativa, meta-comentario del curso (*"la interfaz cambia seguido"*), logística y preparación de examen. Criterio: *¿esto cambia algo que voy a decidir o hacer?*

**La consola real manda sobre el video.** El curso es de agosto de 2022 y la interfaz **no coincide**. Se describe lo que muestran las capturas del usuario, no lo que narra el instructor. Esto ya produjo mejor material que la fuente en B2 y B3.

**Marca `⚠️ verificar`** todo dato del que no estés seguro: cifras, límites, nombres de pantallas, precios.

### Reglas editoriales — el usuario corrigió estas seis veces esta sesión

Están formalizadas en `apuntes/AGENTS.md` (A6), pero repito las que más fallaron:

- **Ningún término se usa antes de definirse.** Ni de paso. Falló con *bucket*, *hipervisor*, *acceso programático*, *entidad*, *CLI*.
- **Nada de verbos vagos donde hay un mecanismo con nombre.** *"Te rebota"* → *"AWS deniega la acción y responde «no está autorizado»"*. Repetir la palabra técnica exacta es mejor que buscar sinónimos.
- **Nada de explicaciones circulares.** Repetir el fenómeno como si fuera su causa no explica. Si la causa real es comercial, se dice con su mecanismo y su evidencia.
- **Una metáfora, un solo significado** en todo el módulo. Si hace falta nombrar otra idea, palabra literal.
- **Segunda persona de instrucción sí; biográfica no.** *"Debes recordar"* va bien; *"la web que has estado usando"*, *"como ya viste"*, *"lo que hiciste en B1"* rompen — el apunte tiene que funcionar para alguien que llega de cero.
- **Los títulos describen la sección**, no su idea más vistosa.
- **Ninguna definición se apoya en otro documento.** El apunte es atemporal: dentro de un año, `B1` no significa nada. Un concepto se sostiene **completo donde se define**; la referencia cruzada solo señala dónde profundizar, y va **con nombre** (*"→ B2 · Costos y facturación"*), entre paréntesis, nunca en el título ni en el quote de apertura. La prueba: tapa la referencia — si la frase deja de enseñar, hay que reescribirla.

## Convenciones nuevas que el `PROMPT.md` anterior no tenía

- **`99_cierre.md`** — el mecanismo de evaluación vive en su propio archivo, con `seccion: cierre` en el frontmatter. El `00_indice.md` **solo apunta** a él y muestra su estado: es superficie de control, nunca de contenido.
- **`.claude/skills/cerrar-modulo/`** — nueve formas de cerrar un módulo (caso, predicción y comprobación, auditoría de artefacto, diagnóstico de fallo, consola, micro-ejercicio, quiz, explicación, diseño en papel). Cada prueba declara **qué mide y por qué esa forma**.
- **Los quizzes se corren en vivo**, una pregunta a la vez, y **nunca se escriben en el apunte**. Los casos sí pueden escribirse: son escenarios de decisión sin respuesta que copiar.
- **Capturas de interfaz** (§5.4): el texto manda y la imagen acompaña; el apunte debe entenderse sin verlas. Van en `img/` dentro de la carpeta del módulo, con prefijo de sección y pie de foto en cursiva. Sin datos sensibles.
- **El temario se dividió dos veces** por decisión del usuario: **B3 Identidad** / **B3b Secretos** (se estudia antes de B6), y **B4 Cómputo** / **B4b Contenedores y Docker**.

## Estado de la cuenta AWS del usuario

Es material real y las secciones se escriben contra ella, no contra ejemplos genéricos.

| | |
|---|---|
| Cuenta activa | **GreenCloud** *(la anterior, Cattcloud, no se usa)* |
| Plan | **Plan gratuito nuevo**: 100 USD de crédito, vence el 21/02/2027; el crédito en sí vence el 22/08/2027 |
| Región de trabajo | `us-east-2` (Ohio) — ver `sistema/perfil/entorno_aws.md` |
| Alias, usuario IAM, permisos y MFA | En `sistema/perfil/entorno_aws.local.md` (local, no versionado: el repo es público, R9) |
| Recursos creados | Ninguno, salvo el presupuesto `alerta-gasto-cero` |

> ⚠️ **Dos bloqueos que hay que resolver antes de la práctica de la Sección 3:** el usuario necesita `AdministratorAccess` para poder crear una instancia, y conviene activar MFA. Recuérdaselo cuando lleguéis ahí, no antes.
>
> 💸 **B4 es el primer módulo que gasta dinero de verdad.** Hasta ahora la cuenta estaba vacía. Conviene recordar el ciclo completo: crear → comprobar → **terminar y verificar que no quedó nada**.

## Pendientes acumulados de otros módulos

| Qué | Dónde |
|---|---|
| **Tres repasos vencidos** — B1 (25/08), B2 (26/08), B3 (07/09) | Bloques `repaso:` de cada `00_indice.md` |
| Cierre de B1 — recorrido de orientación a medias | `b1-fundamentos-cloud/99_cierre.md` |
| Cierre de B2 — falta ubicar el desglose por tipo de uso en Cost Explorer | `b2-costos-facturacion/99_cierre.md` |
| Cierre de B3 — **aplazado a propósito** hasta después de B4 | `b3-identidad/99_cierre.md` |
| Cambios sin commitear en el repo | `git status` |

## Cómo proceder

**P3⇄P4, sección por sección.** Por cada una: generas el contenido, te autocriticas (qué falta, qué es dudoso, qué se explica mejor de otra forma), sintetizas en estilo Tesla, escribes el archivo, el usuario ajusta en vivo, y **recién ahí** pasas a la siguiente. **No generes varias secciones de golpe.**

Al terminar cada sección: marcarla ✅ en el `00_indice.md` y `estado: finalizada` en su frontmatter.

**Empieza por la Sección 2 — Elegir el tamaño: tipos de instancia.** Sus subsecciones aprobadas:

1. Cómo se lee un nombre: clase, generación, tamaño `[CÓDIGO]`
2. Las cuatro familias y para qué sirve cada una `[TABLA]`
3. Cuál eliges hoy, y por qué
4. El precio como criterio de elección `[COSTO_SERVICIO]`

Es una sección **corta**: el objetivo es leer `m5.2xlarge` sin buscarlo y saber que hay familias con propósitos distintos. **No entra el catálogo de tipos** — son cientos y no cambian ninguna decisión a este nivel.

## Arranca así

Lee todo lo anterior, confirma en una línea que tienes el estado, y **empieza a generar la Sección 2 directamente**. El esqueleto ya está aprobado: no vuelvas a proponerlo ni pidas permiso para empezar.
