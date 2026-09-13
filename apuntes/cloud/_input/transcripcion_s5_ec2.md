CLASE FUNDAMENTOS DE EC2 *******
Seguramente hayas escuchado hablar del servicio N2 de Amazon Web Services es realmente una de las ofertas

más populares de Amazon.

F2 viene de las TIC Computer Cloud, que es una infraestructura como es servicio y entenderemos por

qué.

Consiste principalmente en la capacidad de las siguientes de los siguientes puntos.

En primer lugar, consiste en alquilar lo que son máquinas virtuales llamadas equipos, almacenar datos

en unidades virtuales llamadas GBS.

El cual también veremos con mucho detalle con una sección específica para VS.

También consiste en distribuir la carga entre diferentes máquinas mediante balancín.

Lo que se va a encargar a este servicio de balancear la carga entre diferentes unidades y seguidamente

de escalar los servicios mediante un auto Skyline group mediante un grupo de auto escalado F2.

Principalmente se enfocan en esta capacidad de estos cuatro puntos.

Veremos lo útiles que son estas máquinas virtuales.

Conocer F2 es fundamental, fundamental, fundamental para entender realmente el funcionamiento del

cloud.

Cuáles son las opciones de tamaño y configuración que tenemos para este tipo de servicio?

Podemos elegir entre una gran variedad.

Vamos a verla con detalle.

En primer lugar, podemos elegir el sistema operativo de nuestra máquina virtual.

Por ejemplo, si queremos usar Linux o Windows o Mac, lo podemos seleccionar.

Podemos seleccionar también cuánta potencia de cálculo y cuánto es núcleos, es decir, la CPU, cuánta

memoria de acceso aleatorio, la RAM queremos para una máquina, para un servicio, queremos ocho gigas,

nos va perfecto, queremos más 16, Lo podemos subir?

Incluso lo podemos subir más y más y más.

Veremos que hay un montón de servicios.

Bueno, un montón de tipos de instancias.

Mejor dicho, para F2.

También podemos seleccionar cuánto espacio de almacenamiento.

Justo aquí.

Vamos a ver que hay dos puntos a destacar un espacio de almacenamiento conectado a la red mediante los

módulos TBS y NFS, que serán factores que veremos también con detalle en este mismo curso para el cloud

practitioner, que son elementales.

Y en segundo lugar, también hay otro espacio de almacenamiento llamado de hardware, que es mediante

el ECB dos Instant Store.

Podemos elegir también lo que es la tarjeta de red, es decir, la velocidad de la tarjeta, la dirección

IP pública, las reglas del firewall, es decir, el grupo de seguridad que queremos aplicar para este

servicio F2.

Y finalmente tenemos lo que es un script de arranque.

Cuando nosotros configuramos una máquina virtual como F2, lo que vamos a hacer es lanzar un script.

Este script me va a definir unas reglas básicas que quiero que tenga mi máquina, mi instancia.

Veremos cómo hacerlo de forma práctica.

No te preocupes por nada de esto.

Son básicamente los datos del usuario que van a estar ahí dentro.

Vamos a ver realmente qué son estos datos del usuario y cómo nos van a permitir lanzar una instancia

de C2, Pues es posible arrancar nuestras instancias utilizando lo que es un script de datos de usuario

de F2 o también llamado Bootstrap, que significa lanzar comandos cuando una máquina se inicia, es

decir, cuando vayamos a definir el lanzar una instancia, levantar este servicio de C2, le diremos

Vale, quiero que introduzcas estos datos de usuarios iniciales, que sería como el ADN que tendrá esta

máquina para cuando ésta se levante y venga configurada con todo lo que nosotros hemos metido previamente

en los datos del usuario.

Así que este script solo se ejecuta una vez en el primer arranque de la instancia.

Nunca más Los datos de usuario de C2 se van a utilizar.

Se van a utilizar para automatizar todas las tareas de arranque.

Como cuáles?

Pues instalar actualizaciones, instalación de software, descargar archivos comunes de Internet, cualquier

cosa que se te ocurra, la verdad.

Así que olvídate de lanzar una instancia y estar instalando el software actualizaciones cada vez, no?

Vamos a crear un script de arranque que lo haga de forma automática para cada instancia que levantemos.

Nada más.

Puedes poner ahí dentro todo lo que tú quieras.

Verás que es súper sencillo con un simple script que te voy a proporcionar yo mismo.

El script de datos de usuario F2 se ejecuta simplemente con el usuario root.

Esto es relevante ahora ya la siguiente clase pasaremos a un caso práctico.

Qué significa eso?

Que vamos a empezar a lanzar una instancia F2 con Linux, Vamos a ver diferentes puntos que vamos a

seguir para lanzar esta instancia.

Así que no te olvides ahora sí, de aplicar todo lo que estamos haciendo de forma teórica en la práctica.

Te recomiendo siempre que aunque el examen de Klout practitioner sea totalmente teórico, pues que hagas

estas clases prácticas porque te ayudan realmente a seguir todo lo que estamos explicando y realmente

asimilarlo.

Y es muy importante.

Yo he estado en la piel de ser estudiante también de Amazon Web Services y siempre me iba súper bien

asimilar con la práctica, así que por favor, no pierdes nada, es totalmente gratuito.

Adéntrate y pruébalo también.

Todo aquello que estamos haciendo en este curso.

CLASE  Crear una Instancia EC2 con datos de usuario para tener un Sitio Web - Práctica *******

Empecemos con el lanzamiento de una instancia F2 con Linux y aunque por el momento veas diapositivas,

esta clase será totalmente práctica.

Definamos en primer lugar los requisitos.

Vamos a lanzar nuestro primer servidor virtual en nuestra instancia F2, utilizando la consola de Amazon

Web Services.

Punto de inicio.

Vamos a hacer justamente esto.

Tendremos una primera aproximación de alto nivel a los distintos parámetros que existen para las instancias

F2 y veremos que nuestro servidor web se lanza utilizando los datos de usuario de C2.

Y todo seguido aprenderemos a iniciar, parar y terminar nuestra instancia, porque al final es tan

flexible Amazon Web Services que con un botón iniciamos un servicio y con otro botón lo paramos o lo

terminamos.

Todo esto nos permite escalar de una forma muy, muy rápida.

Ahora, si vamos a ello, vamos a movernos dentro del servicio F2.

Por aquí lo tenemos.

Vamos a entrar y estamos en la nueva experiencia del experto.

Vamos a ir a instancias y justo cuando estemos en instancias, si no hay ninguna activa para esta región,

que como ves este servicio es a nivel de región, pues vamos a lanzar la primera.

Vamos a lanzar la primera instancia y por ello hay que rellenar un conjunto de campos.

Por ejemplo.

El nombre.

El nombre que yo quiera.

Mi primera instancia también puedo agregar lo que son etiquetas, esto es tags adicionales que sería

nombre mi primera instancia.

No obstante, no hace falta, vamos a dejarlo como mi primera instancia, como su nombre.

En caso de querer agregar etiquetas, también lo podremos hacer.

Todo seguido.

De qué imagen partimos?

Podemos partir de una imagen?

Pues un Quick Start, un inicio rápido como podría ser Amazon Linux, que vienen por defecto.

Hay muchas otras, como ves justo aquí.

Windows, Red Hat, MacOS, Debian y mucho más.

Vamos a partir de Amazón Linux, que es de Amazon Web Services.

En la parte inferior vemos el AMI que es el Amazon Machine y Mach.

Vamos a dejar el que viene por defecto, que además es gratuito.

Está contemplado en la capa gratuita, pero hay muchos otros que también podrían ser elegidos en función

del propósito de esta instancia.

Justo aquí vemos la descripción, la arquitectura y el líder de la Amy.

Todo esto lo podemos dejar como los parámetros por defecto.

No hace falta.

Toquemos nada más y vamos a bajar al tipo de instancia.

Esto es muy interesante, el tipo de instancias, aquello que hemos comentado hasta el momento.

Hay distintos tipos con diferentes características y aquí vemos que nosotros vamos a usar la T2 micro

que es apta para la capa gratuita, pero si queremos una instancia más potente, simplemente hay que

elegirla.

Hay instancias que están disponibles, hay algunas que no en función de la región hay que contemplarlo

todo.

Fíjate que en función de la instancia los precios también cambian.

Como hemos comentado hasta el momento.

Dejemos la T2 a micro.

Y vamos ahora al par de claves.

Justo aquí hay muchas cosas que comentar.

Este par de claves, si no hemos creado ninguno, no nos saldrá.

En mi caso, yo ya tengo un par de claves creado que es este aquí, pero puedo crear un nuevo par de

claves.

Vamos a suponer que no hay ninguno creado.

Vamos a crear uno nuevo y vamos a poner un nombre que será demo.

Para claves.

Qué tipo de par de claves hay?

Nosotros vamos a usar el algoritmo RSA.

Es un algoritmo de criptografía de clave pública donde se crea una clave privada o una clave pública.

No entremos en detalles porque no es la intención de entrar en algoritmos.

Simplemente vamos al RSA, que es el más seguro, y vamos a pasar al formato de archivo de clave privada.

Es decir, nosotros cuando almacenamos estas claves habrá una clave pública y una privada.

La privada la podemos entender como si fueran nuestra contraseña.

Hay dos formas.

Hay dos formatos en los cuales podemos almacenar esta clave o punto PPK.

Y me dirás cuando elijo uno, cuando elijo el otro, pues adentro.

Aquí si utilizas Linux, Mac o Windows diez, en caso de que utilices una versión, por ejemplo menor

a Windows diez, Windows 7U8, utilizarás PPK que utiliza directamente Putty para conectarse y en este

caso para guardar el archivo de clave privada con PPK.

Yo uso Mac, pues voy a elegir punto PEM y voy a crear este par de claves.

Ahora si se me descarga este par de claves y yo ya lo tengo para mi máquina, incluso ya lo tengo elegido

justo aquí tengo tanto Joan como demo par de claves.

Por ahora lo voy a esconder y pasaremos a la configuración de la red.

La configuración de la red?

Pues podemos ver las redes, las redes, incluso si podemos asignar automáticamente la IP pública.

Todo lo tenemos bien asignado, tal que aquí, ya pasando al siguiente punto, vamos a hablar del cortafuegos

del firewall y viene la parte de grupos de seguridad.

En mi caso yo he utilizado varios grupos de seguridad, ya he usado configurando instancias otro grupo

de seguridad.

Por lo tanto, lo que veremos aquí es que cuando creamos esta instancia se va a crear un nuevo grupo

de seguridad denominado Launch Wizard dos o en tu caso, sin ningún momento has creado una instancia

Launch Wizard uno.

Eso nos viene a definir algunas reglas y algunas políticas para usar en el propio firewall.

Una de estas que de que vamos a necesitar para esta clase es permitir el tráfico HTTP desde Internet.

Por ello, vamos a seleccionar.

Esta tercera opción hay que permitir el tráfico de HP desde Internet.

Si quisiéramos denominar y establecer más reglas, pues tendremos un grupo de seguridad por ello llamado

Launch Wizard dos o uno.

Si es tu caso, pasamos para abajo y por aquí veremos configuración de almacenamiento y detalles avanzados

que podemos añadir.

Y en detalles avanzados.

Hay que ir con cuidado porque vamos a la parte relevante que es los datos del usuario.

He hablado previamente en la clase anterior de los datos de usuario.

Los datos de usuario me permiten establecer la configuración automática y la configuración previa que

se va a lanzar.

Una vez instanciar ya la máquina virtual F2.

Vamos a ver realmente el código que yo proporciono en este curso.

Lo tengo justo aquí.

Estas son las tres carpetas que verás en la parte de código y vamos a centrarnos en F2 fundamentals

donde ves F2, user, guión, data punto.

Ese es un script que tiene simplemente estas líneas de código.

Te voy a pedir que las copias.

Y que las pegues.

Lo puedes abrir de este fichero como un fichero normal, lo puedes abrir con Visual Studio Code o como

tu desees con el editor que tú desees.

Lo único que quiero es que copiemos estas líneas.

Vamos a ir punto a punto.

Esto es un badge y lo va a utilizar para describir los datos de usuario, es decir, la instalación

previa para que cuando nosotros lancemos esta instancia ya venga configurada y no haga falta configurarlo

desde cero.

Vamos a instalar varias cosas, por ejemplo http con una versión de Linux dos.

Vamos a actualizar, vamos a instalar, vamos a encender, vamos a activar y vamos a lanzar un mensaje.

Un mensaje que veremos nosotros como usuarios que pondrá.

Hola mundo!

Desde aquí veremos un identificador de la máquina.

Todo esto lo tendremos instalado desde el primer momento que yo lance esta instancia.

Yo ya lo tengo dentro.

No hay que hacer nada más.

Por ello vamos a lanzar la instancia.

Esto está contemplado en el nivel gratuito, la capa gratuita.

No nos preocupemos, lanzamos la instancia.

Esto tarda aproximadamente unos 30 segundos en activarse.

Significa que si volvemos a instancias, por el momento no vemos nada.

Vamos a actualizar.

Nos aseguramos que además estamos en la región donde estaba antes, porque ahora, verás, tengo mi

primera instancia en norte de Virginia, pero si cambio yo de región, pues ahora cuando acabe de cargar

veré que no tengo ninguna estancia en esta en esta región en particular.

Las instancias F2 van por regiones.

Yo ahora tengo una región norte de Virginia con mi primera instancia que tardará aproximadamente unos

30 segundos estar a estar en ejecución.

Veamos todo seguido Qué podemos hacer con esta instancia?

Vamos a seleccionar esta instancia y cuando la seleccionamos, vemos justo aquí que se nos abre un panel

de información donde tenemos detalles, seguridad, redes, almacenamiento, comprobaciones de estado,

monitoreo y etiquetas.

Todo esto es realmente importantísimo.

Es información propia de esta instancia y muchas veces, en lugar de tener una instancia, tendremos

20, 100, 200 y nos interesa examinar una a una.

Cuál es su información?

Por ejemplo, la IP que tenga o los grupos de seguridad asignados?

Vemos pues, el resumen de la instancia direcciones IP, DNS, el tipo de instancia T2, micro.

Y si bajamos, incluso vemos más detalles de la instancia.

Como puedes observar, podemos introducir muchas características, tanto de seguridad, de acceso de

cualquier tipo de acuerdo.

Esto nos lleva a tener mucha información.

Hay que saber.

Hay que saber gestionarla bien e identificarla muy bien.

Por ejemplo, vamos a ver seguridad En seguridad vemos las reglas.

De entrada debes tener configurado correctamente el intervalo de puerto 22 TCP IP con el grupo de seguridad

que se te haya creado a ti.

El uno, el dos, el tres, el que sea y también el puerto 80 para tener las conexiones también con

Internet.

Estas son las reglas que yo tengo definidas.

Fíjate bien que las tuyas sean iguales.

Vemos que también tenemos parámetros de redes, almacenamiento, etc, etc Vamos a detalles y lo que

vamos a hacer ahora es copiar esta dirección o simplemente acceder a este enlace de aquí.

Lo que hará esto será abrirnos una pestañita y esta pestañita se va a poner a pensar, a pensar, a

pensar qué está pasando?

Eso significa que no podemos acceder a nuestra máquina, Vamos a copiar la dirección y vamos a insertar.

Pero cuando lo pego sí que me aparece ya el mensaje.

Hola mundo, desde la IP 172 318 020 nueve f2 internal.

Qué está pasando aquí?

Que no llego a establecer esta conexión, aunque estoy llegando también a la misma IP.

Pues fijémonos que justo aquí estamos usando https.

Yo he activado el puerto 80 para http.

Vamos a quitar esta s que muchas veces se asigna de forma automática y ya podemos llegar de forma correcta

a nuestra instancia, al mensaje que teníamos predefinido en el código que era este o el mundo desde

la dirección correspondiente.

Perfecto.

Volvamos.

Aquí tenemos nuestra instancia en ejecución.

Pero podemos pararla.

Podemos terminarla.

Etc.

Por eso la instancia tiene un estado.

Vamos a acceder al Estado y la podemos detener, reiniciar o terminar.

Vamos a detenerla.

Simplemente la vamos a poner en pausa.

No deja de ser nuestra.

Simplemente se va a poner en pausa.

Como también activarla, Como detenerla, como reiniciarla o como pararla.

Tarda un tiempo.

En concreto, por ahora no sale en ejecución.

Pero simplemente hay que esperar un tiempo y se va a detener correctamente.

Vamos a actualizar.

Y ahora sí la tenemos.

Que está en un estado de deteniéndose.

Si volvemos y ahora actualizamos, en vez empezamos a ver que esto está cargando.

Cargando, cargando.

Es decir, aunque aparezca este mensaje, este mensaje es de la carga anterior, realmente no llegamos

a nuestra instancia ahora mismo.

Significa eso que está detenida de forma correcta?

Nosotros queremos reiniciarla, conectarla de nuevo a esta instancia, iniciar instancia.

No ha hecho falta re configurarlo todo.

Simplemente la teníamos parada.

Ahora se está reconfigurando.

Vamos a cargar y cuando cargamos vemos que está pendiente.

Este tarda unos segundos de 15 a 30 segundos.

Va a tardar y máximo un minuto en configurarse de nuevo la instancia en cambiar su estado.

Una vez cambie el Estado, vamos a ver que aunque nosotros intentemos llegar y llegar y llegar, no

podremos.

Y dirás Qué pasa?

Hay algún error?

Hay algún fallo?

Bueno, hay una cosa a tener muy en cuenta ahora que ya está activa, vemos realmente que la dirección

a la cual yo intento acceder es 54 145 171 253 y la dirección IP pública ha cambiado.

Vamos a copiar de nuevo.

Vamos a pegar y justo ahora llegamos a la nueva dirección de esta instancia.

Perfecto.

Ya hemos conseguido aquello que queríamos.

Hay algo a tener muy en cuenta cuando paramos la instancia o cuando la reiniciamos, cuando la terminamos

y volvemos a encender una nueva.

La dirección IP pública cambia, por eso hay que tenerlo muy, muy en cuenta cuando realizamos acciones

de acceso a nuestra instancia.

Llegados a este punto, queremos pararla o queremos terminarla para siempre?

Lo único que hay que hacer es seleccionarla, estado de la instancia.

Y vamos a terminar esta instancia.

Vamos a bajar y nos dice la información pertinente a ver si estamos seguro de que deseamos terminar

esta instancia.

Puede ser que tengamos algo desplegado y sea realmente peligroso.

Pero en nuestro caso vamos a terminarla.

Se ha terminado correctamente Y ahora si se está cerrando un segundito sin cerrarse.

Simplemente asegúrate ahora que si accedes, pues ya no puedes ya llegar a la instancia propiamente.

Actualizamos el dashboard del panel de control y vemos que sigue cerrándose.

Estupendo, ya tenemos la instancia terminada y aquí aparece la instancia como terminada.

Ya hemos finalizado esta primera clase un poquito más larga y esta primera clase práctica nos ha servido

para poner las bases a cómo realizar el despliegue de una instancia de C2 de una forma súper sencilla,

pero ya tenemos el servicio más popular de Amazon WebService activo para nuestra cuenta.

Y este servicio aparece muchísimo, muchísimo, en los exámenes de Cloud Practitioner.

CLASE TIPOS BASICOS DE INSTANCIA ******
Hay distintos tipos de instancias.

F2 Lo que tiene el plot es que es super flexible, es decir, en cualquier momento podemos seleccionar

un tipo de instancia u otra en función del caso de uso.

Si nosotros tenemos un propósito, un proyecto, una empresa enfocada a un producto, pues en función

de este producto, en este caso este proyecto puede ser el que haremos en una instancia u otra.

Vamos a ver, pues justo aquí lo que acabo de mencionar, pues hay instancias de diferentes tipos en

función del caso de uso de unas u otras.

Cuál es ahí?

Pues justo aquí vemos una lista del tipo de instancia que existe.

Hay varias.

Vamos a repasar algunas de estas, pero antes vamos a ver que realmente los nombres de las instancias

tiene un aspecto realmente peculiar.

Entendamos por qué.

Seguramente si has utilizado instancias F2, es decir, máquinas virtuales F2, veas nombres de este

estilo M 5.2 x large.

Qué significa eso?

Y por qué hay estos colores?

Por qué he marcado estos colores azul, naranja y verde?

La M marcada en azul nos da la clase de instancia.

El cinco nos da la generación.

Por qué?

Porque Amazon Web felices los va mejorando con el tiempo, así que así marca la generación propia del

servicio.

Y finalmente, dos x marca el tamaño.

Dentro de la clase de instancia hay muchos tamaños en función de las características de la propia máquina

de.

Justo Esto es realmente importante.

Vamos a ver un tipo de instancia que es de propósito general.

Para qué nos sirve y por qué nos podría interesar una instancia de propósito general?

Pues realmente es excelente para una diversidad de cargas de trabajo, como por ejemplo servidores web

o repositorios de código.

Hay un equilibrio en este tipo de instancias entre tres puntos computación, memoria y red.

Y en el curso vamos a utilizar la instancia de dos punto micro, que es una instancia F2 de propósito

general y verás que también es gratuita.

Así que fenomenal.

No hay problema.

Justo aquí vemos lo que sería la interfaz que con el tiempo toda puede cambiar.

No te preocupes, esto es lo más reciente que hay en todo.

En segundo lugar, tenemos otro tipo de instancia de computación optimizada.

Para qué sirve?

Pues este tipo de instancia es ideal para tareas de cálculo intensivo que requieren procesadores de

alto rendimiento.

Veamos, por ejemplo, cargas de trabajo de procesamiento por lotes, una codificación de medios servidores

web de alto rendimiento Computación de alto rendimiento H PC, modelado científico y aprendizaje automático,

también conocido como machine learning, servidores dedicados a videojuegos.

Pues todo esto necesita también lo que es computación optimizada, un cálculo intensivo.

Y justo así vemos lo que sería, pues la interfaz gráfica más reciente.

Como ves, Amazon se dedica a actualizarse a menudo si en algún momento no ve la misma interfaz, no

te preocupes.

Yo intento siempre actualizar los vídeos en las clases, siempre y cuando sea posible.

Seguidamente vemos otro tipo de instancia que es de memoria optimizada y vamos a ver que es de rápido

rendimiento para cargas de trabajo que procesan realmente grandes conjuntos de datos en memoria.

Casos de uso.

Cuando la vamos a usar?

Cuando necesitemos de lo que es alto rendimiento, bases de datos relacionales o no relacionales Cuando

tengamos almacenes de caché distribuidos a escala web, Bases de datos en memoria optimizadas para Business

Intelligence, aplicaciones que a lo mejor realizan procesamiento en tiempo real de grandes datos no

estructurados.

Y justo aquí vemos la interfaz de la memoria optimizada F2.

Básicamente, este tipo de instancia puede cambiar con el tiempo, como todas las otras.

Ahora sí, pasemos a la instancia de tipo almacenamiento optimizado.

Para qué nos sirve?

Pues es ideal para tareas de almacén de almacenamiento intensivo que requieran un acceso alto y secuencial

de lectura y escritura a grandes conjuntos de datos en el almacenamiento local.

Casos de uso cuando lo podemos usar para sistemas de procesamiento de transacciones en línea de alta

frecuencia.

Todo esto lo veremos, por ejemplo, el sistema bancario.

Todo esto nos podría servir para bases de datos relacionales o no SQL, para caché, para bases de datos

en memoria.

Por ejemplo redes, que es un tipo de base de datos, aplicaciones de almacenamiento de datos, sistemas

de archivos distribuidos.

Y aquí vemos también cómo se ve la interfaz en Amazon Services.

Pasemos a ver un ejemplo.

En esta tabla veremos lo que sería un tipo de instancia, sus características y lo que nos puede aportar.

La primera T2 punto micro instancia que vemos aquí, cuantas CPU tiene?

Tiene una CPU con un y de memoria el almacenamiento solo utilizamos lo que es vs.

Veremos más adelante lo que se ve.

No te preocupes.

El rendimiento de la red de bajo va moderado, no mucho más.

Y el ancho de banda ni se define por el momento real.

Una instancia muy, muy básica no sirve para hacer cálculos intensivos.

Pasamos a T2 x large, pues vemos que las características del CPU aumentan de memoria, aumentan y el

rendimiento ahora ya es moderado.

A medida que vayamos avanzando, como vemos aquí las instancias, vemos que realmente las características

también mejoran.

Fíjate en la R 5.16.

Tiene 64 CPU 512 Gigabit de memoria, 20 de rendimiento de la red y un ancho de banda de 13.600 mega

megabytes.

Así que fíjate bien realmente las diferencias que hay entre ellas entre estos tipos de instancias T2.

Micro forma parte de la capa gratuita.

Como ya he mencionado, tenemos hasta 750 horas al mes para poder usar este tipo de instancia.

Justo ahora hemos visto los tipos de instancias y en las siguientes clases vamos a practicar y practicar

y practicar.

No te preocupes, vamos a ver todo lo reflejado en diapositivas de la forma más práctica posible.

Y finalmente, para acabar, vamos a acceder a este enlace y vamos a ver una lista enorme.

Y a esto me refería cuando hablaba de flexibilidad.

Al final hay unas características tan, tan amplias que tiene Amazon Web Services.

Es que podemos elegir la instancia en función de las características.

Por ahora pasa muy rápido, simplemente para que veas que hay muchas.

Vamos a centrarnos un poquito.

Las podemos, las podemos definir como ya hemos dicho por su nombre.

Como vemos aquí todas tienen esa clase, esa generación, incluso ese identificador dentro de la clase.

Y todo esto va asignado a unas características la memoria CPU, el instant storage, que sería el almacenamiento

de la instancia, el performance de la red y muchas características que vemos aquí.

Obviamente, en función de la instancia que nosotros queramos, vamos a pagar más o vamos a pagar menos.

Todo esto hay que tenerlo en cuenta.

Vamos a ver precios por hora 0.384 por hora y vamos a ver que algunas son un poquito más, más, más

altas, más altos.

Estos precios 4.14 por hora.

Vale 4 $ por hora.

A lo mejor no parece mucho, pero vamos a hacer cuentas a 4 $ por hora aproximadamente por 24 horas,

que de un día equivalen a 96 $ por día.

Pongamos que la utilizamos un mes entero.

Pues justo aquí lo que tenemos es que una instancia nos cuesta 2.880 $.

Vamos a ver si realmente vale la pena.

Cuáles son sus características?

Sus características son bastante, bastante altas.

Justo aquí vemos que la clase es 24 x large, que sería esto equivalente a 384 y de memoria 96 CPUs.

Bueno, 37.5 de performance de red y muchas características que realmente definen un potencial de esta

máquina impresionante.

Hay un montón.

Hay un montón con características muy distintas y con precios obviamente muy distintos.

Tenlo en cuenta.

Justo en esta página puedes revisar todo lo que tú desees en cuanto a las características de este tipo

de Mac.
