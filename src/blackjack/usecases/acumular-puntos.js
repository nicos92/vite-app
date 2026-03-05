import { extraerValorCarta } from "./extraer-valor-carta";
export const acumularPuntos = (carta, turno) => {
  return (turno += extraerValorCarta(carta));
};
