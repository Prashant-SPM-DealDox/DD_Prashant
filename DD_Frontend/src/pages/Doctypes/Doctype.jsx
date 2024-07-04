import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../layouts/Navbar";
import "../../assets/css/doctype/Doctype.css";
import WriteFlexAll from "../../components/common/WriteFlexAll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileWord } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../../config";
import {
  faTrashAlt,
  faClone,
  faCheck,
  faCloudArrowUp,
  faSpinner,
  faX,
  faCloudArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import CatalogSidebar from "../../layouts/CatalogSidebar";
import { Link, useNavigate } from "react-router-dom";
import CustomDropdown from "../../components/common/CustomDropdown";
import HeaderBar from "../../components/common/HeaderBar";
import ErrorMessage from "../../components/common/ErrorMessage";
import DeleteAction from "../../components/common/DeleteAction";
import InputTypes from "../../components/common/InputTypes";
import HelpRequest from "../../components/common/HelpRequest";
import { useAuthContext } from "../../hooks/useAuthContext";
import {
  FaDochub,
  FaInfo,
  FaInfoCircle,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";
import { commonService, decryptData, encryptData } from "../../utils/common";
const filestack = require("filestack-js");
const client = filestack.init("ATu6ExKvPTfOS49qFhs4vz");

const initialContentData = {
  doctypeId: "",
  doc_name: "",
  category: "",
  status: "",
  purpose: "",
  templateFilePath: "",
  template_file: "",
  paper_size: "",
  watermark_file: "",
  watermark: false,
  toc: false,
  sections: [],
};

const Doctypes = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const {
    securityRoleData,
    catalogCategoryLookups
  } = useContext(DataContext);


  const doctypePagePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].catalog_doctypes
      : "";

  //avoide the URL jump by using the permission
  if (doctypePagePermission === "none") {
    navigate("/home");
  }

  const [doctypeData, setDoctypeData] = useState(initialContentData);
  const optionscatlogstatus = ["INACTIVE", "IN PROCESS", "PUBLISHED"];
  const optionspurpose = ["DOCUMENT"];
  const optionspapersize = [
    "INHERIT FROM WORD TEMPLATE",
    "LETTER",
    "LEGAL",
    "A4",
    "A3",
    "LETTER LANDSCAPE",
    "LEGAL LANDSCAPE",
    "A4 LANDSCAPE",
  ];
  const optionscategory = [...catalogCategoryLookups];
  const [headerChange, setHeaderChange] = useState("DOCUMENT TYPES");
  const isReadOnly = doctypePagePermission === "readOnly";
  const [showDownloadCancel, setShowDownloadCancel] = useState(false);
  const [showSaveCancel, setShowSaveCancel] = useState(false);
  const [showUpdateDelete, setShowUpdateDelete] = useState(true);
  const [isToastActive, setIsToastActive] = useState(false);
  const [plusIconClicked, setPlusIconClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const deleteButtonRef = useRef(null);
  const [copiedStatus, setCopiedStatus] = useState({});
  const [fileTypeError, setFileTypeError] = useState(false);
  const [unsupportedTagsError, setUnsupportedTagsError] = useState(false);
  const [, setSearchTerm] = useState("");
  const [uploadedWatermarkFileName, setUploadedWatermarkFileName] =
    useState("");
  const [showWatermarkDownloadCancel, setShowWatermarkDownloadCancel] =
    useState(false);
  const [sectionErrors, setSectionErrors] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dbDoctypeData, setDbDoctypeData] = useState([]);

  const handleInputChange = (fieldName, value) => {
    setDoctypeData({
      ...doctypeData,
      [fieldName]: value,
    });
    setUnsavedChanges(true);
  };
  const handleSelect = (fieldName, selectedOption) => {
    setDoctypeData({ ...doctypeData, [fieldName]: selectedOption });
    setUnsavedChanges(true);
  };
  const areRequiredFieldsFilled = () => {
    const sectionsFilled = doctypeData.sections.every(
      (section) =>
        section.section_name?.trim() !== "" &&
        section.section_tag?.trim() !== ""
    );
    return (
      doctypeData.doc_name &&
      doctypeData.status &&
      doctypeData.purpose &&
      sectionsFilled &&
      unsavedChanges
    );
  };
  const addSection = () => {
    const newSectionId = Date.now();
    const newSection = {
      id: newSectionId,
      section_name: "",
      section_tag: ``,
    };
    setDoctypeData((prevState) => ({
      ...prevState,
      sections: [...prevState.sections, newSection],
    }));
  };

  // Function to handle copy
  const handleCopy = async (id, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedStatus((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStatus((prev) => ({ ...prev, [id]: false }));
      }, 2000); // Reset the copied status after 2 seconds
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleMoveUp = (id, index) => {
    if (index > 0) {
      const updatedSections = [...doctypeData.sections];
      const currentSection = updatedSections[index];
      const previousSection = updatedSections[index - 1];
      updatedSections[index] = previousSection;
      updatedSections[index - 1] = currentSection;
      setDoctypeData((prevState) => ({
        ...prevState,
        sections: updatedSections,
      }));
      setUnsavedChanges(true);
    }
  };
  const handleMoveDown = (id, index) => {
    if (index < doctypeData.sections.length - 1) {
      const updatedSections = [...doctypeData.sections];

      [updatedSections[index], updatedSections[index + 1]] = [
        updatedSections[index + 1],
        updatedSections[index],
      ];
      setDoctypeData((prevState) => ({
        ...prevState,
        sections: updatedSections,
      }));
      setUnsavedChanges(true);
    }
  };

  const handleButtonClick = (index) => {
    const updatedSections = [...doctypeData.sections];
    updatedSections.splice(index, 1);
    setDoctypeData((prevState) => ({
      ...prevState,
      sections: updatedSections,
    }));
    setUnsavedChanges(true);
  };
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return; // Exit if no file is selected

    const fileName = file.name;
    const extension = fileName.split(".").pop().toLowerCase();

    // Check for file extension
    if (extension !== "doc" && extension !== "docx") {
      setFileTypeError(true);
      setShowDownloadCancel(false);
      return; // Stop execution if the file type is not supported
    } else {
      setFileTypeError(false);
    }
    setDoctypeData((prevState) => ({
      ...prevState,
      templateFilePath: fileName,
    }));

    setShowDownloadCancel(true);
    setIsUploading(true);

    try {
      // Perform the upload to Filestack
      const result = await client.upload(file);
      // console.log("File successfully uploaded to Filestack:", result);
      setDoctypeData((prevState) => ({
        ...prevState,
        templateFilePath: fileName,
      }));
      // You might not need to set this again since it's done above
      const filestackUrl = result.url; // This is your file's URL

      setDoctypeData((prevState) => ({
        ...prevState,
        template_file: filestackUrl,
      }));
    } catch (error) {
      console.error("Error uploading file to Filestack:", error);
      toast.error("Failed to upload:check if the file is empty");
    } finally {
      setIsUploading(false);
    }
    setUnsavedChanges(true);
  };

  const handleDownload = () => {
    if (doctypeData.template_file) {
      const link = document.createElement("a");
      link.href = doctypeData.template_file;
      link.download = doctypeData.templateFilePath;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("No file URL available for downloading.");
    }
  };

  const handleCancel = () => {
    setSearchTerm("");
    setShowDownloadCancel(false);
    setUploadedFile(null);
    setUnsavedChanges(true);
    setDoctypeData((prevState) => ({
      ...prevState,
      templateFilePath: "",
      template_file: "",
    }));
    // setDoctypeData((prevState) => ({
    //   ...prevState,
    // }));
  };
  const handleWatermarkUpload = (event) => {
    const fileInput = document.getElementById("watermarkFileInput");
    const file = event.target.files[0];
    const fileName = file.name.toLowerCase();
    const extension = fileName.split(".").pop();

    if (extension === "jpg" || extension === "jpeg" || extension === "png") {
      setUploadedWatermarkFileName(fileName);
      setShowWatermarkDownloadCancel(true);
      fileInput.value = "";
    } else {
      // console.log("Invalid file format. Only JPG and PNG images are allowed.");
    }
  };

  const handleWatermarkDownload = () => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([], { type: "image/*" }));
    link.download = uploadedWatermarkFileName;
    link.click();
  };

  const handleWatermarkCancel = () => {
    setUploadedWatermarkFileName("");
    setShowWatermarkDownloadCancel(false);
  };

  const handleSectionNameChange = (event, index) => {
    const value = event.target.value;
    const updatedErrors = [...sectionErrors];
    const updatedSections = [...doctypeData.sections];

    // Update section_name
    updatedSections[index].section_name = value;

    // Update section_tag
    updatedSections[index].section_tag =
      value.trim() !== "" ? `SECTION_${value.toUpperCase()}` : "";
    setDoctypeData((prevState) => ({
      ...prevState,
      sections: updatedSections,
    }));

    // Update textsection3 input value
    const textsection3 = `SECTION_${value.toUpperCase()}`;
    document.getElementById(`textsection3`).value = textsection3;

    // Update errors and styles
    if (value.trim() === "") {
      updatedErrors[index] = "SECTION NAME MAY NOT BE EMPTY";
      event.target.style.border = "2px solid red";
      event.target.style.outlineColor = "red";
    } else {
      updatedErrors[index] = "";
      event.target.style.border = "1px solid #ccc";
      event.target.style.outlineColor = "#216c98";
    }
    setSectionErrors(updatedErrors);
    // Set unsavedChanges to true
    setUnsavedChanges(true);
  };

  const handleDownloadClick = () => {
    const currentDateTime = new Date().toLocaleString().replace(/[/:]/g, "_");
    const wordContent = "";
    const blob = new Blob([wordContent], { type: "application/msword" });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = `DealDox_BaseTemplate${currentDateTime}.docx`;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
    anchor.remove();
  };

  // -------------------Adding Doctype -----------------------------
  const addDoctype = async () => {
    if (isUploading) {
      // Inform the user that the file is still uploading
      return;
    }
    try {
      const formData = new FormData();
      // Append all doctypeData fields to formData
      Object.entries(doctypeData).forEach(([key, value]) => {
        if (key !== "sections") {
          formData.append(key, value);
        }
      });
      // Append sections array
      doctypeData.sections.forEach((section, index) => {
        formData.append(
          `sections[${index}][section_name]`,
          section.section_name.trim()
        );
        formData.append(
          `sections[${index}][section_tag]`,
          section.section_tag.trim()
        );
      });
      const responseData = await commonService(
        "/api/doctype/add",
        "POST",
        formData
      );
      if (responseData.status === 200) {
        const addedDoctype = responseData.data.data;
        // console.log(addedDoctype, responseData);
        toast.success("Doctype added successfully");

        const encryptDoctyprId = encryptData(addedDoctype._id);
        localStorage.setItem("personId", encryptDoctyprId);
        localStorage.removeItem("previousPersonId");

        setDbDoctypeData((prevDoctype) => [...prevDoctype, addedDoctype]);

        setDoctypeData({
          doctypeId: "",
          doc_name: "",
          category: "",
          status: "",
          purpose: "",
          templateFilePath: "",
          template_file: "",
          paper_size: "",
          watermark_file: "",
          watermark: false,
          toc: false,
          sections: [], // Reset sections after adding
        });
      }
    } catch (error) {
      console.error("Error adding doctype:", error);
    }
  };

  // --------------GET DOCTYPE----------------------
  useEffect(() => {
    const getDoctypedata = async () => {
      try {
        const response = await commonService(`/api/doctype/get`, "GET");

        if (response.status === 200) {
          setDbDoctypeData(response.data.data);
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDoctypedata();
  }, [user]);

  // ----------------------UPDATE DOCTYPE-----------------

  const handleUpdateDoctype = async () => {
    if (!doctypeData.doc_name || !doctypeData.status || !doctypeData.purpose) {
      toast.success("Please fill required fields.");
      return;
    }

    try {
      const formData = new FormData();

      // Append all doctypeData fields to formData except sections
      Object.entries(doctypeData).forEach(([key, value]) => {
        if (key !== "sections") {
          formData.append(key, value);
        }
      });

      // Append sections array
      doctypeData.sections.forEach((section, index) => {
        formData.append(
          `sections[${index}][section_name]`,
          section.section_name.trim()
        );
        formData.append(
          `sections[${index}][section_tag]`,
          section.section_tag.trim()
        );
        if (section._id) {
          formData.append(`sections[${index}][_id]`, section._id);
        }
      });

      const response = await commonService(
        `/api/doctype/update/${doctypeData.doctypeId}`,
        "PUT",
        formData
      );

      if (response && response.status === 200) {
        toast.success("Doctype Updated successfully");

        // Update doctypeData including sections directly with response data

        setDbDoctypeData((prevDoctype) =>
          prevDoctype.map((item) =>
            item._id === doctypeData.doctypeId
              ? { ...item, ...response.data.data }
              : item
          )
        );
        setDoctypeData(response.data.data);

      } else if (response && response.status === 409) {
        toast.error(response.data.message);
      } else {
        toast.error("Duplicate Document Name");
      }
    } catch (error) {
      console.error("Error Updating Doctype", error);
      toast.error("Error Updating Doctype");
    }

    setUnsavedChanges(false);
  };

  // -------------------DELETE DOCTYPE--------------------

  const handleDeleteDoctype = async () => {
    if (!deleteClicked) {
      setDeleteClicked(true);
      return;
    }
    try {
      const response = await commonService(
        `/api/doctype/delete/${doctypeData.doctypeId}`,
        "DELETE"
      );
      if (response.status == 200) {
        toast.success("Doctype Removed successfully", {
          icon: (
            <span style={{ color: "red " }}>
              <FaTrash />
            </span>
          ),
          className: "custom-toast_delete",
        });
        const updatedDoctypeData = dbDoctypeData.filter(
          (item) => item._id !== doctypeData.doctypeId
        );
        setDbDoctypeData(updatedDoctypeData);
        handleItemSelect();
      }
    } catch (error) {
      console.log("Error Deletin Doctype:", error);
    }
  };

  const handleNavigation = (selectedId) => {
    const prevId = decryptData(localStorage.getItem("previousPersonId"));
    const currentId = decryptData(localStorage.getItem("personId"));
    // const encryotSelectedId = encryptData(selectedId);
    if (prevId && currentId) {
      localStorage.removeItem("previousPersonId");
      navigate(`/doctypes?id=${prevId}`);
    } else if (currentId) {
      navigate(`/doctypes?id=${selectedId}`);
    } else if (prevId) {
      navigate(`/doctypes`);
    }
  };

  useEffect(() => {
    handleNavigation(doctypeData.doctypeId);
  }, [doctypeData.doctypeId, dbDoctypeData]);
  // -----------------------------------
  const handleItemSelect = (selectedItem, selectedIndex) => {
    // if (selectedIndex >= 0 && selectedIndex < dbDoctypeData.length) {

    const selectedData =
      selectedIndex !== -1 ? dbDoctypeData[selectedIndex] : null;

    setDoctypeData({
      ...selectedData,
      doctypeId: selectedData?._id || "",
      doc_name: selectedData?.doc_name || "",
      category: selectedData?.category || "",
      status: selectedData?.status || "",
      purpose: selectedData?.purpose || "",
      paper_size: selectedData?.paper_size || "INHERIT FROM WORD TEMPLATE",
      templateFilePath: selectedData?.templateFilePath || "",
      template_file: selectedData?.template_file || "",
      watermark: selectedData?.watermark || false,
      toc: selectedData?.toc || false,
      sections: selectedData?.sections || [],
    });

    setShowSaveCancel(false);
    setShowUpdateDelete(true);
    setHeaderChange(selectedData ? "DOCUMENT TYPE" : "ADD DOCUMENT TYPE");

    if (selectedData?.templateFilePath) {
      setShowDownloadCancel(true);
    } else {
      setShowDownloadCancel(false);
    }
    setShowSaveCancel(selectedData ? false : true);
    setShowUpdateDelete(selectedData ? true : false);
    setPlusIconClicked(selectedData ? false : true);
  };
  // };
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
  // ----------------cancel doctype ------------------
  const handleCancelClick = () => {
    const previous = decryptData(localStorage.getItem("previousPersonId"));
    const encryptPrevious = encryptData(previous);
    localStorage.setItem("personId", encryptPrevious);
    const index = dbDoctypeData.findIndex(
      (item) => item._id === encryptPrevious
    );
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
            <Link
              to={`/doctypes?id=${doctypeData.doctypeId}`}
              className="breadcrumbs--link--active"
            >
              Document types
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />
      <div className="rowdoctypes">
        <WriteFlexAll
          data={dbDoctypeData}
          // resetFields={resetFields}
          onItemSelect={handleItemSelect}
          dataType="doctype"
          showGrouping={false}
          permission={doctypePagePermission}
          hasItems={dbDoctypeData.length > 0}
        />
        <div className="rightDoctype">
          <HeaderBar headerlabel={headerChange}>
            {!isReadOnly ? (
              <div className="worddownload" onClick={handleDownloadClick}>
                <span className="wordicon">
                  <FontAwesomeIcon
                    icon={faFileWord}
                    className="fas fa-file-word"
                  />
                </span>
                <label id="wordtemplatelabel">BASE TEMPLATE</label>
              </div>
            ) : null}
          </HeaderBar>
          {dbDoctypeData.length > 0 || plusIconClicked ? (
            <div>
              <div className="containerBV1">
                <ErrorMessage
                  type={"text"}
                  inputValueError={true}
                  showFlaxErrorMessageText={true}
                  errormsg={"DOCUMENT NAME IS A REQUIRED FIELD"}
                  label="DOCUMENT NAME"
                  value={doctypeData.doc_name}
                  onChange={(value) => handleInputChange("doc_name", value)}
                  readOnly={doctypePagePermission === "readOnly"}
                />
                <CustomDropdown
                  options={optionscategory}
                  label="CATALOG CATEGORY"
                  showCancel={true}
                  value={doctypeData.category}
                  onChange={(value) => handleInputChange("category", value)}
                  onSelect={(selectedOption) =>
                    handleSelect("category", selectedOption)
                  }
                  readOnly={doctypePagePermission === "readOnly"}
                />
                <CustomDropdown
                  options={optionscatlogstatus}
                  label="CATALOG STATUS"
                  isBorderVisible={true}
                  showCancel={true}
                  value={doctypeData.status}
                  onChange={(value) => handleInputChange("status", value)}
                  onSelect={(selectedOption) =>
                    handleSelect("status", selectedOption)
                  }
                  readOnly={doctypePagePermission === "readOnly"}
                />
                <CustomDropdown
                  options={optionspurpose}
                  label="PURPOSE"
                  isBorderVisible={true}
                  showCancel={true}
                  value={doctypeData.purpose}
                  onChange={(value) => handleInputChange("purpose", value)}
                  onSelect={(selectedOption) =>
                    handleSelect("purpose", selectedOption)
                  }
                  readOnly={doctypePagePermission === "readOnly"}
                />
              </div>
              <div className="containerBV5">
                <div id="contentBV5">
                  <input
                    type="file"
                    id="fileInput"
                    hidden
                    onChange={handleUpload}
                    accept=".doc, .docx"
                    className={`tempname ${
                      unsupportedTagsError ? "error" : ""
                    }`}
                  />
                  <div className="input-with-icon">
                    <input
                      className={`watermarkifilename ${
                        unsupportedTagsError ? "error" : ""
                      }`}
                      type="text"
                      value={doctypeData.templateFilePath}
                      // uploadedFileName
                      readOnly
                    />
                    <div className="upload-icons">
                      {isUploading ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="fa-spin"
                          style={{ marginRight: "10px" }}
                        />
                      ) : (
                        <>
                          <FontAwesomeIcon
                            icon={faCloudArrowUp}
                            id="uploadiconDoctype"
                            onClick={() =>
                              document.getElementById("fileInput").click()
                            }
                          />
                          {fileTypeError && (
                            <div className="error-message">
                              Invalid file format. Only Word files (.doc, .docx)
                              are allowed.
                            </div>
                          )}
                          {unsupportedTagsError && (
                            <div className="error-message red">
                              The template contains unsupported free defined
                              tags.
                            </div>
                          )}
                          {showDownloadCancel && (
                            <>
                              <FontAwesomeIcon
                                icon={faCloudArrowDown}
                                id="dowicondoctype"
                                onClick={handleDownload}
                              />
                              <FontAwesomeIcon
                                icon={faX}
                                id="canceldoctypeicon"
                                onClick={handleCancel}
                              />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <label id="templab">TEMPLATE NAME</label>
                </div>
                <CustomDropdown
                  options={optionspapersize}
                  label="PAPER SIZE"
                  selectedOption="INHERIT FROM WORD TEMPLATE"
                  value={doctypeData.paper_size}
                  onChange={(value) => handleInputChange("paper_size", value)}
                  onSelect={(selectedoption) =>
                    handleSelect("paper_size", selectedoption)
                  }
                  readOnly={doctypePagePermission === "readOnly"}
                />
                <div id="contentBV7">
                  <div className="uploadiconDoctypewatermark" id="contentBV5">
                    <input
                      // type="file"
                      id="watermarkFileInput"
                      hidden
                      onChange={handleWatermarkUpload}
                      accept=".jpg, .jpeg, .png"
                      className="watermarkifilename"
                      readOnly
                    />
                    <div className="input-with-icon">
                      <input
                        className="watermarkifilename"
                        type="text"
                        value={uploadedWatermarkFileName}
                        readOnly
                      />
                      <div className="upload-icons">
                        <FontAwesomeIcon
                          icon={faCloudArrowUp}
                          id="uploadwatermark"
                          // onClick={() =>
                          //   document
                          //     .getElementById("watermarkFileInput")
                          //     .click()
                          // }
                        />
                        {showWatermarkDownloadCancel && (
                          <>
                            <FontAwesomeIcon
                              icon={faCloudArrowDown}
                              id="dowicondoctypewatermark"
                              onClick={handleWatermarkDownload}
                            />
                            <FontAwesomeIcon
                              icon={faX}
                              id="canceldoctypeiconwatermark"
                              onClick={handleWatermarkCancel}
                            />
                          </>
                        )}
                      </div>
                    </div>
                    <label id="waterlab">WATERMARK FILE</label>
                  </div>
                </div>

                <div className="watermarkleft">
                  {" "}
                  <InputTypes
                    showFlagCheckBox={true}
                    Checkboxlabel={"WATER MARK"}
                    readOnly={true}
                    greyoutcheckboxLabelId={"greyoutcheckboxLabelId"}
                    value={doctypeData.watermark}
                    onChange={(value) => handleInputChange("watermark", value)}
                    // readOnly={doctypePagePermission === "readOnly"}
                  />
                </div>

                <div className="watermarkright">
                  <InputTypes
                    showFlagCheckBox={true}
                    Checkboxlabel={"TOC"}
                    readOnly={true}
                    greyoutcheckboxLabelId={"greyoutcheckboxLabelId"}
                    value={doctypeData.toc}
                    onChange={(value) => handleInputChange("toc", value)}
                    // readOnly={doctypePagePermission === "readOnly"}
                  />
                </div>
              </div>
              <div className="sections">
                <HeaderBar headerlabel={"SECTIONS"} />
              </div>
              <div className="containersection">
                <label id="ReorderSections">Reorder Sections</label>
                <div className="containersection1">
                  <label id="SectionName">Section Name</label>
                </div>
                <div className="containersection2">
                  <label id="SectionTag">Section Tag</label>
                </div>
              </div>
              {doctypeData.sections.map((section, index) => (
                <div key={section.id}>
                  <div className="addsectionbuttoninput">
                    <div>
                      <div id="textsection1">
                        {index > 0 && (
                          <button
                            id="moveupdoctype"
                            onClick={() => handleMoveUp(section.id, index)}
                          >
                            MOVEUP
                          </button>
                        )}
                        {index < doctypeData.sections.length - 1 && (
                          <button
                            id="movedowndoctype"
                            className={index === 0 ? "movedownDoctype" : ""}
                            onClick={() => handleMoveDown(section.id, index)}
                          >
                            MOVEDOWN
                          </button>
                        )}
                      </div>
                    </div>
                    <div id="doctypesectionnmae">
                      <input
                        type="text"
                        id={`textsection2`}
                        onChange={(event) =>
                          handleSectionNameChange(event, index)
                        }
                        value={section.section_name}
                        className={`section-inputerror ${
                          sectionErrors[index] ? "red-outline" : ""
                        } `}
                        style={{
                          borderLeft: section.section_name?.trim()
                            ? "1px solid #ccc"
                            : "3px solid #216c98",
                        }}
                        readOnly={doctypePagePermission === "readOnly"}
                      />
                      <i
                        className="fa fa-pencil"
                        aria-hidden="true"
                        id="editsectionDctype"
                      />
                      <label
                        htmlFor={`textsection2`}
                        id="sectionNAMElabel21"
                        className={`label ${
                          sectionErrors[index] ? "label-hide" : ""
                        }`}
                      >
                        SECTION NAME
                      </label>

                      {sectionErrors[index] && (
                        <div className="errormessagedoctype">
                          {sectionErrors[index]}
                        </div>
                      )}
                    </div>

                    <div className="input-with-copy">
                      <input
                        type="text"
                        id={`textsection3`}
                        value={section.section_tag}
                        readOnly={doctypePagePermission === "readOnly"}
                      />
                      <label htmlFor="textsection3" id="sectionNAMElabel22">
                        SECTION TAG
                      </label>
                    </div>
                    <div className="cpoybutton">
                      {section.section_tag && (
                        <button
                          className="copy-buttonsection"
                          onClick={() =>
                            handleCopy(section._id, `$${section.section_tag}$`)
                          }
                        >
                          <FontAwesomeIcon
                            icon={copiedStatus[section._id] ? faCheck : faClone}
                          />
                        </button>
                      )}
                    </div>
                    {!isReadOnly ? (
                      <div>
                        <DeleteAction
                          onDelete={() => handleButtonClick(index)}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
              <div className="buttonsection">
                {!isReadOnly && (
                  <button id="addsectionbuttoncss" onClick={addSection}>
                    + ADD SECTION
                  </button>
                )}
              </div>

              {!isReadOnly && (
                <div className="flxecancelsave">
                  {showSaveCancel && (
                    <div className="save_cancel_content">
                      <button
                        id="save_data"
                        type="submit"
                        onClick={addDoctype}
                        disabled={!areRequiredFieldsFilled() || !unsavedChanges}
                        style={{ width: "70px" }}
                      >
                        CREATE
                      </button>
                      <button
                        id="reset_data"
                        type="reset"
                        onClick={handleCancelClick}
                      >
                        CANCEL
                      </button>
                    </div>
                  )}
                  {showUpdateDelete && (
                    <div className="delete_update_content">
                      <button
                        id="update_data"
                        type="submit"
                        onClick={handleUpdateDoctype}
                        disabled={!areRequiredFieldsFilled()}
                      >
                        UPDATE
                      </button>
                      <button
                        id={deleteClicked ? "delete-highlight" : "delete_data"}
                        ref={deleteButtonRef}
                        onClick={handleDeleteDoctype}
                        disabled={doctypeData.status === "PUBLISHED"}
                      >
                        REMOVE
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div id="accessmsgdiv">
              <label id="accessmsg">
                NO DOCTYPE FOUND. PLEASE USE + TO ADD A NEW DOCTYPE
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Doctypes;
