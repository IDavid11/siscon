import React, { useContext, useEffect, useState } from "react";
import ContainerWrap from "../utils/ContainerWrap";
import TabsInfoContext from "../../context/TabsInfoContext";
import Status from "../utils/Items/Status";

const AvariasDetectadas = () => {
  const { tabsInfo, selectedTab } = useContext(TabsInfoContext);

  const [avariasDetectadas, setAvariasDetectadas] = useState([]);

  useEffect(() => {
    setAvariasDetectadas(
      tabsInfo[selectedTab].centro.rede.electronica.filter(
        (e) => e.status == "down"
      )
    );
  }, [tabsInfo]);

  return (
    <ContainerWrap
      title={"Avarías detectadas"}
      img={"/assets/icons/danger.png"}
      span={avariasDetectadas.length}
    >
      <table className="rounded-xl overflow-hidden mt-4 w-full">
        <tbody>
          {avariasDetectadas &&
            avariasDetectadas.map((avaria, index) => {
              return (
                <tr key={avaria._id} className="font-medium">
                  <td className="py-2.5 px-2">{avaria.ip}</td>
                  <td className="py-2.5 px-2">{avaria.tipo}</td>
                  <td className="py-2.5 px-2">
                    {avaria.modelo || "Sen identificar"}
                  </td>
                  <td className="py-2.5 px-2">
                    {avaria.ubicacion || "Sen ubicar"}
                  </td>
                  <Status status={avaria.status} />
                </tr>
              );
            })}
          {avariasDetectadas && avariasDetectadas.length < 1 ? (
            <div className="text-center">Non se detectaron avarías</div>
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </ContainerWrap>
  );
};

export default AvariasDetectadas;
