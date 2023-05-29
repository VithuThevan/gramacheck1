/* ----- StatusRejected.js ----- */
import React from "react";
import "./StatusRejected.scss";

// Assets
import StatusRejectedSVG from "../../assets/images/svg/rejected.svg";

// Components
import Button from "../../ui-library/Button/Button";
import Navbar from "../Navbar/Navbar";

// Libraries & Packages
import { Link } from "react-router-dom";

function StatusRejected() {
  // Get reason for rejection
  const queryParams = new URLSearchParams(window.location.search);
  const reason = queryParams.get('reason');

  const API_HOST =
    "https://f82fbb50-01e1-4078-a9f8-0d4ed79a518a-dev.e1-us-east-azure.choreoapis.dev/sbmq/grama-check/requestservice-369/1.0.0";

  // Asgardeo access token
  const TOKEN = JSON.parse(
    sessionStorage.getItem("session_data-instance_0")
  ).access_token;
  const updateStatus = () => {
    console.log("Update Status");
    const email = JSON.parse(localStorage.getItem("user")).email;
    const requestId = JSON.parse(localStorage.getItem("requestId")).requestId;
    const url = API_HOST + "/request/" + requestId;
    const requestStatus = {
      requestId: requestId,
      status: "completed"
    }
    var requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      body: JSON.stringify(requestStatus),
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("Request status updated successfully");
          window.location.href = "/request-form";
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="statusRejected">
      <div className="statusRejected__container">
        <div className="getStrated__navbar">
          <Navbar />
        </div>
        <div className="statusRejected__content">
          <div className="statusRejected__content__image">
            <img src={StatusRejectedSVG} alt="" />
          </div>
          <div className="statusRejected__content__title1">
            <p>STATUS : Rejected!</p>
          </div>
          <div className="statusRejected__content__title2">
            <p>
              Sorry! Your request for the document has been rejected by grama
              niladari.
              <br /><br />
              <b>Reason - {reason}</b>
            </p>
          </div>
          <div className="statusRejected__content__buttons">
            <Link to="/request-form">
              <Button onClick={updateStatus}>GO BACK</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusRejected;
