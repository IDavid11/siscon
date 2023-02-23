import React, { useEffect, useState } from "react";
import ContainerWrap from "../utils/ContainerWrap";
import Nav from "../utils/Nav/Nav";
import NavItem from "../utils/Nav/NavItem";

const ElectronicaDown = ({ monitorizacions }) => {
  const nav = [
    { k: "Todos", v: "Todos" },
    { k: "Router", v: "Routers" },
    { k: "SW_Abalar", v: "SW_Abalar" },
    { k: "SW_Siega", v: "SW_Siega" },
  ];

  const imgs = {
    Router: "/assets/images/router.png",
    SW_Abalar: "/assets/images/switch.png",
    SW_Siega: "/assets/images/switch.png",
    Switch: "/assets/images/switch.png",
    AP_edu_xunta_gal: "/assets/images/ap.png",
  };

  const [vista, setVista] = useState("Todos");

  const handleActiveVista = (e) => {
    e.preventDefault();
    setVista(e.target.id);
  };

  useEffect(() => {}, [vista]);

  return (
    <ContainerWrap title={"Electrónica DOWN"} maxHeight={250}>
      <div className="h-10 pt-4 fixed bg-white max-w-[462px]">
        <Nav>
          {nav.map((li) => {
            return (
              <NavItem
                key={li.k}
                a={li.k}
                focusTag={vista}
                span={li.v}
                isLoading={false}
                handleActivePage={handleActiveVista}
              />
            );
          })}
        </Nav>
      </div>
      <table className="rounded-xl w-full relative">
        <tbody>
          {monitorizacions &&
            monitorizacions.map((item) => {
              return (
                <>
                  {item.monitorizacions.map((monitorizacion) => {
                    return (
                      <>
                        {monitorizacion.electronica.tipo == vista ||
                        vista == "Todos" ? (
                          <tr key={monitorizacion._id} className="h-10 mt-8">
                            <td className="py-2.5 px-2 w-2">
                              <span className="p-px bg-red-400 rounded-full"></span>
                            </td>
                            <td className="py-2.5 px-2 w-2/3 text-ellipsis whitespace-nowrap overflow-hidden">
                              {item.centro.centro}
                            </td>
                            <td className="py-2.5 px-2 w-1/3 text-ellipsis whitespace-nowrap overflow-hidden">
                              {monitorizacion.electronica.tipo}
                            </td>
                            <td className="y-2.5 px-2 w-10">
                              <img
                                className="w-10"
                                src={imgs[monitorizacion.electronica.tipo]}
                                alt=""
                              />
                            </td>
                          </tr>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </>
              );
            })}
        </tbody>
      </table>
    </ContainerWrap>
  );
};

export default ElectronicaDown;
