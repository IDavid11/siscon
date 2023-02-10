import React from "react";
import { randomImg } from "../../utils/randomImg";

const InfoCentro = ({ centro }) => {
  const img = randomImg();

  return (
    <div className="bg-white p-5 rounded-xl max-w-sm overflow-hidden">
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
            <div className="ml-5">{centro.centro}</div>
          </div>
          <div className="mt-4 flex">
            <div className="w-24 font-medium">ID</div>
            <div className="ml-5">{centro.sf}</div>
          </div>
          <div className="mt-4 flex">
            <div className="w-24 font-medium">Concello</div>
            <div className="ml-5">{centro.concello}</div>
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
                    className="outline-none p-2 resize-none"
                    name="comentario"
                    id="comentario"
                    cols="43"
                    rows="5"
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
        </div>
      </div>
    </div>
  );
};

export default InfoCentro;
