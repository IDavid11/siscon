import React from "react";

const NavItem = ({ a, span, isLoading, focusTag, handleActivePage }) => {
  return (
    <li className="h-8 w-24 flex items-center justify-center">
      <a
        className={`${focusTag === a ? "bg-gray-200 rounded-full p-2" : ""}${
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
