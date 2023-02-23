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

const Electronica = ({ electronica, isLoading }) => {
  const { grupo } = useContext(UserContext);
  const { createToastMessage } = useContext(ToastMessageContext);
  const [showModal, setShowModal] = useState(false);
  const [modalElectronica, setModalElectronica] = useState();

  const [tiposDispositivos, setTiposDispositivos] = useState([]);
  const [modelos, setModelos] = useState([]);

  const nav = [
    { k: "Todos", v: "Todos" },
    { k: "Router", v: "Router" },
    { k: "SW_abalar", v: "SW_Abalar" },
    { k: "SW_Siega", v: "SW_Siega" },
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
    <>
      <ContainerWrap title={"Rede"}>
        {grupo === "sistemas" || grupo === "admin" ? (
          <div className="absolute top-3 right-3 flex items-center gap-x-2">
            <button onClick={(e) => handleShowModal(undefined)}>
              <img
                className="h-6"
                src="/assets/icons/add-button-black.png"
                alt=""
              />
            </button>
          </div>
        ) : (
          <></>
        )}
        <div className="h-10 pt-4 fixed bg-white">
          <Nav>
            {nav.map((li) => {
              return (
                <NavItem
                  key={li.k}
                  a={li.k}
                  focusTag={vista}
                  span={li.v}
                  isLoading={false}
                  handleActivePage={handleActiveVista}
                />
              );
            })}
          </Nav>
        </div>
        <table className="rounded-xl w-full relative">
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
                        <td className="py-2.5 px-2">{item.ip}</td>
                        <td className="py-2.5 px-2 text-ellipsis whitespace-nowrap overflow-hidden">
                          {item.nome}
                        </td>
                        <td className="py-2.5 px-2">
                          <Status
                            status={isLoading ? "loading" : item.status}
                          />
                        </td>
                        <td className="py-2.5 px-2">{item.tipo}</td>
                        <td className="y-2.5 px-2 w-10">
                          <img className="w-10" src={imgs[item.tipo]} alt="" />
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
          </tbody>
        </table>
      </ContainerWrap>
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
    </>
  );
};

export default Electronica;