---
tema: M4 — Funciones
workspace: typescript
seccion: cierre
titulo: "Cierre del módulo — micro-ejercicio y quiz"
estado: parcial
prev: 04_sobrecargas
next: null
---

# 🟦 Cierre del módulo — micro-ejercicio y quiz

> **El módulo no cierra al terminar de leer las cuatro secciones. Cierra aquí.**
>
> Dos pruebas: una que se comprueba con el compilador y otra que se corre en vivo. Si te trabas en la primera, pide una pista — están pensadas para darse escalonadas, no para ahorrártelas.

## 🧪 Micro-ejercicio — `agrupar`

**Qué se construye**

Una función `agrupar` que recibe dos cosas: una lista de objetos, y un texto con el **nombre** de una propiedad (por ejemplo `"area"`). Devuelve un objeto que reparte esos elementos en grupos, según el valor que cada uno tenga en esa propiedad.

Con la misma función, pasarle `"area"` agrupa por área y pasarle `"nombre"` agruparía por nombre: el nombre de la propiedad es un dato que llega al llamarla, no algo fijo en el código. El cuerpo y los tipos los escribes tú, en un archivo nuevo.

**Entrada y salida exactas**

```ts
const usuarios = [
  { nombre: "Ana", area: "ventas" },
  { nombre: "Luis", area: "soporte" },
  { nombre: "Eva", area: "ventas" },
]

console.log(agrupar(usuarios, "area"))
```

Debe imprimir exactamente esto:

```text
{
  ventas: [
    { nombre: 'Ana', area: 'ventas' },
    { nombre: 'Eva', area: 'ventas' }
  ],
  soporte: [ { nombre: 'Luis', area: 'soporte' } ]
}
```

**Restricciones**

- `strict` activado.
- La palabra `any` no aparece en tu archivo.
- Una propiedad sin elementos no aparece en el resultado.

**Hecho cuando**

- `npx tsc --strict --noEmit tuArchivo.ts` no reporta nada.
- Compilado y ejecutado con `node`, imprime la salida de arriba.

**Qué mide:** si sabes anotar lo que entra, dejar que se infiera lo que sale (sección 1) y describir el parámetro de una función que se pasa a otra (sección 3), sobre un caso donde el tipado obvio no funciona a la primera.

## ❓ Quiz de lectura

> 🎙️ **El quiz NO se hace leyendo: se hace en vivo con el agente.** Las preguntas no están escritas aquí a propósito — verlas de antemano lo convierte en un ejercicio de copiar.
>
> Cuando estés listo, dile al agente: **"hagamos el quiz del M4 de TypeScript"**. Te dará **una pregunta a la vez**, esperará tu respuesta, la evaluará, y recién entonces pasará a la siguiente.
>
> Son 5 preguntas sobre código real, no sobre definiciones. Sin mirar los apuntes.

**Qué mide:** si lees una firma ajena y sabes qué recibe y qué devuelve (sección 3), si distingues qué se puede omitir al llamar y qué vale el parámetro dentro de la función (sección 2), si reconoces qué tipo infiere el compilador sin ejecutarlo (sección 1), y si sabes elegir la firma que aplica cuando hay varias apiladas (sección 4).

## Cómo se evalúa

- El micro-ejercicio lo aprueba el compilador, no yo. Si `tsc` calla y la salida coincide, está hecho.
- En el quiz, una respuesta que nombra el mecanismo vale más que una que acierta el resultado: *"no compila"* no es una respuesta; *"no compila porque sobre una unión solo se usan los miembros comunes a todos sus tipos"* sí.

---

## Estado del cierre

- [ ] Micro-ejercicio hecho —
- [x] Quiz respondido — 2026-09-18. 4/5 completas (inferencia del retorno, `=> void`, sobrecargas, lectura de un tipo anidado). La 2 quedó con dos huecos: el tipo de un parámetro con valor por defecto dentro de la función, y la confusión entre "requerido después de `?`" (no compila) y "requerido después de un valor por defecto" (compila, y obliga a pasar `undefined`). Lo que falló está en `reforzar:` del índice.

Al resolverlo se anota el resultado aquí y en el bloque `repaso:` del `00_indice.md`.

---

[[04_sobrecargas|← anterior]] · [[00_indice|índice]]
