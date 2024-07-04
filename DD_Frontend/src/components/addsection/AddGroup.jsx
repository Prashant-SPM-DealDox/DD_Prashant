// import React, { useState, useEffect } from "react";
// import GroupExpression from '../../components/addsection/GroupExpression'
// import CustomDropdownV from '../../components/common/CustomDropdown';
// import '../../assets/css/addsection/AddGroup.css'
// import DeleteAction from "./DeleteAction";

// const AddGroup = ({ groupId, group, onGroupChange }) => {

//   const groupOptions = ["AND", "OR"];

//   const groupQuestionOption = ["Question 1", "Question 2", "Question 3"];

//   const groupOperators = ["<", "<=", ">", ">=", "BETWEEN", "CHANGED", "EQUAL", "EMPTY", "NOT CONTAIN", "NOT EQUAL", "NOT EMPTY", "NOT EQUAL",];

//   const handledeleteGroup = (index) => {
//     const deletedGroup = group.splice(index, 1);
//     const updatedGroup = [...group];
//     if(index === 0 && deletedGroup.length > 0 && updatedGroup.length>0){
//       updatedGroup[index].operator= deletedGroup[index].operator;
//     }
//     onGroupChange(updatedGroup);
//   };

//   const [grpexpression,] = useState([]);
//   const [, setgrpExpCount] = useState(1);
//   useEffect(() => {
//     setgrpExpCount(grpexpression.length + 1);
//   }, [grpexpression]);

//   const addGrpExpression = () => {
//     const newGroup = { operator: '', question: '', operation: '', value1: '', value2: '' };
//     const updatedGroup = [...group, newGroup];
//     onGroupChange(updatedGroup);
//   };

//   const handleDropdownChange = (index, selectedValue, key) => {
//     // Update the 'value' property in the 'grouping' array
//     const updatedGroup = [...group];
//     updatedGroup[index][key] = selectedValue;
//     onGroupChange(updatedGroup);
//   };

//   return (
//     <div id="entireGroupDiv" >
//       {group.map((item, index) => (
//         <div id="MainGroupDiv">
//           <div id="groupOperatorDiv">
//             <CustomDropdownV
//               options={groupOptions}
//               //onSelect={handlegrpAnsSelect1}
//               onSelect={(selectedValue) => handleDropdownChange(index, selectedValue, 'operator')}
//               label={index === 0 ? "GROUP OPERATOR" : "EXPRESSION OPERATOR"}
//               Placeholder={index === 0 ? "Group Operator" : "Expression Operator"}
//               dropdownClass="page1-dropdown"
//               // id={"GroupInput"}
//               isBorderVisible={true}
//               value={item.operator}
//             />
//           </div>
//           <div id="GroupQuestionDiv">
//             <CustomDropdownV
//               options={groupQuestionOption}
//                onSelect={(selectedValue) => handleDropdownChange(index, selectedValue, 'question')}
//               label="QUESTION OR VALUE2"
//               Placeholder={"Question or Value"}
//               dropdownClass="page1-dropdown"
//               isBorderVisible={true}
//               value={item.question}
//             />
//           </div>
//           <div id="grpOperatorsValueDiv">
//             <div id="grpallOperatorsDiv">
//               <CustomDropdownV
//                 options={groupOperators}
//                 // onSelect={handlegrpOpeartorsSelect1}
//                 onSelect={(selectedValue) => handleDropdownChange(index, selectedValue, 'operation')}
//                 label="OPERATOR"
//                 Placeholder={"Operator"}
//                 dropdownClass="page1-dropdown"
//                 isBorderVisible={true}
//                 value={item.operation}
//                   />
//             </div>
//             {item.operation && item.operation !== 'CHANGED' && (
//               <div id="groupValue1Div">
//                 <input
//                   type="text"
//                   placeholder="Value"
//                   id="groupvalue1Input"
//                   value={item.value1}
//                   onChange={(e) => handleDropdownChange(index, e.target.value, 'value1')}
//                 />
//                 <label htmlFor="" id="groupvalue1Label">
//                   VALUE1
//                 </label>
//               </div>
//             )}
//                     {item.operation === 'BETWEEN' && (
//               <div id="grpValue2Div">
//                 <input
//                   type="text"
//                   placeholder="Value"
//                   id="grpvalue2Input"
//                   value={item.value2}
//                   onChange={(e) => handleDropdownChange(index, e.target.value, 'value2')}
//                 />

//                 <label htmlFor="" id="grpvalue2Label">
//                   VALUE2
//                 </label>
//               </div>
//             )}
//           </div>
//           <div id="GroupTrashIcon">
//             <DeleteAction onDelete={() => handledeleteGroup(index)} />
//           </div>
//         </div>
//       ))}
//       {group.length > 0 &&
//         <div id="grpExpDiv">
//           <button id='grpExpButton' onClick={addGrpExpression}>ADD EXPRESSION</button>
//         </div>
//       }
//       </div>
//   )
// }

// export default AddGroup
