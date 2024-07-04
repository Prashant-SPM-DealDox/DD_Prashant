import React, { useState, useEffect, useRef } from "react";
import "../assets/css/login/ResetPassword.css";
import ForgotPasswordImage from "../assets/Images/Forgotpassword.png";
import Dealdoxicon from "../assets/Images/Dealdoxicon.png";
import { baseUrl } from "../config";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import circleIIcon from "../assets/Images/circleIIcon.png";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { decryptEmail } from "../utils/common";

const ResetPassword = () => {
  
  const urlParams = new URLSearchParams(window.location.search);
 
  // Extract values using the get method
  const userEmail = urlParams.get("email");

  // Decrypt the email parameter using CryptoJS
   const UserEmail1 =  decryptEmail(userEmail);

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(UserEmail1);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const confirmPasswordRef = useRef(null);

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setIsPasswordMatch(newPassword === event.target.value);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleOutsideClick = (e) => {
    if (
      confirmPasswordRef.current &&
      !confirmPasswordRef.current.contains(e.target) &&
      !isPasswordMatch
    ) {
      setIsPasswordMatch(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isPasswordMatch]);

  const ResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/api/admin/restpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: newPassword,
        }),
      });

      const json = await response.json();
      if (response) {
        toast.success('Password Updated SUccessfully');
        localStorage.clear();
        localStorage.removeItem("user");
        navigate( "/");
        
      } else {
        navigate("/forgotpassword");
        toast.error('Unable to update password');
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  const resetForm = () => {
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="reset">
      <div className="flexreset">
        <div className="leftforgot">
          <img
            src={ForgotPasswordImage}
            alt="Forgot Password"
            id="ForgoticonlogFor"
          />
        </div>
        <div className="resetright">
          <div className="resetrightcontent">
            <img src={Dealdoxicon} alt="Dealdox Icon" id="DealDoxIcon" />
            <div className="hedreset">
              <h1 className="hedingreset">Reset your password</h1>
            </div>
            <div className="labeloldmsgbot">
              <label className="oldonemsg">
                Your new password should be different from the old one
              </label>
            </div>
            <div className="form-groupnew">
              <label htmlFor="newPassword" className="confirmpass">
                Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter your password"
                value={newPassword}
                onChange={(e) => handlePasswordChange(e)}
                required
              />
              <span onClick={toggleNewPasswordVisibility}>
                {showNewPassword ? (
                  <FaEyeSlash id="password_eyeicon" />
                ) : (
                  <FaEye id="password_eyeicon" />
                )}
              </span>
            </div>

            <div
              className={`form-groupconfirm ${
                !isPasswordMatch ? "errorreset" : ""
              }`}
              ref={confirmPasswordRef}
            >
              <label htmlFor="confirmPassword" className="confirmpass">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e)}
                required
                style={!isPasswordMatch ? { outlineColor: "red" } : {}}
              />
              <span onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? (
                  <FaEyeSlash id="password_eyeicon" />
                ) : (
                  <FaEye id="password_eyeicon" />
                )}
              </span>

              {!isPasswordMatch && (
                <div className="error-messagereset">
                  {/* <FontAwesomeIcon icon={faCircleInfo} /> */}
                  <div className="iIcon">
                    <img
                      src={circleIIcon}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </div>
                  <label className="pass">Password Does Not Match</label>
                </div>
              )}
            </div>
          </div>
          <div className="savecancel">
            <div className="resetsubmit">
              <button
                type="submit"
                className="continuereset"
                onClick={ResetPassword}
              >
                Save
              </button>
            </div>
            <div className="resetsubmit">
              <button
                type="button"
                className="canncelclick"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
