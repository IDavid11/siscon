import React from "react";

const Nav = ({ children }) => {
  return (
    <div>
      <nav className="p-2">
        <ul className="flex items-center gap-x-10 font-medium">{children}</ul>
      </nav>
    </div>
  );
};

export default Nav;
