/* ----- Button.js ----- */
import React, { useEffect } from "react";
import "./Button.scss";

function Button({ variant, children, onClick }) {
  //Functions
  const setClassName = () => {
    // Primary
    if (variant === "primary") {
      return "uiLibrary__button__primary";
    }
    // Secondary
    else if (variant === "secondary") {
      return "uiLibrary__button__secondary";
    }
    // Default
    else {
      return "uiLibrary__button__primary";
    }
  };

  // useEffect
  useEffect(() => {
    const setClassName = () => {
      // Primary
      if (variant === "primary") {
        return "uiLibrary__button__primary";
      }
      // Secondary
      else if (variant === "secondary") {
        return "uiLibrary__button__secondary";
      }
      // Default
      else {
        return "uiLibrary__button__primary";
      }
    };
    setClassName();
    return () => setClassName();
  }, [variant]);

  return (
    <button
      className={setClassName()}
      onClick={onClick != null ? () => onClick() : null}
    >
      {children}
    </button>
  );
}

export default Button;
