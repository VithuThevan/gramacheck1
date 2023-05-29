/* ----- InputSelect.js ----- */
import React, { useState } from "react";
import "./InputSelect.scss";

// Utils
import { Colors } from "../../utils/styles/Theme";

// Icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function InputSelect({ title, placeholder, state, setState }) {
  // State
  const [display, setDisplay] = useState(false);

  // Functions
  const handleDisplay = () => {
    setDisplay((prev) => !prev);
  };
  const handleItemClick = (item) => {
    setDisplay((prev) => !prev);
    setState(item);
  };

  const options = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];

  return (
    <div className="inputSelect">
      <div className="inputSelect__title">
        <p>{title}</p>
      </div>
      <div className="inputSelect__main" onClick={() => handleDisplay()}>
        {state !== "" ? (
          <p style={{ color: Colors.grey_regular }}>{state}</p>
        ) : (
          <p>{placeholder}</p>
        )}
        <div className="inputSelect__main__icon">
          <ArrowDropDownIcon />
        </div>
      </div>
      <div
        className="inputSelect__items"
        style={display ? { display: "flex" } : { display: "none" }}
      >
        <div className="inputSelect__items__container">
          {options.map((item, key) => {
            return (
              <div
                className="inputSelect__item"
                key={key}
                onClick={() => handleItemClick(item)}
              >
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InputSelect;
