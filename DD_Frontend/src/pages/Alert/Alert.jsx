// import React from "react";
// import Navbar from "../../layouts/Navbar";
// import AdminSidebar from "../../layouts/AdminSidebar";
// import "../../assets/css/alert/Alert.css";
// import WriteFlex from "../../components/common/WriteFlex";
// import { useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";
// import "froala-editor/css/froala_editor.pkgd.min.css";
// import "froala-editor/css/froala_style.min.css";
// import "froala-editor/js/froala_editor.pkgd.min.js";
// import "froala-editor/js/plugins.pkgd.min.js";
// import "froala-editor/js/third_party/embedly.min.js";
// import FroalaEditorComponent from "react-froala-wysiwyg";
// import ErrorMessage from "../../components/common/ErrorMessage";
// import CustomDropdown from "../../components/common/CustomDropdown";
// import InputTypes from "../../components/common/InputTypes";
// import { Link } from "react-router-dom";
// import HeaderBar from "../../components/common/HeaderBar";
// import HelpRequest from "../../components/common/HelpRequest";
// import { FROALA_LICENSE_KEY } from "../../config";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import { useContext } from "react";
// import DataContext from "../../dataContext/DataContext";

// const Alert = () => {
//   const { user } = useAuthContext();

//   // Below line of code is used to avoide jumping URL's
//   const navigate = useNavigate();

//   // const validatedUser = localStorage.getItem("validated");

//   // if(validatedUser != "true"){
//   //   navigate('/auth');
//   // }

//   const { securityRoleData } = useContext(DataContext);
//   const alertPagePermission =
//     securityRoleData && securityRoleData.length > 0
//       ? securityRoleData[0].admin_security
//       : "";
//   const isReadOnly = alertPagePermission === "readOnly";

//   const handleModelChange = (model) => {};

//   const editorConfig = {
//     key: FROALA_LICENSE_KEY,
//     toolbarButtons: [
//       [
//         "textColor",
//         "bold",
//         "italic",
//         "underline",
//         "insertLink",
//         "undo",
//         "redo",
//         "html",
//       ],
//     ],
//   };

//   const [selectedStartDate, setSelectedStartDate] = useState(null);

//   const handleCalendarStartChange = (date) => {
//     setSelectedStartDate(date);
//   };

//   // STATUS
//   const [, setSelectedOption] = useState("");

//   const handleOptionSelect = (selectedOption) => {
//     setSelectedOption(selectedOption);
//   };

//   // Practice Options
//   const optionStatus = ["PUBLISHED", "UNPUBLISHED"];

//   return (
//     <div>
//       <Navbar />
//       <AdminSidebar />
//       <div className="bread">
//         <ul className="breadcrumbs">
//           <li className="breadcrumbs--item">
//             <Link to="/" className="breadcrumbs--link_mid">
//               Home
//             </Link>
//           </li>
//           <li className="breadcrumbs--item">
//             <Link to="/admin-company-profile" className="breadcrumbs--link_mid">
//               Admin
//             </Link>
//           </li>
//           <li className="breadcrumbs--item">
//             <Link to="" className="breadcrumbs--link--active">
//               Alert
//             </Link>
//           </li>
//         </ul>
//         <hr className="hr" />
//       </div>
//       <HelpRequest />
//       {/* -------------------------- */}
//       <div className="AlertMain">
//         <WriteFlex />

//         <div id="Alert-head">
//           <HeaderBar headerlabel={"ADMIN ALERTS"} />
//           <div id="prasent">
//             <div class="alertgrid">
//               <div id="alertname">
//                 <ErrorMessage
//                   type={"text"}
//                   showFlaxErrorMessageText={true}
//                   label="TITLE"
//                   placeholdersection="Enter Title"
//                   errormsg="TITLE IS A REQUIRED FIELD"
//                 />
//               </div>
//               <div id="alertdate">
//                 <InputTypes
//                   showFlagCalender={true}
//                   CalenderLabel="PUBLISHED DATE"
//                   placeholder="Select a Date"
//                   selectedDate={selectedStartDate}
//                   onCalendarChange={handleCalendarStartChange}
//                 />
//               </div>
//               <div id="alertlist">
//                 <CustomDropdown
//                   label="STATUS"
//                   onSelect={handleOptionSelect}
//                   options={optionStatus}
//                 />
//               </div>
//             </div>
//             <div id="descriptionalert">
//               <FroalaEditorComponent
//                 tag="textarea"
//                 config={editorConfig}
//                 onModelChange={handleModelChange}
//               />
//             </div>
//             {!isReadOnly && (
//               <div class="buttongrid">
//                 <button id="reset_data">CANCEL</button>
//                 <button id="save_data">SAVE NEW ALERT</button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Alert;
