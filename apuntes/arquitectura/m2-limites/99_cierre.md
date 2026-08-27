---
tema: M2 — Límites: cómo se parte un sistema
workspace: arquitectura
seccion: cierre
titulo: "Cierre del módulo — el caso"
estado: pendiente
prev: 05_senales-limite-mal-puesto
next: null
---

# 🏛️ Cierre del módulo — el caso

> **El módulo no cierra al terminar de leer las secciones.** Cierra cuando resuelves el caso **sin ayuda y sin abrir el apunte**.
>
> Un cuestionario mide si recitas; un caso mide si decides.

## 🧩 El caso

Un e-commerce se puede organizar de dos formas:

**A)** `/controllers`, `/services`, `/repositories`, `/models` — cada carpeta agrupa un tipo técnico
**B)** `/catalogo`, `/carrito`, `/pedidos`, `/pagos` — cada carpeta agrupa un pedazo de negocio

**1.** Llega este requerimiento: *"agregar descuentos por volumen al carrito"*. En cada organización, ¿cuántas carpetas tienes que abrir?

**2.** Ahora llega este otro: *"cambiar Prisma por otro ORM"*. ¿Cuál de las dos sufre más?

**3.** ¿Qué te dice la comparación sobre en qué contexto conviene cada corte?

> 💡 **Por qué este caso:** cada organización gana en un requerimiento y pierde en el otro. Si contestas que una es mejor a secas, no viste el trade-off.

## Cómo se evalúa

- La **pregunta 1** la contesta cualquiera que leyó la sección de cohesión.
- La **pregunta 2** es la que separa: obliga a mirar el corte desde un cambio que no es de negocio.
- La **pregunta 3** es la que cierra el módulo. Si no nombras un contexto para cada opción, todavía no hay criterio.

---

## Estado del cierre

- [ ] Caso resuelto sin ayuda

Al resolverlo se anota el resultado aquí y en el bloque `repaso:` del `00_indice.md`.

---
[[00_indice|índice]]
