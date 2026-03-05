/**
 * pide una carta eliminando la ultima carta del deck y retornando la misma
 * @param {Array<String>} deck principal
 * @returns
 */
export const pedirCarta = (deck) => {
  if (deck.length === 0) throw "No hay cartas en el deck";

  return deck.pop();
};
