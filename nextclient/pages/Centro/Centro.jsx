import React, { useContext, useState, useEffect } from "react";
import InfoCentro from "../../components/InfoCentro/InfoCentro";
import InfoCentroForm from "../../components/Forms/InfoCentroForm";
import LANs from "../../components/InfoCentro/LANs";
import AvariasDetectadas from "../../components/InfoCentro/AvariasDetectadas";
import { randomImg } from "../../utils/randomImg";
import UserContext from "../../context/UserContext";
import Aside from "@/components/Modales/MainModales/ModalCentro/Aside";
import CentroContext from "@/context/CentroContext";
import Pool from "@/components/GLPI/Pool";
import IncidenciasCentro from "@/components/GLPI/IncidenciasCentro";

const Centro = () => {
  const {
    infoCentro,
    obterDatosCentro,
    avarias,
    monitorizacions,
    incidencias,
  } = useContext(CentroContext);
  const { grupo } = useContext(UserContext);

  const [edit, setEdit] = useState(false);
  const img = randomImg();

  useEffect(() => {
    console.log("refresing centro");
    obterDatosCentro({
      centro: infoCentro,
      monitorizacions: monitorizacions,
    });
  }, [infoCentro]);

  return (
    <>
      <div className="centro-container">
        <div>
          {!edit ? (
            <InfoCentro img={img} setEdit={setEdit} />
          ) : (
            <InfoCentroForm img={img} setEdit={setEdit} />
          )}
        </div>
        <div className="centro-middle">
          <LANs lans={infoCentro.rede.lans} />
          <AvariasDetectadas />
          <IncidenciasCentro incidencias={incidencias} />
        </div>
        <div className="centro-right">
          <Aside />
        </div>
      </div>
    </>
  );
};

export default Centro;
