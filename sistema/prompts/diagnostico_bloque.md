# Diagnóstico por Módulo (Pareto)

> **Etapa:** Práctica (paso 0 del ciclo por módulo)
> **Metodología:** `sistema/metodologia_practica_guiada.md` (fuente de verdad del *porqué*)
> **Input:** El módulo a iniciar y sus temáticas — del temario de la ruta (`contexto/plan_estudio/temario_[ruta].md`)
> **Output:** Las columnas ✅/🔄/❌ del módulo marcadas en su temario. Solo si el temario no las trae, un archivo aparte `contexto/plan_estudio/diagnosticos/diagnostico_[ruta]-[modulo].md`
> **Trigger:** Se va a arrancar un módulo nuevo (lo dispara el protocolo `practica_guiada_proyecto.md`, paso P-0)

---

## Qué es este protocolo

Antes de cada módulo se fija **un diagnóstico específico y curado** de sus temáticas, para establecer el punto de partida real del alumno. En vez de cubrir todo a medias, cubre **a fondo lo que importa** del módulo. Reemplaza al diagnóstico monolítico genérico, ya jubilado como motor.

> ⚠️ **Los temarios de las rutas ya traen sus columnas ✅/🔄/❌ por temática** — ahí se marca, no en un archivo nuevo. Este protocolo se usa completo cuando se practica algo **sin temario**; con temario, se salta directo al Paso 4 (entregar para marcar).

> 📌 **"Bloque" aquí significa "módulo del temario".** La maquinaria de bloques aditivos B1–B5 fue retirada; el vocabulario sobrevive en el nombre del archivo.

---

## Principio: curaduría Pareto

> 🎯 **No es una checklist académica exhaustiva. Es el 20% de temas que se usan el 80% del tiempo y que más pesan en empleabilidad hoy.**

Al seleccionar los temas de cada tecnología, el agente prioriza por dos criterios y descarta lo marginal:

| Criterio | Pregunta de filtro |
|----------|--------------------|
| **Frecuencia de uso real** | ¿Esto aparece en casi todo proyecto real con esta tech? |
| **Empleabilidad** | ¿Esto lo evalúan/esperan en un puesto de desarrollo hoy? |

- **Sí entra:** lo que se usa a diario y lo que distingue a alguien empleable.
- **No entra (o va al fondo):** rarezas, sintaxis de nicho, cosas que se buscan una vez al año.
- Regla de tamaño: preferir **una tabla corta y certera** que una enorme que el usuario no llena. Si dudas entre incluir o no un tema marginal, déjalo fuera.

---

## Paso 1: Leer el módulo y su perfil

1. Leer el temario de la ruta (`contexto/plan_estudio/temario_[ruta].md`) → qué temáticas cubre el módulo y qué excluye a propósito.
2. Leer `sistema/perfil/yo_profesional.md` y `sistema/perfil/contexto_carrera_ia.md` → calibrar nivel (asume base de JS/TS y full-stack; no diagnostiques fundamentos que ya domina salvo señal contraria) y sesgar hacia empleabilidad/IA.
3. **Reutilizar marcas previas:** si una temática ya fue marcada en un módulo anterior de la misma ruta, **traer esas marcas ya puestas** — no re-preguntar lo ya respondido. Solo se pide lo nuevo.

---

## Paso 2: Curar los temas (Pareto) por nivel

Por cada tecnología o temática del módulo, seleccionar los temas de alto valor y agruparlos en tres niveles. Cada tema lleva una **pregunta de autodiagnóstico** concreta: si el usuario la respondería **sin dudar y sin IA**, lo domina; si duda, no.

| Nivel | Qué va aquí |
|-------|-------------|
| **Básico** | Lo prerequisito e ineludible de la tech |
| **Intermedio** | El grueso del uso diario real (el corazón del Pareto) |
| **Avanzado** | Lo que distingue criterio/empleabilidad, sin caer en nicho |

- La **pregunta de autodiagnóstico** debe ser específica y verificable (no "¿sabes promesas?" sino "¿diferencia entre encadenar `.then()` y `Promise.all()`?").
- Usar términos técnicos en inglés, explicación en español (spanglish controlado, igual que el resto del sistema).

---

## Paso 3: Escribir el archivo con el formato de marcado

Marcar en el temario del módulo. Si la ruta no tiene temario, guardar en `contexto/plan_estudio/diagnosticos/diagnostico_[ruta]-[modulo].md` con este formato (3 columnas de check para marcar con una `x`, sin copiar/pegar emojis):

```markdown
# 🩺 Diagnóstico — [Ruta] · [Módulo]: [Nombre]

> **Cómo llenarlo:** si responderías la *pregunta de autodiagnóstico* sin dudar y sin IA, lo dominas. Marca con `x`:
> **✅** lo domino · **🔄** oxidado (lo recupero rápido) · **❌** no lo sé.
> Curado por Pareto: solo lo que más se usa y más pesa en empleabilidad.

## [Tecnología] — Nivel Básico
| # | Tema | Pregunta de autodiagnóstico | ✅ | 🔄 | ❌ |
|---|------|------------------------------|:--:|:--:|:--:|
| 1 | [tema] | [pregunta concreta] | | | |

## [Tecnología] — Nivel Intermedio
| # | Tema | Pregunta de autodiagnóstico | ✅ | 🔄 | ❌ |
|---|------|------------------------------|:--:|:--:|:--:|
| ... |

## ✍️ Notas libres
-
```

> ⚠️ **Bug a evitar:** nunca dejar un carácter `|` suelto dentro de una celda (rompe la tabla). Si un tipo/valor lo necesita (ej. una union de TS), reescribir con "o" o con código fenced — NO `'admin' | 'user'` crudo en la celda.

- Si la tech ya tenía marcas (Paso 1), **volcarlas ya puestas** en la columna correspondiente.
- Frontmatter mínimo opcional (`ruta:` y `modulo:`).

---

## Paso 4: Entregar para marcar

1. Avisar al usuario que el diagnóstico del módulo está listo y dónde.
2. Recordarle que marque con honestidad (los `🔄`/`❌` son el mapa, no un suspenso) y que puede dejar vacío lo que no sepa clasificar.
3. **No** avanzar a definir el proyecto (P-A de `practica_guiada_proyecto.md`) hasta que el usuario complete (o confirme) las marcas del módulo.

---

## Reglas anti-fricción

- **Corto y certero > largo y exhaustivo.** Si no se usa seguido, no entra.
- **No re-preguntar lo ya marcado.** Reutilizar marcas previas siempre.
- **El usuario solo pone `x`.** Tres columnas, cero copiar/pegar.
- **Calibrar al perfil:** no diagnosticar fundamentos que ya domina.
