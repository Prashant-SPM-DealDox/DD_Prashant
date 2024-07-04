// import React, { useState, useRef, useEffect } from "react";
// import "../../assets/css/addsection/CustomDropdownCode.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import  {baseUrl}  from "../../config.js";

// function CustomDropdownCode({ onSelect, value }) {

//   const { user } = useAuthContext();

//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [, setSelectedValue] = useState("TOGGLE");
//   const [inputValue, setInputValue] = useState(value);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const dropdownRef = useRef(null);

//   const[lookupsData, setlookupsData] = useState([]);

//   const getLookups = async () => {
//     try {
//         const response = await fetch(`${baseUrl}/api/lookups/get`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${user.token}`,
//             },

//         });
//         if (response.ok) {
//             const lookups = await response.json();
//             if(lookups.status == "Success")
//             {
//                 setlookupsData(lookups.data);

//             }
//         }
//     } catch (error) {
//         // console.log(error);
//     }
// }

// useEffect(() => {
//   getLookups();
//   setInputValue(value)
// },[user]);

// let LookUps = lookupsData.length > 0 ? lookupsData.map(lookup => lookup.class_name) : [];

//   const items = [
//     "TOGGLE",
//     "COUNTRIES",
//     "YES/NO",
//     "CUSTOM FORM",
//     "DATE",
//     "FORMULA",
//     "NUMBER",
//     "NUMERIC",
//     "TEXTAREA",
//     "MULTITEXT",
//     ...LookUps
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownVisible(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleInputChange = (event) => {
//     const value = event.target.value;
//     setInputValue(value);

//     // Filter the items based on the input value
//     const filtered = items.filter(item =>
//       item.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredItems(filtered);

//     setDropdownVisible(true);
//   };

//   const handleUlClick = (event) => {
//     if (event.target.tagName === "LI") {
//       const selectedText = event.target.textContent;
//       setSelectedValue(selectedText);
//       setInputValue(selectedText);
//       setDropdownVisible(false);
//       onSelect(selectedText);
//     }
//   };

//   const showAllItems = () => {
//     setDropdownVisible(!isDropdownVisible);
//     setFilteredItems(items); // Show all items when the dropdown is opened
//   };

//   return (
//     <>
//       <div className="input-wrapperclass">
//         <div className="inputflex">
//           <input
//             defaultValue={inputValue?inputValue:value}
//             className="customdropdiv-input"
//             type="text"
//             onChange={handleInputChange}
//             onClick={showAllItems}
//           />

//           <FontAwesomeIcon
//             id="customdropicon"
//             icon={isDropdownVisible ? faAngleUp : faAngleDown}
//             onClick={showAllItems}
//           />
//         </div>
//         {isDropdownVisible ? (
//           <div className="custdropdown" ref={dropdownRef}>
//             {filteredItems.length > 0 ? (
//               <ul onClick={handleUlClick} className="ymdropdowncode">
//                 {filteredItems.map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No result found</p>
//             )}
//           </div>
//         ) : null}
//       </div>
//     </>
//   );
// }

// export default CustomDropdownCode;
