import React from "react";

const UsuarioItem = ({ user, handleOpenModalEditUser, setEditUser }) => {
  const handleEditUser = () => {
    handleOpenModalEditUser(true);
    setEditUser(user);
  };

  return (
    <tr>
      <td className="py-3 px-20">{user.nome}</td>
      <td className="py-3 px-20">{user.usuario}</td>
      <td className="py-3 px-20">{user.grupo}</td>
      <td className="py-3 px-20 flex items-center cell-actions">
        <div className="mx-1 relative w-5 h-5">
          <button title="Editar" onClick={handleEditUser}>
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
          <button title="Eliminar">
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
