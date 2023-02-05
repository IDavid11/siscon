import React from "react";
import Status from "../../Items/Status";

const RedeItemAdmin = ({ ip, status, model, location, isLoading }) => {
  return (
    <tr className="h-12">
      <td className="pr-5 overflow-hidden whitespace-nowrap text-ellipsis">
        <input type="text" name={ip} value={ip} />
      </td>
      <td className="pr-5">
        <Status status={isLoading ? "loading" : status} />
      </td>
      <td className="pr-5 overflow-hidden whitespace-nowrap text-ellipsis">
        <select name="model" id="model">
          <option value={null}>Sen identificar</option>
          <option value="DLink DGS 1210 24">DLink DGS 1210 24</option>
          <option value="DLink DGS 1224 T">DLink DGS 1224 T</option>
        </select>
      </td>
      <td className="overflow-hidden whitespace-nowrap text-ellipsis">
        <input type="text" name="location" value={location} />
      </td>
    </tr>
  );
};

export default RedeItemAdmin;
