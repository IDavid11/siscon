import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import App from "./App";
import TabsInfoState from "./hooks/useTabsInfo";
import ToastMessageState from "./hooks/useToastMessage";

ReactDOM.render(
  <React.StrictMode>
    <TabsInfoState>
      <ToastMessageState>
        <App />
      </ToastMessageState>
    </TabsInfoState>
  </React.StrictMode>,
  document.getElementById("root")
);
