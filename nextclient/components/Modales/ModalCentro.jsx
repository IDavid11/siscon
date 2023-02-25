import React from "react";
import CentroForm from "../Forms/CentroForm";
import Modal from "../utils/Modal";

const ModalCentro = ({ centro, handleCloseModal, setData }) => {
  return (
    <Modal
      title={centro?.centro || "Engadir novo centro"}
      handleCloseModal={handleCloseModal}
    >
      <div>
        <CentroForm
          centro={centro}
          handleCloseModal={handleCloseModal}
          setData={setData}
        />
        <div></div>
      </div>
    </Modal>
  );
};

export default ModalCentro;
