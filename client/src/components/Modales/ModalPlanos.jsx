import React, { useState, useEffect } from "react";
import PlanoForm from "../Forms/PlanoForm";
import Modal from "../utils/Modal";

const ModalPlanos = ({ planos, handleCloseModal }) => {
  const [edificio, setEdificio] = useState(planos[0]?.plantas[0]);
  const [plantas, setPlantas] = useState(planos[0]?.plantas);
  const [visiblePlano, setVisibilePlano] = useState(
    planos[0]?.plantas[0].plano || ""
  );

  const handlePlantas = (index) => {
    setPlantas(planos[index].plantas);
  };

  const handleSelects = (index) => {
    setEdificio(planos[index]);
    setPlantas(planos[index].plantas);
  };

  const handleVisiblePlano = (index) => {
    setVisibilePlano(planos[edificio].plantas[index].plano);
  };

  useEffect(() => {
    console.log(visiblePlano);
  }, [visiblePlano]);

  return (
    <Modal title={"Planos"} handleCloseModal={handleCloseModal}>
      <div>
        {/*<PlanoForm plano={plano} handleCloseModal={handleCloseModal} />*/}
        <div className="planos-nav">
          <div className="font-medium">Edificios</div>
          <div className="mt-4">
            {planos.map((edificio, index) => {
              return (
                <>
                  <div
                    key={index}
                    id={index}
                    className={`${
                      visiblePlano === index ? "active" : ""
                    } w-52 h-10 hover:bg-gray-200 rounded-xl flex items-center pl-4 cursor-pointer border border-solid border-gray-300`}
                    onClick={(e) => handleSelects(index)}
                  >
                    {edificio.nome_edificio}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="planos-nav mt-8">
          <div className="font-medium">Plantas</div>
          <div className="mt-4 flex gap-x-5">
            {plantas.map((planta, index) => {
              return (
                <>
                  <div
                    key={index}
                    id={index}
                    className={`${
                      visiblePlano === index ? "active" : ""
                    } w-52 h-10 hover:bg-gray-200 rounded-xl flex items-center pl-4 cursor-pointer border border-solid border-gray-300`}
                    onClick={(e) => handleSelects(index)}
                  >
                    {planta.planta}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPlanos;
