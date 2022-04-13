import { Button } from "@mui/material";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "@config/authConfig";
import Dashboard from "./components/dashboard";
import { useEffect } from "react";

function App() {
  const { instance } = useMsal();
  return (
    <>
      <AuthenticatedTemplate>
        <Dashboard />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Button onClick={() => instance.loginPopup(loginRequest)}>
          sign in sussy boy
        </Button>
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
