import React from "react";

const RadioInput = ({ label, name, id, value, handleRadioInputChange }) => {
  return (
    <div className="flex items-center">
      <button
        className="cursor-pointer"
        id={id}
        onClick={handleRadioInputChange}
      >
        <div className="flex items-center pointer-events-none">
          <div>
            <img
              className="h-6"
              src={
                value === name
                  ? "assets/icons/radio-button-checked.png"
                  : "assets/icons/radio-button.png"
              }
              alt=""
            />
          </div>
          <div>
            <label htmlFor={name}>{label}</label>
          </div>
        </div>
      </button>
    </div>
  );
};

export default RadioInput;
