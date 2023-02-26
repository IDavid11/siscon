import React, { useContext, useState, useEffect } from "react";
import InfoCentro from "../../components/InfoCentro/InfoCentro";
import InfoCentroForm from "../../components/Forms/InfoCentroForm";
import LANs from "../../components/InfoCentro/LANs";
import AvariasDetectadas from "../../components/InfoCentro/AvariasDetectadas";
import { randomImg } from "../../utils/randomImg";
import UserContext from "../../context/UserContext";
import Aside from "@/components/Modales/MainModales/ModalCentro/Aside";
import CentroContext from "@/context/CentroContext";
import Pool from "@/components/GLPI/Pool2";

const Centro = ({ centro }) => {
  const { obterDatosCentro, avarias } = useContext(CentroContext);
  const { grupo } = useContext(UserContext);

  const [edit, setEdit] = useState(false);
  console.log("refreshing centro 2");
  const img = randomImg();

  useEffect(() => {
    console.log("refresing centro");
    obterDatosCentro(centro);
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
