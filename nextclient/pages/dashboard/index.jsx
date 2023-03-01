import React, { useState, useEffect, useContext } from "react";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";
import ElectronicaDown from "../../components/Dashboard/ElectronicaDown";
import Estadisticas from "../../components/Dashboard/Estadisticas";
import ToastMessageContext from "../../context/ToastMessageContext";
import ResultadosCargando from "../../components/Dashboard/ResultadosCargando";
import ContainerWrap from "../../components/utils/ContainerWrap";
import GLPI from "../../components/GLPI/GLPI";
import ModalCentro from "../../components/Modales/MainModales/ModalCentro/ModalCentro";
import CentroContext from "../../context/CentroContext";
import UserContext from "../../context/UserContext";
import Layout from "../../layouts/Layout";
import GLPIContext from "@/context/GLPIContext";
import TableContainer from "@/components/utils/TableContainer";

const index = () => {
  const { recuperarSesion, token } = useContext(UserContext);
  const { glpi_cookie, glpi_csrf_token, glpi_search_id, obterIncidenciasGLPI } =
    useContext(GLPIContext);
  const { createToastMessage } = useContext(ToastMessageContext);
  const { infoCentro, seleccionarCentro, borrarDatos } =
    useContext(CentroContext);
  const [showModal, setShowModal] = useState(false);
  const [modalCentro, setModalCentro] = useState();

  const [centros, setCentros] = useState([]);
  const [avisos, setAvisos] = useState([]);
  const [monitorizacions, setMonitorizacions] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);

  const [search, setSearch] = useState([]);

  const handleShowModal = (centro) => {
    setShowModal(!showModal);
    setModalCentro(centro);
    if (showModal) {
      console.log("borrando datos");
      borrarDatos();
    }
  };

  const getFullDashboard = async () => {
    const { data } = await instance.get(apiUrls.urlGetFullDashboard);
    var dataCentros = [];
    var dataMonitorizacions = [];
    var dataAvisos = [];
    data.data.centros.forEach((item) => {
      dataCentros.push({
        centro: item.centro,
        monitorizacions: item.monitorizacions,
        avisos: item.avisos,
      });
      if (item.monitorizacions.length > 0)
        dataMonitorizacions.push({
          monitorizacions: item.monitorizacions,
          centro: item.centro,
        });
      if (item.avisos.length > 0)
        dataAvisos.push({ avisos: item.avisos, centro: item.centro });
    });

    dataCentros = dataCentros.sort(
      (a, b) => a.centro.porcentaxe - b.centro.porcentaxe
    );
    setCentros(dataCentros);
    if (search?.length < 1) setSearch(dataCentros);

    setMonitorizacions(
      dataMonitorizacions.sort(
        (a, b) => Date.parse(b.data) - Date.parse(a.data)
      )
    );
    setAvisos(
      dataAvisos.sort((a, b) => Date.parse(b.data) - Date.parse(a.data))
    );
    setEstadisticas(data.data.estadisticas);
  };

  useEffect(() => {
    console.log("oj");
    if (search?.length < 1) getFullDashboard();
    if (glpi_cookie != null) obterIncidenciasGLPI();
    const interval = setInterval(() => {
      getFullDashboard();
    }, 20000);
    return () => clearInterval(interval);
  }, [glpi_cookie]);

  return (
    <Layout>
      <div className="dashboard">
        <ContainerWrap>
          <TableContainer>
            <table className="rounded-xl w-full relative table-fixed">
              <thead>
                <tr className="dashboard-header h-10 w-full">
                  <th className="w-12"></th>
                  <th className="text-left px-2 font-medium w-[25%]">
                    Concello
                  </th>
                  <th className="text-left px-2 font-medium">Centro</th>
                  <th className="text-left px-2 font-medium w-[15%]">
                    Avarías
                  </th>
                  <th className="text-left px-2 font-medium w-[10%]">
                    Estadísticas
                  </th>
                  <th className="text-left px-2 font-medium w-10">%</th>
                </tr>
              </thead>
              <tbody>
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
                          (up.length / centro.centro.rede.electronica.length) *
                            100
                        );
                        var p_down = Math.round(
                          (down.length /
                            centro.centro.rede.electronica.length) *
                            100
                        );
                        return (
                          <tr
                            key={centro.centro._id}
                            onClick={() => {
                              seleccionarCentro(centro);
                              handleShowModal(centro);
                            }}
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            <td className="py-2.5 px-2">{index + 1}</td>
                            <td className="py-2.5 px-2 whitespace-nowrap overflow-hidden text-ellipsis">
                              {centro.centro.concello}
                            </td>
                            <td className="py-2.5 px-2 whitespace-nowrap overflow-hidden text-ellipsis">
                              {centro.centro.centro}
                            </td>
                            <td className="py-2 px-2">
                              <span className="block py-1.5 px-2 w-full whitespace-nowrap overflow-hidden text-sm bg-gray-200 rounded-full">
                                {centro.monitorizacions.length} avarías
                                detectadas
                              </span>
                            </td>
                            <td className="w-20 2xl:w-40 py-2.5 px-2">
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
          </TableContainer>
        </ContainerWrap>
        <div className="dashboard-right">
          <Estadisticas estadisticas={estadisticas} />
          <GLPI />
          <ElectronicaDown monitorizacions={monitorizacions} />
        </div>
      </div>
      {infoCentro ? <ModalCentro handleCloseModal={handleShowModal} /> : <></>}
    </Layout>
  );
};

export default index;
