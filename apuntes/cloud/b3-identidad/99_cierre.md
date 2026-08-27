---
tema: B3 — Identidad
workspace: cloud
seccion: cierre
titulo: "Cierre del módulo — práctica en consola y caso"
estado: parcial
prev: 05_roles
next: null
---

# ☁️ Cierre del módulo — práctica y caso

> **El módulo no cierra al terminar las secciones.** Cierra aquí, y cierran **las dos**: la práctica en consola *y* el caso.
>
> Estado: 🛠️ práctica 🔄 a medias · 🧩 caso ⬜ pendiente.

## 🛠️ Práctica en consola — dejar de operar como root

| # | Paso | Estado |
|---|------|--------|
| 1 | Crear tu propio usuario IAM, con su grupo y su política | ✅ hecho |
| 2 | Entrar con ese usuario por la URL del alias de cuenta | ✅ hecho |
| 3 | Configurar la **CLI** para que responda como ese usuario | ✅ hecho — procedimiento en la guía de la CLI |
| 4 | Activar **MFA** en tu usuario y en root | ⬜ pendiente |
| 5 | Crear un **rol para un servicio** y comprobar que ese servicio puede hacer algo que antes no podía | ⬜ pendiente |
| 6 | **Romperlo:** quitar la política del rol, predecir el error, comprobar | ⬜ pendiente |

> 🔗 La guía del paso 3: [[guia_cli-instalacion-configuracion|Instalación y configuración de la AWS CLI]] — procedimiento de referencia, no entra al repaso.

> 📌 Los pasos 1–3 estaban hechos y no registrados en ninguna parte — precisamente el hueco que este archivo cierra. El apunte guarda el concepto; **la práctica no tenía dónde vivir**.

**El paso 6 es el que evalúa.** Antes de volver a intentar la operación con el rol capado, **escribe qué mensaje esperas ver** y de qué componente vendrá. Después comprueba. Si el error que llega no se parece a tu predicción, ahí está lo que no entendiste — no en el paso 5, que funciona siguiendo instrucciones.

> 🧹 **Al terminar, borra lo que creaste** para la prueba del rol. Es la lista de limpieza de B2 aplicada de verdad.

## 🧩 Caso de decisión

> ⬜ **Pendiente.** Se resuelve sin los apuntes delante.

> Tu app corre en un servidor y necesita leer archivos de un bucket. Un compañero propone: crear un usuario IAM, generar una clave de acceso, y ponerla en el `.env` del servidor.
>
> **1.** ¿Qué está mal en esa propuesta, y qué haces tú en su lugar?
> **2.** Tu script **local**, en tu laptop, también necesita leer ese bucket. ¿Aplica la misma solución? ¿Por qué?
> **3.** La política que otorgas, ¿qué debe permitir exactamente? ¿Por qué *"acceso completo a S3"* es una respuesta **cara**, si funciona igual?

---
[[00_indice|índice]]
