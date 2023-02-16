import React, { useState, useEffect } from "react";
import Usuarios from "./Usuarios/Usuarios";

const Admin = () => {
  const [tablaVisible, setTablaVisible] = useState("usuarios");

  return (
    <div className="admin-container">
      <div className="admin-tabs-container">
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer">
          <div>
            <img className="h-10" src="/assets/icons/danger.png" alt="" />
          </div>
          <div className="text-lg font-medium">Usuarios</div>
          <div className="font-light mt-4">
            Engadir, eliminar, modificar e xestións de contrasinais.
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer">
          <div>
            <img className="h-10" src="/assets/icons/danger.png" alt="" />
          </div>
          <div className="text-lg font-medium">Usuarios</div>
          <div className="font-light mt-4">
            Engadir, eliminar, modificar e xestións de contrasinais.
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer">
          <div>
            <img className="h-10" src="/assets/icons/danger.png" alt="" />
          </div>
          <div className="text-lg font-medium">Usuarios</div>
          <div className="font-light mt-4">
            Engadir, eliminar, modificar e xestións de contrasinais.
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer">
          <div>
            <img className="h-10" src="/assets/icons/danger.png" alt="" />
          </div>
          <div className="text-lg font-medium">Usuarios</div>
          <div className="font-light mt-4">
            Engadir, eliminar, modificar e xestións de contrasinais.
          </div>
        </div>
      </div>
      <div className="admin-tables-container">
        {tablaVisible === "usuarios" ? <Usuarios /> : <></>}
        {tablaVisible === "tipo_electronica" ? <></> : <></>}
        {tablaVisible === "centros" ? <></> : <></>}
        {tablaVisible === "hardware" ? <></> : <></>}
      </div>
    </div>
  );
};

export default Admin;
