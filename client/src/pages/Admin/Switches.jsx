import React, { useState, useEffect } from "react";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";
import ContainerWrap from "../../components/utils/ContainerWrap";
import ModalSwitch from "../../components/Modales/ModalSwitch";

const Switches = () => {
  const [switches, setSwitches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalUsuario, setModalUsuario] = useState();

  const getSwitches = async () => {
    const res = await instance.get(apiUrls.urlObterSwitches);
    setSwitches(res.data);
  };

  const handleShowModal = (usuario) => {
    setShowModal(!showModal);
    setModalUsuario(usuario);
  };

  useEffect(() => {
    getSwitches();
  }, []);

  return (
    <>
      <div className="add-user-container">
        <button
          className="flex itesm-center justify-center py-4 px-10 rounded-xl float-right mb-4 bg-primary-color text-white"
          onClick={(e) => handleShowModal(undefined)}
        >
          <div className="flex items-center justify-center">
            <img className="h-5" src="assets/icons/add-button.png" alt="" />
            <span className="ml-2 pb-px">Engadir switch</span>
          </div>
        </button>
      </div>
      <ContainerWrap>
        <table className="rounded-xl w-full table-fixed">
          <tbody>
            <tr className="h-10 bg-gray-200">
              <th className="text-left px-20">Marca e modelo</th>
              <th className="text-left px-20">Portos</th>
            </tr>
            {switches.map((sw) => {
              return (
                <tr
                  key={sw._id}
                  onClick={(e) => handleShowModal(sw)}
                  className="font-medium hover:bg-gray-200 cursor-pointer"
                >
                  <td className="text-left px-20 py-2">{sw.nome}</td>
                  <td className="text-left px-20 py-2">{sw.portos}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </ContainerWrap>
      {showModal ? (
        <ModalSwitch
          sw={modalUsuario}
          handleCloseModal={handleShowModal}
          setSwitches={setSwitches}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Switches;
