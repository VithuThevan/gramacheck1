/* ----- StatusIcon.js ----- */
import React, { useEffect } from "react";
import "./StatusIcon.scss";

function StatusIcon({ variant }) {
  //Functions
  const setClassName = () => {
    // Primary
    if (variant === "pending") {
      return "uiLibrary__statusIcon__pending";
    }
    // Secondary
    else if (variant === "rejected") {
      return "uiLibrary__statusIcon__rejected";
    } else if (variant === "approved") {
      return "uiLibrary__statusIcon__approved";
    }
    // Default
    else {
      return "uiLibrary__statusIcon__pending";
    }
  };

  // useEffect
  useEffect(() => {
    //Functions
    const setClassName = () => {
      // Primary
      if (variant === "pending") {
        return "uiLibrary__statusIcon__pending";
      }
      // Secondary
      else if (variant === "rejected") {
        return "uiLibrary__statusIcon__rejected";
      } else if (variant === "approved") {
        return "uiLibrary__statusIcon__approved";
      }
      // Default
      else {
        return "uiLibrary__statusIcon__pending";
      }
    };
    setClassName();
    return () => setClassName();
  }, [variant]);

  return (
    <div className={setClassName()}>
      <p>{variant}</p>
    </div>
  );
}

export default StatusIcon;
