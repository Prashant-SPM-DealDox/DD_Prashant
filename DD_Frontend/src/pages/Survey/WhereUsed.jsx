import React from "react";
import Navbar from "../../layouts/Navbar";
import CatalogSidebar from "../../layouts/CatalogSidebar";
import "../../assets/css/survey/WhereUsed.css";
import { useState } from "react";
import InputTypes from "../../components/common/InputTypes";
// import WhereUsedGrid from "../../components/pcrgridwhereused/WhereUsedGrid";
import HeaderBar from "../../components/common/HeaderBar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import HelpRequest from "../../components/common/HelpRequest";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";

const Whereused = () => {
  const { securityRoleData } = useContext(DataContext);
  const whereUsedPagePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].catalog_surevys_whereused
      : "";

  const isReadOnly = whereUsedPagePermission === "readOnly";

  // ------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Survey Name");
  const [filteredOptions, setFilteredOptions] = useState([
    "Survey Name",
    "Survey Id",
  ]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filterOptions = (event) => {
    const searchInput = event.target.value.toLowerCase();
    const filtered = ["Survey Name", "Survey Id"].filter((option) =>
      option.toLowerCase().includes(searchInput)
    );
    setFilteredOptions(filtered);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selecting an option
  };
  // --------------
  const [, setInputValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [valChange, setValChange] = useState(true);
  const [valChange1, setValChange1] = useState(false);
  const [valChange2, setValChange2] = useState(false);
  const [myInputColor, setmyInputColor] = useState("#0f6b93");
  const updateLabel = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length >= 3) {
      setValChange(true);
      setValChange1(false);
      setValChange2(false);
      setmyInputColor("#0f6b93");
    } else if (value.length === 0) {
      setValChange(false);
      setValChange1(false);
      setValChange2(true);
      setmyInputColor("red");
    } else {
      setValChange(false);
      setValChange1(true);
      setValChange2(false);
      setmyInputColor("red");
    }

    if (value.length >= 3) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  return (
    <div>
      <Navbar />
      <CatalogSidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link to="/home" className="breadcrumbs--link_mid">
              Home
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link className="breadcrumbs--link_mid">Catalog</Link>
          </li>
          <li className="breadcrumbs--item">
            <Link className="breadcrumbs--link_mid">Survey</Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="" className="breadcrumbs--link--active">
              WhereUsed
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />
      {/* -------------------------- */}
      <div>
        <div className="whereused">
          <div className="whereUsedRight">
            <div className="wheredUsedUpper">
              <div className="custom-dropdown">
                <div className="dropdown-header" onClick={toggleDropdown}>
                  <span id="searchtypespan">{selectedOption}</span>
                  <label id="svtype">SEARCH TYPE</label>
                  <FontAwesomeIcon icon={faCaretDown} id="iconanle" />
                </div>
                <div
                  className="dropdown-options"
                  id="dropdownOptions"
                  style={{ display: isOpen ? "block" : "none" }}
                >
                  <input
                    type="text"
                    placeholder="Search"
                    onKeyUp={filterOptions}
                  />

                  <ul>
                    {filteredOptions.map((option, index) => (
                      <li key={index} onClick={() => selectOption(option)}>
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <>
                <div className="consultingwheres" id="consulting">
                  <input
                    type="text"
                    id="myInput"
                    className="nmv"
                    placeholder="Name Of The Survey"
                    onInput={updateLabel}
                    style={{ outlineColor: myInputColor }}
                  />

                  {valChange && <label id="valChange">VALUE</label>}
                  {valChange1 && (
                    <label
                      className="valChange"
                      id="valChange1"
                      style={{
                        display: valChange1,
                        fontSize: "10px",
                        color: "red",
                      }}
                    >
                      SHOULD BE AT LEAST 3 CHARACTERS
                    </label>
                  )}
                  {valChange2 && (
                    <label
                      className="valChange"
                      id="valChange2"
                      style={{ color: "red" }}
                    >
                      THE FIELD IS REQUIRED
                    </label>
                  )}
                </div>
              </>
              <div className="whereCheckbox">
                <div id="checkbox1">
                  <input type="checkbox" className="checkbox_where"></input>
                  <label className="checkboxlabel_where">
                    MATCH ON PARTIAL TIME
                  </label>
                </div>

                <div id="checkbox2">
                  <input type="checkbox" className="checkbox_where"></input>
                  <label className="checkboxlabel">ONLY APPROVED QUOTES</label>
                </div>
              </div>
              <div id="calendar1">
                <InputTypes
                  showFlagCalender={true}
                  CalenderLabel="FROM"
                  selectedDate
                  placeholder="STARTING DATE"
                  readOnly={whereUsedPagePermission === "readOnly"}
                />
              </div>

              <div id="calendar2">
                <InputTypes
                  showFlagCalender={true}
                  CalenderLabel="TO"
                  selectedDate
                  placeholder="ENDING DATE"
                  readOnly={whereUsedPagePermission === "readOnly"}
                />
              </div>
              <div id="searchclear">
                <button id="update_data " disabled={isButtonDisabled}>
                  SEARCH
                </button>
                <button id="delete_data" type="clear">
                  CLEAR
                </button>
                {/* <label>SEARCH TYPE</label> */}
              </div>
            </div>

            {/* <div className="rightwhereused"> */}
            <div id="whereusedheader">
              <HeaderBar headerlabel="WHEREUSED" />
            </div>
            {/* <div className="whereUsedGrid">
              <WhereUsedGrid />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whereused;
