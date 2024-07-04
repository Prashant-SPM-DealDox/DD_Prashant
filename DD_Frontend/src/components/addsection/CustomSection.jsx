// import React, { useState } from "react";
// import { faAngleDown, faClone } from "@fortawesome/free-solid-svg-icons";
// import "../../assets/css/addsection/CustomSection.css";
// import AddRowComponent from "../../components/addsection/AddRowComponent";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

// function CustomSection({
//   sectionCount,

//   questionsectionCount,

//   customFileCount,

//   onDelete,
// }) {
//   const [isAddRowVisible, setAddRowVisible] = useState(false);

//   const allcount = `${sectionCount}.${questionsectionCount}.${customFileCount}`;

//   const toggleAddRow = () => {
//     setAddRowVisible(!isAddRowVisible);
//   };

//   return (
//     <>
//       <div className="customsection">
//         <div className="customicon">
//           <button className="togglesectionbtn" onClick={toggleAddRow}>
//             <FontAwesomeIcon icon={faAngleDown} />
//           </button>
//         </div>

//         <div className="customcount">
//           {sectionCount}.{questionsectionCount}.{customFileCount}
//         </div>

//         <div className="customsectioninputdiv">
//           <input
//             type="text"
//             placeholder="Enter section title"
//             className="custom-input"
//             name=""
//           />
//         </div>

//         <div className="customsectionhide">
//           <input id="checkhide" type="checkbox" name="" />

//           <label htmlFor="" className="customlabel">
//             Hide
//           </label>
//         </div>

//         <div className="customsectionhide">
//           <button className="togglesectionclone">
//             <FontAwesomeIcon icon={faClone} color="#216c98"/>
//           </button>
//         </div>

//         <div className="customsectionhide">
//         <button className="togglesectiondelete" onClick={onDelete}>
//         <FontAwesomeIcon icon={faTrashAlt} />

// </button>

//         </div>
//       </div>

//       <div
//         id="addrowcomponentdivid"
//         className="addrowcomponentdiv"
//         style={{ display: isAddRowVisible ? "block" : "none" }}
//       >
//         <AddRowComponent allcount={allcount} />
//       </div>
//     </>
//   );
// }
// export default CustomSection;
