import React, { useState } from "react";
import { useFileSearch } from "../../../hooks/useFileSearch";
import SearchForm from "../../../components/utils/SearchForm";
import Resultados from "./Resultados";
import ResultadosCargando from "./ResultadosCargando";

const Contrasinais = () => {
  const [search, setSearch] = useState("");
  const { data, findData, isLoading, isError } = useFileSearch({
    search,
    listado: "contrasinais",
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
            <tr className="h-10 bg-gray-200 w-full">
              <th className="text-left px-2">Nome</th>
              <th className="text-left px-2">Centro</th>
              <th className="text-left px-2">Contrasinal</th>
              <th className="text-left px-2">LAN</th>
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

export default Contrasinais;
