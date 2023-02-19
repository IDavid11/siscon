import React, { useEffect, useState, useContext } from "react";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";
import Status from "../utils/Items/Status";
import TabsInfoContext from "../../context/TabsInfoContext";

const RackInfo = ({ rack }) => {
  const { tabsInfo, selectedTab } = useContext(TabsInfoContext);
  const [electronicaRack, setElectronicaRack] = useState([]);
  const obterElectronicaRack = async () => {
    const { data } = await instance.post(apiUrls.urlObterElectronicaRack, {
      centroId: tabsInfo[selectedTab].centro._id,
      nomeRack: rack.nome,
    });
    setElectronicaRack(data.data);
  };

  useEffect(() => {
    obterElectronicaRack();
  }, []);

  return (
    <div className="mt-8 border border-solid border-gray-300 rounded-xl p-10">
      <div className="font-bold">Electrónica no rack</div>
      <div className="historial mt-4 remove-scrollbar">
        {electronicaRack && electronicaRack.length > 0 ? (
          <table className="text-left">
            <tbody>
              <tr>
                <th></th>
                <th className="w-52">IP</th>
                <th className="w-52">Tipo</th>
                <th className="w-52">Marca e modelo</th>
                <th className="text-center">Estado</th>
              </tr>
              {electronicaRack &&
                electronicaRack.map((electronica) => {
                  return (
                    <tr key={electronica._id}>
                      <td className="py-2.5 px-2 w-2">
                        <span
                          className={`p-px rounded-full ${
                            electronica.status == "up"
                              ? "bg-green-400"
                              : "bg-red-400"
                          }`}
                        ></span>
                      </td>
                      <td className="py-2.5">{electronica.ip}</td>
                      <td className="py-2.5">
                        {electronica.tipo || "Sen determinar"}
                      </td>
                      <td className="py-2.5">
                        {electronica.modelo || "Sen determinar"}
                      </td>
                      <td className="py-2.5">
                        <Status status={electronica.status} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <div>Non hai electrónica rexistrada</div>
        )}
      </div>
    </div>
  );
};

export default RackInfo;
