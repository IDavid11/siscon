import React, { useState } from "react";
import MenuUsuario from "./MenuUsuario";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  return (
    <>
      <header className="bg-primary-color">
        <div className="header-container flex items-center gap-x-10 py-4 px-6 2xl:gap-x-14">
          <div>
            <img className="h-12 2xl:h-14" src="siscon2.png" alt="" />
          </div>
          <div>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Buscar"
                className="bg-white rounded-full w-80 h-10 2xl:h-12 2xl:w-96 border border-solid border-gray-300 pl-4"
              />
              <div className="absolute right-2">
                <button
                  onClick={(e) => console.log("click")}
                  className="h-8 w-8 2xl:h-10 2xl:w-10 rounded-full bg-primary-color flex items-center justify-center"
                >
                  <img className="h-3.5" src="/assets/icons/loupe.svg" alt="" />
                </button>
              </div>
            </div>
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
                  <a href="" target="_blank">
                    GLPI
                  </a>
                </li>
                <li>
                  <a href="" target="_blank">
                    Estadísticas
                  </a>
                </li>
                <li>
                  <a href="" target="_blank">
                    Hardware
                  </a>
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
