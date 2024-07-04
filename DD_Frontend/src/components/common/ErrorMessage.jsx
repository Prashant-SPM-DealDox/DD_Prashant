import React, { useState } from "react";
import "../../assets/css/common/CustomDropdown.css";

function ErrorMessage({
  value,
  onChange,
  label,
  errormsg,
  placeholdersection,
  validationinputcustom,
  type,
  showFlaxErrorMessageText,
  onBlur,
  permission,
  customLabel,
  readOnly = false,
}) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    const input = event.target;

    if (input.value.trim() !== "") {
      setError(false);
      input.style.outlineColor = "#ccc";
      input.style.outlineColor = "#216c98";
    } else {
      setError(true);
      input.style.outlineColor = "red";
      input.style.outlineColor = "red";
    }

    setInputValue(input.value);
    onChange(input.value);
    // onBlur(event)
  };

  const labelStyle = {
    color: error ? "red" : "#216c98",
  };

  const containerStyle = {
    borderLeft:
      (value ?? "").length === 0
        ? error
          ? "2px solid red"
          : "3px solid #216c98"
        : "",
  };

  return (
    <>
      {showFlaxErrorMessageText && (
        <div id="validationDiv">
          <input
            type={type}
            className={`validationinput ${validationinputcustom} ${
              error ? "error" : ""
            }`}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholdersection}
            style={containerStyle}
            onBlur={(event) => {
              onBlur ? onBlur(event) : <></>;
            }}
            readOnly={readOnly}
            autoComplete="new-password"
          />
          <label
            htmlFor="validationinput"
            className={`validationinputlabel ${customLabel}`}
            style={labelStyle}
          >
            {error ? errormsg : label}
          </label>
        </div>
      )}
    </>
  );
}

export default ErrorMessage;
