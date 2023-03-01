import React from "react";

const NavItem = ({ a, span, isLoading, focusTag, handleActivePage }) => {
  return (
    <li className="h-8 flex items-center justify-center">
      <a
        className={`p-2 ${focusTag === a ? "bg-gray-200 rounded-full" : ""}${
          isLoading ? "disabled" : ""
        }`}
        id={a}
        href={a}
        onClick={handleActivePage}
      >
        {span}
      </a>
    </li>
  );
};

export default NavItem;
