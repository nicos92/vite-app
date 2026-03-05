/**
 * Obtener el valor de la carta
 * @param {String} carta
 * @returns {Number} valor de la carta
 */
export const extraerValorCarta = (carta = "2D") => {
  const valorCarta = carta.substring(0, carta.length - 1);
  return isNaN(valorCarta) ? (valorCarta === "A" ? 11 : 10) : valorCarta * 1;
};
