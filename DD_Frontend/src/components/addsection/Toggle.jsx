// import React, { useState, useEffect, useRef } from "react";
// import "../../assets/css/addsection/QuestionAndRules.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// function Toggle({
//   allcount,
//   onDelete,
//   toggleCount,
//   inputValue,
//   onInputChange,
//   showInfoCircle,
//   handleToggleInfoClick,
//   ontoggleoptionChange,
//   onradiochnage,
// }) {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const dropdownRef = useRef(null);

//   const [highlighted, setHighlighted] = useState(false);

//   const buttonRef = useRef(null);

//   const handleClickOutside = (event) => {
//     if (buttonRef.current && !buttonRef.current.contains(event.target)) {
//       setHighlighted(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleOptionClick = (option) => {
//     setIsDropdownOpen(false);

//     ontoggleoptionChange(option);
//   };

//   const options = ["Toggle", "Yes/No", "Date", "Textarea", "Multitext"];

//   return (
//     <>
//       <div className="maintogglediv">
//         <div className="dletandtoggle">
//           <div
//             id="deletebackdiv"
//             style={{
//               backgroundColor: highlighted ? "red" : "#eeececba",

//               color: highlighted ? "white" : "red",
//             }}
//           >
//             <FontAwesomeIcon icon={faTrashAlt}
//   id="deletetoggle"
//   ref={buttonRef}
//   className={highlighted ? "highlighted" : ""}
//   style={{ color: highlighted ? "white" : "red" }}
//   aria-hidden="true"
//   onClick={() => {
//     if (!highlighted) {
//       setHighlighted(true);
//     } else {
//       onDelete();
//     }
//   }}
// />

//           </div>

//           <div>
//             <i
//               id="droptoggle"
//               className={`fa ${
//                 isDropdownOpen ? "fa-angle-up" : "fa-angle-down"
//               }`}
//               onClick={toggleDropdown}
//             ></i>
//           </div>
//         </div>

//         <div className="toggle-iand-radio">
//           <i
//             id="i-icon-toggle"
//             className={`fa ${showInfoCircle ? "fa-info-circle" : "fa-info"}`}
//             aria-hidden="true"
//             onClick={() => {
//               handleToggleInfoClick(!showInfoCircle);
//             }}
//           ></i>

//           <input
//             id="reqr"
//             type="radio"
//             value="true"
//             checked={inputValue.requiredfield}
//             onClick={() => {
//               onradiochnage(!inputValue.requiredfield);
//             }}
//           />

//           <label htmlFor="" id="reqlab">
//             Required
//           </label>
//         </div>

//         <div className="toggleandcount">
//           <p id="togl">{inputValue.key}</p>

//           <p id="countoftoggle">
//             {allcount}.{toggleCount}
//           </p>
//         </div>

//         <input
//           type="text"
//           name="field"
//           id="inputtoggle"
//           placeholder="Enter Field input"
//           autoComplete="off"
//           value={inputValue.inputfiled}
//           onChange={(e) => onInputChange(e.target.value)}
//         />

//         {isDropdownOpen && (
//           <div className="divdropdowntoggle">
//             <ul className="dropdown-options-togle" ref={dropdownRef}>
//               {options.map((option, index) => (
//                 <li
//                   className="togglelist"
//                   key={index}
//                   onClick={() => handleOptionClick(option)}
//                 >
//                   {option}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Toggle;
