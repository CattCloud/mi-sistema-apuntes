CLASE Introducción a IAM: Usuarios, Grupos, Políticas

Muy buenas y bienvenidos a todos a esta nueva sección donde empezaremos a hablar de un nuevo servicio

de a doble vs, ese servicio conocido como AM de Amazon.

Empecemos a ver qué es este servicio y qué nos puede aportar a nosotros.

Cuando hablamos del servicio I am estamos hablando de Identity and Access Management.

Es un servicio global.

Ya hemos visto la parte práctica que podemos seleccionar los servicios regionales donde teníamos que

elegir una región, pero en este caso no hace falta.

Es un servicio global, no entiende de regiones.

Cuando nosotros hemos creado una cuenta de Amazon Web Services, es esa cuenta.

Es una cuenta RUT, una cuenta raíz que se crea por defecto tal que así.

Entonces esta cuenta se recomienda que no sea utilizada ni compartida.

Y aquí te vas a preguntar pues entonces cómo lo puedo hacer?

Y aquí entra el uso del IAM.

Veremos por qué.

Pues bueno, nosotros entendemos que hay usuarios en nuestra organización, en nuestra empresa y al

final estos pueden ser agrupados con grupos.

Cómo lo podemos hacer?

Vamos a presentar algunos usuarios.

Aquí tenemos a List, a Bob, a Charles, a David Edwards y Fred.

Vamos a agruparlos en función del rol que tengan dentro de la empresa.

Pues justo aquí podemos crear un grupo de desarrolladores donde está Alice, Bob y Charles.

También podemos crear otro grupo distinto, por ejemplo, de operaciones, David Edwards.

Así que los grupos solo contienen a los usuarios.

No contienen a otros grupos.

No hay subgrupos.

Y además, también se extiende la posibilidad de que un usuario no deba estar en un grupo.

No es obligatorio.

Eso es opcional.

Y también, finalmente podemos ver que tanto a Lisboa formando un grupo de desarrolladores y David y

Edward un grupo de operaciones.

No obstante, los usuarios que están dentro de estos grupos también pueden estar en distintos grupos

a la vez, como Charles Rabbit, que está también que están también en un grupo de equipo de auditoría.

De acuerdo con esto, vemos que podemos agrupar en función del rol que tenga un usuario en una organización,

en una empresa, pues por grupos y estos grupos ahora veremos que les podemos aplicar ciertas políticas

de seguridad que nos pueden ir muy, muy bien.

Vamos a ver cuáles son estos permisos, estas políticas que podemos aplicar con este servicio de IAM.

Pues justo aquí a los usuarios o grupos se les puede asignar lo que son documentos JSON llamado políticas.

Ahora, si no vamos a hablar en ningún momento justo aquí de programación, todo lo que vamos a ver

ahora, esto no es programación, simplemente es un documento JSON que estructura una política.

Como cuál?

Pues por ejemplo, vamos a ver que aquí damos permisos en función de algunos servicios.

Fijémonos si entrar ahora en mucho detalle sobre este documento en la parte de action action, pues

recoge justo aquí F2 y te escribe aquí.

Lo que estamos diciendo es que se nos permite acudir a la acción de script del servicio F2.

Lo mismo con el siguiente action.

Estamos hablando ya de otro servicio que es el balancín y también a la función de scrip.

Y finalmente tenemos aquí otro servicio más que es Close Watch.

Se nos permite con el Hollow, se nos permite acceder a List, Matrix, a Get Metric statistics o The

script del servicio close Watch.

Como ya vemos, este documento JSON forma un grupo de permisos y de políticas.

Estas políticas, pues, definen, como ya hemos dicho, los permisos de los usuarios y finalmente en

A doble VS se aplica el principio de mínimo privilegio y cuidado Aquí eso significa no dar más permisos

de los que un usuario necesita, simplemente aquellos que necesita.

Y con esto ya hemos visto la introducción a este servicio de Amazon Web Services que os recomiendo en

todo momento usar.

En esta sección veremos con todo detalle, tanto de la manera teórica como de la manera práctica este

servicio.

---

CLASE Usuarios y Grupos de IAM - Práctica
Bueno, ahora ha llegado el momento de empezar la parte práctica de aquello que estamos viendo de forma

teórica.

Así que vamos a dar esta perspectiva más de hands on de manos a la práctica y vamos a buscar el servicio

del cual hemos estado hablando.

Ese servicio I am justo aquí en el buscador encontramos el servicio y vamos a acceder a él y vamos a

ver qué nos da este servicio.

Pues en la parte lateral derecha.

Veo aquí que es un servicio global.

Qué significa eso?

Que yo no puedo elegir una región en particular.

Funciona a nivel global.

Qué vamos a hacer?

Pues no se recomienda en ningún momento usar nuestra cuenta Rut, nuestra cuenta raíz que hemos creado

en un primer lugar.

Justo aquí tengo mi cuenta raíz.

Qué voy a hacer?

Pues crear, en este caso un usuario propiamente para el servicio de IAM.

Cómo lo voy a hacer?

Pues de una manera súper sencilla.

Me voy a desplazar al menú lateral izquierdo.

Sí, y aquí veo tanto la parte de grupos de usuarios, usuarios, roles políticas y voy a acceder a

usuarios.

Tengo la posibilidad de agregar un nuevo usuario.

Vamos dentro.

En primer lugar, lo que vamos a hacer es asignar un nombre a este usuario.

Por ejemplo, el nombre Johann.

De acuerdo con esto, lo que estamos haciendo es crear un usuario Ajam, el cual podrá realizar acciones

en función de los permisos que se le asignen.

Ten en cuenta que nosotros tenemos un usuario root que es este de aquí, Johan Barrabás Mengual.

No obstante, no se recomienda nunca hacer operaciones con el usuario root.

Siempre se recomienda usar un usuario y amp.

Por tanto, vamos a crear este usuario Johan y lo que vamos a hacer es proporcionar acceso a este usuario

a la consola de administración.

Hay dos formas de proporcionar este acceso o bien mediante Identity Center, que lo veremos más adelante.

Es una opción bastante más compleja o bien creando un usuario de una forma súper sencilla.

Simplemente vamos a generar una contraseña de forma automática.

También podríamos personalizarla en esta opción de aquí y simplemente lo vamos a hacer de forma automática.

Podemos mostrar la contraseña siempre y cuando la creemos.

Y todo seguido.

Lo que vamos a hacer es requerir que los usuarios, cuando se inician sesión por primera vez, cambian

la contraseña que se va a generar de forma automática o la que yo puedo asignar de forma personalizada.

Una vez tenemos esto, vamos a siguiente y ahora vamos a asignar.

Vamos a establecer los permisos.

Puedo agregar un usuario a un grupo.

Esta es una opción que también se puede contemplar, ya que yo puedo tener diferentes grupos.

Por ejemplo, puedo tener un grupo de operaciones, un grupo de administración, un grupo de desarrollo

y de esta forma los puedo agrupar en diferentes grupos.

Luego tengo la opción de copiar permisos y en tercer lugar puedo adjuntar políticas directamente.

Por ejemplo, aquí podría adjuntar una política de administración directamente a este usuario.

Yo lo que recomiendo muchas veces es crear lo que son los grupos y clasificar ahí nuestros usuarios.

Por ejemplo, empecemos creando un grupo.

A este grupo lo podemos llamar el grupo de administración.

Admin, podría ser el grupo de operaciones de desarrollo de ingeniería, el que sea, y le podemos dar

unas políticas a estos grupos políticas de permisos.

Por ejemplo, queremos que el grupo de administración se encargue de administrar toda la parte del sistema

cloud de WCS.

Vamos a asignarle esta política que vemos en primer lugar.

Estos permisos de aquí que tienen total permiso para hacer cualquier acción en adobe.

Se proporciona el full access a todos los servicios de Adobe Vs.

Ten en cuenta que cada vez que yo defina a un usuario lo voy a clasificar en un grupo o no en función

de si me conviene o no, y le voy a asignar unos permisos para ese usuario o para ese grupo.

Ten en cuenta que en función de los permisos que yo asigne, ese usuario podrá realizar unas tareas

u otras.

Pues vamos a crear este grupo asignando lo que es esta política de permisos.

Vamos a crear, lo hemos creado y lo que vamos a hacer ahora es seleccionar este grupo para incluir

a este usuario.

Y dentro de este grupo vamos a siguiente.

Lo que vamos a hacer es asignar este usuario al grupo Admin, y este grupo Admin tiene las políticas

de permisos asignadas para administración global de todos los servicios de VS.

Vamos a crear el usuario y una vez creado lo que podemos ver es que aquí tenemos el nombre del usuario,

la contraseña, que incluso la podemos mostrar.

No hay problema, ya que ahora voy a eliminar dicho usuario y podremos enviar por correo electrónico

al usuario en cuestión las instrucciones necesarias para iniciar sesión con su usuario que acabamos

de crear.

Tan fácil como esto, si volvemos a la lista de usuarios, aquí vemos mi usuario a Jam Johan asignado

al grupo Admin y de esta forma vamos a ver en las siguientes clases como gestionar una administración

con ella y cómo acceder a nuestro panel de la consola de Adblock como usuarios y controlar toda la infraestructura

sin acceder a la cuenta root si no es necesario.

---

CLASE Acceso como usuario IAM - Práctica

Vamos a seguir con la práctica del Identity and Access Management del I am Service.

Así que justo aquí hemos creado ya un usuario para un grupo admin que como vemos por ahora no ha tenido

ninguna actividad.

Vayamos a ver todo seguido este usuario.

Vamos a explicar encima de Joan que es mi usuario y justo aquí veo información que yo he asignado para

esta política.

Como veo una política, un permiso de administrador Access que tiene el acceso a los servicios en recursos

de Amazon Web Services.

Y lo que voy a hacer ahora es intentar hacer un login, acceder directamente con este usuario.

Y cómo lo voy a hacer?

Pues me voy al dashboard, al panel que tengo aquí.

Y en la parte derecha en cuenta de Amazon Web Services.

Lo que veo es información pertinente y veo algo muy, muy interesante que debo tener en cuenta que es

el alias de cuenta.

Qué significa esto?

Pues yo tengo mi usuario root que es yo ámbar, que es este de aquí con un IDE de cuenta.

Vale, pues yo lo que voy a hacer es crear un alias.

Este alias me va a permitir acceder directamente con un nombre Joan guion a doble user.

Voy a guardar los cambios y ahora he creado un alias para este usuario.

Veremos que significa esto del alias y cómo nos puede ayudar.

Todo seguido debajo del alias.

Veo que hay una URL de inicio de sesión para los usuarios de IAM de esta cuenta.

Voy a copiarlo y como veo justo aquí me aparece el alias que yo he creado.

Perfecto.

Esto es lo que debería pasar.

Voy a copiarlo y ahora vamos a abrir otro navegador que no sea el que estoy usando, que es Google Chrome.

Voy a abrir, por ejemplo, Safari, y vamos a ver qué pasa.

Y justo ahora ya me he encargado de abrir una nueva pestaña secreta para el navegador de Safari.

Vamos a insertar la dirección que nos había dado la URL.

Fíjate bien.

Ahora si nos lleva al Saint In, que es básicamente el login para el usuario.

Y justo ahora veo el alias que yo he creado, que puede ser o este alias o los 12 números que hemos

visto que son más complicados de recordar.

Es mejor un alias?

Qué más podemos hacer?

Pues justo aquí puedo insertar el nombre de usuario que tenía asignado, que yo he creado, que es Joan,

y la contraseña que yo le he asignado para este usuario.

Así que vamos a rellenar, a completar esta información y vamos a acceder como usuario.

No obstante, antes quiero enseñaros algo que también es muy destacable el lugar de acceder como usuario.

También podemos acceder como usuario root y puedo visualizar que ahora tengo acceso como el usuario

root.

No obstante, en la parte inferior también me da la opción al usuario y esta es la vista que se nos

aparece cuando vamos a acceder directamente en Amazon Web Services.

Yo lo puedo hacer así introducir mi cuenta, mi alias, que puede ser Joan John a doble vs.

No obstante, vayamos al enlace anterior y ahora que estamos, vamos a introducir toda la información

pertinente para acceder como usuario y accedamos.

Y justo ahora estamos dentro.

Perfecto.

Hemos accedido como el usuario Johann, que es el usuario.

Y justo ahora veo la estructura que tiene de Joan Arroba Johan guion a doble vs que es al final.

Mi alias es el nombre del usuario que tengo y su alias.

Todo seguido.

Cuáles son los permisos que yo puedo hacer en función de la política que tenga asignada a este usuario?

Hemos visto antes que el usuario tenía unas políticas en particular que estaban asignadas a usuarios.

Vamos al usuario Johan.

Y qué permisos?

Qué políticas tenía?

Tenía políticas de administrador.

Al final tiene las mismas políticas que el usuario root.

No obstante, para un caso real, para un caso de una organización, yo siempre recomiendo asignar políticas

de restricción únicamente.

Estas políticas que sean necesarias, no de administración global que no puedan gestionar todos los

permisos los usuarios.

Esto simplemente es un ejemplo para que veas cómo crear un usuario y cómo gestionar el acceso con este

usuario.

---

CLASE Políticas IAM

Vamos a seguir trabajando y aprendiendo mucho más sobre este servicio y hemos visto que podemos crear

grupos y juntar así los usuarios.

A estos grupos se les pueden aplicar directamente políticas que afecten a los usuarios que están dentro

de este grupo.

Por ejemplo, en el grupo de desarrolladores donde está Alice Bop y creamos una política que afecte

a estos usuarios que están dentro del grupo.

Por otro lado, teníamos a David y Edward que estaban en el grupo de operaciones.

También podemos crear una política específica para este grupo que afecte a sus usuarios.

Seguidamente tenemos a Fred.

Fred no pertenecía a ningún grupo.

Entonces que pensamos que no puede tener ninguna política, ningún permiso asignado?

Pues no, obviamente sí que puede tener una política específica para este usuario, que es una política

directa.

Y tanto Charles como David también compartían otros grupos, además de desarrolladores y operaciones,

que es el equipo de auditoría.

Pues este equipo de auditoría también puede formar su propia política, sus propios permisos que afecten

a sus usuarios.

Justo así vemos que las políticas se pueden agrupar en estos grupos y además a los usuarios que no están

en ninguno de estos.

Vamos a ver realmente cómo es la estructura directa de estos formatos JSON para aplicar políticas.

Pues aquí tengo un ejemplo, una captura de pantalla donde hay una política establecida con un formato

JSON con su estructura pertinente.

Vayamos paso a paso viendo cada uno de estos campos y para qué sirven.

En primer lugar vamos a hablar de tres campos, que son estos tres, estos tres aquí el versions, el

IDE y el statement.

El Bolsón indica la versión del lenguaje de la política y como vemos siempre incluye 2012 diez 17 todo

seguido.

El ID marcado en naranja es un identificador para la política, en mi caso S3 account on permission

y es un campo opcional.

Todo seguido tenemos el statement, que es la propia definición de la política.

Es básicamente una o más declaraciones individuales y es un campo totalmente obligatorio, porque si

no, no tendría sentido definir una política.

Vayamos a ver esos campos que están dentro de la definición del statement, pues las declaraciones constan

de justo aquí seis campos.

Como podemos ver en primer lugar el s id, el Estadi es este numerito que vemos aquí, el uno, que

es el identificador para la declaración.

En este caso es un campo opcional.

Todo seguido tenemos el campo effect.

Sirve para identificar si la sentencia es para permitir o para denegar el acceso a algún recurso en

concreto.

Por ejemplo, en este caso está definida como hollow que eso permite, pero en caso de definirlo como

de nadie para denegar algún acceso directamente, todo seguido está el campo principal.

El campo principal es la cuenta, el usuario, el rol al que se aplica esta política.

Justo ahora vemos la aplicación a un rol en particular que tenemos justo aquí.

Y vamos a seguir.

Y ahora nos encontramos con el campo Action.

El Action es la lista de acciones que esta política permite o deniega.

Como hemos visto, está el campo effect en la parte superior que nos permite con el slow y en este caso,

aquí tenemos las acciones que se permiten.

Finalmente vemos un campo que es el resource, que es la lista de recursos a los que se aplican las

acciones anteriores.

Y bueno, ya para acabar, hay un campo que no aparece, que es el condition, que es un campo opcional,

que son las condiciones para cuándo esta política está, en efecto, está usándose, es decir, sería

como una condición para que se aplique esta política.

Justo ahora hemos visto la estructura que tienen las políticas.

Seguiremos viendo tanto en la forma más práctica cómo son estas políticas y cómo deben aplicarse de

la misma forma que se recomienda.

---

CLASE Políticas IAM - Práctica

Muy buenas y bienvenidas a todos a esta clase práctica donde nos vamos a introducir más y más sobre

las políticas de ICANN.

Lo que puedes ver aquí son dos pantallas.

En primer lugar, la parte de la izquierda, el navegador Google Chrome con mi usuario Jan Amengual,

que es mi usuario raíz y en la parte de la derecha tengo aquí abierto mi usuario que es Johan con su

alias Johan.

Guion a doble vs.

Si por alguna razón te aparece alguna de estas pestañas en inglés, acuérdate que puedes cambiar el

idioma en la parte inferior y un settings justo aquí puedes elegir el idioma que tú desees.

En mi caso está en español, pero puedes elegir en inglés, alemán, francés, el que tú desees.

De acuerdo.

Ahora sí vamos a introducirnos y lo que vamos a hacer es ver como actúan estos permisos.

En primer lugar en la parte de la izquierda en mi usuario de Root me voy a desplazar a la parte de los

grupos de usuarios.

Justo aquí tengo mi grupo admin, introducirme en mi grupo admin y en la parte inferior veo que tengo

un usuario llamado Johan.

De acuerdo.

La parte de la derecha donde tengo mi usuario y voy a introducirme a ver los servicios.

Por ahora tienen todos los permisos asignados, así como tiene también el usuario root.

Voy a ver los usuarios justo aquí.

Veo los usuarios y veo Johan.

Los puedo ver por un por una simple razón.

Como tengo los permisos de administrador, pues los puedo ver todos.

Vale, ahora voy a hacer una cosa.

Los puedo ver porque están en el grupo de administración, pero llega un día que digo mira este usuario

no quiero que esté en este grupo, no quiero que tenga estos permisos porque los permisos que tiene

asignado este grupo son de administrador total, lo pueda ver todo, lo puedo hacer todo.

Pues vamos a hacer una cosa, vamos a eliminarlo, eliminar usuarios de este grupo en particular.

De acuerdo?

Estamos en grupos, Lo hemos eliminado.

Ahora vamos a acceder, por ejemplo, a grupos de usuarios.

Y qué pasa?

Pues que necesitamos permisos.

Se ha actualizado la información y nos dice que no estamos autorizados para realizar esta acción.

Cual es esta acción del servicio?

Pues la lista de grupos como ya hemos visto.

Como ya hemos visto, esto nos sirve mucho para ver reflejado también la estructura que se sigue en

una política con el fichero JSON.

Ahora hemos eliminado este usuario de este grupo, por lo tanto se le han quitado los permisos.

No obstante, lo que podemos hacer es con el usuario root.

Vamos a los usuarios.

Y tengo un usuario, Joanne, que no está asignado a ningún grupo.

Vamos a ver a Joan.

Y a este usuario lo que vamos a hacerle es asignar lo que serían unas políticas, unos permisos.

Vamos a añadir permisos en la parte superior, asociar directamente las políticas existentes.

Cuál vamos a elegir?

Vamos a elegir la política red o le acceso únicamente de lectura?

Vamos a siguiente revisar, añadir permisos y le hemos añadido los permisos pertinentes.

Vamos al servicio I am y vemos aquí que el usuario por el momento sigue sin permisos.

Ahora le hemos asignado un permiso de lectura.

Eso significa que podemos leer la información pertinente.

No obstante, este permiso es únicamente de lectura, únicamente de lectura.

Qué significa entonces?

Pues vamos a crear un grupo, por ejemplo, grupo de desarrolladores.

Vamos justo aquí.

Introducir una política o un usuario para probar.

Y lo que no está es que no se ha creado el grupo, obviamente por la razón siguiente estamos con permisos

de lectura.

En ningún momento tenemos permisos de administración o de escritura sobre estas acciones.

Por ello lo que estamos viendo es que las políticas y los permisos están funcionando adecuadamente para

este usuario, como se ha establecido previamente.

Así que la siguiente clase vamos a avanzar un poquito más sobre el funcionamiento de estas políticas

y permisos.

---

CLASE IAM MFA
Acabamos de ver cómo aplicar todos esos conocimientos del servicio y de forma práctica.

Ahora nos vamos a centrar en la parte de seguridad en los usuarios, así que vamos a ver con detalle

una política de contraseñas muy, muy relevante.

Qué es esto de una política de contraseñas y por qué nos interesa?

Pues obviamente los usuarios pueden elegir sus contraseñas, las pueden restablecer y pueden aplicar

ahí la contraseña que ellos deseen.

Es necesario cuando estamos hablando de una organización, de una empresa, tener en cuenta que hay

en juego mucho más.

Es decir, si hay un intruso en el sistema, si hay un hacker, si hay alguien que al final quiere hacer

acciones que van en contra de nuestra organización, pues podemos vernos afectados de una forma muy,

muy grave.

Pues aquí la política de contraseñas nos puede ayudar muchísimo.

Podemos solicitar una política de contraseñas para tanto el usuario root raíz como para los usuarios

del servicio, y eso va a incrementar la seguridad de la cuenta en Amazon Web Services.

Podemos configurar una política de contraseñas de la siguiente forma.

En primer lugar, podemos establecer una longitud mínima de contraseña.

Es decir, podemos decirle a los usuarios que tienen que crear contraseñas de diez caracteres mínimo

requerir tipos de caracteres específicos, como por ejemplo letras mayúsculas, letras minúsculas,

números o caracteres no alfanuméricos.

Permitir también a todos los usuarios de IAM cambiar sus propias contraseñas.

De esta forma podemos ir cada semana, cada mes o diariamente si queremos, también cambiando las contraseñas,

y también podemos requerir a los usuarios que cambien su contraseña después de un cierto tiempo.

Así que las contraseñas y finalmente, para acabar, impedir también la reutilización de una contraseña.

Es decir, si mi contraseña hoy es Joan, que mañana tampoco sea Joan, que se cambien estas contraseñas

y en un futuro no se puedan repetir.

Justo aquí hemos visto la política de contraseñas.

Es muy importante tenerla en cuenta para ya sea el examen como para también el uso práctico en una organización

o en una empresa.

Pero ahora, si vamos a entrar en un tema realmente importante y sobre todo un tema que es muy destacable

en los exámenes Cloud Practitioner, que es el multifactorial autenticación MFA por sus siglas, que

es esto y porque lo necesitamos entender o lo necesitamos saber y cómo nos va a ayudar?

Pues a veces es posible que algún usuario pierda una contraseña o haya un hacker que al final nos robe

información como la contraseña.

Este usuario, este hacker puede tener acceso a tu cuenta y posiblemente también pueda cambiar configuraciones

o eliminar recursos en tu cuenta de Amazon Web Services.

Imagínate un caso.

Imagínate que tu tienes muchos privilegios dentro de una empresa y tú estás gestionando todo el cloud

de Amazon Web Services.

De acuerdo?

Tú mañana pierdes la contraseña, o te la roban o hay un intruso que te la quita.

Qué pasa?

Esa persona puede echar abajo todo el sistema en cuestión de unos clics y por tanto la organización

dejará de tener el servicio activo.

Y eso va a hacer que al final muchos usuarios no puedan acceder o que las acciones bajen de valor,

etc Imagínate simplemente por perder una contraseña.

Todo lo que podría pasar.

Aquí viene MFA.

Para solucionar este conflicto queremos proteger las cuentas root y los usuarios de.

Cómo lo podemos hacer?

Pues de una forma muy sencilla, establecemos una contraseña y además establecemos un dispositivo de

seguridad que es un dispositivo de seguridad.

No te preocupes, por ejemplo, tu teléfono móvil, al cual te pueden enviar un código de seguridad

para verificar que eres tú quien está accediendo en ese momento en tu cuenta.

Seguramente hayas visto este tipo de autenticación multi factor en distintos ámbitos, por ejemplo,

el correo electrónico o redes sociales.

Aquí tenemos un ejemplo en el que Alis quiere acceder a su cuenta y dispone de una contraseña y además

de un dispositivo al cual se le va a enviar un token de acceso de verificación.

Y con estos dos factores podremos entrar a la cuenta de Alis.

El principal beneficio de MFA es que si una contraseña es robada o hackeada, la cuenta no se ve comprometida

en ningún momento, porque tenemos por otro lugar el dispositivo al cual se va a enviar el token de

acceso.

Y qué opciones de dispositivos MFA tenemos para Amazon Web Services?

Pues en primer lugar disponemos de dispositivos virtuales MFA.

Cuáles son el autenticados de Google que veremos reflejado en la parte práctica?

Sólo en el teléfono.

Y por otro lugar tenemos a Uzi, que es multi dispositivo.

Está disponible más allá de un teléfono.

En mi experiencia, personalmente prefiero aoci porque el hecho de que esté disponible más allá de mi

teléfono hace que sea mucho más flexible y esto da soporte para múltiples tokens en un solo dispositivo.

Todo seguido.

Tenemos otro tipo de dispositivo llamado Clave de seguridad del segundo factor universal, U2 F, que

sería, por ejemplo, el Jubilee de Dubaku, que da soporte para múltiples usuarios.

Root y también utilizando una única clave de seguridad.

Véase la diferencia entre estos dos.

Pasemos a ver más opciones.

Por ejemplo, justo aquí, el dispositivo MFA de llavero por hardware que es proporcionado por Yamato

o también el dispositivo MFA de llavero por hardware para Amazon Web Services Cloud, que sería el proporcionado

por Sure Pass.

Así que ahora sí hemos visto un conjunto de dispositivos para hacer uso del MFA tan y tan útil para

aumentar así la seguridad de nuestras cuentas.

---

CLASE Claves de acceso de AWS, CLI y SDK
Ya conocemos algunas de las opciones que existen para acceder directamente a doble VS.

Pero vamos a verlas todas en detalle.

En esta misma clase podemos acceder mediante tres opciones la consola de administración de Adobe CVS,

que ya hemos visto como se usa por contraseña y con el uso de MFA.

Con este factor de doble autenticación y todo seguido, vamos a ver dos puntos más la interfaz de línea

de comandos de Adobe CVS, también llamada la Cl Y que es protegida por claves de acceso, que durante

este curso también vamos a usar.

Y finalmente tenemos a doble vs Software Developer Kit, el SDK, que es para el uso de código protegido

por también claves de acceso.

Las claves de acceso se generan a través de la consola de Adobe VS a través del dashboard que vamos

a ver más adelante.

Y los usuarios gestionan justo ahí sus propias claves de acceso.

Las claves de acceso son totalmente secretas.

Es como una contraseña.

Es como si tuviéramos un código de acceso, así que no se pueden compartir o no se deberían compartir.

El IDE de la clave de acceso es más o menos lo que sería el nombre de usuario.

Y por otro lugar, la clave de acceso secreta en lo que sería la contraseña.

Fíjate bien.

Vamos a ver algunos ejemplos.

Esto sería el Access Kid, que sería básicamente la clave de acceso, el identificador de la clave de

acceso, que es este conjunto de caracteres alfanuméricos y la clave de acceso secreta.

Pues al final sería como la contraseña que va juntamente con el IDE de la llave de acceso.

Y recuerda, no compartas en ningún momento tus claves de acceso, porque si las compartes sería como

compartir tu contraseña y tu correo electrónico o tu usuario para que cualquier persona acceda.

Así que vale más que no se compartan.

Ahora vamos a pasar al segundo punto, que es una forma de acceso que es la CNI y la línea de comandos.

Qué es?

Pues es una herramienta que permite interactuar con los servicios de Amazon Web Services mediante comandos

en tu shell, en tu terminal de línea de comandos.

Sería algo como esto.

Como este captura de pantalla que ves aquí podemos interactuar directamente con Amazon, un webservice

usando la terminal.

Al final es un uso más profesional, más avanzado, no tan visual, pero también es un uso que se proporciona

para muchos desarrolladores y para gente muy especializada en este ámbito.

Tiene un acceso directo a las APIs públicas de los servicios de Amazon Web Services y puedes desarrollar

scripts para gestionar tus propios recursos también.

La CELE y de Amazon es de código abierto y os dejo aquí el enlace a GitHub para que lo veáis todo cómo

se ha llevado a cabo?

Y finalmente es una alternativa al uso de la consola de administración de a doble VS.

Es una forma distinta de acceder.

Vamos a pasar al último punto de acceso.

Hemos visto que son tres.

Hemos ya contemplado dos.

Pasemos al último, que es el SDK, que es SDK.

Este es Software Developer Kit, pues es el kit de desarrollo de software de Amazon Web Services.

También dispone de APIs específicas para cada lenguaje.

Es decir, un conjunto de bibliotecas permite acceder y administrar los servicios de Amazon Web Services.

Es mediante la programación.

Y eso nos lleva a que hay un integrado en la aplicación.

Fijémonos bien en la figura que tenemos en la parte derecha.

Justo aquí tenemos la aplicación y hay una integración directa con Adobe vs SDK.

Y admite pues cuidado, aquí admite SDK con JavaScript, Python, PHP, Net, Ruby, Java, Go, Noyes

o C++, incluso SDK para móviles Android y o s o es el caso para dispositivos y o T en vez de C o Arduino

y muchos más.

Así que el SDK también es una herramienta muy potente si lo queremos integrar con la programación.

Es un fundamento también que nos permite entrar, acceder directamente a a doble VS.

Hay tres pilares que nos permiten acceder y en esta clase los hemos contemplado los tres.

---

CLASE Configuración de la CLI de AWS en Windows

Vamos a ver a continuación cómo instalar en Windows a doble vs por línea de comandos.

Vamos a hacer lo siguiente Vamos a buscar a doble uso de Windows instalación, por ejemplo, y justo

aquí veo un enlace donde yo he entrado.

Voy a acceder en la documentación pertinente de Adobe vs de cómo instalar tanto en Linux, Mac o Windows

a doble use de CGI de línea de comandos para esta clase.

Vamos a ver Windows en Windows lo vamos a hacer de la siguiente forma Hay varios pasos a seguir, son

muy cortitos y muy directos en todo momento.

Fíjate bien si se actualizan estos campos, estos documentos, lo que vamos a hacer es lo siguiente

En primer lugar vamos a descargar el instalador MSI de la doble VC CPI para Windows de 64 bits.

Clicamos aquí encima y lo vamos a instalar.

En mi caso no dispongo de Windows.

Dispongo de Mac, así que únicamente descarguéis este archivo y se va a abrir el instalador.

Además, si lo deseas también puedes ejecutar el comando MS y exec que es este comando aquí copiando

y lo puedes ejecutar para el instalador MS y sin ningún problema.

Vamos a la parte inferior, que es el segundo punto.

Únicamente hay dos puntos que es para confirmar la instalación.

Abrimos lo que sería una terminal, buscamos CMD, una terminal cualquiera y vamos a abrir lo que sería

esta terminal para ver este comando.

Yo lo voy a replicar en Mac para que entendáis un poquito cuál es el funcionamiento.

Justo aquí tenemos una terminal en Windows, se llama CMD y vais a escribir a doble O s y en guión versión

y aquí os va a aparecer la versión instalada de Adobe Use Delay que tenéis justo aquí.

Pueden ser versiones distintas, pero os va a parecer una versión.

Si se ha instalado todo de forma correcta, asegúrate de que el primer paso se cumple para que el segundo

sea exitoso.

---

CLASE Práctica de la CLI de AWS
Muy buenas y bienvenidas a todos a esta clase.

En esta clase vamos a aprender cómo descargar las claves de acceso, las famosas Access Kids y cómo

instalarlas dentro de la Cl y para poder usar ya la línea de comandos con Amazon Web Services.

Por ello estamos en el servicio, en el servicio y nos vamos a usuarios.

Y aquí veo que tengo el usuario Joan, que es el que yo he creado previamente.

Voy a entrar a mi usuario y cuando estoy dentro me voy a desplazar a credenciales de seguridad dentro

de credenciales de seguridad.

Justo aquí veo las claves de acceso, las famosas Access Kids, las cuales se pueden adaptar al uso

para la ley.

Por ello, lo que vamos a hacer será simplemente descargar unas claves de acceso.

Estas recuerda que son secretas, son privadas.

Ahora yo te voy a enseñar las mías simplemente para ver cómo son.

No obstante, las voy a invalidar más adelante.

Estas claves nunca deben salir de tu ordenador, nunca las envíes, nunca las muestres y de esta forma

seguro que están totalmente seguras.

Vamos a crear una clave de acceso.

Y justo aquí nos dice nunca las publiques, porque si no esto nos va a llevar a tener fallos de seguridad.

Una clave de acceso se puede descargar como un fichero CSV para guardarla donde nosotros queramos.

Y justo aquí veo que tiene un identificador y luego una clave de acceso que sería como el nombre identificativo

y la contraseña para esta clave.

La voy a mostrar, no obstante, luego la voy a invalidar.

Justo aquí veo el formato.

Qué voy a hacer?

La voy a adaptar, Voy a adaptar esta clave de acceso para la ley.

Seguidamente, lo que vamos a abrir es una terminal CMD en Windows o terminal en Mac.

Justo aquí tengo una y vamos a escribir a doble vs configure para configurar la clave de acceso.

En primer lugar, nos pide el ID, el Qi ID, que es básicamente el ID de clave de acceso.

Vamos a ir hacia adelante y todo seguido nos pide el acceso.

Así que, como veis, es la clave de acceso secreta.

Este término de aquí lo vamos a copiar también y vamos para adelante.

El nombre por defecto de la región.

Podemos dejarlo tal y como está.

Luego el output format también lo podemos dejar tal y como está.

Y justo ahora, pues ya tengo una clave de acceso introducida en mi play.

Vamos a ver cómo funciona y vamos a ver que información puedo extraer.

Por ejemplo, vamos a insertar el comando a doble vs I am list users.

Lo que hace este comando simplemente es devolvernos todos los usuarios que tenemos.

Como veo aquí tengo un usuario llamado Johan con Yo sería el que vemos aquí con el ARN que básicamente

identifica el servicio y más información propia del usuario cuando fue creado y la última vez que actualizó

la contraseña.

Justo así nos da toda esta información que nosotros también podríamos obtener directamente desde el

Manage Console.

Esta consola de gestión.

No obstante, ahora tenemos dos formas de acceder a ver la información con el delay o con el manage

console.

Vamos a ver cómo se actualiza esta información en caso de haber algún cambio.

Por ejemplo, vayamos a salir de mi usuario I am donde estoy ahora estoy justo aquí y vamos a cerrar

sesión.

Nos vamos a ir al usuario root directamente.

Ahora ya estamos en el usuario root.

Vayamos al servicio ya.

Y vayamos a hacer un cambio.

El único cambio que vamos a hacer será ir a los grupos de usuarios y a estos grupos.

Veo que hay uno que es admin, el cual tiene un único usuario que es Johan.

Lo voy a eliminar.

Y qué va a pasar cuando elimine a Johan?

Pues Johan dejará de tener acceso a información como es la siguiente.

Voy a probar de nuevo y justo ahora veo que ha ocurrido un error.

Que no tengo permiso.

Se me ha denegado el permiso.

Como es obvio, justo aquí.

Yo tenía mi usuario y configurado.

Qué ha pasado?

Que yo como usuario root lo he eliminado de la lista de administradores y por tanto ha perdido sus permisos

que tenía antes asignados.

Por lo cual cuando yo abro la terminal intento realizar la misma opción que antes.

Sí que tenía permiso, pues ahora ya no tiene permiso.

Por tanto vemos como lo hace y funciona.

Una vez hemos adaptado ya, pues el acceso propiamente para este usuario.

Y antes de acabar la clase, pensemos en añadir el usuario a su grupo, el cual hemos eliminado donde

teníamos los grupos.

Justo aquí vamos a admin y vamos a agregar un usuario.

El usuario que vamos a agregar es Johan, vamos a agregarlo y justo ahora ya lo tenemos de nuevo dentro

con los permisos de admin asegurados.

Vamos a probar de nuevo, a ver si ahora sí puedo acceder a la información.

Y ahora si el usuario ha podido acceder ya de nuevo con sus nuevos permisos que se han asignado otra

vez a.

---

CLASE Roles de IAM para los servicios de AWS

Hasta el momento hemos asignado roles a usuarios que pueden estar en la organización, en la empresa,

etc, pero muchas veces hay que entender que no simplemente le podemos asignar roles a usuarios si no

podemos hacer algo más que es muy muy útil, que es asignar roles a servicios.

Muchas veces algún servicio de Amazon Web Services, pues tendrá que realizar acciones en tu nombre.

Por ello hay que aprender también a asignar roles a servicios, no únicamente a personas.

Para ello, qué vamos a hacer?

Vamos a asignar permisos a los servicios que requieran esos permisos con roles.

Vamos a imaginar una situación.

Tenemos una instancia F2.

Por el momento, en este curso no hemos entrado en F2, pero entraremos con muchísimo detalle más adelante.

Imagínatelo como un servidor virtual, pues este servidor virtual tiene que realizar ciertas acciones

y para realizar ciertas acciones en Amazon Web necesita de unos permisos que nosotros le tendremos que

dar.

Es como si realizara acciones a nuestro nombre, pues por ello existe el rol de team para este servicio

y justo así podrá interactuar.

Tendrá un acceso en Amazon Web Services porque tiene unas políticas y unos parámetros establecidos por

el rol de.

Para este caso he puesto de ejemplo la instancia RC2, pero hay muchos servicios.

Cuáles son los más comunes?

Pues los roles comunes son los roles de instancias sexos, los roles de la función lambda o roles para

el Cloud Formation, que también son servicios que veremos más adelante.

Así que los roles hayan para los servicios también son muy útiles y lo veremos de la forma práctica.

La siguiente clase.

---

CLASE Roles de IAM - Práctica

Vamos a ver la parte práctica de la asignación de roles a servicios.

Por ello estoy en el servicio y como ves aquí y estoy en la parte de usuarios, asegúrate de tener tu

usuario Joan en admin y yo ya estoy introducido dentro de mi cuenta y voy a ir a roles justo aquí y

en roles yo puedo crear un rol específico.

Vamos a la parte derecha, crear rol y tengo diferentes tipos de entidades de confianza.

Hay varias.

Cinco.

Vamos a hacer de forma práctica el servicio de Amazon Web Services este de aquí.

Vamos a asignar un rol para un servicio de Adobe User.

Pero no te preocupes, todas estas entidades no aparecen en el examen del CCP del CLAD Practitioner,

simplemente es para que lo sepas y para que lo veas de una forma también práctica.

Justo aquí lo que vamos a hacer es asignar este tipo de entidad de confianza.

Vamos a asignar un rol para un servicio.

Y qué servicio voy a usar?

Puedo usar varios?

Cuáles son los más comunes?

F2, Holanda en F2, por ejemplo.

Pero si tú quieres usar otro justo aquí tienes una lista muy, muy larga de los servicios que pueden

ir enlazados con un rol.

Son muchísimos, muchísimos servicios que también veremos muchos de estos en este mismo curso y todos

estos los puedes configurar con un rol adecuado.

Para este ejemplo vamos a usar F2.

Vamos a siguiente.

Y vamos a introducir una política de permisos.

Qué política quiero establecer?

Voy a establecer la política que se supone hayan Read only Access para la lectura de información de

los datos.

Vamos a siguiente y justo aquí debemos dar un nombre a este rol, pues podemos por ejemplo Demo Rol

F2.

La descripción que viene por defecto, ya que veo el formato JSON de este rol para esta entidad de confianza.

Los permisos que yo he asignado para revisarlo son en red o Access.

Si quiero introducir más permisos los puedo agregar.

Para este ejemplo únicamente basta con este y tengo la opción de añadir etiquetas, pero por el momento

no me hace falta.

Vamos a crear un rol.

Se está creando el rol y justo ahora se ha creado el rol para la instancia F2.

Ahora te vas a preguntar y cómo puedo usar este rol realmente para una instancia de C2?

Por el momento no hemos explicado las instancias.

No obstante, vamos a conservar este rol y más adelante en la sección donde vamos a profundizar en entender

F2, veremos cómo usar este rol directamente.

Pero justo así se crea el rol.

Le damos un nombre y tiene todas las características que nosotros deseamos y permisos ya asignados.

Más adelante veremos cómo ponerlo en práctica.
-------------------------------------------------

CLASE Herramientas de seguridad de IAM
A continuación nos vamos a centrar en conocer las herramientas de seguridad del servicio y hay dos herramientas

realmente importantes a conocer.

En primer lugar, tenemos el Credenciales Report o informe de credenciales de IAM en español, que es

a nivel de cuenta.

Qué significa eso?

Pues significa que esto nos da un informe que enumera todos los usuarios de tu cuenta y además el estado

de tus diversas credenciales.

Cuando lo veamos de manera práctica, entenderás realmente para qué sirve y toda la información que

te da.

Pero sobre todo, quédate a que es a nivel de cuenta y es una herramienta de seguridad del servicio

I.

Y en segundo lugar, tenemos Justo ahora veremos el Access Advisor, que es el asesor de acceso de AM.

Es a nivel de usuario y lo que hace es simplemente mostrar los permisos de servicios concedidos a un

usuario en particular.

Y cuando se accedió a esos servicios por última vez.

Por ejemplo, si yo doy permisos a un usuario en particular, pues justo con el advisor se me va a dan,

se me va a mostrar qué permisos tiene un usuario.

Y además, cuando ese usuario accedió a esos servicios por última vez, también puedes utilizar esta

información para revisar tus políticas concedidas y para que en ningún momento se te escapen nada.

Estas son las dos herramientas de seguridad del servicio y vamos a verlas también de forma práctica

para que quede mucho, mucho más claro.

PRACTICA
Vayamos a ver de forma práctica esas dos medidas de seguridad que acabamos de comentar.

Por ello estamos en el servicio a los usuarios y en el menú izquierdo vamos a ir a la parte de informe

de credenciales.

Vamos a ver el Prudential Report, que era la primera medida a nivel de cuenta.

Justo aquí me da la opción de descargar el informe.

El report yo ya lo tengo descargado, lo voy a abrir y veras la información que me aparece.

Yo tengo un usuario root.

Y luego tengo un usuario llamado Johan, que es el usuario y amp.

Que hemos visto cómo poder crearlo y cómo usarlo.

De acuerdo, aquí vemos un CSV que nos aporta diferentes columnas de información, por ejemplo el identificador

que sería como el ARN, y vemos aquí la identificación del usuario root y la identificación del usuario

que es Johan.

Todo seguido vemos cuando se creó dicho usuario.

Vemos aquí las fechas, el timestamp de creación de cada uno de estos.

Vemos si realmente el password fue activado.

En primer lugar en el protocolo no es soportado está esta activación, pero en el y obviamente que sí.

Cuándo fue la última vez que el password se usó para el RUT?

Lo vemos aquí y para para allá.

Lo vemos aquí simplemente con un minuto de diferencia, el mismo día, el día de hoy, cuando el password

fue cambiado para el RUT esta opción no es soportada, pero para el justo aquí lo vemos bien soportado,

vemos si el password fue rotado o no, si tenemos el MF activado para el sí, obviamente para la no

podríamos activarlo si lo deseamos.

Si tenemos un accesorio activo.

Yo como antes, he eliminado el acceso y ya no tengo ninguna activa.

False.

False.

Esto me sirve realmente para entender en qué momento se me pudo escapar algo o si hay algún acceso que

deba eliminar.

Justo aquí lo puedo ver.

Si esta acceso fue rota en algún momento vemos que como no tengo ninguna, tampoco las he anotado ni

por región ni las he usado.

Justo aquí vemos que no hay información respectiva, no hay más acceso y si vamos hasta el final vemos

también la parte de certificados.

Pero todo esto al final no lo hemos usado por el momento, pero podría ser usado.

Y en caso de tener una organización con 20 usuarios, 30, 100 usuarios, todo esto sería una información

muy valiosa que día a día deberíamos revisar para que no se escapase nada de nada.

Volvamos y ahora vamos a ver la segunda medida, el Access Advisor.

Cómo accedemos a ver esta medida de seguridad que era a nivel de usuario?

Vamos a usuarios?

Y ese usuario?

Vamos a entrar a Johan.

Al usuario que tengamos.

Justo aquí vemos el Access Advisor.

El Access Advisor me da información muy concreta de todos aquellos permisos o servicios a los cuales

accede el usuario.

Por ejemplo, hoy mismo este usuario ha accedido a la política de IAM Administrator.

Access ha usado dicha política.

Justo aquí vemos agrupadas las políticas por fecha de uso tal que así.

Incluso cuando hemos usado otros servicios, también aparecen por fecha de uso.

Todo está bien agrupado justo aquí.

Incluso esas políticas o servicios que en ningún momento han sido usados.

Podemos aplicar filtros si lo deseamos, a los servicios que se han accedido o a los que no se ha accedido

en ningún momento.

Y justo así vemos aquellos servicios que el usuario ha utilizado.

Podemos llevar un control exhaustivo de aquellos usuarios de la organización y todos aquellos servicios

que están permitidos o que está usando en ese mismo momento.

---

CLASE BUENAS PRACTICAS
Ahora ya estamos finalizando la sección de I am.

Por lo tanto, vamos a recopilar algunas directrices y buenas prácticas que considero realmente elementales.

En primer lugar, debemos entender que no debemos usar la cuenta Rut, excepto únicamente para la configuración

de la cuenta de Amazon Web Services en primer lugar, pero siempre hay que acostumbrarse a usar los

usuarios.

I am Un usuario físico debe representar un usuario en Amazon Web Services.

No puede ser que varios usuarios que varias personas estén usando una cuenta o un único usuario en Adobe

Vs.

Cada usuario físico es una cuenta o debería ser así?

Debemos asignar usuarios a grupos y asignar permisos a los grupos para que así tengamos las políticas

bien establecidas y que los usuarios simplemente tengan los permisos que deben tener agrupados en función

de aquellos grupos o roles que tengan en la organización.

Debemos crear una política de contraseñas fuerte.

Debemos asignar los caracteres que consideremos mayúsculas, rotación de contraseñas, etc, etc.

Debemos utilizar y reforzar el uso de la autenticación multifactorial del MCA con el dispositivo móvil

que pueda confirmar así el acceso y tener una doble autenticación en el momento de insertarse y acceder

directamente en Amazon Web Services para que si en lugar de si en algún momento pierde la contraseña,

que no estemos totalmente desprotegidos.

Debemos crear y utilizar roles para dar permisos a los servicios de Amazon Web Services.

Ya hemos visto como crear estos roles y cuando pasemos ya a la siguiente fase veremos como usarlos con

estos servicios.

Debemos utilizar claves de acceso para el acceso programático, es decir, para acceder con CL y o SDK.

Debemos revisar también los permisos de tu cuenta con el informe de credenciales de.

Todo esto descargando el CSV y cuando descargamos el CSV vamos viendo con una columna a ver cuáles son

los permisos asignados y si hay alguna brecha de seguridad.

Y finalmente no compartir nunca los usuarios de RAM ni las claves de acceso, porque eso sería un fallo

de seguridad muy muy grande, pues estas son algunas directrices y buenas prácticas del servicio I AM

de Amazon Web Services.

---

CLASE DE MODELO RESPONSABILIDAD COMPARTIDA PARA IAM
Muy buenas y bienvenidos a todos a esta clase.

Vamos a ver ahora el modelo de responsabilidad compartida para el servicio IAM.

Cuidado Cuando hablemos siempre de modelos de responsabilidad, es muy frecuente que aparezcan en los

exámenes del Cloud Practitioner.

Vamos a separar esta responsabilidad en dos, en aquello que cae en la parte de Amazon Web Services

y en aquello que es responsabilidad nuestra.

Empecemos por Amazon.

Aquello de lo que se encarga Amazon y de lo que es responsable es, en primer lugar, de la infraestructura,

es decir, de la seguridad de la red global.

En segundo lugar, del análisis de configuración y de las posibles vulnerabilidades.

Y finalmente, de la validación de la conformidad.

Ahora, pasando a nuestro lugar, de aquello en lo cual debemos encargarnos, ser responsables es,

en primer lugar, de la gestión y supervisión de los usuarios, grupos, roles y políticas.

Debemos ir con cuidado a quién asignamos unos permisos?

A quién asignamos unos grupos, porque esto es nuestra responsabilidad.

En segundo lugar, debemos ser responsables a la hora de habilitar el servicio de MFA en todas las cuentas.

Es decir, aquellos usuarios que no tengan el servicio MFA, pues tienen un peligro si pierde la contraseña

porque no tendrán una doble validación o una doble autenticación con un dispositivo.

Todo seguido.

Debemos ser, pues, conscientes de que rotar todas las claves es cosa nuestra.

Con frecuencia, semanalmente.

Bueno, periódicamente debemos rotar todas las claves.

Debemos utilizar herramientas IAM para aplicar los permisos adecuados y finalmente analizar los patrones

de acceso y también revisar los permisos con las herramientas de seguridad pertinentes.

---

CLASE RESUMEN AIM
Muy buenas y bienvenidos a todos a esta clase.

Ahora, para finalizar la sección, acabemos con un resumen que englobe todo aquello que hemos explicado.

Hemos hablado de usuarios.

Un usuario al final es un mapeado a un usuario físico.

Hemos dicho que cada usuario físico debe representar un usuario en Amazon Web Services para así hacer

el mapeado propiamente.

Y este usuario tiene una contraseña para el acceso con la consola de AWS.

En segundo lugar, hemos hablado de grupos.

Los grupos contienen únicamente usuarios.

Un grupo no puede contener a otro grupo.

Todo seguido.

Hemos visto las políticas.

Una política es un documento JSON que describe los permisos para usuarios o para grupos.

También hemos considerado los roles para instancias EC2 o servicios de Amazon Web Services.

La seguridad, pues que hemos visto en seguridad que debemos activar MFA y una política de contraseñas

fuerte.

Amazon Web Services, pues nos permite también gestionar tus servicios de AWS mediante la línea de comandos

mediante la terminal.

AWS SDK gestiona tus servicios de AWS utilizando un lenguaje de programación.

Las claves de acceso, pues, nos permiten acceder a Amazon Web Services mediante la ley o el SDK.

Y finalmente, en cuanto a auditoría, en cuanto a control y seguridad, tenemos el informe de de credenciales

de IAM, el asesor de acceso, el advisor, el Access Advisor de IAM.

Todo esto es lo que hemos visto en esta sección bien agrupado y también hemos hecho lo que sería el

hands on la parte práctica, para que así también veas reflejado todos los conceptos teóricos de una

forma más visual en la práctica en Amazon Web Services.

Ahora sí, verás que al final tienes un cuestionario que debes rellenar para ver si realmente has entendido

todo aquello que hemos explicado.
