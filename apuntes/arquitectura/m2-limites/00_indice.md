---
tema: M2 — Límites: cómo se parte un sistema
workspace: arquitectura
modulo: M2
temario: contexto/plan_estudio/temario_arquitectura_software.md
estado: EN PROGRESO
arquetipo: Constructor Teórico + Documento Técnico
repaso:
  ultimo: null
  proximo: null
  nivel: null
  reforzar: []
notebooklm: pendiente
---

# 🏛️ M2 — Límites: cómo se parte un sistema

> **Módulo 2 del temario de Arquitectura de Software (nivel 3).** Estado: 🔄 EN PROGRESO · 5 secciones.
>
> Todo lo demás depende de esto. Si los cortes están mal puestos, ninguna capa ni patrón te salva.

## Pregunta que responde

Cuando un sistema crece, ¿por dónde se corta? ¿Y cómo sabes que cortaste mal?

## Alcance

Cubre: cuál es la unidad de la que hablamos (módulo, componente, servicio), qué hace que dos cosas merezcan vivir juntas (cohesión), qué tipos de acoplamiento duelen y cuáles son inevitables, el corte por capa técnica frente al corte por dominio, y los síntomas de un límite mal puesto.

Excluye: cohesión y acoplamiento a nivel de **clase** — eso es nivel 2 (SOLID). Aquí todo ocurre a nivel de **módulo y componente**. Los microservicios aparecen solo como contraste, no como tema.

> 📝 **Nota de método:** sin marcado ✅/🔄/❌. Todas las temáticas se desarrollan completas, sin obviar ninguna.

## Secciones

1. [[01_modulo-componente-servicio|Módulo, componente, servicio]] — ✅ `[DOLOR] [DEF] [TABLA]` *(temática 2.1)*
2. [[02_cohesion|Cohesión]] — ✅ `[DEF] [ANALOGÍA] [TABLA]` *(temática 2.2)*
3. [[03_acoplamiento|Acoplamiento y sus tipos]] — ✅ `[DEF] [TABLA] [CÓDIGO]` *(temática 2.3)*
4. Corte por capa técnica vs por dominio — ⬜ `[TABLA] [FLUJO:ascii] [MITO]` *(temática 2.4)*
5. Señales de un límite mal puesto — ⬜ `[DOLOR] [TABLA]` *(temática 2.5)*

## Cierre del módulo

El módulo **no cierra al terminar las secciones**: cierra cuando el **caso** se resuelve sin ayuda. El caso (organizar un e-commerce por capa técnica o por dominio, y ver cuál sufre con cada requerimiento) vive en el temario — ver `contexto/plan_estudio/temario_arquitectura_software.md`, sección M2.

## Dependencia

M2 → M3 → M4 es la **única cadena obligatoria** del temario. Este módulo se toma antes que los otros dos.

## Fuentes

- `contexto/plan_estudio/temario_arquitectura_software.md` — esqueleto (temáticas) y caso de cierre.
- Generación P3⇄P4 con el agente (fuente única + auto-contraste).
