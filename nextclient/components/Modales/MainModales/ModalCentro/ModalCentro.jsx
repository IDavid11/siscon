import CentroContext from "@/context/CentroContext";
import React, { useContext } from "react";
import Centro from "../../../../pages/Centro/Centro";
import Modal from "../../../utils/Modal";

const ModalAviso = ({ handleCloseModal }) => {
  const { infoCentro } = useContext(CentroContext);

  return (
    <Modal title={infoCentro.centro} handleCloseModal={handleCloseModal}>
      <div className="border border-solid border-gray-300 rounded-xl">
        <Centro />
      </div>
    </Modal>
  );
};

export default ModalAviso;
