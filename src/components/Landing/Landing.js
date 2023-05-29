/* ----- Landing.js ----- */
import React from "react";
import "./Landing.scss";

// Assets
import GramaCheckLogoV2 from "../../assets/images/logo/GramaSevakaLogo-02.png";
import LandingSVG from "../../assets/images/svg/landing.svg";

// Components
import Button from "../../ui-library/Button/Button";

// Libraries & Packages
import { useAuthContext } from "@asgardeo/auth-react";

function Landing() {
  const { signIn } = useAuthContext();

  return (
    <div className="landing">
      <div className="landing__logo">
        <div className="landing__logo__container">
          <img src={GramaCheckLogoV2} alt="" />
        </div>
      </div>
      <div className="landing__body">
        <div className="landing__body__container">
          <div className="landing__body__content">
            <div className="landing__body__text1">
              <p>GRAMA CHECK</p>
            </div>
            <div className="landing__body__text2">
              <p>Your Local Digital Certificate</p>
            </div>
            <div className="landing__body__buttons">
              <Button variant="primary" onClick={() => signIn()}>
                SIGNUP / LOGIN
              </Button>
            </div>
          </div>
          <div className="landing__body__image">
            <img src={LandingSVG} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
