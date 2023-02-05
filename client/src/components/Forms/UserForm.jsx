import React, { useState } from "react";
import { crearUsuario } from "../../services/usuarios";

const UserForm = ({ user }) => {
  console.log(user);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    name: user?.nome || "",
    username: user?.usuario || "",
    group: user?.grupo || "n1",
  });

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    } else {
      setNewUser({ ...newUser, [e.target.name]: "" });
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const data = await crearUsuario(newUser);
    if (data.error) {
      setIsError(true);
      setError(data.error);
    }
    if (!data.error) {
      setIsError(false);
      setError("");
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleForm}>
      <div>
        <div>
          <label htmlFor="group">Grupo</label>
          <select
            onChange={handleInputChange}
            className="border border-solid border-black rounded-xl p-3 mt-1 w-full"
            name="group"
            id="group"
            defaultValue={newUser.group}
          >
            <option value="n1">N1</option>
            <option value="sistemas">Sistemas N2</option>
            <option value="aplicacions">Aplicacións N2</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="field-label" htmlFor="name">
            Nome
          </label>
          <input
            className="border border-solid border-black rounded-xl p-3 mt-1 w-full"
            id="name"
            name="name"
            type="text"
            value={newUser.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4">
          <label className="field-label" htmlFor="user">
            Usuario
          </label>
          <input
            className="border border-solid border-black rounded-xl p-3 mt-1 w-full"
            id="username"
            name="username"
            type="text"
            value={newUser.username}
            onChange={handleInputChange}
          />
        </div>
        {isError ? (
          <div className="form-add-user-error-container">
            <span>{error}</span>
          </div>
        ) : (
          <></>
        )}
        <div className="mt-4">
          <button
            className="py-3 w-full rounded-xl bg-primary-color text-white"
            type="submit"
          >
            Engadir
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
