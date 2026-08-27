---
tema: M1 — Por qué TypeScript y cómo corre
workspace: typescript
seccion: 3
titulo: "Compile time vs runtime"
estado: finalizada
prev: 02_los-tipos-se-borran
next: 04_tsc-y-el-flujo
---

# 🟦 Compile time vs runtime

Si los tipos se borran al compilar, entonces la vida de tu código pasa por **dos momentos distintos, con reglas distintas**. Saber en cuál de los dos estás parado es lo que evita el malentendido más caro de TypeScript.

> **Compile time (tiempo de compilación) es mientras escribes y cuando corres `tsc`: los tipos existen y el compilador los revisa.**
>
> **Runtime (tiempo de ejecución) es cuando Node o el navegador ejecutan el `.js`: los tipos ya no existen y nadie los está revisando.**

La frontera entre los dos es exactamente el momento de compilar. Todo lo que TypeScript hace por ti ocurre **antes** de esa frontera. Después, estás en JavaScript puro.

```text
   ESCRIBES ──► tsc ──►│──► SE EJECUTA
                       │
   ══ COMPILE TIME ════╪══ RUNTIME ══════
   los tipos existen   │   los tipos ya no existen
   el compilador mira  │   nadie mira
```

## Analogía: el ensayo y la función

Imagina una obra de teatro. Durante el **ensayo general** el director está en la sala: interrumpe, corrige la posición de un actor, marca que una entrada va dos segundos después. Su trabajo es que nada quede mal encajado antes del estreno.

Llega la **función**. El director ya no está en escena — está en su casa o entre el público, pero no puede interrumpir. Lo que pase esa noche pasa sin él: si un actor olvida un texto, si se cae un decorado, si el público hace algo inesperado, los actores lo resuelven solos. Y el público nunca ve las anotaciones que el director hizo en su libreto.

El compilador es el director en el ensayo. Tu programa corriendo es la función.

> 🔑 **Límite de la analogía:** un director al menos podría gritar desde la platea. El compilador no: **no está en ningún lado durante la ejecución**. No es que esté callado, es que ya no existe en ese momento.

## Los dos momentos, lado a lado

| | **Compile time** | **Runtime** |
|---|---|---|
| **¿Cuándo ocurre?** | Mientras escribes en el editor y al correr `tsc` | Cuando Node o el navegador ejecutan el `.js` |
| **¿Quién trabaja?** | El compilador de TypeScript | El motor de JavaScript (V8, Node) |
| **¿Existen los tipos?** | Sí | No — se borraron al compilar |
| **¿Qué falla aquí?** | El tipo no encaja, falta una propiedad, sobran argumentos | La API no responde, el dato viene `null`, la lógica está mal |
| **¿Quién ve el error?** | **Tú**, mientras escribes | **El usuario**, usando la aplicación |
| **¿Con qué te proteges?** | Tipos | `try/catch`, validación, comprobaciones con `if` |

La última fila es la práctica: **cada momento tiene su propia herramienta de defensa, y no son intercambiables.** Poner más tipos no te protege de una API caída; poner más `try/catch` no te protege de pasar los argumentos al revés.

## Qué sí puedes preguntar en runtime

Aquí está la parte útil. En tiempo de ejecución no puedes preguntar por **el nombre de tu tipo**, pero sí por **la forma real del valor**, porque el valor sí existe:

```ts
type Usuario = { nombre: string; edad: number }

const dato: unknown = await res.json()

// ❌ NO funciona: "Usuario" no existe en runtime
if (typeof dato === "Usuario") { }

// ✅ Sí funciona: typeof conoce los tipos de JavaScript
if (typeof dato === "object" && dato !== null) { }

// ✅ Sí funciona: preguntar si una propiedad está presente
if ("nombre" in dato) { }

// ✅ Sí funciona: preguntar por el tipo de un valor concreto
if (typeof dato.edad === "number") { }
```

La regla que ordena todo eso:

> 🎯 **Idea clave:** en runtime solo puedes preguntar por cosas que **JavaScript conoce**: si es texto, número, objeto, array, si tiene tal propiedad, qué valor tiene. Tus `interface` y tus `type` no están en esa lista porque nunca llegaron ahí.

Lo que existe en runtime y lo que no:

| ✅ Existe en runtime | ❌ No existe en runtime |
|---------------------|------------------------|
| `typeof` sobre valores de JavaScript (`"string"`, `"number"`, `"object"`…) | Tus `interface` |
| `Array.isArray(x)` | Tus `type` |
| `"propiedad" in objeto` | Las uniones de tipos |
| `x instanceof Clase` — las clases sí sobreviven | Los genéricos `<T>` |
| Comparar valores: `x === "pagado"` | Cualquier anotación `: Tipo` |

Esa distinción es la base de dos módulos completos: enseñarle a TypeScript a deducir el tipo a partir de estas comprobaciones es el **M5**, y validar de verdad lo que llega de afuera es el **M8**.

## Mitos que cuesta caro creer

❌ **Mito:** "TypeScript hace que mi código sea más seguro cuando corre."
✅ **Realidad:** TypeScript **no toca el runtime**. Hace más seguro el proceso de *escribir* el código, y de rebote evita bugs que habrían aparecido corriendo. Pero en producción tu programa es JavaScript sin ninguna protección extra.

❌ **Mito:** "Si compila sin errores, no va a fallar."
✅ **Realidad:** Compilar significa que **las piezas encajan**. Tu programa puede caerse igual por un dato inesperado, una red caída o una lógica equivocada. Como vimos en la sección 1: `precio - cantidad` compila perfecto.

❌ **Mito:** "Si TypeScript no se queja del JSON de la API, es que la API devolvió lo correcto."
✅ **Realidad:** TypeScript **nunca miró esa respuesta**. Para cuando la respuesta llegó, el compilador había terminado su trabajo hacía días. No se queja porque no está.

❌ **Mito:** "Puedo comprobar el tipo de un objeto en runtime con `typeof`."
✅ **Realidad:** `typeof` solo conoce los tipos que existen en JavaScript. Para cualquier objeto te va a decir `"object"` y nada más — nunca `"Usuario"`.

❌ **Mito:** "Los tipos hacen mi aplicación más lenta o más pesada."
✅ **Realidad:** Cero impacto. Se borraron antes de que la aplicación existiera. Lo único que TypeScript agrega al ejecutar es… nada.

## Dónde te deja esto

Que existan dos momentos con reglas distintas no es un detalle académico: **cambia dónde pones cada defensa**.

- Lo que puedas resolver en **compile time**, resuélvelo ahí: es gratis, es automático y el error lo ves tú antes que nadie.
- Lo que solo se sabe en **runtime** — lo que llega de una API, de un formulario, de un archivo, de un LLM — necesita una comprobación de verdad, escrita por ti, que se ejecute con el programa corriendo.

> 💡 **Tip:** cuando algo te falle, la primera pregunta útil es *"¿este error es de compile time o de runtime?"*. Si el editor lo subraya, es lo primero y se arregla con tipos. Si aparece en la consola con el programa corriendo, es lo segundo y ningún tipo lo habría evitado.

Ahora bien, hemos hablado todo el tiempo de "cuando corres `tsc`" sin haberlo corrido nunca. Qué hace exactamente ese comando, qué produce y cómo se usa en el día a día es lo que viene.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- Tu código vive **dos momentos**: compile time (existen los tipos, el compilador mira) y runtime (no existen, nadie mira). La frontera entre ambos es el momento de compilar.
- **Cada momento tiene su defensa y no son intercambiables:** los tipos protegen en compile time; `try/catch`, validación e `if` protegen en runtime.
- En runtime solo puedes preguntar por cosas que **JavaScript conoce**: `typeof`, `Array.isArray`, `"prop" in obj`, comparar valores. Tus `interface` y `type` no están ahí.
- **Compilar sin errores no significa que no vaya a fallar.** Significa que las piezas encajan.
- Ante un fallo, la pregunta útil es: **¿es de compile time o de runtime?** Si lo subraya el editor, se arregla con tipos. Si sale en la consola ejecutando, ningún tipo lo habría evitado.

---
[[02_los-tipos-se-borran|← anterior]] · [[00_indice|índice]] · [[04_tsc-y-el-flujo|siguiente →]]
