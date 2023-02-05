import React, { useContext } from "react";
import { randomImg } from "../utils/randomImg";
import { escollerCentro } from "../services/escollerCentro";
import TabsInfoContext from "../context/TabsInfoContext";

const PickCra = ({ cra }) => {
  const { tabsInfo, selectedTab, handleUpdateTabsInfo } =
    useContext(TabsInfoContext);

  var nomeCra = cra.centro.split(" - ");
  const codigoCra = nomeCra[0];
  nomeCra.splice(0, 1);
  nomeCra = nomeCra.join(" - ");

  const img = randomImg();

  const escollerCra = async (e) => {
    const centro = await escollerCentro(e.target.id);
    const tabsInfoVar = tabsInfo;
    tabsInfoVar[selectedTab].centro = centro;
    tabsInfoVar[selectedTab].label = tabsInfoVar[selectedTab].centro.centro;
    tabsInfoVar[selectedTab].centro.main_network_checked = false;
    tabsInfoVar[selectedTab].centro.network_checked = false;
    handleUpdateTabsInfo(tabsInfoVar);
  };

  return (
    <div className="self-stretch">
      <div
        className="cra h-[170px] rounded-lg cursor-pointer flex flex-col items-center justify-center text-center"
        id={cra._id}
        onClick={escollerCra}
      >
        <div className="w-20 h-20 overflow-hidden content-center">
          <img
            className="w-full h-full rounded-xl pointer-events-none mb-2.5"
            src={cra.imaxe || img}
            alt=""
          />
        </div>
        <div>
          <div className="text-md tracking-wide font-medium pt-4 pb-1 pointer-events-none">
            {nomeCra}
          </div>
          <div className="text-sm tracking-wide">
            {codigoCra} - {cra.concello}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickCra;
