import React from "react";
import Header from "../components/Header/Header";

const Layout = ({ isLoading, children }) => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-tab-background">
      <Header />
      <div className="layout-container p-6">{children}</div>
    </div>
  );
};

export default Layout;
