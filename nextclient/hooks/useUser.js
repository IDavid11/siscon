import React, { useEffect, useReducer } from "react";
import { instance } from "@/services/axios";
import { apiUrls } from "@/services/urls";
import UserContext from "../context/UserContext";
import UserReducer from "@/context/UserReducer";
import {
  INICIAR_SESION,
  FINALIZAR_SESION,
  RECUPERAR_SESION,
  INICIAR_SESION_GLPI,
} from "@/context/UserTypes";

export default function UserState({ children }) {
  const initialState = {
    login: null,
    nome: null,
    grupo: null,
    token: null,
    glpi_csrf_token: null,
    glpi_cookie: null,
    glpi_search_id: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const obterIncidenciasGLPI = async (sesion) => {
    const { data } = await instance.post(
      apiUrls.urlObterIncidenciasParaUsuarioGLPI,
      {
        csrf_token: sesion.glpi_csrf_token,
        cookie: sesion.glpi_cookie,
        searchform_id: sesion.glpi_search_id,
      }
    );
    return data.data;
  };

  const iniciarSesion = (sesion) => {
    dispatch({
      type: INICIAR_SESION,
      payload: {
        login: sesion.login,
        nome: sesion.nome,
        grupo: sesion.grupo,
        token: sesion.token,
      },
    });
    sessionStorage.setItem("login", sesion.login);
    sessionStorage.setItem("nome", sesion.nome);
    sessionStorage.setItem("grupo", sesion.grupo);
    sessionStorage.setItem("token", sesion.token);
  };

  const iniciarSesionGLPI = (sesion) => {
    dispatch({
      type: INICIAR_SESION_GLPI,
      payload: {
        login: state.login,
        nome: state.nome,
        grupo: state.grupo,
        token: state.token,
        glpi_csrf_token: sesion.glpi_csrf_token,
        glpi_cookie: sesion.glpi_cookie,
        glpi_search_id: sesion.glpi_search_id,
      },
    });
    sessionStorage.setItem("glpi_csrf_token", sesion.glpi_csrf_token);
    sessionStorage.setItem("glpi_cookie", JSON.stringify(sesion.glpi_cookie));
    sessionStorage.setItem("glpi_search_id", sesion.glpi_search_id);
  };

  const finalizarSesion = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("nome");
    sessionStorage.removeItem("grupo");
    sessionStorage.removeItem("glpi_csrf_token");
    sessionStorage.removeItem("glpi_cookie");
    sessionStorage.removeItem("glpi_search_id");
    dispatch({
      type: FINALIZAR_SESION,
      payload: {
        login: null,
        nome: null,
        grupo: null,
        token: null,
      },
    });
  };

  const recuperarSesion = () => {
    const glpiCookie = sessionStorage.getItem("glpi_cookie");
    const glpiCookieJSON = JSON.parse(glpiCookie);

    dispatch({
      type: RECUPERAR_SESION,
      payload: {
        login: sessionStorage.getItem("login"),
        nome: sessionStorage.getItem("nome"),
        grupo: sessionStorage.getItem("grupo"),
        token: sessionStorage.getItem("token"),
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
    <UserContext.Provider
      value={{
        login: state.login,
        nome: state.nome,
        grupo: state.grupo,
        token: state.token,
        glpi_csrf_token: state.glpi_csrf_token,
        glpi_cookie: state.glpi_cookie,
        glpi_search_id: state.glpi_search_id,
        iniciarSesion,
        iniciarSesionGLPI,
        finalizarSesion,
        recuperarSesion,
        obterIncidenciasGLPI,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
