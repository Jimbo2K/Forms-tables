/*Fecha: 05/07/16
Descripcion: Código JS (JQuery) asociado a index.html para añadir funcionalidad a la página
Autores: Adrián Arteaga, Juan José Basco, Pablo Andueza, Pablo Garrido, Rubén Álvarez
Desarrollado con: Sublime Text 3 (editor) y JQuery*/

//Variables globales
var libreria =[];
//var seleccionado = false;


$(function(){
	//Inicialización de botones
	chequeaBotones();

	/******************* GESTIÓN DE EVENTOS *******************/
	//Cada vez que se escribe algo en el input se valida VISUALMENTE
	$("#isbn").bind("input change", function(){pulsado=true; validarIsbn();});

	//Cada vez que se escribe algo en el input se valida VISUALMENTE
	$("#titulo").bind("input change", function(){pulsado=true; validarTitulo();});

	//Cada vez que se escribe algo en el input se valida VISUALMENTE
	$("#autor").bind("input change", function(){pulsado=true; validarAutor();});

	//Cada vez que se escribe algo en el input se valida VISUALMENTE
	$("#anio").bind("input change", function(){pulsado=true; validarAnio();});

	//Cada vez que se escribe algo en el input se valida VISUALMENTE
	$("#editorial").bind("input change", function(){pulsado=true; validarAutor();});

	$('#anadir').click(function (){
		alta();
	});


	$('table').click(function(){
		if(Boolean($('.seleccionado')[0]) && pulsado === true){
			var r = confirm("Se perderan los datos modificados ¿esta usted absolutamente seguro de lo que hace?");
			if (r == true) {
				modificar();
			} 
		} else if(Boolean($('.seleccionado')[0]) && pulsado === false){
				modificar();
			}	
	});
	}
	// $('#modificar').click(function (){
	// 	modificar();
	// });
	$('#modificar').click(function(){
		//nos aseguramos que haya una línea seleccionada
		if(Boolean($('.seleccionado')[0]) && X=FALSE){modificar();}
	});

	// $('#borrar').click(function (){
	// 	borrar();
	// });
	$('#quitar').click(function(){
		//nos aseguramos que haya una línea seleccionada
		if(Boolean($('.seleccionado')[0])){borrar();}
	});
	
});
/******************** CONTROLAR LOS BOTONES ********************/

//Esta función comprueba si hay algún elemento con la clase seleccionado
//si lo hay habilita los botones y si no los deshabilita
function chequeaBotones(){
	var aux=Boolean($('.seleccionado')[0]);
	console.log(aux);
	//Si el array no está vacío Y hay un objeto con .seleccionado
	if (libreria.length!==0 && aux) {
		//añade la clase de Bootstrap disabled
		$('#modificar').removeClass('disabled');
		$('#quitar').removeClass('disabled');
	}else{
		$('#modificar').addClass('disabled');
		$('#quitar').addClass('disabled');
	}
}

// function pintaBotones(){

// 	var librosactuales = libreria.length;
// 	if(librosactuales > 0 && seleccionado === true) {
// 		console.log('botones on');
// 		$("#quitar").removeClass('disabled');
// 		$("#modificar").removeClass('disabled');
// 	} else {
// 		$("#quitar").addClass('disabled');
// 		$("#modificar").addClass('disabled');
// 		console.log('botones off');
// 	}
// }


/******************** PINTAR LA TABLA ********************/
//Se le pasa un objeto del array (un libro) y pinta una línea
function pintarLinea(pobj){
	$("#tableta").append('<tr class="linea" onclick="seleccionar(this);"><td>' + pobj.isbn + '</td>' + '<td>' + pobj.titulo + '</td>' + '<td>' + pobj.autor + '</td>' + '<td>' + pobj.anio + '</td>' + '<td>' + pobj.editorial + '</td>' + '<td class="oculto">' + pobj.indice + '</td></tr>');
}

//Esta función chequea el array y si no está vacío pinta la tabla
function actualizar() {
	//Al actualizar se deselecciona
	seleccionado=false;
	//chequeaBotones();
	//Si el array no está vacío
	if (libreria.length !== 0){
		var i;
		//Borro las filas de la tabla
		$('.linea').remove();
		//Recorro el array pintando las líneas
		for (i in libreria){
			pintarLinea(libreria[i]);
		}
		limpiaForm();
	} else {
		//Borro las filas de la tabla porque tiene que estar vacía
		$('.linea').remove();
		chequeaBotones();
	}
}

/******************** VALIDACIONES ********************/

function validarIsbn(){
	var reisbn=/^\s*(?:\d{9}[09xX]{1}|\d{13})\s*?/g;
	var visbn=($('#isbn').val()).trim();
	if(reisbn.test(visbn)){
		$('#isbn').css('border','1px solid black');
		$('#isbnnull').html('');
		return true;
	} else {
		$('#isbn').css('border','1px solid red');
		$('#isbnnull').html(' ISBN incorrecto: 10 ó 13 dígitos');
		return false;
	}
}

function validarTitulo(){
	var retitulo=/\w+/;
	var vtitulo=($('#titulo').val()).trim();
	if(retitulo.test(vtitulo)){
		$('#titulo').css('border','1px solid black');
		$('#titulonull').html('');
		return true;
	} else {
		$('#titulo').css('border','1px solid red');
		$('#titulonull').html(' Título incorrecto');
		return false;
	}
}

function validarAutor(){
	var vautor=($('#autor').val()).trim();
	if(vautor!==''){
		$('#autor').css('border','1px solid black');
		$('#autornull').html('');
		return true;
	} else {
		$('#autor').css('border','1px solid orange');
		$('#autornull').html(' Autor vacío');
		return false;
	}
}

function validarAnio(){
	var reanio=/\d{4}/;
	var vanio=($('#anio').val()).trim();
	if(reanio.test(vanio)){
		$('#anio').css('border','1px solid black');
		$('#anionull').html('');
		return true;
	} else {
		$('#anio').css('border','1px solid orange');
		$('#anionull').html(' Año publ. incorrecto: 4 dígitos');
		return false;
	}
}

function validarEditorial(){
	var veditorial=($('#editorial').val()).trim();
	if(veditorial!==''){
		$('#editorial').css('border','1px solid black');
		$('#editorialnull').html('');
		return true;
	} else {
		$('#editorial').css('border','1px solid orange');
		$('#editorialnull').html(' Editorial vacía');
		return false;
	}
}

//Esta función se llama desde los botones añadir y modificar
function validar(){
	var aux1,aux2,aux3,aux4,aux5,salida={};
	//lo primero asigno el indice oculto
	salida.indice=$('#oculto').val();
	//validar isbn aux1
	aux1=validarIsbn();
	salida.isbn=(aux1 ? $('#isbn').val() : '');
	//validar titulo aux2
	aux2=validarTitulo();
	salida.titulo=(aux2 ? $('#titulo').val() : '');
	//validar autor aux3
	aux3=validarAutor();
	salida.autor=(aux3 ? $('#autor').val() : '');
	//validar año aux4
	aux4=validarAnio();
	salida.anio=(aux4 ? $('#anio').val() : '');
	//validar editorial aux5
	aux5=validarEditorial();
	salida.editorial=(aux5 ? $('#editorial').val() : '');
	//Validacion global
	//Si los campos obligaotios CUMPLEN
	if (aux1 && aux2){
		//Si también cumple el resto
		if (aux3 && aux4 && aux5) {
			return salida;
		}
		//Si el resto no cumple
		else{
			if (confirm('Hay datos incorrectos, ¿desea continuar?')){
				return salida;
			} else {
				return null;
			}
		}
	}
	//Si los campos obligatorios NO CUMPLEN
	else {
		return null;
	}
}

//Esta función es para comprobar si el ISBN esta repetido o no

function compararisbn(numisbn) {
	extensionlibre = libreria.length;
	x = 0;
	for (i=0; i<extensionlibre; i++) {
	if (libreria[i]['isbn'] == numisbn) {
			x = 1;
		}
	}
	if (x == 1)	{
		return false;
	} else {
		return true;
	}
}

/******************** SELECCIONAR DE LA TABLA ********************/

//Deja el formulario en blanco y elimina los errores
//La utilizan: seleccionar, atualizar
function limpiaForm(){
	$('input').val('');
	$('input').css('border', '1px solid black');
	$('span').html('');
}

//pobj corresponde al <tr> sobre el que se ha hecho click
function seleccionar(pobj){
	//Si la línea está seleccionada la deselecciono
	if ((pobj.getAttribute('class')).indexOf('seleccionado')!==-1) {
		$(pobj).removeClass('seleccionado');
		limpiaForm();
		//Para que funcione pintaBotones()
		//seleccionado=false;
	}
	//En caso contrario
	else {
		//Deselecciono cualquier tr (le quito la clase 'seleccionado')
		$('tr').removeClass('seleccionado');
		//Selecciono el clickado
		$(pobj).addClass('seleccionado');
		var i,arraux=[];
		//en un array auxiliar cargo el contenido de cada celda de la línea .seleccionado
		for (i=1;i<=6;i++){
			arraux.push($('.seleccionado :nth-of-type(' + i + ')').text());
		}
		//Paso el contenido de cada celda a los inputs del formulario
		$('#isbn').val(arraux[0]);
		$('#titulo').val(arraux[1]);
		$('#autor').val(arraux[2]);
		$('#anio').val(arraux[3]);
		$('#editorial').val(arraux[4]);
		$('#oculto').val(arraux[5]);
		//Para que funcione pintaBotones()
		//seleccionado=true;
	}
	chequeaBotones();
}

/*Función alternativa seleccionar*/
// function seleccionar(pobj){
// 		console.log(pobj);
// 		if ((pobj.getAttribute('class')).indexOf('seleccionado')!==-1) {
// 			$(pobj).removeClass('seleccionado');
// 			limpiaForm();
// 		}
// 		else {
// 			$('tr').removeClass('seleccionado');
// 			$(pobj).addClass('seleccionado');
// 			$("#isbn").val($(".seleccionado :nth-of-type(1)").text());
// 		 	$("#titulo").val($(".seleccionado :nth-of-type(2)").text());
// 		 	$('#autor').val($(".seleccionado :nth-of-type(3)").text());
// 		 	$('#anio').val($(".seleccionado :nth-of-type(4)").text());
// 			$('#editorial').val($(".seleccionado :nth-of-type(5)").text());
// 		 	$('#oculto').val($(".seleccionado :nth-of-type(6)").text());
// 		}
// 		chequeaBotones();
// 	}

/******************** ACCIONES ASOCIADAS A LOS BOTONES ********************/

function alta() {
	$('#oculto').val(libreria.length);
	nuevodato = validar();
	if (nuevodato) {		
		librosactuales = libreria.length;
		libreria[librosactuales] = nuevodato;
	} else {
		alert('Los datos introducidos no son válidos');
	}
	actualizar();
}

function modificar() {
	nuevodato = validar();
	if (nuevodato) {
		//El atributo indice de nuevo dato contiene el índice para almacenar en el array
		libroactual = nuevodato.indice;
		libreria[libroactual] = nuevodato;
	} else {
		alert('Los datos introducidos no son válidos');
	}
	actualizar();
}

function borrar() {
	var libroaborrar = $("#oculto").val();
	console.log('libreria original: ' + libreria);
	console.log('indice de borrado: ' + libroaborrar);
	libreria.splice(libroaborrar, 1);
	console.log('libreria a actualizar: ' + libreria);
	actualizar();
}

/******************** FUNCIONES PARA DESARROLLO ********************/

// función para crear pruebas en el html BORRAR cuando funcione BORRAR BORRAR BORRAR
function probartabla() {
	var relleno = {isbn:"6969696969",titulo:"jquery mola", autor:"unas",anio:"1979",editorial:"veces o más"};
	var contenido = '<tr class="linea" onclick="seleccionar(this);"><td>' + relleno.isbn + '</td>' + '<td>' +relleno.titulo + '</td>' + '<td>' + relleno.autor + '</td>' + '<td>' + relleno.anio + '</td>' + '<td>' + relleno.editorial + '</td>' + '<td class="oculto">' + relleno.indice + '</td></tr>';
	$("#tableta").append(contenido);
	libreria.push(relleno);
}


function numeroAzar(){
	var a=Math.round((Math.random() * 10));
	return a;
}
//Constructor de objetos: libro
function libro(indice,isbn,titulo,autor,anio,editorial){
	this.indice=indice;
	this.isbn=isbn;
	this.titulo=titulo;
	this.autor=autor;
	this.anio=anio;
	this.editorial=editorial;
}
//Array con 10 objetos predefinidos
var libreriaaux=[new libro(),new libro(),new libro(),new libro(),new libro(),new libro(),new libro(),new libro(),new libro(),new libro(),];
//Funcion que genera una lista aleatoria de libros
function arrayAleatorio(){
	var arrisbn=['1234567890','1234567890123','1111111111','1212121212123','1452367890','9999999999999','4561597534','9513576546','2584561597','7531598526'];
	var arrtitulo=['JQuery y tú','El linter, tu gran amigo','100 razones para odiar IE','Oda al pantallazo azul','El Señor de los gramillos','Mucho ruido y pocos altramuces','LSD y programación','10 pasos para desengancharte del código','Guerra y Paz III','Cumbres con nubes y claros'];
	var arrautor=['Guillermo Puertas','Java El Hutt','León Tostón','Alan Turning','Adrián Arteaga', 'Juan José Basco', 'Pablo Andueza','Pablo Garrido','Rubén Álvarez','Chespirito'];
	var arranio=['1234','5678','9123','2016','1975','1981','1732','2222','1997','2010'];
	var arreditorial=['Satelite','Bruguerra','Chonibooks','Mocosoft','Ran-Ma','Livros pa\' que','Editorial','Exoplaneta','Macgrou Jill','Salbamé Delujs'];
	var i;
	for (i=0; i<10;i++){
		libreriaaux[i].indice=i;
		libreriaaux[i].isbn=arrisbn[numeroAzar()];
		libreriaaux[i].titulo=arrtitulo[numeroAzar()];
		libreriaaux[i].autor=arrautor[numeroAzar()];
		libreriaaux[i].anio=arranio[numeroAzar()];
		libreriaaux[i].editorial=arreditorial[numeroAzar()];
	}
	libreria=libreriaaux;
	actualizar();
}
