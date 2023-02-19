import React, { useEffect, useReducer } from "react";
import ToastMessageContext from "../context/ToastMessageContext";

function reducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case "crearMensaxeToast":
      return {
        activo: payload.activo,
        tipo: payload.activo,
        message: payload.message,
      };
    case "eliminarMensaxeToast":
      return {
        activo: payload.activo,
        tipo: payload.activo,
        message: payload.message,
      };
    default:
      return state;
  }
}

export default function ToastMessageState({ children }) {
  const initialState = {
    activo: false,
    tipo: 0, // 0 OK // 1 ERROR // 2 WARNING
    message: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const createToastMessage = (toastMessage) => {
    dispatch({
      type: "crearMensaxeToast",
      payload: {
        activo: true,
        tipo: toastMessage.tipo,
        message: toastMessage.message,
      },
    });
  };

  const deleteToastMessage = () => {
    dispatch({
      type: "eliminarMensaxeToast",
      payload: {
        activo: false,
        tipo: 0,
        message: "",
      },
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      deleteToastMessage();
    }, 3000);
    return () => clearInterval(interval);
  }, [state.activo]);

  return (
    <ToastMessageContext.Provider
      value={{
        activo: state.activo,
        tipo: state.tipo,
        message: state.message,
        createToastMessage,
      }}
    >
      {children}
    </ToastMessageContext.Provider>
  );
}
