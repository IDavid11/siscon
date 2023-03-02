import React from "react";
import { estados, prioridades } from "@/utils/glpi";
import ContainerWrap from "../utils/ContainerWrap";
import TableContainer from "../utils/TableContainer";

const IncidenciasCentro = ({ incidencias }) => {
  return (
    <ContainerWrap title={"Incidencias de conexión"}>
      <TableContainer>
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
                          className={`estado-span  ${
                            estados[incidencia.estado]
                          }`}
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
          <div className="text-center">
            Non se atoparon incidencias rexistradas
          </div>
        )}
      </TableContainer>
    </ContainerWrap>
  );
};

export default IncidenciasCentro;
