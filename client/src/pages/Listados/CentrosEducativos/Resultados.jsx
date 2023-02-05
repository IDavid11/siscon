import React, { useContext } from "react";
import TabsInfoContext from "../../../context/TabsInfoContext";

const Resultados = ({ data }) => {
  const { tabsInfo, selectedTab, handleNewTabButton } =
    useContext(TabsInfoContext);

  return (
    <>
      {data.map((key, index) => {
        return (
          <tr
            key={index}
            onClick={() => {
              handleNewTabButton(data[index]);
            }}
            className="cursor-pointer hover:bg-gray-100"
          >
            <td className="py-2.5 px-2">{data[index].concello}</td>
            <td className="py-2.5 px-2">{data[index].centro}</td>
            <td className="py-2.5 px-2">
              <span className="py-1.5 px-4 text-sm bg-gray-200 rounded-full">
                2 avarías detectadas
              </span>
            </td>
            <td className="w-40 py-2.5 px-2 flex items-center gap-x-2">
              <div className="w-full h-1.5 flex rounded-full overflow-hidden">
                <div className="w-2/3 h-1.5 bg-green-400"></div>
                <div className="w-1/3 h-1.5 bg-orange-400"></div>
                <div className="w-1/3 h-1.5 bg-red-400"></div>
              </div>
              <div>
                <span className="py-2.5 px-1.5 text-xs bg-gray-200 rounded-full">
                  80%
                </span>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default Resultados;
