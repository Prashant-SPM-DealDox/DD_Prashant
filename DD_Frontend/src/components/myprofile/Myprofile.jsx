import React, { useState, useEffect } from "react";
import "../../assets/css/myprofile/Myprofile.css";
import "../../assets/css/people/People.css";
import "../../assets/css/access/Access.css";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import HeaderBar from "../../components/common/HeaderBar";
import InputTypes from "../../components/common/InputTypes";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import CustomDropdown from "../../components/common/CustomDropdown";
import { FaCircle } from "react-icons/fa";
import { CONSTANTS } from "../../constants";
import PeopleIconDropdown from "../../components/common/PeopleIconDropdown";
const Myprofile = () => {
  const { user } = useAuthContext();

  let logedPerson;

  logedPerson = user?.userType || user?.people?.userType;

  const optionsorgprofile = ["AFRICA", "ALL OTHER AP"];
  const [NewPassError, setNewPassError] = useState(false);
  const [CurrentPassError, setCurrentPassError] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [retypePassError, setretypePassError] = useState(false);
  const [labelforRetypePassword, setlabelforRetypePassword] = useState(
    "  RETYPE NEW PASSWORD"
  );
  const [numberVaidate, setNumberValidate] = useState(true);
  const [uppercasevalidate, setUpperCase] = useState(true);
  const [lowercasevalidate, setLowerCase] = useState(true);
  const [splCharacterValidate, setSplCharacter] = useState(true);
  const [lengthvalidate, setLength] = useState(true);
  const [passwordWord, setPasswordWord] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [EmailValidate, setEmailValidate] = useState(true);
  const [cnfPassword, setcnfPassword] = useState("");

  const handleChangeInput = (value) => {
    setNewPassword(value);
    setNewPassError(value.trim() === "" ? true : false);

    const number = new RegExp("(?=.*[0-9])");
    const UpperCase = new RegExp("(?=.*[A-Z])");
    const lowerCase = new RegExp("(?=.*[a-z])");
    const splCharacter = new RegExp("(?=.*[@/$/%/&/*/!])");
    const length = new RegExp("(?=.{12,100})");

    setNumberValidate(number.test(value) ? true : false);
    setUpperCase(UpperCase.test(value) ? true : false);
    setLowerCase(lowerCase.test(value) ? true : false);
    setSplCharacter(splCharacter.test(value) ? true : false);
    setLength(length.test(value) ? true : false);
    setEmailValidate(emailInput === value ? false : true);
    const passwordInput = value.toLowerCase();
    setPasswordWord(passwordInput === "password" ? false : true);
  };
  const handleChangeInputcurrent = (value) => {
    setCurrentPassword(value);
    setCurrentPassError(value.trim() === "" ? true : false);
    const number = new RegExp("(?=.*[0-9])");
    const UpperCase = new RegExp("(?=.*[A-Z])");
    const lowerCase = new RegExp("(?=.*[a-z])");
    const splCharacter = new RegExp("(?=.*[@/$/%/&/*/!])");
    const length = new RegExp("(?=.{12,100})");

    setNumberValidate(number.test(value) ? true : false);
    setUpperCase(UpperCase.test(value) ? true : false);
    setLowerCase(lowerCase.test(value) ? true : false);
    setSplCharacter(splCharacter.test(value) ? true : false);
    setLength(length.test(value) ? true : false);
    setEmailValidate(emailInput === value ? false : true);
    const passwordInput = value.toLowerCase();
    setPasswordWord(passwordInput === "password" ? false : true);
  };
  const optionsnotification = ["NONE", "BY EMAIL"];
  const [, setSelectedOption] = useState("");
  const handleOptionSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const [openLogin, setopenLogin] = useState(false);
  const handleEditButtonClick = () => {
    setopenLogin(!openLogin);
  };
  const handleRetyprPassword = (e) => {
    let value = e.target.value;

    setcnfPassword(e.target.value);
    if (value.trim() === "") {
      setlabelforRetypePassword("Password is Required");
      setretypePassError(true);
    } else if (newPassword !== value) {
      setlabelforRetypePassword(" Password and Confirm password should match");
      setretypePassError(true);
    } else {
      setlabelforRetypePassword(" RETYPE NEW PASSWORD");
      setretypePassError(false);
    }
  };
  // const [profileid, setProfileid] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    profileid: "",
    manager: "",
    phone: "",
    email: "",
    checkbox: "",
    securityRole: "",
    passwordExpdate: "",
    salesorg: "",
    timezone: "",
    language: "",
    notification: "",
  });
  useEffect(() => {
    if (user) {
      let email = "";
      if (logedPerson === "admin") {
        setUserData({
          firstName: user.admin?.firstname || "",
          lastName: user.admin?.lastname || "",
          profileid: user.admin?.profile_id || "",
          title: user.admin?.job_title || "",
          manager: user.admin?.manager || "",
          phone: user.admin?.phone_num || "",
          email: user.admin?.email || "",
          securityRole: user.admin?.securityRole || "",
          passwordExpdate: user.admin?.passwordExpdate || "",
          salesorg: user.admin?.salesorg || "",
          timezone: user.admin?.timezone || "",
          language: user.admin?.language || "",
          notification: user.admin?.notification || "",
        });
        email = user.admin?.email || "";
      } else {
        setUserData({
          firstName: user.people?.first_name || "",
          lastName: user.people?.last_name || "",
          profileid: user.people?.profile_id || "",
          title: user.people?.title || "",
          manager: user.people?.manager || "",
          phone: user.people?.phone || "",
          email: user.people?.email || "",
          securityRole: user.people?.securityRole || "",
          passwordExpdate: user.people?.passwordExpdate || "",
          salesorg: user.people?.salesorg || "",
          timezone: user.people?.timezone || "",
          language: user.people?.language || "",
          notification: user.people?.notification || "",
        });
        email = user.people?.email || "";
      }
      // Set the emailInput state
      setEmailInput(email);
    } else {
      // Set default values if user is not present
      setUserData({
        firstName: "",
        lastName: "",
        title: "",
        profileid: "",
        manager: "",
        phone: "",
        email: "",
        checkbox: "",
        securityRole: "",
        passwordExpdate: "",
        salesorg: "",
        timezone: "",
        language: "",
        notification: "",
      });

      // Reset emailInput state
      setEmailInput("");
    }
  }, [user, logedPerson]);
  // manager
  const handleSelectManager = (selectedManager) => {
    setUserData(selectedManager);
  };

  const optionmanager = [];
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link
              to="/home"
              className="breadcrumbs--link breadcrumbs"
              style={{ display: "inline", textDecoration: "none" }}
            >
              HOME
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="" className="breadcrumbs--link breadcrumbs--link--active">
              Myprofile
            </Link>
          </li>
        </ul>
        {/* <hr className="hr" /> */}
      </div>
      <div className="myprofile">
        <div>
          <HeaderBar headerlabel={"MY PROFILE"} />
        </div>
        <form>
          <div className="grid-containermy" style={{ marginLeft: "66px" }}>
            <div className="left-grid-item1">
              <div className="profile_icon_Myprofile">
                <div className="icon_name">{`${userData.firstName[0]}${userData.lastName[0]}${userData.profileid}`}</div>
              </div>

              <button className="salebutton">REAUTHENTICATE SALESFORCE</button>
            </div>
            <div className="right-grid-item2">
              <div className="containerP1">
                <div id="contentP1">
                  <InputTypes
                    type={"text"}
                    showFlagText={true}
                    TextLabel={"FIRST NAME"}
                    value={userData.firstName}
                    readOnly={true}
                    onChange={(value) =>
                      setUserData({ ...userData, firstName: value })
                    }
                  />
                </div>
                <div id="contentP1">
                  <InputTypes
                    type={"text"}
                    showFlagText={true}
                    TextLabel={"LAST NAME"}
                    value={userData.lastName}
                    readOnly={true}
                    onChange={(value) =>
                      setUserData({ ...userData, lastName: value })
                    }
                  />
                </div>
              </div>
              <div className="containerP2">
                <div id="contentP2">
                  <InputTypes
                    type={"text"}
                    showFlagText={true}
                    TextLabel={"TITLE"}
                    value={userData.title}
                    readOnly={true}
                    onChange={(value) =>
                      setUserData({ ...userData, title: value })
                    }
                  />
                </div>
                <div id="contentP2">
                  <PeopleIconDropdown
                    label="MANAGER"
                    showCharacterMessage={false}
                    onSelect={handleSelectManager}
                    options={optionmanager}
                    profileIds={userData.profileid}
                    profileIconVisible={true}
                    value={userData.manager}
                    readOnly={true}
                    onChange={(value) =>
                      setUserData({ ...userData, manager: value })
                    }
                  />
                </div>
              </div>
              <div className="containerP3">
                <div id="contentP3">
                  <InputTypes
                    type={"number"}
                    showFlagText={true}
                    TextLabel={"PHONE"}
                    readOnly={true}
                    value={userData.phone}
                    onChange={(value) =>
                      setUserData({ ...userData, phone: value })
                    }
                  />
                </div>
                <div id="contentP3">
                  <InputTypes
                    type={"email"}
                    showFlagText={true}
                    TextLabel={"EMAIL"}
                    value={userData.email}
                    readOnly={true}
                    onChange={(value) =>
                      setUserData({ ...userData, email: value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="role">
            <b>ROLE</b>
          </div>
          <div className="roles">
            <i>Roles are defined in the Admin Security section on the left</i>
          </div>
          <div className="containerP4">
            <div id="contentP4A">
              <InputTypes
                showFlagCheckBox={true}
                Checkboxlabel={"INTEGRATION ACCESS ONLY"}
                readOnly={true}
                onChange={(value) =>
                  setUserData({ ...userData, checkbox: value })
                }
              />
            </div>
            <div id="contentP4B">
              <a className="delete1" href="#">
                &nbsp;DELETE REFRESH TOKEN&nbsp;
              </a>
            </div>
          </div>
          <div className="containerP5">
            <div id="contentP5">
              <InputTypes
                type={"text"}
                showFlagText={true}
                TextLabel={"SECURITY ROLE"}
                value={userData.securityRole}
                readOnly={true}
                onChange={(value) =>
                  setUserData({ ...userData, securityRole: value })
                }
              />
            </div>
            <div id="contentP5">
              <InputTypes
                type={"text"}
                showFlagText={true}
                TextLabel={"PASSWORD EXPIRATION DATE"}
                readOnly={true}
                onChange={(value) =>
                  setUserData({ ...userData, passwordExpdate: value })
                }
              />
            </div>
          </div>
        </form>
        <div className="preferences">
          <b>PREFERENCES</b>
        </div>
        <form>
          <div className="containerP6">
            <div id="contentP6">
              <CustomDropdown
                options={optionsorgprofile}
                label="SALES ORG"
                showCancel={true}
                onSelect={handleOptionSelect}
                onChange={(value) =>
                  setUserData({ ...userData, salesorg: value })
                }
              />
            </div>
            <div id="contentP6">
              <CustomDropdown
                options={CONSTANTS.timeZoneOptions}
                label="TIME ZONE"
                showCancel={true}
                onSelect={handleOptionSelect}
                onChange={(value) =>
                  setUserData({ ...userData, timezone: value })
                }
              />
            </div>
          </div>
          <div className="containerP7">
            <div id="contentP7">
              <CustomDropdown
                options={CONSTANTS.languagesOptions}
                label="LANGUAGE"
                showCancel={true}
                onSelect={handleOptionSelect}
                onChange={(value) =>
                  setUserData({ ...userData, language: value })
                }
              />
            </div>
            <div id="contentP7">
              <CustomDropdown
                options={optionsnotification}
                label="NOTIFICATIONS"
                showCancel={true}
                onSelect={handleOptionSelect}
                onChange={(value) =>
                  setUserData({ ...userData, notification: value })
                }
              />
            </div>
          </div>
          <div>
            <div className="loginemail">
              <b>LOGIN EMAIL &amp; PASSWORD</b>
            </div>
          </div>
        </form>
      </div>
      <div>
        <div className="Edit_Button">
          <button id="edit" onClick={handleEditButtonClick}>
            &nbsp;&nbsp;&nbsp;&nbsp;EDIT&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        </div>
        {openLogin && (
          <div className="acesscontainermyprofile">
            <div className="login-heading">
              <b>LOGIN EMAIL &amp; PASSWORD</b>
            </div>
            <br />
            <div className="sub-container">
              <div className="left-sub-container">
                <div className="email-input-box">
                  <input
                    type="text"
                    className="email-input"
                    autoComplete="off"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                    }}
                  />
                  <label className="email-label">LOGIN EMAIL</label>
                </div>
                <div className="password-input-box">
                  <input
                    type="text"
                    className={
                      CurrentPassError
                        ? "error-password-input"
                        : "passwords-input"
                    }
                    autoComplete="off"
                    placeholder="Enter Password"
                    value={currentPassword}
                    onChange={(e) => handleChangeInputcurrent(e.target.value)}
                    style={
                      currentPassword.trim() === ""
                        ? { borderLeft: "3px solid #0f6b93" }
                        : { borderLeft: "0.1px solid #ccc" }
                    }
                  />
                  <label
                    className={
                      CurrentPassError ? "password-redLabel" : "password-label"
                    }
                  >
                    {CurrentPassError
                      ? "Password is Required"
                      : "CURRENT PASSWORD"}
                  </label>
                </div>
                <div className="password-input-box">
                  <input
                    type="text"
                    className={
                      NewPassError ? "error-password-input" : "passwords-input"
                    }
                    autoComplete="off"
                    placeholder="Enter Password"
                    value={newPassword}
                    onChange={(e) => handleChangeInput(e.target.value)}
                    style={
                      newPassword.trim() === ""
                        ? { borderLeft: "3px solid #0f6b93" }
                        : { borderLeft: "0.1px solid #ccc" }
                    }
                  />
                  <label
                    className={
                      NewPassError ? "password-redLabel" : "password-label"
                    }
                  >
                    {NewPassError ? "Password is Required" : "    NEW PASSWORD"}
                  </label>
                </div>
                <div className="confirm-password-input-box">
                  <input
                    type="text"
                    className={
                      retypePassError
                        ? "error-password-input"
                        : "passwords-input"
                    }
                    autoComplete="off"
                    placeholder="Enter Password"
                    onChange={handleRetyprPassword}
                    value={cnfPassword}
                    style={
                      newPassword.trim() === ""
                        ? { borderLeft: "3px solid #0f6b93" }
                        : { borderLeft: "0.1px solid #ccc" }
                    }
                  />
                  <label
                    className={
                      retypePassError ? "password-redLabel" : "password-label"
                    }
                  >
                    {labelforRetypePassword}
                  </label>
                </div>
              </div>
              <div className="right-sub-container">
                <div className="rightside-content">
                  <span className="content">
                    Please make sure your password meets all the requirements
                    mentioned below. <br />
                    Also, your new password cannot be any of your previous
                    passwords
                  </span>
                </div>
                <div className="text-inputs">
                  <span className={numberVaidate ? "validate" : "notValidate"}>
                    1.Has one or more numbers
                  </span>
                  <span
                    className={uppercasevalidate ? "validate" : "notValidate"}
                  >
                    2.Has one or more upper case latters
                  </span>
                  <span
                    className={lowercasevalidate ? "validate" : "notValidate"}
                  >
                    3.Has one or more lower case latters
                  </span>
                  <span
                    className={
                      splCharacterValidate ? "validate" : "notValidate"
                    }
                  >
                    4.Has one or more special character
                  </span>
                  <span className={EmailValidate ? "validate" : "notValidate"}>
                    5.Cannot contain the email:{emailInput}(case insensitive)
                  </span>
                  <span className={passwordWord ? "validate" : "notValidate"}>
                    6.Cannot contain the word password "password"(case
                    insensitive){" "}
                  </span>
                  <span className={lengthvalidate ? "validate" : "notValidate"}>
                    7.Between 12 and 100 characters
                  </span>
                </div>
              </div>
            </div>
            <div className="cancelsavebutton">
              <button
                className="savebutton"
                onClick={() => {
                  setopenLogin(false);
                }}
              >
                CANCEL
              </button>
              <button className="cancelButton">SAVE</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Myprofile;
