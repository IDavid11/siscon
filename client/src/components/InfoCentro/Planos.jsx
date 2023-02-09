import React from "react";
import ContainerWrap from "../utils/ContainerWrap";

const Planos = ({ planos }) => {
  console.log(planos);
  return (
    <ContainerWrap title={"Planos"} img={"/assets/icons/file-upload-black.png"}>
      <table className="rounded-xl overflow-hidden mt-4 w-full">
        <tbody>
          {planos &&
            planos.map((plano, index) => {
              return (
                <tr key={index} className="font-medium">
                  <td className="py-2.5 px-2">{plano.nome_edificio}</td>
                  <td className="py-2.5 px-2">
                    <span className="py-1.5 px-4 text-sm bg-gray-200 rounded-full">
                      {plano.plantas.length} plantas
                    </span>
                  </td>
                </tr>
              );
            })}
          {planos && planos.length < 1 ? (
            <div className="text-center">Non hai planos gardados</div>
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </ContainerWrap>
  );
};

export default Planos;
