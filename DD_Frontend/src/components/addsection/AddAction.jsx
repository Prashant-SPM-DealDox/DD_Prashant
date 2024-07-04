// import React, { useState, useEffect } from "react";
// import "../../assets/css/addsection/AddAction.css";
// import CustomDropdown from "../../components/common/CustomDropdown";
// import DoctypeDropdown from "../../components/addsection/DoctypeDropdown";
// import CalcSheetPointer from "../../components/addsection/CalcSheetPointer";
// import ValueList from "../../components/addsection/ValueList";
// import DeleteAction from "../../components/addsection/DeleteAction";
// import "froala-editor/css/froala_editor.pkgd.min.css";
// import "froala-editor/css/froala_style.min.css";
// import FroalaEditorComponent from "react-froala-wysiwyg";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import ErrorMessage from "../../components/common/ErrorMessage";
// import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { baseUrl } from "../../config";
// import Cookies from "js-cookie";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaUserAlt } from "react-icons/fa";
// import Action from "./Action";
// const AddAction = ({
//   survey_id,
//   sectionId,
//   rules_key,
//   sectionCount,
//   rulesectionCount,
//   actionsData,
// }) => {
//   const { user } = useAuthContext();
//   const [actionSections, setActionSections] = useState([]);

//   const [actionCount, setActionCount] = useState(1);

//   const [, setDoctypeSelectoption] = useState([]);

//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedOption1, setSelectedOption1] = useState(null);

//   const [actionName, setActionName] = useState("");
//   const [action_key, setAction_key] = useState("");
//   const [actionSectionsQuestions, setActionSectionsQuestions] = useState("");

//   const [displayCalcSheetPointer, setDisplayCalcSheetPointer] = useState(false);

//   const [margindisplayCalcSheetPointer, setMarginDisplayCalcSheetPointer] =
//     useState(false);
//   const [
//     displayCalcSheetPointerservicelevel,
//     setdisplayCalcSheetPointerservicelevel,
//   ] = useState(true);

//   const [surveySectionsData, setSurveySectionsData] = useState([]);

//   const [surveyQuestionsData, setSurveyQuestionsData] = useState([]);
//   const [actions_data, setSurveyActionsData] = useState(actionsData);

//   const [optionshow, setOptionshow] = useState([]);
//   const [optionQUE, setOptionQUE] = useState([]);

//   const addActionSection = () => {
//     setActionCount((prevActionCount) => prevActionCount + 1);
//     const newAction = {
//       key: actionCount,
//       rulesectionCount: rulesectionCount,
//       sectionCount: sectionCount,
//       actionCount: actionCount,
//       isDropdownOpen: false,
//       selectedOption: "",
//       selectedOption1: "",

//       dropdownOptions: [],
//     };
//     setActionSections((prevSections) => [...prevSections, newAction]);
//   };
//   const toggleDropdownaction = (index) => {
//     setActionSections((prevSections) =>
//       prevSections.map((action, i) =>
//         i === index
//           ? { ...action, isDropdownOpen: !action.isDropdownOpen }
//           : action
//       )
//     );
//   };
//   // const handleActionSelect = async (option, index) => {
//   //   setActionName(option)
//   //   await actionSubmit(option, "");
//   //   setSelectedOption(option);

//   //   setActionSections((prevSections) =>
//   //     prevSections.map((action, i) =>
//   //       i === index ? { ...action, selectedOption: option } : action
//   //     )
//   //   );
//   // };

//   const handleActionDoctype = (option) => {
//     setDoctypeSelectoption(option);
//   };
//   const deleteActionSection = (index) => {
//     setActionSections((prevSections) =>
//       prevSections
//         .filter((_, i) => i !== index)
//         .map((action, i) => ({
//           ...action,
//           actionCount: i + 1,
//         }))
//     );
//     setActionCount((prevActionCount) => prevActionCount - 1);
//   };

//   useEffect(() => {
//     if (user) {
//       // sections
//       getSurveySections();
//       // questions
//       getSurveyQuestions();

//     }
//   }, [user]);

//   // getSurveySections api function
//   const getSurveySections = async () => {
//     try {
//       const response = await fetch(`${baseUrl}/api/survey/getSurveySections`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify({ survey_key: survey_id }),
//       });
//       if (response.ok) {
//         const survey = await response.json();
//         if (survey.status == "Success") {
//           setOptionshow(
//             survey.data.map(
//               (item) =>
//                 item.survey_section_number + " " + item.survey_section_title
//             )
//           );
//           setSurveySectionsData(survey.data);
//         }
//       }
//     } catch (error) {
//       // console.log(error);
//     }
//   };

//   // getSurveyQuestions api function

//   const getSurveyQuestions = async () => {
//     try {
//       const response = await fetch(
//         `${baseUrl}/api/survey/getSurveyQuestionsguidedSelling`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             // Authorization: `Bearer ${user.token}`,
//           },
//           body: JSON.stringify({ survey_key: survey_id }),
//         }
//       );
//       if (response.ok) {
//         const survey = await response.json();
//         if (survey.status == "Success") {
//           setOptionQUE(
//             survey.data.map(
//               (item) =>
//                 item.survey_questions_num + " " + item.survey_questions_name
//             )
//           );

//           setSurveyQuestionsData(survey.data);
//         }
//       }
//     } catch (error) {
//       // console.log(error);
//     }
//   };

//   // useEffect(() => {
//   //   setActionName(action_data ? action_data.action_name : "");
//   //   setAction_key(action_data ? action_data._id : "");
//   // }, [action_data]);

//   const [sheetNames, setSheetNames] = useState([]);
//   useEffect(() => {
//     const storedSheetNames = Cookies.get("sheetNames");
//     if (storedSheetNames) {
//       const parsedSheetNames = JSON.parse(storedSheetNames);
//       setSheetNames(parsedSheetNames);
//     }
//   }, []);
//   // Extract sheet names from the array of objects
//   const pcrTab =
//     sheetNames && sheetNames.length > 0
//       ? sheetNames.map((pcrtab) => pcrtab.sheetName)
//       : [];
//   const pcrCalcTab = [...(pcrTab || "")];

//   // for template merge

//   const [templateId, setTemplateId] = useState("");
//   const [dbTemplateData, setDbTemplateData] = useState([]);
//   const [doctypePublished, setDoctypePublished] = useState([]);

//   const [selectedOptionsContentdoctype, setSelectedOptionsContentdoctype] =
//     useState([]);

//   useEffect(() => {
//     const gettemplatedata = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/api/template/get`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             // Authorization: `Bearer ${user.token}`,
//           },
//         });
//         if (response.ok) {
//           const template = await response.json();
//           setDbTemplateData(template.data);

//           if (dbTemplateData == null) {
//             try {
//               const tempDaata = template.data;
//             } catch (error) {
//               // console.log(error);
//             }
//           }
//         } else {
//         }
//       } catch (error) {
//         // console.log(error);
//       }
//     };

//     gettemplatedata();
//   }, [user,actionsData]);

//   useEffect(() => {
//     const getDoctypedata = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/api/doctype/get`, {
//           method: "GET",
//           headers: {
//             "Doctype-Type": "application/json",
//             // Authorization: `Bearer ${user.token}`,
//           },
//         });
//         if (response.ok) {
//           const doctype = await response.json();
//           setDoctypePublished(
//             doctype.data.filter((item) => item.status === "PUBLISHED")
//           );
//         } else {
//         }
//       } catch (error) {
//         // console.log(error);
//       }
//     };
//     getDoctypedata();
//   }, [user,actionsData]);
//   // Map dbTemplateData to create options for the dropdown

//   let templates =
//     dbTemplateData.length > 0
//       ? dbTemplateData.map((tempNames) => tempNames.quote_name)
//       : [];

//   const optionTEMPLATEMERGE = templates;

//   const [selectedTemplate, setSelectedTemplate] = useState(null);

//   return (
//     <div>
//       {actionsData.map((action, index) => (
//         // <div key={action.key}>
//         //   <div className="actionmaindiv">
//         //     <button className="actionangle">
//         //       <FontAwesomeIcon
//         //         icon={action.isDropdownOpen ? faAngleUp : faAngleDown}
//         //         id={`angledowaction-${action.key}`}
//         //         onClick={() => toggleDropdownaction(index)}
//         //       />
//         //     </button>

//         //     <label className="labelaction">
//         //       Action - {sectionCount}.{rulesectionCount}.{action.actionCount}
//         //     </label>

//         //     <input
//         //       type="text"
//         //       className="inputaction"
//         //       defaultValue={action.survey_action_name}
//         //       value={
//         //         action.selectedOption
//         //           ? action.selectedOption
//         //             .toLowerCase()
//         //             .split(" ")
//         //             .map(
//         //               (word) => word.charAt(0).toUpperCase() + word.slice(1)
//         //             )
//         //             .join(" ")
//         //           : ""
//         //       }
//         //       onChange={(e) =>
//         //         setActionSections((prevSections) =>
//         //           prevSections.map((a, i) =>
//         //             i === index ? { ...a, selectedOption: e.target.value } : a
//         //           )
//         //         )
//         //       }
//         //       readOnly
//         //     />
//         //   </div>
//         //   {action.isDropdownOpen && (
//         //     <div className="dropactionaction">
//         //       <div className="dropactionmain">
//         //         <label className="labelaction2">
//         //           {sectionCount}.{rulesectionCount}.{action.actionCount}
//         //         </label>
//         //         <CustomDropdown
//         //           options={optionsaction}
//         //           onSelect={(option) => handleActionSelect(option, index)}
//         //           label="ACTION"
//         //           value={
//         //             action.selectedOption
//         //               ? action.selectedOption
//         //                 .toLowerCase()
//         //                 .split(" ")
//         //                 .map(
//         //                   (word) => word.charAt(0).toUpperCase() + word.slice(1)
//         //                 )
//         //                 .join(" ")
//         //               : ""
//         //           }
//         //           onChange={(value) =>
//         //             setActionSections((prevSections) =>
//         //               prevSections.map((a, i) =>
//         //                 i === index ? { ...a, selectedOption: value } : a
//         //               )
//         //             )
//         //           }
//         //         />
//         //         {action.selectedOption === "SHOW SECTION" && (
//         //           <div className="showsection">
//         //             <CustomDropdown
//         //               options={optionshow}
//         //               onSelect={handleActionSelect1}
//         //               label="SECTION"
//         //               value={actionName == "SHOW SECTION" ? actionSectionsQuestions? actionSectionsQuestions:action.selectedOption1 : ""}
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}

//         //         {action.selectedOption === "SHOW QUESTION" && (
//         //           <div className="showquestion">
//         //             <CustomDropdown
//         //               options={optionQUE}
//         //               onSelect={handleActionSelect1}
//         //               label="QUESTION"
//         //               value={actionName == "SHOW QUESTION" ? actionSectionsQuestions? actionSectionsQuestions:action.selectedOption1 : ""}

//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "HIDE QUESTION" && (
//         //           <div className="hidequestion">
//         //             <CustomDropdown
//         //               options={optionQUE}
//         //               onSelect={handleActionSelect1}
//         //               label="QUESTION"
//         //               value={actionName == "HIDE QUESTION" ? actionSectionsQuestions? actionSectionsQuestions:action.selectedOption1 : ""}

//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "HIDE SECTION" && (
//         //           <div className="hidesection">
//         //             <CustomDropdown
//         //               options={optionshow}
//         //               onSelect={handleActionSelect1}
//         //               label="SECTION"
//         //               value={actionName == "HIDE SECTION" ? actionSectionsQuestions? actionSectionsQuestions:action.selectedOption1 : ""}

//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "RESUME CALCULATIONS" && (
//         //           <div className="resumecalcdele">
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "BID TEAM: CLEAR" && (
//         //           <div className="resumebiddele">
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "REFRESH FORMULAS" && (
//         //           <div className="resumebiddeleFORMULAS">
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "TEMPLATE MERGE" && (
//         //           <div className="templatemerge">
//         //             <CustomDropdown
//         //               options={optionTEMPLATEMERGE}
//         //               onSelect={(value) => handleActionSelect1(value, index)}
//         //               label="TEMPLATE"
//         //               value={action.selectedTemplate}
//         //               onChange={(value) =>
//         //                 setActionSections((prevSections) =>
//         //                   prevSections.map((a, i) =>
//         //                     i === index ? { ...a, selectedTemplate: value } : a
//         //                   )
//         //                 )
//         //               }
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "TEMPLATE OVERWRITE" && (
//         //           <div className="templateoveright">
//         //             <CustomDropdown
//         //               options={optionTEMPLATEOVERIGHT}
//         //               onSelect={handleActionSelect1}
//         //               label="TEMPLATE"
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "QUOTE: UNMERGE" && (
//         //           <div className="quoteunmerge">
//         //             <CustomDropdown
//         //               options={optionQUOTEUNMERGE}
//         //               onSelect={handleActionSelect1}
//         //               label="QUOTE"
//         //               Placeholder={"View"}
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "SURVEY: UNMERGE" && (
//         //           <div className="surveyunmerge">
//         //             <CustomDropdown
//         //               options={optionSURVEYUNMERGE}
//         //               onSelect={handleActionSelect1}
//         //               label="SURVEY TEMPLATE"
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "QUOTE: REFRESH" && (
//         //           <div className="quoterefresh">
//         //             <CustomDropdown
//         //               options={optionQUOTEREFRESH}
//         //               onSelect={handleActionSelect1}
//         //               label="QUOTE"
//         //               Placeholder={"View"}
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "SECTION: SET READ - ONLY" && (
//         //           <div className="setreadonly">
//         //             <CustomDropdown
//         //               options={optionSETREADONLY}
//         //               onSelect={handleActionSelect1}
//         //               label="SECTION"
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "MAKE REQUIRED" && (
//         //           <div className="makerequired">
//         //             <CustomDropdown
//         //               options={makeRequiredOption}
//         //               onSelect={handleActionSelect1}
//         //               label="VALUE"
//         //               Placeholder={"Value"}
//         //             />

//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "STAGE: SET DURATION" && (
//         //           <>
//         //             <div id="setDuration">
//         //               <CustomDropdown
//         //                 options={optionSETDURATION}
//         //                 onSelect={handleActionSelect1}
//         //                 label="TEMPLATE"
//         //               />
//         //               <div className="setDurationdele">
//         //                 <DeleteAction
//         //                   onDelete={() => deleteActionSection(index)}
//         //                 />
//         //               </div>
//         //             </div>
//         //           </>
//         //         )}
//         //         {action.selectedOption === "STAGE: RESIZE +/- DAYS" && (
//         //           <div className="stageresizedays">
//         //             <CustomDropdown
//         //               options={optionStagedays}
//         //               onSelect={handleActionSelect1}
//         //               label="TEMPLATE"
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "STAGE: RESIZE +/-%" && (
//         //           <div className="stageresize">
//         //             <CustomDropdown
//         //               options={optionresize}
//         //               onSelect={handleActionSelect1}
//         //               label="TEMPLATE"
//         //             />
//         //             <div className="resizedalestage">
//         //               <DeleteAction
//         //                 onDelete={() => deleteActionSection(index)}
//         //               />
//         //             </div>
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "CONTENT: REMOVE" && (
//         //           <>
//         //             <div id="contentremoveDuplicates">
//         //               <CustomDropdown
//         //                 options={optioncontentremove}
//         //                 onSelect={handleActionSelect1}
//         //                 label="TEMPLATE"
//         //               />
//         //               <div className="delecontentremove">
//         //                 <DeleteAction
//         //                   onDelete={() => deleteActionSection(index)}
//         //                 />
//         //               </div>
//         //             </div>
//         //           </>
//         //         )}
//         //         {action.selectedOption === "CONTENT: REMOVE DUPLICATES" && (
//         //           <div id="removeDuplicates">
//         //             <CustomDropdown
//         //               options={removeDuplicatesOption}
//         //               onSelect={handleActionSelect1}
//         //               label="CATALOG CONTENT"
//         //             />
//         //             <div className="cotentremovedele">
//         //               {" "}
//         //               <DeleteAction
//         //                 onDelete={() => deleteActionSection(index)}
//         //               />
//         //             </div>
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "STAGE: REMOVE" && (
//         //           <div className="stageremove">
//         //             <CustomDropdown
//         //               options={optionStageremove}
//         //               onSelect={handleActionSelect1}
//         //               label="TEMPLATE"
//         //             />
//         //             <div className="removedele">
//         //               <DeleteAction
//         //                 onDelete={() => deleteActionSection(index)}
//         //               />
//         //             </div>
//         //           </div>
//         //         )}
//         //         {action.selectedOption ===
//         //           "REFRESH CALCS & FORMULA ON APPLY" && (
//         //             <div className="refreshcalc">
//         //               <div className="inputresumecalc">
//         //                 <input type="checkbox" className="inputresume"></input>
//         //                 <label className="labelresume">
//         //                   ADD ADDITIONAL FORMULAS REFRESH BEFORE CALCS
//         //                 </label>
//         //               </div>
//         //               <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //             </div>
//         //           )}
//         //         {action.selectedOption === "DOCTYPES: SET DOCTYPES LIST" && (
//         //           <div className="setdoctypeslist">
//         //             <DoctypeDropdown
//         //               options={optionsdoctype}
//         //               onSelect={handleActionDoctype}
//         //               label="DOCTYPE LIST"
//         //               placeholder={"No selected Items"}
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "SURVEY: MERGE" && (
//         //           <div className="survey-merge-grid">
//         //             <div className="vanita">
//         //               <CustomDropdown
//         //                 options={optionssurveymerze}
//         //                 onSelect={handleActionSelect1}
//         //                 label="SURVEY TEMPLATE"
//         //               />
//         //               <CustomDropdown
//         //                 options={optionssurveymerzeAFTER}
//         //                 onSelect={handleActionSelect1}
//         //                 label="MERGE AFTER"
//         //               />
//         //             </div>
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "QUOTE: MERGE" && (
//         //           <div className="quote-merge-grid">
//         //             <CustomDropdown
//         //               options={optionsquotemerge1}
//         //               onSelect={handleActionSelect1}
//         //               label="QUOTE"
//         //             />
//         //             <CustomDropdown
//         //               options={optionsquotemerge2}
//         //               onSelect={handleActionSelect1}
//         //               label="CONTENT OPTIONS"
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "SERVICE: REMOVE" && (
//         //           <div className="serviceremovegrid">
//         //             <CustomDropdown
//         //               options={optionsserviceremove1}
//         //               onSelect={handleActionSelect1}
//         //               label="TEMPLATE"
//         //             />

//         //             <CustomDropdown
//         //               options={optionsserviceremove2}
//         //               onSelect={handleActionSelect1}
//         //               label="SERVICE"
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "PROCESS CALC RANGE(PCR)" && (
//         //           <div className="pcrgrid">
//         //             <CustomDropdown
//         //               options={pcrCalcTab}
//         //               onSelect={handleActionSelect1}
//         //               label="CALC TAB"
//         //               value={selectedOption1}
//         //             />
//         //             <div>
//         //               <ErrorMessage
//         //                 showFlaxErrorMessageText={true}
//         //                 label="CALC CELL"
//         //                 errormsg="PCR IS A REQUIRED FIELD"
//         //               />
//         //             </div>
//         //             <CustomDropdown
//         //               options={pcrCalcTemplate}
//         //               onSelect={handleActionSelect1}
//         //               label="TEMPLATE"
//         //             />
//         //             <div className="setanswerdele">
//         //               <DeleteAction
//         //                 onDelete={() => deleteActionSection(index)}
//         //               />
//         //             </div>
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "SHOW VALIDATION" && (
//         //           <div className="showvalidation">
//         //             <ErrorMessage
//         //               showFlaxErrorMessageText={true}
//         //               label="MESSAGE"
//         //               errormsg="MESSAGE IS A REQUIRED FIELD"
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "CONTENT: ADD CATALOG CONTENT" && (
//         //           <>
//         //             <div id="catalogDiv">
//         //               <CustomDropdown
//         //                 options={optioncatalogContent}
//         //                 onSelect={handleActionSelect1}
//         //                 label={"CATALOG CONTENT"}
//         //               />
//         //               <CalcSheetPointer
//         //                 atqLabel="DOC TYPE FROM QUESTION"
//         //                 valueLabel="DOC TYPE AS VALUE"
//         //                 tabLabel="DOC TYPE TAB"
//         //                 cellLabel="DOC TYPE CELL"
//         //                 optionValue={cataloglist2}
//         //               />
//         //             </div>
//         //           </>
//         //         )}
//         //         {action.selectedOption === "QUOTE:SET QUOTE NAME" && (
//         //           <div className="setquotename">
//         //             <CalcSheetPointer
//         //               atqLabel="QUOTE NAME FROM QUESTION"
//         //               valueLabel="QUOTE NAME AS VALUE"
//         //               tabLabel="QUOTE NAME TAB"
//         //               cellLabel="QUOTE NAME CELL"
//         //             />
//         //             <div className="setquotedele">
//         //               <DeleteAction
//         //                 onDelete={() => deleteActionSection(index)}
//         //               />
//         //             </div>
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "QUOTE: SET START DATE" && (
//         //           <div className="setstartdate">
//         //             <ValueList
//         //               atqLabel="QUOTE START DATE FROM QUESTION"
//         //               valueLabel="QUOTE START FROM VALUE"
//         //               tabLabel="QUOTE START TAB"
//         //               cellLabel="QUOTE START CELL"
//         //               inputType="CALENDAR"
//         //               selectedCloseDate={selectedCalendarDate}
//         //               onCalendarChange={handleCalendarChange}
//         //               selectedOption={selectedOption}
//         //               onOptionChange={handleOptionChange}
//         //             />
//         //             <div className="startdatedelee">
//         //               <DeleteAction
//         //                 onDelete={() => deleteActionSection(index)}
//         //               />
//         //             </div>
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "QUOTE: SET DISCOUNT" && (
//         //           <div className="setdiscount">
//         //             <CalcSheetPointer
//         //               atqLabel="DISCOUNT FROM QUESTION"
//         //               valueLabel="DISCOUNT AS VALUE"
//         //               tabLabel="DISCOUNT TAB"
//         //               cellLabel="DISCOUNT CELL"
//         //             />
//         //             <div className="setdiscountdele">
//         //               <DeleteAction
//         //                 onDelete={() => deleteActionSection(index)}
//         //               />
//         //             </div>
//         //           </div>
//         //         )}

//         //         {action.selectedOption === "QUOTE: SET ORG" && (
//         //           <div className="setorg">
//         //             <CalcSheetPointer
//         //               options={optionsetorg}
//         //               onSelect={handleActionSelect1}
//         //               anstoque="addstagewidthwidthservice"
//         //               atqLabel="ORG FROM QUESTION"
//         //               valueLabel="ORG AS VALUE"
//         //               tabLabel="ORG TAB"
//         //               cellLabel="ORG CELL"
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "SERVICE: ADD" && (
//         //           <div className="serviceadd">
//         //             <CalcSheetPointer
//         //               options={optionserviceadd}
//         //               onSelect={handleActionSelect1}
//         //               anstoque="addstagewidthwidthservice"
//         //               atqLabel="NAME FROM QUESTION"
//         //               valueLabel="NAME AS VALUE"
//         //               tabLabel="NAME TAB"
//         //               cellLabel="NAME CELL"
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "SET ANSWER" && (
//         //           <div id="setAnswerMainDiv">
//         //             <CustomDropdown
//         //               options={setAnswerQuestionOptions}
//         //               onSelect={handleActionSelect1}
//         //               label="QUESTION"
//         //               Placeholder={"Question"}
//         //             />

//         //             <CalcSheetPointer
//         //               atqLabel="SET ANSWER FROM QUESTION"
//         //               valueLabel="SET ANSWER AS VALUE"
//         //               tabLabel="SET ANSWER TAB"
//         //               cellLabel="SET ANSWER CELL"
//         //             />

//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}

//         //         {action.selectedOption === "QUOTE: SET CURRENCY" && (
//         //           <div className="setcurrency">
//         //             <ValueList
//         //               optionValue={currencyList}
//         //               atqLabel="CURRENCY CODE FROM QUESTION"
//         //               valueLabel="CURRENCY CODE AS VALUE"
//         //               tabLabel="CURRENCY TAB"
//         //               cellLabel="CURRENCY CELL"
//         //               selectedCloseDate={selectedCalendarDate}
//         //               onCalendarChange={handleCalendarChange}
//         //               selectedOption={selectedOption}
//         //               onOptionChange={handleOptionChange}
//         //             />
//         //             <div className="setcurrencydele">
//         //               <DeleteAction
//         //                 onDelete={() => deleteActionSection(index)}
//         //               />
//         //             </div>
//         //           </div>
//         //         )}

//         //         {action.selectedOption === "QUOTE: SET CUSTOM FIELD" && (
//         //           <div className="setcustomfield">
//         //             <CustomDropdown
//         //               options={setCustomQuestionOptions}
//         //               onSelect={handleActionSelect1}
//         //               label="CUSTOM FIELD"
//         //             />
//         //             <CalcSheetPointer
//         //               atqLabel="SET CUSTOM FIELD 1 FROM QUESTION"
//         //               valueLabel="SET CUSTOM FIELD 1 AS VALUE"
//         //               tabLabel="SET CUSTOM FIELD 1 TAB"
//         //               cellLabel="SET CUSTOM FIELD 1 CELL"
//         //             />

//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "SET ANSWER ON APPLY" && (
//         //           <div className="answapply">
//         //             <CustomDropdown
//         //               options={optionSetAnswer}
//         //               onSelect={handleActionSelect1}
//         //               label={"QUESTION"}
//         //               Placeholder={"Question"}
//         //             />
//         //             <CalcSheetPointer
//         //               atqLabel="SET ANSWER FROM QUESTION"
//         //               doctypetab="addstagewidthwidthclac"
//         //               valueLabel="SET ANSWER AS VALUE"
//         //               tabLabel="SET ANSWER TAB"
//         //               cellLabel="SET ANSWER CELL"
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "STAGE: ADD" && (
//         //           <div id="stageadddiv">
//         //             <CalcSheetPointer
//         //               atqLabel="STAGE NAME FROM QUESTION"
//         //               valueLabel="STAGE NAME AS VALUE"
//         //               tabLabel="STAGE NAME TAB"
//         //               cellLabel="STAGE NAME CELL"
//         //             />
//         //             <CalcSheetPointer
//         //               atqLabel="DEFAULT DURATION DAYS FROM QUESTION"
//         //               valueLabel="DEFAULT DURATION DAYS AS VALUE"
//         //               tabLabel="DEFAULT DURATION DAYS TAB"
//         //               cellLabel="DEFAULT DURATION DAYS CELL"
//         //             />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "SET CALC CELL" && (
//         //           <div id="setcalccell">
//         //             <CustomDropdown
//         //               options={optionssetcalcell1}
//         //               onSelect={handleActionSelect1}
//         //               label="CALC TAB"
//         //             />
//         //             <div>
//         //               <ErrorMessage
//         //                 showFlaxErrorMessageText={true}
//         //                 label="CALC CELL"
//         //                 errormsg="CALC CELL IS REQUIRED FIELD"
//         //               />
//         //             </div>
//         //             <CalcSheetPointer
//         //               dropdownCustom="optiondropcell"
//         //               atqLabel="VALUE FROM QUESTION"
//         //               valueLabel="VALUE AS VALUE"
//         //               tabLabel="VALUE TAB"
//         //               cellLabel="VALUE CELL"
//         //             />
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         )}
//         //         {action.selectedOption ===
//         //           "CONTENT: REPLACE TAGGED CONTENT" && (
//         //             <>
//         //               <ErrorMessage
//         //                 showFlaxErrorMessageText={true}
//         //                 label="FIND TAG"
//         //                 errormsg="FIND TAG REQUIRED FIELD"
//         //               />
//         //             </>
//         //           )}
//         //         {action.selectedOption === "CONTENT: REPLACE TAG" && (
//         //           <>
//         //             <ErrorMessage
//         //               showFlaxErrorMessageText={true}
//         //               label="FIND TAG"
//         //               errormsg="FIND TAG IS A REQUIRED FIELD"
//         //             />
//         //           </>
//         //         )}
//         //         {action.selectedOption === "SERVICE: UPDATE" && (
//         //           <div id="updateDiv">
//         //             <CustomDropdown
//         //               options={optionTemp}
//         //               onSelect={handleActionSelect1}
//         //               label="TEMPLATE"
//         //             />

//         //             <CustomDropdown
//         //               options={optionSer}
//         //               onSelect={handleActionSelect1}
//         //               label="SERVICE"
//         //             />
//         //           </div>
//         //         )}

//         //         {action.selectedOption === "SERVICE: SET START DATE" && (
//         //           <div id="setstartdateDiv">
//         //             <CustomDropdown
//         //               options={optionTemplate}
//         //               onSelect={handleActionSelect1}
//         //               label="TEMPLATE"
//         //             />

//         //             <CustomDropdown
//         //               options={optionService}
//         //               onSelect={handleActionSelect1}
//         //               label="SERVICE"
//         //             />
//         //           </div>
//         //         )}
//         //         {action.selectedOption === "CONTENT: ADD" && (
//         //           <>
//         //             <div id="contentadddiv">
//         //               <CalcSheetPointer
//         //                 atqLabel="DOCTYPE FROM QUESTION"
//         //                 valueLabel="DOCTYPE AS VALUE"
//         //                 tabLabel="DOCTYPE TAB"
//         //                 cellLabel="DOCTYPE CELL"
//         //               />

//         //               <CalcSheetPointer
//         //                 atqLabel="SECTION FROM QUESTION"
//         //                 valueLabel="SECTION AS VALUE"
//         //                 tabLabel="SECTION TAB"
//         //                 cellLabel="SECTION CELL"
//         //               />
//         //             </div>
//         //           </>
//         //         )}

//         //         {action.selectedOption === "QUOTE: SET PRICING MODEL" && (
//         //           <div id="setpricingmodeldiv">
//         //             <CustomDropdown
//         //               options={optionSetpricingmodel}
//         //               onSelect={handleActionSelect1}
//         //               label="PRICING MODEL"
//         //               Placeholder={"Price Model"}
//         //             />

//         //             {displayCalcSheetPointer && (
//         //               <div className="pricedele">
//         //                 <CalcSheetPointer
//         //                   atqLabel="PRICE FROM QUESTION"
//         //                   valueLabel="PRICE AS VALUE"
//         //                   tabLabel="PRICE TAB"
//         //                   cellLabel="PRICE CELL"
//         //                 />
//         //                 <div className="pricingdelee1">
//         //                   <DeleteAction
//         //                     onDelete={() => deleteActionSection(index)}
//         //                   />
//         //                 </div>
//         //               </div>
//         //             )}

//         //             {margindisplayCalcSheetPointer && (
//         //               <div className="margindele">
//         //                 <CalcSheetPointer
//         //                   atqLabel="MARGIN FROM QUESTION"
//         //                   valueLabel="MARGIN AS VALUE"
//         //                   tabLabel="MARGIN TAB"
//         //                   cellLabel="MARGIN CELL"
//         //                 />
//         //                 <div className="pricingdelee1">
//         //                   <DeleteAction
//         //                     onDelete={() => deleteActionSection(index)}
//         //                   />
//         //                 </div>
//         //               </div>
//         //             )}
//         //             {displayCalcSheetPointerservicelevel && (
//         //               <div className="pricingdelee">
//         //                 <DeleteAction
//         //                   onDelete={() => deleteActionSection(index)}
//         //                 />
//         //               </div>
//         //             )}
//         //           </div>
//         //         )}
//         //       </div>
//         //     </div>
//         //   )}
//         //   {action.isDropdownOpen && (
//         //     <>
//         //       {action.selectedOption === "CONTENT: ADD CATALOG CONTENT" && (
//         //         <div className="addcatalog">
//         //           <ValueList
//         //             atqLabel="SECTION FROM QUESTION"
//         //             valueLabel="SECTION AS VALUE"
//         //             tabLabel="SECTION TAB"
//         //             cellLabel="SECTION CELL"
//         //             optionValue={cataloglist}
//         //             selectedCloseDate={selectedCalendarDate}
//         //             onCalendarChange={handleCalendarChange}
//         //             selectedOption={selectedOption}
//         //             onOptionChange={handleOptionChange}
//         //           />
//         //           <div className="addcatalogdele">
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         </div>
//         //       )}
//         //       {action.selectedOption === "CONTENT: REPLACE TAGGED CONTENT" && (
//         //         <div className="replacetaggedcontentGrid">
//         //           <CalcSheetPointer
//         //             atqLabel="REPLACE WITH FROM QUESTION"
//         //             valueLabel="REPLACE WITH AS VALUE"
//         //             tabLabel="REPLACE WITH TAB"
//         //             cellLabel="REPLACE WITH CELL"
//         //           />
//         //           <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //         </div>
//         //       )}

//         //       {action.selectedOption === "CONTENT: REPLACE TAG" && (
//         //         <div id="replacetagDiv2">
//         //           <CalcSheetPointer
//         //             atqLabel="REPLACE WITH FROM QUESTION"
//         //             valueLabel="REPLACE WITH AS VALUE"
//         //             tabLabel="REPLACE WITH TAB"
//         //             cellLabel="REPLACE CELL"
//         //           />

//         //           <CustomDropdown
//         //             options={optionReplaceTag}
//         //             onSelect={handleActionSelect1}
//         //             label="OR REPLACE WITH"
//         //             dropdownClass="replacetaglist"
//         //             Placeholder="Replace With Field"
//         //           />
//         //           <div className="replacetagdele">
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         </div>
//         //       )}

//         //       {action.selectedOption === "CONTENT: ADD" && (
//         //         <div className="contentadderromsg">
//         //           <ErrorMessage
//         //             showFlaxErrorMessageText={true}
//         //             label="CODE"
//         //             errormsg="CODE IS A REQUIRED FIELD"
//         //             style={{ width: "25%" }}
//         //           />
//         //         </div>
//         //       )}

//         //       {action.selectedOption === "CONTENT: ADD" && (
//         //         <div id="contentaddDiv3">
//         //           <FroalaEditorComponent
//         //             tag="textarea"
//         //             config={editorConfig}
//         //             onModelChange={handleModelChange}
//         //           />
//         //           <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //         </div>
//         //       )}

//         //       {action.selectedOption === "SERVICE: SET START DATE" && (
//         //         <div id="setstartdateGrid">
//         //           <CalcSheetPointer
//         //             atqLabel="START DATE FROM QUESTION"
//         //             valueLabel="START DATE AS VALUE"
//         //             tabLabel="START DATE TAB"
//         //             cellLabel="START DATE CELL"
//         //             selectedOption={selectedOption}
//         //             onOptionChange={handleOptionChange}
//         //           />
//         //           <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //         </div>
//         //       )}
//         //       {action.selectedOption === "SERVICE: UPDATE" && (
//         //         <div id="updateGrid">
//         //           <CalcSheetPointer
//         //             atqLabel="SERVICE NAME FROM QUESTION"
//         //             valueLabel="SERVICE NAME AS VALUE"
//         //             tabLabel="SERVICE NAME TAB"
//         //             cellLabel="SERVICE NAME CELL"
//         //           />

//         //           <CalcSheetPointer
//         //             atqLabel="SERVICE CATEGORY FROM QUESTION"
//         //             valueLabel="SERVICE CATEGORY AS VALUE"
//         //             tabLabel="SERVICE CATEGORY TAB"
//         //             cellLabel="SERVICE CATEGORY CELL"
//         //           />

//         //           <CalcSheetPointer
//         //             atqLabel="SERVICE LOCATION FROM QUESTION"
//         //             valueLabel="SERVICE LOCATION AS VALUE"
//         //             tabLabel="SERVICE LOCATION TAB"
//         //             cellLabel="SERVICE LOCATION CELL"
//         //           />
//         //         </div>
//         //       )}

//         //       {action.selectedOption === "SERVICE: UPDATE" && (
//         //         <div id="updateGrid2">
//         //           <CalcSheetPointer
//         //             atqLabel="SERVICE EXTERNAL SKU 1 FROM QUESTION"
//         //             valueLabel="SERVICE EXTERNAL SKU 1 AS VALUE"
//         //             tabLabel="SERVICE EXTERNAL SKU 1 TAB"
//         //             cellLabel="SERVICE EXTERNAL SKU 1 CELL"
//         //           />

//         //           <CalcSheetPointer
//         //             atqLabel="SERVICE EXTERNAL SKU 1 DESCRIPTION FROM QUESTION"
//         //             valueLabel="SERVICE EXTERNAL 1 DESCRIPTION AS VALUE"
//         //             tabLabel="SERVICE EXTERNAL SKU 1 DESCRIPTION TAB"
//         //             cellLabel="SERVICE EXTERNAL SKU 1 DESCRIPTION CELL"
//         //             labelforverticl="labelfortabclacUPDATEGRID2"
//         //           />

//         //           <CalcSheetPointer
//         //             atqLabel="SERVICE EXTERNAL SKU 2 FROM QUESTION"
//         //             valueLabel="SERVICE EXTERNAL SKU 2 AS VALUE"
//         //             tabLabel="SERVICE EXTERNAL SKU 2 TAB"
//         //             cellLabel="SERVICE EXTERNAL SKU 2 CELL"
//         //           />
//         //         </div>
//         //       )}

//         //       {action.selectedOption === "SERVICE: UPDATE" && (
//         //         <div id="updateGrid3">
//         //           <CalcSheetPointer
//         //             atqLabel="SERVICE EXTERNAL SKU 2 DESCRIPTION FROM QUESTION"
//         //             valueLabel="SERVICE EXTERNAL SKU 2 DESCRIPTION AS VALUE"
//         //             tabLabel="SERVICE EXTERNAL SKU 2 DESCRIPTION TAB"
//         //             cellLabel="SERVICE EXTERNAL SKU 2 DESCRIPTION CELL"
//         //           />
//         //           <CalcSheetPointer
//         //             atqLabel="SERVICE EXTERNAL REF ID 1 FROM QUESTION "
//         //             valueLabel="SERVICE EXTERNAL REF ID 1 AS VALUE"
//         //             tabLabel="SERVICE EXTERNAL REF ID 1 TAB"
//         //             cellLabel="SERVICE EXTERNAL REF ID 1 CELL"
//         //           />
//         //           <CalcSheetPointer
//         //             atqLabel="SERVICE EXTERNAL REF ID 2 FROM QUESTION"
//         //             valueLabel="SERVICE EXTERNAL REF ID 2 AS VALUE"
//         //             tabLabel="SERVICE EXTERNAL REF ID 2 TAB"
//         //             cellLabel="SERVICE EXTERNAL REF ID 2 CELL"
//         //             labelforverticl="labelfortabclac"
//         //           />
//         //           <div className="deleserviceupdate">
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         </div>
//         //       )}

//         //       {action.selectedOption === "SURVEY: MERGE" && (
//         //         <div className="vasundra">
//         //           <DoctypeDropdown
//         //             placeholder="Select tabs to merge?"
//         //             label="CALC SHEET TABS"
//         //             options={optionsdoctype1}
//         //             onSelect={(selectedOptions) => {
//         //               console.log(selectedOptions);
//         //             }}
//         //             customInput="your-custom-input-class"
//         //             customdropdowndoc="custom"
//         //           />
//         //           <div className="deletemergesurvey">
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         </div>
//         //       )}
//         //       {action.selectedOption === "STAGE: ADD" && (
//         //         <div className="customdropdownv">
//         //           <CustomDropdown
//         //             options={optionssetcalctab2stageadd}
//         //             onSelect={handleActionSelect1}
//         //             label="TEMPLATE"
//         //           />

//         //           <CustomDropdown
//         //             options={optionssetstageadd}
//         //             onSelect={handleActionSelect1}
//         //             label="SERVICE"
//         //           />
//         //           <div className="stageadddele">
//         //             <DeleteAction onDelete={() => deleteActionSection(index)} />
//         //           </div>
//         //         </div>
//         //       )}
//         //     </>
//         //   )}
//         // </div>
//         <Action
//             survey_id={survey_id}
//             sectionId={sectionId}
//             rules_key={rules_key}
//             key={action.key}
//             index={index}
//             actionCount={action.actionCount}
//             rulesectionCount = {rulesectionCount}
//             sectionCount = {sectionCount}
//             onDelete={(i) => deleteActionSection(i)}
//             surveySectionsData={surveySectionsData}
//             surveyQuestionsData={surveyQuestionsData}
//             action={action}
//             optionshow={optionshow}
//             optionQUE={optionQUE}
//         />
//       ))}
//       {actionSections.map((action, index) => (
//         <Action
//         survey_id={survey_id}
//         sectionId={sectionId}
//         rules_key={rules_key}
//         key={action.key}
//         index={index}
//         actionCount={action.actionCount}
//         rulesectionCount = {rulesectionCount}
//         sectionCount = {sectionCount}
//         onDelete={() => deleteActionSection(action.actionCount)}
//         surveySectionsData={surveySectionsData}
//         surveyQuestionsData={surveyQuestionsData}
//         action={action}
//         optionshow={optionshow}
//         optionQUE={optionQUE}
//     />
//       ))}
//       <button className="addactionbtn" onClick={addActionSection}>
//         + ADD ACTION
//       </button>
//       {/* <button id="save_data" onClick={addAction}> */}
//         {/* SAVE */}
//       {/* </button> */}
//     </div>
//   );
// };
// export default AddAction;
