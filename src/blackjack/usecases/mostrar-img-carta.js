export const mostrarImgCarta = (carta, cartasJugador) => {
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  cartasJugador.append(imgCarta);
};
