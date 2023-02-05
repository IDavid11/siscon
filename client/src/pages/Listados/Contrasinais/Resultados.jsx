import React from "react";

const Resultados = ({ data }) => {
  return (
    <>
      {data.map((key, index) => {
        return (
          <tr key={index}>
            <td className="py-1.5 px-2">{data[index].nome}</td>
            <td className="py-1.5 px-2">{data[index].centro}</td>
            <td className="py-1.5 px-2">{data[index].contrasinal}</td>
            <td className="py-1.5 px-2">{data[index].descricion}</td>
          </tr>
        );
      })}
    </>
  );
};

export default Resultados;
