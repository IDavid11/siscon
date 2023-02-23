import React, { useState } from "react";
import ContainerWrap from "../utils/ContainerWrap";

const Estadisticas = ({ electronicaCentro }) => {
  const [estadisticas, setEstadisticas] = useState([
    {
      electronica: {
        up: electronicaCentro.filter((e) => e.status == "up"),
        down: electronicaCentro.filter((e) => e.status == "down"),
      },
      switches: {
        up: electronicaCentro.filter(
          (e) =>
            (e.tipo == "SW_Siega" || e.tipo == "Switch") && e.status == "up"
        ),
        down: electronicaCentro.filter(
          (e) =>
            (e.tipo == "SW_Siega" || e.tipo == "Switch") && e.status == "down"
        ),
      },
      aps: {
        up: electronicaCentro.filter(
          (e) => e.tipo == "AP_edu_xunta_gal" && e.status == "up"
        ),
        down: electronicaCentro.filter(
          (e) => e.tipo == "AP_edu_xunta_gal" && e.status == "down"
        ),
      },
    },
  ]);

  return (
    <ContainerWrap title={"Estadísticas"} img={"/assets/icons/graph.png"}>
      <table className="rounded-xl w-full relative">
        <tbody>
          {estadisticas &&
            estadisticas.map((estadistica, index) => {
              return (
                <>
                  {Object.entries(estadistica).map((est) => {
                    var est_calc = est[1];
                    var p_up = Math.round(
                      (est_calc.up.length /
                        (est_calc.up.length + est_calc.down.length)) *
                        100
                    );

                    var p_down = Math.round(
                      (est_calc.down.length /
                        (est_calc.up.length + est_calc.down.length)) *
                        100
                    );

                    return (
                      <tr key={index} className="mt-2 align-middle text-center">
                        <td className="py-2.5 px-2 uppercase text-left font-medium">
                          {est[0]}
                        </td>
                        <td className="w-[50%] py-2.5 px-2">
                          <div className="w-full h-1-5 flex rounded-full overflow-hidden">
                            <div
                              className="h-1.5 bg-green-400"
                              style={{ width: `${p_up}%` }}
                              title={`${est[1].up} up`}
                            ></div>
                            <div
                              className="h-1.5 bg-red-400"
                              style={{ width: `${p_down}%` }}
                              title={`${est[1].down} down`}
                            ></div>
                          </div>
                        </td>
                        <td className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <div
                              className="text-xs"
                              title={`${est[1].up} de ${
                                est[1].up + est[1].con_incidencias + est[1].down
                              }`}
                            >
                              {p_up}%
                            </div>
                          </div>
                        </td>
                      </tr>
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

export default Estadisticas;
