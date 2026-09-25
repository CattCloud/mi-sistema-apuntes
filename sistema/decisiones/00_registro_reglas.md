# 📒 Registro de reglas

> Una fila por regla nueva o corrección del usuario sobre cómo trabajar: fecha, la regla en una frase y dónde vive. Lo escribe el procedimiento `nueva-regla`. Las primeras filas son las reglas que el 2026-09-15 se trajeron desde la memoria del agente y desde el manual al repositorio.

| Fecha | Regla | Dónde vive |
|---|---|---|
| 2026-08-19 | "Entendí a medias" no frena el avance: lo pendiente va a `reforzar:` y se sigue | `AGENTS.md` R10 |
| 2026-08-21 | En los apuntes, específico y no ambiguo (controles verificables y patrones que fallaron) | `apuntes/AGENTS.md` A6 |
| 2026-08-25 | Los quizzes se corren en vivo, una pregunta a la vez, y nunca se escriben en el apunte | `AGENTS.md` R7 · `contexto/plan_estudio/AGENTS.md` T2 |
| 2026-09-08 | Las imágenes que deja el usuario entran al apunte, con pie que dice qué retener | `apuntes/AGENTS.md` A9 |
| 2026-09-08 | La cuenta AWS de trabajo es GreenCloud y la región real es `us-east-2` | `sistema/perfil/entorno_aws.md` |
| 2026-09-11 | Obsidian queda fuera del sistema; los `.md` se leen en VS Code / Antigravity | `AGENTS.md` (Qué es Tesla) · `README.md` |
| 2026-09-15 | Arquitectura de reglas en seis piezas | `sistema/decisiones/decision_arquitectura_reglas.md` |
| 2026-09-15 | El repo es público: ni ID de cuenta, alias, usuarios IAM ni estado de MFA en archivos versionados; los ejemplos usan `123456789012` y los datos de acceso van a `entorno_aws.local.md` | `AGENTS.md` R9 · `.claude/hooks/reglas.json` |
| 2026-09-15 | "Lo que debiste llevarte" admite de 3 a 7 ideas (antes 3-5; 6-7 es la práctica real y es correcta) | `apuntes/AGENTS.md` A7 |
| 2026-09-15 | El guardián omite por ahora `apuntes/ia/`, escrito antes de las reglas actuales | `.claude/hooks/reglas.json` (`omitir_por_ahora`) |
| 2026-09-16 | Aprobar un paso no autoriza el siguiente: sección, cierre o repaso empiezan solo a pedido explícito | `AGENTS.md` R4 · `generar-apunte` paso 7 |
| 2026-09-16 | Un error en el apunte no se parchea: se reescribe el fragmento completo y los lugares que lo repiten | `AGENTS.md` R5 · `generar-apunte` paso 6 |
| 2026-09-18 | Un temario se recorre por bloques de módulos: cada bloque cierra en su propio proyecto, entre bloques se puede saltar de ruta, y dónde se corta lo decide el usuario sin categoría fija | `contexto/plan_estudio/AGENTS.md` T7 |
| 2026-09-18 | La práctica deja **un solo archivo** por proyecto (`00_proyecto.md` junto al código, en `practica/<ruta>/<id>-<slug>/`); las historias de usuario se dan en vivo, una por sesión, y no se archivan | skill `practicar` · `sistema/metodologia_practica_guiada.md` |
| 2026-09-18 | El instructor acompaña sin interrumpir: sin mensajes no pedidos mientras el alumno construye y sin revisar por adelantado. Monta el entorno, pero nunca las firmas ni la lógica que pide el ejercicio | skill `practicar` |
| 2026-09-18 | El diseño pedagógico (fases de un proyecto, su orden, qué ejercita cada una) lo decide el agente y se presenta decidido; no se le pregunta al usuario si va así. Se consulta el alcance del sistema, no el criterio de instructor | skill `practicar` · `AGENTS.md` R11 |
| 2026-09-18 | El revisor corre **antes** de enseñarle la sección al usuario, no después de que la apruebe: el usuario no relee lo que ya dio por bueno, así que una corrección posterior arregla el archivo pero no lo que aprendió | skill `generar-apunte` pasos 3-4 · `p4-sintetizar.md` |
| 2026-09-18 | El enunciado de un ejercicio tiene cuatro bloques (qué se construye · entrada y salida exactas · restricciones · hecho cuando) y el criterio lo comprueba una máquina, nunca una frase que juzgue el agente. Los pasos y los punteros a otros módulos son pistas y van a petición (R6) | skill `cerrar-modulo` regla 5 |
| 2026-09-18 | El agente resuelve el ejercicio con lo cubierto hasta ese punto **antes** de entregarlo, para saber si es hacible y cuál es la fricción real | skill `cerrar-modulo` regla 6 |
| 2026-09-18 | La forma nueva de redactar ejercicios rige **desde M4 de TypeScript en adelante**; los cierres y micro-ejercicios de módulos ya cerrados no se reescriben | decisión del usuario |
