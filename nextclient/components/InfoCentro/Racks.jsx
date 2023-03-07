import React, { useState, useContext } from "react";
import ModalRack from "../Modales/ModalRack";
import UserContext from "../../context/UserContext";

const Racks = ({ racks, setMenuVisible }) => {
  const { grupo } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [modalRack, setModalRack] = useState();

  const handleShowModal = (rack) => {
    setShowModal(!showModal);
    setModalRack(rack);
  };
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
        <div className="text-lg font-medium">Racks</div>
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
            {racks &&
              racks.map((rack, index) => {
                return (
                  <tr
                    onClick={(e) => handleShowModal(rack)}
                    key={rack._id}
                    className="text-xs font-medium hover:bg-gray-200 cursor-pointer"
                  >
                    <td className="py-2.5 px-2 w-10">
                      <img
                        className="h-6"
                        src={`${
                          rack.tipo == "Armario"
                            ? "/assets/icons/rack.png"
                            : "/assets/icons/rack2.png"
                        }`}
                        alt=""
                      />
                    </td>
                    <td className="py-2.5 px-2">{rack.nome}</td>
                    <td className="py-2.5 px-2">{rack.ubicacion}</td>
                  </tr>
                );
              })}
            {racks && racks.length < 1 ? (
              <div className="text-center">Non hai racks rexistrados</div>
            ) : (
              <></>
            )}
          </tbody>
        </table>
        {showModal ? (
          <ModalRack handleCloseModal={handleShowModal} rack={modalRack} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Racks;
