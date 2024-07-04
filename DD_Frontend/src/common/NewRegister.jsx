import React, { useState, useEffect, useRef } from "react";
import "../assets/css/login/Register.css";
import NewDealDoxIcon from "../assets/Images/NewDealDoxIcon.png";
import RegisterImage from "../assets/Images/RegisterImage.png";
import { CONSTANTS } from "../constants.js";
import RegisterDropDown from "./RegisterDropDown";
import ErrorIcon from "../assets/Images/ErrorIcon.png";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdCheck } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const NewRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    company: "",
    jobTittle: "",
    employees: "",
    businessEmail: "",
    phoneNumber: "",
    country: "",
    agree: false,
  });

  const [passwordEye, setPasswordEye] = useState(false);
  const [cpasswordeye, setcpasswordeye] = useState(false);
  const [validateEmail, setValidateEmail] = useState(
    "Business Email is required"
  );
  const [passwordValidation, setPasswordValidate] = useState(false);
  const [defaultDots, setDefaultDots] = useState(true);
  const [ConfirmPasswordcontent, setConfirmPasswordContent] = useState(
    "Confirm Password is Required"
  );
  const currentYear = new Date().getFullYear();

  const handlepasswordValidation = () => {
    setPasswordValidate(true);
  };

  const [formErrors, setFormErrors] = useState({
    isFirstName: false,
    isLastName: false,
    isPassword: false,
    isConfirmPassword: false,
    isCompany: false,
    isJobTittle: false,
    isEmployees: false,
    isBusinessEmail: false,
    isPhoneNumber: false,
    isCountry: false,
    IsAgree: false,
  });

  const [validateCondition, setValidateCondition] = useState({
    numberValidate: true,
    UppercaseValidate: true,
    LowerCaseValidate: true,
    SplCharacterValidate: true,
    LengthValidate: true,
  });

  const {
    numberValidate,
    UppercaseValidate,
    LowerCaseValidate,
    SplCharacterValidate,
    LengthValidate,
  } = validateCondition;

  const {
    firstName,
    lastName,
    password,
    confirmPassword,
    company,
    jobTittle,
    employees,
    businessEmail,
    phoneNumber,
    country,
    agree,
  } = formData;

  const {
    isFirstName,
    isLastName,
    isPassword,
    isConfirmPassword,
    isCompany,
    isJobTittle,
    isEmployees,
    isBusinessEmail,
    isPhoneNumber,
    isCountry,
    IsAgree,
  } = formErrors;

  const passwordOutside = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        passwordOutside.current &&
        !passwordOutside.current.contains(event.target)
      ) {
        setPasswordValidate(false);
        if (password.trim() === "") {
          setFormErrors({
            ...formErrors,
            isPassword: true,
          });
        } else {
          setFormErrors({
            ...formErrors,
            isPassword: false,
          });
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {}, [
    validateEmail,
    passwordValidation,
    numberValidate,
    ConfirmPasswordcontent,
  ]);

  const validateFirstName = (e) => {
    if (e.target.value.trim() === "") {
      setFormErrors({
        ...formErrors,
        isFirstName: true,
      });
    } else {
      setFormErrors({
        ...formErrors,
        isFirstName: false,
      });
    }
  };
  const validateLastName = (e) => {
    if (e.target.value.trim() === "") {
      setFormErrors({
        ...formErrors,
        isLastName: true,
      });
    } else {
      setFormErrors({
        ...formErrors,
        isLastName: false,
      });
    }
  };
  const validateConfirmPassword = (e) => {
    if (e.target.value.trim() === "") {
      setFormErrors({
        ...formErrors,
        isConfirmPassword: true,
      });
    } else {
      setFormErrors({
        ...formErrors,
        isConfirmPassword: false,
      });
    }

    if (password !== e.target.value) {
      setFormErrors({
        ...formErrors,
        isConfirmPassword: true,
      });
      setConfirmPasswordContent("Passwords need to match");
    } else {
      setFormErrors({
        ...formErrors,
        isConfirmPassword: false,
      });
      setValidateEmail(false);
      setConfirmPasswordContent("Confirm Password is Required");
    }
  };
  const validatePassword = (e) => {
    setPasswordValidate(true);
    if (e.target.value.trim() === "") {
      setFormErrors({
        ...formErrors,
        isPassword: true,
      });
      setPasswordValidate(true);
    } else if (
      numberValidate === true &&
      UppercaseValidate === true &&
      LowerCaseValidate === true &&
      SplCharacterValidate === true &&
      LengthValidate === true
    ) {
      setPasswordValidate(false);
    } else {
      setFormErrors({
        ...formErrors,
        isPassword: false,
      });
    }

    setDefaultDots(false);

    const number = new RegExp("(?=.*[0-9])");
    const upperCase = new RegExp("(?=.*[A-Z])");
    const lowerCase = new RegExp("(?=.*[a-z])");
    const splCharacter = new RegExp("(?=.*[@/$/%/&/*/!])");
    const length = new RegExp("(?=.{8,100})");

    let validates = {};

    if (!number.test(e.target.value)) {
      validates = { ...validates, numberValidate: false };
    } else {
      validates = { ...validates, numberValidate: true };
    }
    if (!upperCase.test(e.target.value)) {
      validates = { ...validates, UppercaseValidate: false };
    } else {
      validates = { ...validates, UppercaseValidate: true };
    }
    if (!lowerCase.test(e.target.value)) {
      validates = { ...validates, LowerCaseValidate: false };
    } else {
      validates = { ...validates, LowerCaseValidate: true };
    }
    if (!splCharacter.test(e.target.value)) {
      validates = { ...validates, SplCharacterValidate: false };
    } else {
      validates = { ...validates, SplCharacterValidate: true };
    }
    if (!length.test(e.target.value)) {
      validates = { ...validates, LengthValidate: false };
    } else {
      validates = { ...validates, LengthValidate: true };
    }

    setValidateCondition(validates);
  };
  const validateCompany = (e) => {
    if (e.target.value.trim() === "") {
      setFormErrors({
        ...formErrors,
        isCompany: true,
      });
    } else {
      setFormErrors({
        ...formErrors,
        isCompany: false,
      });
    }
  };
  const validateJobTittle = (e) => {
    if (e.target.value.trim() === "") {
      setFormErrors({
        ...formErrors,
        isJobTittle: true,
      });
    } else {
      setFormErrors({
        ...formErrors,
        isJobTittle: false,
      });
    }
  };
  const validateBuisnessEmail = (e) => {
    if (e.target.value.trim() === "") {
      setFormErrors({
        ...formErrors,
        isBusinessEmail: true,
      });
    } else {
      setFormErrors({
        ...formErrors,
        isBusinessEmail: false,
      });
    }
  };
  const validatePhoneNumber = (e) => {
    if (e.target.value.trim() === "") {
      setFormErrors({
        ...formErrors,
        isPhoneNumber: true,
      });
    } else {
      setFormErrors({
        ...formErrors,
        isPhoneNumber: false,
      });
    }
  };
  const validateEmployee = (e) => {
    if (e.target.value.trim() === "") {
      setFormErrors({
        ...formErrors,
        isEmployees: true,
      });
    } else {
      setFormErrors({
        ...formErrors,
        isEmployees: false,
      });
    }
  };
  const validateTerms = (e) => {
    if (agree === false) {
      setFormErrors({
        ...formErrors,
        IsAgree: true,
      });
    } else {
      setFormErrors({
        ...formErrors,
        IsAgree: false,
      });
    }
  };

  const employeesList = [
    "1-20 employees",
    "21-200 employees",
    "200-10,000 employees",
    "10,000+ employees",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSelect = (option) => {
    handleChange({ target: { name: "Employees", value: option } });
    setFormErrors({
      ...formErrors,
      isEmployees: false,
    });
  };
  const handleCountrySelect = (option) => {
    handleChange({ target: { name: "Country", value: option } });
    setFormErrors({
      ...formErrors,
      isCountry: false,
    }); // Manually construct the event object with name and value
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    if (firstName.trim() === "") {
      errors = { ...errors, isFirstName: true };
    }

    if (lastName.trim() === "") {
      errors = { ...errors, isLastName: true };
    }
    if (password.trim() === "") {
      errors = { ...errors, isPassword: true };
    }
    if (confirmPassword.trim() === "") {
      errors = { ...errors, isConfirmPassword: true };
    }
    if (company.trim() === "") {
      errors = { ...errors, isCompany: true };
    }
    if (jobTittle.trim() === "") {
      errors = { ...errors, isJobTittle: true };
    }
    if (employees.trim() === "") {
      errors = { ...errors, isEmployees: true };
    }
    if (!businessEmail.trim()) {
      setValidateEmail("Email is Required");
      errors = { ...errors, isBusinessEmail: true };
    } else if (!/\S+@\S+\.\S+/.test(businessEmail)) {
      setValidateEmail("Email is not Valid");
      errors = { ...errors, isBusinessEmail: true };
    }
    if (phoneNumber.trim() === "") {
      errors = { ...errors, isPhoneNumber: true };
    }
    if (country.trim() === "") {
      errors = { ...errors, isCountry: true };
    }
    if (agree === false) {
      errors = { ...errors, IsAgree: true };
    }

    setFormErrors(errors);
  };

  return (
    <div className="register-container">
      <div className="left-register-container">
        <div className="register-contents">
          <img src={NewDealDoxIcon} width={"150px"} className="dealdox-image" />
          <div className="firstheading-content">
            <span className="signup-heading">
              Sign Up Now to Start Generating Quotations for Free!
            </span>
            <small className="no-credit-content">
              No credit card commitment,software free experience.
            </small>
          </div>
          <span className="free-trail-content">
            With your 30 days trail,you get:
          </span>
          <div className="feature-content">
            <span className="feature-contents">
              <FaRegCheckCircle className="circle-check" />
              &nbsp;Faster Real-time Quotations
            </span>
            <span className="feature-contents">
              <FaRegCheckCircle className="circle-check" />
              &nbsp;A Comprehensive Service Offering
            </span>
            <span className="feature-contents">
              <FaRegCheckCircle className="circle-check" />
              &nbsp;Free Implementation
            </span>
            <span className="feature-contents">
              <FaRegCheckCircle className="circle-check" />
              &nbsp;Instant, Error-free Documents
            </span>
            <span className="feature-contents">
              <FaRegCheckCircle className="circle-check" />
              &nbsp;Quick and Reliable Support
            </span>
          </div>
          <span className="need-assistance-content">
            Need Assistance? Call Us:+91 8431995645
          </span>

          <div>
            <button className="request-demo-button">Request Demo</button>
          </div>
        </div>
        <div className="register-image-container">
          <img src={RegisterImage} alt="" className="register-main-image" />
        </div>
      </div>
      <div className="right-register-container">
        <div className="register-form-container">
          <div className="right-content-flex">
            <div className="form-div1">
              <span className="signup-now-heading">
                Sign Up Now and Start Using
                <br className="break-tag" /> DealDox CPQ!
              </span>
              <small className="tired-content">
                Tired of tedious Quoting? Boost Your Sales with DealDox CPQ.
                Sign up now <br className="break-tag" /> and unleash its power!
              </small>
            </div>
            <div className="main-form-container">
              <form action="" className="form-div2" onSubmit={handleSubmit}>
                <div className="firstname-lastname-container">
                  <div className="firstname-container">
                    <label className="firstname-label">First Name</label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      className={
                        isFirstName
                          ? "register-error-Input-container"
                          : "firstname-input"
                      }
                      name="firstName"
                      value={firstName}
                      onChange={(e) => {
                        handleChange(e);
                        validateFirstName(e);
                      }}
                      autoComplete="off"
                    />
                    {isFirstName ? (
                      <p className="register-error-message">
                        <img src={ErrorIcon} alt="" className="error-icon" />
                        &nbsp;First Name is Required
                      </p>
                    ) : (
                      <p className="error-register">&nbsp; </p>
                    )}
                  </div>

                  <div className="lastname-container">
                    <label className="lastname-label">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      className={
                        isLastName
                          ? "register-error-Input-container"
                          : "lastname-input"
                      }
                      name="lastName"
                      value={lastName}
                      onChange={(e) => {
                        handleChange(e);
                        validateLastName(e);
                      }}
                      autoComplete="off"
                    />
                    {isLastName ? (
                      <p className="register-error-message">
                        <img src={ErrorIcon} alt="" className="error-icon" />
                        &nbsp;Last Name is Required
                      </p>
                    ) : (
                      <p className="error-register">&nbsp;</p>
                    )}
                  </div>
                </div>
                <div className="password-cpassword-container">
                  <div className="password-container">
                    <label className="password-label">Password</label>
                    <div className="password-input-eye">
                      <input
                        type={passwordEye ? "text" : "password"}
                        // type="text"
                        placeholder="Enter Your Password"
                        className={
                          isPassword
                            ? "register-error-Input-container"
                            : "password-input"
                        }
                        name="password"
                        value={password}
                        onChange={(e) => {
                          handleChange(e);
                          validatePassword(e);
                        }}
                        autoComplete="new-password"
                        onClick={handlepasswordValidation}
                      />

                      {passwordEye ? (
                        <IoEyeOffOutline
                          className="password-eye"
                          onClick={() => setPasswordEye(!passwordEye)}
                        />
                      ) : (
                        <IoEyeOutline
                          className={
                            isPassword ? "error-password-eye" : "password-eye"
                          }
                          onClick={() => setPasswordEye(!passwordEye)}
                        />
                      )}

                      {passwordValidation && (
                        <ul
                          className="password-validation-container"
                          ref={passwordOutside}
                        >
                          <span
                            className={
                              numberValidate ? "validates" : "notValidates"
                            }
                          >
                            {!defaultDots ? (
                              numberValidate ? (
                                <MdCheck
                                  style={{ color: "#0f6b93" }}
                                  size={15}
                                />
                              ) : (
                                <RxCross2 size={15} />
                              )
                            ) : (
                              <GoDotFill size={14} />
                            )}
                            Has one or more numbers
                          </span>
                          <span
                            className={
                              UppercaseValidate ? "validates" : "notValidates"
                            }
                          >
                            {!defaultDots ? (
                              UppercaseValidate ? (
                                <MdCheck
                                  style={{ color: "#0f6b93" }}
                                  size={15}
                                />
                              ) : (
                                <RxCross2 size={15} />
                              )
                            ) : (
                              <GoDotFill size={14} />
                            )}
                            Has one or more uppercase letters
                          </span>
                          <span
                            className={
                              LowerCaseValidate ? "validates" : "notValidates"
                            }
                          >
                            {!defaultDots ? (
                              LowerCaseValidate ? (
                                <MdCheck
                                  style={{ color: "#0f6b93" }}
                                  size={15}
                                />
                              ) : (
                                <RxCross2 size={15} />
                              )
                            ) : (
                              <GoDotFill size={14} />
                            )}
                            Has one or more lowercase letters
                          </span>
                          <span
                            className={
                              SplCharacterValidate
                                ? "validates"
                                : "notValidates"
                            }
                          >
                            {!defaultDots ? (
                              SplCharacterValidate ? (
                                <MdCheck
                                  style={{ color: "#0f6b93" }}
                                  size={15}
                                />
                              ) : (
                                <RxCross2 size={15} />
                              )
                            ) : (
                              <GoDotFill size={14} />
                            )}
                            Has one or more special characters
                          </span>
                          <span
                            className={
                              LengthValidate ? "validates" : "notValidates"
                            }
                          >
                            {!defaultDots ? (
                              LengthValidate ? (
                                <MdCheck
                                  style={{ color: "#0f6b93" }}
                                  size={15}
                                />
                              ) : (
                                <RxCross2 size={15} />
                              )
                            ) : (
                              <GoDotFill size={14} />
                            )}
                            Between 8 and 100 characters
                          </span>
                        </ul>
                      )}
                    </div>
                    {isPassword ? (
                      <p className="register-error-message">
                        <img src={ErrorIcon} alt="" className="error-icon" />
                        &nbsp;Password is Required
                      </p>
                    ) : (
                      <p className="error-register">&nbsp;</p>
                    )}
                  </div>
                  <div className="cpassword-container">
                    <label className="cpassword-label">Confirm Password</label>
                    <div className="cpassword-input-eye">
                      <input
                        type={cpasswordeye ? "text" : "password"}
                        placeholder="Enter Confirm Password"
                        className={
                          isConfirmPassword
                            ? "register-error-Input-container"
                            : "cpassword-input"
                        }
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => {
                          handleChange(e);
                          validateConfirmPassword(e);
                        }}
                        autoComplete="off"
                      />
                      {cpasswordeye ? (
                        <IoEyeOffOutline
                          className="password-eye"
                          onClick={() => setcpasswordeye(!cpasswordeye)}
                        />
                      ) : (
                        <IoEyeOutline
                          className={
                            isConfirmPassword
                              ? "error-password-eye"
                              : "password-eye"
                          }
                          onClick={() => setcpasswordeye(!cpasswordeye)}
                        />
                      )}
                    </div>
                    {isConfirmPassword ? (
                      <p className="register-error-message">
                        <img src={ErrorIcon} alt="" className="error-icon" />
                        &nbsp;{ConfirmPasswordcontent}
                      </p>
                    ) : (
                      <p className="error-register">&nbsp;</p>
                    )}
                  </div>
                </div>
                <div className="Company-JobTitle-container">
                  <div className="Company-container">
                    <label className="Company-label">Company</label>
                    <input
                      type="text"
                      placeholder="Enter Your Company Name"
                      className={
                        isCompany
                          ? "register-error-Input-container"
                          : "Company-input"
                      }
                      name="company"
                      value={company}
                      onChange={(e) => {
                        handleChange(e);
                        validateCompany(e);
                      }}
                      autoComplete="off"
                    />

                    {isCompany ? (
                      <p className="register-error-message">
                        <img src={ErrorIcon} alt="" className="error-icon" />
                        &nbsp;Company is Required
                      </p>
                    ) : (
                      <p className="error-register">&nbsp;</p>
                    )}
                  </div>
                  <div className="JobTitle-container">
                    <label className="JobTitle-label">Job Title</label>
                    <input
                      type="text"
                      placeholder="Enter Your JobTittle"
                      className={
                        isJobTittle
                          ? "register-error-Input-container"
                          : "JobTitle-input"
                      }
                      name="jobTittle"
                      value={jobTittle}
                      onChange={(e) => {
                        handleChange(e);
                        validateJobTittle(e);
                      }}
                      autoComplete="off"
                    />
                    {isJobTittle ? (
                      <p className="register-error-message">
                        <img src={ErrorIcon} alt="" className="error-icon" />
                        &nbsp;Job Tittle is Required
                      </p>
                    ) : (
                      <p className="error-register">&nbsp;</p>
                    )}
                  </div>
                </div>
                <div className="Employees-BusinessEmail-container">
                  <div className="Employees-container">
                    <label className="Employees-label">Employees</label>

                    <RegisterDropDown
                      Placeholder={"Select the Number of Employees"}
                      options={employeesList}
                      value={employees}
                      name="employees"
                      className={
                        isEmployees
                          ? "register-error-Input-container"
                          : "Employees-input"
                      }
                      onChange={(e) => {
                        handleChange(e);
                        validateEmployee(e);
                      }}
                      onSelect={handleSelect} // Pass the handleSelect function here
                    />

                    {isEmployees ? (
                      <p className="register-error-message">
                        <img src={ErrorIcon} alt="" className="error-icon" />
                        &nbsp;Employee is Required
                      </p>
                    ) : (
                      <p className="error-register">&nbsp;</p>
                    )}
                  </div>
                  <div className="BusinessEmail-container">
                    <label className="BusinessEmail-label">
                      Business Email
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Business Email"
                      className={
                        isBusinessEmail
                          ? "register-error-Input-container"
                          : "BusinessEmail-input"
                      }
                      name="businessEmail"
                      value={businessEmail}
                      onChange={(e) => {
                        handleChange(e);
                        validateBuisnessEmail(e);
                      }}
                      autoComplete="off"
                    />
                    {isBusinessEmail ? (
                      <p className="register-error-message">
                        <img src={ErrorIcon} alt="" className="error-icon" />
                        &nbsp;{validateEmail}
                      </p>
                    ) : (
                      <p className="error-register">&nbsp;</p>
                    )}
                  </div>
                </div>
                <div className="PhoneNumber-Country-container">
                  <div className="PhoneNumber-container">
                    <label className="PhoneNumber-label">Phone Number</label>
                    <input
                      type="number"
                      placeholder="Enter Your Phone Number"
                      className={
                        isPhoneNumber
                          ? "register-error-Input-container"
                          : "PhoneNumber-input"
                      }
                      value={phoneNumber}
                      name="phoneNumber"
                      onChange={(e) => {
                        handleChange(e);
                        validatePhoneNumber(e);
                      }}
                      autoComplete="off"
                    />
                    {isPhoneNumber ? (
                      <p className="register-error-message">
                        <img src={ErrorIcon} alt="" className="error-icon" />
                        &nbsp;Phone Number is Required
                      </p>
                    ) : (
                      <p className="error-register">&nbsp;</p>
                    )}
                  </div>
                  <div className="Country-container">
                    <label className="Country-label">Country</label>
                    <RegisterDropDown
                      options={CONSTANTS.countryList.map((country) => {
                        return country.name;
                      })}
                      Placeholder={"Select country"}
                      value={country}
                      name="country"
                      className={
                        isCountry
                          ? "register-error-Input-container"
                          : "Country-input"
                      }
                      onChange={(e) => {
                        handleChange(e);
                        validateEmployee(e);
                      }}
                      onSelect={handleCountrySelect} // Pass the handleSelect function here
                    />
                    {isCountry ? (
                      <p className="register-error-message">
                        <img src={ErrorIcon} alt="" className="error-icon" />
                        &nbsp;Country is Required
                      </p>
                    ) : (
                      <p className="error-register">&nbsp;</p>
                    )}
                  </div>
                </div>

                <div>
                  <span className="checkboxflex">
                    <input
                      type="checkbox"
                      name="agree"
                      value={agree}
                      onChange={(e) => {
                        handleChange(e);
                        validateTerms(e);
                      }}
                    />
                    &nbsp;I agree to the terms of use
                  </span>
                  {IsAgree ? (
                    <p className="register-error-message">
                      <img src={ErrorIcon} alt="" className="error-icon" />
                      &nbsp;Please read & agree for the main services
                    </p>
                  ) : (
                    <p className="error-register">&nbsp;</p>
                  )}
                </div>
                <div className="StartMyFreeBtn">
                  <button className="freeTrialbtn">Start my free Trial</button>
                </div>
              </form>
              <div className="form-div3">
                <span className="footer-regisster-Content">
                  By registering, you confirm that you agree to the storing and
                  processing of <br className="break-tag" />
                  your personal data by DealDox as described in the Privacy
                  Policy
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="ddPvt">
          © {currentYear} DealDox Pvt Ltd • All rights reserved
        </div>
      </div>
    </div>
  );
};
export default NewRegister;
