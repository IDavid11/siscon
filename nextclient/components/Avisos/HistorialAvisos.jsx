import React, { useEffect, useState } from "react";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";
import Status from "../utils/Items/Status";

const HistorialAvisos = ({ electronica }) => {
  const [historial, setHistorial] = useState([]);
  const obterHistorialElectronica = async () => {
    const { data } = await instance.get(
      apiUrls.urlObterAvisos + `${electronica._id}`
    );
    setHistorial(data.data);
  };

  useEffect(() => {
    obterHistorialElectronica();
  }, []);

  return (
    <div className="mt-8">
      <div className="font-bold">Historial de avisos</div>
      <div className="historial mt-4 remove-scrollbar">
        {historial && historial.length > 0 ? (
          <table className="rounded-xl w-full relative">
            <tbody>
              <tr>
                <th></th>
                <th className="w-64">Data</th>
                <th className="text-center">Estado</th>
              </tr>
              {historial &&
                historial.map((aviso) => {
                  return (
                    <tr key={aviso._id}>
                      <td className="py-2.5 w-2">
                        <span
                          className={`p-px rounded-full ${
                            aviso.status == "up" ? "bg-green-400" : "bg-red-400"
                          }`}
                        ></span>
                      </td>
                      <td className="py-2.5">{aviso.data.split(".")[0]}</td>
                      <td className="py-2.5 text-center">{aviso.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <div>Non hai avisos rexistrados</div>
        )}
      </div>
    </div>
  );
};

export default HistorialAvisos;
