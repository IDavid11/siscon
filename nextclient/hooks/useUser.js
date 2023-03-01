import React, { useEffect, useReducer } from "react";
import UserContext from "../context/UserContext";
import UserReducer from "@/context/UserReducer";
import {
  INICIAR_SESION,
  FINALIZAR_SESION,
  RECUPERAR_SESION,
} from "@/context/UserTypes";

export default function UserState({ children }) {
  const initialState = {
    login: null,
    nome: null,
    grupo: null,
    token: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

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

  const finalizarSesion = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("nome");
    sessionStorage.removeItem("grupo");
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
    dispatch({
      type: RECUPERAR_SESION,
      payload: {
        login: sessionStorage.getItem("login"),
        nome: sessionStorage.getItem("nome"),
        grupo: sessionStorage.getItem("grupo"),
        token: sessionStorage.getItem("token"),
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
        iniciarSesion,
        finalizarSesion,
        recuperarSesion,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
