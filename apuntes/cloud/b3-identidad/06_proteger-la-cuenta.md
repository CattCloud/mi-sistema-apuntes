---
tema: B3 — Identidad
workspace: cloud
seccion: 6
titulo: "Proteger la cuenta: MFA y auditoría"
estado: en progreso
prev: 05_roles
next: 99_cierre
---

# ☁️ Proteger la cuenta: MFA y auditoría

> **Todo lo anterior reparte permisos. Esta sección protege la puerta y comprueba quién la ha usado.**
>
> Son las dos mitades que faltan: impedir que alguien entre con una credencial robada, y saber qué identidades existen y qué han estado haciendo.

## El dolor: una contraseña robada y nada más de por medio

Una contraseña se pierde de muchas formas y ninguna requiere que nadie ataque nada: se reutiliza en otro sitio que sufre una filtración, se escribe en un chat, se queda en un gestor de contraseñas de un equipo prestado.

El problema no es que se pierda. Es **lo que hay detrás de ella**:

```text
Contraseña de root  →  control total de la cuenta
                       ↓
                       borrar todos los recursos
                       cambiar el método de pago
                       cerrar la cuenta
```

No hay ningún paso intermedio. Con un solo dato —una cadena de texto que alguien puede leer por encima del hombro— se accede a todo, porque ya se vio en la Sección 1 que a root **no se le pueden recortar permisos**.

> ⚠️ **Y la reacción intuitiva no sirve.** Poner una contraseña más larga reduce la probabilidad de que alguien la adivine, pero no cambia nada si la contraseña se **filtra**: una contraseña de 40 caracteres filtrada es exactamente igual de válida que una de 8. Contra la filtración no protege la fortaleza, protege **tener un segundo factor**.

## MFA: qué es y qué dispositivos hay

> **MFA (Multi-Factor Authentication) es exigir dos pruebas de identidad de tipos distintos: algo que sabes y algo que tienes.**
>
> La contraseña es lo que sabes. El segundo factor es un dispositivo físico en tu poder que genera un código temporal.

El beneficio es concreto y se enuncia en una línea: **una contraseña robada deja de ser suficiente**. Quien la tenga se queda en la puerta, porque le falta el dispositivo — y el dispositivo no viaja por internet, está en un bolsillo.

Las opciones, de menos a más robusta:

| Tipo | Qué es | Nota |
|------|--------|------|
| **Aplicación de autenticación** *(MFA virtual)* | Una app que genera códigos de 6 dígitos que cambian cada pocos segundos | La opción normal. Algunas viven solo en un teléfono; otras sincronizan entre dispositivos |
| **Llave de seguridad física** *(U2F)* | Un dispositivo USB que se conecta y se toca para confirmar | Más resistente al phishing: no hay código que alguien pueda pedirte por teléfono |
| **Token de hardware** | Un llavero que muestra un código en su propia pantalla | Para entornos donde no se permite el móvil |

> 💡 **El criterio para elegir entre las dos primeras:** una aplicación que **sincroniza entre dispositivos** te protege de perder el teléfono; una que vive solo en un teléfono te deja fuera si ese teléfono se rompe. Y una llave física es la más segura y la más fácil de perder. Sea cual sea, la pregunta que hay que responder **antes** de activarlo es: *¿qué hago si pierdo el segundo factor?*

> ⚠️ **Dónde ponerlo primero, sin discusión: en root.** Es la única identidad cuyos permisos no se pueden recortar, así que es la única donde el segundo factor es la *única* defensa que existe. Después, los usuarios IAM que entren por consola.

## La política de contraseñas

> **Una política de contraseñas es el conjunto de reglas que deben cumplir las contraseñas de los usuarios IAM de la cuenta.**

Se define una vez, a nivel de cuenta, y afecta a todos los usuarios IAM. Lo que se puede exigir:

- **Longitud mínima.**
- **Tipos de carácter obligatorios** — mayúsculas, minúsculas, números, símbolos.
- **Que los usuarios puedan cambiar su propia contraseña**, sin pedírselo a un administrador.
- **Caducidad** — obligar a cambiarla cada cierto tiempo.
- **Prohibir la reutilización** de contraseñas anteriores.

> 🔑 **Dos precisiones que suelen faltar:**
>
> **No aplica a root.** La política gobierna a los usuarios IAM. La contraseña de root se gestiona aparte, y es justamente la que más importa — otra razón para que su defensa real sea el MFA.
>
> **La caducidad obligatoria está en discusión.** Forzar cambios frecuentes suele producir contraseñas peores y predecibles (`Verano2026!` → `Verano2027!`). Hoy se considera preferible una contraseña larga, única y con MFA, que una que caduca cada 30 días. Actívala si te la exige una normativa; no por costumbre.

## Las dos herramientas: informe de credenciales y Access Advisor

Hasta aquí todo era configurar. Estas dos sirven para lo contrario: **mirar lo que ya existe**. Responden preguntas distintas y conviene no confundirlas.

| | **Informe de credenciales** | **Access Advisor** |
|---|---|---|
| **Alcance** | Toda la cuenta | Una identidad concreta |
| **Responde** | *¿Quién existe y en qué estado están sus credenciales?* | *¿Qué permisos tiene y cuáles ha usado?* |
| **Formato** | Un archivo CSV descargable | Una pantalla dentro del usuario o rol |
| **Para qué** | Encontrar lo olvidado | Recortar lo que sobra |

**El informe de credenciales** lista, para cada usuario de la cuenta: cuándo se creó, si tiene contraseña y cuándo se usó por última vez, si tiene MFA activo, cuántas claves de acceso tiene, cuándo se rotaron y cuándo se usaron.

Leído como auditoría, cada columna es una pregunta incómoda: **¿hay usuarios que no entran desde hace meses? ¿claves creadas hace un año que nadie ha rotado? ¿alguien sin MFA?** Con dos usuarios se puede saber de memoria; con veinte, este archivo es la única forma.

**Access Advisor** hace lo contrario: se abre desde un usuario o un rol, y muestra **a qué servicios tiene permiso de acceder y cuándo accedió por última vez a cada uno**. Los servicios que aparecen con permiso concedido y **sin ningún acceso registrado** son permisos que sobran.

> 🎯 **Y aquí se cierra el ciclo que abrió la Sección 3.** El menor privilegio se planteaba como un problema difícil porque *"nunca sabes qué permisos necesita de verdad tu aplicación"*. Access Advisor responde justamente eso, con datos en vez de intuición: das permisos, dejas correr unos días, y **te dice cuáles no se han tocado nunca**. Eso convierte el recorte de permisos en una tarea con evidencia.

> 💡 **Una tercera herramienta que va un paso más allá:** desde un usuario o rol se puede **generar una política a partir de la actividad registrada** — AWS revisa lo que esa identidad hizo de verdad y propone una política que permita exactamente eso y nada más. Es el menor privilegio calculado en lugar de escrito a mano. Necesita que haya actividad registrada, así que solo funciona después de un tiempo de uso real.

## Responsabilidad compartida aplicada a IAM

El modelo general se vio en **B1**. Aplicado a este servicio, la línea queda así:

| | Qué le toca |
|---|---|
| **AWS** | La infraestructura y la seguridad de la red global · el análisis de configuración y de vulnerabilidades de la plataforma · la validación de conformidad |
| **Tú** | Gestionar y supervisar usuarios, grupos, roles y políticas · **activar MFA** en las cuentas · **rotar las claves** periódicamente · aplicar los permisos adecuados · revisar los patrones de acceso con las herramientas de auditoría |

Fíjate en que **la columna de la derecha es este módulo entero**. IAM es el ejemplo más puro del reparto: AWS te da un servicio de identidades que funciona perfectamente, y absolutamente todo lo que decida quién entra y qué puede hacer **queda de tu lado**. No hay configuración por defecto que te salve.

## Buenas prácticas — el checklist de cierre

Todo el módulo condensado en nueve reglas. No son consejos sueltos: cada una responde a algo concreto de las secciones anteriores.

| Regla | De dónde sale |
|-------|---------------|
| **No usar root** salvo para configurar la cuenta y lo que solo él puede hacer | Sección 1 — no se le pueden recortar permisos |
| **Un usuario IAM por persona física** | Sección 1 — compartir usuarios elimina el rastro de quién hizo qué |
| **Los permisos, a los grupos; los usuarios, a los grupos** | Sección 1 — se administra por función, no por persona |
| **Política de contraseñas fuerte** | Sección 6 |
| **MFA activo**, empezando por root | Sección 6 — es la única defensa contra una contraseña filtrada |
| **Roles para los servicios**, nunca claves | Sección 5 — una credencial que no existe no se puede filtrar |
| **Claves de acceso solo para acceso programático propio** | Sección 4 — tu equipo, no un servidor |
| **Auditar con el informe de credenciales** | Sección 6 — lo olvidado no se encuentra de memoria |
| **No compartir nunca usuarios ni claves de acceso** | Secciones 1 y 4 |

> 🎯 **Si hubiera que quedarse con una sola:** **MFA en root**. Es la de mayor efecto por minuto invertido de toda la lista — protege la única identidad que puede destruir o cerrar la cuenta, y se activa una vez en cinco minutos.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- Contra una contraseña **filtrada** no protege que sea larga: protege tener un segundo factor, porque una contraseña robada de 40 caracteres es tan válida como una de 8.
- MFA exige dos pruebas de tipos distintos —algo que sabes y algo que tienes— y su efecto es que una contraseña robada deja de ser suficiente.
- El MFA va primero en root, porque es la única identidad cuyos permisos no se pueden recortar y por tanto la única sin ninguna otra defensa.
- La política de contraseñas gobierna a los usuarios IAM, **no a root**, y la caducidad obligatoria suele producir contraseñas peores.
- El informe de credenciales responde *quién existe y en qué estado*; Access Advisor responde *qué permisos se usan de verdad* — el primero encuentra lo olvidado, el segundo recorta lo que sobra.
- Access Advisor cierra el problema del menor privilegio: convierte el recorte de permisos en una decisión con evidencia en lugar de intuición.
- En IAM, AWS pone el servicio y **todo lo que decide quién entra y qué puede hacer queda de tu lado**: no hay configuración por defecto que te proteja.

---
[[05_roles|← anterior]] · [[00_indice|índice]] · [[99_cierre|cierre →]]
