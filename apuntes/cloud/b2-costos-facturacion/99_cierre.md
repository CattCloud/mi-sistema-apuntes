---
tema: B2 — Costos y facturación
workspace: cloud
seccion: cierre
titulo: "Cierre del módulo — consola y caso"
estado: parcial
prev: 04_estimar-antes
next: null
---

# ☁️ Cierre del módulo — consola y caso

> **El módulo no cierra al terminar de leer las secciones.** Cierra cuando el presupuesto está puesto y el caso se resuelve con el cálculo a la vista.

## 🛠️ Prueba 1 — El presupuesto y el desglose

Dejar configurado un **presupuesto con alerta** y ubicar el **desglose de gasto por servicio**.

**Qué mide:** si el gasto dejó de ser invisible. No es configurar por configurar — un presupuesto puesto y un desglose que sabes leer son las dos únicas cosas que convierten la factura en información **antes** de que llegue.

**✅ Criterios de aceptación**

- [x] El presupuesto aparece en la lista, en estado *En buen estado*, con su importe y su destinatario.
- [x] El panel de inicio deja de pedir configuración en el monitor de costos.
- [ ] Ubicado el desglose de gasto **por tipo de uso** en Cost Explorer.

> ⚠️ **Criterio ajustado respecto al temario.** El temario pide *"verificar que llega el correo"*, pero con gasto cero **la alerta no se dispara nunca**: no hay nada que cruce el umbral. Lo verificable hoy es que el presupuesto exista, con su umbral, su tipo (real o previsto) y su destinatario. Que el correo llegue se comprueba en **B4**, con recursos encendidos.
>
> 📝 **Estado (2026-08-22):** presupuesto `alerta-gasto-cero` creado — plantilla de gasto cero, importe 1,00 USD, aviso a 0,01. Falta el desglose: Cost Explorer tarda hasta 24 h en preparar los datos tras la primera visita.

## 🧩 Prueba 2 — El caso

> Tu gestor de correos con IA va a procesar **10.000 correos al mes**. Cada uno dispara una llamada a un LLM, guarda 2 KB de resultado y sirve una interfaz web.

**1.** Lista todos los conceptos que te van a cobrar. ¿Cuál sospechas que domina la factura?

**2.** Uno de los costos mayores **no es del proveedor de nube**. ¿Cuál, y por qué se olvida siempre?

**3.** Estima el total mensual con el cálculo a la vista. ¿En qué monto pondrías la alerta, y por qué **no** en el estimado exacto?

**4.** El producto funciona y pasas a **200.000 correos al mes**. ¿Se multiplica la factura por veinte? Recorre cada línea y di si crece proporcional, si crece pero no proporcional, o si no crece.

**Qué mide:** si sabes **leer** una estimación y no solo producirla. Las tres primeras preguntas se responden con la tabla de unidades de cobro; la cuarta obliga a mirar **cómo crece cada línea**, que es la parte que decide una arquitectura.

> 💡 **Por qué la cuarta:** las tres primeras miden si sabes estimar; la cuarta mide si sabes leer lo estimado. El concepto que domina la factura hoy puede no ser el que la domine cuando el producto crezca.

## Cómo se evalúa

- La **1 y la 2** se contestan con la tabla de unidades de cobro.
- La **3** tiene dos mitades: el número necesita precios (que se miran, no se memorizan), pero **dónde poner la alerta es criterio puro** y no necesita ninguno.
- La **4** es la que separa: si la respuesta es "×20", faltó ver que **los costos fijos no escalan con el volumen**.

---

## Estado del cierre

- [x] **Caso resuelto** — ✅ aprobado con correcciones el 2026-08-22. Identificó los tokens como el costo dominante y como el que no es del proveedor de nube.
  - Corregido en sesión: (a) faltaron cómputo y almacenamiento en la lista; (b) los costos fijos no escalan, así que la factura crece ×16 y no ×20; (c) el gatillo del contexto acumulativo aplica a conversaciones, no a llamadas independientes; (d) la alerta en el estimado exacto produce falsos positivos — van dos números, no uno.
- [ ] **Práctica en consola** — parcial, falta el desglose por tipo de uso.

---
[[04_estimar-antes|← anterior]] · [[00_indice|índice]]
