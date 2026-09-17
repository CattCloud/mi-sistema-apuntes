# Plantilla: Mapa mental de una clase

> **Diálogo:** "Mapa mental". Solo tiene el selector *Fuentes* y la caja *¿Cuál debería ser el tema?*
> **Fuentes a marcar:** el `.md` de la clase (las imágenes no hacen falta).
> **Para qué sirve (D37, D38, D39):** para estudiar la clase respondiendo preguntas. Las ramas son sus temáticas y las hojas, preguntas; cada nodo, al hacer clic, lanza una consulta al chat, que explica con la fuente. El mapa tiene 3 niveles como máximo. **Sin número fijo de hojas:** una por cada idea distinta, ni una repetida ni una de relleno.
> Rellenar los `[corchetes]` leyendo la clase **exportada**. La pregunta de ejemplo y lo difícil van en lenguaje claro, sin fragmentos de código (`referencias/principios.md` §10). Sin instrucciones visuales ni de formato (§6).

## Plantilla

```text
Mapa mental para estudiar [tema de la clase]. El nodo central es "[título de la clase]".

Las ramas principales son estas temáticas, en este orden y con el mismo nivel de detalle:
1. [temática 1]
2. [temática 2]
3. [...]

Las hojas son preguntas, porque cada nodo se usa como consulta: preguntas cortas, en lenguaje claro, que se entiendan solas sin tener la fuente delante. Cada pregunta nombra un solo concepto con su término técnico, no cita fragmentos de código y pide un porqué, una diferencia, una consecuencia o un cuándo, como "[una buena pregunta sacada de la clase]". Todas se pueden responder con la fuente.

No generes un número fijo de preguntas por rama: una por cada idea distinta que la temática tenga, ni una más. Ninguna pregunta repite lo que otra ya cubre, ni dentro de la misma rama ni entre ramas distintas.

Dale más preguntas a lo que más cuesta entender: [lo difícil, dicho en lenguaje claro].

Las ideas del bloque "Lo que debiste llevarte" se convierten en preguntas dentro de la temática a la que pertenecen, no en una rama aparte. En español, con los tecnicismos en inglés.
```

## Cómo se usa (para decírselo al usuario)

1. **En el chat, deja marcadas solo las fuentes de la clase.** El chat responde con las fuentes marcadas; con todo el módulo marcado, una respuesta puede mezclar otras clases.
2. **Lee la pregunta de una hoja e intenta responderla** antes de hacer clic.
3. **Clic en la hoja** → el chat la explica con la fuente. Ahí puedes seguir preguntando.
4. **Si la explicación menciona código**, pide en el chat: *"Muestra el bloque de código de la fuente para esto"*.
5. **Si una rama queda muy densa**, genera otro mapa con esa rama como nodo central (mapa en cascada), con esta misma plantilla.

## Ejemplo: TypeScript M1, clase 4

**Fuentes:** `M1-04_tsc-y-el-flujo.md`.

```text
Mapa mental para estudiar tsc y el flujo de trabajo. El nodo central es "tsc y el flujo de trabajo".

Las ramas principales son estas temáticas, en este orden y con el mismo nivel de detalle:
1. Los tres trabajos de tsc y cuándo ocurre cada fase
2. Instalarlo: local con npx o global
3. Los comandos que vas a usar
4. Cómo se ve trabajar de verdad, y por qué en un proyecto de Next.js nunca escribes tsc
5. Errores y el .js que se genera igual

Las hojas son preguntas, porque cada nodo se usa como consulta: preguntas cortas, en lenguaje claro, que se entiendan solas sin tener la fuente delante. Cada pregunta nombra un solo concepto con su término técnico, no cita fragmentos de código y pide un porqué, una diferencia, una consecuencia o un cuándo, como "¿Por qué tsc genera el .js aunque encuentre errores de tipo?". Todas se pueden responder con la fuente.

No generes un número fijo de preguntas por rama: una por cada idea distinta que la temática tenga, ni una más. Ninguna pregunta repite lo que otra ya cubre, ni dentro de la misma rama ni entre ramas distintas.

Dale más preguntas a lo que más cuesta entender: que algunas herramientas borran los tipos sin verificarlos, y que tsc ignora la configuración del proyecto cuando le pasas un archivo concreto.

Las ideas del bloque "Lo que debiste llevarte" se convierten en preguntas dentro de la temática a la que pertenecen, no en una rama aparte. En español, con los tecnicismos en inglés.
```
