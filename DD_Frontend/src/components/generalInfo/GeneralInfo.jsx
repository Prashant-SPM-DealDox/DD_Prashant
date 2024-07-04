import React from "react";
import CustomDropdown from "../common/CustomDropdown";
import { useState } from "react";
import HeaderBar from "../../components/common/HeaderBar";
import InputTypes from "../../components/common/InputTypes";

const GeneralInfos = () => {
  const [isDropdownGeneralOpen, setDropdownGeneralOpen] = useState(false);

  const handleToggle = () => {
    setDropdownGeneralOpen(!isDropdownGeneralOpen);
  };
  return (
    <div className="general info">
      <div className="headerRoles2" onClick={handleToggle}>
        <HeaderBar
          headerlabel={"GENERAL INFO"}
          isButtonVisible={true}
          isDropdownGeneralOpen={isDropdownGeneralOpen}
          headerbardiv="headerbardiv_items_general"
        />
      </div>
      {isDropdownGeneralOpen && (
        <div>
          <div id="generalInfoFist">
            <div>
              <CustomDropdown label={"PREFERED SUPPLIER"} />
            </div>
            <div>
              <InputTypes
                type={"number"}
                showFlagText={true}
                TextLabel="SUPPLIER ITEM NUMBER"
              />
            </div>
            <div>
              <InputTypes
                type={"number"}
                showFlagText={true}
                TextLabel="CATALOG NUMBER"
              />
            </div>
            <div>
              <InputTypes
                type={"text"}
                showFlagText={true}
                TextLabel="EXTERNAL REFERENCE"
              />
            </div>
          </div>
          <div id="generalInfoSecond">
            <div>
              <InputTypes
                type={"number"}
                showFlagText={true}
                TextLabel="SUPPLIER ITEM NUMBER"
              />
            </div>
            <div>
              <InputTypes
                type={"number"}
                showFlagText={true}
                TextLabel="SUPPLIER ITEM NUMBER"
              />
            </div>
            <div>
              <InputTypes
                type={"number"}
                showFlagText={true}
                TextLabel="CATALOG NUMBER"
              />
            </div>
            <div>
              <InputTypes
                type={"text"}
                showFlagText={true}
                TextLabel="EXTERNAL REFERENCE"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralInfos;
