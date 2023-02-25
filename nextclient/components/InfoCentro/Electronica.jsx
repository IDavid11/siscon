import React, { useEffect, useState, useContext } from "react";
import ContainerWrap from "../utils/ContainerWrap";
import Nav from "../utils/Nav/Nav";
import NavItem from "../utils/Nav/NavItem";
import Status from "../utils/Items/Status";
import ModalElectronica from "../Modales/ModalElectronica";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";
import ToastMessageContext from "../../context/ToastMessageContext";
import { imgs } from "../../utils/imgs";
import UserContext from "../../context/UserContext";

const Electronica = ({ electronica, setMenuVisible }) => {
  const { grupo } = useContext(UserContext);
  const { createToastMessage } = useContext(ToastMessageContext);
  const [showModal, setShowModal] = useState(false);
  const [modalElectronica, setModalElectronica] = useState();

  const [tiposDispositivos, setTiposDispositivos] = useState([]);
  const [modelos, setModelos] = useState([]);

  const nav = [
    { k: "Todos", v: "Todos" },
    { k: "Switch", v: "Switches" },
    { k: "AP_edu_xunta_gal", v: "APs edu" },
  ];

  const handleShowModal = (dispositivo) => {
    setShowModal(!showModal);
    setModalElectronica(dispositivo);
  };

  const [vista, setVista] = useState("Todos");

  const getTiposDispositivos = async () => {
    const { data } = await instance.get(apiUrls.urlObterTiposDispositivos);
    if (data.error) createToastMessage({ tipo: 1, message: data.message });
    else setTiposDispositivos(data.data);
  };
  const getModelos = async () => {
    const { data } = await instance.get(apiUrls.urlObterSwitches);
    if (data.error) createToastMessage({ tipo: 1, message: data.message });
    else setModelos(data.data);
  };

  const handleActiveVista = (e) => {
    e.preventDefault();
    setVista(e.target.id);
  };

  useEffect(() => {
    if (tiposDispositivos.length < 1) getTiposDispositivos();
    if (modelos.length < 1) getModelos();
  }, [vista]);

  return (
    <div style={{ height: "inherit" }}>
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => setMenuVisible(null)}
            className="flex items-center justify-center"
          >
            <img className="h-6" src="/assets/icons/back.png" alt="" />
          </button>
        </div>
        <div className="text-lg font-medium">Rede</div>
        {grupo === "sistemas" || grupo === "admin" ? (
          <div>
            <button
              onClick={(e) => handleShowModal(undefined)}
              className="flex items-center justify-center"
            >
              <img
                className="h-5"
                src="/assets/icons/add-button-black.png"
                alt=""
              />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="mt-4 overflow-auto remove-scrollbar">
        <table className="rounded-xl w-full table-fixed mb-6">
          <tbody>
            {electronica &&
              electronica.map((item) => {
                return (
                  <>
                    {item.tipo == vista || vista == "Todos" ? (
                      <tr
                        onClick={(e) => handleShowModal(item)}
                        key={item._id}
                        className="h-10 mt-8 hover:bg-gray-200 cursor-pointer"
                      >
                        <td className="py-2.5 px-2 w-2">
                          <span
                            className={`p-px rounded-full ${
                              item.status == "up"
                                ? "bg-green-400"
                                : "bg-red-400"
                            }`}
                          ></span>
                        </td>
                        <td className="py-2.5 px-2 w-28">{item.ip}</td>
                        <td className="py-2.5 px-2 text-ellipsis whitespace-nowrap overflow-hidden">
                          {item.nome}
                        </td>
                        <td className="py-2.5 px-2">{item.tipo}</td>
                      </tr>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
      {showModal ? (
        <ModalElectronica
          handleCloseModal={handleShowModal}
          dispositivo={modalElectronica}
          tiposDispositivos={tiposDispositivos}
          modelos={modelos}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Electronica;
