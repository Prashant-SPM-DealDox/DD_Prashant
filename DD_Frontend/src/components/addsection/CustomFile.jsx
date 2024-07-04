// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
// import CustomSection from "./CustomSection";

// const Customfile = ({ questionsectionCount, sectionCount }) => {
//   const [isTextAreaVisible, setTextAreaVisible] = useState(false);
//   const [customs, setCustoms] = useState([]);
//   const [customFileCount, setCustomFileCount] = useState(1);

//   const toggleTextArea = () => {
//     setTextAreaVisible(!isTextAreaVisible);
//   };
//   const addCustomSection = () => {
//     const newCustomSection = {
//       customFileCount: customFileCount,
//     };
//     setCustoms([...customs, newCustomSection]);
//     setCustomFileCount((prevCount) => prevCount + 1);
//   };
//   const deleteCustomSection = (customFileCountToDelete) => {
//     setCustoms((prevCustoms) =>
//       prevCustoms.filter(
//         (custom) => custom.customFileCount !== customFileCountToDelete
//       )
//     );
//   };
//   return (
//     <>
//       <div className="sectionCustom">
//         <div className="sectionName">
//           <h4>DEFINE CUSTOM FORM</h4>
//         </div>
//         <div className="sectionDiv">
//           <input type="checkbox" />
//           <label htmlFor="" className="sectionlabela">
//             LAYOUT
//           </label>
//         </div>
//         <div className="sectionDiv">
//           <input type="checkbox" />
//           <label htmlFor="" className="sectionlabela">
//             POPUP
//           </label>
//         </div>
//         <div className="sectionDiv">
//           <input type="checkbox" />
//           <label htmlFor="" className="sectionlabela">
//             WIDE
//           </label>
//         </div>
//         <div className="sectionDiv">
//           <input type="checkbox" />
//           <label htmlFor="" className="sectionlabela">
//             FILES
//           </label>
//         </div>
//       </div>
//       <div className="section-inst">
//         <FontAwesomeIcon
//           className="section-icon"
//           icon={isTextAreaVisible ? faAngleDown : faAngleUp}
//           onClick={toggleTextArea}
//         />
//         <h4 className="sectioninstruction">INSTRUCTIONS</h4>
//       </div>
//       {isTextAreaVisible && (
//         <div className="text-area">
//           <textarea placeholder="Enter instructions here"></textarea>
//         </div>
//       )}
//       {customs.map((customsection, index) => (
//         <CustomSection
//           key={customsection.customFileCount}
//           customFileCount={index + 1} // Adjust section count to start from 1
//           questionsectionCount={questionsectionCount}
//           sectionCount={sectionCount}
//           onDelete={() => deleteCustomSection(customsection.customFileCount)}
//         />
//       ))}
//       <button id="addSectionCustom" onClick={addCustomSection}>
//         + Add Section
//       </button>
//     </>
//   );
// };

// export default Customfile;
