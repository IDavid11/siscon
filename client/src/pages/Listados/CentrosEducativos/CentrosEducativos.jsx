import React, { useState } from "react";
import SearchForm from "../../../components/utils/SearchForm";
import { useFileSearch } from "../../../hooks/useFileSearch";
import Resultados from "./Resultados";
import ResultadosCargando from "./ResultadosCargando";
import ModalCentro from "../../../components/Modales/ModalCentro";

const CentrosEducativos = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalCentro, setModalCentro] = useState();
  const { data, setData, findData, isLoading, isError } = useFileSearch({
    search,
    listado: "centros-educativos",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(document.getElementById("search-input").value);
  };

  const handleShowModal = (centro) => {
    setShowModal(!showModal);
    setModalCentro(centro);
  };

  return (
    <div className="listado-container remove-scrollbar">
      <div className="flex items-center justify-between">
        <SearchForm
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          isError={isError}
        />
        <div>
          <button
            className="flex itesm-center justify-center py-4 px-10 rounded-xl float-right bg-primary-color text-white"
            onClick={(e) => handleShowModal(undefined)}
          >
            <div className="flex items-center justify-center">
              <img className="h-5" src="assets/icons/add-button.png" alt="" />
              <span className="ml-2 pb-px">Engadir hardware</span>
            </div>
          </button>
        </div>
      </div>
      <div className="listado mt-8">
        <table className="rounded-xl overflow-hidden w-full bg-white">
          <tbody className=" rounded-b-xl overflow-hidden">
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
              <Resultados data={findData} handleShowModal={handleShowModal} />
            ) : (
              <>
                {!isError ? (
                  <Resultados data={data} handleShowModal={handleShowModal} />
                ) : (
                  <></>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      {showModal ? (
        <ModalCentro
          centro={modalCentro}
          handleCloseModal={handleShowModal}
          setData={setData}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CentrosEducativos;
