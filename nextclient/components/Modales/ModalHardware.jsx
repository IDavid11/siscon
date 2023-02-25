import React from "react";
import HardwareForm from "../Forms/HardwareForm";
import Modal from "../utils/Modal";

const ModalHardware = ({ hardware, handleCloseModal, setData }) => {
  return (
    <Modal
      title={`${
        hardware?._id
          ? hardware?.marca + " " + hardware?.modelo
          : "Engadir hardware"
      } `}
      handleCloseModal={handleCloseModal}
    >
      <div>
        <HardwareForm
          hardware={hardware}
          handleCloseModal={handleCloseModal}
          setData={setData}
        />
        <div></div>
      </div>
    </Modal>
  );
};

export default ModalHardware;
