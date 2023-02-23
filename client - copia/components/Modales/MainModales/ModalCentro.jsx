import React from "react";
import Centro from "../../../pages/Centro/Centro";
import Modal from "../../utils/Modal";

const ModalAviso = ({ centro, handleCloseModal }) => {
  return (
    <Modal title={centro.centro.centro} handleCloseModal={handleCloseModal}>
      <div className="border border-solid border-gray-300 rounded-xl p-10">
        <Centro centro={centro} />
      </div>
    </Modal>
  );
};

export default ModalAviso;
