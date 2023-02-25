import React from "react";
import HistorialAvisos from "../Avisos/HistorialAvisos";
import ElectronicaForm from "../Forms/ElectronicaForm";
import HistorialMonitorizacions from "../Monitorizacions/HistorialMonitorizacions";
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
        {dispositivo ? (
          <div className="flex gap-x-40 mt-8">
            <div className="border border-solid border-gray-300 rounded-xl px-10 w-1/2">
              <HistorialMonitorizacions electronica={dispositivo} />
            </div>
            <div className="border border-solid border-gray-300 rounded-xl px-10 w-1/2">
              <HistorialAvisos electronica={dispositivo} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
};

export default modalElectronica;
