let numeroAleatorio;
let intentosTotales = 5;
let intentoActual = 0;

let puntaje = 0;

let numerosGenerados = [];
let acierto = 0;
let fallas = 0;
let cantidadN;
let digitos;



cantidadN = parseInt(localStorage.getItem("cantidad"));
digitos = parseInt(localStorage.getItem("digitos"));




let nombreJugador = localStorage.getItem("nombre");
const etiquetaNombre = document.getElementById("nombreJugador");
etiquetaNombre.innerHTML = nombreJugador;


function guardarOpciones() {
    let nombre = document.getElementById("nombreJugador").value;
    let digitos = parseInt(document.getElementById("digitos").value);
    let cantidad = parseInt(document.getElementById("cantidadN").value);

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("digitos", digitos);
    localStorage.setItem("cantidad", cantidad);

    window.location.href = "juego.html";
}

function DeTresDigitos() {
    const min = 100;
    const max = 999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function DeCuatroDigitos() {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function DeCincoDigitos() {
    const min = 10000;
    const max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function iniciarJuego() {
    limpiarPantalla()
    inicio();


    numerosGenerados = [];

    for (let num = 0; num < cantidadN; num++) {

        if (digitos === 3) numeroAleatorio = DeTresDigitos();
        else if (digitos === 4) numeroAleatorio = DeCuatroDigitos();
        else if (digitos === 5) numeroAleatorio = DeCincoDigitos();

        numerosGenerados.push(numeroAleatorio);
    }

    const elemento = document.getElementById("numeroAleatorio");

    elemento.style.display = "block";
    elemento.style.visibility = "visible";
    elemento.innerHTML = numerosGenerados.join(" ");

    // Ocultar a los 3 segundos
    setTimeout(() => {
        elemento.style.visibility = "hidden";
    }, 6000);
}

function verificar() {

    let respuesta = document.getElementById("arrRespuesta").value.trim();
    let arrRespuesta = respuesta.split(" ").map(num => parseInt(num));

    let correcto = JSON.stringify(arrRespuesta) === JSON.stringify(numerosGenerados);

    const mensaje = document.getElementById("correctos");

    if (correcto) {
        mensaje.innerHTML = "¡Correcto! Ganaste 10 puntos.";
        puntaje += 10;
        acierto = acierto + 1;
    } else {
        mensaje.innerHTML = "Incorrecto. Intenta nuevamente.";
        fallas = fallas + 1;
    }
    document.getElementById("aciertos").innerHTML = acierto;
    document.getElementById("fallas").innerHTML = fallas;
    document.getElementById("puntaje").innerHTML = puntaje;
}

function siguienteIntento() {

    intentoActual++;

    if (intentoActual < intentosTotales) {

        document.getElementById("arrRespuesta").value = "";
        document.getElementById("correctos").innerHTML = "";

        iniciarJuego();

    } else {

        document.getElementById("correctos").innerHTML =
            "🎉 Juego terminado. Puntaje final:" + puntaje;

        document.getElementById("numeroAleatorio").innerHTML = "";
        document.getElementById("arrRespuesta").disabled = true;

        const btn = document.getElementById("btnSiguiente");
        if (btn) btn.disabled = true;



        // Modal
        document.getElementById("modalJugador").textContent =
            document.getElementById("nombreJugador").textContent;

        document.getElementById("modalAciertos").textContent =
            document.getElementById("aciertos").textContent;

        document.getElementById("modalFallas").textContent =
            document.getElementById("fallas").textContent;

        document.getElementById("modalPuntaje").textContent =
            document.getElementById("puntaje").textContent;

        // Mostrar modal
        document.getElementById("modal").style.display = "block";
    }

    // Actualizar contador de ronda
    let contador = intentoActual + 1;
    document.getElementById("intentosRestantes").innerHTML =
        contador + " / " + intentosTotales;
}




function inicio() {
    let tiempo = 5;
    const contadorElemento = document.getElementById("contador");

    // Asegurarse de que el elemento sea visible
    contadorElemento.style.display = "block";
    contadorElemento.style.visibility = "visible";

    const intervalo = setInterval(() => {
        contadorElemento.innerText = tiempo;
        tiempo--;

        if (tiempo < 0) {
            clearInterval(intervalo);
            contadorElemento.innerText = "¡Tiempo terminado!";


            // Ocultar el letrero después de 3 segundos (3000 ms)
            setTimeout(() => {
                contadorElemento.style.visibility = "hidden";

            }, 3000);


        }
    }, 1000);
}

function limpiarPantalla() {
    const contadorElemento = document.getElementById("contador");
    contadorElemento.innerText = "";
    contadorElemento.style.visibility = "hidden";
}


// Activa el sonido cuando el usuario haga el primer click
window.addEventListener("click", activarSonido, { once: true });

function activarSonido() {
    const musica = document.getElementById("musicaFondo");

    if (!musica) {
        console.error("⚠ No se encontró el elemento <audio id='musicaFondo'>");
        return;
    }

    musica.muted = false;    // activar sonido
    musica.volume = 0.5;     // volumen moderado
    musica.play();           // reproducir (si estaba pausado)
}


const modal = document.getElementById("modal");
const btnAbrir = document.getElementById("btnAbrirModal");
const btnCerrar = document.getElementById("cerrarModal");

btnAbrir.addEventListener("click", () => {
    // Llena los datos del modal
    document.getElementById("modalJugador").textContent =
        document.getElementById("nombreJugador").textContent;

    document.getElementById("modalAciertos").textContent =
        document.getElementById("aciertos").textContent;

    document.getElementById("modalFallas").textContent =
        document.getElementById("fallas").textContent;

    document.getElementById("modalPuntaje").textContent =
        document.getElementById("puntaje").textContent;

    modal.style.display = "block";
});

btnCerrar.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
