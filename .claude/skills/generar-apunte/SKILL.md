---
name: generar-apunte
description: Crear o continuar un apunte de Tesla con el flujo P1→P2→P3⇄P4 (tema, esqueleto, generación y síntesis sección por sección, escrita directo al .md). Usar cuando el usuario quiere estudiar o apuntar un tema, arrancar un módulo de un temario, continuar la siguiente sección, integrar una duda al apunte, o pausar y retomar un apunte.
---

# Generar un apunte (P1 → P4)

Reglas que rigen: R1-R5, R8, R10 (`AGENTS.md`) y A1-A12 (`apuntes/AGENTS.md`). Estilo —voz, formato visual, arquetipos, diagramas, síntesis—: `estilo.md` (en esta carpeta).

## Archivos de este procedimiento

| Archivo | Fase | Se lee |
|---|---|---|
| `p1-tema.md` | P1 — identificar y acotar el tema, workspace y arquetipo; crear la carpeta y el índice | Solo en temas que no vienen de un temario |
| `p2-esqueleto.md` | P2 — el esqueleto con códigos de indicación | Solo si el temario no fija el esqueleto |
| `p3-generar.md` | P3 — generar el borrador de la sección y autocriticarlo | Una vez por conversación, antes de la primera sección |
| `p4-sintetizar.md` | P4 — sintetizar en estilo Tesla, escribir al `.md`, co-editar | Una vez por conversación, antes de la primera sección |
| `estilo.md` | La guía de estilo | Antes de P2 y de P4 |

## Por dónde entrar

| Situación | Qué se hace |
|---|---|
| Tema nuevo, sin temario | P1 → aprobación → P2 → aprobación → P3⇄P4 (R4) |
| Módulo de un temario | El temario ya resuelve P1 y casi todo P2 (T1): crear el `00_indice.md` con el esqueleto del temario, confirmarlo y entrar a P3⇄P4. Si el módulo usa un curso externo, antes: `integrar-curso` |
| Continuar | Leer el `00_indice.md` (R1) y seguir desde la primera sección ⬜ o 🔄 |
| Retomar un apunte `PAUSADO` | Resumir en pocas líneas: secciones ✅, primera ⬜, pendientes y `⚠️ verificar`, "Siguiente paso al retomar". El usuario confirma o ajusta (si ajusta una decisión previa, actualizar la cabecera del índice). Estado → `EN PROGRESO` |
| Pausar para cambiar de tema | Confirmar en una línea. Dejar el índice con las secciones en su estado real, los pendientes y `⚠️ verificar`, una línea "Siguiente paso al retomar" y las decisiones nuevas del hilo. Estado → `PAUSADO`. La pausa no descarta nada |

## Por cada sección (P3⇄P4)

1. Generar el borrador y autocriticarlo; marcar `⚠️ verificar` lo dudoso (`p3-generar.md`).
2. Sintetizar en estilo Tesla y escribir `NN_slug.md` con frontmatter, quote-gancho, "Lo que debiste llevarte" y navegación (A3-A7).
3. En el índice, la sección pasa a 🔄. Avisar al usuario **sin re-pegar el contenido**, con el bloque "⚠️ Para verificar" solo si hay datos dudosos.
4. El usuario lee y ajusta en vivo: **releer el `.md` antes de volver a tocarlo** (R3).
5. Aprobada: `estado: finalizada`, ✅ en el índice, `prev`/`next` de la sección y de sus vecinas.
6. Delegar la revisión al revisor (`revisor-tesla`) y corregir lo que confirme.
7. Siguiente sección. **Nunca varias de golpe.** Si el usuario corrige lo mismo dos veces, aplicarlo a las secciones siguientes y proponer registrarlo con `nueva-regla`.

## Durante: preguntas y adiciones (apunte abierto, A11)

**Apunte Vivo.** Después de responder una pregunta del usuario, evaluar si la propia respuesta:

- trae una analogía, un ejemplo real o una reformulación más clara que lo escrito;
- define un término que el apunte usaba sin definir;
- conecta el concepto con algo que el usuario ya conoce (su stack, su trabajo);
- añade un matiz importante que faltaba;
- responde una pregunta que otro lector tendría.

Señales del usuario de que valió: *"ahora sí lo entiendo"*, *"así me tienes que explicar"*, *"no había escuchado eso"*. Si se cumple alguna, proponer: *"Esto enriquece la sección [X]. Te propongo integrarlo como [forma]. ¿Lo integro?"* No proponer integrar cada respuesta: la mayoría son ajustes operativos.

**Dónde se integra** (manda la lógica didáctica del esqueleto, no dónde surgió la pregunta):

| Encaja en | Acción |
|---|---|
| La sección actual | Integrar ahora, reescribiendo la sección |
| Una sección previa ya escrita | Releer ese archivo, integrar ahí y avisar |
| Una sección futura | Anotarlo en su entrada del `00_indice.md` para integrarlo al llegar |
| Ninguna, pero es valioso | Proponer una subsección nueva, o `NOTAS.md` si excede el alcance |

**Guardián de alcance** (R10). Si la pregunta se sale del alcance: responderla igual y advertir *"esto merece su propio espacio; ¿lo anoto en `NOTAS.md`?"*. Cabe como adición si se cubre con un quote y 2-3 párrafos; si necesita su propio esqueleto, o ya estaba en "Excluye", es otro apunte.

## Al terminar el módulo

Todas las secciones ✅ → `estado: FINALIZADO` en el índice → cierre del módulo con `cerrar-modulo` (según la regla de su ruta, T6) → actualizar las columnas de estado del índice del workspace y del temario (T5).
