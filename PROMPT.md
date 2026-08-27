# Prompt de arranque — B1 Fundamentos de Cloud

> Copiar y pegar el bloque de abajo al iniciar la nueva conversación.

---

Vamos a generar el **apunte del módulo B1 — Fundamentos de Cloud** del temario de nube, siguiendo el flujo Tesla (P2 → P3⇄P4, sección por sección).

## Lee esto antes de hacer nada

En este orden:

1. `contexto/plan_estudio/temario_cloud_developers.md` — el temario. **B1 es el módulo a generar.** Fija el alcance: 4 temáticas, ninguna se omite.
2. `sistema/prompts/integracion_curso_sistema.md` — cómo se integra un curso externo sin que secuestre el sistema. **Lee especialmente la tabla de qué se descarta de una transcripción.**
3. `sistema/manual_apuntes.md` — voz, formato y anatomía. Presta atención a §1.1 (un apunte = varios archivos), §1.3 (sin preámbulo), §1.6 ("Lo que debiste llevarte"), §3.5 (patrón Dolor/Problema).
4. `sistema/prompts/p2_esqueleto_estructura.md` — la tabla de **códigos de indicación** (incluye los nuevos `[CONSOLA]` y `[COSTO_SERVICIO]`).
5. `sistema/prompts/p3_prompts_ias_externas.md` — plantillas de cada código + el paso de autocrítica.
6. `sistema/prompts/p4_sintesis_estilo_propio.md` — la síntesis final.

## Las fuentes de B1


| Fuente | Ruta | Alimenta |
|---|---|---|
| 📓 Notion — ¿Qué es Cloud Computing? | `apuntes/cloud/_input/notion/TEMA 1 ¿Qué es Cloud Computing*.md` | **1.1** (fuente principal) |
| 📓 Notion — Modelos de Servicio | `apuntes/cloud/_input/notion/TEMA 2 Modelos de Servicio*.md` | **1.2** (fuente principal) |
| 🎬 Transcripción S3 — Introducción a AWS | `apuntes/cloud/_input/transcripcion_s3_introduccion-aws.txt` | 1.3, 1.4 |
| 🧠 Tú | — | lo que falte |

> ⚠️ Las notas de Notion son **materia prima, no tier referencia**. Se escribieron para un objetivo más amplio (Cloud Computing en general) y arrastran alcance que este temario excluye: comparativa de proveedores, modelos de despliegue, edge cloud. **Filtra por las temáticas de B1, no copies.**

## Reglas críticas

**El alcance lo fija el temario.** Las 4 temáticas se cubren completas, se hayan mencionado o no en el video o en Notion. Si una fuente no la cubre, la generas tú.

**Qué NO entra al apunte** (está en el protocolo, pero repito lo que ya detecté viendo S3):
- Marketing del proveedor — qué empresas usan AWS, casos de éxito, cuota de mercado
- Historia corporativa
- Meta-comentario del curso — *"la interfaz de AWS cambia seguido"*, *"esta clase la actualicé"*
- Logística y preparación de examen

El criterio: **¿esto cambia algo que voy a decidir o hacer?** Si no, fuera.

**Diapositivas vs. interfaz.** S3 es mayormente diapositivas más un recorrido de consola. No fuerces `[CONSOLA]` donde el instructor no abrió la consola.

**Un apunte = varios archivos.** `1 temática = 1 archivo de sección`. La densidad se maneja partiendo, no plegando.

## Cómo proceder

**Paso 1 — P2.** Propón el esqueleto de B1 con sus **códigos de indicación** por temática y espera mi aprobación. Crea después `apuntes/cloud/b1-fundamentos-cloud/00_indice.md` con alcance, arquetipo, secciones y estado.

**Paso 2 — P3⇄P4, sección por sección.** Por cada una: generas, te autocriticas, sintetizas en estilo Tesla, escribes el archivo, yo ajusto en vivo, y recién ahí pasas a la siguiente. **No generes las 4 de golpe.**

**Marca `⚠️ verificar`** todo dato del que no estés seguro — cifras, nombres de pantallas, límites de servicio. En nube es donde más te puedes equivocar con seguridad.

## Estado actual

- ✅ Vi la sección S3 completa (Introducción a AWS, 22 min)
- ✅ **B1 está completamente alimentado.** No falta ningún video.
- No tomé notas crudas de S3.

> La temática **1.3 (responsabilidad compartida)** sale de Notion, no del curso: `TEMA 2` la trata en su sección *"MODELO DE RESPONSABILIDAD COMPARTIDA"* con tabla por modelo de servicio, y `Servicios Core SECURITY & IDENTITY` la repite con diagrama. Esa versión es **mejor** que la del curso porque ata la responsabilidad a IaaS/PaaS/SaaS — o sea, conecta 1.3 con 1.2.

## Arranca preguntando

No empieces a generar. Lee todo lo de arriba, y arranca proponiéndome el **esqueleto de P2 con los códigos**.
