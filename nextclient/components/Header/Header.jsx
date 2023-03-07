import { instance } from "@/services/axios";
import { apiUrls } from "@/services/urls";
import React, { useContext, useEffect, useState } from "react";
import MenuUsuario from "./MenuUsuario";
import { randomImg } from "@/utils/randomImg";
import CentroContext from "@/context/CentroContext";

const Header = () => {
  const { seleccionarCentro } = useContext(CentroContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [predictions, setPredictions] = useState([]);
  const img = randomImg();

  const handleSearch = async () => {
    if (search.trim() != "") {
      const { data } = await instance.post(apiUrls.urlObterPrediccions, {
        centro: search,
      });
      setPredictions(data.data);
    } else setPredictions([]);
  };

  const escollerCentro = async (centroId) => {
    const { data } = await instance.get(apiUrls.urlGetCentros + centroId);
    seleccionarCentro(data.data);
    setSearch("");
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (predictions.length > 0) escollerCentro(predictions[0]._id);
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <>
      <header className="bg-primary-color">
        <div className="header-container flex items-center gap-x-10 py-4 px-6 2xl:gap-x-14">
          <div>
            <img className="h-12 2xl:h-14" src="siscon2.png" alt="" />
          </div>
          <div className="flex flex-col relative">
            <div className="relative flex items-center">
              <form onSubmit={handleSubmitSearch}>
                <input
                  type="text"
                  id="centro"
                  placeholder="Buscar"
                  value={search}
                  autoComplete="off"
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-white rounded-full w-80 h-10 2xl:h-12 2xl:w-96 border border-solid border-gray-300 pl-4"
                />
              </form>
              <div className="absolute right-2">
                {search.trim() === "" ? (
                  <button className="h-8 w-8 2xl:h-10 2xl:w-10 rounded-full bg-primary-color flex items-center justify-center">
                    <img
                      className="h-3.5"
                      src="/assets/icons/loupe.svg"
                      alt=""
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => setSearch("")}
                    className="h-8 w-8 2xl:h-10 2xl:w-10 rounded-full flex items-center justify-center"
                  >
                    <img
                      className="h-3"
                      src="/assets/icons/close-black.png"
                      alt=""
                    />
                  </button>
                )}
              </div>
            </div>
            {predictions && predictions.length > 0 ? (
              <div className="absolute top-14 left-0 z-50 bg-white rounded-xl shadow-xl overflow-hidden">
                {predictions &&
                  predictions.map((prediction) => {
                    return (
                      <div
                        key={prediction._id}
                        onClick={() => escollerCentro(prediction._id)}
                        className="p-4 flex gap-x-4 cursor-pointer hover:bg-gray-200"
                      >
                        <div className="w-24 h-16">
                          <img
                            className="w-full h-full rounded-xl"
                            src={prediction.imaxe || img}
                            alt=""
                          />
                        </div>
                        <div className="w-full">
                          <div className="font-medium whitespace-nowrap">
                            {prediction.centro}
                          </div>
                          <div className="text-sm font-medium text-slate-600">
                            {prediction.concello}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <nav>
              <ul className="flex gap-x-7 text-white font-bold 2xl:gap-x-12">
                <li>
                  <a href="dashboard" className="flex gap-x-2 items-center">
                    <span>
                      <img
                        className="h-4"
                        src="/assets/icons/home.png"
                        alt=""
                      />
                    </span>
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="glpi">GLPI</a>
                </li>
                <li>
                  <a href="hardware">Hardware</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="ml-auto">
            <div className="flex items-center">
              <div className="font-bold text-white mr-4">
                Técnico N2 Sistemas
              </div>
              <div>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="h-12 w-12 bg-white rounded-md font-bold 2xl:h-14 2xl:w-14"
                >
                  DI
                </button>
              </div>
              <div className="flex items-center">
                <button onClick={() => setShowUserMenu(!showUserMenu)}>
                  <img
                    className="h-6"
                    src="/assets/icons/arrow-down.svg"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {showUserMenu ? <MenuUsuario /> : <></>}
    </>
  );
};

export default Header;
