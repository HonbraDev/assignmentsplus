import DashboardLoader from "@components/dashboardLoader";
import Login from "@components/login";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

function App() {
  return (
    <>
      <AuthenticatedTemplate>
        <DashboardLoader />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
