import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import App from "./App";
import TabsInfoState from "./hooks/useTabsInfo";
import ToastMessageState from "./hooks/useToastMessage";
import UserState from "./hooks/useUser";

ReactDOM.render(
  <React.StrictMode>
    <UserState>
      <TabsInfoState>
        <ToastMessageState>
          <App />
        </ToastMessageState>
      </TabsInfoState>
    </UserState>
  </React.StrictMode>,
  document.getElementById("root")
);
