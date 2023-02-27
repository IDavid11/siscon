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
import UserContext from "@/context/UserContext";

export default function CentroState({ children }) {
  const initialState = {
    infoCentro: null,
    monitorizacions: null,
    avisos: null,
    avarias: null,
    incidencias: null,
    informacionSistemas: null,
    redeComprobada: null,
  };

  const [state, dispatch] = useReducer(CentroReducer, initialState);
  const { handleLoading } = useContext(LoadingContext);
  const { glpi_csrf_token, glpi_cookie, glpi_search_id } =
    useContext(UserContext);

  const doPing = async (centro) => {
    console.log(centro);
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

  const obterIncidenciasCentro = async (centro) => {
    const { data } = await instance.post(apiUrls.urlObterIncidenciasCentro, {
      csrf_token: glpi_csrf_token,
      cookie: glpi_cookie,
      searchform_id: glpi_search_id,
      centro: centro.centro,
    });

    return data.data;
  };

  const obterInformacionSistemas = async (centro) => {
    const { data } = await instance.get(
      apiUrls.urlObterInfoSistemas + centro._id
    );
    return data.data;
  };

  const seleccionarCentro = async (centro) => {
    dispatch({
      type: SELECCIONAR_CENTRO,
      payload: {
        infoCentro: centro.centro,
        monitorizacions: centro.monitorizacions,
      },
    });
  };

  const obterDatosCentro = async (centro) => {
    console.log(centro);
    handleLoading(true);
    const infoSistemas = await obterInformacionSistemas(centro.centro);
    await doPing(centro.centro);
    await obterElectronicaLan(centro.centro);
    const incidencias = await obterIncidenciasCentro(centro.centro);
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
        incidencias: incidencias,
        informacionSistemas: infoSistemas,
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
        incidencias: state.incidencias,
        informacionSistemas: state.informacionSistemas,
        redeComprobada: state.redeComprobada,
        seleccionarCentro,
        obterDatosCentro,
        actualizarCentro,
        borrarDatos,
      }}
    >
      {children}
    </CentroContext.Provider>
  );
}
