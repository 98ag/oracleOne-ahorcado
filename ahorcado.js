//Botones
let botonIniciarJuego = document.getElementById("boton-iniciar");
let botonAgregarPalabra = document.getElementById("boton-agregar");

let botonGuardarPalabra = document.getElementById("boton-guardar-palabra");
let botonCancelar = document.getElementById("boton-cancelar");

let botonNuevoJuego = document.getElementById("boton-nuevo-juego");
let botonRendirse = document.getElementById("boton-rendirse");	

//Areas de texto
let areaNuevaPalabra = document.getElementById("area-nueva-palabra");
let areaPalabraSecreta = document.getElementById("area-palabra-secreta");
let areaLetrasErroneas = document.getElementById("area-letras-erroneas");

//Secciones (para control de display)
let seccionInicio = document.getElementById("seccion-inicio");
let seccionAgregado = document.getElementById("seccion-agregado");
let seccionJuego = document.getElementById("seccion-juego");

//Elementos del dibujo de la horca
let cabezaHorca = document.getElementById("ahorcado-cabeza");
let cuerpoHorca = document.getElementById("ahorcado-cuerpo");
let brazoIzqHorca = document.getElementById("ahorcado-brazo-izq");
let brazoDerHorca = document.getElementById("ahorcado-brazo-der");
let piernaIzqHorca = document.getElementById("ahorcado-pierna-izq");
let piernaDerHorca = document.getElementById("ahorcado-pierna-der");

//Variables
let nuevaPalabra = "";
let palabras = ["AUTO", "PERRO", "CASA"];
let palabraSecreta;
let palabraSecretaMostrar;
let letrasErroneas = "";
let vidas;

/*
***********************************************************************
*/

function revisarTecla(tecla){
	if(tecla >= "a" && tecla <= "z" && tecla.length === 1){
		return tecla.toUpperCase();
	}
	else if (tecla >= "A" && tecla <= "Z" && tecla.length === 1){
		return tecla;
	}
	else{
		return false;
	}
}

/*
******************* Seccion nueva palabra *****************************
*/

function controlNuevaPalabra(e){
	let letraPresionada = revisarTecla(e.key);
	let largo = nuevaPalabra.length;
	if (letraPresionada	&& largo < 8){
		nuevaPalabra += letraPresionada;
		areaNuevaPalabra.innerHTML = nuevaPalabra;
	}
	else if (e.key == "Backspace" && largo > 0){
		nuevaPalabra = nuevaPalabra.slice(0, largo - 1);
		areaNuevaPalabra.innerHTML = nuevaPalabra;
	}
}

function agregarPalabra(){
	seccionInicio.style.display = "none";
	seccionAgregado.style.display = "flex";
	document.addEventListener('keydown', controlNuevaPalabra);
}

function controlGuardarPalabra(){
	if (nuevaPalabra.length > 0 && !(palabras.includes(nuevaPalabra))){
		palabras.push(nuevaPalabra);
		nuevaPalabra = "";
		areaNuevaPalabra.innerHTML = nuevaPalabra;
	}

	else{
		nuevaPalabra = "";
		areaNuevaPalabra.innerHTML = "";
	}
}

function controlBotonCancelar(){
	areaNuevaPalabra.innerHTML = nuevaPalabra = "";
	document.removeEventListener('keydown', controlNuevaPalabra);
	seccionInicio.style.display = "flex";
	seccionAgregado.style.display = "none";
}

/*
************************ Seccion juego ********************************
*/

function crearPalabraSecreta(){
	palabraSecreta = (palabras[Math.floor(Math.random() * palabras.length)]).toUpperCase();
	palabraSecretaMostrar = "";
	for (let i = 0; i < palabraSecreta.length; i++){
		palabraSecretaMostrar += "_";
	}
	areaPalabraSecreta.innerHTML = palabraSecretaMostrar;
}

function iniciarJuego(){
	seccionInicio.style.display = "none";
	seccionJuego.style.display = "flex";
	crearPalabraSecreta();
	vidas = 6;
	dibujarHorca(vidas);
	areaLetrasErroneas.innerHTML = letrasErroneas = "";
	botonRendirse.innerHTML = "Rendirse";
	document.addEventListener('keydown', controlJuego);	
}

function controlBotonRendirse(){
	if (palabraSecreta == palabraSecretaMostrar || vidas == 0){
		seccionJuego.style.display = "none";
		seccionInicio.style.display = "flex";		
	}
	else if (vidas != 0){
		vidas = 0;
		document.removeEventListener('keydown' , controlJuego);
		dibujarHorca(vidas);
		areaPalabraSecreta.innerHTML = palabraSecreta;
		botonRendirse.innerHTML = "Menu Principal";
	}
}

function controlJuego(e){
	let letraPresionada = revisarTecla(e.key);
	if ((letraPresionada)){
		if (palabraSecreta.includes(letraPresionada)){
			let indiceABuscar = palabraSecreta.indexOf(letraPresionada);
			while (indiceABuscar != -1){				
				palabraSecretaMostrar = palabraSecretaMostrar.slice(0, indiceABuscar) + letraPresionada + palabraSecretaMostrar.slice(indiceABuscar + 1);
				indiceABuscar = palabraSecreta.indexOf(letraPresionada, indiceABuscar + 1);
			}
			areaPalabraSecreta.innerHTML = palabraSecretaMostrar;
		}
		else if (!(letrasErroneas.includes(letraPresionada))){			
			vidas--;
			letrasErroneas += letraPresionada;
			areaLetrasErroneas.innerHTML = letrasErroneas;
			dibujarHorca(vidas);
		}
	}

	if (vidas == 0 || palabraSecreta == palabraSecretaMostrar){
		document.removeEventListener('keydown' , controlJuego);
		botonRendirse.innerHTML = "Menu Principal";
	}
}

function dibujarHorca(vidas){
	switch(vidas){
		case 5:
			cabezaHorca.style.visibility = 'visible';
			return;
		case 4:
			cuerpoHorca.style.visibility = 'visible';
			return;
		case 3:
			brazoIzqHorca.style.visibility = 'visible';
			return;
		case 2: 
			brazoDerHorca.style.visibility = 'visible';
			return;
		case 1: 
			piernaIzqHorca.style.visibility = 'visible';
			return;
		case 0:
			cabezaHorca.style.visibility = 'visible';
			cuerpoHorca.style.visibility = 'visible';
			brazoIzqHorca.style.visibility = 'visible';
			brazoDerHorca.style.visibility = 'visible';
			piernaIzqHorca.style.visibility = 'visible';
			piernaDerHorca.style.visibility = 'visible';
			return;
		default:
			cabezaHorca.style.visibility = 'hidden';
			cuerpoHorca.style.visibility = 'hidden';
			piernaDerHorca.style.visibility = 'hidden';
			piernaIzqHorca.style.visibility = 'hidden';
			brazoDerHorca.style.visibility = 'hidden';
			brazoIzqHorca.style.visibility = 'hidden';
			return;
	}
}

/*
********************** Seccion botones *****************************
*/

botonAgregarPalabra.onclick = agregarPalabra;
botonCancelar.onclick = controlBotonCancelar;
botonGuardarPalabra.onclick = controlGuardarPalabra;

botonIniciarJuego.onclick = iniciarJuego;
botonRendirse.onclick = controlBotonRendirse;
botonNuevoJuego.onclick = iniciarJuego;



