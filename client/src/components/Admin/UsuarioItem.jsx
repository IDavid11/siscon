import React from "react";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";

const UsuarioItem = ({ usuario, handleShowModal, users, setUsers }) => {
  const deleteUsuario = async () => {
    await instance.post(apiUrls.urlEliminarUsuario, {
      usuario: usuario.usuario,
    });
    const varUsers = users;
    const usuarioEliminado = varUsers.find((u) => u.usuario == usuario.usuario);
    const index = varUsers.indexOf(usuarioEliminado);
    if (index > -1) {
      varUsers.splice(index, 1);
    }
    setUsers(varUsers);
  };

  return (
    <tr>
      <td className="py-3 px-20">{usuario.nome}</td>
      <td className="py-3 px-20">{usuario.usuario}</td>
      <td className="py-3 px-20">{usuario.grupo}</td>
      <td className="py-3 px-20 flex items-center cell-actions">
        <div className="mx-1 relative w-5 h-5">
          <button title="Editar" onClick={(e) => handleShowModal(usuario)}>
            <img
              className="h-full"
              src="/assets/icons/edit-user-black.png"
              alt=""
            />
          </button>
        </div>
        <div className="mx-1 relative w-5 h-5">
          <button title="Renovar contrasinal">
            <img
              className="h-full"
              src="/assets/icons/key-user-black.png"
              alt=""
            />
          </button>
        </div>
        <div className="mx-1 relative w-5 h-5">
          <button title="Eliminar" onClick={deleteUsuario}>
            <img
              className="h-full"
              src="/assets/icons/remove-user-black.png"
              alt=""
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UsuarioItem;
