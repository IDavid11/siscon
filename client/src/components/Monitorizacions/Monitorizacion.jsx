import React from "react";
import { imgs } from "../../utils/imgs";

const Monitorizacion = ({ avaria }) => {
  return (
    <div>
      <div className="flex flex-col items-center gap-y-1">
        <div>
          <img className="h-16" src={imgs[avaria.tipo]} alt="" />
        </div>
        <div className="font-bold">{avaria.nome}</div>
      </div>
      <div className="mt-8">
        <table className="table-fixed text-left">
          <tbody>
            <tr>
              <th className="w-64">Tipo</th>
              <th className="w-64">Modelo</th>
              <th className="w-64">Ubicación</th>
            </tr>
            <tr>
              <td className="py-2">{avaria.tipo}</td>
              <td className="py-2">{avaria.modelo || "Sen determinar"}</td>
              <td className="py-2">{avaria.ubicacion || "Sen localizar"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Monitorizacion;
