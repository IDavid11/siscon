import React from "react";
import LanForm from "../Forms/LanForm";
import Modal from "../utils/Modal";

const ModalLAN = ({ lan, handleCloseModal }) => {
  return (
    <Modal
      title={lan?.rango || "Engadir nova lan"}
      handleCloseModal={handleCloseModal}
    >
      <div>
        <LanForm lan={lan} handleCloseModal={handleCloseModal} />
        <div></div>
      </div>
    </Modal>
  );
};

export default ModalLAN;
