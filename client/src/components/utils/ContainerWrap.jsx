import React from "react";

const ContainerWrap = ({
  title,
  img,
  span,
  editBtn,
  addBtn,
  edit,
  setEdit,
  handleUpdateData,
  maxHeight,
  children,
}) => {
  const handleEditMode = () => {
    setEdit(!edit);
  };

  return (
    <div className="container-wrap rounded-xl bg-container-background w-full h-full overflow-hidden shadow-lg relative">
      <div className="w-full" style={{ height: "inherit" }}>
        {title ? (
          <div className="text-center pl-5 h-10 flex justify-center items-center gap-x-2">
            <div>
              <img className="h-6" src={img} alt="" />
            </div>
            <div className="tracking-wide font-medium text-lg">{title}</div>
            {span ? (
              <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center font-medium">
                {span}
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="absolute top-3 right-3 flex items-center gap-x-2">
          {edit ? (
            <>
              <div>
                <button onClick={handleEditMode}>
                  <img
                    className="h-6"
                    src="/assets/icons/close-black.png"
                    alt=""
                  />
                </button>
              </div>
              <div>
                <button onClick={handleUpdateData}>
                  <img className="h-6" src="/assets/icons/save.png" alt="" />
                </button>
              </div>
            </>
          ) : (
            <>
              {editBtn ? (
                <div>
                  <button onClick={handleEditMode}>
                    <img
                      className="h-6"
                      src="/assets/icons/edit-black.png"
                      alt=""
                    />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
        <div className="scroll-container overflow-hidden overflow-y-scroll remove-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ContainerWrap;
