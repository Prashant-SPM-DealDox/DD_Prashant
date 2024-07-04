import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/common/CustomDropdown.css";
import { FaCaretDown, FaCaretUp, FaUser } from "react-icons/fa";

const PeopleIconDropdown = ({
  options,
  profileIds,
  onSelect,
  label,
  value,
  Placeholder,
  dropdownClass,
  custuminput,
  showCharacterMessage,
  labelforverticl,
  isBorderVisible,
  readOnly = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const [buttonHide, setButtonHide] = useState(true);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [, setIsValidOption] = useState(true);
  const [, setShowErrorMessage] = useState(false);
  const [selectedOption, setSelectedOption] = useState("NONE");

  useEffect(() => {
    if (value) {
      const formattedValue = formatOption(value);
      setSelectedOption(formattedValue);
      setIsOptionSelected(true);
    } else {
      setSelectedOption("NONE");
      setIsOptionSelected(false);
    }
  }, [value]);

  const toggleDropdown = () => {
    if (!readOnly) {
      setIsOpen(!isOpen);
      setButtonHide(false);
      if (!isOpen) {
        setSearchTerm("");
      }
    } else {
      setButtonHide(true);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    if (options) {
      const isTypedValueValid = options.some((option) => {
        const fullName = option.toLowerCase();
        return fullName.includes(inputValue.toLowerCase());
      });

      setIsValidOption(isTypedValueValid);

      if (!isOpen) {
        setIsOpen(true);
      }

      if (inputValue.length < 3) {
        setShowErrorMessage(true);
      } else {
        setShowErrorMessage(false);
      }
    }
  };

  const selectOption = (option) => {
    const formattedOption = formatOption(option);
    setSelectedOption(formattedOption);
    setButtonHide(true);
    setSearchTerm(formattedOption);
    setIsOpen(false);
    setIsOptionSelected(true);
    setIsValidOption(true);

    if (typeof onSelect === "function") {
      onSelect(option);
    } else {
      console.error("onSelect is not a function");
    }
  };

  const filteredOptions = Array.isArray(options)
    ? options.filter((option) => {
        if (typeof option === "string" && option !== null && option !== "") {
          const words = option.split(" ");
          return words.some((word) =>
            word.toLowerCase().startsWith(searchTerm.toLowerCase())
          );
        }
        return false;
      })
    : [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setButtonHide(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dropdownRef]);

  const renderOption = (option) => {
    if (option === "NONE") {
      return <FaUser className="user_icon" />;
    }

    const [firstName, lastName, profileId] = option.split(" ");
    return (
      <div className="optionselect">
        <button className="button_Splitlist">
          {firstName[0]}
          {lastName[0]}
          {profileId || ""}
        </button>
        <span>
          {firstName} {lastName}
        </span>
      </div>
    );
  };

  const formatOption = (option) => {
    if (option === "NONE") {
      return "";
    }

    const [firstName, lastName, profileId] = option.split(" ");
    return `${firstName[0]}${lastName[0]}${
      profileId || ""
    } ${firstName} ${lastName}`;
  };

  const getFormattedInputValue = (formattedOption) => {
    if (formattedOption === "NONE") {
      return "";
    }
    const [code, ...nameParts] = formattedOption.split(" ");
    return nameParts.join(" ");
  };

  return (
    <div
      className={`content7Container ${isOptionSelected ? "selected" : ""}`}
      ref={dropdownRef}
    >
      <div className="input-wrapperPeopledropdown">
        <input
          autoComplete="off"
          className={`peopledropdowninput ${custuminput}`}
          onClick={toggleDropdown}
          value={isOpen ? searchTerm : getFormattedInputValue(selectedOption)}
          onChange={handleInputChange}
          placeholder={Placeholder}
          style={{
            borderLeft:
              isBorderVisible && (value ?? "").length === 0
                ? "3px solid #216c98"
                : "",
            paddingLeft: isOpen ? "6px" : "50px",
          }}
          readOnly={readOnly}
        />
        <div className="twobtns">
          <span
            htmlFor="content7inputRules"
            className="dropdown-icon-contentAction"
            onClick={toggleDropdown}
          >
            {isOpen ? <FaCaretUp /> : <FaCaretDown />}
          </span>
        </div>
        <label
          htmlFor="peopledropdowninput"
          className={`profileiconlabel ${labelforverticl}`}
        >
          {label}
        </label>
        {!isOpen && selectedOption !== "NONE" && (
          <button className="button_Split">
            {selectedOption.split(" ")[0]}
          </button>
        )}
      </div>
      {isOpen && (
        <ul
          className={`contentActiondropdown ${dropdownClass}`}
          style={{ maxHeight: "150px", overflowY: "auto" }}
        >
          {searchTerm.length < 1 && showCharacterMessage ? (
            <li className="no-results-contnt7">
              PLEASE ENTER 1 OR MORE CHARACTERS
            </li>
          ) : filteredOptions.length === 0 ? (
            <li className="no-results-contnt7">NO ITEMS FOUND</li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                id="ullistcustomdropdown"
                className="dropdown-list-item-content7"
                onClick={() => selectOption(option)}
              >
                {renderOption(option)}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default PeopleIconDropdown;
