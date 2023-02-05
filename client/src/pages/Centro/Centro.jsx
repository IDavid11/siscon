import React, { useContext, useState, useEffect } from "react";
import TabsInfoContext from "../../context/TabsInfoContext";
import { actualizarCentro } from "../../services/actualizarCentro";
import ContainerWrap from "../../components/utils/ContainerWrap";
import InfoCentro from "../../components/InfoCentro/InfoCentro";
import InfoCentroAdmin from "../../components/Admin/InfoCentroAdmin";
import Electronica from "../../components/InfoCentro/Electronica";
import LANs from "../../components/InfoCentro/LANs";
import Avisos from "../../components/InfoCentro/Avisos";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";
import useLoading from "../../hooks/useLoading";

const Centro = () => {
  const { tabsInfo, selectedTab, handleUpdateTabsInfo } =
    useContext(TabsInfoContext);
  const { isLoading, setIsLoading } = useLoading(false);

  const [centro, setCentro] = useState(tabsInfo[selectedTab].centro);
  const [avarias, setAvarias] = useState(tabsInfo[selectedTab].avarias);

  const [updatedLans, setUpdatedLans] = useState(
    tabsInfo[selectedTab].centro.rede.lans
  );

  const [updatedCentro, setUpdatedCentro] = useState(
    tabsInfo[selectedTab].centro
  );
  const [edit, setEdit] = useState(false);

  const initCmd = async () => {
    let componentMounted = true;
    console.log(tabsInfo[selectedTab].centro.network_checked);
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
    const res = await instance.post(apiUrls.urlPing, {
      index: centro._id,
    });
    const tabsInfoVar = tabsInfo;
    tabsInfoVar[selectedTab].centro.network_checked = true;
    tabsInfoVar[selectedTab].centro.rede.electronica = res.data;
    handleUpdateTabsInfo([...tabsInfoVar]);
  };

  const handleUpdateData = async () => {
    const tabsInfoVar = tabsInfo;
    tabsInfoVar[selectedTab].centro = updatedCentro;
    handleUpdateTabsInfo(tabsInfoVar);
    await actualizarCentro(tabsInfoVar[selectedTab].centro);
    setEdit(false);
  };

  const submitUpdatedCentro = async () => {
    updatedCentro.rede.lans = updatedLans;
    const centro = await actualizarCentro(updatedCentro);
    //handleUpdateTabsInfo(tabsInfoVar)
  };

  useEffect(() => {
    initCmd();
  }, []);

  return (
    <div className="centro-container flex gap-x-20">
      <div>
        <ContainerWrap
          editBtn={true}
          edit={edit}
          setEdit={setEdit}
          handleUpdateData={handleUpdateData}
        >
          {!edit ? (
            <InfoCentro centro={centro} />
          ) : (
            <InfoCentroAdmin
              centro={centro}
              updatedCentro={updatedCentro}
              setUpdatedCentro={setUpdatedCentro}
            />
          )}
        </ContainerWrap>
      </div>
      <div className="centro-middle">
        <LANs lans={centro.rede.lans} />
        <Avisos avisos={avarias} />
        <Electronica
          electronica={centro.rede.electronica}
          isLoading={isLoading}
        />
      </div>
      <div></div>
    </div>
  );
};

export default Centro;
