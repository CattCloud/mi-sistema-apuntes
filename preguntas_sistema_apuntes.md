# 🔍 Preguntas para Documentar tu Sistema de Apuntes

> Estas preguntas nacen después de revisar todo tu contenido en `contexto/` ([info.txt](file:///c:/consciente/mis-apuntes-dev/contexto/info.txt), ambos diagramas PNG y [manual_apuntes_cattcloud.md](file:///c:/consciente/mis-apuntes-dev/manual_apuntes_cattcloud.md)).  
> **No supongo nada.** Solo pregunto lo que necesito que me confirmes o aclares para armar el documento final.

---

## A. Alcance y Definición del Sistema

1. **¿Qué quieres que cubra el documento?** ¿Solo la fase de *generación de apuntes* o también la fase de *repaso activo* (NotebookLM → videos/audios/cuestionarios)?
Solo la fase de generacion de apuntes
2. **¿Este documento es solo para ti** (referencia personal) **o lo usará alguien más** (un asistente IA, un colaborador, etc.)?
Es solo para mi
---

## B. El Flujo Paso a Paso (Generación)

> Tu diagrama [sistema_apuntes_actual.png](file:///c:/consciente/mis-apuntes-dev/contexto/sistema_apuntes_actual.png) muestra un flujo, pero necesito confirmar detalles.

3. **Definir el tema:** ¿Cómo decides qué tema estudiar? ¿Viene de un curso, de curiosidad personal, de necesidad laboral? ¿Hay una lista o backlog de temas pendientes?
Aqui hay varios puntos
- Aveces viene de un tema de Udemy por un curso que sigo
- Otras de videos en Youtube , de temas interesantes que encuentro repentinamente y quiero ver los conceptos
- Aveces cuento con un Roadmap
- PDFs o documentos que reuno(pocas veces)

Asi que le brindare un input de contexto al sistema para que apartir de ahi me indique el tema identificado

4. **Definir límites:** ¿Cómo determinas hasta dónde llega un apunte? ¿Tienes algún criterio para decir "esto ya no entra aquí"?
Mmmm muy buena pregunta.
La verdad es que lo hice varias veces pero no defini un criterio, lo que si siento es que un tema no tiene que ser tan extenso porque agotaria su estudio y llevaria a la flojera estudiarlo y es mejor dividir el tema en 2 o mas de forma estrategica de ser necesario.Sobre todo si es complicado ahi con mayor razon dividirlos.

5. **Input de información:** Tu diagrama dice que le das información a la IA (transcripciones de videos, propias palabras, etc.). ¿De dónde exactamente sacas esa información? ¿Videos de YouTube, cursos pagados, documentación oficial, libros, artículos, todo lo anterior?
Eso lo ves en la respuesta de la pregunta 3, de esos puntos usualmente saco lo que seria un idea de que tema se va a estudiar, pero tambien en ocasiones puede que esas fuentes se conviertan en una fuente que les compartire a la IA para los apuntes.


6. **Definir el esqueleto:** ¿El esqueleto (los puntos/subsecciones del tema) lo generas tú manualmente, lo propone la IA, o es un proceso mixto? ¿Usas algún prompt específico para esto?
Es mixto, pero lo que quisiera es que la IA me lo proponga desde ahora, no cuento con un prompt especifico , pero el archivo de patrones de apuntes(tambien esta en desarrollo para generarlo porque tengo varios apuntes en Notion pero puedes tomar una idea del archivo manual_apuntes_cattcloud.md,pero aun no es la definitiva)


7. **Recopilación de IAs:** El diagrama menciona que "recopilas las IAs que usarás". ¿Cuáles IAs usas actualmente? (ej. ChatGPT, Gemini, Claude, Copilot, etc.) ¿Cada una cumple un rol diferente?

Uso ChatGPT,Gemini y Claude
A todos les comparto el prompt que me dara ahora el sistema y me deben generar el respectivo apunte para compararlo , sintetizarlo.


8. **Preparar la página en Notion:** ¿Usas una plantilla base en Notion o creas cada página desde cero? ¿Tienes alguna organización de bases de datos/espacios en Notion para los apuntes?
Creo desde cero, pero si tengo workspaces para cada tema complejo, si quieres puedes revisar mi Notion los workspaces de programacion para que notes mi comportamiento.


9. **El bucle de generación de contenido:**
   - ¿Generas subsección por subsección de forma secuencial?
Exacto, es progresivo, termino uno y paso al siguiente
   - Cuando dices "sintetizo la información de la IA según lo que yo entiendo", ¿cómo sintetizas exactamente? ¿Reescribes, recortas, añades tus propias analogías, o cómo?
Aqui depende y creo que mas que nada depende de mi internamente y nose llamale intuicion o habilidad mia para reconocer que colocar,aveces con mis propias palabras , aveces uno de los conceptos que genero la IA me convencio y lo coloco , pero si o si debe ser algo que considero que debo entenderlo para mi , es como si estuviare estudiando y armando apuntes a la vez, una mezcla de ideas entre lo que me da la IA y lo que entiendo y pum eso se plasma.

   - ¿Cuánto tiempo te toma típicamente un apunte completo?
1 hora aprox a mas 
---

## C. Herramientas y Entorno Actual

10. **Editor:** El [info.txt](file:///c:/consciente/mis-apuntes-dev/contexto/info.txt) dice "interacción con el modelo en el editor". ¿A qué editor te refieres exactamente? ¿VS Code con Copilot/extensión de IA? ¿Cursor? ¿Otro?
A sobre esto-> - Todavia no hay un frontend , es solo interaccion con el modelo en el editor
En realidad es una idea que tenia para ahora automatizar mi generacion de apuntes , queria partir de tener un proyecto mi_sistema_apuntes y generar documento o skills que tengan contexto sobre mis sistema y como trabajo para que la IA me ayude, por ahora atravez de un chat,luego ire evolucionando ese sistema hasta que se convierta en un frontend.
Actualmente uso Antigraviti pero no creo que eso dependa , porque puedo cambiar mas adelante ,aun asi la carpeta mi_sistema_apuntes seguiria

11. **Notion:** ¿Sigues usando Notion como destino final de los apuntes o has migrado/estás migrando a otro lugar?
Sigo usando Notion

12. **Prompts:** Mencionas que necesitas "tener a la mano los prompts" para definir tema, esqueleto, generar contenido. ¿Ya tienes esos prompts definidos en algún lugar o están solo en tu cabeza?
Solo en mi cabeza, lo que indica en info.txt es en realidad lo que quiero hacer ahora, automatizar e integrar IA a mi flujo de trabajo para generar apuntes(lo que indica la imagen sistema_apuntes_actual.png)

13. **Archivo de patrones propios:** Tu diagrama muestra un "Archivo de patrones de apuntes propios" (que parece ser el [manual_apuntes_cattcloud.md](file:///c:/consciente/mis-apuntes-dev/manual_apuntes_cattcloud.md)). ¿Es correcto? ¿Lo usas activamente al crear apuntes o es más un documento de referencia pasiva?
No, recien lo genere pero aun no lo uso, su creacion era un pieza en la tarea de automatizar e integrar IA a mi flujo de trabajo para generar apuntes, se usara para que la IA tenga un contexto de como generar mis apuntes
---

## D. Repaso Activo (Post-Generación)

14. **NotebookLM:** ¿Ya usas NotebookLM para generar videos/audios de repaso o es algo planificado para el futuro?
Ya lo uso pero siento que no uso todo la potencia de la herramienta porque simplemente subo el apunte y genero el contenido ,pero si uso la personalizacion, el cual requiere prompt o indicaciones para eso, ahi es donde entra la IA y me los otorga basado en el apunte , para yo solo copiar y pegarlo 
15. **Cuestionarios:** ¿Los genera NotebookLM automáticamente o los creas tú? ¿En qué formato?
Los genera Notebook, no reconozco el formato porque no deja descargarlo, simplemente lo renderiza en la interfaz para la interaccion
Pero tambien siento que no uso toda la potencia y usare la personalizacion
- ACA AHI UNA TAREA ADICIONAL QUE QUEDA COMO FEAT A FUTURO
1. Recopilar informacion de como dar una instruccion de calidad a la personalizacion de contenido en Notebook
2.Brindarle a la IA esa informacion para que genere un skill de creacion de prompt (sea para videos,audios, cuestionarios)
 

16. **Presentaciones:** Tu diagrama de flujo muestra "Presentación para que lo expongas". ¿Esto es algo que haces activamente o es una idea futura?
Es un idea futura, creo que exponer es una excelente tecnica de estudio y las presentaciones son otra capacidad de NotebookLM

17. **¿Hay otros métodos de repaso** que uses y no estén en los diagramas?
No, solo esos medios de repaso
---

## E. Dolores y Fricciones Actuales

> Tu [info.txt](file:///c:/consciente/mis-apuntes-dev/contexto/info.txt) menciona varios pain points. Necesito entenderlos mejor.

18. **"Tomar apuntes me toma mucho tiempo y es agotador":** ¿Cuál es la parte que más tiempo consume? ¿La investigación, la síntesis, el formateo en Notion, o todo junto?
En orden
1. Tomar decisiones sobre definir el tema y los subtemas
2. La sintesis y la decision de cual queda y cual no
El formateo no es tanto porque solo es poner estilos y ya
En cambio creo que agota la toma de decisiones y el echo de que estoy viendo un nuevo tema.

19. **"Centralizar todo en un solo lugar era mucha fricción":** ¿Ya resolviste esto o sigue siendo un problema? ¿Tienes apuntes dispersos en varios lugares?
Que? no , no , no
Creo que se me confundio al escribir
En realidad quiero centralizar todo o mejor aun, la palabra seria automatizar, ahi trabajos de toma de decisiones que quisiera que la IA los tomara como la generacion de prompt, seleccion de temas ,etc

20. **"Siento que debo tener un apunte para todo":** ¿Esto sigue siendo así? ¿Has definido criterios para decidir qué merece un apunte y qué no?
Jeje primero con apunte para todo me referia a temas de programacion unicamente, pero si en realidad deberia haber apuntes para la mayoria de cosas , sino de donde repasarias? o sentirias que avancaste ese tema si no hay un indicador
Aunque siento que esto no aplica , porque para que quisieras saber que necesita apuntes o no, simplemente yo dare el input de informacion y apartir de eso se decidira el tema
21. **"Hacerlo manual":** Cuando dices que la fricción está en que lo haces manual, ¿qué pasos específicos te gustaría automatizar si pudieras?
Ahi pasos de toma de decisiones que quisiera que la IA los tomara como la generacion de prompt que compartire a la IA para que me genere el apunte de la subseccion respectiva , seleccion de temas de estudio a partir de la informacion que le dara ,definicion del esqueleto o estructura del tema,etc


---

## F. Visión Futura

22. **Página Web:** Tu diagrama de flujo menciona como futuro una "Página Web donde puedas centralizar ver tus apuntes y el contenido generado (videos, audios, infografías)". ¿Esto sigue siendo parte de tu visión? ¿Has avanzado algo en esto?
No, jeje hoy mismo estoy planteando pero empieza con saber donde estoy ahora parado y plasmar como trabajo actualmente, ese es el objetivo de este documento que generaremos
23. **¿Hay algo que te gustaría cambiar del sistema actual** que no esté reflejado en los documentos que revisé?
No , mejorar si
24. **¿El documento final que vamos a crear debería incluir la visión futura** o solo documentar el estado actual "as-is"?
Que documente solo el estado actual
---

> [!TIP]
> Responde lo que puedas, en el orden que quieras, con el nivel de detalle que sientas necesario. Si alguna pregunta no aplica, simplemente dime "no aplica" y la omitimos del documento final.
