# Diagnóstico por Bloque (Pareto)

> **Etapa:** Práctica (paso 0 del ciclo por bloque)
> **Metodología:** `sistema/metodologia_practica_guiada.md` (fuente de verdad del *porqué*)
> **Input:** El bloque a iniciar y sus tecnologías (de `contexto/plan_estudio/plan_bloques.md`)
> **Output:** Un archivo `contexto/plan_estudio/diagnosticos/diagnostico_bloque-NN_[techs].md` listo para que el usuario lo marque
> **Trigger:** Se va a arrancar un bloque nuevo (lo dispara el protocolo `practica_guiada_proyecto.md`, paso P-0)

---

## Qué es este protocolo

Antes de cada bloque se genera **un diagnóstico específico y curado** de sus tecnologías, para fijar el punto de partida real del alumno. Reemplaza al diagnóstico monolítico genérico (`diagnostico_nivel.md`, jubilado como motor): en vez de cubrir todo a medias, cubre **a fondo lo que importa** del bloque.

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

## Paso 1: Leer el bloque y su perfil

1. Leer `contexto/plan_estudio/plan_bloques.md` → qué tecnologías cubre el bloque (nuevas + acumuladas que se profundizan).
2. Leer `sistema/perfil/yo_profesional.md` y `contexto_carrera_ia.md` → calibrar nivel (asume base de JS/TS y full-stack; no diagnostiques fundamentos que ya domina salvo señal contraria) y sesgar hacia empleabilidad/IA.
3. **Reutilizar marcas previas:** si una tech del bloque ya fue marcada antes (ej. JavaScript en `diagnostico_nivel.md`), **traer esas marcas ya puestas** — no re-preguntar lo ya respondido. Solo se pide lo nuevo.

---

## Paso 2: Curar los temas (Pareto) por nivel

Por cada tecnología del bloque, seleccionar los temas de alto valor y agruparlos en tres niveles. Cada tema lleva una **pregunta de autodiagnóstico** concreta: si el usuario la respondería **sin dudar y sin IA**, lo domina; si duda, no.

| Nivel | Qué va aquí |
|-------|-------------|
| **Básico** | Lo prerequisito e ineludible de la tech |
| **Intermedio** | El grueso del uso diario real (el corazón del Pareto) |
| **Avanzado** | Lo que distingue criterio/empleabilidad, sin caer en nicho |

- La **pregunta de autodiagnóstico** debe ser específica y verificable (no "¿sabes promesas?" sino "¿diferencia entre encadenar `.then()` y `Promise.all()`?").
- Usar términos técnicos en inglés, explicación en español (spanglish controlado, igual que el resto del sistema).

---

## Paso 3: Escribir el archivo con el formato de marcado

Guardar en `contexto/plan_estudio/diagnosticos/diagnostico_bloque-NN_[techs].md` con este formato (3 columnas de check para marcar con una `x`, sin copiar/pegar emojis):

```markdown
# 🩺 Diagnóstico — Bloque NN: [Nombre] ([techs])

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
- Frontmatter mínimo opcional (`bloque: NN`).

---

## Paso 4: Entregar para marcar

1. Avisar al usuario que el diagnóstico del bloque está listo y dónde.
2. Recordarle que marque con honestidad (los `🔄`/`❌` son el mapa, no un suspenso) y que puede dejar vacío lo que no sepa clasificar.
3. **No** avanzar a definir el proyecto (P-A de `practica_guiada_proyecto.md`) hasta que el usuario complete (o confirme) las marcas del bloque.

---

## Reglas anti-fricción

- **Corto y certero > largo y exhaustivo.** Si no se usa seguido, no entra.
- **No re-preguntar lo ya marcado.** Reutilizar marcas previas siempre.
- **El usuario solo pone `x`.** Tres columnas, cero copiar/pegar.
- **Calibrar al perfil:** no diagnosticar fundamentos que ya domina.
