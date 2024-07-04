import React, { useState, useEffect } from "react";
import "../../assets/css/common/WriteFlex.css";
import { FaPlus, FaSearch, FaRegUser } from "react-icons/fa";
import CustomDropdown from "./CustomDropdown";

const WriteFlex = ({
  showGrouping = false,
  resetFields,
  onItemSelect,
  data,
  dataType,
  permission,
  hasItems,
  showFlagProfile,
}) => {
  const [peopleId, setPeopleId] = useState("");
  const dataSort =
    data &&
    data?.sort((a, b) => {
      if (a.accounts !== b.accounts) {
        return a.accounts.localeCompare(b.accounts);
      } else if (a.role_name !== b.role_name) {
        return a.role_name?.localeCompare(b.role_name);
      } else if (a.title !== b.title) {
        return a.title.localeCompare(b.title);
      } else if (a.content_name !== b.content_name) {
        return a.content_name.localeCompare(b.content_name);
      } else if (a.quote_name !== b.quote_name) {
        return a.quote_name.localeCompare(b.quote_name);
      } else if (a.doc_name !== b.doc_name) {
        return a.doc_name.localeCompare(b.doc_name);
      }  else if (a.class_name !== b.class_name) {
        return a.class_name.localeCompare(b.class_name);
      }
    });

  const isReadOnly = permission === "readOnly";
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [visibleItems, setVisibleItems] = useState(11);
  const [showAllItems, setShowAllItems] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  useEffect(() => {
    if (dataSort && dataSort.length > 0) {
      // Map items to include both item and its index
      const initialItems = dataSort.map((item, index) => ({
        value: getItemValue(item, dataType),
        index: index,
        id: item._id,
      }));

      // Sort items alphabetically
      initialItems.sort((a, b) => a.value.localeCompare(b.value));

      setItems(initialItems.map((item) => item.value));

      const storedPersonId = localStorage.getItem("personId");
      const personId = storedPersonId ? JSON.parse(storedPersonId) : null;

      if (personId) {
        const index = dataSort.findIndex((item) => item._id === personId);
        handleItemClick(index !== -1 ? index : 0);
      } else {
        handleItemClick(0);
      }
    }
  }, [data, dataType]);

  const getItemValue = (item, type) => {
    if (type === "content" && item.content_name) {
      return item.content_name;
    } else if (type === "account" && item.accounts) {
      return item.accounts;
    } else if (type === "rolesetup" && item.role_name) {
      return item.role_name;
    } else if (type === "people" && item.first_name && item.last_name) {
      return item.first_name + " " + item.last_name;
    } else if (type === "security" && item.role_name) {
      return item.role_name;
    } else if (
      type === "peopleWithAccess" &&
      item.first_name &&
      item.last_name
    ) {
      return item.first_name + " " + item.last_name;
    } else if (type === "lookups" && item.class_name) {
      return item.class_name;
    } else if (type === "doctype" && item.doc_name) {
      return item.doc_name;
    } else if (type === "template" && item.quote_name) {
      return item.quote_name;
    } else if (type === "setups" && item.title) {
      return item.title;
    } else if (type === "company_org" && item.org_name) {
      return item.org_name;
    }
    return "";
  };

  const handleFilterChange = (event) => {
    const inputValue = event.target.value;
    setFilter(inputValue);

    const filteredItems = dataSort
      .map((item, index) => ({ value: getItemValue(item, dataType), index }))
      .filter((item) =>
        item.value.toUpperCase().includes(inputValue.toUpperCase())
      );

    // Sort filtered items alphabetically
    filteredItems.sort((a, b) => a.value.localeCompare(b.value));

    setItems(filteredItems.map((item) => item.value));
    setVisibleItems(filteredItems.length > 0 ? 8 : 0);
  };

  const handleShowMore = () => {
    setShowAllItems(true);
  };

  const handleShowLess = () => {
    setShowAllItems(false);
  };

  const itemsToDisplay = showAllItems ? items : items.slice(0, visibleItems);
  const handleItemClick = (indexOrName) => {
    if (onItemSelect) {
      let personId;
      if (typeof indexOrName === "number") {
        const index = indexOrName;
        personId = dataSort[index]._id; // Fetch the account ID
      } else if (typeof indexOrName === "string") {
        // If account name is provided, find its index
        const index = dataSort.findIndex(
          (item) => getItemValue(item, dataType) === indexOrName
        );
        personId = dataSort[index]._id; // Fetch the account ID
      }
      if (personId) {
        const selectedItem = dataSort.find((item) => item._id === personId);
        const selectedIndex = dataSort.findIndex(
          (item) => item._id === personId
        );
        onItemSelect(selectedItem, selectedIndex, personId); // Pass the account ID to the onItemSelect function if needed

        localStorage.setItem("personId", JSON.stringify(personId));
        setSelectedItemIndex(selectedIndex);
      }
    }
  };
  const Groupingoptions = ["NO GROUPING", "CATALOG CATEGORY", "CATALOG STATUS"];
  const [, setSelectedOptionGrouping] = useState(null);
  const handleOptionSelect = (selectedOption) => {
    setSelectedOptionGrouping(selectedOption);
  };

  const resetSelection = () => {
    setSelectedItemIndex(-1);
    localStorage.setItem('personId', null);
  };

  return (
    <div className="mn">
      <div className="leftwrite">
        {showGrouping && (
          <div className="grouping">
            <CustomDropdown
              options={Groupingoptions}
              onSelect={handleOptionSelect}
              custuminput="writeflexgrouping"
              iconcon="writeflexicon"
              value={"NO GROUPING"}
              isHeight={true}
            />
          </div>
        )}
        <div className="inboxwrite">
          <FaSearch className="search-icon" />
          <input
            type="text"
            id="mySearchwrite"
            title="type in a category"
            onChange={handleFilterChange}
            value={filter}
            autoComplete="new-password"
          />
        </div>
        <div className="dividewrite">
        {/* Conditionally render based on hasItems */}
        {hasItems ? (
          <>
            <ul id="myMenuwrite">
              {itemsToDisplay.map((item, index) => (
                <li
                  key={index}
                  className={`writeflexoptions ${selectedItemIndex === index ? "selected" : ""}`}
                  onClick={() => handleItemClick(index)}
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="viewButtons">
              {items.length > 11 && (
                <button
                  onClick={showAllItems ? handleShowLess : handleShowMore}
                  id={showAllItems ? "WriteFlex_Less" : "WriteFlex_More"}
                  className={showAllItems ? "WriteFlexViewLess" : "WriteFlexViewMore"}
                >
                  {showAllItems ? "VIEW LESS" : "VIEW MORE"}
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="noItemsMessage">No items available.</p>
        )}
      </div>
        {!isReadOnly ? (
          <span
            className="plusiconwrite"
            onClick={() => {
              resetFields();
              resetSelection();
            }}
          >
            <FaPlus className="faPlus" />
          </span>
        ) : null}
      </div>
    </div>
  );
};
export default WriteFlex;
