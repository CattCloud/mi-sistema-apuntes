---
tema: B3 — Identidad
workspace: cloud
tipo: guía
titulo: "Instalación y configuración de la AWS CLI"
estado: referencia
---

# ☁️ Instalación y configuración de la AWS CLI

> **Guía de referencia, no de estudio.** Se consulta cuando hace falta instalar o arreglar la CLI, y no entra en el ciclo de repaso.
>
> El concepto —qué es una clave de acceso y por qué importa dónde vive— está en [[04_formas-de-entrar|Las tres formas de entrar a tu cuenta]]. Aquí solo está el procedimiento.

## Qué hace falta antes

1. Un **usuario IAM** (no la cuenta root).
2. Una **clave de acceso** de ese usuario: el ID y el secreto, copiados en el momento de crearla.
3. Saber en qué **región** vas a trabajar.

> ⚠️ Si todavía no tienes la clave, créala primero. El secreto se muestra **una sola vez** y no se puede recuperar después.

## Instalar

La versión vigente es la **v2**. Cualquier guía que instale la CLI con `pip install awscli` está describiendo la v1, que es anterior y no conviene para empezar.

### Windows

La forma que documenta AWS es un script de instalación en **PowerShell** (no funciona en `cmd`):

```powershell
irm https://awscli.amazonaws.com/v2/install.ps1 | iex
```

`irm` descarga el script y `iex` lo ejecuta. Resuelve solo la descarga, la instalación y el `PATH`.

**Alternativas**, si prefieres no ejecutar un script remoto o `irm` falla:

```powershell
winget install Amazon.AWSCLI
```

O el instalador `.msi` de 64 bits desde la documentación oficial, con doble clic o sin interfaz:

```powershell
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
```

> 📝 **Sobre el patrón `descargar | ejecutar`:** es cómodo y es lo que recomienda el propio proveedor, pero conviene saber qué estás aceptando — **toda la confianza está en el dominio**. Ejecutas lo que sea que ese servidor devuelva, sin verlo. Con `awscli.amazonaws.com` por HTTPS es razonable; con un dominio que no reconozcas, el mismo comando es una mala idea. Si quieres mirarlo antes, `irm https://awscli.amazonaws.com/v2/install.ps1` a secas te lo muestra sin ejecutarlo.

### macOS

```bash
brew install awscli
```

O el instalador `.pkg` oficial, si prefieres no depender de Homebrew.

### Linux

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

> ⚠️ *verificar las URL y los nombres de paquete en la documentación oficial: cambian con las versiones.*

## Comprobar la instalación

```bash
aws --version
```

Debe responder con algo de la forma `aws-cli/2.x.x Python/3.x.x ...`.

Si responde *"comando no encontrado"* o *"no se reconoce como un comando interno"*, **cierra la terminal y ábrela de nuevo** antes de investigar nada más. El instalador añade la CLI a la variable `PATH`, y una terminal ya abierta no se entera de ese cambio.

## Configurar las credenciales

```bash
aws configure
```

Cuatro preguntas, en este orden:

| Pregunta | Qué poner | Nota |
|----------|-----------|------|
| `AWS Access Key ID` | El ID de la clave | Empieza por `AKIA` |
| `AWS Secret Access Key` | El secreto | Se escribe a ciegas: la terminal no lo muestra |
| `Default region name` | Tu región de trabajo | Formato `us-east-1`, no "Norte de Virginia" |
| `Default output format` | `json` | Alternativas: `text`, `table`, `yaml` |

Los dos últimos son valores por defecto: se pueden sobrescribir en cualquier comando con `--region` y `--output`.

## Dónde queda todo

`aws configure` **no guarda nada en AWS**. Escribe dos archivos de texto plano en tu equipo:

```text
Windows   C:\Users\<usuario>\.aws\credentials    ← el ID y el secreto, sin cifrar
          C:\Users\<usuario>\.aws\config         ← región y formato de salida

macOS/Linux   ~/.aws/credentials
              ~/.aws/config
```

Su contenido tiene esta forma:

```ini
# ~/.aws/credentials
[default]
aws_access_key_id = AKIA....................
aws_secret_access_key = wJalrXUt................
```

> ⚠️ **Consecuencias de que sea texto plano:**
> - Quien tenga acceso a tu equipo tiene acceso a tu cuenta de AWS.
> - Esa carpeta **nunca** se copia a un repositorio, a un contenedor ni a un servidor.
> - En Linux y macOS conviene que el archivo sea legible solo por ti: `chmod 600 ~/.aws/credentials`.

Se puede editar a mano sin problema — es un `.ini` normal — pero `aws configure` es menos propenso a errores de tecleo.

## Comprobar que responde como quien crees

```bash
aws sts get-caller-identity
```

Devuelve el ARN de la identidad que la CLI está usando. Es el primer comando a ejecutar cuando algo se comporta de forma extraña, porque una parte de esos casos son simplemente **estar actuando con otra identidad de la que se cree**.

Para ver qué configuración está activa y **de dónde sale cada valor**:

```bash
aws configure list
```

La columna final indica el origen de cada dato — el archivo de configuración, una variable de entorno o un argumento del comando. Es la forma de descubrir que una variable de entorno olvidada está pisando el archivo.


## Cuando algo falla

La mayoría de los problemas caen en esta tabla:

| Lo que ves | Qué significa | Cómo se arregla |
|------------|---------------|-----------------|
| `command not found` / *no se reconoce el comando* | La terminal no encuentra la CLI | Cerrar y abrir la terminal. Si sigue, revisar el `PATH` |
| `InvalidClientTokenId` | El ID de la clave no existe o fue borrado | Volver a configurar con una clave válida |
| `SignatureDoesNotMatch` | El secreto está mal copiado | Casi siempre un espacio o un salto de línea de más al pegarlo |
| `AccessDenied` | Las credenciales **son correctas**; faltan permisos | No toques la clave: revisa la política. El mensaje nombra la acción que falta |
| `ExpiredToken` | Credenciales temporales caducadas | Renovarlas. No aplica a claves de acceso normales |
| `You must specify a region` | No hay región por defecto | `aws configure` de nuevo, o añadir `--region` |
| Responde con **otra** identidad | Hay un perfil o una variable de entorno pisando la configuración | `aws configure list` para ver de dónde sale cada valor |

> 🎯 **La distinción que más tiempo ahorra:** `InvalidClientTokenId` y `SignatureDoesNotMatch` son problemas de **credencial** — la CLI no sabe quién eres. `AccessDenied` es un problema de **permiso** — sabe perfectamente quién eres y esa identidad no puede hacer eso. Confundirlos lleva a regenerar claves que estaban bien.

## Actualizar y desinstalar

Si la instalación se hizo con el **script oficial** o con uno de los **instaladores de AWS** (el `.msi` de Windows, el `.pkg` de macOS o el instalador de Linux), la CLI se actualiza sola con:

```bash
aws update
```

> ⚠️ **Si la CLI se instaló para todos los usuarios del equipo**, ese comando necesita privilegios elevados: `sudo` en Linux y macOS, y una consola de **PowerShell como administrador** en Windows. El comando respeta el tipo de instalación existente — para todos los usuarios o solo para el actual.

Si en cambio se instaló con un gestor de paquetes, se actualiza por el mismo gestor:

```powershell
winget upgrade Amazon.AWSCLI
```

```bash
brew upgrade awscli
```


Desinstalar la CLI **no borra la carpeta `.aws`**. Si el objetivo es que el equipo deje de tener acceso a la cuenta, hay que hacer dos cosas:

1. Borrar la carpeta `.aws` del equipo.
2. **Desactivar la clave de acceso en AWS.** Mientras siga activa, sigue siendo válida desde cualquier otro sitio donde esté copiada.

El paso 2 es el que importa. El 1 sin el 2 no protege de nada.
