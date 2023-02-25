import React, { useEffect, useReducer, useContext } from "react";
import UserContext from "../context/UserContext";

function reducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case "iniciarSesion":
      return {
        login: payload.login,
        grupo: payload.grupo,
        token: payload.token,
      };
    case "iniciarSesionGLPI":
      return {
        glpi_csrf_token: payload.glpi_csrf_token,
        glpi_cookie: payload.glpi_cookie,
        glpi_search_id: payload.glpi_search_id,
      };
    case "recuperarSesion":
      return {
        login: payload.login,
        grupo: payload.grupo,
        token: payload.token,
        glpi_csrf_token: payload.glpi_csrf_token,
        glpi_cookie: payload.glpi_cookie,
        glpi_search_id: payload.glpi_search_id,
      };
    case "finalizarSesion":
      return {
        login: null,
        grupo: null,
        token: null,
      };
    default:
      return state;
  }
}

export default function UserState({ children }) {
  const initialState = {
    login: null,
    grupo: null,
    token: null,
    glpi_csrf_token: null,
    glpi_cookie: null,
    glpi_search_id: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const iniciarSesion = (sesion) => {
    dispatch({
      type: "iniciarSesion",
      payload: {
        login: sesion.login,
        grupo: sesion.grupo,
        token: sesion.token,
      },
    });
    sessionStorage.setItem("login", sesion.login);
    sessionStorage.setItem("grupo", sesion.grupo);
    sessionStorage.setItem("token", sesion.token);
  };

  const iniciarSesionGLPI = (sesion) => {
    dispatch({
      type: "iniciarSesionGLPI",
      payload: {
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
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("grupo");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("glpi_csrf_token");
    sessionStorage.removeItem("glpi_cookie");
    sessionStorage.removeItem("glpi_search_id");
    dispatch({
      type: "finalizarSesion",
      payload: {
        login: null,
        grupo: null,
        token: null,
      },
    });
  };

  const recuperarSesion = () => {
    const glpiCookie = sessionStorage.getItem("glpi_cookie");
    const glpiCookieJSON = JSON.parse(glpiCookie);

    dispatch({
      type: "recuperarSesion",
      payload: {
        login: sessionStorage.getItem("login"),
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
        grupo: state.grupo,
        token: state.token,
        glpi_csrf_token: state.glpi_csrf_token,
        glpi_cookie: state.glpi_cookie,
        glpi_search_id: state.glpi_search_id,
        iniciarSesion,
        iniciarSesionGLPI,
        finalizarSesion,
        recuperarSesion,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
