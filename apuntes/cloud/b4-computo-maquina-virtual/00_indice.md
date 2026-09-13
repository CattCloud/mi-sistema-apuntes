---
tema: B4 — Cómputo: la máquina virtual
workspace: cloud
estado: EN PROGRESO
arquetipo: Constructor Teórico + Sintaxis Coder
modulo: B4
temario: contexto/plan_estudio/temario_cloud_developers.md
repaso:
  ultimo: null
  proximo: null
  nivel: null
  reforzar: []
notebooklm: pendiente
---

# ☁️ B4 — Cómputo: la máquina virtual

> **Qué estás alquilando exactamente cuando levantas un servidor, qué decides al hacerlo, y qué sigue costando cuando lo apagas.** Estado: 🔄 EN PROGRESO · 5 secciones.

## Alcance

Cubre: qué es una instancia EC2 y las cinco decisiones que la definen · lo que una instancia arrastra consigo · cómo se lee el nombre de un tipo de instancia y qué familias existen · el lanzamiento paso a paso (imagen de partida, par de claves, grupo de seguridad mínimo, script de arranque) · el ciclo de vida y qué se cobra en cada estado · la IP pública que cambia · el rol de instancia y cómo lo consume el SDK.

Excluye: tipos de instancia a fondo · opciones de compra (reservadas, spot, savings plans) · SSH y conexión avanzada · EBS, snapshots y AMI propias · balanceadores y auto escalado · **contenedores (→ B4b)**.

> 🎯 **Los grupos de seguridad entran al mínimo.** No se puede llegar a una instancia sin abrir un puerto, así que se cubre *qué son y cómo abrir el que hace falta*, declarado como préstamo. El tema completo es **B7**.

## Secciones

1. [[01_que-es-una-instancia|Qué es una instancia y qué alquilas]] — ✅ `[DOLOR] [DEF] [TABLA]`
   - El dolor: necesitas un servidor y no lo quieres comprar
   - Qué es EC2 y qué es una instancia
   - Las cinco decisiones de toda máquina virtual
   - Una instancia nunca viene sola: lo que arrastra consigo
2. [[02_tipos-de-instancia|Elegir el tamaño: tipos de instancia]] — ✅ `[DEF] [CÓDIGO] [TABLA] [COSTO_SERVICIO]`
   - Cómo se lee un nombre: clase, generación, tamaño
   - Las cuatro familias y para qué sirve cada una
   - Cuál eliges hoy, y por qué
   - El precio como criterio de elección
3. [[03_lanzar-una-instancia|Lanzar una instancia]] — 🔄 `[CONSOLA] [CÓDIGO]`
   - La imagen de partida (AMI): de qué sistema arrancas
   - El par de claves: qué es y por qué se descarga una sola vez
   - El grupo de seguridad — lo mínimo para poder entrar
   - El script de arranque (user data)
   - Lanzarla y comprobar que responde
4. El ciclo de vida y lo que cuesta — ⬜ `[TABLA] [MITO]`
   - Los tres estados: en ejecución, detenida, terminada
   - Qué se cobra en cada estado
   - La IP pública que cambia sin avisar
   - Qué queda vivo cuando terminas
5. El rol de instancia — ⬜ `[DOLOR] [DEF] [CONSOLA]`
   - El dolor: la clave de acceso en el servidor
   - Cómo se le pone un rol a una máquina
   - Cómo lo encuentra el SDK sin que nadie se lo diga
   - Comprobarlo desde dentro

## Cierre

- [[99_cierre|Cierre del módulo]] — ⬜ pendiente *(se escribe al terminar las secciones)*

## Fuentes

- 🎬 Curso AWS DVA — **S5** EC2 ✅ *visto, 3 clases* → `apuntes/cloud/_input/transcripcion_s5_ec2.md`
- 📸 **Capturas propias de la consola actual** → `apuntes/cloud/_input/img_ec2/`
- 🎬 Curso AWS DVA — **S5** *Demostración de roles de instancias EC2* (6 min) — ⬜ **pendiente de ver**, alimenta la Sección 5
- 🧠 El agente

> 📌 **Cabo suelto que se cierra aquí:** el cierre de **B3** dejó aplazada la prueba de *"adjuntar un rol a un servicio y verlo funcionar"*, porque el servicio no existía todavía. La Sección 5 es ese servicio.

## Adiciones pendientes

- Ver `NOTAS.md`.
