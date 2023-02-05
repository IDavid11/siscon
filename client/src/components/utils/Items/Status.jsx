import React from "react";

const Status = ({ status }) => {
  return (
    <>
      {status === "loading" ? (
        <div
          style={{ backgroundColor: "#c4c4c4" }}
          className="h-8 w-20 flex items-center justify-center rounded-full"
        >
          <span className="loader"></span>
        </div>
      ) : (
        <div
          className={`h-8 w-20 flex items-center justify-center rounded-full uppercase ${
            status == "up" ? "bg-green-400" : "bg-red-400"
          }`}
        >
          <span className="text-sm pt-px">{status}</span>
        </div>
      )}
    </>
  );
};

export default Status;
