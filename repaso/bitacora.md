# 🔁 Bitácora de Repaso

> Registro central de las sesiones de repaso. **La IA escribe aquí** al cerrar cada sesión (el usuario no llena nada).
> Sirve al pilar de **repaso espaciado**: saber qué toca repasar y qué quedó flojo.
> Protocolo: `sistema/prompts/repaso_recall.md` · Metodología: `sistema/metodologia_repaso.md`

---

## 📅 Próximos repasos (agenda)

> La IA actualiza la fecha de "Próximo repaso" tras cada sesión.

| Apunte | Próximo repaso | Última sesión | Estado |
|--------|----------------|---------------|--------|
| CLAUDE.md — Arquitectura de Contexto | 2026-06-24 | 2026-06-19 | 🟡 repaso próximo |
| Claude Code — Arquitectura Interna | — | — | ⬜ incompleto (1/8 secciones) |

🟢 = al día · 🟡 = repaso próximo · 🔴 = repaso vencido · ⬜ = aún sin repasar

---

## 🗂️ Historial de sesiones

> La IA agrega una entrada por sesión, **la más reciente arriba**. Plantilla de referencia abajo.

<!--
PLANTILLA DE ENTRADA (copiar al cerrar una sesión):

### [AAAA-MM-DD] — [Nombre del apunte]

- **Modalidad:** recall conversacional / Feynman
- **Secciones:** [cuáles se repasaron]
- **Firme:** [lo que se recordó bien]
- **A reforzar:** [lo que falló o necesitó pistas]
- **Cómo fue:** flojo / regular / sólido / dominado
- **Próximo repaso:** [AAAA-MM-DD]
-->

### 2026-06-19 — CLAUDE.md — Arquitectura de Contexto

- **Modalidad:** recall conversacional (closed-book) + Feynman puntual
- **Secciones:** las 9 (apunte completo)
- **Firme:**
  - Las **analogías** salieron casi todas solas (mochila/presupuesto, casa con luces por sensor = carga perezosa, agent_docs = índice/menú, jerarquía general→específico, "Claude lee siempre el principal, los demás bajo demanda").
  - Onboarding como propósito real de CLAUDE.md, y "no es bitácora / no historial / no documento que llenas con cada cambio".
  - CLAUDE.md se relee en **cada interacción** desde el inicio de la conversación → por eso pesa en el presupuesto.
  - Orden de carga: lo **más específico** sobrescribe; `@imports` **no** ahorra presupuesto (todo se expande eager), `agent_docs/` **sí** (es índice + lazy).
  - Sección 9: "las capas se ganan, no se adoptan" (dolor concreto, no fantasía de futuro) y la señal de >100 líneas = uso fuera de propósito.
- **A reforzar (necesitó pistas o corrección):**
  - **Por qué existe el system-reminder:** confundió "comprime info inicial" con la razón real → los modelos son **stateless**, no hay memoria entre turnos; el contexto se reenvía cada vez.
  - **Presupuesto:** creía que CLAUDE.md se "corta/comprime" para meter otros docs. Corregido: el modelo lo lee **completo**, pero la **adherencia a TODAS las reglas se degrada** uniformemente al inflarlo (presupuesto ~150-200 instrucciones).
  - **4 niveles de scope:** olvidó el nivel **Local** (`CLAUDE.local.md`, gitignored).
  - **Imposición dura:** dijo `.claude/rules` → corregido a **HOOKS** (PreToolUse que bloquea técnicamente, p.ej. `git push origin main`). `.claude/rules` sigue siendo guía blanda con path-scoping.
- **Cómo fue:** **regular** — modelo mental y analogías sólidos; fallan los detalles técnicos de precisión (stateless, mecanismo exacto de degradación, hooks vs rules, nivel local).
- **Próximo repaso:** 2026-06-24 (heurística: "regular" → 4-7 días, enfocar los 4 puntos "a reforzar").
