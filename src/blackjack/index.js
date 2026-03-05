import {
  mostrarImgCarta,
  pedirCarta,
  createDeck,
  acumularPuntos,
  insertarPuntajeHTML,
} from "./usecases";

let deck = [];
const tipos = ["C", "D", "H", "S"],
  especiales = { A: 1, J: 11, Q: 12, K: 13 };
const inicializarJuego = (numJugadores = 2) => {
  puntosJugadores = [];
  deck = createDeck(tipos, especiales);
  barajarFisherYates();

  for (let i = 0; i < numJugadores; i++) {
    puntosJugadores.push(0);
  }
  limpiarTablero();
};

const btnPedir = document.querySelector("#btnPedir"),
  btnDetener = document.querySelector("#btnDetener"),
  btnNuevo = document.querySelector("#btnNuevo");

const [puntosJugadorHTML, puntosComputadoraHTML] =
  document.querySelectorAll("strong");

const jugadorCartas = document.querySelector("#jugador-cartas"),
  computadoraCartas = document.querySelector("#computadora-cartas");

let puntosJugadores = [];

function barajar(deck = []) {
  const barajadas = 7;
  const cantidadCartas = deck.length - 1;
  for (let i = 0; i < deck.length * barajadas; i++) {
    let numeroAleatorio = Math.round(Math.random() * cantidadCartas);
    const carta = deck.splice(numeroAleatorio, 1);

    deck.push(carta[0]);
  }
}

function barajarFisherYates() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // swap
  }
}

btnNuevo.addEventListener("click", () => {
  inicializarJuego();
});
function limpiarTablero() {
  puntosJugadorHTML.innerHTML = "0";
  puntosComputadoraHTML.innerHTML = "0";
  computadoraCartas.innerHTML = "";
  jugadorCartas.innerHTML = "";
  btnDetener.disabled = true;
  btnPedir.disabled = false;
  btnNuevo.disabled = true;
}
btnDetener.addEventListener("click", () => {
  btnDetener.disabled = true;
  btnPedir.disabled = true;
  turnoComputadora(puntosJugadores[0]);
});
btnPedir.addEventListener("click", () => {
  btnDetener.disabled = false;
  btnNuevo.disabled = false;
  const carta = pedirCarta(deck);
  puntosJugadores[0] = acumularPuntos(carta, puntosJugadores[0]);
  insertarPuntajeHTML(puntosJugadorHTML, puntosJugadores[0]);
  mostrarImgCarta(carta, jugadorCartas);
  calcularPuntajeJuego(puntosJugadores[0]);
});
function calcularPuntajeJuego(puntos) {
  if (puntos > 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(0);
  }

  if (puntos === 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(21);
  }
}

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta(deck);
    puntosJugadores[1] = acumularPuntos(carta, puntosJugadores[1]);
    insertarPuntajeHTML(
      puntosComputadoraHTML,
      puntosJugadores[puntosJugadores.length - 1],
    );
    mostrarImgCarta(carta, computadoraCartas);
  } while (puntosJugadores[puntosJugadores.length - 1] < puntosMinimos);
  mostrarCartelGanador();
};

const mostrarCartelGanador = () => {
  setTimeout(() => {
    if (puntosJugadores[0] === puntosJugadores[puntosJugadores.length - 1]) {
      alert("Empate");
      return;
    }

    if (
      puntosJugadores[0] <= 21 &&
      puntosJugadores[puntosJugadores.length - 1] > 21
    ) {
      alert("Ganaste");
      return;
    }
    if (
      puntosJugadores[puntosJugadores.length - 1] <= 21 &&
      puntosJugadores[0] > 21
    ) {
      alert("Perdiste");
      return;
    }

    if (
      puntosJugadores[0] <= 21 &&
      puntosJugadores[0] > puntosJugadores[puntosJugadores.length - 1]
    ) {
      alert("Ganaste");
    } else {
      alert("Perdiste");
    }

    if (
      puntosJugadores[0] <= 21 &&
      puntosJugadores[puntosJugadores.length - 1] < puntosJugadores[0]
    ) {
      alert("ganaste");
    }
  }, 200);
};
