import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { AuthProvider } from "@asgardeo/auth-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const config = {
  signInRedirectURL: process.env.REACT_APP_SIGNIN_REDIRECT_URL,
  signOutRedirectURL: process.env.REACT_APP_SIGNOUT_REDIRECT_URL,
  clientID: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  baseUrl: process.env.REACT_APP_BASE_URL,
  scope: ["openid", "profile", "groups", "phone", "email"],
};

root.render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
