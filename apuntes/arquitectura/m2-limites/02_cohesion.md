---
tema: M2 — Límites: cómo se parte un sistema
workspace: arquitectura
seccion: 2
titulo: "Cohesión"
estado: finalizada
prev: 01_modulo-componente-servicio
next: 03_acoplamiento
---

# 🏛️ Cohesión

> **La cohesión es qué tanto las cosas que viven dentro de un módulo *pertenecen* juntas.**
>
> Un módulo cohesivo tiene **una sola razón para cambiar**: existe un único tipo de requerimiento capaz de obligarte a abrirlo. Si tres clases de pedido distintas te mandan al mismo módulo, adentro hay tres módulos.

Ya sabes qué es un módulo y qué lo delimita. Falta lo difícil: decidir **qué va adentro**. Y aquí casi todo el mundo usa el criterio equivocado sin darse cuenta.

## El criterio equivocado y el correcto

El instinto dice: **agrupa cosas parecidas**. Todos los controladores juntos, todos los servicios juntos, todos los modelos juntos. Se siente ordenado — y es justamente lo que produce un proyecto donde cada cambio te obliga a abrir cinco carpetas.

El criterio correcto es otro:

> 🎯 **Idea clave:** **viven juntas las cosas que cambian juntas.** No las que se parecen, no las que se llaman igual: las que **un mismo requerimiento obliga a tocar al mismo tiempo**.

Y de ahí sale una prueba que puedes hacer sin abrir el código: toma un requerimiento real y cuenta **cuántas carpetas tienes que abrir**. Mira el mismo requerimiento en dos proyectos distintos:

```text
REQUERIMIENTO: "agregar descuentos por volumen al carrito"

Proyecto A — agrupado por tipo         Proyecto B — agrupado por razón de cambio

controllers/                            carrito/
└── carritoController.ts   ✏️           ├── index.ts          ✏️
services/                               ├── calcularTotal.ts  ✏️
├── carritoService.ts      ✏️           ├── descuentos.ts     ✏️
└── precioService.ts       ✏️           └── tipos.ts          ✏️
models/
└── Carrito.ts             ✏️
validators/
└── carritoValidator.ts    ✏️

→ 4 carpetas, 5 archivos                → 1 carpeta, 4 archivos
```

Los dos proyectos tocan casi la misma cantidad de archivos. La diferencia está en **cuántos lugares distintos tuviste que visitar** — y en cuántos de esos lugares hay código de otras diez features que no tienen nada que ver con lo tuyo.

Fíjate en lo que **no** dice esa prueba: nada sobre si el código es bonito, ni sobre cuántos archivos hay. La cohesión se mide en **cambios**, no en apariencia.

## Analogía: la cocina por estaciones

Imagina que montas la cocina de un restaurante y la organizas **por tipo de objeto**: todo lo metálico en un rincón, todo lo plástico en otro, todos los líquidos en un tercero. Se ve impecable y es fácil de explicar.

Ahora llega un pedido de ensalada. Necesitas el cuchillo (rincón metálico), el bowl (rincón plástico) y el aceite (rincón de líquidos). Tres viajes por toda la cocina para un solo plato. Y la ensalada es el plato más simple del menú.

La cocina real se organiza **por estación**: la de ensaladas, la de parrilla, la de postres. Cada estación tiene todo lo que su plato necesita, aunque eso signifique que hay un cuchillo en tres lugares distintos. El cocinero se para en una estación y sale el plato.

> 🔑 **Límite de la analogía:** hay cosas que de verdad pertenecen a todas las estaciones — la sal, el aceite, el fuego. En software pasa igual: siempre hay un puñado de cosas genuinamente compartidas (formateo de fechas, manejo de errores, el cliente HTTP). Que existan **no** justifica meter ahí todo lo que no supiste dónde poner.

Y sobre eso último, la advertencia más útil de la sección:

> ⚠️ **Cuidado con `utils/`.** Es el módulo de cohesión cero por definición: lo único que sus archivos tienen en común es que nadie supo dónde ponerlos.

Así se ve uno de verdad:

```ts
// utils/index.ts
export { formatearFecha } from "./fecha"      // lo usa todo el mundo
export { calcularIGV } from "./impuestos"     // ← esto es de facturación
export { slugify } from "./texto"             // lo usa todo el mundo
export { validarRUC } from "./ruc"            // ← esto es de clientes
export { subirAS3 } from "./s3"               // ← esto es infraestructura
```

Cinco exports, **cinco razones de cambio completamente distintas** y cero relación entre ellos. Cuando cambie la tasa del IGV vas a editar un archivo llamado `utils`, y eso ya te dice que está en el lugar equivocado: `calcularIGV` es de facturación, `validarRUC` es de clientes, `subirAS3` es del módulo que suba archivos.

Sobreviven los dos primeros, y por una razón concreta: **los usa todo el mundo y no pertenecen a ningún dominio**. Ese es el único `utils` legítimo.

> 🔑 **La regla:** si algo en `utils/` **solo lo usa un módulo**, ese archivo no era un util — era parte de ese módulo, y llegó ahí porque su dueño no se atrevió a reclamarlo.

## Grados de cohesión

No es un sí o un no — es una escala. De peor a mejor, con lo que agrupa cada nivel:

| Cohesión | Qué agrupa | Cómo se ve | Veredicto |
|----------|------------|------------|-----------|
| 🔴 **Por coincidencia** | Nada en común; cayeron ahí | `utils/`, `helpers/`, `common/` | La peor: no hay razón, solo residuo |
| 🟡 **Por tipo técnico** | Cosas del mismo tipo | `/controllers`, `/services`, `/models` | Se **siente** ordenado sin estarlo |
| 🟡 **Por momento** | Cosas que ocurren a la vez | Todo lo del arranque de la app junto | Sirve a veces; frágil casi siempre |
| 🟢 **Por razón de cambio** | Cosas que un mismo requerimiento toca | `/pedidos`, `/carrito`, `/pagos` | La que buscas |

> 📝 **Nota:** vas a encontrar estos niveles con nombres más formales — *cohesión coincidental, temporal, funcional*. Es la misma escala; los nombres vienen de la literatura clásica de diseño. Lo que importa es el orden, no el vocabulario.

## La prueba del propósito

Hay un test más rápido todavía. Describe qué hace el módulo y mira la lista de cosas que enumeraste:

> **¿Cada cosa de esa lista existe *para* el mismo objetivo, o cada una tiene objetivo propio?**

Compara las dos:

- *"Gestiona los pedidos: crearlos, validarlos, cancelarlos."* → **un objetivo**. Validar no tiene sentido por sí solo; existe *para* gestionar pedidos.
- *"Gestiona los pedidos, manda correos y genera el PDF de la factura."* → **tres objetivos**. Mandar correos no existe para los pedidos: existe para el sistema entero.

Se ve claro mirando lo que hay adentro de la carpeta:

```text
pedidos/
├── crear.ts           ← existe para gestionar pedidos
├── validar.ts         ← existe para gestionar pedidos
├── cancelar.ts        ← existe para gestionar pedidos
├── enviarCorreo.ts    ← ✋ existe para TODO el sistema
└── generarPDF.ts      ← ✋ existe para TODO el sistema
```

Los tres primeros no tienen vida fuera de los pedidos. Los dos últimos sí — y ahí está la señal.

El marcador que desempata cuando no lo tienes claro:

> 🔍 **Quítale una parte al módulo. ¿Esa parte podría vivir sola y serle útil a otros módulos?** Si sí, es un módulo aparte que terminó guardado ahí. *Mandar correos* le sirve a pedidos, a registro de usuarios y a marketing — tiene vida propia. *Validar un pedido* no le sirve a nadie más.

> ⚠️ **Cuidado:** que un módulo haga muchas cosas no lo vuelve incohesivo. Lo vuelve incohesivo que esas cosas **sirvan a fines distintos**. Un módulo de pedidos con quince funciones está bien si las quince existen para gestionar pedidos.

Y esto conecta con lo de la sección anterior: **un módulo que persigue tres objetivos no puede tener un contrato estable**. Cada vez que cambie uno de los tres, la puerta cambia — así que nunca vas a poder reemplazarlo por dentro. La cohesión es el requisito previo de un buen contrato.

## ¿De qué tamaño es un objetivo?

Si llevas *"un solo objetivo"* al extremo, terminas con `/crear-pedido`, `/validar-pedido` y `/cancelar-pedido`: tres módulos con una función cada uno. Y cuando llega *"agregar descuentos por volumen"*, abres tres carpetas en vez de una.

Fíjate en el síntoma: **es el mismo que el de la baja cohesión**. Partiste de más y llegaste al mismo dolor por el otro lado.

> 🎯 **Idea clave:** la cohesión no te dice *"haz módulos pequeños"*. Te dice *"haz módulos que cambien por una sola razón"*. A veces esa razón abarca bastante código, y el módulo grande es el correcto.

### El tamaño lo dictan los requerimientos, no el código

Esta es la idea que ordena el módulo entero:

> **Los límites no se leen en el código, se leen en el historial de cambios.** Por donde te llegan las peticiones es por donde el sistema pide ser cortado.

Aplicado:

- *"Agregar descuentos por volumen"*, *"permitir cancelar hasta 24h después"*, *"cambiar el flujo de confirmación"* → los tres caen sobre pedidos. **Un solo módulo `/pedidos`.**
- Pero si dentro de `/pedidos` también vive la facturación y llega *"cambió la ley de facturación electrónica"*, ese requerimiento **no toca los pedidos para nada**. Dos fuentes de cambio independientes → dos módulos.

La pregunta no es *"¿cuántas funciones tiene?"* sino **"¿los cambios que llegan a este módulo vienen de una sola fuente o de varias?"**.

Lo que buscas es esto — el listado de peticiones reales de los últimos meses, con qué tocó cada una:

```text
1. "descuentos por volumen"            → pedidos
2. "cancelar hasta 24h después"        → pedidos
3. "notificar cambio de estado"        → pedidos
4. "cambió la ley de facturación"      → facturación
5. "agregar nota de crédito"           → facturación
6. "permitir editar la dirección"      → pedidos
7. "guía de remisión electrónica"      → facturación

→ Siete cambios y ninguno tocó las dos cosas a la vez.
→ Pedidos y facturación cambian por razones distintas: son dos módulos.
```

Si en la columna de la derecha hubiera aparecido *"pedidos + facturación"* una y otra vez, la conclusión sería la contraria: son uno solo, y separarlos te haría abrir dos carpetas cada vez.

Tres precisiones para aplicarlo bien:

- **Es el patrón, no un requerimiento suelto.** Un cambio aislado no prueba nada; siete seguidos sí, como arriba.
- **Los requerimientos vienen del negocio**, así que los cortes terminan pareciéndose al negocio. Nadie pide *"cambia el servicio"*: piden *"que el carrito acepte cupones"*. Por eso los cortes por dominio aguantan mejor que los técnicos — es la Sección 4.
- **Ojo con el requerimiento ya traducido a técnico.** *"Agrega un campo a la tabla de usuarios"* no es la petición, es la solución que alguien ya asumió. La petición real — *"quiero saber de qué país es cada cliente"* — es la que te dice dónde vive el cambio.

> 💡 **¿Y si el proyecto es nuevo y no hay historial?** No lo adivines. Usa el dominio como aproximación — qué partes del negocio existen y piden cosas por separado — y corrige cuando lleguen los primeros cambios reales.

### Cortar de más tampoco es gratis

> ⚠️ **Cuidado:** cada límite que trazas cuesta un contrato que mantener, una indirección más al leer y un lugar más donde buscar. Diez módulos diminutos son diez contratos y diez paradas para entender un solo flujo.

Por eso el tamaño correcto **se descubre, no se decide el día uno** — y ante la duda conviene equivocarse hacia el lado grande:

> 💡 **Regla práctica:** empieza con módulos más grandes. Partir un módulo que creció es mecánico; fusionar cinco módulos que nunca debieron separarse implica deshacer cinco contratos que ya tienen usuarios.

## La tensión: cohesión vs. duplicación

Aquí está el trade-off de la sección, y es real: si cada módulo tiene lo que necesita adentro, tarde o temprano vas a escribir **el mismo pedazo de código en dos módulos distintos**. Por ejemplo, tanto `carrito/` como `facturacion/` necesitan formatear precios.

Y ahí tienes dos salidas: dejar las dos copias donde están, o mover ese código a un lugar común para que los dos módulos lo usen. La respuesta no es *"nunca dupliques"*. Es una sola pregunta:

> 🎯 **El día que tengas que cambiar una de las dos copias, ¿la otra copia también tendría que cambiar?**

*(La pregunta es sobre el pedazo de código repetido, no sobre los módulos completos.)*

**Si la respuesta es sí** → no son dos pedazos parecidos: es **un solo pedazo escrito dos veces**. Muévelo a un lugar común. Si dejas las dos copias, algún día vas a arreglar una y olvidar la otra, y ese bug va a costar caro encontrarlo.

> **Ejemplo:** cómo se formatea un precio en soles. Si agregas el separador de miles, tiene que cambiar en todas partes — no tendría sentido que el carrito muestre `S/ 1,250.00` y la factura `S/ 1250.00`.

**Si la respuesta es no** → son **dos pedazos distintos que hoy se escriben igual**. Déjalos duplicados. Si los unes, cada cambio futuro de uno tendrás que negociarlo con el otro.

> **Ejemplo:** validar el email de un cliente y el de un proveedor. Hoy son la misma línea, pero cambian por reglas de negocio que no tienen nada que ver entre sí.

Dos pedazos de código pueden verse idénticos hoy y no ser la misma cosa. Mira cómo termina esta historia:

```ts
// Hoy. Se ven idénticas, así que "obviamente" hay que unificarlas.
function validarEmailCliente(email: string) { … }
function validarEmailProveedor(email: string) { … }

// Las unificas. Se siente bien: eliminaste duplicación.
function validarEmail(email: string) { … }

// Seis meses después: "los proveedores deben usar correo corporativo".
function validarEmail(email: string, tipo: "cliente" | "proveedor") {
  if (tipo === "proveedor") return esDominioCorporativo(email)  // ← este if es la señal
  …
}
```

Ese `if` que **pregunta quién la llamó** es la señal de que unificaste dos cosas que solo se parecían. Y a partir de ahí empeora: cada regla nueva de proveedores agrega otro `if`, y cualquiera que toque la validación de clientes tiene que entender también las reglas de proveedores para no romperlas.

Nunca fueron la misma función: eran dos funciones que ese día se escribían igual.

> ⚠️ **Cuidado:** parecerse no es ser lo mismo. Unificar dos cosas que cambian por motivos distintos crea un acoplamiento que no existía — y ese es el tema de la sección siguiente.

Debes recordar que la duplicación es un costo **visible y barato**: dos archivos que hay que tocar. El acoplamiento equivocado es un costo **invisible y caro**: un cambio en un lado rompe algo en el otro, y nadie sabe por qué. Ante la duda, duplica y espera a que el patrón se aclare.

Ahora bien, la cohesión mira **hacia adentro** de un módulo: qué tan bien pertenecen juntas sus partes. Falta la otra mitad del par — qué tan atado está ese módulo con **los demás**. Eso es lo que viene.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- La cohesión no agrupa cosas **parecidas**, agrupa cosas que **cambian juntas** — las que un mismo requerimiento obliga a tocar al mismo tiempo.
- El test rápido: cuenta **cuántas carpetas tienes que abrir** para implementar un requerimiento real. Una es alta cohesión; cinco es baja — y cinco módulos diminutos dan el mismo número que un corte por tipo técnico.
- Un módulo cohesivo tiene **una sola razón para cambiar**. La prueba: de lo que enumeras al describirlo, ¿cada parte existe *para* el mismo objetivo, o tiene objetivo propio? Si una parte podría vivir sola y servirle a otros módulos, era un módulo aparte.
- **Los límites no se leen en el código, se leen en el historial de cambios.** Cortar de más duele igual que cortar de menos, así que ante la duda: módulos más grandes, y partir después. (`utils/` es el caso extremo del otro lado: cohesión cero, lo único que comparten sus archivos es que nadie supo dónde ponerlos.)
- Ante código repetido en dos módulos, una pregunta decide: **el día que cambies una copia, ¿la otra también tendría que cambiar?** Sí → es un solo pedazo escrito dos veces, muévelo a un lugar común. No → son dos pedazos que hoy se escriben igual, déjalos. Parecerse no es ser lo mismo.

---
[[01_modulo-componente-servicio|← anterior]] · [[00_indice|índice]] · [[03_acoplamiento|siguiente →]]
