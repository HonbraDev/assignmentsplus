import { loginRequest } from "@config/authConfig";
import {
  AuthenticationProvider,
  Client,
} from "@microsoft/microsoft-graph-client";
import { msalInstance } from "../main";

class CustomProvider implements AuthenticationProvider {
  public async getAccessToken(): Promise<string> {
    const account = msalInstance.getActiveAccount();
    if (!account)
      throw Error(
        "No active account! Verify a user has been signed in and setActiveAccount has been called."
      );

    const response = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: account,
    });

    return response.accessToken;
  }
}

const client = Client.initWithMiddleware({
  authProvider: new CustomProvider(),
});

export default client;
