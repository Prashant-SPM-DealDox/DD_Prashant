// import React, { useState, useEffect } from "react";

// import Toggle from "../../components/addsection/Toggle";

// import "../../assets/css/addsection/Toggle.css"

// import IComponentToggle from "../../components/addsection/IComponentToggle";

// import ToggleCellWidth from "../../components/addsection/ToggleCellWidth";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// function AddRowComponent({ allcount }) {
//   const [rows, setRows] = useState([]);

//   const [totalCells, setTotalCells] = useState(0);

//   const [inputFieldValues, setInputFieldValues] = useState([]);

//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const [copyIconColors, setCopyIconColors] = useState([]);

//   const [maxToggleCount, setMaxToggleCount] = useState(0);

//   const addRow = () => {
//     setRows([...rows, { columns: 1 }]);

//     setTotalCells(totalCells + 1);

//     const newRowInputValues = [...inputFieldValues];

//     const togglekey = [
//       {
//         key: "Toggle",

//         inputfiled: "",

//         requiredfield: false,

//         showinfo: false,

//         note: { count: "", input1: "", input2: "", input3: "" },
//       },
//     ];

//     newRowInputValues.push(togglekey);

//     setInputFieldValues(newRowInputValues);
//   };

//   const addColumn = (rowIndex) => {
//     const updatedRows = [...rows];

//     updatedRows[rowIndex].columns += 1;

//     setRows(updatedRows);

//     setTotalCells(totalCells + 1);

//     const newRowInputValues = [...inputFieldValues];

//     newRowInputValues[rowIndex].push({
//       key: "Toggle",

//       inputfiled: "",

//       requiredfield: false,

//       showinfo: false,

//       note: { count: "", input1: "", input2: "", input3: "" },
//     });

//     setInputFieldValues(newRowInputValues);
//   };

//   const handleDelete = (rowIndex, columnIndex, currentCellNumber) => {
//     const updatedRows = [...rows];

//     updatedRows[rowIndex].columns -= 1;

//     setRows(updatedRows);

//     setTotalCells(totalCells - 1);

//     const newRowInputValues = [...inputFieldValues];

//     newRowInputValues[rowIndex].splice(columnIndex, 1);

//     setInputFieldValues(newRowInputValues);

//     if (updatedRows[rowIndex].columns === 0) {
//       const updatedRowsCopy = [...updatedRows];

//       updatedRowsCopy.splice(rowIndex, 1);

//       setRows(updatedRowsCopy);

//       const newRowInputValuesCopy = [...newRowInputValues];

//       newRowInputValuesCopy.splice(rowIndex, 1);

//       setInputFieldValues(newRowInputValuesCopy);
//     }

//     const newSelectedOptions = [...selectedOptions];

//     newSelectedOptions.splice(currentCellNumber - 1, 1);

//     setSelectedOptions(newSelectedOptions);
//   };

//   const handleInputFieldChange = (rowIndex, columnIndex, value) => {
//     const newRowInputValues = [...inputFieldValues];

//     newRowInputValues[rowIndex][columnIndex].inputfiled = value;

//     setInputFieldValues(newRowInputValues);
//   };

//   const handleOptionClick = (rowIndex, columnIndex, value) => {
//     const newRowInputValues = [...inputFieldValues];

//     newRowInputValues[rowIndex][columnIndex].key = value;

//     setInputFieldValues(newRowInputValues);
//   };

//   const handleToggleInfoClick = (value, columnIndex, rowIndex) => {
//     const newRowInputValues = [...inputFieldValues];

//     newRowInputValues[rowIndex][columnIndex].showinfo = value;

//     setInputFieldValues(newRowInputValues);
//   };

//   const onRadioChange = (rowIndex, columnIndex, value) => {
//     const newRowInputValues = [...inputFieldValues];

//     newRowInputValues[rowIndex][columnIndex].requiredfield = value;

//     setInputFieldValues(newRowInputValues);
//   };

//   const deleteSection = (rowIndex) => {
//     const updatedRows = [...rows];

//     updatedRows.splice(rowIndex, 1);

//     setRows(updatedRows);

//     const updatedInputFieldValues = [...inputFieldValues];

//     updatedInputFieldValues.splice(rowIndex, 1);

//     setInputFieldValues(updatedInputFieldValues);
//   };

//   const handleToggleOptionChange = (option, currentCellNumber) => {
//     const newSelectedOptions = [...selectedOptions];

//     newSelectedOptions[currentCellNumber - 1] = option;

//     setSelectedOptions(newSelectedOptions);
//   };

//   const handleInputFieldChangeToggle = (
//     rowIndex,

//     columnIndex,

//     value,

//     input
//   ) => {
//     const newRowInputValues = [...inputFieldValues];

//     newRowInputValues[rowIndex][columnIndex].note[input] = value;

//     setInputFieldValues(newRowInputValues);
//   };

//   useEffect(() => {
//     setCopyIconColors(Array.from({ length: totalCells + 1 }, () => "black"));
//   }, [totalCells]);

//   const handleChangeCopyIcon = (rowIndex) => {
//     const newCopyIconColors = [...copyIconColors];

//     if (newCopyIconColors[rowIndex] === "black") {
//       newCopyIconColors[rowIndex] = "green";
//     } else {
//       newCopyIconColors[rowIndex] = "black";
//     }

//     setCopyIconColors(newCopyIconColors);
//   };

//   function renderIComponentToggles() {
//     let cellNumber = 0;

//     return inputFieldValues.map((item, rowIndex) => {
//       return item.map((i, columnIndex) => {
//         cellNumber++;

//         return (
//           i.showinfo && (
//             <IComponentToggle
//               key={`IComponent-${rowIndex}.${columnIndex}`}
//               allcount={allcount}
//               toggleCount={cellNumber}
//               inputValue={i.note.input1}
//               onInputChange={(value) =>
//                 handleInputFieldChangeToggle(
//                   rowIndex,

//                   columnIndex,

//                   value,

//                   "input1"
//                 )
//               }
//               secondInputValue={i.note.input2}
//               onSecondInputChange={(value) =>
//                 handleInputFieldChangeToggle(
//                   rowIndex,

//                   columnIndex,

//                   value,

//                   "input2"
//                 )
//               }
//               thirdInputValue={i.note.input3}
//               onThirdInputChange={(value) =>
//                 handleInputFieldChangeToggle(
//                   rowIndex,

//                   columnIndex,

//                   value,

//                   "input3"
//                 )
//               }
//             />
//           )
//         );
//       });
//     });
//   }

//   useEffect(() => {
//     const maxCount = inputFieldValues.reduce(
//       (max, item) => Math.max(max, item.length),
//       0
//     );

//     setMaxToggleCount(maxCount);
//   }, [inputFieldValues]);

//   const renderCells = () => {
//     let cellNumber = 0;

//     return inputFieldValues.map((item, rowIndex) => {
//       const cellWidth = maxToggleCount > 0 ? 100 / maxToggleCount : 100;

//       return (
//         <tr key={rowIndex} id="trrow">
//           {item.map((i, columnIndex) => {
//             cellNumber++;

//             return (
//               <td
//                 key={columnIndex}
//                 className="togglerow"
//                 style={{ width: `${cellWidth}%` }}
//               >
//                 {rowIndex === 0 ? <ToggleCellWidth /> : null}

//                 <Toggle
//                   allcount={allcount}
//                   onDelete={() =>
//                     handleDelete(rowIndex, columnIndex, cellNumber)
//                   }
//                   toggleCount={cellNumber}
//                   inputValue={inputFieldValues[rowIndex][columnIndex]}
//                   onInputChange={(value) =>
//                     handleInputFieldChange(rowIndex, columnIndex, value)
//                   }
//                   ontoggleoptionChange={(value) => {
//                     handleOptionClick(rowIndex, columnIndex, value);
//                   }}
//                   selectedOption={selectedOptions[cellNumber - 1]}
//                   onSelectOption={(option) =>
//                     handleToggleOptionChange(
//                       rowIndex,

//                       columnIndex,

//                       option,

//                       cellNumber
//                     )
//                   }
//                   showInfoCircle={i.showinfo}
//                   handleToggleInfoClick={(value) =>
//                     handleToggleInfoClick(value, columnIndex, rowIndex)
//                   }
//                   onradiochnage={(value) => {
//                     onRadioChange(rowIndex, columnIndex, value);
//                   }}
//                 />
//               </td>
//             );
//           })}

//           <div
//             id="fixed-controls"
//             className={
//               rowIndex === 0 ? "first-row-elements" : "other-row-elements"
//             }
//           >
//             <>
//               {item.length % 20 !== 0 && (
//                 <td className="addcomprow1">
//                   <p id="plustoggle" onClick={() => addColumn(rowIndex)}>
//                     +
//                   </p>
//                 </td>
//               )}

//               <td className="addcomprow2">
//                 {copyIconColors && (
//                   <i
//                     id="copytoggle"
//                     onClick={() => handleChangeCopyIcon(rowIndex)}
//                     className="fa fa-copy"
//                     title={
//                       copyIconColors[rowIndex] === "black"
//                         ? "Disable Copy Down To All Rows?"
//                         : "Enable Copy Down To All Rows?"
//                     }
//                     style={{ color: copyIconColors[rowIndex] }}
//                   ></i>
//                 )}
//               </td>

//               <td className="addcomprow3">
//                 <button id="btn-outer-delete">
//                   <FontAwesomeIcon icon={faTrashAlt}
//                     id="deletetogglebtn"
//                     onDoubleClick={() => deleteSection(rowIndex)}
//                     aria-hidden="true"
//                   />
//                 </button>
//               </td>
//             </>
//           </div>
//         </tr>
//       );
//     });
//   };

//   return (
//     <div className="box">
//       <div id="tableidv">
//         <table className="toggletbale">
//           <tbody>{renderCells()}</tbody>
//         </table>
//       </div>

//       {renderIComponentToggles()}

//       <div id="adrow" style={{ border: "none", background: "white" }}>
//         <p onClick={addRow}>Add Row</p>
//       </div>
//     </div>
//   );
// }

// export default AddRowComponent;
