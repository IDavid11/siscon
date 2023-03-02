import React, { useContext, useState } from "react";
import ContainerWrap from "../utils/ContainerWrap";
import CentroContext from "@/context/CentroContext";
import LoadingContext from "@/context/LoadingContext";
import Loading from "../utils/Loading";
import TableContainer from "../utils/TableContainer";
import ModalAvariaDetectada from "../Modales/ModalAvariaDetectada";

const AvariasDetectadas = () => {
  const { isLoading } = useContext(LoadingContext);
  const { avarias } = useContext(CentroContext);
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
        span={avarias?.length}
      >
        <TableContainer>
          {avarias && avarias.length > 0 ? (
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
                        <td className="py-2.5 px-2 w-2">
                          <span className="p-px rounded-full bg-red-400"></span>
                        </td>
                        <td className="py-2.5 px-2">{avaria.ip}</td>
                        <td className="py-2.5 px-2">{avaria.tipo}</td>
                        <td className="py-2.5 px-2">
                          {avaria.modelo || "Sen identificar"}
                        </td>
                        <td className="py-2.5 px-2">
                          {avaria.ubicacion || "Sen ubicar"}
                        </td>
                      </tr>
                    );
                  })}

                {isLoading ? <Loading /> : <></>}
              </tbody>
            </table>
          ) : (
            <>
              {avarias && avarias.length < 1 && !isLoading ? (
                <div className="text-center">Non se detectaron avarías</div>
              ) : (
                <></>
              )}
            </>
          )}
          {isLoading ? <Loading /> : <></>}
        </TableContainer>
      </ContainerWrap>
      {showModal ? (
        <ModalAvariaDetectada
          handleCloseModal={handleShowModal}
          dispositivo={modalMonitorizacion}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default AvariasDetectadas;
