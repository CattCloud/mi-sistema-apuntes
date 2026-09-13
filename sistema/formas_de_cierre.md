# Formas de cierre — cómo se evalúa un módulo

> **Qué es:** el catálogo de formas de cerrar un módulo, y las reglas que decide el sistema (no el curso).
> **Dónde vive el cierre:** `99_cierre.md` de cada apunte. Ver `manual_apuntes.md` §7.1.
> **Qué NO es:** ni el repaso (`metodologia_repaso.md`, que mide retención semanas después) ni la práctica guiada por proyecto (`metodologia_practica_guiada.md`, que construye algo largo).

---

## Qué hace un cierre

Un cierre responde una sola pregunta: **¿el módulo sirvió para algo?** No mide si el apunte está bien escrito ni si se leyó entero. Mide si el conocimiento **cambia lo que la persona puede hacer o decidir**.

Por eso un cierre no es un resumen ni un cuestionario de repaso. Es la primera vez que el material se usa **sin el material delante**.

---

## Las cuatro reglas

### 1. Solo lo visto hasta ese punto

**Un cierre no puede exigir ningún concepto, servicio o herramienta que el temario todavía no haya cubierto.** Ni siquiera de paso.

Es la regla que más fácil se rompe, porque el cierre se escribe pensando en el mundo real —donde todo está mezclado— y no en el punto del recorrido donde está el alumno. El síntoma es una prueba que **no se puede aprobar**, y su efecto es peor que no evaluar: convierte un módulo terminado en una tarea bloqueada.

> ⚠️ **La comprobación:** recorrer el enunciado palabra por palabra y preguntarse, por cada sustantivo técnico, *"¿esto está en un módulo anterior o en este?"*. Si la respuesta es "en el siguiente", el enunciado se cambia — no se cambia el orden del temario.

### 2. El temario sugiere; el sistema diseña

Las evaluaciones que trae un temario apoyado en un curso externo son **una idea de partida**, no un límite. Suelen venir de lo que el curso podía evaluar con sus propios medios, y a menudo están desactualizadas o son genéricas.

El agente puede y debe proponer una forma mejor. La única obligación es que **mida la misma temática**; cómo la mida es decisión del sistema.

### 3. Intención declarada

Todo cierre dice **qué está midiendo y por qué esa forma**. Si no se puede escribir esa frase, la prueba no está diseñada — está copiada.

```text
❌  "Crea un usuario y un rol."
✅  "Mide si distingues cuándo una credencial permanente es aceptable
     y cuándo no. Se hace en consola porque la distinción solo se ve
     al tener las dos opciones delante."
```

### 4. Motivante y hacible hoy

Con la cuenta, el equipo y el nivel que hay **en ese momento**. Un cierre que empieza con *"primero levanta una base de datos"* cuando eso es tres módulos más adelante no es exigente: está mal puesto.

Y siempre que se pueda, **conectado al proyecto real de la persona** en lugar de a un ejemplo genérico. La misma pregunta sobre *su* producto se responde con más atención que sobre una tienda inventada.

---

## El catálogo

Nueve formas. La mayoría de los módulos cierran bien con **dos**: una de criterio y una de ejecución.

| # | Forma | Qué mide | Cuándo va bien | Qué necesita |
|---|-------|----------|----------------|--------------|
| 1 | **Caso de decisión** | Criterio: elegir y justificar el costo de lo descartado | El tema es elegir entre alternativas y ninguna es obviamente mejor | Nada |
| 2 | **Predicción y comprobación** | El modelo mental, antes de mirar | Hay algo ejecutable con un resultado observable | Un entorno mínimo |
| 3 | **Auditoría de artefacto** | Lectura: interpretar algo real y encontrar el problema | El tema produce documentos o configuración (una política, una factura, un `tsconfig`) | El artefacto |
| 4 | **Diagnóstico de fallo** | Depuración: del síntoma a la causa | El tema tiene errores característicos y confundibles entre sí | Un error real o descrito |
| 5 | **Procedimiento en consola o terminal** | Memoria procedimental: hacerlo sin guía | El objeto de estudio **es** una interfaz | Cuenta y permisos |
| 6 | **Micro-ejercicio** | Sintaxis y semántica | Lenguajes y librerías | Editor |
| 7 | **Quiz en vivo** | Recall puro | Cualquier tema con muchos datos discretos | El agente. **Una pregunta a la vez, nunca escrito en el apunte** |
| 8 | **Explicación (Feynman)** | Comprensión real vs. familiaridad | El riesgo es haberlo entendido a medias | Nada |
| 9 | **Diseño en papel** | Arquitectura y trade-offs | Construirlo sería caro o prematuro | Nada |

### Notas por forma

**1 · Caso de decisión.** El formato por defecto para temas de criterio. Una buena señal: si todas las preguntas se contestan leyendo una tabla del apunte, falta la pregunta que separa — normalmente una donde la respuesta correcta **no** es la misma que en la anterior.

**2 · Predicción y comprobación.** La más subestimada y probablemente la que más enseña. Se pide una predicción **por escrito** antes de ejecutar, luego se ejecuta y se compara. El valor no está en acertar: está en que una predicción fallida deja ver exactamente dónde está roto el modelo mental.

**3 · Auditoría de artefacto.** Excelente cuando no se puede construir nada todavía: leer no requiere permisos ni recursos. *"Aquí tienes esta política / esta factura / este archivo de configuración: ¿qué permite, qué cuesta, qué falta?"*

**4 · Diagnóstico de fallo.** Muy motivante porque se parece al trabajo real. Funciona especialmente bien cuando el módulo enseñó **errores parecidos con causas distintas** — el ejercicio es distinguirlos.

**5 · Procedimiento en consola.** Necesario cuando el objeto de estudio es la interfaz, pero es el que más fácil incumple la regla 1: casi todo procedimiento interesante toca servicios de otros módulos. Conviene acotarlo a lo que existe hoy.

**7 · Quiz en vivo.** Lo corre el agente, una pregunta a la vez, sin adelantar cuántas hay ni dar pistas antes de que responda. **Las preguntas no se escriben en el apunte** — un quiz visible de antemano no mide nada. El `99_cierre.md` solo lleva el disparador y el protocolo.

**8 · Explicación.** Pedir que se explique el concepto a alguien que no lo sabe, sin usar el vocabulario del apunte. Detecta al instante lo que se aprendió como fórmula.

---

## Cómo se elige la forma

```text
¿Se puede HACER algo con lo estudiado hasta aquí?
├── NO → formas 1, 3, 8, 9  (criterio y lectura, sin entorno)
└── SÍ
    │
    ¿Lo importante es el procedimiento o la decisión?
    ├── procedimiento → 5, y si hay resultado observable, 2
    └── decisión      → 1, y 4 si el módulo enseñó errores confundibles
```

Y una regla de variedad: **no todos los módulos deben cerrar igual**. Cuatro casos de decisión seguidos miden lo mismo cuatro veces y dejan de exigir atención.

---

## Anti-patrones

| Anti-patrón | Por qué falla |
|-------------|---------------|
| Pedir algo que use un tema del módulo siguiente | La prueba no se puede aprobar. Bloquea en vez de cerrar |
| Copiar la práctica que propone el curso sin revisarla | Suele estar desactualizada, y evalúa lo que el curso podía evaluar, no lo que el módulo enseñó |
| Un cierre sin intención escrita | Si no se puede decir qué mide, no mide |
| Todo del mismo tipo | Mide una sola capacidad y cansa |
| Ejercicios genéricos cuando hay un proyecto real disponible | Se responden con menos atención, y no dejan nada aprovechable |
| Escribir el quiz en el apunte | Se puede leer antes. Deja de medir recall |

---

## Formato del `99_cierre.md`

```markdown
---
tema: …
workspace: …
seccion: cierre
titulo: "Cierre del módulo — [formas elegidas]"
estado: pendiente | parcial | superado
prev: [última sección]
next: null
---

# [emoji] Cierre del módulo — …

> Quote: qué cierra el módulo y por qué estas formas.

## [emoji de la forma] [Nombre de la prueba]

[Enunciado]

**Qué mide:** [la intención declarada — regla 3]

**✅ Criterios de aceptación**
- [ ] …

## Cómo se evalúa

[Qué distingue una respuesta buena de una que solo repite el apunte]

---

## Estado del cierre

- [ ] …

Al resolverlo se anota el resultado aquí y en el bloque `repaso:` del `00_indice.md`.
```

> 📝 El `00_indice.md` **solo apunta** al cierre y muestra su estado. El enunciado nunca se duplica ahí: el índice es superficie de control, no de contenido (`manual_apuntes.md` §7.4).
