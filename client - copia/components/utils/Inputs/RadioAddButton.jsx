import React from "react";

const RadioAddButton = ({ handleOpenModal }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        className="bg-primary-color rounded-full p-4"
        onClick={handleOpenModal}
      >
        <img className="h-5" src="assets/icons/add-white.png" alt="" />
      </button>
    </div>
  );
};

export default RadioAddButton;
