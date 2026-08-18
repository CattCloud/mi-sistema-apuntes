# 🧭 Plan de Bloques — Norte de estudio (corto, por hitos)

> **Qué es:** La secuencia *ligera* de bloques de la etapa de Práctica (ver `sistema/metodologia_practica_guiada.md`). Cada bloque = un conjunto de tecnologías + un mini-proyecto que las combina, **aditivo** (reutiliza y profundiza las de bloques previos).
>
> **Qué NO es:** el diagnóstico detallado. Eso se genera **por bloque, just-in-time y curado por Pareto** (`sistema/prompts/diagnostico_bloque.md`), justo antes de arrancar cada uno. Aquí solo va el mapa grueso.
>
> **Regla:** se confirma y detalla **un bloque a la vez**, no toda la secuencia de golpe (anti-perfeccionismo). El detalle fino de techs/temas se decide al llegar a cada bloque.

---

## Secuencia tentativa

| Bloque | Foco | Techs nuevas | Reutiliza / profundiza | Idea de mini-proyecto | Estado |
|--------|------|--------------|------------------------|------------------------|--------|
| **B1** | Frontend interactivo | JavaScript (DOM), Tailwind | base HTML/CSS | App de una página interactiva (ej. gestor/visualizador con estado en el DOM) | 🔄 **actual** |
| **B2** | Componentes y SPA | React, Next.js | JS, Tailwind | App con componentes, estado y routing | ⬜ |
| **B3** | Backend y APIs | Node, Express, REST | JS/TS | API propia con rutas, validación y manejo de errores | ⬜ |
| **B4** | Datos | SQL/Postgres, Mongo, Prisma | Backend | Persistencia real para la API del bloque anterior | ⬜ |
| **B5** | Integración IA (capstone) | LLM API, context engineering, tools | full-stack completo | Producto full-stack con una capa de IA (la meta: AI Product Engineer) | ⬜ |

> 🎯 **Por qué este orden:** empieza por re-anclar lo más prerequisito y oxidado (JS, base frontend) con resultado visible rápido, y escala hasta el capstone de IA — que es el pago de la meta de empleabilidad de Erick. El orden fino se ajusta con cada diagnóstico.

---

## Bloque actual: B1 — Frontend interactivo

- **Tecnologías:** JavaScript (DOM, eventos, async) + Tailwind (base HTML/CSS).
- **Diagnóstico:** `contexto/plan_estudio/diagnosticos/diagnostico_bloque-01_js-tailwind.md` (reutiliza las marcas de JS ya hechas en `diagnostico_nivel.md`; falta marcar Tailwind).
- **Concepto (referencia):** traslado ligero de Notion → `apuntes/javascript/notion/`, `apuntes/tailwind/notion/`.
- **Práctica:** mini-proyecto en `practica/proyecto-01-*/` (se define tras completar el diagnóstico).
- **Siguiente paso:** el usuario completa el diagnóstico del B1 → se define el mini-proyecto 1.

---

## Notas

- `contexto/plan_estudio/diagnostico_nivel.md` quedó **jubilado como motor** (era genérico, poco curado por Pareto). Se conserva como snapshot inicial y fuente de las marcas de JS, que se reutilizan en el diagnóstico del B1.
- Un bloque puede **revisitar** una tech para cubrir temas no vistos antes (ej. Tailwind grid/dark mode en un bloque posterior).
