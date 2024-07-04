import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import AdminSidebar from "../../layouts/AdminSidebar";
import "../../assets/css/people/People.css";
import "../../assets/css/access/Access.css";
import "react-datepicker/dist/react-datepicker.css";
import CustomDropdown from "../../components/common/CustomDropdown";
import InputTypes from "../../components/common/InputTypes";
import HeaderBar from "../../components/common/HeaderBar";
import ErrorMessage from "../../components/common/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import SidePanel from "../../components/common/SidePanel";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import HelpRequest from "../../components/common/HelpRequest";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";
import Trialaccess from "../../components/common/Trialaccess";
import PeopleWriteFlex from "../../components/common/PeopleWriteFlex";
import { CONSTANTS } from "../../constants";
import PeopleIconDropdown from "../../components/common/PeopleIconDropdown";
import { commonService, decryptData, encryptData } from "../../utils/common";


const People = () => {


  const initialState = {
    profile_id: 0,
    peopleId: "",
    first_name: "",
    last_name: "",
    title: "",
    uid: "",
    emp_id: "",
    emp_ref_id: "",
    email: "",
    phone: "",
    src_sys_usr_name: "",
    city: "",
    region: "",
    country: "",
    revision: 0,
    practice: "",
    manager: "",
    org: "",
    year_of_exp: "",
    year_of_tenure: "",
    crm_status: "",
    contractor: false,
    supplier: "",
    currency: "",
    cost_per_hour: "",
    week_hour: "",
    selectedPersonName: "",
    modified_at: "",
    created_at: "",
    modified_by: "",
    created_by: "",
  };
  const initialFrontend = {
    hasAccess: false,
    isToastActive: false,
    hasAccessPicture: false,
    Access: "",
    hasAccessMessage: true,
    showSaveCancel: false,
    plusIconClicked: false,
    showUpdateDelete: true,
    status: false,
    isLoading: false,
    profilePicture: null,
    toastShownUpdate: false,
  };

  const [state, setState] = useState(initialState);
  const [stateFrontend, setStateFrontend] = useState(initialFrontend);
  const [selectedCloseDate, setSelectedCloseDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [accountOpen, setAccountOpen] = useState(false);
  const [rolesFromDb, setRolesFromDb] = useState([]);
  const [dbPeopleData, setDbPeopleData] = useState([]);
  // const fileInputRef = useRef(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();


  const userName =
    user && user.userType === "admin"
      ? `${user.admin.firstname} ${user.admin.lastname}`
      : "" || (user && user.userType === "people")
      ? `${user.people.first_name} ${user.people.last_name}`
      : "";
  const { securityRoleData, practiceLookups } = useContext(DataContext);

  const peoplePagePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_people
      : "";

  //Block the url jump by the permission of the user
  if (peoplePagePermission === "none") {
    navigate("/home");
  }

  const isReadOnly = peoplePagePermission === "readOnly";
  const optionPractice = [...practiceLookups];
  const optionSupplier = ["DEFAULT"];

  const inputs = [
    { label: "CITY", type: "text", placeholder: "Enter City Name" },
    { label: "REGION", type: "text", placeholder: "Enter Your Region" },
    { label: "COUNTRY", type: "text", placeholder: "Enter Your Country" },
  ];
  // *****************************************OnClick Fronctions***************************************************************
  const handleInputChange = (fieldName, value) => {
    setState({ ...state, [fieldName]: value });
  };
  const handleSelect = (fieldName, selectedOption) => {
    setState({ ...state, [fieldName]: selectedOption });
  };
  const handleCalendarStartChange = (date) => {
    setSelectedStartDate(date);
  };
  const handleCalendarCloseChange = (date) => {
    setSelectedCloseDate(date);
  };
  const handleOpenSideBar = () => {
    setAccountOpen(true);
  };
  const handleCloseSideBar = () => {
    setAccountOpen(false);
  };

  const areRequiredFieldsFilled = () => {
    return (
      state.first_name && state.last_name && state.email && state.week_hour
    );
  };

  // ********************************************CATALOG ROLE FOR PEOPLE*********************************************************
  const [selectedCatalogRoles, setSelectedcatalogRoles] = useState([]);
  const updateSelectedRoles = (selectedRoles) => {
    const roleValues = selectedRoles.map((role) => role.value);
    setSelectedcatalogRoles(roleValues);
  };
  // *********************************************************ADDPEOPLE***************************************************************
  const handleAddPeople = async () => {
    const { first_name, last_name, email, week_hour } = state;
    if (!first_name || !last_name || !email || !week_hour) {
      if (!stateFrontend.isToastActive) {
        toast.success("Please fill the required fields.", {
          onClose: () =>
            setStateFrontend({ ...stateFrontend, isToastActive: false }),
          onOpen: () =>
            setStateFrontend({ ...stateFrontend, isToastActive: true }),
        });
      }
      return;
    }
    if (!state.email.includes("@")) {
      if (!stateFrontend.isToastActive) {
        toast.success("Invalid Email Format !", {
          onClose: () =>
            setStateFrontend({ ...stateFrontend, isToastActive: false }),
          onOpen: () =>
            setStateFrontend({ ...stateFrontend, isToastActive: true }),
        });
      }
      return;
    }

    const profile_id = dbPeopleData.length + 1;
    const newPeopleData = {
      ...state,
      profile_id: profile_id,
      created_by: userName,
      start_date: selectedStartDate,
      end_date: selectedCloseDate,
      created_at: new Date(),
      catalog_role: selectedCatalogRoles,
    };
    try {
      setStateFrontend({ isLoading: true });
      const responseData = await commonService(
        "/api/people/add",
        "POST",
        newPeopleData
      );
      if (responseData.status === 200) {
        console.log(responseData.data);
        toast.success("People Saved Successfully");
        // window.location.reload();
        const encryptPeopleId = encryptData(responseData.data.data.people._id);
        localStorage.setItem("personId", encryptPeopleId);
        localStorage.removeItem("previousPersonId");
        console.log(
          responseData.data.data.people._id,
          localStorage.getItem("personId"),
          localStorage.getItem("previousPersonId"),
          encryptPeopleId
        );

        setDbPeopleData((prevData) => [
          ...prevData,
          responseData.data.data.people,
        ]);
        // setState(newPeopleData);
        setStateFrontend((prevState) => ({
          ...prevState,
          hasAccess: true,
          hasAccessPicture: false,
          hasAccessMessage: true,
          showUpdateDelete: true,
        }));
        setStateFrontend({ isLoading: false });
      } else {
        toast.error(responseData.data.message);
        setStateFrontend((prevState) => ({
          ...prevState,
          hasAccess: true,
          hasAccessPicture: false,
          hasAccessMessage: true,
          showSaveCancel: true,
        }));
      }
    } catch (error) {
      console.log("Error Saving people:", error);
      setStateFrontend({ isLoading: false });
    }
  };
  // *************************************GET PEOPLE DATA*********************************************************************
  useEffect(() => {
    const getPeopledata = async () => {
      try {
        const response = await commonService("/api/people/get", "GET");
        if (response.status === 200) {
          setDbPeopleData(response.data.data);
        } else {
          console.error("Failed to fetch People data");
        }
      } catch (error) {
        console.error("Error fetching People data:", error);
      }
    };
    getPeopledata();
  }, [user]);

  // **********************************************************************************************************************
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  function formatDate1(dateString) {
    if (!dateString) {
      return "";
    }
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

  // *********************************************HANDLE NAVIGATION********************************************************
  const handleNavigation = (selectedId) => {
    const prevId = decryptData(localStorage.getItem("previousPersonId"));
    const currentId = decryptData(localStorage.getItem("personId"));
    // const encryptSelectedId = encryptData(selectedId);/
    if (prevId && currentId) {
      localStorage.removeItem("previousPersonId");
      navigate(`/people-admin-list?id=${prevId}`);
    } else if (currentId) {
      navigate(`/people-admin-list?id=${selectedId}`);
    } else if (prevId) {
      navigate(`/people-admin-list`);
    }
  };

  useEffect(() => {
    handleNavigation(state.peopleId);
  }, [state.peopleId, dbPeopleData]);

  // *********************************ITEM SELECT FUNCTION*****************************************************
  const handleItemSelect = (selectedItem, selectedIndex) => {
    const selectedData =
      selectedIndex !== -1 ? dbPeopleData[selectedIndex] : null;
    console.log(selectedIndex);
    setState(() => ({
      ...initialState,
      ...selectedData,
      peopleId: selectedData?._id || "",
      selectedPersonName: `${selectedData?.first_name[0] || ""} ${
        selectedData?.last_name[0] || ""
      }`,
    }));
    setStateFrontend(() => ({
      ...initialFrontend,
    }));
    setSelectedStartDate(
      selectedData?.start_date ? formatDate(selectedData?.start_date) : null
    );
    setSelectedCloseDate(
      selectedData?.end_date ? formatDate(selectedData?.end_date) : null
    );
    setSelectedcatalogRoles(selectedData?.catalog_role || []);
    setRolesFromDb(selectedData?.catalog_role || []);
    setStateFrontend((stateFrontend) => ({
      ...stateFrontend,
      status: selectedData?.status || false,
      hasAccessMessage: selectedData ? true : false,
      hasAccess: selectedData ? true : false,
      hasAccessPicture: selectedData ? false : true,
      showSaveCancel: selectedData ? false : true,
      showUpdateDelete: selectedData ? true : false,
      plusIconClicked: selectedData ? false : true,
    }));
  };
  // ***********************************************UPDATE PEOPLE******************************************************************
  const handleUpdatePeople = async () => {
    const { first_name, last_name, email, week_hour } = state;

    if (!first_name || !last_name || !email || !week_hour) {
      if (!stateFrontend.isToastActive) {
        toast.error("Please fill the required fields.", {});
      }
      return;
    }
    try {
      const originalPeopledata = dbPeopleData.find(
        (item) => item._id === state.peopleId
      );
      const peopleChanged =
        JSON.stringify(state) !== JSON.stringify(originalPeopledata);

      if (peopleChanged) {
        const revisionCount = state.revision ? state.revision + 1 : 1;
        const updatedPeople = {
          ...state,
          modified_by: userName,
          revision: revisionCount,
          start_date: selectedStartDate,
          end_date: selectedCloseDate,
          modified_at: new Date(),
          catalog_role: selectedCatalogRoles,
        };
        const response = await commonService(
          `/api/people/update/${state.peopleId}`,
          "PUT",
          updatedPeople
        );

        if (response && response.status === 200) {
          setStateFrontend({ isLoading: false });
          setDbPeopleData((prevData) =>
            prevData.map((item) =>
              item._id === state.peopleId ? { ...item, ...updatedPeople } : item
            )
          );
          setState(updatedPeople);
          toast.success("People updated successfully");
          window.location.reload();
        } else {
          toast.error(
            "Kindly verify the domain name in the email as it seems to be invalid."
          );
          setStateFrontend((prevState) => ({
            ...prevState,
            showUpdateDelete: true,
          }));
        }
      }
    } catch (error) {
      console.log(error);
      setStateFrontend({ isLoading: false });
    }
  };

  //*******************************Function To get the data of published Catalog Roles*******************************
  const [catalogRolesData, setCatalogRolesData] = useState([]);
  const catalogRolesdata = async () => {
    try {
      const response = await commonService("/api/roles/get", "GET");
      if (response.status === 200) {
        const publishedRoles = response.data.data.filter(
          (roles) => roles.role_cat_status === "PUBLISHED"
        );
        setCatalogRolesData(publishedRoles);
      } else {
        // console.log("ERROR: ", response.statusText);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    catalogRolesdata();
  }, [user]);
  // saving only the names of roles in the variable for the side panel
  let rolesData =
    catalogRolesData?.length > 0
      ? catalogRolesData.map((roles) => roles.role_name)
      : [];

  //**************************************************PROFILE PICTURE****************************************************

  // const handleProfilePictureClick = () => {
  //   fileInputRef.current.click();
  // };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setStateFrontend((stateFrontend) => ({
  //         ...stateFrontend,
  //         profilePicture: reader.result,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  //***********************************************COMPANY ORG API****************************************************
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
  }, [user]);
  const orgtoaccess = activeAccess
    ? activeAccess.map((access) => {
        if (access.active === true) {
          return access.org_name;
        } else {
          return access.org_name;
        }
      })
    : [];
  // ************************************MANAGER**************************************************************
  const optionmanagerFiltered = dbPeopleData
    .filter(
      (person) =>
        `${person.first_name} ${person.last_name} ${person.profile_id}` !==
          person.manager &&
        `${person.first_name} ${person.last_name} ${person.profile_id}` !==
          `${state.first_name} ${state.last_name} ${state.profile_id}`
    )
    .map(
      (person) =>
        `${person.first_name} ${person.last_name} ${person.profile_id}`
    );
  //*************************************CANCEL CLICK******************************************************************* */
  const handleCancelClick = () => {
    const previous = localStorage.getItem("previousPersonId");
    localStorage.setItem("personId", previous);
    const index = dbPeopleData.findIndex((item) => item._id === previous);
    handleItemSelect(null, index);
  };

  // **********************************************************************************************************

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
              People{" "}
            </Link>
          </li>
        </ul>
        <hr className="hr" />
        <HelpRequest />
      </div>
      <div className="rowpeople">
        <PeopleWriteFlex
          showGrouping={false}
          data={dbPeopleData}
          dataType="people"
          onItemSelect={handleItemSelect}
          permission={peoplePagePermission}
        />
        <div
          className="rightpeople"
          style={{
            width: accountOpen ? "65%" : "80%",
          }}
        >
          <button
            id="openbtn"
            onClick={handleOpenSideBar}
            style={{ display: accountOpen ? "none" : "block" }}
          >
            {accountOpen ? <FaGreaterThan /> : <FaLessThan />}
          </button>
          <HeaderBar headerlabel="PEOPLE" />

          {dbPeopleData.length > 0 || stateFrontend.plusIconClicked ? (
            <div className="people_data">
              <div className="people_profile">
                <>
                  <div className="peopleprofile">
                    {/* <> */}
                    {/* {stateFrontend.hasAccessPicture && ( */}
                    {/* <div> */}
                    {/* <div
                            className="profile_picture"
                            onClick={handleProfilePictureClick}
                          >
                            {stateFrontend.profilePicture ? (
                              <img
                                src={stateFrontend.profilePicture}
                                alt="Profile Picture"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  backgroundColor: "#ffffff",
                                }}
                              />
                            ) : (
                              "Change your profile picture"
                            )}
                          </div> */}
                    {/* <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                          /> */}
                    {/* </div>
                       )}  */}
                    {/* </> */}
                    {/* {stateFrontend.hasAccess && ( */}
                    <div className="profile_icon_people">
                      <div className="icon_name">
                        {state.selectedPersonName
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                        {state.profile_id || ""}
                      </div>
                    </div>
                    </div>
                    {/* )} */}
                    {stateFrontend.status === true && (
                      <div className="peopleaccess">
                        <InputTypes
                          showFlagCheckBox={true}
                          value={stateFrontend.status}
                          readOnly={true}
                          Class_Name={"cusom_check_left"}
                        />
                        <label className="hasaccess">HAS ACCESS</label>
                      </div>
                    )}
                
                  {stateFrontend.status === false &&
                    stateFrontend.hasAccessMessage && (
                    <p
                      style={{
                        textAlign: "center",
                        marginTop: stateFrontend.status ? "16px" : "22px",
                        color: "black",
                        fontWeight: "800",
                        fontSize: "12px",
                      }}
                    >
                      TO MANAGE USER ACCESS, PLEASE GO TO ADMIN ACCESS
                    </p>
                  )}
                </>
              </div>
              <div id="hidepeople">
                <div className="people">
                  <div id="peoplemain">
                    <div className="persondataleft">
                      <p>PERSON</p>
                      <div className="containerPP1">
                        <div id="contentPP1">
                          <ErrorMessage
                            type={"text"}
                            showFlaxErrorMessageText={true}
                            label="FIRST NAME"
                            placeholdersection="Enter First Name"
                            errormsg="FIRST NAME IS A REQUIRED FIELD"
                            value={state.first_name}
                            onChange={(value) =>
                              handleInputChange("first_name", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                        <div id="contentPP2">
                          <ErrorMessage
                            type={"text"}
                            showFlaxErrorMessageText={true}
                            label="LAST NAME"
                            placeholdersection="Enter Last Name"
                            errormsg="LAST NAME IS A REQUIRED FIELD"
                            value={state.last_name}
                            onChange={(value) =>
                              handleInputChange("last_name", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                      </div>
                      <div className="containerPP2">
                        <div id="contentPP3">
                          <InputTypes
                            type={"text"}
                            TextLabel="TITLE"
                            textplaceholder="Enter Title"
                            showFlagText={true}
                            value={state.title}
                            onChange={(value) =>
                              handleInputChange("title", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                        <div id="contentPP4">
                          <InputTypes
                            type={"number"}
                            TextLabel="UID"
                            textplaceholder="Enter UID"
                            showFlagText={true}
                            value={state.uid}
                            onChange={(value) =>
                              handleInputChange("uid", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                      </div>
                      <div className="containerPP3">
                        <div id="contentPP5">
                          <InputTypes
                            type={"text"}
                            TextLabel="EMPLOYEE ID"
                            textplaceholder="Enter Employe ID"
                            showFlagText={true}
                            value={state.emp_id}
                            onChange={(value) =>
                              handleInputChange("emp_id", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                        <div id="contentPP6">
                          <InputTypes
                            type={"text"}
                            TextLabel="EXTERNAL REFERENCE ID"
                            textplaceholder="Enter External Reference ID"
                            showFlagText={true}
                            value={state.emp_ref_id}
                            onChange={(value) =>
                              handleInputChange("emp_ref_id", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                      </div>
                      <div className="containerPP4">
                        <div id="contentPP7">
                          <InputTypes
                            showFlagCalender={true}
                            key={`start-${selectedStartDate}`}
                            CalenderLabel={"STARTED ON"}
                            selectedDate={selectedStartDate}
                            onCalendarChange={handleCalendarStartChange}
                            placeholder="Select a Date"
                            isBorderVisible={false}
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                        <div id="contentPP8">
                          <InputTypes
                            showFlagCalender={true}
                            key={`close-${selectedCloseDate}`}
                            CalenderLabel={"ENDS ON"}
                            selectedDate={selectedCloseDate}
                            onCalendarChange={handleCalendarCloseChange}
                            placeholder="Select a Date"
                            isBorderVisible={false}
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="practicedataright">
                      <p>PRACTICE</p>
                      <div className="containerPP5">
                        <div id="contentPP9">
                          <CustomDropdown
                            label="PRACTICE"
                            Placeholder="Select Practice"
                            onSelect={(selectedOption) =>
                              handleSelect("practice", selectedOption)
                            }
                            options={optionPractice}
                            showCancel={true}
                            value={state.practice}
                            onChange={(value) =>
                              handleInputChange("practice", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                        <div id="contentPP9">
                          <Trialaccess
                            options={orgtoaccess}
                            onSelect={(selectedOption) =>
                              handleSelect("org", selectedOption)
                            }
                            label="ORG"
                            isBorderVisible={false}
                            value={state.org}
                            onChange={(value) =>
                              handleInputChange("org", value)
                            }
                            isMandatory={false}
                            Placeholder="Select Org"
                            readOnly={peoplePagePermission === "readOnly"}
                            activeAccess={activeAccess}
                          />
                        </div>
                      </div>
                      <div id="contentPP11">
                        <PeopleIconDropdown
                          label="MANAGER"
                          onSelect={(selectedOption) =>
                            handleSelect("manager", selectedOption)
                          }
                          options={optionmanagerFiltered}
                          // profileIds={profileId}
                          showCharacterMessage={true}
                          profileIconVisible={true}
                          value={state.manager}
                          readOnly={false}
                          onChange={(value) =>
                            handleInputChange("manager", value)
                          }
                        />
                      </div>
                      <div className="containerPP7">
                        <div id="contentPP12">
                          <InputTypes
                            type={"text"}
                            TextLabel="YEARS OF EXPERIENCE"
                            textplaceholder="Enter Year Of Experience"
                            showFlagText={true}
                            value={state.year_of_exp}
                            onChange={(value) =>
                              handleInputChange("year_of_exp", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                        <div id="contentPP13">
                          <InputTypes
                            type={"text"}
                            TextLabel="YEARS OF TENURE"
                            textplaceholder="Enter Year Of Tenture"
                            showFlagText={true}
                            value={state.year_of_tenure}
                            onChange={(value) =>
                              handleInputChange("year_of_tenure", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                      </div>
                      <div className="containerPP8">
                        <InputTypes
                          type={"text"}
                          TextLabel="CRM STATUS"
                          textplaceholder="Enter CRM Status"
                          showFlagText={true}
                          value={state.crm_status}
                          onChange={(value) =>
                            handleInputChange("crm_status", value)
                          }
                          readOnly={peoplePagePermission === "readOnly"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="peoplemain">
                    <div className="contactdataleft">
                      <p>CONTACT</p>
                      <div className="containerPC1">
                        <div id="contentPC1">
                          <ErrorMessage
                            type={"email"}
                            showFlaxErrorMessageText={true}
                            label="EMAIL"
                            errormsg="EMAIL IS A REQUIRED FIELD"
                            placeholdersection="Enter Your Email"
                            value={state.email}
                            onChange={(value) =>
                              handleInputChange("email", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                        <div id="contentPC2">
                          <InputTypes
                            type={"number"}
                            TextLabel="PHONE"
                            textplaceholder="Enter Your Phone Number"
                            showFlagText={true}
                            value={state.phone}
                            onChange={(value) =>
                              handleInputChange("phone", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                      </div>
                      <div className="containerPC2">
                        <InputTypes
                          type={"text"}
                          TextLabel="SOURCE SYSTEM USER NAME"
                          textplaceholder="Enter Source System User Name"
                          showFlagText={true}
                          value={state.src_sys_usr_name}
                          onChange={(value) =>
                            handleInputChange("src_sys_usr_name", value)
                          }
                          readOnly={peoplePagePermission === "readOnly"}
                        />
                      </div>
                      <div className="containerPC3">
                        {inputs.map((input, index) => (
                          <div key={index}>
                            <InputTypes
                              type={input.type}
                              TextLabel={input.label}
                              textplaceholder={input.placeholder}
                              showFlagText={true}
                              value={state[input.label.toLowerCase()]}
                              onChange={(value) =>
                                handleInputChange(
                                  input.label.toLowerCase(),
                                  value
                                )
                              }
                              readOnly={peoplePagePermission === "readOnly"}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="costdataright">
                      <p>COST</p>
                      <div className="containerPC4">
                        <div id="contentPC7">
                          <InputTypes
                            Checkboxlabel="CONTRACTOR"
                            showFlagCheckBox={true}
                            value={state.contractor}
                            onChange={(value) =>
                              handleInputChange("contractor", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                        <div id="contentPC8">
                          <CustomDropdown
                            label="SUPPLIER"
                            Placeholder="Select Supplier"
                            onSelect={(selectedOption) =>
                              handleSelect("supplier", selectedOption)
                            }
                            options={optionSupplier}
                            showCancel={true}
                            value={state.supplier}
                            onChange={(value) =>
                              handleInputChange("supplier", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                      </div>
                      <div className="containerPC5">
                        <div id="contentPC9">
                          <CustomDropdown
                            label="CURRENCY"
                            Placeholder="Select Currency"
                            onSelect={(selectedOption) =>
                              handleSelect("currency", selectedOption)
                            }
                            options={CONSTANTS.optioncurrency}
                            value={state.currency}
                            onChange={(value) =>
                              handleInputChange("currency", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                        <div id="contentPC10">
                          <InputTypes
                            type={"number"}
                            TextLabel="COST PER HOUR"
                            textplaceholder="Enter Cost Per Hour"
                            value={state.cost_per_hour}
                            showFlagText={true}
                            onChange={(value) =>
                              handleInputChange("cost_per_hour", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                      </div>
                      <div className="containerPC6">
                        <div id="contentPC11">
                          <ErrorMessage
                            type={"number"}
                            showFlaxErrorMessageText={true}
                            label="WEEK HOURS"
                            errormsg="WEEK HOURS IS A REQUIRED FIELD"
                            value={state.week_hour}
                            onChange={(value) =>
                              handleInputChange("week_hour", value)
                            }
                            readOnly={peoplePagePermission === "readOnly"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {!isReadOnly && (
                  <div>
                    {stateFrontend.showSaveCancel && (
                      <div className="buttons_save_cancel">
                        <button id="reset_data" onClick={handleCancelClick}>
                          CANCEL
                        </button>
                        <button
                          id="save_data"
                          onClick={handleAddPeople}
                          disabled={!areRequiredFieldsFilled()}
                        >
                          SAVE NEW PEOPLE
                        </button>
                      </div>
                    )}
                    {stateFrontend.showUpdateDelete && (
                      <div className="buttons_delete_update">
                        <button id="update_data" onClick={handleUpdatePeople}>
                          UPDATE
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div id="accessmsgdiv">
              <label id="accessmsg">
                NO PEOPLES FOUND. PLEASE USE + TO ADD A NEW PEOPLE
              </label>
            </div>
          )}
        </div>
        <div
          className="sidepanel"
          style={{
            width: accountOpen ? "20%" : "0%",
            display: accountOpen ? "block" : "none",
          }}
        >
          <SidePanel
            showFlagRole={accountOpen ? true : ""}
            showFlagTimeStamp={accountOpen ? true : ""}
            catalogRoles={rolesData}
            updateSelectedRoles={updateSelectedRoles}
            DbRoles={rolesFromDb}
            onClose={handleCloseSideBar}
            createdAt={formatDate1(state.created_at)}
            modifiedAt={formatDate1(state.modified_at)}
            createdBy={state.created_by}
            modifiedBy={state.modified_by}
            revision={state.revision}
          />
        </div>
      </div>
      {/* <div id="peoplegridmainheader" style={{ display: "none" }}>
        <div className="peoplegridsubheader">
          <div id="peoplegridheader">
            <Link>PEOPLE LISTING</Link>
          </div>

          <div>
            <button className="refreshbuttpeople">
              <i className="fa fa-refresh" id="refreshdownloadpeople"></i>
              <span id="xlpeoplelabel">RELOAD</span>
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default People;
