import React, { useState, useEffect } from "react";
import "./NewLogin.css";
import NewLoginImage from "../assets/Images/NewLoginImage.png";
import NewDDImage from "../assets/Images/NewDDImagee.png";
import NewDealDoxIcon from "../assets/Images/NewDealDoxIcon.png";
import ErrorIcon from "../assets/Images/ErrorIcon.png";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const NewLogin = () => {
    const GetYear = new Date().getFullYear;
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      required: false,
    });
    const [formerrors, setFormErrors] = useState({
      isemail: false,
      ispassword: false,
      isrequired: false,
    });
    let [toastDisplayed, setToastDisplayed] = useState(false);
    const { email, password, required } = formData;
    const [validateEmail, setValidateEmail] = useState("Email is Required");
    const [passwordEye, setPasswordEye] = useState(false);
    const { isemail, ispassword, isrequired } = formerrors;
    useEffect(() => {
   
    }, [validateEmail]);
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
  
    };
  
    const validateemailForm = (e) => {
      if (e.target.value.trim() === "") {
        setFormErrors({
          ...formerrors,
          isemail: true,
        });
      } else {
        setFormErrors({
          ...formerrors,
          isemail: false,
        });
      }
    };
  
    const validatePassword = (e) => {
      if (e.target.value.trim() === "") {
        setFormErrors({
          ...formerrors,
          ispassword: true,
        });
      } else {
        setFormErrors({
          ...formerrors,
          ispassword: false,
        });
      }
    };
    const checkboxValidate = (e) => {
      if (e.target.value.trim() === "") {
        setFormErrors({
          ...formerrors,
          isrequired: true,
        });
      } else {
        setFormErrors({
          ...formerrors,
          isrequired: false,
        });
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
     
      let errors = {};
  
      if (!email.trim()) {
        setValidateEmail("Email is Required");
        errors = { ...errors, isemail: true };
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setValidateEmail("Email is not Valid");
        errors = { ...errors, isemail: true };
      }
      if (password.trim() === "") {
        errors = { ...errors, ispassword: true };
      }
  
      if (!required) {
        errors = { ...errors, isrequired: true };
      }
  
      setFormErrors(errors);
  
  
  
  
      if(Object.keys(errors).length===0){
      setFormData({
        email: "",
        password: "",
        required:false,
      })
    }
  
      
    };
   
    const handleEyeVisible = () => {
      setPasswordEye(!passwordEye);
    };
  
    return (
      <div className="LoginMainContainer">
        <div className="left-container">
          <div className="login-div1">
            <img src={NewDealDoxIcon} alt="" className="DImage" />
          </div>
          <form className="form-div" onSubmit={handleSubmit}>
            <div className="login-div2">
              <div className="login-email-container">
                <label className="email-label">Email</label>
                <div>
                  <input
                    type="text"
                    className={
                      isemail ? "error-Input-container" : "login-input-container"
                    }
                    name="email"
                    value={email}
                    onChange={(e) => {
                      handleChange(e);
                      validateemailForm(e);
                    }}
                     autoComplete="new-password"
                  />
                  {/* <FaUser /> */}
                </div>
                {isemail ? (
                  <p className="error-message">
                    <img src={ErrorIcon} alt="" className="error-icon" />
                    &nbsp;{validateEmail}
                  </p>
                ) : (
                  <p>&nbsp;</p>
                )}
              </div>
              <div className="login-password-container">
                <label className="password-label">Password</label>
                <div className="password-div">
                  <input
                    type={passwordEye ? "text" : "password"}
                    className={
                      ispassword
                        ? "error-Input-container"
                        : "password-input-container"
                    }
                    name="password"
                    value={password}
                    onChange={(e) => {
                      handleChange(e);
                      validatePassword(e);
                    }}
                    autoComplete="off"
                  />
                  {passwordEye ? (
                    <IoEyeOffOutline
                      className="eye-outline"
                      onClick={handleEyeVisible}
                    />
                  ) : (
                    <IoEyeOutline
                      className={
                        ispassword ? "error-password-eye" : "eye-outline"
                      }
                      onClick={handleEyeVisible}
                    />
                  )}
                </div>
                {ispassword ? (
                  <p className="error-message">
                    <img src={ErrorIcon} alt="" className="error-icon" />
                    &nbsp;Password is Required
                  </p>
                ) : (
                  <p>&nbsp;</p>
                )}
              </div>
              <div>
                <div className="login-checkbox-conteiner">
                  <label style={{ display: "flex" }}>
                    <input
                      type="checkbox"
                      className="login-inputBox"
                      checked={required}
                      // value={required}
                      name="required"
                      onChange={(e) => {
                        handleChange(e);
                        checkboxValidate(e);
                      }}
                    />
                    <span className="remember-me">&nbsp;Remember me</span>
                  </label>
                </div>
                {isrequired ? (
                  <p className="error-message">
                    <img src={ErrorIcon} alt="" className="error-icon" />
                    &nbsp;Please read & agree for the main services
                  </p>
                ) : (
                  <p>&nbsp;</p>
                )}
              </div>
              <div className="login-button-container">
                <button className="login-button">Login</button>
                <Link to="/forgotPassword">
                  <small className="login-forgot">Forgot Password?</small>
                </Link>
              </div>
            </div>
          </form>
          <div className="login-div3">
            <small className="dont-have-content">
              Don’t have an account?
              <Link to={"/register"} className="try-for-free">
                {" "}
                Try for free
              </Link>
            </small>
          </div>
  
          <span className="login-copyrights">
            © {GetYear} DealDox Pvt Ltd | All rights reserved |
            <Link
              to="https://www.dealdox.io/privacy-policy"
              className="support-mail"
            >
              Privacy
            </Link>{" "}
            <br />
            Need Help? Reach out to
            <a href="mailto:support@dealdox.io" className="support-mail">
              support@dealdox.io
            </a>
          </span>
        </div>
        <div className="right-container">
          <div className="register-text-content">
            <h1 className="generate-content">
              Generate Quotations 10x Faster with <br className="break" /> DealDox
              CPQ!
            </h1>
  
            <small className="small-content">
              Introducing DealDox, your ultimate destination for streamlining
              sales <br className="break" /> processes. Embrace our Lightning
              Platform, delivering unparalleled speed <br className="break" /> and
              comprehensive automation for your sales cycle. Say goodbye to{" "}
              <br className="break" /> lengthy negotiations and welcome a quicker,
              more efficient way to close <br className="break" /> deals.
            </small>
          </div>
          <img src={NewDDImage} alt="" className="NewDDImage" />
          <div className="login-image-container">
            <img src={NewLoginImage} alt="" className="NewLoginImage" />
          </div>
        </div>
      </div>
    );
}

export default NewLogin