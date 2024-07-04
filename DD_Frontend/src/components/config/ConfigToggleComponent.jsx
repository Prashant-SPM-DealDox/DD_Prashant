import React, { useState } from "react";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/config/ConfigToggleComponent.css";

const ConfigSection = ({ sectionNumber, sectionName,toggleid,greysectionId,greySectionNumber,toggleIconId }) => {
  const [isActive, setActive] = useState(false);

  const toggleSection = () => {
    setActive(!isActive);
  };
  const value=toggleid;


  return (
    
    <div>
      <div
        className={`con-sec${sectionNumber}`}
        id={toggleid}
        onClick={toggleSection}
      >
      
        <span
          className={`dropdown-icon-con-sec${sectionNumber}`}
          id={toggleIconId}
          onClick={toggleSection}
        >
          {isActive && value!=="unusedFunctionality" ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </span>
        <span className="config-number" id={greySectionNumber}>{sectionNumber}</span>
        <span className="config-name" id={greysectionId}>{sectionName}</span>
      </div>
    </div>
  );
};

export default ConfigSection;
