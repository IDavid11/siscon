import React, { useContext } from "react";
import { Tab } from "../Tabs/Tab";
import TabsInfoContext from "../../context/TabsInfoContext";
import UserContext from "../../context/UserContext";

const Aside = ({ isLoading }) => {
  const { grupo, finalizarSesion } = useContext(UserContext);
  const { tabsInfo, handleRestartTabsInfo, handleRestartSelectedTab } =
    useContext(TabsInfoContext);

  const dashboardTab = [tabsInfo[0]];
  const centrosTab = tabsInfo.slice(3, 8); // Si se queren aumentar o número de pestanas de centros que se pode abrir, é necesario modificar a función handleNewTabButton en App.js
  const listadosTab = tabsInfo.slice(1, 2);
  const adminTab = [tabsInfo[2]];

  return (
    <div className="h-screen w-fit bg-primary-color">
      <aside className="h-full w-[273px] p-5 mt-2.5 text-white flex flex-col">
        <div>
          <img className="h-16" src="siscon.png" alt="" />
        </div>
        <div className="mt-10">
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
        {grupo === "sistemas" || grupo === "admin" ? (
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
        ) : (
          <></>
        )}
        <div className="mb-6 mt-auto">
          <div className="overflow-hidden mt-1 h-14 w-full">
            <div className="h-full w-full font-medium flex items-center rounded-xl text-white text-md tracking-wide leading-normal cursor-pointer">
              <img
                className="h-4 ml-2.5"
                src="/assets/icons/logout2.png"
                alt=""
              />
              <a
                className="w-[85%] h-full flex items-center pl-3 text-white"
                onClick={() => {
                  finalizarSesion();
                  handleRestartTabsInfo();
                  handleRestartSelectedTab();
                }}
              >
                <span className="w-full ml-1 pointer-events-none whitespace-nowrap text-ellipsis overflow-hidden">
                  Pechar sesión
                </span>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Aside;
