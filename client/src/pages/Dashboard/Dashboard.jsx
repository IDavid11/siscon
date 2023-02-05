import React, { useState, useEffect, useContext } from "react";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";
import Avisos from "../../components/Dashboard/Avisos";
import ElectronicaDown from "../../components/Dashboard/ElectronicaDown";
import Estadisticas from "../../components/Dashboard/Estadisticas";
import TabsInfoContext from "../../context/TabsInfoContext";
import ResultadosCargando from "../Listados/CentrosEducativos/ResultadosCargando";
import ContainerWrap from "../../components/utils/ContainerWrap";

const Dashboard = () => {
  const { handleNewTabButton } = useContext(TabsInfoContext);
  const [centros, setCentros] = useState([]);
  const [avisos, setAvisos] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);

  const getCentros = async () => {
    const res = await instance.get(apiUrls.urlGetCentros);
    //setCentros(res.data.sort((a, b) => b.avarias.length - a.avarias.length));
    setCentros(
      res.data.sort((a, b) => a.centro.porcentaxe - b.centro.porcentaxe)
    );
  };

  const getAvisos = async () => {
    const res = await instance.get(apiUrls.urlGetAvisos);
    setAvisos(
      res.data.sort(
        (a, b) => Date.parse(b.data.$date) - Date.parse(a.data.$date)
      )
    );
  };

  const getEstadisticas = async () => {
    const res = await instance.get(apiUrls.urlGetEstadisticas);
    setEstadisticas(res.data);
  };

  const getFullDashboard = async () => {
    const res = await instance.get(apiUrls.urlGetFullDashboard);
    setCentros(
      res.data.centros.sort((a, b) => a.centro.porcentaxe - b.centro.porcentaxe)
    );
    setAvisos(
      res.data.monitorizacions.sort(
        (a, b) => Date.parse(b.data.$date) - Date.parse(a.data.$date)
      )
    );
    setEstadisticas(res.data.estadisticas);
  };

  useEffect(() => {
    getCentros();
    getAvisos();
    getEstadisticas();
    const interval = setInterval(() => {
      getFullDashboard();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <ContainerWrap>
        <table className="rounded-xl overflow-hidden w-full">
          <tbody>
            <tr className="h-10 mt-8 bg-primary-color text-white w-full">
              <td className="text-left px-2 font-medium"></td>
              <td className="text-left px-2 font-medium">Concello</td>
              <td className="text-left px-2 font-medium">Centro</td>
              <td className="text-left px-2 font-medium">Avisos</td>
              <td className="text-left px-2 font-medium">Estadísticas</td>
              <td></td>
            </tr>
            {centros.length < 1 ? (
              <ResultadosCargando />
            ) : (
              <>
                {centros &&
                  centros.map((centro, index) => {
                    var up = centro.centro.rede.electronica.filter(
                      (e) => e.status == "up"
                    );
                    var down = centro.centro.rede.electronica.filter(
                      (e) => e.status == "down"
                    );
                    var p_up = Math.round(
                      (up.length / centro.centro.rede.electronica.length) * 100
                    );
                    var p_down = Math.round(
                      (down.length / centro.centro.rede.electronica.length) *
                        100
                    );
                    return (
                      <tr
                        key={centro.centro._id}
                        onClick={() => {
                          handleNewTabButton(centro);
                        }}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        <td className="py-2.5 px-2">{index + 1}</td>
                        <td className="py-2.5 px-2">
                          {centro.centro.concello}
                        </td>
                        <td className="py-2.5 px-2">{centro.centro.centro}</td>
                        <td className="py-2.5 px-2">
                          <span className="py-1.5 px-4 text-sm bg-gray-200 rounded-full">
                            {centro.avarias.length} avarías detectadas
                          </span>
                        </td>
                        <td className="w-40 py-2.5 px-2">
                          <div className="w-full h-1-5 flex rounded-full overflow-hidden">
                            <div
                              className="h-1.5 bg-green-400"
                              style={{ width: `${p_up}%` }}
                              title={`${up.length} up`}
                            ></div>
                            <div
                              className="h-1.5 bg-red-400"
                              style={{ width: `${p_down}%` }}
                              title={`${down.length} down`}
                            ></div>
                          </div>
                        </td>
                        <td>
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <div
                              className="text-xs"
                              title={`${up.length} de ${centro.centro.rede.electronica.length}`}
                            >
                              {centro.centro.porcentaxe}%
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </>
            )}
          </tbody>
        </table>
      </ContainerWrap>
      <div className="dashboard-right">
        <Estadisticas estadisticas={estadisticas} />
        <ElectronicaDown electronica={avisos} />
        <Avisos avisos={avisos} />
      </div>
    </div>
  );
};

export default Dashboard;
