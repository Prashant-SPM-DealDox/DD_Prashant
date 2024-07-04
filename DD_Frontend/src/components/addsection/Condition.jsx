// import React, { useState, useEffect } from "react";
// import CustomDropdown from "../../components/common/CustomDropdown";
// import '../../assets/css/addsection/AddRule.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
// import { baseUrl } from "../../config";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import AddGroup from "./AddGroup";
// import AddExpressions from "./AddExpressions";

// const Condition = ({ rules_key, survey_id, sectionId, sectionCount, conditionsectionCount, rules_data }) => {
//   const [expcount, setExpCount] = useState(1);
//   const [expression, setexpression] = useState([]);
//   const [grouping, setGrouping] = useState([]);
//   const [groupcount, setGroupCount] = useState(1);
//   const { user } = useAuthContext();
//   const [options2, setOptionQUE] = useState([]);
//   const [surveyQuestionsData, setSurveyQuestionsData] = useState([]);
//   const [toogleValue, setToggleValue] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption1, setSelectedOption1] = useState(rules_data?rules_data.rule_condition_name:"");
//   const [selectedOption2, setSelectedOption2] = useState(rules_data?rules_data.question_or_value:"");
//   const [selectedOption3, setSelectedOption3] = useState(rules_data?rules_data.rule_operator:"");
//   const [selectedOption4, setSelectedOption4] = useState(rules_data?rules_data.rule_value:"");
//   const [select_date, setSelect_Date] = useState(rules_data?rules_data.date:"");
//   const [number, setNumber] = useState(rules_data?rules_data.numbers:"");
//   const [countries, setCountries] = useState(rules_data?rules_data.countries:"");
//   const [yes_no,setYes_no] = useState(rules_data?rules_data.yes_no: "");
//   const [toggle,setToggle] = useState(rules_data?rules_data.toggle: "");
//   const [yes_no_not,setYes_no_not] = useState(rules_data?rules_data.yes_no_not: "");
//   const [hi_lo_med,setHi_lo_med] = useState(rules_data?rules_data.hi_lo_med: "");
//   const [hi_norm_lo,setHi_norm_lo] = useState(rules_data?rules_data.hi_norm_lo: "");
//   const [currencies,setCurrencies] = useState(rules_data?rules_data.currencies: "");
//   const [user_message,setUser_message] = useState(rules_data?rules_data.user_message: "");
//   const [languages,setLanguages] = useState(rules_data?rules_data.languages: "");
//   const [whole_numbers,setWhole_numbers] = useState(rules_data?rules_data.whole_numbers: "");
//   const [percentage,setPercentage] = useState(rules_data?rules_data.percentage: "");
//   const [months,setMonths] = useState(rules_data?rules_data.months: "");
//   const [numeric_num,setNumeric_num] = useState(rules_data?rules_data.numeric_num: "");
//   const [multiline_text,setMultiline_text] = useState(rules_data?rules_data.multiline_text: "");

//   const [otherinput, setOtherinput] = useState(rules_data?rules_data.otherinput:"");

//   const [isComplex, setIsComplex] = useState(false);
//   const [isCursorOverInput, setIsCursorOverInput] = useState(false);
//   const [isCursorOverInput2, setIsCursorOverInput2] = useState(false);
//  const options1 = ["WHEN", "ALWAYS", "COMPLEX"];
//   const options3 = [ ">","<",">=","<=","BETWEEN","CHANGED","CONTAIN","EQUAL","NOT CONTAIN","EMPTY","NOT EMPTY",];
//   const options4 = ["ITEM1", "ITEM2", "ITEM", "vanita",'questionorvalue','question1'];
//   const options5 = [ ">","<",">=","<=","BETWEEN","CHANGED","CONTAIN","EQUAL","NOT CONTAIN","EMPTY","NOT EMPTY", ];
//   const handleOption1Select = (option) => {
//     setSelectedOption1(option);
//     rulesSubmit(option, selectedOption2, selectedOption3, selectedOption4)
//     setIsComplex(option === "COMPLEX");
//   };
//   const toggleCondition = () => {
//     setIsOpen(!isOpen);
//     setIsComplex(selectedOption1 === "COMPLEX");
//   };
//   const handleOption2Select = (option) => {
//     setSelectedOption2(option);
//     surveyQuestionsData.map((data,i)=>{
//       if(data.survey_questions_num + " " + data.survey_questions_name == option)
//       {
//         setToggleValue(data.survey_questions_toggle);
//       }
//     })
//     rulesSubmit(selectedOption1, option, selectedOption3, selectedOption4)

//   };

//   const handleOption3Select = (option) => {
//     setSelectedOption3(option);
//     rulesSubmit(selectedOption1, selectedOption2, option, selectedOption4)
//   }

// const handleMouseEnter = () => {
//  setIsCursorOverInput(true);
//  setIsCursorOverInput2(true);
//    };

//  const handleMouseLeave = () => {
// setIsCursorOverInput(false);
// setIsCursorOverInput2(false);
// };

// useEffect(() => {
//   if (user) {
//     // questions
//     getSurveyQuestions();
//   }

// }, [user]);

// // getSurveyQuestions api function

// const getSurveyQuestions = async () => {
//   try {
//     const response = await fetch(
//       `${baseUrl}/api/survey/getSurveyQuestionsguidedSelling`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify({ survey_key: survey_id }),
//       }
//     );
//     if (response.ok) {
//       const survey = await response.json();
//       if (survey.status == "Success") {
//         setOptionQUE(
//           survey.data.map(
//             (item) =>
//               item.survey_questions_num + " " + item.survey_questions_name
//           )
//         );

//         setSurveyQuestionsData(survey.data);
//         if(rules_data.question_or_value){
//         survey.data.map((data,i)=>{
//           if(data.survey_questions_num + " " + data.survey_questions_name == rules_data.question_or_value)
//           {
//             setToggleValue(data.survey_questions_toggle);
//           }
//         })
//       }
//       }
//     }
//   } catch (error) {
//     // console.log(error);
//   }
// };

// const rulesSubmit = async (conditon_name, selected_question, operator, selected_value) => {
//   var survey_key = survey_id;
//   var section_key = sectionId;

//   var section_data = {
//     survey_key,
//     section_key,
//     rule_key: rules_key,
//     rule_num: `${sectionCount}.${conditionsectionCount}`,
//     conditon_name,
//     selected_question,
//     operator,
//     date: selected_value?selected_value.date:"",
//     yes_no: selected_value?selected_value.yes_no:"",
//     toggle: selected_value?selected_value.toggle:"",
//     numeric_num: selected_value?selected_value.numeric_num:"",

//     number: selected_value?selected_value.number:"",
//     countries: selected_value?selected_value.countries:"",
//     otherinput: selected_value?selected_value.otherinput:"",

//   };
//   try {
//     const response = await fetch(`${baseUrl}/api/survey/addSurveyRules`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `Bearer ${user.token}`,
//       },
//       body: JSON.stringify(section_data),
//     });
//     if (response.ok) {
//       const survey = await response.json();
//       if (survey.status === "Success") {
//         // setRules_key(survey.rules_key);
//       }
//     }
//   } catch (error) {
//     alert(error);
//   }
// };

// // _____________
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
//   const newGroup = { operator: '', question: '', operation: '', value1: '', value2: '' };
//   setGrouping([...grouping, [newGroup]]);
// };

// const deleteExpression = (expressionToDelete) => {
//   const updatedExpressions = expression.filter((expression) => expression.key !== expressionToDelete);
//   // Reassign section numbers to all sections
//   const updatedExpression = updatedExpressions.map((expression, index) => ({ ...expression, expcount: index + 1, }));
//   setexpression(updatedExpression);
// };

// const handleGroupChange = (index, updatedGroup) => {
//   setGrouping((prevGrouping) => {
//     const newGrouping = [...prevGrouping];
//     if(updatedGroup.length === 0){
//       newGrouping.splice(index, 1);
//     }else{
//       newGrouping[index] = updatedGroup;
//     }
//     return newGrouping;
//   });
// };

//   return (
//     <>
//       <div className="wholeConditioninputdiv">
//         <div className="conditionbtnsdiv">
//           <button id="angledowncondition">
//           <FontAwesomeIcon
//  icon={isOpen ? faAngleUp : faAngleDown}
//   aria-hidden="true"
//   id="conditoggle"
//   onClick={toggleCondition}
// />
// </button>
//           <label className="labelsectioncondition">
//             Condition   {sectionCount}.{conditionsectionCount}
//           </label>
//           <input
//             type="text"
//             className="conditioninputreact"
//             value={
//               selectedOption1 === "ALWAYS"
//                 ? "(Always)"
//                 : selectedOption1 === "WHEN"
//                 ? "(When)"
//                 : selectedOption1 === "COMPLEX"
//                 ? "(Complex)"
//                 : ""
//             }
//             readOnly
//           />
//         </div>
//       </div>
//       {isOpen && (
//         <div className="conditiongrid">
//           <CustomDropdown
//             options={options1}
//             onSelect={handleOption1Select}
//             label="CONDITION"
//             custuminput="customwdthclas1"
//             value={selectedOption1}
//             onChange={(value)=> {alert(value);setSelectedOption1(value);rulesSubmit(value, selectedOption2, selectedOption3, selectedOption4)}}
//           />
//           {selectedOption1 === "WHEN" && (
//             <>
//               <CustomDropdown
//                 options={options2}
//                 onSelect={handleOption2Select}
//                 label="QUESTION OR VALUE"
//                 Placeholder={"Question Or Value"}
//                 custuminput='whenmandotoryfield'
//                 isBorderVisible={true}
//                 value={selectedOption2}
//                 onChange={(value)=> {rulesSubmit(selectedOption1, value, selectedOption3, selectedOption4)}}

//               />
//               <CustomDropdown
//                 options={options3}
//                 onSelect={handleOption3Select}
//                 label="OPERATOR"
//                 Placeholder={"Operator"}
//                 dropdownClass="customoperatorclas"
//                 isBorderVisible={true}
//                 value={selectedOption3}
//                 onChange={(value)=> {rulesSubmit(selectedOption1, selectedOption2, value, selectedOption4)}}
//               />
//               {selectedOption2 !== "CHANGED" &&
//                 selectedOption2 !== "EQUAL" &&
//                 selectedOption2 !== "NOT EMPTY" && (
//                   <div className="divvalue1">

//                     {toogleValue === "DATE" ? (
//                         <>
//                           <input
//                             className="valueinput"
//                             type="date"
//                             placeholder="Value"
//                             onMouseEnter={handleMouseEnter}
//                             onMouseLeave={handleMouseLeave}
//                             onBlur={(e) => {
//                               setSelect_Date(e.target.value);
//                               rulesSubmit(
//                                 selectedOption1,
//                                 selectedOption2,
//                                 selectedOption3,
//                                 { date: e.target.value }
//                               );
//                             }}
//                             defaultValue={select_date}
//                           />
//                         </>
//                       ) : toogleValue === "NUMBERS" ? (
//                         <>
//                           <input
//                             className="valueinput"
//                             type="number"
//                             placeholder="Number Value"
//                             onMouseEnter={handleMouseEnter}
//                             onMouseLeave={handleMouseLeave}
//                             onBlur={(e) => {
//                               setNumber(e.target.value);
//                               rulesSubmit(
//                                 selectedOption1,
//                                 selectedOption2,
//                                 selectedOption3,
//                                 { number: e.target.value }
//                               );
//                             }}
//                             defaultValue={number}
//                           />
//                         </>
//                       ) : toogleValue === "TOGGLE" ? (
//                         <>
//                           <label>
//                             Toggle:
//                             <input type="checkbox" onChange={(e) => {
//                               setToggle(e.target.checked?1:0);
//                               rulesSubmit(
//                                 selectedOption1,
//                                 selectedOption2,
//                                 selectedOption3,
//                                 { toggle: e.target.checked?1:0 }
//                               );
//                             }} />
//                           </label>
//                         </>
//                       ) : toogleValue === "COUNTRIES" ? (
//                         <>
//                           <select
//                             className="valueinput"
//                             onChange={(e) => {
//                               setCountries(e.target.value);
//                               rulesSubmit(
//                                 selectedOption1,
//                                 selectedOption2,
//                                 selectedOption3,
//                                 { countries: e.target.value }
//                               );
//                             }}
//                             value={countries}
//                           >
//                                             <option value="">{countries?countries:"Select Country"}</option>
//                                             <option>India</option>
//                                             <option>Canada</option>
//                                             <option>Mexico</option>
//                                             <option>Brazil</option>
//                                             <option>Argentina</option>
//                                             <option>UK</option>
//                                             <option>Germany</option>
//                                             <option>France</option>
//                                             <option>Italy</option>
//                                             <option>Switzerland</option>
//                                             <option>Spain</option>
//                                             <option>Austria</option>
//                                             <option>Sweden</option>
//                                             <option>Austria</option>
//                                             <option>Denmark</option>
//                                             <option>Portugal</option>
//                                             <option>Saudi Arabia</option>
//                                             <option>Africa</option>
//                                             <option>Israel</option>
//                                             <option>US</option>
//                                             <option>Singapore</option>
//                                             <option>Australia</option>
//                                             <option>Japan</option>
//                                             <option>China</option>
//                                             <option>Korea</option>
//                             {/* Add more countries as needed */}
//                           </select>
//                         </>
//                       ) : toogleValue === "YES/NO" ? (
//                         <>
//                           <select
//                             className="valueinput"
//                             onChange={(e) => {
//                               setYes_no(e.target.value);
//                               rulesSubmit(
//                                 selectedOption1,
//                                 selectedOption2,
//                                 selectedOption3,
//                                 { yes_no: e.target.value }
//                               );
//                             }}
//                             value={yes_no}
//                           >
//                             <option value=""></option>
//                             <option value="YES">YES</option>
//                             <option value="NO">NO</option>
//                             {/* Add more countries as needed */}
//                           </select>
//                         </>
//                       )
//                       :
//                       toogleValue === "YES/NO/NOT" ? (
//                         <>
//                           <select
//                             className="valueinput"
//                             onChange={(e) => {
//                               setYes_no_not(e.target.value);
//                               rulesSubmit(
//                                 selectedOption1,
//                                 selectedOption2,
//                                 selectedOption3,
//                                 { yes_no_not: e.target.value }
//                               );
//                             }}
//                             value={yes_no_not}
//                           >
//                             <option value=""></option>
//                             <option value="YES">YES</option>
//                             <option value="NO">NO</option>
//                             <option value="NOT">NOT</option>

//                             {/* Add more countries as needed */}
//                           </select>
//                         </>
//                       )

//                       :toogleValue === "NUMERIC" ? (
//                         <>
//                           <select
//                             className="valueinput"
//                             onChange={(e) => {
//                               setNumeric_num(e.target.value);
//                               rulesSubmit(
//                                 selectedOption1,
//                                 selectedOption2,
//                                 selectedOption3,
//                                 { numeric_num: e.target.value }
//                               );
//                             }}
//                             value={numeric_num}
//                           >
//                             <option value="">{numeric_num}</option>
//                             <option>1</option>
//                                           <option>2</option>
//                                           <option>3</option>
//                                           <option>4</option>
//                                           <option>5</option>
//                                           <option>6</option>
//                                           <option>7</option>
//                                           <option>8</option>
//                                           <option>9</option>
//                                           <option>10</option>

//                             {/* Add more countries as needed */}
//                           </select>
//                         </>
//                       )

//                       : (
//                         <>
//                           <input
//                             className="valueinput"
//                             type="text"
//                             placeholder="Text Value"
//                             onMouseEnter={handleMouseEnter}
//                             onMouseLeave={handleMouseLeave}
//                             onBlur={(e) => {
//                               setOtherinput(e.target.value);
//                               rulesSubmit(
//                                 selectedOption1,
//                                 selectedOption2,
//                                 selectedOption3,
//                                 { otherinput: e.target.value }
//                               );
//                             }}
//                             defaultValue={otherinput}
//                           />
//                         </>
//                       )}

//                     <label htmlFor="valueinput" className="Lablevalue">
//                       VALUE
//                     </label>
//                     <span className="whenpencil" style={{
//                         display: isCursorOverInput2 ? "inline-block" : "none",
//                       }}>
//                       <i className="fa fa-pencil" aria-hidden="true" ></i>
//                     </span>
//                   </div>
//                 )}
//               {selectedOption2 === "BETWEEN" && (
//                 <div className="divvalue2">
//                   <input
//                     className="valueinput1"
//                     type="text"
//                     placeholder="Value"
//                     onMouseEnter={handleMouseEnter}
//                     onMouseLeave={handleMouseLeave}
//                   />
//                   <label htmlFor="valueinput1" className="Lablevalue">
//                     VALUE
//                   </label>
//                   <span className="whenpencil1" style={{
//                         display: isCursorOverInput ? "inline-block" : "none",
//                       }}>
//                     <i className="fa fa-pencil" aria-hidden="true"></i>
//                   </span>
//                 </div>
//               )}
//             </>
//           )}
//           {isComplex && (
//             <>
//               <CustomDropdown
//                 options={options4}
//                 onSelect={handleOption2Select}
//                 label="QUESTION OR VALUE"
//                 Placeholder={"Question Or Value"}
//                 isBorderVisible={true}
//               />

//               <CustomDropdown
//                 options={options5}
//                 onSelect={handleOption2Select}
//                 label="OPERATOR"
//                 Placeholder={"Operator"}
//                 isBorderVisible={true}
//               />

//               {selectedOption2 !== "CHANGED" &&
//                selectedOption2 !== "NOT EMPTY" && (
//                   <div className="divcomplexvalue1">
//                     <input
//                       className="complexvalueinput"
//                       type="text"
//                       placeholder="Value"
//                        onMouseEnter={handleMouseEnter}
//                       onMouseLeave={handleMouseLeave}
//                     />
//                     <label
//                       htmlFor="complexvalueinput"
//                       className="complexLablevalue"
//                     >
//                       VALUE
//                     </label>
//                     <span className="complexpencil"
//                     style={{
//                         display: isCursorOverInput ? "inline-block" : "none",
//                       }}>
//                       <i className="fa fa-pencil" aria-hidden="true"></i>
//                     </span>
//                   </div>
//                 )}

//               {selectedOption2 === "BETWEEN" && (
//                 <div className="divcomplexvalue2">
//                   <input
//                     className="complexvalueinput1"
//                     type="text"
//                     placeholder="Value"
//                     onMouseEnter={handleMouseEnter}
//                     onMouseLeave={handleMouseLeave}
//                   />
//                   <label
//                     htmlFor="complexvalueinput1"
//                     className="complexLablevalue"
//                   >
//                     VALUE
//                   </label>
//                   <span className="complexpencil1" style={{
//                         display: isCursorOverInput2 ? "inline-block" : "none",
//                       }}>
//                     <i className="fa fa-pencil" aria-hidden="true"></i>
//                   </span>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       )}

// {isComplex && (
//         <div id="expDiv">
//           {expression.map((expression, index) => (
//             <AddExpressions
//               key={expression.key}
//               // key={index}
//               expressionId={index}
//               expcount={expression.expcount}
//               deleteExpression={() => deleteExpression(expression.key)}
//             />
//           ))}
//           <button id='addExpression' onClick={addExpression} >ADD EXPRESSION</button>
//           {grouping.map((group, index) => (
//             <AddGroup
//               groupId={index}
//               group={group}
//               onGroupChange={(updatedGroup) => handleGroupChange(index, updatedGroup)}
//             />

//           ))}
//           <button id='addGroup' onClick={addGroup}>ADD GROUP</button>

//         </div>
//       )}
//     </>
//   );
// };
// export default Condition;
