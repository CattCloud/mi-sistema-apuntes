---
tema: B3 — Identidad
workspace: cloud
estado: EN PROGRESO
arquetipo: Constructor Teórico + Documento Técnico
modulo: B3
temario: contexto/plan_estudio/temario_cloud_developers.md
repaso:
  ultimo: null
  proximo: null
  nivel: null
  reforzar: []
notebooklm: pendiente
---

# ☁️ B3 — Identidad

> **Quién eres y qué puedes hacer.** Cómo se autentica y autoriza algo —una persona o un servicio— ante AWS, y cómo darle exactamente los permisos que necesita y ni uno más. Estado: 🔄 EN PROGRESO · 6 secciones.

## Alcance

Cubre: la cuenta root y por qué no se usa, usuarios y grupos con sus reglas, el alias de cuenta, la anatomía de una política JSON y dónde se adjunta, cómo se resuelve un permiso, menor privilegio en la práctica, las tres puertas de acceso (consola, CLI, SDK), qué es una clave de acceso y dónde vive, roles y entidades de confianza, roles para servicios, MFA y política de contraseñas, y las dos herramientas de auditoría (informe de credenciales y Access Advisor).

Excluye: STS, federación, Directory Services, Organizations, IAM a escala de empresa · **secretos y cifrado (→ B3b)** · el CLI en profundidad —perfiles, scripting, `--query`— que queda anotado en `NOTAS.md` como tema propio.

> 🎯 **La CLI entra como superficie de práctica, no como tema.** Es el primer sitio donde una credencial deja de ser abstracta y se convierte en un archivo en tu disco. Ese es su papel aquí.

## Secciones

1. [[01_usuarios-y-grupos|Usuarios y grupos — quién eres]] — ✅ `[DOLOR] [DEF] [TABLA] [CONSOLA]`
   - El dolor: una sola llave que lo abre todo
   - Qué es un usuario IAM — y qué NO es
   - Grupos: las cuatro reglas
   - El alias de cuenta y la URL de acceso
   - Crear tu usuario, tu grupo, y entrar con él
2. [[02_politicas|Políticas — qué puedes hacer]] — ✅ `[DEF] [CÓDIGO] [TABLA] [CONSOLA]`
   - Qué es una política
   - Anatomía del documento: Version, Statement y sus seis campos
   - Dónde se adjunta: usuario, grupo o rol
   - Gestionadas vs propias
   - Cómo se resuelve un permiso — y por qué "deny" siempre gana
   - Verlo funcionar: quitar del grupo y perder el acceso
3. [[03_menor-privilegio|Menor privilegio en la práctica]] — ✅ `[DEF] [MITO] [TABLA]`
   - Qué significa exactamente
   - Por qué "acceso completo" es caro aunque funcione
   - Cómo se escribe una política mínima
   - El error de escribir permisos por adelantado
4. [[04_formas-de-entrar|Las tres formas de entrar a tu cuenta]] — ✅ `[DEF] [CÓDIGO] [CONSOLA] [MITO]`
   - Las tres puertas de entrada: consola, CLI, SDK
   - Qué es una clave de acceso: ID + secreto
   - Crear una clave de acceso: qué te pregunta y por qué
   - Dónde acaba viviendo la credencial
   - Por qué esta es la credencial que más se filtra
5. [[05_roles|Rol vs usuario — la identidad sin contraseña]] — 🔄 `[DOLOR] [DEF] [ANALOGÍA] [CONSOLA]`
   - El dolor: una clave de acceso guardada en un servidor
   - Qué es un rol y qué es una entidad de confianza
   - Roles para servicios: cuando un servicio actúa en tu nombre
   - Por qué el rol gana: nada que rotar, nada que filtrar
   - Crear un rol para un servicio
6. Proteger la cuenta: MFA y auditoría — ⬜ `[DOLOR] [TABLA] [CONSOLA]`
   - El dolor: una contraseña robada y nada más de por medio
   - MFA: qué es y qué dispositivos hay
   - La política de contraseñas
   - Las dos herramientas: informe de credenciales y Access Advisor
   - Responsabilidad compartida aplicada a IAM
   - Buenas prácticas — el checklist de cierre

## Evaluación del módulo

Cierra cuando pasan **las dos** (ver temario):

- 🛠️ **Consola:** dejar de operar como root — crear tu usuario con permisos, activar MFA, configurar la CLI para que responda como ese usuario, y crear un **rol para un servicio** comprobando que ese servicio puede hacer algo que antes no podía.
- 🧩 **Caso:** la propuesta de poner una clave de acceso en el `.env` del servidor — qué está mal, qué hacer en su lugar, si aplica lo mismo al script local, y por qué "acceso completo a S3" es una respuesta cara aunque funcione.

## Fuentes

- 🎬 Curso AWS DVA — **S4** IAM y CLI ✅ *visto, 15 clases* → `apuntes/cloud/_input/transcripcion_s4_iam.md`
- 📸 **Capturas propias de la consola actual** → `apuntes/cloud/_input/img_iam/` *(la interfaz no coincide con la del video; manda lo que se ve hoy)*
- 🎬 Curso AWS DVA — **S5** *Demostración de roles de instancias EC2* (6 min) — ⬜ opcional, refuerza la Sección 5
- 📓 Notion — `Servicios Core SECURITY & IDENTITY` → `apuntes/cloud/_input/notion/` *(materia prima)*
- 🧠 El agente

## Adiciones pendientes

- Ver `NOTAS.md` — CLI en profundidad (perfiles, scripting, `--query`).

## Guías de referencia

No entran en el ciclo de repaso: son procedimientos que se consultan cuando hacen falta.

- [[guia_cli-instalacion-configuracion|Instalación y configuración de la AWS CLI]] — instalar en Windows, macOS y Linux · `aws configure` · dónde quedan los archivos · perfiles · tabla de errores comunes
