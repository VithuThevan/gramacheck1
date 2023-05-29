/* ----- RedirectPage.js ----- */
import React, { useState, useEffect } from "react";

// Libraries & Packages
import { useAuthContext } from "@asgardeo/auth-react";

import GetStartedPage from "../GetStartedPage/GetStartedPage";
import GramaSevakaDashboard from "../GramaSevakaDashboardPage/GramaSevakaDashboardPage";

function RedirectPage() {
  // State
  const [status, setStatus] = useState();

  // Choreo base endpoint
  const API_HOST =
    "https://f82fbb50-01e1-4078-a9f8-0d4ed79a518a-dev.e1-us-east-azure.choreoapis.dev/sbmq/grama-check/requestservice-369/1.0.0";

  // Asgardeo access token
  const TOKEN = JSON.parse(
    sessionStorage.getItem("session_data-instance_0")
  ).access_token;

  // Asgardeo Auth Context
  const { state, getBasicUserInfo } = useAuthContext();
  const [isGS, setIsGS] = useState();

  useEffect(() => {
    const getBasicUserDetails = () => {
      if (state.isAuthenticated) {
        getBasicUserInfo()
          .then((basicUserDetails) => {
            var user = {
              firstName: basicUserDetails.givenName,
              lastName: basicUserDetails.familyName,
              email: basicUserDetails.email,
              group: basicUserDetails.groups,
              requestStatus: status,
            };
            localStorage.setItem("user", JSON.stringify(user));

            if (user.group !== undefined) {
              if (user.group[0] === "GramaSevaka") {
                setIsGS(true);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("requestId");
      }
    };
    getBasicUserDetails();
  }, [getBasicUserInfo, state.isAuthenticated, status]);

  const getUserStatus = (email) => {
    var url = API_HOST + `/request/${email}`;

    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStatus(data.status);
      })
      .catch((error) => console.log(error));
  };

  return <>{isGS === true ? <GramaSevakaDashboard /> : <GetStartedPage />}</>;
}

export default RedirectPage;
