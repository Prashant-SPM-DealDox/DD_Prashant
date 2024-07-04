// import React, { useRef, useState, useEffect } from "react";
// import CustomDropdown from "../common/CustomDropdown";
// import '../../assets/css/templatecomps/CatalogPopup.css';
// import { Link } from "react-router-dom";

// function CatalogPopup({value}) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRefcatalogbtn = useRef(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showInputField, setShowInputField] = useState(false);
//   const [isOptionSelected, setIsOptionSelected] = useState(false);
//   const popupoptins=["NO GROUPING"]
//   const [, setSelectedOption] = useState(value);
// const searchPopupRef = useRef();

//   useEffect(() => {
//     const handleOutsideClickcatalogbtn = (event) => {
//       if (
//         dropdownRefcatalogbtn.current &&
//         !dropdownRefcatalogbtn.current.contains(event.target) &&
//         !event.target.classList.contains('popup')
//       ) {
//         setIsOpen(false);
//       }
//     };

//     window.addEventListener('click', handleOutsideClickcatalogbtn);

//     return () => {
//       window.removeEventListener('click', handleOutsideClickcatalogbtn);
//     };
//   }, []);

//   const handleClickcatalogbtn = () => {
//     setIsOpen(true);
//   };
//   const handleActionSelect1 = (selectedOption) => {
//     setSelectedOption(selectedOption);
//   };
//   const handleClosePopup = () => {
//     setIsOpen(false);
//   };

//   const handleInputChangePOPUP = (e) => {
//     const inputValue = e.target.value.toLowerCase();
//     setSearchQuery(inputValue);
//     setSelectedOption('');

//     if (inputValue.length > 0) {
//       setShowInputField(true);
//       setIsOptionSelected(false);
//     } else {
//       setShowInputField(false);
//       setIsOptionSelected(false);
//     }
//   };

//   const filterListItems = (listItems) => {
//     return listItems.filter((item) =>
//       item.toLowerCase().includes(searchQuery)
//     );
//   };

//   function renderListItems(items) {
//     return items.map((item, index) => (
//       <li key={index} onClick={() => handleoptinsselectclick()}>
//         <Link to="#">{item}</Link>
//       </li>
//     ));
//   }

//   const handleoptinsselectclick = () => {
//     setIsOptionSelected(true);
//     setShowInputField(true);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         searchPopupRef.current &&
//         !searchPopupRef.current.contains(event.target)
//       ) {
//         setIsOptionSelected(false);
//         setShowInputField(false);
//       }
//     };

//     window.addEventListener('click', handleClickOutside);

//     return () => {
//       window.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div>
//       {isOpen && (
//         <div className="backgroundOverlay"></div>
//       )}
//       {isOpen && (
//         <div className={`popupcatalogbtn ${isOpen ? 'show' : ''}`}>
//           <h4 className="cataaddfromheader">ADD FROM CATALOG</h4>
//           <button className="closeiconpopup" onClick={handleClosePopup}>
//             <i className="fa fa-close"></i>
//           </button>
//           <div className='popupdropdown'>
//           <CustomDropdown
//   options={popupoptins}
//   onSelect={handleActionSelect1}
//   value="NO GROUPING"
// />
//  </div>
//           <div className="searcdroppopup" ref={searchPopupRef}>
//             <i className="fa fa-search" id="searchpopup"></i>
//             <input
//               type="text"
//               className="inputsearchdoc"
//               value={searchQuery}
//               onChange={handleInputChangePOPUP}
//             />
//             <div className="dividepoupdrop">
//               <ul id="myMenulistdrop" onClick={handleoptinsselectclick}>
//                 {renderListItems(
//                   filterListItems([
//                     'Framework SOW Appendix A',
//                     'Framework SOW Appendix B',
//                     'Framework SOW Appendix C',
//                     'Framework SOW Appendix D',
//                     'Framework SOW Appendix E',
//                   ])
//                 )}
//               </ul>
//             </div>
//           </div>
//           {showInputField && isOptionSelected && (
//             <div className="inputFieldWithScrollbar">
//               <textarea className="scrollableInput" />
//             </div>
//           )}
//           <div className="btnspopup">
//             <button id="deletpopup">
//               CANCEL
//             </button>
//             <button id="ADDpopup">
//               ADD
//             </button>
//           </div>
//         </div>
//       )}

//       <div>
//         <button className="catalogbtn" onClick={handleClickcatalogbtn}>
//           + FROM CATALOG
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CatalogPopup;
