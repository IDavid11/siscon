import React, { useState } from "react";
import SearchForm from "../../../components/utils/SearchForm";
import { useFileSearch } from "../../../hooks/useFileSearch";
import Resultados from "./Resultados";
import ResultadosCargando from "./ResultadosCargando";

const CentrosEducativos = () => {
  const [search, setSearch] = useState("");
  const { data, findData, isLoading, isError } = useFileSearch({
    search,
    listado: "centros-educativos",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(document.getElementById("search-input").value);
  };

  return (
    <>
      <SearchForm
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        isError={isError}
      />
      <div className="mt-8">
        <table className="rounded-xl overflow-hidden">
          <tbody className="tbody-screen remove-scrollbar bg-white rounded-b-xl overflow-hidden">
            <tr className="h-10 bg-gray-200">
              <th className="text-left px-2">ID</th>
              <th className="text-left px-2">Concello</th>
              <th className="text-left px-2">Centro</th>
              <th className="text-left px-2">LAN</th>
              <th className="text-left px-2">TAP</th>
            </tr>
            {isLoading && findData.length < 1 && data.length < 1 ? (
              <ResultadosCargando />
            ) : (
              <></>
            )}
            {findData.length > 0 ? (
              <Resultados data={findData} />
            ) : (
              <>{!isError ? <Resultados data={data} /> : <></>}</>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CentrosEducativos;
