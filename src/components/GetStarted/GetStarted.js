/* ----- GetStarted.js ----- */
import "./GetStarted.scss";

// Assets
import GetStartedSVG from "../../assets/images/svg/get-started.svg";

// Components
import Navbar from "../Navbar/Navbar";
import Button from "../../ui-library/Button/Button";

function GetStarted() {
  // Choreo base endpoint
  const API_HOST =
    "https://f82fbb50-01e1-4078-a9f8-0d4ed79a518a-dev.e1-us-east-azure.choreoapis.dev/sbmq/grama-check/requestservice-369/1.0.0";

  // Asgardeo access token
  const TOKEN = JSON.parse(
    sessionStorage.getItem("session_data-instance_0")
  ).access_token;

  const getUserStatus = () => {
    var url =
      API_HOST + `/request/${JSON.parse(localStorage.getItem("user")).email}`;

    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      redirect: "follow",
    };

    fetch(url, requestOptions).then((response) => {
      if (response.ok) {
        window.location.href = "/check-status";
      } else {
        window.location.href = "/request-form";
      }
    });
  };

  return (
    <div className="getStarted">
      <div className="getStarted__container">
        <div className="getStrated__navbar">
          <Navbar />
        </div>
        <div className="getStarted__content">
          <div className="getStarted__content__image">
            <img src={GetStartedSVG} alt="" />
          </div>
          <div className="getStarted__content__title1">
            <p>Get Your Document!</p>
          </div>
          <div className="getStarted__content__title2">
            <p>
              Easy, Convinient & Efficient way to Get Your Official Documents.
            </p>
          </div>
          <div className="getStarted__content__buttons">
            <Button onClick={getUserStatus}>GET STARTED</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
