import React from "react";
import LoginImage from "../../assets/Images/Dealdoxicon.png";
import "../../assets/css/setPassword/PasswordSuccess.css";
import { Link } from "react-router-dom";

const PasswordSucess = () => {
  const handleCancelClick = () => {
    // setInputValue("");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="sucess-container">
      <div className="image-conatinerr">
        <img src={LoginImage} alt="" width={"200px"} />
        <p>Automated Quote Generation</p>
      </div>
      <div>
        <span className="password-text">Password Status</span>
      </div>
      <div className="update-container">
        <span>The Password has been updated</span>
        <span>SUCCESSFULLY</span>
      </div>
      <div>
        <Link>
          {" "}
          <button className="button-content" onClick={handleCancelClick}>
            CLICK HERE TO LOGIN
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PasswordSucess;
