import React from "react";

const ContainerWrap = ({ title, img, span, height, children }) => {
  return (
    <div
      className="container-wrap rounded-xl bg-container-background w-full overflow-hidden shadow-lg relative"
      style={{ height: height }}
    >
      <div className="w-full h-full">
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
        <div className="overflow-auto remove-scrollbar">{children}</div>
      </div>
    </div>
  );
};

export default ContainerWrap;
