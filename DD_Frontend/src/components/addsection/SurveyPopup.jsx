// import React, { useState } from "react";
// import "../../assets/css/survey/SurveyPopup.css";

// const Popup = () => {
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [filteredItems, setFilteredItems] = useState([true]);
//   const [itemsToShow, setItemsToShow] = useState(5);
//   const allItems = [
//     "Deal dox",
//     "ABC Company",
//     "ABSA Bank Limited",
//     "ACA Pacific Technology",
//     "1040Tech LLC",
//     "Abbey National Group",
//     "1040Tech LLC",
//     "Abbott Laboratories",
//   ];

//   const showPopupsurvey = () => {
//     setIsPopupVisible(true);
//     setFilteredItems(allItems);
//   };

//   const hidePopupsurvey = () => {
//     setIsPopupVisible(false);
//   };
//   const handleSearch = (e) => {
//     const searchText = e.target.value;
//     setSearchText(searchText);
//     // Filter the list items based on the search text
//     const filtered = allItems.filter((item) =>
//       item.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredItems(filtered);
//   };
//   const handleShowMore = () => {
//     setItemsToShow(filteredItems.length); // Show all items
//   };

//   const handleShowLess = () => {
//     setItemsToShow(5); // Show the first 5 items
//   };
//   const listStyles = {
//     maxHeight: itemsToShow < filteredItems.length ? "500px" : "200px",
//     overflowY: "auto",
//   };
//   return (
//     <>
//       {isPopupVisible && (
//         <>
//           <div className="backdrop"></div>
//           <div className="popupsurvey">
//             <div className="popup-contentsurvey">
//               <button className="close-iconsurvey" onClick={hidePopupsurvey}>
//                 <i className="fa fa-close" />
//               </button>
//               <div className="headersurveypop">
//                 <label className="surveysercag">SURVEY SEARCH</label>
//               </div>
//               <div className="surveysercahtext">
//                 <i
//                   className="fa fa-search"
//                   id="relaserchbutton"
//                   aria-hidden="true"
//                 />
//                 <input
//                   type="text"
//                   className="mySearchpopupsurvey"
//                   title="type in a chategory"
//                   onChange={handleSearch}
//                   value={searchText}
//                 />
//               </div>
//               <p id="info">
//                 A survey overwrite will replace your current survey's rules,
//                 options, and calcsheet with the selected survey
//               </p>
//               <div id="surveyNameAndStatus">
//                 <p className="pnamesstatus">Survey Name</p>
//                 <p className="pnamesstatus">Survey Status</p>
//               </div>
//               <div className="surveynyms">
//               <ul className="liststtussurvey" style={listStyles}>
//                   {filteredItems.map((item) => (
//                     <li key={item}>{item}</li>
//                   ))}
// <div className="more-less">
//   {itemsToShow < filteredItems.length ? (
//     <button className="show-more" onClick={handleShowMore}>
//       SHOW MORE
//     </button>
//   ) : (
//     itemsToShow > 5 && (
//       <button className="show-less" onClick={handleShowLess}>
//         SHOW LESS
//       </button>
//     )
//   )}
// </div>

//                 </ul>

//               </div>

//               <div className="overightbtn">
//                 <button id="overwrite" disabled>
//                   OVERWRITE
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       <button className="approvesurvey1" onClick={showPopupsurvey}>
//         OVERWRITE
//       </button>
//     </>
//   );
// };

// export default Popup;
