import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modal/Modal";
import UsuarioItem from "../../../components/Admin/Usuarios/UsuarioItem";
import { buscarUsuarios } from "../../../services/usuarios";
import UserForm from "../../../components/Modal/Forms/UserForm";

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editUser, setEditUser] = useState();
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  const getUsers = async () => {
    const usuarios = await buscarUsuarios();
    setUsers(usuarios);
  };

  const handleOpenModal = () => {
    setShowAddUserModal(true);
  };

  const handleCloseModal = () => {
    setShowAddUserModal(false);
  };

  const handleOpenModalEditUser = () => {
    setShowEditUserModal(true);
  };

  const handleCloseModalEditUser = () => {
    setShowEditUserModal(false);
  };

  useEffect(() => {
    getUsers();
    console.log(editUser);
  }, [editUser]);

  return (
    <div className="w-fit">
      <div className="add-user-container">
        <button
          className="flex itesm-center justify-center py-4 px-10 rounded-xl float-right mb-4 bg-primary-color text-white"
          onClick={handleOpenModal}
        >
          <div className="flex items-center justify-center">
            <img className="h-5" src="assets/icons/add-user.png" alt="" />
            <span className="ml-2">Engadir usuario</span>
          </div>
        </button>
      </div>
      <table className="rounded-xl overflow-hidden">
        <tbody className="tbody-screen remove-scrollbar bg-white rounded-b-xl overflow-hidden">
          <tr className="h-10 bg-gray-200">
            <th className="text-left px-20">Nome</th>
            <th className="text-left px-20">Usuario</th>
            <th className="text-left px-20">Grupo</th>
            <th className="text-left px-20">Accións</th>
          </tr>
          {users.map((user) => {
            return (
              <UsuarioItem
                key={user._id}
                user={user}
                handleOpenModalEditUser={handleOpenModalEditUser}
                setEditUser={setEditUser}
              />
            );
          })}
        </tbody>
      </table>
      {showAddUserModal ? (
        <Modal handleCloseModal={handleCloseModal}>
          <UserForm />
        </Modal>
      ) : (
        <></>
      )}
      {showEditUserModal ? (
        <Modal handleCloseModal={handleCloseModalEditUser}>
          <UserForm user={editUser} />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Usuarios;
