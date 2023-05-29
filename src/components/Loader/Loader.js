/* ----- Loader.js ----- */
import React from "react";
import "./Loader.scss";

// Assets
import GramaCheckLogoV1 from "../../assets/images/logo/GramaSevakaLogo-01.png";

function Loader() {
  return (
    <div className="loader">
      <img src={GramaCheckLogoV1} alt="" />
    </div>
  );
}

export default Loader;
