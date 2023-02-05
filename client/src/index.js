import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import App from "./App";
import TabsInfoState from "./hooks/useTabsInfo";

ReactDOM.render(
  <React.StrictMode>
    <TabsInfoState>
      <App />
    </TabsInfoState>
  </React.StrictMode>,
  document.getElementById("root")
);
