import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFilter,
  faArrowUp,
  faArrowDown,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/pcrGrid/PcrGrid.css"

const PcrGrid = () => {
  const tableRef = useRef(null);
  const MIN_COLUMN_WIDTH = 200;
  let draggedColumnIndex = null;

  useEffect(() => {
    const headerCells = tableRef.current.querySelectorAll("th");

    headerCells.forEach((cell) => {
      const resizeHandle = document.createElement("div");
      resizeHandle.classList.add("resize-handle");
      cell.appendChild(resizeHandle);
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
      setItembarsDiv(true);
      setIsColumnBarsVisible(true);

      setIsFilterContentVisible(false);
      setColumnsHeaderVisiblee(false);
      setIsNumericalFilterContentVisible(false);
      setIsTemplateFilterContentVisible(false);
      setFiltericonDiv(false);
      SetVerticaliconDiv(false);
    } else {
      setIsPopupOpen(true);
      setItembarsDiv(true);
      setItemBarsColor("white");
      setItemBarsBorderBottom("none");
      setItemBarsBorder("1px solid #ccc");
      setItemBarsIconColor("#216c98");
      setItemBarsIconBorderbtm("3px solid #216c98");
      setVerticalBorderBtm("1px solid #ccc");
      setFilterIconbgColor("#f5f5f5");
      setFilterBorder("none");
      setFilterBorderBottom("1px solid #ccc");
      setFilterIconColor("black");
      setFilterIconBorderBottom("none");

      setVerticalbgColor("#f5f5f5");
      setVerticalBorder("none");
      setVerticalIconColor("black");
      setVerticalIconBorderBottom("none");
      setBarsPopUpOverFlowX("hidden");
      setBarsPopUpOverFlow("hidden");
      setBarsPopUpHeight("auto");

      setIsColumnBarsVisible(true);
      setIsFilterContentVisible(false);
      setColumnsHeaderVisiblee(false);
      setIsNumericalFilterContentVisible(false);
      setIsTemplateFilterContentVisible(false);
    }
    setPopupColumnIndex(columnIndex);
    setIsPinColumnOptionsVisible(true);
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
      field: "Quantity",
      pinned: null,
      width: 100,
      icon: faBars,
      originalIndex: 0,
      showFilter: true,
    }, // Add 'showFilter' property
    {
      field: "Billable",
      pinned: null,
      icon: faBars,
      originalIndex: 1,
      showNumericalFilter: true,
    }, // Add 'showFilter' property
    {
      field: "UOM",
      pinned: null,
      icon: faBars,
      originalIndex: 2,
      showFilter: true,
    },
    {
      field: "Unit Cost",
      pinned: null,
      icon: faBars,
      originalIndex: 3,
      showTemplateFilter: true,
    },
    {
      field: "Unit Price",
      pinned: null,
      icon: faBars,
      originalIndex: 4,
      showTemplateFilter: true,
    },
    {
      field: "Unit List Price",
      pinned: null,
      icon: faBars,
      originalIndex: 5,
      showTemplateFilter: true,
    },
    {
      field: "Discount",
      pinned: null,
      icon: faBars,
      originalIndex: 6,
      showTemplateFilter: true,
    },
    {
      field: "Net Price",
      pinned: null,
      icon: faBars,
      originalIndex: 7,
      showTemplateFilter: true,
    },
    {
      field: "List Price",
      pinned: null,
      icon: faBars,
      originalIndex: 8,
      showTemplateFilter: true,
    },
    {
      field: "Cost",
      pinned: null,
      icon: faBars,
      originalIndex: 9,
      showTemplateFilter: true,
    },
    {
      field: "Margin",
      pinned: null,
      icon: faBars,
      originalIndex: 9,
      showTemplateFilter: true,
    },
    {
      field: "Expenses",
      pinned: null,
      icon: faBars,
      originalIndex: 9,
      showTemplateFilter: true,
    },
    {
      field: "Start Date",
      pinned: null,
      icon: faBars,
      originalIndex: 9,
      showTemplateFilter: true,
    },
    {
      field: "End Date",
      pinned: null,
      icon: faBars,
      originalIndex: 9,
      showTemplateFilter: true,
    },
    {
      field: "Weeks",
      pinned: null,
      icon: faBars,
      originalIndex: 9,
      showTemplateFilter: true,
    },
    {
      field: "Month",
      pinned: null,
      icon: faBars,
      originalIndex: 9,
      showTemplateFilter: true,
    },
    {
      field: "FTE",
      pinned: null,
      icon: faBars,
      originalIndex: 9,
      showTemplateFilter: true,
    },
    {
      field: "Notes",
      pinned: null,
      icon: faBars,
      originalIndex: 9,
      showTemplateFilter: true,
    },
  ]);

  const handlepin = () => {
    setShowPinOptions(!showPinOptions);
    setShowPinOptions(true);
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
  const [isTemplateFilterContentVisible, setIsTemplateFilterContentVisible] =
    useState(false);
  const [itembarsDiv, setItembarsDiv] = useState(true);

  const [filtericonDiv, setFiltericonDiv] = useState(true);
  const [verticaliconDiv, SetVerticaliconDiv] = useState(true);

  const [itemBarsColor, setItemBarsColor] = useState("white");
  const [itemBarsBorder, setItemBarsBorder] = useState("1px solid #ccc");
  const [itemBarsBorderBottom, setItemBarsBorderBottom] = useState(null);
  const [itemBarsIconColor, setItemBarsIconColor] = useState("#216c98");
  const [itemBarsIconBorderbtm, setItemBarsIconBorderbtm] =
    useState("3px solid #216c98");

  const [FilterIconbgColor, setFilterIconbgColor] = useState(false);
  const [FilterBorderBottom, setFilterBorderBottom] =
    useState("1px solid #ccc");
  const [FilterBorder, setFilterBorder] = useState(false);
  const [FilterIconColor, setFilterIconColor] = useState(false);
  const [FilterIconBorderBottom, setFilterIconBorderBottom] = useState(false);

  const [verticalbgColor, setVerticalbgColor] = useState(false);
  const [verticalBorderBtm, setVerticalBorderBtm] = useState("1px solid #ccc");
  const [VerticalIconBorderBottom, setVerticalIconBorderBottom] =
    useState(false);
  const [VerticalIconColor, setVerticalIconColor] = useState(false);
  const [verticalBorder, setVerticalBorder] = useState(false);

  const [columnBarsbgColor, setColumnBarsbgColor] = useState("white");
  const [filterContentBgColor, setFilterContentBgColor] = useState("white");
  const [checkBoxContentbgColor, setCheckBoxContentbgColor] = useState("white");
  const [barsPopUpOverFlow, setBarsPopUpOverFlow] = useState("scroll");
  const [barsPopUpOverFlowX, setBarsPopUpOverFlowX] = useState("hidden");
  const [barsPopUpHeight, setBarsPopUpHeight] = useState("auto");

  // Function to toggle the visibility of columnbars and filtercontent
  const toggleColumnBars = () => {
    setIsColumnBarsVisible(!isColumnBarsVisible);
    setIsColumnBarsVisible(true);
    setIsFilterContentVisible(false);
    setColumnsHeaderVisiblee(false);
    setIsNumericalFilterContentVisible(false);
    setIsTemplateFilterContentVisible(false);
    setIsPopupOpen(!isColumnBarsVisible);
    setBarsPopUpHeight("auto");

    setItemBarsColor("white");
    setItemBarsBorderBottom("none");
    setItemBarsBorder("1px solid #ccc");
    setItemBarsIconColor("#216c98");
    setItemBarsIconBorderbtm("3px solid #216c98");
    setVerticalBorderBtm("1px solid #ccc");

    setFilterIconbgColor("#f5f5f5");
    setFilterBorder("none");
    setFilterBorderBottom("1px solid #ccc");
    setFilterIconColor("black");
    setFilterIconBorderBottom("none");

    setVerticalbgColor("#f5f5f5");
    setVerticalBorder("none");
    setVerticalIconColor("black");
    setVerticalIconBorderBottom("none");
    setBarsPopUpOverFlowX("hidden");
    setBarsPopUpOverFlow("hidden");

  };

  const toggleFilterContent = () => {
    setIsFilterContentVisible(!isFilterContentVisible);
    setIsColumnBarsVisible(false);
    setColumnsHeaderVisiblee(false);
    setIsFilterContentVisible(true);
    setIsNumericalFilterContentVisible(true);
    setIsTemplateFilterContentVisible(true);

    setItemBarsColor("#f5f5f5");
    setItemBarsBorderBottom("1px solid #ccc");
    setItemBarsBorder("none");
    setItemBarsIconColor("black");
    setItemBarsIconBorderbtm("none");

    setVerticalBorderBtm("1px solid #ccc");
    setVerticalbgColor("#f5f5f5");
    setVerticalBorder("none");
    setVerticalIconColor("black");
    setVerticalIconBorderBottom("none");

    setFilterIconColor("#216c98");
    setFilterBorder("1px solid #ccc");
    setFilterIconbgColor("white");
    setFilterBorderBottom("0px solid #ccc");
    setFilterIconBorderBottom("3px solid #216c98");
    setFilterContentBgColor("white");
    setBarsPopUpHeight("auto");
    setBarsPopUpOverFlowX("hidden");
    setBarsPopUpOverFlow("hidden");
  };
  const verticalColumnbars = () => {
    setColumnsHeaderVisiblee(!isColumnsHeaderVisiblee);
    setColumnsHeaderVisiblee(true);
    setIsPopupOpen(!isColumnsHeaderVisiblee);
    setIsFilterContentVisible(false);
    setIsColumnBarsVisible(false);
    setIsNumericalFilterContentVisible(false);
    setIsTemplateFilterContentVisible(false);

    setItemBarsColor("#f5f5f5");
    setItemBarsBorderBottom("1px solid #ccc");
    setItemBarsBorder("none");
    setItemBarsIconColor("black");
    setItemBarsIconBorderbtm("none");

    setFilterIconbgColor("#f5f5f5");
    setFilterBorderBottom("1px solid #ccc");
    setFilterBorder("none");
    setFilterIconColor("black");
    setFilterIconBorderBottom("none");

    setVerticalbgColor("white");
    setVerticalBorder("1px solid #ccc");
    setVerticalBorderBtm("none");
    setVerticalIconColor("#216c98");
    setVerticalIconBorderBottom("3px solid #216c98");
    setCheckBoxContentbgColor("white");
    setBarsPopUpOverFlow("scroll");
    setBarsPopUpOverFlowX("hidden");
    setBarsPopUpHeight("208px");
  };

  // Assuming you have a function named 'toggleDropdown' to toggle the visibility of the dropdown
  function toggleDropdown() {
    const dropdown = document.querySelector(".filterdropdowngrid");
    const barsPopUp = document.querySelector(".barspopupasseet");
    if (dropdown.style.display === "none") {
      dropdown.style.display = "block";
      barsPopUp.style.height = "165px";
    } else {
      dropdown.style.display = "none";
      barsPopUp.style.height = "auto";
    }
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
      barsPopUp.style.height = "auto";
    });
  });

  const initialData = [
    {
      Quantity: "",
      Billable: 23,
      UOM: "INDIA",
      UnitCost: 2001,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "q",
      Billable: 43,
      UOM: "USA",
      UnitCost: 1945,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "a",
      Billable: 78,
      UOM: "AFRICA",
      UnitCost: 1678,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "a",
      Billable: 12,
      UOM: "CANADA",
      UnitCost: 8322,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "s",
      Billable: 98,
      UOM: "ENGLAND",
      UnitCost: 3452,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 89,
      UOM: "UAE",
      UnitCost: 3289,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 7,
      UOM: "AUSTRALIA",
      UnitCost: 8989,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 35,
      UOM: "FRANCE",
      UnitCost: 3428,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 43,
      UOM: "IRELAND",
      UnitCost: 9534,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 29,
      UOM: "TURKEY",
      UnitCost: 7098,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 66,
      UOM: "VENICE",
      UnitCost: 9754,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 47,
      UOM: "GERMANY",
      unitCost: 2019,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 63,
      UOM: "ARGENTINA",
      unitCost: 7887,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 1540,
      UOM: "BALI",
      unitCost: 3017,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 320,
      UOM: "PARIS",
      unitCost: 5023,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 76,
      UOM: "SCOTLAND",
      unitCost: 1983,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 738,
      UOM: "DENMARK",
      unitCost: 1999,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 1997,
      UOM: "CHINA",
      unitCost: 557,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 212,
      UOM: "AUSTRALIA",
      unitCost: 8989,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 145,
      UOM: "USA",
      unitCost: 76768,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 9433,
      UOM: "EGYPT",
      unitCost: 8989,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 289,
      UOM: "SRI LANKA",
      unitCost: 1946,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 618,
      UOM: "BRAZIL",
      unitCost: 1234,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },
    {
      Quantity: "",
      Billable: 991,
      UOM: "BANGLADESH",
      unitCost: 1000,
      UnitPrice: "2020-08-01",
      UnitListPrice: "DIscount",
      NetPrice: 1,
      listPrice: 0,
      cost: 0,
      margin: 1,
      Expenses: "",
      StartDate: "",
      EndDate: "",
      Weeks: "",
      Month: "",
      FTE: "",
      Notes: "",
    },

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
  const [filterOption, setFilterOption] = useState("Contains");
  const [searchValue, setSearchValue] = useState("");
  const [filterSearchValue, setFilterSearchValue] = useState("");

  const [data, setData] = useState(initialData);

  // Step 2: Update state variables when the filter option or search value changes
  const handleFilterOptionChange = (option) => {
    setFilterOption(option);
  };
  // and or operator display
  const barsPopUp = document.querySelector(".barspopupasseet");

  const [filterSearchAndOrValue, setFilterSearchAndOrValue] = useState(""); // Add state for filter search input value

  const [selectedFilterOption, setSelectedFilterOption] = useState("Contains");

  const [numericalFilterOption, setNumericalFilterOption] = useState("Equals");
  const [numericalSearchValue, setNumericalSearchValue] = useState("");
  const [numericalFilterAndOrSearchValue, setNumericalFilterAndOrSearchValue] =
    useState("");
  const [numericalAndOrFilterOption, setNumericalAndOrFilterOption] =
    useState("Equals");

  const clearButtonDiv = document.querySelector(".clearbuttondiv");
  const handleSearchValueChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setFilterSearchValue(value); // Update the filter search value
    if (value) {
      clearButtonDiv.style.top = "80px";
      barsPopUp.style.height = "210px";
    } else {
      clearButtonDiv.style.top = "0px";
      barsPopUp.style.height = "auto";
    }
  };

  // Initialize selectedAndOr state variable with a default value

  const [selectedAndOr, setSelectedAndOr] = useState("and");

  const [NumericalselectedAndOr, setNumericalSelectedAndOr] = useState("and");

  const [inRangeFrom, setInRangeFrom] = useState("");
  const [inRangeTo, setInRangeTo] = useState("");

  const [inRangeAndFrom, setInRangeAndFrom] = useState("");
  const [inRangeAndTo, setInRangeAndTo] = useState("");

  // Helper function to check if a cell value matches a filter condition
  const filterMatches = (cellValue, filterValue, filterType) => {
    switch (filterType) {
      case "Contains":
        return cellValue.includes(filterValue);
      case "Not Contains":
        return !cellValue.includes(filterValue);
      case "Start With":
        return cellValue.startsWith(filterValue);
      case "End With":
        return cellValue.endsWith(filterValue);
      default:
        return true;
    }
  };

  function applyFilterCondition(filterOption, cellValuee, filterValuee) {
    switch (filterOption) {
      case "Equals":
        return cellValuee === filterValuee;
      case "Not Equals":
        return cellValuee !== filterValuee;
      case "Less Than":
        return cellValuee < filterValuee;
      case "Less Than or Equals":
        return cellValuee <= filterValuee;
      case "Greater Than":
        return cellValuee > filterValuee;
      case "Greater Than or Equals":
        return cellValuee >= filterValuee;
      case "In range":
        // Check if the cellValue is within the range specified
        return (
          cellValuee >= parseInt(inRangeFrom) &&
          cellValuee <= parseInt(inRangeTo)
        );

      default:
        return true;
    }
  }
  function applyNumericalFilter(
    item,
    numericalFilterOption,
    numericalSearchValue,
    numericalAndOrFilterOption,
    numericalFilterAndOrSearchValue,
    columns,
    popupColumnIndex
  ) {
    if (numericalFilterOption && numericalSearchValue) {
      const cellValue = parseFloat(item[columns[popupColumnIndex].field]);
      const numericalFilterValue = parseFloat(numericalSearchValue);

      if (NumericalselectedAndOr === "and" && numericalFilterAndOrSearchValue) {
        const numericalFilterAndOrValue = parseFloat(
          numericalFilterAndOrSearchValue
        );

        return (
          applyFilterCondition(
            numericalFilterOption,
            cellValue,
            numericalFilterValue
          ) &&
          applyFilterCondition(
            numericalAndOrFilterOption,
            cellValue,
            numericalFilterAndOrValue
          )
        );
      } else if (
        NumericalselectedAndOr === "or" ||
        numericalFilterAndOrSearchValue
      ) {
        const numericalFilterAndOrValue = parseFloat(
          numericalFilterAndOrSearchValue
        );

        return (
          applyFilterCondition(
            numericalFilterOption,
            cellValue,
            numericalFilterValue
          ) ||
          applyFilterCondition(
            numericalAndOrFilterOption,
            cellValue,
            numericalFilterAndOrValue
          )
        );
      } else {
        // Apply the main filter condition
        return applyFilterCondition(
          numericalFilterOption,
          cellValue,
          numericalFilterValue
        );
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

    return true;
  });

  const handleFilterSearchAndOrChange = (event) => {
    const value = event.target.value;
    setFilterSearchAndOrValue(value);
  };
  const listSelectionAndOrInput = document.querySelector(".listselectionandor");
  const dropdownAndOr = document.querySelector(".filterdropdowngridandor");

  const handleFilterOptionSelect = (option) => {
    setSelectedFilterOption(option);

    listSelectionAndOrInput.value = option;

    dropdownAndOr.style.display = "none";
    barsPopUp.style.height = "auto";
  };

  function toggleDropdown2() {
    const dropdownAndOr = document.querySelector(".filterdropdowngridandor");
    if (dropdownAndOr.style.display === "none") {
      dropdownAndOr.style.display = "block";
      barsPopUp.style.height = "43%";
    } else {
      dropdownAndOr.style.display = "none";
      barsPopUp.style.height = "auto";
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

  function NumericalDropDownListVisible() {
    const NumericalDropDownList = document.querySelector(
      ".Numericaldropdownlist"
    );
    if (NumericalDropDownList.style.display === "none") {
      NumericalDropDownList.style.display = "block";
      barsPopUp.style.height = "225px";
    } else {
      NumericalDropDownList.style.display = "none";
      barsPopUp.style.height = "auto";
    }
  }
  const [isInRangeSelected, setIsInRangeSelected] = useState(false);

  const [isInRangeAndSelected, setIsInRangeAndSelected] = useState(false);

  const [isInRangeInputVisible, setIsInRangeInputVisible] = useState(true);

  const handleNumericalFilterOptionChange = (option) => {
    setNumericalFilterOption(option);
    barsPopUp.style.height = "auto";

    const NumericalDropDownList = document.querySelector(
      ".Numericaldropdownlist"
    );
    NumericalDropDownList.style.display = "none";
    if (option === "In range") {
      setIsInRangeSelected(true);
      setIsInRangeInputVisible(false);
      NumericalDropDownList.style.bottom = "98px";
    } else {
      setIsInRangeSelected(false);
      setIsInRangeInputVisible(true);
      NumericalDropDownList.style.bottom = "65px";
    }
  };

  const NumericalClearButtonDiv = document.querySelector(
    ".Numericalclearbuttondiv"
  );
  //   and or operatioj=r visible
  const handleNumericalFilterChange = (event) => {
    const value = event.target.value;
    setNumericalSearchValue(value);
    if (value) {
      NumericalClearButtonDiv.style.top = "80px";
      barsPopUp.style.height = "210px";
    } else {
      NumericalClearButtonDiv.style.top = "0px";
      barsPopUp.style.height = "164px";
    }
  };

  function NumericalAndORDropDOwnVisiblee() {
    const numericalFilterAndOrOperator = document.querySelector(
      ".numericalfilterandoroperator"
    );
    if (numericalFilterAndOrOperator.style.display === "none") {
      numericalFilterAndOrOperator.style.display = "block";
      barsPopUp.style.height = "300px";
    } else {
      numericalFilterAndOrOperator.style.display = "none";
      barsPopUp.style.height = "auto";
    }
    // Clear the "In range" values when the dropdown is opened
  }
  function handleNumericalAndOrChange(event) {
    const value = event.target.value;
    setNumericalFilterAndOrSearchValue(value);
  }
  const [isInRangeInputAndVisible, setIsInRangeInputAndVisible] =
    useState(true);

  const handleNumericalAndOrOptionVisible = (option) => {
    setNumericalAndOrFilterOption(option);
    barsPopUp.style.height = "auto";
    const numericalFilterAndOrOperator = document.querySelector(
      ".numericalfilterandoroperator"
    );
    numericalFilterAndOrOperator.style.display = "none";
    if (option === "In range") {
      setIsInRangeAndSelected(true);
      setIsInRangeInputAndVisible(false);
    } else {
      setIsInRangeAndSelected(false);
      setIsInRangeInputAndVisible(true);
    }
  };

  const handleInRangeFromChange = (event) => {
    const value = event.target.value;
    setNumericalSearchValue(value);
    setInRangeFrom(value);
  };
  const [TemplateCheckBoxSearchValue, setTemplateCheckBoxSearchValue] =
    useState("");

  const handleTemplateSearchBox = (event) => {
    const value = event.target.value;
    setTemplateCheckBoxSearchValue(value);
  };

  const barsRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (barsRef.current && !barsRef.current.contains(e.target)) {
        setIsPopupOpen(false);
        setIsColumnBarsVisible(false);
        setIsFilterContentVisible(false);
        setColumnsHeaderVisiblee(false);
        setIsNumericalFilterContentVisible(false);
        setIsTemplateFilterContentVisible(false);
        setIsNumericalFilterContentVisible(false);
      }
    };
    if (isPopupOpen) {
      window.addEventListener("mousedown", handler);
    }
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, [isPopupOpen]);


  return (
    <>
     
      <div className="table-container">
        <table ref={tableRef} className="myTable">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.field}
                  style={{
                    display: columnVisibility[column.field]
                      ? "none"
                      : "table-cell",
                  }}
                >
                  {column.field}
                  <button
                    class="ascendingbutton"
                    onClick={() => handleColumnSort(column.field)}
                  ></button>

                  {column.sortOrder === eSortOrder.ASCENDING && (
                    <FontAwesomeIcon icon={faArrowUp} />
                  )}
                  {column.sortOrder === eSortOrder.DESCENDING && (
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
              <tr key={rowIndex}>
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
              </tr>
            ))}
          </tbody>
        </table>
        {isPopupOpen && popupColumnIndex !== null && (
          <div
            className="barspopupasseet"
            style={{
              left: `${draggedColumnX - 70}px`,
              height: barsPopUpHeight,
              overflowY: barsPopUpOverFlow,
              overflowX: barsPopUpOverFlowX,
            }}
            ref={barsRef}
          >
            {/* Your content for the popup */}
            <div class="icondiv">
              <div
                className="itembarsDiv"
                style={{
                  display: itembarsDiv,
                  backgroundColor: itemBarsColor,
                  border: itemBarsBorder,
                  borderBottom: itemBarsBorderBottom,
                }}
                onClick={toggleColumnBars}
              >
                <FontAwesomeIcon
                  icon={faBars}
                  className="itembars"
                  style={{
                    color: itemBarsIconColor,
                    borderBottom: itemBarsIconBorderbtm,
                  }}
                />
              </div>
              <div
                className="horizpontalfiltericonDiv"
                style={{
                  display: filtericonDiv,
                  backgroundColor: FilterIconbgColor,
                  border: FilterBorder,
                  borderBottom: FilterBorderBottom,
                }}
                onClick={toggleFilterContent}
              >
                <FontAwesomeIcon
                  icon={faFilter}
                  id="horizpontalfiltericon"
                  style={{
                    color: FilterIconColor,
                    borderBottom: FilterIconBorderBottom,
                  }}
                />
              </div>
              <div
                className="verticaliconDiv"
                style={{
                  display: verticaliconDiv,
                  backgroundColor: verticalbgColor,
                  border: verticalBorder,
                  borderBottom: verticalBorderBtm,
                }}
                onClick={verticalColumnbars}
              >
                <FontAwesomeIcon
                  icon={faAlignJustify}
                  id="verticalicon"
                  style={{
                    color: VerticalIconColor,
                    borderBottom: VerticalIconBorderBottom,
                  }}
                />
              </div>
            </div>
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
                <hr class="columnsresethr"></hr>
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
                    <label
                      htmlFor={`checkbox-${column.field}`}
                      className="columnsnames"
                    >
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
                  placeholder="Filter..."
                  onClick={toggleDropdown}
                  value={filterOption}
                />
                <input
                  className="filtersearch"
                  type="text"
                  placeholder="Filter..."
                  value={searchValue}
                  onChange={handleSearchValueChange}
                />
                <div className="clearbuttondiv">
                  <button class="clearbutton">CLEAR</button>
                </div>
                <ul class="filterdropdowngrid" style={{ display: "none" }}>
                  <li
                    className="contains"
                    onClick={() => handleFilterOptionChange("Contains")}
                  >
                    Contains
                  </li>
                  <li
                    className="notcontains"
                    onClick={() => handleFilterOptionChange("Not Contains")}
                  >
                    Not Contains
                  </li>
                  <li
                    className="startwith"
                    onClick={() => handleFilterOptionChange("Start With")}
                  >
                    Starts with
                  </li>
                  <li
                    className="endwith"
                    onClick={() => handleFilterOptionChange("End With")}
                  >
                    Ends with
                  </li>
                </ul>

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
                    placeholder="Filter..."
                    onClick={toggleDropdown2}
                    value="Contains"
                    type="text"
                  />
                  <input
                    className="filtersearchandor"
                    placeholder="Filter..."
                    onChange={handleFilterSearchAndOrChange}
                    value={filterSearchAndOrValue} // Bind the filter search input value
                  />
                  <ul
                    class="filterdropdowngridandor"
                    style={{ display: filterSearchValue ? "none" : "block" }}
                  >
                    <li
                      class="contains"
                      onClick={() => handleFilterOptionSelect("Contains")}
                    >
                      Contains
                    </li>
                    <li
                      class="notcontains"
                      onClick={() => handleFilterOptionSelect("Not Contains")}
                    >
                      Not Contains
                    </li>
                    <li
                      class="startwith"
                      onClick={() => handleFilterOptionSelect("Start With")}
                    >
                      Starts with
                    </li>
                    <li
                      class="endwith"
                      onClick={() => handleFilterOptionSelect("End With")}
                    >
                      End with
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {columns[popupColumnIndex].showNumericalFilter && (
              // <div>
              <div
                className="Numericalfiltercontent"
                style={{
                  display: isNumericalFilterContentVisible ? "block" : "none",
                }}
              >
                <input
                  className="filterdropdowninput"
                  placeholder="Filter..."
                  onClick={NumericalDropDownListVisible}
                  value={numericalFilterOption}
                ></input>
                {isInRangeInputVisible && (
                  <input
                    className="filterinputvalue"
                    placeholder="Filter..."
                    type="number"
                    value={numericalSearchValue}
                    onChange={handleNumericalFilterChange}
                    // onChange={(e) => setInRangeFrom(e.target.value)}
                  ></input>
                )}
                {isInRangeSelected && (
                  <div className="inrangediv">
                    <input
                      type="number"
                      className="inrangefrom"
                      placeholder="From"
                      value={inRangeFrom}
                      onChange={handleInRangeFromChange}
                    />
                    <input
                      type="number"
                      className="inrangeto"
                      placeholder="to"
                      value={inRangeTo}
                      onChange={(e) => setInRangeTo(e.target.value)}
                    />
                  </div>
                )}
                <div className="Numericalclearbuttondiv">
                  <button class="numericalclearbutton">CLEAR</button>
                </div>

                <ul class="Numericaldropdownlist" style={{ display: "none" }}>
                  <li
                    className="equals"
                    value="Equals"
                    onClick={() => handleNumericalFilterOptionChange("Equals")}
                  >
                    Equals
                  </li>
                  <li
                    className=" Notequals"
                    value=" Not Equals"
                    onClick={() =>
                      handleNumericalFilterOptionChange("Not Equals")
                    }
                  >
                    Not Equals
                  </li>
                  <li
                    className="Lessthan"
                    value="Less than"
                    onClick={() =>
                      handleNumericalFilterOptionChange("Less Than")
                    }
                  >
                    Less than
                  </li>
                  <li
                    className="Lessthanorequals"
                    value="Lesser than or equals"
                    onClick={() =>
                      handleNumericalFilterOptionChange("Lesser Than or Equals")
                    }
                  >
                    Less than or equals
                  </li>
                  <li
                    className="Greaterthan"
                    value="Greater than"
                    onClick={() =>
                      handleNumericalFilterOptionChange("Greater Than")
                    }
                  >
                    Greater than
                  </li>
                  <li
                    className="Greaterthanorequals"
                    value="Greater than or equals"
                    onClick={() =>
                      handleNumericalFilterOptionChange(
                        "Greater Than or Equals"
                      )
                    }
                  >
                    Greater than or equals
                  </li>
                  <li
                    className="inrange"
                    value="inrange"
                    onClick={() =>
                      handleNumericalFilterOptionChange("In range")
                    }
                  >
                    In range
                  </li>
                </ul>

                {numericalSearchValue && (
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
                        checked={NumericalselectedAndOr === "and"}
                        onChange={() => setNumericalSelectedAndOr("and")} // Update state on change
                      />

                      <label class="numericalandlabel">AND</label>
                      <input
                        type="radio"
                        name="andorGroup1"
                        value="OR"
                        className="numericalorbutton"
                        checked={NumericalselectedAndOr === "or"} // Set checked based on state
                        onChange={() => setNumericalSelectedAndOr("or")} // Update state on change
                      />
                      <label class="numericalorlabel">OR</label>
                    </div>

                    <input
                      className="Numericalfilterdropdowninput"
                      placeholder="Filter..."
                      onClick={NumericalAndORDropDOwnVisiblee}
                      value={numericalAndOrFilterOption}
                    />
                    {isInRangeInputAndVisible && (
                      <input
                        className="Numericafilterinputvalue"
                        placeholder="Filter..."
                        type="number"
                        onChange={handleNumericalAndOrChange}
                        value={numericalFilterAndOrSearchValue}
                      />
                    )}

                    <ul
                      className="numericalfilterandoroperator"
                      id="numericalfilterandor"
                      style={{ display: "none" }}
                    >
                      <li
                        className="equals"
                        value="Equals"
                        onClick={() =>
                          handleNumericalAndOrOptionVisible("Equals")
                        }
                      >
                        Equals
                      </li>
                      <li
                        className="Notequals"
                        value=" Not Equals"
                        onClick={() =>
                          handleNumericalAndOrOptionVisible("Not Equals")
                        }
                      >
                        Not Equals
                      </li>
                      <li
                        className="Lessthan"
                        value="Less than"
                        onClick={() =>
                          handleNumericalAndOrOptionVisible("Less Than")
                        }
                      >
                        Less than
                      </li>
                      <li
                        className="Lessthanorequals"
                        value="Lesser than or equals"
                        onClick={() =>
                          handleNumericalAndOrOptionVisible(
                            "Lesser Than or Equals"
                          )
                        }
                      >
                        Less than or equals
                      </li>
                      <li
                        className="Greaterthan"
                        value="Greater than"
                        onClick={() =>
                          handleNumericalAndOrOptionVisible("Greater Than")
                        }
                      >
                        Greater than
                      </li>
                      <li
                        className="Greaterthanorequals"
                        value="Greater than or equals"
                        onClick={() =>
                          handleNumericalAndOrOptionVisible(
                            "Greater Than or Equals"
                          )
                        }
                      >
                        Greater than or equals
                      </li>
                      <li
                        className="inrange"
                        value="inrange"
                        onClick={() =>
                          handleNumericalAndOrOptionVisible("In range")
                        }
                      >
                        In range
                      </li>
                    </ul>
                    {isInRangeAndSelected && (
                      <div className="inrangeanddiv">
                        <input
                          type="number"
                          className="inrangeandfrom"
                          placeholder="from"
                          value={inRangeAndFrom}
                          onChange={(e) => setInRangeAndFrom(e.target.value)}
                        />
                        <input
                          type="number"
                          className="inrangeandto"
                          placeholder="to"
                          value={inRangeAndTo}
                          onChange={(e) => setInRangeAndTo(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {columns[popupColumnIndex].showTemplateFilter && (
              <div
                className="templatefilter"
                style={{
                  display: isTemplateFilterContentVisible ? "block" : "none",
                }}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  class="templatefiltercheckbox"
                  value={TemplateCheckBoxSearchValue}
                  onChange={handleTemplateSearchBox}
                />

                <div className="templatesubfilter">
                  <input type="checkbox"></input>
                  <label className="templatefilterselectlabel">
                    Select All
                  </label>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PcrGrid;
