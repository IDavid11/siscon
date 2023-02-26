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
        incidencias: payload.incidencias,
        informacionSistemas: payload.informacionSistemas,
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
        informacionSistemas: payload.informacionSistemas,
        incidencias: payload.incidencias,
        redeComprobada: payload.redeComprobada,
      };
    default:
      return state;
  }
};
