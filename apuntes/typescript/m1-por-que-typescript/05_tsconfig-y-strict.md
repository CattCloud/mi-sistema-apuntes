---
tema: M1 — Por qué TypeScript y cómo corre
workspace: typescript
seccion: 5
titulo: "tsconfig.json y strict"
estado: finalizada
prev: 04_tsc-y-el-flujo
next: null
---

# 🟦 `tsconfig.json` y `strict`

En la sección anterior compilaste archivo por archivo. Eso funciona para un ejercicio y para nada más: en un proyecto con cien archivos no vas a escribir cien comandos, ni repetir `--target ES2020` cada vez.

> **El `tsconfig.json` es el archivo donde le dices al compilador *qué* compilar y *cómo*.**
>
> Con él, `tsc` sin argumentos ya sabe qué hacer: qué archivos tomar, a qué versión de JavaScript traducir, dónde dejar la salida y qué tan estricto ser.

Además cumple una segunda función silenciosa: **su ubicación marca la raíz del proyecto**. La carpeta donde vive ese archivo es lo que `tsc` considera "el proyecto".

## Crearlo y su estructura

```bash
npx tsc --init
```

Genera un `tsconfig.json` con los valores por defecto y **decenas de líneas comentadas** explicando cada opción disponible. La primera vez conviene abrirlo y leerlo aunque no entiendas todo; después se borran los comentarios que no uses.

La estructura tiene tres partes:

```json
{
  "compilerOptions": { },
  "include": [ ],
  "exclude": [ ]
}
```

- **`compilerOptions`** — el *cómo*: todas las opciones del compilador.
- **`include`** — el *qué*: qué archivos entran a compilar.
- **`exclude`** — qué archivos se ignoran.

## Las opciones de compilacion que importan

De las decenas que existen, estas son las que vas a colocar en **`compilerOptions`**:

| Opción | Qué controla | Valor típico |
|--------|--------------|--------------|
| `target` | A qué versión de JavaScript se traduce (la fase 3 de la sección anterior) | `"ES2020"` |
| `module` | Cómo se manejan los `import` y `export` | `"ESNext"` o `"CommonJS"` |
| `rootDir` | Dónde está tu código fuente `.ts` | `"./src"` |
| `outDir` | Dónde se dejan los `.js` generados | `"./dist"` |
| `strict` | Activa las verificaciones estrictas | `true` |
| `esModuleInterop` | Compatibilidad al importar paquetes antiguos | `true` |
| `skipLibCheck` | No revisar los tipos de las librerías en `node_modules` | `true` |
| `noEmitOnError` | **No generar ningún `.js` si hubo errores de tipo** | según el proyecto |

Esa última es la que quedó pendiente de la sección anterior: recuerda que `tsc` por defecto **te avisa pero no te bloquea**. Con `noEmitOnError` en `true`, un error de tipo sí detiene la generación del archivo.

> 💡 **Tip:** `rootDir` y `outDir` juntos son los que evitan el desorden. Sin ellos, cada `.js` generado aparece **al lado** de su `.ts`, y terminas con el código fuente y el compilado revueltos en la misma carpeta.

**Ejemplo completo, comentado:**

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",        // JavaScript moderno, compatible con Node actual
    "module": "ESNext",        // sistema de módulos moderno
    "rootDir": "./src",        // el .ts vive aquí
    "outDir": "./dist",        // el .js sale aquí
    "strict": true,            // ← la opción de esta sección
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],     // compila todo lo que haya en src
  "exclude": ["node_modules", "dist"]
}
```

## `strict`: la opción que decide qué TypeScript estás usando

Aquí está el corazón de la sección. `strict` no es una opción más — es un interruptor que enciende varias verificaciones a la vez, y sin ellas TypeScript deja pasar justamente los errores más comunes de JavaScript.

> ⚠️ **Cuidado:** `"strict": false` **no es "TypeScript relajado". Es TypeScript apagado en su parte más útil.** Sin estas verificaciones tienes el autocompletado y poco más.

Estas son las principales que activa:

| Verificación | Qué hace |
|--------------|----------|
| **`strictNullChecks`** | `null` y `undefined` dejan de ser valores válidos para cualquier tipo |
| **`noImplicitAny`** | Si TypeScript no puede deducir un tipo, te obliga a escribirlo en vez de asumir `any` |
| `strictFunctionTypes` | Revisa con más rigor los tipos de las funciones que pasas como argumento |
| `noImplicitThis` | Prohíbe usar `this` cuando su tipo no se puede deducir |
| `alwaysStrict` | Agrega `"use strict"` al `.js` generado — el que apareció en la sección 2 |

> ⚠️ **Para verificar:** el conjunto exacto de opciones que `strict` activa **cambia entre versiones de TypeScript** (se han ido agregando). La lista de arriba cubre las importantes; para ver la de tu versión, corre `npx tsc --init` y lee los comentarios del archivo generado.

Las dos primeras son las que de verdad cambian tu día a día. Veámoslas.

### `noImplicitAny` — te obliga a decir qué recibe cada función

```ts
function saludar(nombre) {
  return `Hola ${nombre.toUpperCase()}`
}
```

**Sin `noImplicitAny`:** TypeScript no sabe qué es `nombre`, así que lo trata como `any` — y `any` desactiva todas las comprobaciones dentro. Puedes llamar `saludar(42)` y nadie dice nada, hasta que truena en runtime porque los números no tienen `.toUpperCase()`.

**Con `noImplicitAny`:** el compilador se planta.

```text
❌ Parameter 'nombre' implicitly has an 'any' type.
```

No es pedantería: es evitar que aparezcan agujeros de `any` sin que nadie los haya decidido. Es el mismo problema de la *arquitectura implícita* — un `any` que nadie eligió, que se coló porque nadie escribió el tipo.

### `strictNullChecks` — la más importante de todas

Esta es la que atrapa el error más frecuente de JavaScript: usar algo que resultó ser `null` o `undefined`.

```ts
type Usuario = { nombre: string }

function buscar(id: string): Usuario {
  // ...busca en la base de datos y no lo encuentra
  return null
}
```

**Sin `strictNullChecks`:** `null` es un valor válido para *cualquier* tipo. Ese `return null` compila sin queja, y quien llame a `buscar` recibe algo que cree que es un `Usuario`:

```ts
const u = buscar("123")
console.log(u.nombre)      // 💥 Cannot read properties of null
```

**Con `strictNullChecks`:** TypeScript rechaza el `return null` de entrada — porque la función prometió devolver un `Usuario` y `null` no lo es.

```text
❌ Type 'null' is not assignable to type 'Usuario'.
```

Para que compile tienes que **decir la verdad en el tipo**: que a veces no hay usuario.

```ts
function buscar(id: string): Usuario | null {
  return null   // ✅ ahora sí, el tipo lo admite
}

const u = buscar("123")
console.log(u.nombre)      // ❌ 'u' is possibly 'null'. Compruébalo primero.
```

Y ahí está el valor real: el compilador **te obliga a comprobarlo antes de usarlo**. El bug más común de JavaScript pasa de descubrirse en producción a ser imposible de escribir.

> 🎯 **Idea clave:** `strictNullChecks` no agrega trabajo — **saca a la luz un trabajo que ya existía y nadie estaba haciendo**. Ese `if` que te obliga a escribir es el mismo que te habrías ahorrado hasta el día del incidente.

#### No prohíbe `null`: te obliga a declararlo

Conviene desactivar el malentendido natural. `strictNullChecks` **no** significa *"nunca más puedes usar `null` ni `undefined`"*. Significa que dejan de ser un comodín válido para cualquier tipo: siguen siendo valores normales que puedes usar cuando quieras, **siempre que digas dónde pueden aparecer**.

Y son dos permisos distintos, no uno.

**Permiso 1 — declararlo en el tipo.** Te deja *tener* el valor:

```ts
let apodo: string | null = null   // ✅ perfectamente válido
apodo = "Catt"
apodo = null                       // ✅ el tipo lo admite

let nombre: string = null          // ❌ esto sí se acabó
```

**Permiso 2 — comprobarlo antes de usarlo.** Te deja *usar* el valor:

```ts
function saludar(apodo: string | null) {
  apodo.toUpperCase()        // ❌ 'apodo' is possibly 'null'

  if (apodo !== null) {
    apodo.toUpperCase()      // ✅ dentro del if, TS ya sabe que no es null
  }
}
```

Declarar `string | null` **no te exime de comprobar**. Son gates separados: el primero permite que el valor exista, el segundo permite tocarlo.

Y fíjate en lo que ocurre dentro del `if`: **el mismo `apodo` cambia de tipo según dónde estés parado**. Afuera es `string | null`; adentro es `string`. Eso se llama **narrowing**, y es el M5 completo — por ahora basta con que reconozcas el nombre.

> 🔑 **Matiz:** para TypeScript **`null` y `undefined` son cosas distintas**. `string | undefined` no acepta `null`. Y cuando marcas una propiedad como opcional (`edad?: number`), lo que obtienes es `number | undefined`, no `number | null`.

## Por qué desde el día uno

La segunda mitad de la pregunta de esta sección, y tiene respuesta corta:

- **En un proyecto nuevo, activar `strict` cuesta cero.** No hay código todavía, así que no hay errores que arreglar. Simplemente escribes bien desde el principio.
- **En un proyecto de dos años, activarlo escupe cientos o miles de errores de golpe.** Nadie tiene una semana para eso, así que la decisión se pospone… y se queda apagado para siempre.

Es exactamente el patrón que viste en el temario de arquitectura: **una decisión cuyo costo de revertir crece con todo lo que se apila encima**. El día uno es gratis; cada mes que pasa sube el precio.

> 💡 **Si heredas un proyecto sin `strict`:** no lo actives de golpe. Se enciende **opción por opción**, empezando por `noImplicitAny`, y se arregla lo que salga antes de pasar a la siguiente. `strictNullChecks` suele ser la que más errores destapa — déjala para cuando el resto esté limpio.

> 🔑 **Matiz:** `strict: true` no activa **todas** las opciones estrictas que existen. Hay varias que van aparte y no están incluidas. Si algún día quieres apretar más, se agregan una por una — pero con `strict` ya tienes el 90% del valor.

---

Con esto cierra el módulo. Ya sabes qué problema resuelve TypeScript y cuál no, que los tipos se borran, que existen dos momentos con reglas distintas, qué hace `tsc` y cómo se configura. Lo que falta no se lee: **el micro-ejercicio y el quiz están en el `00_indice.md`**, y son los que cierran M1 de verdad.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- El `tsconfig.json` le dice al compilador **qué compilar (`include`) y cómo (`compilerOptions`)**, y su ubicación marca la raíz del proyecto. Se crea con `npx tsc --init`.
- `rootDir` y `outDir` separan el código fuente del compilado; sin ellos cada `.js` aparece al lado de su `.ts`.
- **`"strict": false` no es TypeScript relajado, es TypeScript apagado en su parte más útil.**
- **`strictNullChecks` es la más valiosa, y no prohíbe `null`:** te obliga a **declararlo** en el tipo (`string | null`) y además a **comprobarlo** antes de usarlo. Son dos permisos distintos, y juntos convierten el bug más común de JavaScript en algo imposible de escribir.
- **Se activa el día uno o casi nunca:** en un proyecto nuevo cuesta cero; en uno de dos años escupe miles de errores y se pospone para siempre.

---
[[04_tsc-y-el-flujo|← anterior]] · [[00_indice|índice]]
