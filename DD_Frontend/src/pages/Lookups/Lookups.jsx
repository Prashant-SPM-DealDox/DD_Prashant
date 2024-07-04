import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../layouts/Navbar";
import AdminSidebar from "../../layouts/AdminSidebar";
import WriteFlexAll from "../../components/common/WriteFlexAll";
import "../../assets/css/lookups/Lookups.css";
import ErrorMessage from "../../components/common/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCircle, FaEye, FaPlus } from "react-icons/fa";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import HeaderBar from "../../components/common/HeaderBar";
import HelpRequest from "../../components/common/HelpRequest";
import { Link, withRouter, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { baseUrl } from "../../config";
import CustomDropdown from "../../components/common/CustomDropdown";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";
import { FaDotCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { commonService, decryptData, encryptData } from "../../utils/common";

const Lookups = () => {

  
  const { user } = useAuthContext();
  const navigate = useNavigate();


  const { securityRoleData, setLookUpDataUpdated } = useContext(DataContext);

  const lookupPagePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_lookups
      : "";

  const isReadOnly = lookupPagePermission === "readOnly";

    //Block the url jump by the permission of the user
      if(lookupPagePermission === "none"){
        navigate('/home')
      }

  const [lookupData, setLookupData] = useState({
    class_name: "",
    parent_lookup: "",
  });
  const [lookupOptions, setLookupOptions] = useState({
    lookups_name: "",
    code: "",
    value1: "",
    value2: "",
    disable: false,
    parent_lookup_data: "",
  });

  const [showAddSectionBtn, setShowAddSectionBtn] = useState(true);

  const addLookupData = async () => {
    try {
      const requestURI = "/api/lookups/add";
      const response = await commonService(requestURI, "post", {
        ...lookupData,
      });
      if (response) {
        // const newLookupData = await response.json();
        if (
          response.data.status === "Failed" &&
          response.data.message === "Class Name Already Exists!"
        ) {
          toast.error("Class Name Already Exists!");
        } else {
          setlookupsData((prevLookupData) => [
            ...prevLookupData,
            response.data.data,
          ]);
          const encryptLookupId = encryptData(response.data.data._id);
          localStorage.setItem("personId", encryptLookupId);
          localStorage.removeItem("previousPersonId")
        }
      } else {
        throw new Error("Error adding doctype");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getLookupData = async () => {
    try {
      const requestURI = "/api/lookups/get"
      const response = await commonService(requestURI, "get");
      if (response) {
        // const allLookupData = await response.json();
        setlookupsData(response.data.data);
      } else {
        // console.log("No Data Found");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getLookupData();
  }, [user]);

  const updateLookupData = async () => {
    try {
      if (!lookupData.class_name.trim()) {
        toast.error("Class Name is Required Field");
        return;
      }
      const invalidOptions = lookupOptions.find(
        (option) => !option.lookups_name.trim() || !option.code.trim()
      );
      // const emptyFields = inputSections.find(option => !option.lookupOptions.lookups_name.trim() || !option.lookupOptions.code.trim())
      if (invalidOptions) {
        toast.error("Lookup name and code are required for all options");
        return;
      }

      const allLookupOptions = [
        ...lookupOptions,
        ...inputSections.map((section) => section.lookupOptions),
      ];

      const requestURI = "/api/lookups/updateLookupName";
      const response = await commonService(requestURI, "put", { 
          lookup_accesskey: lookups_id,
          lookupData,
          lookupOptions: allLookupOptions,
      });
      if (response) {
        // const updatedData = await response.json();
        console.log(response);
        if (
          response.data.status === "Failed" &&
          response.data.message === "Class Name Already Exists!"
        ) {
          toast.error("Class Name Already Exists!");
        } else if (
          response.data.status === "Failed" &&
          response.data.message ===
          "Duplicate lookups_name within the same lookup_accesskey"
        ) {
          toast.error("Lookup Name Already Exists");
        } else {
          setlookupsData((prevLookupData) =>
            prevLookupData.map((item) =>
              item._id === response.data.data._id ? response.data.data : item
            )
          );
          setLookUpDataUpdated(true);
          setShowAddSectionBtn(true);
        }
      } else {
        // console.log("data not updated");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [inputSections, setInputSections] = useState([]);
  const [lookupsData, setlookupsData] = useState([]);
  const [lookups_id, setLookups_id] = useState("");
  const [showSaveCancel, setShowSaveCancel] = useState(false);
  const [plusIconClicked, setPlusIconClicked] = useState(false);

  const Data = useLocation();
  const [displayAddLookup, setDisplayAddLookup] = useState(false);
  const handleItemSelect = async (selectedItem, selectedIndex) => {
    const selectedData =
      selectedIndex !== -1 ? lookupsData[selectedIndex] : null;
    setLookups_id(selectedItem?._id || "");

    setLookupData({
      class_name: selectedItem?.class_name || "",
      parent_lookup: selectedItem?.parent_lookup || "",
    });
    setLookupOptions(selectedData?.lookupOptions || "");
    setShowSaveCancel(selectedData ? false : true);
    setInputSections([]);
    setDisplayAddLookup(selectedData ? true : false);
    setPlusIconClicked(selectedData ? false : true);
    setShowAddSectionBtn(true);
  };
  const handleNavigation = (selectedId) => {
    const prevId = decryptData(localStorage.getItem("previousPersonId"));
    const currentId = decryptData(localStorage.getItem("personId"));
    // const encryptSelectedId = encryptData(selectedId);
    if (prevId && currentId) {
      localStorage.removeItem("previousPersonId");
      navigate(`/lookups?id=${prevId}`);
    } else if (currentId) {
      navigate(`/lookups?id=${selectedId}`);
    } else if (prevId) {
      navigate(`/lookups`);
    }
  };

  useEffect(() => {
    handleNavigation(lookups_id);
  }, [lookupsData, lookups_id]);

  const addNewSection = () => {
    const newId =
      inputSections.length > 0
        ? inputSections[inputSections.length - 1].id + 1
        : 1;
    setInputSections((prevSections) => [
      ...prevSections,
      {
        id: newId,
        lookupOptions: {
          lookups_name: "",
          code: "",
          value1: "",
          value2: "",
          parent_lookup_data: "",
          disable: false,
        },
      },
    ]);
    setShowAddSectionBtn(false);
  };

  const deleteSection = (event, sectionId) => {
    setInputSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          // Clear the fields of the deleted section
          section.lookupOptions = {
            lookups_name: "",
            code: "",
            value1: "",
            value2: "",
            parent_lookup_data: "",
            disable: false,
          };
        }
        return section;
      })
    );
  };

  //Function for First Parent DropDown Start
  let lookUpNames =
    lookupsData?.length > 0
      ? lookupsData.map((lookups) => lookups.class_name)
      : [];
  const parentLookupdropdown1 = lookUpNames.filter(
    (lookUpName) => lookUpName !== lookupData.class_name
  );

  const handelParentLookUp = (selectOptions) => {
    setLookupData({ ...lookupData, parent_lookup: selectOptions });
    setAutoUpdate(true);
  };

  const [singleLookUpData, setSingleLookUpData] = useState([]);

  useEffect(() => {
    const filteredOptions =
      lookupsData.find(
        (lookup) => lookup.class_name === lookupData.parent_lookup
      )?.lookupOptions || [];
    setSingleLookUpData(filteredOptions.map((code) => code?.code));
  }, [lookupData.parent_lookup, lookupsData]);

  const handleDataChange = (fieldName, value) => {
    setLookupData({ ...lookupData, [fieldName]: value });
    setAutoUpdate(true);
  };

  const [autoUpdate, setAutoUpdate] = useState(false);
  const debounceTimeout = useRef(null);
  const handleOptionChange = (fieldName, value, index, isLookupOption) => {
    if (isLookupOption) {
      setLookupOptions((prevOptions) => {
        const updatedOptions = [...prevOptions];
        updatedOptions[index] = {
          ...updatedOptions[index],
          [fieldName]: value,
        };
        return updatedOptions;
      });
      setAutoUpdate(true);
    } else {
      setInputSections((prevSections) => {
        const updatedSections = [...prevSections];
        updatedSections[index] = {
          ...updatedSections[index],
          lookupOptions: {
            ...updatedSections[index].lookupOptions,
            [fieldName]: value,
          },
        };
        return updatedSections;
      });
    }
  };

  useEffect(() => {
    if (autoUpdate) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        updateLookupData();
        setAutoUpdate(false);
      }, 1000);
    }
  }, [lookupData, lookupOptions, lookups_id, autoUpdate]);

  const handleParentLookupOptionsSecond = (
    fieldName,
    selectedOptions,
    sectionIndex,
    isLookupOption
  ) => {
    if (isLookupOption) {
      setLookupOptions((prevOptions) => {
        const updatedOptions = [...prevOptions];
        updatedOptions[sectionIndex] = {
          ...updatedOptions[sectionIndex],
          [fieldName]: selectedOptions,
        };
        return updatedOptions;
      });
      setAutoUpdate(true);
    } else {
      setInputSections((prevSections) => {
        const updatedSections = [...prevSections];
        updatedSections[sectionIndex] = {
          ...updatedSections[sectionIndex],
          lookupOptions: {
            ...updatedSections[sectionIndex].lookupOptions,
            [fieldName]: selectedOptions,
          },
        };
        return updatedSections;
      });
    }
  };

  const [condition, setCondition] = useState("all");
  const handleRadioChange = (condition) => {
    setCondition(condition);
  };

  const areRequiredFieldsFilled = () => {
    return lookupData.class_name;
  };
  const handleCancelClick = () => {
    const previous = localStorage.getItem("previousPersonId");
    localStorage.setItem("personId", previous);
    const index = lookupsData.findIndex((item) => item._id === previous);
    handleItemSelect(null, index);
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
            <Link to="" className="breadcrumbs--link--active">
              Lookups
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />
      <div className="rowlookups">
        <WriteFlexAll
          showGrouping={false}
          onItemSelect={handleItemSelect}
          data={lookupsData}
          dataType="lookups"
          hasItems={lookupsData.length > 0}
          permission={lookupPagePermission}
        />
        <div className="rightlookups">
          <input
            type="hidden"
            name="class_name_id"
            id="class_name_id"
            value={lookups_id}
            autoComplete="new-password"

          />
          <div id="LookupsShow">
            <div id="lookupsradio">
              <span className="spanradio">
                {" "}
                <input
                  type="radio"
                  id="all"
                  name="a"
                  value="all"
                  checked={condition === "all"}
                  onChange={() => handleRadioChange("all")}
                  autoComplete="new-password"
                />
                &nbsp;
                <label htmlFor="all">ALL</label>
              </span>
              <span className="spanradio">
                <input
                  type="radio"
                  id="enabled"
                  name="a"
                  value="enabled"
                  onChange={() => handleRadioChange("enabled")}
                  autoComplete="new-password"
                />
                &nbsp;
                <label htmlFor="enabled">ENABLED</label>
              </span>
              <span className="spanradio">
                {" "}
                <input
                  type="radio"
                  id="disabled"
                  name="a"
                  value="disabled"
                  onChange={() => handleRadioChange("disabled")}
                  autoComplete="new-password"
                />
                &nbsp;
                <label htmlFor="disabled">DISABLED</label>
              </span>
            </div>

            <HeaderBar headerlabel={"LOOKUPS"} />
            {lookupsData.length > 0 || plusIconClicked ? (
              <div>
                <div id="lookup_name">
                  <ErrorMessage
                    type={"text"}
                    showFlaxErrorMessageText={true}
                    validationinputcustom={"classlookup_name"}
                    label="CLASS NAME"
                    customLabel={"classNameLabel"}
                    errormsg="CLASS NAME IS A REQUIRED FIELD"
                    onChange={(value) => handleDataChange("class_name", value)}
                    placeholdersection="Enter Class Name"
                    value={lookupData.class_name}
                    readOnly={lookupOptions.length > 0 && !plusIconClicked || lookupPagePermission === "readOnly"}
                  />
                  {lookupsData.length > 0 && (
                    <CustomDropdown
                      Placeholder="Select Parent Lookup"
                      options={parentLookupdropdown1}
                      label={"PARENT LOOKUP"}
                      showCancel={true}
                      name="parentlookup"
                      custuminput={"dropdown_parentlookup"}
                      onSelect={handelParentLookUp}
                      value={lookupData.parent_lookup}
                      onChange={(value) =>
                        handleDataChange("parent_lookup", value)
                      }
                      readOnly={lookupPagePermission === "readOnly"}
                    />
                  )}
                </div>
                {showSaveCancel && (
                  <div id="removeandadd">
                    <button
                      id="delete_data"
                      type="reset"
                      style={{ color: "red" }}
                      onClick={handleCancelClick}
                    >
                      CANCEL
                    </button>
                    <button
                      id="save_data"
                      type="submit"
                      style={{ width: "60px" }}
                      onClick={addLookupData}
                      disabled={!areRequiredFieldsFilled()}
                    >
                      ADD
                    </button>
                  </div>
                )}
                {displayAddLookup && (
                  <div id="add_lookup">
                    <div className="lookupscontainer">
                      <div id="contentL1">
                        <label className="lookupscontainerlabel">LOOKUP</label>
                      </div>
                      <div id="contentL2">
                        <label className="lookupscontainerlabel">CODE</label>
                      </div>
                      <div id="contentL3">
                        <label className="lookupscontainerlabel">VALUE1</label>
                      </div>
                      <div id="contentL4">
                        <label className="lookupscontainerlabel">VALUE2</label>
                      </div>
                      <div id="contentL4">
                        <label className="lookupscontainerlabel">
                          PARENT LOOKUP
                        </label>
                      </div>
                      <div id="contentL4">
                        <label className="lookupscontainerlabel">DISABLE</label>
                      </div>
                    </div>

                    <div>
                      {lookupOptions.map((option, i) => {
                        if (
                          condition === "all" ||
                          (condition === "enabled" && !option.disable) ||
                          (condition === "disabled" && option.disable)
                        ) {
                          return (
                            <div key={i} className="inputSection">
                              <input
                                type="text"
                                placeholder="Enter Name"
                                name="lookups_name"
                                value={option?.lookups_name}
                                onChange={(event) =>
                                  handleOptionChange(
                                    "lookups_name",
                                    event.target.value,
                                    i,
                                    true
                                  )
                                }
                                style={{
                                  borderLeft:
                                    option?.lookups_name.trim() === ""
                                      ? "3px solid #216c98"
                                      : "none",
                                }}
                                readOnly={lookupPagePermission === "readOnly"}
                                autoComplete="new-password"
                              />
                              <input
                                type="text"
                                placeholder="Enter Code"
                                name="code"
                                value={option?.code}
                                onChange={(event) =>
                                  handleOptionChange(
                                    "code",
                                    event.target.value,
                                    i,
                                    true
                                  )
                                }
                                style={{
                                  borderLeft:
                                    option?.code.trim() === ""
                                      ? "3px solid #216c98"
                                      : "none",
                                }}
                                readOnly={lookupPagePermission === "readOnly"}
                                autoComplete="new-password"
                              />
                              <input
                                type="number"
                                placeholder="Enter Value1"
                                name="value1"
                                value={option?.value1}
                                onChange={(event) =>
                                  handleOptionChange(
                                    "value1",
                                    event.target.value,
                                    i,
                                    true
                                  )
                                }
                                readOnly={lookupPagePermission === "readOnly"}
                                autoComplete="off"
                              />
                              <input
                                type="text"
                                placeholder="Enter Value2"
                                name="value2"
                                value={option?.value2}
                                onChange={(event) =>
                                  handleOptionChange(
                                    "value2",
                                    event.target.value,
                                    i,
                                    true
                                  )
                                }
                                readOnly={lookupPagePermission === "readOnly"}
                                autoComplete="new-password"
                              />
                              <CustomDropdown
                                options={singleLookUpData}
                                // showCancel={true}
                                name="parentlookup"
                                custuminput={"parent_lookup_dropdown"}
                                onSelect={(selectedOptions) =>
                                  handleParentLookupOptionsSecond(
                                    "parent_lookup_data",
                                    selectedOptions,
                                    i,
                                    true
                                  )
                                }
                                value={option?.parent_lookup_data}
                                onChange={(event) =>
                                  handleOptionChange(
                                    "parent_lookup_data",
                                    event.target.value,
                                    i,
                                    true
                                  )
                                }
                                readOnly={lookupPagePermission === "readOnly"}
                              />
                              <input
                                type="checkbox"
                                name="disable"
                                value={option?.disable}
                                checked={option?.disable || false}
                                onChange={(event) =>
                                  handleOptionChange(
                                    "disable",
                                    event.target.checked,
                                    i,
                                    true
                                  )
                                }
                                disabled={lookupPagePermission === "readOnly"}
                                autoComplete="new-password"
                              />
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                      {inputSections.map((section, i) => (
                        <div key={section.id} className="inputSection">
                          <input
                            type="text"
                            placeholder="Enter Name"
                            name="lookups_name"
                            value={section.lookupOptions?.lookups_name}
                            onChange={(event) =>
                              handleOptionChange(
                                "lookups_name",
                                event.target.value,
                                i,
                                false
                              )
                            }
                            style={{
                              borderLeft:
                                section.lookupOptions?.lookups_name.trim() ===
                                  ""
                                  ? "3px solid #216c98"
                                  : "none",
                            }}
                            autoComplete="off"
                          />
                          <input
                            type="text"
                            placeholder="Enter Code"
                            name="code"
                            value={section.lookupOptions?.code}
                            onChange={(event) =>
                              handleOptionChange(
                                "code",
                                event.target.value,
                                i,
                                false
                              )
                            }
                            style={{
                              borderLeft:
                                section.lookupOptions?.code.trim() === ""
                                  ? "3px solid #216c98"
                                  : "none",
                            }}
                            autoComplete="new-password"
                          />
                          <input
                            type="number"
                            placeholder="Enter Value1"
                            name="value1"
                            value={section.lookupOptions?.value1}
                            onChange={(event) =>
                              handleOptionChange(
                                "value1",
                                event.target.value,
                                i,
                                false
                              )
                            }
                            autoComplete="off"
                          />
                          <input
                            type="text"
                            placeholder="Enter Value2"
                            name="value2"
                            value={section.lookupOptions?.value2}
                            onChange={(event) =>
                              handleOptionChange(
                                "value2",
                                event.target.value,
                                i,
                                false
                              )
                            }
                            autoComplete="new-password"
                          />
                          <CustomDropdown
                            options={singleLookUpData}
                            className={"lookUpInputBox"}
                            name="parentlookup"
                            showCancel={true}
                            custuminput={"parent_lookup_dropdown"}
                            onSelect={(selectedOptions) =>
                              handleParentLookupOptionsSecond(
                                "parent_lookup_data",
                                selectedOptions,
                                i,
                                false
                              )
                            }
                            value={section.lookupOptions?.parent_lookup_data}
                            onChange={(event) =>
                              handleOptionChange(
                                "parent_lookup_data",
                                event.target.value,
                                i,
                                false
                              )
                            }
                          />
                          <input
                            type="checkbox"
                            name="disable"
                            value={section.lookupOptions?.disable}
                            checked={section.lookupOptions?.disable || false}
                            onChange={(event) =>
                              handleOptionChange(
                                "disable",
                                event.target.checked,
                                i,
                                false
                              )
                            }
                            autoComplete="new-password"
                          />
                          <div className="cancel_send">
                            <FontAwesomeIcon
                              className="inputSection_cancel"
                              icon={faTimes}
                              onClick={(event) =>
                                deleteSection(event, section.id)
                              }
                              style={{ color: "red", cursor: "pointer" }}
                            />

                            {inputSections[i].lookupOptions?.lookups_name &&
                              inputSections[i].lookupOptions?.code ? (
                              <FaCheckCircle
                                onClick={updateLookupData}
                                id="checkmark"
                              />
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                    {showAddSectionBtn && !isReadOnly &&(
                      <button id="toggleButton" onClick={addNewSection}>
                        <FaPlus />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div id="accessmsgdiv">
                <label id="accessmsg">
                  NO LOOKUPS FOUND. PLEASE USE + TO ADD A NEW LOOKUP
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Lookups;
