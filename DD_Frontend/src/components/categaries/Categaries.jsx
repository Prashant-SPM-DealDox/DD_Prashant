import React, { useState } from "react";
import HeaderBar from "../common/HeaderBar";
import CustomDropdown from "../common/CustomDropdown";
import InputTypes from "../common/InputTypes";

const Categories = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  // Define your categories as an array of objects
  const categories = [
    { label: "CATEGORY 1", options: ["DEFAULT"] },
    { label: "CATEGORY 2", inputType: "text", showFlagText: true },
    { label: "CATEGORY 3", options: ["DEFAULT"] },
    { label: "CATEGORY 4", options: ["DEFAULT"] },
    { label: "CATEGORY 5", options: ["DEFAULT"] },
    { label: "CATEGORY 6", options: ["DEFAULT"] },
  ];
  return (
    <div>
      <div className="headerRoles2" onClick={handleToggle}>
        <HeaderBar
          headerlabel={"CATEGORIES"}
          isButtonVisible={true}
          isDropdownOpen={isDropdownOpen}
          headerbardiv="headerbardiv_items"
        />
      </div>
      {isDropdownOpen && (
        <div className="categaries" onClick={(e) => e.stopPropagation()}>
          <div className="categaries1grid">
            {/* Map through the categories array and render components */}
            {categories.map((category, index) => (
              <div key={index} id="contentS123">
                {category.options ? (
                  <CustomDropdown
                    label={category.label}
                    options={category.options}
                  />
                ) : (
                  <InputTypes
                    type={category.inputType}
                    showFlagText={category.showFlagText}
                    TextLabel={category.label}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
