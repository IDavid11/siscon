import React, { useState, useContext, useEffect } from "react";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";
import TabsInfoContext from "../../context/TabsInfoContext";
import ToastMessageContext from "../../context/ToastMessageContext";

const ElectronicaForm = ({
  dispositivo,
  handleCloseModal,
  tiposDispositivos,
  modelos,
}) => {
  const { tabsInfo, selectedTab, handleUpdateTabsInfo } =
    useContext(TabsInfoContext);
  const { createToastMessage } = useContext(ToastMessageContext);

  const [tipoUbicacion, setTipoUbicacion] = useState();
  const [updatedDispositivo, setUpdatedDispositivo] = useState({
    _id: dispositivo?._id || "",
    ip: dispositivo?.ip || "",
    tipo: dispositivo?.tipo || "",
    modelo: dispositivo?.modelo || "",
    ubicacion: dispositivo?.ubicacion || "",
    nome: dispositivo?.nome || "",
  });

  const handleTipoUbicacion = () => {
    const tipoDispositivo = tiposDispositivos.filter(
      (t) => t.nome == updatedDispositivo.tipo
    );
    if (tipoDispositivo.length > 0)
      setTipoUbicacion(tipoDispositivo[0].ubicacion);
  };

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setUpdatedDispositivo({
        ...updatedDispositivo,
        [e.target.name]: e.target.value,
      });
    } else {
      setUpdatedDispositivo({ ...updatedDispositivo, [e.target.name]: "" });
    }
  };

  const submitUpdateDispositivo = async (e) => {
    e.preventDefault();
    const { data } = await instance.post(apiUrls.urlActualizarDispositivo, {
      centroId: tabsInfo[selectedTab].centro._id,
      dispositivoId: updatedDispositivo._id,
      ip: updatedDispositivo.ip,
      tipo: updatedDispositivo.tipo,
      modelo: updatedDispositivo.modelo,
      ubicacion: updatedDispositivo.ubicacion,
      nome: updatedDispositivo.nome,
    });
    if (data.error) createToastMessage({ tipo: 1, message: data.message });
    else {
      const tabsInfoVar = tabsInfo;
      tabsInfoVar[selectedTab].centro.rede.electronica = data.data;
      handleUpdateTabsInfo([...tabsInfoVar]);
      handleCloseModal();
    }
  };

  const submitEngadirDispositivo = async (e) => {
    e.preventDefault();
    const { data } = await instance.post(apiUrls.urlEngadirDispositivo, {
      centroId: tabsInfo[selectedTab].centro._id,
      ip: updatedDispositivo.ip,
      tipo: updatedDispositivo.tipo,
      modelo: updatedDispositivo.modelo,
      ubicacion: updatedDispositivo.ubicacion,
      nome: updatedDispositivo.nome,
    });
    if (data.error) createToastMessage({ tipo: 1, message: data.message });
    else {
      const tabsInfoVar = tabsInfo;
      tabsInfoVar[selectedTab].centro.rede.electronica.push(data.data);
      handleUpdateTabsInfo([...tabsInfoVar]);
      handleCloseModal();
    }
  };

  const deleteDispostivo = async () => {
    const { data } = await instance.post(apiUrls.urlEliminarDispostivo, {
      centroId: tabsInfo[selectedTab].centro._id,
      dispositivoId: updatedDispositivo._id,
    });
    if (data.error) createToastMessage({ tipo: 1, message: data.message });
    else {
      const tabsInfoVar = tabsInfo;
      tabsInfoVar[selectedTab].centro.rede.electronica = data.data;
      handleUpdateTabsInfo([...tabsInfoVar]);
      handleCloseModal();
    }
  };

  useEffect(() => {
    handleTipoUbicacion();
  }, [updatedDispositivo]);

  return (
    <form
      onSubmit={
        dispositivo ? submitUpdateDispositivo : submitEngadirDispositivo
      }
    >
      <div className="flex items-end gap-x-5">
        {dispositivo != undefined ? (
          <div className="mb-1">
            <button
              type="button"
              onClick={deleteDispostivo}
              className="h-8 w-8 bg-red-400 rounded-lg flex items-center justify-center"
            >
              <img
                style={{ width: "12px" }}
                src="/assets/icons/delete.png"
                alt=""
              />
            </button>
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-col">
          <label htmlFor="ip" className="font-medium text-center mb-4">
            IP
          </label>
          <input
            type="text"
            name="ip"
            value={updatedDispositivo.ip}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 h-10 rounded-lg px-4 outline-none"
          />
        </div>
        {updatedDispositivo.tipo === "AP_edu_xunta_gal" ||
        updatedDispositivo.tipo === "AP_Siega" ? (
          <div className="flex flex-col">
            <label htmlFor="nome" className="font-medium text-center mb-4">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              value={updatedDispositivo.nome}
              onChange={handleInputChange}
              className="border border-solid border-gray-300 h-10 rounded-lg px-4 outline-none"
            />
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-col">
          <label htmlFor="tipo" className="font-medium text-center mb-4">
            Tipo
          </label>
          <select
            name="tipo"
            id="tipo"
            defaultValue={updatedDispositivo.tipo}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
          >
            {tiposDispositivos &&
              tiposDispositivos.map((tipo) => {
                return <option value={tipo.nome}>{tipo.nome}</option>;
              })}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="modelo" className="font-medium text-center mb-4">
            Marca e modelo
          </label>
          <select
            name="modelo"
            id="modelo"
            defaultValue={updatedDispositivo.modelo || "Sen determinar"}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
          >
            {modelos &&
              modelos.map((modelo) => {
                return <option value={modelo.nome}>{modelo.nome}</option>;
              })}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="ubicacion" className="font-medium text-center mb-4">
            Ubicación
          </label>

          {tipoUbicacion === "Rack" ? (
            <select
              name="ubicacion"
              id="ubicacion"
              defaultValue={updatedDispositivo.ubicacion || "Sen ubicar"}
              onChange={handleInputChange}
              className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
            >
              {tabsInfo[selectedTab].centro.rede.racks &&
                tabsInfo[selectedTab].centro.rede.racks.map((rack) => {
                  return <option value={rack.nome}>{rack.nome}</option>;
                })}
            </select>
          ) : (
            <input
              name="ubicacion"
              id="ubicacion"
              defaultValue={updatedDispositivo.ubicacion || "Sen ubicar"}
              onChange={handleInputChange}
              className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
            />
          )}
        </div>
        <div>
          {dispositivo != undefined ? (
            <button
              onClick={submitUpdateDispositivo}
              className="bg-primary-color rounded-lg h-10 px-10 text-white font-medium"
            >
              Gardar
            </button>
          ) : (
            <button
              onClick={submitEngadirDispositivo}
              className="bg-primary-color rounded-lg h-10 px-10 text-white font-medium"
            >
              Engadir
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ElectronicaForm;
