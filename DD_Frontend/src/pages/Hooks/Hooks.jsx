// import React, { useState, useEffect } from "react";
// import Navbar from "../../layouts/Navbar";
// import AdminSidebar from "../../layouts/AdminSidebar";
// import CustomDropdown from "../../components/common/CustomDropdown";
// import InputTypes from "../../components/common/InputTypes";
// import ConfigSection from "../../components/config/ConfigToggleComponent";
// import "../../assets/css/hooks/Hooks.css";
// import { Link } from "react-router-dom";
// import HeaderBar from "../../components/common/HeaderBar";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { baseUrl } from "../../config";
// import { toast } from "react-hot-toast";
// import HelpRequest from "../../components/common/HelpRequest";

// const Hooks = () => {
//   const { user } = useAuthContext();
//   const [configId, setConfigId] = useState("");

//   const [selectedOptionGrouping, setSelectedOptionGrouping] = useState(null);
//   const [selectedOptionGrouping02, setSelectedOptionGrouping02] =
//     useState(null);
//   const [selectedOptionGrouping03, setSelectedOptionGrouping03] =
//     useState(null);
//   const [selectedOptionGrouping04, setSelectedOptionGrouping04] =
//     useState(null);
//   const [selectedOptionGrouping05, setSelectedOptionGrouping05] =
//     useState(null);
//   const [selectedOptionGrouping07, setSelectedOptionGrouping07] =
//     useState(null);
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const options1 = ["SALESFORCE", "MICROSOFT 365", "MYDEAL", "NONE"];
//   const handleOptionSelect = (selectedOption) => {
//     setSelectedOptionGrouping(selectedOption);
//   };
//   const options2 = [
//     "FINANCIAL FORCE",
//     "NETSUITE",
//     "SAP",
//     "WORKDAY",
//     "IDB",
//     "NONE",
//   ];
//   const handleOptionSelect02 = (selectedOption) => {
//     setSelectedOptionGrouping02(selectedOption);
//   };
//   const options3 = ["SNAPLOGIC", "PRISM", "SHAREPOINT", "OPENAIR", "NONE"];
//   const handleOptionSelect03 = (selectedOption) => {
//     setSelectedOptionGrouping03(selectedOption);
//   };
//   const options4 = ["YES", "NO"];
//   const handleOptionSelect04 = (selectedOption) => {
//     setSelectedOptionGrouping04(selectedOption);
//   };
//   const handleOptionSelect05 = (selectedOption) => {
//     setSelectedOptionGrouping05(selectedOption);
//   };
//   const handleOptionSelect07 = (selectedOption) => {
//     setSelectedOptionGrouping07(selectedOption);
//   };
//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };
//   const [selectedOptionGrouping2, setSelectedOptionGrouping2] = useState(null);

//   const [selectedOptionGrouping3, setSelectedOptionGrouping3] = useState(null);
//   const options6 = [
//     "NEW SECURITY ROLE",
//     "SKILLS TESTING",
//     "APPROVER",
//     "NO USER ACCESS",
//     "BMC SALES USERS",
//     "BMC PMO USER",
//     "BMC SOLUTION ARCHITECT",
//     "ADMIN",
//     "RESTRICTED USER",
//   ];
//   const handleOptionSelect06 = (selectedOption3) => {
//     setSelectedOptionGrouping3(selectedOption3);
//   };

//   const [selectedOptionGrouping4, setSelectedOptionGrouping4] = useState(null);
//   const options8 = [
//     "A.10 MINUTES",
//     "B.15 MINUTES",
//     "C.30 MINUTES",
//     "D.40 HOUR",
//     "E.2 HOURS",
//     "F.4 HOURS",
//     "G.DIALY",
//     "H.WEEKLY",
//   ];
//   const handleOptionSelect4 = (selectedOption4) => {
//     setSelectedOptionGrouping4(selectedOption4);
//   };

//   const [selectedOptionGrouping9, setSelectedOptionGrouping9] = useState(null);
//   const handleOptionSelect9 = (selectedOption9) => {
//     setSelectedOptionGrouping9(selectedOption9);
//   };
//   const [selectedOptionGrouping10, setSelectedOptionGrouping10] =
//     useState(null);
//   const handleOptionSelect10 = (selectedOption10) => {
//     setSelectedOptionGrouping10(selectedOption10);
//   };
//   const [selectedOptionGrouping11, setSelectedOptionGrouping11] =
//     useState(null);
//   const options11 = ["QAUTH2", "QAUTH2 SAML BEARER", "QUATH2 CONNECTED APP"];
//   const handleOptionSelect11 = (slectedOption11) => {
//     setSelectedOptionGrouping11(slectedOption11);
//   };
//   const [selectedOptionGrouping12, setSelectedOptionGrouping12] =
//     useState(null);
//   const handleOptionSelect12 = (slectedOption12) => {
//     setSelectedOptionGrouping12(slectedOption12);
//   };
//   const [selectedOptionGrouping15, setSelectedOptionGrouping15] =
//     useState(null);
//   const handleOptionSelect15 = (selectedOption15) => {
//     setSelectedOptionGrouping15(selectedOption15);
//   };
//   const [selectedOptionGrouping16, setSelectedOptionGrouping16] =
//     useState(null);
//   const handleOptionSelect16 = (selectedOption16) => {
//     setSelectedOptionGrouping16(selectedOption16);
//   };
//   const [selectedOptionGrouping19, setSelectedOptionGrouping19] =
//     useState(null);
//   const handleOptionSelect19 = (selectedOption19) => {
//     setSelectedOptionGrouping19(selectedOption19);
//   };

//   const [selectedOptionGrouping20, setSelectedOptionGrouping20] =
//     useState(null);
//   const handleOptionSelect20 = (selectedOption20) => {
//     setSelectedOptionGrouping20(selectedOption20);
//   };
//   // use states declared for toggle of main section
//   const [isConSec1, setConSec1] = useState(false);
//   const toggleSection1 = () => {
//     setConSec1(!isConSec1);
//   };

//   const [isConSec2, setConSec2] = useState(false);
//   const toggleSection2 = () => {
//     setConSec2(!isConSec2);
//   };

//   const [isConSec3, setConSec3] = useState(false);
//   const toggleSection3 = () => {
//     setConSec3(!isConSec3);
//   };

//   // adding config
//   const [mode, setMode] = useState("create"); // Initially set to 'create'
//   const handleAddConfig = () => {
//     const newConfigData = {
//       value1: selectedOptionGrouping,
//       value2: selectedOptionGrouping02,
//       value3: selectedOptionGrouping03,
//       value4: selectedOptionGrouping04,
//       value5: selectedOptionGrouping2,
//       value6: selectedOptionGrouping3,
//       value7: selectedOptionGrouping07,
//       value8: selectedOptionGrouping4,
//     };

//     fetch(`${baseUrl}/api/config/add`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `Bearer ${user.token}`,
//       },
//       body: JSON.stringify(newConfigData),
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error("Error adding Account");
//         }
//       })
//       .then((data) => {
//         const delay = 1500;
//         setTimeout(() => {
//           window.location.reload();
//         }, delay);
//       })
//       .catch((error) => {
//         console.error("Error adding Account:", error);
//       });
//   };
//   // update config data
//   const handleUpdateConfig = () => {
//     const newConfigData = {
//       value1: selectedOptionGrouping,
//       value2: selectedOptionGrouping02,
//       value3: selectedOptionGrouping03,
//       value4: selectedOptionGrouping04,
//       value5: selectedOptionGrouping2,
//       value6: selectedOptionGrouping3,
//       value7: selectedOptionGrouping07,
//       value8: selectedOptionGrouping4,
//     };

//     fetch(`${baseUrl}/api/config/update/${configId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `Bearer ${user.token}`,
//       },
//       body: JSON.stringify(newConfigData),
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error("Error Updating config");
//         }
//       })
//       .then((data) => {
//         toast.success("Config Updated successfully");
//         const delay = 1000;
//         setTimeout(() => {
//           window.location.reload();
//         }, delay);
//       })
//       .catch((error) => {
//         console.error("Error Updating Account:", error);
//       });
//   };

//   return (
//     <div>
//       <Navbar data={selectedOptionGrouping07} />
//       <AdminSidebar />
//       <div className="bread">
//         <ul className="breadcrumbs">
//           <li className="breadcrumbs--item">
//             <Link to="/home" className="breadcrumbs--link_mid">
//               Home
//             </Link>
//           </li>
//           <li className="breadcrumbs--item">
//             <Link to="/admin-company-profile" className="breadcrumbs--link_mid">
//               Admin
//             </Link>
//           </li>

//           <li className="breadcrumbs--item">
//             <Link to="/companyprofile" className="breadcrumbs--link--active">
//               Integeration Config
//             </Link>
//           </li>
//         </ul>
//         <hr className="hr" />
//         <HelpRequest />
//       </div>
//       <div>
//         <div>
//           {/* section 1 */}
//           <div id="mainconfig">
//             <HeaderBar headerlabel={"INTEGERATION CONFIGURATION"} />
//             <div className="con-sec1" onClick={toggleSection1}>
//               <ConfigSection sectionNumber={1} sectionName="General" />
//             </div>
//             {isConSec1 && (
//               <div id="section1">
//                 {/* section1.1 */}
//                 <div id="subsection1">
//                   <span className="subconfig-number">1.1</span>
//                   <span className="subconfig-name">Select CRM adapter</span>
//                   <div id="select-1">
//                     <CustomDropdown
//                       custuminput="config-dropdown"
//                       iconcon="iconconfig"
//                       options={options1}
//                       onSelect={handleOptionSelect}
//                       value={selectedOptionGrouping}
//                       onChange={(value) => setSelectedOptionGrouping(value)}
//                     />
//                   </div>
//                 </div>

//                 {/* section1.2 */}

//                 <div id="subsection1">
//                   <span className="subconfig-number">1.2</span>
//                   <span className="subconfig-name">Select PSA adapter</span>
//                   <div id="select-2">
//                     <CustomDropdown
//                       custuminput="config-dropdown"
//                       iconcon="iconconfig"
//                       options={options2}
//                       onSelect={handleOptionSelect02}
//                       value={selectedOptionGrouping02}
//                       onChange={(value) => setSelectedOptionGrouping02(value)}
//                     />
//                   </div>
//                 </div>

//                 {/* section 1.3 */}

//                 <div id="subsection1">
//                   <span className="subconfig-number">1.3</span>

//                   <span className="subconfig-name">Select Other adapter</span>

//                   <div id="select-3">
//                     <CustomDropdown
//                       custuminput="config-dropdown"
//                       iconcon="iconconfig"
//                       options={options3}
//                       onSelect={handleOptionSelect03}
//                       value={selectedOptionGrouping03}
//                       onChange={(value) => setSelectedOptionGrouping03(value)}
//                     />
//                   </div>
//                 </div>

//                 {/* section 1.4 */}

//                 <div id="subsection1">
//                   <span className="subconfig-number">1.4</span>

//                   <span className="subconfig-name">
//                     Show integration error notifications
//                   </span>

//                   <div id="select-4">
//                     <CustomDropdown
//                       custuminput="config-dropdown"
//                       iconcon="iconconfig"
//                       options={options4}
//                       onSelect={handleOptionSelect04}
//                       value={selectedOptionGrouping04}
//                       onChange={(value) => setSelectedOptionGrouping04(value)}
//                     />
//                   </div>
//                 </div>

//                 {/* Section 1.5 */}

//                 <div id="subsection1">
//                   <span className="subconfig-number">1.5</span>

//                   <span className="subconfig-name">
//                     Automatically responses error
//                   </span>

//                   <div id="select-5">
//                     <CustomDropdown
//                       custuminput="config-dropdown"
//                       iconcon="iconconfig"
//                       options={options4}
//                       onSelect={handleOptionSelect05}
//                       value={selectedOptionGrouping05}
//                       onChange={(value) => setSelectedOptionGrouping05(value)}
//                     />
//                   </div>
//                 </div>

//                 {/* section 1.6 */}

//                 <div id="subsection1">
//                   <span className="subconfig-number">1.6</span>

//                   <span className="subconfig-name">
//                     Role for email notifications{" "}
//                   </span>

//                   <div id="select-6">
//                     <CustomDropdown
//                       custuminput="config-dropdown"
//                       iconcon="iconconfig"
//                       options={options6}
//                       onSelect={handleOptionSelect06}
//                       value={selectedOptionGrouping3}
//                       onChange={(value) => setSelectedOptionGrouping3(value)}
//                     />
//                   </div>
//                 </div>
//                 {/* section 1.7 */}

//                 <div id="subsection1">
//                   <span className="subconfig-number">1.7</span>

//                   <span className="subconfig-name">Notifications</span>

//                   <div id="select-7">
//                     <CustomDropdown
//                       custuminput="config-dropdown"
//                       iconcon="iconconfig"
//                       options={options4}
//                       onSelect={handleOptionSelect07}
//                       value={selectedOptionGrouping07}
//                       onChange={(value) => setSelectedOptionGrouping07(value)}
//                     />
//                   </div>
//                 </div>

//                 {/* section 1.8 */}

//                 <div id="subsection1">
//                   <span className="subconfig-number">1.8</span>

//                   <span className="subconfig-name">
//                     Reprocesses errors every
//                   </span>

//                   <div id="select-8">
//                     <CustomDropdown
//                       custuminput="config-dropdown"
//                       iconcon="iconconfig"
//                       options={options8}
//                       onSelect={handleOptionSelect4}
//                       value={selectedOptionGrouping4}
//                       onChange={(value) => setSelectedOptionGrouping4(value)}
//                     />
//                   </div>
//                 </div>
//                 {/* section 1.9 */}
//                 <div id="subsection1">
//                   <span className="subconfig-number">1.9</span>

//                   <span className="subconfig-name">Max errors retry</span>

//                   <div id="select-9">
//                     <CustomDropdown
//                       custuminput="config-dropdown"
//                       iconcon="iconconfig"
//                       //   options={options4}
//                       onSelect={handleOptionSelect9}
//                       value={selectedOptionGrouping9}
//                       onChange={(value) => setSelectedOptionGrouping9(value)}
//                     />
//                   </div>
//                 </div>
//                 {/* section 1.10 */}

//                 <div id="subsection1">
//                   <span className="subconfig-number">1.10</span>

//                   <span className="subconfig-name">
//                     Background sync defaut user
//                   </span>

//                   <div id="select-10">
//                     <CustomDropdown
//                       custuminput="config-dropdown"
//                       iconcon="iconconfig"
//                       options={options4}
//                       onSelect={handleOptionSelect10}
//                       value={selectedOptionGrouping10}
//                       onChange={(value) => setSelectedOptionGrouping10(value)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//             {/* Section 2 */}
//             <div>
//               <div className="con-sec2" onClick={toggleSection2}>
//                 <ConfigSection
//                   sectionNumber={2}
//                   sectionName="Salesforce-General"
//                 />
//               </div>
//               {isConSec2 && (
//                 <div id="section2">
//                   {/* section 2.1 */}
//                   <div id="subsection1">
//                     <span className="subconfig-number">2.1</span>

//                     <span className="subconfig-name">
//                       Select authentication method
//                     </span>

//                     <div id="select-11">
//                       <CustomDropdown
//                         custuminput="config-dropdown"
//                         iconcon="iconconfig"
//                         options={options11}
//                         value={selectedOptionGrouping11}
//                         onSelect={handleOptionSelect11}
//                       />
//                     </div>
//                   </div>

//                   {/* section 2.2 */}

//                   <div id="subsection1">
//                     <span className="subconfig-number">2.2</span>

//                     <span className="subconfig-name">
//                       Run background sync every
//                     </span>

//                     <div id="select-12">
//                       <CustomDropdown
//                         custuminput="config-dropdown"
//                         iconcon="iconconfig"
//                         options={options8}
//                         value={selectedOptionGrouping12}
//                         onSelect={handleOptionSelect12}
//                       />
//                     </div>
//                   </div>

//                   {/* section 2.3 */}

//                   <div id="subsection1">
//                     <span className="subconfig-number">2.3</span>

//                     <span className="subconfig-name">Enter client id</span>

//                     <div id="select-13">
//                       <InputTypes
//                         showFlagText={true}
//                         textinputcustom="textinputcustomHooks"
//                       />
//                     </div>
//                   </div>
//                   {/* section 2.4 */}
//                   <div id="subsection1">
//                     <span className="subconfig-number">2.4</span>

//                     <span className="subconfig-name">
//                       Enter secret client id
//                     </span>

//                     <div id="select-14">
//                       <InputTypes
//                         showFlagText={true}
//                         textinputcustom="textinputcustomHooks"
//                       />
//                       <div
//                         className="faeyeicon"
//                         onClick={togglePasswordVisibility}
//                       >
//                         <FontAwesomeIcon
//                           icon={passwordVisible ? faEyeSlash : faEye}
//                           id="psseye"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   {/* section 2.5 */}

//                   <div id="subsection1">
//                     <span className="subconfig-number">2.5</span>

//                     <span className="subconfig-name">
//                       Background sync default user
//                     </span>

//                     <div id="select-15">
//                       <CustomDropdown
//                         custuminput="config-dropdown"
//                         iconcon="iconconfig"
//                         options={options4}
//                         value={selectedOptionGrouping15}
//                         onSelect={handleOptionSelect15}
//                       />
//                     </div>
//                   </div>
//                   {/* section 2.6 */}

//                   <div id="subsection1">
//                     <span className="subconfig-number">2.6</span>

//                     <span className="subconfig-name">
//                       Use background user only
//                     </span>

//                     <div id="select-16">
//                       <CustomDropdown
//                         custuminput="config-dropdown"
//                         iconcon="iconconfig"
//                         options={options4}
//                         value={selectedOptionGrouping16}
//                         onSelect={handleOptionSelect16}
//                       />
//                     </div>
//                   </div>

//                   {/* section 2.7 */}

//                   <div id="subsection1">
//                     <span className="subconfig-number">2.7</span>

//                     <span className="subconfig-name">Enter login url</span>

//                     <div id="select-17">
//                       <InputTypes
//                         showFlagText={true}
//                         textinputcustom="textinputcustomHooks"
//                       />
//                     </div>
//                   </div>
//                   {/* section 2.8 */}

//                   <div id="subsection1">
//                     <span className="subconfig-number">2.8</span>

//                     <span className="subconfig-name">Enter domain url</span>

//                     <div id="select-18">
//                       <InputTypes
//                         showFlagText={true}
//                         textinputcustom="textinputcustomHooks"
//                       />
//                     </div>
//                   </div>
//                   {/* section 2.9 */}
//                   <div id="subsection1">
//                     <span className="subconfig-number">2.9</span>

//                     <span className="subconfig-name">
//                       Lightning Experience?
//                     </span>

//                     <div id="select-19">
//                       <CustomDropdown
//                         custuminput="config-dropdown"
//                         iconcon="iconconfig"
//                         options={options4}
//                         value={selectedOptionGrouping19}
//                         onSelect={handleOptionSelect19}
//                       />
//                     </div>
//                   </div>
//                   {/* section 2.10 */}
//                   <div id="subsection1">
//                     <span className="subconfig-number">2.10</span>

//                     <span className="subconfig-name">
//                       Opportunity icon link to Salesforce
//                     </span>

//                     <div id="select-20">
//                       <CustomDropdown
//                         custuminput="config-dropdown"
//                         iconcon="iconconfig"
//                         options={options4}
//                         value={selectedOptionGrouping20}
//                         onSelect={handleOptionSelect20}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* section 3 */}

//             <div className="con-sec3" onClick={toggleSection3}>
//               <ConfigSection sectionNumber={3} sectionName="OpenAir" />
//             </div>
//             {isConSec3 && (
//               <div id="section3">
//                 {/* section 3.1 */}

//                 <div id="subsection1">
//                   <span className="subconfig-number">3.1</span>

//                   <span className="subconfig-name">Enter WebMethod URL</span>

//                   <div id="select-21">
//                     <InputTypes
//                       showFlagText={true}
//                       textinputcustom="textinputcustomHooks"
//                     />
//                   </div>
//                 </div>
//                 {/* section 3.2 */}

//                 <div id="subsection1">
//                   <span className="subconfig-number">3.2</span>

//                   <span className="subconfig-name">ENter API-key</span>

//                   <div id="select-22">
//                     <InputTypes
//                       showFlagText={true}
//                       textinputcustom="textinputcustomHooks"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* ======================= */}
//           </div>

//           <div id="save-configuration">
//             <button
//               id="update_data"
//               onClick={mode === "create" ? handleAddConfig : handleUpdateConfig}
//               style={{ width: "80px" }}
//             >
//               {mode === "create" ? "APPLY" : "UPDATE"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hooks;
