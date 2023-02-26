import CentroContext from "@/context/CentroContext";
import UserContext from "@/context/UserContext";
import React, { useContext, useState } from "react";
import ModalAviso from "../Modales/ModalAviso";
import ModalMonitorizacion from "../Modales/ModalMonitorizacion";

const Monitorizacions = ({ setMenuVisible }) => {
  const { monitorizacions } = useContext(CentroContext);
  const { grupo } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [modalMonitorizacion, setModalMonitorizacion] = useState();

  const handleShowModal = (monitorizacion) => {
    setShowModal(!showModal);
    setModalMonitorizacion(monitorizacion);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => setMenuVisible(null)}
            className="flex items-center"
          >
            <img className="h-6" src="/assets/icons/back.png" alt="" />
          </button>
        </div>
        <div className="text-lg font-medium ml-auto mr-auto">
          Monitorizacións abertas
        </div>
      </div>
      <div className="mt-4 max-h-[260px]">
        {monitorizacions && monitorizacions.length > 0 ? (
          <table className="rounded-xl w-full relative">
            <tbody>
              {monitorizacions &&
                monitorizacions.map((monitorizacion) => {
                  var today = new Date();
                  var dd = String(today.getDate()).padStart(2, "0");
                  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                  today = dd + "/" + mm;

                  var data = monitorizacion.data.split(" ")[0].split("-");
                  data = data[2] + "/" + data[1];
                  var hora = monitorizacion.data.split(" ")[1].split(":");
                  hora = hora[0] + ":" + hora[1];
                  return (
                    <tr
                      key={monitorizacion._id}
                      className="font-medium hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleShowModal(monitorizacion)}
                    >
                      <td className="py-2.5 px-2 w-2">
                        <span className="p-px bg-red-400 rounded-full"></span>
                      </td>
                      <td className="py-2.5 px-2 w-[20%]">
                        {data == today ? hora : data}
                      </td>
                      <td className="py-2.5 px-2 w-[40%]">
                        {monitorizacion.electronica.ip}
                      </td>
                      <td className="py-2.5 px-2 w-[40%]">
                        <span className="bg-red-400 rounded-full py-1 px-3">
                          {monitorizacion.electronica.tipo}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-4">
            Non hai monitorizacións rexistradas
          </div>
        )}
      </div>

      {showModal ? (
        <ModalMonitorizacion
          handleCloseModal={handleShowModal}
          monitorizacion={modalMonitorizacion}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Monitorizacions;
