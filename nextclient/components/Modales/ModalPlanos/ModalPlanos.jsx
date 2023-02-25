import CentroContext from "@/context/CentroContext";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../../context/UserContext";
import { instance } from "../../../services/axios";
import { apiUrls } from "../../../services/urls";
import CambiarPlanoForm from "../../Forms/CambiarPlanoForm";
import Modal from "../../utils/Modal";

const ModalPlanos = ({ planos, handleCloseModal }) => {
  const { infoCentro } = useContext(CentroContext);
  const { grupo } = useContext(UserContext);

  const [edificioSeleccionado, setEdificioSeleccionado] = useState(
    infoCentro.planos[0]
  );
  const [plantaSeleccionada, setPlantaSeleccionada] = useState(
    infoCentro.planos[0]?.plantas[0]
  );
  const [plantas, setPlantas] = useState(infoCentro.planos[0]?.plantas);
  const [visiblePlano, setVisibilePlano] = useState(
    planos[0]?.plantas[0]?.plano || ""
  );

  const [updatedItem, setUpdatedItem] = useState();

  const [isMouseOverItem, setIsMouseOverItem] = useState(false);
  const [hoverEdificio, setHoverEdificio] = useState();
  const [hoverPlanta, setHoverPlanta] = useState();

  const [isChangingEdificio, setIsChangingEdificio] = useState(false);
  const [isChangingPlanta, setIsChangingPlanta] = useState(false);
  const [isAddingEdificio, setIsAddingEdificio] = useState(false);
  const [isAddingPlanta, setIsAddingPlanta] = useState(false);
  const [isMouseOverImage, setIsMouseOverImage] = useState(false);
  const [isChangingImage, setIsChangingImage] = useState(false);

  const handleIsChangingImage = () => {
    setIsChangingImage(!isChangingImage);
  };

  const handleSeleccionarEdificio = (edificio) => {
    setEdificioSeleccionado(edificio);
    setPlantaSeleccionada(edificio.plantas[0]);
    setPlantas(edificio.plantas);
    setVisibilePlano(edificio.plantas[0]?.plano);
  };

  const handleSeleccionarPlanta = (planta) => {
    setPlantaSeleccionada(planta);
    setVisibilePlano(planta.plano);
  };

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
    } else {
      setUpdatedItem({ ...updatedItem, [e.target.name]: "" });
    }
  };

  const submitUpdateEdificio = async (e) => {
    e.preventDefault();
    const res = await instance.post(apiUrls.urlActualizarEdificio, {
      centroId: infoCentro._id,
      edificioId: updatedItem.id,
      nome: updatedItem.nome,
    });

    infoCentro.planos = res.data;
    setIsChangingEdificio(false);
  };

  const submitEngadirEdificio = async (e) => {
    e.preventDefault();
    const res = await instance.post(apiUrls.urlEngadirEdificio, {
      centroId: infoCentro._id,
      nome: updatedItem.nome,
    });

    infoCentro.planos.push(res.data);
    setEdificioSeleccionado(res.data);
    setIsAddingEdificio(false);
  };

  const deleteEdificio = async (e) => {
    e.preventDefault();
    const res = await instance.post(apiUrls.urlEliminarEdificio, {
      centroId: infoCentro._id,
      edificioId: updatedItem.id,
    });
    infoCentro.planos = res.data;
    setIsChangingEdificio(false);
  };

  const submitEngadirPlanta = async (e) => {
    e.preventDefault();
    const res = await instance.post(apiUrls.urlEngadirPlanta, {
      centroId: infoCentro._id,
      edificioId: edificioSeleccionado._id,
      nome: updatedItem.nome,
    });
    infoCentro.planos
      .find((e) => e._id == edificioSeleccionado._id)
      .plantas?.push(res.data);

    setIsAddingPlanta(false);
  };

  const submitUpdatePlanta = async (e) => {
    e.preventDefault();
    const res = await instance.post(apiUrls.urlActualizarPlanta, {
      centroId: infoCentro._id,
      edificioId: edificioSeleccionado._id,
      plantaId: updatedItem.id,
      nome: updatedItem.nome,
    });

    infoCentro.planos = res.data;
    setIsChangingPlanta(false);
  };

  const deletePlanta = async (e) => {
    e.preventDefault();
    const res = await instance.post(apiUrls.urlEliminarPlanta, {
      centroId: infoCentro._id,
      edificioId: edificioSeleccionado._id,
      plantaId: updatedItem.id,
    });

    infoCentro.planos = res.data;
    setEdificioSeleccionado(
      infoCentro.planos.find((e) => e._id === edificioSeleccionado._id)
    );
    setIsChangingPlanta(false);
  };

  useEffect(() => {
    const edfSeleccionado = infoCentro.planos.find(
      (e) => e._id === edificioSeleccionado?._id
    );
    setEdificioSeleccionado(edfSeleccionado);
    setPlantas(edfSeleccionado?.plantas);
  }, [planos, edificioSeleccionado, plantaSeleccionada, plantas, visiblePlano]);

  return (
    <Modal title={"Planos"} handleCloseModal={handleCloseModal}>
      {grupo === "sistemas" || grupo === "admin" ? (
        <div className="min-w-[500px]">
          <div>
            <div className="planos-nav">
              <div className="flex items-center gap-x-4">
                <div className="font-medium">Edificios</div>
                <div>
                  <img
                    className="h-6"
                    src="/assets/icons/school-building.png"
                    alt=""
                  />
                </div>
              </div>
              <div
                className={`${
                  isChangingImage ? "cursor-not-allowed" : ""
                } mt-4 flex items-center gap-x-5`}
              >
                {planos &&
                  planos.map((edificio) => {
                    return (
                      <div
                        key={edificio._id}
                        onMouseOver={(e) => {
                          setIsMouseOverItem(true);
                          setHoverEdificio(edificio);
                        }}
                        onMouseLeave={(e) => {
                          setIsMouseOverItem(false);
                          setHoverEdificio(null);
                        }}
                        className={`${
                          edificioSeleccionado?._id == edificio._id
                            ? "bg-gray-200 shadow-md"
                            : ""
                        } ${
                          isChangingImage ? "pointer-events-none" : ""
                        } w-72 h-10 hover:bg-gray-200 rounded-xl flex items-center pl-4 cursor-pointer border border-solid border-gray-300`}
                        onClick={(e) => handleSeleccionarEdificio(edificio)}
                      >
                        {isChangingEdificio &&
                        edificioSeleccionado?._id === edificio._id ? (
                          <>
                            <div>
                              <button
                                onClick={deleteEdificio}
                                className="h-6 w-6 bg-red-400 rounded-lg flex items-center justify-center"
                              >
                                <img
                                  className="h-3"
                                  src="/assets/icons/delete.png"
                                  alt=""
                                />
                              </button>
                            </div>
                            <form onSubmit={submitUpdateEdificio}>
                              <input
                                className="outline-none bg-transparent ml-2 w-full"
                                type="text"
                                name="nome"
                                value={updatedItem.nome}
                                autoFocus={true}
                                onChange={handleInputChange}
                              />
                            </form>
                            <div className="mr-4">
                              <button
                                onClick={(e) => setIsChangingEdificio(false)}
                              >
                                <img
                                  className="h-3"
                                  src="/assets/icons/close-black.png"
                                  alt=""
                                />
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <img
                                className="h-6"
                                src="/assets/icons/school-building.png"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">{edificio.nome_edificio}</div>
                            {isMouseOverItem &&
                            hoverEdificio?._id === edificio._id ? (
                              <div className="ml-auto pr-4 pt-1">
                                <button
                                  onClick={(e) => {
                                    setIsChangingEdificio(true);
                                    setUpdatedItem({
                                      id: edificio._id,
                                      nome: edificio.nome_edificio,
                                    });
                                  }}
                                >
                                  <img
                                    className="h-4"
                                    src="/assets/icons/edit-black.png"
                                    alt=""
                                  />
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                {!isAddingEdificio ? (
                  <div className="pt-1">
                    <button
                      onClick={(e) => {
                        setUpdatedItem({ nome: "" });
                        setIsAddingEdificio(true);
                      }}
                      className={`${
                        isChangingImage ? "pointer-events-none" : ""
                      }`}
                    >
                      <img
                        className="h-4"
                        src="/assets/icons/add-button-black.png"
                        alt=""
                      />
                    </button>
                  </div>
                ) : (
                  <div className="shadow-md  w-72 h-10 rounded-xl flex items-center pl-4 cursor-pointer border border-solid border-gray-300">
                    <div>
                      <img
                        className="h-6"
                        src="/assets/icons/school-building.png"
                        alt=""
                      />
                    </div>
                    <form onSubmit={submitEngadirEdificio}>
                      <input
                        className="outline-none bg-transparent ml-2 w-full"
                        type="text"
                        name="nome"
                        value={updatedItem.nome}
                        autoFocus={true}
                        placeholder={"Nome do edificio"}
                        onChange={handleInputChange}
                      />
                    </form>
                    <div className="mr-4">
                      <button onClick={(e) => setIsAddingEdificio(false)}>
                        <img
                          className="h-3"
                          src="/assets/icons/close-black.png"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="planos-nav mt-8">
              <div className="flex items-center gap-x-4">
                <div className="font-medium">Plantas</div>
                <div>
                  <img className="h-6" src="/assets/icons/floor.png" alt="" />
                </div>
              </div>
              <div
                className={`${
                  isChangingImage ? "cursor-not-allowed" : ""
                } mt-4 flex items-center gap-x-5`}
              >
                {plantas &&
                  plantas.map((planta) => {
                    return (
                      <div
                        key={planta._id}
                        id={planta._id}
                        onMouseOver={(e) => {
                          setIsMouseOverItem(true);
                          setHoverPlanta(planta);
                        }}
                        onMouseLeave={(e) => {
                          setIsMouseOverItem(false);
                          setHoverPlanta(null);
                        }}
                        className={`${
                          plantaSeleccionada?._id === planta._id
                            ? "bg-gray-200 shadow-md"
                            : ""
                        } ${
                          isChangingImage ? "pointer-events-none" : ""
                        } w-52 h-10 hover:bg-gray-200 rounded-xl flex items-center pl-4 cursor-pointer border border-solid border-gray-300`}
                        onClick={(e) => handleSeleccionarPlanta(planta)}
                      >
                        {isChangingPlanta &&
                        plantaSeleccionada?._id === planta._id ? (
                          <>
                            <div>
                              <button
                                onClick={deletePlanta}
                                className="h-6 w-6 bg-red-400 rounded-lg flex items-center justify-center"
                              >
                                <img
                                  className="h-3"
                                  src="/assets/icons/delete.png"
                                  alt=""
                                />
                              </button>
                            </div>
                            <form onSubmit={submitUpdatePlanta}>
                              <input
                                className="outline-none bg-transparent ml-2 w-full"
                                type="text"
                                name="nome"
                                value={updatedItem.nome}
                                autoFocus={true}
                                onChange={handleInputChange}
                              />
                            </form>
                            <div className="mr-4">
                              <button
                                onClick={(e) => setIsChangingPlanta(false)}
                              >
                                <img
                                  className="h-3"
                                  src="/assets/icons/close-black.png"
                                  alt=""
                                />
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <img
                                className="h-6"
                                src="/assets/icons/floor.png"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">{planta.planta}</div>
                            {isMouseOverItem &&
                            hoverPlanta?._id === planta._id ? (
                              <div className="ml-auto pr-4 pt-1">
                                <button
                                  onClick={(e) => {
                                    setIsChangingPlanta(true);
                                    setUpdatedItem({
                                      id: planta._id,
                                      nome: planta.planta,
                                    });
                                  }}
                                >
                                  <img
                                    className="h-4"
                                    src="/assets/icons/edit-black.png"
                                    alt=""
                                  />
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                {!isAddingPlanta ? (
                  <>
                    {edificioSeleccionado ? (
                      <div className="pt-1">
                        <button
                          onClick={(e) => {
                            setUpdatedItem({ nome: "" });
                            setIsAddingPlanta(true);
                          }}
                          className={`${
                            isChangingImage ? "pointer-events-none" : ""
                          }`}
                        >
                          <img
                            className="h-4"
                            src="/assets/icons/add-button-black.png"
                            alt=""
                          />
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <div className="shadow-md  w-72 h-10 rounded-xl flex items-center pl-4 cursor-pointer border border-solid border-gray-300">
                    <div>
                      <img
                        className="h-6"
                        src="/assets/icons/floor.png"
                        alt=""
                      />
                    </div>
                    <form onSubmit={submitEngadirPlanta}>
                      <input
                        className="outline-none bg-transparent ml-2 w-full"
                        type="text"
                        name="nome"
                        value={updatedItem.nome}
                        autoFocus={true}
                        placeholder={"Nome da planta"}
                        onChange={handleInputChange}
                      />
                    </form>
                    <div className="mr-4">
                      <button onClick={(e) => setIsAddingPlanta(false)}>
                        <img
                          className="h-3"
                          src="/assets/icons/close-black.png"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!isChangingImage ? (
            <div
              onMouseOver={(e) => setIsMouseOverImage(true)}
              onMouseLeave={(e) => setIsMouseOverImage(false)}
              className="border border-solid border-black rounded-xl overflow-hidden mt-8 cursor-pointer relative"
            >
              {visiblePlano ? (
                <img className="h-96 w-full" src={visiblePlano} alt="" />
              ) : (
                <div className="h-96 w-full flex items-center justify-center">
                  <div className="font-medium">
                    Non hai plano gardado para esta planta
                  </div>
                </div>
              )}

              {isMouseOverImage && plantaSeleccionada ? (
                <div className="absolute top-0 right-0 h-full flex flex-col justify-between items-end p-2">
                  <div className="">
                    <button className="h-8 w-8 rounded-lg bg-gray-300 shadow-xl flex items-center justify-center">
                      <a href={visiblePlano} target="_blank">
                        <img
                          className="h-5"
                          src="/assets/icons/full-screen.png"
                          alt=""
                        />
                      </a>
                    </button>
                  </div>
                  <div className="">
                    <button
                      onClick={(e) => setIsChangingImage(true)}
                      className="h-10 px-3 rounded-lg bg-gray-300 shadow-xl flex items-center justify-center"
                    >
                      Cambiar plano
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <CambiarPlanoForm
              edificioId={edificioSeleccionado._id}
              plantaId={plantaSeleccionada._id}
              handleCloseModal={handleIsChangingImage}
            />
          )}
        </div>
      ) : (
        <div className="min-w-[500px]">
          <div>
            <div className="planos-nav">
              <div className="flex items-center gap-x-4">
                <div className="font-medium">Edificios</div>
                <div>
                  <img
                    className="h-6"
                    src="/assets/icons/school-building.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-x-5">
                {planos &&
                  planos.map((edificio) => {
                    return (
                      <div
                        key={edificio._id}
                        className={`${
                          edificioSeleccionado?._id == edificio._id
                            ? "bg-gray-200 shadow-md"
                            : ""
                        } w-72 h-10 hover:bg-gray-200 rounded-xl flex items-center pl-4 cursor-pointer border border-solid border-gray-300`}
                        onClick={(e) => handleSeleccionarEdificio(edificio)}
                      >
                        <div>
                          <img
                            className="h-6"
                            src="/assets/icons/school-building.png"
                            alt=""
                          />
                        </div>
                        <div className="ml-4">{edificio.nome_edificio}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="planos-nav mt-8">
              <div className="flex items-center gap-x-4">
                <div className="font-medium">Plantas</div>
                <div>
                  <img className="h-6" src="/assets/icons/floor.png" alt="" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-x-5">
                {plantas &&
                  plantas.map((planta) => {
                    return (
                      <div
                        key={planta._id}
                        id={planta._id}
                        className={`${
                          plantaSeleccionada?._id === planta._id
                            ? "bg-gray-200 shadow-md"
                            : ""
                        } w-52 h-10 hover:bg-gray-200 rounded-xl flex items-center pl-4 cursor-pointer border border-solid border-gray-300`}
                        onClick={(e) => handleSeleccionarPlanta(planta)}
                      >
                        <div>
                          <img
                            className="h-6"
                            src="/assets/icons/floor.png"
                            alt=""
                          />
                        </div>
                        <div className="ml-4">{planta.planta}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div
            onMouseOver={(e) => setIsMouseOverImage(true)}
            onMouseLeave={(e) => setIsMouseOverImage(false)}
            className="border border-solid border-black rounded-xl overflow-hidden mt-8 cursor-pointer relative"
          >
            {visiblePlano ? (
              <img className="h-96 w-full" src={visiblePlano} alt="" />
            ) : (
              <div className="h-96 w-full flex items-center justify-center">
                <div className="font-medium">
                  Non hai plano gardado para esta planta
                </div>
              </div>
            )}

            {isMouseOverImage && plantaSeleccionada ? (
              <div className="absolute top-0 right-0 h-full flex flex-col justify-between items-end p-2">
                <div className="">
                  <button className="h-8 w-8 rounded-lg bg-gray-300 shadow-xl flex items-center justify-center">
                    <a href={visiblePlano} target="_blank">
                      <img
                        className="h-5"
                        src="/assets/icons/full-screen.png"
                        alt=""
                      />
                    </a>
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ModalPlanos;
