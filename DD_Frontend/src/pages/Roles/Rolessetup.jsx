
import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../layouts/Navbar";
import CatalogSidebar from "../../layouts/CatalogSidebar";
import CustomDropdown from "../../components/common/CustomDropdown";
import ErrorMessage from "../../components/common/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import Categories from "../../components/categaries/Categaries";
import InputTypes from "../../components/common/InputTypes";
import WriteFlexAll from "../../components/common/WriteFlexAll";
import "../../assets/css/roles/Rolessetup.css";
import HeaderBar from "../../components/common/HeaderBar";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import { FROALA_LICENSE_KEY } from "../../config";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaGreaterThan, FaLessThan } from "react-icons/fa";
import HelpRequest from "../../components/common/HelpRequest";
import DataContext from "../../dataContext/DataContext";
import SidePanel from "../../components/common/SidePanel";
import { useContext } from "react";
import { commonService, decryptData, encryptData } from "../../utils/common";

const initialRolesData = {
  rolesId: "",
  role_name: "",
  role_cat_category: "",
  role_cat_status: "",
  role_type: "",
  role_group: "",
  role_practice: "",
  parent_role: "",
  role_exter_ref: "",
  role_pro_disc: false,
  role_category_1: "",
  role_category_2: "",
  role_category_3: "",
  role_category_4: "",
  role_category_5: "",
  role_category_6: "",
  created_by: "",
  modified_by: "",
  createdAt: "",
  modifiedAt: "",
  revision: 0,
};
const Rolessetup = () => {
  const [roleStateFro, setRoleStateFro] = useState({
    showSaveCancel: false,
    showUpdateDelete: true,
    plusIconClicked: false,
    deleteClicked: false,
    toastShown: false,
  });
  const [roleState, setRoleState] = useState(initialRolesData);
  const [catalogOpenSideBar, setcatalogOpenSideBar] = useState(false);
  const [dbRolesData, setDbRolesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const deleteButtonRef = useRef(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // ******************************************************************************************************************************
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const {
    securityRoleData,
    practiceLookups,
    catalogCategoryLookups,
    roleGroupLookups
  } = useContext(DataContext);

  const rolesSetupPagePermission =
    securityRoleData && securityRoleData.length > 0 ? securityRoleData[0].catalog_roles : "";

    //avoide the URL jump by using the permission
    if(rolesSetupPagePermission === "none"){
      navigate('/home')
    }
  

  const optionroletype = [];
  const optionrolegroup = [...roleGroupLookups];
  const optionpractice = [...practiceLookups];
  const optionparentrole = [];
  const optioncatalog = [...catalogCategoryLookups];
  const optionstatus = ["INACTIVE", "IN PROCESS", "PUBLISHED"];
  const isReadOnly = rolesSetupPagePermission === "readOnly";
  // ********************************************FROALA EDITOR*******************************************************************************
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
  // ********************************************TIME STAMP***************************************************************************
  const userName =
    user && user.userType === "admin"
      ? `${user.admin.firstname} ${user.admin.lastname}`
      : "" || (user && user.userType === "people")
      ? `${user.people.first_name} ${user.people.last_name}`
      : "";
  let addToastDisplayed = false;
  // *************************************************ADD ROLE DATA*************************************************************************
  const handleAddRolesSetup = async (event) => {
    const newRolesSetup = {
      ...roleState,
      created_by: userName,
      createdAt: new Date(),
    };

    try {
      setIsLoading(true);
      const responseData = await commonService(
        "/api/roles/add",
        "POST",
        newRolesSetup
      );

      if (responseData.status === 200) {
        setIsLoading(false);
        toast.success("Role Saved Successfully");
        const encryptedrolesId = encryptData(responseData.data.data.rolesData._id);
        localStorage.setItem("personId", encryptedrolesId);
        localStorage.removeItem("previousPersonId");
        setDbRolesData((prevContent) => [
          ...prevContent,
          responseData.data.data.rolesData,
        ]);
        setRoleState({ ...roleState, role_name: "" });
      }
    } catch (error) {
      console.log("Error Saving Roles");
      setIsLoading(false);
    }
  };
  // **************************************************GET ROLES DATA***********************************************************
  useEffect(() => {
   
    const getRolesData = async () => {
      setIsLoading(true);
      try {
        const response = await commonService("/api/roles/get", "GET");
        if (response.status === 200) {
          setIsLoading(false);
          setDbRolesData(response.data.data);
        } else {
          // Handle non-success responses if needed
          console.error("Failed to fetch Rolessetup data");
        }
      } catch (error) {
        console.error("Error fetching Rolessetup data:", error);
      }
    };
    getRolesData();
    
  }, [user]);
  // ******************************************************UPDATE ROLES**************************************************************
  const handleUpdateRoles = async () => {
    try {
      const originalRolesdata = dbRolesData.find(
        (item) => item._id === roleState.rolesId
      );
      const roleChanged =
        JSON.stringify(roleState) !== JSON.stringify(originalRolesdata);
      if (roleChanged) {
        const revisionCount = roleState.revision ? roleState.revision + 1 : 1;
        const updatedRole = {
          ...roleState,
          modified_by: userName,
          modifiedAt: new Date(),
          revision: revisionCount,
        };
        setIsLoading(true);
        const response = await commonService(
          `/api/roles/update/${roleState.rolesId}`,
          "PUT",
          updatedRole
        );
        if (response.status === 200) {
          setIsLoading(false);
          setDbRolesData((prevData) =>
            prevData.map((item) =>
              item._id === roleState.rolesId
                ? { ...item, ...updatedRole }
                : item
            )
          );
          setRoleState(updatedRole);
          toast.success(response.data.message);
        }
        if(response.status===201){
          setIsLoading(false);
          toast.error(response.data.message)
        } else {
          throw new Error("Failed to update Role");
        }
      } 
    } catch (error) {
      console.error("Error:", error);
    }
  };
 
  // *******************************************************HANDLE ITEM SELECT FUNCTION************************************************************************
  const handleItemSelect = (selectedItem, selectedIndex) => {
    const selectedData =
      selectedIndex !== -1 ? dbRolesData[selectedIndex] : null;
    setRoleState(() => ({
      ...initialRolesData,
      ...selectedData,
      rolesId: selectedData?._id || "",
    }));
    setRoleStateFro(() => ({
      ...roleStateFro,
      showSaveCancel: selectedData ? false : true,
      showUpdateDelete: selectedData ? true : false,
      plusIconClicked: selectedData ? false : true,
    }));
  };
  // ******************************************************************************************************************************
  const handleNavigation = (selectedId) => {
    const prevId = decryptData(localStorage.getItem("previousPersonId"));
    const currentId = decryptData(localStorage.getItem("personId"));
    if (prevId && currentId) {
      localStorage.removeItem("previousPersonId");
      navigate(`/catalog-roles?id=${prevId}`);
    } else if (currentId) {
      navigate(`/catalog-roles?id=${selectedId}`);
    } else if (prevId) {
      navigate(`/catalog-roles`);
    }
  };
 
  useEffect(() => {
    handleNavigation(roleState.rolesId);
  }, [roleState]);
  //*********************************************** DELETE ROLES*******************************************************************
  const handleDeleteRoles = async () => {
    if (!roleStateFro.deleteClicked) {
      setRoleStateFro({
        ...roleStateFro,
        deleteClicked: true,
      });
      return;
    }
    try {
      const response = await commonService(
        `/api/roles/delete/${roleState.rolesId}`,
        "DELETE"
      );
      if (response.status === 200) {
        toast.success("Role deleted successfully", {
          icon: (
            <span style={{ color: "red" }}>
              <FaTrash />
            </span>
          ),
          className: "custom-toast_delete",
        });
        const updatedDbRolesData = dbRolesData.filter(
          (item) => item._id !== roleState.rolesId
        );
        setDbRolesData(updatedDbRolesData);
        handleItemSelect();
        setRoleStateFro({
          ...roleStateFro,
          deleteClicked: false,
        });
      } else {
        throw new Error("Failed to delete Role");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete Role");
      setRoleStateFro({
        ...roleStateFro,
        deleteClicked: false,
      });
    }
  };
  // *******************************************************************************************************************************
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
  // ******************************************************************************************************************************
  const handleCancelClick = () => {
    const previous = localStorage.getItem("previousPersonId");
    localStorage.setItem("personId", previous);
    const index = dbRolesData.findIndex((item) => item._id === previous);
    handleItemSelect(null, index);
  };
  // ******************************************************************************************************************************
  const areRequiredFieldsFilled = () => {
    return roleState.role_name;
  };
  // ******************************************************************************************************************************
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        deleteButtonRef.current &&
        !deleteButtonRef.current.contains(event.target)
      ) {
        setRoleStateFro({
          ...roleStateFro,
          deleteClicked: false,
          isDropdownOpen: roleStateFro.isDropdownOpen,
        });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 
  // ***************************************************************************************************************************
  const handleOpenCatalogSideBar = () => {
    setcatalogOpenSideBar(true);
  };
  const handleCloseCatalogSideBar = () => {
    setcatalogOpenSideBar(false);
  };
  const handleToggledescription = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleInputChange = (fieldName, value) => {
    setRoleState({ ...roleState, [fieldName]: value });
  };
  const handleSelect = (fieldName, selectedOption) => {
    setRoleState({ ...roleState, [fieldName]: selectedOption });
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
            <Link
              to={`/catalog-roles?id=${roleState.rolesId}`}
              className="breadcrumbs--link_mid"
            >
              Catalog
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link
              to={`/catalog-roles?id=${roleState.rolesId}`}
              className="breadcrumbs--link_mid"
            >
              Roles
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="" className="breadcrumbs--link--active">
              Setup
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />
      <div className="rowrolesetup">
        <WriteFlexAll
          showGrouping={false}
          data={dbRolesData}
          onItemSelect={handleItemSelect}
          dataType="rolesetup"
          permission={rolesSetupPagePermission}
          hasItems={dbRolesData.length > 0}
        />
        <div
          className="rightrolesetup"
          style={{
            width: catalogOpenSideBar ? "65%" : "80%",
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
                onClick={handleOpenCatalogSideBar}
                style={{
                  display: catalogOpenSideBar ? "none" : "block",
                }}
              >
                {catalogOpenSideBar ? <FaGreaterThan /> : <FaLessThan />}
              </button>
              <div>
                <HeaderBar headerlabel="CATALOG ROLES" />
              </div>
              {dbRolesData?.length > 0 || roleStateFro.plusIconClicked ? (
                <div id="create_roles">
                  <div className="rolesetupcontainer1">
                    <ErrorMessage
                      type={"text"}
                      label="ROLE NAME"
                      showFlaxErrorMessageText={true}
                      errormsg="ROLE PROFILE NAME IS REQUIRED"
                      value={roleState.role_name}
                      onChange={(value) =>
                        handleInputChange("role_name", value)
                      }
                      readOnly={rolesSetupPagePermission === "readOnly"}
                    />
                    <div id="rolesetupcontent2">
                      <CustomDropdown
                        options={optioncatalog}
                        showCancel={true}
                        label="CATALOG CATEGORY"
                        value={roleState.role_cat_category}
                        onChange={(value) =>
                          handleInputChange("role_cat_category", value)
                        }
                        onSelect={(selectedOption) =>
                          handleSelect("role_cat_category", selectedOption)
                        }
                        readOnly={rolesSetupPagePermission === "readOnly"}
                      />
                    </div>
                    <div id="rolesetupcontent3">
                      <CustomDropdown
                        options={optionstatus}
                        label="CATALOG STATUS"
                        showCancel={true}
                        value={roleState.role_cat_status}
                        onChange={(value) =>
                          handleInputChange("role_cat_status", value)
                        }
                        onSelect={(selectedOption) =>
                          handleSelect("role_cat_status", selectedOption)
                        }
                        readOnly={rolesSetupPagePermission === "readOnly"}
                      />
                    </div>
                  </div>
                  <div className="rolesecomain">
                    <div id="rolesetupcontent4">
                      <CustomDropdown
                        options={optionroletype}
                        label="ROLE TYPE"
                        showCancel={true}
                        value={roleState.role_type}
                        onChange={(value) =>
                          handleInputChange("role_type", value)
                        }
                        onSelect={(selectedOption) =>
                          handleSelect("role_type", selectedOption)
                        }
                        readOnly={rolesSetupPagePermission === "readOnly"}
                      />
                    </div>
                    <div id="rolesetupcontent5">
                      <CustomDropdown
                        options={optionrolegroup}
                        label="ROLE GROUP"
                        showCancel={true}
                        value={roleState.role_group}
                        onChange={(value) =>
                          handleInputChange("role_group", value)
                        }
                        onSelect={(selectedOption) =>
                          handleSelect("role_group", selectedOption)
                        }
                        readOnly={rolesSetupPagePermission === "readOnly"}
                      />
                    </div>
                    <div className="dropdownpractice">
                      <CustomDropdown
                        options={optionpractice}
                        label="PRACTICE"
                        showCancel={true}
                        value={roleState.role_practice}
                        onChange={(value) =>
                          handleInputChange("role_practice", value)
                        }
                        onSelect={(selectedOption) =>
                          handleSelect("role_practice", selectedOption)
                        }
                        readOnly={rolesSetupPagePermission === "readOnly"}
                      />
                    </div>
                  </div>
                  <div className="rolesmain2">
                    <div className="dropdownparentrole">
                      <CustomDropdown
                        options={optionparentrole}
                        label="PARENT ROLE"
                        showCancel={true}
                        value={roleState.parent_role}
                        onChange={(value) =>
                          handleInputChange("parent_role", value)
                        }
                        onSelect={(selectedOption) =>
                          handleSelect("parent_role", selectedOption)
                        }
                        readOnly={rolesSetupPagePermission === "readOnly"}
                      />
                    </div>
                    <div className="rolesetupcontainer8">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        TextLabel="EXTERNAL REFRENCE"
                        value={roleState.role_exter_ref}
                        onChange={(value) =>
                          handleInputChange("role_exter_ref", value)
                        }
                        readOnly={rolesSetupPagePermission === "readOnly"}
                      />
                    </div>
                    <div className="rolesetupcontainer9">
                      <InputTypes
                        showFlagCheckBox={true}
                        Checkboxlabel={"PROHIBIT DISCOUNT"}
                        value={roleState.role_pro_disc}
                        onChange={(value) =>
                          handleInputChange("role_pro_disc", value)
                        }
                        readOnly={rolesSetupPagePermission === "readOnly"}
                      />
                    </div>
                  </div>
                  <div className="headerrole2">
                    <Categories />
                  </div>
                  <div
                    className="headerRoles3"
                    onClick={handleToggledescription}
                  >
                    <HeaderBar
                      headerlabel={"DESCRIPTION"}
                      isButtonVisible={true}
                      isDropdownOpen={isDropdownOpen}
                      headerbardiv="headerbardiv_description"
                    />
                  </div>
                  {isDropdownOpen && (
                    <div className="requillgrid">
                      <FroalaEditorComponent
                        tag="textarea"
                        config={editorConfig}
                      />
                    </div>
                  )}
                
                  {!isReadOnly && (
                    <div className="roles_crud">
                      {roleStateFro.showSaveCancel && (
                        <div className="roles_reset_save">
                          <button id="reset_data" onClick={handleCancelClick}>
                            CANCEL
                          </button>
                          <button
                            id="save_data"
                            onClick={handleAddRolesSetup}
                            disabled={!areRequiredFieldsFilled()}
                          >
                            SAVE NEW ROLE
                          </button>
                        </div>
                      )}
                      {roleStateFro.showUpdateDelete && (
                        <div className="roles_delete_update">
                          <button
                            id={
                              roleStateFro.deleteClicked
                                ? "delete-highlight"
                                : "delete_data"
                            }
                            ref={deleteButtonRef}
                            onClick={handleDeleteRoles}
                            disabled={roleState.role_cat_status === "PUBLISHED"}
                          >
                            DELETE
                          </button>
                          <button id="update_data" onClick={handleUpdateRoles}>
                            UPDATE
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div id="accessmsgdiv">
                  <label id="accessmsg">
                    NO ROLES FOUND. PLEASE USE + TO ADD A NEW ROLE
                  </label>
                </div>
              )}
            </>
          )}
        </div>
        <div
          className="sidepanel"
          style={{
            width: catalogOpenSideBar ? "20%" : "0%",
            display: catalogOpenSideBar ? "block" : "none",
          }}
        >
          <SidePanel
            showFlagTimeStamp={catalogOpenSideBar ? true : ""}
            onClose={handleCloseCatalogSideBar}
            createdAt={formatDate(roleState.createdAt)}
            modifiedAt={formatDate(roleState.modifiedAt)}
            createdBy={roleState.created_by}
            modifiedBy={roleState.modified_by}
            revision={roleState.revision}
          />
        </div>
      </div>
    </div>
  );
};
export default Rolessetup;
 