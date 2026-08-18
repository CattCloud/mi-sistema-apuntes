---
origen: docx
tier: referencia
formato: cheat-sheet
migrado: 2026-06-27
---

# 🐞 Tailwind — Cheat Sheet

> **Referencia rápida de clases de Tailwind**, convertida de tu `Tailwind_CHEETSHEET.docx`. Pensada para *consultar y copiar clases*, no para aprender desde cero (ya lo dominas). Cada tabla lleva su título descriptivo.
>
> **Recordatorios base:** Tailwind es **utility-first** (compones el diseño con clases en el HTML) y **mobile-first** (sin prefijo = móvil; `sm:`/`md:`/`lg:`… aplican *desde* ese breakpoint hacia arriba).
>
> *Las tablas usan HTML — se renderizan en la vista previa de Markdown (VS Code, GitHub, Obsidian).*

## 📑 Índice

1. [Breakpoints y modificadores de estado](#cat-breakpoints)
2. [Flexbox](#cat-flexbox)
3. [Espaciado (padding, margin, gap)](#cat-espaciado)
4. [Dimensionamiento (width, height, min/max)](#cat-dimensionamiento)
5. [Texto (tamaño, peso, alineación, etc.)](#cat-texto)
6. [Colores (texto, fondo)](#cat-colores)
7. [Border y Rounded](#cat-border)
8. [Ring](#cat-ring)
9. [Display y Posicionamiento](#cat-display)
10. [Grid](#cat-grid)
11. [Efectos (sombra, opacidad, etc.)](#cat-efectos)
12. [Animaciones (spin, pulse, bounce…)](#cat-animaciones)
13. [Posición de imágenes/videos (object-fit)](#cat-imagenes)
14. [Alineación del contenido (contenedor grid)](#cat-align-contenido)
15. [Alineación dentro de las celdas](#cat-align-celdas)
16. [Alineación individual por ítem](#cat-align-item)

---

<a id="cat-breakpoints"></a>

## BREAKPOINTS

<table style="width:59%;">
<colgroup>
<col style="width: 11%" />
<col style="width: 11%" />
<col style="width: 36%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><strong>Tailwind es mobile-first</strong>: Define el diseñor para celulares y luego usa breakpoints para adaptarse a otras pantallas</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Sin prefijo</strong></td>
<td>&lt;640px</td>
<td>Celulares</td>
</tr>
<tr>
<td><strong>sm:</strong></td>
<td>&gt;= 640px</td>
<td>Celulares horizontal- Tablets pequeñas</td>
</tr>
<tr>
<td><strong>md:</strong></td>
<td>&gt;= 768px</td>
<td>Tablets estandar</td>
</tr>
<tr>
<td><strong>lg:</strong></td>
<td>&gt;= 1024px</td>
<td>Laptops - Monitores Estandar</td>
</tr>
<tr>
<td><strong>xl:</strong></td>
<td>&gt;= 1280px</td>
<td>Monitores grandes</td>
</tr>
<tr>
<td><strong>2xl:</strong></td>
<td>&gt;= 1536px</td>
<td>Monitores grandes</td>
</tr>
</tbody>
</table>

<table style="width:60%;">
<colgroup>
<col style="width: 16%" />
<col style="width: 43%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Modificadores de estado</strong>:te permiten aplicar estilos condicionales según la interacción del usuario.</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>hover:</strong></td>
<td>Cuando el cursor pasa sobre el elemento</td>
</tr>
<tr>
<td><strong>focus:</strong></td>
<td>Cuando el elemento recibe foco (teclado o clic)</td>
</tr>
<tr>
<td><strong>focus-visible:</strong></td>
<td>Solo cuando el foco es visible (por teclado, no clic)</td>
</tr>
<tr>
<td><strong>active:</strong></td>
<td>Mientras el elemento está siendo presionado</td>
</tr>
<tr>
<td><strong>visited:</strong></td>
<td>Cuando un enlace ya fue visitado</td>
</tr>
<tr>
<td><strong>disabled:</strong></td>
<td>Cuando el elemento está deshabilitado</td>
</tr>
<tr>
<td><strong>checked:</strong></td>
<td>Cuando un checkbox o radio está marcado</td>
</tr>
</tbody>
</table>


<a id="cat-flexbox"></a>

## CLASES FLEX BOX

<table style="width:55%;">
<colgroup>
<col style="width: 10%" />
<col style="width: 44%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Activar Flex box</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>flex</strong></td>
<td>Convierte elemento en contenedor flex</td>
</tr>
<tr>
<td><strong>inline-flex</strong></td>
<td>Convierte elemento en contenedor flex en linea<br />
Flexbox que fluye dentro del texto</td>
</tr>
</tbody>
</table>

<table style="width:55%;">
<colgroup>
<col style="width: 16%" />
<col style="width: 38%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>flex-direction</strong> : Define dirección del eje principal</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>flex-row</strong></td>
<td>Horizontal izquierda → derecha <strong>(default)</strong></td>
</tr>
<tr>
<td><strong>flex-row-reverse</strong></td>
<td>Horizontal derecha → izquierda</td>
</tr>
<tr>
<td><strong>flex-col</strong></td>
<td>Vertical arriba → abajo</td>
</tr>
<tr>
<td><strong>flex-col-reverse</strong></td>
<td>Vertical abajo → arriba</td>
</tr>
</tbody>
</table>

<table style="width:55%;">
<colgroup>
<col style="width: 17%" />
<col style="width: 37%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Ajuste de elementos</strong> : los elementos dentro del contenedor se ajustan en varias líneas cuando no caben o en una sola</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>flex-nowrap</strong></td>
<td>Sin salto de línea <strong>(default)</strong></td>
</tr>
<tr>
<td><strong>flex-wrap</strong></td>
<td>Permite que bajen a otra línea si no hay espacio.</td>
</tr>
<tr>
<td><strong>flex-wrap-reverse</strong></td>
<td>flex-wrap en sentido inverso</td>
</tr>
</tbody>
</table>

<table style="width:55%;">
<colgroup>
<col style="width: 10%" />
<col style="width: 44%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Espaciado (gap) :</strong> Define el espacio entre elementos flexibles<br />
<strong>Util en Flex y Grid</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>gap-{n}</strong></td>
<td>Espaciado uniforme (horizontal y vertical)</td>
</tr>
<tr>
<td><strong>gap-x-{n}</strong></td>
<td>Solo espaciado horizontal</td>
</tr>
<tr>
<td><strong>gap-y-{n}</strong></td>
<td>Solo espaciado vertical</td>
</tr>
</tbody>
</table>

<table style="width:55%;">
<colgroup>
<col style="width: 18%" />
<col style="width: 36%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>justify-content</strong> :Alineación eje principal del contenido</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>justify-start</strong></td>
<td>Al inicio del eje (izquierda)</td>
</tr>
<tr>
<td><strong>justify-center</strong></td>
<td>Centrado(centro del eje)</td>
</tr>
<tr>
<td><strong>justify-end</strong></td>
<td>Al final del eje (derecha)</td>
</tr>
<tr>
<td><strong>justify-between</strong></td>
<td>Espacio solo entre elementos</td>
</tr>
<tr>
<td><strong>justify-around</strong></td>
<td>Espacio alrededor (menos entre elementos)</td>
</tr>
<tr>
<td><strong>justify-evenly</strong></td>
<td>Espacio completamente uniforme</td>
</tr>
</tbody>
</table>

<table style="width:55%;">
<colgroup>
<col style="width: 18%" />
<col style="width: 36%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>align-items</strong> : Alineación del eje transversal del contenido</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>items-stretch</strong></td>
<td>Estira elementos <strong>(default)</strong></td>
</tr>
<tr>
<td><strong>items-start</strong></td>
<td>Alinea arriba del eje transversal</td>
</tr>
<tr>
<td><strong>items-center</strong></td>
<td>Centrado(centro del eje transversal)</td>
</tr>
<tr>
<td><strong>items-end</strong></td>
<td>Alinea abajo del eje transversal</td>
</tr>
<tr>
<td><strong>items-baseline</strong></td>
<td>Alinea según la línea base del texto</td>
</tr>
</tbody>
</table>

<table style="width:55%;">
<colgroup>
<col style="width: 16%" />
<col style="width: 38%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>align-self:</strong> Alineación individual del ítem respecto al <strong>eje transversal</strong>, aplicado individualmete a un elemento Flex</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>self-auto</strong></td>
<td>Hereda del padre <strong>(default)</strong></td>
</tr>
<tr>
<td><strong>self-start</strong></td>
<td>Individual al inicio del eje</td>
</tr>
<tr>
<td><strong>self-center</strong></td>
<td>Individual centrado</td>
</tr>
<tr>
<td><strong>self-end</strong></td>
<td>Individual al final del eje</td>
</tr>
<tr>
<td><strong>self-stretch</strong></td>
<td>Individual estirado por todo el eje</td>
</tr>
<tr>
<td><strong>self-baseline</strong></td>
<td>Según la línea base del texto</td>
</tr>
</tbody>
</table>

<table style="width:55%;">
<colgroup>
<col style="width: 17%" />
<col style="width: 37%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>align-content</strong> : Alineación del contenido con el eje transversal cuando el contenedor es multilíneal</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>content-start</strong></td>
<td>Agrupa líneas al inicio</td>
</tr>
<tr>
<td><strong>content-center</strong></td>
<td>Agrupa líneas al centro</td>
</tr>
<tr>
<td><strong>content-end</strong></td>
<td>Agrupa líneas al final</td>
</tr>
<tr>
<td><strong>content-between</strong></td>
<td>Espacio entre líneas</td>
</tr>
<tr>
<td><strong>content-around</strong></td>
<td>Espacio alrededor de cada línea</td>
</tr>
<tr>
<td><strong>content-evenly</strong></td>
<td>Espacio uniforme entre y alrededor</td>
</tr>
</tbody>
</table>

<table style="width:55%;">
<colgroup>
<col style="width: 12%" />
<col style="width: 42%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>order</strong>: permite cambiar la posición de un elemento dentro del contenedor flex</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>order-first</strong></td>
<td>Al inicio (order: -9999)</td>
</tr>
<tr>
<td><strong>order-last</strong></td>
<td>Al final (order: 9999)</td>
</tr>
<tr>
<td><strong>order-none</strong></td>
<td>Orden natural (order: 0) <strong>(Todos por default)</strong></td>
</tr>
<tr>
<td><strong>order-{n}</strong></td>
<td>Orden personalizado (1 a 12)</td>
</tr>
</tbody>
</table>


### flex-basis – Tamaño inicial de un elemento flexible

- Define el **tamaño base** de un ítem flexible **antes de aplicar flex-grow o flex-shrink**.

- Depende del eje principal:

  - flex-row → **flex-basis** actúa como **width**

  - flex-col → **flex-basis** actúa como **height**

<!-- -->

- flex-basis: auto → determinado por width o height

- flex-basis: X → **ignora** dimensiones y usa solo ese valor

| **basis-auto**     | Tamaño del contenido **(default)** |
|--------------------|------------------------------------|
| **basis-0**        | Sin tamaño inicial                 |
| **basis-full**     | 100% del contenedor                |
| **basis-1/2…1/12** | Fracciones (1/2, 1/3, 3/4, etc.)   |
| **basis-{n}**      | Basado en escala spacing (1–96)    |


### flex-grow – Crecimiento proporcional en espacio libre

- Determina **cuánto puede crecer** un ítem respecto a los demás, usando el **espacio sobrante** del contenedor Flex.

- Funciona cuando hay espacio libre **y flex-basis definido (idealmente 0)**

<!-- -->

- Ejemplo: flex-grow: 2 crece el doble que flex-grow: 1

- Si todos tienen flex-grow: 1 → comparten el espacio por igual

| **grow**            | El ítem crece para llenar el espacio sobrante       |
|---------------------|-----------------------------------------------------|
| **grow-0**          | El ítem no crece, aunque haya espacio **(default)** |
| **grow-\[numero\]** | Proporción personalizada de crecimiento             |

------------------------------------------------------------------------

Si quieres lo conectamos ahora con flex-shrink para cerrar el trío de flujo flexible. También puedo ayudarte a hacer la tabla que compare los tres (basis, grow, shrink) como preset editorial 🔧. ¿Te gustaría?


### flex-shrink – Encogimiento proporcional cuando falta espacio

- Controla cuánto puede **reducirse** un ítem cuando hay **desbordamiento** o falta de espacio.

- Funciona solo si el contenedor está **lleno** y los ítems compiten por espacio.

<!-- -->

- Ejemplo: flex-shrink: 2 se encoge el doble que flex-shrink: 1

- Si todos tienen flex-shrink: 1 → se encogen por igual

| **shrink**       | El ítem se puede encoger si es necesario**(default)** |
|------------------|-------------------------------------------------------|
| **shrink-0**     | El ítem no se encoge, conserva su tamaño              |
| **shrink-\[x\]** | Encogimiento proporcional personalizado               |

<table style="width:55%;">
<colgroup>
<col style="width: 6%" />
<col style="width: 48%" />
</colgroup>
<thead>
<tr>
<th colspan="2">Para que un ítem <strong>se adapte automáticamente</strong> al contenedor, <strong>expandiéndose y reduciéndose según necesidad</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>flex-1</strong></td>
<td><p>Crece y se encoge (flex: 1 1 0%)<br />
- El item crece para llenar el espacion <strong>grow:1</strong></p>
<p>- Tambien se encoge si es necesario <strong>shrink:1</strong></p>
<p>- Su tamaño inicial es 0 <strong>basis:0</strong>, asi que depende del espacio del contenedor</p></td>
</tr>
</tbody>
</table>

<a id="cat-espaciado"></a>

## CLASES ESPACIADO

<table style="width:55%;">
<colgroup>
<col style="width: 5%" />
<col style="width: 10%" />
<col style="width: 39%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><strong>Escala Numérica de Tailwind CSS<br />
</strong>Fórmula base: valor * 0.25rem (escala basada en rem)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>0</strong></td>
<td>0px</td>
<td>0rem</td>
</tr>
<tr>
<td><strong>1</strong></td>
<td>4px</td>
<td>0.25rem</td>
</tr>
<tr>
<td><strong>2</strong></td>
<td>8px</td>
<td>0.5rem</td>
</tr>
<tr>
<td><strong>3</strong></td>
<td>12px</td>
<td>0.75rem</td>
</tr>
<tr>
<td><strong>n</strong></td>
<td><strong>n*4px</strong></td>
<td><strong>n * 0.25 rem</strong></td>
</tr>
<tr>
<td><strong>56</strong></td>
<td>224px</td>
<td>14rem</td>
</tr>
<tr>
<td><strong>64</strong></td>
<td>256px</td>
<td>16rem</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 11%" />
<col style="width: 23%" />
<col style="width: 20%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><strong>Margin (m-*)<br />
</strong>{ <strong>valor</strong> } → Valor basado en la <strong>escala numérica de Tailwind</strong> o valores personalizados</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>m-{valor}</strong></td>
<td>Margen en todos los lados</td>
<td>m-4 → margin: 16px;</td>
</tr>
<tr>
<td><strong>mt-{valor}</strong></td>
<td>Margen superior (top)</td>
<td>mt-6 → margin-top: 24px;</td>
</tr>
<tr>
<td><strong>mr-{valor}</strong></td>
<td>Margen derecho (right)</td>
<td>mr-4 → margin-right: 16px;</td>
</tr>
<tr>
<td><strong>mb-{valor}</strong></td>
<td>Margen inferior (bottom)</td>
<td>mb-8 → margin-bottom: 32px;</td>
</tr>
<tr>
<td><strong>ml-{valor}</strong></td>
<td>Margen izquierdo (left)</td>
<td>ml-2 → margin-left: 8px;</td>
</tr>
<tr>
<td><strong>mx-{valor}</strong></td>
<td>Margen horizontal (left &amp; right)</td>
<td>mx-8 → margin-left/right: 32px;</td>
</tr>
<tr>
<td><strong>my-{valor}</strong></td>
<td>Margen vertical (top &amp; bottom)</td>
<td>my-4 → margin-top/bottom: 16px;</td>
</tr>
<tr>
<td><strong>m-auto</strong></td>
<td>Margen automático (<strong>centrado</strong>)</td>
<td>m-auto → margin: auto;</td>
</tr>
<tr>
<td><strong>m-[valor]</strong></td>
<td>Margen con <strong>valores personalizados</strong></td>
<td>m-[10px] → margin: 10px;</td>
</tr>
</tbody>
</table>

<table style="width:55%;">
<colgroup>
<col style="width: 10%" />
<col style="width: 24%" />
<col style="width: 20%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><strong>Padding (p-*)<br />
</strong>{ <strong>valor</strong> } → Valor basado en la <strong>escala numérica de Tailwind</strong> o valores personalizados</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>p-{valor}</strong></td>
<td>Padding en todos los lados</td>
<td>p-4 → padding: 16px;</td>
</tr>
<tr>
<td><strong>pt-{valor}</strong></td>
<td>Padding superior (top)</td>
<td>pt-6 → padding-top: 24px;</td>
</tr>
<tr>
<td><strong>pr-{valor}</strong></td>
<td>Padding derecho (right)</td>
<td>pr-4 → padding-right: 16px;</td>
</tr>
<tr>
<td><strong>pb-{valor}</strong></td>
<td>Padding inferior (bottom)</td>
<td>pb-8 → padding-bottom: 32px;</td>
</tr>
<tr>
<td><strong>pl-{valor}</strong></td>
<td>Padding izquierdo (left)</td>
<td>pl-2 → padding-left: 8px;</td>
</tr>
<tr>
<td><strong>px-{valor}</strong></td>
<td>Padding horizontal (left &amp; right)</td>
<td>px-8 → padding-left/right: 32px;</td>
</tr>
<tr>
<td><strong>py-{valor}</strong></td>
<td>Padding vertical (top &amp; bottom)</td>
<td>py-4 → padding-top/bottom: 16px;</td>
</tr>
<tr>
<td><strong>p-[valor]</strong></td>
<td>Padding con valores personalizados</td>
<td>p-[10px] → padding: 10px;</td>
</tr>
</tbody>
</table>

<table style="width:55%;">
<colgroup>
<col style="width: 15%" />
<col style="width: 39%" />
</colgroup>
<thead>
<tr>
<th colspan="2">Estas clases <strong>agregan margen entre elementos hermanos<br />
</strong>{valor} → Valor basado en la <strong>escala numérica de Tailwind</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>space-x-{valor}</strong></td>
<td>Espacio horizontal entre elementos</td>
</tr>
<tr>
<td><strong>space-y-{valor}</strong></td>
<td>Espacio vertical entre elementos</td>
</tr>
</tbody>
</table>

<a id="cat-dimensionamiento"></a>

## CLASES DIMENSIONAMIENTO

<table style="width:57%;">
<colgroup>
<col style="width: 14%" />
<col style="width: 23%" />
<col style="width: 18%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><strong>WIDTH (w-*) – Ancho del Elemento</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>w-auto</strong></td>
<td>ancho flexible según contenido<strong>(default)</strong></td>
<td>width: auto</td>
</tr>
<tr>
<td><strong>w-full</strong></td>
<td>100% del contenedor padre</td>
<td>width: 100%</td>
</tr>
<tr>
<td><strong>w-screen</strong></td>
<td>100% del viewport</td>
<td>width: 100vw</td>
</tr>
<tr>
<td><strong>w-{num}</strong></td>
<td>Escala Tailwind (ej. w-4)</td>
<td>width: 1rem (4 × 0.25rem)</td>
</tr>
<tr>
<td><strong>w-1/2, w-1/3...</strong></td>
<td>Fracciones del contenedor</td>
<td>width: 50%, 33.33%...</td>
</tr>
<tr>
<td><strong>w-[valor]</strong></td>
<td>Valor personalizado</td>
<td>w-[300px] → width: 300px</td>
</tr>
</tbody>
</table>

<table style="width:57%;">
<colgroup>
<col style="width: 13%" />
<col style="width: 25%" />
<col style="width: 17%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><strong>HEIGHT (h-*) – Altura del Elemento</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>h-auto</strong></td>
<td>Altura flexible según contenido <strong>(default)</strong></td>
<td>height: auto</td>
</tr>
<tr>
<td><strong>h-full</strong></td>
<td>100% del contenedor padre</td>
<td>height: 100%</td>
</tr>
<tr>
<td><strong>h-screen</strong></td>
<td>100% del viewport</td>
<td>height: 100vh</td>
</tr>
<tr>
<td><strong>h-dvh</strong></td>
<td>Viewport dinámico (ideal móviles)</td>
<td>height: 100dvh</td>
</tr>
<tr>
<td><strong>h-{num}</strong></td>
<td>Escala Tailwind (ej. h-4)</td>
<td>height: 1rem (4 × 0.25rem)</td>
</tr>
<tr>
<td><strong>h-1/2, h-1/3...</strong></td>
<td>Fracciones del contenedor</td>
<td>height: 50%, 33.33%...</td>
</tr>
<tr>
<td><strong>h-[valor]</strong></td>
<td>Valor personalizado</td>
<td>h-[300px] → height: 300px</td>
</tr>
</tbody>
</table>

<table style="width:57%;">
<colgroup>
<col style="width: 11%" />
<col style="width: 21%" />
<col style="width: 23%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><strong>size:</strong> Permite definir width y height simultáneamente.</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>size-auto</strong></td>
<td>Ancho y alto automáticos</td>
<td>width: auto; height: auto</td>
</tr>
<tr>
<td><strong>size-full</strong></td>
<td>100% en ambas dimensiones</td>
<td>width: 100%; height: 100%</td>
</tr>
<tr>
<td><strong>size-{num}</strong></td>
<td>Mismo valor en w y h</td>
<td>Basado en escala numérica Tailwind</td>
</tr>
<tr>
<td><strong>size-[valor]</strong></td>
<td>Valor personalizado para ambas</td>
<td>size-[200px] → 200px × 200px</td>
</tr>
</tbody>
</table>

<table style="width:58%;">
<colgroup>
<col style="width: 17%" />
<col style="width: 40%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>min-width :</strong> define el ancho mínimo que puede tener un elemento.</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>min-w-0</strong></td>
<td>Sin ancho mínimo <strong>(default)</strong></td>
</tr>
<tr>
<td><strong>min-w-full</strong></td>
<td>100% del contenedor padre</td>
</tr>
<tr>
<td><strong>min-w-{num}</strong></td>
<td>Escala Tailwind (num × 0.25rem)</td>
</tr>
<tr>
<td><strong>min-w-1/2</strong></td>
<td>50% del contenedor</td>
</tr>
<tr>
<td><strong>min-w-xs, sm…</strong></td>
<td>Escala del container (ver tabla abajo)</td>
</tr>
<tr>
<td><strong>min-w-screen</strong></td>
<td>Mínimo igual al viewport (100vw)</td>
</tr>
<tr>
<td><strong>min-w-[valor]</strong></td>
<td>Personalizado</td>
</tr>
</tbody>
</table>

<table style="width:58%;">
<colgroup>
<col style="width: 17%" />
<col style="width: 40%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>max-width:</strong> define el ancho máximo de un elemento, evitando que se expanda más allá de un valor específico.</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>max-w-none</strong></td>
<td>Sin límite de ancho <strong>(default)</strong></td>
</tr>
<tr>
<td><strong>max-w-full</strong></td>
<td>100% del contenedor padre</td>
</tr>
<tr>
<td><strong>max-w-{num}</strong></td>
<td>Escala Tailwind (num × 0.25rem)</td>
</tr>
<tr>
<td><strong>max-w-1/2</strong></td>
<td>50% del contenedor</td>
</tr>
<tr>
<td><strong>max-w-xs, sm…</strong></td>
<td>Escala del container (ver tabla abajo)</td>
</tr>
<tr>
<td><strong>max-w-screen</strong></td>
<td>Máximo igual al viewport (100vh)</td>
</tr>
<tr>
<td><strong>max-w-[valor]</strong></td>
<td>Personalizado</td>
</tr>
</tbody>
</table>

<table style="width:58%;">
<colgroup>
<col style="width: 13%" />
<col style="width: 44%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Clases min-max width según el contenido</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>min-w-max</strong></td>
<td>Obliga al elemento a tener el ancho justo para mostrar <strong>todo el contenido sin romper la línea</strong>, aunque eso lo haga más ancho de lo esperado.<br />
Fuerza a mantener el contenido <strong>en una sola línea</strong></td>
</tr>
<tr>
<td><strong>max-w-max</strong></td>
<td>Asegura que el elemento tenga suficiente ancho para mostrar <strong>todo su contenido sin cortar</strong>, pero sin permitir que crezca más allá de eso.</td>
</tr>
<tr>
<td><strong>min-w-fit</strong></td>
<td>Le da al elemento un ancho mínimo justo para que su contenido quepa bien, y si hay espacio extra, puede crecer para aprovecharlo.</td>
</tr>
<tr>
<td><strong>max-w-fit</strong></td>
<td>Ajusta el ancho máximo justo al tamaño del contenido, sin pasarse ni desbordarse.</td>
</tr>
</tbody>
</table>

<table style="width:58%;">
<colgroup>
<col style="width: 16%" />
<col style="width: 41%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>min-height</strong> define el mínimo alto que un elemento puede tener.</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>min-h-0</strong></td>
<td>Sin altura mínima<strong>(default)</strong></td>
</tr>
<tr>
<td><strong>min-h-full</strong></td>
<td>Mínimo 100% del contenedor padre</td>
</tr>
<tr>
<td><strong>min-h-screen</strong></td>
<td>Mínimo alto del viewport completo</td>
</tr>
<tr>
<td><strong>min-h-{num}</strong></td>
<td>Según escala Tailwind (ej. min-h-64)</td>
</tr>
<tr>
<td><strong>min-h-1/2</strong></td>
<td>50% del ancho del contenedor</td>
</tr>
<tr>
<td><strong>min-h-min</strong></td>
<td>Ajustado al contenido mínimo</td>
</tr>
<tr>
<td><strong>min-h-max</strong></td>
<td>Ajustado al contenido máximo</td>
</tr>
<tr>
<td><strong>min-h-fit</strong></td>
<td>Adaptable al contenido disponible</td>
</tr>
<tr>
<td><strong>min-h-[valor]</strong></td>
<td>Valor personalizado</td>
</tr>
</tbody>
</table>

<table style="width:58%;">
<colgroup>
<col style="width: 16%" />
<col style="width: 41%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>max-height</strong> define el máximo alto que puede tener un elemento</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>max-h-none</strong></td>
<td>Sin límite de altura<strong>(default)</strong></td>
</tr>
<tr>
<td><strong>max-h-full</strong></td>
<td>Máximo 100% del contenedor padre</td>
</tr>
<tr>
<td><strong>max-h-screen</strong></td>
<td>Máximo alto del viewport</td>
</tr>
<tr>
<td><strong>max-h-{num}</strong></td>
<td>Según escala Tailwind (ej. max-h-64)</td>
</tr>
<tr>
<td><strong>max-h-1/2</strong></td>
<td>50% del ancho del contenedor</td>
</tr>
<tr>
<td><strong>max-h-min</strong></td>
<td>Ajustado al contenido mínimo</td>
</tr>
<tr>
<td><strong>max-h-max</strong></td>
<td>Ajustado al contenido máximo</td>
</tr>
<tr>
<td><strong>max-h-fit</strong></td>
<td>Adaptable al contenido disponible</td>
</tr>
<tr>
<td><strong>max-h-[valor]</strong></td>
<td>Valor personalizado</td>
</tr>
</tbody>
</table>

<table style="width:58%;">
<colgroup>
<col style="width: 13%" />
<col style="width: 44%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Clases min-max height según el contenido</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>max-h-max</strong></td>
<td>Limita la altura máxima justo al tamaño necesario para mostrar el contenido completo. No lo deja crecer más allá.</td>
</tr>
<tr>
<td><strong>min-h-fit</strong></td>
<td>Da al elemento la altura mínima necesaria para que el contenido encaje, pero <strong>puede crecer</strong> si hay espacio disponible</td>
</tr>
<tr>
<td><strong>max-h-fit</strong></td>
<td>Ajusta la altura máxima justo al tamaño del contenido, sin desbordes ni exceso.</td>
</tr>
</tbody>
</table>

<a id="cat-texto"></a>

## CLASES TEXTO

<table style="width:56%;">
<colgroup>
<col style="width: 11%" />
<col style="width: 9%" />
<col style="width: 8%" />
<col style="width: 26%" />
</colgroup>
<thead>
<tr>
<th colspan="4"><strong>font-size</strong> : Tamaño de texto</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>text-xs</strong></td>
<td>0.75rem</td>
<td>12px</td>
<td>Texto muy pequeño (labels, captions)</td>
</tr>
<tr>
<td><strong>text-sm</strong></td>
<td>0.875rem</td>
<td>14px</td>
<td>Texto pequeño (body pequeño)</td>
</tr>
<tr>
<td><strong>text-base</strong></td>
<td>1rem</td>
<td>16px</td>
<td>Texto base (body estándar)</td>
</tr>
<tr>
<td><strong>text-lg</strong></td>
<td>1.125rem</td>
<td>18px</td>
<td>Texto grande (subtítulos)</td>
</tr>
<tr>
<td><strong>text-xl</strong></td>
<td>1.25rem</td>
<td>20px</td>
<td>Texto extra grande (títulos H4)</td>
</tr>
<tr>
<td><strong>text-2xl</strong></td>
<td>1.5rem</td>
<td>24px</td>
<td>Títulos H3</td>
</tr>
<tr>
<td><strong>text-3xl</strong></td>
<td>1.875rem</td>
<td>30px</td>
<td>Títulos H2</td>
</tr>
<tr>
<td><strong>text-4xl</strong></td>
<td>2.25rem</td>
<td>36px</td>
<td>Títulos H1</td>
</tr>
<tr>
<td><strong>text-5xl</strong></td>
<td>3rem</td>
<td>48px</td>
<td>Títulos hero</td>
</tr>
<tr>
<td><strong>text-6xl</strong></td>
<td>3.75rem</td>
<td>60px</td>
<td>Títulos principales grandes</td>
</tr>
<tr>
<td><strong>text-[valor]</strong></td>
<td>custom</td>
<td>custom</td>
<td>Valor personalizado: text-[22px]</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 14%" />
<col style="width: 6%" />
<col style="width: 35%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><strong>font-weight</strong> : Grosor de texto/tipo de negrita</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>font-thin</strong></td>
<td>100</td>
<td>Texto muy delgado</td>
</tr>
<tr>
<td><strong>font-light</strong></td>
<td>300</td>
<td>Texto ligero</td>
</tr>
<tr>
<td><strong>font-normal</strong></td>
<td>400</td>
<td>Peso normal (valor por defecto)</td>
</tr>
<tr>
<td><strong>font-medium</strong></td>
<td>500</td>
<td>Semi-destacado</td>
</tr>
<tr>
<td><strong>font-semibold</strong></td>
<td>600</td>
<td>Semi-negrita (subtítulos)</td>
</tr>
<tr>
<td><strong>font-bold</strong></td>
<td>700</td>
<td><strong>Negrita</strong> (títulos, énfasis)</td>
</tr>
<tr>
<td><strong>font-extrabold</strong></td>
<td>800</td>
<td>Extra negrita</td>
</tr>
<tr>
<td><strong>font-black</strong></td>
<td>900</td>
<td>Grosor máximo</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 11%" />
<col style="width: 44%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>text-align</strong> : Alineación horizontal del texto dentro de un elemento</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>text-left</strong></td>
<td>Alineado a la izquierda (valor por defecto)</td>
</tr>
<tr>
<td><strong>text-center</strong></td>
<td>Centrado horizontalmente</td>
</tr>
<tr>
<td><strong>text-right</strong></td>
<td>Alineado a la derecha</td>
</tr>
<tr>
<td><strong>text-justify</strong></td>
<td>Justificado (espaciado uniforme)</td>
</tr>
<tr>
<td><strong>text-start</strong></td>
<td>Inicio lógico (soporte LTR/RTL)</td>
</tr>
<tr>
<td><strong>text-end</strong></td>
<td>Final lógico (soporte LTR/RTL)</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 16%" />
<col style="width: 8%" />
<col style="width: 31%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><strong>leading:</strong> Espacio vertical entre líneas dentro de un mismo bloque de texto de un elemento</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>leading-none</strong></td>
<td>1</td>
<td>Sin espacio adicional (útil en títulos grandes)</td>
</tr>
<tr>
<td><strong>leading-tight</strong></td>
<td>1.25</td>
<td>Interlineado ajustado</td>
</tr>
<tr>
<td><strong>leading-snug</strong></td>
<td>1.375</td>
<td>Interlineado ceñido</td>
</tr>
<tr>
<td><strong>leading-normal</strong></td>
<td>1.5</td>
<td>Valor por defecto <strong>(default)</strong></td>
</tr>
<tr>
<td><strong>leading-relaxed</strong></td>
<td>1.625</td>
<td>Interlineado relajado</td>
</tr>
<tr>
<td><strong>leading-loose</strong></td>
<td>2</td>
<td>Interlineado muy amplio</td>
</tr>
<tr>
<td><strong>leading-{num}</strong></td>
<td>variable</td>
<td>Escala interna: leading-6, leading-8, etc.</td>
</tr>
<tr>
<td><strong>leading-[valor]</strong></td>
<td>custom</td>
<td>Valor personalizado: leading-[1.75]</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 13%" />
<col style="width: 43%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>text-transform (mayúsculas y formato)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>uppercase</strong></td>
<td>Convierte todo a MAYÚSCULAS (botones, encabezados)</td>
</tr>
<tr>
<td><strong>lowercase</strong></td>
<td>Convierte todo a minúsculas (etiquetas o branding)</td>
</tr>
<tr>
<td><strong>capitalize</strong></td>
<td>Pone en mayúscula la primera letra de cada palabra</td>
</tr>
<tr>
<td><strong>normal-case</strong></td>
<td>Elimina cualquier transformación previa</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 16%" />
<col style="width: 9%" />
<col style="width: 30%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><strong>letter-spacing (espaciado entre letras)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>tracking-tighter</strong></td>
<td>-0.05em</td>
<td>Letras más juntas (logos, títulos compactos)</td>
</tr>
<tr>
<td><strong>tracking-tight</strong></td>
<td>-0.025em</td>
<td>Espaciado reducido (textos comprimidos)</td>
</tr>
<tr>
<td><strong>tracking-normal</strong></td>
<td>0</td>
<td>Espaciado por defecto<strong>(default)</strong></td>
</tr>
<tr>
<td><strong>tracking-wide</strong></td>
<td>0.025em</td>
<td>Letras ligeramente más separadas (subtítulos)</td>
</tr>
<tr>
<td><strong>tracking-wider</strong></td>
<td>0.05em</td>
<td>Espaciado mayor (hero titles, botones destacados)</td>
</tr>
<tr>
<td><strong>tracking-widest</strong></td>
<td>0.1em</td>
<td>Espaciado amplio (branding, headers llamativos)</td>
</tr>
<tr>
<td><strong>tracking-[valor]</strong></td>
<td>custom</td>
<td>Espaciado personalizado: tracking-[0.15em]</td>
</tr>
</tbody>
</table>

<a id="cat-colores"></a>

## CLASES COLORES

<table style="width:55%;">
<colgroup>
<col style="width: 24%" />
<col style="width: 30%" />
</colgroup>
<thead>
<tr>
<th><p><strong>bg-{color}-{tono}</strong></p>
<p><strong>bg-{ colorPersonalizado }</strong></p></th>
<th>Define el color del fondo del elemento</th>
</tr>
</thead>
<tbody>
<tr>
<td><p><strong>text-{color}-{tono}</strong></p>
<p><strong>text-{colorPersonalizado}</strong></p></td>
<td>Define el color del texto del elemento</td>
</tr>
</tbody>
</table>

<table style="width:55%;">
<colgroup>
<col style="width: 30%" />
<col style="width: 24%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Paleta base de colores en Tailwind<br />
Tonos</strong> disponibles <strong>(50 a 950</strong>) : 50,100,200,300,…</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>slate, gray, zinc, neutral, stone</strong></td>
<td>Neutros para fondos, bordes, texto</td>
</tr>
<tr>
<td><strong>red, orange, amber, yellow, lime</strong></td>
<td>Cálidos para alertas, énfasis, energía</td>
</tr>
<tr>
<td><strong>green, emerald, teal, cyan</strong></td>
<td>Verdes y azules verdosos para éxito, calma</td>
</tr>
<tr>
<td><strong>sky, blue, indigo</strong></td>
<td>Azules para confianza, enlaces, estructura</td>
</tr>
<tr>
<td><strong>violet, purple, fuchsia, pink, rose</strong></td>
<td>Fríos y expresivos para branding, acento</td>
</tr>
</tbody>
</table>

<a id="cat-border"></a>

## CLASES BORDER - ROUNDED

<table style="width:55%;">
<colgroup>
<col style="width: 9%" />
<col style="width: 19%" />
<col style="width: 26%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><strong>border :</strong> Aplican un borde a uno o más lados del elemento.</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>border</strong></td>
<td>Todos los lados</td>
<td>border-width: 1px</td>
</tr>
<tr>
<td><strong>border-t</strong></td>
<td>Arriba (top)</td>
<td>border-top-width: 1px</td>
</tr>
<tr>
<td><strong>border-r</strong></td>
<td>Derecha (right)</td>
<td>border-right-width: 1px</td>
</tr>
<tr>
<td><strong>border-b</strong></td>
<td>Abajo (bottom)</td>
<td>border-bottom-width: 1px</td>
</tr>
<tr>
<td><strong>border-l</strong></td>
<td>Izquierda (left)</td>
<td>border-left-width: 1px</td>
</tr>
<tr>
<td><strong>border-x</strong></td>
<td>Horizontal (left/right)</td>
<td>border-left/right-width: 1px</td>
</tr>
<tr>
<td><strong>border-y</strong></td>
<td>Vertical (top/bottom)</td>
<td>border-top/bottom-width: 1px</td>
</tr>
</tbody>
</table>

<table style="width:55%;">
<colgroup>
<col style="width: 14%" />
<col style="width: 13%" />
<col style="width: 27%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><strong>border-width :</strong>Define cuán grueso será el borde.</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>border-0</strong></td>
<td>0px</td>
<td>Sin borde</td>
</tr>
<tr>
<td><strong>border</strong></td>
<td>1px <strong>(default)</strong></td>
<td>Borde fino</td>
</tr>
<tr>
<td><strong>border-2</strong></td>
<td>2px</td>
<td>Borde medio</td>
</tr>
<tr>
<td><strong>border-4</strong></td>
<td>4px</td>
<td>Borde grueso</td>
</tr>
<tr>
<td><strong>border-8</strong></td>
<td>8px</td>
<td>Borde muy grueso</td>
</tr>
<tr>
<td><strong>border-[valor]</strong></td>
<td>Personalizado</td>
<td>border-width: 3px</td>
</tr>
</tbody>
</table>

.

<table style="width:55%;">
<colgroup>
<col style="width: 14%" />
<col style="width: 21%" />
<col style="width: 19%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><strong>border-radius (Redondeo de bordes)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>rounded-none</strong></td>
<td>0px</td>
<td>Sin redondeo</td>
</tr>
<tr>
<td><strong>rounded-sm</strong></td>
<td>0.125rem (2px)</td>
<td>Ligero redondeo</td>
</tr>
<tr>
<td><strong>rounded</strong></td>
<td>0.25rem (4px)<strong>( Default)</strong></td>
<td>Redondeo botones, inputs</td>
</tr>
<tr>
<td><strong>rounded-md</strong></td>
<td>0.375rem (6px)</td>
<td>Más suave, tarjetas</td>
</tr>
<tr>
<td><strong>rounded-lg</strong></td>
<td>0.5rem (8px)</td>
<td>Cards, modales modernos</td>
</tr>
<tr>
<td><strong>rounded-xl</strong></td>
<td>0.75rem (12px)</td>
<td>Layouts visuales más marcados</td>
</tr>
<tr>
<td><strong>rounded-2xl</strong></td>
<td>1rem (16px)</td>
<td>Secciones completas, hero, sliders</td>
</tr>
<tr>
<td><strong>rounded-full</strong></td>
<td><strong>Máximo (círculo)</strong></td>
<td>Avatares, botones redondos</td>
</tr>
</tbody>
</table>

<table style="width:55%;">
<colgroup>
<col style="width: 12%" />
<col style="width: 13%" />
<col style="width: 13%" />
<col style="width: 15%" />
</colgroup>
<thead>
<tr>
<th colspan="4"><p><strong>Rounded por esquina</strong></p>
<p>{valor} : none,sm,md,lg,xl,2xl,full,</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>Esquina Top-left</p>
<p><strong>rounded-tl-{valor}</strong></p></td>
<td><p>Esquina Top-right</p>
<p><strong>rounded-tr-{valor}</strong></p></td>
<td><p>Esquina Bottom-left</p>
<p><strong>rounded-bl-{valor}</strong></p></td>
<td><p>Esquina Bottom-right</p>
<p><strong>rounded-br-{valor}</strong></p></td>
</tr>
</tbody>
</table>

<table style="width:55%;">
<colgroup>
<col style="width: 26%" />
<col style="width: 28%" />
</colgroup>
<thead>
<tr>
<th><p><strong>border-{color}-{</strong> <strong>tono }</strong></p>
<p><strong>border-[colorPersonalizado]</strong></p></th>
<th>Define el color del borde del elemento</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

<a id="cat-ring"></a>

## CLASES RING

<table style="width:56%;">
<colgroup>
<col style="width: 8%" />
<col style="width: 47%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>ring width :</strong> Crea un <strong>anillo alrededor de un elemento</strong> (similar al box-shadow)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ring</strong></td>
<td>Anillo fino predeterminado (1px)</td>
</tr>
<tr>
<td><strong>ring-0</strong></td>
<td>Elimina cualquier ring visible</td>
</tr>
<tr>
<td><strong>ring-1</strong></td>
<td>Anillo de 1px de grosor</td>
</tr>
<tr>
<td><strong>ring-2</strong></td>
<td>Anillo de 2px de grosor (más visible)</td>
</tr>
<tr>
<td><strong>ring-4</strong></td>
<td>Anillo de 4px de grosor (ej. focus fuerte)</td>
</tr>
<tr>
<td><strong>ring-8</strong></td>
<td>Anillo grueso (accesibilidad extrema)</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 24%" />
<col style="width: 31%" />
</colgroup>
<thead>
<tr>
<th><p><strong>ring-{color}-{tono}</strong></p>
<p><strong>ring-[colorPersonalizado]</strong></p></th>
<th>Define color para el anillo</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ring-transparent</strong></td>
<td>Oculta el color pero mantiene el ring</td>
</tr>
</tbody>
</table>

| **outline-none** | Sirve para **remover el contorno que los navegadores aplican por defecto** cuando un elemento recibe foco |
|----|----|

<table style="width:56%;">
<colgroup>
<col style="width: 14%" />
<col style="width: 24%" />
<col style="width: 17%" />
</colgroup>
<thead>
<tr>
<th colspan="3">Añade <strong>espacio entre el borde del elemento y el anillo</strong> (como un padding invisible), lo que crea <strong>mejor separación visual</strong>.</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ring-offset-0</strong></td>
<td>Sin espacio entre borde y anillo</td>
<td>Por defecto</td>
</tr>
<tr>
<td><strong>ring-offset-1</strong></td>
<td>1px de separación entre borde y anillo</td>
<td>Separación mínima</td>
</tr>
<tr>
<td><strong>ring-offset-2</strong></td>
<td>Muy usado en formularios accesibles</td>
<td>focus-visible moderno</td>
</tr>
<tr>
<td><strong>ring-offset-4</strong></td>
<td>Separación clara</td>
<td>Botones grandes</td>
</tr>
</tbody>
</table>

.

<a id="cat-display"></a>

## CLASES DISPLAY - POSICIONAMIENTO

<table style="width:56%;">
<colgroup>
<col style="width: 12%" />
<col style="width: 43%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>display:</strong> Define cómo un elemento se comporta en el flujo del documento y cómo se distribuyen sus hijos</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>block</strong></td>
<td><strong>Elemento ocupa todo el ancho disponible e inicia nueva línea. Comportamiento estándar de divs</strong></td>
</tr>
<tr>
<td><strong>inline</strong></td>
<td>Elemento ocupa solo el ancho necesario, no inicia nueva línea. No permite width/height</td>
</tr>
<tr>
<td><strong>inline-block</strong></td>
<td>Combina inline + block: fluye en línea pero permite width/height definidos</td>
</tr>
<tr>
<td><strong>hidden</strong></td>
<td>Oculta elemento completamente del documento. No ocupa espacio en la interfaz</td>
</tr>
<tr>
<td><strong>contents</strong></td>
<td>Elimina contenedor visualmente, dejando solo hijos. Los hijos actúan como hijos directos del abuelo</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 9%" />
<col style="width: 46%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>position:</strong> Define cómo se coloca un elemento en el flujo del documento y respecto a su contenedor</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>static</strong></td>
<td><strong>Posicionamiento normal (por defecto). Sigue flujo del documento. No permite coordenadas top/left/right/bottom</strong></td>
</tr>
<tr>
<td><strong>relative</strong></td>
<td>Igual que static pero permite coordenadas de posicionamiento. Sirve como referencia para hijos absolute</td>
</tr>
<tr>
<td><strong>absolute</strong></td>
<td>Se posiciona respecto al primer ancestro con relative/absolute/fixed/sticky. Sale del flujo normal</td>
</tr>
<tr>
<td><strong>fixed</strong></td>
<td>Se posiciona respecto al viewport. Permanece fijo aunque haya scroll. Ideal para menús fijos</td>
</tr>
<tr>
<td><strong>sticky</strong></td>
<td><strong>relative</strong> hasta alcanzar umbral, luego actúa como <strong>fixed</strong>. Se mantiene pegado dentro de su contenedor</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 19%" />
<col style="width: 36%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Coordenadas de Posicionamiento (Requieren relative, absolute, fixed o sticky)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>top-{valor}</strong></td>
<td>Define la distancia desde el borde superior.<br />
Mueve hacia abajo</td>
</tr>
<tr>
<td><strong>bottom-{valor}</strong></td>
<td><p>Define la distancia desde el borde inferior.</p>
<p>Mueve hacia arriba</p></td>
</tr>
<tr>
<td><strong>left-{valor}</strong></td>
<td>Define la distancia desde el borde izquierdo.<br />
Mueve hacia la derecha -&gt;</td>
</tr>
<tr>
<td><strong>right-{valor}</strong></td>
<td>Define la distancia desde el borde derecho.<br />
Mueve hacia la izquierda &lt;-</td>
</tr>
<tr>
<td><strong>inset-{valor}</strong></td>
<td>Define la distancia en todas las direcciones (top, bottom, left, right).<br />
Mueve desde las 4 direcciones a la vez</td>
</tr>
<tr>
<td><strong>inset-x-{valor}</strong></td>
<td>Define la distancia en la dirección horizontal (left y right).</td>
</tr>
<tr>
<td><strong>inset-y-{valor}</strong></td>
<td>Define la distancia en la dirección vertical (top y bottom).</td>
</tr>
<tr>
<td><p><strong>-top-{valor}</strong></p>
<p><strong>-left-{valor}</strong></p>
<p><strong>-right-{valor}</strong></p>
<p><strong>-bottom-{valor}</strong></p></td>
<td>Posicionamiento negativo: Permite mover el elemento en la dirección opuesta al valor positivo.</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 27%" />
<col style="width: 28%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Tabla de valores que pueden tomar las coordenadas de posicionamiento</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>0</strong></td>
<td>Pegado al borde</td>
</tr>
<tr>
<td><strong>px</strong></td>
<td>Desplazamiento mínimo (1px).</td>
</tr>
<tr>
<td><strong>full</strong></td>
<td><strong>Sale del contenedor padre y se ubica al borde exterior del contenedor padre.</strong><br />
Cuando usas full el valor representa el 100% de la dimensión(alto o ancho) del contenedor de referencia.</td>
</tr>
<tr>
<td><strong>auto</strong></td>
<td>Usa el valor automático de CSS.</td>
</tr>
<tr>
<td><strong>[valor]</strong></td>
<td>Permite definir valores personalizados (top-[50px]).</td>
</tr>
<tr>
<td><strong>1, 2, 3...</strong></td>
<td>Usa la escala de espaciado de Tailwind (top-4 → 16px).</td>
</tr>
<tr>
<td><strong>1/2, 1/3...</strong></td>
<td>Posiciona usando fracciones del tamaño total del contenedor</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 9%" />
<col style="width: 46%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>z-index:</strong> Controla el orden de apilamiento de los elementos, es decir, qué elementos están delante o detrás de otros en la interfaz.</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>z-0</strong></td>
<td>Elemento sin prioridad de apilamiento sobre otros elementos<strong>. (default)</strong></td>
</tr>
<tr>
<td><strong>z-10</strong></td>
<td>Comienza la escala personalizada.</td>
</tr>
<tr>
<td><strong>z-20</strong></td>
<td>Se usa para overlays, modales, tooltips, etc.</td>
</tr>
<tr>
<td><strong>z-30</strong></td>
<td>Más prioridad.</td>
</tr>
<tr>
<td><strong>z-40</strong></td>
<td>Muy común en menús flotantes, sidebars, etc.</td>
</tr>
<tr>
<td><strong>z-50</strong></td>
<td>Muy alto. Usado por default para modales importantes<br />
Se usa comúnmente para elementos flotantes como menús o modales.</td>
</tr>
<tr>
<td><strong>z-auto</strong></td>
<td>Sigue el orden natural de los elementos en el DOM.</td>
</tr>
<tr>
<td><strong>z-[9999]</strong></td>
<td>Valor personalizado alto. Útil cuando necesitas más control.</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 16%" />
<col style="width: 39%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>overflow</strong> define qué debe pasar cuando el contenido de un elemento se sale o desborda de su contenedor de forma horizontal y vertical.</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>overflow-auto</strong></td>
<td>Muestra scroll <strong>solo si</strong> el contenido se desborda.<br />
Agrega barras de desplazamiento solo si es necesario.</td>
</tr>
<tr>
<td><strong>overflow-hidden</strong></td>
<td><strong>Oculta</strong> todo contenido que se <strong>desborde</strong>. El contenido que excede el contenedor se oculta sin posibilidad de desplazamiento.</td>
</tr>
<tr>
<td><strong>overflow-visible</strong></td>
<td>El contenido desbordado <strong>se muestra fuera del contenedor</strong>. El contenido sobresale y sigue siendo visible<strong>.(default)</strong></td>
</tr>
<tr>
<td><strong>overflow-scroll</strong></td>
<td>Siempre muestra barras de scroll, aunque no sean necesarias. Agrega barras de desplazamiento en ambos ejes.</td>
</tr>
</tbody>
</table>

<a id="cat-grid"></a>

## CLASES GRID

<table style="width:56%;">
<colgroup>
<col style="width: 10%" />
<col style="width: 45%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Grid Container</strong>: Convierte elemento en contenedor de grid para organizar hijos en filas y columnas</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>grid</strong></td>
<td>Convierte contenedor en grid CSS. Los elementos hijos se organizan según template definido</td>
</tr>
<tr>
<td><strong>inline-grid</strong></td>
<td>Grid que fluye dentro del texto (en la misma línea que el texto circundante)</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 23%" />
<col style="width: 32%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Grid Template Columns</strong>: Define número y tamaño de columnas en el contenedor grid</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>grid-cols-1</strong></td>
<td>1 columna que ocupa 100% del espacio disponible</td>
</tr>
<tr>
<td><strong>grid-cols-2</strong></td>
<td>2 columnas de ancho igual, 50% cada una (ajustado por gap si existe)</td>
</tr>
<tr>
<td><strong>grid-cols-3</strong></td>
<td>3 columnas de ancho igual, 33.33% cada una (ajustado por gap si existe)</td>
</tr>
<tr>
<td><strong>grid-cols-4</strong></td>
<td>4 columnas de ancho igual, 25% cada una (ajustado por gap si existe)</td>
</tr>
<tr>
<td><strong>grid-cols-6</strong></td>
<td>6 columnas de ancho igual, 16.66% cada una (ajustado por gap si existe)</td>
</tr>
<tr>
<td><strong>….</strong></td>
<td>n columnas ….</td>
</tr>
<tr>
<td><strong>grid-cols-12</strong></td>
<td>12 columnas de ancho igual, 8.33% cada una - Sistema clásico de grid</td>
</tr>
<tr>
<td><strong>grid-cols-none</strong></td>
<td><strong>Elimina cualquier definición previa de columnas</strong> , actúa como una limpieza de columnas para luego definir nuevas columnas u otro comportamiento</td>
</tr>
<tr>
<td><strong>grid-cols-[sizeCol1_ sizeCol2_sizeCo3_..];</strong></td>
<td>Anchos personalizados ,sintaxis similar a CSS</td>
</tr>
</tbody>
</table>

<table style="width:57%;">
<colgroup>
<col style="width: 13%" />
<col style="width: 43%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Grid Column Span</strong>: Define cuántas columnas ocupa un elemento hijo dentro del grid<br />
Se aplica en <strong>los elementos hijos del grid.</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>col-auto</strong></td>
<td>Tamaño automático según contenido del elemento <strong>(default)</strong></td>
</tr>
<tr>
<td><strong>col-span-1</strong></td>
<td>Elemento ocupa exactamente 1 columna</td>
</tr>
<tr>
<td><strong>col-span-2</strong></td>
<td>Elemento ocupa exactamente 2 columnas</td>
</tr>
<tr>
<td><strong>col-span-3</strong></td>
<td>Elemento ocupa exactamente 3 columnas</td>
</tr>
<tr>
<td><strong>col-span-6</strong></td>
<td>Elemento ocupa exactamente 6 columnas (mitad en grid-cols-12)</td>
</tr>
<tr>
<td><strong>…</strong></td>
<td>…..</td>
</tr>
<tr>
<td><strong>col-span-12</strong></td>
<td>Elemento ocupa exactamente 12 columnas (todo el ancho en grid-cols-12)</td>
</tr>
<tr>
<td><strong>col-span-full</strong></td>
<td>Elemento ocupa todas las columnas disponibles independientemente del número total</td>
</tr>
</tbody>
</table>

<table style="width:58%;">
<colgroup>
<col style="width: 16%" />
<col style="width: 40%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Grid Rows</strong>: Define número y tamaño de filas en el contenedor grid , util cuando deseas un layout con secciones verticales claras, como cards apilados, grids con encabezados y pies, etc.</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>grid-rows-1</strong></td>
<td>1 fila que ocupa 100% del alto disponible</td>
</tr>
<tr>
<td><strong>grid-rows-2</strong></td>
<td>2 filas de alto igual, 50% cada una (ajustado por gap si existe)</td>
</tr>
<tr>
<td><strong>grid-rows-3</strong></td>
<td>3 filas de alto igual, 33.33% cada una (ajustado por gap si existe)</td>
</tr>
<tr>
<td><strong>grid-rows-4</strong></td>
<td>4 filas de alto igual, 25% cada una (ajustado por gap si existe)</td>
</tr>
<tr>
<td><strong>grid-rows-6</strong></td>
<td>6 filas de alto igual, 16.66% cada una (ajustado por gap si existe)</td>
</tr>
<tr>
<td><strong>grid-rows-none</strong></td>
<td>No hay filas definidas, debes definir cada ítem manualmente (grid-row)</td>
</tr>
<tr>
<td><strong>grid-rows-[valor]</strong></td>
<td>Numero y Altura de filas personalizadas<br />
ej. grid-rows-[100px_1fr_auto]</td>
</tr>
</tbody>
</table>

<table style="width:58%;">
<colgroup>
<col style="width: 13%" />
<col style="width: 43%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Grid Row Span</strong>: Define cuántas filas ocupa un elemento hijo dentro del grid</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>row-auto</strong></td>
<td>Alto automático según contenido del elemento</td>
</tr>
<tr>
<td><strong>row-span-1</strong></td>
<td>Elemento ocupa exactamente 1 fila</td>
</tr>
<tr>
<td><strong>row-span-2</strong></td>
<td>Elemento ocupa exactamente 2 filas</td>
</tr>
<tr>
<td><strong>row-span-3</strong></td>
<td>Elemento ocupa exactamente 3 filas</td>
</tr>
<tr>
<td><strong>…</strong></td>
<td>…</td>
</tr>
<tr>
<td><strong>row-span-6</strong></td>
<td>Elemento ocupa exactamente 6 filas</td>
</tr>
<tr>
<td><strong>row-span-full</strong></td>
<td>Elemento ocupa todas las filas disponibles independientemente del número total</td>
</tr>
</tbody>
</table>

<table style="width:57%;">
<colgroup>
<col style="width: 19%" />
<col style="width: 37%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Grid-flow</strong>: Controla como se colocan automáticamente los elementos hijos dentro del contenedro Grid</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>grid-flow-row</strong></td>
<td>Elementos se colocan horizontalmente primero, luego saltan a nueva fila (comportamiento por defecto)</td>
</tr>
<tr>
<td><strong>grid-flow-col</strong></td>
<td>Elementos se colocan verticalmente primero, luego saltan a nueva columna</td>
</tr>
<tr>
<td><strong>grid-flow-dense</strong></td>
<td>Algoritmo de colocación ,rellena huecos dejados por elementos que ocupan múltiples celdas(col-span y row-span)</td>
</tr>
<tr>
<td><strong>grid-flow-row-dense</strong></td>
<td>Igual que flow-row pero con relleno de huecos</td>
</tr>
<tr>
<td><strong>grid-flow-col-dense</strong></td>
<td>Igual que flow-col pero con relleno de huecos</td>
</tr>
</tbody>
</table>

<a id="cat-efectos"></a>

## CLASES EFECTOS

<table style="width:57%;">
<colgroup>
<col style="width: 15%" />
<col style="width: 41%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Box Shadow:</strong> Crea sombras alrededor del elemento para profundidad y jerarquía visual</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>shadow-none</strong></td>
<td>Sin sombra. Elimina cualquier sombra aplicada</td>
</tr>
<tr>
<td><strong>shadow-sm</strong></td>
<td>Sombra muy sutil. Ideal para separar elementos sin destacar mucho</td>
</tr>
<tr>
<td><strong>shadow</strong></td>
<td>Sombra estándar (equivale a shadow-md). Balance perfecto para cards y botones</td>
</tr>
<tr>
<td><strong>shadow-md</strong></td>
<td>Sombra moderada. Misma que shadow, para elementos que necesitan destacar ligeramente</td>
</tr>
<tr>
<td><strong>shadow-lg</strong></td>
<td>Sombra grande. Para modales, dropdowns y elementos importantes</td>
</tr>
<tr>
<td><strong>shadow-xl</strong></td>
<td>Sombra extra grande. Para elementos flotantes prominentes</td>
</tr>
<tr>
<td><strong>shadow-2xl</strong></td>
<td>Sombra muy grande. Para overlays y elementos de máxima jerarquía</td>
</tr>
<tr>
<td><strong>shadow-inner</strong></td>
<td>Sombra hacia adentro. Crea efecto de hundimiento o input presionado</td>
</tr>
<tr>
<td><strong>shadow-[valor]</strong></td>
<td>Sombra personalizada: ej. shadow-[0_4px_6px_rgba(0,0,0,0.1)]</td>
</tr>
</tbody>
</table>

<table style="width:58%;">
<colgroup>
<col style="width: 14%" />
<col style="width: 42%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Opacity</strong>: Controla la transparencia del elemento completo (incluye hijos)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>opacity-0</strong></td>
<td>Completamente transparente (invisible pero ocupa espacio)</td>
</tr>
<tr>
<td><strong>opacity-5</strong></td>
<td>95% transparente (apenas visible)</td>
</tr>
<tr>
<td><strong>…</strong></td>
<td>10% ,20%</td>
</tr>
<tr>
<td><strong>opacity-25</strong></td>
<td>75% transparente (muy transparente)</td>
</tr>
<tr>
<td><strong>opacity-50</strong></td>
<td>50% transparente (semi-transparente, ideal para overlays)</td>
</tr>
<tr>
<td><strong>opacity-75</strong></td>
<td>25% transparente (ligeramente transparente)</td>
</tr>
<tr>
<td><strong>opacity-100</strong></td>
<td>Completamente opaco (sin transparencia, valor por defecto)</td>
</tr>
<tr>
<td><strong>opacity-[valor]</strong></td>
<td>Opacidad personalizada: ej. opacity-[0.15] para 15% de opacidad</td>
</tr>
</tbody>
</table>

<a id="cat-animaciones"></a>

## CLASES ANIMACIONES

**Animaciones utilitarias** — Tailwind trae varias animaciones predefinidas (cada una es un `@keyframes` listo para usar):

| Clase | Qué hace | Uso típico |
| --- | --- | --- |
| `animate-none` | Quita la animación | Resetear / desactivar en un breakpoint |
| `animate-spin` | Giro continuo de 360° | **Spinners** de carga, íconos girando |
| `animate-ping` | Escala y se desvanece (efecto radar) | Badges de notificación, puntos "en vivo" |
| `animate-pulse` | Opacidad pulsante suave | **Skeletons / placeholders de carga** |
| `animate-bounce` | Rebote vertical | Flechas "scroll down", llamados de atención |

> Para indicar **carga**: `animate-spin` en un ícono/círculo = spinner; `animate-pulse` en un bloque = skeleton. Puedes ajustar el ritmo con `duration-{ms}` y suavizar transiciones con `transition`.

<a id="cat-imagenes"></a>

## CLASES POSICION IMÁGENES-VIDEOS

<table style="width:57%;">
<colgroup>
<col style="width: 18%" />
<col style="width: 38%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>Object Fit</strong>: Controla cómo se ajusta el contenido de imágenes/videos dentro de su contenedor</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>object-contain</strong></td>
<td><strong>(no hay corte)</strong> <strong>Imagen completa</strong> visible manteniendo proporción original. Puede dejar espacios vacíos</td>
</tr>
<tr>
<td><strong>object-cover</strong></td>
<td><strong>(hay corte)</strong> Imagen cubre todo el contenedor <strong>manteniendo proporción de aspecto.</strong></td>
</tr>
<tr>
<td><strong>object-fill</strong></td>
<td><strong>(no hay corte)</strong> Imagen se estira para llenar exactamente el contenedor. Puede deformar</td>
</tr>
<tr>
<td><strong>object-none</strong></td>
<td>Imagen en tamaño original sin redimensionar. Se recorta si es más grande</td>
</tr>
<tr>
<td><strong>object-scale-down</strong></td>
<td><strong>Comportamiento contain o none<br />
</strong>Si la imagen es más grande que el contenedor, se aplicará contain sino usara none</td>
</tr>
</tbody>
</table>

<img src="media/image1.png" style="width:4.45347in;height:2.43023in" alt="Objetos en CSS - CSS en español" />

<table style="width:56%;">
<colgroup>
<col style="width: 17%" />
<col style="width: 17%" />
<col style="width: 21%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><p>- Cuando hay espacio sobrante decides <strong>dónde colocas</strong> dentro del espacio. → <strong>object-contain</strong></p>
<p>- O cuando hay recorte decides que parte priorizar o mostrar→ <strong>object-cover</strong></p></th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td><strong>Cuando hay recorte (cover)</strong></td>
<td><strong>Cuando hay espacio (contain)</strong></td>
</tr>
<tr>
<td><strong>object-center</strong></td>
<td>Muestra la parte central de la imagen</td>
<td>Centra la imagen dentro del espacio</td>
</tr>
<tr>
<td><strong>object-top</strong></td>
<td>Muestra la parte superior</td>
<td>Alinea la imagen en la parte superior</td>
</tr>
<tr>
<td><strong>object-bottom</strong></td>
<td>Muestra la parte inferior</td>
<td>Alinea la imagen en la parte inferior</td>
</tr>
<tr>
<td><strong>object-left</strong></td>
<td>Muestra la parte izquierda</td>
<td>Alinea a la izquierda del contenedor</td>
</tr>
<tr>
<td><strong>object-right</strong></td>
<td>Muestra la parte derecha</td>
<td>Alinea a la derecha del contenedor</td>
</tr>
<tr>
<td><strong>object-left-top</strong></td>
<td>Muestra la esquina superior izquierda</td>
<td>Alinea imagen en esquina superior izquierda</td>
</tr>
<tr>
<td><strong>object-left-bottom</strong></td>
<td>Muestra la esquina inferior izquierda</td>
<td>Alinea imagen en esquina inferior izquierda</td>
</tr>
<tr>
<td><strong>object-right-top</strong></td>
<td>Muestra la esquina superior derecha</td>
<td>Alinea imagen en esquina superior derecha</td>
</tr>
<tr>
<td><strong>object-right-bottom</strong></td>
<td>Muestra la esquina inferior derecha</td>
<td>Alinea imagen en esquina inferior derecha</td>
</tr>
</tbody>
</table>

<a id="cat-align-contenido"></a>

## ALINEACIÓN DEL CONTENIDO (CONTENEDOR GRID)

<img src="media/image2.png" style="width:4.39583in;height:2.60417in" alt="Imagen que contiene Diagrama El contenido generado por IA puede ser incorrecto." />

<table style="width:56%;">
<colgroup>
<col style="width: 15%" />
<col style="width: 40%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>justify-content</strong>: Eje horizontal (contenido completo)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>justify-start</strong></td>
<td>Alinea al inicio del eje horizontal.<strong>(default)</strong></td>
</tr>
<tr>
<td><strong>justify-end</strong></td>
<td>Alinea al final del eje horizontal.</td>
</tr>
<tr>
<td><strong>justify-center</strong></td>
<td>Centra horizontalmente el contenido.</td>
</tr>
<tr>
<td><strong>justify-between</strong></td>
<td>Espacio igual <strong>entre</strong> columnas.</td>
</tr>
<tr>
<td><strong>justify-around</strong></td>
<td>Espacio igual <strong>alrededor</strong> de cada columna.</td>
</tr>
<tr>
<td><strong>justify-evenly</strong></td>
<td>Espacio igual entre todas y en bordes.</td>
</tr>
<tr>
<td><strong>justify-stretch</strong></td>
<td>Estira para ocupar todo el ancho (por defecto en Grid).</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 17%" />
<col style="width: 39%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>align-content:</strong> Eje vertical (contenido completo)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>content-start</strong></td>
<td>Alinea al inicio del eje vertical.</td>
</tr>
<tr>
<td><strong>content-end</strong></td>
<td>Alinea al final del eje vertical.</td>
</tr>
<tr>
<td><strong>content-center</strong></td>
<td>Centra verticalmente el contenido.</td>
</tr>
<tr>
<td><strong>content-between</strong></td>
<td>Espacio igual <strong>entre</strong> filas.</td>
</tr>
<tr>
<td><strong>content-around</strong></td>
<td>Espacio igual <strong>alrededor</strong> de cada fila.</td>
</tr>
<tr>
<td><strong>content-evenly</strong></td>
<td>Espacio igual entre todas y en bordes.</td>
</tr>
<tr>
<td><strong>content-stretch</strong></td>
<td>Estira para ocupar toda la altura disponible. <strong>(default)</strong></td>
</tr>
</tbody>
</table>

<a id="cat-align-celdas"></a>

## ALINEACIÓN DENTRO DE LAS CELDAS (TODOS LOS ELEMENTOS)

<img src="media/image3.png" style="width:4.09248in;height:1.34102in" alt="Imagen que contiene Gráfico El contenido generado por IA puede ser incorrecto." />

<table style="width:56%;">
<colgroup>
<col style="width: 18%" />
<col style="width: 37%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>justify-items</strong>: Alineación horizontal de <strong>todos</strong> los ítems</th>
</tr>
</thead>
<tbody>
<tr>
<td>justify-items-start</td>
<td>Alinea cada ítem al inicio horizontal.</td>
</tr>
<tr>
<td>justify-items-end</td>
<td>Alinea cada ítem al final horizontal.</td>
</tr>
<tr>
<td>justify-items-center</td>
<td>Centra cada ítem horizontalmente.</td>
</tr>
<tr>
<td>justify-items-stretch</td>
<td>Estira cada ítem horizontalmente <strong>(por defecto).</strong></td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 13%" />
<col style="width: 42%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>align-items</strong>: Alineación vertical de <strong>todos</strong> los ítems</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>items-start</strong></td>
<td>Alinea al inicio vertical.</td>
</tr>
<tr>
<td><strong>items-end</strong></td>
<td>Alinea al final vertical.</td>
</tr>
<tr>
<td><strong>items-center</strong></td>
<td>Centra verticalmente.</td>
</tr>
<tr>
<td><strong>items-stretch</strong></td>
<td>Estira cada ítem verticalmente basando en igualar el item mas alto no al padre <strong>(default)</strong></td>
</tr>
</tbody>
</table>

<a id="cat-align-item"></a>

## ALINEACIÓN INDIVIDUAL POR ÍTEM

<table style="width:56%;">
<colgroup>
<col style="width: 18%" />
<col style="width: 37%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>justify-self</strong>: Alineación horizontal individual, auto es por defecto</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>justify-self-start</strong></td>
<td>Alinea al inicio de su celda.</td>
</tr>
<tr>
<td><strong>justify-self-end</strong></td>
<td>Alinea al final de su celda.</td>
</tr>
<tr>
<td><strong>justify-self-center</strong></td>
<td>Centra en la celda.</td>
</tr>
<tr>
<td><strong>justify-self-stretch</strong></td>
<td>Estira en horizontal</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 12%" />
<col style="width: 44%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><strong>align-self</strong>: Alineación vertical individual, auto es por defecto</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>self-start</strong></td>
<td>Alinea al inicio vertical de su celda.</td>
</tr>
<tr>
<td><strong>self-end</strong></td>
<td>Alinea al final vertical de su celda.</td>
</tr>
<tr>
<td><strong>self-center</strong></td>
<td>Centra verticalmente en su celda.</td>
</tr>
<tr>
<td><strong>self-stretch</strong></td>
<td>Estira verticalmente</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 20%" />
<col style="width: 16%" />
<col style="width: 18%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><strong>Combinaciones</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>place-content-{valor}</strong></td>
<td>align-content <strong>+</strong> justify-content</td>
<td>Alineación del contenido completo combinada.</td>
</tr>
<tr>
<td><strong>place-items-{valor}</strong></td>
<td>align-items <strong>+</strong> justify-items</td>
<td>Alineación de los ítems en celda combinada.</td>
</tr>
</tbody>
</table>

<table style="width:56%;">
<colgroup>
<col style="width: 14%" />
<col style="width: 24%" />
<col style="width: 16%" />
</colgroup>
<thead>
<tr>
<th colspan="3"><strong>Controla la relación de aspecto (width/height) del elemento.</strong><br />
<strong>Usalo en el contenedor del &lt;img&gt;,</strong> no directamente en el img.<br />
El contenedor tendrá ese aspecto.<br />
Luego debes alinear la img en ese contenedor(h-full y w-full)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>aspect-auto</strong></td>
<td>Automática (por contenido)</td>
<td>Contenido que ajusta altura libremente</td>
</tr>
<tr>
<td><strong>aspect-square</strong></td>
<td>1:1</td>
<td>Avatares, thumbnails cuadrados</td>
</tr>
<tr>
<td><strong>aspect-video</strong></td>
<td>16:9</td>
<td>Videos responsivos (YouTube, etc.)</td>
</tr>
<tr>
<td><strong>aspect-[4/3]</strong></td>
<td>4:3</td>
<td>Fotos estándar o slideshows</td>
</tr>
<tr>
<td><strong>aspect-[3/2]</strong></td>
<td>3:2</td>
<td>Fotografías horizontales</td>
</tr>
<tr>
<td><strong>aspect-[1/2]</strong></td>
<td>1:2</td>
<td>Elementos altos y delgados</td>
</tr>
<tr>
<td><strong>aspect-[valor]</strong></td>
<td>Personalizada <strong>(w/h)<br />
</strong>aspect-[5/2]</td>
<td>Control total según diseño requerido</td>
</tr>
</tbody>
</table>

<img src="media/image4.png" style="width:3.15116in;height:3.72993in" alt="Gráfico, Gráfico de rectángulos El contenido generado por IA puede ser incorrecto." />
