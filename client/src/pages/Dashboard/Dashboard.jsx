import React, { useState, useEffect, useContext } from "react";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";
import Avisos from "../../components/Dashboard/Avisos";
import ElectronicaDown from "../../components/Dashboard/ElectronicaDown";
import Estadisticas from "../../components/Dashboard/Estadisticas";
import TabsInfoContext from "../../context/TabsInfoContext";
import ToastMessageContext from "../../context/ToastMessageContext";
import ResultadosCargando from "../../components/Dashboard/ResultadosCargando";
import ContainerWrap from "../../components/utils/ContainerWrap";

const Dashboard = () => {
  const { handleNewTabButton } = useContext(TabsInfoContext);
  const { createToastMessage } = useContext(ToastMessageContext);
  const [centros, setCentros] = useState([]);
  const [avisos, setAvisos] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);

  const [filtros, setFiltros] = useState({ concello: "", centro: "" });
  const [search, setSearch] = useState([]);
  const [searchBox, setSearchBox] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setFiltros({
        ...filtros,
        [e.target.name]: e.target.value.toUpperCase().trim(),
      });
    } else {
      setFiltros({ ...filtros, [e.target.name]: "" });
    }
  };

  const handleSearch = () => {
    var centrosFiltrados = [];
    if (filtros.concello != "" && filtros.centro != "") {
      centrosFiltrados = centros.filter(
        (obj) =>
          obj.centro.centro.includes(filtros.centro) &&
          obj.centro.concello.includes(filtros.concello)
      );

      if (centrosFiltrados?.length < 1) setSearch(null);
      else setSearch(centrosFiltrados);
    }

    if (filtros.concello == "" && filtros.centro != "") {
      centrosFiltrados = centros.filter((c) =>
        c.centro.centro.includes(filtros.centro)
      );
      if (centrosFiltrados?.length < 1) setSearch(null);
      else setSearch(centrosFiltrados);
    }

    if (filtros.concello != "" && filtros.centro == "") {
      centrosFiltrados = centros.filter((c) =>
        c.centro.concello.includes(filtros.concello)
      );
      if (centrosFiltrados?.length < 1) setSearch(null);
      else setSearch(centrosFiltrados);
    }

    if (filtros.concello == "" && filtros.centro == "") setSearch(centros);
  };

  const getCentros = async () => {
    const res = await instance.get(apiUrls.urlGetCentros);
    if (res.data.error) {
      createToastMessage({ tipo: 1, message: res.data.message });
    }
    const dataCentros = res.data.sort(
      (a, b) => a.centro.porcentaxe - b.centro.porcentaxe
    );
    setCentros(dataCentros);
    if (search?.length < 1) setSearch(dataCentros);
  };

  const getAvisos = async () => {
    const res = await instance.get(apiUrls.urlGetAvisos);
    if (res.data.error) {
      createToastMessage({ tipo: 1, message: res.data.message });
    }
    setAvisos(
      res.data.sort(
        (a, b) => Date.parse(b.data.$date) - Date.parse(a.data.$date)
      )
    );
  };

  const getEstadisticas = async () => {
    const { data } = await instance.get(apiUrls.urlGetEstadisticas);
    if (data.error) {
      createToastMessage({ tipo: 1, message: data.message });
    }
    setEstadisticas(data.data);
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
    handleSearch();
    const interval = setInterval(() => {
      getFullDashboard();
    }, 20000);
    return () => clearInterval(interval);
  }, [filtros]);

  return (
    <div className="dashboard">
      <ContainerWrap>
        <table className="rounded-xl overflow-hidden w-full">
          <tbody>
            {!searchBox ? (
              <tr className="dashboard-header h-10 mt-8 bg-primary-color text-white w-full">
                <td className="text-left px-2 font-medium">
                  <div>
                    <button
                      onClick={(e) => setSearchBox(true)}
                      className="h-7 w-7 rounded-full bg-white flex items-center justify-center"
                    >
                      <img
                        className="h-3.5"
                        src="/assets/icons/loupe-black.png"
                        alt=""
                      />
                    </button>
                  </div>
                </td>
                <td className="text-left px-2 font-medium">Concello</td>
                <td className="text-left px-2 font-medium">Centro</td>
                <td className="text-left px-2 font-medium">Avisos</td>
                <td className="text-left px-2 font-medium">Estadísticas</td>
                <td className="text-left px-2 font-medium">%</td>
              </tr>
            ) : (
              <tr className="dashboard-header h-20 mt-8 bg-primary-color text-white w-full">
                <td className="text-left px-2 font-medium">
                  <div>
                    <button
                      onClick={(e) => {
                        setSearchBox(false);
                        setFiltros({ concello: "", centro: "" });
                        setSearch(centros);
                      }}
                      className="h-7 w-7 rounded-full bg-white flex items-center justify-center"
                    >
                      <img
                        className="h-2.5"
                        src="/assets/icons/close-black.png"
                        alt=""
                      />
                    </button>
                  </div>
                </td>
                <td className="text-left px-2 font-medium">
                  <input
                    className="bg-transparent border-b border-solid border-gray-400 w-2/3 pl-1 pb-px font-medium"
                    type="text"
                    name="concello"
                    onChange={handleInputChange}
                    placeholder="Concello"
                  />
                </td>
                <td className="text-left px-2 font-medium">
                  <div className="w-2/3">
                    <input
                      className="bg-transparent border-b border-solid border-gray-400 pl-1 pb-px font-medium w-full"
                      type="text"
                      name="centro"
                      onChange={handleInputChange}
                      placeholder="Centro"
                    />
                  </div>
                </td>
                <td className="text-left px-2 font-medium">Avisos</td>
                <td className="text-left px-2 font-medium">Estadísticas</td>
                <td className="text-left px-2 font-medium">%</td>
              </tr>
            )}
            {search && search.length < 1 ? (
              <ResultadosCargando />
            ) : (
              <>
                {search &&
                  search.map((centro, index) => {
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
            {!search ? (
              <td
                colSpan={6}
                className="w-full text-center py-4 font-medium text-lg"
              >
                Non hai coincidencias
              </td>
            ) : (
              <></>
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
