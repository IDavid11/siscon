import React, { useState, useContext, useEffect } from "react";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";
import ToastMessageContext from "../../context/ToastMessageContext";
import UserContext from "../../context/UserContext";

const ElectronicaForm = ({
  centro,
  dispositivo,
  handleCloseModal,
  tiposDispositivos,
  modelos,
}) => {
  const { grupo } = useContext(UserContext);
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
      centroId: centro._id,
      dispositivoId: updatedDispositivo._id,
      ip: updatedDispositivo.ip,
      tipo: updatedDispositivo.tipo,
      modelo: updatedDispositivo.modelo,
      ubicacion: updatedDispositivo.ubicacion,
      nome: updatedDispositivo.nome,
    });
    if (data.error) createToastMessage({ tipo: 1, message: data.message });
    else {
      centro.rede.electronica = data.data;
      handleCloseModal();
    }
  };

  const submitEngadirDispositivo = async (e) => {
    e.preventDefault();
    const { data } = await instance.post(apiUrls.urlEngadirDispositivo, {
      centroId: centro._id,
      ip: updatedDispositivo.ip,
      tipo: updatedDispositivo.tipo,
      modelo: updatedDispositivo.modelo,
      ubicacion: updatedDispositivo.ubicacion,
      nome: updatedDispositivo.nome,
    });
    if (data.error) createToastMessage({ tipo: 1, message: data.message });
    else {
      centro.rede.electronica.push(data.data);
      handleCloseModal();
    }
  };

  const deleteDispostivo = async () => {
    const { data } = await instance.post(apiUrls.urlEliminarDispostivo, {
      centroId: centro._id,
      dispositivoId: updatedDispositivo._id,
    });
    if (data.error) createToastMessage({ tipo: 1, message: data.message });
    else {
      centro.rede.electronica = data.data;
      handleCloseModal();
    }
  };

  useEffect(() => {
    handleTipoUbicacion();
  }, [updatedDispositivo]);

  return (
    <>
      {grupo === "sistemas" || grupo === "admin" ? (
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
                defaultValue={updatedDispositivo.tipo || ""}
                onChange={handleInputChange}
                className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
              >
                <option value={""}>Seleccionar</option>
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
                <option value={"Sen determinar"}>Sen determinar</option>
                {modelos &&
                  modelos.map((modelo) => {
                    return <option value={modelo.nome}>{modelo.nome}</option>;
                  })}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="ubicacion"
                className="font-medium text-center mb-4"
              >
                Ubicación
              </label>

              {tipoUbicacion === "Rack" ? (
                <select
                  name="ubicacion"
                  id="ubicacion"
                  defaultValue={updatedDispositivo.ubicacion || "Sen localizar"}
                  onChange={handleInputChange}
                  className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
                >
                  <option value={"Sen localizar"}>Sen localizar</option>
                  {centro.rede.racks &&
                    centro.rede.racks.map((rack) => {
                      return <option value={rack.nome}>{rack.nome}</option>;
                    })}
                </select>
              ) : (
                <input
                  name="ubicacion"
                  id="ubicacion"
                  defaultValue={updatedDispositivo.ubicacion || "Sen localizar"}
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
      ) : (
        <div>
          <div className="flex items-end gap-x-5">
            <div className="flex flex-col">
              <label htmlFor="ip" className="font-medium text-center mb-4">
                IP
              </label>
              <input
                type="text"
                name="ip"
                value={updatedDispositivo.ip}
                disabled
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
                  disabled
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
                defaultValue={updatedDispositivo.tipo || ""}
                disabled
                className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
              >
                <option value={""}>Seleccionar</option>
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
                disabled
                className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
              >
                <option value={"Sen determinar"}>Sen determinar</option>
                {modelos &&
                  modelos.map((modelo) => {
                    return <option value={modelo.nome}>{modelo.nome}</option>;
                  })}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="ubicacion"
                className="font-medium text-center mb-4"
              >
                Ubicación
              </label>

              {tipoUbicacion === "Rack" ? (
                <select
                  name="ubicacion"
                  id="ubicacion"
                  defaultValue={updatedDispositivo.ubicacion || "Sen localizar"}
                  disabled
                  className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
                >
                  <option value={"Sen localizar"}>Sen localizar</option>
                  {centro.rede.racks &&
                    centro.rede.racks.map((rack) => {
                      return <option value={rack.nome}>{rack.nome}</option>;
                    })}
                </select>
              ) : (
                <input
                  name="ubicacion"
                  id="ubicacion"
                  defaultValue={updatedDispositivo.ubicacion || "Sen localizar"}
                  disabled
                  className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ElectronicaForm;
