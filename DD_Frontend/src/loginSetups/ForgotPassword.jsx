import React, { useState } from "react";
import "../assets/css/login/ForgotPassword.css";
import Dealdoxicon from "../assets/Images/Dealdoxicon.png";
import ForgotPasswordImage from "../assets/Images/Forgotpassword.png";
import { baseUrl } from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaInfo } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [forgot, setForgot] = useState("");
  const [isToastActive, setIsToastActive] = useState(false);
  const forgotPasswordEmail = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (!forgot.includes("@")) {
      if (!isToastActive) {
        toast.error("Invalid Email Format !", {
          onClose: () => setIsToastActive(false),
          onOpen: () => setIsToastActive(true),
        });
      }
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/api/admin/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgot }),
      });

      const responseData = await response.json();
      if (response.ok && responseData.status) {
        toast.success('Mail Sent')
        navigate("/logaccount");
      } else {
        toast.error(responseData.message, {
          icon: (
            <span style={{ color: "red" }}>
              <FaTrash />
            </span>
          ),
          className: "custom-toast_delete",
        });
      navigate('/forgotPassword');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="containerdiv">
      <div className="forgot-password-container">
        <div className="leftforgot">
          <img
            src={ForgotPasswordImage}
            alt="Forgot Password"
            id="ForgoticonlogFor"
          />
        </div>
        <div className="EntireForgotright">
          <img src={Dealdoxicon} alt="Dealdox Icon" id="DealDoxIcon" />
          <div className="headheight">
            <h1 className="h5headingForgot">
              Unable to log in to your account?
            </h1>
          </div>
          <div className="ptags">
            <p className="ptag1">
              Usernames are in the form of an email address.
            </p>
            <p className="ptag1">Passwords are case-sensitives.</p>
          </div>
          <div className="deal">
            <p className="deal">
              Enter your DealDox username to change your password.
            </p>
          </div>
          <div className="butnsfoca">
            <label htmlFor="forgotpassspam" className="forgotpassspam">
              Username/Email
            </label>
            <input
              className="forgotpass"
              placeholder="Enter your Username/Email"
              value={forgot}
              onChange={(e) => setForgot(e.target.value)}
            />
          </div>
          <div className="continuebuttondiv">
            <button
              type="submit"
              className="continuebutton"
              onClick={forgotPasswordEmail}
            >
              Continue
            </button>
          </div>
          <div className="cancelforgot">
            <Link to="/">
              {" "}
              <button type="reset" className="cancelforgotButton">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
