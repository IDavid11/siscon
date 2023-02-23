import React from "react";
import ContainerWrap from "../utils/ContainerWrap";

const Pool = () => {
  return (
    <ContainerWrap title={"GLPI"}>
      <table className="rounded-xl w-full relative">
        <tbody>
          <tr className="flex items-center">
            <td className="px-2 w-2">
              <span className="block h-6 w-1 rounded-full bg-green-400"></span>
            </td>
            <td className="px-2 whitespace-nowrap overflow-hidden text-ellipsis text-sm 2xl:text-base">
              [WIFI][EDU.XUNTA.GAL] - Equipos non establecen conexión cos APs.
            </td>
            <td className="px-2 w-2">
              <span className="block h-2.5 w-2.5 rounded-full bg-green-400"></span>
            </td>
            <td className="px-2 text-sm w-[30%] whitespace-nowrap overflow-hidden text-ellipsis">
              15024513 CIFP Someso
            </td>
            <td className="px-2 font-bold w-14">12:30</td>
          </tr>
        </tbody>
      </table>
    </ContainerWrap>
  );
};

export default Pool;
