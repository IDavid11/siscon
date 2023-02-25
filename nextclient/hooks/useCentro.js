import { instance } from "@/services/axios";
import { apiUrls } from "@/services/urls";
import React, { useContext, useEffect, useReducer } from "react";
import CentroContext from "@/context/CentroContext";
import CentroReducer from "@/context/CentroReducer";

import {
  SELECCIONAR_CENTRO,
  ACTUALIZAR_CENTRO,
  BORRAR_DATOS,
} from "@/context/CentroTypes";
import LoadingContext from "@/context/LoadingContext";

export default function CentroState({ children }) {
  const initialState = {
    infoCentro: null,
    monitorizacions: null,
    avisos: null,
    avarias: null,
    redeComprobada: null,
  };

  const [state, dispatch] = useReducer(CentroReducer, initialState);
  const { handleLoading } = useContext(LoadingContext);

  const doPing = async (centro) => {
    const { data } = await instance.post(apiUrls.urlPing, {
      index: centro._id,
    });
    centro.rede.electronica = data.data;
  };

  const obterElectronicaLan = async (centro) => {
    centro.rede.lans.map(async (lan, index) => {
      const { data } = await instance.post(apiUrls.urlObterElectronicaLan, {
        centroId: centro._id,
        lanId: lan._id,
      });
      centro.rede.lans[index].electronica = data.data;
    });
  };

  const seleccionarCentro = async (centro) => {
    handleLoading(true);
    await doPing(centro.centro);
    await obterElectronicaLan(centro.centro);
    const { data } = await instance.get(
      apiUrls.urlObterAvisosCentro + `${centro.centro._id}`
    );
    const avarias = centro.centro.rede.electronica.filter(
      (e) => e.status == "down"
    );
    handleLoading(false);

    dispatch({
      type: SELECCIONAR_CENTRO,
      payload: {
        infoCentro: centro.centro,
        monitorizacions: centro.monitorizacions,
        avisos: data.data,
        avarias: avarias,
        redeComprobada: true,
      },
    });
  };

  const actualizarCentro = (centroActualizado) => {
    dispatch({ type: ACTUALIZAR_CENTRO, payload: centroActualizado });
  };

  const borrarDatos = () => {
    dispatch({ type: BORRAR_DATOS, payload: initialState });
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
        avarias: state.avarias,
        redeComprobada: state.redeComprobada,
        seleccionarCentro,
        actualizarCentro,
        borrarDatos,
      }}
    >
      {children}
    </CentroContext.Provider>
  );
}
