---
tema: B3 — Identidad
workspace: cloud
seccion: 3
titulo: "Menor privilegio en la práctica"
estado: finalizada
prev: 02_politicas
next: 04_formas-de-entrar
---

# ☁️ Menor privilegio en la práctica

> **Menor privilegio es dar exactamente los permisos que una tarea necesita, y ni uno más.**
>
> Es fácil de enunciar y difícil de sostener, porque la alternativa —dar de más— funciona igual de bien. Hasta el día que no.

## El dolor: mil políticas y ninguna pista

La escena es siempre la misma. Estás creando un usuario o un grupo, llegas al paso de permisos, y la consola te pone delante **más de mil políticas** ordenadas alfabéticamente. No conoces ninguna. El asistente no avanza sin que elijas algo. Eliges la primera que suena razonable, o la que se llama como algo que reconoces.

Y entonces pasa lo peor que podía pasar: **funciona**. La aplicación arranca, la consola te deja hacer lo que necesitas, nadie te dice nada. Nunca.

Ahí está la trampa, y no es tuya: es del diseño del sistema.

| | Te quedaste corto | Te pasaste |
|---|---|---|
| **Cuándo lo descubres** | En segundos | Quizá nunca |
| **Cómo** | Un error que nombra la acción que falta | No hay ninguna señal |
| **Qué cuesta arreglarlo** | Un minuto: añades esa acción | No puedes arreglar lo que no sabes que existe |
| **Cuánto cuesta si sale mal** | Nada. Simplemente todavía no funciona | Lo que un atacante o un script puedan hacer con ese permiso |

> 🎯 **Idea clave:** el sistema solo te avisa cuando te quedas corto. **Pasarte es silencioso.** Por eso el menor privilegio no ocurre solo — tiene que ser una decisión deliberada, porque no hay ninguna señal que te empuje hacia él.

Y una aclaración necesaria antes de seguir, porque este principio se sobre-aplica con facilidad:

> 🔑 **Menor privilegio aplica a lo que *no* es root** Un servicio, una función, un script, una credencial que vive en un servidor. **Tú administrando tu propia cuenta necesitas `AdministratorAccess`**, y está bien que lo tengas: mutilarte a ti mismo no es seguridad, es fricción. Lo que no puede tener acceso total es la función que solo lee un bucket.

## Por qué "acceso completo" es caro aunque funcione

Las razones no son morales ni de buenas prácticas. Son tres costos concretos:

**1. El radio de daño.** Cuando una credencial se filtra , lo que el atacante puede hacer **es exactamente lo que tú permitiste**. Con una política de solo lectura sobre un bucket, el daño es que alguien vio unos archivos. Con acceso completo, el daño es tu total.

**2. Tus propios errores.** La mayoría de los borrados accidentales los hace gente perfectamente autorizada. Y aquí hay algo que suena obvio pero conviene decir explícito: **un permiso que no tienes es un error que no puedes cometer**. Un script de limpieza mal escrito, con permisos de borrado, borra el bucket de producción; el mismo script con solo lectura falla, no pasa nada, y te enteras del bug sin consecuencias.

**3. No llegas a saber qué necesita tu app.** Con acceso completo nunca descubres qué permisos usa realmente. Y sin eso no puedes reducirlos después, ni auditarla, ni moverla a otra cuenta. La deuda no deja de crecer porque nada la hace visible.

Tres creencias que sostienen el problema:

❌ **Mito:** "Es mi cuenta personal, no hay nadie más — no importa."
✅ **Realidad:** El riesgo principal no es otra persona. Es **tu propia clave filtrada** en un repositorio y **tu propio script** haciendo algo que no querías. Los dos escenarios ocurren en cuentas de una sola persona.

❌ **Mito:** "Le doy acceso completo ahora y lo ajusto más adelante."
✅ **Realidad:** Más adelante no sabes qué quitar sin romper algo. **Reducir permisos es mucho más difícil que darlos**, porque para reducir necesitas saber qué se usa — y esa información solo existe si empezaste apretado.

❌ **Mito:** "El menor privilegio es cosa de empresas grandes."
✅ **Realidad:** Escala al revés. En una empresa hay revisión de código y alguien que te dice que no. Trabajando solo, **nadie va a corregirte** — la única defensa es el permiso que no diste.

## Cómo se escribe una política mínima

El método tiene cuatro pasos y el primero no es técnico:

**1 — Escribe en una frase lo que esa pieza hace.** En castellano, con verbos:

```text
"Lee los adjuntos del bucket de clientes y guarda el resultado en la tabla de correos."
```

**2 — Traduce cada verbo a acciones concretas.** Cada verbo humano son una o dos acciones de AWS:

```text
leer archivos   → s3:GetObject · s3:ListBucket
guardar         → dynamodb:PutItem
```

**3 — Acota el recurso.** Aquí es donde casi todo el mundo escribe `"*"` y se acabó el menor privilegio. Va el ARN concreto:

```text
❌  "Resource": "*"
✅  "Resource": "arn:aws:s3:::adjuntos-clientes/*"
```

**4 — Empieza denegado y suma hasta que funcione.** Nunca al revés.

> 🎯 **La regla que hace todo el trabajo:** empezar por cero e ir sumando produce políticas mínimas de forma natural, porque cada permiso que añades responde a un fallo real que acabas de ver. Empezar por acceso completo e ir restando **no converge nunca**, porque no tienes forma de saber qué sobra.

Y hay tres herramientas para no adivinar:

| Herramienta | Qué te da | Dónde |
|-------------|-----------|-------|
| **Editor visual de políticas** | La lista de acciones de cada servicio, con su descripción | Al crear la política (Sección 2) |
| **Simulador de políticas** | Evalúa si una acción concreta estaría permitida, **sin ejecutarla** | Panel de IAM |
| **Access Advisor** | Qué permisos se han usado de verdad, y cuándo | Sección 6 |

La tercera es la que cierra el ciclo: das permisos, dejas correr unos días, y **Access Advisor te dice cuáles nunca se tocaron**. Esos son los que sobran, con evidencia en vez de con intuición.

## El error de escribir permisos por adelantado

Queda un último hábito, y es el que más rápido convierte una política mínima en acceso completo: **añadir permisos "por si acaso"**.

Suena inofensivo y se justifica solo. *"Ya que estoy, le pongo también borrar, no vaya a ser que luego lo necesite."* En tres decisiones así llegas a `FullAccess`, y cada una parecía razonable por separado.

El problema del permiso especulativo es que **no tiene fecha de revisión**. Nadie va a volver a mirarlo, porque nada falla. Se queda ahí, y cuando alguien audite la cuenta dentro de un año, no habrá forma de saber si ese `Delete` se puso por una necesidad real o por si acaso.

> ⚠️ **La regla:** si no puedes nombrar **la operación concreta que lo necesita hoy**, el permiso no va. No "puede que lo use": *lo usa esta función, en esta línea*.

Y el orden de trabajo que se deriva de eso es el contrario al instintivo:

```text
1. Construye con lo mínimo que se te ocurra
2. Ejecuta → falla
3. Lee el error: te dice exactamente qué acción faltó
4. Añade esa acción, y solo esa
5. Vuelve al paso 2
```

> 💡 **El error es tu herramienta de descubrimiento, no un obstáculo.** Cuando AWS deniega algo, el mensaje **nombra la acción exacta** que faltaba. Es literalmente el sistema diciéndote qué escribir en la política. Trabajar así cuesta unos minutos más al principio y te deja algo que sabes justificar línea por línea.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- El sistema solo avisa cuando te quedas corto de permisos; pasarte es completamente silencioso, y por eso el menor privilegio tiene que ser deliberado.
- Menor privilegio aplica a servicios, funciones y scripts — no a ti administrando tu propia cuenta, donde tener acceso de administrador es lo correcto.
- Dar de más cuesta en tres cosas concretas: el radio de daño si la credencial se filtra, los errores propios que un permiso ausente habría impedido, y no llegar a saber nunca qué necesita tu app.
- Reducir permisos es más difícil que darlos, porque para reducir hace falta saber qué se usa — y eso solo se sabe si empezaste apretado.
- Una política mínima se escribe traduciendo verbos a acciones y acotando el recurso a un ARN concreto, nunca a `*`.
- Se empieza por cero y se suma leyendo los errores, porque el mensaje de denegación nombra exactamente la acción que falta.
- Un permiso "por si acaso" no tiene fecha de revisión: si no puedes nombrar la operación que lo necesita hoy, no entra.

---
[[02_politicas|← anterior]] · [[00_indice|índice]] · [[04_formas-de-entrar|siguiente →]]
