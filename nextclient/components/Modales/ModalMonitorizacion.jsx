import React from "react";
import HistorialMonitorizacions from "../Monitorizacions/HistorialMonitorizacions";
import Monitorizacion from "../Monitorizacions/Monitorizacion";
import Modal from "../utils/Modal";

const ModalMonitorizacion = ({ avaria, handleCloseModal }) => {
  return (
    <Modal
      title={`Historial de avarías detectadas - ${avaria.ip}`}
      handleCloseModal={handleCloseModal}
    >
      <div className="border border-solid border-gray-300 rounded-xl p-10">
        <Monitorizacion avaria={avaria} handleCloseModal={handleCloseModal} />
        <HistorialMonitorizacions electronica={avaria} />
      </div>
    </Modal>
  );
};

export default ModalMonitorizacion;
