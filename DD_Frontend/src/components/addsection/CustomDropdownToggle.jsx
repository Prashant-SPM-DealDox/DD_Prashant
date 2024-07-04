// import { React, useState, useEffect, useRef } from "react";
// import "../../assets/css/addsection/CustomDropdownToggle.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
// const CustomeDropDownToggle = ({
//   options,
//   onSelect,
//   label,
//   Placeholder,
//   dropdownClass,
//   custuminput,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const dropdownRef = useRef(null);
//   const [selectedOption, setSelectedOption] = useState("");
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);

//     if (!isOpen) {
//       setSearchTerm("");
//     }
//   };

//   const handleInputChange = (e) => {
//     const inputValue = e.target.value;
//     setSearchTerm(inputValue);

//     if (!isOpen) {
//       setIsOpen(true);
//     }
//   };

//   const selectOption = (option) => {
//     setSelectedOption(option);
//     setSearchTerm(option);
//     setIsOpen(false);
//     onSelect(option);
//   };

//   const filteredOptions = Array.isArray(options)
//     ? options.filter((option) =>
//         option.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : [];

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="" ref={dropdownRef}>
//       <input
//         className={`content7inputToggle ${custuminput}`}
//         id="inputToggle"
//         onClick={toggleDropdown}
//         value={isOpen ? searchTerm : selectedOption}
//         onChange={handleInputChange}
//         readOnly={!isOpen}
//         placeholder={Placeholder}
//       />

//       <div className="dropdown-icon-content7" onClick={toggleDropdown}>
//         {isOpen ? (
//           <FontAwesomeIcon icon={faCaretUp} className="caretdown" />
//         ) : (
//           <FontAwesomeIcon icon={faCaretDown} className="caretdown" />
//         )}
//       </div>

//       <label for="content7input" id="content7verticalToggl">
//         {label}
//       </label>

//       {isOpen && (
//         <div id="ulWidth">
//           <ul
//             className={`content7dropdownToggle ${dropdownClass}`}
//             style={{ maxHeight: "150px", overflowY: "auto" }}
//           >
//             {filteredOptions.length === 0 ? (
//               <li className="no-results-contnt7Toggle">No results found</li>
//             ) : (
//               filteredOptions.map((option, index) => (
//                 <li
//                   key={index}
//                   id="ullistcustomdropdownToggle"
//                   className="dropdown-list-item-content7"
//                   onClick={() => selectOption(option)}
//                 >
//                   {option}
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomeDropDownToggle;
