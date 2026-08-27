---
tema: M1 — Qué es arquitectura (y qué no)
workspace: arquitectura
seccion: 1
titulo: "¿Qué distingue una decisión arquitectónica?"
estado: finalizada
prev: null
next: 02_costo-de-reversion
---

# 🏛️ ¿Qué distingue una decisión arquitectónica?

Compras un curso que promete "arquitectura de software" y termina siendo SOLID, clean code y nombres de variables. Sales sabiendo escribir mejor **cada clase** — y seis meses después el proyecto sigue volviéndose un nudo: tocar el carrito rompe el checkout, la lógica de precios está repetida en tres archivos y nadie recuerda por qué el pago vive donde vive. El conocimiento no era malo, respondía otra pregunta. Te enseñaron **cómo escribir bien una pieza** cuando lo que dolía era **dónde va cada pieza y quién puede llamar a quién**.

> **Una decisión es arquitectónica cuando define la estructura del sistema: qué partes existen, dónde están sus límites y quién depende de quién.**
>
> Una decisión de diseño ocurre *dentro* de una de esas partes: cómo se implementa, cómo se nombra, qué patrón se usa adentro. En otras palabras, la primera dibuja el mapa; la segunda decide cómo se camina una calle del mapa.

## El criterio: ¿esta decisión restringe otras decisiones?

> **Una decisión arquitectónica es una decisión sobre otras decisiones.**
>
> No resuelve un problema puntual: define el marco dentro del cual se van a resolver todos los problemas puntuales que vengan después.

Esa es la prueba que conviene memorizar, porque funciona sin importar el lenguaje, el framework o el tamaño del proyecto. Si al tomar la decisión estás **cerrando puertas para todos los que vengan detrás**, es arquitectura. Si solo estás eligiendo cómo resolver lo que tienes enfrente, es diseño.

Para aplicarla en el momento, tres preguntas de control:

- **¿Obliga a otros a acomodarse?** Si el resto del equipo tiene que escribir su código de cierta forma *por culpa* de esta decisión, es arquitectónica.
- **¿Sobrevive a quien la tomó?** Si el dev que la tomó se va mañana y la decisión sigue vigente y afectando features nuevas, es arquitectónica.
- **¿Puede un solo dev cambiarla en su rama sin avisarle a nadie?** Si la respuesta es sí, es de diseño. Casi siempre.

La tercera es la más útil en la práctica: no habla de teoría, habla de **cuánta gente tiene que enterarse**.

## ¿Qué significa "una decisión sobre otras decisiones"?

> **Una decisión normal responde una pregunta que tienes hoy. Una decisión arquitectónica responde preguntas que nadie ha hecho todavía.**
>
> Por eso no se siente productiva en el momento: su valor no se cobra el día que la tomas, sino cada vez que alguien *no tiene que preguntar*.

Veámoslo con una decisión concreta: *"la regla de negocio no vive en el route handler, vive en una función de dominio"*. El día que la tomas no resuelve nada visible — de hecho parece trabajo extra. Pero mira lo que pasa después:

- Ocho meses más tarde alguien agrega la regla *"no vender por debajo del stock mínimo"*. **Nunca pregunta dónde ponerla**: ya estaba contestado.
- Un año más tarde el checkout se dispara también desde un webhook de WhatsApp. **Nadie reescribe la regla**: ya estaba contestado, sin que tú supieras que WhatsApp iba a existir en el proyecto.

Es decir, no tomaste *una* decisión: tomaste **el molde con el que se van a tomar las que vengan**.

Imagina un edificio en construcción. Decidir **dónde van la escalera y los ductos** condiciona para siempre la distribución de los 12 pisos: el que alquile el piso 7 no vota, hereda. Decidir **de qué color se pinta esa oficina del piso 7** lo decide quien la ocupa, y no le impone nada al piso 8. La pregunta que tienes que hacerte frente a cualquier decisión es esa: *¿esto es ducto o es pintura?*

> 💡 **Tip:** el alcance **no se mide en cantidad de archivos**. Una decisión que toca 40 archivos pero que un dev arregla con un find-and-replace no es arquitectura. Se mide en **cuántas decisiones futuras deja pre-contestadas**.

## El mismo proyecto, las dos decisiones

Veámoslo en un caso concreto. En un e-commerce se toman estas dos decisiones el mismo día:

- **A)** *"El carrito se persiste en Postgres, no en `localStorage`."*
- **B)** *"El componente del carrito maneja su estado con `useReducer` en vez de `useState`."*

La **A** obliga a que exista un usuario identificado, mete un round trip al servidor en cada acción del carrito, condiciona cómo se testea, y cualquier feature futura que toque el carrito nace atada a esa elección. La **B** vive completa dentro de un archivo: el que lo abra la ve, el que no, ni se entera.

Es decir, **A** es una decisión sobre otras decisiones. **B** es una decisión sobre sí misma.

## La comparación completa

| Dimensión | Decisión arquitectónica | Decisión de diseño |
|-----------|-------------------------|--------------------|
| Sobre qué decide | La estructura: módulos, límites, dependencias | La implementación: adentro de un módulo |
| A quién afecta | A todo el que toque el sistema después | Al que abra ese archivo |
| Cuándo *conviene* tomarla | Temprano, antes de que haya código encima | En cualquier momento |
| Quién puede revertirla | El equipo, con plan y migración | Un dev, en una tarde |
| Qué deja fijo | El marco donde se toman las demás decisiones | Nada fuera de sí misma |
| Ejemplo | "El dominio no importa Prisma" | "Esta función usa `map` en vez de `for`" |

> 🎯 **Idea clave:** lo arquitectónico no lo define **el tema** de la decisión, sino **cuánto amarra**. La misma pregunta puede ser arquitectura en un proyecto y diseño en otro.

> ⚠️ **Cuidado con la fila "cuándo":** *"se decidió temprano"* es una **consecuencia**, nunca la prueba. La flecha va al revés de como suele intuirse: no es *"se decidió temprano → es arquitectónica"*, es *"es cara de revertir → conviene decidirla temprano"*.

Y por eso "temprano" falla como indicador en las dos direcciones:

- *"Usar `camelCase` en los nombres de variables"* se decide el día uno, antes de una sola línea de código. **No es arquitectónica.**
- *"Extraer la lógica de precios a un módulo propio"* se decide en el mes 14, con el proyecto en producción. **Sí lo es.**

Debes recordar que las decisiones arquitectónicas se siguen tomando durante toda la vida del proyecto — y muchas de las más caras se toman tarde, justamente porque nadie las vio venir.

## La zona gris (y por qué no es un problema)

> 🔑 **Matiz:** *"qué librería de fechas usamos"* suena a decisión de diseño — y lo es, si la usas en un archivo. Pero si la importan cuarenta módulos y además su tipo `Date` se filtró a los contratos entre capas, ya es arquitectura: cambiarla obliga a tocar todo el sistema.

Debes recordar que la línea no es una propiedad fija de la decisión, sino de **su alcance real dentro de tu proyecto**. Por eso no sirve memorizar listas de "temas arquitectónicos": sirve aplicar el criterio cada vez.

Y hay una trampa adicional, más común que clasificar mal:

> ⚠️ **Cuidado:** el error más caro no es equivocarse al etiquetar una decisión — es **no darte cuenta de que estabas decidiendo**. Copiar la estructura de carpetas de un tutorial es una decisión arquitectónica tomada por omisión, y son las que más caro se pagan porque nadie las revisa. Ese es el tema completo de la sección 5.

Ahora bien, decir que una decisión *"restringe a las demás"* sigue siendo abstracto: no se puede medir. Hay una forma concreta de medirlo, y es la que convierte este criterio en algo operativo — **cuánto cuesta revertirla**. Eso es lo que vemos a continuación.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- Una decisión es arquitectónica cuando **restringe otras decisiones**: responde preguntas que nadie ha hecho todavía. ¿Es ducto o es pintura?
- El test práctico: **¿puede un dev cambiarla en su rama sin avisarle a nadie?** Si sí, es de diseño.
- **"Se decidió temprano" es una consecuencia, no la prueba.** `camelCase` se decide el día uno y no es arquitectura; extraer la lógica de precios se decide en el mes 14 y sí lo es.
- No lo define el **tema** de la decisión sino **cuánto amarra** — y eso no se mide en archivos tocados, sino en decisiones futuras que deja pre-contestadas.
- El error más caro no es clasificar mal, es **no notar que estabas decidiendo** (copiar la estructura de carpetas de un tutorial ya es una decisión arquitectónica).

---
[[00_indice|índice]] · [[02_costo-de-reversion|siguiente →]]
