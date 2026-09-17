---
tema: M1 — Por qué TypeScript y cómo corre
workspace: typescript
seccion: 4
titulo: "tsc y el flujo de trabajo"
estado: finalizada
prev: 03_compile-time-vs-runtime
next: 05_tsconfig-y-strict
---
# 🟦 Instalacion `tsc` y el flujo de trabajo

> **`tsc` es el compilador de TypeScript: el programa que lee tus archivos `.ts`, los revisa y produce los `.js` que sí se pueden ejecutar.**
>
> Es la herramienta que dibuja la frontera de la sección anterior. Todo lo que pasa "en compile time" pasa dentro de `tsc`.

Llevamos tres secciones hablando de lo que hace este comando. Aquí lo corres.

## Los tres trabajos de `tsc`

No hace uno solo, hace tres — y en este orden:

**FASE 1: Verificar los tipos**

Lee todos tus `.ts` y comprueba que las piezas encajen: que a cada función le llegue lo que pide, que no uses propiedades que no existen, que no falte comprobar un `undefined`. Es la fase que te reporta errores.

**FASE 2: Borrar los tipos**

Quita todas las anotaciones, `interface` y `type`. Es lo que vimos en la sección 2: al `.js` no llega ni rastro de ellos.

**FASE 3: Traducir la sintaxis moderna**

Esta es nueva, y es la que le da su nombre a la **transpilación**. Además de borrar tipos, `tsc` puede convertir JavaScript moderno en JavaScript antiguo, para que corra en entornos viejos. Cuánto traduce lo decide la opción `target`.

Míralo con el mismo archivo compilado a dos objetivos distintos:

```ts
// entrada.ts
const saludar = (nombre: string) => `Hola ${nombre}`
```

```js
// con target: "ES2020" — el JavaScript moderno se queda como está
const saludar = (nombre) => `Hola ${nombre}`;
```

```js
// con target: "ES5" — se traduce a JavaScript antiguo
var saludar = function (nombre) { return "Hola " + nombre; };
```

Fíjate qué cambió en el segundo: `const` pasó a `var`, la arrow function pasó a `function`, y el template literal (`` `Hola ${nombre}` ``) pasó a concatenación con `+`. **Ninguna de esas transformaciones tiene que ver con tipos** — son sintaxis moderna traducida a sintaxis vieja.

> 🔑 **Matiz:** por eso "compilar" no es del todo el término. `tsc` no traduce a lenguaje de máquina: traduce de un lenguaje a otro del mismo nivel. A eso se le llama **transpilar**. En la práctica todo el mundo dice "compilar" y se entiende igual.

**Resumen del proceso:** verificar → borrar tipos → traducir sintaxis → escribir el `.js`.

### Cuándo ocurre cada fase

Las tres son **compile time**: todas pasan antes de que se ejecute una sola línea. Pero no ocurren en el mismo momento:

```text
Mientras escribes en el editor   →  FASE 1 corriendo todo el tiempo
                                    (son los subrayados rojos)

Cuando corres tsc                →  FASE 1 + FASE 2 + FASE 3
                                    y escribe el .js

Cuando corres node archivo.js    →  RUNTIME. Ninguna fase.
                                    Todas terminaron hace rato.
```

La fase 1 se ejecuta sola, sin que le pidas nada, porque tu editor tiene TypeScript corriendo en segundo plano. Las fases 2 y 3 solo ocurren cuando `tsc` corre de verdad, porque son las que producen el archivo de salida.

> 🎯 **Idea clave:** **nunca ejecutas el `.ts`. Ejecutas el `.js`.** Node no sabe leer TypeScript: le pasas `archivo.js`, no `archivo.ts`. El `.ts` es tu material de trabajo; el `.js` es el producto.

> ⚠️ **Cuidado con las herramientas que "ejecutan `.ts` directamente".** Existen (`tsx`, `ts-node`, y versiones recientes de Node) y parecen contradecir lo anterior. Lo que hacen por debajo es **borrar los tipos al vuelo** y ejecutar el resultado — o sea, corren la fase 2 y **se saltan la fase 1**. Tu código puede tener errores de tipo y correr igual, sin que nadie te avise, porque el que avisa quedó fuera del proceso. Por eso en esos proyectos se corre `tsc --noEmit` como paso aparte: alguien tiene que hacer la verificación.

## Instalarlo

Requisito previo: tener Node.js. TypeScript se instala con `npm` como cualquier paquete.

**Opción recomendada — local al proyecto:**

```bash
npm install --save-dev typescript
```

Cada proyecto queda con **su propia versión** de TypeScript, así que actualizar uno no rompe los otros. El `--save-dev` (o `-D`) significa que es una herramienta de desarrollo: no se necesita para ejecutar el programa, solo para construirlo.

> ⚠️ **Cuidado:** instalado así, el comando `tsc` **no queda disponible en tu terminal**. Tienes que anteponerle `npx`:
>
> ```bash
> npx tsc --version
> ```

**¿Qué es `npx`?** No es de TypeScript ni de ningún framework: **es una herramienta de npm**, y viene incluida cuando instalas Node. Su único trabajo es **ejecutar programas que están dentro de `node_modules`**.

```text
npm install -g typescript   →  tsc queda en el PATH del sistema
                               funciona:  tsc archivo.ts

npm install -D typescript   →  tsc queda en node_modules/.bin/
                               que NO está en el PATH
                               "tsc" da: command not found
                               por eso:   npx tsc archivo.ts
```

Y hay una conexión que lo aclara del todo: **`npx create-next-app` es el mismo mecanismo**. La diferencia es que ahí no tienes el paquete instalado, así que `npx` lo descarga temporalmente, lo ejecuta y lo descarta.


| Comando               | Qué hace`npx`                                    |
| --------------------- | ------------------------------------------------- |
| `npx tsc`             | Ejecuta el`tsc` que ya está en tu `node_modules` |
| `npx create-next-app` | No lo tienes: lo descarga, lo corre y lo borra    |

**Opción global — disponible en todo el sistema:**

```bash
npm install -g typescript
```

Aquí sí puedes escribir `tsc` directamente desde cualquier carpeta. Es cómodo para probar cosas sueltas, pero en proyectos reales conviene la local: si tu equipo usa la versión 5.4 y tú tienes la 5.9 global, van a ver errores distintos con el mismo código.

## Los comandos que vas a usar

**Compilar un archivo:**

```bash
tsc archivo.ts
```

Lee `archivo.ts`, lo revisa y genera `archivo.js` **en la misma carpeta**.

**Compilar y quedarse vigilando:**

```bash
tsc archivo.ts --watch
# forma corta:
tsc archivo.ts -w
```

El proceso **no termina**: se queda corriendo y recompila solo cada vez que guardas. Es el modo en que se trabaja de verdad — evita volver a escribir el comando cada vez.

**Solo verificar, sin generar nada:**

```bash
tsc --noEmit
```

Revisa los tipos y reporta errores, pero **no escribe ningún `.js`**. Se usa cuando otra herramienta ya se encarga de generar el código y solo quieres el chequeo.

**Ver la versión instalada:**

```bash
tsc --version
# Version 5.9.2
```

> ⚠️ **Cuidado con un detalle que confunde a todo el mundo:** un proyecto puede tener un archivo de configuración del compilador — el `tsconfig.json`, que es toda la sección siguiente. Pues bien: cuando le pasas un nombre de archivo (`tsc archivo.ts`), **`tsc` ignora esa configuración por completo** y usa sus valores por defecto. Para que la respete, córrelo sin nombres de archivo: solo `tsc`.

## Cómo se ve trabajar de verdad

Hay algo que conviene aclarar porque cambia la imagen mental del flujo:

> 🎯 **Idea clave:** **no necesitas correr `tsc` para ver los errores de tipo.** Tu editor tiene su propio TypeScript corriendo en segundo plano y te subraya los problemas mientras escribes. `tsc` sirve para producir el `.js` y para verificar todo el proyecto de una vez.

Entonces el día a día se ve así:

```text
1. Escribes en el editor          → los errores aparecen subrayados al instante
2. tsc --watch en una terminal    → recompila a .js cada vez que guardas
3. node archivo.js                → ejecutas el resultado
```

### Por qué en tus proyectos nunca escribes `tsc`

En un proyecto real de Next.js no corres `tsc` nunca: escribes `npm run dev` y todo funciona. Vale la pena abrir esa caja, porque el paso no desapareció — solo quedó escondido.

**`npm run` no es un comando de TypeScript ni de Node.** Ejecuta un script definido en tu `package.json`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

Cuando escribes `npm run dev`, npm busca la clave `dev` y corre lo que diga esa línea. Es un atajo con nombre, nada más.

**¿Y dónde está `tsc`?** En ningún lado. Next.js trae **su propio compilador** y lo usa para convertir tus `.ts` en JavaScript — nunca invoca al `tsc` que instalaste.

Y ese compilador propio hace las fases 2 y 3 (borra los tipos y traduce la sintaxis) pero **no hace la fase 1**: no verifica nada. Es la misma situación de `tsx` del apartado anterior. Entonces la pregunta importante es quién verifica:


| Momento           | Quién verifica los tipos                                          |
| ----------------- | ------------------------------------------------------------------ |
| Mientras escribes | **Tu editor**, con su propio TypeScript en segundo plano           |
| `npm run build`   | **Next**, que corre la verificación como un paso propio del build |

En el build lo ves pasar: aparece una línea del tipo *"Checking validity of types"*. Si hay un error de tipo, **el build falla y no se genera nada**. Ahí sí te bloquea.

> 💡 **Tip:** por eso muchos proyectos agregan un script para verificar sin construir todo:
>
> ```json
> "scripts": { "typecheck": "tsc --noEmit" }
> ```
>
> `npm run typecheck` corre exactamente la fase 1 sola — el mismo comando de esta sección, envuelto en un alias.

> ⚠️ **Para verificar:** si `next dev` también corre la verificación de tipos o solo lo hace en `build` ha cambiado entre versiones de Next. Compruébalo en tu propio proyecto: mete un error de tipo a propósito, deja `npm run dev` corriendo y mira si aparece en la terminal o solo en el editor.

Aquí corres `tsc` a mano a propósito: es la única forma de ver la mecánica en lugar de que ocurra a tus espaldas.

## Errores y el `.js` que se genera igual

Esto ya lo adelantamos en la sección 2 y aquí se ve en acción:

```bash
$ tsc archivo.ts

archivo.ts:3:14 - error TS2345: Argument of type 'string' is not
assignable to parameter of type 'number'.

Found 1 error.

$ ls
archivo.ts   archivo.js      ← se generó igual
```

**`tsc` reportó el error y aun así escribió el `.js`.** Y ese `.js` puede funcionar perfectamente, porque el error era de tipos y los tipos no existen al ejecutar.

Es coherente con todo lo que llevamos: TypeScript te **avisa**, no te **bloquea**.

Ese comportamiento se puede cambiar — se le puede pedir a `tsc` que no genere nada si encontró errores. Pero se configura, y la configuración es el tema de la sección siguiente.

Con esto ya tienes los comandos que necesita el **micro-ejercicio del módulo** — el que cierra M1, con su archivo de partida listo para copiar, en el `00_indice.md`.

Ahora bien, correr `tsc` archivo por archivo no escala más allá de un ejercicio. En un proyecto real le dices una vez qué compilar y cómo, y eso vive en un archivo de configuración. Eso es lo que viene.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- `tsc` hace **tres trabajos en orden**: verifica los tipos, los borra, y traduce la sintaxis moderna a la versión de JavaScript que pidas con `target`.
- Instálalo **local al proyecto** (`npm i -D typescript`) e invócalo con **`npx tsc`**. Comandos del día a día: `tsc archivo.ts` compila, **`--watch` recompila al guardar**, `--noEmit` solo verifica sin generar nada.
- Las tres fases son **compile time**, pero no en el mismo momento: la verificación corre sola en tu editor todo el tiempo; borrar y traducir solo pasan cuando `tsc` se ejecuta. **Nunca ejecutas el `.ts`, ejecutas el `.js`.**
- **`tsc` te avisa pero no te bloquea:** genera el `.js` aunque haya errores de tipo. Se puede cambiar, pero eso se configura (sección 5).
- En tus proyectos nunca escribes `tsc` porque **`npm run dev` ejecuta un script del `package.json`** y el framework trae su propio compilador — que borra tipos pero **no los verifica**. La verificación la hacen tu editor y el paso de `build`.

---

[[03_compile-time-vs-runtime|← anterior]] · [[00_indice|índice]] · [[05_tsconfig-y-strict|siguiente →]]
