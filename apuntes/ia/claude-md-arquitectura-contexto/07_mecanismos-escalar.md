---
tema: CLAUDE.md — Arquitectura de Contexto
workspace: ia
seccion: 7
titulo: "Mecanismos para escalar sin inflar"
estado: finalizada
prev: 06_carga-perezosa
next: 08_guiar-vs-imponer
---

# 🤖 Mecanismos para escalar sin inflar

La carga perezosa ya te da una herramienta poderosa para distribuir contexto por subdirectorios. Pero hay situaciones donde eso no alcanza:

- Tienes reglas que aplican a**archivos específicos** (no a un subdirectorio entero) — por ejemplo, todos los archivos`.test.ts` del repo, sin importar dónde estén.
- Tienes documentación procedimental larga (cómo correr migraciones, cómo desplegar, cómo manejar errores comunes) que**no debe vivir en el CLAUDE.md raíz** porque lo infla, pero tampoco encaja en un subdirectorio específico.
- Quieres**dividir tu CLAUDE.md raíz** en piezas más manejables sin perder funcionalidad.

Para estos casos, el ecosistema de Claude Code consolidó tres mecanismos adicionales. Cada uno resuelve un problema distinto.

## 🤖 `.claude/rules/` con path-scoping

> **`.claude/rules/` es una carpeta especial dentro de tu proyecto donde puedes poner archivos markdown con reglas que solo se cargan cuando Claude trabaja con ciertos archivos específicos.**
>
> Cada archivo de reglas puede limitar su carga con un encabezado especial (frontmatter YAML) que indica con un patrón qué archivos activan esa regla. Si Claude no toca esos archivos, la regla no entra al contexto.

Antes de seguir, conviene aclarar dos términos:

> **El frontmatter es un bloque al inicio de un archivo markdown, delimitado por `---`, donde se ponen metadatos del archivo (no contenido visible).**
>
> Se usa muchísimo en sistemas como Jekyll, Hugo, Obsidian, Next.js — cualquier herramienta que procesa markdown con configuración por archivo. YAML es el formato dentro del frontmatter (clave: valor).

> **El path-scoping (alcance por ruta) es el mecanismo que permite decir "este archivo solo aplica cuando se trabaja con archivos que coincidan con este patrón".**
>
> Es decir, en vez de "esta regla siempre está activa", dices "esta regla está activa solo cuando se tocan archivos `*.test.ts`" (por ejemplo).

Un archivo de reglas con path-scoping se ve así:

```markdown
---
paths:
  - "**/*.test.ts"
  - "**/*.spec.ts"
---

# Reglas para tests

- Usar `describe` para agrupar y `it` para casos individuales.
- Nombres de tests en español, descriptivos.
- Mockear servicios externos siempre, nunca llamar APIs reales.
```

**Cómo funciona:**

- Claude Code revisa los archivos en`.claude/rules/` al arrancar.
- Lee el`paths` de cada uno.
- Solo carga el archivo de reglas cuando estás trabajando con archivos que coinciden con esos patrones.

**Diferencia clave con la carga perezosa por subdirectorio:**


| Mecanismo                         | Granularidad               | Cuándo conviene                                                                                                                       |
| ----------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Carga perezosa por subdirectorio  | Por**carpeta**             | Tu repo está organizado por zonas (frontend, backend) y cada zona tiene reglas distintas                                              |
| `.claude/rules/` con path-scoping | Por**patrón de archivos** | Tienes reglas que aplican a archivos esparcidos por todo el repo (todos los tests, todas las migraciones, todos los componentes React) |

**Implicación práctica:** path-scoping es más quirúrgico. La carga perezosa te dice *"esto aplica cuando entras a este cuarto"*; el path-scoping te dice *"esto aplica cuando tocas este tipo de objeto, sin importar en qué cuarto esté"*.

## 🤖 Progressive disclosure con `agent_docs/`

> **Progressive disclosure es un patrón donde mantienes en CLAUDE.md solo un índice corto que apunta a archivos externos con la documentación detallada, y le indicas al agente que lea esos archivos solo si la tarea actual los necesita.**
>
> Es decir, en vez de meter toda la documentación en CLAUDE.md, mantienes una "tabla de contenidos" y dejas que el agente decida qué documentos abrir según lo que esté haciendo.

Antes de seguir, conviene aclarar el término:

> **"Progressive disclosure" (revelación progresiva) es un principio de diseño de interfaces que significa mostrar primero solo lo esencial y revelar el detalle a medida que se necesita.**
>
> En lugar de poner toda la información a la vez (lo cual sobrecarga al usuario), se muestra un resumen y se ofrece la opción de profundizar. Aplicado a CLAUDE.md, el "resumen" es el índice; los "detalles" son los archivos a los que apunta.

En la práctica, esto se ve así:

```plain
TU PROYECTO
├── CLAUDE.md                            ← Onboarding mínimo + índice
├── agent_docs/
│   ├── features/
│   │   ├── auth_oauth_decision.md       ← Por qué OAuth2 y no JWT puro
│   │   ├── cart_persistence_design.md   ← Decisiones del carrito persistente
│   │   ├── payment_provider_choice.md   ← Por qué Stripe vs MercadoPago
│   │   └── notifications_v2_plan.md     ← Plan para la siguiente versión
│   └── procedures/
│       ├── running_tests.md             ← Cómo correr tests, debug de fallos
│       └── deploying.md                 ← Cómo desplegar a staging y producción
└── src/
```

Y dentro de CLAUDE.md tendrías algo como:

```markdown
## Decisiones por feature (lee solo si vas a tocar ese feature)

- `agent_docs/features/auth_oauth_decision.md` — Para tareas que tocan autenticación, OAuth o NextAuth.
- `agent_docs/features/cart_persistence_design.md` — Para tareas relacionadas con el carrito o persistencia.
- `agent_docs/features/payment_provider_choice.md` — Para integraciones de pago.
- `agent_docs/features/notifications_v2_plan.md` — Si vas a trabajar en la siguiente versión de notificaciones.

## Procedimientos operativos

- `agent_docs/procedures/running_tests.md` — Para correr tests o entender por qué fallan.
- `agent_docs/procedures/deploying.md` — Para tareas de despliegue.
```

Imagina la diferencia con un menú de restaurante (CLAUDE.md). Si el menú tiene una receta completa de cada plato (todo el contenido inline), nadie lo lee y es pesadísimo. Si el menú tiene solo nombres y descripciones cortas (índice), y cada plato detallado está disponible en una carta aparte que el mesero te trae solo si pides ver ese plato (`agent_docs/`), todo funciona mejor: el menú principal es rápido de escanear, y la información profunda llega cuando se necesita.

**Regla de oro del progressive disclosure:** prefiere **punteros a copias**. En vez de copiar un fragmento de código o una explicación en CLAUDE.md, escribe una referencia tipo `src/services/auth.ts:42` que apunta al lugar donde vive la verdad. Las copias se desactualizan rápido; las referencias siempre apuntan al estado actual.

**Cuándo usarlo:** cuando tu CLAUDE.md empieza a tener secciones largas tipo *"cómo correr los tests"* o *"cómo hacer deploy"*, que no son onboarding universal pero sí son procedimientos que el agente necesita ocasionalmente. También cuando tienes **decisiones de diseño por feature** o **planes de versiones futuras** que son valiosísimos cuando se retoma ese feature, pero irrelevantes el resto del tiempo. Todo eso se mueve a `agent_docs/` y en CLAUDE.md solo queda el índice.

## 🤖 `@imports` — útiles pero ojo

> **`@imports` es una sintaxis que permite incluir el contenido de otro archivo dentro de un CLAUDE.md, usando `@ruta/al/archivo`. Sirve para organizar el contenido en piezas más manejables, pero NO ahorra presupuesto.**
>
> Es decir, son útiles para que tu CLAUDE.md raíz no sea un archivo de 200 líneas monolítico, pero el contenido importado se expande al arranque y consume el mismo espacio que si lo hubieras escrito directo.

La sintaxis se ve así:

```markdown
# CLAUDE.md raíz

## Stack y arquitectura
@docs/stack.md

## Comandos de desarrollo
@docs/commands.md

## Convenciones del equipo
@docs/conventions.md
```

Cuando Claude Code arranca, lee este archivo, ve los `@imports`, y reemplaza cada línea por el contenido completo del archivo importado. Lo que el modelo termina viendo es **un solo bloque grande** con todo expandido — exactamente lo mismo que si hubieras escrito todo inline.

Aquí hay un mito muy común que conviene desmontar:


| ❌ Mito                                                                                                 | ✅ Realidad                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| *"Si uso `@imports`, mi CLAUDE.md ocupa menos presupuesto porque el contenido vive en otros archivos."* | Falso. Los archivos importados se expanden al arranque y entran al presupuesto exactamente igual que si estuvieran escritos directo en el CLAUDE.md raíz. La diferencia es solo organizativa para ti, no de costo para el modelo. |
| *"`@imports` y progressive disclosure son lo mismo."*                                                   | Falso.`@imports` carga todo al arranque (eager). Progressive disclosure deja la decisión al agente sobre qué leer y cuándo (lazy). Para ahorrar presupuesto real, sirve el segundo, no el primero.                              |

**Cuándo usar `@imports`:** cuando quieres que tu CLAUDE.md raíz sea **legible para ti como humano** (en piezas separadas por tema), pero te da igual que para el modelo siga siendo el mismo costo. Es organización para ti, no optimización para el agente.

**Cuándo NO usar `@imports`:** cuando lo que querías era reducir el costo en presupuesto. Para eso, lo correcto es:

1. **Path-scoping con `.claude/rules/`** — para reglas que solo aplican a ciertos archivos.
2. **Progressive disclosure con `agent_docs/`** — para documentación que solo se necesita en ciertas tareas.
3. **Carga perezosa por subdirectorio** — para contexto que solo aplica a ciertas zonas del repo.

Debes recordar que estos tres mecanismos (path-scoping, progressive disclosure, carga perezosa) son los que de verdad **escalan sin inflar**. `@imports` es solo una herramienta organizativa.


---
[[06_carga-perezosa|← anterior]] · [[00_indice|índice]] · [[08_guiar-vs-imponer|siguiente →]]
