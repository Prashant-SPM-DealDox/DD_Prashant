import React, { useState } from "react";
import "../../assets/css/pcrGrid/NewTask.css";
import CustomDropDown from "../../components/common/CustomDropdown";
import InputTypes from "../../components/common/InputTypes";
import "react-datetime/css/react-datetime.css";
import ErrorMessage from "../../components/common/ErrorMessage";

function NewTask({ subTask, onClose }) {
  // Define your date change handler

  const secondoption = [];
  const [selectedOptionitem, setSelectedOptionitem] = useState("");
  const handleOptionSelect = (option) => {
    setSelectedOptionitem(option);
  };
  return (
    <>
      <div className="mainservicetask">
        <i id="newclose" className="fa-solid fa-xmark" onClick={onClose}></i>
        <h4>NON-DD MS DEAL APPROVAL</h4>
        {/* gridcontainer1 */}
        <div className="subtask">
          <div className="gridcontainer1">
            <InputTypes showFlagNumber={true} NumberLabel="NUMBER" />

            <div className="gridseconditem">
              <ErrorMessage
                showFlaxErrorMessageTextNoMandatory={true}
                placeholdersectionNoMandatory="Task Name"
                labelNoMAndatory={"TAsk"}
                validationlabelNoMandatoryy="newtaskerrorlebel"
                errormsgNoMandatory="TASK IS A REQUIRED FILED"
              />
            </div>
            <div className="gridcustomtask">
              <CustomDropDown
                label="TASK TYPE"
                optionsgrid={secondoption}
                onSelect={handleOptionSelect}
              />
            </div>
            <div id="grid-radio" className="grid-item1">
              <input
                id="serviceradio"
                type="checkbox"
                className="servicenametask"
                disabled
              />
              <label className="servicelabel4" htmlFor="">
                MILESTONE
              </label>
            </div>
          </div>

          {/* gridcontainer2 */}
          <div className="gridcontainer2">
            <div className="grid-item2">
              <input
                type="text"
                placeholder=""
                className="servicenametask"
                readOnly
              />
              <label className="servicelabel1" htmlFor="">
                MARGIN
              </label>
            </div>
            <div className="grid-item2">
              <input
                type="text"
                placeholder=""
                className="servicenametask"
                readOnly
              />
              <label className="servicelabel1" htmlFor="">
                PRICE
              </label>
            </div>
            <div className="grid-item2">
              <input
                type="text"
                placeholder=""
                className="servicenametask"
                readOnly
              />
              <label className="servicelabel1" htmlFor="">
                COST
              </label>
            </div>
          </div>

          {/* gridcontainer3 */}
          <div className="gridcontainer3">
            <div className="grid-item3">
              <InputTypes showFlagCalender={true} CalenderLabel="START DATE" />
            </div>
            <div className="grid-item3">
              <InputTypes showFlagCalender={true} CalenderLabel="END DATE" />
            </div>
            <div className="grid-item3">
              <input
                className="servicenametask"
                type="text"
                readOnly
                placeholder=""
              />
              <label htmlFor="" className="servicelabel14">
                DURATION
              </label>
            </div>
          </div>
          {/* gridcontainer4 */}
          <div className="gridcontainer4">
            <div className="grid-item4">
              <input
                className="servicenametask"
                type="text"
                placeholder="Note"
              />
              <label htmlFor="" className="servicelabel1">
                NOTE
              </label>
              <i
                className="fa fa-pencil"
                aria-hidden="true"
                id="pencil-icon1"
              ></i>
            </div>
          </div>
        </div>
        {/* gridcontainer5 */}
        <div className="gridcontainer5">
          <button>DELETE</button>
        </div>
      </div>
    </>
  );
}

export default NewTask;
