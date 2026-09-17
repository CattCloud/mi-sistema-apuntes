---
name: notebooklm
description: Preparar material de NotebookLM (hoy Gemini Notebook) a partir de los apuntes de Tesla — exportar las clases de un módulo como fuentes limpias, decir qué subir y redactar el prompt de un mapa mental o una presentación por clase. Usar cuando el usuario pide un mapa mental, una presentación o diapositivas de una clase o de un módulo, quiere subir apuntes a NotebookLM, o avisa que un campo de la herramienta no coincide con lo que ve.
---

# NotebookLM: fuentes limpias y un material por clase

> **Qué produce:** las fuentes de un módulo en `notebooklm/` y, por clase, un prompt listo para pegar en el diálogo de Studio.
> **Modo:** manual (D7). El usuario sube las fuentes, marca la clase y pega el prompt; el agente exporta y redacta.
> **Independiente del repaso (D35).** Decisiones y su porqué: `contexto/plan_notebooklm.md`.

## Reglas

1. **Anti-invención.** Solo se nombran campos, opciones y botones que estén en `referencias/herramienta.md`. Si el usuario no ve algo, o pide algo que la referencia no cubre: pedirle una captura del diálogo, actualizar la referencia con fecha y fuente, y recién entonces seguir. La interfaz real manda (R8).
2. **La clase se elige en la interfaz, no en el prompt (D32).** Se le dice al usuario qué fuentes marcar en el selector *Fuentes* del diálogo. El prompt nunca nombra archivos, clases ni fuentes.
3. **Cobertura pareja (D33).** Todas las temáticas de la clase entran con el mismo peso y ninguna se omite. Lo más difícil puede llevar más explicación, sin quitarle espacio al resto. `reforzar:` no se usa.
4. **Grounded.** NotebookLM solo usa las fuentes marcadas. El prompt dirige (orden, estructura, énfasis, audiencia); nunca aporta hechos ni pide explicar algo que la clase no trae.
5. **Pedagogía sobre estética (D34).** Código literal de la clase cuando se explica un ejemplo; tablas y diagramas cuando ordenan; nada de imágenes o gráficos de relleno.
6. **Fuentes limpias o nada.** Las fuentes salen solo del script. Nunca se editan a mano ni se sube el apunte original.

## Paso 1 — Preparar las fuentes

1. Correr el export del módulo:

   ```bash
   node .claude/skills/notebooklm/scripts/exportar.mjs apuntes/<ruta>/<modulo>
   ```

2. Si **no exporta**, resolver lo que lista en `limpieza/<ruta>/<modulo>.json` (formato y criterios en `referencias/fuentes.md`) y volver a correrlo hasta que exporte:
   - **Referencia sin limpiar** → leer la frase en el apunte y escribir un reemplazo `["texto exacto", "texto limpio"]` que se sostenga sin la otra clase.
   - **Imagen sin revisar** → abrirla. `"excluir — motivo"` si muestra datos de la cuenta (R9); si no, `"subir"`.
   - **Reemplazo sin uso** → el apunte cambió; ajustar o borrar ese reemplazo.
3. Pasarle al usuario, del resultado del script: el **nombre del notebook** (crearlo o buscarlo con ese nombre exacto, D25) y qué fuentes **subir**, **volver a subir** (quitando antes la vieja) o **quitar**.

## Paso 2 — Elegir el material

Un material por clase. Si el usuario no dice para qué lo quiere, proponer el primero de la tabla.

| Para qué | Material | Opciones del diálogo |
|---|---|---|
| Estudiar la clase o volver a ella leyendo por su cuenta | Presentación | Formato **Presentación detallada** · Duración **Predeterminada** · idioma **español** (D36) |
| Estudiar la clase respondiendo preguntas: cada hoja es una pregunta y el chat la explica con un clic (D37, D38) | Mapa mental | Solo fuentes y tema: el diálogo no tiene más opciones |
| Exponer la clase a otras personas | Presentación | Formato **Diapositivas del presentador** · Duración **Predeterminada** · idioma **español** |
| Poco tiempo | Presentación | Formato **Presentación detallada** · Duración **Corto** · idioma **español** |

**Fuentes a marcar:** el `.md` de la clase y sus imágenes (mismo prefijo `MX-NN_`). Si la clase usa un término que se define en otra clase del módulo y el usuario quiere que se explique, marcar también esa clase.

## Paso 3 — Redactar el prompt

1. Leer la clase **exportada** (`notebooklm/<ruta>/<modulo>/MX-NN_….md`), no el original: es lo que NotebookLM va a leer.
2. Sacar de ella: las temáticas (sus `##`, en orden, sin "Lo que debiste llevarte"), los ejemplos de código, las tablas y diagramas, y lo difícil (quotes 🔑 **Matiz**, ⚠️ **Cuidado**, pares ❌ **Mito** / ✅ **Realidad**).
3. Rellenar `plantillas/presentacion.md` o `plantillas/mapa-mental.md`, siguiendo `referencias/principios.md`.

## Paso 4 — Entregar

Escribir `notebooklm/<ruta>/<modulo>/_prompts/MX-NN_slug.md`: un archivo por clase, con una sección por material. Cada sección lleva:

1. Una tabla **Campo del diálogo → Qué poner**, con cada campo tal como aparece en `referencias/herramienta.md`: formato, idioma, duración, las fuentes a marcar y la caja de texto.
2. El texto para la caja, en un bloque de código listo para copiar.

En el chat, dar la ruta del archivo y lo que conviene revisar en el resultado. La carpeta `_prompts/` no se sube y el script no la toca. No se registra qué materiales se generaron: el notebook es el registro (D22).

## Mapa

| Archivo | Para qué |
|---|---|
| `referencias/herramienta.md` | Campos verificados de la interfaz, con fecha y fuente |
| `referencias/fuentes.md` | El export: qué entra, transformaciones, `limpieza/`, nombres |
| `referencias/principios.md` | Cómo redactar prompts pedagógicos para NotebookLM |
| `plantillas/presentacion.md` · `plantillas/mapa-mental.md` | Las plantillas, con un ejemplo real cada una |
| `scripts/exportar.mjs` | El export |
| `limpieza/<ruta>/<modulo>.json` | Reemplazos y decisión sobre imágenes, por módulo |
| `referencias/img/` | Capturas de los diálogos reales |
