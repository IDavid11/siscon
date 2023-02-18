import React, { useState, useContext } from "react";
import TabsInfoContext from "../../../context/TabsInfoContext";
import { instance } from "../../../services/axios";
import { apiUrls } from "../../../services/urls";

const Resultados = ({ data }) => {
  const { tabsInfo, selectedTab, handleNewTabButton } =
    useContext(TabsInfoContext);
  const [centro, setCentro] = useState();

  const obterDataCentro = async () => {
    const { data } = await instance.post(apiUrls.url);
  };

  return (
    <>
      {data.map((key, index) => {
        return (
          <tr
            key={index}
            onClick={() => {
              console.log(data[index]);
              handleNewTabButton(data[index]);
            }}
            className="cursor-pointer hover:bg-gray-100"
          >
            <td className="py-2.5 px-2">{index + 1}</td>
            <td className="py-2.5 px-2">{data[index].concello}</td>
            <td className="py-2.5 px-2">{data[index].centro}</td>
            <td className="py-2.5 px-2">{data[index].lans}</td>
            <td className="py-2.5 px-2">{data[index].tap}</td>
          </tr>
        );
      })}
    </>
  );
};

export default Resultados;
