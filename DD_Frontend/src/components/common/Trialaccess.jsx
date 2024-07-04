import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/common/CustomDropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const Trialaccess = ({
  options,
  onSelect,
  label,
  value,
  onChange,
  Placeholder,
  dropdownClass,
  custuminput,
  labelforverticl,
  isBorderVisible,
  showCancel,
  ID,
  readOnly = false,
  activeAccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(value || "");
  const [isOptionSelected, setIsOptionSelected] = useState(!!value);
  const [isValidOption, setIsValidOption] = useState(true);

  const toggleDropdown = () => {
    if (!readOnly) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchTerm("");
      }
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Check if the typed value is in the list of options
    const isTypedValueValid = options.some(
      (option) =>
        option &&
        typeof option === "string" && // Ensure option is a string
        option.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Update the search term only if the typed value is valid
    setSearchTerm(inputValue);
    setIsValidOption(isTypedValueValid);

    if (!isOpen) {
      setIsOpen(true);
    }

    // Only call onChange if the typed value is explicitly selected from the dropdown
    if (isTypedValueValid && inputValue === selectedOption && onChange) {
      onChange(inputValue);
    }
  };

  const selectOption = (option) => {
    if (isActiveOption(option)) {
      const formattedOption = option
        .split("(")
        .map((section, index) => {
          if (index === 0) {
            return section
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ");
          } else {
            return "(" + section.toUpperCase();
          }
        })
        .join(" ");

      setSelectedOption(formattedOption);
      setSearchTerm(formattedOption);
      setIsOpen(false);
      setIsOptionSelected(true);
      setIsValidOption(true);
      if (typeof onSelect === "function") {
        onSelect(option);
      } else {
        // Handle the case where onSelect is not a function
        console.error("onSelect is not a function");
      }
    }
  };

  const clearSelection = () => {
    setSelectedOption("");
    setSearchTerm("");
    setIsOptionSelected(false);
    onSelect("");
  };

  // Define filteredOptions here
  const filteredOptions = Array.isArray(options)
    ? options.filter(
        (option) =>
          option &&
          typeof option === "string" && // Ensure option is a string
          option.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActiveOption = (option) => {
    return activeAccess.some(
      (access) => access.org_name === option && access.active
    );
  };

  return (
    <div
      className={`content7Container ${isOptionSelected ? "selected" : ""}`}
      ref={dropdownRef}
    >
      <div className="input-wrapper">
        <input
          autoComplete="off"
          className={`content7inputRules ${custuminput}`}
          onClick={toggleDropdown}
          value={isOpen ? searchTerm : value}
          onChange={handleInputChange}
          placeholder={Placeholder}
          id={ID}
          style={{
            borderLeft:
              isBorderVisible && (value ?? "").length === 0
                ? "3px solid #216c98"
                : "",
          }}
          readOnly={readOnly}
        />
        <div className="twobtns">
          <span
            htmlFor="content7inputRules"
            className="dropdown-icon-contentAction"
            onClick={toggleDropdown}
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
            {showCancel && isOptionSelected ? (
              <span className="cancel-button" onClick={clearSelection}>
                <FontAwesomeIcon icon={faTimesCircle} id="cancelicon" />
              </span>
            ) : null}
          </span>
        </div>
        <label
          htmlFor="content7inputRules"
          className={`content7vertical ${labelforverticl}`}
        >
          {label}
        </label>
      </div>
      {isOpen && (
        <ul
          className={`contentActiondropdown ${dropdownClass}`}
          style={{ maxHeight: "150px", overflowY: "auto" }}
        >
          {filteredOptions.length === 0 ? (
            <li className="no-results-contnt7">NO RESULTS FOUND</li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                id="ullistcustomdropdown"
                onClick={() => selectOption(option)}
              >
                {isActiveOption(option) ? (
                  <span>{option}</span>
                ) : (
                  <span className="inactive-option">{option} - INACTIVE</span>
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Trialaccess;
