import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../layouts/Navbar";
import AdminSidebar from "../../layouts/AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import WriteFlex from "../../components/common/WriteFlex";
import HeaderBar from "../../components/common/HeaderBar";
import InputTypes from "../../components/common/InputTypes";
import CustomDropdown from "../../components/common/CustomDropdown";
import "../../assets/css/access/Access.css";
import "../../assets/css/people/People.css";
import HelpRequest from "../../components/common/HelpRequest";
import { baseUrl } from "../../config";
import { useAuthContext } from "../../hooks/useAuthContext";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaGreaterThan, FaLessThan } from "react-icons/fa";
import SidePanel from "../../components/common/SidePanel";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";
import Trialaccess from "../../components/common/Trialaccess";
import "@fortawesome/fontawesome-free/css/all.css";
import PeopleWriteFlex from "../../components/common/PeopleWriteFlex";
import { CONSTANTS } from "../../constants";
import PeopleIconDropdown from "../../components/common/PeopleIconDropdown";

const Access = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();


  const peopleStatus = user?.people?.first_time_login
    ? user.people.first_time_login
    : "";

  const { securityRoleData } = useContext(DataContext);

  const accessPagePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_access
      : "";

  //Block the url jump by the permission of the user
  if (accessPagePermission === "none") {
    navigate("/home");
  }

  const isReadOnly = accessPagePermission === "readOnly";

  const [profileid, setProfileid] = useState("");
  const [isDropdownOpenextra, setisDropdownOpenextra] = useState(false);
  const [searchValueextra, setSearchValueextra] = useState("");
  const [, setSelectedItemextra] = useState("");
  const [displayvalueextra, setdisplayvalueextra] = useState("");
  const [peopleWithoutAccess, setPeopleWithoutAccess] = useState([]);
  const [peopleWithAccess, setPeopleWithAccess] = useState([]);
  const [securityRoleDatas, setSecurityRoleDatas] = useState([]);
  const [securityRole, setSecurityRole] = useState("");
  const inputrefextra = useRef(null);
  const dropdownRefextra = useRef(null);
  //display and hide the access Page
  const [showAccess, setShowAccess] = useState(false);
  const [status, setStatus] = useState(false);
  const [openLogin, setopenLogin] = useState(false);
  // Edit Page code:
  const [numberVaidate, setNumberValidate] = useState(true);
  const [uppercasevalidate, setUpperCase] = useState(true);
  const [lowercasevalidate, setLowerCase] = useState(true);
  const [splCharacterValidate, setSplCharacter] = useState(true);
  const [lengthvalidate, setLength] = useState(true);
  const [passwordWord, setPasswordWord] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [EmailValidate, setEmailValidate] = useState(true);
  const [cnfPassword, setcnfPassword] = useState("");
  const [NewPassError, setNewPassError] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [retypePassError, setretypePassError] = useState(false);
  const [retypePassword, setretypePassword] = useState("");
  const [labelforRetypePassword, setlabelforRetypePassword] = useState(
    " RE-TYPE NEW PASSWORD"
  );
  const [peopleCreatedAt, setPeopleCreatedAt] = useState(null);
  const [peopleModifiedAt, setPeopleModifiedAt] = useState(null);
  const [peopleCreatedBy, setPeopleCreatedBy] = useState("");
  const [modifiedBy, setPeopleModifiedBy] = useState("");
  const [modificationCount, setModificationCount] = useState(0);
  const [first_time_login, setFirstTimeLogin] = useState(false);

  useEffect(() => {
    const handleClickOutsideroleextra = (event) => {
      const dropdownElement = dropdownRefextra.current;
      const inputElement = inputrefextra.current;
      if (
        dropdownElement &&
        !dropdownElement.contains(event.target) &&
        inputElement &&
        !inputElement.contains(event.target)
      ) {
        setisDropdownOpenextra(false);
      }
    };

    const handleWindowMousedown = (event) => {
      handleClickOutsideroleextra(event);
    };

    window.addEventListener("mousedown", handleWindowMousedown);

    return () => {
      window.removeEventListener("mousedown", handleWindowMousedown);
    };
  }, []);

  const toggledropdownextra = () => {
    setisDropdownOpenextra(!isDropdownOpenextra);
  };

  const handleOptionSelectextra = (optionsextra) => {
    setSelectedItemextra(optionsextra);
    setisDropdownOpenextra(false);

    // Split the optionsextra string into an array of words
    const words = optionsextra.split(" ");

    // Take the first element of the array as the first name
    const firstName = words[0];
    const lastName = words[1];
    const profileid = words[2]; // Assuming profileid is the third element

    // Save the first name using setdisplayvalueextra
    setdisplayvalueextra(firstName);

    document.getElementById("accessshow").style.display = "block";
    var accesslist = document.getElementById("unique");
    accesslist.style.display = "none";

    // Update state with profileid
    setProfileid(profileid);
  };

  let peoplesData =
    peopleWithoutAccess.length > 0
      ? peopleWithoutAccess.map(
        (people) =>
          `${people.first_name} ${people.last_name} ${people.profile_id}`
      )
      : [];


   console.log(peoplesData);   

  const newPeopleData = peopleWithoutAccess.length > 0 ? peopleWithoutAccess.map((peopleData) => peopleData.first_name) : [];
  const newPeopleData2 = peopleWithoutAccess.length > 0 ? peopleWithoutAccess.map((peopleData) => peopleData.last_name) : [];
  const newPeopleData3 = peopleWithoutAccess.length > 0 ? peopleWithoutAccess.map((peopleData) => peopleData.profile_id) : [];  
  const people_ids =  peopleWithoutAccess.length > 0 ? peopleWithoutAccess.map((peopleData) => peopleData._id) : []; 
  
  let peopeldataArray = [...newPeopleData, ...newPeopleData2, ...newPeopleData3, ...people_ids];

  console.log(peopeldataArray);

  //Map only name to DropDown
  const optionsextra = peoplesData;
  const filteredOptionextra = optionsextra.filter((optionsextra) => {
    const isMatch =
      typeof optionsextra === "string" &&
      optionsextra.toLowerCase().includes(searchValueextra.toLowerCase());

    return isMatch;
  });

  const handleSearchChangeextra = (e) => {
    const value = e.target.value;
    setSearchValueextra(value);
    setdisplayvalueextra(value);
  };
  const [, setSecurityOptions] = useState(null);
  const [org, setOrg] = useState("");
  const [timeZone, setTimeZoneOptions] = useState(null);
  const [language, setlanguagesAcessOptions] = useState(null);
  const [notification, setNotificationAcessOptions] = useState(null);
  const [apiIntegrationAccess, setApiIntegrationAccess] = useState(false);
  const [ssoAccess, setSsoAccess] = useState(false);
  const NotificationAcessOptions = ["BY DEALDOX", "BY EMAIL"];

  const handleSecurityListOptions = (selectedOption) => {
    setSecurityRole(selectedOption);
  };
  const handleAccessOrgClick = (selectedOption) => {
    setOrg(selectedOption);
  };
  const handleTimeZoneClick = (selectedOption) => {
    setTimeZoneOptions(selectedOption);
  };
  const updateIntegrationAccess = () => {
    setApiIntegrationAccess(true);
  };
  const updateSSO = () => {
    setSsoAccess(true);
  };
  const handlelanguageAccessOptions = (selectedOption) => {
    setlanguagesAcessOptions(selectedOption);
  };

  const handleNotificationAccessOptions = (selectedOption) => {
    setNotificationAcessOptions(selectedOption);
  };

  const [isDropdownAccessVisible, setDropdownAccessVisible] = useState(true);

  //API to get SecurityRole Name
  const getSecurityRoleData = async () => {
    try {
      let response = await fetch(`${baseUrl}/api/security/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (json) {
        setSecurityRoleDatas(json.data);
      }
    } catch (error) { }
  };

  useEffect(() => {
    getSecurityRoleData();
  }, [user]);

  let securityData =
    securityRoleDatas?.length > 0
      ? securityRoleDatas.map((srole) => srole.role_name)
      : [];

  const securitylistitems = [...securityData];

  //API to get data of the selected person
  const [getSinglePeople, setGetSinglePeople] = useState([]);
  const getPeopleData = async () => {
    try {
      if(displayvalueextra.length > 0){
      const response = await fetch(`${baseUrl}/api/access/getPeople`, {
        method: "POST", // Use POST method for sending data in the request body
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          first_name: displayvalueextra,
          profileId: profileid,
        }),
      });

      if (response.ok) {
        const accessData = await response.json();

        setGetSinglePeople(accessData.data);
      } else {
        // console.log("Error:", response.statusText);
      }
    }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getPeopleData();
  }, [profileid]);

  //End of API

  //Assigning Data of People and assigning into input tag value
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [manager, setManager] = useState("");
  const [uid, setUid] = useState("");
  const [accountSideBar, setAccountSidebar] = useState(false);
  const [orgvalue, setOrgvalue] = useState("");
  const [passExpDate, setPassExpDate] = useState("");
  const handleOpenAccountSideBar = () => {
    setAccountSidebar(true);
  };
  const handleCloseSideBar = () => {
    setAccountSidebar(false);
  };

  useEffect(() => {
    if (Array.isArray(getSinglePeople) && getSinglePeople.length > 0) {
      setFirstName(getSinglePeople[0]?.first_name || "");
      setLastName(getSinglePeople[0]?.last_name || "");
      setEmail(getSinglePeople[0]?.email || "");
      setTitle(getSinglePeople[0]?.title || "");
      setPhone(getSinglePeople[0]?.phone || "");
      setUid(getSinglePeople[0]?.uid || "");
      setManager(getSinglePeople[0]?.manager || "");
      setOrgvalue(getSinglePeople[0]?.orgvalue || "");
      setApiIntegrationAccess(getSinglePeople[0].api_intgr_access || "");
      setSsoAccess(getSinglePeople[0].sso_user || "");
      setSecurityRole(getSinglePeople[0].securityRole || "");
      setPassExpDate(getSinglePeople[0].pass_exp_date || "");
      setOrgvalue(getSinglePeople[0].org || "");
      setTimeZoneOptions(getSinglePeople[0].time_zone || "");
      setlanguagesAcessOptions(getSinglePeople[0].language || "");
      setNotificationAcessOptions(getSinglePeople[0].Notification || "");
      setStatus(getSinglePeople[0].status || 0);
      setFirstTimeLogin(getSinglePeople[0].first_time_login || 0);
    }
  }, [getSinglePeople]);

  //end

  //API to update the security Role of people
  const [toastShown, setToastShown] = useState(false);
  const updatePeople = async () => {
    if (!securityRole) {
      toast.error("Please fill Security Role fields.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/access/updateAccess`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          access: "granted",
          email: email,
          securityRole: securityRole,
          api_intgr_access: apiIntegrationAccess,
          profileid: profileid,
          // sso_user: ssoAccess,
          // pass_exp_date: passExpDate,
          time_zone: timeZone,
          language: language,
          Notification: notification,
          status: true, // Send true directly since you're explicitly updating status here
        }),
      });

      if (response.ok) {
        if (!toastShown) {
          toast.success("Access granted successfully");
          // window.location.href = `/setPassword?securityRole=${securityRole}&email=${email}&access=${"granted"}`;
          const delay = 1000;
          setTimeout(() => {
            window.location.reload();
          }, delay);
          setToastShown(true);
        }
      } else {
        // console.log("Error:", response.statusText);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  function formatDate1(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const createdat = formatDate1(peopleCreatedAt);
  const modifiedat = formatDate1(peopleModifiedAt);

  const handleItemSelect = (selectedItem, selectedIndex) => {
    const selectedData =
      selectedIndex !== -1 ? peopleWithAccess[selectedIndex] : null;
    setFirstName(selectedData?.first_name || "");
    setLastName(selectedData?.last_name || "");
    setEmail(selectedData?.email || "");
    setTitle(selectedData?.title || "");
    setProfileid(selectedData?.profile_id || "");
    setPhone(selectedData?.phone || "");
    setManager(selectedData?.manager || "");
    setUid(selectedData?.uid || "");
    setApiIntegrationAccess(selectedData?.api_intgr_access || "");
    setSsoAccess(selectedData?.sso_user || "");
    setSecurityRole(selectedData?.securityRole || "");
    setPassExpDate(selectedData?.pass_exp_date || "");
    setOrgvalue(selectedData?.org || "");
    setTimeZoneOptions(selectedData?.time_zone || "");
    setlanguagesAcessOptions(selectedData?.language || "");
    setNotificationAcessOptions(selectedData?.Notification || "");
    setPeopleCreatedAt(selectedData?.created_at || "");
    setPeopleModifiedAt(selectedData?.modified_at || "");
    setPeopleCreatedAt(selectedData?.created_at || "");
    setModificationCount(selectedData?.revision || 0);
    setPeopleModifiedBy(selectedData?.modified_by || 0);
    setPeopleCreatedBy(selectedData?.created_by || 0);
    setShowAccess(true);
    setDropdownAccessVisible(false);
    setStatus(selectedData?.status || 0);
    setShowAccess(selectedData ? true : false);
    setDropdownAccessVisible(selectedData ? false : true);
    setFirstTimeLogin(selectedData?.first_time_login || false);
  };

  useEffect(() => {
    const getPeopledata = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/people/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const people = await response.json();
          const peoplewithAccess = people.data.filter(
            (access) => access.access === "granted"
          );
          const peopleWithoutAccess = people.data.filter(
            (access) => access.access != "granted"
          );
          setPeopleWithAccess(peoplewithAccess);
          setPeopleWithoutAccess(peopleWithoutAccess);
        } else {
          // console.log("Error:", response.statusText);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    getPeopledata();
  }, []);

  //API to Remove Access
  const removeAccess = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/access/deleteAccess`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          access: "null",
          email: email,
          status: false, // Send the updated status here
          first_time_login: false,
        }),
      });

      if (response.ok) {
        toast.success("Access Removed Successfully");
        const delay = 500;
        setTimeout(() => {
          window.location.reload();
        }, delay);
      } else {
        // console.log("Error:", response.statusText);
      }
    } catch (error) {
      // console.log(error);
    }
  };

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
      setlabelforRetypePassword(" RE-TYPE NEW PASSWORD");
      setretypePassError(false);
    }
  };
  // ==============================
  // company org api
  const [CompanyOrgData, setCompanyOrgData] = useState([]);
  const [activeAccess, setactiveAccess] = useState([]);

  useEffect(() => {
    const getCompanyOrg = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/companyOrg/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const companyorg = await response.json();
          setactiveAccess(companyorg.data);
          setCompanyOrgData(companyorg.data || []);
        } else {
          // console.log("Error:", response.statusText);
        }
      } catch (error) {
        // console.log("Error fetching Companyorg data:", error);
      }
    };

    getCompanyOrg();
  }, []);

  // const orgtoaccess = activeAccess ? activeAccess.map((access) => access.org_name) : [];
  const orgtoaccess = activeAccess
    ? activeAccess.map((access) => {
      if (access.active === true) {
        return access.org_name;
      } else {
        return access.org_name;
      }
    })
    : [];

  // manager access
  const handleSelectManager = (selectedManager) => {
    setManager(selectedManager);
  };

  const optionmanager = [];
  return (
    <div>
      <Navbar />
      <AdminSidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link to="/home" className="breadcrumbs--link_mid">
              Home
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="/admin-company-profile" className="breadcrumbs--link_mid">
              Admin
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="" className="breadcrumbs--link--active">
              Access
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      {/* ---------------------------- */}
      <HelpRequest />
      <div>
        <div className="rowaccess">
          <PeopleWriteFlex
            showGrouping={false}
            data={peopleWithAccess}
            dataType="peopleWithAccess"
            onItemSelect={handleItemSelect}
            permission={accessPagePermission}
          />

          <div
            className="rightaccess"
           
          >
            {/* <button
              id="openbtn"
              onClick={handleOpenAccountSideBar}
              style={{
                marginRight: accountSideBar ? "17%" : "0%",
                display: accountSideBar ? "none" : "block",
              }}
            >
              {accountSideBar ? <FaGreaterThan /> : <FaLessThan />}
            </button> */}
            <HeaderBar headerlabel="ACCESS" />

            {isDropdownAccessVisible && (
              <div id="unique">
                <input
                  className="extrainput"
                  type="text"
                  onClick={toggledropdownextra}
                  value={displayvalueextra}
                  ref={inputrefextra}
                  onChange={handleSearchChangeextra}
                  autoComplete="new-password"
                />

                <label id="labelextra">SELECT PERSON TO GIVE ACCESS TO </label>

                <i
                  className={`fa fa-caret-${isDropdownOpenextra ? "up" : "down"
                    }`}
                  id="toggleextra"
                  onClick={toggledropdownextra}
                ></i>

                {isDropdownOpenextra && (
                  <ul id="extralist" ref={dropdownRefextra}>
                    {searchValueextra.length < 1 ? (
                      <li id="norextra">PLEASE ENTER 1 OR MORE CHARACTERS</li>
                    ) : (
                      filteredOptionextra.map((option) => {
                        const [firstName, lastName, profileid] =
                          option.split(" ");

                        return (
                          <li
                            id="full"
                            key={profileid} // Assuming each option has a unique ID
                            onClick={() => handleOptionSelectextra(option)}
                          >
                            <div className="profile-iconpeoplelist">
                              <span className="profileidbox">
                                {`${firstName[0]}${lastName[0]}${profileid}`}
                              </span>
                              <span>
                                {firstName} {lastName}
                              </span>
                            </div>
                          </li>
                        );
                      })
                    )}
                  </ul>
                )}
              </div>
            )}
            {/* {bodyAccesVisible && ( */}
            <div
              id="accessshow"
              style={{ display: showAccess ? "block" : "none" }}
            >
              {/* Selected item: {selectedItemextra} */}
              <div className="grid-access">
                <div id="left-grid-access">
                  <div className="profile_icon_people">
                    <div className="icon_name">
                      {`${firstName && firstName.length > 0 ? firstName[0] : ""
                        }${lastName && lastName.length > 0 ? lastName[0] : ""
                        }${profileid}`}
                    </div>
                    {getSinglePeople &&
                      getSinglePeople.length > 0 &&
                      getSinglePeople[0].status === false ? (
                      <></>
                      ) : getSinglePeople &&
                      getSinglePeople.length > 0 &&
                      (getSinglePeople[0].first_time_login === false || "") ? (
                      <>
                        <i
                          className="fa fa-clock"
                          aria-hidden="true"
                          id="left-grid-clock"
                        />
                        <label className="hasaccesstwo">Pending</label>
                      </>
                    ) : (
                      <>
                        <InputTypes
                          showFlagCheckBox={true}
                          customCheckName="defaultaccess"
                          value={first_time_login}
                          readOnly={true}
                        />
                        <label className="hasaccessone">Has Access</label>
                      </>
                    )}
                  </div>
                </div>
                <div id="right-grid-access">
                  <div className="containerAccess1">
                    <div id="contentAccess1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        TextLabel="FIRST NAME"
                        textplaceholder="Enter First Name"
                        value={firstName}
                        readOnly={true}
                        onChange={(value) => setFirstName(value)}
                      />
                    </div>
                    <div id="contentAccess2">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        TextLabel="LAST NAME"
                        textplaceholder="Enter Last Name"
                        value={lastName}
                        readOnly={true}
                        onChange={(value) => setLastName(value)}
                      />
                    </div>
                  </div>
                  <div className="containerAccess2">
                    <div id="contentAccess3">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        TextLabel="TITLE"
                        readOnly={true}
                        // textplaceholder="Enter Title"
                        value={title}
                        onChange={(value) => setTitle(value)}
                      />
                    </div>
                    <div id="contentAccess4">
                      <PeopleIconDropdown
                        label="MANAGER"
                        onSelect={handleSelectManager}
                        options={optionmanager}
                        value={manager}
                        showCharacterMessage={false}
                        readOnly={true}
                        profileIconVisible={true}
                        onChange={(value) => setManager(value)}
                      />
                    </div>
                  </div>
                  <div className="containerAccess3">
                    <div id="contentAccess5">
                      <InputTypes
                        type={"number"}
                        showFlagText={true}
                        TextLabel="PHONE"
                        readOnly={true}
                        value={phone}
                        onChange={(value) => setPhone(value)}
                      />
                    </div>
                    <div id="contentAccess6">
                      <InputTypes
                        type={"email"}
                        showFlagText={true}
                        TextLabel="EMAIL"
                        value={email}
                        readOnly={true}
                        Emailinputcustom="emailcolor"
                        onChange={(value) => setEmail(value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="containerAccess4">
                <div id="contentAccess7">
                  <button
                    id="removeaccess"
                    type="reset"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={removeAccess}
                    disabled={isReadOnly}
                  >
                    REMOVE ACCESS
                  </button>
                  <button
                    id="resendemail"
                    type="submit"
                    style={{ color: "rgb(0, 79, 128)", cursor: "pointer" }}
                    onClick={updatePeople}
                    disabled={isReadOnly}
                  >
                    RESEND EMAIL
                  </button>
                </div>
                <div id="contentAccess8">
                  <InputTypes
                    showFlagNumber={true}
                    NumberLabel="UID"
                    readOnly={true}
                    // numberplaceholder="Enter UID"
                    value={uid}
                    onChange={(value) => setUid(value)}
                  />
                </div>
              </div>

              <div className="containerAccess5">
                <div className="role1">
                  <h4>ROLE</h4>
                </div>
                <div className="roles1">
                  Roles are defined in the Admin Security section on the left
                </div>
              </div>
              <div className="containerAccess6">
                <div id="contentAccess9">
                  <InputTypes
                    showFlagCheckBox={true}
                    Checkboxlabel="API/INTEGRATION ACCESS ONLY"
                    checkmarkbox="checkmarkboxaccess"
                    checklabelcustom="checkcustom"
                    customCheckName="defaultcheck"
                    value={apiIntegrationAccess}
                    onClick={updateIntegrationAccess}
                    onChange={(value) => setApiIntegrationAccess(value)}
                    readOnly={true}
                  />
                  <div className="checkBoxAccess">
                    <InputTypes
                      showFlagCheckBox={true}
                      Checkboxlabel="SSO USER ONLY"
                      checkboxlabel="checkcustom"
                      checklabelcustom="checkcustom"
                      customCheckName="defaultcheck"
                      onClick={updateSSO}
                      value={ssoAccess}
                      onChange={(value) => setSsoAccess(value)}
                      readOnly={true}
                    />
                  </div>
                </div>

                <div id="contentAccess10">
                  <button id="deleteandtoken" type="reset">
                    DELETE REFRESH TOKEN
                  </button>
                </div>
              </div>
              <div className="containerAccess7">
                <div id="contentAccess11">
                  <CustomDropdown
                    options={securitylistitems}
                    onSelect={handleSecurityListOptions}
                    label="SECURITY ROLE"
                    value={securityRole}
                    onChange={(value) => setSecurityRole(value)}
                    isBorderVisible={true}
                    isMandatory={true}
                    readOnly={accessPagePermission === "readOnly"}
                  />
                </div>

                <div id="contentAccess12">
                  <InputTypes
                    type={"text"}
                    showFlagText={true}
                    TextLabel="PASSWORD EXPIRATION DATE"
                    // numberplaceholder="Enter expiry date"
                    onfocus="(this.type='date')"
                    value={passExpDate}
                    onChange={(value) => setPassExpDate(value)}
                    readOnly={accessPagePermission === "readOnly"}
                  />
                </div>
              </div>
              <div className="refernce1">
                <h4>PREFERENCES</h4>
              </div>

              <div className="containerAccess8">
                <div id="contentAccess13">
                  <Trialaccess
                    options={orgtoaccess}
                    onSelect={handleAccessOrgClick}
                    label="ORG"
                    isBorderVisible={false}
                    value={orgvalue}
                    onChange={(value) => setOrg(value)}
                    isMandatory={false}
                    Placeholder="Select Org"
                    // readOnly={false}
                    activeAccess={activeAccess}
                    readOnly={accessPagePermission === "readOnly"}
                  // isActive={isActive}
                  />
                </div>

                <div id="contentAccess14">
                  <CustomDropdown
                    options={CONSTANTS.timeZoneOptions}
                    onSelect={handleTimeZoneClick}
                    placeholder="select Time Zone"
                    label="TIME ZONE"
                    showCancel={true}
                    value={timeZone}
                    onChange={(value) => setTimeZoneOptions(value)}
                    readOnly={accessPagePermission === "readOnly"}
                  />
                </div>
              </div>
              <div className="containerAccess9">
                <div id="contentAccess15">
                  <CustomDropdown
                    options={CONSTANTS.languagesOptions}
                    onSelect={handlelanguageAccessOptions}
                    label="LANGUAGE"
                    placeholder="Select Language"
                    value={language}
                    onChange={(value) => setlanguagesAcessOptions(value)}
                    readOnly={accessPagePermission === "readOnly"}
                  />
                </div>
                <div id="contentAccess16">
                  <CustomDropdown
                    options={NotificationAcessOptions}
                    onSelect={handleNotificationAccessOptions}
                    label="NOTIFICATIONS"
                    placeholder="Select Notification"
                    showCancel={true}
                    value={notification}
                    onChange={(value) => setNotificationAcessOptions(value)}
                    readOnly={accessPagePermission === "readOnly"}
                  />
                </div>
              </div>
              {openLogin ? (
                <div className="acesscontainer">
                  <div className="login-heading">
                    <span>LOGIN EMAIL & PASSWORD</span>
                  </div>
                  <br />
                  <div className="sub-container">
                    <div className="left-sub-container">
                      <div className="email-input-box">
                        <input
                          type="text"
                          className="email-input"
                          autoComplete="off"
                          value={email}
                          readOnly={true}
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
                            NewPassError
                              ? "error-password-input"
                              : "passwords-input"
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
                            NewPassError
                              ? "password-redLabel"
                              : "password-label"
                          }
                        >
                          {NewPassError
                            ? "Password is Required"
                            : "NEW PASSWORD"}
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
                            retypePassError
                              ? "password-redLabel"
                              : "password-label"
                          }
                        >
                          {labelforRetypePassword}
                        </label>
                      </div>
                    </div>
                    <div className="right-sub-container">
                      <div className="rightside-content">
                        <span className="content">
                          Please make sure your password meets all the
                          requirements mentioned below. <br />
                          Also, your new password cannot be any of your previous
                          passwords
                        </span>
                      </div>
                      <div className="text-inputs">
                        <span
                          className={numberVaidate ? "validate" : "notValidate"}
                        >
                          1.Has one or more numbers
                        </span>
                        <span
                          className={
                            uppercasevalidate ? "validate" : "notValidate"
                          }
                        >
                          2.Has one or more upper case latters
                        </span>
                        <span
                          className={
                            lowercasevalidate ? "validate" : "notValidate"
                          }
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
                        <span
                          className={EmailValidate ? "validate" : "notValidate"}
                        >
                          5.Cannot contain the email:{emailInput}(case
                          insensitive)
                        </span>
                        <span
                          className={passwordWord ? "validate" : "notValidate"}
                        >
                          6.Cannot contain the word password "password"(case
                          insensitive){" "}
                        </span>
                        <span
                          className={
                            lengthvalidate ? "validate" : "notValidate"
                          }
                        >
                          7.Between 12 and 100 characters
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="cancelsavebuttons">
                    <button
                      className="savebuttons"
                      onClick={() => {
                        setopenLogin(false);
                      }}
                    >
                      CANCEL
                    </button>
                    <button className="cancelButtons">SAVE</button>
                  </div>
                </div>
              ) : (
                <div className="login_email_div">
                  <div className="loginDivss">
                    <div className="loginemailpswd">
                      <h4>LOGIN EMAIL &amp; PASSWORD</h4>
                    </div>
                    <div className="login_email_msg">
                      <i>
                        Cannot update password untill the Account is activated
                      </i>
                    </div>
                  </div>
                  <div>
                    <button
                      className="loginEditButton"
                      onClick={() => setopenLogin(true)}
                      disabled={isReadOnly}
                      style={{ cursor: "pointer" }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
              {/* {!isReadOnly && ( */}
              <div className="loginEml">
                <h4>Login Email: </h4>
                {status ? (
                  <p>{email}</p>
                ) : (
                  <button
                    className="SendEmailAcess"
                    id="update_data"
                    onClick={updatePeople}
                  >
                    SEND EMAIL
                  </button>
                )}
              </div>
              {/* )} */}
            </div>
          </div>
          {/* <div
            className="sidepanel"
            style={{
              width: accountSideBar ? "20%" : "0%",
              display: accountSideBar ? "block" : "none",
            }}
          >
            <SidePanel
              showFlagTimeStamp={accountSideBar ? true : ""}
              onClose={handleCloseSideBar}
              createdAt={createdat}
              modifiedAt={modifiedat}
              createdBy={peopleCreatedBy}
              modifiedBy={modifiedBy}
              revision={modificationCount}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Access;
