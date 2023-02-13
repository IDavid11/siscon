import React, { useState, useContext } from "react";
import TabsInfoContext from "../../context/TabsInfoContext";
import ContainerWrap from "../utils/ContainerWrap";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";

const InfoCentroForm = ({ centro, img, setEdit }) => {
  const { tabsInfo, selectedTab, handleUpdateTabsInfo } =
    useContext(TabsInfoContext);

  const [updatedCentro, setUpdatedCentro] = useState({
    _id: centro?._id || "",
    centro: centro?.centro || "",
    sf: centro?.sf || "",
    concello: centro?.concello || "",
    proxecto: centro?.proxecto || "Estándar",
    tap: centro?.rede.tap || "",
    tar: centro?.rede.tar || "",
    comentario: centro?.comentario || "",
  });

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setUpdatedCentro({ ...updatedCentro, [e.target.name]: e.target.value });
    } else {
      setUpdatedCentro({ ...updatedCentro, [e.target.name]: "" });
    }
  };

  const submitUpdatedCentro = async (e) => {
    e.preventDefault();
    const data = {
      centroId: updatedCentro._id,
      centro: updatedCentro.centro,
      sf: updatedCentro.sf,
      concello: updatedCentro.concello,
      proxecto: updatedCentro.proxecto,
      tap: updatedCentro.tap,
      tar: updatedCentro.tar,
      comentario: updatedCentro.comentario,
    };
    const res = await instance.post(apiUrls.urlActualizarCentro, data);
    const tabsInfoVar = tabsInfo;
    tabsInfoVar[selectedTab].centro = res.data;
    handleUpdateTabsInfo([...tabsInfoVar]);
    setEdit(false);
  };

  return (
    <ContainerWrap>
      <div className="absolute top-4 right-4 flex items-center gap-x-2">
        <button onClick={(e) => setEdit(false)}>
          <img className="h-7" src="/assets/icons/close-bg.png" alt="" />
        </button>
      </div>
      <form onSubmit={submitUpdatedCentro}>
        <div className="bg-white p-3 rounded-xl overflow-hidden">
          <div className="h-64">
            <img
              className="h-full w-full rounded-xl"
              src={centro?.imaxe || img}
              alt=""
            />
          </div>
          <div className="mt-8">
            <div className="flex flex-col gap-y-3">
              <div className="flex items-center">
                <div className="w-24 font-medium">Centro</div>
                <div className="ml-5 w-full">
                  <input
                    className="border border-solid border-gray-300 rounded-lg h-11 px-4 w-full"
                    type="text"
                    name="centro"
                    value={updatedCentro.centro}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-24 font-medium">ID</div>
                <div className="ml-5 w-full">
                  <input
                    className="border border-solid border-gray-300 rounded-lg h-11 px-4 w-full"
                    type="text"
                    name="sf"
                    value={updatedCentro.sf}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-24 font-medium">Concello</div>
                <div className="ml-5 w-full">
                  <input
                    className="border border-solid border-gray-300 rounded-lg h-11 px-4 w-full"
                    type="text"
                    name="concello"
                    value={updatedCentro.concello}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-24 font-medium">Proxecto</div>
                <div className="ml-5 w-full">
                  <select
                    name="proxecto"
                    id="proxecto"
                    defaultValue={updatedCentro.proxecto}
                    onChange={handleInputChange}
                    className="border border-solid border-gray-300 rounded-lg h-11 px-4 w-full"
                  >
                    <option value="Estándar">Estándar</option>
                    <option value="ABALAR">ABALAR</option>
                    <option value="EVA">EVA</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-24 font-medium">TAP</div>
                <div className="ml-5 w-full">
                  <input
                    className="border border-solid border-gray-300 rounded-lg h-11 px-4 w-full"
                    type="text"
                    name="tap"
                    value={updatedCentro.tap}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-24 font-medium">TAR</div>
                <div className="ml-5 w-full">
                  <input
                    className="border border-solid border-gray-300 rounded-lg h-11 px-4 w-full"
                    type="text"
                    name="tar"
                    value={updatedCentro.tar}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mt-8">
                <div className="w-full font-medium whitespace-nowrap">
                  Información adicional
                </div>
                <div className="mt-2 w-full">
                  <textarea
                    className="outline-none border border-solid border-gray-300 rounded-lg p-2 resize-none w-full"
                    name="comentario"
                    id="comentario"
                    cols="43"
                    rows="5"
                    value={updatedCentro.comentario}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="mt-4">
                {centro != undefined ? (
                  <button
                    onClick={submitUpdatedCentro}
                    className="bg-primary-color rounded-lg h-11 px-4 text-white font-medium w-full"
                  >
                    Gardar
                  </button>
                ) : (
                  <button
                    onClick={submitUpdatedCentro}
                    className="bg-primary-color rounded-lg h-11 px-4 text-white font-medium w-full"
                  >
                    Engadir
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </ContainerWrap>
  );
};

export default InfoCentroForm;
