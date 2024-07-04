import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FaGreaterThan, FaLessThan, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../assets/css/opportunity/OpportunitiesData.css";
import BillingAndShippingAddress from "../../components/common/BillingAndShippingAddress";
import CustomDropdown from "../../components/common/CustomDropdown";
import ErrorMessage from "../../components/common/ErrorMessage";
import SidePanel from "../../components/common/SidePanel";
import HeaderBar from "../../components/common/HeaderBar";
import HelpRequest from "../../components/common/HelpRequest";
import InputTypes from "../../components/common/InputTypes";
import PeopleIconDropdown from "../../components/common/PeopleIconDropdown";
import { CONSTANTS } from "../../constants";
import DataContext from "../../dataContext/DataContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import { commonService, encryptData } from "../../utils/common";
const initialOpportunityData = {
  account_Id: "",
  accounts: "",
  opportunityId: "",
  opportunity_name: "",
  parent_opportunity: "",
  net_price: "",
  margin: "",
  cost: 0,
  stage: "",
  probability: "",
  hours: "",
  close: null,
  start: null,
  duration_weeks: 0,
  owner: "",
  region: "",
  vertical: "",
  practice: "",
  oppCurrency: "",
  org: "",
  opportunity_type: "",
  list_price: "",
  discount: "",
  avgRate: "",
  status: "",
  description: "",
  due_date: null,
  external_references_id1: "",
  external_references_id2: "",
  modified_by: "",
  modifiedAt: "",
  revision: "",
};

const initialBillingAddress = {
  billing_street1: "",
  billing_street2: "",
  billing_city: "",
  billing_state: "",
  billing_zip: "",
  billing_country: "",
  billing_phone: "",
};

const initialShippingAddress = {
  shipping_street1: "",
  shipping_street2: "",
  shipping_city: "",
  shipping_state: "",
  shipping_zip: "",
  shipping_country: "",
  shipping_phone: "",
};
const OpportunitiesData = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const {
    securityRoleData,
    stageLookups,
    verticalLookups,
    practiceLookups,
    regionLookups,
    opportunityTypeLookups,
    permissionTypeLookups,
    setGlobalSearchUpdate,
  } = useContext(DataContext);


  //URL DATA
  const urlParams = new URLSearchParams(window.location.search);
  const permission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].opportunity
      : "";
  if (permission === "none") {
    navigate('/home')
  }

  const quote_add =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].oppor_quote_add
      : "";

  const isReadOnly = permission === "readOnly";
  const isQuoteReadOnly = quote_add === "readOnly" || "none";
  const qouteOpportunityID = urlParams.get("oppID");

  const [peoplewithAccess, setPeopleWithAccess] = useState([]);
  const subOwners =
    peoplewithAccess.length > 0
      ? peoplewithAccess.map(
        (access) => access.first_name + " " + access.last_name
      )
      : [];

  const userName =
    user && user.admin
      ? `${user.admin.firstname} ${user.admin.lastname}`
      : "" || (user && user.people)
        ? `${user.people.first_name} ${user.people.last_name}`
        : "";
  const userName1 =
    user && user.userType === "admin"
      ? `${user.admin.firstname} ${user.admin.lastname}`
      : "" || (user && user.userType === "people")
        ? `${user.people.first_name} ${user.people.last_name}`
        : "";
  const optionOwner = [userName, ...(subOwners || "")];

  const [isDetailOpen, setDetailOpen] = useState(false);
  const [quotesData, setQuotesData] = useState([]);
  const quoteNumber =
    quotesData && quotesData.length > 0
      ? quotesData[quotesData.length - 1].quotes_name
      : "";

  // const [, setSelectedOptioncalender] = useState(null);

  const [deleteClicked, setDeleteClicked] = useState(false);
  const [showDuplicateMessage, setShowDuplicateMessage] = useState(false);
  const deleteButtonRef = useRef(null);
  const [oprtunitySidebar, setoprtunitySidebar] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unsavedChange, setUnchangedSave] = useState(false);
  const [opportunityData, setOpportunityData] = useState(initialOpportunityData);
  const [billingAddress, setBillingAddress] = useState(initialBillingAddress);
  const [shippingAddress, setShippingAddress] = useState(initialShippingAddress);

  // ------------------------------------------------------------------------------------------

  const optionpermissiom = [...permissionTypeLookups];
  const optionopportunitytype = [...opportunityTypeLookups];
  const optionstatus = [
    "REQUESTED",
    "IN PROGRESS",
    "ON HOLD",
    "SUBMITTED",
    "REJECTED",
    "APPORVED",
  ];
  const optionregion = [...regionLookups];
  const optionvertical = [...verticalLookups];
  const optionpractice = [...practiceLookups];
  const optionstage = [...stageLookups];

  const optionorg = [
    "AFRICA",
    "ALL OTHER AP",
    "AP-ALL OTHER",
    "AP-AUS/JP",
    "AP-CHINA",
    "AP-INDIA",
    "ARGENTINA",
    "AUSTRALIA",
  ];

  const handleInputChange = (fieldName, value) => {
    setOpportunityData({ ...opportunityData, [fieldName]: value });
    setUnchangedSave(true);
  };

  const handleSelect = (fieldName, selectedOption) => {
    setOpportunityData({ ...opportunityData, [fieldName]: selectedOption });
    setUnchangedSave(true);
  };
  const handleCalendarStartChange = (date) => {
    setOpportunityData({ ...opportunityData, start: date });
    setUnchangedSave(true);
  };

  const handleCalendarCloseChange = (date) => {
    setOpportunityData({ ...opportunityData, close: date });
    setUnchangedSave(true);
  };
  const handleCalendarDueDateChange = (date) => {
    setOpportunityData({ ...opportunityData, due_date: date });
    setUnchangedSave(true);
  };

  const handleToggledetail = () => {
    setDetailOpen(!isDetailOpen);
  };
  // GET OPPORTUNITY
  useEffect(() => {
    if (user) {
      getQuotesData();
    }
    setAdminId(oppData.setAdminId || oppData._id);
    setOpportunityData({
      account_Id: oppData.account_Id || "",
      accounts: oppData.accounts || "",
      opportunityId: oppData._id || "",
      opportunity_name: oppData.opportunity_name || "",
      parent_opportunity: oppData.parent_opportunity || "",
      net_price: oppData.net_price || "",
      margin: oppData.margin || "",
      cost: oppData.cost || 0,
      stage: oppData.stage || "",
      probability: oppData.probability || "",
      hours: oppData.hours || 0,
      close: oppData.close || null,
      start: oppData.start || null,
      duration_weeks: oppData.duration_weeks || 0,
      owner: oppData.owner || "",
      region: oppData.region || "",
      vertical: oppData.vertical || "",
      practice: oppData.practice || "",
      oppCurrency: oppData.currency || "",
      org: oppData.org || "",
      opportunity_type: oppData.opportunity_type || "",
      list_price: oppData.list_price || "",
      discount: oppData.discount || "",
      avgRate: oppData.avgRate || "",
      status: oppData.status || "",
      description: oppData.description || "",
      due_date: oppData.due_date || null,
      external_references_id1: oppData.external_references_id1 || "",
      external_references_id2: oppData.external_references_id2 || "",
      created_by: oppData.created_by || "",
      createdAt: oppData.createdAt || null,
      modified_by: oppData.modified_by || "",
      modifiedAt: oppData.modifiedAt || "",
      revision: oppData.revision || 0,
    });
    setBillingAddress({
      billing_street1: oppData.billing_street1 || "",
      billing_street2: oppData.billing_street2 || "",
      billing_city: oppData.billing_city || "",
      billing_state: oppData.billing_state || "",
      billing_zip: oppData.billing_zip || "",
      billing_country: oppData.billing_country || "",
      billing_phone: oppData.billing_phone || "",
    });
    setShippingAddress({
      shipping_street1: oppData.shipping_street1 || "",
      shipping_street2: oppData.shipping_street2 || "",
      shipping_city: oppData.shipping_city || "",
      shipping_state: oppData.shipping_state || "",
      shipping_zip: oppData.shipping_zip || "",
      shipping_country: oppData.shipping_country || "",
      shipping_phone: oppData.shipping_phone || "",
    });
  }, [user]);

  //function to get data using oppID received from the quotes page

  function formatDate(dateString) {
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

  const { state: row } = useLocation();
  const oppData = row?.row || {}; // Use an empty object as a fallback

  const acc_opp_id = {
    acc_key: oppData.account_Id || row?.acc_key,
    acc_name: oppData.accounts || row?.acc_name,
    opp_id: oppData._id || row?.opp_id,
    oppName: oppData.opportunity_name || row?.oppName,
    length: quoteNumber || row?.length,
  };

  const accName = acc_opp_id.acc_name;
  const oppName = acc_opp_id.oppName;
  const oppId = acc_opp_id.opp_id;
  const accKey = acc_opp_id.acc_key;

  const handleClick = (id) => {
    const encryptedpersonId = encryptData(id);
    localStorage.setItem("personId", encryptedpersonId);
  };

  const [filteredopportunity, setFilteredopportunity] = useState([]);

  useEffect(() => {
    const getOpportunityData = async () => {
      setIsLoading(true);
      try {
        const response = await commonService(
          "/api/opportunity/getOpp",
          "POST",
          { opp_id: qouteOpportunityID }
        );
        if (response.status === 200) {
          setIsLoading(false);

          setFilteredopportunity(response.data.data);
          const updatedArray = opportunityData.map((item) => {
            const keyMatched = response.find((item2) => item.key === item2.key);
            if (keyMatched) return keyMatched;
            return item;
          });
          setOpportunityData(updatedArray);
        } else {
          // console.log("no Data Founfs");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOpportunityData();
  }, [qouteOpportunityID]);

  useEffect(() => {
    if (filteredopportunity && filteredopportunity.length > 0) {
      const oppData = filteredopportunity[0];
      setAdminId(oppData._id);
      setOpportunityData({
        account_Id: oppData.account_Id || "",
        accounts: oppData.accounts || "",
        opportunityId: oppData._id || "",
        opportunity_name: oppData.opportunity_name || "",
        parent_opportunity: oppData.parent_opportunity || "",
        net_price: oppData.net_price || "",
        margin: oppData.margin || "",
        cost: oppData.cost || 0,
        stage: oppData.stage || "",
        probability: oppData.probability || "",
        hours: oppData.hours || 0,
        close: oppData.close || null,
        start: oppData.start || null,
        duration_weeks: oppData.duration_weeks || 0,
        owner: oppData.owner || "",
        region: oppData.region || "",
        vertical: oppData.vertical || "",
        practice: oppData.practice || "",
        oppCurrency: oppData.currency || "",
        org: oppData.org || "",
        opportunity_type: oppData.opportunity_type || "",
        list_price: oppData.list_price || "",
        discount: oppData.discount || "",
        avgRate: oppData.avgRate || "",
        status: oppData.status || "",
        description: oppData.description || "",
        due_date: oppData.due_date || null,
        external_references_id1: oppData.external_references_id1 || "",
        external_references_id2: oppData.external_references_id2 || "",
        created_by: oppData.created_by || "",
        createdAt: oppData.createdAt || null,
        modified_by: oppData.modified_by || "",
        modifiedAt: oppData.modifiedAt || "",
        revision: oppData.revision || 0,
      });
      setBillingAddress({
        billing_street1: oppData.billing_street1 || "",
        billing_street2: oppData.billing_street2 || "",
        billing_city: oppData.billing_city || "",
        billing_state: oppData.billing_state || "",
        billing_zip: oppData.billing_zip || "",
        billing_country: oppData.billing_country || "",
        billing_phone: oppData.billing_phone || "",
      });
      setShippingAddress({
        shipping_street1: oppData.shipping_street1 || "",
        shipping_street2: oppData.shipping_street2 || "",
        shipping_city: oppData.shipping_city || "",
        shipping_state: oppData.shipping_state || "",
        shipping_zip: oppData.shipping_zip || "",
        shipping_country: oppData.shipping_country || "",
        shipping_phone: oppData.shipping_phone || "",
      });
    }
  }, [filteredopportunity]);

  const [toastShown, setToastShown] = useState(false);
  const revisionCount = opportunityData.revision
    ? opportunityData.revision + 1
    : 1;
  const updatedOppoData = {
    ...opportunityData,
    modified_by: userName1,
    modifiedAt: new Date(),
    revision: revisionCount,
  };
  const newopportunityData = {
    opportunityData: updatedOppoData,
    billingAddress,
    shippingAddress,
  };

  const handleUpdateOpportunity = async () => {
    try {
      const response = await commonService(
        `/api/opportunity/update/${opportunityData.opportunityId}`,
        "PUT",
        newopportunityData
      );
      if (response.status === 200) {
        toast.success("Opportunity updated successfully");
        setGlobalSearchUpdate(true)
        setOpportunityData((prevData) => ({
          ...prevData,
          ...newopportunityData.opportunityData,
        }));
        // navigate("/accounts");
      } else if (response.status === 201) {
        setShowDuplicateMessage(true);
        setTimeout(() => {
          setShowDuplicateMessage(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
    setUnchangedSave(false);
  };

  const deleteOpportunity = async () => {
    if (!deleteClicked) {
      setDeleteClicked(true);
      return;
    }

    if (quotesData && quotesData.length > 0) {
      deleteButtonRef.current.setAttribute(
        "data-gloss",
        "Opportunities has Active Quotes that cannot be deleted"
      );
      deleteButtonRef.current.setAttribute("id", "delete-highlight1");
      return;
    }
    try {
      const response = await commonService(
        `/api/opportunity/delete/${opportunityData.opportunityId}`,
        "DELETE"
      );
      if (response.status === 200) {
        setGlobalSearchUpdate(true)
        toast.success("Opportunity deleted successfully", {
          icon: (
            <span style={{ color: "red" }}>
              <FaTrash />
            </span>
          ),
          className: "custom-toast_delete",
        });
        navigate("/accounts");
      }
    } catch (error) {
      console.error("Error Deleting opportunity:", error);
    }
  };

  //-----------API to get the Quotes Data------------

  const getQuotesData = async () => {
    try {
      const response = await commonService("/api/quotes/get", "POST", {
        acc_key: acc_opp_id.acc_key || opportunityData.account_Id,
        opp_id: acc_opp_id.opp_id || opportunityData.opportunityId,
      });
      if (response) {
        setQuotesData(response.data.data);
      } else {
        // console.log("No Data Found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuotesData();
  }, [opportunityData.account_Id, opportunityData.opportunityId]);

  //-------------------------------start function to get peopleData with access from people table-------------------------------------

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

  //Function to display the date in formate in opportunity close and Start input tag
  function formatDate1(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  const handleCancelDuplicateMessage = () => {
    setShowDuplicateMessage(false);
  };

  const handleOpenooprtunitySidebar = () => {
    setoprtunitySidebar(true);
  };
  const handleCloseSideBar = () => {
    setoprtunitySidebar(false);
  };

  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [deletePopupsVisible, setDeletePopupsVisible] = useState({});
  const [ispopUpDeletQuote, setIspopUpDeletQuote] = useState(false);
  const [deleteQuoteClicked, setDeleteQuoteClicked] = useState(false);

  const contextMenuRef = useRef(null);
  const deleteQuoteRef = useRef(null);
  const popUpDeleteRef = useRef(null);

  const handleOneContextMenu = (e, quotes) => {
    e.preventDefault();
    const clickX = e.clientX;
    setContextMenuPosition({ x: clickX });
    // Close the delete popup for the previous row if it's open
    setDeletePopupsVisible((prevState) => {
      const updatedState = { ...prevState };
      Object.keys(updatedState).forEach((key) => {
        updatedState[key] = false;
      });
      updatedState[quotes._id] = true;
      return updatedState;
    });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Handling click outside context menu
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setDeletePopupsVisible(false);
      }
      // Handling click outside delete quote popup
      if (
        deleteQuoteRef.current &&
        !deleteQuoteRef.current.contains(event.target)
      ) {
        setDeleteQuoteClicked(false);
      }
      // Handling click outside delete button area
      if (
        deleteButtonRef.current &&
        !deleteButtonRef.current.contains(event.target)
      ) {
        setDeleteClicked(false);
      }
    };

    // Adding event listener to the document
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Clean-up function to remove the event listener
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // ----------------DELETE QUOTES API--------------------------

  const handleDeleteQuote = async (quoteId) => {
    if (!deleteQuoteClicked) {
      setDeleteQuoteClicked(true);
      return;
    }
    try {
      const response = await commonService(
        `/api/quotes/delete/${quoteId}`,
        "DELETE"
      );
      if (response.status === 200) {
        setGlobalSearchUpdate(true)
        toast.success("Quote deleted successfully", {
          icon: <FaTrash style={{ color: "red" }} />,
        });
        // Remove the deleted quote from the quotesData state
        const updatedQuotesData = quotesData.filter(
          (quote) => quote._id !== quoteId
        );
        setQuotesData(updatedQuotesData);

      } else {
        throw new Error("Failed to delete quote");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 5;

  // Get current quotes
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = quotesData?.slice(indexOfFirstQuote, indexOfLastQuote);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(quotesData?.length / quotesPerPage); i++) {
    pageNumbers.push(i);
  }

  const areRequiredFieldsFilled = () => {
    return opportunityData.opportunity_name && unsavedChange;
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link to="/home" className="breadcrumbs--link_mid">
              Home
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link
              onClick={() => handleClick(accKey)}
              to={`/accounts?id=${accKey}`}
              className="breadcrumbs--link_mid"
            >
              {/* {currentAccount ? currentAccount.accounts : ""} */}
              {accName}
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link
              to={`/opportunitiesdata?oppID=${oppId}`}
              className="breadcrumbs--link--active"
              state={row}
            >
              {opportunityData.opportunity_name}
            </Link>
          </li>
        </ul>
        <hr className="hr" />
        {showDuplicateMessage && (
          <div className="duplicate_message1">
            This name has been used for another Opportunity
            <span
              className="cancel_icon"
              onClick={handleCancelDuplicateMessage}
            >
              <FaTimes />
            </span>
          </div>
        )}
        <HelpRequest />
      </div>

      <div id="mainpage">
        {isLoading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <div className="loading_page">Loading...</div>
          </div>
        ) : (
          <>
            <div
              className="opportunitydata"
              style={{ width: oprtunitySidebar ? "80%" : "100%" }}
            >
              <div id="opportunitiesheader1">
                <button
                  id="openbtn"
                  onClick={handleOpenooprtunitySidebar}
                  style={{ display: oprtunitySidebar ? "none" : "block" }}
                >
                  {oprtunitySidebar ? <FaGreaterThan /> : <FaLessThan />}
                </button>
                <HeaderBar headerlabel="OPPORTUNITY" />
              </div>
              <div className="dataleft">
                <div id="contentD1">
                  <ErrorMessage
                    type={"text"}
                    label="OPPORTUNITY"
                    showFlaxErrorMessageText={true}
                    errormsg="OPPORTUNITY IS REQUIRED FIELD"
                    value={opportunityData.opportunity_name}
                    onChange={(value) =>
                      handleInputChange("opportunity_name", value)
                    }
                    readOnly={permission === "readOnly"}
                  />
                </div>
                <div className="containerD2">
                  <div id="contentD2">
                    <InputTypes
                      type={"text"}
                      showFlagText={true}
                      TextLabel={"PARENT OPPORTUNITY"}
                      value={opportunityData.parent_opportunity}
                      onChange={(value) =>
                        handleInputChange("parent_opportunity", value)
                      }
                      readOnly={permission === "readOnly"}
                    />
                  </div>
                </div>
                <div className="containerD3">
                  <div id="contentD3">
                    <InputTypes
                      type={"text"}
                      showFlagText={true}
                      TextLabel={"ACCOUNT"}
                      value={accName}
                      readOnly={true}
                    // onChange={(value) => handleInputChange("opportunity_name",value)}
                    />
                  </div>
                  <div id="contentD3A">
                    <div id="contentO62">
                      <CustomDropdown
                        options={optionopportunitytype}
                        onSelect={(selectedOption) =>
                          handleSelect("opportunity_type", selectedOption)
                        }
                        label="OPPORTUNITY TYPE"
                        value={opportunityData.opportunity_type}
                        onChange={(value) =>
                          handleInputChange("opportunity_type", value)
                        }
                        readOnly={permission === "readOnly"}
                      />
                    </div>
                  </div>
                </div>
                <div className="containerD4">
                  <div className="containt03container">
                    <CustomDropdown
                      options={optionstage}
                      onSelect={(selectedOption) =>
                        handleSelect("stage", selectedOption)
                      }
                      label="STAGE"
                      value={opportunityData.stage}
                      onChange={(value) => handleInputChange("stage", value)}
                      readOnly={permission === "readOnly"}
                    />
                  </div>
                  <div id="contentD4PermissionType">
                    <div id="contentD4PermissionType">
                      <CustomDropdown
                        options={optionpermissiom}
                        onSelect={(selectedOption) =>
                          handleSelect("permissionType", selectedOption)
                        }
                        label="PERMISSION TYPE"
                        value={opportunityData.permissionType}
                        onChange={(value) =>
                          handleInputChange("permissionType", value)
                        }
                        readOnly={permission === "readOnly"}
                      />
                    </div>
                  </div>
                </div>
                <div className="containerD5">
                  <div id="contentD5">
                    <InputTypes
                      type={"text"}
                      showFlagText={true}
                      TextLabel={"PROBABILITY"}
                      value={opportunityData.probability}
                      onChange={(value) =>
                        handleInputChange("probability", value)
                      }
                      readOnly={permission === "readOnly"}
                    />
                  </div>
                  <div id="contentD5">
                    <InputTypes
                      showFlagCalender={true}
                      key={`close-${opportunityData.close}`}
                      CalenderLabel={"CLOSE"}
                      selectedDate={formatDate1(opportunityData.close)}
                      onCalendarChange={handleCalendarCloseChange}
                      readOnly={permission === "readOnly"}
                    // placeholder='Close date'
                    />
                  </div>
                  <div id="contentD5">
                    <InputTypes
                      showFlagCalender={true}
                      key={`start-${opportunityData.start}`}
                      CalenderLabel={"START"}
                      selectedDate={formatDate1(opportunityData.start)}
                      onCalendarChange={handleCalendarStartChange}
                      readOnly={permission === "readOnly"}
                    // placeholder='Start Date'
                    />
                  </div>
                </div>
              </div>
              <div className="dataright">
                <div className="containerD6">
                  <div id="contentD6">
                    <InputTypes
                      type={"number"}
                      showFlagText={true}
                      TextLabel={"NET PRICE"}
                      textplaceholder={"$0.00"}
                      value={opportunityData.net_price}
                      onChange={(value) =>
                        handleInputChange("net_price", value)
                      }
                      readOnly={true}
                      greyoutLabelId={"greyoutLabelId"}
                      greyoutInputId={"greyoutInputId"}
                    />
                  </div>
                  <div id="contentD6">
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
                </div>
                <div className="containerD7">
                  <div id="contentD7">
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
                  <div id="contentD7">
                    <InputTypes
                      type={"number"}
                      showFlagText={true}
                      TextLabel={"WEEKS"}
                      textplaceholder={"0%"}
                      value={opportunityData.duration_weeks}
                      onChange={(value) =>
                        handleInputChange("duration_weeks", value)
                      }
                      readOnly={true}
                      greyoutLabelId={"greyoutLabelId"}
                      greyoutInputId={"greyoutInputId"}
                    />
                  </div>
                </div>
                <div className="containerD8">
                  <div id="contentD8">
                    <InputTypes
                      type={"number"}
                      showFlagText={true}
                      TextLabel={"LIST PRICE"}
                      textplaceholder={"$0.00"}
                      value={opportunityData.list_price}
                      onChange={(value) =>
                        handleInputChange("list_price", value)
                      }
                      readOnly={true}
                      greyoutLabelId={"greyoutLabelId"}
                      greyoutInputId={"greyoutInputId"}
                    />
                  </div>
                  <div id="contentD8">
                    <InputTypes
                      type={"number"}
                      showFlagText={true}
                      TextLabel={"DISCOUNT"}
                      textplaceholder={"$0.00"}
                      value={opportunityData.discount}
                      onChange={(value) => handleInputChange("discount", value)}
                      readOnly={true}
                      greyoutLabelId={"greyoutLabelId"}
                      greyoutInputId={"greyoutInputId"}
                    />
                  </div>
                </div>
                <div className="containerD9">
                  <div id="contentD9">
                    <InputTypes
                      type={"number"}
                      showFlagText={true}
                      TextLabel={"HOURS"}
                      textplaceholder={"$0.00"}
                      value={opportunityData.hours}
                      onChange={(value) => handleInputChange("hours", value)}
                      readOnly={true}
                      greyoutLabelId={"greyoutLabelId"}
                      greyoutInputId={"greyoutInputId"}
                    />
                  </div>
                  <div id="contentD9">
                    <InputTypes
                      type={"number"}
                      showFlagText={true}
                      TextLabel={"AVG RATE"}
                      textplaceholder={"$0.00"}
                      value={opportunityData.avgRate}
                      onChange={(value) => handleInputChange("avgRate", value)}
                      readOnly={true}
                      greyoutLabelId={"greyoutLabelId"}
                      greyoutInputId={"greyoutInputId"}
                    />
                  </div>
                </div>
                <div className="containerD10">
                  <div id="contentO61">
                    <div id="contentO61">
                      <CustomDropdown
                        options={optionorg}
                        onSelect={(selectedOption) =>
                          handleSelect("org", selectedOption)
                        }
                        label="ORG"
                        showCancel={true}
                        value={opportunityData.org}
                        onChange={(value) => handleInputChange("org", value)}
                        readOnly={permission === "readOnly"}
                      />
                    </div>
                  </div>
                  <div id="contentD10">
                    <div className="content6container1">
                      <div id="contentO6">
                        <CustomDropdown
                          options={CONSTANTS.optioncurrency}
                          onSelect={(selectedOption) =>
                            handleSelect("oppCurrency", selectedOption)
                          }
                          label="CURRENCY"
                          value={opportunityData.oppCurrency}
                          onChange={(value) =>
                            handleInputChange("currency", value)
                          }
                          readOnly={permission === "readOnly"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*OPPORTUNITY DETAILS  */}
              <div onClick={handleToggledetail}>
                <HeaderBar
                  headerlabel={"DETAILS"}
                  isButtonVisible={true}
                  isDropdownOpen={isDetailOpen}
                />
              </div>
              {isDetailOpen && (
                <div id="oppodetails" className="hidden1">
                  <div className="input_description">
                    {/* <InputTypes
                      type={"text"}
                      showFlagText={true}
                      textplaceholder={"Enter Description"}
                      TexLabel={"DESCRIPTION"}
                      textinputcustom={"input_description_textarea"}
                      textlabelcustom={"description_label"}
                      value={opportunityData.description}
                      onChange={(value) =>
                        handleInputChange("description", value)
                      }

                    /> */}
                    <InputTypes
                      showTextArea={true}
                      TextAreaLabel={"DESCRIPTION"}
                      descriptionPlaceholder={"Enter Description"}
                      descriptionvalue={opportunityData.description}
                      descriptiononChange={(value) =>
                        handleInputChange("description", value)
                      }
                      DesciptionClass={"description-content"}
                    />
                  </div>
                  <div className="containerDleft_data">
                    <div id="contentD12">
                      <PeopleIconDropdown
                        options={optionOwner}
                        label="OWNER"
                        showCharacterMessage={false}
                        value={opportunityData.owner}
                        onChange={(value) => handleInputChange("owner", value)}
                        onSelect={(selectedOption) =>
                          handleSelect("owner", selectedOption)
                        }
                        readOnly={permission === "readOnly"}
                      />
                    </div>
                    <div id="contentD12">
                      <CustomDropdown
                        // onSelect={handleActionSelect1}
                        label="DELIVERY MANAGER"
                        showCancel={true}
                        readOnly={permission === "readOnly"}
                      />
                    </div>

                    <div id="contentD12">
                      <CustomDropdown
                        options={optionregion}
                        onSelect={(selectedOption) =>
                          handleSelect("region", selectedOption)
                        }
                        label="REGION"
                        showCancel={true}
                        readOnly={permission === "readOnly"}
                        value={opportunityData.region}
                        onChange={(value) => handleInputChange("region", value)}
                      />
                    </div>
                    <div id="contentD12">
                      <CustomDropdown
                        options={optionvertical}
                        onSelect={(selectedOption) =>
                          handleSelect("vertical", selectedOption)
                        }
                        label="VERTICAL"
                        showCancel={true}
                        value={opportunityData.vertical}
                        onChange={(value) =>
                          handleInputChange("vertical", value)
                        }
                        readOnly={permission === "readOnly"}
                      />
                    </div>
                  </div>
                  <div className="containerDleft">
                    <div id="contentO5">
                      <InputTypes
                        showFlagCalender={true}
                        key={`duedate-${opportunityData.due_date}`}
                        selectedDate={
                          opportunityData.due_date
                            ? formatDate(opportunityData.due_date)
                            : null
                        }
                        onCalendarChange={handleCalendarDueDateChange}
                        readOnly={permission === "readOnly"}
                        CalenderLabel={"DUE DATE"}
                      />
                    </div>

                    <div id="contentO52">
                      <CustomDropdown
                        options={optionstatus}
                        onSelect={(selectedOption) =>
                          handleSelect("status", selectedOption)
                        }
                        label="STATUS"
                        showCancel={true}
                        readOnly={permission === "readOnly"}
                        value={opportunityData.status}
                        onChange={(value) => handleInputChange("status", value)}
                      />
                    </div>

                    <div id="contentO53">
                      <CustomDropdown
                        options={optionpractice}
                        onSelect={(selectedOption) =>
                          handleSelect("practice", selectedOption)
                        }
                        label="PRACTICE"
                        showCancel={true}
                        value={opportunityData.practice}
                        onChange={(value) =>
                          handleInputChange("practice", value)
                        }
                        readOnly={permission === "readOnly"}
                      />
                    </div>

                    <div id="contentO53">
                      {/* <CustomDropdown
                    options={optiontemplatequote}
                    onSelect={handleActionSelect1}
                    label="TEMPLATE QUOTE"
                    readOnly={permission === "readOnly"}
                  /> */}
                    </div>
                  </div>
                </div>
              )}
              <div>
                <BillingAndShippingAddress
                  billingAddress={billingAddress}
                  setBillingAddress={setBillingAddress}
                  shippingAddress={shippingAddress}
                  setShippingAddress={setShippingAddress}
                  readOnly={permission === "readOnly"}
                  setUnchangedSave={setUnchangedSave}
                />
              </div>
              {/* opportunity quote table */}
              <div className="downloadandreload">
                {/* <div className="downloadquotes">
              <span className="fa fa-file-excel-o" id="excelid" />
              <div>
                <label className="ex_down">DOWNLOAD</label>
              </div>
            </div> */}
                <div className="quoteshead">
                  {quote_add !== "none" && <b>QUOTES</b>}
                </div>
                {/* <div className="reload">
              <span className="fa fa-refresh" id="refreshid" />
              <div>
                <label className="re_load">RELOAD</label>
              </div>
            </div> */}
              </div>
              <div className="listquotes">
                {quote_add !== "none" && (
                  <>
                    {quotesData && currentQuotes.length > 0 ? (
                      <table id="tblStocksQuotes">
                        <tbody>
                          <tr className="ellipsisquotes">
                            <th className="tableHeading">PRIMARY</th>
                            <th className="tableHeading">STATUS</th>
                            <th className="tableHeading">QUOTE</th>
                            <th className="tableHeading">DESCRIPTION</th>
                            <th className="tableHeading">LAST EDITED</th>
                            <th className="tableHeading">BY</th>
                            <th className="tableHeading">NET PRICE</th>
                            <th className="tableHeading">MARGIN</th>
                          </tr>
                          {currentQuotes.map((quotes, index) => (
                            <tr key={index}>
                              <td className="tabledata">{index + 1}</td>
                              <td className="tabledata"></td>
                              <td
                                className="tabledata"
                                onContextMenu={(e) =>
                                  handleOneContextMenu(e, quotes)
                                }
                              >
                                <Link
                                  to={`/guidedselling_new?opportunity=${oppData?._id || acc_opp_id.opp_id
                                    }&template=${quotes.template_type}&quotes=${quotes?._id
                                    }`}
                                  id="tabledatalink"
                                  state={acc_opp_id}
                                >
                                  {quotes.quotes_name}
                                </Link>

                                {deletePopupsVisible[quotes._id] && (
                                  <div
                                    className="contextMenu"
                                    ref={contextMenuRef}
                                    style={{
                                      // top: `${contextMenuPosition.y}px`,
                                      left: `${contextMenuPosition.x}px`,
                                      position: "absolute",
                                    }}
                                    onClick={() => {
                                      setIspopUpDeletQuote(quotes._id);
                                      setDeletePopupsVisible((prevState) => ({
                                        ...prevState,
                                        [quotes._id]: false,
                                      }));
                                    }}
                                  >
                                    <button className="deletequoteopp">
                                      Delete Quote
                                    </button>
                                  </div>
                                )}
                                {ispopUpDeletQuote === quotes._id && (
                                  <>
                                    <div className="backgroundOverlay"></div>
                                    <div className="quoteDeletePopUp">
                                      <div className="quoteFlex">
                                        <FontAwesomeIcon
                                          className="facloseicon"
                                          icon={faClose}
                                          onClick={() => {
                                            setIspopUpDeletQuote(false);
                                          }}
                                        ></FontAwesomeIcon>
                                        <div className="quoteDeletePop">
                                          <span style={{ fontSize: "16px" }}>
                                            Are you sure you want delete quote{" "}
                                            {`${quotes.quotes_name}`}
                                          </span>
                                          <div className="deletecancelquote">
                                            <button
                                              id="update_data"
                                              onClick={() => {
                                                setIspopUpDeletQuote(false);
                                              }}
                                              style={{
                                                fontSize: "11px",
                                                padding: "6px 30px 6px 30px",
                                              }}
                                            >
                                              CANCEL
                                            </button>
                                            <button
                                              id={
                                                deleteQuoteClicked
                                                  ? "delete-highlight"
                                                  : "delete_data"
                                              }
                                              ref={deleteQuoteRef}
                                              onClick={() =>
                                                handleDeleteQuote(quotes._id)
                                              }
                                              style={{
                                                fontSize: "11px",
                                                padding: "6px 15px 6px 15px",
                                              }}
                                            >
                                              DELETE QUOTE
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </td>
                              <td className="tabledata"></td>
                              <td className="tabledata">
                                <Link
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  to={"/guidedselling"}
                                  state={{
                                    template: quotes.template_type,
                                    acc_opp_id: oppData,
                                    quotes: quotes,
                                  }}
                                  id="tabledatalinks"
                                >
                                  {/* {new Date(
                                    quotes.modifiedAt
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })} */}
                                  {formatDate1(quotes.modifiedAt)}
                                  {/* {quotes.modifiedAt} */}
                                </Link>
                              </td>
                              <td className="tabledata"></td>
                              <td className="tabledata"></td>
                              <td className="tabledata"></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p style={{ color: "#ccc", textAlign: "center" }}>
                        No quotes found
                      </p>
                    )}

                    <ul className="pagination_oppo">
                      {pageNumbers.map((number) => (
                        <li key={number} className="page-item">
                          <a
                            onClick={() => paginate(number)}
                            className={
                              currentPage === number
                                ? "active_quotes"
                                : "page-link"
                            }
                          >
                            {number}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <br />
                    <div className="plus-quotes">
                      <Link to="/quotecreation" state={acc_opp_id}>
                        {(quote_add === "access" ||
                          quote_add === "null" ||
                          quote_add === "") && (
                            <FaPlus style={{ color: "267c98" }} />
                          )}
                      </Link>
                    </div>
                  </>
                )}
                <div className="saveandcancel">
                  {!isReadOnly ? (
                    <button
                      id="update_data"
                      type="submit"
                      onClick={handleUpdateOpportunity}
                      disabled={!areRequiredFieldsFilled()}
                    >
                      UPDATE
                    </button>
                  ) : null}
                  {!isReadOnly ? (
                    <button
                      id={deleteClicked ? "delete-highlight" : "delete_data"}
                      ref={deleteButtonRef}
                      type="submit"
                      onClick={deleteOpportunity}
                    >
                      DELETE
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className="oppo_sidepanel"
              style={{
                width: oprtunitySidebar ? "20%" : "0%",
                display: oprtunitySidebar ? "block" : "none",
                height: "100vh",
                position: "sticky",
                top: "70px",
              }}
            >
              <SidePanel
                // showFlagBidTeam={oprtunitySidebar ? true : ""}
                // showFlagFiles={oprtunitySidebar ? true : ""}
                // showFlagNotes={oprtunitySidebar ? true : ""}
                showFlagExternalReference={oprtunitySidebar ? true : ""}
                showFlagTimeStamp={oprtunitySidebar ? true : ""}
                exterRefId1={opportunityData.external_references_id1}
                exterRefId2={opportunityData.external_references_id2}
                createdBy={opportunityData.created_by}
                modifiedBy={opportunityData.modified_by}
                createdAt={formatDate(opportunityData.createdAt)}
                modifiedAt={formatDate(opportunityData.modifiedAt)}
                revision={opportunityData.revision}
                bidTeam={opportunityData.owner}
                onClose={handleCloseSideBar}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default OpportunitiesData;
