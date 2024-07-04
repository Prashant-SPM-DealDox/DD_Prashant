import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FaGreaterThan, FaLessThan, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/accounts/Accounts.css";
import BillingAndShippingAddress from "../../components/common/BillingAndShippingAddress";
import CustomDropdown from "../../components/common/CustomDropdown";
import ErrorMessage from "../../components/common/ErrorMessage";
import HeaderBar from "../../components/common/HeaderBar";
import HelpRequest from "../../components/common/HelpRequest";
import InputTypes from "../../components/common/InputTypes";
import PeopleIconDropdown from "../../components/common/PeopleIconDropdown";
import SidePanel from "../../components/common/SidePanel";
import WriteFlexAll from "../../components/common/WriteFlexAll";
import DataContext from "../../dataContext/DataContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import { commonService, encryptData } from "../../utils/common";
import Addinfo from "../../components/addinfo/Addinfo";

const initialAccountData = {
  accountId: "",
  accounts: "",
  owner: "",
  parentAccount: "",
  description: "",
  region: "",
  industry: "",
  vertical: "",
  type: "",
  external_references_id1: "",
  external_references_id2: "",
  crm_reference: "",
  created_by: "",
  modified_by: "",
  createdAt: "",
  modifiedAt: "",
  revision: 0,
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
const Account = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const urlAccountId = new URLSearchParams(window.location.search).get("id");


  const {
    securityRoleData,
    verticalLookups,
    regionLookups,
    typeLookups,
    industryLookups,
    setGlobalSearchUpdate,
  } = useContext(DataContext);



  const permission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].account
      : "";


  if (permission === "none") {
    navigate("/home");
  }

  const oppPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].opportunity
      : "";

  const isReadOnly = permission === "readOnly";

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
        ? `${user.people.first_name}${user.people.last_name}`
        : "";
  const userName1 =
    user && user.userType === "admin"
      ? `${user.admin.firstname} ${user.admin.lastname}`
      : "" || (user && user.userType === "people")
        ? `${user.people.first_name} ${user.people.last_name}`
        : "";

  const optionOwner = [userName, ...(subOwners || "")];

  const [isLoading, setIsLoading] = useState(false);
  const [accountData, setAccountData] = useState(initialAccountData);
  const [billingAddress, setBillingAddress] = useState(initialBillingAddress);
  const [shippingAddress, setShippingAddress] = useState(initialShippingAddress);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [accountSideBar, setAccountSidebar] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [rows, setOpportunityData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [showOppopagination, setShowOppopagination] = useState(true);
  const [showSaveCancel, setShowSaveCancel] = useState(false);
  const [plusIconClicked, setPlusIconClicked] = useState(false);
  const [dbAccountData, setDbAccountData] = useState([]);
  const [unsavedChange, setUnchangedSave] = useState(false);
  const { accountIds } = useParams();
  const deleteButtonRef = useRef(null);
  const [customFields, setCustomFields] = useState([]);
  const [dynamicFields, setDynamicFields] = useState({})

  const handleCustomFieldsChange = (fields) => {
    setCustomFields(fields);
  };

  const handleDynamicFieldsChange = (fields) => {
    setDynamicFields(fields);
  };

  const handleOpenAccountSideBar = () => {
    setAccountSidebar(true);
  };

  const handleCloseSideBar = () => {
    setAccountSidebar(false);
  };

  const handleInputChange = (fieldName, value) => {
    setAccountData({ ...accountData, [fieldName]: value });
    setUnchangedSave(true);
  };

  const handleSelect = (fieldName, selectedOption) => {
    setAccountData({ ...accountData, [fieldName]: selectedOption });
    setUnchangedSave(true);
  };

  const handleItemSelect = (selectedItem, selectedIndex) => {
    const selectedData =
      selectedIndex !== -1 ? dbAccountData[selectedIndex] : null;
    setAccountData({
      ...initialAccountData,
      accountId: selectedData?._id || "",
      owner: selectedData?.owner || optionOwner[0],
      ...selectedData,
    });
    setDynamicFields(selectedData?.dynamicFields || {})
    setBillingAddress({
      ...initialBillingAddress,
      ...selectedData,
    });
    setShippingAddress({
      ...initialShippingAddress,
      ...selectedData,
    });

    setShowOppopagination(selectedData ? true : false);
    setShowSaveCancel(selectedData ? false : true);
    setPlusIconClicked(selectedData ? false : true);
    setShowSidePanel(selectedData ? true : false);
    setUnchangedSave(selectedData ? false : true);
  };
  const handleNavigation = (selectedId) => {
    const prevId = localStorage.getItem("previousPersonId");
    const currentId = localStorage.getItem("personId");
    if (prevId && currentId) {
      localStorage.removeItem("previousPersonId");
      navigate(`/accounts?id=${prevId}`);
    } else if (currentId) {
      navigate(`/accounts?id=${selectedId}`);
    } else if (prevId) {
      navigate(`/accounts`);
    }
  };

  useEffect(() => {
    handleNavigation(accountData.accountId);
  }, [accountData]);

  const handleRowClick = async (row) => {
    try {
      navigate(`/opportunitiesdata?oppID=${row._id}`, { state: { row } });
    } catch (error) {
      console.log(error);
    }
  };

  const renderTableRows = () => {
    // Calculate indexes for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Slice the opportunity data for the current page
    const currentOpportunityData = rows.slice(startIndex, endIndex);
    // Render table rows
    return currentOpportunityData.map((row, index) => (
      <tr key={index}>
        <td onClick={() => handleRowClick(row)} className="oppo_name">
          {row.opportunity_name}
        </td>
        <td>{row.quote}</td>
        <td>{row.stage}</td>
        <td>
          {new Date(row.close).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </td>
        <td>{row.owner}</td>
        <td>{row.revenue}</td>
        <td>{row.margin}</td>
      </tr>
    ));
  };

  const renderPagination = () => {
    // Calculate the total number of pages
    const totalPages = Math.ceil(rows.length / itemsPerPage);
    return (
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  const optionRegion = [...regionLookups];
  const optionIndustry = [...industryLookups];
  const optionVertical = [...verticalLookups];
  const optionType = [...typeLookups];

  const getUpdatedData = () => {
    const accountDataToUpdate = {
      accountId: accountData.accountId,
      accounts: accountData.accounts,
      owner: accountData.owner,
      parentAccount: accountData.parentAccount,
      description: accountData.description,
      region: accountData.region,
      industry: accountData.industry,
      vertical: accountData.vertical,
      type: accountData.type,
      created_by: accountData.created_by,
      modified_by: accountData.modified_by,
      createdAt: accountData.createdAt,
      modifiedAt: accountData.modifiedAt,
      revision: accountData.revision,
    };

    const billingAddressToUpdate = {
      billing_street1: billingAddress.billing_street1,
      billing_street2: billingAddress.billing_street2,
      billing_city: billingAddress.billing_city,
      billing_state: billingAddress.billing_state,
      billing_zip: billingAddress.billing_zip,
      billing_country: billingAddress.billing_country,
      billing_phone: billingAddress.billing_phone,
    };

    const shippingAddressToUpdate = {
      shipping_street1: shippingAddress.shipping_street1,
      shipping_street2: shippingAddress.shipping_street2,
      shipping_city: shippingAddress.shipping_city,
      shipping_state: shippingAddress.shipping_state,
      shipping_zip: shippingAddress.shipping_zip,
      shipping_country: shippingAddress.shipping_country,
      shipping_phone: shippingAddress.shipping_phone,
    };

    const newCustomFields = customFields.filter(field => field.fieldName !== '' && field.fieldType !== '')
    setCustomFields(newCustomFields);

    newCustomFields.map(field => {
      const { fieldName, fieldType } = field;
      if (dynamicFields.hasOwnProperty(fieldName)) {
        if (fieldType === 'TEXT' && typeof dynamicFields[fieldName] !== 'string') {
          delete dynamicFields[fieldName];
        } else if (fieldType === 'BOOLEAN' && typeof dynamicFields[fieldName] !== 'boolean') {
          delete dynamicFields[fieldName];
        } else if (fieldType === 'DATE' && typeof dynamicFields[fieldName] !== 'object') {
          const formattedDate = new Date(dynamicFields[fieldName])
          if (isNaN(formattedDate.getTime()) || typeof dynamicFields[fieldName] === 'boolean') {
            delete dynamicFields[fieldName];
          } else {
            dynamicFields[fieldName] = formattedDate.toISOString().split('T')[0];
          }
        }
      } else {
        delete dynamicFields[fieldName];
      }
    });

    return {
      accountData: accountDataToUpdate,
      billingAddress: billingAddressToUpdate,
      shippingAddress: shippingAddressToUpdate,
      customFields: newCustomFields,
      dynamicFields: dynamicFields
    };
  };

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
  // --------------SAVE ACCOUNT-----------------
  const handleAddAccount = async () => {
    setIsLoading(true);
    try {
      const newAccountData = getUpdatedData();
      newAccountData.accountData.created_by = userName1;
      newAccountData.accountData.createdAt = new Date();
      const responseData = await commonService(
        "/api/accounts/add",
        "POST",
        newAccountData
      );
      if (responseData.status === 200) {
        setIsLoading(false);
        toast.success("Account added successfully");
        setGlobalSearchUpdate(true)
        const encryptAccountId = encryptData(
          responseData.data.data.accounts_data._id
        );
        localStorage.setItem("personId", encryptAccountId);
        localStorage.removeItem("previousPersonId");
        setDbAccountData((prevAccounts) => [
          ...prevAccounts,
          responseData.data.data.accounts_data,
        ]);
      }
      if (responseData.status === 201) {
        setIsLoading(false);
        toast.error(responseData.data.message);
      }
    } catch (error) {
      console.error("Error adding account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //-------------------- GET ACCOUNT----------------------
  useEffect(() => {
    const getaccountdata = async () => {
      try {
        setIsLoading(true);
        const response = await commonService("/api/accounts/get", "GET");
        if (response.status == 200) {
          setIsLoading(false);
          setDbAccountData(response.data.data);
          // Update state with filtered accounts
          const filtered = response.data.data.filter(
            (acc) => acc._id === accountIds
          );
          setFilteredAccounts(filtered);
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error fetching account data:", error);
      }
    };
    getaccountdata();
  }, [user, accountIds]);

  useEffect(() => {
    const getAllAddInfo = async () => {
      try {
        setIsLoading(true);
        const response = await commonService("/api/accounts/getAllAddInfo", "GET");
        if (response.status == 200) {
          setIsLoading(false);
          setCustomFields(response.data.customFields)
        } else {
          console.log("Error");
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error fetching account data:", error);
      }
    }
    getAllAddInfo();
  }, [])
  console.log(customFields);

  //------------UPDATE ACCOUNT-------------------------------

  const handleUpdateAccount = async () => {
    try {

      const updatedData = getUpdatedData();
      console.log(updatedData);
      updatedData.accountData.modified_by = userName1;
      updatedData.accountData.modifiedAt = new Date();
      updatedData.accountData.revision = accountData.revision + 1;
      const response = await commonService(
        `/api/accounts/update/${accountData.accountId}`,
        "PUT",
        updatedData
      );
      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Account updated successfully");
        setGlobalSearchUpdate(true)
        setDbAccountData((prevAccounts) => {
          const updatedAccounts = prevAccounts.map((account) => {
            if (account._id === accountData.accountId) {
              return {
                ...account,
                ...updatedData.accountData,
                ...updatedData.billingAddress,
                ...updatedData.shippingAddress,
                customFields
              };
            }
            return account;
          });
          return updatedAccounts;
        });
      }
      if (response.status === 201) {

        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // ------------------DELETE ACCOUNT------------------------
  const handelDeleteAccount = async () => {
    if (!deleteClicked) {
      setDeleteClicked(true);
      return;
    }
    if (rows.length > 0) {
      deleteButtonRef.current.setAttribute(
        "data-gloss",
        "Account has Opportunities that cannot be deleted"
      );
      deleteButtonRef.current.setAttribute("id", "delete-highlight1");
      return;
    }
    setIsLoading(true);
    try {
      const response = await commonService(
        `/api/accounts/delete/${accountData.accountId}`,
        "DELETE"
      );
      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Account deleted successfully", {
          icon: (
            <span style={{ color: "red" }}>
              <FaTrash />
            </span>
          ),
          className: "custom-toast_delete",
        });
        setGlobalSearchUpdate(true)
        setDbAccountData((prevAccount) =>
          prevAccount.filter((item) => item._id !== accountData.accountId)
        );
        handleItemSelect();
        setDeleteClicked(false);
      } else {
        throw new Error("Error Deleting Account");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error Deleting Account:", error);
    }
  };

  //ACCOUNT API's END
  //****************************************Opportunity section start ***************************************

  useEffect(() => {
    if (urlAccountId !== "") {
      const getOpportunityData = async () => {
        try {
          const response = await commonService("/api/opportunity/get", "POST", {
            account_Id: urlAccountId,
          });
          if (response.status === 200) {
            setOpportunityData(response.data.data);
          } else {
            console.log("Error:", response.statusText);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getOpportunityData();
    }
  }, [urlAccountId]);

  //------------------------------------------------------------------------------------------------

  const areRequiredFieldsFilled = () => {
    return accountData.accounts && accountData.owner && unsavedChange;
  };

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
  // ---------CANCEL ACCOUNT-------------------------

  const handleCancelClick = () => {
    navigate(`/home`);
    // const previous = localStorage.getItem("previousPersonId");
    // localStorage.setItem("personId", previous);
    // const index = dbAccountData.findIndex((item) => item._id === previous);
    // handleItemSelect(null, index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        deleteButtonRef.current &&
        !deleteButtonRef.current.contains(event.target)
      ) {
        setDeleteClicked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ************************************************************************************************************

  console.log(customFields);
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="bread">
        <ul className="breadcrumbs" id="accountbreadcrumbs">
          <div id="breadDiv1">
            <li className="breadcrumbs--item">
              <Link to="/home" className="breadcrumbs--link_mid">
                Home
              </Link>
            </li>
            <li className="breadcrumbs--item">
              <Link to="/accounts" className="breadcrumbs--link--active">
                {accountData.accounts ? accountData.accounts : "New Account"}
              </Link>
            </li>
          </div>
          <div id="breadDiv2">
            <Link to="#">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="accountpen"
                style={{
                  backgroundColor: "rgb(33, 108, 152)",
                  color: "white",
                  fontSize: "10px",
                  padding: "7px",
                  marginBottom: "-7px",
                  marginTop: "-4px",
                }}
              // onClick={handlePenIconVisible}
              />
            </Link>
          </div>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />
      <div className="row" id="rows">
        <WriteFlexAll
          showGrouping={false}
          onItemSelect={handleItemSelect}
          data={dbAccountData}
          // onSelectUser={onSelectUser}
          dataType="account"
          borderVisible={false}
          permission={permission}
          hasItems={dbAccountData.length > 0}
        />
        <div
          className="right"
          style={{
            width: accountSideBar ? "65%" : "80%",
          }}
        >
          {isLoading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
              <div className="loading_page">Loading...</div>
            </div>
          ) : (
            <>
              <button
                id="openbtn"
                onClick={handleOpenAccountSideBar}
                style={{
                  display: accountSideBar ? "none" : "block",
                }}
              >
                {accountSideBar ? <FaGreaterThan /> : <FaLessThan />}
              </button>

              <HeaderBar headerlabel="ACCOUNTS" />
              <div>
                {dbAccountData.length > 0 || plusIconClicked ? (
                  <>
                    <div className="containerA1">
                      <div className="containeraccounts">
                        <ErrorMessage
                          type={"text"}
                          label="ACCOUNT"
                          showFlaxErrorMessageText={true}
                          errormsg="ACCOUNT IS A REQUIRED FIELD"
                          value={accountData.accounts}
                          onChange={(value) =>
                            handleInputChange("accounts", value)
                          }
                          readOnly={permission === "readOnly"}
                        />
                      </div>
                      <div id="content2">
                        <PeopleIconDropdown
                          options={optionOwner}
                          label="OWNER"
                          showCharacterMessage={false}
                          // profileIds={profileid}
                          value={accountData.owner}
                          onChange={(value) =>
                            handleInputChange("owner", value)
                          }
                          onSelect={(selectedOption) =>
                            handleSelect("owner", selectedOption)
                          }
                          readOnly={permission === "readOnly"}
                        />
                      </div>
                    </div>
                    {/* <div className="containerA2">
                  <div id="content3" className="input-container-creataccount">
                    <InputTypes
                         type={"text"}
                      showFlagText={true}
                      TextLabel={"PARENT ACCOUNT"}
                      value={parentAccount}
                      onChange={(value) => setParentAccount(value)}
                      // permission={permission}
                      readOnly={permission === "readOnly"}
                    />
                  </div>
                </div> */}
                    <div className="containerA3">
                      <div id="content4">
                        <InputTypes
                          type={"text"}
                          showFlagText={true}
                          TextLabel={"DESCRIPTION"}
                          value={accountData.description}
                          onChange={(value) =>
                            handleInputChange("description", value)
                          }
                          readOnly={permission === "readOnly"}
                        />

                        {/* <InputTypes
                      showTextArea={true}
                      TextAreaLabel={"DESCRIPTION"}
                      descriptionPlaceholder={"Enter Description"}
                      descriptiononChange={(value) =>
                        handleInputChange("description", value)
                      }
                      descriptionvalue={accountData.description}
                      readOnly={permission === "readOnly"}
                      DesciptionClass={"description-account"}
                      /> */}

                      </div>
                    </div>
                    <div className="containerA4">
                      <div className="dropdown_list">
                        <CustomDropdown
                          options={optionRegion}
                          label="REGION"
                          showCancel={true}
                          labelforverticl="regionlabel"
                          value={accountData.region}
                          onChange={(value) =>
                            handleInputChange("region", value)
                          }
                          onSelect={(selectedOption) =>
                            handleSelect("region", selectedOption)
                          }
                          readOnly={permission === "readOnly"}
                        />
                      </div>
                      <div className="content5Container">
                        <CustomDropdown
                          options={optionIndustry}
                          label="INDUSTRY"
                          showCancel={true}
                          labelforverticl="industrylabel"
                          value={accountData.industry}
                          onChange={(value) =>
                            handleInputChange("industry", value)
                          }
                          onSelect={(selectedOption) =>
                            handleSelect("industry", selectedOption)
                          }
                          readOnly={permission === "readOnly"}
                        />
                      </div>
                    </div>
                    <div className="containerA5">
                      <div className="content7Container">
                        <CustomDropdown
                          options={optionVertical}
                          label="VERTICAL"
                          showCancel={true}
                          labelforverticl="verticallabel"
                          value={accountData.vertical}
                          onChange={(value) =>
                            handleInputChange("vertical", value)
                          }
                          onSelect={(selectedOption) =>
                            handleSelect("vertical", selectedOption)
                          }
                          readOnly={permission === "readOnly"}
                        />
                      </div>
                      <div id="content8Container">
                        <CustomDropdown
                          options={optionType}
                          label="TYPE"
                          showCancel={true}
                          labelforverticl="typelabel"
                          value={accountData.type}
                          onChange={(value) => handleInputChange("type", value)}
                          onSelect={(selectedOption) =>
                            handleSelect("type", selectedOption)
                          }
                          readOnly={permission === "readOnly"}
                        />
                      </div>
                    </div>
                    <BillingAndShippingAddress
                      billingAddress={billingAddress}
                      setBillingAddress={setBillingAddress}
                      shippingAddress={shippingAddress}
                      setShippingAddress={setShippingAddress}
                      readOnly={permission === "readOnly"}
                      setUnchangedSave={setUnchangedSave}
                    />
                    <Addinfo
                      customFields={customFields}
                      onCustomFieldsChange={handleCustomFieldsChange}
                      dynamicFields={dynamicFields}
                      handleDynamicFieldsChange={handleDynamicFieldsChange}
                    />
                    <div
                      id="save_cancel"
                      style={{ display: showSaveCancel ? "block" : "none" }}
                    >
                      <button
                        id="save_data"
                        type="submit"
                        onClick={handleAddAccount}
                        disabled={!areRequiredFieldsFilled() || !unsavedChange}
                      >
                        SAVE ACCOUNT
                      </button>
                      <button
                        id="reset_data"
                        type="reset"
                        onClick={handleCancelClick}
                      >
                        CANCEL ACCOUNT
                      </button>
                    </div>
                    {/* --------------opportunities----------------- */}
                    <div
                      id="oppopagination"
                      style={{ display: showOppopagination ? "block" : "none" }}
                    >
                      <div className="project">
                        <b>OPPORTUNITY</b>
                      </div>
                      {oppPermission !== "none" && (
                        <>
                          {rows.length > 0 ? (
                            <>
                              <table className="oppotable">
                                <thead>
                                  <tr>
                                    <th className="table_heading">Name</th>
                                    <th className="table_heading">Quote</th>
                                    <th className="table_heading">Status</th>
                                    <th className="table_heading">
                                      Close Date
                                    </th>
                                    <th className="table_heading">Owner</th>
                                    <th className="table_heading">Revenue</th>
                                    <th className="table_heading">Margin</th>
                                  </tr>
                                </thead>
                                <tbody>{renderTableRows()}</tbody>
                              </table>
                              <br />
                              {renderPagination()}
                              {/* + opportunities */}
                              <div className="plus-oppertunities"></div>
                            </>
                          ) : (
                            <p style={{ color: "#ccc", textAlign: "center" }}>
                              No Opportunities found.
                            </p>
                          )}
                          <Link
                            to={`/opportunities?data=${encodeURIComponent(
                              JSON.stringify(accountData.accountId)
                            )}`}
                          >
                            {(oppPermission === "access" ||
                              oppPermission === "" ||
                              !oppPermission) && (
                                <FaPlus
                                  style={{
                                    color: "#046088",
                                    width: "100%",
                                    textAlign: "center",
                                    marginTop: "10px",
                                  }}
                                />
                              )}
                          </Link>
                        </>
                      )}

                      {/* ------------delete account------------- */}
                      {/* <div className="project">
                    <b>PROJECTS</b>
                    <p style={{ color: "#ccc" }}>No Projects</p>
                  </div> */}
                      <div className="delete_update">
                        {!isReadOnly ? (
                          <button
                            id="update_data"
                            onClick={handleUpdateAccount}
                            disabled={!areRequiredFieldsFilled()}
                            type="button"
                          >
                            UPDATE ACCOUNT
                          </button>
                        ) : null}
                        {!isReadOnly ? (
                          <button
                            id={
                              deleteClicked ? "delete-highlight" : "delete_data"
                            }
                            ref={deleteButtonRef}
                            onClick={handelDeleteAccount}
                          >
                            DELETE ACCOUNT
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </>
                ) : (
                  <div id="accessmsgdiv">
                    <label id="accessmsg">
                      NO ACCOUNTS FOUND. PLEASE USE + TO ADD A NEW ACCOUNT
                    </label>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div
          className="sidepanel"
          style={{
            width: accountSideBar ? "20%" : "0%",
            display: accountSideBar ? "block" : "none",
          }}
        >
          <SidePanel
            showFlagExternalReference={accountSideBar ? true : ""}
            showFlagTimeStamp={accountSideBar ? true : ""}
            showFlagInternal={accountSideBar ? true : ""}
            exterRefId1={accountData.external_references_id1}
            exterRefId2={accountData.external_references_id2}
            crmRef={accountData.crm_reference}
            createdBy={accountData.created_by}
            modifiedBy={accountData.modified_by}
            createdAt={formatDate(accountData.createdAt)}
            modifiedAt={formatDate(accountData.modifiedAt)}
            revision={accountData.revision}
            accountId={accountData.accountId}
            onClose={handleCloseSideBar}
          />
        </div>
      </div>
    </div>
  );
};
export default Account;