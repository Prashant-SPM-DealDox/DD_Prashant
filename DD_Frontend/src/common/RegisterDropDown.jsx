
import React, { useState, useRef,useEffect } from 'react';
import "./RegisterDropDown.css";
import "./NewRegister.css";
import { FaAngleDown } from "react-icons/fa6";



const RegisterDropDown = ({
  options,
  onSelect,
  value,
  onChange,
  Placeholder,
  dropdownClass,
  custuminput,
  labelforverticl,
  isBorderVisible,
  showCancel,
  ID,
  name,
  className,
  readOnly = false
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
    setSearchTerm(inputValue);
    setIsOpen(true);
  };

  const selectOption = (option) => {
    const formattedOption = option.split("(").map((section, index) => {
      if (index === 0) {
        return section
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
      } else {
        return "(" + section.toUpperCase();
      }
    }).join(" ");
    setSelectedOption(formattedOption);
    setSearchTerm(formattedOption);
    setIsOpen(false);
    setIsOptionSelected(true);
    setIsValidOption(true);
    if (typeof onSelect === "function") {
      onSelect(option); // Pass the selected option to the onSelect function
    } else {
      console.error("onSelect is not a function");
    }
  };

  const clearSelection = () => {
    setSelectedOption("");
    setSearchTerm("");
    setIsOptionSelected(false);
    onSelect("");
  };

  const filteredOptions = Array.isArray(options) ? options.filter((option) => {
    if (typeof option === "string" && option !== null && option !== undefined) {
      return option.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  }) : [];



  
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
    <div className="input-div" ref={dropdownRef}>
      <input
        type="text"
        placeholder={Placeholder}
        className={className}
        onClick={toggleDropdown}
        value={isOpen ? searchTerm : value}
        onChange={handleInputChange}
        name={name}
        id={ID}
        style={{
          borderLeft: isBorderVisible && (value ?? "").length === 0 ? "3px solid #216c98" : "",
        }}
        readOnly={readOnly}
       
      />
       <FaAngleDown className='register-toggle' style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} />

      {isOpen && (
        <ul className={filteredOptions.length === 0 ? "no-result-ul" : "registerlistItems"} style={{ maxHeight: "150px", overflowY: "auto" }}>
          {filteredOptions.length === 0 ? (
            <li className="no-result">NO RESULTS FOUND</li>
          ) : (
            filteredOptions.map((option, index) => (
              <li key={index} className="indivisual-list-item" onClick={() => selectOption(option)}>
                {option}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default RegisterDropDown;

