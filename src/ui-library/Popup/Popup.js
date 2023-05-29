/* ----- Popup.js ----- */
import React from "react";
import "./Popup.scss";

// Icons
import CloseIcon from "@mui/icons-material/Close";

function Popup({ setDisplayPopup, children }) {
  return (
    <div className="popup">
      <div className="popup__container">
        <div className="popup__card">
          <div className="popup__card__close">
            <CloseIcon
              onClick={() => {
                setDisplayPopup(false);
              }}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Popup;
