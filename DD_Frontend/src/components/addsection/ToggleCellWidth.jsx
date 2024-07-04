// import React, { useState, useRef, useEffect } from "react";

// import "../../assets/css/addsection/Toggle.css";

// function ToggleCellWidth() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const [selectedOption, setSelectedOption] = useState("NORMAL");

//   const dropdownRef = useRef(null);

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

//   const handleOptionClickK = (option) => {
//     setIsDropdownOpen(false);

//     setSelectedOption(option);
//   };

//   const options = ["NORMAL", "2X", "3X"];

//   return (
//     <>
//       <div className="widthsizediv" onClick={toggleDropdown}>
//         <p id="setoption">{selectedOption}</p>

//         <p id="widthcell">cell width</p>

//         <i
//           id="droptoggle1"
//           className="fa fa-angle-down"
//           onClick={toggleDropdown}
//         ></i>
//       </div>

//       {isDropdownOpen && (
//         <div className="divdropdowntoggle2">
//           <ul className="dropdown-options-togle" ref={dropdownRef}>
//             {options.map((option, index) => (
//               <li
//                 className="togglelist"
//                 key={index}
//                 onClick={() => handleOptionClickK(option)}
//               >
//                 {option}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// }

// export default ToggleCellWidth;
