import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/doctypeSidePanel/DoctypeSidePanel.css";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const DocTypeDropdown = ({
  placeholder,
  label,
  doctypePublished,
  onSelect,
  updateChild1State,
  selectedOptionsContentdoctype,
  panelType,
  setUnSavedChange,
}) => {
  const [isContentdoctypeOpen, setIsContentdoctypeOpen] = useState(false);
  //const [selectedOptionsContentdoctype, setSelectedOptionsContentdoctype] = useState([selectedOptionsContentdoctype1]);
  const [ContentdoctypeSearchTerm, setContentdoctypeSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(5);
  const [showMore, setShowMore] = useState(true);
  const dropdownContentdoctypeRef = useRef(null);
  const [sortedDoctypes, setSortedDoctypes] = useState([]);

  const toggleDropdownContentdoctype = () => {
    setIsContentdoctypeOpen(!isContentdoctypeOpen);
    if (!isContentdoctypeOpen) {
      setContentdoctypeSearchTerm("");
    }
  };

  const toggleOptionContentdoctype = (option) => {
    if (selectedOptionsContentdoctype.includes(option)) {
      //setSelectedOptionsContentdoctype(selectedOptionsContentdoctype.filter((item) => item !== option));
      updateChild1State(
        selectedOptionsContentdoctype.filter((item) => item !== option)
      );
    } else {
      //setSelectedOptionsContentdoctype([...selectedOptionsContentdoctype, option]);
      updateChild1State([...selectedOptionsContentdoctype, option]);
    }
    setUnSavedChange(true);
  };

  // const passStateToChild1 = () => {
  //   updateChild1State(selectedOptionsContentdoctype);
  // }

  const clearSelectedOption = (option) => {
    updateChild1State(
      selectedOptionsContentdoctype.filter((item) => item !== option)
    );
  };

  // const filteredOptionsContentdoctype = doctypePublished.filter((option) =>
  //   typeof option === 'string' && option.toLowerCase().includes(ContentdoctypeSearchTerm.toLowerCase())
  // );

  useEffect(() => {
    function handleClickOutsideContentdoctype(event) {
      if (
        dropdownContentdoctypeRef.current &&
        !dropdownContentdoctypeRef.current.contains(event.target)
      ) {
        setIsContentdoctypeOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideContentdoctype);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutsideContentdoctype
      );
    };
  }, []);

  // const generateSelectedOptionsString = () => {
  //   if (selectedOptionsContentdoctype.length === 0) {
  //     return <div className="selected-options-placeholder">{placeholder}</div>;
  //   }

  //   return selectedOptionsContentdoctype.map((option) => (
  //     <span key={option} className="selected-option">
  //       {option?.doc_name}
  //       {!panelType && (
  //         <button
  //           className="cancel-buttonn"
  //           onClick={() => clearSelectedOption(option)}
  //         >
  //           X
  //         </button>
  //       )}
  //     </span>
  //   ));
  // };

  const generateSelectedOptionsString = () => {
    if (selectedOptionsContentdoctype.length === 0) {
      return <div className="selected-options-placeholder">{placeholder}</div>;
    }

    return doctypePublished.map((option) => {
      if (selectedOptionsContentdoctype.includes(option._id)) {
        return (
          <span key={option._id} className="selected-option">
            {option.doc_name}
            {!panelType && (
              <button
                className="cancel-buttonn"
                onClick={() => clearSelectedOption(option._id)}
              >
                X
              </button>
            )}
          </span>
        );
      }
      return "";
    });
  };

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 3);
  };

  // console.log(ContentdoctypeSearchTerm);
  const filteredAndSortedOptions = sortedDoctypes
    .filter((option) =>
      option.doc_name
        .toLowerCase()
        .includes(ContentdoctypeSearchTerm.toLowerCase())
    )
    .slice(0, displayCount);
  useEffect(() => {
    // Sorting and resetting display count
    const sorted = [...doctypePublished].sort((a, b) =>
      a.doc_name.localeCompare(b.doc_name)
    );
    setSortedDoctypes(sorted);
    setDisplayCount(5); // Reset display count when search term changes

    // Filter and determine if "Show More" should appear
    const filtered = sorted.filter((option) =>
      option.doc_name
        .toLowerCase()
        .includes(ContentdoctypeSearchTerm.toLowerCase())
    );
    setShowMore(filtered.length > 5);
  }, [doctypePublished, ContentdoctypeSearchTerm]);
  return (
    <div>
      <div className="containerdoctype">
        <div
          className="contentdoctypeallContainer"
          ref={dropdownContentdoctypeRef}
        >
          <div className="contentalldoctype">
            <div className="selected-options-allcontainer">
              {generateSelectedOptionsString()}
            </div>
            {selectedOptionsContentdoctype &&
              !selectedOptionsContentdoctype.length && (
                <label className="contentdoctypeallvertical">{label}</label>
              )}
            {!panelType && (
              <span
                className="dropdown-icon-allcontentdoctype"
                onClick={toggleDropdownContentdoctype}
              >
                {isContentdoctypeOpen ? (
                  <FaAngleUp
                    onClick={toggleDropdownContentdoctype}
                    style={{ float: "right" }}
                    id="anglupdown"
                  />
                ) : (
                  <FaAngleDown
                    onClick={toggleDropdownContentdoctype}
                    style={{ float: "right" }}
                    id="anglupdown"
                  />
                )}
              </span>
            )}
          </div>
          {isContentdoctypeOpen && (
            <ul
              className="options-alldropdown"
              style={{
                overflowY: "scroll",
                overflowX: "auto",
                maxHeight: showMore ? "150px" : "180px",
                minHeight: showMore ? "150px" : "180px",
              }}
            >
              <input
                type="search"
                placeholder="Start Typing to Search..."
                className="serchdoctpe"
                value={ContentdoctypeSearchTerm}
                onChange={(e) => setContentdoctypeSearchTerm(e.target.value)}
              />
              {filteredAndSortedOptions.map((option, index) => (
                <li
                  key={index}
                  className={`option ${
                    selectedOptionsContentdoctype.includes(option._id)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => toggleOptionContentdoctype(option._id)}
                >
                  {option.doc_name}
                </li>
              ))}

              {showMore && (
                <div className="showdiv">
                  <button className="show-more-button" onClick={handleShowMore}>
                    SHOW MORE
                  </button>
                </div>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocTypeDropdown;
