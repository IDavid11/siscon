import React, { useState, useContext } from "react";
import ModalHardware from "../../components/Modales/ModalHardware";
import SearchForm from "../../components/utils/SearchForm";
import { useFileSearch } from "../../hooks/useFileSearch";
import Resultados from "../../components/Hardware/Resultados";
import UserContext from "../../context/UserContext";

const Hardware = () => {
  const { grupo } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalHardware, setModalHardware] = useState();
  const { data, setData, findData, isLoading, isError } = useFileSearch({
    search,
    listado: "hardware",
  });

  const handleShowModal = (hardware) => {
    setShowModal(!showModal);
    setModalHardware(hardware);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(document.getElementById("search-input").value);
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
        {grupo === "sistemas" || grupo === "admin" ? (
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
        ) : (
          <></>
        )}
      </div>
      <div className="listado mt-8">
        {!isError ? (
          <>
            {findData.length > 0 && findData.length < 25 ? (
              <Resultados
                data={findData}
                showAll={true}
                handleShowModal={handleShowModal}
                grupo={grupo}
              />
            ) : (
              <Resultados
                data={data}
                showAll={false}
                handleShowModal={handleShowModal}
                grupo={grupo}
              />
            )}
          </>
        ) : (
          <></>
        )}
      </div>
      {showModal ? (
        <ModalHardware
          hardware={modalHardware}
          handleCloseModal={handleShowModal}
          setData={setData}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Hardware;
