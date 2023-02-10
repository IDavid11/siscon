import React, { useState } from "react";
import ModalRack from "../Modales/ModalRack";
import ContainerWrap from "../utils/ContainerWrap";

const Racks = ({ racks }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalRack, setModalRack] = useState();

  const handleShowModal = (rack) => {
    setShowModal(!showModal);
    setModalRack(rack);
  };
  return (
    <>
      <ContainerWrap title={"Racks"} img={"/assets/icons/rack.png"}>
        <div className="absolute top-3 right-3 flex items-center gap-x-2">
          <button onClick={(e) => handleShowModal(undefined)}>
            <img
              className="h-6"
              src="/assets/icons/add-button-black.png"
              alt=""
            />
          </button>
        </div>
        <table className="rounded-xl mt-4 w-full table-fixed">
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
                    <td className="py-2.5 px-2">
                      <span className="py-1.5 px-4 text-sm bg-gray-200 rounded-full">
                        dispositivos
                      </span>
                    </td>
                  </tr>
                );
              })}
            {racks && racks.length < 1 ? (
              <div className="text-center">Non hai racks gardados</div>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </ContainerWrap>
      {showModal ? (
        <ModalRack handleCloseModal={handleShowModal} rack={modalRack} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Racks;
