import React from "react";
import Status from "../../utils/Items/Status";

const RedeItem = ({ ip, status, modelo, ubicacion, isLoading }) => {
  return (
    <tr className="h-12 hover:bg-gray-200 cursor-pointer">
      <td className="px-5 overflow-hidden whitespace-nowrap text-ellipsis">
        {ip}
      </td>
      <td className="px-5">
        <Status status={isLoading ? "loading" : status} />
      </td>
      <td className="px-5 overflow-hidden whitespace-nowrap text-ellipsis">
        {modelo || "Modelo sen identificar"}
      </td>
      <td className="px-5 overflow-hidden whitespace-nowrap text-ellipsis">
        {ubicacion || "Sen localizar"}
      </td>
    </tr>
  );
};

export default RedeItem;
