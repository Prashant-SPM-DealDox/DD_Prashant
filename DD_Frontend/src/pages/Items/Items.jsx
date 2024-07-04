// import React from "react";
// import Navbar from "../../layouts/Navbar";
// import CatalogSidebar from "../../layouts/CatalogSidebar";
// import WriteFlex from "../../components/common/WriteFlex";
// import CustomDropdown from "../../components/common/CustomDropdown";
// import "../../assets/css/items/Items.css";
// import Addinfo from "../../components/addinfo/Addinfo";
// import { useState } from "react";
// import Categories from "../../components/categaries/Categaries";
// import GeneralInfo from "../../components/generalInfo/GeneralInfo";
// import HeaderBar from "../../components/common/HeaderBar";
// import { Link, useNavigate } from "react-router-dom";
// import ErrorMessage from "../../components/common/ErrorMessage";
// import InputTypes from "../../components/common/InputTypes";
// import { FaGreaterThan, FaLessThan } from "react-icons/fa";
// import SidePanel from "../../components/common/SidePanel";
// import HelpRequest from "../../components/common/HelpRequest";

// const Items = () => {
//   const navigate = useNavigate();

//   //    // Below line of code is used to avoide jumping URL's
//   //    const validatedUser = localStorage.getItem("validated");

//   //    if(validatedUser != "true"){
//   //      navigate('/auth');
//   //    }

//   const [, setSelectedCategory] = useState(null);
//   const [, setCategoryStatus] = useState(null);

//   const handleSelectCategory = (selectedOption) => {
//     setSelectedCategory(selectedOption);
//   };

//   const handleSelectCategoryStatus = (selectedOption) => {
//     setCategoryStatus(selectedOption);
//   };
//   const categoryOptions = ["DBA", "DSCM", "DEFAULT", "EDUCATION", "QOT"];

//   const catalogStatusOptions = ["INACTIVE", "IN PROCESS", "PUBLISHED"];

//   const [WriteFlexVisible, setWriteFlexVisible] = useState(true);
//   const [ItemHederVisible, setItemHederVisible] = useState(true);
//   const [ItemMsgVisible, setItemMsgVisible] = useState(true);
//   const [itemsBodyVisible, setItemsBodyVisible] = useState(false);
//   const resetFields = () => {
//     setItemHederVisible(true);
//     setItemsBodyVisible(true);
//     setWriteFlexVisible(true);
//     setItemMsgVisible(false);
//   };
//   const [accountSideBar, setAccountSidebar] = useState(false);

//   const handleOpenAccountSideBar = () => {
//     setAccountSidebar(!accountSideBar);
//   };
//   return (
//     <div>
//       <div>
//         <Navbar />
//         <CatalogSidebar />
//         <div className="bread">
//           <ul className="breadcrumbs">
//             <li className="breadcrumbs--item">
//               <Link href="/home" className="breadcrumbs--link_mid">
//                 Home
//               </Link>
//             </li>
//             <li className="breadcrumbs--item">
//               <Link className="breadcrumbs--link_mid">Catalog</Link>
//             </li>
//             <li className="breadcrumbs--item">
//               <Link href="" className="breadcrumbs--link--active">
//                 Item
//               </Link>
//             </li>
//           </ul>
//           <hr className="hr" />
//         </div>
//         <HelpRequest />
//         <div className="rowitem" id="rowitemm">
//           {WriteFlexVisible && (
//             // <div>
//             <WriteFlex showGrouping={true} resetFields={resetFields} />
//           )}

//           <div
//             className="rightitem"
//             style={{
//               width: accountSideBar ? "65%" : "100%",
//               borderRight: accountSideBar ? "3px solid #216c98" : "none",
//             }}
//           >
//             <button
//               id="openbtn"
//               onClick={handleOpenAccountSideBar}
//               style={{ marginRight: accountSideBar ? "18%" : "0%" }}
//             >
//               {accountSideBar ? <FaGreaterThan /> : <FaLessThan />}
//             </button>
//             {ItemHederVisible && (
//               <div>
//                 <HeaderBar headerlabel="CATALOG ITEM" />
//               </div>
//             )}
//             {ItemMsgVisible && (
//               <div id="itemmsgdiv">
//                 <label id="itemmsg">
//                   NO ITEM FOUND. PLEASE USE + TO ADD A NEW ITEM
//                 </label>
//               </div>
//             )}
//             {itemsBodyVisible && (
//               <>
//                 <div class="itemgrid">
//                   <div className="itemname">
//                     <ErrorMessage
//                       type={"text"}
//                       showFlaxErrorMessageTextNoMandatory={true}
//                       labelNoMAndatory="ITEM"
//                       errormsgNoMAndatory="ITEM IS A REQUIRED FIELD"
//                     />
//                   </div>
//                   <div id="itemcate">
//                     <CustomDropdown
//                       options={categoryOptions}
//                       onSelect={handleSelectCategory}
//                       label="CATALOG CATEGORY"
//                       labelforverticl="verticallabel"
//                     />
//                   </div>
//                   <div id="itemlist">
//                     <CustomDropdown
//                       options={catalogStatusOptions}
//                       onSelect={handleSelectCategoryStatus}
//                       label="CATALOG STATUS"
//                       labelforverticl="verticallabel"
//                     />
//                   </div>
//                 </div>

//                 <div class="itemgrid1">
//                   <div id="itemdesc">
//                     <InputTypes
//                       type={"text"}
//                       showFlagText={true}
//                       TextLabel="DESCRIPTION"
//                     />
//                   </div>
//                   <div id="itemcheck">
//                     <InputTypes
//                       showFlagCheckBox={true}
//                       Checkboxlabel="PROHBIT DISCOUNT"
//                     />
//                   </div>
//                 </div>
//                 <div className="generalinfomain">
//                   <GeneralInfo />
//                 </div>

//                 <div id="categoriesdiv">
//                   <Categories />
//                 </div>
//                 <div id="add">
//                   <Addinfo />
//                 </div>
//                 <div className="itembutton">
//                   <button id="delete_data">CANCEL</button>
//                   <button id="save_data">SAVE NEW ITEM</button>
//                 </div>
//               </>
//             )}
//           </div>
//           <div
//             className="sidepanel"
//             style={{ width: accountSideBar ? "20%" : "0%" }}
//           >
//             <SidePanel
//               showFlagFiles={accountSideBar ? true : ""}
//               showFlagTimeStamp={accountSideBar ? true : ""}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Items;
