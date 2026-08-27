---
tema: B2 — Costos y facturación
workspace: cloud
seccion: cierre
titulo: "Cierre del módulo — práctica en consola y caso"
estado: parcial
prev: 04_estimar-antes
next: null
---

# ☁️ Cierre del módulo — práctica y caso

> **El módulo no cierra al terminar las secciones.** Cierra aquí, y cierran **las dos**: la práctica en consola *y* el caso.
>
> Estado: 🧩 caso ✅ resuelto el 22 de agosto de 2026 · 🛠️ práctica 🔄 a medias.

## 🛠️ Práctica en consola — estima a ciegas, después compara

**Hecho ✅ (22-08-2026):** presupuesto `alerta-gasto-cero` creado y en buen estado (plantilla de gasto cero: importe 1,00 USD, aviso a 0,01).

> ⚠️ **Criterio ajustado respecto al temario original.** El temario pedía *"verificar que llega el correo"*, pero con gasto cero la alerta no se dispara nunca: la práctica se aprobaba sola. Lo verificable hoy es que el presupuesto exista con su umbral, su tipo y su destinatario. Que el correo llegue se comprueba en **B4**, con recursos encendidos.

**⬜ Pendiente — la parte que sí se puede fallar:**

**1. A ciegas.** Sin abrir la calculadora, la consola ni los apuntes:
   - Escribe las **cuatro unidades de cobro** y marca cuáles cobran *por existir* y cuáles *por usar*.
   - Estima la factura mensual del escenario del caso (10 000 correos/mes) con el método completo: **unidades → volumen → precio → total → forma**.
   - Anota el número. Ese número es la respuesta que se evalúa.

**2. Compara** contra la calculadora oficial y contra el desglose real de tu cuenta.

**3. Explica cada desviación mayor al 20%.** El total no es lo que se califica — se califica si sabes *por qué* te desviaste: ¿te faltó un concepto, confundiste la unidad, o asumiste que un costo fijo escalaba?

**4. Cierra con la alerta:** ¿dónde van sus **dos números** (previsto al 80%, tope 1,5–2×) y por qué **no** en el estimado exacto?

> 🧹 Nada que limpiar: la estimación no crea recursos. El presupuesto se queda.

## 🧩 Caso de decisión

> Tu gestor de correos con IA va a procesar 10.000 correos al mes. Cada uno dispara una llamada a un LLM, guarda 2 KB de resultado y sirve una interfaz web.
>
> **1.** Lista todos los conceptos que te van a cobrar. ¿Cuál sospechas que domina la factura?
> **2.** Uno de los costos mayores **no es del proveedor de nube**. ¿Cuál, y por qué se olvida siempre?
> **3.** Estima el total mensual con el cálculo a la vista. ¿En qué monto pondrías la alerta y por qué no en el estimado exacto?

### Resultado — ✅ aprobado con correcciones (22 de agosto de 2026)

Identificó los tokens como el costo dominante **y** como el que no es del proveedor de nube — las dos preguntas centrales.

**Corregido en sesión:**

- **Faltaron cómputo y almacenamiento** en la lista de conceptos.
- **Los costos fijos no escalan con el volumen:** con 16× el volumen la factura crece ×16, no ×20. El que domina hoy puede no dominar mañana.
- **El gatillo del contexto acumulativo aplica a conversaciones**, no a llamadas independientes.
- **La alerta en el estimado exacto produce falsos positivos** — van dos números, no uno.

Todo quedó anotado en el bloque `repaso:` del `00_indice.md`.

---
[[00_indice|índice]]
