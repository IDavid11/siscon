import React from "react";

const Modal = ({ title, handleCloseModal, backgroundColor, children }) => {
  return (
    <div className="modal w-screen h-screen fixed bg-modal-bg top-0 left-0 flex items-center justify-center">
      <div className="relative bg-white rounded-xl opacity-100">
        <div className="font-medium text-lg text-center mt-4 uppercase">
          {title}
        </div>
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
