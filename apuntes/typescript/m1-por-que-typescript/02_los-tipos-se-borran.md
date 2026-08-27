---
tema: M1 — Por qué TypeScript y cómo corre
workspace: typescript
seccion: 2
titulo: "Los tipos se borran"
estado: finalizada
prev: 01_que-problema-resuelve
next: 03_compile-time-vs-runtime
---

# 🟦 Los tipos se borran

En la sección anterior quedó pendiente la tercera parte de la analogía del corrector ortográfico: **las marcas rojas no salen impresas**. Con TypeScript pasa exactamente eso, y es la lección entera de este módulo.

> **Después de verificar que todo encaje, el compilador *borra* todas tus anotaciones de tipo. El archivo `.js` que se ejecuta no conserva ni rastro de ellas.**
>
> Se le llama **type erasure** (borrado de tipos). Los tipos existen únicamente mientras escribes y compilas; en el programa que corre, no existen.

La razón es simple y ya la conoces: los navegadores y Node **solo entienden JavaScript**. No hay ningún motor que sepa qué es una `interface`. Así que si TypeScript quiere producir algo ejecutable, tiene que quitar todo lo que JavaScript no reconoce.

## Lo mínimo para leer el ejemplo

El ejemplo de abajo usa dos cosas que todavía no vimos. No hace falta que sepas usarlas — solo entender qué son, porque lo importante aquí es **verlas desaparecer**.

En la sección 1 escribimos la forma de un objeto suelta, dentro de la propia función:

```ts
function saludar(usuario: { nombre: string }) { }
```

`interface` y `type` son las dos maneras de **ponerle nombre a esa forma**, para escribirla una vez y reutilizarla:

```ts
// Le pongo el nombre "Usuario" a esta forma de objeto
interface Usuario {
  nombre: string
  edad: number
}

// Le pongo el nombre "Rol" a un tipo que solo puede ser uno de dos textos
type Rol = "admin" | "cliente"

// Y ahora uso los nombres en vez de repetir la forma completa
function saludar(u: Usuario, rol: Rol) { }
```

> 📝 **Nota:** por ahora quédate con eso — son etiquetas para formas. La diferencia entre `interface` y `type`, y cuándo usar cada una, es una temática completa del **M3**. Que un tipo pueda ser *"esto o esto otro"* (`"admin" | "cliente"`) es el **M5**.

## Míralo con tus propios ojos

Esto es lo que escribes:

**Entrada — `usuario.ts`:**

```ts
interface Usuario {
  nombre: string
  edad: number
}

type Rol = "admin" | "cliente"

function saludar(u: Usuario, rol: Rol = "cliente"): string {
  return `Hola ${u.nombre} (${rol})`
}

const erick: Usuario = { nombre: "Erick", edad: 30 }
console.log(saludar(erick))
```

Y esto es lo que se ejecuta:

**Salida — `usuario.js`:**

```js
"use strict";
function saludar(u, rol = "cliente") {
    return `Hola ${u.nombre} (${rol})`;
}
const erick = { nombre: "Erick", edad: 30 };
console.log(saludar(erick));
```

Cuenta lo que pasó:

- `interface Usuario` — **desapareció completa**. No quedó ni un comentario.
- `type Rol = "admin" | "cliente"` — **desapareció completa**.
- `: Usuario`, `: Rol`, `: string` — las tres anotaciones, **borradas**.
- `= "cliente"` — **sobrevivió**, porque un valor por defecto es JavaScript de siempre, no un tipo.
- El objeto `erick` — **sobrevivió tal cual**, solo perdió su etiqueta `: Usuario`.

Escribiste seis cosas relacionadas con tipos. Sobrevivieron cero.

> 📝 **Nota:** el `"use strict"` no lo escribiste tú — lo agrega el compilador porque tienes `strict` activado (sección 5). La forma exacta del `.js` cambia según tu `tsconfig.json`, sobre todo con la opción `target`. Lo que **no** cambia nunca es el borrado: eso pasa siempre, con cualquier configuración.

## El flujo completo

```text
   usuario.ts                                    usuario.js
  (lo que escribes)                            (lo que se ejecuta)
        │                                              ▲
        │              ┌──────────────┐                │
        └─────────────►│     tsc      │────────────────┘
                       └──────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
            1. VERIFICA los tipos   2. Los BORRA
             (aquí te avisa de       (aquí desaparecen
              los errores)            para siempre)
```

Dos trabajos, en ese orden. Primero revisa, después borra. Y cuando el programa arranca, **el paso 1 ya terminó hace rato** — nadie sigue vigilando.

## Qué se borra y qué sobrevive

**Se borra** — todo lo que es "solo para el compilador". Varios de estos aún no los has visto; no necesitas saber usarlos todavía, solo que **ninguno llega al `.js`**:

| Sintaxis | Qué es |
|----------|--------|
| `: string`, `: Usuario` | La anotación de tipo |
| `interface` / `type` | Ponerle nombre a una forma |
| `<T>` | Genéricos: tipos que se rellenan al usarlos |
| `as Usuario` | Afirmar *"confía en mí, esto es un Usuario"* |
| `import type { X }` | Importar solo un tipo, sin traer código |

**Sobrevive** — todo lo que ya era JavaScript de verdad: variables, funciones, objetos, clases, parámetros, valores por defecto (`= "cliente"`) y todo tu código de negocio.

> 🔑 **Matiz:** hay una excepción notable. `enum` **sí genera código JavaScript** — no se borra, se convierte en un objeto real dentro de tu bundle. Es una de las razones por las que hoy se prefieren otras formas de expresar lo mismo (lo verás en el M2).

## Las cuatro consecuencias

Aquí es donde el borrado deja de ser un dato curioso y se vuelve la cosa más importante que aprendes en este módulo.

**1. No puedes preguntar por un tipo mientras el programa corre.**

```ts
if (typeof usuario === "Usuario") { }   // ❌ esto nunca va a funcionar
```

No es que esté mal escrito: es que en runtime **la palabra `Usuario` ya no existe en ningún lado**. Es el tema completo de la sección siguiente.

**2. Los tipos son gratis en tiempo de ejecución.**

Cero costo de performance, cero bytes en tu bundle. Puedes escribir tipos elaboradísimos y tu aplicación pesa y corre exactamente igual. Todo el precio de TypeScript se paga **al construir**, nunca al ejecutar.

**3. Si el dato que llega no coincide con el tipo, nadie se entera.**

Es la contraparte exacta de lo que vimos en la sección 1: `const u: Usuario = await res.json()` **afirma** en vez de comprobar. Ahora sabes *por qué* nunca comprueba — para cuando la respuesta de la API llega, la anotación `: Usuario` ya se borró. **No hay nadie mirando.**

**4. Puedes tener errores de tipo y aun así generar el `.js`.**

Esto sorprende: por defecto `tsc` reporta los errores **y de todas formas emite el JavaScript**. Un error de tipo no detiene la compilación salvo que lo pidas explícitamente (con la opción `noEmitOnError`). Es decir, TypeScript te avisa — pero no te bloquea.


## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- El compilador hace dos trabajos en orden: **primero verifica los tipos, después los borra**. Se llama **type erasure**.
- En el `.js` que se ejecuta **no queda ni rastro** de tus `interface`, `type` ni anotaciones. Sobrevive solo lo que ya era JavaScript.
- Por eso `typeof usuario === "Usuario"` no funciona nunca: en runtime esa palabra ya no existe.
- Por eso también **los tipos son gratis en runtime** (cero performance, cero bytes) — todo su precio se paga al construir.
- Y por eso `const u: Usuario = await res.json()` no comprueba nada: cuando la respuesta llega, la anotación ya se borró. **No hay nadie mirando.**

---
[[01_que-problema-resuelve|← anterior]] · [[00_indice|índice]] · [[03_compile-time-vs-runtime|siguiente →]]
