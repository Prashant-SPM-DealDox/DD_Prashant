import React, { useState, useEffect } from "react";
import "../../assets/css/common/WriteFlex.css";
import { FaPlus, FaSearch, FaRegUser } from "react-icons/fa";
import CustomDropdown from "./CustomDropdown";
import { LuFileJson } from "react-icons/lu";
import { encryptData, decryptData } from "../../utils/common";

const WriteFlexAll = ({
  showGrouping = false,
  //selectedId,
  resetFields,
  onItemSelect,
  data,
  dataType,
  permission,
  hasItems,
  showFlagProfile,
}) => {
  // const [peopleId, setPeopleId] = useState("");
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
      } else if (a.class_name !== b.class_name) {
        return a.class_name.localeCompare(b.class_name);
      }
    });

  const isReadOnly = permission === "readOnly";
  const [items, setItems] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [visibleItems, setVisibleItems] = useState(11);
  const [showAllItems, setShowAllItems] = useState(false);
  const Groupingoptions = ["NO GROUPING", "CATALOG CATEGORY", "CATALOG STATUS"];
  const [, setSelectedOptionGrouping] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  //const [selectedItemid, setSelectedItemId] = useState(selectedId);
  const storedPersonId = decryptData(localStorage.getItem("personId"));
  const previousPersonId = decryptData(localStorage.getItem("previousPersonId"));

  useEffect(() => {
    if (storedPersonId && dataSort.length > 0) {
      const index = dataSort.findIndex((item) => item._id === storedPersonId);
      handleItemClick(index);
    }
  }, [storedPersonId]);

  useEffect(() => {
    if (dataSort && dataSort.length > 0) {
      // Map items to include both item and its index
      const initialItems = dataSort.map((item, index) => ({
        value: getItemValue(item, dataType),
        originalIndex: index,
        id: item._id,
      }));

      // Sort items alphabetically
      initialItems.sort((a, b) => a.value.localeCompare(b.value));

      setItems(initialItems.map((item) => item));

      if (previousPersonId) {
        handleItemClick(-1);
      } else {
        const index = dataSort.findIndex((item) => item._id === storedPersonId);
        handleItemClick(index !== -1 ? index : 0);
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

  const handleShowMore = () => {
    setShowAllItems(true);
  };
  const handleShowLess = () => {
    setShowAllItems(false);
  };
  const handleItemClick = (index) => {
    if (index !== -1) {
      const selectedItem = dataSort[index];
      onItemSelect(selectedItem, index); // Pass the account ID to the onItemSelect function if needed
      const encryptedPersonId = encryptData(selectedItem._id); // Encrypt person ID
      localStorage.setItem("personId", encryptedPersonId);
      localStorage.removeItem("previousPersonId");
    } else {
      const current = decryptData(localStorage.getItem("personId"));
      const encryptedPreviousPersonId = encryptData(current); // Re-encrypt for storage
      localStorage.setItem("previousPersonId", encryptedPreviousPersonId);
      localStorage.removeItem("personId");
      onItemSelect(null, index);
    }
  };

  const handleOptionSelect = (selectedOption) => {
    setSelectedOptionGrouping(selectedOption);
  };
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    setVisibleItems(filteredItems.length > 0 ? 11 : 0);
  };
  const filteredItems = items.filter((item) =>
    item.value.toLowerCase().includes(filterValue.toLowerCase())
  );
  // setItems(filteredItems.map((item) => item.value));

  const itemsToDisplay = showAllItems
    ? filteredItems
    : filteredItems.slice(0, visibleItems);

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
            />
          </div>
        )}
        <div className="inboxwrite">
          <FaSearch className="search-icon" />
          <input
            type="text"
            id="mySearchwrite"
            title="type in a category"
            value={filterValue}
            onChange={handleFilterChange}
            autoComplete="off"
          />
        </div>
        <div className="dividewrite">
          {hasItems ? (
            <>
              <ul id="myMenuwrite">
                {itemsToDisplay.map((item) => (
                  <li
                    key={item.originalIndex}
                    className={`writeflexoptions ${
                      // localStorage.getItem("personId") &&
                      decryptData(localStorage.getItem("personId")) === item.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleItemClick(item.originalIndex)}
                  >
                    {item.value}
                  </li>
                ))}
              </ul>

              <div className="viewButtons">
                {
                  items.length > visibleItems && !filterValue && (
                    <button
                      onClick={showAllItems ? handleShowLess : handleShowMore}
                      id={showAllItems ? "WriteFlex_Less" : "WriteFlex_More"}
                      className={
                        showAllItems ? "WriteFlexViewLess" : "WriteFlexViewMore"
                      }
                    >
                      {showAllItems ? "VIEW LESS" : "VIEW MORE"}
                    </button>
                  )
                  // ))
                }
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
              handleItemClick(-1);
            }}
          >
            <FaPlus className="faPlus" />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default WriteFlexAll;
