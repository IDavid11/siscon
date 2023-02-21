import React, { useEffect, useReducer, useContext } from "react";
import UserContext from "../context/UserContext";

function reducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case "iniciarSesion":
      console.log(payload);
      return {
        grupo: payload.grupo,
        token: payload.token,
      };
    case "finalizarSesion":
      return {
        grupo: null,
        token: null,
      };
    default:
      return state;
  }
}

export default function UserState({ children }) {
  const initialState = {
    grupo: null,
    token: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const iniciarSesion = (sesion) => {
    dispatch({
      type: "iniciarSesion",
      payload: {
        grupo: sesion.grupo,
        token: sesion.token,
      },
    });
    sessionStorage.setItem("grupo", sesion.grupo);
    sessionStorage.setItem("token", sesion.token);
  };

  const finalizarSesion = () => {
    sessionStorage.removeItem("grupo");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("tabsInfo");
    sessionStorage.removeItem("selectedTab");
    sessionStorage.removeItem("value");
    dispatch({
      type: "finalizarSesion",
      payload: {
        grupo: null,
        token: null,
      },
    });
  };

  const recuperarSesion = (sesion) => {
    dispatch({
      type: "iniciarSesion",
      payload: {
        grupo: sesion.grupo,
        token: sesion.token,
      },
    });
  };

  useEffect(() => {}, [state.token]);

  return (
    <UserContext.Provider
      value={{
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
