import React, { useContext } from "react";
import RemoveTabIcon from "../../icons/RemoveTabIcon";
import TabsInfoContext from "../../context/TabsInfoContext";

export const ResponsiveTab = ({ isLoading, index }) => {
  const { tabsInfo, selectedTab, handleSelectedTab, handleRemoveTab } =
    useContext(TabsInfoContext);

  return (
    <div className="overflow-hidden mt-1 h-14 w-full">
      <div
        className={`relative h-full font-medium flex items-center justify-center rounded-xl w-full cursor-pointer ${
          selectedTab == tabsInfo[index].tabId ? "selected" : ""
        } ${isLoading ? "disabled" : ""}`}
      >
        {tabsInfo[index].type === "Centro" ? (
          <div className="flex items-center gap-x-2">
            <div className="z-50">
              <RemoveTabIcon
                id={index}
                height={10}
                width={10}
                onClick={handleRemoveTab}
              />
            </div>
            <div>
              <img className="h-4" src="/assets/icons/school.png" alt="" />
            </div>
          </div>
        ) : (
          <img className="h-4" src={tabsInfo[index].iconSrc} alt="" />
        )}
        <a
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          id={index}
          onClick={handleSelectedTab}
        ></a>
      </div>
    </div>
  );
};
