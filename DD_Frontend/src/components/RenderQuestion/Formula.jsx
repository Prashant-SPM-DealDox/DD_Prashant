import React, { useState, useEffect } from "react";
import "../../assets/css/renderquestion/Formula.css";
import { CONSTANTS } from "../../constants";
import CustomDropdown from "../../components/common/CustomDropdown";
const Formula = () => {
  const [formulaInput, setFormulaInput] = useState({
    selectedFunction: "FORMULA",
    inputValue: "",
    showErrorMessage: false,
    tabNameEmpty: false,
  });
  const isFieldSelected = formulaInput.selectedFunction === "CALCVALUE";
  const isRed = isFieldSelected && formulaInput.selectedFunction.trim() !== "";
  const isNoResultFound =
    formulaInput.selectedFunction.trim() === "" ||
    formulaInput.selectedFunction.trim().length === 1;

  useEffect(() => {
    if (formulaInput.inputValue === "") {
      setFormulaInput({
        ...formulaInput,
        selectedFunction: "FORMULA",
      });
    }
  }, []);

  const formattedSelectedFunction = isFieldSelected
    ? formulaInput.selectedFunction.charAt(0).toUpperCase() +
      formulaInput.selectedFunction.slice(1)
    : formulaInput.selectedFunction;

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setFormulaInput({
      ...formulaInput,
      inputValue: inputText,
      selectedFunction: inputText.trim() === "" ? "FORMULA" : "",
      showErrorMessage: inputText.trim() === "",
      tabNameEmpty: false,
    });
  };

  const handleExpressionSelect = () => {
    setFormulaInput({
      ...formulaInput,
      selectedFunction: "FORMULA",
      showErrorMessage: false,
      tabNameEmpty: false,
    });
  };

  const handleOperatorSelect = () => {
    setFormulaInput({
      ...formulaInput,
      selectedFunction: "FORMULA",
      showErrorMessage: false,
      tabNameEmpty: false,
    });
  };

  const handleFunctionSelect = (option) => {
    if (option === "CALCVALUE") {
      setFormulaInput({
        ...formulaInput,
        inputValue: "CALCVALUE(,)",
        selectedFunction: option,
        showErrorMessage: false,
        tabNameEmpty: true,
      });
    } else if (
      option === "Item 1" ||
      option === "Item 2" ||
      option === "Item 3"
    ) {
      setFormulaInput({
        ...formulaInput,
        inputValue: "",
        selectedFunction: "FORMULA",
        showErrorMessage: false,
        tabNameEmpty: false,
      });
    } else {
      setFormulaInput({
        ...formulaInput,
        inputValue: "",
        selectedFunction: option,
        showErrorMessage: false,
        tabNameEmpty: false,
      });
    }
  };
  return (
    <>
      <div className="formulasection">
        <div className="filedsection">
          <CustomDropdown
            options={CONSTANTS.expressionOptions}
            onSelect={handleExpressionSelect}
            label="ADD FIELD"
          />
        </div>
        <div className="operatorsection">
          <CustomDropdown
            options={CONSTANTS.sectionOptions}
            onSelect={handleOperatorSelect}
            label="ADD OPERATOR"
          />
        </div>
        <div id="functionsection">
          <CustomDropdown
            options={CONSTANTS.functionOptions}
            onSelect={handleFunctionSelect}
            label="ADD FUNCTION"
          />
        </div>
        <div id="functionsection">
          <input className="section-checkbox" type="checkbox" />
          <label className="section-div">EVALUATE ON APPLY</label>
        </div>
      </div>
      <div className="Flex_Label">
        <input
          id="sectionformula"
          className="select-section"
          value={formulaInput.inputValue}
          onChange={handleInputChange}
          style={{
            outline: "red",
            border: formulaInput.showErrorMessage
              ? "2px solid red"
              : isRed
              ? "2px solid red"
              : "1px solid #ccc",
          }}
        />
        {formulaInput.showErrorMessage && (
          <label id="Formula_Errormsg">FORMULA IS A REQUIRED FIELD</label>
        )}
        {formulaInput.tabNameEmpty && (
          <label id="Formula_Errormsg">FORMULA: TAB NAME IS EMPTY</label>
        )}
        {!formulaInput.showErrorMessage && !formulaInput.tabNameEmpty && (
          <label
            id="Formula_Errormsg"
            style={{
              color: isRed || isNoResultFound ? "red" : "#216c98",
            }}
            contentEditable={false}
          >
            {isRed
              ? `FORMULA: EXPECTED EXPRESSION, FUNCTION, NUMBER, STRING, BOOLEAN, BUT "${formattedSelectedFunction[0]}" FOUND`
              : isNoResultFound
              ? `FORMULA: EXPECTED EXPRESSION, FUNCTION, NUMBER, STRING, BOOLEAN, BUT "${
                  formattedSelectedFunction ||
                  formulaInput.inputValue[0].toUpperCase()
                }" FOUND`
              : formulaInput.selectedFunction}
          </label>
        )}
      </div>
    </>
  );
};

export default Formula;
