import React, { useState } from "react";
import RadioInput from "../../../../Inputs/RadioInput";

const InformacionBasicaForm = ({ setFormularioActivo }) => {
  const initialState = {
    codigo: "",
    centro: "",
    sf: "",
    concello: "",
    proxecto: "",
    comentario: "",
  };
  const [novoCentro, setNovoCentro] = useState(initialState);
  const [radioInputValue, setRadioInputValue] = useState("");

  const handleFormularioActivo = () => {
    setFormularioActivo("informacion-rede");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleFormularioActivo();
  };

  const handleRadioInputChange = (e) => {
    console.log(e.target.id);
    setRadioInputValue(e.target.id);
  };

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setNovoCentro({ ...novoCentro, [e.target.name]: e.target.value });
    } else {
      setNovoCentro({ ...novoCentro, [e.target.name]: "" });
    }
  };

  return (
    <div className="informacion-basica-form">
      <div className="input-row">
        <div className="input-field short-input">
          <label className="label-fw" htmlFor="codigo">
            Código
          </label>
          <input type="text" name="codigo" onChange={handleInputChange} />
        </div>
        <div className="input-field">
          <label className="label-fw" htmlFor="nome-centro">
            Nome do centro
          </label>
          <input type="text" name="centro" onChange={handleInputChange} />
        </div>
      </div>
      <div className="input-row">
        <div className="input-field short-input">
          <label className="label-fw" htmlFor="sf">
            SF
          </label>
          <input type="text" name="sf" onChange={handleInputChange} />
        </div>
        <div className="input-field">
          <label className="label-fw" htmlFor="concello">
            Concello
          </label>
          <input type="text" name="concello" onChange={handleInputChange} />
        </div>
      </div>
      <div className="input-row">
        <label className="label-fw" htmlFor="proxecto">
          Proxecto
        </label>
        <RadioInput
          label={"Estándar"}
          name={"estandar"}
          value={radioInputValue}
          handleRadioInputChange={handleRadioInputChange}
        />
        <RadioInput
          label={"ABALAR"}
          name={"abalar"}
          value={radioInputValue}
          handleRadioInputChange={handleRadioInputChange}
        />
        <RadioInput
          label={"EVA"}
          name={"eva"}
          value={radioInputValue}
          handleRadioInputChange={handleRadioInputChange}
        />
      </div>
      <div className="input-row">
        <div className="textarea-field">
          <label className="label-fw" htmlFor="comentario">
            Comentario
          </label>
          <textarea name="comentario" onChange={handleInputChange}></textarea>
        </div>
      </div>
      <div className="add-centro-button">
        <button onClick={handleFormSubmit}>Siguiente</button>
      </div>
    </div>
  );
};

export default InformacionBasicaForm;
