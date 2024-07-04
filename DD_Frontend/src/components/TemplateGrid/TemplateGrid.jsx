import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CustomDropdown from "../../components/common/CustomDropdown";
import InputTypes from "../../components/common/InputTypes";
import "react-datetime/css/react-datetime.css";
import NewTask from "../../components/TemplateGrid/NewTask";
import {
  faBars,
  faFilter,
  faArrowUp,
  faArrowDown,
  faAlignJustify,
  faAngleUp,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import "../../assets/css/pcrGrid/PcrGrid.css";
import "../../assets/css/pcrGrid/ServiceDetails.css";
import Summary from "../../components/TemplateGrid/Summary";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  },
};

const TemplateGrid = () => {
  const grid1 = ["WHEN", "ALWAYS", "COMPLEX"];

  const grid = ["WHEN", "ALWAYS", "COMPLEX", "amulya"];
  const [selectedOptionitem5, setSelectedOptionitem5] = useState("");
  const handleOptionSelect = (option) => {
    setSelectedOptionitem5(option);
  };
  const tableRef = useRef(null);

  const MIN_COLUMN_WIDTH = 200;
  let draggedColumnIndex = null;

  useEffect(() => {
    const headerCells = tableRef.current.querySelectorAll("th");

    headerCells.forEach((cell) => {
      const resizeHandle = document.createElement("div");
      resizeHandle.classList.add("resize-handle");
      document.getElementsByClassName("resize-handle");
      cell.appendChild(resizeHandle);

      // adding eventhandler over resizeHandle (div) at the end of each header
      // clicking on that and dragging makes table re-sizable
      resizeHandle.addEventListener("mousedown", handleMouseDown);

      function handleMouseDown(event) {
        event.stopPropagation();

        const columnIndex = Array.from(cell.parentNode.children).indexOf(cell);
        const columnElements = tableRef.current.querySelectorAll(
          `tbody > tr > *:nth-child(${columnIndex + 1})`
        );

        const startingWidth = cell.offsetWidth;
        const startX = event.clientX;

        function handleMouseMove(event) {
          const deltaX = event.clientX - startX;
          const newWidth = startingWidth + deltaX;

          // Apply a minimum width of 200px to the header cell
          if (newWidth >= 200) {
            cell.style.width = `${newWidth}px`;

            const tableWidth = tableRef.current.offsetWidth;
            const remainingWidth = tableWidth - newWidth;

            columnElements.forEach((element) => {
              element.style.maxWidth = `${remainingWidth}px`;
              element.style.overflow = "auto";
            });
          }
        }

        function handleMouseUp() {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }

      // adding eventhandler over each of  header (cell here)
      // clicking over the header and dragging it makes it draggable
      cell.addEventListener("mousedown", handleMouseDownColumn);

      function handleMouseDownColumn(event) {
        event.preventDefault();
        const eventPos = event.clientX;
        const columnIndex =
          Array.from(headerCells).filter(
            (e) => e.getBoundingClientRect().left < eventPos
          ).length - 1;
        draggedColumnIndex = columnIndex;
        setDraggedColumnX(event.clientX); // Set the initial X-coordinate of the dragged column
        document.addEventListener("mousemove", handleMouseMoveColumn);
        document.addEventListener("mouseup", handleMouseUpColumn);
      }

      function handleMouseMoveColumn(event) {
        const eventPos = event.clientX;
        const columnIndex =
          Array.from(headerCells).filter(
            (e) => e.getBoundingClientRect().left < eventPos
          ).length - 1;
        if (columnIndex !== draggedColumnIndex) {
          setDraggedColumnX(event.clientX); // Update the X-coordinate of the dragged column
          shiftColumns(draggedColumnIndex, columnIndex);
          draggedColumnIndex = columnIndex;
        }
      }

      function handleMouseUpColumn() {
        document.removeEventListener("mousemove", handleMouseMoveColumn);
        document.removeEventListener("mouseup", handleMouseUpColumn);
        draggedColumnIndex = null;
      }

      const shiftColumns = (startIndex, endIndex) => {
        if (startIndex === endIndex) {
          return;
        }

        const tableRows = tableRef.current.querySelectorAll("tr");

        tableRows.forEach((row) => {
          const columns = Array.from(row.children);
          const draggedColumn = columns[startIndex];
          const placeholderColumn = document.createElement("td");
          placeholderColumn.style.visibility = "hidden";

          if (startIndex < endIndex) {
            row.insertBefore(placeholderColumn, columns[endIndex + 1]);
            row.insertBefore(draggedColumn, placeholderColumn);
          } else {
            row.insertBefore(placeholderColumn, columns[endIndex]);
            row.insertBefore(draggedColumn, placeholderColumn);
          }

          setTimeout(() => {
            row.removeChild(placeholderColumn);
          }, 0);
        });
      };
    });
  }, []);
  //=====================================
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPinColumnOptionsVisible, setIsPinColumnOptionsVisible] =
    useState(false);
  const [showPinOptions, setShowPinOptions] = useState(false);
  const [popupColumnIndex, setPopupColumnIndex] = useState(null);
  const [pinnedColumnIndex, setPinnedColumnIndex] = useState(-1);

  const [draggedColumnX, setDraggedColumnX] = useState(null);

  const handleIconClick = (columnIndex) => {
    if (popupColumnIndex === columnIndex) {
      setIsPopupOpen(!isPopupOpen);
    } else {
      setIsPopupOpen(true);
    }
    setPopupColumnIndex(columnIndex);

    setIsPinColumnOptionsVisible(true);
  };

  const handlePinColumnOptionsClick = (index) => {
    if (isPopupOpen && popupColumnIndex === index) {
      setIsPopupOpen(!isPopupOpen);
      setIsPinColumnOptionsVisible(!isPinColumnOptionsVisible);
    } else {
      setIsPopupOpen(true);
      setIsPinColumnOptionsVisible(true);
    }
    setPinnedColumnIndex(index);
  };

  const eSortOrder = {
    ASCENDING: "ascending",
    DESCENDING: "descending",
    NONE: "none", // Use 'none' to represent the initial unsorted state
    MIXED: "mixed", // Use 'mixed' to represent columns with mixed data types
  };

  const dateComparator = (a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  };
  const numberComparator = (num1, num2) => {
    return num1 - num2;
  };

  const [columns, setColumns] = useState([
    {
      field: "",
      pinned: null,
      width: 100,
      icon: faBars,
      originalIndex: 0,
      showFilter: true,
    }, // Add 'showFilter' property
    {
      field: "Age",
      pinned: null,
      icon: faBars,
      originalIndex: 1,
      showFilter: false,
      showNumericalFilter: true,
    }, // Add 'showFilter' property
    {
      field: "Country",
      pinned: null,
      icon: faBars,
      originalIndex: 2,
      showFilter: true,
    },
    {
      field: "Year",
      pinned: null,
      icon: faBars,
      originalIndex: 3,
      showFilter: true,
    },
    {
      field: "Date",
      pinned: null,
      icon: faBars,
      originalIndex: 4,
      showFilter: true,
    },
    {
      field: "Sport",
      pinned: null,
      icon: faBars,
      originalIndex: 5,
      showFilter: true,
    },
    {
      field: "Gold",
      pinned: null,
      icon: faBars,
      originalIndex: 6,
      showFilter: true,
    },
    {
      field: "Silver",
      pinned: null,
      icon: faBars,
      originalIndex: 7,
      showFilter: true,
    },
    {
      field: "Bronze",
      pinned: null,
      icon: faBars,
      originalIndex: 8,
      showFilter: true,
    },
    {
      field: "Total",
      pinned: null,
      icon: faBars,
      originalIndex: 9,
      showFilter: true,
    },
  ]);

  const handlepin = () => {
    setShowPinOptions(!showPinOptions);
  };

  const handlePinRight = (index) => {
    const updatedColumns = [...columns];
    const pinnedColumn = updatedColumns.splice(index, 1)[0];
    pinnedColumn.pinned = "right";
    pinnedColumn.originalIndex = index; // Store the original index before pinning
    updatedColumns.push(pinnedColumn);
    setColumns(updatedColumns);
    setIsPopupOpen(false);
  };

  const handlePinLeft = (index) => {
    const updatedColumns = [...columns];
    const pinnedColumn = updatedColumns.splice(index, 1)[0];
    pinnedColumn.pinned = "left";
    pinnedColumn.originalIndex = index; // Store the original index before pinning
    updatedColumns.unshift(pinnedColumn); // Insert the pinned column to the beginning
    setColumns(updatedColumns);
    setIsPopupOpen(false);
  };

  const handleNoPin = (index) => {
    const updatedColumns = [...columns];
    if (index >= 0 && index < updatedColumns.length) {
      const unpinnedColumn = updatedColumns.splice(index, 1)[0];
      if (unpinnedColumn.pinned) {
        unpinnedColumn.pinned = null; // Remove the 'pinned' property to unpin the column
        const originalIndex = unpinnedColumn.originalIndex;
        updatedColumns.splice(originalIndex, 0, unpinnedColumn); // Insert the unpinned column back to its initial index
        setColumns(updatedColumns);
      }
    }
    setIsPinColumnOptionsVisible(false);
  };

  const leftPinnedColumns = columns.filter(
    (column) => column.pinned === "left"
  );
  const rightPinnedColumns = columns.filter(
    (column) => column.pinned === "right"
  );
  const nonPinnedColumns = columns.filter((column) => column.pinned === null);

  // Function to autosize all columns to the minimum width
  const handleAutosizeAllColumns = () => {
    const headerCells = tableRef.current.querySelectorAll("th");

    headerCells.forEach((cell) => {
      // Set the width of each header cell to the minimum width
      cell.style.width = `${MIN_COLUMN_WIDTH}px`;
    });

    const bodyCells = tableRef.current.querySelectorAll("td");
    bodyCells.forEach((cell) => {
      // Set the max-width of each body cell to the minimum width
      cell.style.maxWidth = `${MIN_COLUMN_WIDTH}px`;
      // Add overflow: auto to allow scrolling for larger content
      cell.style.overflow = "auto";
    });
    setIsPopupOpen(false);
  };
  const handleAutosizeColumn = (index) => {
    const updatedColumns = [...columns];
    const column = updatedColumns[index];
    const headerCell = tableRef.current.querySelector(
      `th:nth-child(${index + 1})`
    );
    const bodyCells = tableRef.current.querySelectorAll(
      `td:nth-child(${index + 1})`
    );

    // Reset the width to the minimum value
    column.width = MIN_COLUMN_WIDTH;

    // Set the width of the header cell
    headerCell.style.width = `${MIN_COLUMN_WIDTH}px`;

    // Set the max-width of the body cells and add overflow: auto to allow scrolling for larger content
    bodyCells.forEach((cell) => {
      cell.style.maxWidth = `${MIN_COLUMN_WIDTH}px`;
      cell.style.overflow = "auto";
    });

    setColumns(updatedColumns);
    setIsPopupOpen(false);
  };

  // Add two new state variables for managing visibility of columnbars and filtercontent
  const [isColumnBarsVisible, setIsColumnBarsVisible] = useState(true);
  const [isFilterContentVisible, setIsFilterContentVisible] = useState(false);
  const [isColumnsHeaderVisiblee, setColumnsHeaderVisiblee] = useState(false);
  const [isNumericalFilterContentVisible, setIsNumericalFilterContentVisible] =
    useState(false);

  // Function to toggle the visibility of columnbars and filtercontent
  const toggleColumnBars = () => {
    setIsColumnBarsVisible(!isColumnBarsVisible);
    setIsColumnBarsVisible(true);
    setIsFilterContentVisible(false);
    setColumnsHeaderVisiblee(false);
    setIsNumericalFilterContentVisible(false);
    setIsPopupOpen(!isColumnBarsVisible);

    const horizontalFilterIcon = document.querySelector(
      "#horizpontalfiltericon"
    );
    const verticalIcon = document.querySelector("#verticalicon");
    const itemBars = document.querySelector(".itembars");
    const barsPopUp = document.querySelector(".barspopuptemplate");

    if (itemBars) {
      horizontalFilterIcon.style.color = "#272829";
      itemBars.style.color = "#216c98";
      itemBars.style.borderBottom = "3px solid #216c98";
      verticalIcon.style.borderRight = "none";
      horizontalFilterIcon.style.borderBottom = "none";
      barsPopUp.style.overflow = "hidden";
      barsPopUp.style.height = "164px";

      verticalIcon.style.color = "#272829";
    } else {
      barsPopUp.style.overflow = "hidden";
    }
  };

  const toggleFilterContent = () => {
    setIsFilterContentVisible(!isFilterContentVisible);
    setIsFilterContentVisible(true);
    setIsNumericalFilterContentVisible(true);
    setIsColumnBarsVisible(false);
    setColumnsHeaderVisiblee(false);
    setIsPopupOpen(!isFilterContentVisible);
    const horizontalFilterIcon = document.querySelector(
      "#horizpontalfiltericon"
    );
    const verticalIcon = document.querySelector("#verticalicon");
    const itemBars = document.querySelector(".itembars");
    const barsPopUp = document.querySelector(".barspopuptemplate");

    if (horizontalFilterIcon) {
      horizontalFilterIcon.style.color = "#216c98";
      horizontalFilterIcon.style.borderBottom = "3px solid #216c98";
      itemBars.style.color = "#272829";
      itemBars.style.borderBottom = "none";
      verticalIcon.style.borderRight = "none";
      verticalIcon.style.color = "#272829";

      barsPopUp.style.overflow = "hidden";
    } else {
      horizontalFilterIcon.style.color = "#272829";
    }
  };
  const verticalColumnbars = () => {
    setColumnsHeaderVisiblee(!isColumnsHeaderVisiblee);
    setColumnsHeaderVisiblee(true);
    setIsFilterContentVisible(false);
    setIsColumnBarsVisible(false);
    setIsNumericalFilterContentVisible(false);
    setIsPopupOpen(!isColumnsHeaderVisiblee);
    const horizontalFilterIcon = document.querySelector(
      "#horizpontalfiltericon"
    );
    const verticalIcon = document.querySelector("#verticalicon");
    const itemBars = document.querySelector(".itembars");
    // Update the height of the barsPopUp
    const barsPopUp = document.querySelector(".barspopuptemplate");

    if (verticalIcon) {
      verticalIcon.style.color = "#216c98";
      verticalIcon.style.borderRight = "3px solid #216c98";
      barsPopUp.style.overflowY = "scroll";
      barsPopUp.style.overflowx = "hidden";

      barsPopUp.style.height = "267px";
      itemBars.style.borderBottom = "none";
      horizontalFilterIcon.style.borderBottom = "none";
      itemBars.style.color = "#272829";
      horizontalFilterIcon.style.color = "#272829";

      barsPopUp.style.height = "260px";
    } else {
      horizontalFilterIcon.style.color = "#272829";
      barsPopUp.style.height = "164px";
    }
  };

  // Assuming you have a function named 'toggleDropdown' to toggle the visibility of the dropdown
  function toggleDropdown() {
    const dropdown = document.querySelector(".filterdropdowngrid");
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  }

  // Add a click event listener to the dropdown items
  const dropdownItems = document.querySelectorAll(".filterdropdowngrid li");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Get the selected value from the clicked item
      const selectedValue = item.textContent.trim();

      // Update the value of the 'listselection' input with the selected value
      const listSelectionInput = document.querySelector(".listselection");
      listSelectionInput.value = selectedValue;

      // Hide the dropdown after selection
      const dropdown = document.querySelector(".filterdropdowngrid");
      dropdown.style.display = "none";
      barsPopUp.style.height = "260px";
    });
  });

  const [isTaskVisible, setIsTaskVisible] = useState(false);

  const handleTaskButtonClick = (taskId) => {
    setIsTaskVisible(true);
  };

  const initialData = [
    {
      Athlete: "",
      Age: "",
      Country: "",
      Year: "",
      Date: "",
      Sport: "",
      Gold: "",
      Silver: "",
      Bronze: "",
      Total: "",
    },
    // {Athlete: "" ,Age: "",Country: "",Year: "",Date: "",Sport: "",Gold: "",Silver: "",Bronze: "",Total: ""},

    // { Age: 43, Country: 'USA', Year: 1945, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: 'a', Age: 78, Country: 'AFRICA', Year: 1678, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: 'a', Age: 12, Country: 'CANADA', Year: 8322, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: 's', Age: 98, Country: 'ENGLAND', Year: 3452, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 54, Country: 'SAUDI', Year: 2413, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 89, Country: 'UAE', Year: 3289, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 7, Country: 'AUSTRALIA', Year: 8989, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 35, Country: 'FRANCE', Year: 3428, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 43, Country: 'IRELAND', Year: 9534, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 29, Country: 'TURKEY', Year: 7098, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 66, Country: 'VENICE', Year: 9754, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 47, Country: 'GERMANY', Year: 2019, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 63, Country: 'ARGENTINA', Year: 7887, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 1540, Country: 'BALI', Year: 3017, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 320, Country: 'PARIS', Year: 5023, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 76, Country: 'SCOTLAND', Year: 1983, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 738, Country: 'DENMARK', Year: 1999, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 1997, Country: 'CHINA', Year: 557, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 212, Country: 'AUSTRALIA', Year: 8989, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 145, Country: 'USA', Year: 76768, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 9433, Country: 'EGYPT', Year: 8989, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 289, Country: 'SRI LANKA', Year: 1946, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 450, Country: 'ITALY', Year: 8989, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 618, Country: 'BRAZIL', Year: 1234, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },
    // { Athlete: '', Age: 991, Country: 'BANGLADESH', Year: 1000, Date: '2020-08-01', Sport: 'Tennis', Gold: 1, Silver: 0, Bronze: 0, Total: 1 },

    // Add more rows here...
  ];

  const handleColumnSort = (field) => {
    setData((prevData) => {
      const sortedData = [...prevData];

      // Determine the new sort order based on the current status
      const currentSortOrder = columns.find(
        (col) => col.field === field
      ).sortOrder;
      let newSortOrder;
      if (currentSortOrder === eSortOrder.ASCENDING) {
        newSortOrder = eSortOrder.DESCENDING;
      } else if (currentSortOrder === eSortOrder.DESCENDING) {
        newSortOrder = eSortOrder.NONE;
        return initialData;
      } else {
        newSortOrder = eSortOrder.ASCENDING;
      }

      // Sort the data based on the selected column and sort order
      sortedData.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        // Handle the date column separately using the dateComparator
        if (field === "Date") {
          return newSortOrder === eSortOrder.DESCENDING
            ? dateComparator(bValue, aValue)
            : dateComparator(aValue, bValue);
        }
        // Handle numeric columns using numberComparator
        if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
          return newSortOrder === eSortOrder.DESCENDING
            ? numberComparator(parseFloat(bValue), parseFloat(aValue))
            : numberComparator(parseFloat(aValue), parseFloat(bValue));
        }

        // For other columns, handle non-string values by converting them to strings
        const stringA = String(aValue);
        const stringB = String(bValue);

        if (newSortOrder === eSortOrder.DESCENDING) {
          return stringB.localeCompare(stringA);
        } else {
          return stringA.localeCompare(stringB);
        }
      });

      return sortedData;
    });

    setColumns((prevColumns) => {
      // Update the sort order for the selected column
      const updatedColumns = prevColumns.map((col) => {
        if (col.field === field) {
          return {
            ...col,
            sortOrder:
              col.sortOrder === eSortOrder.ASCENDING
                ? eSortOrder.DESCENDING
                : col.sortOrder === eSortOrder.DESCENDING
                ? eSortOrder.NONE
                : eSortOrder.ASCENDING,
          };
        }
        return {
          ...col,
          sortOrder:
            col.sortOrder === eSortOrder.MIXED
              ? eSortOrder.NONE
              : eSortOrder.MIXED,
        };
      });

      return updatedColumns;
    });
  };

  // State variables for managing filter options and search value
  const [filterOption, setFilterOption] = useState("contains");
  const [searchValue, setSearchValue] = useState("");
  const [filterSearchValue, setFilterSearchValue] = useState("");

  const [data, setData] = useState(initialData);

  // ... Existing code ...

  // Step 2: Update state variables when the filter option or search value changes
  const handleFilterOptionChange = (option) => {
    setFilterOption(option);
  };
  // and or operator display
  const barsPopUp = document.querySelector(".barspopuptemplate");
  const horizontalFilterIcon = document.getElementById(
    "#horizpontalfiltericon"
  );
  const [filterSearchAndOrValue, setFilterSearchAndOrValue] = useState(""); // Add state for filter search input value

  const [selectedFilterOption, setSelectedFilterOption] = useState("");

  const [numericalFilterOption, setNumericalFilterOption] = useState("equals");
  const [numericalSearchValue, setNumericalSearchValue] = useState("");
  const [numericalFilterAndOrSearchValue, setNumericalFilterAndOrSearchValue] =
    useState("");
  const [numericalAndOrFilterOption, setNumericalAndOrFilterOption] =
    useState("equals");
  // const [numericalAndOrFilterSearchValue, setNumericalAndOrFilterSearchValue] = useState('');

  const [numericalSecondValue, setNumericalSecondValue] = useState("");

  const handleSearchValueChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setFilterSearchValue(value); // Update the filter search value
    const barsPopUp = document.querySelector(".barspopuptemplate");
    barsPopUp.style.height = "267px";
  };
  // Initialize selectedAndOr state variable with a default value

  const [selectedAndOr, setSelectedAndOr] = useState("and");
  // Helper function to check if a cell value matches a filter condition
  const filterMatches = (cellValue, filterValue, filterType) => {
    switch (filterType) {
      case "contains":
        return cellValue.includes(filterValue);
      case "notcontains":
        return !cellValue.includes(filterValue);
      case "startwith":
        return cellValue.startsWith(filterValue);
      case "endwith":
        return cellValue.endsWith(filterValue);
      default:
        return true;
    }
  };

  function applyNumericalFilter(
    item,
    numericalFilterOption,
    numericalSearchValue,
    numericalAndOrFilterOption,
    numericalFilterAndOrSearchValue,
    columns,
    popupColumnIndex
  ) {
    if (numericalFilterOption && numericalAndOrFilterOption) {
      const cellValue = parseFloat(item[columns[popupColumnIndex].field]);
      const numericalFilterValue = parseFloat(
        numericalSearchValue,
        numericalFilterAndOrSearchValue
      );

      switch (numericalAndOrFilterOption) {
        case "equals":
          return cellValue === numericalFilterValue;
        case "Not equals":
          return cellValue !== numericalFilterValue;
        case "Less than":
          return cellValue < numericalFilterValue;
        case "lesser than or equals":
          return cellValue <= numericalFilterValue;
        case "Greater than":
          return cellValue > numericalFilterValue;
        case "Greater than or equals":
          return cellValue >= numericalFilterValue;
        default:
          return true;
      }
    }
    return true;
  }

  const filteredData = data.filter((item) => {
    if (filterOption && searchValue) {
      const cellValue = item[columns[popupColumnIndex].field]
        .toString()
        .toLowerCase();
      const searchValueLowerCase = searchValue.toLowerCase();
      const filterSearchAndOrValueLowerCase =
        filterSearchAndOrValue.toLowerCase();

      switch (selectedAndOr) {
        case "and":
          return (
            filterMatches(cellValue, searchValueLowerCase, filterOption) &&
            filterMatches(
              cellValue,
              filterSearchAndOrValueLowerCase,
              selectedFilterOption
            )
          );
        case "or":
          return (
            filterMatches(cellValue, searchValueLowerCase, filterOption) ||
            filterMatches(
              cellValue,
              filterSearchAndOrValueLowerCase,
              selectedFilterOption
            )
          );
        default:
          return true;
      }
    }
    if (numericalFilterOption && numericalSearchValue) {
      return applyNumericalFilter(
        item,
        numericalFilterOption,
        numericalSearchValue,
        numericalAndOrFilterOption,
        numericalFilterAndOrSearchValue,
        columns,
        popupColumnIndex
      );
    }

    // console.log(filterMatches)
    return true;
  });

  const handleFilterSearchAndOrChange = (event) => {
    const value = event.target.value;
    setFilterSearchAndOrValue(value);
    // ... Rest of the logic remains the same ...
  };

  const handleFilterOptionSelect = (option) => {
    setSelectedFilterOption(option);
    const listSelectionAndOrInput = document.querySelector(
      ".listselectionandor"
    );
    listSelectionAndOrInput.value = option;
    const dropdownAndOr = document.querySelector(".filterdropdowngridandor");
    dropdownAndOr.style.display = "none";
  };

  function toggleDropdown2() {
    const dropdownAndOr = document.querySelector(".filterdropdowngridandor");
    if (dropdownAndOr.style.display === "none") {
      dropdownAndOr.style.display = "block";
      barsPopUp.style.height = "335px";
    } else {
      dropdownAndOr.style.display = "none";
      barsPopUp.style.height = "260px";
    }
  }

  const [checkboxSearchValue, setCheckboxSearchValue] = useState("");

  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleCheckBoxSearch = (event) => {
    const value = event.target.value;
    setCheckboxSearchValue(value);
  };

  const [columnVisibility, setColumnVisibility] = useState({});

  const toggleCheckbox = (field) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };

  // Numeric data start

  function NumericalDropDownListVisible() {
    const NumericalDropDownList = document.querySelector(
      ".Numericaldropdownlist"
    );
    if (NumericalDropDownList.style.display === "none") {
      NumericalDropDownList.style.display = "block";
    } else {
      NumericalDropDownList.style.display = "none";
    }
  }

  const handleNumericalFilterOptionChange = (option) => {
    setNumericalFilterOption(option);
    const NumericalDropDownList = document.querySelector(
      ".Numericaldropdownlist"
    );
    NumericalDropDownList.style.display = "none";
  };

  //   and or operatioj=r visible
  const handleNumericalFilterChange = (event) => {
    const value = event.target.value;
    setNumericalSearchValue(value);
  };

  function NumericalAndORDropDOwnVisiblee() {
    const numericalFilterAndOrOperator = document.querySelector(
      ".numericalfilterandoroperator"
    );
    if (numericalFilterAndOrOperator.style.display === "none") {
      numericalFilterAndOrOperator.style.display = "block";
    } else {
      numericalFilterAndOrOperator.style.display = "none";
    }
  }
  const handleNumericalAndOrChange = (event) => {
    const value = event.target.value;
    setNumericalFilterAndOrSearchValue(value);
  };

  const handleNumericalAndOrOptionVisible = (option) => {
    setNumericalAndOrFilterOption(option);
    const numericalFilterAndOrOperator = document.querySelector(
      ".numericalfilterandoroperator"
    );
    numericalFilterAndOrOperator.style.display = "none";
  };
  //  Gropping columns code started from here
  const [expandedRows, setExpandedRows] = useState([]);
  const [subRowExpanded, setSubRowExpanded] = useState({});
  const [subRowExpanded1, setSubRowExpanded1] = useState({});

  const subTasks1 = [
    { id: 1, task: "New Task" },
    { id: 2, task: "New Task" },
    // { id: 3, task: "Non-Zmit PS Deal Approval" }
    // ... more sub-tasks
  ];
  const subTasks2 = [
    { id: 4, task: "L5 Solution Artitech" },
    { id: 4, task: "L5 Solution Artitech" },
    { id: 6, task: "L4 Senior Consultant" },

    // ... more sub-tasks
  ];

  // this function is use to display the Tasks , Labour Summary
  const toggleSubRow = (rowIndex) => {
    if (expandedRows.includes(rowIndex)) {
      setExpandedRows(expandedRows.filter((index) => index !== rowIndex));
      setSubRowExpanded((prevState) => ({
        ...prevState,
        [rowIndex]: false,
      }));
      setSubRowExpanded1((prevState) => ({
        ...prevState,
        [rowIndex]: false,
      }));
    } else {
      setExpandedRows([...expandedRows, rowIndex]);
    }
  };

  //   this function is used to displays te Tasks - sub tasks...
  const toggleTask1SubRows = (rowIndex) => {
    setSubRowExpanded((prevState) => ({
      ...prevState,
      [rowIndex]: !prevState[rowIndex],
    }));
  };
  //   this function is used to displays te Labour Summary - sub tasks...
  const toggleTask2SubRows = (rowIndex) => {
    setSubRowExpanded1((prevState) => ({
      ...prevState,
      [rowIndex]: !prevState[rowIndex],
    }));
  };

  const values = [
    { id: 1, task: "value 1" },
    { id: 2, task: "value 2" },
    { id: 3, task: "value 3" },
    { id: 4, task: "value 4" },
    { id: 5, task: "value 5" },
    { id: 6, task: "value 6" },
    { id: 7, task: "value 7" },
    { id: 8, task: "value 8" },
    { id: 9, task: "value 9" },
    // ... more sub-tasks
  ];

  //  modal start
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    // document.body.style.overflow = "hidden";
    setIsOpen(!modalIsOpen);
  }
  function closeModal() {
    // document.body.style.overflow = "hidden";
    setIsOpen(false);
  }

  const barsRefPopUpWindow = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (
        barsRefPopUpWindow.current &&
        !barsRefPopUpWindow.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    if (modalIsOpen) {
      window.addEventListener("mousedown", handler);
    }
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, [modalIsOpen]);

  const barsRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (barsRef.current && !barsRef.current.contains(e.target)) {
        setIsPopupOpen(false);
      }
    };
    if (isPopupOpen) {
      window.addEventListener("mousedown", handler);
    }
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, [isPopupOpen]);

  // date filter start

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;

    setInputValue(value);
    if (value.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
    setInputValue(value);
  };

  // date filter end

  const [error, setError] = useState(false);
  const errorBorderStyle = {
    border: error ? "2px solid red" : "",
  };
  const errorLabelStyle = {
    color: error ? "red" : "#216c98",
    outline: error ? "none !important" : "#216c98",
  };

  const [isPopupVisible, setPopupVisible] = useState(false);

  //
  const [isPopupOpenn, setisPopupOpenn] = useState(false);
  const handlesubtask = () => {
    setisPopupOpenn(true);
  };

  const [isPopupOpennn, setisPopupOpennn] = useState(false);
  const handlesubsummary = () => {
    setisPopupOpennn(true);
  };
  const handlesummaryClosePopup = () => {
    setisPopupOpennn(false);
  };
  const handleClosePopup = () => {
    setisPopupOpenn(false);
  };

  const TaskRefPopUpWindow = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (
        TaskRefPopUpWindow.current &&
        !TaskRefPopUpWindow.current.contains(e.target)
      ) {
        setisPopupOpenn(false);
      }
    };
    if (isPopupOpenn) {
      window.addEventListener("mousedown", handler);
    }
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, [isPopupOpenn]);
  const SummaryRefPopUpWindow = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (
        SummaryRefPopUpWindow.current &&
        !SummaryRefPopUpWindow.current.contains(e.target)
      ) {
        setisPopupOpennn(false);
      }
    };
    if (isPopupOpennn) {
      window.addEventListener("mousedown", handler);
    }
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, [isPopupOpennn]);
  return (
    <>
      <div ref={TaskRefPopUpWindow}>
        {isPopupOpenn && <NewTask onClose={handleClosePopup} />}
      </div>

      <div ref={SummaryRefPopUpWindow}>
        {isPopupOpennn && <Summary onClose={handlesummaryClosePopup} />}
      </div>
      <div className="table-container">
        <table ref={tableRef} className="myTable">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={column.field}>
                  {column.field}
                  {index !== 0 && (
                    <button
                      className="ascendingbutton"
                      onClick={() => handleColumnSort(column.field)}
                    ></button>
                  )}

                  {index !== 0 && column.sortOrder === eSortOrder.ASCENDING && (
                    <FontAwesomeIcon icon={faArrowUp} />
                  )}
                  {index !== 0 &&
                    column.sortOrder === eSortOrder.DESCENDING && (
                      <FontAwesomeIcon icon={faArrowDown} id="downArrow" />
                    )}

                  <FontAwesomeIcon
                    icon={column.icon}
                    id="upArrow"
                    className="fa-solid icon-hover"
                    onClick={() => handleIconClick(index)}
                    style={{ display: "block" }}
                  />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <td>
                  <div className="serviceIconDiv">
                    <div className="service" onClick={openModal}>
                      <p>Service 1</p>
                    </div>
                    <label onClick={() => toggleSubRow(rowIndex)}>
                      {expandedRows.includes(rowIndex) ? (
                        <FontAwesomeIcon icon={faAngleUp} />
                      ) : (
                        <FontAwesomeIcon icon={faAngleDown} />
                      )}
                    </label>
                  </div>
                </td>
                {columns.map((column, columnIndex) => (
                  <td
                    key={columnIndex}
                    style={{
                      display: columnVisibility[column.field]
                        ? "none"
                        : "table-cell",
                    }}
                  >
                    {row[column.field]}
                  </td>
                ))}

                {expandedRows.includes(rowIndex) && (
                  <tr className="sub-row">
                    <td
                      className="task"
                      style={{
                        color: "#216c98",
                        fontSize: "14px",
                        paddingLeft: "15px",
                      }}
                    >
                      <label onClick={() => toggleTask1SubRows(rowIndex)}>
                        {subRowExpanded[rowIndex] ? (
                          <FontAwesomeIcon icon={faAngleLeft} />
                        ) : (
                          <FontAwesomeIcon icon={faAngleRight} />
                        )}
                      </label>
                      Tasks
                      {/* Content for expanded row */}
                    </td>
                    {values.map((value, index) => (
                      <td key={index} className="task">
                        {value.task}
                      </td>
                    ))}
                  </tr>
                )}
                {/* <NewTask /> */}

                {expandedRows.includes(rowIndex) &&
                  subRowExpanded[rowIndex] && (
                    <>
                      {subTasks1.map((subTask) => (
                        <tr key={subTask.id} className="sub-row">
                          <td
                            style={{
                              color: "black",
                              paddingLeft: "24px",
                              fontSize: "12px",
                            }}
                            className="sub-task"
                            colSpan={columns.length - 9}
                            onClick={handlesubtask}
                          >
                            {/* Content for sub-row */}
                            <i class="bx bxs-file"></i>
                            {subTask.task}
                          </td>
                          {/* this mapping for values  */}
                          {values.map((value, index) => (
                            <td key={index} className="task">
                              {value.task}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  )}

                {expandedRows.includes(rowIndex) && (
                  <tr className="sub-row">
                    <td
                      className="task"
                      style={{
                        color: "#216c98",
                        fontSize: "14px",
                        paddingLeft: "49px",
                      }}
                    >
                      {/* Content for expanded row */}
                      <label onClick={() => toggleTask2SubRows(rowIndex)}>
                        {subRowExpanded1[rowIndex] ? (
                          <FontAwesomeIcon icon={faAngleLeft} />
                        ) : (
                          <FontAwesomeIcon icon={faAngleRight} />
                        )}
                      </label>
                      Labour Summary
                    </td>
                    {/* this mapping for values  */}
                    {values.map((value, index) => (
                      <td key={index} className="task">
                        {value.task}
                      </td>
                    ))}
                  </tr>
                )}
                {expandedRows.includes(rowIndex) &&
                  subRowExpanded1[rowIndex] && (
                    <>
                      {subTasks2.map((subTask) => (
                        <tr key={subTask.id} className="sub-row">
                          <td
                            style={{
                              color: "black",
                              paddingLeft: "3px",
                              fontSize: "12px",
                            }}
                            className="sub-task"
                            colSpan={columns.length - 9}
                            onClick={handlesubsummary}
                          >
                            {/* Content for sub-row */}
                            <i class="bx bxs-user"></i>
                            {subTask.task}
                          </td>
                          {/* this mapping for values  */}
                          {values.map((value, index) => (
                            <td key={index} className="task">
                              {value.task}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div
          className="mainservice1"
          style={{ display: modalIsOpen ? "block" : "none" }}
          ref={barsRefPopUpWindow}
        >
          <div className="popupSubDiv">
            {" "}
            <div className="xmark" onClick={closeModal}>
              <i class="fa-solid fa-xmark"></i>
            </div>
            <div class="mainpopupheader">
              <h3>SERVICE DETAILS</h3>
            </div>
            {/* GRID CONTAINER 1 */}
            <div className="mainservice">
              <div className="grid-container1">
                <div className={`grid-item ${error ? "error" : ""}`}>
                  <input
                    className="servicename"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder=""
                    style={errorBorderStyle}
                  />
                  <label
                    htmlFor=""
                    className="servicelabel1"
                    style={errorLabelStyle}
                  >
                    {error
                      ? "SERVICE NAME IS A REQUIRED FILED"
                      : "SERVICE NAME"}
                  </label>
                  <i className="bx bxs-pencil" id="pencil-icon1"></i>
                </div>
                <div className="grid-item">
                  <input
                    className="servicename"
                    type="text"
                    readOnly
                    placeholder=""
                  />
                  <label htmlFor="" className="servicelabel2">
                    PRICE MODEL
                  </label>
                </div>
                <div className="grid-item">
                  <input
                    className="servicename"
                    type="text"
                    readOnly
                    placeholder=""
                  />
                  <label htmlFor="" className="servicelabel3">
                    TYPE
                  </label>
                </div>
                <div id="grid-radio" className="grid-item">
                  <input
                    type="checkbox"
                    id="serviceradio"
                    className="servicename"
                    disabled
                  />
                  <label htmlFor="" className="servicelabel4">
                    PINNED
                  </label>
                </div>
              </div>
              {/* GRID CONTAINER 2 */}
              <div className="grid-container2">
                <div className="grid-item2">
                  <input
                    className="servicename"
                    type="text"
                    readOnly
                    placeholder=""
                  />
                  <label htmlFor="" className="servicelabel5">
                    WEEKS
                  </label>
                </div>
                <div className="grid-item2">
                  <input
                    className="servicename"
                    type="text"
                    readOnly
                    placeholder=""
                  />
                  <label htmlFor="" className="servicelabel6">
                    NET PRICE
                  </label>
                </div>
                <div className="grid-item2">
                  <input
                    className="servicename"
                    type="text"
                    readOnly
                    placeholder=""
                  />
                  <label htmlFor="" className="servicelabel7">
                    LIST PRICE
                  </label>
                </div>
                <div className="grid-item2">
                  <input
                    className="servicename"
                    type="text"
                    readOnly
                    placeholder=""
                  />
                  <label htmlFor="" className="servicelabel8">
                    COST
                  </label>
                </div>
                <div className="grid-item2">
                  <input
                    className="servicename"
                    type="text"
                    readOnly
                    placeholder=""
                  />
                  <label htmlFor="" className="servicelabel9">
                    MAGIN
                  </label>
                </div>
              </div>
              {/* GRID CONTAINER 3 */}
              <div className="grid-container3">
                <div className="grid-item">
                  <input
                    className="servicename"
                    type="text"
                    readOnly
                    placeholder=""
                  />
                  <label htmlFor="" className="servicelabel10">
                    LABOUR PRICE
                  </label>
                </div>
                <div className="grid-item">
                  <input
                    className="servicename"
                    type="text"
                    readOnly
                    placeholder=""
                  />
                  <label htmlFor="" className="servicelabel11">
                    LABOUR GM
                  </label>
                </div>
                <div className="grid-item">
                  <input
                    className="servicename"
                    type="text"
                    readOnly
                    placeholder=""
                  />
                  <label htmlFor="" className="servicelabel12">
                    PRODUCT PRICE
                  </label>
                </div>
                <div className="grid-item">
                  <input
                    className="servicename"
                    type="text"
                    readOnly
                    placeholder=""
                  />
                  <label htmlFor="" className="servicelabel13">
                    PRODUCT GM
                  </label>
                </div>
              </div>
              {/* GRID CONTAINER 4 */}
              <div className="grid-container4">
                <div className="grid-item1">
                  <button className="genbuttons">GENERAL</button>
                </div>
                <div className="grid-item1">
                  <button className="allbuttons">CATEGORIES</button>
                </div>
                <div className="grid-item1">
                  <button className="allbuttons">ADDITIONAL INFO</button>
                </div>
                <div className="grid-item1">
                  <button className="allbuttons">EXTERNAL REFERENCES</button>
                </div>
              </div>
              {/* div 5 */}
              <div className="grid-container5">
                <div className="grid-item5">
                  <InputTypes
                    showFlagCalender={true}
                    CalenderLabel="START DATE"
                  />
                  {/* <label htmlFor="startdate" className="servicelabeldate">
                    START DATE
                  </label>
                  <Datetime
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    dateFormat="MMMM D, YYYY" // Customize the date format
                    timeFormat={false} // Set to true to include time selection
                    inputProps={{ placeholder: "Select a date" }}
                  /> */}
                </div>
                <div className="grid-item5">
                  <InputTypes
                    showFlagCalender={true}
                    CalenderLabel="START DATE"
                  />
                </div>
                <div className="grid-item5">
                  <CustomDropdown
                    label="SERVICE ORG"
                    options={grid}
                    onSelect={handleOptionSelect}
                  />
                </div>
                <div className="grid-item5">
                  <CustomDropdown
                    label=" SERVICE CURRENCY"
                    options={grid1}
                    onSelect={handleOptionSelect}
                  />
                </div>
              </div>
            </div>
            {/* div 6 */}
            <div className="grid-container6">
              <div className="grid-item5">
                <input
                  className="servicename"
                  type="text"
                  readOnly
                  placeholder=""
                />
                <label htmlFor="" className="servicelabel15">
                  SERVICE CATEGORY
                </label>
              </div>
              <div className="grid-item5">
                <input
                  className="servicename"
                  type="text"
                  readOnly
                  placeholder=""
                />
                <label htmlFor="" className="servicelabel15">
                  SERVICE LOCATION
                </label>
              </div>
            </div>
            {/* div 7 */}
            <div className="grid-container7">
              <div className="grid-item5">
                <input
                  className="servicename"
                  type="text"
                  readOnly
                  placeholder=""
                />
                <label htmlFor="" className="servicelabel15">
                  WEEK HOURS
                </label>
              </div>
              <div className="grid-item5">
                <input
                  className="servicename"
                  type="text"
                  readOnly
                  placeholder=""
                />
                <label htmlFor="" className="servicelabel15">
                  EXPENSES RATE
                </label>
              </div>
              <div className="grid-item5">
                <input className="servicename" type="text" placeholder="" />
                <label htmlFor="" className="servicelabel1">
                  {" "}
                  PCR CODE{" "}
                </label>
                <i className="bx bxs-pencil" id="pencil-icon"></i>
              </div>
            </div>
            {/* div 8 */}
            <div className="grid-container8">
              <div className="grid-item8">
                <input className="servicename" type="text" placeholder="" />
                <label htmlFor="" className="servicelabel1">
                  NOTE
                </label>
                <i className="bx bxs-pencil" id="pencil-iconnote"></i>
              </div>
            </div>
            {/* div 9 */}
            <div className="grid-item9">
              <div className="grid-container9">
                <button>DELETE</button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="popuowindow1"
          style={{ display: modalIsOpen ? "block" : "none" }}
        ></div>

        <div
          className="taskpopup"
          style={{ display: isPopupOpenn ? "block" : "none" }}
        ></div>
        <div
          className="summarypopup"
          style={{ display: isPopupOpennn ? "block" : "none" }}
        ></div>
        {/* </Modal> */}
      </div>

      {isPopupOpen && popupColumnIndex !== null && (
        <div
          className="barspopuptemplate"
          style={{ left: `${draggedColumnX + 30}px` }}
          ref={barsRef}
        >
          {/* Your content for the popup */}
          <div class="icondiv">
            <FontAwesomeIcon
              icon={faBars}
              className="itembars"
              onClick={toggleColumnBars}
            />
            <FontAwesomeIcon
              icon={faFilter}
              id="horizpontalfiltericon"
              onClick={toggleFilterContent}
            />
            <FontAwesomeIcon
              icon={faAlignJustify}
              id="verticalicon"
              rotation={90}
              onClick={verticalColumnbars}
            />
          </div>
          <hr class="columnbarshr"></hr>
          {isPinColumnOptionsVisible && (
            <div
              className="columnbars"
              style={{ display: isColumnBarsVisible ? "block" : "none" }}
            >
              <button
                className="autosizebuttons"
                onClick={handleAutosizeAllColumns}
              >
                Autosize All Columns
              </button>
              <button
                className="autosizethiscolumn"
                onClick={() => handleAutosizeColumn(popupColumnIndex)}
              >
                Autosize This Columns
              </button>
              <button className="pincolumns" onClick={handlepin}>
                Pin Columns
              </button>
              <button className="resetbutton">Reset Columns</button>

              {showPinOptions && (
                <div className="dropdownpin">
                  <button
                    className="pinbuttonss"
                    onClick={() => handlePinLeft(pinnedColumnIndex)}
                  >
                    Pin Left
                  </button>
                  <button
                    className="pinbuttonss"
                    onClick={() => handlePinRight(popupColumnIndex)}
                  >
                    Pin Right
                  </button>
                  <button
                    className="pinbuttonss"
                    onClick={() => handleNoPin(pinnedColumnIndex)}
                  >
                    No Pin
                  </button>
                </div>
              )}
            </div>
          )}

          <div
            class="checkboxverticalicon"
            style={{ display: isColumnsHeaderVisiblee ? "block" : "none" }}
          >
            <div id="girdsearch">
              <input
                type="text"
                placeholder="Search..."
                class="checkboxsearch"
                value={checkboxSearchValue}
                onChange={handleCheckBoxSearch}
              />
            </div>
            <div>
              <input
                type="checkbox"
                class="defalutallcheckbox"
                checked={selectAllChecked}
                onChange={() => {
                  setSelectAllChecked(!selectAllChecked);
                  const updatedColumnVisibility = {};
                  columns.forEach((column) => {
                    updatedColumnVisibility[column.field] = !selectAllChecked;
                  });
                  setColumnVisibility(updatedColumnVisibility);
                }}
              />

              <span></span>
            </div>
            {columns
              .filter((column) =>
                column.field
                  .toLowerCase()
                  .includes(checkboxSearchValue.toLowerCase())
              )
              .map((column, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={`checkbox-${column.field}`}
                    checked={!columnVisibility[column.field]}
                    onChange={() => toggleCheckbox(column.field)}
                  />
                  <label htmlFor={`checkbox-${column.field}`}>
                    {column.field}
                  </label>
                </div>
              ))}
          </div>

          {/* FIlter character data start */}

          {columns[popupColumnIndex].showFilter && (
            <div
              class="filtercontent"
              style={{ display: isFilterContentVisible ? "block" : "none" }}
            >
              <input
                className="listselection"
                placeholder="value"
                onClick={toggleDropdown}
                value={filterOption}
              />
              <input
                className="filtersearch"
                placeholder="filter search"
                value={searchValue}
                onChange={handleSearchValueChange}
              />
              <ul class="filterdropdowngrid" style={{ display: "none" }}>
                <li
                  className="contains"
                  onClick={() => handleFilterOptionChange("contains")}
                >
                  Contains
                </li>
                <li
                  className="notcontains"
                  onClick={() => handleFilterOptionChange("notcontains")}
                >
                  Not Contains
                </li>
                <li
                  className="startwith"
                  onClick={() => handleFilterOptionChange("startwith")}
                >
                  Starts with
                </li>
                <li
                  className="endwith"
                  onClick={() => handleFilterOptionChange("endwith")}
                >
                  Ends with
                </li>
              </ul>
              <div>
                <button class="clearbutton">clear</button>
              </div>
              <div
                class="andorinput"
                style={{ display: filterSearchValue ? "block" : "none" }}
              >
                <div class="radiobtndiv">
                  <input
                    type="radio"
                    name="andorGroup1"
                    value="and"
                    className="andbutton"
                    checked={selectedAndOr === "and"} // Set checked based on state
                    onChange={() => setSelectedAndOr("and")} // Update state on change
                  />
                  <label class="andlabel">AND</label>
                  <input
                    type="radio"
                    name="andorGroup1"
                    value="OR"
                    className="orbutton"
                    checked={selectedAndOr === "or"} // Set checked based on state
                    onChange={() => setSelectedAndOr("or")} // Update state on change
                  />
                  <label class="orlabel">OR</label>
                </div>

                <input
                  className="listselectionandor"
                  placeholder="value2"
                  onClick={toggleDropdown2}
                />
                <input
                  className="filtersearchandor"
                  placeholder="filter search2"
                  onChange={handleFilterSearchAndOrChange}
                  value={filterSearchAndOrValue} // Bind the filter search input value
                />
                <ul
                  class="filterdropdowngridandor"
                  style={{ display: filterSearchValue ? "none" : "block" }}
                >
                  <li
                    class="contains"
                    onClick={() => handleFilterOptionSelect("contains")}
                  >
                    Contains
                  </li>
                  <li
                    class="notcontains"
                    onClick={() => handleFilterOptionSelect("notcontains")}
                  >
                    Not Contains
                  </li>
                  <li
                    class="startwith"
                    onClick={() => handleFilterOptionSelect("startwith")}
                  >
                    Starts with
                  </li>
                  <li
                    class="endwith"
                    onClick={() => handleFilterOptionSelect("endwith")}
                  >
                    End with
                  </li>
                </ul>
              </div>
            </div>
          )}
          {columns[popupColumnIndex].showNumericalFilter && (
            <div>
              <div
                className="Numericalfiltercontent"
                style={{
                  display: isNumericalFilterContentVisible ? "block" : "none",
                }}
              >
                <input
                  className="filterdropdowninput"
                  placeholder="click here!!!"
                  onClick={NumericalDropDownListVisible}
                  value={numericalFilterOption}
                ></input>
                <input
                  className="filterinputvalue"
                  placeholder="click here!!!"
                  type="number"
                  value={numericalSearchValue}
                  onChange={handleNumericalFilterChange}
                ></input>
                <ul class="Numericaldropdownlist" style={{ display: "none" }}>
                  <li
                    className="equals"
                    value="Equals"
                    onClick={() => handleNumericalFilterOptionChange("equals")}
                  >
                    Equals
                  </li>
                  <li
                    className=" Not equals"
                    value=" Not Equals"
                    onClick={() =>
                      handleNumericalFilterOptionChange("Not equals")
                    }
                  >
                    Not Equals
                  </li>
                  <li
                    className="Less than"
                    value="Less than"
                    onClick={() =>
                      handleNumericalFilterOptionChange("Less than")
                    }
                  >
                    Less than
                  </li>
                  <li
                    className="Lesser than or equals"
                    value="Lesser than or equals"
                    onClick={() =>
                      handleNumericalFilterOptionChange("Lesser than or equals")
                    }
                  >
                    Less than or equals
                  </li>
                  <li
                    className="Greater than"
                    value="Greater than"
                    onClick={() =>
                      handleNumericalFilterOptionChange("Greater than")
                    }
                  >
                    Greater than
                  </li>
                  <li
                    className="Greater than or equals"
                    value="Greater than or equals"
                    onClick={() =>
                      handleNumericalFilterOptionChange(
                        "Greater than or equals"
                      )
                    }
                  >
                    Greater than or equals
                  </li>
                  {/* <li className="In range" value="In range" onClick={() => handleNumericalFilterOptionChange('In range')} >In range</li> */}
                </ul>
              </div>
              <div
                class="numericalandorinput"
                style={{ display: numericalSearchValue ? "block" : "none" }}
              >
                <div class="numericalradiobtndiv">
                  <input
                    type="radio"
                    name="andorGroup1"
                    value="and"
                    className="numericalandbutton"
                  />
                  <label class="numericalandlabel">AND</label>
                  <input
                    type="radio"
                    name="andorGroup1"
                    value="OR"
                    className="numericalorbutton"
                  />
                  <label class="numericalorlabel">OR</label>
                </div>

                <input
                  className="Numericalfilterdropdowninput"
                  placeholder="filter search2"
                  onClick={NumericalAndORDropDOwnVisiblee}
                  value={numericalAndOrFilterOption}
                />

                <input
                  className="Numericafilterinputvalue"
                  placeholder="value2"
                  type="number"
                  onChange={handleNumericalAndOrChange}
                  value={numericalFilterAndOrSearchValue}
                />
                <ul
                  className="numericalfilterandoroperator"
                  id="numericalfilterandor"
                  style={{ display: "none" }}
                >
                  <li
                    className="equals"
                    value="Equals"
                    onClick={() => handleNumericalAndOrOptionVisible("equals")}
                  >
                    Equals
                  </li>
                  <li
                    className=" Not equals"
                    value=" Not Equals"
                    onClick={() =>
                      handleNumericalAndOrOptionVisible(" Not equals")
                    }
                  >
                    Not Equals
                  </li>
                  <li
                    className="Less than"
                    value="Less than"
                    onClick={() =>
                      handleNumericalAndOrOptionVisible("Less than")
                    }
                  >
                    Less than
                  </li>
                  <li
                    className="Less than or equals"
                    value="Equals"
                    onClick={() =>
                      handleNumericalAndOrOptionVisible(" Less than or equals")
                    }
                  >
                    Less than or equals
                  </li>
                  <li
                    className="Greater than"
                    value="Greater than"
                    onClick={() =>
                      handleNumericalAndOrOptionVisible("Greater than")
                    }
                  >
                    Greater than
                  </li>
                  <li
                    className="Greater than or equals"
                    value="Equals"
                    onClick={() =>
                      handleNumericalAndOrOptionVisible(
                        "Greater than or equals"
                      )
                    }
                  >
                    Greater than or equals
                  </li>
                  <li
                    className="In range"
                    value="In range"
                    onClick={() =>
                      handleNumericalAndOrOptionVisible(" In range")
                    }
                  >
                    In range
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default TemplateGrid;
