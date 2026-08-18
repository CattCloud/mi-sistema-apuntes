---
bloque: 01
techs: [javascript-dom, tailwind, html-css-base]
---
# 🩺 Diagnóstico — Bloque 1: Frontend interactivo (JS + Tailwind)

> **Cómo llenarlo:** si responderías la *pregunta de autodiagnóstico* **sin dudar y sin IA**, lo dominas. Marca con una `x`:
> **✅** lo domino · **🔄** oxidado (lo recupero rápido) · **❌** no lo sé · *(vacío si no sabes clasificarlo)*.
>
> **Curado por Pareto:** solo lo que más se usa en frontend real y más pesa en empleabilidad — no toda la teoría de JS.
>
> **Ya reusado:** las marcas de **JavaScript** vienen de `diagnostico_nivel.md` (no las repitas). Lo que falta marcar es lo **nuevo** (DOM, Fetch) y **todo Tailwind + HTML/CSS base**.

---

## JavaScript — esenciales para frontend *(marcas reusadas)*


| # | Tema                              | Pregunta de autodiagnóstico                                                | ✅ | 🔄 | ❌ |
| --- | ----------------------------------- | ----------------------------------------------------------------------------- | :--: | :--: | :--: |
| 1 | Arrow functions y callbacks       | ¿Diferencia entre`function` y `=>`, y pasar una función como callback?    |   | x |   |
| 2 | Array methods (map/filter/reduce) | ¿Reescribirías un`for` que transforma una lista con `.map()`/`.reduce()`? |   | x |   |
| 3 | Destructuring y spread/rest       | ¿Clonas un objeto y le cambias 1 campo en una línea?                      |   |   | x |
| 4 | Truthy/falsy y ternarios          | ¿Qué valores son*falsy* y cómo renderizas condicional con un ternario?   |   | x |   |

## JavaScript — DOM y eventos *(nuevo: marca tú)*


| # | Tema                         | Pregunta de autodiagnóstico                                                         | ✅ | 🔄 | ❌ |
| --- | ------------------------------ | -------------------------------------------------------------------------------------- | :--: | :--: | :--: |
| 5 | Seleccionar/leer el DOM      | ¿Usas`querySelector` y lees/cambias `textContent` y `classList` sin buscar?         |   | x |   |
| 6 | Eventos (`addEventListener`) | ¿Escuchas un click y usas el`event` (target, `preventDefault`)?                     |   | x |   |
| 7 | Crear/insertar elementos     | ¿Generas elementos por JS y los insertas en el DOM (render dinámico de una lista)? |   | x |   |
| 8 | Formularios                  | ¿Lees inputs, evitas el submit por defecto y validas en cliente?                    |   | x |   |

## JavaScript — asincronía *(marcas reusadas + 1 nuevo)*


| #  | Tema                      | Pregunta de autodiagnóstico                                                | ✅ | 🔄 | ❌ |
| ---- | --------------------------- | ----------------------------------------------------------------------------- | :--: | :--: | :--: |
| 9  | Promesas                  | ¿Diferencia entre encadenar`.then()` y usar `Promise.all()`?               |   | x |   |
| 10 | `async`/`await` + errores | ¿Capturas el error de un`await` que falla con `try/catch`?                 |   | x |   |
| 11 | Fetch / consumir una API  | ¿Haces un`fetch`, lees el JSON y manejas el caso de error/estado de carga? |   | x |   |
| 12 | Event loop (intuición)   | ¿Por qué`setTimeout(fn,0)` corre DESPUÉS de una promesa ya resuelta?     |   | x |   |

## JavaScript — criterio frecuente *(marcas reusadas)*


| #  | Tema                            | Pregunta de autodiagnóstico                                                     | ✅ | 🔄 | ❌ |
| ---- | --------------------------------- | ---------------------------------------------------------------------------------- | :--: | :--: | :--: |
| 13 | Closures                        | ¿Para qué sirve un closure y dónde aparece (handlers, estado)?                |   |   | x |
| 14 | Módulos ES (`import`/`export`) | ¿Diferencia entre`export default` y `export` nombrado?                          |   | x |   |
| 15 | Debounce / throttle             | ¿Por qué y cómo limitarías un handler que dispara muchísimo (scroll/input)? |   | x |   |

---

## Tailwind CSS *(nuevo: marca todo)*

### Nivel Básico


| # | Tema                           | Pregunta de autodiagnóstico                                            | ✅ | 🔄 | ❌ |
| --- | -------------------------------- | ------------------------------------------------------------------------- | :--: | :--: | :--: |
| 1 | Utility-first (el concepto)    | ¿Por qué clases como`flex p-4` en vez de CSS en archivo aparte?       |   | x |   |
| 2 | Spacing / sizing / colors      | ¿Aplicas padding, margin y color sin buscar la escala (`p-4`, `mt-2`)? |   | x |   |
| 3 | Flexbox con Tailwind           | ¿Centras y distribuyes con`flex items-center justify-between`?         |   | x |   |
| 4 | Responsive (`sm:` `md:` `lg:`) | ¿Cambias el layout por breakpoint (`md:grid-cols-2`)?                  |   | x |   |

### Nivel Intermedio


| # | Tema                                   | Pregunta de autodiagnóstico                                | ✅ | 🔄 | ❌ |
| --- | ---------------------------------------- | ------------------------------------------------------------- | :--: | :--: | :--: |
| 5 | Grid con Tailwind                      | ¿Armas un grid responsive de cards (`grid grid-cols-...`)? |   | x |   |
| 6 | Estados (`hover:` `focus:`)            | ¿Estilizas hover/focus/disabled sin CSS extra?             |   | x |   |
| 7 | Reutilización (componentes /`@apply`) | ¿Cuándo extraer a un componente vs repetir clases?        |   | x |   |

### Nivel Avanzado


| # | Tema                        | Pregunta de autodiagnóstico                            | ✅ | 🔄 | ❌ |
| --- | ----------------------------- | --------------------------------------------------------- | :--: | :--: | :--: |
| 8 | Configurar`tailwind.config` | ¿Extiendes el*theme* con tu paleta/espaciados propios? |   | x |   |

---

## HTML / CSS base *(nuevo: marca tú — son pocos, alto uso)*


| # | Tema                  | Pregunta de autodiagnóstico                                             | ✅ | 🔄 | ❌ |
| --- | ----------------------- | -------------------------------------------------------------------------- | :--: | :--: | :--: |
| 1 | HTML semántico       | ¿Eliges`header`/`main`/`section`/`button` con criterio (no todo `div`)? |   | x |   |
| 2 | Box model             | ¿Qué incluye el box model y qué hace`box-sizing: border-box`?         | x |   |   |
| 3 | Accesibilidad básica | ¿Usas`label` para inputs y `alt` en imágenes por defecto?              |   | x |   |

---

## ✍️ Notas libres

> Qué te gustaría construir en este bloque, temas que te dan miedo, algo que no entró en las tablas.
