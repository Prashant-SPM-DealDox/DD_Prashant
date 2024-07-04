// import React, { useState, useEffect, useRef } from "react";
// import "../../assets/css/addsection/QuestionAndRules.css";
// import QuestionsAndRules from "../../components/addsection/QuestionAndRules";
// import ErrorMessage from "../../components/common/ErrorMessage";
// import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
// import {baseUrl} from "../../config";
// import { useAuthContext } from "../../hooks/useAuthContext";

// function NewSection({
//   survey_id,
//   sectionCount,
//   sectionId,
//   sectionIndex,
//   onDelete,
//   onMoveUp,
//   onMoveDown,
//   totalSection,
//   showFlag,
//   rulebtnsdivcustom,
//   surveySectionsData,
//   rule_key,
// }) {

//   const { user } = useAuthContext();
//   const [isQuestionVisible, setIsQuestionVisible] = useState(true);
//   const [isDeleteHighlighted, setIsDeleteHighlighted] = useState(false);
//   const [showMoveUp, setShowMoveUp] = useState(false);
//   const [showMoveDown, setShowMoveDown] = useState(false);
//   const [inputValue, setInputValue] = useState(surveySectionsData ? surveySectionsData.survey_section_title : "");
//   const [questions_data, setQuestions_data] = useState([]);
//   const [rulesData, setRulesData] = useState([]);
//   const [actionData, setActionData] = useState([]);

//   const [error, setError] = useState(false);
//   const inputRef = useRef(null);

//   const [section_key, setSectionKey] = useState(surveySectionsData ? surveySectionsData._id : "");

//   useEffect(() => {
//     // Determine whether to show "moveup" and "movedown" buttons based on currentIndex
//     setShowMoveUp(sectionId > 0);
//     setShowMoveDown(sectionId < totalSection - 1);
//   }, [sectionId, totalSection]);

//   useEffect(() => {
//     //For windows Click outside
//     const handleClickOutside = (event) => {
//       if (inputRef.current && !inputRef.current.contains(event.target)) {
//         setError(false);
//       }
//     };
//     window.addEventListener("click", handleClickOutside);
//     // return () => {
//     //   window.removeEventListener("click", handleClickOutside);
//     // };
//     // surveySectionsData.forEach((data) => {
//     setInputValue(
//       surveySectionsData ? surveySectionsData.survey_section_title : ""
//     );
//     getSurveyQuestions();
//     getSurveyRules();
//     // });
//   }, [surveySectionsData]);

//   const sectionSubmit = async (event) => {
//     // var parentEle = event.target.parentNode.parentNode;
//     const sec_key = surveySectionsData ? surveySectionsData._id : "";
//     var section_num = sectionCount;
//     var survey_key = survey_id;

//     var field_name = event.target.getAttribute("name");
//     var field_value = event.target.value;

//     if (field_name === "section_hide") {
//       if (event.target.checked) {
//         field_value = 1;
//         // event.target.checked = true;
//         // surveySetup.wide = 1;
//       } else {
//         field_value = 0;
//         // event.target.checked = false;

//         // surveySetup.wide = 0;
//       }
//     }
//     var section_data = {
//       section_key: section_key==sec_key ? section_key : sec_key,
//       section_num,
//       survey_key,
//       section_title: inputValue,
//     };
//     try {
//       const response = await fetch(`${baseUrl}/api/survey/addSurveySections`, {
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
//           // alert("SUccess");
//           setSectionKey(survey.section_key);
//           // parentEle.querySelector('input[name="section_key"]').value = survey.section_key;
//           // setup_key.value = survey.survey_key;
//           // getSurvey();
//           // setSurveySetup(survey.data);
//         }
//       }
//     } catch (error) {
//       alert(error);
//     }
//   };

//   // getSurveyQuestions api function
//   const getSurveyQuestions = async () => {
//     try {
//       const response = await fetch(`${baseUrl}/api/survey/getSurveyQuestions`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify({
//           survey_key: survey_id,
//           section_key: surveySectionsData._id,
//         }),
//       });
//       if (response.ok) {
//         const survey = await response.json();
//         if (survey.status == "Success") {
//           setQuestions_data(survey.data);

//           // setSurveySectionTag(
//           //   <AddSection
//           //     showFlag={false}
//           //     survey_id={id}
//           //     surveySectionsData={survey.data}
//           //   />
//           // );
//         }
//       }
//     } catch (error) {
//       // console.log(error);
//     }
//   };

//   //getSurveyRules
//   const getSurveyRules = async () => {
//     try {
//       const response = await fetch(`${baseUrl}/api/survey/getSurveyRules`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify({
//           survey_key: survey_id,
//           section_key: surveySectionsData._id,
//         }),
//       });
//       if (response.ok) {
//         const survey = await response.json();
//         if (survey.status == "Success") {
//           setRulesData(survey.data);
//         }
//       }
//     } catch (error) {
//       // console.log(error);
//     }
//   };
//   //end of rules API

//   // getSurveyActions api function

//   const getSurveyActions = async () => {
//     try {
//       const response = await fetch(`${baseUrl}/api/survey/getSurveyActions`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify({
//           survey_key: survey_id,
//           section_key: surveySectionsData._id,
//           survey_rules_key: rule_key,
//         }),
//       });
//       if (response.ok) {
//         const survey = await response.json();
//         if (survey.status == "Success") {
//           setActionData(survey.data);

//         }
//       }
//     } catch (error) {
//       // console.log(error);
//     }
//   };

//   useEffect(() => {
//     getSurveyActions();
//   }, [user]);

//   const toggleQuestion = () => {
//     setIsQuestionVisible(!isQuestionVisible);
//   };

//   const handleDelete = () => {
//     if (!isDeleteHighlighted) {
//       setIsDeleteHighlighted(true);
//     } else {
//       onDelete();
//     }
//   };
//   const handleBlur = () => {
//     setIsDeleteHighlighted(false);
//   };
//   const handleMoveUpClick = () => {
//     onMoveUp(sectionIndex);
//   };

//   const handleMoveDownClick = () => {
//     onMoveDown(sectionIndex);
//   };

//   return (
//     <div className="mainsection">
//       <div className="mainsection-grid-container">
//         <div onClick={toggleQuestion}>
//           <FontAwesomeIcon
//             icon={isQuestionVisible ? faAngleUp : faAngleDown}
//             style={{ marginLeft: "5px" }}
//           />
//         </div>
//         <div className="countdiv">{sectionCount}</div>
//         <div>
//           <ErrorMessage
//             inputValueError={true}
//             showFlaxErrorMessageText={true}
//             errormsg="SECTION IS A REQUIRED FIELD"
//             placeholdersection="Enter Section Title"
//             validationinputcustom="custominputerrormsg"
//             value={inputValue}
//             onChange={(value) => setInputValue(value)}
//             onBlur={(e) => {
//               sectionSubmit(e);
//             }}
//           />
//         </div>
//         <div id="moveup">
//           <p
//             className="arrowup"
//             onClick={handleMoveUpClick}
//             disabled={!showMoveUp}
//           >
//             {showMoveUp ? "MOVEUP" : ""}
//           </p>
//         </div>
//         <div id="movedown">
//           <p
//             className="arrowdown"
//             onClick={handleMoveDownClick}
//             disabled={!showMoveDown}
//           >
//             {showMoveDown ? "MOVEDOWN" : ""}
//           </p>
//         </div>
//         <div className="hidediv">
//           <input type="checkbox" />
//           <label htmlFor="" className="hidelable">
//             Hide
//           </label>
//         </div>
//         <button
//           id="btn-delete"
//           onClick={handleDelete}
//           onBlur={handleBlur}
//           className={isDeleteHighlighted ? "highlighted" : ""}
//         >
//           <FontAwesomeIcon
//             icon={faTrashAlt}
//             id="deletebtn"
//             className={`icon-class ${isDeleteHighlighted ? "highlighted" : ""}`}
//             aria-hidden="true"
//           />
//         </button>
//       </div>
//       <div style={{ display: isQuestionVisible ? "block" : "none" }}>
//         <QuestionsAndRules
//           survey_id={survey_id}
//           sectionId={
//             surveySectionsData._id ? surveySectionsData._id : section_key
//           }
//           sectionCount={sectionCount}
//           showFlag={showFlag}
//           rulebtnsdivcustom={rulebtnsdivcustom}
//           questions_data={questions_data}
//           rules_data={rulesData}
//           action_data={actionData}
//         />
//       </div>
//     </div>
//   );
// }

// export default NewSection;
