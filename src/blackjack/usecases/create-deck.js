/**
 * Esta funcion crea un nuevo deck
 * @param {Array<String>} tipos de cartas Ejemplo: ["C", "D", "H", "S"]
 * @param {Object} cartas especiales Ejemplo: { A: 1, J: 11, Q: 12, K: 13 };
 * @returns {Array<String} retorna un nuevo deck de cartas
 */
export const createDeck = (tipos, especiales) => {
  if (!tipos) {
    throw new Error("Los Tipos de cartas son obligatorios");
  }
  if (
    !especiales ||
    typeof especiales !== "object" ||
    Array.isArray(especiales)
  ) {
    throw new Error("Las cartas especiales deben ser un objeto");
  }
  let deck = [];
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
  return deck;
};
