import React from "react";

const Nav = ({ children }) => {
  return (
    <div>
      <nav>
        <ul className="flex items-center font-medium">{children}</ul>
      </nav>
    </div>
  );
};

export default Nav;
