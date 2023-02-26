import React, { useState, useContext } from "react";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";
import ToastMessageContext from "../../context/ToastMessageContext";
import UserContext from "../../context/UserContext";
import CentroContext from "@/context/CentroContext";

const LanForm = ({ centro, lan, handleCloseModal }) => {
  const { infoCentro, actualizarCentro } = useContext(CentroContext);
  const { grupo } = useContext(UserContext);
  const { createToastMessage } = useContext(ToastMessageContext);
  const [updatedLan, setUpdatedLan] = useState({
    _id: lan?._id || "",
    rango: lan?.rango || "",
    rede: lan?.rede || "",
    dhcp: lan?.dhcp || false,
  });

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setUpdatedLan({ ...updatedLan, [e.target.name]: e.target.value });
    } else {
      setUpdatedLan({ ...updatedLan, [e.target.name]: "" });
    }
  };

  const submitUpdateLan = async (e) => {
    e.preventDefault();
    const { data } = await instance.post(apiUrls.urlActualizarLan, {
      centroId: infoCentro._id,
      lanId: updatedLan._id,
      rango: updatedLan.rango,
      rede: updatedLan.rede,
      dhcp: updatedLan.dhcp,
    });
    if (data.error) createToastMessage({ tipo: 1, message: data.message });
    else {
      var infoCentroVar = infoCentro;
      infoCentroVar.rede.lans = data.data;
      actualizarCentro(infoCentroVar);
      handleCloseModal();
    }
  };

  const submitEngadirLan = async (e) => {
    e.preventDefault();
    const { data } = await instance.post(apiUrls.urlEngadirLan, {
      centroId: infoCentro._id,
      rango: updatedLan.rango,
      rede: updatedLan.rede,
      dhcp: updatedLan.dhcp,
    });
    if (data.error) createToastMessage({ tipo: 1, message: data.message });
    else {
      var infoCentroVar = infoCentro;
      infoCentroVar.rede.lans.push(data.data);
      actualizarCentro(infoCentroVar);
      handleCloseModal();
    }
  };

  const deleteLAN = async () => {
    const { data } = await instance.post(apiUrls.urlEliminarLan, {
      centroId: tabsInfo[selectedTab].centro._id,
      lanId: updatedLan._id,
    });
    if (data.error) createToastMessage({ tipo: 1, message: data.message });
    else {
      var infoCentroVar = infoCentro;
      infoCentroVar.rede.lans = data.data;
      actualizarCentro(infoCentroVar);
      handleCloseModal();
    }
  };

  return (
    <>
      {grupo === "sistemas" || grupo === "admin" ? (
        <form onSubmit={lan ? submitUpdateLan : submitEngadirLan}>
          <div className="flex items-end gap-x-5">
            {lan != undefined ? (
              <div className="mb-1">
                <button
                  type="button"
                  onClick={deleteLAN}
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
              <label htmlFor="rango" className="font-medium text-center mb-4">
                LAN
              </label>
              <input
                type="text"
                name="rango"
                value={updatedLan.rango}
                onChange={handleInputChange}
                className="border border-solid border-gray-300 h-10 rounded-lg px-4 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="rede" className="font-medium text-center mb-4">
                Rede
              </label>
              <select
                name="rede"
                id="rede"
                defaultValue={updatedLan.rede || ""}
                onChange={handleInputChange}
                className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
              >
                <option value="">Sen determinar</option>
                <option value="Rede principal">Rede principal</option>
                <option value="Rede secundaria">Rede secundaria</option>
                <option value="Rede edu.xunta.gal">Rede edu.xunta.gal</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="dhcp" className="font-medium text-center mb-4">
                DHCP
              </label>
              <select
                name="dhcp"
                id="dhcp"
                defaultValue={updatedLan.dhcp}
                onChange={handleInputChange}
                className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
              >
                <option value={true}>Si</option>
                <option value={false}>Non</option>
              </select>
            </div>
            <div>
              {lan != undefined ? (
                <button
                  onClick={submitUpdateLan}
                  className="bg-primary-color rounded-lg h-10 px-10 text-white font-medium"
                >
                  Gardar
                </button>
              ) : (
                <button
                  onClick={submitEngadirLan}
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
              <label htmlFor="rango" className="font-medium text-center mb-4">
                LAN
              </label>
              <input
                type="text"
                name="rango"
                value={updatedLan.rango}
                disabled
                className="border border-solid border-gray-300 h-10 rounded-lg px-4 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="rede" className="font-medium text-center mb-4">
                Rede
              </label>
              <select
                name="rede"
                id="rede"
                defaultValue={updatedLan.rede}
                disabled
                className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
              >
                <option value="Rede principal">Rede principal</option>
                <option value="Rede secundaria">Rede secundaria</option>
                <option value="Rede edu.xunta.gal">Rede edu.xunta.gal</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="dhcp" className="font-medium text-center mb-4">
                DHCP
              </label>
              <select
                name="dhcp"
                id="dhcp"
                defaultValue={updatedLan.dhcp}
                disabled
                className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
              >
                <option value={true}>Si</option>
                <option value={false}>Non</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LanForm;
