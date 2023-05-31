import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { AuthProvider } from "@asgardeo/auth-react";
import { BASE_URL, CLIENT_ID, CLIENT_SECRET, SIGNIN_REDIRECT_URL, SIGNOUT_REDIRECT_URL } from "./env";

const root = ReactDOM.createRoot(document.getElementById("root"));

const config = {
  signInRedirectURL: window.config.signin_redirect_url,
  signOutRedirectURL: window.config.signout_redirect_url,
  clientID: window.config.client_id,
  clientSecret: window.config.client_secret,
  baseUrl: window.config.base_url,
  scope: ["openid", "profile", "groups", "phone", "email"],
};

//config credentials


// const config = {
//   signInRedirectURL: SIGNIN_REDIRECT_URL,
//   signOutRedirectURL: SIGNOUT_REDIRECT_URL,
//   clientID: CLIENT_ID,
//   clientSecret: CLIENT_SECRET,
//   baseUrl: BASE_URL,
//   scope: ["openid", "profile", "groups", "phone", "email"],
// };

root.render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
