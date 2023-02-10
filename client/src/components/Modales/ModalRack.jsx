import React from "react";
import RackForm from "../Forms/RackForm";
import Modal from "../utils/Modal";

const ModalRack = ({ rack, handleCloseModal }) => {
  return (
    <Modal
      title={rack?.nome || "Engadir novo rack"}
      handleCloseModal={handleCloseModal}
    >
      <div>
        <RackForm rack={rack} handleCloseModal={handleCloseModal} />
        <div></div>
      </div>
    </Modal>
  );
};

export default ModalRack;
