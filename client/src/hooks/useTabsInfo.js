import React, { useEffect, useReducer } from "react";

import TabsInfoContext from "../context/TabsInfoContext";
import TabsInfoReducer from "../context/TabsInfoReducer";

import { initialTabsInfoState } from "../utils/initialTabsInfoState";

import {
  ACTUALIZAR_TABS_INFO,
  ACTUALIZAR_TAB_ID,
  BORRAR_PESTANA,
  NOVA_PESTANA,
  TAB_SELECCIONADA,
} from "../context/types";

export default function TabsInfoState({ isLoading, children }) {
  const sessionTabsInfo = sessionStorage.getItem("tabsInfo");
  const sessionTabsInfoJSON = JSON.parse(sessionTabsInfo);
  const initialState = {
    tabsInfo: sessionTabsInfoJSON ? sessionTabsInfoJSON : initialTabsInfoState,
    selectedTab: 0,
  };

  const [state, dispatch] = useReducer(TabsInfoReducer, initialState);

  const handleNewTabButton = (centro) => {
    console.log(centro);
    if (!isLoading && state.tabsInfo.length < 9) {
      const index = state.tabsInfo.length;
      centro.centro.network_checked = false;
      dispatch({
        type: NOVA_PESTANA,
        payload: {
          tabsInfo: [
            ...state.tabsInfo,
            {
              tabId: index,
              label: centro.centro.centro,
              page: "",
              type: "Centro",
              centro: centro.centro,
              monitorizacions: centro.monitorizacions,
              avisos: centro.avisos,
            },
          ],
          selectedTab: index,
        },
      });
      sessionStorage.setItem("value", index);
      sessionStorage.setItem("selectedTab", index);
    }
  };

  const handleSelectedTab = (e) => {
    if (!isLoading) {
      dispatch({ type: TAB_SELECCIONADA, payload: e.target.id });
      sessionStorage.setItem("value", e.target.id);
      sessionStorage.setItem("selectedTab", e.target.id);
    }
  };

  const handleRemoveTab = (e) => {
    if (!isLoading) {
      const newTabsInfo = state.tabsInfo;
      const indexTab = newTabsInfo[e.target.id].tabId;
      newTabsInfo.splice(indexTab, 1);

      if (
        state.selectedTab == indexTab &&
        state.selectedTab == newTabsInfo.length
      ) {
        dispatch({
          type: BORRAR_PESTANA,
          payload: {
            tabsInfo: newTabsInfo,
            selectedTab: state.selectedTab - 1,
          },
        });

        if (newTabsInfo.length == 4) {
          dispatch({ type: TAB_SELECCIONADA, payload: 0 });
        }
      }

      if (state.selectedTab > indexTab) {
        dispatch({
          type: BORRAR_PESTANA,
          payload: {
            tabsInfo: newTabsInfo,
            selectedTab: state.selectedTab - 1,
          },
        });
      }

      if (state.selectedTab < indexTab) {
        dispatch({
          type: BORRAR_PESTANA,
          payload: {
            tabsInfo: newTabsInfo,
            selectedTab: state.selectedTab,
          },
        });
      }

      for (var i = indexTab; i < state.tabsInfo.length; i++) {
        newTabsInfo[i].tabId -= 1;
        dispatch({ type: ACTUALIZAR_TAB_ID, payload: newTabsInfo });
      }
    }
  };

  const handleUpdateTabsInfo = (newTabsInfo) => {
    dispatch({ type: ACTUALIZAR_TABS_INFO, payload: newTabsInfo });
  };

  useEffect(() => {}, [state.tabsInfo, state.selectedTab]);

  return (
    <TabsInfoContext.Provider
      value={{
        tabsInfo: state.tabsInfo,
        selectedTab: state.selectedTab,
        handleNewTabButton,
        handleSelectedTab,
        handleRemoveTab,
        handleUpdateTabsInfo,
      }}
    >
      {children}
    </TabsInfoContext.Provider>
  );
}
