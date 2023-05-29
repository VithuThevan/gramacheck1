/* ----- StatusSuccess.js ----- */
import React, { useState, useEffect } from "react";
import "./StatusSuccess.scss";

// Assets
import StatusSuccessSVG from "../../assets/images/svg/success.svg";

// Components
import Button from "../../ui-library/Button/Button";
import Navbar from "../Navbar/Navbar";

// Libraries & Packages
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "./Utils/PDF/PDF";

function StatusSuccess() {
  // State
  const [citizen, setcitizen] = useState();

  const API_HOST =
    "https://f82fbb50-01e1-4078-a9f8-0d4ed79a518a-dev.e1-us-east-azure.choreoapis.dev/sbmq/grama-check/requestservice-369/1.0.0";

  // Asgardeo access token
  const TOKEN = JSON.parse(
    sessionStorage.getItem("session_data-instance_0")
  ).access_token;

  // Use Effects
  useEffect(() => {



    
  }, []);

  useEffect(() => {
    getCitizenDetails();
  }, []);

  useEffect(() => {
    console.log(citizen);
  }, []);

  const getCitizenDetails = () => {
    const requestId = JSON.parse(localStorage.getItem("requestId")).requestId;

    var url = API_HOST + "/allRequests";

    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          response
            .text()
            .then((result) => {
              var results = JSON.parse(result);
              var result = results.filter(
                (result) => result.request_id == requestId
              );
              console.log(result[0]);
              setcitizen(result[0]);
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };

  const updateStatus = () => {
    console.log("Update Status");
    const email = JSON.parse(localStorage.getItem("user")).email;
    const requestId = JSON.parse(localStorage.getItem("requestId")).requestId;
    const url = API_HOST + "/request/" + requestId;
    const requestStatus = {
      requestId: requestId,
      status: "completed",
    };
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
    <div className="statusSuccess">
      <div className="statusSuccess__container">
        <div className="getStrated__navbar">
          <Navbar />
        </div>
        <div className="statusSuccess__content">
          <div className="statusSuccess__content__image">
            <img src={StatusSuccessSVG} alt="" />
          </div>
          <div className="statusSuccess__content__title1">
            <p>STATUS : Success!</p>
          </div>
          <div className="statusSuccess__content__title2">
            <p>
              Your request for the document has been Approved by The grama
              niladari. You can download the document.
            </p>
          </div>
          <div className="statusSuccess__content__buttons">
            <div className="statusSuccess__content__button__goback">
              <Link to="/check-status">
                <Button variant="secondary">GO BACK</Button>
              </Link>
            </div>
            <div className="statusSuccess__content__button__create">
              <Button variant="secondary" onClick={updateStatus}>
                CREATE NEW REQUEST
              </Button>
            </div>
            <div className="statusSuccess__content__button__download">
              {citizen && (
                <PDFDownloadLink
                  document={<PDF citizen={citizen} />}
                  fileName="document.pdf"
                >
                  {({ loading }) =>
                    loading ? (
                      <Button variant="primary">LOADING...</Button>
                    ) : (
                      <Button variant="primary">DOWNLOAD</Button>
                    )
                  }
                </PDFDownloadLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusSuccess;
