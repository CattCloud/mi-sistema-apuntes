---
tema: B2 — Costos y facturación
workspace: cloud
estado: FINALIZADO       # generación ✅. El cierre —práctica y caso— va aparte, en 99_cierre.md
arquetipo: Documento Técnico + Constructor Teórico
modulo: B2
temario: contexto/plan_estudio/temario_cloud_developers.md
repaso:
  ultimo: null                # aún sin sesión de repaso; generado el 2026-08-22
  proximo: 2026-08-26
  nivel: null
  reforzar:
    - los costos fijos no escalan con el volumen: el que domina hoy puede no dominar mañana
    - el gatillo del contexto acumulativo aplica a conversaciones, no a llamadas independientes
    - la alerta se calibra contra la desviación (dos números: previsto al 80%, tope a 1,5-2x)
    - las cuatro unidades de cobro y cuáles cobran por existir vs por usar
notebooklm: pendiente
---

# ☁️ B2 — Costos y facturación

> **Cómo te cobran, qué dispara una factura inesperada, y cómo lo sabes *antes* de desplegar.** Estado: ✅ FINALIZADO · 4 secciones.

## Alcance

Cubre: las unidades reales de facturación (tiempo, request, GB-mes, GB de salida), por qué la salida se paga y la entrada no, qué sigue cobrando aunque no lo uses, cómo se lee el desglose de la factura, qué cubre la capa gratuita y cuándo caduca, los tres olvidos que disparan la factura sorpresa, el costo de los tokens de un LLM, el presupuesto con alerta como red de seguridad, y el método para estimar el costo mensual de una arquitectura antes de construirla.

Excluye: optimización de costos a escala, instancias reservadas, spot, savings plans (nivel 3) · el detalle de cada servicio, que se estudia en su módulo (**B4**–**B7**).

> 🎯 **Regla de este módulo:** aquí se enseña el **modelo de cobro**, no los servicios. Un servicio se nombra como ejemplo de una unidad de facturación, con una línea de qué es la primera vez que aparece — nunca se explica en profundidad. Si una sección necesita explicar un servicio para entenderse, ese contenido pertenece a otro módulo.

## Secciones

1. [[01_como-se-factura|Cómo se factura la nube]] — ✅ `[DOLOR] [TABLA] [COSTO_SERVICIO] [CONSOLA]`
   - El dolor: la factura no cuadra con lo que crees tener encendido
   - Las cuatro unidades de cobro
   - Por qué la entrada es gratis y la salida se paga
   - Lo que sigue cobrando aunque no lo estés usando
   - Dónde se lee la factura — el desglose por servicio
2. [[02_free-tier|Free tier y sus trampas]] — ✅ `[DEF] [TABLA] [MITO]`
   - Qué es la capa gratuita y qué NO es
   - Los tipos de gratuidad — y cuál caduca
   - La trampa del límite por dimensión
   - Qué pasa el día que se acaba
3. [[03_gatillo-factura-sorpresa|El gatillo de la factura sorpresa]] — ✅ `[DOLOR] [TABLA] [CONSOLA]`
   - Los tres olvidos clásicos
   - El costo que NO es del proveedor de nube: los tokens
   - Cuando el gasto no lo generas tú — bucles y abuso
   - La red de seguridad: presupuesto y alerta
   - La lista de limpieza — qué apagar y en qué orden
4. [[04_estimar-antes|Estimar antes de desplegar]] — ✅ `[FASES] [TABLA] [COSTO_SERVICIO]`
   - Por qué la calculadora oficial no te salva
   - El método: unidades → volumen → precio → total → forma
   - Estimación trabajada: el gestor de correos con IA
   - Dónde pones la alerta y por qué no en el estimado exacto

## Cierre del módulo

El módulo **no cierra al terminar las secciones**. Su práctica en consola y su caso viven en su propio archivo:

- [[99_cierre|🧪 Cierre — práctica en consola y caso]] — 🧩 caso ✅ (22-08-2026) · 🛠️ práctica 🔄 a medias

## Fuentes

- 🎬 Curso AWS DVA — **S5** *Configuración de AWS Budgets* (9:42) → `apuntes/cloud/_input/transcripcion_s5_budgets.txt`
- 🎬 Curso AWS DVA — **S32** *Lista de limpieza* (2 min, documento) → `apuntes/cloud/_input/s32_lista_limpieza.md`
- 📊 Estado real de la cuenta (plan gratuito nuevo, 100 USD de crédito) → `apuntes/cloud/_input/estado_cuenta_free_tier.md`
- 🧠 El agente — **2.3 y 2.4 completas**: el curso da la herramienta, no el criterio

> ⚠️ **Hueco declarado:** el curso enseña a poner una alerta, no a estimar. La Sección 4 es enteramente nuestra.
>
> ⚠️ **Fuente caducada:** lo que S5 dice sobre la capa gratuita es de agosto de 2022 y **no aplica a esta cuenta**. La Sección 2 se escribe contra el estado real de la cuenta, no contra el video.

## Adiciones pendientes

- Ver `NOTAS.md`.
