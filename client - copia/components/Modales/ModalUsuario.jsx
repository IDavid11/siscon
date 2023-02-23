import React from "react";
import UsuarioForm from "../Forms/UsuarioForm";
import Modal from "../utils/Modal";

const ModalUsuario = ({ usuario, handleCloseModal, users, setUsers }) => {
  return (
    <Modal
      title={usuario?.nome || "Engadir novo usuario"}
      handleCloseModal={handleCloseModal}
    >
      <div>
        <UsuarioForm
          usuario={usuario}
          handleCloseModal={handleCloseModal}
          users={users}
          setUsers={setUsers}
        />
        <div></div>
      </div>
    </Modal>
  );
};

export default ModalUsuario;
