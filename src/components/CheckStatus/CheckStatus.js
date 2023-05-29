/* ----- CheckStatus.js ----- */
import React from "react";
import "./CheckStatus.scss";

// Assets
import CheckStatusSVG from "../../assets/images/svg/check-status.svg";

// Components
import Button from "../../ui-library/Button/Button";
import Navbar from "../Navbar/Navbar";

// Libraries & Packages

function CheckStatus() {
  // Choreo base endpoint
  const API_HOST =
    "https://f82fbb50-01e1-4078-a9f8-0d4ed79a518a-dev.e1-us-east-azure.choreoapis.dev/sbmq/grama-check/requestservice-369/1.0.0";

  // Asgardeo access token
  const TOKEN = JSON.parse(
    sessionStorage.getItem("session_data-instance_0")
  ).access_token;

  const statuscheck = () => {
    console.log("Check Status");
    const email = JSON.parse(localStorage.getItem("user")).email;
    //const requestId = sessionStorage.getItem("requestId");
    const url = API_HOST + "/request/" + email;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        console.log(data);
        const requestId = {
          requestId: data.request_id,
        };
        localStorage.setItem("requestId", JSON.stringify(requestId));
        // This will log the response data to the console.
        console.log(data.request_id);
        // Redirect to the appropriate page based on the request status
        if (data.status === "approved") {
          console.log(data.requestId);
          window.location.href = "/status-success";
        } else if (data.status === "pending") {
          window.location.href = "/status-pending";
        } else if (data.status === "rejected") {
          window.location.href = "/status-rejected?reason=" + data.reason;
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="checkStatus">
      <div className="checkStatus__container">
        <div className="getStrated__navbar">
          <Navbar />
        </div>
        <div className="checkStatus__content">
          <div className="checkStatus__content__image">
            <img src={CheckStatusSVG} alt="" />
          </div>
          <div className="checkStatus__content__title1">
            <p>Check your request status!</p>
          </div>
          <div className="checkStatus__content__title2">
            <p>
              You Have already created a request for the document. click the
              button below to review the status of the request.
            </p>
          </div>
          <div className="checkStatus__content__buttons">
            <Button onClick={statuscheck}>CHECK STATUS</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckStatus;
