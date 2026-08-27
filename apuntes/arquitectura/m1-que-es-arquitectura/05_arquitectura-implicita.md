---
tema: M1 — Qué es arquitectura (y qué no)
workspace: arquitectura
seccion: 5
titulo: "Arquitectura implícita"
estado: finalizada
prev: 04_trade-off-como-unidad
next: null
---

# 🏛️ Arquitectura implícita

Entras a un proyecto — tuyo o heredado — y preguntas por qué la lógica de precios vive en el controlador. La respuesta es *"así estaba"*. Preguntas por qué las carpetas están cortadas por tipo técnico y no por dominio: *"así lo hace el tutorial"*. Preguntas qué se rompe si mueves esa función: nadie sabe. El proyecto funciona, tiene usuarios y factura — y aun así nadie puede explicar por qué está armado como está.

> **La arquitectura implícita es la estructura que un sistema tiene sin que nadie la haya decidido.**
>
> No es ausencia de arquitectura. Es una arquitectura **heredada**: del framework, del tutorial, del primer archivo que alguien escribió, o de la ruta que ese día era más fácil.

Esta es la afirmación que cierra el módulo, y conviene leerla despacio:

> 🎯 **Idea clave:** **todos los proyectos tienen arquitectura.** La pregunta nunca es *si* la tienen — es si alguien la eligió. Un sistema sin decisiones arquitectónicas explícitas no es un sistema sin arquitectura: es un sistema cuya arquitectura la decidieron el framework, la costumbre y el azar.

## De dónde sale, si nadie la decidió

Las decisiones no desaparecen por no tomarlas: se las toma otro. Estas son las fuentes habituales, en el orden en que suelen aparecer:

- **El scaffolding del framework.** `create-next-app` ya decidió dónde va el routing, cómo se separa cliente de servidor y qué es un límite. No preguntó — vino decidido.
- **El tutorial del primer día.** La estructura de carpetas del video que seguiste cuando arrancaste se queda tres años. Nadie la eligió: se quedó porque llegó primero.
- **El primer archivo escrito.** El segundo dev imita al primero, el tercero imita al segundo. Lo que se escribió el día 3 se convierte en ley sin votación.
- **El copy-paste de la feature anterior.** La forma de la feature nueva sale de duplicar la vieja, incluidos sus errores estructurales.
- **El agente de IA.** Como vimos en la sección 2, elige por defecto lo más común de su training data — y lo hace a doscientas líneas por minuto.
- **La ruta de menor resistencia.** La regla quedó en el route handler porque ahí ya estaba el `req.body` a mano. Fin del análisis.

Debes recordar que ninguna de estas es mala por sí misma. El problema no es de dónde vino la estructura: es que **llegó sin justificación adjunta**.

## Por qué duele: la factura sin la compra

Aquí está el daño real, y no es el que la mayoría supone. Una arquitectura implícita puede incluso ser *estructuralmente correcta* — a veces el default del framework es exactamente lo que tu proyecto necesitaba. El problema es otro, y son tres consecuencias encadenadas:

| Lo que falta | Qué se rompe por eso |
|--------------|----------------------|
| Nadie sabe qué atributo perseguía | **No se puede evaluar.** ¿Sirve o no sirve? Imposible saberlo sin conocer el `para qué` (sección 3) |
| Nadie sabe qué estaba protegiendo | **No se puede cambiar con confianza.** ¿Qué se rompe si la muevo? Nadie tiene la respuesta |
| Nadie la eligió, así que nadie la defiende | **Se rediscute cada seis meses** y siempre gana el que habla más fuerte (módulo M8) |

Y de ahí sale la frase que resume la sección:

> ⚠️ **Cuidado:** con una arquitectura implícita **pagas la factura sin haber hecho la compra**. El sistema te cobra igual — en rigidez, en bugs al cambiar, en devs nuevos que tardan semanas — pero nadie eligió qué estaba comprando a cambio. Es el peor trade-off posible: uno del que ni siquiera sabes cuál era el otro lado.

Y como nadie la eligió, **nadie la revisa**. Una decisión explícita puede quedar obsoleta y alguien la reevalúa cuando el contexto cambia. Una implícita simplemente se queda, porque no está en ninguna lista de cosas que decidir.

## Mitos que sostienen el problema

❌ **Mito:** "Mi proyecto es chico y simple, no tiene arquitectura."
✅ **Realidad:** Tiene una, y bastante específica: la que trajo el framework más la que impuso el primer archivo. Lo que no tiene es una arquitectura **elegida**.

❌ **Mito:** "No decidir todavía es mantener las opciones abiertas."
✅ **Realidad:** No decidir **también cierra opciones**, solo que sin que te enteres y sin que quede registro. Postergar a conciencia mantiene las opciones abiertas; no decidir las cierra por defecto. (Es la distinción de la sección 2: postergar no es lo mismo que no decidir.)

❌ **Mito:** "Si la arquitectura es implícita, está mal y hay que rehacerla."
✅ **Realidad:** A veces el default es la decisión correcta para ese proyecto. **El defecto no está en la estructura, está en que no está justificada ni revisada.** Esa misma estructura, decidida y escrita, sería una buena arquitectura.

❌ **Mito:** "Funciona en producción, así que la arquitectura está bien."
✅ **Realidad:** Funcionar es cumplir los requerimientos **funcionales**. La arquitectura no se mide en si funciona hoy, sino en **qué pasa cuando haya que cambiarlo** — que es justo lo que el sistema en producción no te está mostrando todavía.

## Cómo detectarla en un proyecto real

Dos preguntas bastan. Elige cinco hechos estructurales de tu proyecto — dónde vive la lógica de negocio, cómo están cortadas las carpetas, quién habla con la base de datos, dónde se valida, dónde vive el estado — y pregunta por cada uno:

```text
1. ¿Quién decidió esto, y por qué?
   → "Así venía" / "Así lo hace el tutorial" / "No sé"   ⇒ implícita

2. ¿Qué se rompe si lo cambio?
   → Silencio, o "habría que probar"                     ⇒ implícita
```

Si las cinco respuestas caen del lado implícito, no tienes un problema de arquitectura: tienes un **inventario pendiente**.

## Qué hacer con ella (no es reescribir)

La reacción instintiva es refactorizar todo. Es la peor, porque paga un costo de reversión enorme sin saber siquiera qué atributo está comprando. El orden correcto es otro:

1. **Nómbrala antes de tocarla.** Escribe en una página cuál es la estructura real hoy — no la que crees tener, la que tienes. La mitad del problema es que nadie la ha mirado de frente.
2. **Evalúala contra el atributo que tu proyecto necesita** (sección 3). No contra el ideal: contra este proyecto, con esta vida útil y este equipo.
3. **Si sirve, adóptala explícitamente.** Escribe el porqué, aunque sea retroactivo. La estructura no cambia ni una línea, pero deja de ser huérfana: ahora se puede defender, evaluar y revisar.
4. **Si no sirve, no la cambies toda.** Corrige el próximo límite que te toque tocar, con el costo de reversión en la mano (sección 2). Una migración por feature, no un big bang.

> 💡 **Tip:** el paso 3 es el más subestimado y el más barato. Convertir una arquitectura implícita en explícita **sin mover código** ya resuelve dos de los tres problemas de la tabla de arriba: vuelve evaluable y defendible algo que antes no lo era.

Con esto el módulo cierra el círculo que abrió en la primera sección. El error más caro no era clasificar mal una decisión — era **no notar que estabas decidiendo**. Ahora tienes las cuatro piezas para notarlo: qué distingue una decisión arquitectónica, cuánto cuesta revertirla, para qué atributo la estás tomando y qué estás sacrificando a cambio. Lo que sigue en el temario es dónde poner los cortes (M2), que es la decisión arquitectónica de la que dependen casi todas las demás.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- **Todos los proyectos tienen arquitectura.** La pregunta nunca es si la tienen, sino **si alguien la eligió**.
- Si no la elegiste tú, la eligieron el framework, el tutorial, el primer archivo, el copy-paste o la IA. Las decisiones no desaparecen por no tomarlas: **se las toma otro**.
- El defecto de una arquitectura implícita **no es su estructura** — a veces el default es correcto. Es que **no está justificada**, y por eso no se puede evaluar, ni cambiar con confianza, ni defender.
- Pagas la **factura sin haber hecho la compra**: el sistema te cobra igual, pero nadie eligió qué estaba comprando a cambio.
- Detectarla son dos preguntas: *¿quién decidió esto y por qué?* y *¿qué se rompe si lo cambio?*. Y arreglarla casi nunca empieza por reescribir — empieza por **nombrarla y adoptarla**.

---
[[04_trade-off-como-unidad|← anterior]] · [[00_indice|índice]]
