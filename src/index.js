import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { AuthProvider } from "@asgardeo/auth-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const config = {
  signInRedirectURL: window.config.signin_redirect_url,
  signOutRedirectURL: window.config.signout_redirect_url,
  clientID: window.config.client_id,
  clientSecret: window.config.client_secret,
  baseUrl: window.config.base_url,
  scope: ["openid", "profile", "groups", "phone", "email"],
};

root.render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
