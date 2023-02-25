import React from "react";

const DBSwitch = ({ nome, portos }) => {
  return (
    <tr>
      <td className="py-3 px-20">{nome}</td>
      <td className="py-3 px-20">{portos}</td>
      <td className="py-3 px-20 flex items-center cell-actions">
        <div className="mx-1 relative w-5 h-5">
          <button>
            <img
              className="h-full"
              src="/assets/icons/edit-user-black.png"
              alt=""
            />
          </button>
        </div>
        <div className="mx-1 relative w-5 h-5">
          <button>
            <img
              className="h-full"
              src="/assets/icons/remove-user-black.png"
              alt=""
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DBSwitch;
