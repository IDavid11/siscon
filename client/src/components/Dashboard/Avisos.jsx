import React from "react";
import ContainerWrap from "../utils/ContainerWrap";

const Avisos = ({ avisos }) => {
  return (
    <ContainerWrap
      title={"Avisos"}
      img={"/assets/icons/danger.png"}
      maxHeight={260}
    >
      <div className="max-h-[260px]">
        <table className="rounded-xl overflow-hidden text-xs mb-4 w-full table-fixed">
          <tbody>
            {avisos &&
              avisos.map((aviso) => {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, "0");
                var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                today = dd + "/" + mm;

                var data = aviso.data.$date.split("T")[0].split("-");
                data = data[2] + "/" + data[1];
                var hora = aviso.data.$date.split("T")[1].split(":");
                hora = hora[0] + ":" + hora[1];
                return (
                  <tr key={aviso._id} className="h-10 mt-8">
                    <td className="py-2.5 px-2 w-2">
                      <span className="p-px bg-red-400 rounded-full"></span>
                    </td>
                    <td className="py-2.5 px-2 w-28">
                      {data == today ? hora : data}
                    </td>
                    <td className="py-2.5 px-2 w-64 text-ellipsis whitespace-nowrap overflow-hidden">
                      {aviso.centro}
                    </td>
                    <td className="py-2.5 px-2">
                      <span className="bg-red-400 rounded-full py-1 px-3">
                        {aviso.electronica.tipo}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </ContainerWrap>
  );
};

export default Avisos;
