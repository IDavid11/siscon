import GLPIContext from "@/context/GLPIContext";
import UserContext from "@/context/UserContext";
import React, { useContext } from "react";

const MenuUsuario = () => {
  const { nome, grupo, finalizarSesion } = useContext(UserContext);
  const { finalizarSesionGLPI } = useContext(GLPIContext);

  return (
    <div className="absolute top-24 2xl:top-24 right-0 z-50 px-6">
      <div className="bg-white p-4 w-72 h-40 2xl:w-80 2xl:h-48 shadow-md rounded-lg">
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="uppercase font-bold text-gray-400">{nome}</div>
            <div className="text-sm uppercase font-bold text-gray-400">
              ({grupo === "n1" ? "Técnico N1" : <></>}
              {grupo === "sistemas" ? "Técnico N2 Sistemas" : <></>}
              {grupo === "aplicacions" ? "Técnico N2 Aplicacións" : <></>}
              {grupo === "admin" ? "Administrador" : <></>})
            </div>
          </div>
          <div>
            <div>
              <ul>
                <li>
                  <a className="flex items-center gap-x-4" href="">
                    <span>
                      <img
                        className="h-4"
                        src="/assets/icons/admin-black.png"
                        alt=""
                      />
                    </span>
                    <span>Admin</span>
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    className=" flex items-center gap-x-4"
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      finalizarSesion();
                      finalizarSesionGLPI();
                    }}
                  >
                    <span>
                      <img
                        className="h-4"
                        src="/assets/icons/logout-black.png"
                        alt=""
                      />
                    </span>
                    <span>Pechar sesión</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuUsuario;
