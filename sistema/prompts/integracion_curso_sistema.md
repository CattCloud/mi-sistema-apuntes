# Integración Curso ↔ Sistema

> **Qué es:** el protocolo para estudiar con un curso externo **sin** que el curso tome el control del sistema.
> **Cuándo aplica:** cualquier ruta de estudio apoyada en material de terceros (Udemy, YouTube, docs). Hoy: el temario de cloud.
> **Qué NO es:** una excusa para consumir el curso en línea recta.

---

## El principio

**El temario manda. El curso alimenta.**

El curso está organizado según los intereses de su autor — vender una certificación, cubrir un blueprint de examen, lucir completo. Ninguno de esos es tu objetivo. Si dejas que su índice sea tu ruta, estudias su plan, no el tuyo.

| | Rol |
|---|---|
| **Temario** | Fija el **alcance**. Qué se estudia y en qué orden |
| **Curso** | Aporta **contenido y procedimiento visual** para los huecos que sabe llenar |
| **Notas previas** *(Notion, apuntes viejos)* | Aportan la capa que el curso da por sabida |
| **Agente** | Aporta lo que ninguna de las dos cubre |

Un módulo del temario se arma con clases de **varias secciones distintas** del curso. Nunca al revés.

---

## El ciclo

```
1. El temario dice qué secciones del curso ver        ← alcance
2. Veo el contenido
3. Anoto en crudo: qué no entendí, qué me sorprendió,
   qué contradice lo que creía                        ← calibra, no define
4. Paso transcripción + notas crudas al agente
5. Se genera el apunte del MÓDULO, cubriendo TODAS sus temáticas
6. Cierre: la evaluación del módulo, sin el video delante
```

> ⚠️ **El alcance nunca lo fijan las notas ni la transcripción.** El apunte cubre las temáticas del módulo completas, se hayan mencionado o no en el video. **La prueba:** si el alumno no anota nada, el apunte sale igual de completo — solo menos afinado a él.

---

## Qué entra al apunte y qué no

La transcripción trae mucho que **no** es material de estudio. El agente filtra antes de generar.

### 🚫 Se descarta siempre

| Tipo | Ejemplo real |
|------|--------------|
| **Marketing del proveedor** | Qué empresas famosas usan el servicio, casos de éxito, cuota de mercado |
| **Historia corporativa** | Cuándo se fundó, cómo creció, hitos de la compañía |
| **Meta-comentario del curso** | *"la interfaz de AWS cambia seguido"*, *"esta clase la actualicé"*, *"suscríbete al canal" * |
| **Logística** | Cómo descargar las slides, dónde está el foro, cómo dejar reseña |
| **Preparación de examen** | Trucos para el test, cómo inscribirse, qué preguntan |
| **Muletillas y transiciones** | *"bien, entonces, como les decía…"* |

> 💡 **El criterio:** ¿esto cambia algo que voy a decidir o hacer? Si no, fuera. Un dato interesante que no cambia una decisión es ruido.

### ✅ Se conserva

- El **concepto** y por qué existe (el dolor que resuelve)
- El **procedimiento**: qué se configura y por qué ese valor
- Las **trampas**: lo escondido, lo que rompe si se omite
- Los **límites y números**: timeouts, cuotas, tamaños máximos
- El **costo** y qué lo dispara
- Los **criterios de elección** entre alternativas

---

## Diapositivas vs. interfaz

Los cursos alternan dos modos, y **cada uno alimenta códigos distintos**:

| Modo de la clase | Qué produce | Códigos que alimenta |
|------------------|-------------|----------------------|
| **Diapositivas** | Concepto, comparativas, diagramas | `[DEF]` `[DOLOR]` `[TABLA]` `[FLUJO]` `[ANALOGÍA]` `[MITO]` |
| **Interfaz en pantalla** | Procedimiento, campos, trampas | `[CONSOLA]` `[COSTO_SERVICIO]` |

> ⚠️ **No forzar `[CONSOLA]` sobre una clase de diapositivas.** Si el instructor no abrió la consola, no hay procedimiento que registrar — y un procedimiento inventado es peor que ninguno.

Y al revés: una clase de puros clics sin explicación conceptual produce `[CONSOLA]` y nada más. No hay que exprimirle un `[DEF]` que no dio.

---

## Cuando el curso da por sabido lo básico

Es frecuente: un curso de *"Introducción a **AWS**"* no es *"Introducción a **Cloud**"*. Asume que ya sabes qué es la nube, qué es IaaS, qué es un servicio gestionado.

**El temario debe cubrir esa capa igual.** Tres fuentes posibles, en este orden:

1. **Notas previas del alumno** — si ya estudió el tema antes, esa es la mejor fuente: está en su voz y ya la procesó una vez
2. **El agente** — genera lo que falte
3. **Material externo adicional** — último recurso, y se anota en `📚 Recursos`

> Nunca se omite una temática porque "el curso no la dio". El curso no define el alcance.

---

## Dónde vive cada cosa

```
apuntes/[ws]/
├── notion/                       ← tier referencia: notas previas migradas tal cual
│   └── ...                          (ver migracion_notion.md)
└── [modulo]/
    ├── 00_indice.md              ← esqueleto + códigos + estado
    ├── _input/                   ← insumos crudos, NO son el apunte
    │   ├── transcripcion_sXX.md
    │   └── notas_crudas.md
    ├── 01_[slug].md              ← el apunte (una temática = un archivo)
    └── 02_[slug].md
```

- `_input/` es material de trabajo. No se repasa, no se publica, puede borrarse después.
- `notion/` es **tier referencia**: se conserva tal cual, no se reescribe.

### Notas previas: ¿tier referencia o materia prima?

No todas las notas viejas merecen el mismo trato. La pregunta que decide es **si fueron escritas para el objetivo de hoy**:

| Situación | Tratamiento | Dónde |
|-----------|-------------|-------|
| La nota está alineada al objetivo actual y bien dimensionada | **Tier referencia** — se conserva, se consulta, no se reescribe | `apuntes/[ws]/notion/` |
| La nota es extensa, de otra época o con otro alcance | **Materia prima** — se filtra por el temario y se regenera | `apuntes/[ws]/_input/notion/` |

> 💡 Una nota escrita para un objetivo distinto **arrastra el alcance de ese objetivo**. Conservarla tal cual reintroduce por la puerta de atrás justo lo que el temario decidió excluir. En ese caso es insumo, no producto.

Al regenerar desde materia prima:
- Los **diagramas viejos en imagen** (PNG exportados de Notion) se rehacen nativos — ASCII o Mermaid, según `manual_apuntes.md` §5. No se arrastran como adjuntos.
- Lo que queda fuera del temario pero valga la pena **no se borra: va a `NOTAS.md`**.

---

## Errores que este protocolo previene

| Error | Cómo se ve | Qué lo evita |
|-------|-----------|--------------|
| El curso secuestra la ruta | Apuntes con nombres de servicios del proveedor | El temario fija el alcance |
| El apunte es un resumen del instructor | Cubre solo lo que el video dijo | Las temáticas se cubren completas |
| El apunte es un resumen de las dudas del alumno | Cubre solo lo que él anotó | Las notas calibran profundidad, no cobertura |
| El apunte se llena de ruido | Historia de la empresa, casos de éxito | La tabla de descarte |
| El procedimiento se pudre | *"clic en el botón naranja"* | `[CONSOLA]` registra intención, no clics |
| Se estudia en línea recta | 39 horas de video vistas en orden | El sílabo se filtra antes de empezar |

---

## Antes de empezar un curso nuevo

1. **Capturar el sílabo completo** (es público antes de comprar) y guardarlo en `contexto/plan_estudio/silabo_curso_[x].md`
2. **Filtrarlo contra el temario**: marcar ✅ ver / 🔶 parcial / ⬜ saltar, clase por clase
3. **Calcular la duración real** y dejarla escrita — es el número que desarma la parálisis del "son 40 horas"
4. **Mapear sección → módulo del temario**, y declarar los huecos que el curso no cubre
