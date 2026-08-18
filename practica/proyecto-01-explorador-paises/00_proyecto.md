---
proyecto: Explorador de Países
bloque: 01
estado: EN PROGRESO
techs: [javascript-dom, tailwind, html-css-base, fetch-async]
---

# 🛠️ Explorador de Países — Bloque 1

> **Una página que consume la API REST Countries, muestra países en cards (grid responsive con Tailwind) y tiene búsqueda en vivo + filtro por región.** Estado: 🔄 EN PROGRESO.

## Objetivo y alcance

**Construye:** un explorador de países funcional, responsive y con buena UX (estados de carga/vacío/error).

**Ejercita (de tu diagnóstico B1):**
- 🔄 Tailwind (utility-first, flex, grid, responsive, estados hover/focus, componentes)
- 🔄 DOM (seleccionar, crear/insertar, eventos), formularios, ternarios
- 🔄 fetch/async, array methods (`map`/`filter`)
- ❌ **Destructuring/spread** (extraer campos de los objetos de la API)
- ❌ **Closures** (implementar el `debounce` de la búsqueda en vivo)
- 🔄 HTML semántico y accesibilidad básica

**Excluye (anti scope creep → a `NOTAS.md` si surge):** routing/SPA, framework (eso es Bloque 2), backend propio, favoritos persistentes, dark mode (puede ser un "extra" opcional al final).

## API (recurso)

REST Countries v3.1 — sin API key:
- Todos (con campos): `https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3`
- Por nombre: `https://restcountries.com/v3.1/name/{nombre}`
- Por región: `https://restcountries.com/v3.1/region/{region}`

## Fases

1. [[fases/fase-01_maquetar-ui|Fase 1 — Maquetar la UI con Tailwind]] — 🔄 EN PROGRESO
2. Fase 2 — Fetch + render dinámico de cards — ⬜
3. Fase 3 — Búsqueda en vivo (debounce) + filtro por región — ⬜
4. Fase 4 — Pulido (estados carga/vacío/error, responsive fino, refactor a funciones reutilizables) — ⬜

## Estado / siguiente paso

**Fase 1 en progreso.** HU-001 ✅ cerrada (maquetado base responsive). Siguiente: **HU-002** (estados visuales: skeleton de carga + mensaje "sin resultados", aún sin datos). El código lo desarrollas en `codigo/`.

## Reglas de la práctica

- La IA da **Historias de Usuario con criterios de aceptación y pistas escalonadas a petición** — **nunca el código**. Tú desarrollas la lógica (ver `sistema/prompts/practica_guiada_proyecto.md`).
- Una HU a la vez. Cuando cumplas sus criterios, integramos y pasamos a la siguiente.
