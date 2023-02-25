import CentroContext from "@/context/CentroContext";
import UserContext from "@/context/UserContext";
import React, { useContext, useState } from "react";
import ModalAviso from "../Modales/ModalAviso";

const Avisos = ({ setMenuVisible }) => {
  const { avisos } = useContext(CentroContext);
  const { grupo } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [modalAviso, setModalAviso] = useState();

  const handleShowModal = (aviso) => {
    setShowModal(!showModal);
    setModalAviso(aviso);
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
          Log dos últimos 7 días
        </div>
      </div>
      <div className="mt-4 max-h-[260px]">
        {avisos && avisos.length > 0 ? (
          <table className="rounded-xl w-full relative">
            <tbody>
              {avisos &&
                avisos.map((aviso) => {
                  var today = new Date();
                  var dd = String(today.getDate()).padStart(2, "0");
                  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                  today = dd + "/" + mm;

                  var data = aviso.data.split(" ")[0].split("-");
                  data = data[2] + "/" + data[1];
                  var hora = aviso.data.split(" ")[1].split(":");
                  hora = hora[0] + ":" + hora[1];
                  return (
                    <tr
                      key={aviso._id}
                      className="font-medium hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleShowModal(aviso)}
                    >
                      <td className="py-2.5 px-2 w-2">
                        <span className="p-px bg-red-400 rounded-full"></span>
                      </td>
                      <td className="py-2.5 px-2 w-[20%]">
                        {data == today ? hora : data}
                      </td>
                      <td className="py-2.5 px-2 w-[40%]">
                        {aviso.electronica.ip}
                      </td>
                      <td className="py-2.5 px-2 w-[40%]">
                        <span className="bg-red-400 rounded-full py-1 px-3">
                          {aviso.electronica.tipo}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-4">Non hai avisos rexistrados</div>
        )}
      </div>

      {showModal ? (
        <ModalAviso handleCloseModal={handleShowModal} aviso={modalAviso} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Avisos;
