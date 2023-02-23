import React from "react";

const SelectDrop = ({
  selectedOption,
  handleVisibleSelectDrop,
  visibleSelectDrop,
  children,
}) => {
  return (
    <div className="bg-white w-fit h-96">
      <div className="flex items-center w-96">
        <div className="selected-group">{selectedOption}</div>
        <div className="group-drop-img">
          <button onClick={handleVisibleSelectDrop}>
            <img
              className="h-4"
              src="/assets/icons/downward-arrow-black.png"
              alt=""
            />
          </button>
        </div>
      </div>
      {visibleSelectDrop ? (
        <div className="group-drop">
          <div className="options">{children}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SelectDrop;
