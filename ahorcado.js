let botonIniciarJuego = document.getElementById("boton-iniciar");
let botonAgregarPalabra = document.getElementById("boton-agregar-palabra");
let botonGuardarPalabra = document.getElementById("boton-guardar-palabra");
let areaNuevaPalabra = document.getElementById("area-nueva-palabra");
let areaPalabraSecreta = document.getElementById("area-palabra-secreta");
let areaLetrasErroneas = document.getElementById("area-letras-erroneas");

let areaHorca = document.getElementById("imagen-horca");
let baseHorca = document.getElementById("base-horca");
let cabezaHorca = document.getElementById("ahorcado-cabeza");
let cuerpoHorca = document.getElementById("ahorcado-cuerpo");
let brazoIzqHorca = document.getElementById("ahorcado-brazo-izq");
let brazoDerHorca = document.getElementById("ahorcado-brazo-der");
let piernaIzqHorca = document.getElementById("ahorcado-pierna-izq");
let piernaDerHorca = document.getElementById("ahorcado-pierna-der");

let palabras = ["auto", "perro", "casa"];
let palabraSecreta, vidas;
let palabraSecretaMostrar;
let letrasErroneas = [];


function agregarPalabra(){
	palabras.push(areaNuevaPalabra.value);
	areaNuevaPalabra.value = "";
	areaNuevaPalabra.focus();
}

function crearPalabraSecreta(){
	palabraSecreta = (palabras[Math.floor(Math.random() * palabras.length)]).toUpperCase();
	console.log(palabraSecreta);
	for (let i = 0; i < palabraSecreta.length; i++){
		palabraSecretaMostrar += "_";
	}
	areaPalabraSecreta.innerHTML = palabraSecretaMostrar;
}

function iniciarJuego(){
	palabraSecreta = "";
	palabraSecretaMostrar = "";
	crearPalabraSecreta();
	vidas = 5;
	dibujarHorca(vidas);
	document.addEventListener('keypress', revisarTeclaPresionada);
	areaLetrasErroneas.innerHTML = "";
}

function revisarTeclaPresionada(e){
	let letraCodigo = e.charCode;	
	letraCodigo -= 32;

	if (letraCodigo >= 65 && letraCodigo <= 90){
		let letraPresionada = String.fromCharCode(letraCodigo);

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
			letrasErroneas.push(letraPresionada);
			areaLetrasErroneas.innerHTML = String(letrasErroneas);
			dibujarHorca(vidas);
		}
	}

	if (vidas == 0 || palabraSecreta == palabraSecretaMostrar){
		console.log("Terminado");
		letrasErroneas = [];
		document.removeEventListener('keypress' , revisarTeclaPresionada);
		botonIniciarJuego.innerHTML = "Iniciar nuevo juego";
		return;
	}
}

function dibujarHorca(vidas){
	switch(vidas){
		case 4:
			areaHorca.style.visibility = 'visible';
			baseHorca.style.visibility = 'visible';
			return;
		case 3:
			cabezaHorca.style.visibility = 'visible';
			return;
		case 2:
			cuerpoHorca.style.visibility = 'visible';
			return;
		case 1: 
			piernaDerHorca.style.visibility = 'visible';
			piernaIzqHorca.style.visibility = 'visible';
			return;
		case 0: 
			brazoDerHorca.style.visibility = 'visible';
			brazoIzqHorca.style.visibility = 'visible';
			return;
		default:
			areaHorca.style.visibility = 'hidden';
			baseHorca.style.visibility = 'hidden';
			cabezaHorca.style.visibility = 'hidden';
			cuerpoHorca.style.visibility = 'hidden';
			piernaDerHorca.style.visibility = 'hidden';
			piernaIzqHorca.style.visibility = 'hidden';
			brazoDerHorca.style.visibility = 'hidden';
			brazoIzqHorca.style.visibility = 'hidden';
	}
}


botonGuardarPalabra.onclick = agregarPalabra;
botonIniciarJuego.onclick = iniciarJuego;



