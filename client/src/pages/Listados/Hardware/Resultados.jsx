import React from "react";
import { dispositivos } from "../../../utils/dispositivos";

const Resultados = ({ data }) => {
  return (
    <>
      {dispositivos.map((tipoDispositivo) => {
        return (
          <>
            <tr className="h-8 my-2 flex items-center gap-x-4 cursor-pointer hover:bg-gray-200 pl-2 pr-5">
              <td className="w-32 font-medium">{tipoDispositivo}</td>
              <td className="w-full h-0.5 border border-solid border-black opacity-40"></td>
            </tr>
            {data.map((dispositivo) => {
              return (
                <>
                  {dispositivo.tipo_hardware === tipoDispositivo ? (
                    <tr key={dispositivo._id}>
                      <td className="py-1.5 px-2">{dispositivo.garantia}</td>
                      <td className="py-1.5 px-2">
                        {dispositivo.marca} {dispositivo.modelo}
                      </td>
                      <td className="py-1.5 px-2">{dispositivo.expediente}</td>
                      <td className="py-1.5 px-2">{dispositivo.ns}</td>
                      <td className="py-1.5 px-2">{dispositivo.tecnico}</td>
                      <td className="py-1.5 px-2">
                        {dispositivo.grupo_escalado}
                      </td>
                      <td className="py-1.5 px-2">{dispositivo.equipamento}</td>
                      <td className="py-1.5 px-2">{dispositivo.so}</td>
                    </tr>
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
          </>
        );
      })}
    </>
  );
};

export default Resultados;
