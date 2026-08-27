---
tema: M1 — Qué es arquitectura (y qué no)
workspace: arquitectura
seccion: 2
titulo: "Costo de reversión"
estado: finalizada
prev: 01_decision-arquitectonica
next: 03_atributos-de-calidad
---

# 🏛️ Costo de reversión

> **El costo de reversión es lo que tienes que pagar para deshacer una decisión que ya está implementada.**
>
> No se mide en horas de tecleo, sino en cuánto del sistema hay que abrir, cuánta gente tiene que coordinarse y cuánto riesgo asumes mientras dura el cambio.

Esta es la métrica que faltaba en la sección anterior. Decir *"una decisión arquitectónica restringe a las demás"* es cierto pero no se puede medir; en cambio *"cuánto me cuesta deshacerla hoy"* sí se puede estimar, y aterriza el criterio en algo que puedes calcular frente a una decisión real.

De hecho, hay toda una escuela que define la disciplina justamente así:

> 💡 **Nota:** Martin Fowler resume la arquitectura como *"las cosas que la gente percibe como difíciles de cambiar"*, y cita a Ralph Johnson con la frase *"la arquitectura es lo importante. Sea lo que sea eso."* La gracia de esa definición es que no depende de la tecnología: lo importante es lo caro de deshacer, y eso cambia según el proyecto. ⚠️ Ver bloque de verificación al pie.

## El costo no es fijo: crece con lo que se apila encima

Aquí está la parte que casi nadie ve venir. El costo de revertir una decisión **no es una propiedad de la decisión**: depende de cuánto se construyó encima de ella.

```text
Costo de revertir
     ▲
     │                                    ╱
     │                              ╱
     │                      ╱
     │           ╱
     │  ────╱
     └──────────────────────────────────────►  features y decisiones apiladas encima
```

Fíjate bien en el eje horizontal, porque es donde casi todo el mundo se confunde: **no es el tiempo**. Es la cantidad de cosas que se apoyaron en esa decisión.

> 🔑 **Matiz:** el tiempo es solo un **proxy**, y a veces uno malo. Un proyecto congelado seis meses no encarece ninguna de sus decisiones. Un proyecto con cinco devs empujando features las encarece en tres semanas. Lo que pesa es lo **apilado**, no el calendario.

La razón es simple: cada feature nueva que se escribe apoyada en una decisión se vuelve rehén de ella. Al deshacerla no tumbas solo la decisión — tumbas todo lo que se construyó encima confiando en que seguiría ahí.

> 🎯 **Idea clave:** por eso *"lo caro de cambiar se decide primero"*. No porque temprano tengas más información — al contrario, temprano es cuando **menos** sabes. Se decide primero porque la ventana en la que equivocarse sale barato se cierra rápido.

## Analogía: cambiar el sofá vs. cambiar de ciudad

Piensa en las decisiones de tu vida como decisiones de tu proyecto.

Cambiar **el sofá de lugar en la sala** te toma una tarde. Si queda feo, lo mueves otra vez. Nadie más se entera y ninguna otra parte de tu vida se ve afectada. Eso es una decisión de diseño.

Cambiar **la ciudad en la que vives** es otra cosa. No es que sea "más trabajo": es que hay demasiadas cosas ancladas a esa dirección — el trabajo, el colegio de tus hijos, el contrato de alquiler, tu médico, tus amigos. Al mudarte no cambias una cosa, disparas veinte cambios en cascada. Eso es una decisión arquitectónica.

Y aquí viene el mapeo importante: mudarte de ciudad **el primer mes** que llegaste es incómodo pero manejable, porque todavía no anclaste nada. Mudarte **después de cinco años** es otro problema completamente distinto, aunque la decisión sea literalmente la misma. Lo que cambió no fue la mudanza — fue **cuántas cosas ataste a esa dirección**. Otra vez: no es el calendario, es lo apilado.

> 🔑 **Límite de la analogía:** en la vida real puedes mudarte y dejar cosas atrás. En software no: si dejas medio sistema atrás, te queda funcionando a medias en producción. El software no acepta mudanzas parciales sin pagar el costo de mantener las dos casas.

## La escala, con decisiones reales

No todas las decisiones caen en "barata" o "cara" — es un espectro. Esta tabla ordena decisiones concretas de un e-commerce por lo que cuesta deshacerlas una vez implementadas:

| Decisión | Qué hay que tocar para deshacerla | Costo | Tipo |
|----------|-----------------------------------|-------|------|
| Renombrar una variable | Un archivo; el editor lo hace solo | 🟢 Trivial | Diseño |
| Usar `map` en vez de un `for` | Una función | 🟢 Trivial | Diseño |
| Cambiar la librería de fechas usada en 3 archivos | 3 archivos y sus tests | 🟡 Bajo | Diseño |
| Pasar el carrito de `localStorage` a Postgres | Schema, auth, endpoints, tests, y los carritos que los usuarios ya tienen abiertos | 🔴 Alto | Arquitectura |
| Repartir el proyecto por dominio cuando estaba cortado por capa técnica | Todo el repo, más coordinar a cada dev que tenga una rama abierta | 🔴 Alto | Arquitectura |
| Cambiar Postgres por Mongo con el dominio acoplado al ORM | Reescribir la capa de datos, migrar los datos en vivo y asumir el riesgo de perderlos | ⚫ Catastrófico | Arquitectura |

🟢 = una persona, una tarde · 🟡 = una persona, varios días · 🔴 = el equipo, con plan y migración · ⚫ = proyecto detenido

Debes recordar que la columna **Tipo** no la decidí aparte: **sale sola de la columna de costo**. Ese es el punto entero de la sección — el costo de reversión no es un dato más de la decisión arquitectónica, es lo que la **define**.

## Cómo comparar dos decisiones caras entre sí

La tabla anterior te da una escala, pero no resuelve el caso difícil: cuando **dos decisiones caen en el mismo escalón** y tienes que decir cuál pesa más. Ahí la intuición falla, porque las dos "se sienten grandes".

No intuyas. **Enumera tres cosas** por cada una:

1. **¿Qué hay que tocar?** Solo código, o también schema, configuración de deploy, infraestructura.
2. **¿Quién tiene que enterarse?** Solo el equipo de desarrollo, o también los usuarios.
3. **¿Hay datos o usuarios en vivo de por medio?** Es la pregunta que casi siempre desempata.

Veámoslo con dos decisiones que a primera vista parecen igual de caras:

| | Extraer la lógica de precios a un módulo propio | Guardar las sesiones en la base de datos |
|---|---|---|
| **¿Qué hay que tocar?** | Código, y nada más | Capa de auth, schema, configuración de deploy |
| **¿Quién se entera?** | El equipo de desarrollo | Los usuarios: al migrar **se deslogean todos** |
| **¿Datos en vivo?** | No | **Sí** — sesiones activas en este momento |

> 🎯 **Idea clave:** **lo que es solo código es más barato de revertir que lo que ya tiene datos o usuarios encima.** El código lo cambias en una rama y lo pruebas antes de que nadie lo note; los datos en producción hay que migrarlos, y mientras dura la migración a los usuarios les pasa algo.

Y hay un segundo desempate, más fino, para cuando el primero no alcanza:

> 🔑 **Matiz:** algunas decisiones son de las que **abaratan la reversión de otras**. Extraer los precios a un módulo propio es exactamente el movimiento de *"que el resto no se enganche directo"* — deshacerla es re-esparcir código, algo mecánico. Cambiar dónde vive un estado que ya existe no tiene nada de mecánico. Una decisión que existe para hacer el sistema más flexible casi siempre es más barata de deshacer que una que define dónde vive algo.

## La paradoja incómoda

Hay una tensión que conviene ver de frente, porque explica por qué esto es difícil y no solo tedioso:

> ⚠️ **Importante:** tienes que tomar las decisiones más caras de revertir **exactamente cuando menos sabes del proyecto**. El día uno no conoces el dominio, no sabes qué features van a pedir, ni cuántos usuarios habrá. Y sin embargo es el día en que decidir sale más barato.

No hay forma de eliminar esa tensión, pero sí de administrarla, y son dos movimientos:

- **Postergar lo que se pueda.** Si una decisión cara todavía no bloquea el trabajo de nadie, no la tomes hoy. El mecanismo no es *"esperar a saber"*: es que **la información llega gratis mientras construyes**. Cada semana de desarrollo te regala datos que el día uno no tenías — qué features piden de verdad, dónde duele, qué creció.
- **Abaratar la reversión de lo que no se pueda postergar.** Si tienes que decidir hoy, al menos evita que el resto del sistema se enganche directo a esa decisión. Es lo que hace, por ejemplo, que el dominio no importe Prisma: no elimina la decisión, **le baja el precio de deshacerla**.

Ese segundo movimiento es el que ocupa los módulos M3 y M4 completos. Pero el primero tiene tres letras chicas que conviene leer antes de aplicarlo:

- **Postergas la decisión, no el trabajo.** Sigues construyendo; lo que no haces es amarrar el sistema a una elección que todavía no te bloquea.
- **Hay un límite: el último momento responsable.** Es el punto después del cual *no decidir* ya te sale más caro que decidir mal. Pasado ese punto, postergar deja de ser prudencia y se vuelve parálisis.
- **Postergar no es lo mismo que no decidir.** Y esta es la trampa grande:

> ⚠️ **Cuidado:** si no decides dónde vive la lógica de negocio, **ya decidiste**: vive en el route handler donde cayó. La decisión se toma sola, por omisión. Postergar bien exige saber que la estás postergando; si no lo sabes, no postergaste — **heredaste**. (Es el tema completo de la sección 5.)

## ¿Y si no tienes clara la decisión?

Va a pasar seguido, sobre todo al principio de un proyecto. Y tiene protocolo, en este orden:

1. **¿Tengo que decidirla hoy?** Si nadie está bloqueado, no la tomes. Vuelve cuando el proyecto te haya dado datos.
2. **Si sí: elige la más barata de revertir, no la mejor.** Cuando no sabes, el criterio no es *"¿cuál es la correcta?"* sino *"¿desde cuál me puedo salir más rápido cuando descubra que me equivoqué?"*. Es decir, estás comprando una **opción de salida**, no una solución.
3. **Aísla la decisión.** Que el resto del sistema no se enganche directo a ella. No elimina el error, le baja el precio.
4. **Escribe por qué la tomaste**, incluyendo lo que **no** sabías en ese momento. En seis meses no vas a recordar el contexto, solo el resultado — y sin contexto no puedes reevaluar. (Eso es un ADR, módulo M8.)
5. **Ponle un disparador de revisión:** *"si pasamos de 500 usuarios / si entra un segundo cliente / si aparece un tercer canal, esto se revisa"*. Sin disparador, ninguna decisión se revisa jamás.

> 🎯 **Idea clave:** cuando no sabes, **no optimices por acertar. Optimiza por poder corregir barato.**

## Decisiones arquitectónicas cuando programas con IA

Todo lo anterior asume que la decisión la tomas tú. Cuando programas con un agente de IA eso deja de ser cierto por defecto — y conviene verlo de frente, porque es donde más rápido se acumulan decisiones que nadie tomó.

Cuando le pides a un agente *"agrégame el descuento por volumen al carrito"*, el agente **no te pregunta dónde va**. Elige. Elige el archivo, elige si importa el ORM ahí mismo, elige si la regla vive en el route handler o en una función de dominio. Y elige lo estadísticamente más común en su training data — que suele ser el tutorial de moda del framework, no lo que tu proyecto necesita.

> ⚠️ **Cuidado:** eso es exactamente el error caro de la sección 1 — decisiones arquitectónicas tomadas **por omisión**, sin que nadie note que se estaban tomando. Con una diferencia: ahora se toman a doscientas líneas por minuto, y vienen envueltas en una prosa segura que las hace parecer deliberadas.

La división de labores que sí funciona:

| Tipo de decisión | Quién decide |
|------------------|--------------|
| De diseño (adentro de un módulo, cómo se implementa) | La IA, sin consultarte. Es donde más rinde. |
| Arquitectónica (dónde vive, quién importa a quién, dónde se guarda el estado, qué cruza un límite) | **Tú.** La IA propone opciones y su costo de reversión. |

Y esto no se consigue pidiéndolo en el chat: se pierde a la tercera sesión, porque el modelo llega sin memoria a cada conversación. Se consigue dejándolo escrito donde el agente sí lo lee siempre — su archivo de contexto.

**Ejemplo (regla para un `CLAUDE.md`):**

```markdown
## Decisiones arquitectónicas

Si la tarea implica decidir dónde vive un módulo, quién importa a quién, dónde se
guarda el estado o qué cruza un límite: **detente y avísame antes de implementar.**
No la tomes por defecto. Dame 2 opciones con su costo de reversión y tu recomendación.
```

En términos simples: la IA es excelente bajando el costo de **escribir** código, y completamente indiferente al costo de **revertirlo**. Esa asimetría la tienes que cubrir tú.

Ahora bien, hasta acá el criterio dice **qué** decisiones importan, pero no **para qué** las estás tomando. Un mismo sistema puede estar bien arquitecturado para una cosa y pésimo para otra — y eso depende de qué le estés pidiendo. Eso es lo que viene.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- El **costo de reversión** es lo que cuesta deshacer una decisión ya implementada, y no es un dato más de la decisión arquitectónica: **es lo que la define**.
- Ese costo crece con **lo que se apila encima**, no con el calendario. El tiempo es solo un proxy: lo que pesa es cuántas features quedaron colgando de esa decisión.
- Lo caro se decide primero **no porque temprano sepas más** — sabes menos —, sino porque la ventana en la que equivocarse sale barato se cierra rápido.
- **Postergar no es no decidir.** Lo que no decides explícitamente se decide solo, por omisión, y así nadie lo revisa nunca.
- Cuando no tienes claro qué elegir: **no optimices por acertar, optimiza por poder corregir barato.** Y con IA de por medio, la regla se vuelve explícita: el diseño es suyo, la arquitectura es tuya.

---
[[01_decision-arquitectonica|← anterior]] · [[00_indice|índice]] · [[03_atributos-de-calidad|siguiente →]]
