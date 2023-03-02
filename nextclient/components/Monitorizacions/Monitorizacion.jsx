import React from "react";
import { imgs } from "../../utils/imgs";

const Monitorizacion = ({ electronica }) => {
  console.log(electronica);
  return (
    <div>
      <div className="flex flex-col items-center gap-y-1">
        <div>
          <img className="h-16" src={imgs[electronica.tipo]} alt="" />
        </div>
        <div className="font-bold">{electronica.nome}</div>
      </div>
      <div className="mt-8">
        <table className="rounded-xl w-full relative">
          <tbody>
            <tr>
              <th className="w-64">Tipo</th>
              <th className="w-64">Modelo</th>
              <th className="w-64">Ubicación</th>
            </tr>
            <tr>
              <td className="py-2">{electronica.tipo}</td>
              <td className="py-2">{electronica.modelo || "Sen determinar"}</td>
              <td className="py-2">
                {electronica.ubicacion || "Sen localizar"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Monitorizacion;
