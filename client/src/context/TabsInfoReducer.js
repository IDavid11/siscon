import {
  NOVA_PESTANA,
  TAB_SELECCIONADA,
  BORRAR_PESTANA,
  ACTUALIZAR_TAB_ID,
  ACTUALIZAR_TABS_INFO,
  ACTUALIZAR_CENTRO_ADMIN_INFO,
} from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case NOVA_PESTANA:
      return {
        ...state,
        tabsInfo: payload.tabsInfo,
        selectedTab: payload.selectedTab,
      };
    case TAB_SELECCIONADA:
      return {
        ...state,
        selectedTab: payload,
      };
    case BORRAR_PESTANA:
      return {
        ...state,
        tabsInfo: payload.tabsInfo,
        selectedTab: payload.selectedTab,
      };
    case ACTUALIZAR_TAB_ID:
      return {
        ...state,
        tabsInfo: payload,
      };
    case ACTUALIZAR_TABS_INFO:
      return {
        ...state,
        tabsInfo: payload,
      };
    default:
      return state;
  }
};
