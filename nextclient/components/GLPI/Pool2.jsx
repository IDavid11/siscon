import React, { useContext } from "react";
import ContainerWrap from "../utils/ContainerWrap";
import CentroContext from "@/context/CentroContext";

const Pool = () => {
  const { incidencias } = useContext(CentroContext);

  const prioridades2 = [
    { k: "Moi urxente", v: "moi-urxente" },
    { k: "Urxente", v: "urxente" },
    { k: "Mediana", v: "mediana" },
    { k: "Baixa", v: "baixa" },
    { k: "Moi baixa", v: "moi-baixa" },
  ];

  const prioridades = {
    "Moi urxente": "moi-urxente",
    Urxente: "urxente",
    Mediana: "mediana",
    Baixa: "baixa",
    "Moi baixa": "moi-baixa",
  };

  const estados = {
    "En curso (asignada)": "en-curso",
    "En espera": "en-espera",
    Rematado: "rematado",
    Pechado: "pechado",
  };

  return (
    <ContainerWrap title={"GLPI"}>
      {incidencias && incidencias.length > 0 ? (
        <table className="rounded-xl w-full relative table-fixed">
          <tbody>
            {incidencias &&
              incidencias.map((incidencia) => {
                return (
                  <tr className="flex items-center hover:bg-gray-200 cursor-pointer">
                    <td className="px-2 py-2 w-2">
                      <span
                        className={`prioridade-span ${
                          prioridades[incidencia.prioridade]
                        }`}
                      ></span>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis 2xl:text-base w-[60%]">
                      {incidencia.titulo}
                    </td>
                    <td className="px-2 py-2 w-2">
                      <span
                        className={`estado-span  ${estados[incidencia.estado]}`}
                      ></span>
                    </td>
                    <td className="px-2 py-2 text-sm w-[30%] whitespace-nowrap overflow-hidden text-ellipsis">
                      {incidencia.entidade}
                    </td>
                    <td className="px-2 py-2 font-bold w-14">12:30</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </ContainerWrap>
  );
};

export default Pool;
