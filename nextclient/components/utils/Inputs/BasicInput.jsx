import React from "react";

const BasicInput = ({ label, id, name, value, handleInputChange }) => {
  return (
    <div className="my-2.5">
      <label className="text-xs pl-0.5 tracking-wide pt-1" htmlFor={name}>
        {label}
      </label>
      <input
        className="text-xs h-8 w-full bg-transparent border border-solid border-black-700 rounded-xl pl-2.5 outline-none mt-1"
        id={id}
        name={name}
        type="text"
        autoFocus={true}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default BasicInput;
