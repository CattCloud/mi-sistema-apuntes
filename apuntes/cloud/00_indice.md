# ☁️ Cloud for Developers — Índice del workspace

> Workspace de apuntes de **nube nivel 2 (dev que opera lo suyo)**: contenedor, BD gestionada, storage, secretos y factura.
> Fuente única del esqueleto, las prácticas de consola y los casos de cierre: `contexto/plan_estudio/temario_cloud_developers.md`.
> Estados de apunte: `EN PROGRESO` · `PAUSADO` · `FINALIZADO`.

> 📝 **Nota de método:** el marcado ✅/🔄/❌ del temario **no filtra** qué se estudia — calibra la profundidad de cada sección. Todas las temáticas del módulo se cubren completas, se hayan mencionado o no en el curso.
>
> ☁️ **Única ruta apoyada en curso externo.** El temario manda, el curso alimenta: protocolo en `sistema/prompts/integracion_curso_sistema.md`, sílabo filtrado en `contexto/plan_estudio/silabo_curso_aws_dva.md`. Las transcripciones y las notas de Notion viven en `apuntes/cloud/_input/` como materia prima, no como apuntes.

| # | Módulo (= apunte) | Temáticas | Video | Estado | Carpeta |
|---|-------------------|:---------:|:-----:|--------|---------|
| **B1** | Fundamentos de Cloud | 4 | ~24 min | ✅ secciones · caso ✅ · **práctica 🔄** (recorrido a medias) | `b1-fundamentos-cloud/` |
| **B2** | Costos y facturación | 4 | ~12 min | ✅ secciones · caso ✅ · **práctica 🔄** (falta el desglose por tipo de uso) | `b2-costos-facturacion/` |
| **B3** | Identidad — quién eres y qué puedes hacer | 6 | ~48 min | ✅ secciones · cierre ⏸️ **aplazado hasta después de B4** | `b3-identidad/` |
| **B4** | Cómputo: la máquina virtual | 5 | ~37 min | 🔄 EN PROGRESO (2/5 secciones) | `b4-computo-maquina-virtual/` |
| B4b | Contenedores y Docker | 6 | ~1 h 09 | ⬜ | — |
| B5 | Serverless: funciones y API | 7 | ~2 h 28 | ⬜ | — |
| B3b | Secretos — dónde vive una clave | 5 | ~1 h 18 | ⬜ | — |
| B6 | Datos: base gestionada y storage | 6 | ~1 h 46 | ⬜ | — |
| B7 | Redes mínimas | 6 | ~2 h 15 | ⬜ | — |
| B8 | Despliegue, logs y observabilidad | 4 | ~1 h 19 | ⬜ | — |
| B9 | Trabajo asíncrono para apps con IA | 5 | ~1 h 17 | ⬜ | — |

**Orden de estudio:** el del temario — **B3b va después de B5**, no junto a B3. Conserva el número por ser la otra mitad de Identidad, pero los secretos se entienden cuando ya hay algo desplegado que los consuma.

> **Regla de cierre:** un módulo pasa a ✅ cuando pasan **las dos**: la **práctica en consola** (sin el video delante) y el **caso de decisión** resuelto sin ayuda. Escribir las secciones no cierra el módulo — el cierre vive en su propio `99_cierre.md`, igual que en arquitectura y TypeScript.

> 🎯 **El cierre lo diseña el temario, no el curso.** Un cierre que se aprueba siguiendo pasos no evalúa nada: tiene que poder fallarse. En cloud la forma es **construir → predecir → romper** — se predice por escrito qué va a pasar *antes* de mirar, y esa predicción es lo que se califica. Ver `sistema/prompts/integracion_curso_sistema.md`.

> ⚠️ **B1 y B2 tienen el caso aprobado pero la práctica en consola a medias.** B1: falta comparar el selector de región entre un servicio global y uno regional, y observar la recarga al cambiar de región. B2: falta ubicar el desglose de gasto por tipo de uso en Cost Explorer. B3 tiene sus tres pruebas (auditoría, predicción, caso) sin empezar — aplazadas a propósito hasta después de B4, porque hoy solo hay dos identidades que auditar.
