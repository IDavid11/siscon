import React, { useContext, useState, useEffect } from "react";
import TabsInfoContext from "../../context/TabsInfoContext";
import InfoCentro from "../../components/InfoCentro/InfoCentro";
import InfoCentroForm from "../../components/Forms/InfoCentroForm";
import Electronica from "../../components/InfoCentro/Electronica";
import LANs from "../../components/InfoCentro/LANs";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";
import useLoading from "../../hooks/useLoading";
import Planos from "../../components/InfoCentro/Planos";
import Racks from "../../components/InfoCentro/Racks";
import AvariasDetectadas from "../../components/InfoCentro/AvariasDetectadas";
import Estadisticas from "../../components/InfoCentro/Estadisticas";
import { randomImg } from "../../utils/randomImg";
import Avisos from "../../components/InfoCentro/Avisos";
import UserContext from "../../context/UserContext";

const Centro = () => {
  const { grupo } = useContext(UserContext);
  const { tabsInfo, selectedTab, handleUpdateTabsInfo } =
    useContext(TabsInfoContext);
  const { isLoading, setIsLoading } = useLoading(false);

  const [centro, setCentro] = useState(tabsInfo[selectedTab].centro);

  const [edit, setEdit] = useState(false);
  console.log("refreshing centro 2");
  const img = randomImg();

  const initCmd = async () => {
    let componentMounted = true;
    if (
      tabsInfo[selectedTab].centro.network_checked === false &&
      componentMounted
    ) {
      setIsLoading(true);
      await doPing();
      setIsLoading(false);
    }

    return () => (componentMounted = false);
  };

  const doPing = async () => {
    const { data } = await instance.post(apiUrls.urlPing, {
      index: centro._id,
    });
    const tabsInfoVar = tabsInfo;
    tabsInfoVar[selectedTab].centro.network_checked = true;
    tabsInfoVar[selectedTab].centro.rede.electronica = data.data;
    handleUpdateTabsInfo([...tabsInfoVar]);
  };

  const obterElectronicaLan = () => {
    const tabsInfoVar = tabsInfo;
    tabsInfoVar[selectedTab].centro.rede.lans.map(async (lan, index) => {
      const { data } = await instance.post(apiUrls.urlObterElectronicaLan, {
        centroId: tabsInfo[selectedTab].centro._id,
        lanId: lan._id,
      });
      tabsInfoVar[selectedTab].centro.rede.lans[index].electronica = data.data;
    });
    handleUpdateTabsInfo([...tabsInfoVar]);
  };

  const obterInformacionSistemas = async () => {};

  useEffect(() => {
    console.log("refresing centro");
    if (!tabsInfo[selectedTab].centro.network_checked) initCmd();
    obterElectronicaLan();
    setCentro(tabsInfo[selectedTab].centro);
  }, []);

  return (
    <div className="centro-container flex gap-x-20">
      <div>
        {!edit ? (
          <InfoCentro centro={centro} img={img} setEdit={setEdit} />
        ) : (
          <InfoCentroForm centro={centro} img={img} setEdit={setEdit} />
        )}
      </div>
      <div className="centro-middle">
        <LANs lans={centro.rede.lans} />
        <AvariasDetectadas avarias={tabsInfo[selectedTab].monitorizacions} />
        <Electronica
          electronica={centro.rede.electronica}
          isLoading={isLoading}
        />
      </div>
      <div className="centro-right">
        <Estadisticas electronicaCentro={centro.rede.electronica} />
        <Avisos avisos={tabsInfo[selectedTab].avisos} />
        <Racks racks={centro.rede.racks} />
        <Planos planos={centro.planos} />
      </div>
    </div>
  );
};

export default Centro;
