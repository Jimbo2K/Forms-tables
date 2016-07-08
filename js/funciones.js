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
	$("#isbn").bind("input change", validarIsbn);

	//Cada vez que se escribe algo en el input se valida VISUALMENTE
	$("#titulo").bind("input change", validarTitulo);

	//Cada vez que se escribe algo en el input se valida VISUALMENTE
	$("#autor").bind("input change", validarAutor);

	//Cada vez que se escribe algo en el input se valida VISUALMENTE
	$("#anio").bind("input change", validarAnio);

	//Cada vez que se escribe algo en el input se valida VISUALMENTE
	$("#editorial").bind("input change", validarEditorial);

	$('#anadir').click(function (){
		//Si hay algo seleccionado no se puede añadir
		if(!Boolean($('.seleccionado')[0])){alta();}
	});

	// $('#modificar').click(function (){
	// 	modificar();
	// });
	$('#modificar').click(function(){
		//nos aseguramos que haya una línea seleccionada
		if(Boolean($('.seleccionado')[0])){modificar();}
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
	//Si el array no está vacío Y hay un objeto con .seleccionado
	if (libreria.length!==0 && aux) {
		//añade la clase de Bootstrap disabled
		$('#modificar').removeClass('disabled');
		$('#quitar').removeClass('disabled');
		$('#anadir').addClass('disabled');
	}else{
		$('#modificar').addClass('disabled');
		$('#quitar').addClass('disabled');
		$('#anadir').removeClass('disabled');
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

function calculaIsbn10(pisbn){
	var i, cod=0, aux;
	aux=pisbn.toLowerCase();
	for (i=0; i<(aux.length-1);i++){
		cod = cod + Number(aux[i])*(i+1);
	}
	cod=cod%11;
	if (cod==10){cod='x';}
	if(cod==aux[aux.length-1]){
		return true;
	} else {
		return false;
	}
}

function calculaIsbn13(pisbn){
	var j,cod=0;
	for (j=1;j<=12;j=j+2){
		cod=cod + Number(pisbn[j])*3 + Number(pisbn[j-1]);
	}
	cod=10-(cod%10);
	if(cod==Number(pisbn[pisbn.length-1])){
		return true;
	} else {
		return false;
	}
}

//FUNCIÓN SÓLO PARA DESARROLLO: daodas9 dígitos calcula el cod de ISBN
function dame10cod(pisbn){
	var i,cod=0;
	var aux=pisbn;
	for (i=0; i<(aux.length);i++){
		cod = cod + Number(aux[i])*(i+1);
	}
	cod=cod%11;
	if (cod==10){cod='x';}
	return cod;
}
function dame13cod(pisbn){
	var j,cod=0;
	for (j=1;j<=12;j=j+2){
		cod=cod + Number(pisbn[j])*3 + Number(pisbn[j-1]);
	}
	cod=10-(cod%10);
	return cod;
}

function contarNumeros(pisbn) {
	 var cuentaNumeros = pisbn.length;
	 var salida;
	 if (cuentaNumeros === 10) {
	 	salida = calculaIsbn10(pisbn);
	 }
	 else if (cuentaNumeros === 13) {
	 	salida = calculaIsbn13(pisbn);
	 }
	 return salida;
}

function compararisbn(numisbn) {
	var extensionlibre = libreria.length;
	var x = 0;
	for (var i=0; i<extensionlibre; i++) {
		console.log('array['+i+'] '+libreria[i].isbn+' ISBN: '+numisbn);
		if (libreria[i].isbn == numisbn) {
			x = 1;
			break;
		}
	}
	if (x == 1)	{
		console.log('coincidencia: false');
		$('#isbnnull').html('Ya existe una entrada con este ISBN');
		salida = false;
		$('#isbn').css('border','1px solid red');
		return false;
	} else {
		console.log('no coincidencia: true');
		return true;
	}
}

function validarIsbn(){
	var mensaje='',salida;
	var reisbn=/^\s*(?:\d{9}[0-9xX]{1}|\d{13})\s*?/g;
	var visbn=($('#isbn').val()).trim();
	if(reisbn.test(visbn)){
		visbn.toLowerCase();
		if (contarNumeros(visbn)){
				$('#isbn').css('border','1px solid black');
				salida=true;
		}else{
			mensaje='ISBN inválido, nro. de control incorrecto';
			$('#isbn').css('border','1px solid red');
			salida=false;
		}
	} else {
		$('#isbn').css('border','1px solid red');
		mensaje='Formato de ISBN inválido 10/13 dígitos';
		$('#isbn').css('border','1px solid red');
		salida = false;
	}
		$('#isbnnull').html(mensaje);
		return salida;
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
	if ($('#oculto').val()===undefined){
		salida.indice=libreria.length;
	} else {
		salida.indice=$('#oculto').val();
	}
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

/******************** SELECCIONAR DE LA TABLA ********************/

//Deja el formulario en blanco y elimina los errores
//La utilizan: seleccionar, atualizar
function limpiaForm(){
	$('input').val('');
	$('input').css('border', '1px solid black');
	$('span').html('');
}

//Esta función monta un objeto con el contenido de los campos del formulario sin validacion
function objFormulario(){
	var salida={};
	//lo primero asigno el indice oculto
	if ($('#oculto').val()===undefined){
		salida.indice=libreria.length;
	} else {
		salida.indice=$('#oculto').val();
	}
	salida.isbn=$('#isbn').val();
	salida.titulo=$('#titulo').val();
	salida.autor=$('#autor').val();
	salida.anio=$('#anio').val();
	salida.editorial=$('#editorial').val();
	return salida;
}

function formNoVacio(){
	var cadena=$('#isbn').val()+$('#titulo').val()+$('#autor').val()+$('#anio').val()+$('#editorial').val();
	console.log('cadena: '+ cadena);
	if(cadena === ''){return false;}else{return true;}
}

//pobj corresponde al <tr> sobre el que se ha hecho click
function seleccionar(pobj){
	var user;
	//Si la línea está seleccionada la deselecciono
	if ((pobj.getAttribute('class')).indexOf('seleccionado')!==-1) {
		$(pobj).removeClass('seleccionado');
		limpiaForm();
		//Para que funcione pintaBotones()
		//seleccionado=false;
	}
	//En caso contrario
	else {
		var contenidoForm=objFormulario();
		if ((contenidoForm!==libreria[contenidoForm.indice]) && formNoVacio()){
			user=confirm('Si realiza una nueva selección perderá los cambios \n ¿Desea continuar?');
		} else {
			user=true;
		}
		if (user){
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
	var nuevodato = validar();
	//La validación global de ISBN sólo comprueba el número, antes de añadirlo al array
	//hay que ver si ya existe un elemento con ese ISBN
	var aux=compararisbn($('#isbn').val());
	if (nuevodato && aux) {
		librosactuales = libreria.length;
		libreria[librosactuales] = nuevodato;
		actualizar();
	} else {
		alert('Los datos introducidos no son válidos');
	}
}

function modificar() {
	//Al modificar no hay que comprobar si el elemento tiene el mismo ISBN porque es él mismo
	nuevodato = validar();
	if (nuevodato) {
		//El atributo indice de nuevo dato contiene el índice para almacenar en el array
		libroactual = nuevodato.indice;
		console.log('indice cargado: '+nuevodato.indice);
		libreria[libroactual] = nuevodato;
		actualizar();
	} else {
		alert('Los datos introducidos no son válidos');
	}
	chequeaBotones();
}

function borrar() {
	var libroaborrar = $("#oculto").val();
	libreria.splice(libroaborrar, 1);
	actualizar();
}

/******************** FUNCIONES PARA DESARROLLO ********************/

// función para crear pruebas en el html BORRAR cuando funcione BORRAR BORRAR BORRAR
function probartabla() {
	var relleno = {isbn:"6969696969",titulo:"jquery mola", autor:"unas",anio:"1979",editorial:"veces o más"};
	var contenido = '<tr class="linea" onclick="seleccionar(this);"><td>' + relleno.isbn + '</td>' + '<td>' +relleno.titulo + '</td>' + '<td>' + relleno.autor + '</td>' + '<td>' + relleno.anio + '</td>' + '<td>' + relleno.editorial + '</td>' + '<td class="oculto">' + relleno.indice + '</td></tr>';
	$("#tableta").append(contenido);
}


function numeroAzar(){
	var a=Math.round((Math.random() * 10));
	if(a===10){a=9;}
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
	var arrisbn=['123456789X','1234567890128','1111111111116','1212121212128','1452367892','9999999999','4561597530','951357654x','258456159x','7531598523'];
	var arrtitulo=['JQuery y tú','El linter, tu gran amigo','100 razones para odiar IE','Oda al pantallazo azul','El Señor de los gramillos','Mucho ruido y pocos altramuces','LSD y programación','10 pasos para desengancharte del código','Guerra y Paz III','Cumbres con nubes y claros'];
	var arrautor=['Guillermo Puertas','Java El Hutt','León Tostón','Alan Turning','Adrián Arteaga', 'Juan José Basco', 'Pablo Andueza','Pablo Garrido','Rubén Álvarez','Chespirito'];
	var arranio=['1234','5678','9123','2016','1975','1981','1732','2222','1997','2010'];
	var arreditorial=['Satelite','Bruguerra','Chonibooks','Mocosoft','Ran-Ma','Livros pa\' que','Editorial','Exoplaneta','Macgrou Jill','Salbamé Delujs'];
	var i;
	for (i=0; i<10;i++){
		libreriaaux[i].indice=i;
		libreriaaux[i].isbn=arrisbn[i];
		libreriaaux[i].titulo=arrtitulo[numeroAzar()];
		libreriaaux[i].autor=arrautor[numeroAzar()];
		libreriaaux[i].anio=arranio[numeroAzar()];
		libreriaaux[i].editorial=arreditorial[numeroAzar()];
	}
	libreria=libreriaaux;
	actualizar();
}
