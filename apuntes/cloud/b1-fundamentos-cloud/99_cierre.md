---
tema: B1 — Fundamentos de Cloud
workspace: cloud
seccion: cierre
titulo: "Cierre del módulo — recorrido y caso"
estado: parcial
prev: 04_regiones-y-az
next: null
---

# ☁️ Cierre del módulo — recorrido y caso

> **Dos pruebas que se pasan con una cuenta vacía.** B1 es conceptual: no hay nada creado todavía, y el cierre está diseñado para eso.

---

## 🧭 Prueba 1 — Recorrido de orientación

Sin ayuda y sin el apunte, ubica en la consola:

1. El **selector de región** y en cuál estás ahora.
2. Dónde se **listan los servicios**.
3. Dónde se ve la **cuenta activa**.

Y después, la comprobación que de verdad enseña:

4. Abre un servicio **regional** y otro **global**. Compara qué muestra el selector de región en cada uno.
5. Cambia de región y observa qué ocurre con la página.

**Qué mide:** si sabes **dónde estás parado** antes de crear nada. Es orientación, no procedimiento — y es lo que evita el error más caro del primer mes, que es crear algo en una región y buscarlo en otra.

**✅ Criterios de aceptación**

- [x] Ubicados el selector de región, el listado de servicios y la cuenta activa.
- [ ] Comprobado que un servicio global bloquea el selector y muestra `Global`, y uno regional no.
- [ ] Observado que al cambiar de región **la página recarga entera**, porque la región es parte del contexto y no un filtro.

> 📝 **Lo que no entra a propósito:** ver desaparecer un recurso al cambiar de región. Requiere tener algo creado, y no hay nada. Queda anotado para el cierre de **B4**, que es el primer módulo con recursos encendidos.

---

## 🧩 Prueba 2 — El caso

> Te ofrecen tres formas de tener tu app de Node corriendo:
>
> **A)** Un servidor virtual donde tú instalas Node, el sistema operativo y los parches
> **B)** Una plataforma donde subes el código y ella se encarga del resto
> **C)** Un servicio que ya existe y solo lo usas por API

**1.** Nombra el modelo de cada una — IaaS, PaaS o SaaS.

**2.** En cada caso, ¿qué falla es **tuya** y qué falla es **del proveedor**?

**3.** Si tu app deja de funcionar por un parche de seguridad no aplicado, ¿en cuál de las tres es culpa tuya?

**Qué mide:** si la tabla de capas se convirtió en criterio. Las dos primeras preguntas son vocabulario; la tercera obliga a aplicarla a un fallo concreto, que es donde se ve si se entendió o se memorizó.

**Cómo se evalúa**

- Las **1 y 2** se contestan leyendo la tabla de capas.
- La **3** tiene una trampa: la respuesta cambia según **qué** parche sea. Si el agujero está en el sistema operativo, es IaaS. Si está en una librería de tu `package.json`, es tuyo **también en PaaS** — porque tu código y sus dependencias son tuyos en todos los modelos donde tengas código.

---

## Estado del cierre

- [x] **Caso resuelto** — ✅ aprobado el 2026-08-22. Modelos correctos, línea de responsabilidad correcta, parche del SO ubicado en IaaS.
  - Corregido en sesión: en PaaS la seguridad no desaparece (dependencias y secretos siguen siendo tuyos), y el código propio es tuyo en todos los modelos donde exista.
- [ ] **Recorrido de orientación** — parcial: hecha la parte 1-3, faltan los puntos 4 y 5.

---
[[04_regiones-y-az|← anterior]] · [[00_indice|índice]]
