import React from "react";
import { dispositivos } from "../../utils/dispositivos";

const Resultados = ({ data, showAll, handleShowModal, grupo }) => {
  return (
    <>
      {dispositivos.map((tipoDispositivo) => {
        return (
          <fieldset
            key={tipoDispositivo}
            className="my-2 flex items-center gap-x-4 p-2 pr-5 w-full border border-solid border-black rounded-xl"
          >
            <legend className="px-4">
              <button
                onClick={(e) => {
                  const table = document.getElementById(tipoDispositivo);
                  if (table.classList.contains("hidden"))
                    table.classList.remove("hidden");
                  else table.classList.add("hidden");
                }}
              >
                <img
                  className="h-3"
                  src="/assets/icons/downward-arrow-black.png"
                  alt=""
                />
              </button>
              <span className="ml-2 font-medium">{tipoDispositivo}</span>
            </legend>
            <table
              id={tipoDispositivo}
              className={`rounded-xl w-full relative ${
                showAll ? "" : "hidden"
              }`}
            >
              <tbody className="bg-white rounded-b-xl overflow-hidden">
                <tr className="h-10 bg-gray-200">
                  <th className="text-left px-2">Garantía</th>
                  <th className="text-left px-2">Marca e modelo</th>
                  <th className="text-left px-2">Expediente</th>
                  <th className="text-left px-2">S/N</th>
                  {grupo === "sistemas" || grupo === "admin" ? (
                    <>
                      <th className="text-left px-2">Técnico</th>
                      <th className="text-left px-2">Grupo</th>
                    </>
                  ) : (
                    <></>
                  )}
                  <th className="text-left px-2">Equipamento</th>
                  <th className="text-left px-2">S.O</th>
                </tr>
                {data.map((dispositivo) => {
                  return (
                    <>
                      {dispositivo.tipo_hardware === tipoDispositivo ? (
                        <tr
                          key={dispositivo._id}
                          onClick={(e) => {
                            handleShowModal(dispositivo);
                          }}
                          className="font-medium hover:bg-gray-200 cursor-pointer"
                        >
                          <td className="py-1.5 px-2">
                            {dispositivo.garantia ? "Si" : "Non"}
                          </td>
                          <td className="py-1.5 px-2">
                            {dispositivo.marca} {dispositivo.modelo}
                          </td>
                          <td className="py-1.5 px-2">
                            {dispositivo.expediente}
                          </td>
                          <td className="py-1.5 px-2">{dispositivo.ns}</td>
                          {grupo === "sistemas" || grupo === "admin" ? (
                            <>
                              <td className="py-1.5 px-2">
                                {dispositivo.tecnico}
                              </td>
                              <td className="py-1.5 px-2">
                                {dispositivo.grupo_escalado}
                              </td>
                            </>
                          ) : (
                            <></>
                          )}
                          <td className="py-1.5 px-2">
                            {dispositivo.equipamento}
                          </td>
                          <td className="py-1.5 px-2">{dispositivo.so}</td>
                        </tr>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </fieldset>
        );
      })}
    </>
  );
};

export default Resultados;
