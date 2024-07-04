import React from "react";
import { useState, useEffect, useContext } from "react";
import Dealdoxicon from "../assets/Images/Dealdoxicon.png";
import { Link, useNavigate } from "react-router-dom";
import DIcon from "../assets/Images/DIcon.png";
import "../assets/css/login/Login.css";
import { baseUrl } from "../config";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";
import LoginImage from "../assets/Images/loginPageImage.png";
import { IoWarning } from "react-icons/io5";
import ErrorIcon from "../assets/Images/ErrorIcon.png";
import DataContext from "../../src/dataContext/DataContext";

const Login = () => {

  const navigate = useNavigate();

  //useState to set the user
  const { setUser }  = useContext(DataContext);
  

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [toastDisplayed, setToastDisplayed] = useState(false);
  
  const [validate, setValidate] = useState({
    passworderror: false,
    emailerror: false,
  });

  const { passworderror, emailerror } = validate;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateemailForm = (e) => {
    if (e.target.value.trim() === "") {
      setValidate({
        ...validate,
        emailerror: true,
      });
    } else {
      setValidate({
        ...validate,
        emailerror: false,
      });
    }
  };
  const validatePassword = (e) => {
    if (e.target.value.trim() === "") {
      setValidate({
        ...validate,
        passworderror: true,
      });
    } else {
      setValidate({
        ...validate,
        passworderror: false,
      });
    }
  };

  const adminLogin = async () => {
    if (buttonClicked || toastDisplayed) {
        return;
    }
    
    setLoading(true); // Show loading state if needed

    try {
        const response = await fetch(`${baseUrl}/api/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userEmail: email,
                password: password,
            }),
        });

        const json = await response.json();
        setLoading(false);

        if (response.ok) {
            if (json.status === "Success") {
                toast.success("User Logged in Successfully!");
                setToastDisplayed(true);

                json.timestamp = new Date();
                localStorage.setItem("user", JSON.stringify(json));
                setUser(json); // Update the user state directly
                
                // Delay the redirection by 1 second (adjust as needed)
                setTimeout(() => {
                    window.location.href = "/home";
                }, 400);
                
            } else if (json.status === "Failed_otp") {
                setToastDisplayed(true);

                json.timestamp = new Date();
                localStorage.setItem("user", JSON.stringify(json));
                setUser(json); // Update the user state directly

                setTimeout(() => {
                  navigate("/OtpVerification");
                }, 1000);
            } else {
                toast.error(json.message);
                setToastDisplayed(true);
            }
        } else {
            console.error("Request failed:", json.message);
            setToastDisplayed(true);
            toast.error(json.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};


  return (

    <div className="entireloginPage">

      <div className="flex-containers">
        <div id="formDiv">
               <div className="logo">
            <img src={Dealdoxicon} alt="" id="DealDoxIcon" />
          </div>
          <form
            id="logform"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
               adminLogin();
           
            }}
            autoComplete="off"
          >

            <div id="emailLoginDiv">
              <label htmlFor="useremail" id="email">
                {" "}
                Email
              </label>
              <input
                type="email"
                id={emailerror ? "error-input-login" : "useremail"}
                value={email}
                name="useremail"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setToastDisplayed(false);
                  validateemailForm(e);
                }}
                placeholder="Enter Your Email"
                required
                autoComplete="new-password"
              />
              {emailerror ? (
                <small className="error-message-content">
                  {" "}
                  <img src={ErrorIcon} alt="" className="error-icons" />
                  &nbsp;Email is Required
                </small>
              ) : (
                <small className="error-message-content">&nbsp;</small>
              )}
            </div>
               <div id="passwordDiv">
              <label htmlFor="" id="passwords">
                Password
              </label>
              <div className="input-divs">
              <input
                type={showPassword ? "text" : "password"}
                id={passworderror ? "error-input-login" : "passwordlogin"}
               
                value={password}
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setToastDisplayed(false);
                  validatePassword(e);
                }}
                placeholder="Enter Your Password"
                required4
                autoComplete="new-password"
              />
              <div className="password_icon" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <span>
                    <FaEyeSlash id="password_eyeicon" />
                  </span>
                ) : (
                  <span>
                    <FaEye id="password_eyeicon" />
                  </span>
                )}
              </div>
              </div>
              {passworderror ? (
                <small className="error-message-content">
                  <img src={ErrorIcon} alt="" className="error-icons" />
                  &nbsp;Password is Required
                </small>
              ) : (
                <small className="error-message-content">&nbsp;</small>
              )}
            </div>

            <div id="rememberForgotDiv">
              <div id="rememberBox">
                <label className="rememberBox">
                  <input type="checkBox" /> &nbsp;
                  <span htmlFor="" id="remember">
                    Remember me
                  </span>
                </label>
              </div>
            </div>

            <div className="forgot">
              <label htmlFor="">
                <Link to="/forgotPassword" id="forgot">
                  Forgot your Password?
                </Link>
              </label>
            </div>

            <div>
              <button id="login" disabled={!email || !password || loading}  >
                Log In
                {loading && <i className="loading"></i>}
              </button>
            </div>
          </form>

          <div>
            <label id="signlabel">
              Haven't joined us as a customer yet?{" "}
              <a href="/register" id="reg">
                {" "}
                Sign Up
              </a>
            </label>
          </div>
        </div>
        <div className="loginCcontainer">
          <button id="cButton">c</button>
          <span id="InstructionPrivacy">
            {" "}
            &nbsp;2023 DealDox Pvt Ltd | All rights reserved |{" "}
            <Link to="https://www.dealdox.io/privacy-policy" id="privacyCode">
              Privacy
            </Link>
            <br />
            <div className="needHelpContainer">
              Need Help? Reach out to{" "}
              <a href="mailto:support@dealdox.io" className="supportContainer">
                support@dealdox.io
              </a>
            </div>
          </span>
        </div>
      </div>
          <div className="rightInfodiv">
        <div id="rigthInfo">
          <h1 id="righthead1">
            Generate Quotations 10x <br /> Faster with DealDox CPQ!
          </h1>
          <h2 id="rigthead2">Close deals faster now!</h2>
          <h4 id="rigthpara">
            Introducing DealDox, your ultimate destination for streamlining
            sales processes.
            <br />
            Embrace our Lightning Platform, delivering unparalleled speed and
            comprehensive <br />
            automation for your sales cycle.Say goodbye to lengthy negotiations
            and <br />
            welcome quicker,more efficient way to Close deals.
          </h4>

          {/* Request Demo Button */}
          <Link to="https://www.dealdox.io/demo">
            <button id="rigthbutton">Request Demo</button>
          </Link>
        </div>

        {/* All the Images Div */}
        <div id="DIconDiv">
          <img
            src={LoginImage}
            alt=""
            height={"350px"}
            width={"300px"}
            style={{ position: "relative", bottom: "90px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
