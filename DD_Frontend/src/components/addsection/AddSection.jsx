// import React, { useState, useEffect } from "react";
// import "../../assets/css/addsection/AddRule.css";
// import NewSection from "../../components/addsection/NewSection";
// // import baseUrl from "../../config";
// import { useAuthContext } from "../../hooks/useAuthContext";

// const AddSection = ({ showFlag,rulebtnsdivcustom, survey_id, surveySectionsData }) => {
//   const { user } = useAuthContext();

//   const [sections, setSections] = useState([]);
//   const [sectionCount, setSectionCount] = useState(1);
//   const [questionSections, setQuestionSections] = useState([]);
//   const [section_data, setSection_data] = useState(surveySectionsData);

//   useEffect(() => {
//     setSectionCount(sections.length + section_data.length + 1);

//   }, [user, sections, surveySectionsData]);

// //  if(document.querySelector('.mainsection'))
// //  {
// //   setSectionCount([]);
// //  }
//   const addSection = () => {
//     const newSection = { key: sectionCount, sectionCount: sectionCount };
//     setSections([...sections, newSection]);
//   };

//   if(section_data != surveySectionsData)
//   {
//     // setSection_data([]);
//     setTimeout(()=>{
//       if(surveySectionsData){
//         setSection_data(surveySectionsData);
//         setSectionCount(surveySectionsData.length+1);
//       }

//     },1000)

//     // if(document.querySelectorAll('.mainsection'))
//     // {
//     //   const mainSection = document.querySelectorAll('.mainsection');
//     //   mainSection.foreach((item)=>{
//     //     item.remove()
//     // })
//     // }
//     // surveySectionsData.map((item)=>(
//       // setSections([...sections, { key: sectionCount, sectionCount: sectionCount }])
//     // ))
//   }

//   const deleteSection = (sectionToDelete) => {
//     const updatedSections = sections.filter(
//       (section) => section.key !== sectionToDelete
//     );
//     const updatedSection = updatedSections.map((section, index) => ({
//       ...section,
//       sectionCount: index + 1,
//     }));
//     setSections(updatedSection);
//   };
//   // ---------------------------------------------------------------
//   const moveup = (sectionIndex) => {
//     if (sectionIndex > 0) {
//       const updatedSections = [...sections];
//       const movedSection = updatedSections.splice(sectionIndex, 1)[0];
//       updatedSections.splice(sectionIndex - 1, 0, movedSection);
//       updatedSections.forEach((section, index) => {
//         section.sectionCount = index + 1;
//       });

//       setSections(updatedSections);
//     }
//   };
//   // -------------------------------------------------------------------
//   const movedown = (sectionIndex) => {
//     if (sectionIndex < sections.length - 1) {
//       const updatedSections = [...sections];
//       const movedSection = updatedSections.splice(sectionIndex, 1)[0];
//       updatedSections.splice(sectionIndex + 1, 0, movedSection);
//       updatedSections.forEach((section, index) => {
//         section.sectionCount = index + 1;
//       });

//       setSections(updatedSections);
//     }
//    };

//   return (
//     <>
//       <>

//         {surveySectionsData.length>0?
//           surveySectionsData.map((sectiondata, index)=>(
//             <>
//             <NewSection
//                 key={(index+1)}
//                 sectionId={(index)}
//                 totalSection={sections.length}
//                 sectionCount={index+1}
//                 questionSections={questionSections}
//                 onDelete={() => deleteSection(sectiondata.key)}
//                 onMoveUp={() => moveup(index, index+1)}
//                 onMoveDown={() => movedown(index, index+1)}
//                 showFlag={showFlag}
//                 rulebtnsdivcustom={rulebtnsdivcustom}
//                 survey_id={survey_id}
//                 surveySectionsData={sectiondata}
//             />
//             </>
//           ))
//           :<></>
//         }
//       </>
//       <>
//         {sections.map((section, index) => (
//           <>

//           <NewSection
//             key={section.key}
//             sectionId={index}
//             totalSection={sections.length}
//             sectionCount={section.sectionCount}
//             questionSections={questionSections}
//             onDelete={() => deleteSection(section.key)}
//             onMoveUp={() => moveup(index, sectionCount)}
//             onMoveDown={() => movedown(index, sectionCount)}
//             showFlag={showFlag}
//             rulebtnsdivcustom={rulebtnsdivcustom}
//             survey_id={survey_id}
//             surveySectionsData={""}
//           />
//           </>
//         ))}

//       </>
//       <div className="addsectiondiv">
//       <button id="addSectionAsset" className="addSectionAsset" onClick={addSection}>
//         + ADD SECTION
//       </button>

//       </div>
//     </>

//   );
// };
// export default AddSection;
