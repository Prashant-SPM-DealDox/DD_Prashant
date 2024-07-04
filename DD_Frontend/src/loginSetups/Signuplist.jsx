import React, { useState, useEffect, useRef } from "react";
import '../assets/css/login/Signuplist.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

const CustomDropdown = ({
  options,
  onSelect,
  label,
  value,
  Placeholder,
  dropdownClass,
  custuminput,
  labelforverticl,
  isBorderVisible,
SignupContainerdiv,
  ID,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(value || "");
  const [isOptionSelected, setIsOptionSelected] = useState(!!value);

  const SignupDropdown= () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);

    if (!isOpen) {
      setIsOpen(true);
    }
  };
  const selectOption = (option) => {
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
    onSelect(option);
  };
  const filteredOptions = Array.isArray(options)
    ? options.filter((option) =>
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

  return (
    <div
      className={`signupContainer ${
        isOptionSelected ? "selected" : ""
      } ${SignupContainerdiv}`}
      ref={dropdownRef}
    >
      <div className="input-Signup">
        <input
          className={`signupinputRules ${custuminput}`}
          onClick={SignupDropdown}
          value={isOpen ? searchTerm : selectedOption}
          onChange={handleInputChange}
          placeholder={Placeholder}
          id={ID}
          style={{
            borderLeft:
              isBorderVisible && selectedOption.length === 0
                ? "3px solid #216c98"
                : "0.1px solid rgb(218, 217, 217)",
          }}
          autoComplete="new-password"
        />
        <div className="Signuptwobtns">
          <span
            for="signupinputRules"
            className="dropdown-icon-Signup"
            onClick={SignupDropdown}
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}

          </span>
        </div>
        <label
          htmlFor="signupinputRules"
          className={`Signupvertical ${labelforverticl}`}
        >
          {label}
        </label>
      </div>
      {isOpen && (
        <ul
          className={`contentSignupdropdown ${dropdownClass}`}
          style={{ maxHeight: "150px", overflowY: "auto" }}
        >
          {filteredOptions.length === 0 ? (
            <li className="no-results-signup">NO RESULTS FOUND</li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                id="Signupcustomdropdown"
                className="dropdown-list-item-Signup"
                onClick={() => selectOption(option)}
              >
                {option}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
