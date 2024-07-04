import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../layouts/Navbar";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../layouts/AdminSidebar";
import WriteFlexAll from "../../components/common/WriteFlexAll";
import Addinfo from "../../components/addinfo/Addinfo";
import HeaderBar from "../../components/common/HeaderBar";
import InputTypes from "../../components/common/InputTypes";
import CustomDropdown from "../../components/common/CustomDropdown";
import ErrorMessage from "../../components/common/ErrorMessage";
import "../../assets/css/company/CompanyOrgs.css";
import HelpRequest from "../../components/common/HelpRequest";
import { FaGreaterThan, FaLessThan, FaUserAlt, FaTrash } from "react-icons/fa";
import SidePanel from "../../components/common/SidePanel";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { CONSTANTS } from "../../constants";
import { encryptData, decryptData, commonService } from "../../utils/common";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";

const initialCompanyData = {
  companyOrgId: "",
  org_name: "",
  active: false,
  org_code: "",
  external_reference: "",
  parent_org: "",
  org_type: "",
  default_time_uom: "",
  week_hours: "",
  languages: "",
  currency: "",
  cola: "",
  pola: "",
  cost_read_only: false,
  created_by: "",
  modified_by: "",
  createdAt: "",
  modifiedAt: "",
  revision: 0,
};
const CompOrgs = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const { securityRoleData } = useContext(DataContext);

  const companyProfilePagePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_company
      : "";

  //Block the url jump by the permission of the user
  if (companyProfilePagePermission === "none") {
    navigate("/home");
  }

  const isReadOnly = companyProfilePagePermission === "readOnly";

  // // Below line of code is used to avoide jumping URL's
  // const validatedUser = localStorage.getItem("validated");

  // if (validatedUser != "true") {
  //   navigate("/auth");
  // }

  const userName =
    user && user.userType === "admin"
      ? `${user.admin.firstname} ${user.admin.lastname}`
      : "" || (user && user.userType === "people")
      ? `${user.people.first_name} ${user.people.last_name}`
      : "";

  const parentOptions = [];
  const orgTypeOptions = [];
  const DefaultTimeOptions = ["HOURS", "DAYS"];

  const [CompanySideBar, setCompanySideBar] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const deleteButtonRef = useRef(null);
  const [plusIconClicked, setPlusIconClicked] = useState(false);
  const [showSaveCancel, setShowSaveCancel] = useState(false);
  const [showUpdateDelete, setShowUpdateDelete] = useState(true);
  const [isToastActive, setIsToastActive] = useState(false);
  const [CompanyOrgData, setCompanyOrgData] = useState([]);
  const [toastShown, setToastShown] = useState(false);

  const [companyData, setCompanyData] = useState(initialCompanyData);
  const [unSavedChange, setUnSavedChange] = useState(false);
  // =========================

  const handleInputChange = (fieldName, value) => {
    setCompanyData({
      ...companyData,
      [fieldName]: value,
    });
    setUnSavedChange(true);
  };
  const handleSelect = (fieldName, selectedOption) => {
    setCompanyData({ ...companyData, [fieldName]: selectedOption });
    setUnSavedChange(true);
  };
  const areRequiredFieldsFilled = () => {
    return (
      companyData.org_name &&
      companyData.org_code &&
      companyData.week_hours &&
      unSavedChange
    );
  };

  // -------------------Company_org ADD----------------
  const handleAddOrg = async (event) => {
    if (
      !companyData.org_name ||
      !companyData.org_code ||
      !companyData.week_hours
    ) {
      if (!isToastActive) {
        toast.error("Please fill the required fields.", {
          onClose: () => setIsToastActive(false),
          onOpen: () => setIsToastActive(true),
        });
      }
      return;
    }

    const newCompOrgData = {
      ...companyData,
      created_by: userName,
      createdAt: new Date(),
    };
    try {
      const responseData = await commonService("/api/companyOrg/add", "POST", {
        newCompOrgData,
      });
      if (responseData.status === 200) {
        toast.success("CompanyOrg Saved Successfully");
        const companyDataId = responseData.data.data.companyorg_data._id;
        const encryptedCompanyId = encryptData(companyDataId);
        console.log(encryptedCompanyId);
        localStorage.setItem("personId", encryptedCompanyId);
        localStorage.removeItem("previousPersonId");
        setCompanyOrgData((prevAccount) => [
          ...prevAccount,
          responseData.data.data.companyorg_data,
        ]);
        setCompanyData({ ...companyData, org_name: "" });
      }
    } catch (error) {
      console.error("error adding org:", error);
      if (!isToastActive) {
        toast.error(`${companyData.org_name} name already exists`, {
          onClose: () => setIsToastActive(false),
          onOpen: () => setIsToastActive(true),
        });
      }
    }
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
  // -------------------Company_org GET----------------
  useEffect(() => {
    const getCompanyOrg = async () => {
      try {
        const response = await commonService("/api/companyOrg/get", "GET");

        if (response.status === 200) {
          setCompanyOrgData(response.data.data);
        } else {
          // console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.log("Error fetching Companyorg data:", error);
      }
    };
    getCompanyOrg();
  }, [user]);

  // -------------------company_org update---------------
  const handleUpdateCompanyorg = async () => {
    const newCompOrgData = {
      ...companyData,
      modified_by: userName,
      modifiedAt: new Date(),
      revision: companyData.revision ? companyData.revision + 1 : 1,
    };

    try {
      const response = await commonService(
        `/api/companyOrg/update/${companyData.companyOrgId}`,
        "PUT",
        newCompOrgData
      );

      if (response.status === 200) {
        setCompanyOrgData((prevData) =>
          prevData.map((item) =>
            item._id === companyData.companyOrgId
              ? { ...item, ...newCompOrgData }
              : item
          )
        );
        setCompanyData(newCompOrgData);
        toast.success("Company org updated successfully");
      } else {
        throw new Error("Failed to update company organization");
      }
    } catch (error) {
      console.error("Error updating Company org:", error);
      // Handle error state in UI, potentially through a state update or toast notification.
    }
    setUnSavedChange(false);
  };

  // // -------------------Company_org delete----------------
  const handleDeleteCompanyorg = async () => {
    if (!deleteClicked) {
      setDeleteClicked(true);
      return;
    }
    try {
      const response = await commonService(
        `/api/companyOrg/delete/${companyData.companyOrgId}`,
        "DELETE"
      );
      if (response.status === 200) {
        toast.success("Company org deleted successfully", {
          icon: (
            <span style={{ color: "red" }}>
              <FaTrash />
            </span>
          ),
          className: "custom-toast_delete",
        });
        const updatedDbCompanydata = CompanyOrgData.filter(
          (item) => item._id !== companyData.companyOrgId
        );
        setCompanyOrgData(updatedDbCompanydata);

        handleItemSelect();
        setDeleteClicked(false);
      } else {
        throw new Error("Failed to delete company org");
      }
    } catch (error) {
      console.log("Error Deleting Company org:", error);
      toast.error("Failed to delete content");
      setDeleteClicked(false);
    }
  };

  // const createdDate = formatDate(companyData.createdAt);
  // const  formatDate(companyData.modifiedAt) = formatDate(companyData.modifiedAt);

  const newName = (CompanyOrgData?.length + 1).toString().padStart(3, "0");

  const handleItemSelect = (selectedItem, selectedIndex) => {
    const selectedData =
      selectedIndex !== -1 ? CompanyOrgData[selectedIndex] : null;
    setCompanyData({
      ...selectedData,
      companyOrgId: selectedData?._id || "",
      org_name: selectedData?.org_name || newName,
      active: selectedData?.active || false,
      org_code: selectedData?.org_code || "",
      external_reference: selectedData?.external_reference || "",
      parent_org: selectedData?.parent_org || "",
      org_type: selectedData?.org_type || "",
      default_time_uom: selectedData?.default_time_uom || "",
      week_hours: selectedData?.week_hours || "",
      languages: selectedData?.languages || "",
      currency: selectedData?.currency || "",
      cola: selectedData?.cola || "",
      pola: selectedData?.pola || "",
      cost_read_only: selectedData?.cost_read_only || false,
      createdAt: selectedData?.createdAt || "",
      modifiedAt: selectedData?.modifiedAt || "",
      created_by: selectedData?.created_by,
      modified_by: selectedData?.modified_by,
      revision: selectedData?.revision,
    });
    setShowSaveCancel(selectedData ? false : true);
    setShowUpdateDelete(selectedData ? true : false);
    setPlusIconClicked(selectedData ? false : true);
  };
  // ----------------cancel company ------------------
  const handleCancelClick = () => {
    const previous = localStorage.getItem("previousPersonId");
    localStorage.setItem("personId", previous);
    const index = CompanyOrgData.findIndex((item) => item._id === previous);
    handleItemSelect(null, index);
  };
  const handleNavigation = (selectedId) => {
    const prevId = localStorage.getItem("previousPersonId");
    const currentId = localStorage.getItem("personId");
    if (prevId && currentId) {
      localStorage.removeItem("previousPersonId");
      navigate(`/companyorgs?id=${prevId}`);
    } else if (currentId) {
      navigate(`/companyorgs?id=${selectedId}`);
    } else if (prevId) {
      navigate(`/companyorgs`);
    }
  };

  useEffect(() => {
    handleNavigation(companyData.companyOrgId);
  }, [companyData]);

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
  return (
    <div>
      <Navbar />
      <AdminSidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link href="/home" className="breadcrumbs--link_mid">
              Home
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link href="/catalog" className="breadcrumbs--link_mid">
              Admin
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link href="" className="breadcrumbs--link--active">
              Company Organisation
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />
      {/* -------------------------- */}
      <div className="roworg" id="orgsrows">
        <WriteFlexAll
          showGrouping={false}
          onItemSelect={handleItemSelect}
          data={CompanyOrgData}
          dataType="company_org"
          hasItems={CompanyOrgData.length > 0}
          permission={companyProfilePagePermission}
        />

        <div
          id="rightOrgshead"
          style={{
            width: CompanySideBar ? "63%" : "80%",
          }}
        >
          <button
            id="openbtn"
            onClick={() => {
              setCompanySideBar(true);
            }}
            style={{
              marginRight: CompanySideBar ? "20%" : "0%",
              display: CompanySideBar ? "none" : "block",
            }}
          >
            {CompanySideBar ? <FaGreaterThan /> : <FaLessThan />}
          </button>

          <div className="profile_header">
            <HeaderBar headerlabel="COMPANY ORG" />
          </div>
          {CompanyOrgData?.length > 0 || plusIconClicked ? (
            <div className="org_main_div">
              <div className="grid1">
                <div id="orgname">
                  <ErrorMessage
                    type={"text"}
                    showFlaxErrorMessageText={true}
                    placeholdersection="Enter Name"
                    label="ORG NAME"
                    errormsg="ORG FIELD IS REQUIRED"
                    value={companyData.org_name}
                    onChange={(value) => handleInputChange("org_name", value)}
                    readOnly={companyProfilePagePermission === "readOnly"}
                  />
                </div>
                <div id="activeorg">
                  <InputTypes
                    showFlagCheckBox={true}
                    checkboxlabel="checboxorglabel"
                    checkmarkbox="checkmarkboxinput"
                    Checkboxlabel="ACTIVE"
                    value={companyData.active}
                    onChange={(value) => handleInputChange("active", value)}
                    readOnly={companyProfilePagePermission === "readOnly"}
                  />
                </div>
              </div>
              <div id="grid2">
                <div id="orgcode">
                  <ErrorMessage
                    type={"text"}
                    showFlaxErrorMessageText={true}
                    label="ORG CODE"
                    placeholdersection="Enter Code"
                    errormsg="ORG CODE IS REQUIRED"
                    value={companyData.org_code}
                    onChange={(value) => handleInputChange("org_code", value)}
                    readOnly={companyProfilePagePermission === "readOnly"}
                  />
                </div>
                <div id="external">
                  <InputTypes
                    type={"text"}
                    showFlagText={true}
                    TextLabel="EXTERNAL REFERENCE"
                    textplaceholder="External Reference"
                    value={companyData.external_reference}
                    onChange={(value) =>
                      handleInputChange("external_reference", value)
                    }
                    readOnly={companyProfilePagePermission === "readOnly"}
                  />
                </div>
              </div>
              <div id="grid3">
                <div id="parent">
                  <CustomDropdown
                    options={parentOptions}
                    label="PARENT ORG"
                    Placeholder="Select Parent"
                    value={companyData.parent_org}
                    onChange={(value) => handleInputChange("parent_org", value)}
                    onSelect={(selectedOption) =>
                      handleSelect("parent_org", selectedOption)
                    }
                    readOnly={companyProfilePagePermission === "readOnly"}
                  />
                </div>
                <div id="orgtype">
                  <CustomDropdown
                    options={orgTypeOptions}
                    label="ORG TYPE"
                    value={companyData.org_type}
                    onChange={(value) => handleInputChange("org_type", value)}
                    onSelect={(selectedOption) =>
                      handleSelect("org_type", selectedOption)
                    }
                    readOnly={companyProfilePagePermission === "readOnly"}
                  />
                </div>
              </div>

              <div id="grid4">
                <div id="defaulttime">
                  <CustomDropdown
                    options={DefaultTimeOptions}
                    label="DEFAULT TIME UOM"
                    Placeholder="Select UOM"
                    value={companyData.default_time_uom}
                    onChange={(value) =>
                      handleInputChange("default_time_uom", value)
                    }
                    onSelect={(selectedOption) =>
                      handleSelect("default_time_uom", selectedOption)
                    }
                    readOnly={companyProfilePagePermission === "readOnly"}
                  />
                </div>
                <div id="Defaultweekhours">
                  <ErrorMessage
                    type={"number"}
                    showFlaxErrorMessageText={true}
                    placeholdersection="Enter hours"
                    label="WEEK HOURS"
                    errormsg="WEEK HOURS IS REQUIRED"
                    value={companyData.week_hours}
                    onChange={(value) => handleInputChange("week_hours", value)}
                    readOnly={companyProfilePagePermission === "readOnly"}
                  />
                </div>
              </div>

              <div id="grid5">
                <div id="languageorg">
                  <CustomDropdown
                    label="LANGUAGE"
                    options={CONSTANTS.languagesOptions}
                    value={companyData.languages}
                    onChange={(value) => handleInputChange("languages", value)}
                    onSelect={(selectedOption) =>
                      handleSelect("languages", selectedOption)
                    }
                    readOnly={companyProfilePagePermission === "readOnly"}
                  />
                </div>
                <div id="currency">
                  <CustomDropdown
                    label="CURRENCY"
                    options={CONSTANTS.optioncurrency}
                    value={companyData.currency}
                    onChange={(value) => handleInputChange("currency", value)}
                    onSelect={(selectedOption) =>
                      handleSelect("currency", selectedOption)
                    }
                    readOnly={companyProfilePagePermission === "readOnly"}
                  />
                </div>
              </div>

              <div id="grid6">
                <div id="cola">
                  <InputTypes
                    type={"number"}
                    showFlagText={true}
                    TextLabel="COLA"
                    textplaceholder="Yearly Price Adjustment"
                    value={companyData.cola}
                    onChange={(value) => handleInputChange("cola", value)}
                    readOnly={companyProfilePagePermission === "readOnly"}
                  />
                </div>
                <div id="pola">
                  <InputTypes
                    showFlagText={true}
                    TextLabel="POLA"
                    textplaceholder="Yearly Cost Adjustment"
                    value={companyData.pola}
                    onChange={(value) => handleInputChange("pola", value)}
                    readOnly={companyProfilePagePermission === "readOnly"}
                  />
                </div>
                <div id="cost">
                  <InputTypes
                    showFlagCheckBox={true}
                    Checkboxlabel="COST READ ONLY"
                    checkboxlabel="check_box_label_dupecheck_box_label_dupe"
                    value={companyData.cost_read_only}
                    onChange={(value) =>
                      handleInputChange("cost_read_only", value)
                    }
                    readOnly={companyProfilePagePermission === "readOnly"}
                  />
                </div>
              </div>
            
              {!isReadOnly && (
                <div>
                  <div
                    className="save_cancel_Org"
                    style={{
                      display: showSaveCancel ? "block" : "none",
                      textAlign: "center",
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      id="save_data"
                      type="submit"
                      onClick={handleAddOrg}
                      disabled={!areRequiredFieldsFilled()}
                    >
                      SAVE
                    </button>
                    <button
                      id="reset_data"
                      type="reset"
                      onClick={handleCancelClick}
                    >
                      CANCEL
                    </button>
                  </div>
                  <div
                    className="delete_update_org"
                    style={{
                      display: showUpdateDelete ? "block" : "none",
                      textAlign: "center",
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      id="update_data"
                      type="submit"
                      onClick={handleUpdateCompanyorg}
                      disabled={!areRequiredFieldsFilled()}
                    >
                      UPDATE
                    </button>
                    <button
                      type="reset"
                      onClick={handleDeleteCompanyorg}
                      id={deleteClicked ? "delete-highlight" : "delete_data"}
                      ref={deleteButtonRef}
                    >
                      Remove Org
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div id="accessmsgdiv">
              <label id="accessmsg">
                NO COMPANY ORG FOUND. PLEASE USE + TO ADD A NEW COMPANY ORG
              </label>
            </div>
          )}
          {/* sidebar org */}
        </div>
        {/* -------------------------------------------- */}
        <div
          className="sidepanel"
          style={{
            width: CompanySideBar ? "20%" : "0%",
            position: CompanySideBar ? "sticky" : "relative",
            top: CompanySideBar ? "0px" : "2px",
            display: CompanySideBar ? "block" : "none",
          }}
          id="sidepanel"
        >
          <SidePanel
            showFlagTimeStamp={CompanySideBar ? true : ""}
            onClose={() => {
              setCompanySideBar(false);
            }}
            createdBy={companyData.created_by}
            modifiedBy={companyData.modified_by}
            createdAt={formatDate(companyData.createdAt)}
            modifiedAt={formatDate(companyData.modifiedAt)}
            revision={companyData.revision}
          />
        </div>
      </div>
    </div>
  );
};

export default CompOrgs;
