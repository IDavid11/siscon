import React from "react";
import RackForm from "../Forms/RackForm";
import RackInfo from "../MaisInfoModales/RackInfo";
import Modal from "../utils/Modal";

const ModalRack = ({ rack, handleCloseModal }) => {
  return (
    <Modal
      title={rack?.nome || "Engadir novo rack"}
      handleCloseModal={handleCloseModal}
    >
      <div>
        <RackForm rack={rack} handleCloseModal={handleCloseModal} />
        <RackInfo rack={rack} />
      </div>
    </Modal>
  );
};

export default ModalRack;
