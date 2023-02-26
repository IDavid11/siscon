import React, { useEffect, useState } from "react";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";

const HistorialMonitorizacions = ({ electronica }) => {
  const [historial, setHistorial] = useState([]);
  const obterHistorialMonitorizacion = async () => {
    const { data } = await instance.get(
      apiUrls.urlObterMonitorizacions + `${electronica._id}`
    );
    setHistorial(data.data);
  };

  useEffect(() => {
    obterHistorialMonitorizacion();
  }, []);

  return (
    <div className="mt-8">
      <div className="font-bold">Historial de avarías detectadas</div>
      <div className="historial mt-4 remove-scrollbar">
        {historial && historial.length > 0 ? (
          <table className="rounded-xl w-full relative">
            <tbody>
              <tr>
                <th></th>
                <th className="w-64">Data</th>
                <th className="w-64 text-center">Estado</th>
              </tr>
              {historial &&
                historial.map((avaria) => {
                  return (
                    <tr key={avaria._id}>
                      <td className="py-2.5 px-2 w-2">
                        <span
                          className={`p-px rounded-full ${
                            avaria.status == "closed"
                              ? "bg-green-400"
                              : "bg-red-400"
                          }`}
                        ></span>
                      </td>
                      <td className="py-2.5">{avaria.data.split(".")[0]}</td>
                      <td className="py-2.5 text-center">
                        {avaria.status === "open" ? "Aberta" : "Pechada"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <div>Non hai avarías rexistradas</div>
        )}
      </div>
    </div>
  );
};

export default HistorialMonitorizacions;
