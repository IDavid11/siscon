import React, { useState, useEffect } from "react";
import DBSwitch from "../../../components/Admin/Switches/DBSwitch";
import BDSwitch from "../../../components/Admin/Switches/DBSwitch";
import AddSwitchForm from "../../../components/Modal/Forms/AddSwitchForm/AddSwitchForm";
import Modal from "../../../components/Modal/Modal";
import RadioAddButton from "../../../components/RadioAddButton/RadioAddButton";
import SearchForm from "../../../components/SearchForm/SearchForm";
import { obterSwitches } from "../../../services/switches";

const Switches = () => {
  const [switches, setSwitches] = useState([]);
  const [showAddSwitchModal, setShowAddSwitchModal] = useState(false);

  const getSwitches = async () => {
    const switches = await obterSwitches();
    setSwitches(switches);
  };

  const handleOpenModal = () => {
    setShowAddSwitchModal(true);
  };

  const handleCloseModal = () => {
    setShowAddSwitchModal(false);
  };

  useEffect(() => {
    getSwitches();
  }, []);

  return (
    <div className="mt-8 w-fit">
      <div className="flex justify-end">
        <button
          className="flex itesm-center justify-center py-4 px-10 rounded-xl mb-4 bg-primary-color text-white"
          onClick={handleOpenModal}
        >
          <div className="flex items-center justify-center">
            <img className="h-4" src="assets/icons/add-white.png" alt="" />
            <span className="ml-2 pb-0.5">Engadir switch</span>
          </div>
        </button>
      </div>
      <table className="rounded-xl overflow-hidden">
        <tbody className="tbody-screen remove-scrollbar bg-white rounded-b-xl overflow-hidden">
          <tr className="h-10 bg-gray-200">
            <th className="text-left px-20">Switch</th>
            <th className="text-left px-20">Portos</th>
            <th className="text-left px-20">Accións</th>
          </tr>
          {switches &&
            switches.map((e_switch) => {
              return <DBSwitch nome={e_switch.nome} portos={e_switch.portos} />;
            })}
        </tbody>
      </table>

      {showAddSwitchModal ? (
        <Modal handleCloseModal={handleCloseModal}>
          <AddSwitchForm />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Switches;
