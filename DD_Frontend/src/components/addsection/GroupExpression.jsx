// import React, { useState,useEffect} from "react";

// import CustomDropdownV from '../../components/common/CustomDropdown'

// import '../../assets/css/addsection/GroupExpression.css'
// const GroupExpression = ({grpexpcount,grpexpId,deleteGrpExp,lable,isFirst,addGroupselectoption}) => {
//   const [, setGrpExpansSelectoption] = useState([]);

//   const [, setGroupexpqpSelectoption] = useState([]);

//   const [, setgrpxpOperatorSelectoption] = useState([]);

//   const [grpExpshowInputFields, setgrpExpShowInputFields] = useState(false); // Add state for controlling input field visibility
//    const [grpExpshowOneInputField,setgrpExpshowOneInputField] = useState(false);
//   const grpExpOptions = ["AND", "OR"];

//   const grpExpQuestionOption = ["Question 1", "Question 2", "Question 3"];

//   const grpExpOperators = [
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

//   const handlegrpexpAnsSelect1 = (option) => {
//     setGrpExpansSelectoption(option);
//   };

//   const handlegrpexpqpSelect1 = (option) => {
//     setGroupexpqpSelectoption(option);
//   };

//   const handlegrpexpOpeartorsSelect1 = (option) => {
//     setgrpxpOperatorSelectoption(option);

//     // Check if the selected operator is "BETWEEN" and set the state accordingly

//     if (option === "BETWEEN") {
//       setgrpExpShowInputFields(true);
//     } else {
//       setgrpExpShowInputFields(false);
//     }

//     if(option === '<' || option === '<='||option === '>'||option === '>='){
//       setgrpExpshowOneInputField(true);
//     }else{
//       setgrpExpshowOneInputField(false);
//     }
//   };

//   const handledeleteGroupExpression = () => {
//     deleteGrpExp();

//   };

// // const HandleChangess = (val)=>{
// //     const expressId0 = document.getElementById("expressId0");
// //   expressId0.value = val;
// //   const GrpExpLabel = document.getElementById("GrpExpLabel");
// //   GrpExpLabel.innerText="GROUP OPERATOR"
// //   }
// const [expression,setexpression] = useState([]);
// const [expcount,setExpCount]= useState(1);
// const [grouping,setGrouping] = useState([]);
// const [groupcount,setGroupCount] = useState(1);

// useEffect(() => {
//   setExpCount(expression.length + 1);
// }, [expression]);

// useEffect(() => {
//   setGroupCount(grouping.length + 1);
// }, [grouping]);

// const addExpression = () => {
//   const newaddExpression = { key: expcount, expcount: expcount };
//   setexpression([...expression, newaddExpression]);

// };
// const addGroup = () => {
//   const newaddGroup = { key: groupcount, groupcount: groupcount };
//   setGrouping([...grouping, newaddGroup]);
// };

// const deleteExpression = (expressionToDelete) => {
//   const updatedExpressions = expression.filter((expression) => expression.key !== expressionToDelete);
//   // Reassign section numbers to all sections
//   const updatedExpression = updatedExpressions.map((expression, index) => ({...expression, expcount: index + 1, }));
//   setexpression(updatedExpression);
// };

//   return (
//     <div id="MainGrpExpDiv">
//       {/* {lable&& isFirst ? <div id="GrpExpOperatorDiv">
//         <CustomDropdownV
//           options={grpExpOptions}
//           onSelect={addGroupselectoption}
//           // selectedValue={addGroupselectoption} // Pass the selected value as a prop

//           label="GROUP OPERATOR"
//           Placeholder={"Group Operator"}
//           dropdownClass="page1-dropdown"
//         />
//       </div>
//       : */}
//       <div id="GrpExpOperatorDiv">
//         <CustomDropdownV
//           options={grpExpOptions}
//           onSelect={handlegrpexpAnsSelect1}
//           label="EXPRESSION OPERATOR"
//           Placeholder={"Expression Operator"}
//           dropdownClass="page1-dropdown"
//           id={`expressId${grpexpId} grpExpInput`}
//           labelId ={"GrpExpLabel"}
//         />
//       </div>

//       <div id="GrpExpQuestionDiv">
//         <CustomDropdownV
//           options={grpExpQuestionOption}
//           onSelect={handlegrpexpqpSelect1}
//           label="QUESTION OR VALUE2"
//           Placeholder={"Question or Value"}
//           dropdownClass="page1-dropdown"
//         />
//       </div>

//       <div id="GrpExpOperatorsDiv">
//         <div id="grpexpallOperatorsDiv">
//           <CustomDropdownV
//             options={grpExpOperators}
//             onSelect={handlegrpexpOpeartorsSelect1}
//             label="OPERATOR"
//             Placeholder={"Operator"}
//             dropdownClass="page1-dropdown"
//           />
//         </div>

//         {grpExpshowInputFields && (
//           <div id="grpExpValue1Div">
//             <input type="text" placeholder="Value" id="grpExpvalue1Input" />

//             <label htmlFor="" id="grpExpValue1Label">
//               VALUE1
//             </label>
//           </div>
//         )}
//         {grpExpshowOneInputField && (
//           <div id="grpExpValue1Div">
//             <input type="text" placeholder="Value" id="grpExpvalue1Input" />

//             <label htmlFor="" id="grpExpValue1Label">
//               VALUE1
//             </label>
//           </div>
//         )}

//         {grpExpshowInputFields && (
//           <div id="grpExpValue2Div">
//             <input type="text" placeholder="Value" id="grpExpvalue2Input" />

//             <label htmlFor="" id="grpExpvalue2Label">
//               VALUE2
//             </label>
//           </div>
//         )}

//       </div>
//       <div id="grpExpTrashIcon">
//         <i id='grpexpdeletebtn' class="fa fa-trash-alt" aria-hidden="true" onClick={handledeleteGroupExpression} ></i>
//         </div>
//     </div>
//   );
// };

// export default GroupExpression;
