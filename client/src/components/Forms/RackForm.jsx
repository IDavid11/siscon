import React, { useState, useContext } from "react";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";
import TabsInfoContext from "../../context/TabsInfoContext";

const RackForm = ({ rack, handleCloseModal }) => {
  const { tabsInfo, selectedTab, handleUpdateTabsInfo } =
    useContext(TabsInfoContext);
  const [updatedRack, setUpdatedRack] = useState({
    _id: rack?._id || "",
    nome: rack?.nome || "",
    ubicacion: rack?.ubicacion || "Sen ubicar",
    tipo: rack?.tipo || "Armario",
  });

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setUpdatedRack({ ...updatedRack, [e.target.name]: e.target.value });
    } else {
      setUpdatedRack({ ...updatedRack, [e.target.name]: "" });
    }
  };

  const submitUpdateRack = async (e) => {
    e.preventDefault();
    const res = await instance.post(apiUrls.urlActualizarRack, {
      centroId: tabsInfo[selectedTab].centro._id,
      rackId: updatedRack._id,
      nome: updatedRack.nome,
      tipo: updatedRack.tipo,
      ubicacion: updatedRack.ubicacion,
    });

    const tabsInfoVar = tabsInfo;
    tabsInfoVar[selectedTab].centro.rede.racks = res.data;
    handleUpdateTabsInfo([...tabsInfoVar]);
    handleCloseModal();
  };

  const submitEngadirRack = async (e) => {
    e.preventDefault();
    const res = await instance.post(apiUrls.urlEngadirRack, {
      centroId: tabsInfo[selectedTab].centro._id,
      nome: updatedRack.nome,
      tipo: updatedRack.tipo,
      ubicacion: updatedRack.ubicacion,
    });
    const tabsInfoVar = tabsInfo;
    tabsInfoVar[selectedTab].centro.rede.racks.push(res.data);
    handleUpdateTabsInfo([...tabsInfoVar]);
    handleCloseModal();
  };

  const deleteRack = async (e) => {
    e.preventDefault();
    const res = await instance.post(apiUrls.urlEliminarRack, {
      centroId: tabsInfo[selectedTab].centro._id,
      rackId: updatedRack._id,
    });
    const tabsInfoVar = tabsInfo;
    tabsInfoVar[selectedTab].centro.rede.racks = res.data;
    handleUpdateTabsInfo([...tabsInfoVar]);
    handleCloseModal();
  };

  return (
    <form onSubmit={rack != undefined ? submitEngadirRack : submitUpdateRack}>
      <div className="flex items-end gap-x-5">
        {rack != undefined ? (
          <div className="mb-1">
            <button
              onClick={deleteRack}
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
            value={updatedRack.nome}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 h-10 rounded-lg px-4 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tipo" className="font-medium text-center mb-4">
            Tipo
          </label>
          <select
            name="tipo"
            id="tipo"
            defaultValue={updatedRack.tipo || "Armario"}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
          >
            <option value="Armario">Armario</option>
            <option value="De parede">De parede</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="ubicacion" className="font-medium text-center mb-4">
            Ubicación
          </label>
          <input
            name="ubicacion"
            id="ubicacion"
            value={updatedRack.ubicacion}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
          />
        </div>
        <div>
          {rack != undefined ? (
            <button
              onClick={submitUpdateRack}
              className="bg-primary-color rounded-lg h-10 px-10 text-white font-medium"
            >
              Gardar
            </button>
          ) : (
            <button
              onClick={submitEngadirRack}
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

export default RackForm;
