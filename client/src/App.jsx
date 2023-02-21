import { useContext, useState, useEffect, useMemo } from "react";
import Centro from "./pages/Centro/Centro";
import TabPanelPersonal from "./layouts/TabPanelPersonal";
import Layout from "./layouts/Layout";
import { pages } from "./utils/pages";
import Auth from "./pages/Auth/Auth";
import UserContext from "./context/UserContext";
import TabsInfoContext from "./context/TabsInfoContext";
import ToastMessageContext from "./context/ToastMessageContext";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const { token, recuperarSesion } = useContext(UserContext);
  const { tabsInfo, selectedTab } = useContext(TabsInfoContext);
  const { error, tipo, message } = useContext(ToastMessageContext);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    const sessionGrupo = sessionStorage.getItem("grupo");
    if (sessionToken && sessionGrupo)
      recuperarSesion({ token: sessionToken, grupo: sessionGrupo });
    sessionStorage.setItem("tabsInfo", JSON.stringify(tabsInfo));
  }, [token, tabsInfo, selectedTab, error]);

  return (
    <div>
      {!token ? (
        <Auth />
      ) : (
        <>
          <Layout isLoading={isLoading}>
            {tabsInfo.map((key, index) => {
              return (
                <TabPanelPersonal key={index} index={index}>
                  {tabsInfo[selectedTab].page !== "" ? (
                    <>{pages[tabsInfo[selectedTab].page]}</>
                  ) : (
                    <Centro isLoading={isLoading} setIsLoading={setIsLoading} />
                  )}
                </TabPanelPersonal>
              );
            })}
            {error ? (
              <div className="toast-message-container">
                <div
                  className={`toast-message ${tipo == 1 ? "toast-error" : ""} ${
                    tipo == 2 ? "toast-warning" : ""
                  } ${tipo == 0 ? "toast-success" : ""}`}
                >
                  <div className="font-medium text-white">{message}</div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </Layout>
        </>
      )}
    </div>
  );
}

export default App;
