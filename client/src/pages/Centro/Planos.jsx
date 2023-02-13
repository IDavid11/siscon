import React, { useState, useEffect } from "react";
import ContainerWrap from "../../components/utils/ContainerWrap";
import RedeItem from "../../components/InfoCentro/Rede/RedeItem";

const Planos = ({ centro }) => {
  const [switches, setSwitches] = [
    centro.rede?.switches?.sort((a, b) =>
      a.ip > b.ip ? 1 : b.ip > a.ip ? -1 : 0
    ),
  ];
  const [aps, setAps] = [
    centro.rede?.edu_xunta_es?.aps?.sort((a, b) =>
      a.ip > b.ip ? 1 : b.ip > a.ip ? -1 : 0
    ),
  ];
  const [apsSiega, setApsSiega] = [
    centro.rede?.wifi_siega?.aps?.sort((a, b) =>
      a.ip > b.ip ? 1 : b.ip > a.ip ? -1 : 0
    ),
  ];
  const [planos, setPlanos] = useState(centro.planos);
  const [visiblePlano, setVisibilePlano] = useState(
    planos[0]?.plantas[0].plano || ""
  );

  const handleVisbilePlano = (e) => {
    e.preventDefault();
    const index = e.target.id;
    setVisibilePlano(index);
  };

  useEffect(() => {
    console.log(visiblePlano);
  }, [visiblePlano]);

  return (
    <div className="flex justify-between">
      <div className="w-2/3 flex">
        {planos.length > 0 ? (
          <div className="w-1/3 h-fit">
            <ContainerWrap>
              <div className="planos-nav">
                <dl>
                  {planos.map((edificio) => {
                    return (
                      <>
                        <dt
                          key={edificio._id}
                          className={visiblePlano === index ? "active" : ""}
                          href=""
                        >
                          {edificio.nome_edificio}
                        </dt>
                        {edificio.plantas.map((planta) => {
                          return (
                            <dd>
                              <a
                                onClick={handleVisbilePlano}
                                id={planta.plano}
                                className={`${
                                  visiblePlano === planta.plano ? "active " : ""
                                }`}
                                href=""
                              >
                                {planta.planta}
                              </a>
                            </dd>
                          );
                        })}
                      </>
                    );
                  })}
                </dl>
              </div>
            </ContainerWrap>
          </div>
        ) : (
          <></>
        )}
        <div className="border border-solid border-white rounded-xl overflow-hidden h-full w-full">
          {visiblePlano ? (
            <img className="h-full" src={visiblePlano} alt="" />
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-black opacity-60">
              <img className="h-20" src="assets/icons/empty-img.png" alt="" />
              <span className="mt-4 text-white">Non hai planos do centro</span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 grid-rows-3 gap-y-4">
        <ContainerWrap title={"Rede principal"}>
          <div className="mt-4">
            {switches && switches.length > 0 ? (
              <table>
                <tbody className="tbody remove-scrollbar">
                  {switches.map((e_switch) => {
                    return (
                      <RedeItem
                        ip={e_switch.ip}
                        status={e_switch.status}
                        location={e_switch.location || "Sen localizar"}
                      />
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="mt-8">
                <div className="px-40">Non hai switches rexistrados</div>
              </div>
            )}
          </div>
        </ContainerWrap>
        <ContainerWrap title={"edu.xunta.gal"}>
          <div className="mt-4">
            {aps && aps.length > 0 ? (
              <table>
                <tbody className="tbody remove-scrollbar">
                  {aps.map((ap) => {
                    return (
                      <RedeItem
                        ip={ap.ip}
                        status={ap.status}
                        location={ap.location || "Sen localizar"}
                      />
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="mt-8">
                <div className="px-40">Non hai aps rexistrados</div>
              </div>
            )}
          </div>
        </ContainerWrap>
        <ContainerWrap title={"WiFi Siega"}>
          <div className="mt-4">
            {apsSiega && apsSiega.length > 0 ? (
              <table>
                <tbody className="tbody remove-scrollbar">
                  {apsSiega.map((apSiega) => {
                    return (
                      <RedeItem
                        ip={apSiega.ip}
                        status={apSiega.status}
                        location={apSiega.location || "Sen localizar"}
                      />
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="mt-8">
                <div className="px-40">Non hai aps siega rexistrados</div>
              </div>
            )}
          </div>
        </ContainerWrap>
      </div>
    </div>
  );
};

export default Planos;
