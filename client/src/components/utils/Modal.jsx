import React from "react";

const Modal = ({ handleCloseModal, backgroundColor, children }) => {
  return (
    <div className="w-screen h-screen fixed bg-modal-bg top-0 left-0 flex items-center justify-center">
      <div className="relative bg-white w-96 h-96 rounded-xl opacity-100">
        <div className="p-10">{children}</div>
        <div className="m-4 absolute z-50 top-0 right-0 w-3 h-3">
          <button className="z-50" onClick={handleCloseModal}>
            <img
              className="h-full w-full"
              src="/assets/icons/close-black.png"
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
