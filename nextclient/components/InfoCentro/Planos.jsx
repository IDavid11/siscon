import React, { useState, useEffect, useContext } from "react";
import ModalPlanos from "../Modales/ModalPlanos/ModalPlanos";
import ContainerWrap from "../utils/ContainerWrap";
import UserContext from "../../context/UserContext";

const Planos = ({ planos, setMenuVisible }) => {
  const { grupo } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {}, [planos]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => setMenuVisible(null)}
            className="flex items-center justify-center"
          >
            <img className="h-6" src="/assets/icons/back.png" alt="" />
          </button>
        </div>
        <div className="text-lg font-medium">Planos</div>
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
      <div className="mt-4">
        <table className="rounded-xl w-full relative">
          <tbody>
            {planos &&
              planos.map((plano) => {
                return (
                  <tr
                    onClick={handleShowModal}
                    key={plano._id}
                    className="font-medium hover:bg-gray-200 cursor-pointer"
                  >
                    <td className="py-2.5 px-2 w-10">
                      <img
                        className="h-6"
                        src="/assets/icons/school-building.png"
                        alt=""
                      />
                    </td>
                    <td className="py-2.5 px-2">{plano.nome_edificio}</td>
                    <td className="py-2.5 px-2">
                      <span className="py-1.5 px-4 text-sm bg-gray-200 rounded-full">
                        {plano.plantas.length} plantas
                      </span>
                    </td>
                  </tr>
                );
              })}
            {planos && planos.length < 1 ? (
              <div className="text-center">Non hai planos rexistrados</div>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      {showModal ? (
        <ModalPlanos handleCloseModal={handleShowModal} planos={planos} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Planos;
