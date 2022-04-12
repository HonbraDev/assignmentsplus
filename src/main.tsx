import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import theme from "./utils/theme";
import ThemeSwitcher from "./components/themeSwitcher";

import { CssBaseline } from "@mui/material";
import { EventType, PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./utils/authConfig";
import { MsalProvider } from "@azure/msal-react";

export const msalInstance = new PublicClientApplication(msalConfig);

const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event) => {
  if (
    event.eventType === EventType.LOGIN_SUCCESS &&
    "account" in event.payload!
  ) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account!);
  }
});

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <ThemeSwitcher theme={theme}>
        <CssBaseline />
        <App />
      </ThemeSwitcher>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
