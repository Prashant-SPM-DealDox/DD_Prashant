import React, { useState } from "react";
import "../../assets/css/setPassword/SetPassword.css";
import LoginImage from "../../assets/Images/Dealdoxicon.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdCheck } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { baseUrl, secretKey } from "../../config";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { decryptEmail } from "../../utils/common";

const SetPassword = () => {

  const urlParams = new URLSearchParams(window.location.search);

  const userEmail = urlParams.get("emailContent");
  const admin_id = urlParams.get("admin_id");

   // Decrypt the email parameter using CryptoJS
   const email =  decryptEmail(userEmail);


  const navigate = useNavigate();

  const [passwordWord, setPasswordWord] = useState(true);
  const [cnfPassword, setCnfPassword] = useState("");
  const [newPassError, setNewPassError] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [retypePassError, setRetypePassError] = useState(false);
  const [labelForRetypePassword, setLabelForRetypePassword] = useState(
    "RETYPE NEW PASSWORD"
  );
  const [labelPassword, setLabelPassword] = useState("PASSWORD");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [defaultDots, setDefaultDots] = useState(false);
  const [validateCondition,setValidateCondition] = useState({
  numberValidate:"true",
  uppercaseValidate:"true",
  lowercaseValidate:"true",
  splCharacterValidate:"true",
  lengthValidate:"true",
  emailValidate:"true",
})

const {
  numberValidate,
  uppercaseValidate,
  lowercaseValidate,
  splCharacterValidate,
  lengthValidate,
  emailValidate

}=validateCondition;

  const handleChangeInput = (value) => {
    setNewPassword(value);
    if (value.trim() === "") {
      setLabelPassword("PASSWORD DOESN'T MEET THE CRITERIA ABOVE");
      setNewPassError(true);
    } else {
      setLabelPassword("PASSWORD");
      setNewPassError(false);
    }
    setDefaultDots(true);

    const number = new RegExp("(?=.*[0-9])");
    const upperCase = new RegExp("(?=.*[A-Z])");
    const lowerCase = new RegExp("(?=.*[a-z])");
    const splCharacter = new RegExp("(?=.*[@/$/%/&/*/!])");
    const length = new RegExp("(?=.{12,100})");


    let validates = {};

    if (!number.test(value)) {
      validates = { ...validates, numberValidate: false };
    } else {
      validates = { ...validates, numberValidate: true };
    }
    if (!upperCase.test(value)) {
      validates = { ...validates, uppercaseValidate: false };
    } else {
      validates = { ...validates, uppercaseValidate: true };
    }
    if (!lowerCase.test(value)) {
      validates = { ...validates, lowercaseValidate: false };
    } else {
      validates = { ...validates, lowercaseValidate: true };
    }
    if (!splCharacter.test(value)) {
      validates = { ...validates, splCharacterValidate: false };
    } else {
      validates = { ...validates, splCharacterValidate: true };
    }
    if (!length.test(value)) {
      validates = { ...validates, lengthValidate: false };
    } else {
      validates = { ...validates, lengthValidate: true };
    }

    setValidateCondition(validates);
      const passwordInput = value.toLowerCase();
    setPasswordWord(passwordInput === "password" ? false : true);
  };

  const handleRetyprPassword = (e) => {
    const value = e.target.value;

    setCnfPassword(value);
    if (value.trim() === "") {
      setLabelForRetypePassword("Password is Required");
      setRetypePassError(true);
    } else if (newPassword !== value) {
      setLabelForRetypePassword("PASSWORD AND CONFIRM PASSWORD SHOULD MATCH");
      setRetypePassError(true);
    } else {
      setLabelForRetypePassword("RETYPE PASSWORD");
      setRetypePassError(false);
    }
  };

  const savePeopleLoginData = async (e) => {
    e.preventDefault();

    //condition to verify password criteria and check the length of the password entered
    if(newPassword !== cnfPassword){
      toast.error('Both Entered Passwords Did Not Match, Plz Re Enter The Password!')
    }else if((newPassword.length < 12) && (cnfPassword.length < 12)){
      toast.error('Password criteria Did Not Match, Plz Re Enter The Password!')
    }else{
    try {
      const response = await fetch(`${baseUrl}/api/setuppass/updatePassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: newPassword,
          admin_id: admin_id,
        }),
      });

      if (response.ok) {
        toast.success("Password updated succesfully")
       navigate("/passwordsuccess");
      } else {
        toast.error("Unable to update the password");
      }
    } catch (error) {
      console.log(error);
    }
  }
  };

  return (
    <div className="new-login-container">
      <div className="main-content">
        <div className="main-container">
          <div className="image-conatiner">
            <img src={LoginImage} alt="" width={"200px"} />
            <p>Automated Quote Generation</p>
          </div>
          <div className="setpass-heading">
            <h1 className="acess-heading">Set Password</h1>
          </div>
          <div className="validate-container">
            <div className="validate-fields">
              <span className={numberValidate ? "validates" : "notValidates"}>
                {defaultDots ? (
                  numberValidate ? (
                    <MdCheck style={{ color: "#0f6b93" }} size={16} />
                  ) : (
                    <RxCross2 size={16} />
                  )
                ) : (
                  <GoDotFill size={14} />
                )}
                Has one or more numbers
              </span>
              <span
                className={uppercaseValidate ? "validates" : "notValidates"}
              >
                {defaultDots ? (
                  uppercaseValidate ? (
                    <MdCheck style={{ color: "#0f6b93" }} size={16} />
                  ) : (
                    <RxCross2 size={16} />
                  )
                ) : (
                  <GoDotFill size={14} />
                )}
                Has one or more uppercase letters
              </span>
              <span
                className={lowercaseValidate ? "validates" : "notValidates"}
              >
                {defaultDots ? (
                  lowercaseValidate ? (
                    <MdCheck style={{ color: "#0f6b93" }} size={16} />
                  ) : (
                    <RxCross2 size={16} />
                  )
                ) : (
                  <GoDotFill size={14} />
                )}
                Has one or more lowercase letters
              </span>
              <span
                className={splCharacterValidate ? "validates" : "notValidates"}
              >
                {defaultDots ? (
                  splCharacterValidate ? (
                    <MdCheck style={{ color: "#0f6b93" }} size={16} />
                  ) : (
                    <RxCross2 size={16} />
                  )
                ) : (
                  <GoDotFill size={14} />
                )}
                Has one or more special characters
              </span>
              <span className={passwordWord ? "validates" : "notValidates"}>
                {defaultDots ? (
                  passwordWord ? (
                    <MdCheck style={{ color: "#0f6b93" }} size={16} />
                  ) : (
                    <RxCross2 size={16} />
                  )
                ) : (
                  <GoDotFill size={14} />
                )}
                Cannot contain the word "password"
              </span>
              <span className={lengthValidate ? "validates" : "notValidates"}>
                {defaultDots ? (
                  lengthValidate ? (
                    <MdCheck style={{ color: "#0f6b93" }} size={16} />
                  ) : (
                    <RxCross2 size={16} />
                  )
                ) : (
                  <GoDotFill size={14} />
                )}
                Between 12 and 100 characters
              </span>
            </div>
          </div>
          <div className="inputs-container">
            <div className="input-div">
              <div className="acess-inputField-div1">
                <input
                  type={showPassword ? "text" : "password"}
                  className="acess-password-input"
                  onChange={(e) => handleChangeInput(e.target.value)}
                  autoComplete="off"
                  placeholder="Enter New Password"
                  value={newPassword}
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(false)}
                    className="eye1"
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowPassword(true)}
                    className="eye1"
                  />
                )}
              </div>
              <label
                className={
                  newPassError ? "password-redLabels" : "password-labels"
                }
              >
                {labelPassword}
              </label>
            </div>
            <div className="input-div">
              <div className="acess-inputField-div2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="acess-password-input"
                  autoComplete="off"
                  onChange={handleRetyprPassword}
                  value={cnfPassword}
                  placeholder="Confirm Password"
                />
                {showConfirmPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowConfirmPassword(false)}
                    className="eye2"
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowConfirmPassword(true)}
                    className="eye2"
                  />
                )}
              </div>
              <label
                className={
                  retypePassError ? "password-redLabels" : "password-labels"
                }
              >
                {labelForRetypePassword}
              </label>
            </div>
          </div>
          <div className="save-continer">
            <button className="save-button" onClick={savePeopleLoginData}>
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
