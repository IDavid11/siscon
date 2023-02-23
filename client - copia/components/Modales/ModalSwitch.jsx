import React from "react";
import SwitchForm from "../Forms/SwitchForm";
import Modal from "../utils/Modal";

const ModalSwitch = ({ sw, handleCloseModal, setSwitches }) => {
  return (
    <Modal
      title={sw?.nome || "Engadir novo usuario"}
      handleCloseModal={handleCloseModal}
    >
      <div>
        <SwitchForm
          sw={sw}
          handleCloseModal={handleCloseModal}
          setSwitches={setSwitches}
        />
        <div></div>
      </div>
    </Modal>
  );
};

export default ModalSwitch;
