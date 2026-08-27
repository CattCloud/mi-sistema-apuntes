---
tema: M1 — Qué es arquitectura (y qué no)
workspace: arquitectura
seccion: cierre
titulo: "Cierre del módulo — el caso"
estado: resuelto
fecha: 2026-08-21
prev: 05_arquitectura-implicita
next: null
---

# 🏛️ Cierre del módulo — el caso

> **Estado: ✅ resuelto el 21 de agosto de 2026.** Clasificación 5/5, orden de reversión correcto y coherente.

## 🧩 El caso

Te pasan una lista de decisiones tomadas en un proyecto:

**A)** Usar `camelCase` en los nombres de variables
**B)** Que el frontend hable con el backend por REST y no por GraphQL
**C)** Extraer la lógica de precios a un módulo propio
**D)** Usar `map` en vez de un `for` en el listado de productos
**E)** Guardar las sesiones en la base de datos en vez de en memoria

**1.** ¿Cuáles son arquitectónicas y cuáles no? Justifica con **un solo criterio**, el mismo para todas.

**2.** Ordénalas de más cara a más barata de revertir dentro de seis meses. ¿Coincide ese orden con tu respuesta anterior?

## Resultado

**Pregunta 1 — clasificación: 5/5.** A ❌ · B ✅ · C ✅ · D ❌ · E ✅.

**Pregunta 2 — orden: B → E → C → A → D.** Defendible entero, y coherente con la clasificación: las tres arquitectónicas arriba, las dos de diseño abajo.

### Lo que quedó por corregir

- **Se usaron tres criterios distintos, no uno.** *"Quién puede cambiarla"* (A, B, D), *"engloba múltiples decisiones"* (C) y *"toca muchos archivos"* (E). Los dos primeros son en realidad el mismo criterio visto por sus dos caras: la definición y su test.
- **`"toca muchos archivos"` no es criterio de alcance.** Aplicado a A daría la respuesta equivocada: `camelCase` toca todos los archivos del proyecto y no es arquitectónica.
- **Faltó el desempate entre dos decisiones caras** (C vs E). Se resolvió agregando el método a la sección 2: enumerar qué se toca, quién se entera y si hay datos en vivo.

Todo eso quedó anotado en el bloque `repaso:` del `00_indice.md`.

---
[[00_indice|índice]]
