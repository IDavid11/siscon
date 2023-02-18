import React, { useState } from "react";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";

const UsuarioForm = ({ usuario, handleCloseModal, users, setUsers }) => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    usuarioId: usuario?._id || "",
    nome: usuario?.nome || "",
    usuario: usuario?.usuario || "",
    grupo: usuario?.grupo || "n1",
  });

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    } else {
      setNewUser({ ...newUser, [e.target.name]: "" });
    }
  };

  const submitUpdateUsuario = async (e) => {
    e.preventDefault();
    console.log(newUser);
    const res = await instance.post(apiUrls.urlActualizarUsuario, newUser);
    if (res.data.error) {
      setIsError(true);
      setError(res.data.error);
    }
    if (!res.data.error) {
      console.log(users);
      setIsError(false);
      setError("");
      setUsers(res.data);
      handleCloseModal();
    }
  };

  const submitEngadirUsuario = async (e) => {
    e.preventDefault();
    const res = await instance.post(apiUrls.urlEngadirUsuario, newUser);
    if (res.data.error) {
      setIsError(true);
      setError(res.data.error);
    }
    if (!res.data.error) {
      setIsError(false);
      setError("");
      setUsers(res.data);
      handleCloseModal();
    }
  };

  const submitRenovarContrasinal = async (e) => {
    e.preventDefault();
    const res = await instance.post(
      apiUrls.urlRenovarContrasinalUsuario,
      newUser
    );
    if (res.data.error) {
      setIsError(true);
      setError(res.data.error);
    }
    if (!res.data.error) {
      setIsError(false);
      setError("");
      handleCloseModal();
    }
  };

  const deleteUsuario = async () => {
    const res = await instance.post(apiUrls.urlEliminarUsuario, {
      usuarioId: usuario._id,
    });
    setUsers(res.data);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={usuario ? submitUpdateUsuario : submitEngadirUsuario}
    >
      <div className="flex items-end gap-x-5">
        {usuario != undefined ? (
          <div className="mb-1">
            <button
              onClick={deleteUsuario}
              className="h-8 w-8 bg-red-400 rounded-lg flex items-center justify-center"
            >
              <img
                style={{ width: "12px" }}
                src="/assets/icons/delete.png"
                alt=""
              />
            </button>
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-col">
          <label htmlFor="nome" className="font-medium text-center mb-4">
            Nome
          </label>
          <input
            type="text"
            name="nome"
            value={newUser.nome}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 h-10 rounded-lg px-4 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="usuario" className="font-medium text-center mb-4">
            Usuario
          </label>
          <input
            type="text"
            name="usuario"
            value={newUser.usuario}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 h-10 rounded-lg px-4 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="grupo" className="font-medium text-center mb-4">
            Grupo
          </label>
          <select
            name="grupo"
            id="grupo"
            defaultValue={newUser.grupo}
            onChange={handleInputChange}
            className="border border-solid border-gray-300 rounded-lg h-10 px-4 outline-none"
          >
            <option value="n1">N1</option>
            <option value="sistemas">Sistemas N2</option>
            <option value="aplicacions">Aplicacións N2</option>
          </select>
        </div>
        {isError ? (
          <div className="form-add-user-error-container">
            <span>{error}</span>
          </div>
        ) : (
          <></>
        )}
        <div>
          {usuario != undefined ? (
            <button
              onClick={submitUpdateUsuario}
              className="bg-primary-color rounded-lg h-10 px-10 text-white font-medium"
            >
              Gardar
            </button>
          ) : (
            <button
              onClick={submitEngadirUsuario}
              className="bg-primary-color rounded-lg h-10 px-10 text-white font-medium"
            >
              Engadir
            </button>
          )}
        </div>
      </div>
      {usuario != undefined ? (
        <div className="mt-4">
          <button className="font-medium" onClick={submitRenovarContrasinal}>
            Renovar contrasinal
          </button>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};

export default UsuarioForm;
