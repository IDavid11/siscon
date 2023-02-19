import React, { useContext } from "react";
import { Tab } from "../Tabs/Tab";
import TabsInfoContext from "../../context/TabsInfoContext";
import { ResponsiveTab } from "../Tabs/ResponsiveTab";

const ResponsiveAside = ({ isLoading }) => {
  const { tabsInfo, handleNewTabButton } = useContext(TabsInfoContext);

  const dashboardTab = [tabsInfo[0]];
  const centrosTab = tabsInfo.slice(3, 8); // Si se queren aumentar o número de pestanas de centros que se pode abrir, é necesario modificar a función handleNewTabButton en App.js
  const listadosTab = tabsInfo.slice(1, 2);
  const adminTab = [tabsInfo[2]];

  return (
    <div className="h-screen bg-primary-color">
      <aside className="h-full p-5 mt-2.5 text-white">
        <div className="mt-6">
          <div>
            <button
              className={`p-5 rounded-xl bg-button-bg text-white text-md font-medium ${
                centrosTab.length === 5 ? "not-allowed" : ""
              }${isLoading ? "disabled" : ""}`}
              onClick={handleNewTabButton}
            >
              +
            </button>
          </div>
        </div>
        <div className="mt-6">
          <div>
            <h5 className="font-medium tracking-wide">Centros</h5>
          </div>
          <div className="mt-2.5">
            <div className="flex flex-col items-start">
              {centrosTab.map((tab) => {
                return (
                  <ResponsiveTab
                    key={tab.tabId}
                    index={tab.tabId}
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
                  <ResponsiveTab
                    key={tab.tabId}
                    index={tab.tabId}
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
                  <ResponsiveTab
                    key={tab.tabId}
                    index={tab.tabId}
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

export default ResponsiveAside;
