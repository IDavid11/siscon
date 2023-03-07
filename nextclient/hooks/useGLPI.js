import React, { useEffect, useReducer } from "react";
import { instance } from "@/services/axios";
import { apiUrls } from "@/services/urls";
import GLPIContext from "../context/GLPIContext";
import GLPIReducer from "@/context/GLPIReducer";
import {
  FINALIZAR_SESION_GLPI,
  RECUPERAR_SESION,
  INICIAR_SESION_GLPI,
  OBTER_INCIDENCIAS_GLPI,
} from "@/context/GLPITypes";

export default function GLPIState({ children }) {
  const initialState = {
    glpi_csrf_token: null,
    glpi_cookie: null,
    glpi_search_id: null,
    asignadas: null,
    grupo: null,
    validacions: null,
  };

  const [state, dispatch] = useReducer(GLPIReducer, initialState);

  const obterIncidenciasGLPI = async (sesion) => {
    console.log("obtendo incidencias");
    const { data } = await instance.post(
      apiUrls.urlObterIncidenciasParaUsuarioGLPI,
      {
        csrf_token: sesion ? sesion.glpi_csrf_token : state.glpi_csrf_token,
        cookie: sesion ? sesion.glpi_cookie : state.glpi_cookie,
        searchform_id: sesion ? sesion.glpi_search_id : state.glpi_search_id,
      }
    );
    console.log(data);
    dispatch({
      type: OBTER_INCIDENCIAS_GLPI,
      payload: data.data,
    });
  };

  const iniciarSesionGLPI = (sesion) => {
    dispatch({
      type: INICIAR_SESION_GLPI,
      payload: {
        glpi_csrf_token: sesion.glpi_csrf_token,
        glpi_cookie: sesion.glpi_cookie,
        glpi_search_id: sesion.glpi_search_id,
      },
    });
    sessionStorage.setItem("glpi_csrf_token", sesion.glpi_csrf_token);
    sessionStorage.setItem("glpi_cookie", JSON.stringify(sesion.glpi_cookie));
    sessionStorage.setItem("glpi_search_id", sesion.glpi_search_id);
    obterIncidenciasGLPI(sesion);
  };

  const finalizarSesionGLPI = () => {
    sessionStorage.removeItem("glpi_csrf_token");
    sessionStorage.removeItem("glpi_cookie");
    sessionStorage.removeItem("glpi_search_id");
    dispatch({
      type: FINALIZAR_SESION_GLPI,
      payload: initialState,
    });
  };

  const recuperarSesion = () => {
    const glpiCookie = sessionStorage.getItem("glpi_cookie");
    const glpiCookieJSON = JSON.parse(glpiCookie);

    dispatch({
      type: RECUPERAR_SESION,
      payload: {
        glpi_csrf_token: sessionStorage.getItem("glpi_csrf_token"),
        glpi_cookie: glpiCookieJSON,
        glpi_search_id: sessionStorage.getItem("glpi_search_id"),
      },
    });
  };

  useEffect(() => {
    recuperarSesion();
  }, []);

  return (
    <GLPIContext.Provider
      value={{
        glpi_csrf_token: state.glpi_csrf_token,
        glpi_cookie: state.glpi_cookie,
        glpi_search_id: state.glpi_search_id,
        iniciarSesionGLPI,
        finalizarSesionGLPI,
        obterIncidenciasGLPI,
      }}
    >
      {children}
    </GLPIContext.Provider>
  );
}
