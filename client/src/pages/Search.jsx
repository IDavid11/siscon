import { useContext, useState } from "react";
import { randomImg } from "../utils/randomImg";
import ErrorIcon from "../icons/ErrorIcon";
import { buscarCentro } from "../services/buscarCentro";
import TabsInfoContext from "../context/TabsInfoContext";

export const Search = () => {
  const [codigo, setCodigo] = useState();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();
  const img = randomImg();

  const { tabsInfo, selectedTab, handleUpdateTabsInfo } =
    useContext(TabsInfoContext);

  const handleInputChange = (e) => {
    if (e.target.value) setCodigo(e.target.value);
  };

  const escollerCentro = async (e) => {
    e.preventDefault();
    const centro = await buscarCentro(codigo);
    console.log(centro);
    const tabsInfoVar = tabsInfo;
    if (centro.length == 1) {
      tabsInfoVar[selectedTab].centro = centro[0];
      tabsInfoVar[selectedTab].label = tabsInfoVar[selectedTab].centro.centro;
      tabsInfoVar[selectedTab].centro.main_network_checked = false;
      tabsInfoVar[selectedTab].centro.network_checked = false;
    } else {
      tabsInfoVar[selectedTab].centro = centro;
      tabsInfoVar[selectedTab].label = codigo;
    }
    handleUpdateTabsInfo(tabsInfoVar);
  };

  return (
    <div className="min-w-[80%] h-full flex flex-col justify-center">
      <div className="w-1/2 max-w-[675px] m-auto">
        <div className="text-center">
          <img
            className="h-[400px] w-full"
            src="/assets/images/search.png"
            alt=""
          />
        </div>
        <div className="w-full">
          <div
            className={`w-full flex justify-between items-center h-14 border border-solid border-gray-400 rounded-xl ${
              isError ? "border border-solid border-red-600" : ""
            }`}
          >
            <form className="w-[90%]" onSubmit={escollerCentro}>
              <input
                className="bg-transparent w-full pl-5 outline-none"
                type="text"
                placeholder="Centro"
                autoFocus
                onChange={handleInputChange}
              ></input>
            </form>
            {!isError ? (
              <img
                className="self-center h-5 mr-5 cursor-pointer"
                onClick={escollerCentro}
                src="/assets/icons/loupe-black.png"
                alt=""
              />
            ) : (
              <img
                className="self-center h-5 mr-5 cursor-pointer"
                onClick={escollerCentro}
                src="/assets/icons/red-loupe.svg"
                alt=""
              />
            )}
          </div>
        </div>
        {isError ? (
          <div className="error-container">
            <ErrorIcon height={16} width={16} />
            <span>{error}</span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
