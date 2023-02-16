import React, { useState, useEffect } from "react";
import UsuarioItem from "../../../components/Admin/UsuarioItem";
import { buscarUsuarios } from "../../../services/usuarios";
import ModalUsuario from "../../../components/Modales/ModalUsuario";
import ContainerWrap from "../../../components/utils/ContainerWrap";

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalUsuario, setModalUsuario] = useState();

  const getUsers = async () => {
    const usuarios = await buscarUsuarios();
    setUsers(usuarios);
  };

  const handleShowModal = (usuario) => {
    setShowModal(!showModal);
    setModalUsuario(usuario);
  };

  useEffect(() => {
    if (users.length < 1) getUsers();
  }, [users]);

  return (
    <>
      <div className="add-user-container">
        <button
          className="flex itesm-center justify-center py-4 px-10 rounded-xl float-right mb-4 bg-primary-color text-white"
          onClick={(e) => handleShowModal(undefined)}
        >
          <div className="flex items-center justify-center">
            <img className="h-5" src="assets/icons/add-user.png" alt="" />
            <span className="ml-2">Engadir usuario</span>
          </div>
        </button>
      </div>
      <ContainerWrap>
        <table className="rounded-xl overflow-hidden w-full table-fixed">
          <tbody>
            <tr className="h-10 bg-gray-200">
              <th className="text-left px-20">Nome</th>
              <th className="text-left px-20">Usuario</th>
              <th className="text-left px-20">Grupo</th>
              <th className="text-left px-20">Accións</th>
            </tr>
            {users.map((usuario) => {
              return (
                <UsuarioItem
                  key={usuario._id}
                  usuario={usuario}
                  handleShowModal={handleShowModal}
                  users={users}
                  setUsers={setUsers}
                />
              );
            })}
          </tbody>
        </table>
      </ContainerWrap>
      {showModal ? (
        <ModalUsuario
          usuario={modalUsuario}
          handleCloseModal={handleShowModal}
          users={users}
          setUsers={setUsers}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Usuarios;
