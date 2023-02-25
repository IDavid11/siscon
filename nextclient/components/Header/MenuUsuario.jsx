import React from "react";

const MenuUsuario = () => {
  return (
    <div className="absolute top-24 2xl:top-24 right-0 z-50 px-6">
      <div className="bg-white p-4 w-72 h-40 2xl:w-80 2xl:h-48 shadow-md rounded-lg">
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="text-sm 2xl:text-base uppercase font-bold text-gray-400">
              David Iglesias Pallas
            </div>
            <div className="text-sm 2xl:text-base uppercase font-bold text-gray-400">
              (Técnico N1)
            </div>
          </div>
          <div>
            <div>
              <ul>
                <li>
                  <a className="bg-gray-500 flex items-center gap-x-4" href="">
                    <span>
                      <img
                        className="h-4"
                        src="/assets/icons/admin.png"
                        alt=""
                      />
                    </span>
                    <span>Admin</span>
                  </a>
                </li>
                <li className="mt-4">
                  <a className="bg-gray-500 flex items-center gap-x-4" href="">
                    <span>
                      <img
                        className="h-4"
                        src="/assets/icons/logout.png"
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
