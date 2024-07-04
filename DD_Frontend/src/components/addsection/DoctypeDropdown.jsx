// import React, { useState, useEffect, useRef } from 'react';
// import '../../assets/css/common/CustomDropdown.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

// const DocTypeDropdown = ({ placeholder, label, options, onSelect }) => {
//   const [isContentdoctypeOpen, setIsContentdoctypeOpen] = useState(false);
//   const [selectedOptionsContentdoctype, setSelectedOptionsContentdoctype] = useState([]);
//   const [ContentdoctypeSearchTerm, setContentdoctypeSearchTerm] = useState('');
//   const [showMore, setShowMore] = useState(false);

//   const toggleDropdownContentdoctype = () => {
//     setIsContentdoctypeOpen(!isContentdoctypeOpen);
//     if (!isContentdoctypeOpen) {
//       setContentdoctypeSearchTerm('');
//     }
//   };

//   const toggleOptionContentdoctype = (option) => {
//     if (selectedOptionsContentdoctype.includes(option)) {
//       setSelectedOptionsContentdoctype(selectedOptionsContentdoctype.filter((item) => item !== option));
//     } else {
//       setSelectedOptionsContentdoctype([...selectedOptionsContentdoctype, option]);
//     }
//   };

//   const clearSelectedOption = (option) => {
//     setSelectedOptionsContentdoctype(selectedOptionsContentdoctype.filter((item) => item !== option));
//   };

//   const filteredOptionsContentdoctype = options.filter((option) =>
//     typeof option === 'string' && option.toLowerCase().includes(ContentdoctypeSearchTerm.toLowerCase())
//   );

//   const dropdownContentdoctypeRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutsideContentdoctype(event) {
//       if (
//         dropdownContentdoctypeRef.current &&
//         !dropdownContentdoctypeRef.current.contains(event.target)
//       ) {
//         setIsContentdoctypeOpen(false);
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutsideContentdoctype);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutsideContentdoctype);
//     };
//   }, []);

//   const handleShowMore = () => {
//     setShowMore(!showMore);
//   };

//   const generateSelectedOptionsString = () => {
//     if (selectedOptionsContentdoctype.length === 0) {
//       return (
//         <div className="selected-options-placeholder">
//           {placeholder}
//         </div>
//       );
//     }

//     return selectedOptionsContentdoctype.map((option) => (
//       <span key={option} className="selected-option">
//         {option}
//         <button className="cancel-button" onClick={() => clearSelectedOption(option)}>
//           X
//         </button>
//       </span>
//     ));
//   };
// return (
//     <div>
//     <div className="containerdoctype">
//       <div className="contentdoctypeContainer" ref={dropdownContentdoctypeRef}>
//         <div className="contentdoctype">
//           <div className="selected-options-container">
//             {generateSelectedOptionsString()}
//           </div>
//           <span
//             className="dropdown-icon-contentdoctype"
//             onClick={toggleDropdownContentdoctype}
//           >
//             {isContentdoctypeOpen ? (
//               <FontAwesomeIcon icon={faAngleUp} id="anglupdowndoc"/>
//             ) : (
//               <FontAwesomeIcon icon={faAngleDown} id="anglupdowndoc"/>
//             )}
//           </span>
//           <label className="contentdoctypevertical">{label}</label>
//         </div>
//         {isContentdoctypeOpen && (
//           <ul className="options-dropdown" style={{ overflowY: 'scroll', maxHeight: showMore ? 'none' : '150px' }}>
//             <input
//               type='search'
//               placeholder='Start Typing to Search...'
//               className='serchdoctpe'
//               value={ContentdoctypeSearchTerm}
//               onChange={(e) => setContentdoctypeSearchTerm(e.target.value)}
//             />
//             <div>
//               {filteredOptionsContentdoctype.map((option, index) => (
//                 <li
//                   key={index}
//                   className={`option ${
//                     selectedOptionsContentdoctype.includes(option) ? 'selected' : ''
//                   }`}
//                   onClick={() => toggleOptionContentdoctype(option)}
//                 >
//                   {option}
//                 </li>
//               ))}
//             </div>
//             <div className='showdiv'>
//               <button className="show-more-button" onClick={handleShowMore}>
//                 {showMore ? 'SHOW LESS' : 'SHOW MORE'}
//               </button>
//             </div>
//           </ul>
//         )}
//       </div>
//     </div>
//   </div>
//   );
// };

// export default DocTypeDropdown;
