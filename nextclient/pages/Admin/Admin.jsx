import React, { useState } from "react";
import Switches from "./Switches";
import Usuarios from "./Usuarios";

const Admin = () => {
  const [tablaVisible, setTablaVisible] = useState("usuarios");

  return (
    <div className="admin-container">
      <div className="admin-tabs-container">
        <div
          className={`bg-white rounded-xl flex flex-col items-center justify-center cursor-pointer ${
            tablaVisible === "usuarios" ? "shadow-xl" : "shadow-md"
          }`}
          onClick={(e) => setTablaVisible("usuarios")}
        >
          <div>
            <img className="h-10" src="/assets/icons/users.png" alt="" />
          </div>
          <div className="text-lg font-medium">Usuarios</div>
          <div className="font-light mt-4">
            Xestión de usuarios e permisos da aplicación.
          </div>
        </div>
        <div
          className={`bg-white rounded-xl flex flex-col items-center justify-center cursor-pointer ${
            tablaVisible === "electronica" ? "shadow-xl" : "shadow-md"
          }`}
          onClick={(e) => setTablaVisible("electronica")}
        >
          <div>
            <img className="h-10" src="/assets/icons/rack.png" alt="" />
          </div>
          <div className="text-lg font-medium">Electrónica</div>
          <div className="font-light mt-4">
            Engadir, eliminar e modificar o tipo de electrónica nos centros.
          </div>
        </div>
      </div>
      <div className="admin-tables-container">
        {tablaVisible === "usuarios" ? <Usuarios /> : <></>}
        {tablaVisible === "electronica" ? <Switches /> : <></>}
      </div>
    </div>
  );
};

export default Admin;
