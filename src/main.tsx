import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
