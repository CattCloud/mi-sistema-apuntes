# 🩺 Diagnóstico de Nivel — Erick (base para el plan de estudio)

> **Qué es esto:** Un autodiagnóstico granular por tema. Sirve para que el agente sepa EXACTAMENTE dónde estás parado y arme un plan personalizado (no genérico). Lo llenas tú; el agente no supone.
>
> **Cómo llenarlo:** Lee la *pregunta de autodiagnóstico* de cada tema. Si la responderías **sin dudar y sin IA**, lo dominas. Si dudas, no lo dominas (sé honesto — el plan entero depende de esto).
>
> **Marca con una `x` en la columna que corresponda:**
>
> - **✅** = lo domino sin ayuda
> - **🔄** = lo tuve, está oxidado (lo recupero con un repaso corto)
> - **❌** = no lo sé / nunca lo vi bien
> - *(déjala vacía si no sabes cómo clasificarlo y lo vemos juntos)*
>
> **Contexto ya conocido:** JS básico-intermedio sólido · TS oxidado · Arquitectura nunca estudiada formalmente · IA/LLMs flojo · 5–10h/semana · sprint corto con resultado visible · tienes criterio de desarrollador aunque la sintaxis esté oxidada (5 meses sin codear).

---

## 1. JavaScript

### Nivel Básico


| # | Tema                        | Pregunta de autodiagnóstico                                             | ✅ | 🔄 | ❌ |
| --- | ----------------------------- | -------------------------------------------------------------------------- | :--: | :--: | :--: |
| 1 | Tipos y coerción           | ¿Por qué`0 == ''` es `true` y cuándo SIEMPRE usar `===`?              | x |   |   |
| 2 | `var`/`let`/`const` y scope | ¿Diferencia de scope entre`var` y `let`? ¿Qué es *hoisting*?          | x |   |   |
| 3 | Funciones y arrow functions | ¿Diferencia real entre`function` y `=>` (más allá de la sintaxis)?    | x |   |   |
| 4 | Array methods               | ¿Reescribirías un`for` que suma con `.reduce()`? ¿`map` vs `forEach`? |   | x |   |
| 5 | Destructuring y spread/rest | ¿Clonarías un objeto y le cambiarías 1 campo en una línea?           |   |   | x |
| 6 | Truthy/falsy y ternarios    | ¿Qué valores son*falsy* en JS (lista mental)?                          |   | x |   |

### Nivel Intermedio


| #  | Tema                            | Pregunta de autodiagnóstico                                                 | ✅ | 🔄 | ❌ |
| ---- | --------------------------------- | ------------------------------------------------------------------------------ | :--: | :--: | :--: |
| 7  | Closures                        | ¿Cómo harías un contador que recuerda su valor con un closure?            |   |   | x |
| 8  | `this` y binding                | ¿Cómo cambia`this` en una arrow vs función normal? ¿Qué hace `.bind()`? |   | x |   |
| 9  | Promesas                        | ¿Diferencia entre encadenar`.then()` y usar `Promise.all()`?                |   | x |   |
| 10 | `async`/`await` + errores       | ¿Cómo capturas el error de un`await` que falla?                            |   | x |   |
| 11 | Event loop / microtasks         | ¿Por qué`setTimeout(fn,0)` corre DESPUÉS de una promesa ya resuelta?      |   | x |   |
| 12 | Módulos ES (`import`/`export`) | ¿Diferencia entre`export default` y `export` nombrado?                      |   | x |   |
| 13 | Manejo de errores               | ¿Cuándo lanzar (`throw`) tu propio `Error` y cómo crear uno custom?       |   | x |   |

### Nivel Avanzado


| #  | Tema                               | Pregunta de autodiagnóstico                                              | ✅ | 🔄 | ❌ |
| ---- | ------------------------------------ | --------------------------------------------------------------------------- | :--: | :--: | :--: |
| 14 | Prototipos / herencia prototípica | ¿Qué es la cadena de prototipos y cómo busca JS una propiedad?         |   | x |   |
| 15 | Programación funcional            | ¿Qué es inmutabilidad y composición de funciones?                      |   | x |   |
| 16 | Generators / iterators             | ¿Para qué sirve`function*` y `yield`?                                   |   | x |   |
| 17 | Async avanzado                     | ¿`Promise.allSettled` vs `race`? ¿Cómo cancelas con `AbortController`? |   | x |   |
| 18 | Debounce / throttle                | ¿Implementarías un`debounce` desde cero?                                |   | x |   |

---

## 2. TypeScript *(dijiste: oxidado)*

### Nivel Básico


| # | Tema                  | Pregunta de autodiagnóstico                               | ✅ | 🔄 | ❌ |
| --- | ----------------------- | ------------------------------------------------------------ | :--: | :--: | :--: |
| 1 | Tipos e inferencia    | ¿Cuándo TS infiere solo y cuándo debes anotar?          |   |   |   |
| 2 | `interface` vs `type` | ¿Cuándo usarías uno u otro?                             |   |   |   |
| 3 | Arrays, tuplas, enums | ¿Cómo tipas un array de objetos`User`?                   |   |   |   |
| 4 | Union y literal types | ¿Cómo tipas algo que solo puede ser`'admin'` o `'user'`? |   |   |   |
| 5 | Optional / readonly   | ¿Qué hace`?` y `readonly` en una propiedad?              |   |   |   |

### Nivel Intermedio


| #  | Tema                          | Pregunta de autodiagnóstico                                 | ✅ | 🔄 | ❌ |
| ---- | ------------------------------- | -------------------------------------------------------------- | :--: | :--: | :--: |
| 6  | Generics                      | ¿Escribirías una función genérica`identity<T>(x: T): T`? |   |   |   |
| 7  | Type guards / narrowing       | ¿Cómo estrechas un tipo con`typeof` / `in` / `instanceof`? |   |   |   |
| 8  | Utility types                 | ¿Qué hacen`Partial`, `Pick`, `Omit`, `Record`?             |   |   |   |
| 9  | Tipar async                   | ¿Cómo tipas una función que devuelve`Promise<User>`?      |   |   |   |
| 10 | `unknown` vs `any` vs `never` | ¿Por qué`unknown` es más seguro que `any`?                |   |   |   |

### Nivel Avanzado


| #  | Tema                      | Pregunta de autodiagnóstico                             | ✅ | 🔄 | ❌ |
| ---- | --------------------------- | ---------------------------------------------------------- | :--: | :--: | :--: |
| 11 | Conditional types         | ¿Qué es`T extends U ? X : Y`?                          |   |   |   |
| 12 | Mapped types              | ¿Cómo recorrer las keys de un tipo para transformarlo? |   |   |   |
| 13 | Validación + tipos (zod) | ¿Cómo infieres un tipo TS desde un schema de`zod`?     |   |   |   |
| 14 | Declaration files         | ¿Para qué sirve un`.d.ts`?                             |   |   |   |

---

## 3. React *(núcleo de tu stack frontend)*

### Nivel Básico


| # | Tema                         | Pregunta de autodiagnóstico                                   | ✅ | 🔄 | ❌ |
| --- | ------------------------------ | ---------------------------------------------------------------- | :--: | :--: | :--: |
| 1 | JSX y componentes            | ¿Diferencia entre un componente y una función normal?        |   |   |   |
| 2 | Props                        | ¿Pasas datos de padre a hijo y tipas las props (TS)?          |   |   |   |
| 3 | `useState`                   | ¿Por qué no mutar el state directo y sí usar el setter?     |   |   |   |
| 4 | Renderizado de listas +`key` | ¿Por qué React necesita`key` y qué pasa si usas el índice? |   |   |   |
| 5 | Eventos y render condicional | ¿Muestras/ocultas UI según estado sin problema?              |   |   |   |

### Nivel Intermedio


| #  | Tema                            | Pregunta de autodiagnóstico                                      | ✅ | 🔄 | ❌ |
| ---- | --------------------------------- | ------------------------------------------------------------------- | :--: | :--: | :--: |
| 6  | `useEffect` + dependencias      | ¿Qué hace el array de dependencias y cuándo corre el*cleanup*? |   |   |   |
| 7  | Lifting state up / composición | ¿Cómo compartes estado entre dos componentes hermanos?          |   |   |   |
| 8  | `useRef`                        | ¿Para qué un ref y en qué se diferencia del state?             |   |   |   |
| 9  | Formularios controlados         | ¿Manejas un form controlado con validación?                     |   |   |   |
| 10 | Context API                     | ¿Cuándo usar Context en vez de pasar props?                     |   |   |   |
| 11 | Custom hooks                    | ¿Extraerías lógica repetida a un hook propio (`useAlgo`)?      |   |   |   |

### Nivel Avanzado


| #  | Tema                                | Pregunta de autodiagnóstico                                        | ✅ | 🔄 | ❌ |
| ---- | ------------------------------------- | --------------------------------------------------------------------- | :--: | :--: | :--: |
| 12 | Re-renders y performance            | ¿Por qué un componente se re-renderiza de más y cómo lo evitas? |   |   |   |
| 13 | `useMemo` / `useCallback` / `memo`  | ¿Cuándo SÍ y cuándo NO memoizar?                                |   |   |   |
| 14 | `useReducer`                        | ¿Cuándo`useReducer` en vez de `useState`?                         |   |   |   |
| 15 | Estado global (Zustand — tu stack) | ¿Cuándo sacas estado a un store global?                           |   |   |   |
| 16 | Suspense / lazy loading             | ¿Cargas un componente de forma diferida?                           |   |   |   |

---

## 4. Tailwind CSS *(tu herramienta de estilos)*

### Nivel Básico


| # | Tema                           | Pregunta de autodiagnóstico                                            | ✅ | 🔄 | ❌ |
| --- | -------------------------------- | ------------------------------------------------------------------------- | :--: | :--: | :--: |
| 1 | Utility-first (el concepto)    | ¿Por qué clases como`flex p-4` en vez de CSS aparte?                  | x |   |   |
| 2 | Spacing / sizing / colors      | ¿Aplicas padding, margin y color sin buscar la escala (`p-4`, `mt-2`)? | x |   |   |
| 3 | Flexbox con Tailwind           | ¿Centras algo con`flex items-center justify-center` de memoria?        |   | x |   |
| 4 | Responsive (`sm:` `md:` `lg:`) | ¿Cambias el layout por breakpoint sin buscar?                          | x |   |   |

### Nivel Intermedio


| # | Tema                                    | Pregunta de autodiagnóstico                                | ✅ | 🔄 | ❌ |
| --- | ----------------------------------------- | ------------------------------------------------------------- | :--: | :--: | :--: |
| 5 | Grid con Tailwind                       | ¿Armas un grid responsive de cards (`grid grid-cols-...`)? |   | x |   |
| 6 | Estados (`hover:` `focus:` `disabled:`) | ¿Estilizas estados sin escribir CSS extra?                 |   | x |   |
| 7 | Dark mode (`dark:`)                     | ¿Configuras y activas modo oscuro?                         |   |   | x |
| 8 | Reutilización (`@apply` / componentes) | ¿Cuándo extraer a un componente vs repetir clases?        |   |   | x |

### Nivel Avanzado


| #  | Tema                         | Pregunta de autodiagnóstico                            | ✅ | 🔄 | ❌ |
| ---- | ------------------------------ | --------------------------------------------------------- | :--: | :--: | :--: |
| 9  | Configurar`tailwind.config`  | ¿Extiendes el*theme* con tu paleta/espaciados propios? |   |   | x |
| 10 | Plugins y sistema de diseño | ¿Usas plugins (forms, typography) con criterio?        |   |   | x |

---

## 5. Next.js *(tu framework principal — Next 15)*

### Nivel Básico


| # | Tema                           | Pregunta de autodiagnóstico                        | ✅ | 🔄 | ❌ |
| --- | -------------------------------- | ----------------------------------------------------- | :--: | :--: | :--: |
| 1 | App Router vs Pages Router     | ¿Cuál usas y en qué se diferencian?              |   |   |   |
| 2 | Routing por carpetas + layouts | ¿Creas una ruta y un layout compartido sin buscar? |   |   |   |
| 3 | Server vs Client Components    | ¿Cuándo necesitas`"use client"` y por qué?       |   |   |   |
| 4 | Dynamic routes (`[id]`)        | ¿Lees un parámetro de la URL en una página?      |   |   |   |

### Nivel Intermedio


| # | Tema                               | Pregunta de autodiagnóstico                                 | ✅ | 🔄 | ❌ |
| --- | ------------------------------------ | -------------------------------------------------------------- | :--: | :--: | :--: |
| 5 | Data fetching en Server Components | ¿Traes datos directo en un Server Component sin`useEffect`? |   |   |   |
| 6 | Server Actions                     | ¿Qué es una Server Action y cuándo la usas?               |   |   |   |
| 7 | Route Handlers (API en Next)       | ¿Creas un endpoint dentro de Next (`route.ts`)?             |   |   |   |
| 8 | Auth con NextAuth (tu stack)       | ¿Configuras login con un provider sin copiar todo?          |   |   |   |
| 9 | Metadata / SEO básico             | ¿Defines título/description por página?                   |   |   |   |

### Nivel Avanzado


| #  | Tema                                     | Pregunta de autodiagnóstico                           | ✅ | 🔄 | ❌ |
| ---- | ------------------------------------------ | -------------------------------------------------------- | :--: | :--: | :--: |
| 10 | SSR / SSG / ISR                          | ¿Cuándo renderizar en server, estático o revalidar? |   |   |   |
| 11 | Modelo de caché de Next                 | ¿Entiendes qué cachea Next y cómo invalidarlo?      |   |   |   |
| 12 | Streaming / Suspense en Next             | ¿Muestras UI parcial mientras carga el resto?         |   |   |   |
| 13 | Optimización (imágenes, fonts, bundle) | ¿Sabes por qué tu app va lenta y cómo medirlo?      |   |   |   |

---

## 6. Backend: Node + Express + APIs REST *(tu capa de servidor)*

### Nivel Básico


| # | Tema                          | Pregunta de autodiagnóstico                        | ✅ | 🔄 | ❌ |
| --- | ------------------------------- | ----------------------------------------------------- | :--: | :--: | :--: |
| 1 | Qué es Node (server-side JS) | ¿Por qué Node es single-thread y no se "bloquea"? |   |   |   |
| 2 | Express: rutas y`req`/`res`   | ¿Levantas un servidor con una ruta GET sin buscar? |   |   |   |
| 3 | Métodos HTTP y status codes  | ¿Cuándo 200, 201, 400, 401, 404, 500?             |   |   |   |
| 4 | JSON y body parsing           | ¿Lees el body de un POST?                          |   |   |   |

### Nivel Intermedio


| #  | Tema                           | Pregunta de autodiagnóstico                                          | ✅ | 🔄 | ❌ |
| ---- | -------------------------------- | ----------------------------------------------------------------------- | :--: | :--: | :--: |
| 5  | Diseño REST                   | ¿Diseñas rutas de un recurso (`/users`, `/users/:id`) con criterio? |   |   |   |
| 6  | Middleware                     | ¿Qué es un middleware y cómo encadenarlos?                         |   |   |   |
| 7  | Validación (zod / validator)  | ¿Validas el input antes de tocar la DB?                              |   |   |   |
| 8  | Manejo de errores centralizado | ¿Tienes un middleware de errores o lo resuelves ruta por ruta?       |   |   |   |
| 9  | Auth (JWT / sesiones)          | ¿Proteges una ruta con un token?                                     |   |   |   |
| 10 | Variables de entorno / config  | ¿Manejas secrets con`.env` y por entorno?                            |   |   |   |

### Nivel Avanzado


| #  | Tema                                 | Pregunta de autodiagnóstico                         | ✅ | 🔄 | ❌ |
| ---- | -------------------------------------- | ------------------------------------------------------ | :--: | :--: | :--: |
| 11 | Arquitectura en capas                | ¿Separas controller / service / repository?         |   |   |   |
| 12 | Async errors + error middleware      | ¿Capturas errores async sin que el server se caiga? |   |   |   |
| 13 | Seguridad (CORS, helmet, rate limit) | ¿Sabes qué proteges con CORS y rate limiting?      |   |   |   |
| 14 | Testing de APIs                      | ¿Escribirías un test de un endpoint?               |   |   |   |

---

## 7. Bases de Datos y Modelado

### Nivel Básico


| # | Tema                       | Pregunta de autodiagnóstico                                              | ✅ | 🔄 | ❌ |
| --- | ---------------------------- | --------------------------------------------------------------------------- | :--: | :--: | :--: |
| 1 | Modelo relacional          | ¿Qué es una PK y una FK, y para qué sirven?                            |   |   |   |
| 2 | SQL CRUD                   | ¿Escribirías un`SELECT ... WHERE` y un `UPDATE` sin buscar la sintaxis? |   |   |   |
| 3 | Tipos de datos y NULL      | ¿Diferencia entre`NULL`, `''` y `0`?                                     |   |   |   |
| 4 | Relaciones 1:1 / 1:N / N:M | ¿Cómo modelas "un usuario tiene muchos posts"? ¿Y N:M?                 |   |   |   |

### Nivel Intermedio


| #  | Tema                    | Pregunta de autodiagnóstico                                               | ✅ | 🔄 | ❌ |
| ---- | ------------------------- | ---------------------------------------------------------------------------- | :--: | :--: | :--: |
| 5  | JOINs                   | ¿Cuándo`INNER` vs `LEFT JOIN`? Da un ejemplo.                            |   |   |   |
| 6  | GROUP BY + agregaciones | ¿Cómo cuentas posts por usuario? (`COUNT`, `GROUP BY`)                   |   |   |   |
| 7  | Índices                | ¿Qué es un índice y cuándo conviene crear uno?                         |   |   |   |
| 8  | Diseñar un esquema     | Dado "un blog con usuarios, posts y comentarios", ¿armas el esquema solo? |   |   |   |
| 9  | Transacciones (ACID)    | ¿Por qué un cobro + descuento de saldo deben ir en una transacción?     |   |   |   |
| 10 | SQL vs NoSQL            | ¿Cuándo elegirías Postgres y cuándo Mongo?                             |   |   |   |

### Nivel Avanzado


| #  | Tema                    | Pregunta de autodiagnóstico                     | ✅ | 🔄 | ❌ |
| ---- | ------------------------- | -------------------------------------------------- | :--: | :--: | :--: |
| 11 | Subqueries / CTEs       | ¿Qué es un`WITH ... AS` (CTE) y cuándo ayuda? |   |   |   |
| 12 | Optimización / EXPLAIN | ¿Cómo sabes si una query es lenta y por qué?  |   |   |   |
| 13 | Normalización          | ¿Qué problema resuelve normalizar hasta 3NF?   |   |   |   |
| 14 | Modelado NoSQL          | En Mongo, ¿cuándo*embeber* vs *referenciar*?   |   |   |   |

### Prisma / ORM *(tu stack)*


| #  | Tema                                 | Pregunta de autodiagnóstico                                 | ✅ | 🔄 | ❌ |
| ---- | -------------------------------------- | -------------------------------------------------------------- | :--: | :--: | :--: |
| 15 | Schema y relaciones                  | ¿Defines una relación 1:N en`schema.prisma` sin buscar?    |   |   |   |
| 16 | Migraciones                          | ¿Qué hace`prisma migrate` y por qué versionar el esquema? |   |   |   |
| 17 | Queries (`include`/`select`/`where`) | ¿Traes un user con sus posts en una sola query?             |   |   |   |
| 18 | Cuándo el ORM no basta              | ¿Sabes cuándo bajar a SQL crudo (`$queryRaw`)?             |   |   |   |

---

## 8. IA / LLMs aplicado *(dijiste: flojo — central para tu meta)*

### Nivel Básico


| # | Tema                                    | Pregunta de autodiagnóstico                                                  | ✅ | 🔄 | ❌ |
| --- | ----------------------------------------- | ------------------------------------------------------------------------------- | :--: | :--: | :--: |
| 1 | Qué es un LLM / token / context window | ¿Por qué un modelo tiene un límite de "contexto" y qué es un token?       |   |   |   |
| 2 | Llamar una API de LLM                   | ¿Harías una llamada a la API (request → response) y leerías la respuesta? |   |   |   |
| 3 | Prompt: system vs user                  | ¿Diferencia entre el mensaje*system* y el *user*?                            |   |   |   |
| 4 | Parámetros básicos                    | ¿Qué hace`temperature` y `max_tokens`?                                      |   |   |   |

### Nivel Intermedio


| # | Tema                          | Pregunta de autodiagnóstico                                                     | ✅ | 🔄 | ❌ |
| --- | ------------------------------- | ---------------------------------------------------------------------------------- | :--: | :--: | :--: |
| 5 | Context engineering           | ¿Qué info darle, en qué formato y en qué momento? (el video insiste en esto) |   |   |   |
| 6 | Structured output (JSON)      | ¿Cómo forzar que el modelo responda un JSON con forma fija?                    |   |   |   |
| 7 | Function calling / tools      | ¿Qué es una*tool* y cómo el modelo decide llamarla?                           |   |   |   |
| 8 | Costos / tokens / rate limits | ¿Cómo estimas cuánto cuesta una llamada?                                      |   |   |   |
| 9 | RAG (idea)                    | ¿Qué es*retrieval-augmented generation* y cuándo lo usarías?                 |   |   |   |

### Nivel Avanzado


| #  | Tema                              | Pregunta de autodiagnóstico                                       | ✅ | 🔄 | ❌ |
| ---- | ----------------------------------- | -------------------------------------------------------------------- | :--: | :--: | :--: |
| 10 | Qué es un agente                 | ¿Qué es el*loop* de un agente (modelo + tools + estado)?         |   |   |   |
| 11 | Orquestación multi-paso          | ¿Cómo encadenas varias llamadas/tools para una tarea compleja?   |   |   |   |
| 12 | Embeddings / búsqueda semántica | ¿Qué es un embedding y para qué sirve buscar por significado?   |   |   |   |
| 13 | Evaluación / guardrails          | ¿Cómo sabes si el output del modelo es bueno y cómo lo limitas? |   |   |   |

---

## 9. Arquitectura de Software *(quieres estudiarla formalmente — va completa desde fundamentos)*

> Esta NO la auto-evaluamos a fondo: dijiste que la aprendiste pragmáticamente y quieres un curso formal. Aun así, **marca lo que ya hayas oído/usado** para no aburrirte con lo que ya manejas.


| # | Concepto                                                  | Pregunta de autodiagnóstico                            | ✅ | 🔄 | ❌ |
| --- | ----------------------------------------------------------- | --------------------------------------------------------- | :--: | :--: | :--: |
| 1 | Separación de capas (presentación / lógica / datos)    | ¿Sabes qué responsabilidad va en cada capa?           |   |   |   |
| 2 | Separation of concerns / acoplamiento y cohesión         | ¿Distingues código "acoplado" de "desacoplado"?       |   |   |   |
| 3 | Patrones básicos (MVC, repository, service layer)        | ¿Has usado alguno con intención?                      |   |   |   |
| 4 | Principios SOLID                                          | ¿Podrías explicar al menos la "S" y la "D"?           |   |   |   |
| 5 | Arquitectura por capas vs hexagonal / clean               | ¿Te suenan estos nombres?                              |   |   |   |
| 6 | Diseño de APIs REST (recursos, status codes, versionado) | ¿Diseñas una API REST con criterio?                   |   |   |   |
| 7 | System Design intro (escalado, caché, colas, balanceo)   | ¿Te suena cómo escala un sistema con muchos usuarios? |   |   |   |
| 8 | Manejo de errores y logging a nivel arquitectura          | ¿Tienes una estrategia, o lo resuelves ad-hoc?         |   |   |   |

---

## ✍️ Notas libres (escribe lo que quieras que el agente sepa)

> Ej.: temas que te dan miedo, cosas que te encantaría construir, algo que no entró en las tablas, en qué proyecto te gustaría aplicar esto, etc.
