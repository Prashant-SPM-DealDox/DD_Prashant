import React, {useState} from "react";
import "../assets/css/login/OtpVerification.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { baseUrl } from "../config";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {

  const navigate = useNavigate();

  const { user } = useAuthContext();
  const [emailVerify, setEmailVerifiy] = useState();
  const handleChange  = (event) => {
    setEmailVerifiy(event?.target?.value);
  }
  const verifyOTP = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/admin/verifyOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.admin?.email,
          otp: emailVerify,
        }),
      });
      const json = await response.json();
      if (response.ok) {
        navigate("/home");
        // localStorage.removeItem('user');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
      <div className="otpDiv">
        <span className="verificationclass">Verification</span>
        <div className="messageotp">
          <span>
            We will send you a{" "}
            <span style={{ fontWeight: "bold" }}>One Time Password</span>
            <br />
          </span>
          <span style={{ paddingLeft: "80px" }}> on your Email</span>
        </div>
        <input className="otpinput" placeholder="Enter OTP" type="text" value={emailVerify} onChange={handleChange}></input>
        <button className="verifiybutton" onClick={ verifyOTP}>Verifiy</button>
      </div>
      {emailVerify && (
        <div className="emaiverify">
          <span>Email Verfied</span>
          <span>your Email adress was successfully Verfied</span>
        </div>
      )}
    </>
  );
};

export default OtpVerification;
