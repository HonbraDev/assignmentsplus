import { Configuration } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: "9e0aaf4c-65a5-4182-81ff-a544f66f7d4e",
    redirectUri: "/",
    postLogoutRedirectUri: "/",
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ["User.Read", "Tasks.ReadWrite", "EduAssignments.ReadWrite"],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
