import React, { useContext } from "react";
import RemoveTabIcon from "../../icons/RemoveTabIcon";
import TabsInfoContext from "../../context/TabsInfoContext";

export const Tab = ({ isLoading, index, label }) => {
  const { tabsInfo, selectedTab, handleSelectedTab, handleRemoveTab } =
    useContext(TabsInfoContext);

  return (
    <div className="overflow-hidden mt-1 h-14 w-full">
      <div
        className={`h-full w-full font-medium flex items-center rounded-xl text-white text-md tracking-wide leading-normal cursor-pointer ${
          selectedTab == tabsInfo[index].tabId ? "selected" : ""
        } ${isLoading ? "disabled" : ""}`}
      >
        {tabsInfo[index].type === "Centro" ? (
          <div className="ml-2.5">
            <RemoveTabIcon
              id={index}
              height={12}
              width={12}
              onClick={handleRemoveTab}
            />
          </div>
        ) : (
          <img className="h-4 ml-2.5" src={tabsInfo[index].iconSrc} alt="" />
        )}
        <a
          className="w-[85%] h-full flex items-center pl-3 text-white"
          id={index}
          onClick={handleSelectedTab}
        >
          <span className="w-full ml-1 pointer-events-none whitespace-nowrap text-ellipsis overflow-hidden">
            {label}
          </span>
        </a>
      </div>
    </div>
  );
};
