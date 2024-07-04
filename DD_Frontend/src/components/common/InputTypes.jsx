import React from "react";
import "../../assets/css/common/InputTypes.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
function InputTypes({
  value,
  onChange,
  type,
  TextLabel,
  Class_Name,
  textinputcustom,
  textlabelcustom,
  textplaceholder,
  Checkboxlabel,
  showFlagText,
  showFlagCheckBox,
  showFlagCalender,
  CalenderLabel,
  selectedDate,
  onCalendarChange,
  placeholder,
  readOnly,
  isBorderVisible,
  checklabelcustom,
  customCheckName,
  descriptionvalue,
  showTextArea,
  descriptionPlaceholder,
  descriptiononChange,
  textAreaInputcustom,
  textAreaLabelcustom,
  TextAreaLabel,
  greyoutLabelId,
  greyoutInputId,
  DesciptionClass,
  greyoutcheckboxLabelId
}) {
  // textarea
  const handleTextareaChange = () => {
    const textarea = document.getElementById("description-multiText");
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };
  return (
    <>
      {/* number */}
      {showFlagText && (
        <div id="contentquote">
          <input
            autoComplete="new-password"
            className={`textinput ${textinputcustom}`}
            name="text"
            type={type}
            placeholder={textplaceholder}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
            id={greyoutInputId}
            

          />
          <label
            htmlFor={`textinput ${textinputcustom}`}
            className={`textlabel ${textlabelcustom}`}
            id={greyoutLabelId}
          >
            {TextLabel}
          </label>
        </div>
      )}

      {/* checkbox */}
      {showFlagCheckBox && (
        <label className={`custom-checkbox ${Class_Name}`}>
          <input
            autoComplete="off"
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            disabled={readOnly}
           
          />
          <span className={`checkmarkbox ${customCheckName}`}></span>
          <label className={`checkboxlabel ${checklabelcustom}`}  id={greyoutcheckboxLabelId}>
            {Checkboxlabel}
          </label>
        </label>
      )}
      {/* calender */}
      {showFlagCalender && (
        <>
          <Datetime
    autoComplete="new-password"
            value={selectedDate}
            readOnly={readOnly}
            onChange={(date) => {
              onCalendarChange(date);
            }}
            dateFormat="MMMM D,YYYY"
            timeFormat={false}
            inputProps={{
              id: "calender-input",
              placeholder: placeholder || "",
              className: "calendercsscomp",

              style: {
                borderLeft:
                  isBorderVisible && (selectedDate ?? "").length === 0
                    ? "3px solid #216c98"
                    : "",
              },
            }}
            input={true}
          />
          <label htmlFor="calender-input" className="labelcalender">
            {CalenderLabel}
          </label>
        </>
      )}
      {showTextArea && (
        <>
          <textarea
            id="description-multiText"
            name="multiline-text"
            className={DesciptionClass}
            rows={3}
            cols={50}
            style={{
              fontFamily: "Arial,Helvetica,sans-serif",
              resize: "none",
              padding: "6px",
              paddingBottom:"20px"
            }}
            value={descriptionvalue}
            placeholder={descriptionPlaceholder}
            onChange={(e) => {
              handleTextareaChange();
              descriptiononChange(e.target.value);
          
            }}
          />
      
          <label
            htmlFor={`textinput ${textAreaInputcustom}`}
            // className={`textlabel ${textAreaLabelcustom}`}
            id="label_textarea"
          >
            {TextAreaLabel}
          </label>
        </>
      )}
    </>
  );
}

export default InputTypes;
