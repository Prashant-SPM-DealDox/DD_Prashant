// import React, { useState, useEffect, useRef } from "react";
// import "../../assets/css/addsection/AddRule.css";
// import CustomDropdown from "../../components/common/CustomDropdown";
// import Datetime from "react-datetime";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
// function CalcSheetPointer({
//   dropdownCustom,
//   atqLabel,
//   valueLabel,
//   tabLabel,
//   cellLabel,
//   optionValue,
//   inputType,
//   onOptionChange,
//   selectedCloseDate,
//   onCalendarChange,
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [showInputField, setShowInputField] = useState(true);
//   const [valueInputField, setValueInputField] = useState(false);
//   const [cellInputField, setCellInputField] = useState(false);
//   const [, setActionSelectoption] = useState([]);
//   const optionATQ = ["CAR", "BUS", "BIKE", "BUS", "CAR", "BUS", "BIKE"];
//   const optionTabpointer = [
//     "CAR",
//     "BUS",
//     "BIKE",
//     "BUS",
//     "CAR",
//     "BUS",
//     "BIKE",
//     "vanita",
//   ];
//   const options = ["ANSWER TO QUESTION", "VALUE", "CALCSHEET POINTER"];
//   const dropdownRef = useRef(null);

//   const handleActionSelect1 = (option) => {
//     setActionSelectoption(option);
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//     onOptionChange(option);
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
//       <div className="custom-dropdowncalcsheet" ref={dropdownRef}>
//         <div className="dropdownheader" onClick={toggleDropdown}>
//           {isOpen ? (
//             <FontAwesomeIcon icon={faCaretUp} id="caretupcalcsheet" />
//           ) : (
//             <FontAwesomeIcon icon={faCaretDown} id="caretupcalcsheet" />
//           )}
//         </div>
//         {isOpen && (
//           <ul
//             className={`dropdownoptions ${dropdownCustom ? "customClass" : ""}`}
//           >
//             {options.map((option, index) => (
//               <li
//                 key={index}
//                 className="dropdownoption"
//                 onClick={() => handleOptionClick(option)}
//               >
//                 {option}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       {showInputField && (
//         <>
//           <CustomDropdown
//             options={optionATQ}
//             onSelect={handleActionSelect1}
//             Placeholder={"Answer To Question"}
//             label={atqLabel}
//           />
//         </>
//       )}
//       {valueInputField && selectedOption === "VALUE" && (
//         <div>
//           {inputType === "CALENDAR" && (
//             <div>
//               <Datetime
//                 value={selectedCloseDate}
//                 onChange={(date) => {
//                   onCalendarChange(date);
//                 }}
//                 dateFormat="MMMM D, YYYY"
//                 timeFormat={false}
//                 inputProps={{
//                   id: "value-input",
//                   placeholder: "Value",
//                   className: "calendercss",
//                 }}
//                 input={true}
//               />
//               <label htmlFor="value-input" className="input-labelcalender">
//                 QUOTE START AS VALUE
//               </label>
//             </div>
//           )}
//           {inputType !== "CALENDAR" && (
//             <div className="sectioncalender">
//               <CustomDropdown
//                 options={optionValue}
//                 onSelect={handleActionSelect1}
//                 label={valueLabel}
//                 Placeholder="Value"
//               />
//             </div>
//           )}
//         </div>
//       )}
//       {cellInputField && selectedOption === "CALCSHEET POINTER" && (
//         <div className="cuinput">
//           <CustomDropdown
//             options={optionTabpointer}
//             onSelect={handleActionSelect1}
//             label={tabLabel}
//           />
//           <div>
//             <input type="text" className="input-field2" />
//             <label for="input-field2" class="doctypelabel">
//               {cellLabel}
//             </label>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default CalcSheetPointer;
