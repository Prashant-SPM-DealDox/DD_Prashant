import React, { useEffect, useRef } from "react";
import Navbar from "../../layouts/Navbar";
import AdminSidebar from "../../layouts/AdminSidebar";
import { useState } from "react";
import "../../assets/css/security/Security.css";
import WriteFlexAll from "../../components/common/WriteFlexAll";
import HeaderBar from "../../components/common/HeaderBar";
import ErrorMessage from "../../components/common/ErrorMessage";
import InputTypes from "../../components/common/InputTypes";
import HelpRequest from "../../components/common/HelpRequest";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { baseUrl } from "../../config";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { FaLock, FaTrash } from "react-icons/fa";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";
import { decryptData, encryptData } from "../../utils/common";
const Security = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();

  // Below line of code is used to avoide jumping URL's
  // const validatedUser = localStorage.getItem("validated");

  // if (validatedUser !== "true") {
  //   navigate("/auth");
  // }

  const {securityRoleData } = useContext(DataContext);

  const securityPagePermission = securityRoleData && securityRoleData.length > 0
  ? securityRoleData[0].admin_security: "";

  if(securityPagePermission === "none"){
    navigate('/home')
  }


  const [inputValueSecurity, setInputValueSecurity] = useState("");
  const [inputValueSecurityRolesDesc, setInputValueSecurityRolesDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageroles, setErrorMessageRoles] = useState("");
  const [securityRoleId, setSecurityRoleId] = useState("");
  const [securityRoleDatas, setSecurityRoleDatas] = useState([]);
  const [showSaveCancel, setShowSaveCancel] = useState(false);
  const [showUpdateDelete, setShowUpdateDelete] = useState(true);
  const [plusIconClicked, setPlusIconClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const deleteButtonRef = useRef(null);
  let role_name = inputValueSecurity;
  let role_desc = inputValueSecurityRolesDesc;
  const twoData = { role_name, role_desc };

  const [initialData] = useState([
    {
      page: "Account",
      name: "account",
      none: false,
      readOnly: false,
      access: false,
    },
    {
      page: "Opportunity",
      name: "opportunity",
      none: false,
      readOnly: false,
      access: false,
    },
    // {
    //   page: "Opportunity-Stage",
    //   name: "oppor_stage",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    {
      page: "Opportunity_Quote_Add",
      name: "oppor_quote_add",
      none: false,
      readOnly: false,
      access: false,
    },
    // {
    //   page: "Opportunity_Move_Quote",
    //   name: "oppor_move_quote",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Opportunity_Copy_Quote",
    //   name: "oppor_copy_quote",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Opportunity_Archive_Quote",
    //   name: "oppor_archive_quote",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Opportunity_Delete_Quote",
    //   name: "oppor_delete_quote",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    {
      page: "Quote",
      none: false,
      name: "quote",
      readOnly: false,
      access: false,
    },
    {
      //this is not for config button in GS now for temp this is for quote_approval future change
      page: "GS Config Button",
      none: false,
      name: "quote_approval",
      readOnly: false,
      access: false,
    },
    // {
    //   page: "Quote Guidedselling Answer",
    //   name: "quote_guideSel_ans",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Quote Guidedselling Answer Import",
    //   name: "quote_guideSel_ans_import",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Quote Guidedselling Design",
    //   name: "quote_guidesel_desg",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Quote Dashboard",
    //   name: "quote_dashboard",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Quote Service Upload(Basics)",
    //   name: "quote_service_upload_basics",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Quote Service Upload",
    //   name: "quote_service_upload",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Project",
    //   name: "project",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Demand Workbench",
    //   name: "demand_workbench",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Demand Utilization",
    //   name: "demand_utilization",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Demand People",
    //   name: "demand_people",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Demand People Listing",
    //   name: "demand_ppl_list",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Forecast",
    //   name: "forecast",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Forecast Update",
    //   name: "forecast_update",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    {
      page: "Catalog",
      name: "catalog",
      none: false,
      readOnly: false,
      access: false,
    },
    {
      page: "Catalog Roles",
      name: "catalog_roles",
      none: false,
      readOnly: false,
      access: false,
    },
    // {
    //   page: "Catalog RateCard",
    //   name: "catalog_ratecard",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Catalog Ratecard Config",
    //   name: "catalog_ratecard_config",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Catalog Exchange",
    //   name: "catalog_exchange",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Catalog Items",
    //   name: "catalog_items",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    {
      page: "Catalog Content",
      name: "catalog_content",
      none: false,
      readOnly: false,
      access: false,
    },
    // {
    //   page: "Catalog Assets",
    //   name: "catalog_assets",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    {
      page: "Catalog Template",
      name: "catalog_template",
      none: false,
      readOnly: false,
      access: false,
    },
    {
      page: "Catalog Surveys",
      name: "catalog_surevys",
      none: false,
      readOnly: false,
      access: false,
    },
    // {
    //   page: "Catalog Surevys Whereused",
    //   name: "catalog_surevys_whereused",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    {
      page: "Catalog Doctypes",
      name: "catalog_doctypes",
      none: false,
      readOnly: false,
      access: false,
    },
    // {
    //   page: "Notes",
    //   name: "notes",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Files",
    //   name: "files",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    {
      page: "Admin",
      name: "admin",
      none: false,
      readOnly: false,
      access: false,
    },
    {
      page: "Admin Company",
      name: "admin_company",
      none: false,
      readOnly: false,
      access: false,
    },
    {
      page: "Admin People",
      name: "admin_people",
      none: false,
      readOnly: false,
      access: false,
    },
    {
      page: "Admin Acess",
      name: "admin_access",
      none: false,
      readOnly: false,
      access: false,
    },
    {
      page: "Admin Config",
      name: "admin_config",
      none: false,
      readOnly: false,
      access: false,
    },
    {
      page: "Admin Lookups",
      name: "admin_lookups",
      none: false,
      readOnly: false,
      access: false,
    },
    {
      page: "Admin Security",
      name: "admin_security",
      none: false,
      readOnly: false,
      access: false,
    },
    // {
    //   page: "Admin Alerts",
    //   name: "admin_alerts",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Admin Imports",
    //   name: "admin_imports",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Admin Hooks Status",
    //   name: "admin_hooks_status",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Admin Hooks Config",
    //   name: "admin_hooks_config",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Admin Intration Dev Toggles",
    //   name: "admin_intration_dev_toggles",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
    // {
    //   page: "Admin Hooks Api",
    //   name: "admin_hooks_api",
    //   none: false,
    //   readOnly: false,
    //   access: false,
    // },
  ]);

  const [data, setData] = useState(initialData);

  //API to send data to database
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
    } catch (error) {
      // console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getSecurityRoleData();
  }, [user]);

  const createSecurityRole = async () => {
    if (!twoData.role_name) {
      alert("Role is required!");
      return;
    }

    try {
      const result = data.reduce((acc, obj) => {
        const { page, name, ...rest } = obj;
        for (const key in rest) {
          if (rest[key] === true) {
            acc[name] = key;
            break; // Assuming only one true value per object
          }
        }
        return acc;
      }, {});

      const sendData = {
        ...twoData,
        ...result,
      };

      const response = await fetch(`${baseUrl}/api/security/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ sendData }),
      });

      if (response.ok) {
        const securityresponse = await response.json();
        toast.success("Security Role added successfully");
        setData(initialData);
        setInputValueSecurity("");
        setInputValueSecurityRolesDesc("");
        getSecurityRoleData();
        setErrorMessage("");
        setErrorMessageRoles("");
        const encryptSecurityId = encryptData(securityresponse._id);
        localStorage.setItem("personId", encryptSecurityId);
        localStorage.removeItem("previousPersonId");
        // window.location.reload();
      } else {
        toast.error("Unable to create security role!");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  //Update API
  const [toastShown, setToastShown] = useState(false);
  const updateSecurityRole = async () => {
    try {
      const result = data.reduce((acc, obj) => {
        const { page, name, ...rest } = obj;
        for (const key in rest) {
          if (rest[key] === true) {
            acc[name] = key;
            break; // Assuming only one true value per object
          }
        }
        return acc;
      }, {});

      const sendData = {
        ...twoData,
        ...result,
      };

      const response = await fetch(
        `${baseUrl}/api/security/update/${securityRoleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ sendData }),
        }
      );

      if (response.ok) {
        if (!toastShown) {
          toast.success("Security role updated successfully!");
          getSecurityRoleData();
          setErrorMessage("");
          setErrorMessageRoles("");
          setToastShown(false);
          setLookUpDataUpdated(true);
          // window.location.reload();
        }
      } else {
        toast.error("Unable to update security role!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Delete API
  const deleteData = async () => {
    if (!deleteClicked) {
      setDeleteClicked(true);
      return;
    }
    const response = securityRoleId
      ? await fetch(`${baseUrl}/api/security/delete/${securityRoleId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${user.token}`,
          },
        })
      : "";

    if (response.ok)
      toast.success("Security role deleted successfully", {
        icon: (
          <span style={{ color: "red " }}>
            <FaTrash />
          </span>
        ),
        className: "custom-toast_delete",
      });
    getSecurityRoleData();
    setData(initialData);
    setInputValueSecurity("");
    setInputValueSecurityRolesDesc("");
    setErrorMessage("");
    setErrorMessageRoles("");
    handleItemSelect(null, -1);
    setDeleteClicked(false);
    // window.location.reload();
  };
  const handleNavigation = (selectedId) => {
    const prevId = decryptData(localStorage.getItem("previousPersonId"));
    const currentId = decryptData(localStorage.getItem("personId"));
    // const encryptSelectedId = encryptData(selectedId);
    if (prevId && currentId) {
      localStorage.removeItem("previousPersonId");
      navigate(`/security?id=${prevId}`);
    } else if (currentId) {
      navigate(`/security?id=${selectedId}`);
    } else if (prevId) {
      navigate(`/security`);
    }
  };

  useEffect(() => {
    handleNavigation(securityRoleId);
  }, [securityRoleDatas, securityRoleId]);
  //Saving the data from the database and dispaly it in fields

  const handleItemSelect = (selectedItem, selectedIndex) => {
    const selectedData =
      selectedIndex !== -1 ? securityRoleDatas[selectedIndex] : null;
    setSecurityRoleId(selectedData?._id || "");
    setInputValueSecurity(selectedData?.role_name || "*New Security Role*");
    setInputValueSecurityRolesDesc(selectedData?.role_desc || "");
    setShowSaveCancel(selectedData ? false : true);
    setShowUpdateDelete(selectedData ? true : false);
    setPlusIconClicked(selectedData ? false : true);
    resetCheckboxes(selectedData ? false : true);
    if (selectedIndex !== -1) {
      const {
        _id,
        role_desc,
        role_name,
        admin_id,
        created_at,
        modified_at,
        __v,
        ...rest
      } = selectedItem;

      const updatedData = initialData.map((item) => {
        if (Object.keys(rest).includes(item.name)) {
          let indexval = Object.keys(rest).indexOf(item.name);
          let property = Object.entries(rest)[indexval];
          return { ...item, [property[1]]: true };
        }
        return item;
      });
      setData(updatedData);
    } else {
      const updatedData = JSON.parse(JSON.stringify(initialData));
      const securityNone = updatedData.map((item) => {
        item.none = true;
        return item;
      });
      setData(securityNone);
    }
  };

  function handleInputChange(page, property, property1, property2, value) {
    const updatedData = data.map((item) => {
      if (item.page === page) {
        return {
          ...item,
          [property]: value,
          [property1]: false,
          [property2]: false,
        };
      }
      return item;
    });
    setData(updatedData);
  }

  const resetCheckboxes = () => {
    const updatedData = data.map((item) => ({
      ...item,
      none: true,
      readOnly: false,
      access: false,
    }));
    setData(updatedData);
  };
  useEffect(() => {
    getSecurityRoleData();
  }, [user]);
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

  const handleCancelClick = () => {
    const previous = localStorage.getItem("previousPersonId");
    localStorage.setItem("personId", previous);
    const index = securityRoleDatas.findIndex((item) => item._id === previous);
    handleItemSelect(-1, index);
  };
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
            <Link className="breadcrumbs--link--active">Setup Security</Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />
      <div className="rowsecurity" id="rowssecurity">
        <WriteFlexAll
          data={securityRoleDatas}
          dataType="security"
          onItemSelect={handleItemSelect}
          hasItems={securityRoleDatas && securityRoleDatas.length > 0}
          permission={securityPagePermission}
        />

        {/* -------------------------- */}

        <div className="rightsecurity">
          <HeaderBar headerlabel="SECURITY ROLE" />
          {securityRoleDatas?.length > 0 || plusIconClicked ? (
            <div id="securitycontentshow">
              <div className="securityrolediv">
                <div id="secutityinputdiv">
                  <ErrorMessage
                    type={"text"}
                    showFlaxErrorMessageText={true}
                    label="SECURITY ROLE NAME"
                    errormsg="SECURITY ROLE NAME IS A REQUIRED FIELD"
                    value={inputValueSecurity}
                    onChange={(value) => setInputValueSecurity(value)}
                    readOnly={securityPagePermission === "readOnly"}
                  />
                </div>
                <div id="rolesinputdiv">
                  <InputTypes
                    type={"text"}
                    showFlagText={true}
                    TextLabel={"ROLES DESCRIPTION"}
                    value={inputValueSecurityRolesDesc}
                    onChange={(value) => setInputValueSecurityRolesDesc(value)}
                    readOnly={securityPagePermission === "readOnly"}
                  />
                </div>
              </div>
              <label id="label1">options in grey are not yet avaliable</label>
              {/* static contaioner header */}
              <div className="staticcontaionerheader class1">
                <div className="class2">
                  <label>Page</label>
                </div>
                <div className="class2">
                  <label>None</label>
                </div>
                <div className="class2">
                  <label>Read only</label>
                </div>
                <div className="class2">
                  <label>Access</label>
                </div>
              </div>

              {data.map((item) => {
                return (
                  <div className="class1">
                    <div id={``} className="class2">
                      {/* <input type="text" value= {item.page} readOnly /> */}
                      <label>{item.page}</label>
                    </div>
                    <div className="class2">
                      <input
                        type="checkbox"
                        name={`none-${item.name}`}
                        onChange={(event) => {
                          return handleInputChange(
                            item.page,
                            "none",
                            "readOnly",
                            "access",
                            event.target.checked
                          );
                        }}
                        disabled={securityPagePermission === "readOnly"}
                        //onChange={(event) => { item.none = event.target.checked }}
                        checked={item.none}
                      />
                    </div>
                    <div className="class2">
                      <input
                        type="checkbox"
                        name={`readonly-${item.name}`}
                        onChange={(event) => {
                          return handleInputChange(
                            item.page,
                            "readOnly",
                            "none",
                            "access",
                            event.target.checked
                          );
                        }}
                        disabled={securityPagePermission === "readOnly"}
                        // onChange={(event) => { item.readOnly = event.target.checked }}
                        checked={item.readOnly}
                      />
                    </div>
                    <div className="class2">
                      <input
                        type="checkbox"
                        name={`access-${item.name}`}
                        onChange={(event) => {
                          return handleInputChange(
                            item.page,
                            "access",
                            "none",
                            "readOnly",
                            event.target.checked
                          );
                        }}
                        disabled={securityPagePermission === "readOnly"}
                        checked={item.access}
                      />
                    </div>
                  </div>
                );
              })}

              <div id="crud_security" className="classbutton">
                <div
                  className="save_cancel_security"
                  style={{ display: showSaveCancel ? "block" : "none" }}
                >
                  <button id="save_data" onClick={createSecurityRole}>
                    SAVE SECURITY ROLE
                  </button>
                  <button
                    id="reset_data"
                    type="reset"
                    onClick={handleCancelClick}
                  >
                    {" "}
                    CANCEL SECURITY ROLE{" "}
                  </button>
                </div>
                {securityPagePermission !== "readOnly" && (
                <div
                  className="delete_update_security"
                  style={{ display: showUpdateDelete ? "block" : "none" }}
                >
                  <button id="update_data" onClick={updateSecurityRole}>
                    {" "}
                    UPDATE SECURITY ROLE{" "}
                  </button>
                  <button
                    id={deleteClicked ? "delete-highlight" : "delete_data"}
                    ref={deleteButtonRef}
                    onClick={deleteData}
                  >
                    {" "}
                    DELETE SECURITY ROLE{" "}
                  </button>
                </div>
              )}
              </div>
            </div>
          ) : (
            <div id="accessmsgdiv">
              <label id="accessmsg">
                NO SECURITY ROLE FOUND. PLEASE USE + TO ADD A NEW SECURITY ROLE
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Security;
