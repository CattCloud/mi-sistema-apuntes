---
tema: B1 — Fundamentos de Cloud
workspace: cloud
seccion: cierre
titulo: "Cierre del módulo — práctica en consola y caso"
estado: parcial
prev: 04_regiones-y-az
next: null
---

# ☁️ Cierre del módulo — práctica y caso

> **El módulo no cierra al terminar las secciones.** Cierra aquí, y cierran **las dos**: la práctica en consola *y* el caso.
>
> Estado: 🧩 caso ✅ resuelto el 22 de agosto de 2026 · 🛠️ práctica ⬜ pendiente.

## 🛠️ Práctica en consola — predice antes de mirar

> ⬜ **Pendiente.** Cuando se escribió este módulo no había ningún recurso creado y la práctica quedó reducida a un recorrido. Ya no: en **B3** creaste usuario, grupo, política, clave de acceso y rol, y en **B2** un presupuesto. Con eso la práctica ya es falible.

**1. Predice, por escrito, antes de tocar el selector de región.** De cada recurso que ya tienes, marca si **seguirá visible** al cambiar de región o si **desaparecerá** — y el porqué:

| Recurso | ¿Sigue visible? | Mi razón |
|---------|:---------------:|----------|
| Usuario IAM | | |
| Grupo | | |
| Política propia | | |
| Clave de acceso | | |
| Rol *(cuando exista)* | | |
| Presupuesto / alerta | | |

**2. Cambia de región y compara.** Por cada fallo, di **qué criterio aplicaste mal** —global vs. regional—, no *"se me pasó"*. El criterio equivocado es la corrección; el fallo solo es el síntoma.

**3. Responde para cerrar:** ¿en qué región estás creando cosas, y cuál de los **cuatro criterios de elección** la justifica? Si la respuesta es *"la que venía por defecto"*, esa también es una respuesta — pero entonces di qué te costaría cambiarla ahora.

> 🧹 Nada que limpiar: esta práctica no crea recursos.

## 🧩 Caso de decisión

> Te ofrecen tres formas de tener tu app de Node corriendo:
>
> **A)** Un servidor virtual donde tú instalas Node, el sistema operativo y los parches
> **B)** Una plataforma donde subes el código y ella se encarga del resto
> **C)** Un servicio que ya existe y solo lo usas por API
>
> **1.** Nombra el modelo de cada una (IaaS / PaaS / SaaS).
> **2.** En cada caso, ¿qué falla es **tuyo** y qué falla es **del proveedor**?
> **3.** Si tu app deja de funcionar por un parche de seguridad no aplicado — ¿en cuál de las tres es culpa tuya?

### Resultado — ✅ aprobado (22 de agosto de 2026)

Modelos correctos, línea de responsabilidad correcta, y el parche del SO ubicado en IaaS.

**Matices corregidos en sesión:**

- **En PaaS la seguridad no desaparece.** Dependencias, secretos y accesos siguen siendo tuyos: lo que la plataforma se lleva es el sistema operativo y el runtime, no tu superficie de ataque.
- **Tu código es tuyo en todos los modelos donde exista.** No hay modelo de servicio que te libere de lo que tú escribiste.

Ambos quedaron anotados en el bloque `repaso:` del `00_indice.md`.

---
[[00_indice|índice]]
