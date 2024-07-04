// import React, { useState, useEffect, useRef } from "react";
// import "../../assets/css/addsection/AddRule.css";
// import Condition from "../../components/addsection/Condition";
// import AddAction from "../../components/addsection/AddAction";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import {baseUrl} from "../../config";

// import {
//   faAngleDown,
//   faAngleUp,
//   faClone,
// } from "@fortawesome/free-solid-svg-icons";
// import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

// const AddRule = ({
//   survey_id,
//   sectionId,
//   sectionCount,
//   rulesectionCount,
//   onMoveUp,
//   onMoveDown,
//   onDelete,
//   showFlag,
//   rulebtnsdivcustom,
//   rules_data,
// }) => {

//   const { user } = useAuthContext();

//   const [showCondition, setShowCondition] = useState(false);

//   const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);

//   const [question_data, setQuestion_data] = useState([]);

//   const [question_key, setQuestion_key] = useState("");

//   const deleteButtonRef = useRef(null);

//   const toggleCondition = () => {
//     setShowCondition(!showCondition);
//   };

//   const handleDeleteClick = () => {
//     if (!deleteButtonClicked) {
//       setDeleteButtonClicked(true);
//     } else {
//       onDelete();
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         deleteButtonRef.current &&
//         !deleteButtonRef.current.contains(event.target)
//       ) {
//         setDeleteButtonClicked(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   //Rules submit================================

//   const [rulesName, setRulesName] = useState("");
//   const [rules_key, setRules_key] = useState("");

//   const rulesSubmit = async (event) => {
//     var survey_key = survey_id;
//     var section_key = sectionId;

//     var section_data = {
//       survey_key,
//       section_key,
//       rule_key: rules_key,
//       rule_num: `${sectionCount}.${rulesectionCount}`,
//       rule_name: rulesName,
//     };
//     try {
//       const response = await fetch(`${baseUrl}/api/survey/addSurveyRules`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify(section_data),
//       });
//       if (response.ok) {
//         const survey = await response.json();
//         if (survey.status === "Success") {
//           setRules_key(survey.rules_key);
//         }
//       }
//     } catch (error) {
//       alert(error);
//     }
//   };
//   const [actions_data, setSurveyActionsData] = useState([]);
//   useEffect(() => {
//     setRulesName(rules_data ? rules_data.rule_name : "");
//     setRules_key(rules_data ? rules_data._id : "");
//     getSurveyActions();
//   }, [rules_data]);

//   // getSurveyActions api function
//   const getSurveyActions = async () => {
//     var survey_key = survey_id;
//     var section_key = sectionId;

//     if(rules_data){
//     var data = {
//       survey_key,
//       section_key,
//       rules_key: rules_data._id,
//     }
//     try {
//       const response = await fetch(
//         `${baseUrl}/api/survey/getSurveyActions`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             // Authorization: `Bearer ${user.token}`,
//           },
//           body: JSON.stringify(data),
//         }
//       );
//       if (response.ok) {
//         const survey = await response.json();
//         if (survey.status == "Success") {

//           // setActionCount(survey.data.length);
//           // const newAction = {
//           //     key: actionCount,
//           //     rulesectionCount: rulesectionCount,
//           //     sectionCount: sectionCount,
//           //     actionCount: actionCount,
//           //     isDropdownOpen: false,
//           //     selectedOption: "",
//           //     selectedOption1: "",

//           //     dropdownOptions: [],
//           // };
//           // setActionSections((prevSections) => [...prevSections, newAction]);
//           setSurveyActionsData(survey.data.map((item,i)=>{
//             var data = item;
//             data.key = i+1;
//             data.rulesectionCount = rulesectionCount;
//             data.sectionCount = sectionCount;
//             data.actionCount = i+1;
//             data.isDropdownOpen = true;
//             data.selectedOption = item.survey_action_name;
//             data.selectedOption1 = item.survey_actions_sections;
//             data.dropdownOptions = [];
//             return data;

//           }));
//         }
//       }
//     } catch (error) {
//       // console.log(error);
//     }
//     }else{
//       setSurveyActionsData([]);
//     }
//   };

//   return (
//     <>
//       <div className="wholeruleinputdiv">
//         <div className={`rulebtnsdiv ${rulebtnsdivcustom}`}>
//           <button id="angledownrule">
//             <FontAwesomeIcon
//               icon={showCondition ? faAngleUp : faAngleDown}
//               aria-hidden="true"
//               onClick={toggleCondition}
//             />
//           </button>
//           <label className="labelsectionrule">
//             Rule {sectionCount}.{rulesectionCount}
//           </label>
//           {showFlag && (
//             <input
//               type="number"
//               className="assetorder"
//               placeholder="Order"
//             ></input>
//           )}

//           <input
//             type="text"
//             className="ruleinputreact"
//             onBlur={rulesSubmit}
//             onChange={(e) => {
//               setRulesName(e.target.value);
//             }}
//             value={rulesName}
//           ></input>
//           <button className="upassetrule" onClick={onMoveUp}>
//             MOVE UP
//           </button>
//           <button className="downassetrule" onClick={onMoveDown}>
//             MOVE DOWN
//           </button>
//           <button className="copyasssetbtnrule">
//             <FontAwesomeIcon icon={faClone} id="copyasssetbtnruleid" />
//           </button>
//           <button
//             ref={deleteButtonRef}
//             className={`deleassetrulebtn ${
//               deleteButtonClicked ? "highlightedrules" : ""
//             }`}
//             onClick={handleDeleteClick}
//           >
//             <FontAwesomeIcon icon={faTrashCan} id="deleassetrule" />
//           </button>
//         </div>
//         {showCondition && (
//           <>
//             <Condition
//               rules_key={rules_key}
//               survey_id={survey_id}
//               sectionId={sectionId}
//               sectionCount={sectionCount}
//               conditionsectionCount={rulesectionCount}
//               rules_data={rules_data}
//             />
//             <div>
//               <AddAction
//                 rules_key={rules_key}
//                 survey_id={survey_id}
//                 sectionId={sectionId}
//                 sectionCount={sectionCount}
//                 rulesectionCount={rulesectionCount}
//                 actionsData={actions_data}
//               />
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default AddRule;
