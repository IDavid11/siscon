import React, { useEffect, useReducer } from "react";
import CentroContext from "../context/CentroContext";

function reducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case "seleccionarCentro":
      console.log(payload);
      return {
        infoCentro: payload.infoCentro,
        monitorizacions: payload.monitorizacions,
        avisos: payload.avisos,
      };
    default:
      return state;
  }
}

export default function CentroState({ children }) {
  const initialState = {
    infoCentro: null,
    monitorizacions: null,
    avisos: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const seleccionarCentro = (centro) => {
    console.log(centro);
    dispatch({
      type: "seleccionarCentro",
      payload: {
        infoCentro: centro.centro,
        monitorizacions: centro.monitorizacions,
        avisos: centro.avisos,
      },
    });
  };

  useEffect(() => {
    console.log(state);
  }, [state.infoCentro]);

  return (
    <CentroContext.Provider
      value={{
        infoCentro: state.infoCentro,
        monitorizacions: state.monitorizacions,
        avisos: state.avisos,
        seleccionarCentro,
      }}
    >
      {children}
    </CentroContext.Provider>
  );
}
