import React, { useContext } from "react";
import ContainerWrap from "../utils/ContainerWrap";
import UserContext from "../../context/UserContext";
import CentroContext from "@/context/CentroContext";

const InfoCentro = ({ centro, setEdit, img }) => {
  const { grupo } = useContext(UserContext);
  const { informacionSistemas } = useContext(CentroContext);

  return (
    <ContainerWrap>
      {grupo === "sistemas" || grupo === "admin" ? (
        <div className="absolute top-3 right-3 flex items-center gap-x-2">
          <button onClick={(e) => setEdit(true)}>
            <img className="h-8" src="/assets/icons/edit-bg.png" alt="" />
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="bg-white p-3 rounded-xl overflow-hidden">
        <div className="h-64">
          <img
            className="h-full w-full rounded-xl"
            src={centro.imaxe || img}
            alt=""
          />
        </div>
        <div className="mt-8">
          <div>
            <div className="flex">
              <div className="w-24 font-medium">Centro</div>
              <div className="ml-5 whitespace-nowrap overflow-hidden text-ellipsis">
                {centro.centro}
              </div>
            </div>
            <div className="mt-4 flex">
              <div className="w-24 font-medium">ID</div>
              <div className="ml-5">{centro.sf}</div>
            </div>
            <div className="mt-4 flex">
              <div className="w-24 font-medium">Concello</div>
              <div className="ml-5 whitespace-nowrap overflow-hidden text-ellipsis">
                {centro.concello}
              </div>
            </div>
            <div className="mt-4 flex">
              <div className="w-24 font-medium">Proxecto</div>
              <div className="ml-5">{centro.proxecto}</div>
            </div>
            <div className="mt-4 flex">
              <div className="w-24 font-medium">TAP</div>
              <div className="ml-5">{centro.rede.tap}</div>
            </div>
            <div className="mt-4 flex">
              <div className="w-24 font-medium">TAR</div>
              <div className="ml-5">{centro.rede.tar}</div>
            </div>
            <div className="mt-8">
              <div className="w-24 font-medium whitespace-nowrap">
                Información adicional
              </div>
              <div className="mt-2">
                {centro.comentario !== "" ? (
                  <>
                    <textarea
                      className="outline-none p-2 resize-none w-full"
                      name="comentario"
                      id="comentario"
                      disabled
                      value={centro.comentario}
                    ></textarea>
                  </>
                ) : (
                  <div>
                    <span>Non hai información adicional</span>
                  </div>
                )}
              </div>
            </div>
            {grupo === "sistemas" || grupo === "admin" ? (
              <div className="mt-8">
                <div className="w-24 font-medium whitespace-nowrap">
                  Información sistemas
                </div>
                <div className="mt-2">
                  <div className="flex">
                    <div className="w-24 font-medium">Controladora</div>
                    <div className="ml-5">
                      {informacionSistemas?.controladora}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-24 font-medium">Contrasinais</div>
                    <div className="mt-2">
                      <div className="flex">
                        <div className="w-24 font-medium">Conmutadores</div>
                        <div className="ml-5">
                          {informacionSistemas?.contrasinal_conmutadores}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-24 font-medium">Siega</div>
                        <div className="ml-5">
                          {informacionSistemas?.contrasinal_siega}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </ContainerWrap>
  );
};

export default InfoCentro;
