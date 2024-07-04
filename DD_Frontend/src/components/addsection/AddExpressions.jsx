// import React, { useState } from "react";
// import CustomDropdownV from '../../components/common/CustomDropdown'
// import "../../assets/css/addsection/AddExpressions.css";
// import DeleteAction from "./DeleteAction";

// const AddExpressions = ({expcount,expressionId,deleteExpression}) => {
//   const [expansSelectoption, setexpansSelectoption] = useState([]);

//   const [expqpSelectoption, setexpqpSelectoption] = useState([]);

//   const [expOperatorSelectoption, setexpOperatorSelectoption] = useState([]);

//   const [showInputFields, setShowInputFields] = useState(false); // Add state for controlling input field visibility
//    const [showInputOneFields,setshowOneInputField] = useState(true);
//   const expressionOptions = ["AND", "OR"];

//   const expQuestionOption = ["Question 1", "Question 2", "Question 3"];

//   const Operators = [
//     "<",

//     "<=",

//     ">",

//     ">=",

//     "BETWEEN",

//     "CHANGED",

//     "CONTAIN",

//     "EMPTY",

//     "EQUAL",

//     "NOT CONTAIN",

//     "NOT EMPTY",

//     "NOT EQUAL",
//   ];

//   const handleexpAnsSelect1 = (option) => {
//     setexpansSelectoption(option);
//   };

//   const handleexpqpSelect1 = (option) => {
//     setexpqpSelectoption(option);
//   };

//   const handleexpOpeartorsSelect1 = (option) => {
//     setexpOperatorSelectoption(option);

//     // Check if the selected operator is "BETWEEN" and set the state accordingly

//     if (option === "BETWEEN") {
//       setShowInputFields(true);
//       setshowOneInputField(true);
//     }

//     if(option === '<' || option === '<='||option === '>'||option === '>='){
//       setshowOneInputField(true);
//       setShowInputFields(false);
//     }

//     if(option === 'CHANGED' || option === 'CONTAIN'||option === 'EMPTY'||option === 'EQUAL'||option === 'NOT CONTAIN'||option === 'NOT EMPTY'||option ==="NOT EQUAL"){
//       setShowInputFields(false);
//       setshowOneInputField(false);
//     }
//   };

//   const handledeleteExpression = () => {
//     deleteExpression();
//   };

//   return (
//     <div id="MainExpressionDiv">
//       <div id="ExpOperatorDiv">
//         <CustomDropdownV
//           options={expressionOptions}
//           onSelect={handleexpAnsSelect1}
//           label="EXPRESSION OPERATOR"
//           Placeholder={"Expression Operator"}
//           dropdownClass="page1-dropdown"
//           isBorderVisible={true}
//           value={expansSelectoption}
//         />
//       </div>

//       <div id="ExpQuestionDiv">
//         <CustomDropdownV
//           options={expQuestionOption}
//           onSelect={handleexpqpSelect1}
//           label="QUESTION OR VALUE2"
//           Placeholder={"Question or Value"}
//           dropdownClass="page1-dropdown"
//           isBorderVisible={true}
//           value={expqpSelectoption}
//         />
//       </div>

//       <div id="OperatorsValueDiv">
//         <div id="expallOperatorsDiv">
//           <CustomDropdownV
//             options={Operators}
//             onSelect={handleexpOpeartorsSelect1}
//             label="OPERATOR"
//             Placeholder={"Operator"}
//             dropdownClass="page1-dropdown"
//             isBorderVisible={true}
//             value={expOperatorSelectoption}
//           />
//         </div>

//         {showInputOneFields && (
//         <div id="Value1Div">
//             <input type="text" placeholder="Value" id="value1Input" />

//             <label htmlFor="" id="value1Label">
//               VALUE1
//             </label>
//           </div>
//         )}

//         {showInputFields && (
//           <div id="Value2Div">
//             <input type="text" placeholder="Value" id="value2Input" />

//             <label htmlFor="" id="value2Label">
//               VALUE2
//             </label>
//           </div>
//         )}

//       </div>
//       <div id="TrashIcon">
//         <DeleteAction onDelete={handledeleteExpression}/>
//         {/* <FontAwesomeIcon icon={faTrashCan} id="expdeletebtn" onClick={handledeleteExpression} /> */}
//         </div>
//     </div>
//   );
// };

// export default AddExpressions;
