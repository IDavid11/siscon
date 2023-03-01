import React from "react";

const TableContainer = ({ children }) => {
  return <div className="overflow-auto remove-scrollbar">{children}</div>;
};

export default TableContainer;
