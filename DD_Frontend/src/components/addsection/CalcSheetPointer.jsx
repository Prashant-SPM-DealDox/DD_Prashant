// import React, { useState, useEffect, useRef } from "react";
// import "../../assets/css/addsection/AddRule.css";
// import CustomDropdown from "../../components/common/CustomDropdown";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCaretUp,faCaretDown } from '@fortawesome/free-solid-svg-icons';

// function CalcSheetPointer({
//   dropdownCustom,
//   atqLabel,
//   valueLabel,
//   tabLabel,
//   cellLabel,
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [showInputField, setShowInputField] = useState(true);
//   const [valueInputField, setValueInputField] = useState(false);
//   const [cellInputField, setCellInputField] = useState(false);
//   const [actionselectoption, setActionSelectoption] = useState([]);
//   const optionATQ = ["CAR", "BUS", "BIKE", "BUS", "CAR", "BUS", "BIKE"];
//   const optionTab = ["CAR", "BUS", "BIKE", "BUS", "CAR", "BUS", "BIKE"];

//   const handleActionSelect1 = (option) => {
//     setActionSelectoption(option);
//   };

//   const options = ["ANSWER TO QUESTION", "VALUE", "CALCSHEET POINTER"];

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setIsOpen(false);

//     if (option === "VALUE") {
//       setValueInputField(true);
//       setShowInputField(false);
//       setCellInputField(false);
//     } else if (option === "CALCSHEET POINTER") {
//       setCellInputField(true);
//       setValueInputField(false);
//       setShowInputField(false);
//     } else {
//       setValueInputField(false);
//       setCellInputField(false);
//       setShowInputField(true);
//     }
//   };

//   const dropdownRef = useRef(null);

//   const closeDropdownOnOutsideClick = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("click", closeDropdownOnOutsideClick);

//     return () => {
//       window.removeEventListener("click", closeDropdownOnOutsideClick);
//     };
//   }, []);

//   return (
//     <div className="anstoquesmaindiv">
//   <div>
//      <div className="dropdownheader" onClick={toggleDropdown}  ref={dropdownRef}>
//      {isOpen ? (
//   <FontAwesomeIcon icon={faCaretUp} id="caretupcalcsheet" />
// ) : (
//   <FontAwesomeIcon icon={faCaretDown} id="caretupcalcsheet" />
// )}

//         </div>
//       {isOpen && (
//         <ul className={`dropdownoptions ${dropdownCustom}`}>
//           {options.map((option, index) => (
//             <li
//               key={index}
//               className="dropdownoption"
//               onClick={() => handleOptionClick(option)}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
// </div>
//       {showInputField && (
//         <>
//           <CustomDropdown
//             options={optionATQ}
//             onSelect={handleActionSelect1}
//             Placeholder={"Answer to Question"}
//             label={atqLabel}
//           />
//         </>
//       )}
//       {valueInputField && (
//         <div>
//           <input type="text" Placeholder={"Value"} className="input-field" />
//           <label htmlFor="input-field" className="valuelabel">
//             {valueLabel}
//           </label>
//         </div>
//       )}
//       {cellInputField && (
//         <div className="cuinput">
//           <CustomDropdown
//             options={optionTab}
//             onSelect={handleActionSelect1}
//             label={tabLabel}
//             custuminput="serviceupdateinput"
//             dropdownClass={"doctypetab"}
//           />
//           <div>
//             <input type="text" className="input-field2" />
//             <label htmlFor="input-field2" className="doctypelabel">
//               {cellLabel}
//             </label>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CalcSheetPointer;
