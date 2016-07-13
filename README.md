#Práctica del [IFCD0110](https://www.sepe.es/contenidos/personas/formacion/certificados_de_profesionalidad/pdf/fichasCertificados/IFCD0110_ficha.pdf) : formularios y tablas con JQuery

##Descripción
La práctica consiste en la creación de una estructura de datos con las siguientes funcionalidades:
* Visualización de la misma a través de una tabla en HTML.
* Alta de datos en dicha estructura obtenidos mediante formulario validado.
* Modificación de datos existentes en la estructura a través del formulario anterior.
* Bajas de datos de la estructura.

Una posible extensión de funcionalidad sería el filtrado/consulta de datos de la estructura indicando las claves a través del formulario para luego visualizar el resultado en la tabla.

##Planteamiento
Para desarrollar la práctica nos hemos basado en el inventario de una librería/biblioteca sencilla. 

La estructura de datos estará formada por un array que corresponde al inventario y que contiene objetos asimilables a libros, cada uno con 5 propiedades o atributos:

1. ISBN del libro
2. Título de la obra
3. Autor o autores
4. Año de publicación
5. Editorial

Una reprersentación en "pseudocódigo" de esta estructura sería la siguiente:

	libreria[
    	[0]{isbn:"1234567890", titulo:"JQuery y tú", autor:"Guillermo Puertas", anio:"2016", editorial:"Mocosoft"}
        [1]{isbn:"0987654321", titulo:"Ajax, ¿pino?", autor:"Alan Turming", anio:"1950", editorial:"Enigma"}
        ...
    ]

##Miembros del proyecto
Las personas que han participado en el desarrollo del código son:
* Adrián Arteaga
* Juan José Basco
* Pablo Andueza
* Pablo Garrido
* Rubén Álvarez

##Desarrollo
###Vers. 0
**\- Interfaz del usuario**

Se compondrá de:
* Un formulario con los campos correspondientes a las 5 propiedades de los objetos libros almacenados en el array librería, que permitirá añadir nuevos libros o modificar los datos de los ya existentes.
* Un grupo de tres botones: "Actualizar" (altas de datos); "Modificar" (modificación de datos almacenados); "Borrar" (bajas de datos).
* Una tabla con una cabecera fija para representar el contenido de la estructura de datos.

El interfaz debe ser responsivo de manera que se adapte a dispositivos móviles, tabletas y sobremesa.

También se atenderá a la accesibilidad de la aplicación, tanto para la navegación por la página, como la inclusión de ayudas a la hora de completar campos o el uso de botones.


**\- Validaciones de datos**

La validaciíon de datos se realizará en varios niveles:
1. Mediante mensajes de texto en HTML: indicación de campos obligatorios; sugerencias en los propios campos del formulario mediante el atributo ==*placeholder*==.
2. Validación según el usuario va escribiendo en cada uno de los campos. De esta forma recibirá orientación sobre la validez de los datos que está introduciendo.
3. Validación antes de añadir o modificar. Si los datos no cumplen los requisitos especificados no se almacenarán o modificarán en la estructura de datos.


**\- Altas de datos (Añadir)**

Para añadir un libro el usuario debe completar al menos los campos obligatorios con el formato adecuado y pulsar el botón "Añadir".
En ese momento se almacenará un objeto formado con los datos del formulario al final del array librería, se borrarán los campos y se mostrará el contenido de librería a través de la tabla.

**\- Seleccionar datos de la tabla para modificar o borrar**

Al hacer click sobre una fila de la tabla esta quedará remarcada en color y el formuilario se autocompletará con los datos de la misma.
Si se vuelve a clickar sobre la línea esta volverá a su estado visual anterior y el formulario quedará en blanco.

Como las líneas de la tabla tienen que estar relacionadas con el índice del array librería (para saber que elemento hay que modificar o borrar), la tabla incluirá una **celda al final que estará oculta y que incluirá el índice correspondiente del elemento en el array**.
A su vez en el formulario se creará un campo oculto para recibir el dato de dicha celda y al objeto libro de la estructura de datos se le añadirá un atributo "índice" para almacenarlo.

**\- Modificar datos**

Una vez seleccionada una fila, el usuario puede modificar los datos en el formulario y pulsar el botón "Modificar" para que se guarden dichos campos (previa validación). Se actualizará la tabla con la modificación y se limpiará el formulario.

**\- Bajas de datos (Borrar)**

Una vez seleccionada una fila el usuario puede pulsar el botón "Borrar" se eliminará esa entrada del array, se mostrará la tabla modificada y se limpiará el formulario.

**\- Testeo y correcciones**
1. Cuando se selecciona una fila de la tabla y se modifica algún campo del formulario, si se selecciona una nueva fila (si haber pulsado "Modificar") se pierden los cambios realizados por el usuario. CORRECCIÓN: solicitar confirmación del usuario cuando esto suceda.
2. Es posible borrar una entrada por descuido del usuario. CORRECCIÓN: solicitar confirmación al usuario antes de borrar.
3. Los botones carecen de una lógica de negocio adecuada. Es posible pulsar "Modificar" y "Borrar" sin haber seleccionado una fila de la tabla. Si se selecciona una fila y se pulsa "Añadir" se genera un nuevo elemento en el array que es una copia del seleccionado. CORRECCIÓN: "Añadir" sólo está disponible si no hay ninguna fila seleccionada, y "Modificar" y "Borrar" cuando si lo está.
4. Para el testeo de la aplicación hay que crear a mano entradas en el array librería lo que ralentiza las pruebas. CORRECCIÓN: crear una función que genere de forma automática entradas de datos y añadir un botón (**sólo para la fase de desarrollo**) para llamarla.
5. La validación del ISBN es muy básica. CORRECCIÓN: aplicar validación a tres niveles, comprobación de formato de número ISBN, comprobación de código de control ISBN (para ISBN10 e ISBN13) y chequeo que evite que dos elementos de la librería tengan el mismo ISBN.
6. Hay que depurar la responsividad del interfaz.

***

###Vers. 0.1 (en desarrollo)

**\- Aplicación de correcciones**
Se han aplicado las correcciones indicadas en la versión 0.

También se han realizado las siguientes correcciones sobre fallos detectados en el desarrollo:
1. Mejoras en la responsividad y aspecto de la página.
2. Corrección de un bug que eliminaba los "*" que indican los campos obligatorios al actualizar la tabla.
3. Corrección de un bug al borrar entradas de la tabla que falseaban los índices que relacionan las filas de la tabla con su posición en el array libreria.

**\- Implementación de consultas a la estructura de datos**

El usuario podrá rellenar uno o más campos del formulario y pulsar el botón "Consultar". Como resultado la tabla que muestra los elementos alamcenados será sustituida por una que muestre las entradas que contengan coincidencias con los datos introducidos.
Dicha tabla adjuntará un "mensaje" que indique que se trata de una consulta y no de los datos almacenados.
El **botón "Consultar"** sólo estará disponible si no hay ninguna fila seleccionada. En el momento de ser pulsado **cambiará el texto "Consultar" por "Volver"** de manera que al pulsarlo de nuevo se volverá al estado anterior a la consulta, es decir: formulario en blanco y la tabla mostrando el contenido de la estructura de datos.

**\- Testeo y correcciones**
1. Mejorar las indicaciones de los campos y botones mediante el uso del atributo HTML ==*title*==




