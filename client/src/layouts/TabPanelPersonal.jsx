import React, { useContext, useEffect } from "react";
import TabsInfoContext from "../context/TabsInfoContext";

const TabPanelPersonal = ({ children, index }) => {
  const { tabsInfo, selectedTab } = useContext(TabsInfoContext);

  useEffect(() => {}, [selectedTab]);

  return (
    <div
      className={`tab-container h-screen overflow-hidden remove-scrollbar bg-tab-background ${
        selectedTab == tabsInfo[index].tabId ? "w-full p-6" : ""
      }`}
    >
      {selectedTab == tabsInfo[index].tabId ? <>{children}</> : <></>}
    </div>
  );
};

export default TabPanelPersonal;
