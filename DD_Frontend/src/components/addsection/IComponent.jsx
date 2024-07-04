// import React from "react";
// import "../../assets/css/addsection/AddRule.css";

// function IComponent({
//   inputValue,onInputChange,secondInputValue,onSecondInputChange,thirdInputValue,onThirdInputChange,
// }) {
//   const handleInputChange = (event) => {
//     const newValue = event.target.value;

//     onInputChange(newValue);
//   };

//   const handleCategory1Change = (event) => {
//     const newValue = event.target.value;

//     onSecondInputChange(newValue);
//   };

//   const handleReferenceChange = (event) => {
//     const newValue = event.target.value;

//     onThirdInputChange(newValue);
//   };

//   return (
//     <div className="i-main-div">
//       <div className="imain-div-items1"></div>

//       <div className="imain-div-items2">
//         <input
//           className="note-input"
//           type="text"
//           value={inputValue}
//           onChange={handleInputChange}
//         />

//         <label className="notelable" htmlFor="">
//           NOTE
//         </label>
//       </div>

//       <div className="imain-div-items3">
//         <input
//           className="i-input-category1"
//           type="text"
//           value={secondInputValue}
//           onChange={handleCategory1Change}
//         />

//         <label className="categorylable" htmlFor="">
//           CATEGORY1
//         </label>
//       </div>

//       <div className="imain-div-items4">
//         <input
//           className="i-input-reference"
//           type="text"
//           value={thirdInputValue}
//           onChange={handleReferenceChange}
//         />

//         <label className="referencelable" htmlFor="">
//           REFERENCE EXTERNAL ID
//         </label>
//       </div>
// <div className="imain-div-items4"></div>
//     </div>
//   );
// }

// export default IComponent;
