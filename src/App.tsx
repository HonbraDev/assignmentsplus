import { Button } from "@mui/material";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "./utils/authConfig";
import Dashboard from "./components/dashboard";

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
