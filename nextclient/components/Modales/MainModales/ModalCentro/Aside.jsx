import React, { useState, useContext } from "react";
import Racks from "@/components/InfoCentro/Racks";
import ModalPlanos from "../../ModalPlanos/ModalPlanos";
import CentroContext from "@/context/CentroContext";
import Planos from "@/components/InfoCentro/Planos";
import Aviso from "@/components/Avisos/Aviso";
import Avisos from "@/components/InfoCentro/Avisos";
import Electronica from "@/components/InfoCentro/Electronica";

const Aside = () => {
  const { infoCentro, avisos } = useContext(CentroContext);
  const [menuVisible, setMenuVisible] = useState(null);
  const [showModal, setShowModal] = useState(null);

  const handleShowModal = () => {
    setMenuVisible(null);
  };
  return (
    <>
      <div className="w-full h-full border-l border-solid border-gray-400">
        <div className="p-4" style={{ height: "inherit" }}>
          {!menuVisible ? (
            <>
              <div className="ml-auto mr-auto text-lg font-medium capitalize">
                Menu
              </div>
              <div className="mt-4" style={{ height: "inherit" }}>
                <ul className="flex flex-col">
                  <li>
                    <button
                      onClick={() => setMenuVisible("controladora")}
                      className="p-2 h-14 w-full hover:bg-tab-background rounded-lg"
                    >
                      <div className="flex items-center gap-x-4">
                        <div>
                          <img
                            className="h-6"
                            src="/assets/images/ap.png"
                            alt=""
                          />
                        </div>
                        <div>Controladora</div>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setMenuVisible("log")}
                      className="p-2 h-14 w-full hover:bg-tab-background rounded-lg"
                    >
                      <div className="flex items-center gap-x-4">
                        <div>
                          <img
                            className="h-6"
                            src="/assets/images/ap.png"
                            alt=""
                          />
                        </div>
                        <div className="flex items-center gap-x-2">
                          <span>Log</span>
                          <span className="w-7 h-7 text-sm rounded-full bg-red-200 flex items-center justify-center font-medium">
                            {avisos?.length}
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setMenuVisible("rede")}
                      className="p-2 h-14 w-full hover:bg-tab-background rounded-lg"
                    >
                      <div className="flex items-center gap-x-4">
                        <div>
                          <img
                            className="h-6"
                            src="/assets/images/ap.png"
                            alt=""
                          />
                        </div>
                        <div>Rede</div>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setMenuVisible("racks")}
                      className="p-2 h-14 w-full hover:bg-tab-background rounded-lg"
                    >
                      <div className="flex items-center gap-x-4">
                        <div>
                          <img
                            className="h-6"
                            src="/assets/images/ap.png"
                            alt=""
                          />
                        </div>
                        <div>Racks</div>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setMenuVisible("planos")}
                      className="p-2 h-14 w-full hover:bg-tab-background rounded-lg"
                    >
                      <div className="flex items-center gap-x-4">
                        <div>
                          <img
                            className="h-6"
                            src="/assets/images/ap.png"
                            alt=""
                          />
                        </div>
                        <div>Planos</div>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setMenuVisible("estadísticas")}
                      className="p-2 h-14 w-full hover:bg-tab-background rounded-lg"
                    >
                      <div className="flex items-center gap-x-4">
                        <div>
                          <img
                            className="h-6"
                            src="/assets/images/ap.png"
                            alt=""
                          />
                        </div>
                        <div>Monitorización</div>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <></>
          )}
          {menuVisible === "controladora" ? <></> : <></>}
          {menuVisible === "log" ? (
            <Avisos setMenuVisible={setMenuVisible} />
          ) : (
            <></>
          )}
          {menuVisible === "rede" ? (
            <Electronica
              electronica={infoCentro.rede.electronica}
              setMenuVisible={setMenuVisible}
            />
          ) : (
            <></>
          )}
          {menuVisible === "racks" ? (
            <Racks
              racks={infoCentro.rede.racks}
              setMenuVisible={setMenuVisible}
            />
          ) : (
            <></>
          )}
          {menuVisible === "planos" ? (
            <Planos
              planos={infoCentro.planos}
              setMenuVisible={setMenuVisible}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Aside;
