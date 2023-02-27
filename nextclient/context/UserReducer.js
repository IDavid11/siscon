import {
  INICIAR_SESION,
  FINALIZAR_SESION,
  RECUPERAR_SESION,
  INICIAR_SESION_GLPI,
} from "@/context/UserTypes";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case INICIAR_SESION:
      return {
        login: payload.login,
        nome: payload.nome,
        grupo: payload.grupo,
        token: payload.token,
      };
    case FINALIZAR_SESION:
      return {
        login: null,
        nome: null,
        grupo: null,
        token: null,
      };
    case RECUPERAR_SESION:
      return {
        login: payload.login,
        nome: payload.nome,
        grupo: payload.grupo,
        token: payload.token,
        glpi_csrf_token: payload.glpi_csrf_token,
        glpi_cookie: payload.glpi_cookie,
        glpi_search_id: payload.glpi_search_id,
      };
    case INICIAR_SESION_GLPI:
      return {
        login: payload.login,
        nome: payload.nome,
        grupo: payload.grupo,
        token: payload.token,
        glpi_csrf_token: payload.glpi_csrf_token,
        glpi_cookie: payload.glpi_cookie,
        glpi_search_id: payload.glpi_search_id,
      };
    default:
      return state;
  }
};
