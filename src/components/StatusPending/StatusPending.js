/* ----- StatusPending.js ----- */
import React from "react";
import "./StatusPending.scss";

// Assets
import StatusPendingSVG from "../../assets/images/svg/pending.svg";

// Components
import Button from "../../ui-library/Button/Button";
import Navbar from "../Navbar/Navbar";

// Libraries & Packages
import { Link } from "react-router-dom";

function StatusPending() {
  return (
    <div className="statusPending">
      <div className="statusPending__container">
        <div className="getStrated__navbar">
          <Navbar />
        </div>
        <div className="statusPending__content">
          <div className="statusPending__content__image">
            <img src={StatusPendingSVG} alt="" />
          </div>
          <div className="statusPending__content__title1">
            <p>STATUS : PENDING!</p>
          </div>
          <div className="statusPending__content__title2">
            <p>
              Your Request is yet to be reviewed by the grama nilaradi. await
              Response.
            </p>
          </div>
          <div className="statusPending__content__buttons">
            <Link to="/check-status">
              <Button>GO BACK</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusPending;
