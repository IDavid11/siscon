import GLPIContext from "@/context/GLPIContext";
import React, { useState, useContext } from "react";
import ContainerWrap from "../utils/ContainerWrap";
import Nav from "../utils/Nav/Nav";
import NavItem from "../utils/Nav/NavItem";
import TableContainer from "../utils/TableContainer";
import Asignadas from "./Asignadas";
import Grupo from "./Grupo";
import Validacions from "./Validacions";

const GLPI = () => {
  const { grupo, asignadas, validacions } = useContext(GLPIContext);
  const [vista, setVista] = useState("grupo");

  const handleActiveVista = (e) => {
    e.preventDefault();
    setVista(e.target.id);
  };

  return (
    <ContainerWrap title={"GLPI"}>
      <div>
        <Nav>
          <NavItem
            a={"grupo"}
            focusTag={vista}
            span={"Grupo"}
            isLoading={false}
            handleActivePage={handleActiveVista}
          />
          <NavItem
            a={"asignadas"}
            focusTag={vista}
            span={"Asignadas"}
            isLoading={false}
            handleActivePage={handleActiveVista}
          />
          <NavItem
            a={"validacions"}
            focusTag={vista}
            span={"Validacións"}
            isLoading={false}
            handleActivePage={handleActiveVista}
          />
        </Nav>
      </div>
      <TableContainer>
        {vista === "grupo" ? <Grupo incidencias={grupo} /> : <></>}
        {vista === "asignadas" ? <Asignadas incidencias={asignadas} /> : <></>}
        {vista === "validacions" ? (
          <Validacions incidencias={validacions} />
        ) : (
          <></>
        )}
      </TableContainer>
    </ContainerWrap>
  );
};

export default GLPI;
