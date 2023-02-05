import React from "react";

const SearchForm = ({ search, setSearch, handleSearch, isError }) => {
  const handleClearSearch = () => {
    setSearch("");
    document.getElementById("search-input").value = "";
  };

  return (
    <div className="relative w-fit">
      <form
        onSubmit={handleSearch}
        autoComplete="off"
        className="flex items-center"
      >
        <div>
          <input
            className="h-14 w-80 rounded-xl pl-3 outline-none"
            style={
              isError
                ? { border: "1px solid red" }
                : { border: "1px solid gray" }
            }
            id="search-input"
            type="search"
            placeholder="Buscar"
          />
        </div>
        <div className="h-full flex items-center absolute top-0 right-2">
          {search != "" && search != undefined ? (
            <button className="mr-2" onClick={handleClearSearch}>
              <img className="h-3" src="assets/icons/close-black.png" alt="" />
            </button>
          ) : (
            <img className="h-5" src="assets/icons/loupe-black.png" alt="" />
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
