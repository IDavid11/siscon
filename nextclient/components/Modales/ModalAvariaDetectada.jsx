import React from "react";
import HistorialAvisos from "../Avisos/HistorialAvisos";
import HistorialMonitorizacions from "../Monitorizacions/HistorialMonitorizacions";
import Monitorizacion from "../Monitorizacions/Monitorizacion";
import Modal from "../utils/Modal";

const ModalAvariaDetectada = ({ dispositivo, handleCloseModal }) => {
  return (
    <Modal title={dispositivo?.ip} handleCloseModal={handleCloseModal}>
      <div>
        <Monitorizacion electronica={dispositivo} />
        {dispositivo ? (
          <div className="flex gap-x-40 mt-8">
            <div className="border border-solid border-gray-300 rounded-xl px-10 w-1/2">
              <HistorialMonitorizacions electronica={dispositivo} />
            </div>
            <div className="border border-solid border-gray-300 rounded-xl px-10 w-1/2">
              <HistorialAvisos electronica={dispositivo} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
};

export default ModalAvariaDetectada;
