import React, { useEffect, useState, useRef } from "react";
import "./CustomInput.css";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

export const CustomTextField = ({
  className = "",
  name,
  onChange,
  label,
  error,
  value,
  placeholder,
  readOnly = false,
}) => {
  return (
    <div
      className={`${className} ${
        error ? "!border-solid !border-2 !border-red-600" : ""
      } custom-inputs custom--textfield`}
      id="custom-input-container"
    >
      <input
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        className={className}
        autoComplete="new-password"
        id={`${error ? "input-error-message" : "custom-input-box"}`}
        readOnly={readOnly}
      />

      <small
        className={`uppercase ${error ? "!text-red-600" : ""}`}
        id={`${error ? "label-error-message" : "custom-label-container"}`}
      >
        {label} {error ? "is required" : ""}
      </small>
    </div>
  );
};

export const CustomDropDown = ({
  className = "",
  name,
  onChange,
  label,
  error,
  value,
  options,
  ID,
  readOnly = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSearchText, setCurrentSearchText] = useState(value);
  const [, setIsInputFocused] = useState(false);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const filterOptions = (text) => {
    return Array.isArray(options)
      ? text === ""
        ? options
        : options.filter((x) => x.toLowerCase().includes(text.toLowerCase()))
      : [];
  };

  useEffect(() => {
    setCurrentSearchText(value);
  }, [value]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setCurrentSearchText(""); // Clear search text when opening the dropdown
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    if (isOpen) {
      setIsOpen(false); // Close the dropdown if it's open when the input is focused
    }
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`${className} ${
        error ? "!border-solid !border-2 !border-red-600" : ""
      } custom-inputs custom--select`}
      id="custom-input-container"
    >
      {/* <input
        readOnly={readOnly}
        name={name}
        onChange={(e) => {
          setCurrentSearchText(e.target.value);
          onChange(e);
        }}
        value={currentSearchText}
        onFocus={() => {
          setIsOpen(true);
          setCurrentSearchText("");
        }}
        autoComplete="off"
        id={`${error ? "input-error-message" : "custom-input-box"}`}
        // onClick={() => setIsOpen(!isOpen)} 
        onClick={toggleDropdown} 
      /> */}
      <input
        ref={inputRef}
        readOnly={readOnly}
        name={name}
        onChange={(e) => {
          setCurrentSearchText(e.target.value);
          onChange(e);
        }}
        value={currentSearchText}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onClick={toggleDropdown} // Toggle isOpen state when clicking inside the input
        autoComplete="new-password"
        id={`${error ? "input-error-message" : "custom-input-box"}`}
      />
      {isOpen ? (
        <FaCaretUp className="toggleIconUp" size={16} />
      ) : (
        <FaCaretDown className="toggleIcondown" size={16} />
      )}
      {isOpen && (
        <div className={`dropdown-list`}>
          <ul className="unorderedList-options">
            {options &&
              filterOptions(currentSearchText).map((option, index) => {
                const isDisabled =
                  option === "AUTOMATIC UPDATE" || option === "PROMPT USER";
                return (
                  <li
                    key={`${option}-${index}`}
                    onClick={() => {
                      if (!isDisabled) {
                        if (option === value) {
                          setCurrentSearchText(option);
                        } else {
                          onChange({
                            target: {
                              name: name,
                              value: option,
                            },
                          });
                        }
                        setIsOpen(false);
                      }
                    }}
                    id="dropdown-listOptions"
                    className={isDisabled ? "disabled-option" : ""}
                    style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
                  >
                    {option}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
      <small
        className={`uppercase ${error ? "!text-red-600" : ""}`}
        id={`${error ? "label-error-message" : "custom-label-container"}`}
      >
        {label} {error ? "is required" : ""}
      </small>
    </div>
  );
};
