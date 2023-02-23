import React from "react";
import Aviso from "../Avisos/Aviso";
import HistorialAvisos from "../Avisos/HistorialAvisos";
import Modal from "../utils/Modal";

const ModalAviso = ({ aviso, handleCloseModal }) => {
  return (
    <Modal
      title={`Historial de avisos - ${aviso.electronica.ip}`}
      handleCloseModal={handleCloseModal}
    >
      <div className="border border-solid border-gray-300 rounded-xl p-10">
        <Aviso aviso={aviso} handleCloseModal={handleCloseModal} />
        <HistorialAvisos electronica={aviso.electronica} />
      </div>
    </Modal>
  );
};

export default ModalAviso;
