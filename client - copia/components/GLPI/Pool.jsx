import React from "react";

const Pool = ({ incidencias }) => {
  return (
    <div>
      {incidencias && incidencias.length > 0 ? (
        <table className="rounded-xl w-full relative">
          <tbody>
            {incidencias &&
              incidencias.map((ticket) => {
                return (
                  <tr key={ticket._id} className="flex items-center">
                    <td className="px-2 w-2">
                      <span className="block h-6 w-1 rounded-full bg-green-400 bg-red-500"></span>
                    </td>
                    <td className="px-2 whitespace-nowrap overflow-hidden text-ellipsis text-sm 2xl:text-base">
                      {ticket.titulo}
                    </td>
                    <td className="px-2 w-2">
                      <span className="block h-2.5 w-2.5 rounded-full bg-green-400"></span>
                    </td>
                    <td className="px-2 text-sm w-[30%] whitespace-nowrap overflow-hidden text-ellipsis">
                      {ticket.entidade}
                    </td>
                    <td className="px-2 font-bold w-14">
                      {ticket.hora_acordada}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <div>Non hai incidencias rexistradas</div>
      )}
    </div>
  );
};

export default Pool;
