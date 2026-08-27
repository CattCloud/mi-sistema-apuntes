# Estado del plan gratuito de la cuenta (insumo)

> Capturado el 2026-08-21 desde la consola de facturacion. Insumo crudo para B2.
> Sustituye al free tier que describe el curso (agosto 2022), que ya no aplica.

| Dato | Valor |
|---|---|
| Plan | Plan gratuito **nuevo** (modelo de creditos, no cuotas por servicio) |
| Creditos restantes | 100,00 USD |
| Dias restantes | 185 |
| Fecha limite | 21 de febrero de 2027 |
| Condicion de fin | La fecha limite **o** el agotamiento de los creditos, lo que ocurra primero |
| Cuenta | "GreenCloud" |

Texto literal de la consola:

> El acceso gratuito a los servicios de AWS finalizara el dia Feb 21, 2027 o cuando
> se hayan agotado todos los creditos. Para garantizar un acceso ininterrumpido a AWS,
> consulte "actualizar el plan" para obtener mas detalles.

## Por que importa

- El curso (S5, agosto 2022) describe el free tier clasico: 12 meses, cuotas por servicio
  (horas de instancia, GB de storage). **Ese no es el plan de esta cuenta.**
- Con creditos, el gasto puede quedar cubierto y **no verse como cargo** en la factura,
  aunque el consumo exista. Afecta a como se lee la factura y a como se configura la alerta.
- ⚠️ verificar al llegar a la Seccion 2: que pasa exactamente al agotarse los creditos o al
  vencer el plazo (si hay que actualizar a plan de pago y que ocurre con los recursos si no).

## Contexto de las cuentas (2026-08-21)

- **GreenCloud** — cuenta **activa**, la que se usa para todo el temario. Tarjeta nueva, por eso
  califica al plan gratuito nuevo (100 USD de credito).
- **Cattcloud** — cuenta anterior, creada con una tarjeta ya vinculada a una cuenta de hace anios
  que fue suspendida. No es la cuenta de trabajo.

> Implicacion: creditos, presupuestos, permisos de facturacion y recursos son **por cuenta**.
> Todo lo que se cree durante el temario va en GreenCloud. La captura de consola de B1
> (region us-east-1) se tomo en Cattcloud, asi que la region de trabajo hay que fijarla
> tambien en GreenCloud.

## Datos confirmados en consola (2026-08-22)

**Pantalla Créditos** (Facturacion y pagos > Creditos):

| Campo | Valor |
|---|---|
| Nombre del credito | AWS Free Tier |
| Importe emitido | 100,00 USD |
| Cantidad utilizada | 0,00 USD |
| Fecha de inicio | 22/08/2026 |
| **Fecha de vencimiento del credito** | **22/08/2027** (12 meses) |
| Estado | Active |

> ⚠️ **Dos relojes distintos:** el *plan gratuito* vence el **21/02/2027** (~6 meses, lo que dice el
> banner de inicio), pero el *credito* vence el **22/08/2027** (12 meses). No es contradiccion:
> uno es el permiso de uso gratuito, el otro es la vigencia del saldo.

Aviso literal de esa pantalla: *"Estimated amounts update approximately every 24 hours; total
amounts update when your monthly invoice is finalized."* → el saldo mostrado puede ser de ayer.

**Pantalla "Actualizar a un plan de pago"** (Upgrade plan) — tres bloques:

1. *"Acceso fluido a **mas** servicios de AWS"* → el plan gratuito **no da acceso al catalogo completo**.
2. *"Cualquier credito restante **permanecera accesible**"* → actualizar **no quita el saldo**.
3. *"Se le facturara y cobrara mensualmente por cualquier uso que supere los limites del nivel
   gratuito o al expirar las ofertas del nivel gratuito"* → tras actualizar, funciona como cuenta normal.

**Conclusion:** el plan gratuito nuevo **no te cobra en silencio al terminar** (a diferencia del
free tier clasico): se acaba el **acceso**, y para seguir hay que actualizar a mano al plan de pago.

⚠️ Sigue sin resolver: que pasa con los **recursos encendidos** si vence el plazo y no se actualiza.

## Comparativa de planes (pagina de AWS, confirmada con marcas)

| Fila | Plan gratuito | Plan de pago |
|---|:---:|:---:|
| Hasta 200 USD en creditos (100 al registrarse + hasta 100 explorando servicios) | ✓ | ✓ |
| Incluye el uso gratuito de servicios selectos | ✓ | ✓ |
| No se incurre en cargos a menos que cambie al plan de pago | ✓ | — |
| Pago adicional si se superan los umbrales de credito | — | ✓ |
| **Las cargas de trabajo superan los umbrales de credito** | **✗** | **✓** |
| Acceso a todos los servicios y caracteristicas de AWS (150+) | **✗** | ✓ |

> ✅ **Resuelto:** la fila de "cargas de trabajo" es una **capacidad**, no una afirmacion. En plan
> gratuito las cargas **no pueden** pasar del umbral de credito: al agotarse el saldo, lo que este
> corriendo no continua. En plan de pago si continua y se factura.
>
> No hay cobro silencioso porque no hay continuacion silenciosa.

> ✅ **Resuelto:** el plan gratuito **no** da acceso a todo el catalogo. Si un servicio no aparece,
> puede ser por el plan, no por region ni permisos.

Duracion del plan gratuito: **maximo 6 meses**. Texto literal: *"No se le cobrara nada a menos que
elija el plan de pago"*.
