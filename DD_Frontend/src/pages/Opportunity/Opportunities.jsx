import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import CustomDropdown from "../../components/common/CustomDropdown";
import InputTypes from "../../components/common/InputTypes";
import ErrorMessage from "../../components/common/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import HeaderBar from "../../components/common/HeaderBar";
import "../../assets/css/opportunity/Opportunities.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import HelpRequest from "../../components/common/HelpRequest";
import SidePanel from "../../components/common/SidePanel";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";
import Trialaccess from "../../components/common/Trialaccess";
import { CONSTANTS } from "../../constants";
import PeopleIconDropdown from "../../components/common/PeopleIconDropdown";
import { commonService, encryptData } from "../../utils/common";
const Opportunities = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const {
    securityRoleData,
    stageLookups,
    verticalLookups,
    practiceLookups,
    regionLookups,
    opportunityTypeLookups,
    setGlobalSearchUpdate,
  } = useContext(DataContext);


  const oppPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].opportunity
      : "";

  if (oppPermission === "none") {
    navigate("/home");
  }

  const [peoplewithAccess, setPeopleWithAccess] = useState([]);
  const subOwners =
    peoplewithAccess.length > 0
      ? peoplewithAccess.map(
          (access) => access.first_name + " " + access.last_name
        )
      : [];
  const userName =
    user && user.admin ? `${user.admin.firstname} ${user.admin.lastname}` : "";
  const optionOwner = [userName, ...(subOwners || "")];

  const userName1 =
    user && user.userType === "admin"
      ? `${user.admin.firstname} ${user.admin.lastname}`
      : "" || (user && user.userType === "people")
      ? `${user.people.first_name} ${user.people.last_name}`
      : "";
  const [opportunityData, setOpportunityData] = useState({
    account_Id: "",
    accounts: "",
    opportunity_name: "",
    net_price: "",
    margin: "",
    cost: 0,
    stage: "",
    probability: "",
    hours: "",
    close: null,
    start: null,
    duration_weeks: 0,
    owner: optionOwner[0] || "",
    region: "",
    vertical: "",
    practice: "",
    oppCurrency: "",
    org: "",
    opportunity_type: "",
    external_references_id1: "",
    external_references_id2: "",
    created_by: "",
    createdAt: "",
    modifiedAt: "",
  });
  const [peopleData, setPeopleData] = useState([]);
  const [showDuplicateMessage, setShowDuplicateMessage] = useState(false);
  const [oprtunitySidebar, setoprtunitySidebar] = useState(false);
  const [dbAccountData, setDbAccountData] = useState([]);
  const [CompanyOrgData, setCompanyOrgData] = useState([]);
  const [activeAccess, setactiveAccess] = useState([]);
  const optionregion = [...regionLookups];
  const optionvertical = [...verticalLookups];
  const optionpractice = [...practiceLookups];
  const optionopportunitytype = [...opportunityTypeLookups];
  const optionstage = [...stageLookups];

  const handleInputChange = (fieldName, value) => {
    setOpportunityData({ ...opportunityData, [fieldName]: value });
  };
  const handleCalendarStartChange = (date) => {
    setOpportunityData({ ...opportunityData, start: date });
  };

  const handleCalendarCloseChange = (date) => {
    setOpportunityData({ ...opportunityData, close: date });
  };

  const handleSelect = (fieldName, selectedOption) => {
    setOpportunityData({ ...opportunityData, [fieldName]: selectedOption });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get("data");
    if (dataParam) {
      const account_key = JSON.parse(decodeURIComponent(dataParam));
      setOpportunityData((prevData) => ({
        ...prevData,
        account_Id: account_key,
      }));
    }
  }, []);

  useEffect(() => {
    const getaccountdata = async () => {
      try {
        const response = await commonService("/api/accounts/get", "GET");
        if (response.status === 200) {
          setDbAccountData(response.data.data);
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getaccountdata();
  }, [user]);

  const currentAccountId = opportunityData.account_Id;
  const currentAccount1 = dbAccountData.find(
    (account) => account._id === currentAccountId
  );
  const accountName = currentAccount1 ? currentAccount1.accounts : "";
  const newOpportunityData = {
    ...opportunityData,
    accounts: accountName,
    created_by: userName1,
    createdAt: new Date(),
  };

  const handleAddOpportunity = async (event) => {
    try {
      const responseData = await commonService("/api/opportunity/add", "POST", {
        newOpportunityData,
      });
      if (responseData.status === 200) {
        const delay = 1000;
        setTimeout(() => {
          const encryptedCurrentId = encryptData(currentAccountId);
          localStorage.setItem("personId", encryptedCurrentId);
          navigate(`/accounts?id=${currentAccountId}`);
        }, delay);
        setGlobalSearchUpdate(true);
        toast.success("Opportunity saved successfully");
      }
      if (responseData.status === 201) {
        setShowDuplicateMessage(true);
        setTimeout(() => {
          setShowDuplicateMessage(false);
        }, 4000);
      }
    } catch (error) {
      console.error("Error adding Opportunity:", error);
    }
  };
  // ---------RESET-----------
  const resetFields = () => {
    setOpportunityData("");
  };

  // --------------------------start function to get peopleData with access from people data -------------------------------------------

  useEffect(() => {
    const getPeopledata = async () => {
      try {
        const response = await commonService("/api/people/getnames", "GET");
        if (response.status === 200) {
          setPeopleWithAccess(response.data.data);
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPeopledata();
  }, [user]);

  useEffect(() => {
    const peopleDatas = Cookies.get("peopleWithAccess");
    if (peopleDatas) {
      try {
        const PeopleUserData = JSON.parse(peopleDatas);
        setPeopleData(PeopleUserData);
      } catch (error) {
        // Handle any potential JSON parsing errors, e.g., invalid JSON format
        console.error("Error parsing the cookie:", error);
      }
    }
  }, []);

  //----------------------------------End of people Functionality--------------------------------------------------

  // Function to check if all required fields are filled
  const areRequiredFieldsFilled = () => {
    return (
      opportunityData.opportunity_name &&
      opportunityData.stage &&
      opportunityData.start &&
      opportunityData.close
    );
  };

  const handleOpenooprtunitySidebar = () => {
    setoprtunitySidebar(true);
  };
  const handleCloseSideBar = () => {
    setoprtunitySidebar(false);
  };
  // company org api

  useEffect(() => {
    const getCompanyOrg = async () => {
      try {
        const response = await commonService("/api/companyOrg/get", "GET");
        if (response.status === 200) {
          setactiveAccess(response.data.data);
          setCompanyOrgData(response.data.data || []);
        } else {
          // console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.log("Error fetching Companyorg data:", error);
      }
    };

    getCompanyOrg();
  }, [user]);

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

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link to="/home" className="breadcrumbs--link">
              HOME
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="/accounts" className="breadcrumbs--link_mid">
              {accountName}
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link className="breadcrumbs--link--active">
              {opportunityData.opportunity_name
                ? opportunityData.opportunity_name
                : "New Opportunity"}
            </Link>
          </li>
        </ul>
        <hr className="hr" />
        <HelpRequest />
      </div>
      <div className="opportunity_container">
        <div className="oppo" style={{ width: "99%" }}>
          <HeaderBar headerlabel="NEW OPPORTUNITY" />
          <div className="containerO1">
            <div id="contentO1">
              <ErrorMessage
                type={"text"}
                label="OPPORTUNITY"
                showFlaxErrorMessageText={true}
                errormsg="OPPORTUNITY IS REQUIRED FIELD"
                value={opportunityData.opportunity_name}
                onChange={(value) =>
                  handleInputChange("opportunity_name", value)
                }
              />
            </div>
          </div>
          <div className="containerO2">
            <div id="contentO2">
              <InputTypes
                type={"number"}
                showFlagText={true}
                TextLabel={"NET PRICE"}
                textplaceholder={"$0.00"}
                value={opportunityData.net_price}
                onChange={(value) => handleInputChange("net_price", value)}
                readOnly={true}
                greyoutLabelId={"greyoutLabelId"}
                greyoutInputId={"greyoutInputId"}
              />
            </div>
            <div id="contentO2">
              <InputTypes
                type={"number"}
                showFlagText={true}
                TextLabel={"MARGIN"}
                textplaceholder={"0%"}
                value={opportunityData.margin}
                onChange={(value) => handleInputChange("margin", value)}
                readOnly={true}
                greyoutLabelId={"greyoutLabelId"}
                greyoutInputId={"greyoutInputId"}
              />
            </div>
            <div id="contentO2">
              <InputTypes
                type={"number"}
                showFlagText={true}
                TextLabel={"COST"}
                textplaceholder={"$0.00"}
                value={opportunityData.cost}
                onChange={(value) => handleInputChange("cost", value)}
                readOnly={true}
                greyoutLabelId={"greyoutLabelId"}
                greyoutInputId={"greyoutInputId"}
              />
            </div>
          </div>
          <div className="containerO3">
            <div id="contentO3">
              <CustomDropdown
                options={optionstage}
                onSelect={(selectedOption) =>
                  handleSelect("stage", selectedOption)
                }
                label="STAGE"
                showCancel={true}
                isBorderVisible={true}
                isMandatory={true}
                value={opportunityData.stage}
                onChange={(value) => handleInputChange("stage", value)}
              />
            </div>
            <div id="contentO3">
              <InputTypes
                type={"number"}
                showFlagText={true}
                TextLabel={"PROBABILITY"}
                textplaceholder={"0%"}
                value={opportunityData.probability}
                onChange={(value) => handleInputChange("probability", value)}
              />
            </div>
            <div id="contentO3">
              <InputTypes
                type={"number"}
                showFlagText={true}
                TextLabel={"HOURS"}
                value={opportunityData.hours}
                onChange={(value) => handleInputChange("hours", value)}
                readOnly={true}
                greyoutLabelId={"greyoutLabelId"}
                greyoutInputId={"greyoutInputId"}
              />
            </div>
          </div>
          <div className="containerO4">
            <div id="contentD5">
              <InputTypes
                showFlagCalender={true}
                key={`close-${opportunityData.close}`}
                CalenderLabel={"CLOSE"}
                selectedDate={opportunityData.close}
                onCalendarChange={handleCalendarCloseChange}
                placeholder="Close date"
                isBorderVisible={true}
              />
            </div>
            <div id="contentD5">
              <InputTypes
                showFlagCalender={true}
                key={`start-${opportunityData.start}`}
                CalenderLabel={"START"}
                selectedDate={opportunityData.start}
                onCalendarChange={handleCalendarStartChange}
                placeholder="Start date"
                isBorderVisible={true}
              />
            </div>
            <div id="contentO4">
              <InputTypes
                type={"text"}
                showFlagText={true}
                TextLabel={"DURATION WEEKS"}
                value={opportunityData.duration_weeks}
                onChange={(value) => handleInputChange("duration_weeks", value)}
                readOnly={true}
                greyoutLabelId={"greyoutLabelId"}
                greyoutInputId={"greyoutInputId"}
              />
            </div>
          </div>
          <b className="generaloppo">GENERAL</b>
          <div className="containerO5">
            <div id="contentO5">
              <PeopleIconDropdown
                options={optionOwner}
                label="OWNER"
                showCharacterMessage={false}
                // profileIds={profileid}
                value={opportunityData.owner}
                onChange={(value) => handleInputChange("owner", value)}
                onSelect={(selectedOption) =>
                  handleSelect("owner", selectedOption)
                }
              />
            </div>
            <div id="contentO5">
              <CustomDropdown
                options={optionregion}
                onSelect={(selectedOption) =>
                  handleSelect("region", selectedOption)
                }
                label="REGION"
                showCancel={true}
                value={opportunityData.region}
                onChange={(value) => handleInputChange("region", value)}
              />
            </div>
            <div id="contentO5">
              <CustomDropdown
                options={optionvertical}
                onSelect={(selectedOption) =>
                  handleSelect("vertical", selectedOption)
                }
                label="VERTICAL"
                showCancel={true}
                value={opportunityData.vertical}
                onChange={(value) => handleInputChange("vertical", value)}
              />
            </div>
            <div id="contentO5">
              <CustomDropdown
                options={optionpractice}
                onSelect={(selectedOption) =>
                  handleSelect("practice", selectedOption)
                }
                label="PRACTICE"
                showCancel={true}
                value={opportunityData.practice}
                onChange={(value) => handleInputChange("practice", value)}
              />
            </div>
          </div>
          <div className="containerO6">
            <div id="contentO6">
              <CustomDropdown
                options={CONSTANTS.optioncurrency}
                onSelect={(selectedOption) =>
                  handleSelect("currency", selectedOption)
                }
                label="CURRENCY"
                value={opportunityData.oppCurrency}
                onChange={(value) => handleInputChange("currency", value)}
              />
            </div>
            <div id="contentO6">
              <Trialaccess
                options={orgtoaccess}
                label="ORG"
                value={opportunityData.org}
                onChange={(value) => handleInputChange("org", value)}
                onSelect={(selectedOption) =>
                  handleSelect("org", selectedOption)
                }
                isMandatory={false}
                Placeholder="Select Org"
                readOnly={false}
                activeAccess={activeAccess}
              />
            </div>
            <div id="contentO6">
              <CustomDropdown
                options={optionopportunitytype}
                label="OPPORTUNITY TYPE"
                showCancel={true}
                value={opportunityData.opportunity_type}
                onChange={(value) =>
                  handleInputChange("opportunity_type", value)
                }
                onSelect={(selectedOption) =>
                  handleSelect("opportunity_type", selectedOption)
                }
              />
            </div>
          </div>
          <div className="saveandcancel_create">
            <button
              id="save_data"
              type="submit"
              style={{ width: "60px" }}
              onClick={handleAddOpportunity}
              disabled={!areRequiredFieldsFilled()}
            >
              SAVE
            </button>
            <button id="reset_data" type="reset" onClick={resetFields}>
              <Link to={`/account`} className="canceloopo">
                CANCEL
              </Link>
            </button>
          </div>
          {showDuplicateMessage && (
            <div className="duplicate_message">
              {`This name has beeen used for another Opportunity`}
            </div>
          )}
        </div>
        {/* <div
          className="oppo_sidepanel"
             style={{
            width: oprtunitySidebar ? "20%" : "0%",
            display: oprtunitySidebar ? "block" : "none",
            height:"100vh",
            position: "sticky",
            top: "70px"
          }}
        >
          <SidePanel
            showFlagBidTeam={oprtunitySidebar ? true : ""}
            showFlagFiles={oprtunitySidebar ? true : ""}
            showFlagNotes={oprtunitySidebar ? true : ""}
            showFlagExternalReference={oprtunitySidebar ? true : ""}
            showFlagTimeStamp={oprtunitySidebar ? true : ""}
            onClose={handleCloseSideBar}
          />
        </div> */}
      </div>
    </div>
  );
};
export default Opportunities;
