import React, { useState } from "react";
import SearchForm from "../../../components/utils/SearchForm";
import { useFileSearch } from "../../../hooks/useFileSearch";
import Resultados from "./Resultados";
import ResultadosCargando from "./ResultadosCargando";

const Hardware = () => {
  const [search, setSearch] = useState("");
  const { data, findData, isLoading, isError } = useFileSearch({
    search,
    listado: "hardware",
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
            <tr className="h-10 bg-gray-200 min-w-full">
              <th className="text-left px-2">Garantía</th>
              <th className="text-left px-2">Marca e modelo</th>
              <th className="text-left px-2">Expediente</th>
              <th className="text-left px-2">S/N</th>
              <th className="text-left px-2">Técnico</th>
              <th className="text-left px-2">Grupo</th>
              <th className="text-left px-2">Equipamento</th>
              <th className="text-left px-2">S.O</th>
            </tr>
            {isLoading && findData.length < 1 && data.length < 1 ? (
              <ResultadosCargando />
            ) : (
              <></>
            )}

            {!isError ? (
              <>
                {findData.length > 0 && findData.length < 25 ? (
                  <Resultados data={findData} />
                ) : (
                  <Resultados data={data} />
                )}
              </>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Hardware;
