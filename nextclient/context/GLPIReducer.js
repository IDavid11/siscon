import {
  FINALIZAR_SESION_GLPI,
  RECUPERAR_SESION,
  INICIAR_SESION_GLPI,
  OBTER_INCIDENCIAS_GLPI,
} from "@/context/GLPITypes";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case FINALIZAR_SESION_GLPI:
      return {
        glpi_csrf_token: null,
        glpi_cookie: null,
        glpi_search_id: null,
      };
    case RECUPERAR_SESION:
      return {
        glpi_csrf_token: payload.glpi_csrf_token,
        glpi_cookie: payload.glpi_cookie,
        glpi_search_id: payload.glpi_search_id,
      };
    case INICIAR_SESION_GLPI:
      return {
        glpi_csrf_token: payload.glpi_csrf_token,
        glpi_cookie: payload.glpi_cookie,
        glpi_search_id: payload.glpi_search_id,
      };
    case OBTER_INCIDENCIAS_GLPI:
      return {
        ...state,
        asignadas: payload.asignadas,
        grupo: payload.grupo,
        validacions: payload.validacions,
      };
    default:
      return state;
  }
};
