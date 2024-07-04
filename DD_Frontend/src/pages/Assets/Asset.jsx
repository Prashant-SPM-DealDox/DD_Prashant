// // import React from 'react'
// import React, { useState, useEffect, useRef } from "react";
// import Navbar from "../../layouts/Navbar";
// import CatalogSidebar from "../../layouts/CatalogSidebar";
// import WriteFlex from "../../components/common/WriteFlex";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCaretUp,
//   faCaretDown,
//   faPen,
//   faTable,
//   faGlobe,
//   faStickyNote,
// } from "@fortawesome/free-solid-svg-icons";
// import "../../assets/css/assets/Asset.css";
// import FroalaEditorComponent from "react-froala-wysiwyg";
// import PcrGridAsset from "../../components/assets/PcrGridAsset";
// import HeaderBar from "../../components/common/HeaderBar";
// import CustomDropdown from "../../components/common/CustomDropdown";
// import AddSection from "../../components/addsection/AddSection";
// import { Link } from "react-router-dom";
// import HelpRequest from "../../components/common/HelpRequest";

// const Asset = () => {

//   // Below line of code is used to avoide jumping URL's
//   const navigate = useNavigate();

//   // const validatedUser = localStorage.getItem("validated");

//   // if(validatedUser != "true"){
//   //   navigate('/auth');
//   // }

//   const handleModelChange = (model) => {
//   };

//   const editorConfig = {
//     // key: FROALA_LICENSE_KEY,
//     toolbarButtons: [
//       "fontAwesome",
//       "fontFamily",
//       "fontSize",
//       "undo",
//       "redo",
//       "getPDF",
//       "bold",
//       "italic",
//       "underline",
//       "textColor",
//       "backgroundColor",
//       "clearFormatting",
//       "alignLeft",
//       "alignCenter",
//       "alignRight",
//       "alignJustify",
//       "formatOL",
//       "formatUL",
//       "indent",
//       "outdent",
//       "paragraphFormat",
//       "insertLink",
//       "insertImage",
//       "print",
//       "quote",
//     ],
//   };

//   const inputRef = useRef(null);
//   const [Image, setImage] = useState("");

//   const handleImageClick = () => {
//     inputRef.current.click();
//   };
//   const handleImageChange = (event) => {
//     // const file = event.target.files[0];
//   };

//   const buttonblue = document.getElementsByClassName("blueButton");
//   var Inputtittle = document.getElementsByClassName("tittleinput");
//   const colorChange = () => {
//     var element = Inputtittle[0];
//     element.style.borderBottomColor = "#0f6b93";
//     buttonblue[0].disabled = false;
//     if (Inputtittle[0].value === "") {
//       element.style.borderBottomColor = "rgb(146, 9, 9)";
//       buttonblue[0].disabled = true;
//     } else {
//       element.style.borderBottomColor = "#0f6b93";
//       buttonblue[0].disabled = false;
//     }
//   };

//   const [, setisDropdownOpenasset] = useState(false);

//   const inputrefasset = useRef(null);

//   const dropdownRefasset = useRef(null);

//   useEffect(() => {
//     const handleClickOutsideroleasset = (event) => {
//       const dropdownElement = dropdownRefasset.current;

//       const inputElement = inputrefasset.current;

//       if (
//         dropdownElement &&
//         !dropdownElement.contains(event.target) &&
//         inputElement &&
//         !inputElement.contains(event.target)
//       ) {
//         setisDropdownOpenasset(false);
//       }
//     };

//     const handleWindowMousedown = (event) => {
//       handleClickOutsideroleasset(event);
//     };

//     window.addEventListener("mousedown", handleWindowMousedown);

//     return () => {
//       window.removeEventListener("mousedown", handleWindowMousedown);
//     };
//   }, []);

//   const [isOptionsOpen, setOptionsOpen] = useState(false);
//   const [isLabelVisible, setLabelVisible] = useState(true);

//   const surveyoptionopen = () => {
//     setOptionsOpen(!isOptionsOpen);
//     setLabelVisible(!isLabelVisible);
//   };
//   const [, setCatalogStatusOptions] = useState(null);

//   const CatalogStatusOptions = ["Apps", "All Other API"];

//   const handleCatalogStatusAsset = (selectedOption) => {
//     setCatalogStatusOptions(selectedOption);
//   };
//   const [headerBarAssetMessage, setheaderBarAssetMessage] = useState(true);
//   const [isbuttonAssetVisible, setButtonAssetVisible] = useState(false);
//   const [headerBarVisible, setHeaderBarVisible] = useState(true);

//   const resetAcessFields = () => {
//     setheaderBarAssetMessage(false);
//     setHeaderBarVisible(true);
//     setAssetBodyVisible(true);
//     setButtonAssetVisible(true);
//     setAssetPenTableGlobeIcons(true);
//   };
//   const [isAssetBodyVisible, setAssetBodyVisible] = useState(false);
//   const [isPcrGridAssetVisible, setPcrGridAssetVisible] = useState(false);
//   const [isAddsectionVisible, setAddsectionVisible] = useState(false);

//   const [assetPenbackgroundcolor, setAssetPenbackgroundcolor] =
//     useState("#216c98");
//   const [assetPenColor, setAssetPenColor] = useState("white");

//   const [assetTablebackgroundcolor, setAssetTablebackgroundcolor] =
//     useState("false");
//   const [assetTableColor, setAssetTableColor] = useState("black");

//   const [assetGridbackgroundcolor, setAssetGridbackgroundcolor] =
//     useState("false");
//   const [assetGridColor, setAssetGridColor] = useState("black");

//   const [isWriteFlexVisible, setWriteFlexVisible] = useState(true);
//   const [assetPenTableGlobeIcons, setAssetPenTableGlobeIcons] = useState(false);

//   const handleAssetPenIconVisible = () => {
//     setHeaderBarVisible(true);
//     setheaderBarAssetMessage(true);
//     setAssetBodyVisible(true);
//     setWriteFlexVisible(true);
//     setButtonAssetVisible(true);
//     setAssetPenTableGlobeIcons(true);
//     setPcrGridAssetVisible(false);
//     setAddsectionVisible(false);
//     setAssetPenbackgroundcolor("#216c98");
//     setAssetPenColor("white");
//     setAssetGridbackgroundcolor("white");
//     setAssetGridColor("black");
//     setAssetTablebackgroundcolor("white");
//     setAssetTableColor("black");
//   };

//   const handleAssetTableIconVisible = () => {
//     setAssetPenTableGlobeIcons(true);
//     setPcrGridAssetVisible(true);
//     setAssetBodyVisible(false);
//     setAddsectionVisible(false);
//     setHeaderBarVisible(false);
//     setButtonAssetVisible(false);
//     setWriteFlexVisible(false);
//     setheaderBarAssetMessage(false);

//     setAssetTablebackgroundcolor("#216c98");
//     setAssetTableColor("white");
//     setAssetPenbackgroundcolor("white");
//     setAssetPenColor("black");
//     setAssetGridbackgroundcolor("white");
//     setAssetGridColor("black");

//     // setAssetBodyVisible(false);
//   };
//   const handleAssetGlobeIconVisible = () => {
//     setAssetPenTableGlobeIcons(true);
//     setAddsectionVisible(true);
//     setPcrGridAssetVisible(false);
//     setAssetBodyVisible(false);
//     setHeaderBarVisible(false);
//     setButtonAssetVisible(false);
//     setheaderBarAssetMessage(false);
//     setWriteFlexVisible(false);

//     setAssetGridbackgroundcolor("#216c98");
//     setAssetGridColor("white");
//     setAssetPenbackgroundcolor("white");
//     setAssetPenColor("black");
//     setAssetTablebackgroundcolor("white");
//     setAssetTableColor("black");
//   };
//   return (
//     <div>
//       <Navbar />

//       <CatalogSidebar />

//       <div className="bread">
//         <ul className="breadcrumbs">
//           <li className="breadcrumbs--item">
//             <Link
//               href="/"
//               className="breadcrumbs--link breadcrumbs"
//               style={{ display: "inline", textDecoration: "none" }}
//             >
//               HOME
//             </Link>
//           </li>
//           <li className="breadcrumbs--item">
//             <Link
//               href="#"
//               className="breadcrumbs--link breadcrumbs"
//               style={{ display: "inline", textDecoration: "none" }}
//             >
//               CATALOG
//             </Link>
//           </li>
//           <li className="breadcrumbs--item">
//             <Link
//               href=""
//               className="breadcrumbs--link breadcrumbs--link--active"
//             >
//               ASSET
//             </Link>
//           </li>
//           {assetPenTableGlobeIcons && (
//             <ol
//               style={{ float: "right", listStyle: "none" }}
//               className="pen_scroll_grid_icons"
//             >
//               <FontAwesomeIcon
//                 icon={faPen}
//                 className="guided_selling_icons"
//                 style={{
//                   backgroundColor: assetPenbackgroundcolor,
//                   color: assetPenColor,
//                   fontSize: "15px",
//                   marginRight: "10px",
//                   padding: "3px",
//                 }}
//                 onClick={handleAssetPenIconVisible}
//               />
//               <FontAwesomeIcon
//                 icon={faTable}
//                 className="guided_selling_icons"
//                 style={{
//                   backgroundColor: assetTablebackgroundcolor,
//                   color: assetTableColor,
//                   fontSize: "15px",
//                   marginRight: "10px",
//                   padding: "3px",
//                 }}
//                 onClick={handleAssetTableIconVisible}
//               />
//               <FontAwesomeIcon
//                 icon={faGlobe}
//                 className="guided_selling_icons"
//                 style={{
//                   backgroundColor: assetGridbackgroundcolor,
//                   color: assetGridColor,
//                   fontSize: "15px",
//                   marginRight: "10px",
//                   padding: "3px",
//                 }}
//                 onClick={handleAssetGlobeIconVisible}
//               />
//             </ol>
//           )}
//         </ul>
//         <hr className="hr" />
//       </div>
//       <HelpRequest/>
//       {/* -------------------------- */}
//       <div className="rowasset">
//         {isWriteFlexVisible && (
//           <WriteFlex showGrouping={false} resetFields={resetAcessFields} />
//         )}
//         <div className="rightasset">
//           <div id="assetpage">
//             {/* add Section */}
//             {isAddsectionVisible && (
//               <div id="rightglobeheader">
//                 <div id="assetglobehead">
//                   <HeaderBar headerlabel="CATALOG ASSET GLOBAL SETTING" />
//                 </div>
//                 <div className="default_asset_div">
//                   <FontAwesomeIcon icon={faStickyNote} id="stickynote_asset" />
//                   <span className="default_asset" style={{ fontSize: "14px" }}>
//                     DEFAULT
//                   </span>
//                 </div>
//                 <div className="addsection_div">
//                   <AddSection />
//                 </div>
//               </div>
//             )}

//             {/* surevy grid */}
//             {isPcrGridAssetVisible && (
//               <div className="assetlistingheader" id="assetlistingdiv">
//                 <HeaderBar headerlabel="ASSET LISTING" />
//                 <div className="pcrgridassetDiv">
//                   <PcrGridAsset />
//                 </div>
//               </div>
//             )}
//             {/* <div> */}

//             {headerBarVisible && (
//               <div className="addasset">
//                 <HeaderBar headerlabel="CATALOG ASSET" />
//               </div>
//             )}

//             {headerBarAssetMessage && (
//               <div id="assetmsg">
//                 <label id="astmsg">
//                   NO ASSET FOUND PLEASE USE + TO ADD A NEW ASSET
//                 </label>
//               </div>
//             )}
//             {isAssetBodyVisible && (
//               <div className="hideassetMAinDIv">
//                 <div id="hideasset">
//                   <div className="grid-asset">
//                     <div className="tittleasset">
//                       <input
//                         type="text"
//                         placeholder="Tittle"
//                         className="tittleinput"
//                         onChange={colorChange}
//                       />
//                     </div>
//                     <div className="codeasset">
//                       <input
//                         type="text"
//                         placeholder="Code"
//                         className="codeinput"
//                       />
//                     </div>
//                     <div id="catalogasset">
//                       <CustomDropdown
//                         onSelect={handleCatalogStatusAsset}
//                         options={CatalogStatusOptions}
//                         label="CATALOG STATUS"
//                         custuminput="assetcustomdropinput"
//                       />
//                     </div>
//                     <div className="assetimage" onClick={handleImageClick}>
//                       {/* <label className='addimageasset'>ADD IMAGE</label> */}
//                       {Image ? (
//                         <img
//                           src={URL.createObjectURL(Image)}
//                           className="displayassetImage"
//                           alt=""
//                         />
//                       ) : (
//                         <label className="addimageasset">ADD&nbsp;IMAGE</label>
//                       )}
//                       <input
//                         type="file"
//                         ref={inputRef}
//                         onChange={handleImageChange}
//                         style={{ display: "none" }}
//                       />
//                     </div>
//                   </div>

//                   <div id="textdescc">
//                     {/* description content */}

//                     <div className="boxWidthspecify">
//                       <FroalaEditorComponent
//                         tag="textarea"
//                         config={editorConfig}
//                         onModelChange={handleModelChange}
//                       />
//                     </div>

//                     {/* Inputs for Rule and Keywords */}
//                   </div>

//                   <div className="ruleorderdiv">
//                     <div id="number">
//                       <input
//                         type="number"
//                         placeholder="Rule Order"
//                         className="ruleinputasset"
//                       />
//                     </div>
//                     <div className="keywordorderdiv">
//                       <input
//                         type="text"
//                         placeholder="Keywords"
//                         className="keywordinputasset"
//                       />
//                     </div>
//                   </div>
//                   <div className="assetlastrowropdown">
//                     <CustomDropdown />
//                   </div>
//                   <div className="checkboxdivgrid">
//                     <div className="checkboxdiv">
//                       <input
//                         type="checkbox"
//                         id="customCheckbox"
//                         onClick={surveyoptionopen}
//                       ></input>
//                       <label
//                         for="customCheckbox"
//                         className="customCheckboxLabel"
//                       ></label>

//                       <label class="labelcustomcheckbox"> ENABLE SURVEY </label>
//                     </div>
//                     {isOptionsOpen && (
//                       <div className="surveyoptionvisiblediv">
//                         <label>Options</label>
//                         {isOptionsOpen ? (
//                           <FontAwesomeIcon
//                             icon={faCaretUp}
//                             className="facareticon"
//                           />
//                         ) : (
//                           <FontAwesomeIcon
//                             icon={faCaretDown}
//                             className="facareticon"
//                           />
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {isLabelVisible && (
//                     <div className="assetinformation">
//                       <span>
//                         Options are only configurable after asset has been
//                         created
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {isbuttonAssetVisible && (
//                   <div className="assetbuttons">
//                     <div className="assetbuttonsubdiv">
//                       <button className="redButton">Cancel</button>
//                       <button className="blueButton" disabled>
//                         save new Asset
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//         {/* </div> */}
//       </div>
//     </div>
//   );
// };

// export default Asset;
