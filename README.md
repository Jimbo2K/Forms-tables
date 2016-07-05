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
* Adrián
* Juan
* Pablo A
* Pablo Garrido
* Rubén