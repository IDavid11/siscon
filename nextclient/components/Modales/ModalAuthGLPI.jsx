import LoadingContext from "@/context/LoadingContext";
import React, { useContext } from "react";
import ToastMessageContext from "../../context/ToastMessageContext";
import UserContext from "../../context/UserContext";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";

const ModalAuthGLPI = () => {
  const { login, iniciarSesionGLPI } = useContext(UserContext);
  const { error, createToastMessage } = useContext(ToastMessageContext);
  const { isLoading, handleLoading } = useContext(LoadingContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLoading(true);
    const { data } = await instance.post(apiUrls.urlLoginGLPI, {
      username: login,
      password: document.getElementById("contrasinal").value,
    });
    if (data.error) createToastMessage({ tipo: 1, message: data.message });
    else iniciarSesionGLPI(data.data);
    handleLoading(false);
  };

  return (
    <div className="modal w-screen h-screen fixed bg-modal-bg top-0 left-0 flex items-center justify-center">
      <div className="relative bg-white rounded-xl opacity-100">
        <div className="p-8 pt-4 w-96">
          <div className="flex justify-center">
            <img className="h-14" src="/assets/images/glpi.png" alt="" />
          </div>
          <div className="mt-4">
            <div>
              <div className="flex justify-center">
                {!isLoading ? (
                  <img
                    className="h-24"
                    src="/assets/icons/profilecircle.png"
                    alt=""
                  />
                ) : (
                  <img
                    className="h-24"
                    src="/assets/icons/verificado.gif"
                    alt=""
                  />
                )}
              </div>
              <div className="font-bold text-lg text-center">{login}</div>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col mt-4">
                  <label
                    htmlFor="contrasinal"
                    className="font-medium mb-1 uppercase text-sm"
                  >
                    Contrasinal
                  </label>
                  <input
                    type="password"
                    name="contrasinal"
                    id="contrasinal"
                    className="border border-solid border-slate-600 rounded-lg h-14 px-4 outline-none"
                    autoFocus={true}
                  />
                </div>
                <div className="mt-4 w-full">
                  <button
                    type="submit"
                    className="bg-slate-600 rounded-lg h-14 w-full px-10 text-white font-medium"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAuthGLPI;
