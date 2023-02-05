import React, { useContext } from "react";
import { Tab } from "../Tabs/Tab";
import TabsInfoContext from "../../context/TabsInfoContext";

const Aside = ({ isLoading }) => {
  const { tabsInfo, handleNewTabButton } = useContext(TabsInfoContext);

  const dashboardTab = [tabsInfo[0]];
  const centrosTab = tabsInfo.slice(5, 10); // Si se queren aumentar o número de pestanas de centros que se pode abrir, é necesario modificar a función handleNewTabButton en App.js
  const listadosTab = tabsInfo.slice(1, 4);
  const adminTab = [tabsInfo[4]];

  return (
    <div className="h-screen w-fit bg-primary-color">
      <aside className="h-full w-[273px] p-10 mt-2.5 text-white">
        <div className="mt-6">
          <div className="mt-2.5">
            <div className="flex flex-col items-start">
              {dashboardTab.map((tab) => {
                return (
                  <Tab
                    key={tab.tabId}
                    index={tab.tabId}
                    label={tabsInfo[tab.tabId].label || "Nova pestana"}
                    isLoading={isLoading}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div>
            <h5 className="font-medium tracking-wide">Centros de traballo</h5>
          </div>
          <div className="mt-2.5">
            <div className="flex flex-col items-start">
              {centrosTab.map((tab) => {
                return (
                  <Tab
                    key={tab.tabId}
                    index={tab.tabId}
                    label={tabsInfo[tab.tabId].label || "Nova pestana"}
                    isLoading={isLoading}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div>
            <h5 className="font-medium tracking-wide">Listados</h5>
          </div>
          <div className="mt-2.5">
            <div className="flex flex-col items-start">
              {listadosTab.map((tab) => {
                return (
                  <Tab
                    key={tab.tabId}
                    index={tab.tabId}
                    label={tabsInfo[tab.tabId].label || "Nova pestana"}
                    isLoading={isLoading}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-6 admin-row">
          <div className="mt-2.5">
            <div className="flex flex-col items-start">
              {adminTab.map((tab) => {
                return (
                  <Tab
                    key={tab.tabId}
                    index={tab.tabId}
                    label={tabsInfo[tab.tabId].label || "Nova pestana"}
                    isLoading={isLoading}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Aside;
