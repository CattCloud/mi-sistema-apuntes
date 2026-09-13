---
tema: B3 — Identidad
workspace: cloud
seccion: cierre
titulo: "Cierre del módulo — auditoría, predicción y caso"
estado: pendiente
prev: 06_proteger-la-cuenta
next: null
---
# ☁️ Cierre del módulo — auditoría, predicción y caso

> **Tres pruebas cortas, y ninguna necesita crear un solo recurso.**
>
> Todo lo que piden vive dentro de IAM, que es lo único estudiado hasta aquí. Nada de máquinas, funciones ni buckets: eso llega en B4 y más adelante.

---

## 🔍 Prueba 1 — Auditoría de tu propia cuenta

Descarga el **informe de credenciales** y ábrelo. Es un CSV con una fila por identidad.

Responde, mirando solo ese archivo:

1. ¿Cuántas identidades existen en la cuenta y cuáles son?
2. ¿Cuáles tienen **MFA activo** y cuáles no?
3. ¿Hay alguna **clave de acceso** activa? Si la hay, ¿cuándo se creó y cuándo se usó por última vez?
4. Con lo anterior, **¿cuál es el punto más débil de la cuenta ahora mismo?**

**Qué mide:** si sabes leer el estado de seguridad de una cuenta a partir de un artefacto, en vez de recordar lo que configuraste. Es la habilidad que se usa al entrar a una cuenta ajena — o a la tuya seis meses después.

**✅ Criterios de aceptación**

- [ ]  Las cuatro respuestas salen del archivo, sin abrir la consola a comprobar.
- [ ]  La respuesta a la 4 nombra **una** identidad concreta y **por qué** es la más expuesta.

> 💡 Es una prueba de **lectura**, no de configuración: no hay que arreglar nada todavía.

---

## 🔮 Prueba 2 — Predicción y comprobación

Antes de tocar nada, **escribe tu predicción**. Después ejecutas y comparas.


| Situación                                                                                              | Predice antes de mirar              |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **A.** Abres el simulador de políticas para tu usuario y pruebas la acción `iam:CreateUser`           | ¿Permitida o denegada? ¿Por qué? |
| **B.** Sacas a tu usuario de su grupo y, **sin cerrar sesión**, recargas una pantalla que antes veías | ¿Qué pasa, y en cuánto tiempo?   |
| **C.** Abres el servicio IAM y miras el selector de región                                             | ¿Qué muestra, y qué significa?   |

Después ejecuta las tres y compara con lo que escribiste.

**Qué mide:** el modelo mental, no el resultado. Acertar no prueba nada; **una predicción fallida señala exactamente dónde está roto el modelo**, que es lo que se busca.

**✅ Criterios de aceptación**

- [ ]  Las tres predicciones están escritas **antes** de ejecutar.
- [ ]  Por cada fallo, queda anotado qué creías y por qué era falso.

> ⚠️ **Devuelve tu usuario a su grupo al terminar la B.** Y hazla teniendo root disponible, por si algo sale distinto de lo previsto.

---

## 🧩 Prueba 3 — El caso

> Tu aplicación corre en un servidor y necesita leer archivos de un bucket. Un compañero propone: crear un usuario IAM, generarle una clave de acceso, y ponerla en el `.env` del servidor.

**1.** ¿Qué está mal en esa propuesta, y qué harías tú en su lugar?

**2.** Tu script **local**, en tu propia máquina, también necesita leer ese bucket. ¿Aplica la misma solución? ¿Por qué?

**3.** La política que otorgas, ¿qué debe permitir exactamente? ¿Por qué *"acceso completo"* es una respuesta **cara**, si funciona igual de bien?

**Qué mide:** si la regla se aprendió **con su límite**. La pregunta 2 tiene una respuesta distinta de la 1, y responder lo mismo en ambas significa haber memorizado *"usa roles"* sin saber cuándo no aplica.

**Cómo se evalúa**

- La **1** la contesta cualquiera que leyó la sección de roles.
- La **2** es la que separa: dentro de AWS va un rol; en tu propia máquina sigue haciendo falta una clave.
- La **3** cierra el módulo. Si el argumento es *"porque es buena práctica"*, todavía no hay criterio; si nombra el radio de daño y los errores propios que un permiso ausente habría impedido, sí.

---

## Estado del cierre

- [ ]  Prueba 1 — auditoría del informe de credenciales
- [ ]  Prueba 2 — predicción y comprobación
- [ ]  Prueba 3 — el caso, resuelto sin abrir el apunte

Al resolverlas se anota el resultado aquí y en el bloque `repaso:` del `00_indice.md`.

> 📌 **Lo que NO entra en este cierre, a propósito:** adjuntar un rol a un servicio y verlo funcionar. Crear el rol es IAM y está visto; **usarlo requiere una máquina o una función**, que son B4 y B5. Esa comprobación queda anotada como pendiente para el cierre de B4.

---

[[06_proteger-la-cuenta|← anterior]] · [[00_indice|índice]]
