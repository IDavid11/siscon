import React from "react";
import ContainerWrap from "../utils/ContainerWrap";

const LANs = ({ lans }) => {
  return (
    <ContainerWrap title={"LANs"}>
      <table className="rounded-xl overflow-hidden mt-4 w-full">
        <tbody>
          {lans &&
            lans.map((lan) => {
              return (
                <tr className="font-medium">
                  <td className="py-2.5 px-2">{lan.rango}</td>
                  <td>Rede principal</td>
                  <td className="py-2.5 px-2">
                    {lan.dhcp ? "DHCP" : "NON DHCP"}
                  </td>
                  <td className="py-2.5 px-2">
                    <span className="py-1.5 px-4 text-sm bg-gray-200 rounded-full">
                      4 dispositivos
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </ContainerWrap>
  );
};

export default LANs;
