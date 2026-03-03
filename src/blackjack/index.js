const inicializarJuego = (numJugadores = 2) => {
  puntosJugadores = [];
  creatDeck();
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

let deck = [];
const tipos = ["C", "D", "H", "S"],
  especiales = { A: 1, J: 11, Q: 12, K: 13 };

let puntosJugadores = [];
const creatDeck = () => {
  deck = [];
  for (let i = 2; i <= 10; i++) {
    for (const tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (const tipo of tipos) {
    for (const clave of Object.keys(especiales)) {
      deck.push(clave + tipo);
    }
  }
};

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

const pedirCarta = () => {
  if (deck.length === 0) throw "No hay cartas en el deck";

  return deck.pop();
};

const extraerValorCarta = (carta = "2D") => {
  const valorCarta = carta.substring(0, carta.length - 1);
  return isNaN(valorCarta) ? (valorCarta === "A" ? 11 : 10) : valorCarta * 1;
};

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
  const carta = pedirCarta();
  acumularPuntos(carta, 0);
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

const insertarPuntajeHTML = (puntosHTML, puntos) => {
  puntosHTML.innerHTML = puntos;
};
const acumularPuntos = (carta, turno) => {
  puntosJugadores[turno] += extraerValorCarta(carta);
};
const mostrarImgCarta = (carta, cartasJugador) => {
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  cartasJugador.append(imgCarta);
};

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    acumularPuntos(carta, puntosJugadores.length - 1);
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
