---
tema: M2 — Límites: cómo se parte un sistema
workspace: arquitectura
seccion: 3
titulo: "Acoplamiento y sus tipos"
estado: finalizada
prev: 02_cohesion
next: 04_corte-tecnico-vs-dominio
---

# 🏛️ Acoplamiento y sus tipos

> **El acoplamiento es cuánto tiene que saber un módulo sobre otro para poder funcionar.**
>
> La cohesión mira **hacia adentro** de un módulo (qué tan bien pertenecen juntas sus partes). El acoplamiento mira **entre módulos**: cuánto depende uno del otro.

La medida operativa es esta:

> 🎯 **Idea clave:** el acoplamiento se mide en **cuánto se rompe el módulo A cuando cambias algo adentro del módulo B**. Si cambias las tripas de B y A ni se entera, están poco acoplados. Si tienes que abrir A también, están muy acoplados.

## Cero acoplamiento no es la meta

Conviene desarmar esto antes de seguir, porque es el malentendido natural después de leer la sección anterior.

Dos módulos que no se hablan **no forman un sistema**: forman dos programas que casualmente viven en la misma carpeta. Para que un e-commerce funcione, el carrito **tiene** que poder pedirle un precio a precios. Ese acoplamiento no es un defecto — es el sistema haciendo su trabajo.

> ⚠️ **Cuidado:** la meta no es *"cero acoplamiento"*. Es **el mínimo necesario, y del tipo correcto**. El resto de esta sección es sobre qué significa "del tipo correcto", porque hay formas de depender de otro módulo que cuestan poco y formas que cuestan carísimo.

## Los tipos, del peor al inevitable

### 🔴 Por estado compartido — el invisible

> **Dos módulos leen o escriben el mismo dato sin pasar por su dueño.** Ese dato puede ser una columna de la base de datos, una variable global o un archivo en disco.

Veámoslo con una historia completa, porque es el tipo que menos se reconoce a simple vista.

**El escenario.** Tienes dos módulos en tu e-commerce:

- `pedidos/` — es el **dueño** del pedido. Él lo crea, lo actualiza y decide en qué estado está.
- `facturacion/` — tiene que emitir la factura, pero solo de los pedidos ya cobrados.

**Cómo lo resolvieron.** Facturación necesitaba saber si el pedido estaba cobrado. En vez de preguntárselo a pedidos, fue directo a la base de datos a mirar la columna:

```ts
// pedidos/cobrar.ts  ── el dueño escribe el dato
await db.pedido.update({
  where: { id },
  data: { estado: "pagado" }        // ← escribe aquí
})

// facturacion/emitir.ts  ── otro módulo lee el mismo dato
const pedido = await db.pedido.findUnique({ where: { id } })

if (pedido.estado === "pagado") {   // ← lee lo mismo, por su cuenta
  emitirFactura(pedido)
}
```

**Ahora fíjate en lo que NO hay en ese código: ningún `import` entre los dos módulos.** Si abres facturación y miras de qué depende, pedidos no aparece por ningún lado. En el mapa de dependencias del proyecto, son independientes.

Pero no lo son: los une la palabra `"pagado"`.

**Seis meses después.** El negocio pide que los pedidos grandes pasen por una revisión antes de darse por cobrados. El equipo de pedidos hace un cambio razonable y completamente local — solo toca su módulo:

```ts
// pedidos/cobrar.ts — el cambio
await db.pedido.update({
  where: { id },
  data: { estado: "en_revision" }   // antes decía "pagado"
})
// y más tarde, cuando el revisor aprueba, recién pasa a "pagado"
```

**Resultado:** facturación deja de emitir facturas. Su `if` compara contra `"pagado"` y ahora recibe `"en_revision"`. No lanza ningún error — simplemente no entra al `if` y no pasa nada. Nadie relaciona el problema con un cambio hecho en otro módulo, porque **en el código no había ninguna línea que conectara los dos**.

**Por qué es el peor tipo.** Los demás acoplamientos aparecen en la lista de imports: los puedes ver, contar y revisar. Este no aparece en ninguna parte — se descubre cuando algo deja de funcionar en producción.

**Cómo se arregla.** Facturación deja de leer el dato crudo y le pregunta al dueño:

```ts
// pedidos/index.ts  ── el dueño expone la pregunta, no el dato
export function estaCobrado(pedido: Pedido): boolean {
  return pedido.estado === "pagado"
}

// facturacion/emitir.ts
import { estaCobrado } from "pedidos"

if (estaCobrado(pedido)) { emitirFactura(pedido) }
```

Ahora pedidos puede inventar todos los estados internos que quiera: mientras `estaCobrado` siga respondiendo lo correcto, facturación no se entera. Y de paso, la dependencia **ya es visible** — está en el `import`.

### 🔴 Por implementación — A conoce el adentro de B

> **El módulo A no entra por la puerta de B: importa sus archivos internos, o copia cómo B hace las cosas por dentro.**

**El escenario.** `precios/` calcula cuánto cuesta un pedido. Adentro tiene una tabla con las reglas de descuento por cantidad, en un archivo que nunca pensó exponer. El carrito necesita mostrar el total con descuento.

**Cómo lo resolvieron mal.** En vez de pedirle el total a precios, el carrito importó la tabla y aplicó el descuento por su cuenta:

```ts
// precios/internals/tabla.ts  ── detalle interno, sin exportar en el index
export const tablaDescuentos = [
  { minimo: 10, porcentaje: 5 },
  { minimo: 50, porcentaje: 10 },
]

// carrito/total.ts  ── entra por la ventana
import { tablaDescuentos } from "../precios/internals/tabla"

const regla = tablaDescuentos.find(r => cantidad >= r.minimo)
const total = subtotal * (1 - regla.porcentaje / 100)
```

**Qué se rompe.** Marketing pide poder editar los descuentos sin esperar un despliegue, así que precios los mueve a la base de datos y borra `tabla.ts`. **El carrito ya ni compila.**

Y hay un daño más grande que el import roto: al leer la tabla por su cuenta, el carrito **también copió la lógica** de cómo se aplica el descuento. Si mañana precios cambia a "el descuento se aplica solo sobre productos sin oferta", precios lo actualiza y el carrito sigue calculando a la antigua — mostrando un total distinto al que se cobra.

**Cómo se arregla.** El carrito pide un resultado, no ingredientes:

```ts
// precios/index.ts  ── la puerta
export function calcularTotal(subtotal: number, cantidad: number): number

// carrito/total.ts
import { calcularTotal } from "precios"

const total = calcularTotal(subtotal, items.length)
```

Es el mismo problema de la sección 1: `tabla.ts` se volvió parte del contrato sin que su dueño lo decidiera.

### 🔴 Por control — el que llama decide el camino interno

> **A le pasa a B un valor cuyo único propósito es decidir qué camino toma B por dentro.** No le pide un servicio: lo maneja por control remoto.

**El escenario.** Necesitas validar emails en dos sitios: al registrar un cliente y al dar de alta un proveedor. Las reglas son distintas — los proveedores deben usar correo corporativo.

**Cómo lo resolvieron mal.** Una sola función con un parámetro que elige la regla:

```ts
// validacion/email.ts
export function validarEmail(email: string, tipo: "cliente" | "proveedor") {
  if (tipo === "proveedor") return esDominioCorporativo(email)
  return email.includes("@")
}

// clientes/registrar.ts
validarEmail(email, "cliente")      // ← ¿qué hace distinto? Hay que ir a leer la función
```

**Qué se rompe.** Llega una regla nueva: los proveedores del extranjero se validan diferente. Validación agrega un tercer modo, `"proveedor_extranjero"`. Ahora **todos los que llaman a la función tienen que enterarse** y decidir cuál les toca — aunque el cambio no tuviera nada que ver con ellos.

Y hay un costo permanente aunque nada cambie: cuando lees `validarEmail(email, "cliente")` **no sabes qué va a pasar** sin abrir la función. El nombre no te dice nada; el que informa es el parámetro.

**Cómo se arregla.** Dos puertas, cada una con un nombre que dice qué hace:

```ts
// validacion/index.ts
export function validarEmailCliente(email: string): boolean
export function validarEmailProveedor(email: string): boolean
```

Cada llamador usa la suya y ni siquiera sabe que la otra existe. Cuando aparezca la regla de los extranjeros, se agrega una tercera función y **nadie más se entera**.

> 🔑 **Cómo reconocerlo:** un parámetro `boolean` o un string de "modo" casi siempre es acoplamiento por control. Si al leer la llamada no sabes qué hace sin abrir la función, ahí está.

### 🟡 Por orden — hay que llamarlo en secuencia

> **B exige que lo llames en cierto orden, y nada en el código te obliga a respetarlo.** El orden vive en la cabeza de quien escribió B.

**El escenario.** Un módulo que genera reportes de ventas. Por dentro abre una conexión, trae los datos y arma el archivo.

**Cómo lo resolvieron mal.** Expuso los tres pasos por separado:

```ts
// reportes/index.ts  ── tres puertas que hay que usar en orden
export function conectar(): void
export function cargarDatos(filtros: Filtros): void
export function generar(): Reporte

// ventas/reporteMensual.ts
conectar()
generar()          // ← olvidó cargarDatos(): truena en runtime
```

**Por qué es acoplamiento.** Para usar reportes, ventas tiene que conocer su **ciclo de vida interno** — que hay una conexión, que hay un paso de carga, y en qué orden van. Ese orden no está escrito en ninguna parte: se aprende leyendo el código de reportes, o rompiéndolo.

**Qué se rompe.** Reportes cambia a una fuente de datos que no necesita conexión persistente. Ahora `conectar()` no hace nada — pero **no la pueden borrar**, porque diez archivos la llaman. Queda una función vacía que nadie se atreve a quitar, y todo dev nuevo pregunta para qué sirve.

**Cómo se arregla.** Una sola puerta que hace los pasos en el orden correcto:

```ts
// reportes/index.ts
export function generarReporte(filtros: Filtros): Reporte
```

> 🔑 **Por qué es 🟡 y no 🔴:** a veces el orden es real y viene del negocio — no puedes facturar un pedido antes de crearlo, y eso está bien que el contrato lo exija. Lo que se evita es el orden que es **detalle interno** de B, como abrir una conexión.

### 🟢 Por contrato — el bueno, y el inevitable

> **A solo conoce la firma pública de B: qué le pide y qué recibe.** Nada de lo que pasa adentro le llega.

Volvamos al carrito y precios, ahora bien resueltos:

```ts
// precios/index.ts  ── todo lo que el mundo sabe de precios
export function calcularTotal(subtotal: number, cantidad: number): number

// carrito/total.ts
import { calcularTotal } from "precios"

const total = calcularTotal(subtotal, items.length)
```

**Qué puede cambiar adentro de precios sin que el carrito se entere:** el algoritmo de descuento, mover la tabla a la base de datos, agregar una caché, cambiar de proveedor de impuestos, reescribir el módulo entero en otro estilo. Nada de eso cruza la puerta.

**Qué sí rompería al carrito:** cambiar la firma — agregar un parámetro obligatorio, o devolver un objeto en vez de un número. Por eso la firma **es la promesa**, y por eso cada cosa que expones es una cosa que ya no puedes cambiar libremente (sección 1).

**Y por qué es inevitable:** el carrito necesita saber el total. Alguien tiene que dárselo. Este acoplamiento no se elimina — se elige qué forma tiene.

> 📝 **Nota:** en la literatura clásica estos tipos aparecen con otros nombres — *acoplamiento de contenido, común, de control, de datos*. Es la misma escala. Aquí importan el orden y los síntomas, no el vocabulario.

## El caso especial: el ciclo

Hay una forma de acoplamiento que merece nombre propio porque es un diagnóstico, no un grado: **A importa a B, y B importa a A.**

```text
pedidos/  ──── importa ────►  facturacion/
    ▲                              │
    └────────── importa ───────────┘
```

**El escenario.** Dos módulos que cada uno necesita algo del otro, y las dos necesidades son razonables:

- El detalle de un pedido muestra el número de su factura → **pedidos necesita facturación**.
- Para emitir una factura hay que leer los ítems y el total del pedido → **facturación necesita pedidos**.

Y así queda el código:

```ts
// pedidos/detalle.ts
import { obtenerFactura } from "facturacion"          // ← pedidos → facturacion

export function detallePedido(id: string) {
  const pedido = buscarPedido(id)
  const factura = obtenerFactura(id)
  return { ...pedido, numeroFactura: factura?.numero }
}
```

```ts
// facturacion/emitir.ts
import { obtenerPedido } from "pedidos"               // ← facturacion → pedidos

export function emitirFactura(pedidoId: string) {
  const pedido = obtenerPedido(pedidoId)
  return crearFactura(pedido.items, pedido.total)
}
```

Cada import, por separado, se ve perfectamente sensato. El problema es que existan los dos.

**Qué se rompe.** Cuatro cosas, y ninguna es teórica:

- **No puedes testear uno sin el otro.** Para probar facturación tienes que levantar pedidos, que a su vez levanta facturación.
- **No puedes reemplazar ninguno.** El requisito de un componente — cambiar todo lo de adentro sin que nadie afuera se entere — es imposible cuando el de afuera vive adentro.
- **No puedes decir cuál depende de cuál.** Si alguien pregunta *"¿quién está arriba?"*, no hay respuesta. Y sin esa respuesta no puedes razonar sobre el sistema.
- **A veces truena de forma rarísima.** Según cómo se carguen los módulos, uno de los dos puede recibir `undefined` al importar al otro porque todavía no terminó de inicializarse. Es de los errores más confusos de diagnosticar, porque el código se ve bien.

> 🔍 **El test:** intenta describir uno de los dos sin nombrar al otro. Si no puedes, la línea que trazaste entre ellos no existe.

**Cómo se arregla.** Un ciclo significa una de dos cosas:

**Causa A — eran un solo módulo.** Si cada requerimiento del negocio toca los dos, no eran dos: fusiónalos. (Es la prueba de la sección anterior: mira el historial de cambios.)

**Causa B — hay un tercero arriba que los necesita a ambos.** Es el caso de nuestro ejemplo. Mirándolo bien, *"mostrar el número de factura en el detalle del pedido"* **no es responsabilidad de pedidos**: es responsabilidad de quien arma esa pantalla. Así que se rompe una de las dos flechas subiéndola:

```ts
// pedidos/index.ts       → NO importa facturacion
// facturacion/index.ts   → importa pedidos          (una sola dirección)

// vistas/detallePedido.ts  ── el de arriba conoce a los dos y los junta
import { obtenerPedido } from "pedidos"
import { obtenerFactura } from "facturacion"

export function vistaDetalle(id: string) {
  const pedido = obtenerPedido(id)
  const factura = obtenerFactura(id)
  return { ...pedido, numeroFactura: factura?.numero }
}
```

> 🎯 **Idea clave:** un ciclo se rompe **subiendo la dependencia**, no metiendo una capa entre los dos. Cuando dos módulos se necesitan mutuamente, casi siempre existe un tercero por encima que los necesita a ambos — y ese es el que debe conocerlos.

Que exista una dirección correcta y una incorrecta para cada flecha es el tema del módulo siguiente (M3).

## Cómo medirlo sin herramientas

Dos números que puedes contar a mano en cualquier proyecto:

| Qué cuentas | Cómo se llama | Qué te dice si es alto |
|-------------|---------------|------------------------|
| Cuántos módulos **importa** este módulo | fan-out | Es **frágil**: mucha gente puede romperlo |
| Cuántos módulos **lo importan** a él | fan-in | Es **peligroso de cambiar**: al tocarlo rompes a muchos |

Ninguno de los dos es malo por sí solo. Lo que importa es la combinación:

- **Fan-in alto + contrato estable** = un buen módulo compartido. Todos lo usan y nadie sufre.
- **Fan-in alto + contrato inestable** = el módulo que nadie se atreve a tocar. Aquí es donde los proyectos se congelan.
- **Fan-out alto** = un módulo que depende de medio sistema para funcionar. Suele indicar que hace demasiadas cosas — o sea, un problema de cohesión disfrazado de acoplamiento.

## Cohesión y acoplamiento son el mismo movimiento

No son dos objetivos separados que hay que balancear. Son dos caras de un mismo corte bien puesto:

```text
Corte bien puesto              Corte mal puesto

┌──────────┐  ┌──────────┐     ┌──────────┐  ┌──────────┐
│ pedidos  │──│  pagos   │     │  ????    │══│   ????   │
│          │  │          │     │          │══│          │
└──────────┘  └──────────┘     └──────────┘══└──────────┘
 lo de adentro    una línea      lo de adentro   muchas líneas
 se necesita      entre ellos    no se relaciona  cruzando
 entre sí
```

Cuando agrupas cosas que cambian juntas (alta cohesión), automáticamente hay menos líneas cruzando entre módulos (bajo acoplamiento) — porque lo que se necesita mutuamente ya quedó del mismo lado. Y al revés: si ves muchas dependencias entre dos módulos, la causa casi nunca es "hay que desacoplar"; es que **el corte está en el lugar equivocado**.

> 💡 **Tip práctico:** antes de intentar desacoplar dos módulos que se llaman todo el tiempo, pregúntate si no eran uno solo. Fusionarlos suele ser la solución correcta, y es más barata que inventar una capa intermedia para separar lo que nunca estuvo separado.

Ahora bien, todo esto describe **qué** buscar en un corte, pero no **por dónde** trazarlo cuando tienes el proyecto en blanco. Y ahí hay dos escuelas que producen resultados opuestos. Eso es lo que viene.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- El acoplamiento se mide en **cuánto se rompe A cuando cambias las tripas de B**. La meta no es cero — sin acoplamiento no hay sistema — sino **el mínimo y del tipo correcto**.
- El peor tipo es el **estado compartido**, porque no aparece en ningún `import`: dos módulos escriben la misma tabla y parecen independientes hasta que uno rompe al otro en producción.
- Un parámetro `boolean` o de "modo" (`validarEmail(email, "proveedor")`) casi siempre es **acoplamiento por control**: el que llama tiene que conocer las ramas internas del otro.
- **Si A importa a B y B importa a A, no tienes dos módulos: tienes uno mal partido.**
- Cohesión y acoplamiento son **el mismo corte visto por dentro y por fuera**. Si dos módulos se llaman todo el tiempo, casi nunca hay que desacoplarlos: hay que revisar dónde pusiste la línea.

---
[[02_cohesion|← anterior]] · [[00_indice|índice]] · [[04_corte-tecnico-vs-dominio|siguiente →]]
