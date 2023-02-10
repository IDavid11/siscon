import React from "react";
import ElectronicaForm from "../Forms/ElectronicaForm";
import Modal from "../utils/Modal";

const modalElectronica = ({
  dispositivo,
  handleCloseModal,
  tiposDispositivos,
  modelos,
}) => {
  return (
    <Modal
      title={dispositivo?.ip || "Engadir novo dispositivo"}
      handleCloseModal={handleCloseModal}
    >
      <div>
        <ElectronicaForm
          dispositivo={dispositivo}
          handleCloseModal={handleCloseModal}
          tiposDispositivos={tiposDispositivos}
          modelos={modelos}
        />
        <div></div>
      </div>
    </Modal>
  );
};

export default modalElectronica;
