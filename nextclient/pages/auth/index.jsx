import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { instance } from "../../services/axios";
import { useRouter } from "next/router";

const Auth = () => {
  const { token, iniciarSesion } = useContext(UserContext);
  const [usuarioExiste, setUsuarioExiste] = useState(false);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [isError, setIsError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUserForm = async (e) => {
    e.preventDefault();
    const username = document.getElementById("usuario").value;
    const res = await instance.post(
      "http://127.0.0.1:8000/usuarios/buscar-usuario",
      { username: username }
    );

    if (res.status === 200) {
      setUsuarioExiste(true);
      setIsError("");
      setUsuarioAutenticado(res.data.autenticado);
    }
    if (res.data?.error) {
      setUsuarioExiste(false);
      setIsError("username");
      setError(res.data.error);
    }
  };

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    const login = document.getElementById("usuario").value;
    const novo_contrasinal = document.getElementById("novo-contrasinal").value;
    const repetir_novo_contrasinal = document.getElementById(
      "repetir-novo-contrasinal"
    ).value;

    if (
      repetir_novo_contrasinal !== "" &&
      repetir_novo_contrasinal === novo_contrasinal
    ) {
      const { data } = await instance.post(
        "http://127.0.0.1:8000/usuarios/login",
        {
          username: login,
          password: novo_contrasinal,
        }
      );
      const { usuario, access_token } = data;
      if (access_token) {
        iniciarSesion({
          login: login,
          nome: usuario.nome,
          grupo: usuario.grupo,
          token: access_token,
        });
      }
    } else {
      setIsError("password");
      setError("Os contrasinais non coinciden");
    }
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    const login = document.getElementById("usuario").value;
    const contrasinal = document.getElementById("contrasinal").value;

    const { data } = await instance.post(
      "http://127.0.0.1:8000/usuarios/login",
      {
        username: login,
        password: contrasinal,
      }
    );

    const { usuario, access_token } = data;
    if (access_token) {
      iniciarSesion({
        login: login,
        nome: usuario.nome,
        grupo: usuario.grupo,
        token: access_token,
      });
    } else {
      setIsError("password");
      setError("Contrasinal incorrecto");
    }
  };

  useEffect(() => {
    console.log(token);
    if (token) router.push("dashboard");
  }, [token]);

  return (
    <div className="w-full h-screen relative auth-background">
      <div className="flex items-center absolute top-8 left-20">
        <div className="img">
          <img className="h-9" src="favicon.png" alt="" />
        </div>
        <div className="ml-2.5 font-medium">SISCON | UAC</div>
      </div>
      <div className="w-full h-full flex items-center">
        <div className="w-[60%] h-full flex items-center justify-center">
          <img
            className="w-full max-w-[650px] h-auto"
            src="assets/images/login.png"
            alt=""
          />
        </div>
        <div className="w-[40%] h-full">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-medium uppercase">
                Inicia sesi??n
              </div>
              <form
                className="mt-2.5"
                autoComplete="off"
                onSubmit={handleUserForm}
              >
                <div className="mt-5">
                  <div className="w-96 h-20 border border-solid border-black rounded-xl px-5">
                    <div className="py-1 px-7 text-left">
                      <label htmlFor="input">Usuario</label>
                    </div>
                    <div className="flex items-center pt-1">
                      <img
                        className="w-4"
                        src="assets/icons/admin.png"
                        alt=""
                      />
                      <input
                        className="bg-transparent outline-none pl-2.5"
                        id="usuario"
                        type="text"
                        placeholder="ue243319"
                        autoFocus={true}
                      />
                    </div>
                  </div>
                </div>
              </form>
              {isError === "username" ? (
                <div className="flex items-center self-start mt-2.5 ml-1">
                  <span>
                    <img
                      className="h-4"
                      src="/assets/icons/danger.png"
                      alt=""
                    />
                  </span>
                  <span className="text-red-600 ml-1">{error}</span>
                </div>
              ) : (
                <></>
              )}
              {usuarioExiste ? (
                <>
                  {usuarioAutenticado ? (
                    <>
                      <form onSubmit={handleLoginForm}>
                        <div className="mt-5">
                          <div className="w-96 h-20 border border-solid border-black rounded-xl px-5">
                            <div className="py-1 px-7 text-left">
                              <label htmlFor="input">Contrasinal</label>
                            </div>
                            <div className="flex items-center pt-1">
                              <img
                                className="w-4"
                                src="assets/icons/padlock.png"
                                alt=""
                              />
                              <input
                                className="bg-transparent outline-none pl-2.5"
                                id="contrasinal"
                                type="password"
                                placeholder="**************"
                                autoFocus={true}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                      {isError === "password" ? (
                        <div className="flex items-center self-start mt-2.5 ml-1">
                          <span>
                            <img
                              className="h-4"
                              src="/assets/icons/danger.png"
                              alt=""
                            />
                          </span>
                          <span className="text-red-600 ml-1">{error}</span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <>
                      <form onSubmit={handleRegisterForm}>
                        <div className="mt-5">
                          <div className="w-96 h-20 border border-solid border-black rounded-xl px-5">
                            <div className="py-1 px-7 text-left">
                              <label htmlFor="input">Novo contrasinal</label>
                            </div>
                            <div className="flex items-center pt-1">
                              <img
                                className="w-4"
                                src="assets/icons/padlock.png"
                                alt=""
                              />
                              <input
                                className="bg-transparent outline-none pl-2.5"
                                id="novo-contrasinal"
                                type="password"
                                placeholder="**************"
                                autoFocus={true}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-5">
                          <div className="w-96 h-20 border border-solid border-black rounded-xl px-5">
                            <div className="py-1 px-7 text-left">
                              <label htmlFor="input">Repetir contrasinal</label>
                            </div>
                            <div className="flex items-center pt-1">
                              <img
                                className="w-4"
                                src="assets/icons/padlock.png"
                                alt=""
                              />
                              <input
                                className="bg-transparent outline-none pl-2.5"
                                id="repetir-novo-contrasinal"
                                type="password"
                                placeholder="**************"
                              />
                            </div>
                          </div>
                        </div>
                        <input type="submit" style={{ display: "none" }} />
                      </form>
                      {isError === "password" ? (
                        <div className="flex items-center self-start mt-2.5 ml-1">
                          <span>
                            <img
                              className="h-4"
                              src="/assets/icons/danger.png"
                              alt=""
                            />
                          </span>
                          <span className="text-red-600 ml-1">{error}</span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
