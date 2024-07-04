import React from "react";
import { Link, json, useLocation, useNavigate } from "react-router-dom";
import '../assets/css/login/maintainance.css'


const Maintenance = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let handleMaintenance = () => {
    navigate("/home");
  }
  
    return (
        <div className="maintainance-container">
          <div className="maintainance-box">
          <h1 className="h1-content">Sorry! We are under <br /> maintenance currently!!</h1>
          <button onClick={handleMaintenance} className="try-again-button">Try Again</button>
          </div>
        </div>
      );
}

export default Maintenance;