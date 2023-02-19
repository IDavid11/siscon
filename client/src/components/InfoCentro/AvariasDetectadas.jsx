import React, { useContext, useEffect, useState } from "react";
import ContainerWrap from "../utils/ContainerWrap";
import TabsInfoContext from "../../context/TabsInfoContext";
import Status from "../utils/Items/Status";
import ModalMonitorizacion from "../Modales/ModalMonitorizacion";

const AvariasDetectadas = () => {
  const { tabsInfo, selectedTab } = useContext(TabsInfoContext);

  const [avariasDetectadas, setAvariasDetectadas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMonitorizacion, setModalMonitorizacion] = useState();

  const handleShowModal = (avaria) => {
    setShowModal(!showModal);
    setModalMonitorizacion(avaria);
  };

  useEffect(() => {
    setAvariasDetectadas(
      tabsInfo[selectedTab].centro.rede.electronica.filter(
        (e) => e.status == "down"
      )
    );
  }, [tabsInfo]);

  return (
    <>
      <ContainerWrap
        title={"Avarías detectadas"}
        img={"/assets/icons/danger.png"}
        span={avariasDetectadas.length}
      >
        <table className="rounded-xl mt-4 w-full">
          <tbody>
            {avariasDetectadas &&
              avariasDetectadas.map((avaria) => {
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
            {avariasDetectadas && avariasDetectadas.length < 1 ? (
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
