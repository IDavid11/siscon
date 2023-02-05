import React, { useState } from "react";
import RadioInput from "../utils/Inputs/RadioInput";
import { randomImg } from "../../utils/randomImg";

const InfoCentroAdmin = ({ centro, updatedCentro, setUpdatedCentro }) => {
  const img = randomImg();

  const handleRadioInputChange = (e) => {
    setUpdatedCentro({ ...updatedCentro, proxecto: e.target.id });
  };

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setUpdatedCentro({ ...updatedCentro, [e.target.name]: e.target.value });
    } else {
      setUpdatedCentro({ ...updatedCentro, [e.target.name]: "" });
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl max-w-sm overflow-hidden">
      <div className="h-64">
        <img
          className="h-full w-full rounded-xl"
          src={centro?.imaxe || img}
          alt=""
        />
      </div>
      <div className="mt-8">
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center">
            <div className="w-24 font-medium">Centro</div>
            <div className="ml-5">
              <input
                className="border border-solid border-gray-300 rounded-lg py-2 px-4"
                type="text"
                name="centro"
                value={updatedCentro.centro}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 font-medium">ID</div>
            <div className="ml-5">
              <input
                className="border border-solid border-gray-300 rounded-lg py-2 px-4"
                type="text"
                name="sf"
                value={updatedCentro.sf}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 font-medium">Concello</div>
            <div className="ml-5">
              <input
                className="border border-solid border-gray-300 rounded-lg py-2 px-4"
                type="text"
                name="concello"
                value={updatedCentro.concello}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 font-medium">Proxecto</div>
            <div className="ml-5 flex flex-col gap-y-2">
              <RadioInput
                label={"Estándar"}
                name={"Estándar"}
                id={"Estándar"}
                value={updatedCentro.proxecto}
                handleRadioInputChange={handleRadioInputChange}
              />
              <RadioInput
                label={"ABALAR"}
                name={"ABALAR"}
                id={"ABALAR"}
                value={updatedCentro.proxecto}
                handleRadioInputChange={handleRadioInputChange}
              />
              <RadioInput
                label={"EVA"}
                name={"EVA"}
                id={"EVA"}
                value={updatedCentro.proxecto}
                handleRadioInputChange={handleRadioInputChange}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 font-medium">TAP</div>
            <div className="ml-5">
              <input
                className="border border-solid border-gray-300 rounded-lg py-2 px-4"
                type="text"
                name="tap"
                value={updatedCentro.rede.tap}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 font-medium">TAR</div>
            <div className="ml-5">
              <input
                className="border border-solid border-gray-300 rounded-lg py-2 px-4"
                type="text"
                name="tar"
                value={updatedCentro.rede.tar}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div className="mt-8 w-full">
              <div className="flex">
                <div className="w-1/2 font-medium">LAN</div>
                <div className="w-1/2 font-medium">DHCP</div>
              </div>
              <div>
                {centro.rede.lans.map((lan) => {
                  return (
                    <div className="mt-2 flex">
                      <div className="w-1/2">{lan.rango}</div>
                      <div className="w-1/2">
                        {lan.dhcp ? <span>Si</span> : <span>Non</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-24 font-medium whitespace-nowrap">
              Información adicional
            </div>
            <div className="mt-2">
              <textarea
                className="outline-none border border-solid border-gray-300 rounded-lg p-2 resize-none"
                name="comentario"
                id="comentario"
                cols="43"
                rows="5"
                value={updatedCentro.comentario}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCentroAdmin;
