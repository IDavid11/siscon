import React, { useState } from "react";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";

const HardwareForm = ({ hardware, handleCloseModal, setData }) => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [updatedHardware, setUpdatedHardware] = useState({
    hardwareId: hardware?._id || "",
    marca: hardware?.marca || "",
    modelo: hardware?.modelo || "",
    expediente: hardware?.expediente || "",
    ns: hardware?.ns || "",
    tecnico: hardware?.tecnico || "",
    grupo_escalado: hardware?.grupo_escalado || "",
    equipamento: hardware?.equipamento || "",
    so: hardware?.so || "",
    garantia: hardware?.garantia || "",
    tipo_hardware: hardware?.tipo_hardware || "",
  });

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setUpdatedHardware({
        ...updatedHardware,
        [e.target.name]: e.target.value,
      });
    } else {
      setUpdatedHardware({ ...updatedHardware, [e.target.name]: "" });
    }
  };

  const submitUpdateUsuario = async (e) => {
    e.preventDefault();
    const { data } = await instance.post(
      apiUrls.urlActualizarSwitch,
      updatedHardware
    );
    if (data.error) {
      setIsError(true);
      setError(data.message);
    }
    if (!data.error) {
      setIsError(false);
      setError("");
      setData(data.data);
      handleCloseModal();
    }
  };

  const submitEngadirUsuario = async (e) => {
    e.preventDefault();
    const { data } = await instance.post(
      apiUrls.urlEngadirSwitch,
      updatedHardware
    );
    console.log(data);
    if (data.error) {
      setIsError(true);
      setError(data.message);
    }
    if (!data.error) {
      setIsError(false);
      setError("");
      setData(data.data);
      handleCloseModal();
    }
  };

  const deleteSw = async () => {
    const { data } = await instance.post(
      apiUrls.urlEliminarSwitch,
      updatedHardware
    );
    if (data.error) {
      setIsError(true);
      setError(data.message);
    }
    if (!data.error) {
      setIsError(false);
      setError("");
      setData(data.data);
      handleCloseModal();
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={hardware ? submitUpdateUsuario : submitEngadirUsuario}
    >
      <div className="flex items-end gap-x-5">
        {hardware != undefined ? (
          <div className="mb-1">
            <button
              type="button"
              onClick={deleteSw}
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
          <label htmlFor="marca" className="font-medium text-center mb-4">
            Marca
          </label>
          <input
            type="text"
            name="marca"
            value={updatedHardware.marca}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 h-10 rounded-lg px-4 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="modelo" className="font-medium text-center mb-4">
            Modelo
          </label>
          <input
            type="text"
            name="modelo"
            value={updatedHardware.modelo}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 h-10 rounded-lg px-4 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="expediente" className="font-medium text-center mb-4">
            Expediente
          </label>
          <input
            type="text"
            name="expediente"
            value={updatedHardware.expediente}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 h-10 rounded-lg px-4 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ns" className="font-medium text-center mb-4">
            S/N
          </label>
          <input
            type="text"
            name="ns"
            value={updatedHardware.ns}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 h-10 rounded-lg px-4 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="equipamento" className="font-medium text-center mb-4">
            Equipamento
          </label>
          <input
            type="text"
            name="equipamento"
            value={updatedHardware.equipamento}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 h-10 rounded-lg px-4 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="so" className="font-medium text-center mb-4">
            S.O
          </label>
          <input
            type="text"
            name="so"
            value={updatedHardware.so}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 h-10 rounded-lg px-4 outline-none"
          />
        </div>
        {isError ? (
          <div className="form-add-user-error-container">
            <span>{error}</span>
          </div>
        ) : (
          <></>
        )}
        <div>
          {hardware != undefined ? (
            <button
              onClick={submitUpdateUsuario}
              className="bg-primary-color rounded-lg h-10 px-10 text-white font-medium"
            >
              Gardar
            </button>
          ) : (
            <button
              onClick={submitEngadirUsuario}
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

export default HardwareForm;
