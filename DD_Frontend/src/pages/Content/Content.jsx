import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../layouts/Navbar";
import "../../assets/css/content/Content.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/common/ErrorMessage";
import CustomDropdown from "../../components/common/CustomDropdown";
import InputTypes from "../../components/common/InputTypes";
import HeaderBar from "../../components/common/HeaderBar";
import WriteFlexAll from "../../components/common/WriteFlexAll";
import CatalogSidebar from "../../layouts/CatalogSidebar";
import { FROALA_LICENSE_KEY } from "../../config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import SidePanel from "../../components/common/SidePanel.jsx";
import HelpRequest from "../../components/common/HelpRequest.jsx";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";
import { commonService, encryptData } from "../../utils/common.js";

const initialContentData = {
  content_name: "",
  sales_org: "",
  catalog_number: 0,
  catalog_category: "",
  locked: false,
  content: "",
  created_by: "",
  modified_by: "",
  createdAt: "",
  modifiedAt: "",
  revision: 0,
};
const Content = () => {
  const [contentId, setContentId] = useState("");
  const [contentData, setcontentData] = useState(initialContentData);
  const [showSaveCancel, setShowSaveCancel] = useState(false);
  const [showUpdateDelete, setShowUpdateDelete] = useState(true);
  const [plusIconClicked, setPlusIconClicked] = useState(false);
  const [contentSidebar, setcontentSidebar] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [dbContentData, setDbContentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const deleteButtonRef = useRef(null);

  const { user } = useAuthContext();
  const navigate = useNavigate();
  const {
    securityRoleData,
    catalogCategoryLookups,
  } = useContext(DataContext);


  const contenetPagePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].catalog_content
      : "";

  //avoide the URL jump by using the permission
  if (contenetPagePermission === "none") {
    navigate("/home");
  }

  const isReadOnly = contenetPagePermission === "readOnly";

  // const handleSalesOrgSelect = (selectedOption) => {
  //   setSalesOrg(selectedOption);
  // };
  const handleCategorySelect = (selectedOption) => {
    setcontentData({ ...contentData, catalog_category: selectedOption });
  };
  const handleModelChange = (fieldName, model) => {
    setcontentData({ ...contentData, [fieldName]: model });
  };
  const handleInputChange = (fieldName, value) => {
    setcontentData({ ...contentData, [fieldName]: value });
  };

  const userName =
    user && user.userType === "admin"
      ? `${user.admin.firstname} ${user.admin.lastname}`
      : "" || (user && user.userType === "people")
      ? `${user.people.first_name} ${user.people.last_name}`
      : "";

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
  // -------------------SAVE CONTENT DATA -----------------------------

  const saveContent = async (event) => {
    const createdcontentData = {
      ...contentData,
      created_by: userName,
    };
    try {
      const responseData = await commonService("/api/content/add", "POST", {
        createdcontentData,
      });
      if (responseData.status === 200) {
        toast.success("Content saved successfully");
        const encryptcontentId = encryptData(
          responseData.data.data.Contents_data._id
        );
        localStorage.setItem("personId", encryptcontentId);
        localStorage.removeItem("previousPersonId");
        setDbContentData((prevContent) => [
          ...prevContent,
          responseData.data.data.Contents_data,
        ]);
        setcontentData({ ...contentData, content_name: "" });
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error saving content:", error);
    }
  };

  // ---------------------GET CONTENT DATA-------------------------------

  useEffect(() => {
    const getContentData = async () => {
      setIsLoading(true);
      try {
        const response = await commonService("/api/content/get", "GET");
        if (response.status === 200) {
          setIsLoading(false);
          setDbContentData(response.data.data);
        } else {
          // Handle non-success responses if needed
          console.error("Failed to fetch content data");
        }
      } catch (error) {
        console.error("Error fetching content data:", error);
      }
    };
    getContentData();
  }, [user]);

  // -----------------------UPDATE CONTENT-----------------------------

  const handleUpdateContent = async () => {
    try {
      setIsLoading(true);
      const originalContentData = dbContentData.find(
        (item) => item._id === contentId
      );
      const contentChanged =
        JSON.stringify(contentData) !== JSON.stringify(originalContentData);

      if (contentChanged) {
        const revisionCount = contentData.revision
          ? contentData.revision + 1
          : 1;
        const updateContentData = {
          ...contentData,
          modified_by: userName,
          modifiedAt: new Date(),
          revision: revisionCount,
        };
        const response = await commonService(
          `/api/content/update/${contentId}`,
          "PUT",
          updateContentData
        );

        if (response.status === 200) {
          setIsLoading(false);
          setDbContentData((prevContent) =>
            prevContent.map((item) =>
              item._id === contentId ? updateContentData : item
            )
          );

          setcontentData(updateContentData);
          toast.success(response.data.message);
        } 
        if(response.status===201){
          setIsLoading(false);
          toast.error(response.data.message)
        }else {
          throw new Error("Failed to update content");
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------DELETE CONTENT------------------------------
  const handleDeleteContent = async () => {
    if (!deleteClicked) {
      setDeleteClicked(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await commonService(
        `/api/content/delete/${contentId}`,
        "DELETE"
      );
      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Content deleted successfully", {
          icon: (
            <span style={{ color: "red" }}>
              <FaTrash />
            </span>
          ),
          className: "custom-toast_delete",
        });

        const updatedDbContentData = dbContentData.filter(
          (item) => item._id !== contentId
        );
        setDbContentData(updatedDbContentData);
        handleItemSelect();
        setDeleteClicked(false);
      } else {
        throw new Error("Failed to delete content");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete content");
      setDeleteClicked(false);
      setIsLoading(false);
    }
  };
  // --------------------Cancel CONTENT-------------------------
  const handleCancelClick = () => {
    const previous = localStorage.getItem("previousPersonId");
    localStorage.setItem("personId", previous);
    const index = dbContentData.findIndex((item) => item._id === previous);
    handleItemSelect(null, index);
  };
  // --------------------------------------------------
  useEffect(() => {
    handleNavigation(contentId);
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
  }, [contentId, contentData]);

  const handleItemSelect = (selectedItem, selectedIndex) => {
    const selectedData =
      selectedIndex !== -1 ? dbContentData[selectedIndex] : null;

    setContentId(selectedData?._id || "");
    setcontentData({
      ...initialContentData,
      ...selectedData,
    });
    setShowSaveCancel(selectedData ? false : true);
    setShowUpdateDelete(selectedData ? true : false);
    setPlusIconClicked(selectedData ? false : true);
  };

  const handleNavigation = (selectedId) => {
    const prevId = localStorage.getItem("previousPersonId");
    const currentId = localStorage.getItem("personId");
    if (prevId && currentId) {
      localStorage.removeItem("previousPersonId");
      navigate(`/catalog-contents?id=${prevId}`);
    } else if (currentId) {
      navigate(`/catalog-contents?id=${selectedId}`);
    } else if (prevId) {
      navigate(`/catalog-contents`);
    }
  };
  // ------------------------------------------------------------------
  const editorConfig = {
    key: FROALA_LICENSE_KEY,
    toolbarButtons: [
      "fontAwesome",
      "fontFamily",
      "fontSize",
      "undo",
      "redo",
      "getPDF",
      "bold",
      "italic",
      "underline",
      "textColor",
      "backgroundColor",
      "clearFormatting",
      "alignLeft",
      "alignCenter",
      "alignRight",
      "alignJustify",
      "formatOL",
      "formatUL",
      "indent",
      "outdent",
      "paragraphFormat",
      "insertLink",
      "insertImage",
      "print",
      "quote",
      "html",
    ],
    inlineMode: true,
    alwaysVisible: true,
  };
  // const optionscontent = [];
  const optionscontentCATEGARY = [...catalogCategoryLookups];
  const areRequiredFieldsFilled = () => {
    return contentData.content_name;
  };

  const handleContentSideBar = () => {
    setcontentSidebar(true);
  };
  const handleCloseSideBar = () => {
    setcontentSidebar(false);
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
              Content
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />
      <div className="rowcontent">
        <WriteFlexAll
          showGrouping={false}
          data={dbContentData}
          onItemSelect={handleItemSelect}
          dataType="content"
          permission={contenetPagePermission}
          hasItems={dbContentData.length > 0}
        />

        <div
          className="rightcontent"
          style={{
            width: contentSidebar ? "65%" : "80%",
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
                onClick={handleContentSideBar}
                style={{ display: contentSidebar ? "none" : "block" }}
              >
                {contentSidebar ? <FaGreaterThan /> : <FaLessThan />}
              </button>
              <div id="headercontent">
                <HeaderBar headerlabel=" CATALOG CONTENT" />
              </div>
              {dbContentData.length > 0 || plusIconClicked ? (
                <div id="createcontent">
                  <div className="containercontent1">
                    <div id="cc1">
                      <ErrorMessage
                        type={"text"}
                        label="TITLE"
                        showFlaxErrorMessageText={true}
                        errormsg={"TITLE IS REQUIRED FIELD"}
                        placeholdersection={"Enter item Name"}
                        value={contentData.content_name}
                        onChange={(value) =>
                          handleInputChange("content_name", value)
                        }
                        readOnly={contenetPagePermission === "readOnly"}
                      />
                    </div>
                    {/* <div id="cc2">
                  <CustomDropdown
                    options={optionscontent}
                    label="SALES ORG"
                    onSelect={handleSalesOrgSelect}
                    value={salesOrg}
                    Placeholder={"Select Org"}
                    onChange={(value) => setSalesOrg(value)}
                    readOnly={contenetPagePermission === "readOnly"}
                  />
                </div> */}
                    <div id="cc3">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        TextLabel={"CATALOG NUMBER"}
                        value={
                          contentData.catalog_number
                            ? contentData.catalog_number
                            : ""
                        }
                        textplaceholder={"Enter Catalog Number"}
                        onChange={(value) =>
                          handleInputChange("catalog_number", value)
                        }
                        readOnly={true}
                        greyoutLabelId={"greyoutLabelId"}
                        greyoutInputId={"greyoutInputId"}
                      />
                    </div>
                    <div id="cc4">
                      <div id="rolesetupcontent2">
                        <CustomDropdown
                          options={optionscontentCATEGARY}
                          label="CATALOG CATEGORY"
                          showCancel={true}
                          Placeholder="Select Categary"
                          onSelect={handleCategorySelect}
                          value={contentData.catalog_category}
                          onChange={(value) =>
                            handleInputChange("catalog_category", value)
                          }
                          readOnly={contenetPagePermission === "readOnly"}
                        />
                      </div>
                    </div>
                    <div id="cc5">
                      <InputTypes
                        showFlagCheckBox={true}
                        Checkboxlabel={"LOCKED"}
                        value={contentData.locked}
                        onChange={(value) => handleInputChange("locked", value)}
                        readOnly={contenetPagePermission === "readOnly"}
                      />
                    </div>
                  </div>
                  <div
                    className="requillgridcontent"
                    style={{ maxWidth: "100%" }}
                  >
                    <FroalaEditorComponent
                      tag="textarea"
                      config={editorConfig}
                      model={contentData.content}
                      onModelChange={(model) =>
                        handleModelChange("content", model)
                      }
                      readOnly={contenetPagePermission === "readOnly"}
                    />
                  </div>
                  {!isReadOnly && (
                    <div>
                      {showSaveCancel && (
                        <div className="save_cancel_content">
                          <button
                            id="save_data"
                            type="submit"
                            onClick={saveContent}
                            disabled={!areRequiredFieldsFilled()}
                          >
                            SAVE NEW ITEM
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
                            onClick={handleUpdateContent}
                          >
                            UPDATE
                          </button>
                          <button
                            type="reset"
                            onClick={handleDeleteContent}
                            id={
                              deleteClicked ? "delete-highlight" : "delete_data"
                            }
                            ref={deleteButtonRef}
                          >
                            DELETE
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div id="accessmsgdiv">
                  <label id="accessmsg">
                    NO CONTENT FOUND. PLEASE USE + TO ADD A NEW CONTENT
                  </label>
                </div>
              )}
            </>
          )}
        </div>
        <div
          className="sidepanel"
          style={{
            width: contentSidebar ? "20%" : "0%",
            display: contentSidebar ? "block" : "none",
          }}
        >
          <SidePanel
            showFlagFiles={contentSidebar ? true : ""}
            showFlagNotes={contentSidebar ? true : ""}
            showFlagTimeStamp={contentSidebar ? true : ""}
            onClose={handleCloseSideBar}
            createdBy={contentData.created_by}
            modifiedBy={contentData.modified_by}
            createdAt={formatDate(contentData.createdAt)}
            modifiedAt={formatDate(contentData.modifiedAt)}
            revision={contentData.revision}
          />
        </div>
      </div>
    </div>
  );
};
export default Content;
