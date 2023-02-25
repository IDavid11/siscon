import React from "react";

const ResultadosCargando = () => {
  return (
    <>
      {Array.apply(0, Array(28)).map((x, i) => {
        return (
          <tr>
            <td className="py-1.5 px-2">
              <div className="h-6 bg-cell-loading rounded-full"></div>
            </td>
            <td className="py-1.5 px-2">
              <div className="h-6 bg-cell-loading rounded-full"></div>
            </td>
            <td className="py-1.5 px-2">
              <div className="h-6 bg-cell-loading rounded-full"></div>
            </td>
            <td className="py-1.5 px-2">
              <div className="h-6 bg-cell-loading rounded-full"></div>
            </td>
            <td className="py-1.5 px-2">
              <div className="h-6 bg-cell-loading rounded-full"></div>
            </td>
            <td className="py-1.5 px-2">
              <div className="h-6 bg-cell-loading rounded-full"></div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default ResultadosCargando;
