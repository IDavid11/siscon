import React, { useState } from "react";
import RadioAddButton from "../../../../RadioAddButton/RadioAddButton";
import Modal from "../Modal/Modal";
import RackForm from "./RackForm";

const InformacionRacksForm = ({ setFormularioActivo }) => {
  const [formEngadirNovoRack, setFormEngadirNovoRack] = useState(false);
  const handleOpenModal = () => {
    setFormEngadirNovoRack(true);
  };

  const handleCloseModal = () => {
    setFormEngadirNovoRack(false);
  };

  return (
    <div className="informacion-racks-form">
      <div className="form-title">Racks</div>
      <div className="form-container">
        <div className="racks-container">Sin resultados</div>
        <div className="add-element-button">
          <RadioAddButton handleOpenModal={handleOpenModal} />
        </div>
      </div>
      <div className="add-centro-button">
        <button>Siguiente</button>
      </div>
      {formEngadirNovoRack ? (
        <Modal handleCloseModal={handleCloseModal}>
          <RackForm />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default InformacionRacksForm;
