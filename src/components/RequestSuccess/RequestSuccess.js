/* ----- RequestSuccess.js ----- */
import React from "react";
import "./RequestSuccess.scss";

// Assets
import RequestSuccessSVG from "../../assets/images/svg/request-success.svg";

// Components
import Button from "../../ui-library/Button/Button";
import Navbar from "../Navbar/Navbar";

function RequestSuccess() {
  const statusPage = () => {
    window.location.href = "/check-status";
  };
  return (
    <div className="requestSuccess">
      <div className="requestSuccess__container">
        <div className="getStrated__navbar">
          <Navbar />
        </div>
        <div className="requestSuccess__content">
          <div className="requestSuccess__content__image">
            <img src={RequestSuccessSVG} alt="" />
          </div>
          <div className="requestSuccess__content__title1">
            <p>REQUEST CREATED SUCCESSFULLY!</p>
          </div>
          <div className="requestSuccess__content__title2">
            <p>
              Your Request For the Document was Created Successfully. Please
              Wait Till the Authorized Grama Niladari Reviews and Grant the
              Requested Documents.
            </p>
          </div>
          <div className="requestSuccess__content__buttons">
              <Button onClick={statusPage}>GO BACK</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestSuccess;
