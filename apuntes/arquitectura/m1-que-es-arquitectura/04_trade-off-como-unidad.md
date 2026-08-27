---
tema: M1 — Qué es arquitectura (y qué no)
workspace: arquitectura
seccion: 4
titulo: "El trade-off como unidad"
estado: en progreso
prev: 03_atributos-de-calidad
next: 05_arquitectura-implicita
---

# 🏛️ El trade-off como unidad

> **Un trade-off es un intercambio deliberado: ganas en un atributo aceptando perder en otro.**
>
> Y es la **unidad de pensamiento** de esta disciplina. No piensas en soluciones arquitectónicas, piensas en intercambios — porque toda opción estructural que existe le quita algo a algo.

La sección anterior te dejó los stats y sus facturas. Esta cambia lo que haces con ellos: dejas de preguntar *"¿cuál es la mejor opción?"* y empiezas a preguntar *"¿qué estoy dispuesto a perder, y a cambio de qué?"*.

El cambio parece cosmético y no lo es. Mientras busques la mejor opción vas a seguir buscando una que no existe; cuando aceptas que estás comprando algo con algo, empiezas a poder justificar decisiones ante otra persona — y ante ti mismo en seis meses.

> 🎯 **Idea clave:** en arquitectura no se resuelve, se **cotiza**. Una decisión sin un precio nombrado no es una decisión: es una preferencia con vocabulario técnico.

## La misma decisión, dos veredictos opuestos

Aquí está el corazón de la temática. Tomemos una sola decisión — *"separar la lógica de negocio en una capa de dominio, aislada del framework y del ORM"* — y evaluémosla en dos proyectos:

| | MVP, 3 semanas, 1 dev | CRM interno, 4 años de vida |
|---|---|---|
| Qué sube | Mantenibilidad, testeabilidad | Mantenibilidad, testeabilidad |
| Qué baja | Time-to-market | Time-to-market |
| Qué pide el contexto | Salir ya; el proyecto quizá no exista en 6 meses | Absorber reglas que cambian cada mes durante años |
| **Veredicto** | ❌ Mal trade-off | ✅ Buen trade-off |

Fíjate bien: **las dos primeras filas son idénticas**. El intercambio es exactamente el mismo. Lo único que cambió es el contexto — y con él, el veredicto se invirtió por completo.

Eso es lo que responde la pregunta de esta sección. No existe *"la arquitectura correcta"* porque **la corrección no es una propiedad del diseño**: es la relación entre el diseño y el contexto donde vive. Sacas el mismo diseño de su contexto y deja de ser correcto, sin haber cambiado una línea.

> 🔑 **Matiz:** por eso una arquitectura puede "pudrirse" sin que nadie toque el código. Si el proyecto cambia — el MVP resultó ser el producto, entró un equipo de cinco, apareció un segundo canal — el contexto se movió y el trade-off que era bueno dejó de serlo. La decisión no envejeció: envejeció su justificación.

## Mitos que hay que desmontar

Estas creencias son la razón por la que tanta gente aplica arquitecturas que su proyecto no pidió.

❌ **Mito:** "Existe la arquitectura correcta, solo tengo que aprender cuál es."
✅ **Realidad:** Existe la arquitectura **adecuada a un contexto**. El mismo diseño es un acierto en un proyecto y un error en el de al lado, y la diferencia no está en el diseño.

❌ **Mito:** "Si es una best practice, aplicarla siempre es lo seguro."
✅ **Realidad:** Una best practice es **un trade-off que alguien más ya tomó**, en un contexto que probablemente no es el tuyo. Aplicarla sin conocer el contexto original no es rigor, es copiar la respuesta sin leer la pregunta.

❌ **Mito:** "Si algo duele en este proyecto, es que está mal arquitecturado."
✅ **Realidad:** **Toda arquitectura duele en algún eje** — es lo que significa haber pagado una factura. La pregunta correcta no es si duele, sino si duele **donde decidiste que doliera**. Dolor en el eje que sacrificaste a propósito es el plan funcionando.

❌ **Mito:** "Mientras más flexible y desacoplado, mejor."
✅ **Realidad:** La flexibilidad es un atributo con factura como cualquier otro. **Flexibilidad que nunca se usa es complejidad pura**: pagaste por una puerta que nadie abrió. Un sistema preparado para cinco bases de datos cuando solo tendrá una está peor arquitecturado, no mejor.

❌ **Mito:** "Un senior sabe cuál es la opción correcta."
✅ **Realidad:** Un senior sabe **nombrar qué se pierde con cada opción**. La diferencia no es conocer la respuesta — es conocer el precio, y poder decir en voz alta *"elijo esta y acepto perder aquello"*.

## Cómo se toma un trade-off, en la práctica

No es una intuición, es un procedimiento de cuatro pasos:

1. **Nombra las opciones reales.** Dos o tres, no siete. Si tienes siete, aún no entendiste el problema.
2. **Por cada opción, di qué atributo sube y cuál baja.** Si no puedes completar la segunda mitad de esa frase, no analizaste la opción — la preferiste.
3. **Contrasta contra el contexto**, no contra tu gusto: ¿qué atributo pide **este** proyecto, con esta vida útil, este equipo y este costo de fallar?
4. **Escribe el sacrificio explícitamente:** *"Elijo A y acepto perder B, porque este proyecto necesita C."* Esa frase es el núcleo de un ADR (módulo M8), y es lo único que te permitirá reevaluar la decisión cuando el contexto cambie.

> 💡 **La prueba del sacrificio:** si te preguntan *"¿qué pierdes con esta decisión?"* y no tienes respuesta, todavía no decidiste. Toda decisión arquitectónica real tiene una respuesta a esa pregunta; si no la tiene, es porque elegiste lo que ya venías haciendo.

## La trampa del "¿y si…?"

Hay una forma específica de arruinar un trade-off, y es tan común que merece nombre propio: justificar complejidad de hoy con futuros hipotéticos.

*"¿Y si necesitamos cambiar de base de datos?"* · *"¿Y si escalamos a millones de usuarios?"* · *"¿Y si el cliente pide una app móvil?"*

El problema no es preguntárselo — es **con qué se paga la respuesta**:

> ⚠️ **Cuidado:** estás pagando con **dinero cierto** (complejidad que existe desde hoy, en cada feature, para cada dev) por un beneficio **incierto** (un futuro que quizá no llegue). El trade-off no está mal planteado: está mal cotizado.

La regla práctica es simple: **paga con dinero cierto solo por futuros probables**. Y si el futuro es improbable pero catastrófico, no pagues por prevenirlo — paga por lo que vimos en la sección 2, que es abaratar la reversión si llega.

Ahora bien, todo esto asume que hay alguien tomando el trade-off. ¿Y cuando nadie lo toma? El intercambio ocurre igual — solo que nadie lo cotizó, nadie lo escribió y nadie lo puede defender. Eso es lo que viene.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- Un **trade-off** es un intercambio deliberado: subes un atributo aceptando bajar otro. Es la unidad de pensamiento de la arquitectura — aquí no se resuelve, **se cotiza**.
- **No existe "la arquitectura correcta"** porque la corrección no es una propiedad del diseño, sino de la relación entre el diseño y su contexto. La misma decisión es acierto en un proyecto y error en el de al lado.
- **Toda arquitectura duele en algún eje.** La pregunta no es si duele, sino si duele **donde decidiste que doliera**.
- Un senior no sabe la opción correcta: **sabe nombrar qué se pierde con cada una**. Si no puedes decir qué pierdes, no decidiste — preferiste.
- La trampa del *"¿y si…?"*: pagar con **complejidad cierta de hoy** por **futuros inciertos**. Paga con dinero cierto solo por futuros probables.

---
[[03_atributos-de-calidad|← anterior]] · [[00_indice|índice]] · [[05_arquitectura-implicita|siguiente →]]
