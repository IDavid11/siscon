import React from "react";
import HistorialMonitorizacions from "../Monitorizacions/HistorialMonitorizacions";
import Monitorizacion from "../Monitorizacions/Monitorizacion";
import Modal from "../utils/Modal";

const ModalMonitorizacion = ({ monitorizacion, handleCloseModal }) => {
  return (
    <Modal
      title={`Historial de monitorizacións detectadas - ${monitorizacion.electronica.ip}`}
      handleCloseModal={handleCloseModal}
    >
      <div className="border border-solid border-gray-300 rounded-xl p-10">
        <Monitorizacion
          electronica={monitorizacion.electronica}
          handleCloseModal={handleCloseModal}
        />
        <HistorialMonitorizacions electronica={monitorizacion.electronica} />
      </div>
    </Modal>
  );
};

export default ModalMonitorizacion;
