---
tema: M1 — Por qué TypeScript y cómo corre
workspace: typescript
seccion: 1
titulo: "Qué problema resuelve (y cuál no)"
estado: finalizada
prev: null
next: 02_los-tipos-se-borran
---

# 🟦 Qué problema resuelve (y cuál no)

En JavaScript, la única forma de saber si tu código funciona es **ejecutarlo**. Y no basta con ejecutarlo: tienes que ejecutar exactamente **esa** ruta, con exactamente **esos** datos.

Un caso concreto. Renombras el campo `nombre` a `nombreCompleto` en tu objeto `usuario` y arreglas los tres lugares que recuerdas: el perfil, el header y el listado de clientes. Pero hay un cuarto — la plantilla del correo que se envía **cuando se cancela un pedido**, que usaba `usuario.nombre`. Esa ruta se ejecuta una vez cada varias semanas, así que nadie la pisó al probar.

Y lo peor es que **ni siquiera truena**:

```js
`Hola ${usuario.nombre}, tu pedido fue cancelado`
// usuario.nombre ya no existe → undefined
// El correo sale: "Hola undefined, tu pedido fue cancelado"
```

JavaScript no se queja. Te deja mandarle ese correo a un cliente real, y te enteras cuando el cliente responde preguntando quién es `undefined`. El error no era difícil: era **invisible hasta que alguien pasó por ahí**.

> **TypeScript es un superconjunto de JavaScript que añade tipado estático opcional al lenguaje.**
>
> "Superconjunto" significa que **todo código JavaScript válido es también código TypeScript válido**. No aprendes a programar de nuevo: aprendes a **anotar** lo que ya programas.

## ¿Qué es el tipado estático?

> **Es la capacidad de definir y conocer el tipo de dato de una variable *antes* de ejecutar el código.**
>
> Ahí está la diferencia entera con JavaScript: no es que JS no tenga tipos, es que solo los conoce **cuando ya está corriendo**.

En términos simples:

- **JavaScript → tipado dinámico.** El tipo de un valor se descubre en **tiempo de ejecución**. Si le pasas un `string` a algo que esperaba un objeto, te enteras cuando el programa truena.
- **TypeScript → tipado estático.** El tipo se conoce en **tiempo de desarrollo**. Te enteras mientras escribes, subrayado en rojo.

Veámoslo con el mismo código en los dos:

**JavaScript:**

```js
function saludar(usuario) {
  return "Hola " + usuario.nombre
}

saludar("Erick")   // se escribe sin problema... y truena al ejecutarse
```

**TypeScript** — el mismo código, con la forma anotada:

```ts
function saludar(usuario: { nombre: string }) {
  return "Hola " + usuario.nombre
}

saludar("Erick")   // ❌ error subrayado en rojo AHORA, sin ejecutar nada
```

Lo único que cambió es ese `: { nombre: string }`. Con esa anotación le dijiste al compilador *"esta función espera un objeto con una propiedad `nombre` de tipo texto"* — y como se lo dijiste, ahora puede avisarte cuando le mandas un texto suelto.

Imagina el corrector ortográfico de un procesador de texto. Te subraya la palabra mal escrita **mientras escribes**, sin que tengas que imprimir el documento para descubrirlo; no juzga si tu idea es buena, solo si la palabra existe; y las marcas rojas **no salen impresas**. TypeScript hace exactamente esas tres cosas con tu código — incluida la última, que es el tema de la sección siguiente.

## No es 100% estático: es tipado gradual

Un matiz que evita un malentendido temprano:

> 🔑 **Matiz:** TypeScript **no te obliga** a declarar el tipo de todo. Es de tipado **gradual u opcional**: si no escribes el tipo, TypeScript intenta **deducirlo** del valor que le asignas. A eso se le llama **inferencia de tipos**, y es un tema completo del M2.

Es decir, en la práctica escribes bastantes menos anotaciones de las que imaginas. Anotar de más es un error tan común como anotar de menos.

## JavaScript vs TypeScript, lado a lado

| JavaScript | TypeScript |
|------------|------------|
| Tipado dinámico — tipos en tiempo de **ejecución** | Tipado estático — tipos en tiempo de **desarrollo** |
| Errores detectados **al ejecutar** | Errores detectados **al escribir** |
| No requiere compilación | Requiere **transpilación** a JavaScript |
| El editor adivina qué hay dentro de un objeto | El editor **sabe** qué hay dentro de un objeto |
| La documentación vive en comentarios que envejecen | El código se **autodocumenta** con los tipos |

## Bugs que TypeScript detecta por ti

> **Son los errores de *encaje*: una pieza que no calza con la otra.**
>
> Todos tienen algo en común — se pueden descubrir **leyendo el código**, sin ejecutarlo. Por eso el compilador puede verlos.

**Typos en nombres de propiedades**

```ts
const usuario = { nombre: "Erick", edad: 30 }

usuario.nombr
// ❌ La propiedad 'nombr' no existe. ¿Quisiste decir 'nombre'?
```

**Argumentos en orden o tipo equivocado**

```ts
function crearPedido(cantidad: number, cliente: string) { /* ... */ }

crearPedido("Erick", 5)
// ❌ Los argumentos están al revés
```

**Usar algo que puede no existir, sin comprobarlo**

> 📝 **Nota:** en el ejemplo de arriba escribimos la forma suelta (`u: { nombre: string }`). `type Usuario = { … }` es lo mismo, pero **poniéndole nombre** a esa forma para no repetirla en cada función. El `?` en `direccion?` significa *"esta propiedad puede no venir"*. Ambas cosas se estudian a fondo en el M3.

```ts
type Usuario = { nombre: string; direccion?: string }

function mostrar(u: Usuario) {
  return u.direccion.toUpperCase()
  // ❌ 'direccion' puede ser undefined. Compruébalo primero.
}
```

**Refactors incompletos** — el dolor con el que abrió esta sección

```ts
// Renombras el campo en el tipo...
type Usuario = { nombreCompleto: string }

// ...y TypeScript te subraya los 12 lugares que seguían usando el viejo:
`Hola ${usuario.nombre}`
// ❌ La propiedad 'nombre' no existe. Incluido el correo de cancelación.
```

**Olvidar un caso** cuando un valor puede ser de varios tipos distintos — el compilador te avisa que no cubriste uno. (Es el M5, y es de los momentos en que TypeScript se siente mágico.)

## Bugs que TypeScript nunca va a detectar

> **Son los errores de *contenido*: las piezas encajan perfecto, pero lo que hacen está mal.**
>
> Ninguno de estos se puede descubrir leyendo el código: dependen de qué valor real aparezca cuando el programa corra. Para estos existen los tests y la validación en runtime, no los tipos.

**Lógica de negocio equivocada** — el ejemplo que mejor lo demuestra

```ts
function calcularTotal(precio: number, cantidad: number): number {
  return precio - cantidad   // debía ser precio * cantidad
}
// ✅ TypeScript: todo perfecto.
```

Los tipos son impecables: `number` menos `number` da `number`, que es justo lo que la función promete devolver. El compilador no tiene nada que objetar — y tu e-commerce está cobrando mal.

**Datos externos que no son lo que declaraste**

```ts
const u: Usuario = await res.json()
// La API devolvió { nombre: null }.
// ✅ TypeScript: callado. Nunca miró lo que llegó.
```

**Errores de valor** — el dato tiene el tipo correcto pero el contenido no sirve

```ts
const edad: number = -40        // ✅ es un number
const email: string = ""        // ✅ es un string
// Los dos compilan. Los dos son basura.
```

**Fallos del mundo real** — la red caída, el archivo que no existe, la base de datos que no responde, race conditions. Nada de eso vive en el código: vive en el momento de ejecutarlo.

## La regla que separa las dos listas

> 🎯 **Idea clave:** TypeScript revisa que **las piezas encajen**, no que **hagan lo correcto**. Verifica **formas, no valores**.
>
> **Forma** = *qué tipo* de cosa es (un `number`, un objeto con `nombre` y `edad`). **Valor** = *cuál* cosa es (si ese número es 5 o −40, si ese email viene vacío). Lo primero lo revisa siempre; lo segundo no lo ve nunca.

Vuelve al corrector ortográfico: te subraya *"qeu"* porque esa palabra no existe, pero no te dice nada si escribes *"la reunión es el martes"* cuando en realidad es el jueves. Las dos son equivocaciones — solo una es del tipo que el corrector puede ver.

> ⚠️ **La consecuencia práctica:** que tu código **compile sin errores no significa que funcione**. Significa que las piezas encajan. Que hagan lo correcto sigue siendo tu trabajo, y para eso están los tests y la validación en runtime.

Debes recordar que el problema que TypeScript resuelve no es *"que mi código esté bien"*. Es uno más específico: **que las piezas que escribiste en momentos distintos sigan encajando entre sí**. En un proyecto que crece, ahí vive la mayoría de los bugs tontos y de los refactors que dan miedo.

### La confusión más cara

> ⚠️ **Cuidado:** TypeScript **no valida los datos que entran a tu programa**. Cuando escribes `const u: Usuario = await res.json()`, no estás comprobando nada: estás **afirmando** que eso es un `Usuario`. Si la API te manda otra cosa, TypeScript no se entera y no se va a enterar nunca — el chequeo ya ocurrió, y ocurrió antes de que la API existiera.

La garantía del compilador **termina en el borde de tu código**. Todo lo que cruza ese borde — API, base de datos, formulario, archivo, respuesta de un LLM — entra sin verificar, con una etiqueta que tú mismo le pusiste. Qué hacer a partir de ese punto es el M8, el módulo más profesional del temario.

## Lo que ganas y lo que cuesta

Las ventajas del tipado estático, y su precio:

| ✅ Ganas | 💸 Cuestas |
|---------|-----------|
| **Detección temprana** — los errores de tipo salen mientras escribes, no cuando el usuario los encuentra | **Un paso de build.** El navegador y Node no ejecutan `.ts`. Hay que compilar, siempre |
| **Autocompletado inteligente** — el editor conoce los tipos y sugiere las propiedades correctas | **Fricción cuando el tipo se resiste.** Ratos peleando con el compilador por código que *sabes* que funciona |
| **Refactorización segura** — cambias un nombre y el compilador te lista todo lo que rompiste | **Una puerta trasera peligrosa:** `any` apaga el chequeo y convierte a TypeScript en JavaScript con pasos extra |
| **Documentación viva** — la firma dice qué recibe la función, y nunca queda desactualizada | **Curva de aprendizaje**, sobre todo en los saltos sin análogo en JS (uniones, genéricos) |
| **Escalabilidad** — en proyectos grandes previene errores difíciles de rastrear | |


Ahora bien, si toda esta verificación ocurre **antes** de ejecutar y el navegador solo entiende JavaScript, queda una pregunta obvia: ¿qué pasa con los tipos cuando el código finalmente corre? La respuesta sorprende a casi todo el mundo, y es lo que viene.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- TypeScript es un **superconjunto de JavaScript**: todo JS válido es TS válido. No programas distinto, **anotas** lo que ya programas.
- **Tipado dinámico (JS)** = el tipo se conoce al ejecutar. **Tipado estático (TS)** = el tipo se conoce al escribir. Esa es la diferencia entera.
- No es 100% estático: es **gradual**. Si no anotas, TypeScript infiere — y anotar de más es tan malo como anotar de menos.
- Verifica **formas, no valores**. Atrapa typos, argumentos mal puestos y refactors incompletos; **no atrapa** datos externos mentirosos, lógica equivocada ni fallos del mundo real.
- `const u: Usuario = await res.json()` **no comprueba nada: afirma**. La garantía del compilador termina en el borde de tu código.

---
[[00_indice|índice]] · [[02_los-tipos-se-borran|siguiente →]]
