import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import ToastMessageContext from "../context/ToastMessageContext";
import { useRouter } from "next/router";
import UserContext from "../context/UserContext";
import ModalAuthGLPI from "../components/Modales/ModalAuthGLPI";
import GLPIContext from "@/context/GLPIContext";
import CentroContext from "@/context/CentroContext";
import ModalCentro from "@/components/Modales/MainModales/ModalCentro/ModalCentro";

const Layout = ({ children }) => {
  const { token, recuperarSesion } = useContext(UserContext);
  const { glpi_cookie } = useContext(GLPIContext);
  const { infoCentro, borrarDatos } = useContext(CentroContext);
  const { error, tipo, message } = useContext(ToastMessageContext);
  const [modalCentro, setModalCentro] = useState();
  const router = useRouter();

  const handleShowModal = () => {
    borrarDatos();
  };

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (!sessionToken) router.push("auth");
  }, [error, token]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-tab-background">
      <Header />
      <div className="layout-container p-6">{children}</div>
      {!glpi_cookie && token ? <ModalAuthGLPI /> : <></>}
      {error ? (
        <div className="toast-message-container">
          <div
            className={`toast-message ${tipo == 1 ? "toast-error" : ""} ${
              tipo == 2 ? "toast-warning" : ""
            } ${tipo == 0 ? "toast-success" : ""}`}
          >
            <div className="font-medium text-white">{message}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {infoCentro ? <ModalCentro handleCloseModal={handleShowModal} /> : <></>}
    </div>
  );
};

export default Layout;
