---
tema: B2 — Costos y facturación
workspace: cloud
seccion: 4
titulo: "Estimar antes de desplegar"
estado: finalizada
prev: 03_gatillo-factura-sorpresa
next: null
---

# ☁️ Estimar antes de desplegar

> **Estimar no es averiguar precios: es averiguar volúmenes.**
>
> Los precios son públicos y están a un clic. Lo que nadie te puede decir es cuántas veces al mes va a ocurrir cada cosa en tu producto — y ahí es donde se gana o se pierde la estimación.

## Por qué la calculadora oficial no te salva

Existe una calculadora de precios, y está dentro de la propia consola, en *Presupuestos y planificación*. Es útil, pero no resuelve el problema, y conviene entender por qué antes de perder una tarde con ella.

La calculadora te pide que elijas un servicio, un tamaño y una cantidad — y entonces te devuelve el precio. Es decir: **te pide la respuesta para darte el resultado**. Si ya sabías que ibas a usar una máquina de cierto tamaño durante 730 horas al mes, la parte difícil ya la habías hecho tú.

Trabaja con dos tipos de estimación, según lo que quieras modelar:

| Tipo | Qué modela |
|------|------------|
| **Estimación de carga de trabajo** | El costo de una aplicación o carga concreta |
| **Estimación de facturación** | El costo de la cuenta entera |

Y tiene tres formas de alimentarse: agregando servicios a mano, importando **estimaciones guardadas** de la calculadora pública, o —la interesante— **importando tu uso histórico real**, de hasta **13 meses**, para proyectar hacia adelante.

Ese tercer camino es el que matiza toda la crítica, así que conviene decirlo con precisión:

- **Sin historial, la calculadora no sabe tus volúmenes.** Cuántas peticiones, cuántos GB, cuántas veces al día: eso sale de tu producto, y si nunca lo has ejecutado, solo lo puedes estimar tú. Es tu situación hoy, con cero meses de consumo.
- **Con historial, sí los sabe** — porque son los tuyos, medidos. A partir del momento en que tengas uso real, proyectar deja de ser adivinar y pasa a ser extrapolar. Vuelve a esta herramienta después de B4.

Lo que **no** hace nunca, tengas historial o no:

- **No conoce lo que no es del proveedor.** Los tokens del modelo, que en tu caso van a ser la mayor parte de la factura, no aparecen en ninguna calculadora de AWS.
- **No te dice qué se te olvidó.** Es un sumador, no un revisor. Si no metiste la salida de datos, el total sale limpio y equivocado.

> 🔑 **Un detalle que revela cómo hay que tratar una estimación:** cada una queda fijada a **las tarifas de una fecha** y tiene **fecha de vencimiento**. Es la propia herramienta diciéndote que un cálculo de costos es una foto, no una verdad — y que caduca.

> 🎯 **Para qué sí sirve hoy:** para confirmar el **precio unitario** de algo cuando ya sabes cuánto vas a consumir. Es el último paso de la estimación, no el primero. El primero sigue siendo el método de la sección siguiente.

## El método: unidades → volumen → precio → total → forma

Cinco fases. La primera y la segunda son el trabajo real; la tercera y la cuarta son aritmética; y la quinta es la que convierte una estimación en una decisión.

**FASE 1 — Lista las unidades, no los servicios.**
Recorre tu arquitectura pieza por pieza y, en cada una, pregúntate cuáles de las cuatro unidades te aplican: tiempo encendido, invocación, almacenamiento, salida. Una pieza puede tener dos o tres. Anótalas todas, aunque sospeches que algunas serán insignificantes — el objetivo de esta fase es **no olvidarte de nada**, no ser preciso.

**FASE 2 — Pon un volumen a cada unidad.**
Cuántas veces al mes, cuántos GB, cuántos tokens. Aquí es donde de verdad se estima, y hay dos reglas:

- **Números redondos.** 10.000, no 9.847. Estás buscando el orden de magnitud, no el céntimo.
- **Estima el mes bueno, no el promedio.** Si tu producto funciona, el volumen será el alto. Una estimación hecha sobre el escenario tímido te da un número que no sirve para decidir nada.

**FASE 3 — Multiplica por el precio unitario.**
Ahora sí, la página de precios o la calculadora. Un renglón por unidad.

**FASE 4 — Suma, ordena de mayor a menor, y mira solo los dos primeros.**
Esta fase es la que casi nadie hace y es la más valiosa. Ordenado por importe, tu costo real vive en las dos primeras líneas; el resto suele ser ruido.

> 💡 **La regla del 5%:** si un concepto es menos del 5% del total, no lo afines. Da igual si te equivocaste el doble — sigue sin cambiar la decisión. El tiempo de estimación va entero a las dos primeras líneas.

**FASE 5 — Pregúntale a cada línea cómo crece.**
Las cuatro fases anteriores te dan lo que cuesta **hoy**. Esta te dice lo que pasa **cuando el producto funcione**, que es la pregunta que de verdad decide una arquitectura. Cada línea de costo tiene una forma de crecer, y solo hay cuatro:

| Forma | Qué significa | Ejemplo | Si el volumen se multiplica por 20 |
|-------|---------------|---------|------------------------------------|
| **Proporcional** | Cobra por unidad consumida | Tokens, invocaciones, salida de datos | Se multiplica por 20 |
| **Fija** | Cobra por tiempo encendido, no por uso | Una base de datos, un balanceador | **No cambia** |
| **Acumulativa** | Es un montón que se apila, no un caudal | Almacenamiento, logs, copias | Crece con el **tiempo**, no con el tráfico del mes |
| **Escalonada** | Fija… hasta que satura y saltas de tamaño | Esa misma base de datos, cuando ya no da abasto | No crece, no crece, y de golpe salta |

La consecuencia práctica es contraintuitiva: **el peso de cada línea cambia con la escala**. En la estimación de arriba, la base de datos era el 21% de la factura. Multiplica el volumen por veinte y sigue costando lo mismo — pero ahora es el **1,3%**. No se abarató: dejó de importar.

Y al revés: un costo proporcional que hoy son céntimos puede ser toda tu factura mañana.

> 🎯 **Por eso una estimación no se lee en un solo punto.** Calcula el escenario de hoy y el de "esto funcionó", y compara **qué línea domina en cada uno**. Si la respuesta cambia, tu arquitectura tiene que cambiar con ella — y más vale saberlo ahora que cuando ya esté construida.

## Estimación trabajada: el gestor de correos con IA

Vamos con tu producto, con números concretos. El supuesto: **10.000 correos al mes**, cada uno dispara una llamada a un modelo, guarda unos 2 KB de resultado, y hay una interfaz web para consultarlo.

**Fase 1 y 2 — unidades y volúmenes:**

| Pieza | Unidad | Volumen mensual |
|-------|--------|-----------------|
| El modelo de lenguaje | tokens de entrada y salida | 10.000 llamadas × ~1.250 tokens |
| El worker que procesa | invocación + tiempo de ejecución | 10.000 ejecuciones × ~5 s |
| La base de datos | tiempo encendido (24/7) + almacenamiento | 730 h · unos pocos GB |
| Los resultados guardados | almacenamiento | 10.000 × 2 KB = **20 MB** |
| La interfaz web | salida de datos | tráfico bajo, uso personal |

**Fase 3 — precios, línea por línea:**

```text
TOKENS (Sonnet 5)
  entrada   950 tok × 10.000 = 9,5 M tok × 3 USD/M  =  28,50
  salida    300 tok × 10.000 = 3,0 M tok × 15 USD/M =  45,00
                                                       ──────
                                                        73,50 USD

BASE DE DATOS gestionada, la más pequeña, encendida todo el mes ≈ 20,00 USD  ⚠️
CÓMPUTO del worker  10.000 ejecuciones cortas             ≈  0,50 USD  ⚠️
ALMACENAMIENTO  20 MB                                     ≈  0,00 USD
SALIDA de datos  tráfico bajo                             ≈  0,00 USD
```

⚠️ *verificar los dos importes marcados: el de una base de datos gestionada pequeña y el del cómputo serverless dependen del servicio y la región concretos. El orden de magnitud es el correcto; el céntimo, no.*

**Fase 4 — ordenado de mayor a menor:**

| Concepto | USD/mes | % del total |
|----------|--------:|------------:|
| **Tokens del modelo** | **73,50** | **78%** |
| Base de datos encendida | 20,00 | 21% |
| Cómputo | 0,50 | 1% |
| Almacenamiento y salida | ~0,00 | 0% |
| **Total** | **~94** | |

Y ahora las tres conclusiones, que valen más que el número:

**1. El proveedor de nube es la quinta parte de tu factura.** Cuatro de cada cinco dólares se los lleva algo que **no aparece en ninguna consola de AWS**, que llega en otra factura y que ninguna alerta de presupuesto va a vigilar. Si montas toda tu disciplina de costos alrededor de la consola de la nube, estás vigilando el 20%.

**2. La palanca grande no es la infraestructura, es el modelo.** Mira lo que pasa con la misma arquitectura, cambiando solo qué modelo la atiende:

| Modelo | Tokens/mes | Total mensual |
|--------|-----------:|--------------:|
| Haiku 4.5 | 24,50 | **~45 USD** |
| Sonnet 5 | 73,50 | ~94 USD |
| Opus 5 | 122,50 | ~143 USD |

Cambiar de modelo mueve el total un **300%**. Ninguna optimización de infraestructura que hagas en los módulos siguientes se acerca ni de lejos a eso. Y no significa "usa siempre el más barato": significa que **la elección de modelo es una decisión de arquitectura con precio**, y que probablemente no todas tus llamadas necesiten el mismo.

**3. Lo segundo más caro es algo que está encendido sin hacer nada.** La base de datos cuesta 20 dólares tanto si procesas 10.000 correos como si procesas cero, porque cobra por tiempo, no por uso. Es la única línea de la tabla que pagarías igual con el producto apagado.

## Dónde pones la alerta y por qué no en el estimado exacto

Ya tienes un número: unos 94 USD al mes. La tentación es poner el presupuesto en 94. **No lo hagas**, por dos razones que tiran en direcciones opuestas:

- **Si lo pones justo en el estimado**, cualquier mes normal con un poco más de tráfico te dispara la alerta. Después de tres falsos positivos dejas de leer los correos, y entonces ya no tienes alerta.
- **Si lo pones muy alto**, la alerta llega cuando el daño ya está hecho.

La forma que funciona es **separar las dos preguntas**, porque son distintas:

| Pregunta | Dónde va el número | Qué te dice |
|----------|--------------------|-------------|
| *"¿Voy por donde esperaba?"* | Aviso **previsto** al ~80% del estimado | Tendencia. Llega a mitad de mes, con tiempo de reaccionar |
| *"¿Esto ya es anómalo?"* | Presupuesto en **1,5 o 2 veces** el estimado | Algo se rompió. No es tráfico, es un error |

Un mes al 110% del estimado es un mes normal. Un mes al 200% es un bucle, una clave filtrada o un recurso olvidado — y ese es el que tiene que sonar fuerte.

> 🎯 **La idea de fondo:** una alerta no vigila un número, vigila una **desviación**. Por eso se calibra contra lo que esperas, no contra lo que quieres gastar.

**Y en tu caso concreto**, con el plan gratuito, la pregunta cambia de forma. No tienes un presupuesto mensual: tienes **100 USD para seis meses**, y el límite no es una factura sino quedarte sin plataforma. Traducido:

```text
100 USD ÷ 6 meses ≈ 16 USD/mes de margen
```

Esa es tu cifra de referencia mientras dure el plan. Fíjate en lo que dice al lado del cálculo de arriba: **tu producto real, tal como lo estimamos, no cabe en el plan gratuito** — 94 USD al mes se comen el crédito en cinco semanas. Y eso no es un problema, es información que ahora tienes **antes** de construir: durante el temario trabajas con volúmenes de prueba, no de producción, y la versión real llega cuando decidas pasar al plan de pago con los números ya en la mano.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- Estimar es averiguar volúmenes, no precios: los precios son públicos, y cuántas veces ocurre cada cosa solo lo sabes tú.
- Se estima por unidades y no por servicios, se usan números redondos, y se calcula sobre el mes bueno y no sobre el promedio.
- Al ordenar el resultado de mayor a menor, tu costo vive en las dos primeras líneas; por debajo del 5% del total, afinar no cambia ninguna decisión.
- En una app con IA el modelo se lleva la mayor parte de la factura, y esa parte no aparece en la consola del proveedor de nube.
- Elegir el modelo mueve el total varias veces más que cualquier optimización de infraestructura.
- La alerta se calibra contra la desviación, no contra el gasto deseado: un aviso previsto cerca del estimado, y un tope que solo suene cuando algo se rompió.
- Cada línea de costo crece de una forma distinta —proporcional, fija, acumulativa o escalonada— y por eso el concepto que domina tu factura hoy puede no ser el que la domine cuando el producto funcione.

---
[[03_gatillo-factura-sorpresa|← anterior]] · [[00_indice|índice]]
