// import React, { useState, useEffect } from "react";
// import "../../assets/css/addsection/Formula.css";
// import CustomDropdown from "../../components/common/CustomDropdown";
// import { baseUrl } from "../../config";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaUserAlt } from 'react-icons/fa';

// const Formula = ({survey_key,section_key,question_key,formulaData,onFormulaSubmit }) => {
//   const { user } = useAuthContext();
//   const [inputValue, setInputValue] = useState("");
//   const expressionOptions = [
//     "Option 1",
//     "Option 2",
//     "Option 3",
//     "Option 4",
//     "Option 5",
//     "Option 6",
//     "Option 7",
//   ];
//   const sectionOptions = ["+", "-", "*", "<", ">", "<=", ">="];
//   const functionOptions = ["FIELD", "Item 1", "Item 2", "Item 3"];
//   const [selectedFunction, setSelectedFunction] = useState("FORMULA");
//   const [showErrorMessage, setShowErrorMessage] = useState(false); // State to control the error message
//   const isFieldSelected = selectedFunction === "FIELD";
//   const isRed = isFieldSelected && selectedFunction.trim() !== "";
//   const isNoResultFound =
//     selectedFunction.trim() === "" || selectedFunction.trim().length === 1;

//   useEffect(() => {
//     if (inputValue === "") {
//       setSelectedFunction("FORMULA");
//     }
//   }, []);

//   const formattedSelectedFunction = isFieldSelected
//     ? selectedFunction.charAt(0).toUpperCase() + selectedFunction.slice(1)
//     : selectedFunction;

//     const handleInputChange = (e) => {
//       const inputText = e.target.value;
//       setInputValue(inputText);
//       setSelectedFunction(inputText.trim() === "" ? "FORMULA" : "");
//       // I am Showing error message if the input field is empty
//       setShowErrorMessage(inputText.trim() === "");

//       // Pass the updated formula data to the parent component
//       onFormulaSubmit({
//         formula_add_filed,
//         formula_add_operator,
//         formula_add_function,
//         formula_evaluate,
//         inputValue: inputText,
//       });
//     };

//   const handleExpressionSelect = (selectedOption) => {
//     setFormula_add_filed(selectedOption);
//     setSelectedFunction("FORMULA");
//     setShowErrorMessage(false);
//   };

//   const handleOperatorSelect = (selectedOption) => {
//     setFormula_add_operator(selectedOption);
//     setSelectedFunction("FORMULA");
//     setShowErrorMessage(false);
//   };

//   const handleFunctionSelect = (option) => {
//     setFormula_add_function(option);
//     if (option === "FIELD") {
//       setInputValue("FIELD(,)");
//       setSelectedFunction(option);
//     } else if (option === "Item 1" || option === "Item 2" || option === "Item 3") {
//       setInputValue(""); // Clear the input value
//       setSelectedFunction("FORMULA"); // Set the label to "A FORMULA"
//     } else {
//       setInputValue("");
//       setSelectedFunction(option);
//     }
//     setShowErrorMessage(false); // Hide the error message
//   };

//   const isFieldWithQuotes = /^FIELD\('.*','.*'\)$/i.test(inputValue.trim());

//   // backend start
//   const [formula_add_filed, setFormula_add_filed] = useState("");
//   const [formula_add_operator, setFormula_add_operator] = useState("");
//   const [formula_add_function, setFormula_add_function] = useState("");
//   const [formula_evaluate, setFormula_evaluate] = useState(false);

//   useEffect(() => {
//     setFormula_add_filed(formulaData?.formula_add_filed ?? "");
//     setFormula_add_operator(formulaData?.formula_add_operator ?? "");
//     setFormula_add_function(formulaData?.formula_add_function ?? "");
//     setFormula_evaluate(formulaData?.formula_evaluate ?? false);
//     setInputValue(formulaData?.formula_add_formula ?? "");
//   }, [formulaData]);

//   const handleCheckboxChange = (e) => {
//     setFormula_evaluate(e.target.checked);
//   };

//   return (
//     <>
//       <div className="formulasection">
//         <div className="filedsection">
//           <CustomDropdown
//             options={expressionOptions}
//             onSelect={handleExpressionSelect}
//             label="ADD FIELD"
//             value={formula_add_filed}
//             onChange={(value) => setFormula_add_filed(value)}

//           />
//         </div>
//         <div className="operatorsection">
//           <CustomDropdown
//             options={sectionOptions}
//             onSelect={handleOperatorSelect}
//             label="ADD OPERATOR"
//             value={formula_add_operator}
//             onChange={(value) => setFormula_add_operator(value)}
//           />
//         </div>
//         <div id="functionsection">
//           <CustomDropdown
//             options={functionOptions}
//             onSelect={handleFunctionSelect}
//             label="ADD FUNCTION"
//             value={formula_add_function}
//             onChange={(value) => setFormula_add_function(value)}
//           />
//         </div>
//         <div id="functionsection">
//           <input
//             className="section-checkbox"
//             type="checkbox"
//             checked={formula_evaluate}
//             onChange={handleCheckboxChange}
//           />
//           <label className="section-div">EVALUATE ON APPLY</label>
//         </div>
//       </div>

//       <div
//         id="sectionformula"
//         style={{
//           border: showErrorMessage
//             ? "2px solid red"
//             : isRed
//             ? "2px solid red"
//             : "2px solid #ccc",
//         }}
//       >
//         <input
//           className="select-section"
//           value={inputValue}
//           onChange={handleInputChange}

//           style={{ outline: "red" }}
//         />

//         {showErrorMessage && (
//           <label
//             id="error-message"
//             style={{
//               color: "red",
//               position: "relative",
//               bottom: "13.4px",
//               fontWeight: "bold",
//             }}
//           >
//             FORMULA IS A REQUIRED FIELD
//           </label>
//         )}

//         {!showErrorMessage && (
//           <label
//             className="formula"
//             style={{
//               color: isFieldWithQuotes || isRed || isNoResultFound ? "red" : "#216c98",
//             }}
//             contentEditable={false}
//           >
//             {isFieldWithQuotes
//               ? null
//               : isRed
//               ? `FORMULA: EXPECTED EXPRESSION, FUNCTION, NUMBER, STRING, BOOLEAN, BUT  "${formattedSelectedFunction[0]}" FOUND`
//               : isNoResultFound
//               ? `FORMULA: EXPECTED EXPRESSION, FUNCTION, NUMBER, STRING, BOOLEAN, BUT  "${
//                   formattedSelectedFunction || inputValue[0].toUpperCase()
//                 }" FOUND`
//               : selectedFunction}
//           </label>
//         )}
//       </div>
//     </>
//   );
// };

// export default Formula;
