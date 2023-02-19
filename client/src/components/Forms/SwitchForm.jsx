import React, { useState, useContext } from "react";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";
import ToastMessageContext from "../../context/ToastMessageContext";

const SwitchForm = ({ sw, handleCloseModal, setSwitches }) => {
  const { createToastMessage } = useContext(ToastMessageContext);

  const [updatedSw, setUpdatedSw] = useState({
    swId: sw?._id || "",
    nome: sw?.nome || "",
    portos: sw?.portos || "",
  });

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setUpdatedSw({ ...updatedSw, [e.target.name]: e.target.value });
    } else {
      setUpdatedSw({ ...updatedSw, [e.target.name]: "" });
    }
  };

  const submitUpdateSwitch = async (e) => {
    e.preventDefault();
    const { data } = await instance.post(
      apiUrls.urlActualizarSwitch,
      updatedSw
    );
    if (data.error) createToastMessage({ tipo: 1, message: data.message });
    else {
      setSwitches(data.data);
      handleCloseModal();
    }
  };

  const submitEngadirSwitch = async (e) => {
    e.preventDefault();
    const { data } = await instance.post(apiUrls.urlEngadirSwitch, updatedSw);
    console.log(data);
    if (data.error) createToastMessage({ tipo: 1, message: data.message });
    else {
      setSwitches(data.data);
      handleCloseModal();
    }
  };

  const deleteSw = async () => {
    const { data } = await instance.post(apiUrls.urlEliminarSwitch, updatedSw);
    if (data.error) createToastMessage({ tipo: 1, message: data.message });
    else {
      setSwitches(data.data);
      handleCloseModal();
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={sw ? submitUpdateSwitch : submitEngadirSwitch}
    >
      <div className="flex items-end gap-x-5">
        {sw != undefined ? (
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
          <label htmlFor="nome" className="font-medium text-center mb-4">
            Nome
          </label>
          <input
            type="text"
            name="nome"
            value={updatedSw.nome}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 h-10 rounded-lg px-4 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="portos" className="font-medium text-center mb-4">
            Portos
          </label>
          <input
            type="text"
            name="portos"
            value={updatedSw.portos}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 h-10 rounded-lg px-4 outline-none"
          />
        </div>
        <div>
          {sw != undefined ? (
            <button
              onClick={submitUpdateSwitch}
              className="bg-primary-color rounded-lg h-10 px-10 text-white font-medium"
            >
              Gardar
            </button>
          ) : (
            <button
              onClick={submitEngadirSwitch}
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

export default SwitchForm;
