import React, { useContext, useEffect, useState } from "react";
import ContainerWrap from "../utils/ContainerWrap";
import Status from "../utils/Items/Status";
import ModalMonitorizacion from "../Modales/ModalMonitorizacion";

const AvariasDetectadas = ({ avarias }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMonitorizacion, setModalMonitorizacion] = useState();

  const handleShowModal = (avaria) => {
    setShowModal(!showModal);
    setModalMonitorizacion(avaria);
  };

  return (
    <>
      <ContainerWrap
        title={"Avarías detectadas"}
        img={"/assets/icons/danger.png"}
        span={avarias.length}
      >
        <table className="rounded-xl w-full relative">
          <tbody>
            {avarias &&
              avarias.map((avaria) => {
                return (
                  <tr
                    key={avaria._id}
                    className="font-medium hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleShowModal(avaria)}
                  >
                    <td className="py-2.5 px-2">{avaria.ip}</td>
                    <td className="py-2.5 px-2">{avaria.tipo}</td>
                    <td className="py-2.5 px-2">
                      {avaria.modelo || "Sen identificar"}
                    </td>
                    <td className="py-2.5 px-2">
                      {avaria.ubicacion || "Sen ubicar"}
                    </td>
                    <Status status={avaria.status} />
                  </tr>
                );
              })}
            {avarias && avarias.length < 1 ? (
              <div className="text-center">Non se detectaron avarías</div>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </ContainerWrap>
      {showModal ? (
        <ModalMonitorizacion
          handleCloseModal={handleShowModal}
          avaria={modalMonitorizacion}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default AvariasDetectadas;
