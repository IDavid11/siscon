import React, { useContext, useState, useEffect } from "react";
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

const Centro = ({ centro }) => {
  console.log(centro);
  const { grupo } = useContext(UserContext);
  const { isLoading, setIsLoading } = useLoading(false);

  const [edit, setEdit] = useState(false);
  console.log("refreshing centro 2");
  const img = randomImg();

  const initCmd = async () => {
    let componentMounted = true;
    if (centro.network_checked === false && componentMounted) {
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
    centro.network_checked = true;
    centro.centro.rede.electronica = data.data;
  };

  const obterElectronicaLan = () => {
    centro.centro.rede.lans.map(async (lan, index) => {
      const { data } = await instance.post(apiUrls.urlObterElectronicaLan, {
        centroId: centro.centro._id,
        lanId: lan._id,
      });
      centro.centro.rede.lans[index].electronica = data.data;
    });
  };

  const obterInformacionSistemas = async () => {};

  useEffect(() => {
    console.log("refresing centro");
    if (!centro.centro.network_checked) initCmd();
    obterElectronicaLan();
  }, []);

  return (
    <div className="centro-container">
      <div>
        {!edit ? (
          <InfoCentro centro={centro.centro} img={img} setEdit={setEdit} />
        ) : (
          <InfoCentroForm centro={centro.centro} img={img} setEdit={setEdit} />
        )}
      </div>
      <div className="centro-middle">
        <LANs lans={centro.centro.rede.lans} />

        <Electronica
          electronica={centro.centro.rede.electronica}
          isLoading={isLoading}
        />
      </div>
      <div className="centro-right">
        <Estadisticas electronicaCentro={centro.centro.rede.electronica} />
        <Avisos avisos={centro.avisos} />
      </div>
    </div>
  );
};

export default Centro;
