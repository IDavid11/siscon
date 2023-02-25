import {
  SELECCIONAR_CENTRO,
  ACTUALIZAR_CENTRO,
  BORRAR_DATOS,
} from "@/context/CentroTypes";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SELECCIONAR_CENTRO:
      return {
        infoCentro: payload.infoCentro,
        monitorizacions: payload.monitorizacions,
        avisos: payload.avisos,
        avarias: payload.avarias,
        redeComprobada: payload.redeComprobada,
      };
    case ACTUALIZAR_CENTRO:
      return {
        ...state,
        infoCentro: payload,
      };
    case BORRAR_DATOS:
      return {
        infoCentro: payload.infoCentro,
        monitorizacions: payload.monitorizacions,
        avisos: payload.avisos,
        avarias: payload.avarias,
        redeComprobada: payload.redeComprobada,
      };
    default:
      return state;
  }
};
