import React, { useState } from "react";
import "../../assets/css/survey-new/ToggleComponent.css";
import { FaChevronDown } from "react-icons/fa";
import CustomDropdown from "../../components/common/CustomDropdown";

const ToggleComponent = () => {
  const [openDropdown, setDropdown] = useState(false);
  const [inputType, setInputType] = useState("Answer to Question");

  const handleOpenToggle = () => {
    setDropdown(!openDropdown);
  };

  const handleDropdown = (val) => {
    setInputType(val);
    setDropdown(false);
  };

  const tabOptions = [
    "opyion1"
  ];

  const values = [
    "Answer to Question",
    "Value",
    "Calcsheet pointer",
    "Catalog Content",
  ];
  return (
    <div className="toggle-container">
      <div className="toggle-div" onClick={handleOpenToggle}>
        <FaChevronDown className="down-icon" onClick={handleOpenToggle}   style={{ transform: openDropdown ? 'rotate(180deg)' : 'rotate(0)' }}  />
        {openDropdown && (
          <ul className="dropdown-listt">
            {values.map((val) => (
              <li
                key={val}
                onClick={() => handleDropdown(val)}
                className="toggle-list-items"
              >
                {val}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        {inputType === "Answer to Question" && (
          <CustomDropdown
            options={tabOptions}
            label="REPLACE WITH FROM QUESTION"
            showCancel={false}
            labelforverticl="regionlabel"
            // value={}
            // onChange={}
            // onSelect={}
          />
        )}
        {inputType === "Value" && (
          <div className="replace-value-container">
            <input type="text" placeholder="Value"  className="replace-value-input" />
            <label className="replace-value-label">REPLACE WITH AS A VALUE</label>
          </div>
        )}
        {inputType === "Calcsheet pointer" && (
          <div className="calcsheet-container">
            <CustomDropdown
              options={tabOptions}
              label="REPLACE WITH TAB"
              showCancel={false}
              labelforverticl="regionlabel"
              // value={}
              // onChange={}
              // onSelect={}
            />

            <div className="replace-cell-container">
              <input type="text"  className="replace-cell-input"/>
              <label className="replace-cell-label">REPLACE WITH CELL</label>
            </div>
          </div>
        )}
        {inputType === "Catalog Content" && (
          <CustomDropdown
            options={tabOptions}
            label="REPLACE WITH FROM CATALOG"
            showCancel={false}
            labelforverticl="regionlabel"
            // value={}
            // onChange={}
            // onSelect={}
          />
        )}
      </div>
    </div>
  );
};

export default ToggleComponent;
