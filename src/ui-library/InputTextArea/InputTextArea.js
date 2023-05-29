/* ----- InputText.js ----- */
import React from "react";
import "./InputTextArea.scss";

function InputTextArea({ height, placeholder, value, setValue }) {
  return (
    <div className="inputTextArea">
      <textarea
        placeholder={placeholder}
        rows={height}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
}

export default InputTextArea;
