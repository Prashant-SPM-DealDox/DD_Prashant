import React, { useState } from "react";
import "../../assets/css/pcrGrid/Summary.css";
import CustomDropDown from "../../components/common/CustomDropdown";

function Summary({ onClose }) {
  const [inputValue, setInputValue] = useState("amul");
  const [Error, setError] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
  };
  const errorLabelStyle = {
    color: Error ? "red" : "#216c98",
  };
  const errorBorderStyle = {
    borderLeft: Error ? " " : "3px solid #216c98",
    border: Error ? "0.1px solid red" : "",
    outline: Error ? "1px solid red" : "",
  };

  const summaryoption = [];
  const summaryoption1 = [];
  const summaryoption2 = ["DEFAULT"];
  const summaryoption3 = [];
  const [, setSelectedOptionsummary] = useState("");
  const handleOptionSelectsummary = (option) => {
    setSelectedOptionsummary(option);
  };
 

  return (
    <>
      <div className="mainsummary">
        <div className="mainSummerSub">
          <div className="headingsummery">
            <h3>{inputValue}</h3>
            {inputValue && <p>L5 Global Program Manager</p>}
          </div>
          <i
            id="newclosesumm"
            className="fa-solid fa-xmark"
            onClick={onClose}
          ></i>
          {/* GRID CONTAINER 1 */}
          <div className="subsummary">
            <div className="grid-containerA">
              <div className="griditem1">
                <button>ROLE</button>
              </div>
              <div className="grid-item1">
                <button>SKILLS</button>
              </div>
              <div className="grid-item1">
                <button>AVAILABLE</button>
              </div>
            </div>
            {/* GRID CONTAINER 2 */}
            <div className="grid-containerB">
              <div className={`griditemB ${Error ? "Error" : ""}`}>
                <input
                  className="servicesummary-input"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  style={errorBorderStyle}
                  id="gridInput"
                />
                <label
                  htmlFor=""
                  className="labelChange"
                  style={errorLabelStyle}
                >
                  {Error ? "ROLE IS A REQUIRED FILED" : "ROLE"}
                </label>
                <i
                  className="fa fa-pencil"
                  aria-hidden="true"
                  size="xs"
                  id="pencilsummaryicon"
                ></i>
              </div>
              <div id="grid-pcr-griddropdown" className="gridicustom">
                <CustomDropDown
                  label="RATECARD"
                  optionsgrid={summaryoption}
                  onSelect={handleOptionSelectsummary}
                />
              </div>
              <div id="grid-radioB">
                <input
                  id="serviceradioB"
                  type="checkbox"
                  disabled
                  className="summarycheck"
                />
                <label htmlFor="" id="servicesummaryl">
                  PINNED
                </label>
              </div>
              <div id="grid-radioB">
                <input
                  id="serviceradioB"
                  type="checkbox"
                  disabled
                  className="summarycheck"
                />
                {/* <i id='checkicon' className="fa-solid fa-check" /> */}
                <label htmlFor="" className="servicesummarycheck">
                  BILLABLE
                </label>
              </div>
            </div>
            {/* grid container 3 */}
            <div className="grid-containerC">
              <div className="grid-itemB">
                <input type="text" className="servicesummary-input" readOnly />
                <label htmlFor="" className="servicesummary">
                  QUANTITY
                </label>
              </div>
              <div className="grid-itemB">
                <input type="text" className="servicesummary-input" readOnly />
                <label htmlFor="" className="servicesummary">
                  UOM
                </label>
              </div>
              <div className="grid-itemB">
                <input type="text" className="servicesummary-input" readOnly />
                <label htmlFor="" className="servicesummary">
                  NET PRICE
                </label>
              </div>
              <div className="grid-itemB">
                <input type="text" className="servicesummary-input" readOnly />
                <label htmlFor="" className="servicesummary">
                  COST
                </label>
              </div>
              <div className="grid-itemB">
                <input type="text" className="servicesummary-input" readOnly />
                <label htmlFor="" className="servicesummary">
                  EXPENSES
                </label>
              </div>
              <div className="grid-itemB">
                <input type="text" className="servicesummary-input" readOnly />
                <label htmlFor="" className="servicesummary">
                  MARGIN
                </label>
                <i
                  className="fa fa-pencil"
                  aria-hidden="true"
                  size="xs"
                  id="pencilsummaryicon1"
                ></i>
              </div>
            </div>
            {/* GRID CONTAINER 4 */}
            <div className="grid-containerD">
              <div className="grid-itemB">
                <input type="text" className="servicesummary-input" readOnly />
                <label htmlFor="" className="servicesummary">
                  NET RATE
                </label>
                <i
                  className="fa fa-pencil"
                  aria-hidden="true"
                  size="xs"
                  id="pencilsummaryicon2"
                ></i>
              </div>
              <div className="grid-itemB">
                <input type="text" className="servicesummary-input" readOnly />
                <label htmlFor="" className="servicesummary">
                  UNIT LIST PRICE
                </label>
              </div>
              <div className="grid-itemB">
                <input type="text" className="servicesummary-input" />
                <label htmlFor="" className="servicesummary">
                  DISCOUNT
                </label>
                <i
                  className="fa fa-pencil"
                  aria-hidden="true"
                  size="xs"
                  id="pencilsummaryicon3"
                ></i>
              </div>
              <div id="grid-radioB">
                <input
                  id="serviceradioB1"
                  type="checkbox"
                  disabled
                  className="serviceradioB"
                />
                <label htmlFor="" className="servicesummary1">
                  PROHIBIT DISCOUNT
                </label>
              </div>
            </div>
            {/* GRID CONTAINER 5 */}
            <div className="grid-containerE">
              <div className="grid-itemB">
                <input type="text" className="servicesummary-input" readOnly />
                <label htmlFor="" className="servicesummary">
                  UNIT COST
                </label>
              </div>
              <div className="grid-itemB">
                <input type="text" className="servicesummary-input" readOnly />
                <label htmlFor="" className="servicesummary">
                  STANDARD UNIT COST
                </label>
              </div>
              <div className="grid-itemB">
                <input type="text" className="servicesummary-input" readOnly />
                <label htmlFor="" className="servicesummary">
                  COLA
                </label>
              </div>
              <div id="grid-itemB">
                <input type="text" className="servicesummary-input" readOnly />
                <label htmlFor="" className="servicesummary">
                  POLA
                </label>
              </div>
            </div>
            {/* GRID CONTAINER 6 */}
            <div className="grid-containerF">
              <div className="griditem1">
                <button>GENERAL</button>
              </div>
              <div className="grid-item1">
                <button>CATEGORIES</button>
              </div>
              <div className="grid-item1">
                <button>ADDITIONAL INFO</button>
              </div>
              <div className="grid-item1">
                <button></button>
              </div>
            </div>
            {/* 7 */}
            <div className="grid-containerG">
              <div className="gridicustom">
                <CustomDropDown
                  label=" SOURCE ORG"
                  optionsgrid={summaryoption1}
                  onSelect={handleOptionSelectsummary}
                />
              </div>
              <div className="grid-itemB">
                <CustomDropDown
                  label="PRACTICE"
                  optionsgrid={summaryoption3}
                  onSelect={handleOptionSelectsummary}
                />
              </div>
            </div>
            {/* 8 */}
            <div className="grid-containerH">
              <div className="gridicustom">
                <CustomDropDown
                  label=" ROLE GROUP"
                  optionsgrid={summaryoption2}
                  onSelect={handleOptionSelectsummary}
                />
              </div>

              <div className="grid-itemB">
                <input className="servicesummary-input" type="text" />
                <label htmlFor="" className="servicesummary">
                  PCR CODE
                </label>
                <i
                  className="fa fa-pencil"
                  aria-hidden="true"
                  size="xs"
                  id="pencilsummaryicon4"
                ></i>
              </div>
              <div className="grid-itemB">
                <input className="servicesummary-input" type="text" />
                <label htmlFor="" className="servicesummary">
                  EXTERNAL REFERENCE
                </label>
                <i
                  className="fa fa-pencil"
                  aria-hidden="true"
                  size="xs"
                  id="pencilsummaryicon5"
                ></i>
              </div>
            </div>
            {/*  */}
            <div className="grid-containerI">
              <div id="grid-radioB">
                <input
                  id="serviceradioB"
                  type="checkbox"
                  disabled
                  className="summarycheck"
                />
                <label htmlFor="" className="servicesummaryll1">
                  ONSITE
                </label>
              </div>
              <div id="grid-radioB">
                <input
                  id="serviceradioB"
                  type="checkbox"
                  disabled
                  className="summarycheck"
                />
                <label htmlFor="" className="servicesummaryll2">
                  EMPLOYEE
                </label>
              </div>
              <div id="grid-radioB">
                <input
                  id="serviceradioB"
                  type="checkbox"
                  disabled
                  className="serviceradioB"
                />
                <label htmlFor="" className="servicesummaryll3">
                  EXPENSES
                </label>
              </div>
              <div id="grid-radioB">
                <input
                  id="serviceradioB"
                  type="checkbox"
                  disabled
                  className="summarycheck"
                />
                <label htmlFor="" className="servicesummaryll4">
                  CUSTOMER
                </label>
              </div>
            </div>
            <div className="grid-containerJ">
              <div className="grid-itemB">
                <input className="servicesummary-input" type="text" />
                <label className="servicesummary" htmlFor="">
                  NOTE
                </label>
                <i
                  className="fa fa-pencil"
                  aria-hidden="true"
                  size="xs"
                  id="pencilsummaryicon6"
                ></i>
              </div>
            </div>
          </div>
          <div className="grid-containerK">
            <div className="grid-itemB-delete">
              <button>DELETE</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Summary;
