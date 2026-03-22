# 📋 Tareas de Transición: Del Sistema Actual al Sistema Futuro

> Lista secuencial de tareas para construir el sistema automatizado de generación de apuntes.  
> Cada tarea tiene dependencias explícitas. No avanzar a la siguiente sin completar sus prerequisitos.  
> Fecha de inicio: 22 de Marzo, 2026

---

## Mapa de Dependencias

```
T1 ──► T3 ──► T4 ──────────────────────────────────────┐
                                                        ▼
T2 ──► T3     T5 ──► T6 ──► T7 ──► T8 ──► T9 ──► T10 (SKILL)
                                                        │
                                                   T11 (FEAT)
```

---

## Tarea 1: Documentar el Sistema Actual y Futuro

**Estado:** ✅ Completada  
**Dependencias:** Ninguna  
**Output:**
- `sistema_apuntes_actual.md` — Cómo funciona el sistema hoy
- `sistema_apuntes_futuro.md` — Cómo funcionará el sistema automatizado
- `tareas_transicion.md` — Este documento

**Criterio de completado:** Ambos documentos revisados y aprobados.

---

## Tarea 2: Recopilar Apuntes Existentes de Notion como Material de Referencia

**Estado:** ⬜ Pendiente  
**Dependencias:** Ninguna (puede hacerse en paralelo con T1)  
**Propósito:** Obtener material real de los apuntes existentes para que el agente aprenda el tono de redacción, el estilo de síntesis y los patrones de formato que usa el usuario.

**Subtareas:**
1. Identificar los workspaces de programación en Notion que contienen los apuntes
2. Seleccionar apuntes representativos de cada arquetipo:
   - Al menos 1 apunte tipo **Constructor Teórico** (concepto nuevo desde cero)
   - Al menos 1 apunte tipo **Sintaxis Coder** (herramientas y fragmentos)
   - Al menos 1 apunte tipo **Flujo Analógico** (procesos complejos con analogías)
   - Al menos 1 apunte tipo **Documento Técnico de Arquitectura** (temas avanzados)
3. Exportar o copiar el contenido de esos apuntes al repositorio (carpeta `referencia/` o similar)
4. Documentar brevemente por qué se eligió cada apunte (qué lo hace representativo)

**Output:** Carpeta con apuntes de referencia + índice de selección  
**Criterio de completado:** Al menos 4 apuntes recopilados (1 por arquetipo), disponibles en el repo.

---

## Tarea 3: Finalizar el Manual de Patrones de Estilo

**Estado:** ⬜ Pendiente  
**Dependencias:** T1 (sistema documentado) + T2 (apuntes de referencia recopilados)  
**Propósito:** Convertir `manual_apuntes_cattcloud.md` de un borrador inicial a un documento definitivo y validado que el agente usará como referencia para generar contenido con el estilo del usuario.

**Subtareas:**
1. Revisar el `manual_apuntes_cattcloud.md` actual contra los apuntes reales recopilados en T2
2. Validar que los 4 arquetipos descritos reflejan fielmente los patrones reales
3. Corregir o agregar patrones que no se hayan identificado en la versión inicial
4. Agregar ejemplos concretos extraídos de los apuntes reales para cada arquetipo
5. Documentar el tono de síntesis: cómo el usuario fusiona información de múltiples fuentes

**Output:** `manual_apuntes_cattcloud.md` actualizado y marcado como versión definitiva  
**Criterio de completado:** El usuario revisa el manual y confirma que refleja fielmente su estilo. El agente puede usarlo como referencia sin ambigüedades.

---

## Tarea 4: Definir la Estructura de Carpetas del Repositorio

**Estado:** ⬜ Pendiente  
**Dependencias:** T1 (documentos base existentes), T3 (manual finalizado)  
**Propósito:** Organizar el repositorio `mis-apuntes-dev` para que contenga de forma clara todos los recursos que el agente necesita.

**Subtareas:**
1. Definir la estructura de carpetas propuesta (ej. `contexto/`, `referencia/`, `prompts/`, `output/`, `.agent/skills/`)
2. Mover los archivos existentes a sus ubicaciones correctas
3. Crear un `README.md` del repo que explique el propósito y estructura del proyecto

**Output:** Repositorio organizado con estructura clara  
**Criterio de completado:** Cada archivo tiene una ubicación lógica. Un agente nuevo podría entender el repo leyendo el README.

---

## Tarea 5: Crear el Prompt de Identificación de Tema

**Estado:** ⬜ Pendiente  
**Dependencias:** T3 (manual finalizado como contexto)  
**Propósito:** Diseñar el prompt interno que el agente usará para analizar el input del usuario e identificar el tema de estudio.

**Subtareas:**
1. Definir qué información recibe el prompt (input del usuario: texto, transcripción, enlace, descripción, etc.)
2. Definir qué debe producir:
   - Nombre del tema identificado
   - Alcance sugerido (qué incluye y qué no)
   - Recomendación de dividir si el tema es demasiado amplio
3. Redactar el prompt
4. Probarlo con 2-3 inputs reales variados (ej. un video de YouTube, un tema de Udemy, un roadmap)
5. Iterar hasta que los resultados sean consistentes

**Output:** Prompt documentado y probado  
**Criterio de completado:** El prompt identifica correctamente el tema y sugiere división cuando es necesario, en al menos 3 pruebas con inputs diferentes.

---

## Tarea 6: Crear el Prompt de Definición de Esqueleto / Estructura

**Estado:** ⬜ Pendiente  
**Dependencias:** T3 (manual de patrones) + T5 (tema ya identificado como input)  
**Propósito:** Diseñar el prompt que el agente usará para proponer la estructura/esqueleto del apunte.

**Subtareas:**
1. Definir qué información recibe el prompt:
   - Tema identificado (de T5)
   - Manual de patrones de estilo
   - Arquetipo sugerido (Constructor Teórico, Sintaxis Coder, etc.)
2. Definir qué debe producir:
   - Lista numerada de secciones y subsecciones
   - Arquetipo aplicado y justificación
   - Indicación del nivel de profundidad sugerido por subsección
3. Redactar el prompt
4. Probarlo con los mismos 2-3 temas usados en T5
5. Iterar hasta que las estructuras propuestas sean coherentes con el manual de patrones

**Output:** Prompt documentado y probado  
**Criterio de completado:** El prompt genera estructuras que respetan los arquetipos del manual y el usuario las aprueba con ajustes mínimos.

---

## Tarea 7: Crear el Prompt de Generación de Prompts para las IAs Externas

**Estado:** ⬜ Pendiente  
**Dependencias:** T6 (estructura definida como input)  
**Propósito:** Diseñar el prompt que el agente usará para generar los prompts que el usuario copiará y pegará en ChatGPT, Gemini y Claude.

**Subtareas:**
1. Definir qué información recibe el prompt:
   - Tema + estructura aprobada
   - Subsección específica a generar
   - Contexto adicional del input original (si aplica)
2. Definir qué debe producir por cada subsección:
   - Un prompt listo para copiar/pegar
   - Contextualizado al tema y a la subsección
   - Con el nivel de detalle y enfoque esperado
3. Redactar el prompt
4. Probarlo: generar prompts para 2-3 subsecciones → ejecutarlos en las 3 IAs → evaluar si los outputs son útiles
5. Iterar según la calidad de las respuestas obtenidas en las IAs externas

**Output:** Prompt documentado y probado  
**Criterio de completado:** Los prompts generados producen respuestas de calidad en las 3 IAs que sean comparables y sintetizables.

---

## Tarea 8: Crear el Prompt de Síntesis Basada en Estilo Propio

**Estado:** ⬜ Pendiente  
**Dependencias:** T3 (manual de patrones) + T2 (apuntes de referencia) + T7 (outputs de las IAs disponibles)  
**Propósito:** Diseñar el prompt que el agente usará para proponer una síntesis unificada en el tono y estilo de redacción del usuario.

**Subtareas:**
1. Definir qué información recibe el prompt:
   - Los 3 outputs de las IAs externas (para la subsección en cuestión)
   - Manual de patrones de estilo
   - Apuntes de referencia (para tono y redacción)
   - Arquetipo y formato que corresponde
2. Definir qué debe producir:
   - Una síntesis unificada que combine lo mejor de las 3 IAs
   - Redactada en el tono del usuario (didáctico, spanglish, analogías)
   - Con el formato visual esperado (quotes, callouts, toggles, etc.)
3. Redactar el prompt
4. Probarlo con outputs reales de la T7
5. Comparar la síntesis propuesta con la que el usuario haría manualmente
6. Iterar hasta que el usuario sienta que "suena a mí"

**Output:** Prompt documentado y probado  
**Criterio de completado:** El usuario revisa la síntesis propuesta y la acepta con ajustes menores (no reescritura completa).

---

## Tarea 9: Prueba de Flujo End-to-End Manual

**Estado:** ⬜ Pendiente  
**Dependencias:** T5 + T6 + T7 + T8 (todos los prompts listos)  
**Propósito:** Ejecutar el flujo completo de forma manual (sin skill) para validar que todos los pasos funcionan en secuencia antes de automatizarlos.

**Subtareas:**
1. Elegir un tema real de estudio
2. Ejecutar cada paso manualmente en orden:
   - Input → Prompt T5 → Tema identificado ✓
   - Tema → Prompt T6 → Estructura propuesta ✓
   - Estructura → Prompt T7 → Prompts generados ✓
   - Prompts → 3 IAs → Outputs obtenidos ✓
   - Outputs → Prompt T8 → Síntesis propuesta ✓
3. Crear la página en Notion con el resultado
4. Documentar:
   - Qué funcionó bien
   - Qué necesita ajustes
   - Tiempo total del proceso (comparar con la hora+ del sistema actual)
5. Ajustar prompts si es necesario

**Output:** Un apunte completo generado con el nuevo flujo + documento de retrospectiva  
**Criterio de completado:** Un apunte de calidad comparable al sistema actual pero con menor esfuerzo cognitivo y tiempo. Los ajustes menores están documentados.

---

## Tarea 10: Construir la Skill del Agente

**Estado:** ⬜ Pendiente  
**Dependencias:** T9 (flujo validado de punta a punta)  
**Propósito:** Encapsular todo el flujo validado en una skill ejecutable desde el chat del agente.

**Subtareas:**
1. Diseñar la estructura de la skill:
   - `SKILL.md` con instrucciones del flujo
   - Referencia a los prompts y documentos del repo
   - Checkpoints de aprobación del usuario en cada fase
2. Implementar la skill con el flujo de 6 fases:
   - Fase 1: Recibir input
   - Fase 2: Identificar tema (checkpoint: usuario confirma)
   - Fase 3: Definir estructura (checkpoint: usuario confirma)
   - Fase 4: Generar prompts (output: archivo con prompts listos)
   - Fase 5: Recibir outputs y proponer síntesis (checkpoint: usuario aprueba cada subsección)
   - Fase 6: Generar archivo final con todo el contenido sintetizado
3. Probar la skill con un tema real
4. Iterar según feedback

**Output:** Skill funcional en `.agent/skills/generacion-apuntes/`  
**Criterio de completado:** La skill se invoca, ejecuta todos los pasos con checkpoints, y produce un apunte de calidad.

---

## Tarea 11: Skill de Prompts para NotebookLM (Feature Futuro)

**Estado:** ⬜ Pendiente (Feature adicional)  
**Dependencias:** T10 (skill principal funcionando)  
**Propósito:** Automatizar la generación de prompts de personalización para NotebookLM (videos, audios, cuestionarios).

**Subtareas:**
1. Investigar cómo dar instrucciones de calidad a la personalización de contenido en NotebookLM
2. Documentar las mejores prácticas encontradas
3. Diseñar el prompt que genere instrucciones de personalización para:
   - Videos / Audios de repaso
   - Cuestionarios interactivos
   - Presentaciones para exponer
4. Construir la skill que, dado un apunte terminado, genere los prompts de personalización para NotebookLM

**Output:** Skill funcional + documentación de mejores prácticas de NotebookLM  
**Criterio de completado:** Los prompts de personalización generados producen contenido de calidad superior en NotebookLM comparado con subir el apunte sin personalización.

---

## Resumen Visual de Progreso

| # | Tarea | Estado | Dependencia |
|---|---|---|---|
| T1 | Documentar sistema actual y futuro | ✅ | — |
| T2 | Recopilar apuntes de Notion como referencia | ⬜ | — |
| T3 | Finalizar manual de patrones de estilo | ⬜ | T1, T2 |
| T4 | Definir estructura de carpetas del repo | ⬜ | T1, T3 |
| T5 | Crear prompt de identificación de tema | ⬜ | T3 |
| T6 | Crear prompt de definición de esqueleto | ⬜ | T3, T5 |
| T7 | Crear prompt de generación de prompts para IAs | ⬜ | T6 |
| T8 | Crear prompt de síntesis con estilo propio | ⬜ | T3, T2, T7 |
| T9 | Prueba de flujo end-to-end manual | ⬜ | T5-T8 |
| T10 | Construir la skill del agente | ⬜ | T9 |
| T11 | Skill de prompts para NotebookLM (feat) | ⬜ | T10 |

---

> Última actualización: **22 de Marzo, 2026**
