import React, { useState, useEffect } from "react";
import BasicInput from "../../../../Inputs/BasicInput";
import RadioInput from "../../../../Inputs/RadioInput";

const InformacionRedeForm = ({ setFormularioActivo }) => {
  const initialStateLans = [
    {
      id: 1,
      nome: "Rango principal",
      rango: "",
      dhcp: "non",
      principal: false,
    },
    {
      id: 2,
      nome: "Rango secundario",
      rango: "",
      dhcp: "non",
      principal: false,
    },
  ];
  const initialState = {
    tap: "",
    tar: "",
    edu_xunta_es: false,
    controladora: "",
    rango: "",
    principal: false,
  };
  const [infoLans, setInfoLans] = useState(initialStateLans);
  const [infoRede, setInfoRede] = useState(initialState);

  const handleRadioInputChange = (e) => {
    const newState = infoLans.map((lan) => {
      if (lan.id == e.target.id) {
        return { ...lan, dhcp: e.target.name };
      }
      return lan;
    });
    setInfoLans(newState);
  };

  const handleLanCheckboxChange = (e) => {
    const newState = infoLans.map((lan) => {
      if (lan.id == e.target.id) {
        return { ...lan, principal: !lan[e.target.name] };
      }
      return { ...lan, principal: false };
    });
    setInfoLans(newState);
  };

  const handleCheckboxChange = (e) => {
    setInfoRede({ ...infoRede, [e.target.name]: !infoRede[e.target.name] });
  };

  const handleLanInputChange = (e) => {
    const newState = infoLans.map((lan) => {
      if (lan.id == e.target.id) {
        return { ...lan, rango: e.target.value };
      }
      return lan;
    });
    setInfoLans(newState);
  };

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setInfoRede({ ...infoRede, [e.target.name]: e.target.value });
      console.log(e.target.value);
    } else {
      setInfoRede({ ...infoRede, [e.target.name]: "" });
    }
  };

  const handleFormularioActivo = () => {
    setFormularioActivo("informacion-racks");
  };

  useEffect(() => {
    console.log(infoLans);
  }, [infoRede, setInfoRede, infoLans, setInfoLans]);

  return (
    <div className="informacion-rede-form">
      <div className="input-row">
        <div className="lan-fields-container">
          <div className="fields-headers">
            <div className="lan-header">LAN</div>
            <div className="dhcp-header">DHCP</div>
            <div className="principal-header">Principal</div>
          </div>
          {infoLans.map((lan) => {
            return (
              <div key={lan.id} className="field-container">
                <div className="fields-container">
                  <div className="lan-input">
                    <BasicInput
                      id={lan.id}
                      label={lan.nome}
                      name={"rango_principal"}
                      handleInputChange={handleLanInputChange}
                    />
                  </div>
                  <div className="field radio-field">
                    <div className="input-radios-container">
                      <RadioInput
                        label={"Si"}
                        id={lan.id}
                        name={"si"}
                        value={lan.dhcp}
                        handleRadioInputChange={handleRadioInputChange}
                      />
                      <RadioInput
                        label={"Non"}
                        id={lan.id}
                        name={"non"}
                        value={lan.dhcp}
                        handleRadioInputChange={handleRadioInputChange}
                      />
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    id={lan.id}
                    name="principal"
                    checked={lan.principal}
                    onChange={handleLanCheckboxChange}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="input-row">
        <div className="input-field">
          <label className="label-fw" htmlFor="tap">
            TAP
          </label>
          <input type="text" name="tap" onChange={handleInputChange} />
        </div>
        <div className="input-field">
          <label className="label-fw" htmlFor="tar">
            TAR
          </label>
          <input type="text" name="tar" onChange={handleInputChange} />
        </div>
      </div>
      <div className="input-row">
        <input
          type="checkbox"
          name="edu_xunta_es"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="edu_xunta_es">edu.xunta.es</label>
      </div>
      {infoRede.edu_xunta_es ? (
        <>
          <div className="input-row">
            <div className="input-field">
              <label className="label-fw" htmlFor="controladora">
                Controladora
              </label>
              <input
                type="text"
                name="controladora"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <label className="label-fw" htmlFor="rango">
                Rango
              </label>
              <input
                type="text"
                name="rango"
                disabled={infoRede.principal}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="input-row">
            <input
              type="checkbox"
              name="principal"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="rango_principal">Está no rango principal</label>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="add-centro-button">
        <button onClick={handleFormularioActivo}>Siguiente</button>
      </div>
    </div>
  );
};

export default InformacionRedeForm;
