import RegisterCorrect from "../../assets/confirm.png";
import RegisterWrong from "../../assets/cancel.png";

import React from "react";

const RegisterPopup = ({ message, isRegistered }) => {
  return (
    <div className="popup__register-container">
      <img
        className="popup__register-image"
        src={isRegistered ? RegisterCorrect : RegisterWrong}
      />
      <p className="popup__register-caption">{message}</p>
    </div>
  );
};

export default RegisterPopup;
