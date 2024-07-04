// import React, { useState, useEffect } from "react";
// import "../../assets/css/addsection/AddQuestionSection.css";
// import CustomDropDownCode from "../../components/addsection/CustomDropdownCode";
// import IComponent from "../../components/addsection/IComponent";
// import Customfile from "../../components/addsection/CustomFile";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDown, faAngleUp, faClone } from "@fortawesome/free-solid-svg-icons";
// import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
// import Formula from "./Formula";
// import { baseUrl } from "../../config";
// import { useAuthContext } from "../../hooks/useAuthContext";

// function AddQuestionSection({
//   survey_id,
//   sectionId,
//   sectionCount,
//   onDelete,
//   questionsectionCount,
//   onMoveUp,
//   onMoveDown,
//   totalSections,
//   currentIndex,
//   questions_data,
// }) {
//   const { user } = useAuthContext();

//   const [isDelete, setIsDelete] = useState(false);

//   const [showMoveUp, setShowMoveUp] = useState(false);

//   const [showMoveDown, setShowMoveDown] = useState(false);

//   const [showIComp, setShowIComp] = useState(false);

//   const [showInfoCircle, setShowInfoCircle] = useState(false);

//   const [selectedOption, setSelectedOption] = useState("");

//   const [inputValue, setInputValue] = useState("");

//   const [, setIsIconUp] = useState(false);

//   const [question_key, setQuestion_key] = useState("");

//   const [isFileInputVisible, setFileInputVisible] = useState(false);

//   const [iComponentInputValues, setIComponentInputValues] = useState("");

//   const [secondInputValues, setSecondInputValues] = useState("");

//   const [thirdInputValues, setThirdInputValues] = useState("");

//   const [isFormulaVisible, setIsFormulaVisible] = useState(false);

//   const [questionValue, setQuestionValue] = useState("");

//   const [question_data, setQuestion_data] = useState([]);

//   useEffect(() => {
//     setQuestion_key(questions_data ? questions_data._id : "");
//     setQuestion_data(questions_data);
//     setQuestionValue(questions_data ? questions_data.survey_questions_name : "")
//     setSelectedOption(questions_data ? questions_data.survey_questions_toggle : "")

//   }, [questions_data])

//   useEffect(() => {
//     setShowMoveUp(currentIndex > 0);

//     setShowMoveDown(currentIndex < totalSections - 1);

//   }, [currentIndex, totalSections]);

//   const handleiIComp = () => {
//     setShowIComp(!showIComp);

//     setShowInfoCircle(!showInfoCircle);
//   };

//   const handleDelete = () => {

//     if (!isDelete) {
//       setIsDelete(true);
//     } else {
//       onDelete(questionsectionCount);
//       deleteQuestion();
//       setIsDelete(false);
//     }
//   };

//   const handleBlur = () => {
//     setIsDelete(false);
//   };

//   const toggleFileInput = () => {
//     setFileInputVisible(!isFileInputVisible);

//     setIsIconUp(true);
//   };

//   const handleDropDownSelect = (option) => {
//     setSelectedOption(option);
//     questionSubmit(option)

//     setFileInputVisible(false);

//     setIsFormulaVisible(option === "");
//   };

//   const toggleFormulaVisibility = () => {
//     if (selectedOption === "FORMULA") {
//       setIsFormulaVisible(!isFormulaVisible);
//     } else {
//       setIsFormulaVisible(false);
//     }
//   };
//   const [formula_add_filed, setFormula_add_filed] = useState("");
//   const [formula_add_operator, setFormula_add_operator] = useState("");
//   const [formula_add_function, setFormula_add_function] = useState("");
//   const [formula_evaluate, setFormula_evaluate] = useState(false);

//   //Questions Submit===================================

//   const questionSubmit = async (option, formula_add_filed, formula_add_operator, formula_add_function, formula_add_formula, formula_evaluate) => {

//     var section_key = section_key;
//     var survey_key = survey_id;
//     var questions_num = `${sectionCount}.${questionsectionCount}`;
//     // var field_name = event.target.getAttribute('name');
//     // var field_value = event.target.value;

//     // if (field_name === "section_hide") {
//     //   if (event.target.checked) {
//     //     field_value = 1;
//     //     // event.target.checked = true;
//     //     // surveySetup.wide = 1;
//     //   } else {
//     //     field_value = 0;
//     //     // event.target.checked = false;

//     //     // surveySetup.wide = 0;
//     //   }
//     // }
//     var section_data = {
//       survey_key,
//       section_key: sectionId,
//       question_key,
//       questions_num,
//       question_name: questionValue,
//       survey_questions_toggle: option ? option : selectedOption,
//       formula_add_filed,
//       formula_add_operator,
//       formula_add_function,
//       formula_add_formula,
//       formula_evaluate,
//     };
//     try {
//       const response = await fetch(`${baseUrl}/api/survey/addSurveyQuestions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`,
//         },
//         body: JSON.stringify(section_data)
//       });
//       if (response.ok) {
//         const survey = await response.json();
//         if (survey.status === "Success") {
//           // alert("SUccess");
//           setQuestion_key(survey.question_key);
//           // parentEle.querySelector('input[name="section_key"]').value = survey.section_key;
//           // setup_key.value = survey.survey_key;
//           // getSurvey();
//           // setSurveySetup(survey.data);

//         }
//       }
//     } catch (error) {
//       // console.log(error)
//       // alert(error);
//     }

//   }

//   //count variable double click

//   const deleteQuestion = async () => {
//     try {

//       const response = await fetch(`${baseUrl}/api/survey/deleteSurveyQuestions`, {

//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${user.token}`,
//         },
//         body: JSON.stringify({
//           survey_key: survey_id,
//           section_key: sectionId,
//           question_key: question_key
//         }),
//       });
//       const questionData = await response.json();

//       if (response.ok) {
//         alert('Question deleted!!');
//         // window.location.href = '/setup'
//       } else {
//         alert('Not Able to Delete!')
//       }
//     } catch (error) {
//       // console.log(error);
//     }
//   }

//   const [questionName, setQuestionName] = useState('');
//   useEffect(() => {
//     setQuestionName(question_data ? question_data.survey_questions_name : "");
//   }, [question_data])

//   const handleFormulaSubmit = (formulaData) => {
//     // Destructure formulaData to get individual values
//     const {
//       formula_add_filed,
//       formula_add_operator,
//       formula_add_function,
//       inputValue,
//       formula_evaluate,
//     } = formulaData;

//     // Call your questionSubmit function here and pass the formulaData
//     questionSubmit("FORMULA");

//     // Optionally, you can also handle other logic related to formulaData
//     // Pass the formula-related values to the questionSubmit function
//     questionSubmit(selectedOption, formula_add_filed, formula_add_operator, formula_add_function, inputValue, formula_evaluate);
//   };

//   return (
//     <>
//       <div className="div-questionsection">
//         <div id="questioncount" className="grid-questionsection">
//           {selectedOption === "CUSTOM FORM" && (
//             <FontAwesomeIcon
//               className="icon-with-margin"
//               icon={isFileInputVisible ? faAngleUp : faAngleDown}
//               onClick={toggleFileInput}
//             />
//           )}
//           {selectedOption === "FORMULA" && (
//             <FontAwesomeIcon
//               className="icon-with-margin"
//               icon={isFormulaVisible ? faAngleUp : faAngleDown}
//               onClick={toggleFormulaVisibility}
//             />
//           )}
//           {sectionCount}.{questionsectionCount}
//         </div>

//         <div className="grid-questionsection-input">
//           <input
//             className="question-section-input"
//             name=""
//             type="text"
//             placeholder="Enter your question"
//             onBlur={() => { questionSubmit(selectedOption) }}
//             onChange={(e) => setQuestionValue(e.target.value)}
//             value={questionValue}

//           />
//         </div>

//         <div className="grid-questionsection">
//           <i
//             id="i-icon"
//             className={`fa ${showInfoCircle ? "fa-info-circle" : "fa-info"}`}
//             aria-hidden="true"
//             onClick={handleiIComp}
//           ></i>
//         </div>

//         <div className="grid-questionsectionrequired">
//           <input className="required-check" type="checkbox" />

//           <label htmlFor="" className="requiredlable-check">
//             Required
//           </label>
//         </div>

//         <div className="grid-questionsection-togledropdown">
//           <CustomDropDownCode onSelect={handleDropDownSelect} value={selectedOption} />
//         </div>

//         <div className="grid-questionsection-btn">
//           <p
//             id="btn-move-up"
//             onClick={() => onMoveUp(questionsectionCount)}
//             disabled={!showMoveUp}
//           >
//             {showMoveUp ? "MOVEUP" : ""}
//           </p>
//         </div>

//         <div className="grid-questionsection-btn">
//           <p
//             id="btn-move-down"
//             onClick={() => onMoveDown(questionsectionCount)}
//             disabled={!showMoveDown}
//           >
//             {showMoveDown ? "MOVEDOWN" : ""}
//           </p>
//         </div>

//         <div className="grid-questionsection">
//           <FontAwesomeIcon icon={faClone} id="copy-inquestion" ></FontAwesomeIcon>
//         </div>

//         <div className="grid-questionsection">
//           <button
//             id="btn-deleteQuestion"
//             onClick={handleDelete}
//             onBlur={handleBlur}
//             className={isDelete ? "highlighted" : ""}
//           >
//             < FontAwesomeIcon icon={faTrashAlt}
//               id="deletebtnQuestion"
//               className={isDelete ? "highlighted" : ""}
//               aria-hidden="true"
//             />
//           </button>

//         </div>
//       </div>

//       {showIComp && (
//         <IComponent
//           inputValue={iComponentInputValues}
//           onInputChange={(value) => setIComponentInputValues(value)}
//           secondInputValue={secondInputValues}
//           onSecondInputChange={(value) => setSecondInputValues(value)}
//           thirdInputValue={thirdInputValues}
//           onThirdInputChange={(value) => setThirdInputValues(value)}
//         />
//       )}

//       {isFileInputVisible && (
//         <Customfile
//           questionsectionCount={questionsectionCount}
//           sectionCount={sectionCount}
//         />
//       )}

//       {isFormulaVisible && <Formula
//         formulaData={questions_data}
//         onFormulaSubmit={handleFormulaSubmit}
//       />}
//     </>
//   );
// }

// export default AddQuestionSection;
