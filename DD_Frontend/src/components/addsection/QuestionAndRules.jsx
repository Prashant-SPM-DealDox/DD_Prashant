// import React, { useEffect, useState } from "react";
// import "../../assets/css/addsection/QuestionAndRules.css";
// import AddQuestionSection from "../../components/addsection/AddQuestionSection";
// import AddRule from '../../components/addsection/AddRule';

// function QuestionsAndRules({ survey_id, sectionId, sectionCount, showFlag, rulebtnsdivcustom, questions_data, rules_data }) {
//   const [questionSections, setQuestionSections] = useState([]);
//   const [selectedElement, setSelectedElement] = useState("questions");
//   const [ruleSections, setRuleSections] = useState([]);
//   const [inputValues,] = useState([]);
//   const [questionData, setQuestionData] = useState([]);
//   const [rulesData, setRulesData] = useState([]);

//   const addQuestionSection = () => {
//     // alert(survey_id)
//     // alert(sectionId)

//     const newCount = questionSections.length + questions_data.length + 1;
//     // alert(newCount)
//     setQuestionSections((prevSections) => [
//       ...prevSections,
//       {
//         key: newCount,
//         questionsectionCount: newCount,
//         sectionCount: sectionCount,
//         isSectionVisible: true,
//       },
//     ]);
//   };
//   const moveQuestionSectionUp = (questionsectionCount) => {
//     const index = questionSections.findIndex((section) => section.questionsectionCount === questionsectionCount);
//     if (index > 0) {
//       const newSections = [...questionSections];
//       const movedSection = newSections.splice(index, 1)[0];

//       newSections.splice(index - 1, 0, movedSection);

//       newSections.forEach((section, newIndex) => {
//         section.questionsectionCount = newIndex + 1;
//       });

//       setQuestionSections(newSections);
//     }
//   };

//   const moveQuestionSectionDown = (questionsectionCount) => {
//     const index = questionSections.findIndex((section) => section.questionsectionCount === questionsectionCount);
//     if (index < questionSections.length - 1) {
//       const newSections = [...questionSections];
//       const movedSection = newSections.splice(index, 1)[0];
//       newSections.splice(index + 1, 0, movedSection);

//       newSections.forEach((section, index) => {
//         section.questionsectionCount = index + 1;
//       })
//       setQuestionSections(newSections);
//     }
//   };

//   const deleteQuestionSection = (sectionToDelete) => {
//     const updatedSections = questionSections.filter(
//       (section) => section.questionsectionCount !== sectionToDelete
//     );
//     const renumberedSections = updatedSections.map((section, index) => ({
//       ...section,
//       questionsectionCount: index + 1,
//     }));
//     setQuestionSections(renumberedSections);
//   };
//   // rule js
//   const addRuleSection = () => {
//     // const newRuleCount = ruleSections.length + rules_data.length + 1;
//     const newRuleCount = sectionCount+ ruleSections.length+rules_data.length;

//     setRuleSections((prevSections) => [
//       ...prevSections,
//       {
//         key: newRuleCount,
//         rulesectionCount: newRuleCount,
//         sectionCount: sectionCount,
//         isSectionVisible: true,
//       },
//     ]
//     );
//   };
//   const handleMoveUp = (index) => {
//     if (index > 0) {
//       const updatedRuleSections = [...ruleSections];
//       const temp = updatedRuleSections[index];
//       updatedRuleSections[index] = updatedRuleSections[index - 1];
//       updatedRuleSections[index - 1] = temp;
//       setRuleSections(updatedRuleSections);
//       updateRuleNumbers(updatedRuleSections);
//     }
//   };

//   const handleMoveDown = (index) => {
//     if (index < ruleSections.length - 1) {
//       const updatedRuleSections = [...ruleSections];
//       const temp = updatedRuleSections[index];
//       updatedRuleSections[index] = updatedRuleSections[index + 1];
//       updatedRuleSections[index + 1] = temp;
//       setRuleSections(updatedRuleSections);
//       updateRuleNumbers(updatedRuleSections);
//     }
//   };

//   const updateRuleNumbers = (sections) => {
//     const updatedSectionsWithCount = sections.map((section, i) => ({
//       ...section,
//       rulesectionCount: i + 1,
//     }));
//     setRuleSections(updatedSectionsWithCount);
//   };

//   const deleteRuleSection = (sectionToDelete) => {
//     const updatedSections = ruleSections.filter(
//       (section) => section.rulesectionCount !== sectionToDelete
//     );
//     const updatedSectionsWithCount = updatedSections.map((section, index) => ({
//       ...section,
//       rulesectionCount: index + 1,
//     }));
//     setRuleSections(updatedSectionsWithCount);
//   };

//   useEffect(() => {
//     setQuestionData(questions_data);
//     setRulesData(rules_data);
//   }, [questions_data, rules_data]);

//   return (
//     <div>
//       <div className="questionrulescomponent">
//         <div
//           className={`questions ${selectedElement === "questions" ? "selected" : ""
//             }`}
//           onClick={() => setSelectedElement("questions")}
//         >
//           <h5>QUESTION</h5>
//         </div>

//         <div
//           className={`rules ${selectedElement === "rules" ? "selected" : ""}`}
//           onClick={() => setSelectedElement("rules")}
//         >
//           <h5>RULES</h5>
//         </div>
//       </div>

//       <br />

//       {selectedElement === "questions" ? (
//         <div>
//           <div className="dquestiondiv">
//             {questions_data.map((data, index) => (
//               <div key={(index + 1)} className={"visible-section"}>
//                 <AddQuestionSection
//                   key={(index + 1)}
//                   survey_id={survey_id}
//                   sectionId={sectionId}
//                   questionsectionCount={(index + 1)}
//                   sectionCount={sectionCount}
//                   onDelete={deleteQuestionSection}
//                   onMoveUp={moveQuestionSectionUp}
//                   onMoveDown={moveQuestionSectionDown}
//                   totalSections={questionSections.length}
//                   currentIndex={index}
//                   // isSectionVisible={section.isSectionVisible}
//                   questions_data={data}
//                 />
//                 {/* {addQuestionSection} */}
//               </div>
//             ))}
//             {questionSections.map((section, index) => (
//               <div key={section.key} className={section.isSectionVisible ? "visible-section" : "hidden-section"}>
//                 <AddQuestionSection
//                   key={section.key}
//                   survey_id={survey_id}
//                   sectionId={sectionId}
//                   questionsectionCount={section.questionsectionCount}
//                   sectionCount={sectionCount}
//                   onDelete={deleteQuestionSection}
//                   onMoveUp={moveQuestionSectionUp}
//                   onMoveDown={moveQuestionSectionDown}
//                   totalSections={questionSections.length}
//                   currentIndex={index}
//                   isSectionVisible={section.isSectionVisible}
//                 />
//               </div>
//             ))}
//             {/* {questionSections.length==0?
//           questions_data?setQuestionSections(questions_data.map((data,index) => (

//             {
//               key: (index+1),
//               questionsectionCount:  (index+1),
//               sectionCount: sectionCount,
//               isSectionVisible: true,
//             }
//           ))):<></>
//       :<></>} */}
//           </div>
//           <button onClick={addQuestionSection} className="AddQue">
//             + ADD QUESTION
//           </button>
//         </div>
//       ) : null}

//       {selectedElement === "rules" ? (
//         <div>
//           <div className="drulediv">
//             {rules_data.map((data, index, section) => (
//               <div key={(index + 1)} className={"visible-section"}>
//                 <AddRule
//                   survey_id={survey_id}
//                   sectionId={sectionId}
//                   key={(index + 1)}
//                   rulesectionCount={(index + 1)}
//                   // sectionCount={section.sectionCount}
//                   sectionCount={sectionCount}
//                   onDelete={() => deleteRuleSection((index + 1))}
//                   inputValue={inputValues[index]}
//                   onMoveUp={() => handleMoveUp(index)}
//                   onMoveDown={() => handleMoveDown(index)}
//                   showFlag={showFlag}
//                   rulebtnsdivcustom={rulebtnsdivcustom}
//                   rules_data={data}

//                 />
//               </div>
//             ))}
//             {ruleSections.map((section, index) => (

//               <div key={section.key} className={section.isSectionVisible ? "visible-section" : "hidden-section"}>
//                 <AddRule
//                   survey_id={survey_id}
//                   sectionId={sectionId}
//                   key={section.key}
//                   rulesectionCount={section.rulesectionCount}
//                   // sectionCount={section.sectionCount}
//                   sectionCount={sectionCount}
//                   onDelete={() => deleteRuleSection(section.rulesectionCount)}
//                   inputValue={inputValues[index]}
//                   onMoveUp={() => handleMoveUp(index)}
//                   onMoveDown={() => handleMoveDown(index)}
//                   showFlag={showFlag}
//                   rulebtnsdivcustom={rulebtnsdivcustom}
//                 />
//               </div>
//             ))}

//           </div>
//           <button onClick={addRuleSection} className="AddRulebtn">
//             + ADD RULE
//           </button>
//         </div>
//       ) : null}
//     </div>
//   );
// }
// export default QuestionsAndRules;
