import { useContext, useState, useEffect, useMemo } from "react";
import { Search } from "./pages/Search";
import Centro from "./pages/Centro/Centro";
import TabPanelPersonal from "./layouts/TabPanelPersonal";
import PickCra from "./pages/PickCra";
import Layout from "./layouts/Layout";
import { pages } from "./utils/pages";
import Auth from "./pages/Auth/Auth";
import { UserContext } from "./hooks/useUser";
import TabsInfoContext from "./context/TabsInfoContext";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  const { tabsInfo, selectedTab } = useContext(TabsInfoContext);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) setUser(localToken);
    if (localToken === null) setUser(null);
    sessionStorage.setItem("tabsInfo", JSON.stringify(tabsInfo));
  }, [user, selectedTab, tabsInfo]);

  return (
    <UserContext.Provider value={providerUser}>
      {!user ? (
        <Auth />
      ) : (
        <>
          <Layout isLoading={isLoading}>
            {tabsInfo.map((key, index) => {
              return (
                <TabPanelPersonal key={index} index={index}>
                  {tabsInfo[selectedTab].page !== "" ? (
                    <>{pages[tabsInfo[selectedTab].page]}</>
                  ) : tabsInfo[selectedTab].centro.length < 2 &&
                    tabsInfo[selectedTab].centro[0].centro === "" ? (
                    <Search />
                  ) : (
                    <>
                      {tabsInfo[selectedTab].centro.length > 1 ? (
                        <div className="text-center mt-8">
                          <h2 className="uppercase text-3xl font-medium">
                            Escolle centro de traballo
                          </h2>
                          <div className="h-[680px] mt-8 grid grid-cols-4 gap-10 justify-center overflow-y-scroll remove-scrollbar p-6">
                            {tabsInfo[selectedTab].centro?.map((cra) => {
                              return <PickCra key={cra.id} cra={cra} />;
                            })}
                          </div>
                        </div>
                      ) : (
                        <>
                          <Centro
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                          />
                        </>
                      )}
                    </>
                  )}
                </TabPanelPersonal>
              );
            })}
          </Layout>
        </>
      )}
    </UserContext.Provider>
  );
}

export default App;
