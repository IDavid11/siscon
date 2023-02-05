import React, { useState } from "react";

const AddSwitchForm = ({ handleCloseModal }) => {
  const initialState = { marca: "", modelo: "", portos: "", velocidade: "" };
  const [newSwitch, setnewSwitch] = useState(initialState);

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setnewSwitch({ ...newSwitch, [e.target.name]: e.target.value });
    } else {
      setnewSwitch({ ...newSwitch, [e.target.name]: "" });
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    //const data = await crearUsuario(newUser);
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleForm}>
        <div>
          <div className="mt-4">
            <label className="field-label" htmlFor="name">
              Marca e modelo
            </label>
            <input
              className="border border-solid border-black rounded-xl p-3 mt-1 w-full"
              id="name"
              name="name"
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <label className="field-label" htmlFor="portos">
              Nº portos
            </label>
            <input
              className="border border-solid border-black rounded-xl p-3 mt-1 w-full"
              id="portos"
              name="portos"
              type="text"
              onChange={handleInputChange}
            />
          </div>
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
    </div>
  );
};

export default AddSwitchForm;
