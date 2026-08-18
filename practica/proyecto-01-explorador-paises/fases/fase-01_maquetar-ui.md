# Fase 1 — Maquetar la UI con Tailwind

> **Meta de la fase:** tener la **estructura visual** del explorador, responsive y bonita, **sin datos reales todavía**. Resultado visible rápido para arrancar con impulso.
>
> **Ejercita:** Tailwind (utility-first, flex, grid, responsive, estados), HTML semántico, accesibilidad básica.
>
> **Recuerda:** desarrolla tú el código. Pide pistas si te trabas (te las doy escalonadas, nunca la solución).

---

## ✅ HU-001: Estructura base y layout responsive — CERRADA

**Como** usuario, **quiero** ver la página del explorador con su cabecera, una barra de búsqueda/filtro y una cuadrícula de países, **para** poder navegar el contenido cómodamente en móvil y en escritorio.

### Criterios de aceptación
- [x] `<header>` con el título del explorador.
- [x] Input de búsqueda (con nombre accesible) + `<select>` de filtro por región.
- [x] Contenedor **grid responsive** (1 col móvil → 2/3/4 según breakpoint), con `gap`.
- [x] Card de ejemplo con bandera, nombre, población, región y capital.
- [x] Estado `hover` en la card.
- [x] HTML semántico + controles con nombre accesible.
- [x] Se ve bien en móvil y escritorio.
- [x] Cero JS de datos.

**Notas de la revisión:** semántica correcta (`header`/`main`/`article`), grid responsive impecable, `value` del select alineados a la API (inglés) con labels en español. Pendiente menor sin bloqueo: `required` no hace nada sin un `<form>`.

---

## HU-002: Estados visuales (carga y "sin resultados")

**Como** usuario, **quiero** ver una señal de **carga** mientras se buscan países y un mensaje claro cuando **no hay resultados**, **para** entender qué está pasando aunque no vea cards.

> Sigue siendo **maquetado** (sin fetch ni datos reales). Construyes el **markup** de ambos estados; por ahora los muestras/ocultas a mano con la utilidad de ocultar de Tailwind para verlos. La lógica de cuándo aparece cada uno se conecta en la Fase 2–3.

### Criterios de aceptación

- [ ] **Estado de carga:** 3–4 **cards "skeleton"** (placeholders grises) con la misma forma/tamaño que las cards reales, usando una animación de carga.
- [ ] **Estado "sin resultados":** un mensaje claro y bien estilizado (ej. "No se encontraron países con esos criterios").
- [ ] Los tres bloques (grid de resultados, skeleton, mensaje vacío) **conviven en el HTML** y puedes mostrar **solo uno** a la vez ocultando los otros.
- [ ] El skeleton usa la utilidad de Tailwind para el **efecto de pulso/carga** y tonos grises de placeholder.
- [ ] Todo **responsive** y consistente con el diseño de las cards reales.
- [ ] Aún **sin fetch / sin datos reales / sin lógica JS**.

### Pistas disponibles (pídelas solo si te trabas)

- Pista 1: ¿qué utilidad de Tailwind oculta un elemento? ¿y cuál da un efecto de "pulso" de carga? (cheat-sheet → Display, Efectos).
- Pista 2: un skeleton es una card con bloques `bg-gray-200` (sin contenido real) y la animación de pulso en el contenedor.
- Pista 3 (estructura parcial): tres `<section>` hermanas; dos ocultas, una visible.

---

## HU-003 (siguiente en esta fase)

_Se revela al cerrar HU-002: centrar el contenido en pantallas grandes (ancho máximo) y pulido visual final antes de pasar a datos reales (Fase 2)._
