import React, { useState, useContext } from "react";
import ContainerWrap from "../utils/ContainerWrap";
import ModalLAN from "../Modales/ModalLAN";
import UserContext from "../../context/UserContext";

const LANs = ({ lans }) => {
  const { grupo } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [modalLan, setModalLan] = useState();

  const handleShowModal = (lan) => {
    setShowModal(!showModal);
    setModalLan(lan);
  };

  return (
    <>
      <ContainerWrap title={"LANs"}>
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
        <table className="rounded-xl mt-4 w-full table-fixed">
          <tbody>
            {lans &&
              lans.map((lan) => {
                return (
                  <tr
                    key={lan._id}
                    className="font-medium hover:bg-gray-200 cursor-pointer"
                  >
                    <td
                      onClick={(e) => {
                        handleShowModal(lan);
                      }}
                      className="py-2.5 px-2"
                    >
                      {lan.rango}
                    </td>
                    <td
                      onClick={(e) => {
                        handleShowModal(lan);
                      }}
                    >
                      {lan.rede || "Sen determinar"}
                    </td>
                    <td
                      onClick={(e) => {
                        handleShowModal(lan);
                      }}
                      className="py-2.5 px-2"
                    >
                      {lan.dhcp ? "DHCP" : "SEN DHCP"}
                    </td>
                    <td
                      onClick={(e) => {
                        handleShowModal(lan);
                      }}
                      className="py-2.5 px-2"
                    >
                      <span className="py-1.5 px-4 text-sm bg-gray-200 rounded-full">
                        {lan.electronica?.length || "0"} dispositivos
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </ContainerWrap>
      {showModal ? (
        <ModalLAN handleCloseModal={handleShowModal} lan={modalLan} />
      ) : (
        <></>
      )}
    </>
  );
};

export default LANs;
