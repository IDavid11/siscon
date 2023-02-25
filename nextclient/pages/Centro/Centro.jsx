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
import Aside from "@/components/Modales/MainModales/ModalCentro/Aside";
import CentroContext from "@/context/CentroContext";
import Pool from "@/components/GLPI/Pool2";

const Centro = ({ centro }) => {
  const { avarias } = useContext(CentroContext);
  const { grupo } = useContext(UserContext);

  const [edit, setEdit] = useState(false);
  console.log("refreshing centro 2");
  const img = randomImg();

  useEffect(() => {
    console.log("refresing centro");
  }, []);

  return (
    <>
      <div className="centro-container">
        <div>
          {!edit ? (
            <InfoCentro centro={centro.centro} img={img} setEdit={setEdit} />
          ) : (
            <InfoCentroForm
              centro={centro.centro}
              img={img}
              setEdit={setEdit}
            />
          )}
        </div>
        <div className="centro-middle">
          <LANs lans={centro.centro.rede.lans} />
          <AvariasDetectadas />
          <Pool />
        </div>
        <div className="centro-right">
          <Aside centro={centro} />
        </div>
      </div>
    </>
  );
};

export default Centro;
