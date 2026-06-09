# Checklist: Evaluación del presupuesto

> Para medir si el CLAUDE.md actual está dentro del presupuesto recomendado y dónde está el problema si no lo está. Aplicar al CLAUDE.md durante el Paso 3 del workflow `auditar_existente.md`.

---

## Métricas a calcular

### 1. Líneas totales

```bash
wc -l CLAUDE.md
```

Categorías:
- **< 100 líneas:** holgado. El archivo está dentro del núcleo mínimo o cerca.
- **100-150 líneas:** zona razonable. Verificar que toda línea aporte.
- **150-200 líneas:** al límite. Probablemente hay capas que se ganaron — considerar mover algo a `agent_docs/`.
- **200-300 líneas:** sobrecargado. Hay antipatrones casi con certeza. Refactor necesario.
- **> 300 líneas:** crítico. El archivo está perjudicando activamente al agente.

### 2. Instrucciones efectivas (estimadas)

No todas las líneas son instrucciones. Restar:
- Líneas en blanco.
- Headers de markdown (`#`, `##`, `###`).
- Separadores (`---`, líneas de equals/dashes).
- Cierres de bloques de código.
- Tablas que son referencia visual pero no instrucciones (mapas simples).

Lo que queda son las **instrucciones efectivas**. Comparar contra el presupuesto:

| Modelo | Presupuesto aproximado |
|---|---|
| Modelos frontera con razonamiento (Claude Opus / Sonnet recientes) | ~150-200 instrucciones |
| Modelos más pequeños (Haiku, etc.) | Bastante menos |

Si tu CLAUDE.md tiene **>100 instrucciones efectivas**, ya estás ocupando una porción importante del presupuesto.

### 3. Ratio universal vs puntual

Por cada bloque del archivo, clasificar:
- **Universal:** aplica en cualquier sesión, independientemente de la tarea. Ej: stack, mapa del repo, comandos generales.
- **Puntual:** solo aplica en algunas sesiones. Ej: decisiones de un feature específico, procedimientos que se usan ocasionalmente, "Features recientes".

Calcular porcentaje aproximado de cada tipo.

| Ratio | Diagnóstico |
|---|---|
| >80% universal | Bien. El archivo es onboarding puro. |
| 50-80% universal | Mejorable. Hay contenido puntual que conviene mover. |
| <50% universal | Mal. La mayoría del archivo es bitácora o detalle de features específicos. Refactor necesario. |

---

## Cómo presentar el resultado al usuario

```
📏 PRESUPUESTO DE CLAUDE.md

LÍNEAS:
- Totales: [N]
- Instrucciones efectivas estimadas: [M]
- Diagnóstico: [holgado / razonable / al límite / sobrecargado / crítico]

RATIO UNIVERSAL VS PUNTUAL:
- Universal: [X%] ([qué bloques caen aquí])
- Puntual: [Y%] ([qué bloques caen aquí])
- Diagnóstico: [bien / mejorable / mal]

CONCLUSIÓN:
[1-2 oraciones que resumen si el archivo cabe en el presupuesto o no, y cuál es el problema principal si no cabe]
```

---

## Cómo conectar con el resto del diagnóstico

Si las métricas del presupuesto están mal:

- **Líneas totales muy altas + ratio universal alto:** el problema es exceso de procedimientos universales detallados → `agent_docs/procedures/`.
- **Líneas totales medias + ratio universal bajo:** el problema es bitácora disfrazada de features → `agent_docs/features/` o eliminación.
- **Líneas totales medias + reglas para tipos de archivo específicos:** path-scoping → `.claude/rules/`.
- **Líneas totales altas + reglas para subdirectorios diferenciados:** monorepo no aprovechado → CLAUDE.md por componente.

---

## Notas técnicas para el agente

- **No obsesionarse con números exactos.** El presupuesto es una guía, no un umbral mágico. Un archivo de 160 líneas perfectamente curado puede funcionar mejor que uno de 80 líneas mal escrito.
- **La calidad de las instrucciones importa más que la cantidad.** Una instrucción ambigua o redundante cuenta como ruido aunque ocupe poca línea.
- **Si el ratio universal vs puntual es bueno y las líneas son altas, es señal de proyecto grande con buena disciplina — no necesariamente algo a refactorizar.** Evaluar con sensatez antes de proponer cambios.
