/* ----- InputText.js ----- */
import React from "react";
import "./InputText.scss";

function InputText({ title, placeholder, isDisabled, state, setState }) {
  // Functions
  const handleOnChange = (e) => {
    if (!isDisabled) {
      setState(e.target.value);
    }
  };

  return (
    <div className="inputText">
      <div className="inputText__title">
        <p>{title}</p>
      </div>
      <div className="inputText__input">
        <input
          type="text"
          value={state}
          placeholder={placeholder}
          disabled={isDisabled}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
    </div>
  );
}

export default InputText;
