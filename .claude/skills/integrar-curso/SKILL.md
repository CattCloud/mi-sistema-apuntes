---
name: integrar-curso
description: Estudiar un módulo de Tesla apoyado en un curso externo (Udemy, YouTube, docs) sin que el curso tome el control — filtrar el sílabo y las transcripciones contra el temario, decidir qué se descarta, distinguir diapositivas de interfaz y tratar notas previas. Usar cuando el usuario comparte una transcripción, capturas del curso o notas crudas de una clase, o va a empezar un curso nuevo.
---

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
   (la diseña el temario, no el curso — ver más abajo)
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
│   └── ...                          (ver skill `migrar-notion`)
└── [modulo]/
    ├── 00_indice.md              ← esqueleto + códigos + estado
    ├── _input/                   ← insumos crudos, NO son el apunte
    │   ├── transcripcion_sXX.md
    │   └── notas_crudas.md
    ├── 01_[slug].md              ← el apunte (una temática = un archivo)
    ├── 02_[slug].md
    ├── guia_[slug].md            ← procedimiento de referencia, NO se repasa
    └── 99_cierre.md              ← la evaluación del módulo
```

- `_input/` es material de trabajo. No se repasa, no se publica, puede borrarse después.
- `notion/` es **tier referencia**: se conserva tal cual, no se reescribe.

### Los tres artefactos de un módulo

Dentro de la carpeta del módulo conviven tres cosas distintas, y mezclarlas es lo que ensucia el repaso: el ciclo de recall termina preguntándote por un comando de instalación.

| Artefacto | Archivo | Qué responde | ¿Entra al repaso? | ¿Caduca? |
|-----------|---------|--------------|:-----------------:|:--------:|
| **Sección** | `NN_[slug].md` | *¿Qué es y por qué?* — el criterio | ✅ sí, es el material de recall | no |
| **Guía** | `guia_[slug].md` · `tipo: guía` · `estado: referencia` | *¿Cómo se ejecuta hoy?* — el procedimiento | ❌ se consulta cuando hace falta | sí |
| **Cierre** | `99_cierre.md` | *¿Lo sabes?* — la demostración | ❌ pero alimenta el `reforzar:` | no |

> 🧪 **El test que decide: ¿esto se pudre?** Si el proveedor cambia una pantalla mañana y el texto queda mal → es **guía**. Si sigue siendo verdad aunque rediseñen toda la consola → es **sección**.
>
> **Segundo test, si el primero no basta:** ¿lo meterías en un audio de NotebookLM para repasarlo? Si suena absurdo escucharlo, es guía.

**Cuando uno necesita del otro** —que es lo normal— no se duplica, se enlaza: **la sección explica por qué existe el paso; la guía dice cómo se teclea hoy.** La guía abre declarando qué es y a qué sección pertenece el concepto.

> 📌 Ejemplo vivo: `apuntes/cloud/b3-identidad/guia_cli-instalacion-configuracion.md` — el procedimiento de instalar la CLI, con el concepto (qué es una clave de acceso, por qué importa dónde vive) enlazado a `04_formas-de-entrar`, no repetido.

### Notas previas: ¿tier referencia o materia prima?

No todas las notas viejas merecen el mismo trato. La pregunta que decide es **si fueron escritas para el objetivo de hoy**:

| Situación | Tratamiento | Dónde |
|-----------|-------------|-------|
| La nota está alineada al objetivo actual y bien dimensionada | **Tier referencia** — se conserva, se consulta, no se reescribe | `apuntes/[ws]/notion/` |
| La nota es extensa, de otra época o con otro alcance | **Materia prima** — se filtra por el temario y se regenera | `apuntes/[ws]/_input/notion/` |

> 💡 Una nota escrita para un objetivo distinto **arrastra el alcance de ese objetivo**. Conservarla tal cual reintroduce por la puerta de atrás justo lo que el temario decidió excluir. En ese caso es insumo, no producto.

Al regenerar desde materia prima:
- Los **diagramas viejos en imagen** (PNG exportados de Notion) se rehacen nativos — ASCII o Mermaid, según `.claude/skills/generar-apunte/estilo.md` §5. No se arrastran como adjuntos.
- Lo que queda fuera del temario pero valga la pena **no se borra: va a `NOTAS.md`**.

---

## El cierre lo diseña el temario, no el curso

El principio *"el temario manda, el curso alimenta"* aplica al **contenido** del apunte y también —sobre todo— a **cómo se evalúa**. El curso es una fuente de *cómo se ve* la consola; nunca la definición de qué demuestra que dominas el módulo.

> ⚠️ **Si el video muestra una interfaz vieja, el cierre pide el resultado, no la ruta de clics.** *"Que ese servicio pueda escribir en ese bucket y en ningún otro"* sobrevive a cualquier rediseño; *"clic en el botón naranja"* no.

### La vara: un cierre que no se puede fallar no es un cierre

| # | Requisito | Qué descarta |
|---|-----------|--------------|
| 1 | **Falible** — existe una respuesta equivocada *plausible* | El recorrido guiado: *"ubica el selector de región"*. Lo ubicas o lo ubicas. |
| 2 | **Sin el material delante** | La guía disfrazada de evaluación |
| 3 | **Deja un artefacto o un veredicto** — el `.js` compilado, el rol que funciona, la clasificación justificada | El *"ya lo leí"* |
| 4 | **La respuesta fácil es tentadora y cara** — *"acceso completo a S3"* funciona, y por eso evalúa | El ejercicio sin costo de oportunidad |

> 🚩 **Síntoma de cierre pobre:** se hace en un par de minutos y se aprueba siempre. Si nunca encuentra nada, no está midiendo nada.
>
> Un buen cierre puede aprobarse **y aun así enseñar**: el caso de `arquitectura/m1` salió 5/5 y aun así detectó tres errores de criterio que hoy están en su `reforzar:`.

### La forma del cierre según la ruta

| Ruta | Forma | Qué demuestra | Anti-patrón |
|------|-------|---------------|-------------|
| **Criterio** (arquitectura) | Caso de decisión: clasificar, ordenar, justificar con **un solo criterio** | Que decides, no que recitas | Pedir definiciones |
| **Lenguaje** (TypeScript) | Micro-ejercicio con el compilador + quiz de lectura | Que tu modelo mental coincide con lo que hace la máquina | Escribir código bonito |
| **Operación** (cloud) | Práctica con estado verificable + caso | Que operas y sabes lo que cuesta | Recorrer pantallas |

### El patrón para una práctica de operación: construir → predecir → romper

1. **Construir** algo con estado observable — no *"ubica la pantalla"* sino *"que este servicio escriba en este bucket y en ningún otro"*.
2. **Predecir por escrito qué va a pasar, antes de mirar.** ← el paso que convierte un recorrido en evaluación. Es gratis, toma segundos, y es donde se falla.
3. **Romper a propósito y comparar** con la predicción — quitar el permiso, cambiar de región, apagar el rol. Después, **limpiar el recurso** (que además es la lección de costos).

---

## Errores que este protocolo previene

| Error | Cómo se ve | Qué lo evita |
|-------|-----------|--------------|
| El curso secuestra la ruta | Apuntes con nombres de servicios del proveedor | El temario fija el alcance |
| El apunte es un resumen del instructor | Cubre solo lo que el video dijo | Las temáticas se cubren completas |
| El apunte es un resumen de las dudas del alumno | Cubre solo lo que él anotó | Las notas calibran profundidad, no cobertura |
| El apunte se llena de ruido | Historia de la empresa, casos de éxito | La tabla de descarte |
| El procedimiento se pudre | *"clic en el botón naranja"* | `[CONSOLA]` registra intención, no clics |
| El cierre lo diseña el curso | Una práctica de clics que se aprueba sola en dos minutos | El cierre lo diseña el temario, y debe poder fallarse |
| Se estudia en línea recta | 39 horas de video vistas en orden | El sílabo se filtra antes de empezar |

---

## Antes de empezar un curso nuevo

1. **Capturar el sílabo completo** (es público antes de comprar) y guardarlo en `contexto/plan_estudio/silabo_curso_[x].md`
2. **Filtrarlo contra el temario**: marcar ✅ ver / 🔶 parcial / ⬜ saltar, clase por clase
3. **Calcular la duración real** y dejarla escrita — es el número que desarma la parálisis del "son 40 horas"
4. **Mapear sección → módulo del temario**, y declarar los huecos que el curso no cubre
