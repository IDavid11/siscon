import React, { useState, useEffect } from "react";
import ModalPlanos from "../Modales/ModalPlanos/ModalPlanos";
import ContainerWrap from "../utils/ContainerWrap";

const Planos = ({ planos }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {}, [planos]);

  return (
    <>
      <ContainerWrap
        title={"Planos"}
        img={"/assets/icons/file-upload-black.png"}
      >
        <div className="absolute top-3 right-3 flex items-center gap-x-2">
          <button onClick={handleShowModal}>
            <img
              className="h-6"
              src="/assets/icons/add-button-black.png"
              alt=""
            />
          </button>
        </div>
        <table className="rounded-xl mt-4 w-full">
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
      </ContainerWrap>
      {showModal ? (
        <ModalPlanos handleCloseModal={handleShowModal} planos={planos} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Planos;
