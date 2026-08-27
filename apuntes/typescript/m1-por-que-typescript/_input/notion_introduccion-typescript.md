# Introducción

## 1.1 ¿Qué es Typescript?

### Definición

>En JavaScript, la única forma de saber si tu código funciona es **ejecutarlo**. Y no basta con ejecutarlo: tienes que ejecutar exactamente **esa** ruta, con exactamente **esos** datos. 

> **TypeScript es un verificador que revisa tu código *antes* de ejecutarlo, comprobando que las piezas encajen entre sí.**
>
> No es un lenguaje nuevo: es JavaScript más una capa que **describe la forma** de los datos y las funciones. Esa descripción se revisa al compilar, y no cambia en nada lo que tu código hace al correr.

> - Significa que **todo código JavaScript válido también es código TypeScript válido**, pero TypeScript agrega características adicionales que JavaScript no tiene.


### ¿Qué es el tipado estático?

> TypeScript es un superconjunto de JavaScript que añade **tipado estático** **opcional** al lenguaje.

> Es la capacidad de definir y especificar el tipo de dato de una variable antes de ejecutar el código.
> 
- **JavaScript → tipado dinámico**
- **TypeScript → tipado estático**

<aside>

**Typescript no es 100% tipado estatico →** Es de **tipado gradual u opcional**. No te *obliga* a definir tipos en todas partes.

Hay concepto en Typescript llamado **Inferencia de Tipos**

- TypeScript te da la flexibilidad de **optar por no tipar** explícitamente una variable.
- Si no defines un tipo, TypeScript intentará **inferirlo** basándose en el valor inicial que le asignas y ese tipo no cambiara
- En resumen ,No es totalmente tipado estático porque no es necesario definir el tipo de dato de la variable, TS puede deducirlo.
</aside>

### **Diferencias con JavaScript**

| **JavaScript** | **TypeScript** |
| --- | --- |
| Tipado dinámico (tipos en tiempo de ejecución) | Tipado estático (tipos en tiempo de desarrollo) |
| Errores detectados al ejecutar | Errores detectados al escribir código |
| No requiere compilación | Requiere **transpilación** a JavaScript |
| Menor documentación implícita | El código se autodocumenta con tipos |

### Ventajas del tipado estático

| **Ventaja** | **Descripción** |
| --- | --- |
| **Detección temprana de errores** | Los errores de tipo se detectan mientras escribes código, no cuando lo ejecutas |
| **Autocompletado inteligente** | El editor conoce los tipos y puede sugerir propiedades y métodos correctos |
| **Refactorización segura** | Cambiar nombres o estructuras es más seguro porque el compilador detecta inconsistencias |
| **Documentación viva** | Los tipos sirven como documentación que nunca queda desactualizada |
| **Mejor escalabilidad** | En proyectos grandes, los tipos previenen errores difíciles de rastrear |

### El compilador de TypeScript

> El compilador (tsc) es la herramienta que transforma código TypeScript en JavaScript.
> 

**¿Por qué necesitamos un compilador?**

Los navegadores y Node.js solo entienden JavaScript, no TypeScript. El compilador:

1. **Lee** el código TypeScript (`.ts`)
2. **Verifica** que los tipos sean correctos
3. **Transforma** el código a JavaScript (`.js`)
4. **Genera** archivos que pueden ejecutarse en cualquier entorno JavaScript

**Flujo de trabajo:**

```
Código TypeScript (.ts) → Compilador (tsc) → Código JavaScript (.js) → Ejecución
```

## 1.2 Tipado explicito - Tipado Implicito - Inferencia de tipos

> En TypeScript existen dos **mecanismos principales** para determinar el tipo de una variable, pero solo uno de ellos es la **definición explícita** por parte del desarrollador. El otro, la forma **implícita**, se llama **Inferencia de Tipos**.
> 

## ¿Qué es la Inferencia de Tipos?

> La Inferencia de Tipos es la capacidad de **TypeScript (TS)** para **deducir automáticamente** el tipo de dato de una variable, función o expresión, sin que el desarrollador tenga que escribir el tipo de forma explícita.
> 
- Analogía: Si le entregas a un asistente un vaso lleno de agua clara, él no necesita que le digas "esto es un líquido de tipo agua". Simplemente lo infiere por lo que ve. TS hace lo mismo con el código.

## Dos Formas de Asignar Tipos

En TypeScript, el tipo de una variable se establece mediante dos mecanismos esenciales. Entender esta diferencia es el 80/20 del tipado en TS.

### 1. Tipado Explícito (Declaración)

Es cuando el desarrollador **indica manualmente** el tipo usando la sintaxis de dos puntos (`:`).

| Característica | Detalle |
| --- | --- |
| **Cuándo usarlo** | En **funciones**, **argumentos**, o cuando el tipo es complejo (uniones, interfaces, etc.). |
| **Sintaxis** | `let nombreVariable: Tipo = valor;` |

**Ejemplo**

```tsx
// El tipo 'number' es explícitamente definido por el desarrollador.
let edad: number = 30;

// Si intentas asignar un string, TS da error inmediatamente:
// edad = "treinta"; // ❌ Error de tipo
```

### 2. Tipado Implícito (Inferencia)

Es cuando **TypeScript deduce** el tipo basándose en el valor asignado en la declaración. Es el mecanismo preferido cuando es obvio.

| Característica | Detalle |
| --- | --- |
| **Cuándo usarlo** | Siempre que se inicializa una variable con un valor. TS es muy bueno infiriendo. |
| **Sintaxis** | `let nombreVariable = valor;` |

**Ejemplo**

```tsx
// TS ve el valor "Pedro" y asume/infiere que 'nombre' es de tipo 'string'.
let nombre = "Pedro";

// Esto es perfectamente válido, gracias a la inferencia:
nombre = "Juan";

// Esto causa error, porque TS ya sabe que 'nombre' DEBE ser un string:
// nombre = 123; // ❌ Error de tipo
```

<aside>

- Cuando **no tienes un valor inicial**, el **tipado explícito** (`: Tipo`) es la única manera de darle seguridad y claridad a tu código.
- **Confía en la inferencia para las variables simples (primitivas) donde tengas claro el valor.** 
Usa el tipado explícito solo en los lugares donde TS no puede inferir completamente (como en los argumentos de una función, donde el valor inicial no está disponible, o cuando el tipo de retorno no es obvio)
</aside>

## Cómo Funciona la Inferencia?

### A. Inicialización de Variables

Cuando declaras una variable y la inicializas inmediatamente, TS toma el tipo de ese valor.

```tsx
let isActive = true; // Infiere el tipo 'boolean'
let lista = [1, 2, 3]; // Infiere el tipo 'number[]' (Array de números)
```

### B. Valores de Retorno de Funciones

TS infiere el tipo de dato que una función devolverá, basándose en el valor de la sentencia `return`.

```tsx
// TS ve que se devuelve 'a + b' (dos números sumados)
// y automáticamente infiere que el tipo de retorno es 'number'.
function multiplicar(a: number, b: number) {
    return a * b;
}

let result = multiplicar(4, 5); // 'result' también infiere 'number'
```

### C. Sin Inicialización: El Tipo `any` o `undefined` ⚠️

Si declaras una variable sin inicializarla ni darle un tipo explícito, TS la infiere como el tipo `any` (si no está en modo estricto) o como una combinación de su tipo y `undefined` (si está en modo estricto, que es la mejor práctica).

```tsx
// MAL PRÁCTICA (Causa que la variable pierda la seguridad de tipos)
let valorSinAsignar; 

// En modo estricto: infiere 'any'.
// En modo estricto: infiere 'any' hasta que se le asigna un valor. 
// Es mejor tipar explícitamente en estos casos o usar 'let valor: Tipo | undefined;'.
```

## 1.3 Transpilación de TypeScript a JavaScript

> La **transpilación** es el paso esencial en el flujo de trabajo de TypeScript. No es una *compilación* tradicional (que convierte código a lenguaje de máquina), sino una **traducción** de un lenguaje a otro del mismo nivel de abstracción.
> 

## ¿Por Qué Transpilar?

El problema es simple:

1. **TypeScript (TS)** incluye sintaxis y características que **JavaScript (JS)** no tiene (como los tipos explícitos, interfaces, decoradores, etc.).
2. Los navegadores y entornos de ejecución como **Node.js solo entienden JavaScript estándar (.js)**.

La **transpilación** convierte el código TS seguro y moderno en código JS compatible que la máquina puede ejecutar.

## El Actor Principal: El Compilador de Typescript `tsc`

> El compilador de TypeScript (`tsc`, del inglés *TypeScript Compiler*) es la herramienta responsable de este proceso. 
Es el que transforma código TypeScript en JavaScript.
> 

### 1. Funciones Clave del Compilador (tsc)

| Función | Descripción | Importancia |
| --- | --- | --- |
| **Verificación de Tipos** | Lee el código TypeScript (`.ts`) y **verifica que todas las reglas de tipado** (interfaces, tipos de argumentos, etc.) se cumplan. | **Seguridad** 🛡️. 
**Atrapa errores** antes de que el código se ejecute. Si falla la verificación, la transpilación puede detenerse (dependiendo de la configuración). |
| **Eliminación de Tipos** | Una vez que los tipos se han verificado, el compilador **los borra**, ya que no son necesarios en JavaScript. | **Concisión** ✂️. 
El código JS resultante es limpio y libre de sintaxis TS innecesaria. |
| **Transpilación/Downgrade** | Transforma la sintaxis moderna (como `class` o `async/await`) y las características de TS (como `enum`) en código JS compatible con la versión de ECMAScript que especifiques. | **Compatibilidad** 💻.
Permite usar características de TS/ES2025 y ejecutarlas en un entorno de navegador de ES5 (JS antiguo). |

## El Flujo de Trabajo (Paso a Paso)

El proceso sigue la siguiente secuencia lógica:

**Flujo completo:**

```
1. Escribes código TypeScript (.ts)
       ↓
2. Guardas el archivo
       ↓
3. El compilador (tsc) analiza el código
       ↓
4. Verifica que los tipos sean correctos
       ↓
5. Si hay errores → Muestra errores, no genera .js
   Si no hay errores → Genera archivo .js
       ↓
6. El archivo .js puede ejecutarse en cualquier entorno

```

### Paso 1: Entrada (Source Code)

- **Archivo:** `app.ts` (Tu código TypeScript)
- **Contenido:** Contiene tipos, interfaces y sintaxis moderna.

```tsx
// app.ts
const titulo: string = "Hola TS"; // El tipado se verificará
class Saludo { /* ... */ } // La clase se transpilará
```

### Paso 2: Ejecución del Compilador

Ejecutas el comando en la terminal: `tsc app.ts`

- **Verificación:** `tsc` lee `app.ts` y verifica que `titulo` sea usado como un `string`.
- **Transformación:** `tsc` comienza la traducción.

### Paso 3: Salida (Generación de JavaScript)

- **Archivo:** `app.js` (Archivo generado por el compilador)
- **Contenido:** El código ahora es **JavaScript puro**, listo para ser ejecutado. Las anotaciones de tipo se eliminan.

```jsx
// app.js (generado)
var titulo = "Hola TS"; // El tipo ': string' ha desaparecido
var Saludo = /** @class */ (function () { /* ... */ })(); // La clase se convierte en una función (dependiendo de la versión de destino)
```

### Paso 4: Ejecución en el Entorno

El entorno de ejecución (navegador o Node.js) solo ve y ejecuta el archivo **`.js`**.

## El Archivo `tsconfig.json`

> El compilador `tsc` no solo traduce, sino que también obedece un archivo de configuración clave: `tsconfig.json`.
> 

Este archivo le dice al compilador:

- **`target`:** ¿A qué versión de JavaScript debo transpirar? (Ej. "ES5" para máxima compatibilidad o "ES2020" para código más moderno).
- **`module`:** ¿Cómo debo manejar los módulos? (Ej. "CommonJS" para Node.js o "ESNext" para navegadores modernos).
- **`rootDir` / `outDir`:** ¿Dónde está el código TS original? ¿Dónde debo poner el código JS generado?

## 1.4 Entorno de Desarrollo

## Instalación de TypeScript

- **Requisito previo:** Tener Node.js instalado en tu sistema.
    - **TypeScript se instala** como un paquete de Node.js a través del gestor de paquetes **npm** (o yarn/pnpm).

**Sintaxis: Instalación Global**

- Disponible en todo el sistema, puedes usar `tsc` desde cualquier carpeta.

```bash
npm install -g typescript
```

**Sintaxis: Instalación Local (Recomendada)**

Con esta instalacion , cada proyecto tiene su propia versión de TypeScript, evita conflictos de versiones.

- Instalas TypeScript como una **dependencia de desarrollo** (`--save-dev` o `-D`) dentro de tu proyecto.

```bash
npm install --save-dev typescript
```

## Verificar instalación

**Sintaxis: Verificar versión instalada**

**Retorna:** Número de versión de TypeScript instalado (ej: `Version 5.3.3`)

```bash
tsc --version
```

</aside>

## Compilar un archivo TypeScript

**Sintaxis: Compilar un archivo**

```bash
tsc nombre_archivo.ts
```

**Descripción:**

- Lee el archivo `nombre_archivo.ts`
- Genera `nombre_archivo.js` en la misma carpeta
- Muestra errores de tipo si los hay

**Ejemplo:**

```bash
tsc app.ts
# Genera: app.js
```

**Sintaxis: Compilar con modo watch (observación)**

**Descripción:** El compilador se mantiene activo y recompila automáticamente cada vez que guardas cambios en el archivo.

- El modo *watch* es una herramienta de productividad clave que elimina la necesidad de ejecutar manualmente el comando `tsc` repetidamente.
- El proceso de `tsc` **se queda corriendo** en segundo plano (o en tu terminal). No se detiene.

```bash
tsc nombre_archivo.ts --watch
# o
tsc nombre_archivo.ts -w
```

## 1.5 Archivo tsconfig.json

> Es el archivo de configuración de TypeScript que define cómo se debe compilar el proyecto.
> 

**¿Por qué es importante?**

- Define opciones de compilación para todo el proyecto
- Especifica qué archivos incluir/excluir
- Establece el comportamiento del compilador
- Facilita trabajar con múltiples archivos

**Sintaxis: Crear tsconfig.json**

```bash
tsc --init
```

**Descripción:** Genera un archivo `tsconfig.json` con configuración por defecto y comentarios explicativos.

### Estructura del tsconfig.json

```json
{
  "compilerOptions": {
    // Opciones de compilación
  },
  "include": [
    // Archivos a incluir
  ],
  "exclude": [
    // Archivos a excluir
  ]
}

```

### Opciones del compilador más importantes

| **Opción** | **Descripción** | **Valor recomendado** |
| --- | --- | --- |
| `target` | Versión de JavaScript a generar | `"ES2020"` o `"ESNext"` |
| `module` | Sistema de módulos a usar | `"ESNext"` o `"CommonJS"` |
| `outDir` | Carpeta donde se guardan los archivos `.js` | `"./dist"` |
| `rootDir` | Carpeta raíz del código TypeScript | `"./src"` |
| `strict` | Activa todas las verificaciones estrictas | `true` |
| `esModuleInterop` | Compatibilidad con módulos CommonJS | `true` |
| `skipLibCheck` | Omite verificación de archivos `.d.ts` | `true` |

**Ejemplo: tsconfig.json básico recomendado**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Descripción de cada línea:**

- `target`: Compila a ES2020 (compatible con navegadores modernos)
- `module`: Usa el sistema de módulos ESNext
- `outDir`: Guarda archivos compilados en carpeta `dist`
- `rootDir`: Lee archivos TypeScript desde carpeta `src`
- `strict`: Activa modo estricto (máxima seguridad de tipos)
- `include`: Compila todos los archivos dentro de `src`
- `exclude`: Ignora `node_modules` y `dist`

### Opciones de strict mode

Cuando activas `"strict": true`, se habilitan estas opciones:

| **Opción** | **Qué hace** |
| --- | --- |
| `noImplicitAny` | Prohíbe variables sin tipo explícito que TypeScript no puede inferir |
| `strictNullChecks` | `null` y `undefined` no son asignables a otros tipos por defecto |
| `strictFunctionTypes` | Verifica tipos de parámetros de funciones más rigurosamente |
| `strictBindCallApply` | Verifica tipos al usar `bind`, `call` y `apply` |
| `noImplicitThis` | Prohíbe uso de `this` con tipo implícito `any` |
| `alwaysStrict` | Genera código en modo estricto de JavaScript |

## 1.6 Tiempo de Compilacion - Tiempo de Ejecucion

> El proceso de desarrollo se divide limpiamente en dos fases donde herramientas y errores específicos entran en juego.
> 

### 1. Tiempo de Codificación (Tiempo de Compilación)

Esta fase ocurre **mientras escribes el código** y antes de que se ejecute.

- **¿Qué Sucede?** El **Compilador de TypeScript (`tsc`)** y tu editor (IDE) leen y analizan el código.
- **Herramienta Principal:** **TypeScript**.
- **Tipo de Errores:** **Errores de Tipado** (errores de compilación). Estos ocurren cuando violas el contrato de tipos (ej., intentas asignar un `string` a un `number`).
- **El Gran Beneficio:** Los errores se detectan **instantáneamente**. Herramientas como el chequeo de **`never`** fuerzan la lógica a ser correcta aquí, garantizando que el código sea estructuralmente sólido antes de siquiera probarlo.
- **Objetivo:** **Seguridad y Confianza** — si el código compila, se tiene una alta certeza de que no habrá errores de tipos inesperados.

### 2. Tiempo de Ejecución (Runtime)

Esta fase ocurre **después de que el código ha sido compilado a JavaScript** y está siendo ejecutado por un entorno (Node.js o el navegador).

- **¿Qué Sucede?** La CPU procesa las instrucciones de JavaScript línea por línea.
- **Herramienta Principal:** **Node.js** o el **Motor V8** (en Chrome).
- **Tipo de Errores:** **Errores Lógicos** o **Errores de Datos**. Esto incluye intentar acceder a una propiedad en un objeto `undefined` (ej., `usuario.nombre` cuando `usuario` es `null`), fallos de red, o datos inesperados de una API.
- **El Gran Peligro:** Estos errores solo se manifiestan **cuando el usuario interactúa** con la parte defectuosa del programa.
- **Objetivo:** **Manejo de Excepciones** — asegurar que el programa pueda fallar limpiamente y recuperarse de datos inesperados (usando `try...catch` o chequeos de `null`/`undefined`).

### La Relación de Complemento

> TypeScript no elimina los errores de *runtime* (como un error de conexión a la base de datos), pero **elimina una gran clase de errores de *runtime*** (los errores de tipo), moviendo la detección a la fase de **codificación**.
> 

| Herramienta | Protege en el Tiempo de... | Función |
| --- | --- | --- |
| **`never`** | **Codificación** | Garantiza que no olvides un caso lógico. |
| **`throw new Error()`** | **Ejecución** | Garantiza que la aplicación falle limpiamente si llegan datos inesperados. |

Entender cuándo y dónde actúa cada herramienta es clave para ser un desarrollador full stack eficiente.