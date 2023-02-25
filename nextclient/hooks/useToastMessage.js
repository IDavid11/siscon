import React, { useEffect, useReducer } from "react";
import ToastMessageContext from "../context/ToastMessageContext";

function reducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case "crearMensaxeToast":
      return {
        error: payload.error,
        tipo: payload.tipo,
        message: payload.message,
      };
    case "eliminarMensaxeToast":
      return {
        error: payload.error,
        tipo: payload.tipo,
        message: payload.message,
      };
    default:
      return state;
  }
}

export default function ToastMessageState({ children }) {
  const initialState = {
    error: false,
    tipo: 0, // 0 OK // 1 ERROR // 2 WARNING
    message: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const createToastMessage = (toastMessage) => {
    dispatch({
      type: "crearMensaxeToast",
      payload: {
        error: true,
        tipo: toastMessage.tipo,
        message: toastMessage.message,
      },
    });
  };

  const deleteToastMessage = () => {
    dispatch({
      type: "eliminarMensaxeToast",
      payload: {
        error: false,
        tipo: 0,
        message: "",
      },
    });
  };

  useEffect(() => {
    console.log("Toast Message");
    if (state.error) {
      const interval = setInterval(() => {
        deleteToastMessage();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [state.error]);

  return (
    <ToastMessageContext.Provider
      value={{
        error: state.error,
        tipo: state.tipo,
        message: state.message,
        createToastMessage,
      }}
    >
      {children}
    </ToastMessageContext.Provider>
  );
}
