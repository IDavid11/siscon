import React, { useContext, useEffect } from "react";
import ContainerWrap from "../../components/utils/ContainerWrap";
import { instance } from "../../services/axios";
import TabsInfoContext from "../../context/TabsInfoContext";
import RedeItem from "../../components/InfoCentro/Rede/RedeItem";
import { apiUrls } from "../../services/urls";

const NetworkResume = ({ centro, isLoading, setIsLoading }) => {
  const { tabsInfo, selectedTab, handleUpdateTabsInfo } =
    useContext(TabsInfoContext);

  const initCmd = async () => {
    let componentMounted = true;
    console.log(tabsInfo[selectedTab].centro.network_checked);
    if (
      tabsInfo[selectedTab].centro.network_checked === false &&
      componentMounted
    ) {
      setIsLoading(true);
      await doPing();
      setIsLoading(false);
    }

    return () => (componentMounted = false);
  };

  const doPing = async () => {
    const res = await instance.post(apiUrls.urlPing, {
      index: centro._id,
    });
    const tabsInfoVar = tabsInfo;
    tabsInfoVar[selectedTab].centro.network_checked = true;
    tabsInfoVar[selectedTab].centro.rede.electronica = res.data;
    handleUpdateTabsInfo([...tabsInfoVar]);
  };

  useEffect(() => {
    initCmd();
  }, []);

  return (
    <ContainerWrap title={"Electrónica principal"} editBtn={true} addBtn={true}>
      <div className="mt-4">
        <table>
          <tbody className="tbody-screen remove-scrollbar">
            {tabsInfo[selectedTab].centro.rede.electronica.map((principal) => {
              return (
                <RedeItem
                  key={principal._id}
                  ip={principal.ip}
                  status={principal.status}
                  ubicacion={principal.ubicacion || "Sen localizar"}
                  isLoading={isLoading}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </ContainerWrap>
  );
};

export default NetworkResume;
