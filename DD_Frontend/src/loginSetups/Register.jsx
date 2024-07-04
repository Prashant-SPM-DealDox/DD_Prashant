import React from "react";
import { useState, useEffect, useRef } from "react";
import Password from "../components/loginSetups/Password";
import { Link, Navigate } from "react-router-dom";
import FullLogo from "../assets/Images/FullLogo.png";
import RegisterImage from "../assets/Images/RegisterImage.png";
import { FaCheck, FaCircle, FaInfo } from "react-icons/fa";
import "../assets/css/login/Register.css";
import { baseUrl } from "../config";
import Signuplist from "../loginSetups/Signuplist";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import Swal from 'sweetalert2';

function Register({}) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone_number, setPhone_Number] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [country, setCountry] = useState("India");
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Track button disabled state
  const [isPasswordValid, setIsPasswordValid] = useState(false); // Track password validity
  const [, setSelectedOption] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmpasswordError, setconfirmPasswordError] = useState("");
  const [PasswordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setconfirmPasswordFocused] = useState(false);

  const handlePasswordChange = (password) => {
    setPassword(password);
    if (password.trim() === "") {
      setPasswordError("Enter a valid password");
      setconfirmPasswordError("");
    } else {
      setPasswordError("");
      setconfirmPasswordError("");
    }
  };
  const handleEmployeesSelect = (e) => {
    const selectedOption = e.target.value;
    setNumberOfEmployees(selectedOption);
    if (selectedOption && selectedOption.trim() !== "") {
      setempError("");
    } else {
      setempError("Select employee size");
    }
  };

  const handlenumberNameBlur = () => {
    // Validate when leaving the input
    const numberOfEmployeesString = String(numberOfEmployees);
    if (!numberOfEmployeesString || numberOfEmployeesString.trim() === "") {
      setempError("Select employee size");
    } else {
      setempError("");
    }
  };

  const handlecountrySelect = (selectedOption) => {
    setCountry(selectedOption);
  };
  // Practice Options
  const optionsize = [
    "1-20 employees",
    "21-200 employees",
    "200-10,000 employees",
    "10,000+ employees",
  ];
  const optioncountry = [
    " Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor (Timor-Leste)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];
  // Validate all input fields and update button disabled state
  const validateFields = () => {
    const isFullNameValid = firstName.trim() !== "";
    const isLastnameValid = lastname.trim() !== "";
    const isEmailValid = email.trim() !== "";
    const isCompanyNameValid = companyName.trim() !== "";
    const isJobtitlevalid = jobTitle.trim() !== "";
    const isNumberOfEmployeesValid = numberOfEmployees.trim() !== "";
    const isPhoneNumberValid = phone_number.trim() !== "";
    const isPasswordValid = password.trim() !== "";
    const isCheckboxChecked = document.getElementById("terms").checked;
    setIsCheckboxChecked(isCheckboxChecked);

    return (
      isFullNameValid &&
      isLastnameValid &&
      isCompanyNameValid &&
      isJobtitlevalid &&
      isPasswordValid &&
      isNumberOfEmployeesValid &&
      isEmailValid &&
      isPhoneNumberValid &&
      isCheckboxChecked
    );
  };

  useEffect(() => {
    validateFields(); // Re-validate fields on every change
  }, [
    firstName,
    lastname,
    email,
    companyName,
    phone_number,
    jobTitle,
    isPasswordValid,
    numberOfEmployees,
    isCheckboxChecked,
  ]);

  // Handle password validity change
  const handlePasswordValidityChange = (isValid) => {
    setIsPasswordValid(isValid);
  };

  const [phoneError, setPhoneError] = useState("");

  const handleChange = (event) => {
    const inputnumber = event.target.value;
    setPhone_Number(inputnumber);

    // Add your validation logic here
    if (!/^\d+$/.test(inputnumber)) {
      setPhoneError("Enter a valid phone number");
    } else {
      setPhoneError("");
    }
  };

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [companyNameError, setcompanyNameError] = useState("");
  const [jobTitleNameError, setjobTitleNameError] = useState("");
  const [emailNameError, setemailNameError] = useState("");
  const [empError, setempError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleFirstNameChange = (e) => {
    const inputValue = e.target.value;
    setFirstName(inputValue);
    // Add your validation logic here
    if (inputValue.trim() === "") {
      setFirstNameError("First Name is required");
    } else {
      setFirstNameError("");
    }
  };

  // Similar functions for other fields
  const handleLastNameChange = (e) => {
    const inputValue = e.target.value;
    setLastName(inputValue);

    if (inputValue.trim() === "") {
      setlastNameError("Enter your last name");
    } else {
      setlastNameError("");
    }
  };

  const handleCompanyNameChange = (e) => {
    const inputValue = e.target.value;
    setCompanyName(inputValue);

    // Add your validation logic here
    if (inputValue.trim() === "") {
      setcompanyNameError("Enter your company name");
    } else {
      setcompanyNameError("");
    }
  };

  const handleJobTitleChange = (e) => {
    const inputValue = e.target.value;
    setJobTitle(inputValue);

    // Add your validation logic here
    if (inputValue.trim() === "") {
      setjobTitleNameError("Enter your job title");
    } else {
      setjobTitleNameError("");
    }
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    // Add your email validation logic here

    const rgExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (inputValue.trim() === "") {
      setemailNameError("Enter a valid email address");
    } else if (!rgExp.test(inputValue)) {
      setemailNameError("Enter a valid email address");
    } else {
      setemailNameError("");
    }
  };

  //API to send data to database

  const addAdmin = async (event) => {
    setLoading(true);
    try {
      event.preventDefault();
      if (!isCheckboxChecked) {
        setErrorMessage("Please read and agree to the main services.");
        // Do not proceed with registration
      }

      if (phone_number.trim() === "") {
        setPhoneError("Enter a valid phone number");
        setPhone_NumberFocused(true);
      }
      if (firstName.trim() === "") {
        setFirstNameError("First Name is required");
        setFirstNameFocused(true);
      }
      if (lastname.trim() === "") {
        setlastNameError("Last Name is required");
        setLastNameFocused(true);
      }
      if (companyName.trim() === "") {
        setcompanyNameError("Company name is required");
        setCompanyNameFocused(true);
      }
      if (jobTitle.trim() === "") {
        setjobTitleNameError("Job title is required");
        setJobTitleFocused(true);
      }
      if (email.trim() === "") {
        setemailNameError("Email Address is required");
        setEmailFocused(true);
      }

      if (numberOfEmployees.trim() === "") {
        setempError("Select employee size");
        setNumberOfEmployeesFocused(true);
      }
      if (password.trim() === "") {
        setPasswordError("Password  is required");
        setPasswordFocused(true);
      } else {
        setPasswordError("");
      }
      if (password.trim() === "") {
        setconfirmPasswordError("Confirm Password is required");
        setconfirmPasswordFocused(true);
      }

      if (!validateFields()) {
        return;
      }

      // Proceed with user registration
      const response = await fetch(`${baseUrl}/api/admin/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastname,
          password: password,
          company: companyName,
          job_title: jobTitle,
          email: email,
          no_of_emp: numberOfEmployees,
          phone_num: phone_number,
          country: country,
        }),
      });
      const json = await response.json();
      setLoading(false);

      if (response.ok) {
        if (json.status === "Success") {
          toast.success(
            `${companyName} has been successfully registered under the user ${firstName}. Please check your email for further steps. `
          );
          navigate("/");
        } else {
          toast.success(json.message);
        }
      } else {
        toast.error(json.message);
        // window.location.href = "/register";
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ==================================================
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastnameFocused, setLastNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phone_numberFocused, setPhone_NumberFocused] = useState(false);
  const [companyNameFocused, setCompanyNameFocused] = useState(false);
  const [jobTitleFocused, setJobTitleFocused] = useState(false);
  const [numberOfEmployeesFocused, setNumberOfEmployeesFocused] =
    useState(false);

  const handleFirstNameBlur = () => {
    if (firstName.trim() === "") {
      setFirstNameError("First Name is required");
    }
  };
  const handleLastNameBlur = (e) => {
    if (lastname.trim() === "") {
      setlastNameError("Last Name is required");
    }
  };

  const handleCompanyNameBlur = (e) => {
    // Add your validation logic here
    if (companyName.trim() === "") {
      setcompanyNameError("Company Name is required");
    }
  };
  const handleJobTitleBlur = (e) => {
    // Add your validation logic here
    if (jobTitle.trim() === "") {
      setjobTitleNameError("Job Title is required");
    }
  };
  const handleEmailBlur = (e) => {
    // Add your validation logic here
    if (email.trim() === "") {
      setemailNameError("Email Address is required");
    }
  };
  const handleChangeBlur = (e) => {
    // Add your validation logic here
    if (!/^\d+$/.test(phone_number)) {
      setPhoneError("Phone Number is required");
    }
  };
  const handlepasswordlBlur = (e) => {
    if (password.trim() === "") {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };
  const numberOfEmployeesRef = useRef(null);
  const handleLabelClick = () => {
    setNumberOfEmployeesFocused(true);
    numberOfEmployeesRef.current.focus(); // Trigger focus event on select element
  };
  return (
    <>
      <div id="entireSignupDiv">
        <div id="CompleteSignUp">
          <div id="LeftDiv">
            {/* <div className="leftmaininnerdiv"> */}

            <img src={FullLogo} alt="" id="SignUpDealDoxIcon" />

            <div className="leftinnerdiv">
              <h1 id="leftSideHeading">Start your free trail.</h1>
              <p id="leftsidePara">
                No credit card commitment software free experience.
              </p>

              <div>
                <span id="trialquote">With your 30 days trail, you get:</span>
                {/* <FaCheck id='textcheck'/> */}
                <div id="mn">
                  <FaCheck id="textcheck" />
                  <p id="registerinfo">Faster Real-time Quotations</p>
                  <FaCheck id="textcheck" />
                  <p id="registerinfo">A Comprehensive Service Offering</p>
                  <FaCheck id="textcheck" />
                  <p id="registerinfo">Free Implementation</p>
                  <FaCheck id="textcheck" />
                  <p id="registerinfo">Instant,Error-free Documents</p>
                  <FaCheck id="textcheck" />
                  <p id="registerinfo">Quick and Reliable Support</p>
                </div>
              </div>
              <span id="needAssistance">
                Need Assistance? Call Us: +91 8431995645
              </span>
              <span>
                <Link to="https://www.dealdox.io/demo">
                  <button id="requestDemos">Request Demo</button>
                </Link>
              </span>

              <img src={RegisterImage} alt="" id="signUPImage" />
            </div>
            {/* </div> */}
          </div>
          <div id="RightDiv">
            <div id="boxForRightDiv">
              <form className="registerDeatils" action="" autoComplete="off">
                <h1 id="heading1">
                  {" "}
                  Sign Up Now and Start using
                  <br />
                  DealDox CPQ!
                </h1>
                <p id="signupcontent">
                  Tired of tedious Quoting? Boost Your Sales with DealDox CPQ.
                  Sign up now <br />
                  and unleash its power!
                </p>
                <div id="mainnamediv">
                  <div
                    id="firstNameDiv"
                    className={firstNameFocused || firstName ? "focused" : ""}
                  >
                    <label htmlFor="firstNameInput" id="fistLabel">
                      First Name
                    </label>
                    <br />
                    <input
                      type="text"
                      placeholder={firstNameFocused ? "" : ""}
                      id="firstNameInput"
                      value={firstName}
                      onChange={handleFirstNameChange}
                      onFocus={() => setFirstNameFocused(true)}
                      onBlur={handleFirstNameBlur}
                      autoComplete="new-password"
                      style={{
                        outlineColor: firstNameError ? "#c23934" : "#715CF3",
                        border: firstNameError ? "1.5px solid #c23934" : "",
                        background: firstNameError ? "#f6e2e1" : "",
                      }}
                    />

                    {firstNameError && (
                      <p
                        style={{
                          color: "#c23934",
                          fontSize: "12px",
                          padding: "3px",
                        }}
                      >
                        <FaInfo id="sample" /> {firstNameError}
                      </p>
                    )}
                  </div>

                  <div
                    id="LastNameDiv"
                    className={lastnameFocused || lastname ? "focused" : ""}
                  >
                    <label htmlFor="LastNameInput" id="lastLabel">
                      Last Name
                    </label>
                    <br />
                    <input
                      type="text"
                      placeholder={lastnameFocused ? "" : ""}
                      id="LastNameInput"
                      value={lastname}
                      onChange={handleLastNameChange}
                      onFocus={() => setLastNameFocused(true)}
                      onBlur={handleLastNameBlur}
                      autoComplete="new-password"
                      style={{
                        outlineColor: lastNameError ? "#c23934" : "#715CF3",
                        border: lastNameError ? "1.5px solid #c23934" : "",
                        background: lastNameError ? "#f6e2e1" : "",
                      }}
                    />

                    {lastNameError && (
                      <p
                        style={{
                          color: "#c23934",
                          fontSize: "12px",
                          padding: "3px",
                        }}
                      >
                        <FaInfo id="sample" /> {lastNameError}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  id="password"
                  className={`${PasswordFocused ? "focused" : ""} ${
                    confirmPasswordFocused ? "focused" : ""
                  }`}
                >
                  <Password
                    onChange={handlePasswordChange}
                    onValidityChange={handlePasswordValidityChange}
                    onFocus={(e) => {
                      if (e.target.id === "password") {
                        setPasswordFocused(true);
                        setconfirmPasswordFocused(false);
                      } else if (e.target.id === "confirmPassword") {
                        setPasswordFocused(false);
                        setconfirmPasswordFocused(true);
                      }
                    }}
                    onBlur={handlepasswordlBlur}
                    custuminput={passwordError ? "customerror" : "defaultone"}
                    custuminputone={confirmpasswordError ? "customerror" : " "}
                  />
                </div>

                {/* {passwordError && (
                  <p style={{ color: "#c23934", fontSize: "12px", padding: "3px" }}>
                    <FaInfo id="sample" /> {passwordError}
                  </p>

                )}  */}
                {/* {confirmpasswordError && (
                  <p style={{ color: "#c23934", fontSize: "12px", paddingLeft: '54%', marginTop: '-17px' }}>
                    <FaInfo id="sample" /> {confirmpasswordError}
                  </p>
                )} */}

                <div id="companyJobTittleDiv">
                  <div
                    id="companyDiv"
                    className={
                      companyNameFocused || companyName ? "focused" : ""
                    }
                  >
                    <label htmlFor="CompanyInput" id="CompanyLabel">
                      Company
                    </label>
                    <br />
                    <input
                      autoComplete="new-password"
                      type="text"
                      placeholder={companyNameFocused ? "" : ""}
                      id="CompanyInput"
                      value={companyName}
                      onChange={handleCompanyNameChange}
                      onFocus={() => setCompanyNameFocused(true)}
                      onBlur={handleCompanyNameBlur}
                    
                      style={{
                        outlineColor: companyNameError ? "#c23934" : "#715CF3",
                        border: companyNameError ? "1.5px solid #c23934" : "",
                        background: companyNameError ? "#f6e2e1" : "",
                      }}
                    />

                    {companyNameError && (
                      <p
                        style={{
                          color: "#c23934",
                          fontSize: "12px",
                          padding: "3px",
                        }}
                      >
                        <FaInfo id="sample" /> {companyNameError}
                      </p>
                    )}
                  </div>
                  <div
                    id="jobTittleDiv"
                    className={jobTitleFocused || jobTitle ? "focused" : ""}
                  >
                    <label htmlFor="JobTittleInput" id="JobTittleLabel">
                      Job Title
                    </label>
                    <br />
                    <input
                      type="text"
                      placeholder={jobTitleFocused ? "" : ""}
                      id="JobTittleInput"
                      value={jobTitle}
                      onChange={handleJobTitleChange}
                      onFocus={() => setJobTitleFocused(true)}
                      onBlur={handleJobTitleBlur}
                      autoComplete="new-password"
                      style={{
                        outlineColor: jobTitleNameError ? "#c23934" : "#715CF3",
                        border: jobTitleNameError ? "1.5px solid #c23934" : "",
                        background: jobTitleNameError ? "#f6e2e1" : "",
                      }}
                    />

                    {jobTitleNameError && (
                      <p
                        style={{
                          color: "#c23934",
                          fontSize: "12px",
                          padding: "3px",
                        }}
                      >
                        <FaInfo id="sample" /> {jobTitleNameError}
                      </p>
                    )}
                  </div>
                </div>

                <div id="emailEmployeeDiv">
                  <div
                    id="emailDiv"
                    className={emailFocused || email ? "focused" : ""}
                  >
                    <label htmlFor="emailInput" id="emailLabel">
                      {" "}
                      Business Email
                    </label>
                    <br />
                    <input
                      type="email"
                      placeholder={emailFocused ? "" : ""}
                      id="emailInput"
                      value={email}
                      onChange={handleEmailChange}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={handleEmailBlur}
                      autoComplete="new-password"
                      style={{
                        outlineColor: emailNameError ? "#c23934" : "#715CF3",
                        border: emailNameError ? "1.5px solid #c23934" : "",
                        background: emailNameError ? "#f6e2e1" : "",
                      }}
                    />
                    {emailNameError && (
                      <p
                        style={{
                          color: "#c23934",
                          fontSize: "12px",
                          padding: "3px",
                        }}
                      >
                        <FaInfo id="sample" /> {emailNameError}
                      </p>
                    )}
                  </div>
                  <div
                    id="EmployeeDiv"
                    className={
                      numberOfEmployeesFocused || numberOfEmployees
                        ? "focused"
                        : ""
                    }
                    onClick={handleLabelClick}
                  >
                    <label htmlFor="numberOfEmployees" id="floating">
                      Employees
                    </label>
                    <div className="trialdrop">
                      <select
                        id="numberOfEmployees"
                        defaultValue=" "
                        value={numberOfEmployees}
                        onChange={handleEmployeesSelect}
                        onFocus={() => setNumberOfEmployeesFocused(true)}
                        onBlur={handlenumberNameBlur}
                        ref={numberOfEmployeesRef}
                        style={{
                          outlineColor: empError ? "#c23934" : "#715CF3",
                          border: empError ? "1.5px solid #c23934" : "",
                          background: empError ? "#f6e2e1" : "",
                        }}
                      >
                        <option value="" disabled={true} hidden={true}></option>
                        <option value=" " disabled>
                          Employees
                        </option>
                        {/* <option value="" disabled={true} hidden={true}></option> */}
                        <option value="1-25 employees">1-25 employees</option>
                        <option value="26-100 employees">
                          26-100 employees
                        </option>
                        <option value="101-250 employees">
                          101-250 employees
                        </option>
                        {/* <option value="251-500 employees">251-500 employees</option> */}
                        {/* <option value="501-1000 employees">501-1000 employees</option> */}
                        {/* <option value="1001-2000+ employees">1001-2000+ employees</option> */}
                      </select>
                    </div>
                    {empError && (
                      <p
                        style={{
                          color: "#c23934",
                          fontSize: "12px",
                          padding: "3px",
                        }}
                      >
                        <FaInfo id="sample" /> {empError}
                      </p>
                    )}
                  </div>
                </div>

                <div id="countryPhoneDiv">
                  <div
                    id="PhoneDiv"
                    className={
                      phone_numberFocused || phone_number ? "focused" : ""
                    }
                  >
                    <label htmlFor="PhoneInput" id="registernumber">
                      Phone Number
                    </label>
                    <br />
                    <input
                      type="number"
                      placeholder={phone_numberFocused ? "" : ""}
                      id="PhoneInput"
                      value={phone_number}
                      onChange={handleChange}
                      onFocus={() => setPhone_NumberFocused(true)}
                      onBlur={handleChangeBlur}
                      autoComplete="new-password"
                      style={{
                        outlineColor: phoneError ? "#c23934" : "#715CF3",
                        border: phoneError ? "1.5px solid #c23934" : "",
                        background: phoneError ? "#f6e2e1" : "",
                      }}
                    />

                    {phoneError && (
                      <p
                        style={{
                          color: "#c23934",
                          fontSize: "12px",
                          padding: "3px",
                        }}
                      >
                        <FaInfo id="sample" /> {phoneError}
                      </p>
                    )}
                  </div>
                  <div id="countryDiv">
                    <Signuplist
                      label="Country"
                      onSelect={handlecountrySelect}
                      options={optioncountry}
                      Placeholder={"Select country"}
                      value={country}
                      onChange={(value) => setCountry(value)}
                    />
                  </div>
                </div>
                <div>
                  <span id="agreediv">
                    <input
                      type="checkbox"
                      id="terms"
                      // required
                      onChange={() => {
                        validateFields(); // Call the validateFields function on checkbox change
                        setErrorMessage("");
                      }}
                      autoComplete="new-password"
                    />
                    <label htmlFor="terms">
                      I agree to the{" "}
                      <span id="termsofuse">
                        <Link to="https://www.dealdox.io/terms-of-use">
                          Terms of Use
                        </Link>
                      </span>
                    </label>
                  </span>
                  {errorMessage && (
                    <div className="errorr-message">{errorMessage}</div>
                  )}
                </div>

                <div id="buttonDiv">
                  <button
                    id="startButton"
                    disabled={loading}
                    onClick={(event) => addAdmin(event)}
                  >
                    Start My Free Trial{loading && <i class="loading"></i>}
                  </button>
                </div>
                <div id="infoDiv">
                  <p id="SignInInfo">
                    By registering, you confirm that you agree to the storing
                    and processing <br /> of your personal data by DealDox as
                    described in the{" "}
                    <span id="privacyLink">
                      <Link to="https://www.dealdox.io/privacy-policy">
                        Privacy Policy
                      </Link>
                    </span>
                  </p>
                </div>
              </form>
              <div className="footer-content-div">
                <div id="mediadiv">
                  <button id="cButton">c</button>
                  <span id="InstructionPrivacy">
                    {" "}
                    2024 DealDox Pvt Ltd | All Rights Reserved |{" "}
                    <Link to="https://www.dealdox.io/privacy-policy">
                      Privacy
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='extraone'> </div> */}
      </div>
    </>
  );
}

export default Register;
