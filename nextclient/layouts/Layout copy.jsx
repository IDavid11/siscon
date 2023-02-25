import React, { useEffect, useState } from "react";
import Aside from "../components/Aside/Aside";
import ResponsiveAside from "../components/Aside/ResponsiveAside";

const Layout = ({ isLoading, children }) => {
  function getWindowSize() {
    const { innerWidth } = window;
    return innerWidth;
  }

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    console.log(windowSize);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <div className="w-screen h-screen overflow-hidden flex">
      {windowSize < 1700 ? (
        <ResponsiveAside isLoading={isLoading} />
      ) : (
        <Aside isLoading={isLoading} />
      )}
      <div className="w-full h-full flex">{children}</div>
    </div>
  );
};

export default Layout;
