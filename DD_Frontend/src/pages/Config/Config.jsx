import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import AdminSidebar from "../../layouts/AdminSidebar";
import CustomDropdown from "../../components/common/CustomDropdown";
import ConfigSection from "../../components/config/ConfigToggleComponent";
import "../../assets/css/config/Config.css";
import { Link, useNavigate } from "react-router-dom";
import HeaderBar from "../../components/common/HeaderBar";
import InputTypes from "../../components/common/InputTypes";
import { baseUrl } from "../../config";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../hooks/useAuthContext";
import HelpRequest from "../../components/common/HelpRequest";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";

const Config = () => {
  
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { securityRoleData, setLogoPermissionUpdate } = useContext(DataContext);

  const configPagePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_config
      : "";

      //Block the url jump by the permission of the user
      if(configPagePermission === "none"){
        navigate('/home')
      }

  const isReadOnly = configPagePermission === "readOnly";

  const [configId, setConfigId] = useState("");
  const [activeSessionTimeOut, setActiveSessionTimeOut] = useState(0);
  const [inActiveSessionTimeOut, setInActiveSessionTimeOut] = useState(0);

  const [selectedOptionGrouping, setSelectedOptionGrouping] = useState(null);
  const [selectedOptionGrouping02, setSelectedOptionGrouping02] =
    useState(null);
  const [selectedOptionGrouping03, setSelectedOptionGrouping03] =
    useState(null);
  const [selectedOptionGrouping04, setSelectedOptionGrouping04] =
    useState(null);
  const [selectedOptionGrouping07, setSelectedOptionGrouping07] =
    useState(null);

  const options1 = ["YES", "NO"];

  const handleOptionSelect = (selectedOption) => {
    setSelectedOptionGrouping(selectedOption);
  };
  const handleOptionSelect02 = (selectedOption) => {
    setSelectedOptionGrouping02(selectedOption);
  };
  const handleOptionSelect03 = (selectedOption) => {
    setSelectedOptionGrouping03(selectedOption);
  };
  const handleOptionSelect04 = (selectedOption) => {
    setSelectedOptionGrouping04(selectedOption);
  };
  const handleOptionSelect07 = (selectedOption) => {
    setSelectedOptionGrouping07(selectedOption);
  };

  const [selectedOptionGrouping2, setSelectedOptionGrouping2] = useState(null);
  const options2 = ["LOW", "NORMAL", "HIGH"];
  const handleOptionSelect2 = (selectedOption2) => {
    setSelectedOptionGrouping2(selectedOption2);
  };

  const [selectedOptionGrouping3, setSelectedOptionGrouping3] = useState(null);
  const options3 = [
    "01/15/23",
    "01/15/2023",
    "01-15-23",
    "01-15-2023",
    "JAN 15, 2023",
    "JANUARY 15,2023",
    "15-01-2023",
    "15/01/23",
  ];
  const handleOptionSelect3 = (selectedOption3) => {
    setSelectedOptionGrouping3(selectedOption3);
  };

  const [selectedOptionGrouping4, setSelectedOptionGrouping4] = useState(null);
  const options4 = ["BY EMAIL", "WITHIN DEALDOX"];
  const handleOptionSelect4 = (selectedOption4) => {
    setSelectedOptionGrouping4(selectedOption4);
  };

  const [, setSelectedOptionGrouping5] = useState(null);
  const options5 = ["WEEKS", "MONTHS", "YEARS"];
  const handleOptionSelect5 = (selectedOption5) => {
    setSelectedOptionGrouping5(selectedOption5);
  };

  const [, setSelectedOptionGrouping6] = useState(null);
  const options6 = ["NO", "PRIMARY APPROVED ONLY", "ALL"];
  const handleOptionSelect6 = (selectedOption6) => {
    setSelectedOptionGrouping6(selectedOption6);
  };

  const [, setSelectedOptionGrouping7] = useState(null);
  const options7 = ["PRICING", "CONTENT"];
  const handleOptionSelect7 = (selectedOption7) => {
    setSelectedOptionGrouping7(selectedOption7);
  };

  const [, setSelectedOptionGrouping8] = useState(null);
  const options8 = [
    "FIXED PRICE",
    "MARGIN TARGET",
    "SERVICE LEVEL",
    "TIME AND MATERIAL",
  ];
  const handleOptionSelect8 = (selectedOption8) => {
    setSelectedOptionGrouping8(selectedOption8);
  };

  const [, setSelectedOptionGrouping9] = useState(null);
  const options9 = ["2", "3", "4", "5", "6"];
  const handleOptionSelect9 = (selectedOption9) => {
    setSelectedOptionGrouping9(selectedOption9);
  };

  const [, setSelectedOptionGrouping10] = useState(null);
  const options10 = [
    "BY SERVICE",
    "BY SERVICE CATEGORY",
    "BY CATEGORY 1",
    "BY CATEGORY 2",
    "BY SERVICE CATEGORY, CATEGORY 1, AND SOURCING ORG",
    "BY SERVICE LOCATION, CATEGORY 1, AND CATEGORY 2",
    "BY SERVICE LOCATION, CATEGORY 2, AND CATEGORY 1",
    "BY SERVICE LOCATION, SERVICE CATEGORY",
    "BY SERVICE CATEGORY, SERVICE LOCATION",
  ];
  const handleOptionSelect10 = (selectedOption10) => {
    setSelectedOptionGrouping10(selectedOption10);
  };

  const [, setSelectedOptionGrouping11] = useState(null);
  const options11 = ["STANDARD COST", "STANDARD PRICE"];
  const handleOptionSelect11 = (selectedOption11) => {
    setSelectedOptionGrouping11(selectedOption11);
  };

  const [, setSelectedOptionGrouping12] = useState(null);
  const options12 = [
    "BY ALL AVAILABLE ROLES",
    "BY ALL RATE CARD ROLES",
    "BY RATE CARD SELLING ORG",
    "BY RATE CARD EQUALITY",
  ];
  const handleOptionSelect12 = (selectedOption12) => {
    setSelectedOptionGrouping12(selectedOption12);
  };

  const [, setSelectedOptionGrouping13] = useState(null);
  const options13 = [
    "STANDARD",
    "calibri theme",
    "arial 10 theme",
    "arial 12 theme",
    "sylfaen theme",
    "simsun theme",
  ];
  const handleOptionSelect13 = (selectedOption13) => {
    setSelectedOptionGrouping13(selectedOption13);
  };

  const [, setSelectedOptionGrouping14] = useState(null);
  const options14 = ["ALL", "APPROVED ONLY", "PRIMARY ONLY"];
  const handleOptionSelect14 = (selectedOption14) => {
    setSelectedOptionGrouping14(selectedOption14);
  };

  const [, setSelectedOptionGrouping15] = useState(null);
  const options15 = ["BY ROLES", "BY CRM"];
  const handleOptionSelect15 = (selectedOption15) => {
    setSelectedOptionGrouping15(selectedOption15);
  };

  const [, setSelectedOptionGrouping16] = useState(null);
  const options16 = ["REALISTIC"];
  const handleOptionSelect16 = (selectedOption16) => {
    setSelectedOptionGrouping16(selectedOption16);
  };

  const [, setSelectedOptionGrouping17] = useState(null);
  const options17 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const handleOptionSelect17 = (selectedOption17) => {
    setSelectedOptionGrouping17(selectedOption17);
  };

  const [, setSelectedOptionGrouping18] = useState(null);
  const options18 = [
    "01 jan",
    "02 feb",
    "03 mar",
    "04 apr",
    "05 may",
    "06 jun",
    "07 jul",
    "08 aug",
    "09 sep",
    "10 oct",
    "11 nov",
    "12 dec",
  ];
  const handleOptionSelect18 = (selectedOption18) => {
    setSelectedOptionGrouping18(selectedOption18);
  };

  const [, setSelectedOptionGrouping19] = useState(null);
  const options19 = [
    "United States Dollar",
    "Euro",
    "Japanese Yen",
    "British Pound Sterling",
    "Australian Dollar",
    "Canadian Dollar",
    "Swiss Franc",
    "Chinese Yuan",
    "Swedish Krona",
    "New Zealand Dollar",
    "Mexican Peso",
    "Singapore Dollar",
    "Hong Kong Dollar",
    "Norwegian Krone",
    "South Korean Won",
    "Turkish Lira",
    "Russian Ruble",
    "Indian Rupee",
    "Brazilian Real",
    "South African Rand",
    "Danish Krone",
    "Polish Złoty",
    "Thai Baht",
    "Malaysian Ringgit",
    "Indonesian Rupiah",
    "Philippine Peso",
    "Hungarian Forint",
    "Czech Koruna",
    "Israeli Shekel",
    "Chilean Peso",
    "Emirati Dirham",
    "Saudi Riyal",
    "Colombian Peso",
    "Egyptian Pound",
    "Nigerian Naira",
    "Argentine Peso",
    "Bahraini Dinar",
    "Bangladeshi Taka",
    "Bulgarian Lev",
    "Croatian Kuna",
    "Dominican Peso",
    "Fijian Dollar",
    "Ghanaian Cedi",
    "Icelandic Króna",
    "Jordanian Dinar",
    "Kuwaiti Dinar",
    "Lebanese Pound",
    "Omani Rial",
    "Peruvian Sol",
    "Qatari Riyal",
    "Romanian Leu",
    "Serbian Dinar",
    "Sri Lankan Rupee",
    "Tunisian Dinar",
    "Uruguayan Peso",
    // Add more countries and their currencies as needed
  ];
  const handleOptionSelect19 = (selectedOption19) => {
    setSelectedOptionGrouping19(selectedOption19);
  };

  const [, setSelectedOptionGrouping20] = useState(null);
  const options20 = ["multifactor authentication", "saml"];
  const handleOptionSelect20 = (selectedOption20) => {
    setSelectedOptionGrouping20(selectedOption20);
  };

  const [, setSelectedOptionGrouping21] = useState(null);
  const options21 = ["ping", "okta", "mz azure", "active directory", "autho"];
  const handleOptionSelect21 = (selectedOption21) => {
    setSelectedOptionGrouping21(selectedOption21);
  };

  const [, setSelectedOptionGrouping22] = useState(null);
  const options22 = ["url", "xml content"];
  const handleOptionSelect22 = (selectedOption22) => {
    setSelectedOptionGrouping22(selectedOption22);
  };

  const [, setSelectedOptionGrouping23] = useState(null);
  const options23 = [
    "default dealdocx logout page",
    "Logout url provided by identity provider",
    "custom url",
  ];
  const handleOptionSelect23 = (selectedOption23) => {
    setSelectedOptionGrouping23(selectedOption23);
  };

  const [, setSelectedOptionGrouping24] = useState(null);
  const options24 = [
    "bmc sales user",
    "restricted user",
    "admin",
    "no user access",
    "bmc solution architech",
    "bmc pmo user",
    "approver",
  ];
  const handleOptionSelect24 = (selectedOption24) => {
    setSelectedOptionGrouping24(selectedOption24);
  };

  const [, setSelectedOptionGrouping25] = useState(null);
  const options25 = ["email", "universal id"];
  const handleOptionSelect25 = (selectedOption25) => {
    setSelectedOptionGrouping25(selectedOption25);
  };

  const [, setSelectedOptionGrouping26] = useState(null);
  const options26 = ["5", "6", "7", "8", "9", "10"];
  const handleOptionSelect26 = (selectedOption26) => {
    setSelectedOptionGrouping26(selectedOption26);
  };

  const [, setSelectedOptionGrouping27] = useState(null);
  const options27 = ["30 minute", "hour", "3 hour", "6 hour", "12 hour"];
  const handleOptionSelect27 = (selectedOption27) => {
    setSelectedOptionGrouping27(selectedOption27);
  };

  // use states declared for toggle of main section
  const [isConSec1, setConSec1] = useState(false);
  const toggleSection1 = () => {
    setConSec1(!isConSec1);
  };

  const [isConSec2, setConSec2] = useState(false);
  const toggleSection2 = () => {
    setConSec2(!isConSec2);
  };

  const [isConSec3, setConSec3] = useState(false);
  const toggleSection3 = () => {
    setConSec3(!isConSec3);
  };

  const [isConSec4, setConSec4] = useState(false);
  const toggleSection4 = () => {
    setConSec4(!isConSec4);
  };

  const [isConSec5, setConSec5] = useState(false);
  const toggleSection5 = () => {
    setConSec5(!isConSec5);
  };

  const [isConSec6, setConSec6] = useState(false);
  const toggleSection6 = () => {
    setConSec6(!isConSec6);
  };

  const [isConSec7, setConSec7] = useState(false);
  const toggleSection7 = () => {
    setConSec7(!isConSec7);
  };

  const [isConSec8, setConSec8] = useState(false);
  const toggleSection8 = () => {
    setConSec8(!isConSec8);
  };

  const [isConSec9, setConSec9] = useState(false);
  const toggleSection9 = () => {
    setConSec9(!isConSec9);
  };

  const [isConSec10, setConSec10] = useState(false);
  const toggleSection10 = () => {
    setConSec10(!isConSec10);
  };
  const [isConSec11, setConSec11] = useState(false);
  const toggleSection11 = () => {
    setConSec11(!isConSec11);
  };
  const [isConSec12, setConSec12] = useState(false);
  const toggleSection12 = () => {
    setConSec12(!isConSec11);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const getconfigdataValues = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/config/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const config = await response.json();
        // console.log("config--->", config);
        setDbConfigData(config.data);
        // localStorage.setItem("config",config.data[0])
      } else {
        // console.log("Error:", response.statusText);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  // adding config
  const [mode, setMode] = useState("create"); // Initially set to 'create'

  const handleAddConfig = () => {
    const newConfigData = {
      value1: selectedOptionGrouping,
      value2: selectedOptionGrouping02,
      value3: selectedOptionGrouping03,
      value4: selectedOptionGrouping04,
      value5: selectedOptionGrouping2,
      value6: selectedOptionGrouping3,
      value7: selectedOptionGrouping07,
      value8: selectedOptionGrouping4,
      active_session_timeOut: parseInt(activeSessionTimeOut),
      inactive_session_timeOut: parseInt(inActiveSessionTimeOut),
    };

    fetch(`${baseUrl}/api/config/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newConfigData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error adding Account");
        }
      })
      .then((data) => {
        toast.success("Config added successfully");
        setLogoPermissionUpdate(true);
        // const delay = 1500;
        // setTimeout(() => {
        //   window.location.reload();
        // }, delay);
        getconfigdataValues();
      })
      .catch((error) => {
        console.error("Error adding Account:", error);
      });
  };

  // GET Config DATA _______________________________________
  const [dbConfigData, setDbConfigData] = useState([]);

  useEffect(() => {
    const getconfigdata = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/config/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const config = await response.json();
          // console.log("config--->", config);
          setDbConfigData(config.data);
          // localStorage.setItem("config",config.data[0])
        } else {
          // console.log("Error:", response.statusText);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    if (dbConfigData) {
      getconfigdata();
    }
  }, [user]);

  useEffect(() => {
    if (dbConfigData && dbConfigData.length > 0) {
      setMode("update"); // If data exists, switch to 'update' mode
      setConfigId(dbConfigData[0]._id || "");
      setSelectedOptionGrouping(dbConfigData[0].value1 || "");
      setSelectedOptionGrouping02(dbConfigData[0].value2 || "");
      setSelectedOptionGrouping03(dbConfigData[0].value3 || "");
      setSelectedOptionGrouping04(dbConfigData[0].value4 || "");
      setSelectedOptionGrouping2(dbConfigData[0].value5 || "");
      setSelectedOptionGrouping3(dbConfigData[0].value6 || "");
      setSelectedOptionGrouping07(dbConfigData[0].value7 || "");
      setSelectedOptionGrouping4(dbConfigData[0].value8 || "");
      setActiveSessionTimeOut(
        parseInt(dbConfigData[0].active_session_timeOut) || ""
      );
      setInActiveSessionTimeOut(
        parseInt(dbConfigData[0].inactive_session_timeOut) || ""
      );
    }
  }, [dbConfigData]);

  // update config data
  const handleUpdateConfig = () => {
    const newConfigData = {
      value1: selectedOptionGrouping,
      value2: selectedOptionGrouping02,
      value3: selectedOptionGrouping03,
      value4: selectedOptionGrouping04,
      value5: selectedOptionGrouping2,
      value6: selectedOptionGrouping3,
      value7: selectedOptionGrouping07,
      value8: selectedOptionGrouping4,
      active_session_timeOut: parseInt(activeSessionTimeOut),
      inactive_session_timeOut: parseInt(inActiveSessionTimeOut),
    };

    fetch(`${baseUrl}/api/config/update/${configId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newConfigData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error Updating config");
        }
      })
      .then((data) => {
        toast.success("Config Updated successfully");
        setLogoPermissionUpdate(true);
        // const delay = 1000;
        // setTimeout(() => {
        //   window.location.reload();
        // }, delay);
        getconfigdataValues();
      })
      .catch((error) => {
        console.error("Error Updating Account:", error);
      });
  };

  return (
    <div>
      <Navbar data={selectedOptionGrouping07} />
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
            <a to="" className="breadcrumbs--link--active">
              Config
            </a>
          </li>
        </ul>
        <hr className="hr" />
        <HelpRequest />
      </div>
      <div>
        <div>
          {/* section 1 */}
          <div id="mainconfig">
            <HeaderBar headerlabel={"MAIN CONFIGURATION"} />
            <div className="con-sec1" onClick={toggleSection1}>
              <ConfigSection sectionNumber={1}   toggleIconId={"dropdown-icon-con-sec-main"} toggleid={"con-sec-main"}  sectionName="General"  />
            </div>
            {isConSec1 && (
              <div id="section1">
                {/* section1.1 */}
                <div id="subsection1">
                  <span className="subconfig-number">1.1</span>
                  <span className="subconfig-name">Allow delete</span>
                  <div id="select-1">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options1}
                      onSelect={handleOptionSelect}
                      value={selectedOptionGrouping}
                      onChange={(value) => setSelectedOptionGrouping(value)}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section1.2 */}

                <div id="subsection1">
                  <span className="subconfig-number">1.2</span>
                  <span className="subconfig-name">Show demo features</span>
                  <div id="select-2">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options1}
                      onSelect={handleOptionSelect02}
                      value={selectedOptionGrouping02}
                      onChange={(value) => setSelectedOptionGrouping02(value)}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section 1.3 */}

                <div id="subsection1">
                  <span className="subconfig-number">1.3</span>

                  <span className="subconfig-name">
                    Enable custom fields administration
                  </span>

                  <div id="select-3">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options1}
                      onSelect={handleOptionSelect03}
                      value={selectedOptionGrouping03}
                      onChange={(value) => setSelectedOptionGrouping03(value)}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section 1.4 */}

                <div id="subsection1">
                  <span className="subconfig-number">1.4</span>

                  <span className="subconfig-name">
                    Show custom fields in forms
                  </span>

                  <div id="select-4">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options1}
                      onSelect={handleOptionSelect04}
                      value={selectedOptionGrouping04}
                      onChange={(value) => setSelectedOptionGrouping04(value)}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* Section 1.5 */}

                <div id="subsection1">
                  <span className="subconfig-number">1.5</span>

                  <span className="subconfig-name">
                    Default staffing priority
                  </span>

                  <div id="select-5">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options2}
                      onSelect={handleOptionSelect2}
                      value={selectedOptionGrouping2}
                      onChange={(value) => setSelectedOptionGrouping2(value)}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section 1.6 */}

                <div id="subsection1">
                  <span className="subconfig-number">1.6</span>

                  <span className="subconfig-name">Default Date Format</span>

                  <div id="select-6">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options3}
                      onSelect={handleOptionSelect3}
                      value={selectedOptionGrouping3}
                      onChange={(value) => setSelectedOptionGrouping3(value)}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>
                {/* section 1.7 */}

                <div id="subsection1">
                  <span className="subconfig-number">1.7</span>

                  <span className="subconfig-name">
                    Enable logo personalization on top bar
                  </span>

                  <div id="select-7">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options1}
                      onSelect={handleOptionSelect07}
                      value={selectedOptionGrouping07}
                      onChange={(value) => setSelectedOptionGrouping07(value)}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section 1.8 */}

                <div id="subsection1">
                  <span className="subconfig-number">1.8</span>

                  <span className="subconfig-name">
                    Deafault notification type
                  </span>

                  <div id="select-8">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options4}
                      onSelect={handleOptionSelect4}
                      value={selectedOptionGrouping4}
                      onChange={(value) => setSelectedOptionGrouping4(value)}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Section 2 */}
            {/* onClick={toggleSection2} */}
            <div>
              <div className="con-sec2" >
                <ConfigSection   sectionNumber={2} sectionName="Accounts"  greysectionId={"greyoutSectionname"} greySectionNumber={"greySectionNumber"} toggleid={"unusedFunctionality"} toggleIconId={"toggleIconId"} />
              </div>
              {isConSec2 && (
                <div id="section2">
                  {/* section 2.1 */}
                  <div id="subsection1">
                    <span className="subconfig-number">2.1</span>

                    <span className="subconfig-name">
                      Can user add accounts?
                    </span>

                    <div id="select-9">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 2.2 */}

                  <div id="subsection1">
                    <span className="subconfig-number">2.2</span>

                    <span className="subconfig-name">
                      Limit user access to his/her accounts?
                    </span>

                    <div id="select-10">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 2.3 */}

                  <div id="subsection1">
                    <span className="subconfig-number">2.3</span>

                    <span className="subconfig-name">
                      Show account addresses?
                    </span>

                    <div id="select-11">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* section 3 */}
            {/* onClick={toggleSection3} */}
            <div className="con-sec3" >
              <ConfigSection   sectionNumber={3} sectionName="Opportunities" greysectionId={"greyoutSectionname"} greySectionNumber={"greySectionNumber"} toggleid={"unusedFunctionality"} toggleIconId={"toggleIconId"} />
            </div>
            {isConSec3 && (
              <div id="section3">
                {/* section 3.1 */}

                <div id="subsection1">
                  <span className="subconfig-number">3.1</span>

                  <span className="subconfig-name">
                    Can user add opportunities?
                  </span>

                  <div id="select-12">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options1}
                      onSelect={handleOptionSelect}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section 3.2 */}

                <div id="subsection1">
                  <span className="subconfig-number">3.2</span>

                  <span className="subconfig-name">
                    Limit user acces to his/her oppotunities
                  </span>

                  <div id="select-13">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options1}
                      onSelect={handleOptionSelect}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section 3.3 */}

                <div id="subsection1">
                  <span className="subconfig-number">3.3</span>

                  <span className="subconfig-name">
                    Restrict edit to bid team members?
                  </span>

                  <div id="select-14">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options1}
                      onSelect={handleOptionSelect}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section 3.4 */}

                <div id="subsection1">
                  <span className="subconfig-number">3.4</span>

                  <span className="subconfig-name">Show Duration in</span>

                  <div id="select-15">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options5}
                      onSelect={handleOptionSelect5}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section 3.5*/}

                <div id="subsection1">
                  <span className="subconfig-number">3.5</span>

                  <span className="subconfig-name">
                    Show opportunity addresses?
                  </span>

                  <div id="select-16">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options1}
                      onSelect={handleOptionSelect}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section 3.6 */}
                <div id="subsection1">
                  <span className="subconfig-number">3.6</span>

                  <span className="subconfig-name">
                    Use opportunity files and notes for both opportunities and
                    quotes
                  </span>

                  <div id="select-17">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options1}
                      onSelect={handleOptionSelect}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section 3.7 */}

                <div id="subsection1">
                  <span className="subconfig-number">3.7</span>

                  <span className="subconfig-name">
                    Allow moving a quote to another opportunity
                  </span>

                  <div id="select-18">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options1}
                      onSelect={handleOptionSelect}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section 3.8 */}

                <div id="subsection1">
                  <span className="subconfig-number">3.8</span>

                  <span className="subconfig-name">Allow Right Click Copy</span>

                  <div id="select-19">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options6}
                      onSelect={handleOptionSelect6}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section 3.9 */}

                <div id="subsection1">
                  <span className="subconfig-number">3.9</span>

                  <span className="subconfig-name">
                    Allow Right Click Archive
                  </span>

                  <div id="select-20">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options1}
                      onSelect={handleOptionSelect}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section 3.10 */}

                <div id="subsection1">
                  <span className="subconfig-number">3.10</span>

                  <span className="subconfig-name">
                    Enable Billing Contracts
                  </span>

                  <div id="select-21">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options1}
                      onSelect={handleOptionSelect}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section 3.11 */}

                <div id="subsection1">
                  <span className="subconfig-number">3.11</span>

                  <span className="subconfig-name">Enable Manual Billing</span>

                  <div id="select-22">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options1}
                      onSelect={handleOptionSelect}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>

                {/* section 3.12 */}

                <div id="subsection1">
                  <span className="subconfig-number">3.12</span>

                  <span className="subconfig-name">
                    Cross-Account Opportunity Relationships
                  </span>

                  <div id="select-23">
                    <CustomDropdown
                      custuminput="config-dropdown"
                      iconcon="iconconfig"
                      options={options1}
                      onSelect={handleOptionSelect}
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* section 4 */}
            <div>
              <div className="con-sec5">
                <ConfigSection   sectionNumber={4} sectionName="Quote Header" greysectionId={"greyoutSectionname"} greySectionNumber={"greySectionNumber"} toggleid={"unusedFunctionality"} toggleIconId={"toggleIconId"} />
              </div>
              {isConSec5 && <div id="section4"></div>}
            </div>
            {/* section 5 */}
            {/* onClick={toggleSection5} */}
            <div>
              <div className="con-sec5" >
                <ConfigSection   sectionNumber={5} sectionName="Quotes" greysectionId={"greyoutSectionname"} greySectionNumber={"greySectionNumber"} toggleid={"unusedFunctionality"} toggleIconId={"toggleIconId"} />
              </div>
              {isConSec5 && (
                <div id="section5">
                  {/* section 5.1 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.1</span>

                    <span className="subconfig-name">
                      Deafault view for quotes
                    </span>

                    <div id="select-24">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options7}
                        onSelect={handleOptionSelect7}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.2 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.2</span>

                    <span className="subconfig-name">
                      Deafault Quote Price Model
                    </span>

                    <div id="select-25">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options8}
                        onSelect={handleOptionSelect8}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.3 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.3</span>

                    <span className="subconfig-name">
                      Front load allocations
                    </span>

                    <div id="select-26">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.4 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.4</span>

                    <span className="subconfig-name">
                      Allow cost update for roles?
                    </span>

                    <div id="select-27">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.5 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.5</span>

                    <span className="subconfig-name">
                      Allow cost update for items?
                    </span>

                    <div id="select-28">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.6 */}
                  <div id="subsection1">
                    <span className="subconfig-number">5.6</span>

                    <span className="subconfig-name">
                      Role & item Unit max display precision
                    </span>

                    <div id="select-29">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options9}
                        onSelect={handleOptionSelect9}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.7 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.7</span>

                    <span className="subconfig-name">Select editor theme</span>

                    <div id="select-30">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options13}
                        onSelect={handleOptionSelect13}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.8 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.8</span>

                    <span className="subconfig-name">
                      Default to Guided Selling on a new quote?
                    </span>

                    <div id="select-31">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.9 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.9</span>

                    <span className="subconfig-name">
                      Allow deletion of approved quotes
                    </span>

                    <div id="select-32">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.10 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.10</span>

                    <span className="subconfig-name">Enable Tasks</span>

                    <div id="select-33">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.11 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.11</span>

                    <span className="subconfig-name">
                      Enable Display Dates for service (Tasks)
                    </span>

                    <div id="select-34">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.12 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.12</span>

                    <span className="subconfig-name">
                      Enable survey calculation sheets
                    </span>

                    <div id="select-35">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.13 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.13</span>

                    <span className="subconfig-name">Enable catalog grid</span>

                    <div id="select-36">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.14 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.14</span>

                    <span className="subconfig-name">
                      Auto refresh formulas
                    </span>

                    <div id="select-37">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 4.15 */}

                  <div id="subsection1">
                    <span className="subconfig-number">4.15</span>

                    <span className="subconfig-name">Default group by?</span>

                    <div id="select-38">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options10}
                        onSelect={handleOptionSelect10}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.16 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.16</span>

                    <span className="subconfig-name">
                      Automatically merge Global Settings
                    </span>

                    <div id="select-39">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.17 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.17</span>

                    <span className="subconfig-name">
                      Revenue distribution method for fixed price
                    </span>

                    <div id="select-40">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options11}
                        onSelect={handleOptionSelect11}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.18 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.18</span>
                    <span className="subconfig-name">
                      Doc Type to use for integration upload
                    </span>
                    <InputTypes
                      type={"text"}
                      showFlagText={true}
                      textinputcustom="textinputcustomConfig"
                      readOnly={configPagePermission === "readOnly"}
                    />
                  </div>

                  {/* section 5.19 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.19</span>

                    <span className="subconfig-name">
                      Refresh calcsheet on answer
                    </span>

                    <div id="select-41">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.20 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.20</span>

                    <span className="subconfig-name">
                      Prepend opportunity name to quote name
                    </span>

                    <div id="select-42">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.21 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.21</span>

                    <span className="subconfig-name">
                      Allow unit list price upate
                    </span>

                    <div id="select-43">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.22 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.22</span>

                    <span className="subconfig-name">
                      Enable Advanced Ratecards
                    </span>

                    <div id="select-44">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.23 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.23</span>

                    <span className="subconfig-name">
                      Limit Rate Card Roles
                    </span>

                    <div id="select-45">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options12}
                        onSelect={handleOptionSelect12}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.24 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.24</span>

                    <span className="subconfig-name">
                      Enable Currency Exchange Rate Table
                    </span>

                    <div id="select-46">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.25 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.25</span>

                    <span className="subconfig-name">
                      Use inversions To calculate Currency Exchange Rate
                    </span>

                    <div id="select-47">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.26 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.26</span>

                    <span className="subconfig-name">
                      Use Hops To calculate Currency Exchange Rate
                    </span>

                    <div id="select-48">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.27 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.27</span>

                    <span className="subconfig-name">
                      Warn if manual updates are deleted on Apply?
                    </span>

                    <div id="select-49">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.28 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.28</span>

                    <span className="subconfig-name">
                      Include quote template when exporting a catalog survey?
                    </span>

                    <div id="select-50">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.29 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.29</span>

                    <span className="subconfig-name">
                      Clone using most recent survey template?
                    </span>

                    <div id="select-51">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.30 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.30</span>

                    <span className="subconfig-name">
                      Only merge approved quotes?
                    </span>

                    <div id="select-52">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options14}
                        onSelect={handleOptionSelect14}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.31 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.31</span>

                    <span className="subconfig-name">
                      Use clicker for rule conditions and actions?
                    </span>

                    <div id="select-53">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.32 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.32</span>

                    <span className="subconfig-name">
                      Use toJSON when getting values from calcsheet?
                    </span>

                    <div id="select-54">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.33 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.33</span>

                    <span className="subconfig-name">
                      Disable discount override in Quote Header
                    </span>

                    <div id="select-55">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.34 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.34</span>

                    <span className="subconfig-name">
                      Disable Price Modal override on Quote Header
                    </span>

                    <div id="select-56">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.35 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.35</span>

                    <span className="subconfig-name">
                      Disable Org override on Quote Header
                    </span>

                    <div id="select-57">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.36 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.36</span>

                    <span className="subconfig-name">
                      Disable Currency override on Quote Header
                    </span>

                    <div id="select-58">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.37 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.37</span>

                    <span className="subconfig-name">
                      Use advanced document export method?
                    </span>

                    <div id="select-59">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.38 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.38</span>

                    <span className="subconfig-name">
                      Enable doc types selector in right side panel?
                    </span>

                    <div id="select-60">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.39 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.39</span>

                    <span className="subconfig-name">
                      Enable Reporting Currency
                    </span>

                    <div id="select-61">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.40 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.40</span>

                    <span className="subconfig-name">
                      Enable Word 2007/2008 Backword Compatibility?
                    </span>

                    <div id="select-62">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.41 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.41</span>

                    <span className="subconfig-name">
                      Enable item and Role Mass Edit
                    </span>

                    <div id="select-63">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.42 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.42</span>

                    <span className="subconfig-name">
                      Use advanced Doctypes?
                    </span>

                    <div id="select-64">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.43 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.43</span>

                    <span className="subconfig-name">
                      Enable Override to Ratecards via PCR?
                    </span>

                    <div id="select-65">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 5.44 */}

                  <div id="subsection1">
                    <span className="subconfig-number">5.44</span>

                    <span className="subconfig-name">
                      Enable Upload Services from Excel?
                    </span>

                    <div id="select-66">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/*section 6  */}
            {/* onClick={toggleSection6} */}
            <div>
              <div className="con-sec6" >
                <ConfigSection   sectionNumber={6} sectionName="People" greysectionId={"greyoutSectionname"} greySectionNumber={"greySectionNumber"} toggleid={"unusedFunctionality"} toggleIconId={"toggleIconId"} />
              </div>
              {isConSec6 && (
                <div id="section6">
                  {/* section 5.1 */}
                  <div id="subsection1">
                    <span className="subconfig-number">6.1</span>

                    <span className="subconfig-name">
                      Allow over-allocation on assignments?
                    </span>

                    <div id="select-67">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* section 7 */}
            {/* onClick={toggleSection7} */}
            <div>
              <div className="con-sec7" >
                <ConfigSection   sectionNumber={7} sectionName="Approvals" greysectionId={"greyoutSectionname"} greySectionNumber={"greySectionNumber"} toggleid={"unusedFunctionality"} toggleIconId={"toggleIconId"} />
              </div>
              {isConSec7 && (
                <div id="section7">
                  {/* section 7.1 */}
                  <div id="subsection1">
                    <span className="subconfig-number">7.1</span>

                    <span className="subconfig-name">
                      Can Opportunity Owner approve their own quote if there are
                      no approvers defined?
                    </span>

                    <div id="select-68">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 7.2 */}
                  <div id="subsection1">
                    <span className="subconfig-number">7.2</span>

                    <span className="subconfig-name">
                      Allow multi-level approvers?
                    </span>

                    <div id="select-69">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 7.3 */}

                  <div id="subsection1">
                    <span className="subconfig-number">7.3</span>

                    <span className="subconfig-name">
                      Only Bid Team members can submit quotes for approval?
                    </span>

                    <div id="select-70">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 7.4 */}

                  <div id="subsection1">
                    <span className="subconfig-number">7.4</span>

                    <span className="subconfig-name">
                      Disable document download untill quote is approved?
                    </span>

                    <div id="select-71">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 7.5 */}

                  <div id="subsection1">
                    <span className="subconfig-number">7.5</span>

                    <span className="subconfig-name">
                      Lock quote after approval?
                    </span>

                    <div id="select-72">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 7.6 */}

                  <div id="subsection1">
                    <span className="subconfig-number">7.6</span>

                    <span className="subconfig-name">Anyone can approve?</span>

                    <div id="select-73">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* section 8 */}
            {/* onClick={toggleSection8} */}
            <div>
              <div className="con-sec7" >
                <ConfigSection   sectionNumber={8} sectionName="Security" greysectionId={"greyoutSectionname"} greySectionNumber={"greySectionNumber"} toggleid={"unusedFunctionality"} toggleIconId={"toggleIconId"} />
              </div>
              {isConSec8 && (
                <div id="section7">
                  {/* section 8.1 */}
                  <div id="subsection1">
                    <span className="subconfig-number">8.1</span>

                    <span className="subconfig-name">
                      Restrict support requests to Administrators?
                    </span>

                    <div id="select-74">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 8.2 */}

                  <div id="subsection1">
                    <span className="subconfig-number">8.2</span>

                    <span className="subconfig-name">Default</span>

                    <div id="select-75">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options15}
                        onSelect={handleOptionSelect15}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* section 9 */}

            <div>
            {/* onClick={toggleSection9} */}
              <div className="con-sec9" id="unused-functionality">
                <ConfigSection   sectionNumber={9} sectionName="Forcasting" greysectionId={"greyoutSectionname"} greySectionNumber={"greySectionNumber"} toggleid={"unusedFunctionality"} toggleIconId={"toggleIconId"} />
              </div>
              {isConSec9 && (
                <div id="section9">
                  {/* section 9.1 */}
                  <div id="subsection1">
                    <span className="subconfig-number">9.1</span>

                    <span className="subconfig-name">
                      Forecasting method for opportunities?
                    </span>

                    <div id="select-76">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options16}
                        onSelect={handleOptionSelect16}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 9.2 */}

                  <div id="subsection1">
                    <span className="subconfig-number">9.2</span>

                    <span className="subconfig-name">
                      Forecasting method for projects?
                    </span>

                    <div id="select-77">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options16}
                        onSelect={handleOptionSelect16}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 9.3 */}

                  <div id="subsection1">
                    <span className="subconfig-number">9.3</span>

                    <span className="subconfig-name">
                      Forecasting window in years
                    </span>

                    <div id="select-78">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options17}
                        onSelect={handleOptionSelect17}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 8.4 */}

                  <div id="subsection1">
                    <span className="subconfig-number">8.4</span>

                    <span className="subconfig-name">
                      Number of past years to include in forecast
                    </span>

                    <div id="select-79">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options17}
                        onSelect={handleOptionSelect17}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 9.5 */}

                  <div id="subsection1">
                    <span className="subconfig-number">9.5</span>

                    <span className="subconfig-name">Enable fiscal view</span>

                    <div id="select-80">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 9.6 */}

                  <div id="subsection1">
                    <span className="subconfig-number">9.6</span>

                    <span className="subconfig-name">
                      Fiscal year starting month
                    </span>

                    <div id="select-81">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options18}
                        onSelect={handleOptionSelect18}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 9.7 */}

                  <div id="subsection1">
                    <span className="subconfig-number">9.7</span>

                    <span className="subconfig-name">Forcast Currency</span>

                    <div id="select-82">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options19}
                        onSelect={handleOptionSelect19}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 10 */}
            {/* onClick={toggleSection10} */}
            <div>
              <div className="con-sec10">
                <ConfigSection   sectionNumber={10} sectionName="Catalog" greysectionId={"greyoutSectionname"} greySectionNumber={"greySectionNumber"} toggleid={"unusedFunctionality"} toggleIconId={"toggleIconId"} />
              </div>
              {isConSec10 && (
                <div id="section10">
                  {/* section 10.1 */}
                  <div id="subsection1">
                    <span className="subconfig-number">10.1</span>

                    <span className="subconfig-name">
                      Enable key word search for templates
                    </span>

                    <div id="select-83">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 10.2 */}

                  <div id="subsection1">
                    <span className="subconfig-number">10.2</span>
                    <span className="subconfig-name">
                      Level 1 hierarchy name
                    </span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 10.3 */}

                  <div id="subsection1">
                    <span className="subconfig-number">10.3</span>
                    <span className="subconfig-name">
                      Level 2 hierarchy name
                    </span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 10.4 */}

                  <div id="subsection1">
                    <span className="subconfig-number">10.4</span>
                    <span className="subconfig-name">
                      Level 3 hierarchy name
                    </span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/*section 10.5  */}

                  <div id="subsection1">
                    <span className="subconfig-number">10.5</span>
                    <span className="subconfig-name">
                      Level 4 hierarchy name
                    </span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 10.6 */}

                  <div id="subsection1">
                    <span className="subconfig-number">10.6</span>
                    <span className="subconfig-name">Asset name</span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 10.7 */}

                  <div id="subsection1">
                    <span className="subconfig-number">10.7</span>
                    <span className="subconfig-name">Category 1 name</span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 10.8 */}

                  <div id="subsection1">
                    <span className="subconfig-number">10.8</span>
                    <span className="subconfig-name">Category 2 name</span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 10.9 */}

                  <div id="subsection1">
                    <span className="subconfig-number">10.9</span>
                    <span className="subconfig-name">Category 3 name</span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 10.10 */}

                  <div id="subsection1">
                    <span className="subconfig-number">10.10</span>
                    <span className="subconfig-name">Category 4 name</span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 10.11 */}

                  <div id="subsection1">
                    <span className="subconfig-number">10.11</span>
                    <span className="subconfig-name">Category 5 name</span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 10.12 */}

                  <div id="subsection1">
                    <span className="subconfig-number">10.12</span>
                    <span className="subconfig-name">Category 6 name</span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 10.13 */}

                  <div id="subsection1">
                    <span className="subconfig-number">10.13</span>
                    <span className="subconfig-name">
                      Visual Ordering title
                    </span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 10.14 */}

                  <div id="subsection1">
                    <span className="subconfig-number">10.14</span>
                    <span className="subconfig-name">
                      Custom item Type Label
                    </span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 10.15 */}
                  <div id="subsection1">
                    <span className="subconfig-number">10.15</span>

                    <span className="subconfig-name">
                      show option to copy Survey with New Question IDs
                    </span>

                    <div id="select-84">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* section 11 */}
            {/* onClick={toggleSection11} */}
            <div>
              <div className="con-sec11" onClick={toggleSection11} >
                <ConfigSection   sectionNumber={11} sectionName="User Access" toggleIconId={"dropdown-icon-con-sec-main"} toggleid={"con-sec-main"} />
              </div>
              {isConSec11 && (
                <div id="section11">
                  {/* section 11.1 */}
                  <div id="subsection1">
                    <span className="subconfig-number">11.1</span>

                    <span className="subconfig-name">Access method?</span>

                    <div id="select-85">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options20}
                        onSelect={handleOptionSelect20}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.2 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.2</span>

                    <span className="subconfig-name">
                      Identity Provider Type?
                    </span>

                    <div id="select-86">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options21}
                        onSelect={handleOptionSelect21}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.3 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.3</span>

                    <span className="subconfig-name">
                      Identity Provider Metadata Source
                    </span>

                    <div id="select-87">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options22}
                        onSelect={handleOptionSelect22}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.4 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.4</span>
                    <span className="subconfig-name"></span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.5 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.5</span>
                    <span className="subconfig-name">
                      Identity Provider Metadata Url?
                    </span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.6 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.6</span>

                    <span className="subconfig-name">Logout method?</span>

                    <div id="select-88">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options23}
                        onSelect={handleOptionSelect23}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.7 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.7</span>
                    <span className="subconfig-name"></span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.8 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.8</span>
                    <span className="subconfig-name">SAML Issuer?</span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.9 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.9</span>
                    <span className="subconfig-name">
                      Maximum active session timeout in minutes
                    </span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        value={activeSessionTimeOut}
                        readOnly={configPagePermission === "readOnly"}
                        onChange={(value) => setActiveSessionTimeOut(value)}
                      />
                    </div>
                  </div>

                  {/* section 11.10 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.10</span>
                    <span className="subconfig-name">
                      Default role for new users
                    </span>
                    <div id="select-89">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options24}
                        onSelect={handleOptionSelect24}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.11 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.11</span>

                    <span className="subconfig-name">Allow only SSO login</span>

                    <div id="select-90">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.12 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.12</span>

                    <span className="subconfig-name">Show reviewers</span>

                    <div id="select-91">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.13 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.13</span>
                    <span className="subconfig-name">
                      Maximum inactive session timeout in minutes
                    </span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        value={inActiveSessionTimeOut}
                        readOnly={configPagePermission === "readOnly"}
                        onChange={(value) => setInActiveSessionTimeOut(value)}
                      />
                    </div>
                  </div>

                  {/* section 11.14 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.14</span>

                    <span className="subconfig-name">
                      Show confidential access in preferences
                    </span>

                    <div id="select-92">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.15 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.15</span>

                    <span className="subconfig-name">User Identifier</span>

                    <div id="select-93">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options25}
                        onSelect={handleOptionSelect25}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.16 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.16</span>
                    <span className="subconfig-name">SCIM 2.0 token</span>
                    <div id="select-1">
                      <div className="input-select-wrapper">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          id="password-input"
                          className="input-select"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          id="toggle-password"
                          className="toggle-password"
                          aria-label="Toggle password visibility"
                          onClick={togglePasswordVisibility}
                        >
                          <FontAwesomeIcon
                            icon={passwordVisible ? faEyeSlash : faEye}
                            id="psseye"
                          />
                        </button>

                        <ul className="input-select-options"></ul>
                      </div>
                    </div>
                  </div>

                  {/* section 11.17 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.17</span>
                    <span className="subconfig-name"></span>
                    <div id="select-1">
                      <InputTypes
                        type={"text"}
                        showFlagText={true}
                        textinputcustom="textinputcustomConfig"
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.18 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.18</span>

                    <span className="subconfig-name">
                      Login Attempts Before Lockout
                    </span>

                    <div id="select-94">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options26}
                        onSelect={handleOptionSelect26}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.19 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.19</span>

                    <span className="subconfig-name">Lockout Duration</span>

                    <div id="select-95">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options27}
                        onSelect={handleOptionSelect27}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>

                  {/* section 11.20 */}

                  <div id="subsection1">
                    <span className="subconfig-number">11.20</span>

                    <span className="subconfig-name">
                      Disable inactive user accounts over 90 days
                    </span>

                    <div id="select-96">
                      <CustomDropdown
                        custuminput="config-dropdown"
                        iconcon="iconconfig"
                        options={options1}
                        onSelect={handleOptionSelect}
                        readOnly={configPagePermission === "readOnly"}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ======================= */}

            {/*section 12  */}
            {/* onClick={toggleSection12} */}
            <div>
              <div className="con-sec12" >

                <ConfigSection   sectionNumber={12} sectionName="Notifications"   greysectionId={"greyoutSectionname"} greySectionNumber={"greySectionNumber"} toggleid={"unusedFunctionality"} toggleIconId={"toggleIconId"}/>
              </div>
              {isConSec12 && <div id="section12"></div>}
            </div>
          </div>
          {!isReadOnly && (
            <div id="save-configuration">
              <button
                id="update_data"
                onClick={
                  mode === "create" ? handleAddConfig : handleUpdateConfig
                }
                style={{ width: "80px" }}
              >
                {mode === "create" ? "APPLY" : "UPDATE"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Config;
