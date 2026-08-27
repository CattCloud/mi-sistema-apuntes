---
tema: M1 — Qué es arquitectura (y qué no)
workspace: arquitectura
seccion: 3
titulo: "Atributos de calidad — arquitectura ¿para qué?"
estado: finalizada
prev: 02_costo-de-reversion
next: 04_trade-off-como-unidad
---


# 🏛️ Atributos de calidad — arquitectura ¿para qué?

> **Un atributo de calidad es una propiedad del sistema que no describe *qué hace*, sino *qué tan bien* lo hace y bajo qué condiciones.**
>
> Mantenibilidad, testeabilidad, velocidad de entrega, seguridad, escalabilidad. Son la respuesta a la pregunta *"¿arquitectura para qué?"* — y sin esa respuesta, ninguna decisión estructural se puede evaluar.

Hasta aquí el módulo te dio un criterio para saber **qué** decisiones importan (las que restringen a otras, las caras de revertir). Pero falta la mitad: importan **para algo**. Y ese algo tiene nombre.

Por eso *"este proyecto está bien arquitecturado"* es una oración incompleta. La versión completa siempre lleva un complemento:

```text
❌ "Está bien arquitecturado."
✅ "Está bien arquitecturado PARA cambiar rápido."
✅ "Está bien arquitecturado PARA que un dev nuevo entienda en un día."
✅ "Está bien arquitecturado PARA no perder un pago jamás."
```

Y aquí viene lo incómodo: el mismo sistema puede cumplir uno de esos y fallar en otro **por la misma razón**. Un sistema con cuatro capas y todo desacoplado es excelente para mantener y pésimo para salir en tres semanas. No está mal arquitecturado: está arquitecturado para otra cosa.

## Por qué nunca aparecen en los requerimientos

Este es el motivo por el que los atributos de calidad son invisibles hasta que duelen.

Los requerimientos que te llegan son **funcionales**: *"quiero exportar el reporte de ventas"*, *"que el cliente pueda pagar con Yape"*. Nadie abre un ticket que diga *"quiero que el sistema sea mantenible"* ni *"quiero poder testear las reglas de negocio sin levantar la base de datos"*.

> ⚠️ **Cuidado:** los requerimientos funcionales dicen **qué construir**. Los atributos de calidad deciden **cómo se estructura**. Como solo los primeros llegan escritos, es fácil terminar optimizando por lo único que alguien pidió — entregar rápido — y descubrir dos años después que el sistema es imposible de cambiar.

Como no vienen escritos, hay que sacarlos preguntando. Dos preguntas los destapan casi siempre:

- **¿Qué pasa si esto falla?** Si la respuesta es *"el usuario recarga la página"*, no necesitas gran cosa. Si es *"perdemos plata y hay que llamar al cliente"*, acabas de descubrir que tus atributos son corrección y observabilidad.
- **¿Qué va a cambiar en seis meses?** Lo que cambie seguido tiene que ser barato de cambiar. Eso te dice **dónde** poner los límites, no solo cuántos.

## Los atributos que importan en nivel 3

No todos los atributos son arquitectura de aplicación. Estos son los que se deciden en tu nivel — dónde pones los límites y quién depende de quién:

| Atributo | La pregunta que responde | Qué estructura empuja | Qué cobra a cambio |
|----------|--------------------------|------------------------|---------------------|
| 🔵 Mantenibilidad | ¿Cuánto cuesta cambiar algo sin romper lo demás? | Límites claros, dependencias en una sola dirección | Velocidad inicial: hay que decidir antes de escribir |
| 🔵 Testeabilidad | ¿Puedo probar la regla sin levantar la base de datos? | Lógica de negocio separada del I/O | Más indirección, más archivos |
| 🔵 Simplicidad / onboarding | ¿Cuánto tarda un dev nuevo en ser productivo? | Estructura predecible y aburrida | Menos poder expresivo, más código repetido |
| 🟡 Time-to-market | ¿Qué tan rápido sale una feature nueva? | Pocas capas, todo junto por feature | Duplicación y deuda que se paga después |
| 🔴 Seguridad | ¿Dónde se valida y quién confía en quién? | Fronteras de confianza explícitas | Fricción en cada cruce de límite |
| 🔴 Observabilidad | ¿Puedo saber qué pasó cuando falla en producción? | Errores que cruzan los límites con contexto | Instrumentación y ruido |
| ⚫ Escalabilidad | ¿Aguanta más carga o más usuarios? | Estado fuera del proceso, partes independientes | Complejidad operativa alta |

La **factura** de un atributo es lo que te cobra a cambio — la última columna de la tabla. Lo que distingue a unos de otros no es cuánto cobran, sino **cuándo llega el cobro**, y eso es lo que marca el color:

🔵 = se cobra **al construir** (pagas al inicio, rinde toda la vida) · 🟡 = se cobra **al mantener** (rinde hoy, pasa la cuenta en seis meses) · 🔴 = se cobra **cuando falla** (no se nota hasta el incidente) · ⚫ = no es una factura, es un **marcador de alcance**: eso es nivel 4

> 🎯 **Idea clave:** una factura no se evita, solo se aplaza. No existe la opción de no pagar — elegir un atributo es elegir **cuándo** te llega el cobro y **en qué moneda**: horas de desarrollo hoy, deuda técnica mañana, o un incidente en producción.

Por eso el 🟡 es el más peligroso de los tres: se siente gratis. Salir rápido no parece tener costo porque la factura llega en un ciclo distinto al que tomó la decisión — muchas veces cuando el que decidió ya ni está en el proyecto.

> 🔑 **Matiz:** la escalabilidad es la que más se nombra y la que menos suele aplicar. En un sistema con doscientos usuarios, optimizar por escalar es pagar complejidad operativa por un problema que no tienes. Su lugar real es el temario de system design (nivel 4).

## Cada atributo, en concreto

Las definiciones se olvidan; los síntomas no. Por cada atributo, cómo se ve tenerlo y cómo se ve que te falte:

- **Mantenibilidad** — La tienes cuando agregar *"descuento por volumen"* toca solo el módulo de precios y nada más. Te falta cuando cambias el precio y se rompe el reporte de ventas.
- **Testeabilidad** — La tienes cuando pruebas *"no se confirma un pedido sin stock"* llamando a una función, sin levantar Postgres ni el servidor. Te falta cuando para testear una regla de negocio necesitas sembrar la base de datos.
- **Simplicidad / onboarding** — La tienes cuando alguien nuevo abre la carpeta `/pedidos` y entiende el flujo completo sin preguntarle a nadie. Te falta cuando hay que explicarle la arquitectura antes de que pueda tocar una línea.
- **Time-to-market** — Lo tienes cuando una feature nueva sale copiando la anterior y cambiando tres cosas. Te falta cuando un CRUD de etiquetas exige cuatro archivos y dos interfaces.
- **Seguridad** — La tienes cuando el precio se recalcula en el servidor aunque el cliente lo mande en el body. Te falta cuando confías en lo que llega del request.
- **Observabilidad** — La tienes cuando un pago falla y sabes en qué paso murió y con qué datos. Te falta cuando el log dice *"falló el checkout"* y ahí se acaba la información.
- **Escalabilidad** — La tienes cuando la sesión no vive en la memoria del proceso y puedes levantar una segunda instancia. Te falta cuando al levantarla los usuarios empiezan a perder la sesión al azar.

> 💡 **Tip:** cuando tengas que evaluar un proyecto ajeno (o el tuyo de hace un año), no preguntes *"¿qué atributos tiene?"*. Busca los **síntomas de la derecha**. Los síntomas se ven en una tarde; los atributos declarados no se ven nunca.

## Los atributos chocan entre sí

Esta es la parte que convierte la lista anterior en un problema real. No puedes maximizarlos todos, porque varios se empujan en direcciones opuestas.

La forma más rápida de entenderlo es pensarlos como los **stats de un personaje de videojuego**. Tienes puntos limitados para repartir entre fuerza, agilidad, inteligencia y resistencia. Subir uno significa bajar otro, y **no existe el build perfecto**: existe el build adecuado para cómo vas a jugar. Un tanque es una pésima elección si el juego premia la velocidad — y no porque esté mal construido, sino porque lo construyeron para otra partida.

La arquitectura funciona igual. No hay sistema con todos los stats al máximo: siempre destaca en unos y baja en otros, y lo que decide el reparto es el **para qué**.

> 🔑 **Límite de la analogía:** en el juego los puntos son fijos, están a la vista, y casi siempre puedes reasignarlos pagando poco. En un proyecto real el presupuesto no se ve, se descubre tarde, y reasignar cuesta exactamente lo que vimos en la sección anterior: el **costo de reversión**. Repartir mal los stats en un juego se arregla; repartirlos mal en un sistema de cuatro años se hereda.

Estos son los choques más frecuentes:

| Si subes esto… | …bajas esto | Por qué |
|----------------|-------------|---------|
| Time-to-market | Mantenibilidad | Salir rápido significa no separar lo que después habrá que separar |
| Testeabilidad | Simplicidad | Aislar la lógica del I/O agrega capas que un dev nuevo tiene que entender |
| Flexibilidad | Simplicidad | Cada punto de extensión es una decisión más que alguien debe navegar |
| Seguridad | Velocidad de uso | Validar en cada frontera cuesta código, latencia y fricción |

> 🎯 **Idea clave:** por eso la pregunta correcta nunca es *"¿cómo hago esto bien?"* sino **"¿qué atributo estoy priorizando y cuál estoy sacrificando a propósito?"**. Si no puedes nombrar el que sacrificaste, no elegiste — solo hiciste lo que salió.

## De dónde salen los atributos de cada proyecto

No los elige el gusto del desarrollador. Salen del contexto: cuánto va a vivir el sistema, cuánta gente lo toca, qué tan seguido cambia y qué se pierde si falla.

| Señal del proyecto | Atributos que suben de prioridad |
|--------------------|----------------------------------|
| MVP en 3 semanas, un solo dev, futuro incierto | Time-to-market, simplicidad |
| Sistema interno con 4 años de vida y reglas que cambian seguido | Mantenibilidad, modificabilidad, testeabilidad |
| Maneja pagos o datos sensibles | Seguridad, observabilidad, corrección |
| Equipo que rota mucho o gente nueva entrando | Simplicidad, estructura predecible |
| 90% formularios sobre tablas, lógica casi nula | Velocidad de entrega, y poco más |

Debes recordar que un mismo equipo puede tener los tres primeros casos al mismo tiempo, en tres proyectos distintos — y aplicar la misma arquitectura a los tres sería un error en dos de ellos.

> 💡 **Tip:** esto es lo que convierte un ADR en algo útil. Una decisión escrita sin nombrar el atributo que la motivó es una preferencia; con el atributo nombrado, es una decisión que alguien puede reevaluar cuando el contexto cambie. (Módulo M8.)

Ahora bien, si los atributos chocan y ninguno es gratis, entonces elegir arquitectura no es buscar la opción correcta — es **pagar conscientemente por lo que más te importa**. Ese intercambio tiene nombre propio, y es la unidad con la que se piensa toda esta disciplina. Eso es lo que viene.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- Un **atributo de calidad** no dice qué hace el sistema, dice **qué tan bien** lo hace: mantenibilidad, testeabilidad, velocidad de entrega, seguridad.
- Son los **stats del sistema**: puntos limitados y ningún atributo gratis. Subir time-to-market baja mantenibilidad; subir testeabilidad baja simplicidad. No existe el build perfecto, existe el adecuado para cómo vas a jugar.
- *"Está bien arquitecturado"* es una oración incompleta. Siempre es **"bien arquitecturado PARA algo"**, y ese algo lo pone el contexto, no tu gusto.
- **Nunca llegan en los requerimientos.** Los tickets traen lo funcional; los atributos hay que sacarlos preguntando *"¿qué pasa si falla?"* y *"¿qué va a cambiar en seis meses?"*.
- Si no puedes nombrar **cuál sacrificaste a propósito**, no elegiste una arquitectura — te quedaste con la que salió.

---
[[02_costo-de-reversion|← anterior]] · [[00_indice|índice]] · [[04_trade-off-como-unidad|siguiente →]]
