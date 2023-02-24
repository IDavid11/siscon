import React, { useContext, useEffect } from "react";
import Header from "../components/Header/Header";
import ToastMessageContext from "../context/ToastMessageContext";
import { useRouter } from "next/router";
import UserContext from "../context/UserContext";
import ModalAuthGLPI from "../components/Modales/ModalAuthGLPI";

const Layout = ({ children }) => {
  const { token, glpi_cookie, recuperarSesion } = useContext(UserContext);
  const { error, tipo, message } = useContext(ToastMessageContext);
  const router = useRouter();

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (!sessionToken) router.push("auth");
    console.log(token);
    console.log(glpi_cookie);
  }, [error]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-tab-background">
      <Header />
      <div className="layout-container p-6">{children}</div>
      {!glpi_cookie ? <ModalAuthGLPI /> : <></>}
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
    </div>
  );
};

export default Layout;
