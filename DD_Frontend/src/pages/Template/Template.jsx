import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../layouts/Navbar";
import CatalogSidebar from "../../layouts/CatalogSidebar";
import WriteFlexAll from "../../components/common/WriteFlexAll";
import "../../assets/css/template/Template.css";
import TemplateGuided from "../../components/templateComps/TemplateGuided";
import CustomDropdown from "../../components/common/CustomDropdown";
import SidePanel from "../../components/common/SidePanel";
import GuidedListing from "../../components/templateComps/GuidedListing";
import { Link, useNavigate } from "react-router-dom";
import HeaderBar from "../../components/common/HeaderBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGreaterThan, FaLessThan, FaTrash } from "react-icons/fa";
import ErrorMessage from "../../components/common/ErrorMessage";
import InputTypes from "../../components/common/InputTypes";
import { baseUrl } from "../../config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

import {
  faAngleLeft,
  faAngleUp,
  faAngleDown,
  faPen,
  faScroll,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";

import { FaUser } from "react-icons/fa";
import HelpRequest from "../../components/common/HelpRequest";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";
import { decryptData, encryptData, commonService } from "../../utils/common";

const Templates = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Below line of code is used to avoide jumping URL's
  // const validatedUser = localStorage.getItem("validated");

  // if (validatedUser !== "true") {
  //   navigate("/auth");
  // }

  const {
    securityRoleData,
    catalogCategoryLookups,
  } = useContext(DataContext);


  //avoide the URL jump by using the permission
  const templatePagePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].catalog_template
      : "";

  if (templatePagePermission === "none") {
    navigate("/home");
  }

  const isReadOnly = templatePagePermission === "readOnly";
  const filteredpricemodel = [
    "FIXED PRICE",
    "MARGIN TARGET",
    "SERVICE LEVEL",
    "TIME AND MATERIALS",
  ];
  const salesorg = [
    "AFRICA",
    "ALL OTHER AP",
    "AP-AUS/JP",
    "AP-CHINA",
    "AP INDIA",
    "ARGENTINA",
    "AUSTRIA",
  ];
  const catalogstatus = ["INACTIVE", "IN PROCESS", "PUBLISHED"];
  const filteredcatagory = [...catalogCategoryLookups];
  const [plusIconClicked, setPlusIconClicked] = useState(false);

  const [isGuideVisible, setGuideVisible] = useState(true);
  const [isGuideVisiblebtn, setGuideVisiblebtn] = useState(true);
  const [showlistingtemplate, setshowlistingtemplate] = useState(false);
  const [iconClass, setIconClass] = useState(faAngleDown);
  const [headerTemplateMsgVisible, setHeaderTemplateMsgVisible] =
    useState(true);
  const [Plusiconclick, setPlusiconclick] = useState(false);
  const [Writeflexvisible, setWriteflexvisible] = useState(true);
  const [showTemplateplusmessage, setshowTemplateplusmessage] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [selectedOptionsContentdoctype, setSelectedOptionsContentdoctype] =
    useState([]);
  const [isHighlighted, setIsHighlighted] = useState(true);
  const [isHighlightedFile, setIsHighlightedFile] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);

  const [headerChange, setHeaderChange] = useState("QUOTE TEMPLATE");
  const deleteButtonRef = useRef(null);
  const [selectedOptionTemplate, setSelectedOptionTemplate] = useState("");
  const [arrayDropdown, setArrayDropdown] = useState([]);
  const [allDoctypeInTemplate, setAllDoctypeInTemplate] = useState([]);
  const [mode, setMode] = useState("create");
  const [mode1, setMode1] = useState("cancel");
  const [doctypePublished, setDoctypePublished] = useState([]);

  const [dbTemplateData, setDbTemplateData] = useState([]);
  const [unSavedChange, setUnSavedChange] = useState(false);
  const [templateData, setTemplateData] = useState({
    templateId: "",
    quote_name: "",
    description: "",
    doc_tempData: [],
    catalog_category: "",
    status: "",
    createdAt: "",
    modifiedAt: "",
    createdBy: "",
    modifiedBy: " ",
    revision: "",
  });
  const handleInputChange = (fieldName, value) => {
    setTemplateData({
      ...templateData,
      [fieldName]: value,
    });

    setUnSavedChange(true);
  };
  const handleSelect = (fieldName, selectedOption) => {
    setTemplateData({ ...templateData, [fieldName]: selectedOption });
    setUnSavedChange(true);
  };

  const areRequiredFieldsFilled = () => {
    return templateData.quote_name && unSavedChange;
  };

  const getDoctypedata = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/doctype/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const doctype = await response.json();
        // setDbDoctypeData(doctype.data);
        const db = doctype.data.filter((item) => item.status === "PUBLISHED");
        setDoctypePublished(db);
      } else {
        // console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const docNamesArray = templateData.doc_tempData.map(
      (item) => item.doc_name
    );
    const newArray = allDoctypeInTemplate.filter(
      (item) => !docNamesArray.includes(item)
    );
    const filteredArray = doctypePublished.filter(
      (item) => !newArray.includes(item.doc_name)
    );
    setArrayDropdown(filteredArray);
    const arr = dbTemplateData
      .filter((item) => item._id === templateData.templateId)[0]
      ?.doc_tempData.map((item) => item.doc_id);

    setSelectedOptionsContentdoctype(arr ? arr : []);
  }, [templateData.templateId, selectedOptionTemplate, doctypePublished]);

  const updateDocTempData = (newData) => {
    setTemplateData((prevState) => ({
      ...prevState,
      doc_tempData: newData,
    }));
  };
  const handleOpenSideBar = () => {
    setAccountOpen(!accountOpen);
  };
  const handleCloseSideBar = () => {
    setAccountOpen(!accountOpen);
  };

  const userName =
    user && user.admin
      ? `${user.admin.firstname} ${user.admin.lastname}`
      : "" || (user && user.people)
        ? `${user.people.first_name} ${user.people.last_name}`
        : "";

  const toggleGuidebtn = () => {
    setGuideVisiblebtn(!isGuideVisiblebtn);
    setIconClass(isGuideVisiblebtn ? faAngleDown : faAngleUp);
  };

  const handleOptionSelect = (selectedOption) => {
    setSelectedOptionTemplate(selectedOption);
  };

  const scrolllistingicon = () => {
    setshowlistingtemplate(true);
    setGuideVisible(false);
    setHeaderTemplateMsgVisible(false);
    setIsHighlightedFile(true);
    setIsHighlighted(false);
    setshowTemplateplusmessage(false);
  };

  const toggleTempDetailspen = () => {
    setshowlistingtemplate(false);
    setGuideVisible(true);
    setHeaderTemplateMsgVisible(true);
    setIsHighlighted(true);
    setIsHighlightedFile(false);
    // setTemplateVisible(true);
  };

  const handleBlankQuoteClick = () => {
    // Set the new quote name
    resetTemplateFields();
    setPlusiconclick(false);
    setWriteflexvisible(false);
    setWriteflexvisible(true);
    setIsHandleBlankQuoteClicked(true);
    setGuideVisiblebtn(true);
    setGuideVisible(true);
    setshowTemplateplusmessage(false);
  };
  //---------------addTemplate-----------
  const addTemplate = async () => {
    if (!templateData.quote_name) {
      toast.success("Please fill required fields.");
      requiredFieldToast = true;
      return;
    }
    try {
      const modifiedSelectedArray = doctypePublished
        ?.filter((docType) =>
          selectedOptionsContentdoctype.includes(docType._id)
        )
        ?.map((selectedDoc) => {
          const docExists = templateData.doc_tempData?.some(
            (doc) => doc.doc_id === selectedDoc._id
          );
          return docExists
            ? templateData.doc_tempData.find(
              (doc) => doc.doc_id === selectedDoc._id
            )
            : { doc_id: selectedDoc._id, sections: [] };
        });
      const newTempData = {
        ...templateData,
        doc_tempData: modifiedSelectedArray,
        created_by: userName,
        createdAt: new Date(),
      };
      const response = await commonService(
        "/api/template/add",
        "POST",
        newTempData
      );
      if ((response.status = 200)) {
        toast.success("Template added successfully");
        const templatedatadisplay = response.data.data.temp_data;
        const encryptedTemplateId = encryptData(templatedatadisplay._id);
        localStorage.setItem("personId", encryptedTemplateId);
        localStorage.removeItem("previousPersonId");

        setDbTemplateData((prevTemplateData) => [
          ...prevTemplateData,
          response.data.data.temp_data,
        ]);

        setTemplateData({ ...templatedatadisplay, quote_name: "" });
      }
    } catch (error) {
      console.error("error adding template:", error);
    }
  };

  // ------------------get template data-----------------------
  const gettemplatedata = async () => {
    try {
      const response = await commonService("/api/template/get", "GET");
      if (response.status === 200) {
        // console.log(response);
        const docNamesArray = response.data.data.flatMap((item) =>
          item.doc_tempData.map((docItem) => docItem.doc_name)
        );
        setAllDoctypeInTemplate(docNamesArray);

        setDbTemplateData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gettemplatedata();
    getDoctypedata();
  }, [user]);

  //--------------------- update template data-------------------
  const handleUpdateTemplate = async () => {
    if (!templateData.quote_name) {
      toast.success("Please fill required fields.");
      return;
    }

    try {
      const modifiedSelectedArray = doctypePublished
        .filter((docType) =>
          selectedOptionsContentdoctype.includes(docType._id)
        )
        ?.map((selectedDoc) => {
          const docExists = templateData.doc_tempData.some(
            (doc) => doc.doc_id === selectedDoc._id
          );
          return docExists
            ? templateData.doc_tempData.find(
              (doc) => doc.doc_id === selectedDoc._id
            )
            : { doc_id: selectedDoc._id, sections: [] };
        });
      const newTempData = {
        ...templateData,
        doc_tempData: modifiedSelectedArray,
        modified_by: userName,
        modifiedAt: new Date(),
        revision: templateData.revision ? templateData.revision + 1 : 1,
      };
      const response = await commonService(
        `/api/template/update/${templateData.templateId}`,
        "PUT",
        newTempData
      );
      if (response.status === 200) {
        toast.success("Template Updated Successfully");
        setDbTemplateData((prevTempate) =>
          prevTempate.map((item) =>
            item._id === templateData.templateId
              ? { ...item, ...newTempData }
              : item
          )
        );
        setTemplateData(newTempData);
      }
    } catch (error) {
      console.error("Error Updating Template:", error);
    }
    setUnSavedChange(false);
  };

  //API FOR template DELETE FUNCTION
  const handelDeleteTemplate = async () => {
    if (!deleteClicked) {
      setDeleteClicked(true);
      return;
    }
    try {
      const response = await commonService(
        `/api/template/delete/${templateData.templateId}`,
        "DELETE"
      );
      if (response.status === 200) {
        toast.success("Template deleted successfully", {
          icon: (
            <span style={{ color: "red " }}>
              <FaTrash />
            </span>
          ),
          className: "custom-toast_delete",
        });
        const updateDbTemplateId = dbTemplateData.filter(
          (item) => item._id !== templateData.templateId
        );
        // console.log(updateDbTemplateId);

        setDbTemplateData(updateDbTemplateId);
        handleItemSelect();
        setTemplateData((prevData) => ({
          ...prevData,
          quote_name: "",
        }));

        setDeleteClicked(false);
      }
    } catch (error) {
      console.error("Error Deleting template:", error);
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

  const [isHandleBlankQuoteClicked, setIsHandleBlankQuoteClicked] =
    useState(false);

  const handleNavigation = (selectedId) => {
    const prevId = decryptData(localStorage.getItem("previousPersonId"));
    const currentId = decryptData(localStorage.getItem("personId"));
    if (prevId && currentId) {
      localStorage.removeItem("previousPersonId");
      navigate(`/template-quotes?id=${prevId}`);
    } else if (currentId) {
      navigate(`/template-quotes?id=${selectedId}`);
    } else if (prevId) {
      navigate(`/template-quotes`);
    }
  };

  useEffect(() => {
    handleNavigation(templateData.templateId);
  }, [dbTemplateData, templateData.templateId]);
  const nextQuoteNumber = (dbTemplateData.length + 1)
    .toString()
    .padStart(3, "0");

  const handleItemSelect = (selectedItem, selectedIndex) => {
    // if (selectedIndex >= 0 && selectedIndex < dbTemplateData.length) {
    const selectedData =
      selectedIndex !== -1 ? dbTemplateData[selectedIndex] : null;
    setTemplateData({
      ...selectedData,
      templateId: selectedData?._id || "",
      quote_name: selectedData?.quote_name || nextQuoteNumber,
      description: selectedData?.description || "",
      catalog_category: selectedData?.catalog_category || "",
      status: selectedData?.status || "",
      doc_tempData: selectedData?.doc_tempData || [],
      createdAt: selectedData?.createdAt || "",
      modifiedAt: selectedData?.modifiedAt || "",
      createdBy: selectedData?.created_by || "",
      modifiedBy: selectedData?.modified_by || "",
      revision: selectedData?.revision || 0,
    });
    const commonItems = selectedData?.doc_tempData
      .map((item) => item.doc_id)
      .filter((doc) => doctypePublished.map((i) => i._id).includes(doc));
    setSelectedOptionsContentdoctype(commonItems ? commonItems : []);
    // console.log(commonItems,doctypePublished);
    toggleTempDetailspen();
    setPlusIconClicked(true);
    setPlusiconclick(false);
    setGuideVisiblebtn(true);
    setGuideVisible(true);
    setHeaderTemplateMsgVisible(true);

    setMode(selectedData ? "update" : "create"); // Set mode to 'create'
    setMode1(selectedData ? "delete" : "cancel");
    setHeaderChange("QUOTE TEMPLATE");
    // }
    //setPlusIconClicked(true);
  };

  const updateOptionsDoctype = (data) => {
    setSelectedOptionsContentdoctype(data ? data : []);
  };
  const handleDownloadExcelClick = () => {
    // Create a sample Excel content (you can replace this with your actual Excel data)
    const excelContent = "Excel\tContent\n1\tHello\n2\tWorld";

    // Convert the Excel content to a Blob
    const blob = new Blob([excelContent], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create an anchor element to trigger the download
    const anchor = document.createElement("a");

    // Set the download attributes
    anchor.href = URL.createObjectURL(blob);
    anchor.download = "document.xlsx";

    // Trigger a click on the anchor element
    anchor.click();

    // Revoke the object URL to free up resources
    URL.revokeObjectURL(anchor.href);

    // Remove the anchor element from the DOM
    anchor.remove();
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

  // textarea
  const handleTextareaChange = (event) => {
    setTemplateData((prevState) => ({
      ...prevState,
      description: event.target.value,
    }));
    event.target.style.height = "59px";
    event.target.style.height = event.target.scrollHeight + "px";
    setUnSavedChange(true);
  };

  const handleCancelClick = () => {
    const previous = decryptData(localStorage.getItem("previousPersonId"));
    const encryptPrevious = encryptData(previous);
    localStorage.setItem("personId", encryptPrevious);

    const index = dbTemplateData.findIndex((item) => item._id === previous);
    handleItemSelect(null, index);
  };

  return (
    <div>
      <Navbar />
      <CatalogSidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link to="/home" className="breadcrumbs--link_mid">
              Home
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="/catalog-roles" className="breadcrumbs--link_mid">
              Catalog
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="" className="breadcrumbs--link--active">
              Template
            </Link>
          </li>
          <ol style={{ float: "right", listStyle: "none" }}>
            <Link to="" className="breadcrumbs--link breadcrumbs--link--active">
              <FontAwesomeIcon
                icon={faPen}
                className={`accountpen ${isHighlighted ? "highlighted" : ""}`}
                style={{
                  backgroundColor: isHighlighted ? "#046088" : "transparent",
                  color: isHighlighted ? "white" : "black",
                  fontSize: "14px",
                  marginRight: "10px",
                  padding: "7px",
                  marginBottom: "-4px",
                  marginTop: "-4px",
                }}
                onClick={toggleTempDetailspen}
              />
            </Link>
            <Link
              to=""
              className="breadcrumbs--link breadcrumbs--link--active"
              onClick={scrolllistingicon}
            >
              <FontAwesomeIcon
                icon={faScroll}
                className={`file ${isHighlightedFile ? "highlighted" : ""}`}
                style={{
                  backgroundColor: isHighlightedFile
                    ? "#046088"
                    : "transparent",
                  color: isHighlightedFile ? "white" : "black",
                  fontSize: "13px",
                  marginRight: "-1px",
                  padding: "7px",
                  marginBottom: "-3px",
                  marginTop: "-5px",
                }}
                onClick={scrolllistingicon}
              />
            </Link>
            {/* <Link to="" className="breadcrumbs--link breadcrumbs--link--active">
              <i
                className="fa fa-table"
                style={{ fontSize: "15px", marginRight: "10px" }}
              />
            </Link> */}
          </ol>
        </ul>
        <hr className="hr" />
        <HelpRequest />
      </div>
      <div className="rowtemplate">
        {Writeflexvisible && (
          <WriteFlexAll
            showGrouping={false}
            // resetFields={resetTemplateFields}
            data={dbTemplateData}
            onItemSelect={handleItemSelect}
            dataType="template"
            permission={templatePagePermission}
            hasItems={dbTemplateData.length > 0}
          />
        )}
        {Plusiconclick && (
          <div id="hidetempluicon">
            <div className="dotswriteblank">
              <div className="tempmaindiv">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="newtemplateicon"
                  id="faangletemplateleft"
                />
                <label id="newtwmplabel">NEW TEMPLATE</label>
              </div>
              <ul id="myMenuwriteblank">
                <li>
                  <Link to="#">TEMPLATE</Link>
                </li>
                <li>
                  <Link to="#">PREVIOUS QUOTE</Link>
                </li>
                <li to="#" onClick={handleBlankQuoteClick}>
                  <Link to="#">BLANK QUOTE</Link>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div
          className="righttemplate"
          style={{
            width: accountOpen ? "78%" : "80%",
          }}
        >
          <button
            id="openbtn"
            onClick={handleOpenSideBar}
            style={{ display: accountOpen ? "none" : "block" }}
          >
            {accountOpen ? <FaGreaterThan /> : <FaLessThan />}
          </button>
          <div id="headerTempaltes">
            {headerTemplateMsgVisible && (
              <HeaderBar headerlabel={headerChange}>
                <div className="exceldownload">
                  <span
                    className="excelicon"
                    onClick={handleDownloadExcelClick}
                  >
                    <FontAwesomeIcon
                      icon={faFileExcel}
                      className="fas fa-file-excel"
                    />
                  </span>
                  <label id="exceltemplatelabel">DOWNLOAD</label>
                </div>
              </HeaderBar>
            )}
            {showTemplateplusmessage && (
              <div id="accessmsgdiv">
                <label id="accessmsg">
                  PICK FROM THE LISTED OPTIONS TO START YOUR QUOTE
                </label>
              </div>
            )}
          </div>

          {dbTemplateData.length > 0 || plusIconClicked ? (
            <div>
              <div>
                {showlistingtemplate && (
                  <div className="showlisticonclick">
                    <GuidedListing
                      showFlagHeader={true}
                      showFlagButton={false}
                      options={doctypePublished
                        .filter((docType) =>
                          selectedOptionsContentdoctype.includes(docType._id)
                        )
                        .map((docType) => docType.doc_name)}
                      doctypePublished={doctypePublished}
                      doc_tempData={templateData.doc_tempData}
                      updateDocTempData={updateDocTempData}
                      readOnly={templatePagePermission === "readOnly"}
                      docTempClicks={showlistingtemplate}
                      unSavedChange={unSavedChange}
                      setUnSavedChange={setUnSavedChange}
                    />
                  </div>
                )}

                {isGuideVisible && (
                  <div id="Amul">
                    <div className="tempdeatails">
                      <div className="buttontemp">
                        <button
                          type="button"
                          className="tempbttn"
                          id="clickmetemp"
                          onClick={toggleGuidebtn}
                        >
                          <FontAwesomeIcon
                            icon={iconClass}
                            aria-hidden="true"
                            id="saa"
                          />
                        </button>
                      </div>

                      {isGuideVisiblebtn && (
                        <div className="quotempid">
                          <div className="quotempid2">
                            <div className="templeft">
                              <div className="containertemplate1">
                                <div id="contenttemp1">
                                  <ErrorMessage
                                    type={"text"}
                                    showFlaxErrorMessageText={true}
                                    label={"QUOTE NAME"}
                                    errormsg="QUOTE NAME IS A REQUIRED FIELD"
                                    value={templateData.quote_name}
                                    onChange={(value) =>
                                      handleInputChange("quote_name", value)
                                    }
                                    readOnly={
                                      templatePagePermission === "readOnly"
                                    }
                                  />
                                </div>
                                <div id="contenttemp2">
                                  <CustomDropdown
                                    options={filteredpricemodel}
                                    label={"PRICE MODEL"}
                                    onSelect={handleOptionSelect}
                                    readOnly={
                                      templatePagePermission === "readOnly"
                                    }
                                  />
                                </div>
                              </div>
                              <div className="containertemp2">
                                <div id="contentdownb1">
                                  <CustomDropdown
                                    options={filteredcatagory}
                                    label={"CATALOG CATEGORY"}
                                    value={templateData.catalog_category}
                                    onChange={(value) =>
                                      handleInputChange(
                                        "catalog_category",
                                        value
                                      )
                                    }
                                    onSelect={(selectedoption) =>
                                      handleSelect(
                                        "catalog_category",
                                        selectedoption
                                      )
                                    }
                                    readOnly={
                                      templatePagePermission === "readOnly"
                                    }
                                  />
                                </div>

                                {/* <div id="contentdownb2">
                                  <CustomDropdown
                                    options={salesorg}
                                    label={"SALES ORG"}
                                    onSelect={handleOptionSelect}
                                    readOnly={
                                      templatePagePermission === "readOnly"
                                    }
                                  />
                                </div> */}

                                <div id="contentdownb3">
                                  <CustomDropdown
                                    label={"STATUS"}
                                    options={catalogstatus}
                                    readOnly={
                                      templatePagePermission === "readOnly"
                                    }
                                    value={templateData.status}
                                    onChange={(value) =>
                                      handleSelect("status", value)
                                    }
                                    onSelect={(selectedoption) =>
                                      handleInputChange(
                                        "status",
                                        selectedoption
                                      )
                                    }
                                  />
                                </div>
                                <div id="contentdownb4">
                                  <InputTypes
                                    type={"number"}
                                    TextLabel="CURRENCY"
                                    showFlagText={true}
                                    onSelect={handleOptionSelect}
                                    readOnly={
                                      templatePagePermission === "readOnly"
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="tempright">
                              <div className="containerquoteGuide1">
                                <div id="listpricedd">
                                  <InputTypes
                                    type={"number"}
                                    TextLabel="LIST PRICE"
                                    textplaceholder={"$0.00"}
                                    showFlagText={true}
                                    readOnly={
                                      templatePagePermission === "readOnly"
                                    }
                                  />
                                </div>
                                <div id="discountdd">
                                  <InputTypes
                                    type={"number"}
                                    TextLabel="DISCOUNT"
                                    textplaceholder={"0%"}
                                    showFlagText={true}
                                    readOnly={
                                      templatePagePermission === "readOnly"
                                    }
                                  />
                                </div>
                                <div id="netpricedd">
                                  <InputTypes
                                    type={"number"}
                                    TextLabel="NET PRICE"
                                    textplaceholder={"$0.00"}
                                    showFlagText={true}
                                    readOnly={
                                      templatePagePermission === "readOnly"
                                    }
                                  />
                                </div>
                              </div>
                              <div className="containerqoute2">
                                <div id="expensesdd">
                                  <InputTypes
                                    TextLabel="EXPENSES"
                                    showFlagText={true}
                                    readOnly={
                                      templatePagePermission === "readOnly"
                                    }
                                  />
                                </div>
                                <div id="margindd">
                                  <InputTypes
                                    TextLabel="MARGIN"
                                    textplaceholder={"0%"}
                                    showFlagText={true}
                                    readOnly={
                                      templatePagePermission === "readOnly"
                                    }
                                  />
                                </div>
                                <div id="costdd">
                                  <InputTypes
                                    TextLabel="COST"
                                    showFlagText={true}
                                    readOnly={
                                      templatePagePermission === "readOnly"
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="contentqtemp">
                            <textarea
                              id="multiline-text"
                              name="multiline-text"
                              rows={4}
                              cols={50}
                              style={{
                                fontFamily: "Arial,Helvetica,sans-serif",
                                resize: "none",
                                padding: "6px",
                                overflowY: "hidden",
                              }}
                              value={templateData.description}
                              onChange={handleTextareaChange}
                            />
                            <label htmlFor="multiline-text">DESCRIPTION</label>
                          </div>

                          {!isReadOnly && (
                            <div className="delete_update_template">
                              <button
                                id="update_data"
                                onClick={
                                  mode === "create"
                                    ? addTemplate
                                    : handleUpdateTemplate
                                }
                                disabled={
                                  mode === "update" &&
                                  !areRequiredFieldsFilled()
                                }
                              >
                                {mode === "create" ? "CREATE" : "UPDATE"}
                              </button>
                              <button
                                id={
                                  deleteClicked
                                    ? "delete-highlight"
                                    : "delete_data"
                                }
                                ref={deleteButtonRef}
                                onClick={
                                  mode1 === "cancel"
                                    ? handleCancelClick
                                    : handelDeleteTemplate
                                }
                                disabled={
                                  mode1 !== "cancel" &&
                                  templateData.status === "PUBLISHED"
                                }
                              >
                                {mode1 === "cancel" ? "CANCEL" : "DELETE"}
                              </button>
                            </div>
                          )}
                          {/* {isGuideVisible && (
                            <div id="contentsum">
                              <CustomDropdown
                                label={"SUMMARY"}
                                options={filteredsummery}
                                labelforverticl={"label_summary"}
                                custuminput={"summaryinput"}
                                onSelect={handleOptionSelect}
                                readOnly={templatePagePermission === "readOnly"}
                                // showCancel={true}
                                // value={selectedOptionTemplate}
                                // onChange={(value) => setSelectedOption1(value)}
                              />
                            </div>
                          )} */}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div id="accessmsgdiv">
              <label id="accessmsg">
                NO TEMPLATE FOUND. PLEASE USE + TO ADD A NEW TEMPLATE
              </label>
            </div>
          )}
        </div>
        <div
          className="sidepanel"
          style={{
            width: accountOpen ? "24%" : "0%",
            display: accountOpen ? "block" : "none",
          }}
        >
          <SidePanel
            showFlagTimeStamp={accountOpen ? true : ""}
            showFlagExchangeRates={accountOpen ? true : ""}
            showFlagDoctypeAll={accountOpen ? true : ""}
            showFlagDocumentExport={accountOpen ? true : ""}
            showFlagWorddocument={accountOpen ? true : ""}
            showFlagPdfdocument={accountOpen ? true : ""}
            doctypePublished={doctypePublished}
            updateOptionsDoctype={updateOptionsDoctype}
            selectedOptionsContentdoctype={selectedOptionsContentdoctype}
            showFlagExternal={accountOpen ? true : ""}
            onClose={handleCloseSideBar}
            createdAt={formatDate(templateData.createdAt)}
            modifiedAt={formatDate(templateData.modifiedAt)}
            createdBy={templateData.createdBy}
            modifiedBy={templateData.modifiedBy}
            revision={templateData.revision}
            setUnSavedChange={setUnSavedChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Templates;
