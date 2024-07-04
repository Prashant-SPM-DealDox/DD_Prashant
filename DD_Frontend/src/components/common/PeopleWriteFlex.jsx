import React, { useState, useEffect } from "react";
import "../../assets/css/common/WriteFlex.css";
import { FaPlus, FaSearch, FaRegUser } from "react-icons/fa";
import CustomDropdown from "./CustomDropdown";
import { encryptData, decryptData } from "../../utils/common";

const PeopleWriteFlex = ({
  showGrouping = false,
  resetFields,
  onItemSelect,
  data,
  dataType,
  permission,
  hasItems,
}) => {
  const isReadOnly = permission === "readOnly";
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [visibleItems, setVisibleItems] = useState(11);
  const [showAllItems, setShowAllItems] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const Groupingoptions = ["NO GROUPING", "CATALOG CATEGORY", "CATALOG STATUS"];
  const [, setSelectedOptionGrouping] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  useEffect(() => {
    if (data && data.length > 0) {
      // Map items to include both item and its index
      const initialItems = data.map((item, index) => ({
        value: getItemValue(item, dataType),
        originalIndex: index,
        id: item._id,
      }));

      // Sort items alphabetically
      const sortedData = data.sort((a, b) => {
        const firstNameCompare = a.first_name.localeCompare(b.first_name);
        if (firstNameCompare !== 0) {
          return firstNameCompare;
        }
        return a.last_name.localeCompare(b.last_name);
      });
      initialItems.sort((a, b) => a.value.localeCompare(b.value));
      setItems(sortedData);

      const storedPersonId = decryptData(localStorage.getItem("personId"));
      const previousPersonId = decryptData( localStorage.getItem("previousPersonId"));
      console.log(storedPersonId, previousPersonId);
      if (previousPersonId) {
        handleItemClick(-1);
      } else {
        const index = data.findIndex((item) => item._id === storedPersonId);
        console.log(index, data);
        handleItemClick(index !== -1 ? index : 0);
      }
    }
  }, [data, dataType]);

  const getItemValue = (item, type) => {
    if (type === "people" && item.first_name && item.last_name) {
      return item.first_name + " " + item.last_name;
    } else if (
      type === "peopleWithAccess" &&
      item.first_name &&
      item.last_name
    ) {
      return item.first_name + " " + item.last_name;
    }
    return "";
  };

  const handleItemClick = (index) => {
    if (index !== -1) {
      const selectedItem = data[index];
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

  const handleShowMore = () => {
    setShowAllItems(true);
  };
  const handleShowLess = () => {
    setShowAllItems(false);
  };
  const handleOptionSelect = (selectedOption) => {
    setSelectedOptionGrouping(selectedOption);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    getItemValue(item, dataType)
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  );

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
          />
        </div>
        <div className="dividewrite">
          {/* {hasItems ? ( */}
          <>
            <ul id="myMenuwrite">
              {itemsToDisplay.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`writeflexoptions ${
                      decryptData(localStorage.getItem("personId")) === item._id
                        ? "selected"
                        : ""
                    }`}
                    
                    onClick={() => handleItemClick(items.indexOf(item))}
                  >
                    {dataType === "people" &&
                      item?.first_name &&
                      item?.last_name &&
                      item?.profile_id !== undefined && (
                        <div className="profile_picturewriteflex">
                          <div className="profileid">
                            {`${item.first_name[0]}${item.last_name[0]}${item.profile_id}`}
                          </div>
                        </div>
                      )}
                    {`${item.first_name} ${item.last_name}`}
                  </li>
                );
              })}
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
          {/* // ) : (
          //   <p className="noItemsMessage">No items available.</p>
          // )} */}
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

export default PeopleWriteFlex;
