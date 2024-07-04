import React from "react";
import "../assets/css/login/LoginAccount.css";
import Dealdoxicon from "../assets/Images/Dealdoxicon.png";
import ForgotPasswordImage from "../assets/Images/Forgotpassword.png";
import { Link } from "react-router-dom";

const LogAccount = () => {
  const handleOpenOutlook = () => {
    // Construct the mailto link to open Outlook
    const subject = encodeURIComponent("Check your spam folder");
    const email = "support@dealdox.io";
    const mailtoLink = `mailto:${email}?subject=${subject}`;

    // Open the mail client
    window.location.href = mailtoLink;
  };
  return (
    <div className="containerdivlogacc">
      <div className="EntireForgotleftlog">
        <div className="forgoticonleftlog">
          <img src={ForgotPasswordImage} alt="" id="Forgoticonlog" />
        </div>
        <div className="EntireForgotrightLogAccount">
          <img src={Dealdoxicon} alt="" id="DealDoxIcon" />
        <h5 className="h5heading">Check your email !</h5>
          <p className="stillloginlogp">
            We've sent you an email with a link to complete your password reset.
          </p>
          <p className="spamplogaccount">
            Can't find the email?{" "}
            <span className="spam" onClick={handleOpenOutlook}>
              Check your spam folder.
            </span>
          </p>
          <p className="stillloginlog">
            If you are still unable to login, please send an email to{" "}
            <Link to="mailto:support@dealdox.io" className="support">
              support@dealdox.io
            </Link>{" "}
            immediately.
          </p>
          <div className="contentcantreceimai">
            <span className="contentcantreceimai">
              If you haven't received the email, please click,
            </span>
          </div>
          <div className="buttonreturnlogin">
            {" "}
            <Link to="/">
              <button className="continuebuttonloginaccont">
                {" "}
                Return To Login
              </button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogAccount;
