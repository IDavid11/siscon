import React from "react";
import { imgs } from "../../utils/imgs";

const Aviso = ({ aviso }) => {
  return (
    <div>
      <div className="flex flex-col items-center gap-y-1">
        <div>
          <img className="h-16" src={imgs[aviso.electronica.tipo]} alt="" />
        </div>
        <div className="font-bold">{aviso.electronica.nome}</div>
      </div>
      <div className="mt-8">
        <table className="table-fixed text-left">
          <tbody>
            <tr>
              <th className="w-64">Data detección</th>
              <th className="w-52">Tipo</th>
              <th className="w-52">Modelo</th>
              <th className="w-52">Ubicación</th>
            </tr>
            <tr>
              <td className="py-2">{aviso.data}</td>
              <td className="py-2">{aviso.electronica.tipo}</td>
              <td className="py-2">
                {aviso.electronica.modelo || "Sen determinar"}
              </td>
              <td className="py-2">
                {aviso.electronica.ubicacion || "Sen localizar"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Aviso;
