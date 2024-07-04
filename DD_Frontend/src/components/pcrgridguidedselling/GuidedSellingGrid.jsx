import React, { useEffect, useState, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faAngleRight,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/pcrGrid/PcrGrid.css";
import { commonService } from "../../utils/common";
const GuidedSellingGrid = ({
  surveykey,
  sectionKey,
  updateNetPrice,
  updateListPrice,
  updateCost,
  updateDiscount,
  updateMargin,
  sectionId,
  isGuided,
  surveyId,
  guidedIds,
  applyButtonPcr,
  allRules,
  setApplyButtonPcr,
  allRulesData,
}) => {
  const tableRef = useRef(null);
  const MIN_COLUMN_WIDTH = 200;
  let draggedColumnIndex = null;
  const [draggedColumnX, setDraggedColumnX] = useState(null);
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
          if (newWidth >= 250) {
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

          if (
            startIndex >= 0 &&
            startIndex < columns.length &&
            endIndex >= 0 &&
            endIndex < columns.length
          ) {
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
          }
        });
      };
    });
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  const { token } = user;

  const spreadRef = useRef({});
  const [surveyKey, setSurveyKey] = useState("");

  useEffect(() => {
    setSurveyKey(surveykey);
  }, []);
  //=====================================
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
      field: "NAME",
      pinned: null,
      width: 100,
      icon: faBars,
      originalIndex: 0,
      showFilter: true,
    },
    {
      field: "BILLABLE",
      pinned: null,
      icon: faBars,
      originalIndex: 1,
      showNumericalFilter: true,
    },
    {
      field: "QUANTITY",
      pinned: null,
      icon: faBars,
      originalIndex: 2,
      showNumericalFilter: true,
    },
    {
      field: "UOM",
      pinned: null,
      icon: faBars,
      originalIndex: 3,
      showNumericalFilter: true,
    },
    {
      field: "UNIT COST",
      pinned: null,
      icon: faBars,
      originalIndex: 4,
      showNumericalFilter: true,
    },
    {
      field: "UNIT PRICE",
      pinned: null,
      icon: faBars,
      originalIndex: 5,
      showNumericalFilter: true,
    },

    {
      field: "UNIT LIST PRICE",
      pinned: null,
      icon: faBars,
      originalIndex: 6,
      showNumericalFilter: true,
    },
    {
      field: "DISCOUNT",
      pinned: null,
      icon: faBars,
      originalIndex: 7,
      showNumericalFilter: true,
    },
    {
      field: "NET PRICE",
      pinned: null,
      icon: faBars,
      originalIndex: 8,
      showNumericalFilter: true,
      listselection: "",
      filtersearch: "",
      listselectionandor: "",
      filtersearchandor: "",
    },

    {
      field: "LIST PRICE",
      pinned: null,
      icon: faBars,
      originalIndex: 9,
      showNumericalFilter: true,
    },
    {
      field: "COST",
      pinned: null,
      icon: faBars,
      originalIndex: 10,
      showNumericalFilter: true,
    },
    {
      field: "MARGIN",
      pinned: null,
      icon: faBars,
      originalIndex: 11,
      showNumericalFilter: true,
    },
    {
      field: "START DATE",
      pinned: null,
      icon: faBars,
      originalIndex: 12,
      showNumericalFilter: true,
    },
    {
      field: "END DATE",
      pinned: null,
      icon: faBars,
      originalIndex: 13,
      showNumericalFilter: true,
    },
  ]);

  const initialData = [];

  // State variables for managing filter options and search value

  const [data, setData] = useState(initialData);

  const [columnVisibility, setColumnVisibility] = useState({});

  // Helper function to check if a cell value matches a filter condition

  // filter start*************************************************************************************
  // const [filteredData, setFilteredData] = useState(data);
  const [surveyActions, setSurveyActions] = useState([]);
  useEffect(() => {
    // fetchSurveyActions();
  }, [sectionKey]);
  useEffect(() => {
    setSurveyActions(allRules);
  }, [allRules]);
  const [filteredData, setFilteredData] = useState({
    services: [],
    tasks: [],
    roles: [],
    hoursByDates: [],
  });
  const findIndexIgnoringSpaces = (array, searchValue) => {
    const normalizedSearchValue = searchValue.replace(/\s+/g, "");
    return array.findIndex((element) => {
      // Ensure element is a string before calling replace.
      const normalizedElement =
        typeof element === "string" ? element.replace(/\s+/g, "") : "";
      return normalizedElement === normalizedSearchValue;
    });
  };
  // *********************************************************************************************************************************

  useEffect(() => {
    if (surveyActions && surveyActions.length > 0) {
      let filteredDataServices = [];
      let filteredDataTasks = [];
      let filteredDataRoles = [];
      let filteredDataHoursByDates = [];
      let filteredDataItems = [];

      surveyActions.forEach((surveyAction) => {
        if (surveyAction.actions && surveyAction.actions.length > 0) {
          surveyAction.actions.forEach((actionDetail) => {
            if (
              actionDetail.actionValue &&
              actionDetail.actionValue.cell_data
            ) {
              const valuesDataArray = actionDetail.actionValue.cell_data.map(
                (cellItem) => cellItem.valuedata
              );

              const servicePcrCodeIndex = findIndexIgnoringSpaces(
                valuesDataArray,
                "servicePcrCode"
              );
              const displayIndex = findIndexIgnoringSpaces(
                valuesDataArray,
                "display"
              );
              const taskPcrCodeIndex = findIndexIgnoringSpaces(
                valuesDataArray,
                "taskPcrCode"
              );
              const rolePcrCodeIndex = findIndexIgnoringSpaces(
                valuesDataArray,
                "rolePcrCode"
              );
              const itemPcrCodeIndex = findIndexIgnoringSpaces(
                valuesDataArray,
                "itemPcrCode"
              );

              const unitStandardRateIndex = findIndexIgnoringSpaces(
                valuesDataArray,
                "unitStandardRate"
              );
              const unitCostIndex = findIndexIgnoringSpaces(
                valuesDataArray,
                "unitCost"
              );
              const isbillableIndex = findIndexIgnoringSpaces(
                valuesDataArray,
                "isBillable"
              );
              const unitsIndex = findIndexIgnoringSpaces(
                valuesDataArray,
                "units"
              );
              const uomIndex = findIndexIgnoringSpaces(valuesDataArray, "uom");
              const uomCodeIndex = findIndexIgnoringSpaces(
                valuesDataArray,
                "uomCode"
              );
              const unitRateIndex = findIndexIgnoringSpaces(
                valuesDataArray,
                "unitRate"
              );
              const startDateIndex = findIndexIgnoringSpaces(
                valuesDataArray,
                "startDate"
              );
              const endDateIndex = findIndexIgnoringSpaces(
                valuesDataArray,
                "endDate"
              );

              // const isTasksSection = action.survey_actions_sections === "03.TASKS";
              const servicePcrCodeValuesArray = valuesDataArray.slice(
                servicePcrCodeIndex + 1,
                displayIndex
              );
              const displayValuesArray = valuesDataArray.slice(
                displayIndex + 1
              );
              const taskPcrCodeValuesArray = valuesDataArray.slice(
                taskPcrCodeIndex + 1
              );
              const rolePcrCodeValuesArray = valuesDataArray.slice(
                rolePcrCodeIndex + 1
              );
              const itemPcrCodeValuesArray = valuesDataArray.slice(
                itemPcrCodeIndex + 1
              );
              const unitStandardRateValuesArray = valuesDataArray.slice(
                unitStandardRateIndex + 1
              );
              const unitCostValuesArray = valuesDataArray.slice(
                unitCostIndex + 1
              );
              const isbillabelValuesArray = valuesDataArray.slice(
                isbillableIndex + 1
              );
              const unitsValuesArray = valuesDataArray.slice(unitsIndex + 1);
              const uomValuesArray = valuesDataArray.slice(uomIndex + 1);
              const unitRateValuesArray = valuesDataArray.slice(
                unitRateIndex + 1
              );
              const uomCodeValuesArray = valuesDataArray.slice(
                uomCodeIndex + 1
              );
              const startDateValuesArray = valuesDataArray.slice(
                startDateIndex + 1
              );
              const endDateValuesArray = valuesDataArray.slice(
                endDateIndex + 1
              );

              for (let i = 0; i < servicePcrCodeValuesArray.length; i++) {
                const servicePcrCode = servicePcrCodeValuesArray[i];
                const displayValue = displayValuesArray[i];
                const taskPcrCode = taskPcrCodeValuesArray[i];
                const rolePcrCode = rolePcrCodeValuesArray[i];
                const itemPcrCode = itemPcrCodeValuesArray[i];
                const unitStandardRate = unitStandardRateValuesArray[i];
                const unitCost = unitCostValuesArray[i];
                const isBillable = isbillabelValuesArray[i];
                const units = unitsValuesArray[i];
                const uom = uomValuesArray[i];
                const uomCode = uomCodeValuesArray[i];
                const unitRate = unitRateValuesArray[i];
                const startDate = startDateValuesArray[i];
                const endDate = endDateValuesArray[i];

                if (servicePcrCode && displayValue) {
                  const rowData = {
                    SERVICE_PCR_CODE: servicePcrCode,
                    NAME: displayValue,
                    TASK_PCR_CODE: taskPcrCode,
                    ROLE_PCR_CODE: rolePcrCode,
                    ITEM_PCR_CODE: itemPcrCode,
                    UNITLISTPRICE: unitStandardRate,
                    UNITCOST: unitCost,
                    BILLABLE: isBillable,
                    QUANTITY: units,
                    UOM: uom,
                    UNITPRICE: unitRate,
                    STARTDATE: startDate,
                    ENDDATE: endDate,
                  };

                  if (
                    actionDetail.actionValue.calcTabTemplate === "01.SERVICES"
                  ) {
                    // Include only NAME and SERVICE_PCR_CODE
                    filteredDataServices.push({
                      SERVICE_PCR_CODE: rowData.SERVICE_PCR_CODE,
                      NAME: rowData.NAME,
                    });
                  } else if (
                    actionDetail.actionValue.calcTabTemplate === "02.TASKS"
                  ) {
                    // Include only NAME, SERVICE_PCR_CODE, and TASK_PCR_CODE
                    filteredDataTasks.push({
                      SERVICE_PCR_CODE: rowData.SERVICE_PCR_CODE,
                      NAME: rowData.NAME,
                      TASK_PCR_CODE: rowData.TASK_PCR_CODE,
                      STARTDATE: rowData.STARTDATE,
                      ENDDATE: rowData.ENDDATE,
                    });
                  } else if (
                    actionDetail.actionValue.calcTabTemplate === "03.ROLES"
                  ) {
                    // Include only NAME, SERVICE_PCR_CODE, TASK_PCR_CODE, and ROLE_PCR_CODE
                    filteredDataRoles.push({
                      SERVICE_PCR_CODE: rowData.SERVICE_PCR_CODE,
                      NAME: rowData.NAME,
                      TASK_PCR_CODE: rowData.TASK_PCR_CODE,
                      ROLE_PCR_CODE: rowData.ROLE_PCR_CODE,
                      UNITCOST: rowData.UNITCOST,
                      BILLABLE: rowData.BILLABLE,
                      UOM: rowData.UOM,
                      UNITPRICE: rowData.UNITPRICE,
                      UNITLISTPRICE: rowData.UNITLISTPRICE,
                      STARTDATE: rowData.STARTDATE,
                      ENDDATE: rowData.ENDDATE,
                      // QUANTITY:rowData.QUANTITY,
                    });
                    // Add to both tasks and roles
                    filteredDataTasks.push({
                      SERVICE_PCR_CODE: rowData.SERVICE_PCR_CODE,
                      NAME: rowData.NAME,
                      TASK_PCR_CODE: rowData.TASK_PCR_CODE,
                      UNITCOST: rowData.UNITCOST,
                      BILLABLE: rowData.BILLABLE,
                      UOM: rowData.UOM,
                      UNITPRICE: rowData.UNITPRICE,
                      UNITLISTPRICE: rowData.UNITLISTPRICE,
                      STARTDATE: rowData.STARTDATE,
                      ENDDATE: rowData.ENDDATE,
                      ROLE_PCR_CODE: rowData.ROLE_PCR_CODE,
                      // QUANTITY:rowData.QUANTITY
                    });
                  } else if (
                    actionDetail.actionValue.calcTabTemplate ===
                    "04.HOURS BY DATES"
                  ) {
                    // Include only NAME, SERVICE_PCR_CODE, and TASK_PCR_CODE
                    filteredDataHoursByDates.push({
                      SERVICE_PCR_CODE: rowData.SERVICE_PCR_CODE,
                      NAME: rowData.NAME,
                      TASK_PCR_CODE: rowData.TASK_PCR_CODE,
                      ROLE_PCR_CODE: rowData.ROLE_PCR_CODE,
                      QUANTITY: rowData.QUANTITY,
                    });
                  } else if (
                    actionDetail.actionValue.calcTabTemplate === "05.ITEMS"
                  ) {
                    // Include only NAME, SERVICE_PCR_CODE, and TASK_PCR_CODE
                    filteredDataItems.push({
                      SERVICE_PCR_CODE: rowData.SERVICE_PCR_CODE,
                      NAME: rowData.NAME,
                      ITEM_PCR_CODE: rowData.ITEM_PCR_CODE,
                      UOM: rowData.UOM,
                      UNITPRICE: rowData.UNITPRICE,
                      UNITLISTPRICE: rowData.UNITLISTPRICE,
                    });
                  }
                  // });
                }
              }
              // });
            }
          });
        }
      });

      // Update the state with filtered data
      setFilteredData({
        services: filteredDataServices,
        tasks: filteredDataTasks,
        roles: filteredDataRoles,
        hoursByDates: filteredDataHoursByDates,
        items: filteredDataItems,
      });

      // Combine and sort data as needed
      // Combine and sort data as needed
      const combinedArray = [
        ...filteredDataServices,
        ...filteredDataTasks,
        ...filteredDataRoles,
        ...filteredDataHoursByDates,
        ...filteredDataItems,
      ].sort((a, b) => {
        if (a.SERVICE_PCR_CODE && b.SERVICE_PCR_CODE) {
          return a.SERVICE_PCR_CODE.toString().localeCompare(
            b.SERVICE_PCR_CODE.toString()
          );
        }

        return 0;
      });

      setCombinedData(combinedArray);
    }
  }, [surveyActions, applyButtonPcr]);

  useEffect(() => {
    setApplyButtonPcr(!applyButtonPcr);
  }, []);
  useEffect(() => {
    setSurveyActions(allRules);
  }, [allRules]);
  // const getAllRules = async () => {
  //   try {
  //     const ruleURI = "/api/rules/getAllRule/" + guidedIds;

  //     const response = await commonService(ruleURI, "get");

  //     if (response.status === 200) {
  //       setSurveyActions(response.data.data);
  //     }
  //   } catch (err) {
  //     // console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getAllRules();
  // }, [updateNetPrice]);

  // ***************************************************************************************************

  const [combinedData, setCombinedData] = useState([]);
  const [expandedServices, setExpandedServices] = useState([]);

  // Function to toggle the expanded state for a specific TASK row
  const toggleServiceExpansion = (serviceIndex) => {
    setExpandedServices((prevExpandedServices) =>
      prevExpandedServices.includes(serviceIndex)
        ? prevExpandedServices.filter((index) => index !== serviceIndex)
        : [...prevExpandedServices, serviceIndex]
    );
  };

  const [expandedTasks1, setExpandedTasks1] = useState([]);

  // Function to toggle the expanded state for a specific TASK row
  const toggleTaskExpansion1 = (taskIndex) => {
    setExpandedTasks1((prevExpandedTasks) =>
      prevExpandedTasks.includes(taskIndex)
        ? prevExpandedTasks.filter((index) => index !== taskIndex)
        : [...prevExpandedTasks, taskIndex]
    );
  };
  const [expandedRoles1, setExpandedRoles1] = useState([]);

  // Function to toggle the expanded state for a specific TASK row
  const toggleRolesExpansion = (serviceIndex) => {
    setExpandedRoles1((prevExpandedRoles) =>
      prevExpandedRoles.includes(serviceIndex)
        ? prevExpandedRoles.filter((index) => index !== serviceIndex)
        : [...prevExpandedRoles, serviceIndex]
    );
  };
  const [firstRowApplied, setFirstRowApplied] = useState(false);

  const [totalNetPrice, setTotalNetPrice] = useState(0);
  let totalNetPriceForAllServices = 0;
  // Define a function to calculate the total net price for roles
  const calculateTotalNetPriceForRoles = (
    roles,
    servicePcrCode,
    hoursByDates
  ) => {
    const totalNetPrice = roles
      .filter((role) => role.SERVICE_PCR_CODE === servicePcrCode)
      .reduce((sumNetPrice, role) => {
        const quantityEntry = hoursByDates.find(
          (hourEntry) => hourEntry.ROLE_PCR_CODE === role.ROLE_PCR_CODE
        );
        const quantity = quantityEntry ? quantityEntry.QUANTITY : null;
        const NETPRICE = role.UNITPRICE * quantity;

        return sumNetPrice + NETPRICE;
      }, 0);

    return totalNetPrice.toFixed(2);
  };

  // Iterate through services
  filteredData.services.forEach((service) => {
    const netPriceForService = calculateTotalNetPriceForRoles(
      filteredData.roles,
      service.SERVICE_PCR_CODE,
      filteredData.hoursByDates,
      totalNetPrice
    );

    totalNetPriceForAllServices += parseFloat(totalNetPrice);

    updateNetPrice(totalNetPriceForAllServices);
  });

  const [totalListPrice, setTotalListPrice] = useState(0);
  let totalListPriceForAllServices = 0;
  // Define a function to calculate the total net price for roles
  const calculateTotalListPriceForRoles = (
    roles,
    servicePcrCode,
    hoursByDates
  ) => {
    const totalListPrice = filteredData.roles
      .filter((role) => role.SERVICE_PCR_CODE === servicePcrCode)
      .reduce((sumListPrice, role) => {
        const quantityEntry = hoursByDates.find(
          (hourEntry) => hourEntry.ROLE_PCR_CODE === role.ROLE_PCR_CODE
        );
        const quantity = quantityEntry ? quantityEntry.QUANTITY : null;
        const ListPrice = role.UNITLISTPRICE * quantity;

        return sumListPrice + ListPrice;
      }, 0);

    return totalListPrice.toFixed(2);
  };

  filteredData.services.forEach((service) => {
    const ListPriceForService = calculateTotalListPriceForRoles(
      filteredData.roles,
      service.SERVICE_PCR_CODE,
      filteredData.hoursByDates
    );

    totalListPriceForAllServices += parseFloat(totalListPrice);
    updateListPrice(totalListPriceForAllServices);
  });

  const [totalCost, setTotalCost] = useState(0);

  let totalCostForAllServices = 0;
  // Define a function to calculate the total net price for roles
  const calculateTotalCostForRoles = (roles, servicePcrCode, hoursByDates) => {
    const totalCost = filteredData.roles
      .filter((role) => role.SERVICE_PCR_CODE === servicePcrCode)
      .reduce((sumCost, role) => {
        const quantityEntry = hoursByDates.find(
          (hourEntry) => hourEntry.ROLE_PCR_CODE === role.ROLE_PCR_CODE
        );
        const quantity = quantityEntry ? quantityEntry.QUANTITY : null;
        const Cost = role.UNITCOST * quantity;

        return sumCost + Cost;
      }, 0);
    return totalCost.toFixed(2);
  };

  // Iterate through services
  filteredData.services.forEach((service) => {
    const costForService = calculateTotalCostForRoles(
      filteredData.roles,
      service.SERVICE_PCR_CODE,
      filteredData.hoursByDates
    );

    totalCostForAllServices += parseFloat(totalCost);
    updateCost(totalCostForAllServices);
  });

  // Define a function to calculate the total net price for roles

  const calculateTotalDiscountForRoles = (
    roles,
    servicePcrCode,
    hoursByDates
  ) => {
    // Calculate total list price
    const totalListPrice = calculateTotalListPriceForRoles(
      roles,
      servicePcrCode,
      hoursByDates
    );

    // Calculate total net price
    const totalNetPrice = calculateTotalNetPriceForRoles(
      roles,
      servicePcrCode,
      hoursByDates
    );

    // Calculate total discount
    const totalDiscount = roles
      .filter((role) => role.SERVICE_PCR_CODE === servicePcrCode)
      .reduce((role) => {
        const quantityEntry = hoursByDates.find(
          (hourEntry) => hourEntry.ROLE_PCR_CODE === role.ROLE_PCR_CODE
        );
        const quantity = quantityEntry ? quantityEntry.QUANTITY : null;
        const LISTPRICE = role.UNITLISTPRICE * quantity;
        const NETPRICE = role.UNITPRICE * quantity;
        const DISCOUNT =
          ((totalListPrice - totalNetPrice) / totalListPrice) * 100;

        return DISCOUNT;
      }, 0);

    return `${totalDiscount.toFixed(2)}%`;
  };
  // Iterate through services to calculate total net and list prices
  filteredData.services.forEach((service) => {
    const netPriceForService = calculateTotalNetPriceForRoles(
      filteredData.roles,
      service.SERVICE_PCR_CODE,
      filteredData.hoursByDates
    );

    const ListPriceForService = calculateTotalListPriceForRoles(
      filteredData.roles,
      service.SERVICE_PCR_CODE,
      filteredData.hoursByDates
    );

    totalNetPriceForAllServices += parseFloat(netPriceForService);
    totalListPriceForAllServices += parseFloat(ListPriceForService);
  });

  updateNetPrice(totalNetPriceForAllServices);
  updateListPrice(totalListPriceForAllServices);

  // Calculate total discount for all services
  const totalDiscountForAllServices =
    ((totalListPriceForAllServices - totalNetPriceForAllServices) /
      totalListPriceForAllServices) *
    100;
  updateDiscount(totalDiscountForAllServices);

  // Define a function to calculate the total net price for roles
  const calculateTotalMarginForRoles = (
    roles,
    servicePcrCode,
    hoursByDates
  ) => {
    const totalNetPrice = calculateTotalNetPriceForRoles(
      roles,
      servicePcrCode,
      hoursByDates
    );
    const totalCost = calculateTotalCostForRoles(
      roles,
      servicePcrCode,
      hoursByDates
    );

    const totalMargin = filteredData.roles
      .filter((role) => role.SERVICE_PCR_CODE === servicePcrCode)
      .reduce((role) => {
        const quantityEntry = hoursByDates.find(
          (hourEntry) => hourEntry.ROLE_PCR_CODE === role.ROLE_PCR_CODE
        );
        const quantity = quantityEntry ? quantityEntry.QUANTITY : null;
        const MARGIN = ((totalNetPrice - totalCost) / totalNetPrice) * 100;

        return MARGIN;
      }, 0);
    return `${totalMargin.toFixed(2)}%`;
  };

  filteredData.services.forEach((service) => {
    const totalCostForServices = calculateTotalCostForRoles(
      filteredData.roles,
      service.SERVICE_PCR_CODE,
      filteredData.hoursByDates
    );
    totalCostForAllServices += parseFloat(totalCostForServices);
  });
  updateCost(totalCostForAllServices);

  const totalMarginForAllServices =
    ((totalNetPriceForAllServices - totalCostForAllServices) /
      totalNetPriceForAllServices) *
    100;
  updateMargin(totalMarginForAllServices);

  const calculateTotalQuantityForRoles = (
    roles,
    servicePcrCode,
    hoursByDates
  ) => {
    const totalQuantity = filteredData.roles
      .filter((role) => role.SERVICE_PCR_CODE === servicePcrCode)
      .reduce((sumQuantity, role) => {
        const quantityEntry = hoursByDates.find(
          (hourEntry) => hourEntry.ROLE_PCR_CODE === role.ROLE_PCR_CODE
        );
        const quantity = quantityEntry ? quantityEntry.QUANTITY : null;
        const QUANTITY = parseInt(quantity, 10) || 0;

        return sumQuantity + QUANTITY;
      }, 0);

    return totalQuantity.toFixed(2);
  };

  // Define a function to calculate the total net price for roles
  const calculateTotalUOMForRoles = (roles, servicePcrCode) => {
    const totalUOM = filteredData.roles
      .filter((role) => role.SERVICE_PCR_CODE === servicePcrCode)
      .reduce((sumUom, role) => {
        const UOM = role.UOM;
        return UOM;
      }, 0);
    return totalUOM;
  };

  // Define a function to calculate the total net price for roles
  const calculateTotalUnitCostForRoles = (
    roles,
    servicePcrCode,
    hoursByDates
  ) => {
    const totalUnitCost = filteredData.roles
      .filter((role) => role.SERVICE_PCR_CODE === servicePcrCode)
      .reduce((sumUnitCost, role) => {
        const quantityEntry = hoursByDates.find(
          (hourEntry) => hourEntry.ROLE_PCR_CODE === role.ROLE_PCR_CODE
        );
        const UNITCOST = parseInt(role.UNITCOST, 10) || 0;

        return sumUnitCost + UNITCOST;
      }, 0);

    return totalUnitCost.toFixed(2);
  };

  // Define a function to calculate the total net price for roles
  const calculateTotalUnitPriceForRoles = (
    roles,
    servicePcrCode,
    hoursByDates
  ) => {
    const totalUnitPrice = filteredData.roles
      .filter((role) => role.SERVICE_PCR_CODE === servicePcrCode)
      .reduce((sumUnitPrice, role) => {
        const quantityEntry = hoursByDates.find(
          (hourEntry) => hourEntry.ROLE_PCR_CODE === role.ROLE_PCR_CODE
        );
        const UNITPRICE = parseInt(role.UNITPRICE, 10) || 0;

        return sumUnitPrice + UNITPRICE;
      }, 0);

    return totalUnitPrice.toFixed(2);
  };
  const calculateTotalUnitListPriceForRoles = (
    roles,
    servicePcrCode,
    hoursByDates
  ) => {
    const totalUnitListPrice = filteredData.roles
      .filter((role) => role.SERVICE_PCR_CODE === servicePcrCode)
      .reduce((sumUnitListPrice, role) => {
        const quantityEntry = hoursByDates.find(
          (hourEntry) => hourEntry.ROLE_PCR_CODE === role.ROLE_PCR_CODE
        );
        const UNITLISTPRICE = parseInt(role.UNITLISTPRICE, 10) || 0;
        return sumUnitListPrice + UNITLISTPRICE;
      }, 0);
    return totalUnitListPrice.toFixed(2);
  };

  const calculateBillableForRole = (role) => {
    if (role.BILLABLE === true) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <div className="table-container">
        <table ref={tableRef} className="myTable">
          <thead>
            <tr className="myTableTrPcr">
              {columns.map((column, index) => (
                <th
                  className="myTableTh"
                  key={column.field}
                  style={{
                    display: columnVisibility[column.field]
                      ? "none"
                      : "table-cell",
                  }}
                >
                  {column.field}
                  {/* <button
                    className="ascendingbutton"
                    onClick={() => handleColumnSort(column.field)}
                  ></button> */}

                  <FontAwesomeIcon
                    icon={column.icon}
                    id="upArrow"
                    className="fa-solid icon-hover"
                    style={{ display: "none" }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody id="myTable_tbody">
            {filteredData.services.map((service, serviceIndex) => (
              <React.Fragment key={serviceIndex}>
                {/* Render service row */}
                <tr
                  className={`myTableTrPcr boldRow_service ${
                    !firstRowApplied ? "first-row" : ""
                  }`}
                >
                  {columns.map((column, columnIndex) => (
                    <td
                      className="myTableTdPcr"
                      key={columnIndex}
                      style={{
                        paddingLeft: "0px",
                        display: columnVisibility[column.field]
                          ? "none"
                          : "table-cell",
                      }}
                    >
                      {columnIndex === 0 && (
                        <FontAwesomeIcon
                          onClick={() => toggleServiceExpansion(serviceIndex)}
                          icon={
                            expandedServices.includes(serviceIndex)
                              ? faAngleDown
                              : faAngleRight
                          }
                          style={{
                            margin: "0px 10px 0px 10px",
                            cursor: "pointer",
                          }}
                        />
                      )}
                      {service[column.field]}

                      {column.field === "NET PRICE"
                        ? calculateTotalNetPriceForRoles(
                            filteredData.roles,
                            service.SERVICE_PCR_CODE,
                            filteredData.hoursByDates
                          )
                        : null}

                      {column.field === "LIST PRICE"
                        ? calculateTotalListPriceForRoles(
                            filteredData.roles,
                            service.SERVICE_PCR_CODE,
                            filteredData.hoursByDates
                          )
                        : null}
                      {column.field === "DISCOUNT"
                        ? calculateTotalDiscountForRoles(
                            filteredData.roles,
                            service.SERVICE_PCR_CODE,
                            filteredData.hoursByDates
                          )
                        : null}
                      {column.field === "COST"
                        ? calculateTotalCostForRoles(
                            filteredData.roles,
                            service.SERVICE_PCR_CODE,
                            filteredData.hoursByDates
                          )
                        : null}
                      {column.field === "QUANTITY"
                        ? calculateTotalQuantityForRoles(
                            filteredData.roles,
                            service.SERVICE_PCR_CODE,
                            filteredData.hoursByDates
                          )
                        : null}
                      {/* {column.field === "UOM"
                        ? calculateTotalUOMForRoles(
                            filteredData.roles,
                            service.SERVICE_PCR_CODE,
                            filteredData.hoursByDates
                          )
                        : null} */}
                      {/* {column.field === "UNIT COST"
                        ? calculateTotalUnitCostForRoles(
                            filteredData.roles,
                            service.SERVICE_PCR_CODE,
                            filteredData.hoursByDates
                          )
                        : null} */}
                      {column.field === "MARGIN"
                        ? calculateTotalMarginForRoles(
                            filteredData.roles,
                            service.SERVICE_PCR_CODE,
                            filteredData.hoursByDates
                          )
                        : null}
                      {/* {column.field === "UNIT PRICE"
                        ? calculateTotalUnitPriceForRoles(
                            filteredData.roles,
                            service.SERVICE_PCR_CODE,
                            filteredData.hoursByDates
                          )
                        : null} */}
                      {/* {column.field === "UNIT LIST PRICE"
                        ? calculateTotalUnitListPriceForRoles(
                            filteredData.roles,
                            service.SERVICE_PCR_CODE,
                            filteredData.hoursByDates
                          )
                        : null} */}
                    </td>
                  ))}
                </tr>
                {/* Render row for "> .Tasks" */}
                {filteredData.tasks.some(
                  (task) => task.SERVICE_PCR_CODE === service.SERVICE_PCR_CODE
                ) && (
                  <tr
                    className={`myTableTrPcr boldRow_tasks ${
                      !firstRowApplied ? "first-row" : ""
                    }`}
                    style={{
                      display: expandedServices.includes(serviceIndex)
                        ? "table-row"
                        : "none",
                    }}
                  >
                    {columns.map((column, columnIndex) => (
                      <td
                        className={`myTableTd ${
                          column.field === "NAME" && "newTasksCell"
                        } `}
                        key={columnIndex}
                        style={{
                          // paddingLeft: "80px",
                          display:
                            expandedServices.includes(serviceIndex) &&
                            (column.field === "NAME" || columnIndex === 0),
                          // ?"table-cell":"none"
                        }}
                      >
                        {columnIndex === 0 && (
                          // filteredData.tasks.some(
                          //   (task) =>
                          //     task.SERVICE_PCR_CODE === service.SERVICE_PCR_CODE
                          // ) && (
                          <FontAwesomeIcon
                            onClick={() => toggleTaskExpansion1(serviceIndex)}
                            icon={
                              expandedTasks1.includes(serviceIndex)
                                ? faAngleDown
                                : faAngleRight
                            }
                            style={{ marginRight: "10px", cursor: "pointer" }}
                          />
                        )}
                        {column.field === "NAME" &&
                        filteredData.tasks.some(
                          (task) =>
                            task.SERVICE_PCR_CODE === service.SERVICE_PCR_CODE
                        )
                          ? "Tasks"
                          : null}

                        {column.field === "NET PRICE"
                          ? calculateTotalNetPriceForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null}
                        {column.field === "LIST PRICE"
                          ? calculateTotalListPriceForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null}
                        {column.field === "COST"
                          ? calculateTotalCostForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null}
                        {column.field === "QUANTITY"
                          ? calculateTotalQuantityForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null}
                        {/* {column.field === "UOM"
                          ? calculateTotalUOMForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null} */}
                        {/* {column.field === "UNIT COST"
                          ? calculateTotalUnitCostForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null} */}
                        {column.field === "MARGIN"
                          ? calculateTotalMarginForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null}
                        {/* {column.field === "UNIT PRICE"
                          ? calculateTotalUnitPriceForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null} */}
                        {/* {column.field === "UNIT LIST PRICE"
                          ? calculateTotalUnitListPriceForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null} */}
                        {column.field === "DISCOUNT"
                          ? calculateTotalDiscountForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null}
                        {/* {column.field === "BILLABLE" ? (
                          <input
                            type="checkbox"
                            checked={calculateBillableForRole(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )}
                            style={{ accentColor: "#056289" }}
                          />
                        ) : null} */}
                        {/* Display "> .Tasks" in NAME field column */}
                      </td>
                    ))}
                  </tr>
                )}
                {/* Render rows for tasks under "> .Tasks" */}

                {filteredData.tasks
                  .filter(
                    (task) => task.SERVICE_PCR_CODE === service.SERVICE_PCR_CODE
                  )
                  .map((task, taskIndex) => {
                    const { ROLE_PCR_CODE, TASK_PCR_CODE } = task;
                    const quantityEntry = filteredData.hoursByDates.find(
                      (hourEntry) =>
                        // hourEntry.SERVICE_PCR_CODE === SERVICE_PCR_CODE &&
                        // hourEntry.TASK_PCR_CODE === TASK_PCR_CODE &&
                        hourEntry.ROLE_PCR_CODE === ROLE_PCR_CODE
                    );
                    const quantity = quantityEntry
                      ? quantityEntry.QUANTITY
                      : null;
                    const LISTPRICE = task.UNITLISTPRICE * quantity;
                    const NETPRICE = task.UNITPRICE * quantity;
                    const DISCOUNT = ((LISTPRICE - NETPRICE) / LISTPRICE) * 100;
                    const COST = task.UNITCOST * quantity;
                    const MARGIN = ((NETPRICE - COST) / NETPRICE) * 100;
                    const totalNetPriceForTasks =
                      calculateTotalNetPriceForRoles(
                        filteredData.roles,
                        service.SERVICE_PCR_CODE,
                        filteredData.hoursByDates
                      );
                    const totalListPriceForTasks =
                      calculateTotalListPriceForRoles(
                        filteredData.roles,
                        service.SERVICE_PCR_CODE,
                        filteredData.hoursByDates
                      );
                    const totalDiscountPriceForTasks =
                      calculateTotalDiscountForRoles(
                        filteredData.roles,
                        service.SERVICE_PCR_CODE,
                        filteredData.hoursByDates
                      );
                    const totalMarginPriceForTasks =
                      calculateTotalMarginForRoles(
                        filteredData.roles,
                        service.SERVICE_PCR_CODE,
                        filteredData.hoursByDates
                      );
                    const totalCostForTasks = calculateTotalCostForRoles(
                      filteredData.roles,
                      service.SERVICE_PCR_CODE,
                      filteredData.hoursByDates
                    );
                    const totalQuantityForTasks =
                      calculateTotalQuantityForRoles(
                        filteredData.roles,
                        service.SERVICE_PCR_CODE,
                        filteredData.hoursByDates
                      );

                    return (
                      <tr
                        key={`task_${taskIndex}`}
                        className="myTableTrPcr boldRow_tasks"
                        style={{
                          display: expandedTasks1.includes(serviceIndex)
                            ? "table-row"
                            : "none", // Initially hide tasks rows
                        }}
                      >
                        {columns.map((column, columnIndex) => (
                          <td
                            className="myTableTd"
                            key={columnIndex}
                            style={{
                              display: columnVisibility[column.field]
                                ? "none"
                                : "table-cell",
                              // paddingLeft: "80px",
                              fontFamily: "initial",
                            }}
                          >
                            {column.field === "QUANTITY" && quantity
                              ? parseFloat(quantity).toFixed(2)
                              : column.field === "UNIT COST" && task.UNITCOST
                              ? parseFloat(task.UNITCOST).toFixed(2)
                              : column.field === "UNIT PRICE" && task.UNITPRICE
                              ? parseFloat(task.UNITPRICE).toFixed(2)
                              : column.field === "UNIT LIST PRICE" &&
                                task.UNITLISTPRICE
                              ? parseFloat(task.UNITLISTPRICE).toFixed(2)
                              : column.field === "START DATE" && task.STARTDATE
                              ? task.STARTDATE
                              : column.field === "END DATE" && task.ENDDATE
                              ? task.ENDDATE
                              : column.field === "NET PRICE"
                              ? taskIndex === 0
                                ? totalNetPriceForTasks
                                : NETPRICE.toFixed(2)
                              : column.field === "LIST PRICE"
                              ? taskIndex === 0
                                ? totalListPriceForTasks
                                : LISTPRICE.toFixed(2)
                              : column.field === "MARGIN"
                              ? taskIndex === 0
                                ? totalMarginPriceForTasks
                                : `${MARGIN.toFixed(2)}%`
                              : column.field === "COST"
                              ? taskIndex === 0
                                ? totalCostForTasks
                                : COST.toFixed(2)
                              : column.field === "DISCOUNT"
                              ? taskIndex === 0
                                ? totalDiscountPriceForTasks
                                : `${DISCOUNT.toFixed(2)}%`
                              : column.field === "QUANTITY" &&
                                column.field === "QUANTITY"
                              ? totalQuantityForTasks
                              : task[column.field]}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                {/* Render row for "> .Roles" */}
                {filteredData.roles.some(
                  (role) => role.SERVICE_PCR_CODE === service.SERVICE_PCR_CODE
                ) && (
                  <tr
                    className={`myTableTrPcr boldRow_roles ${
                      !firstRowApplied ? "first-row" : ""
                    }`}
                    style={{
                      display: expandedServices.includes(serviceIndex)
                        ? "table-row"
                        : "none",
                    }}
                  >
                    {columns.map((column, columnIndex) => (
                      <td
                        className={`myTableTd ${
                          column.field === "NAME" && "labhourCell"
                        }`}
                        key={columnIndex}
                        style={{
                          // paddingLeft:"80px",
                          display:
                            expandedServices.includes(serviceIndex) &&
                            (column.field === "NAME" || columnIndex === 0),
                          // ?"table-cell":"none"
                        }}
                      >
                        {columnIndex === 0 && (
                          <FontAwesomeIcon
                            onClick={() => toggleRolesExpansion(serviceIndex)}
                            icon={
                              expandedRoles1.includes(serviceIndex)
                                ? faAngleDown
                                : faAngleRight
                            }
                            style={{ marginRight: "10px", cursor: "pointer" }}
                          />
                        )}
                        {column.field === "NAME" ? "Labour summary" : null}
                        {column.field === "NET PRICE"
                          ? calculateTotalNetPriceForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null}
                        {column.field === "LIST PRICE"
                          ? calculateTotalListPriceForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null}
                        {column.field === "COST"
                          ? calculateTotalCostForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null}
                        {column.field === "QUANTITY"
                          ? calculateTotalQuantityForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null}
                        {/* {column.field === "UOM"
                          ? calculateTotalUOMForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null} */}
                        {/* {column.field === "UNIT COST"
                          ? calculateTotalUnitCostForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null} */}
                        {column.field === "MARGIN"
                          ? calculateTotalMarginForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null}
                        {/* {column.field === "UNIT PRICE"
                          ? calculateTotalUnitPriceForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null} */}
                        {/* {column.field === "UNIT LIST PRICE"
                          ? calculateTotalUnitListPriceForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null} */}
                        {column.field === "DISCOUNT"
                          ? calculateTotalDiscountForRoles(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )
                          : null}
                        {/* {column.field === "BILLABLE" ? (
                          <input
                            type="checkbox"
                            checked={calculateBillableForRole(
                              filteredData.roles,
                              service.SERVICE_PCR_CODE,
                              filteredData.hoursByDates
                            )}
                            style={{ accentColor: "#056289" }}
                          />
                        ) : null} */}
                        {/* Display "> .Roles" in NAME field column */}
                      </td>
                    ))}
                  </tr>
                )}
                {/* Render rows for roles under "> .Roles" */}
                {filteredData.roles
                  .filter(
                    (role) => role.SERVICE_PCR_CODE === service.SERVICE_PCR_CODE
                  )
                  .map((role, roleIndex) => {
                    const { SERVICE_PCR_CODE, TASK_PCR_CODE, ROLE_PCR_CODE } =
                      role;
                    const quantityEntry = filteredData.hoursByDates.find(
                      (hourEntry) =>
                        // hourEntry.SERVICE_PCR_CODE === SERVICE_PCR_CODE &&
                        // hourEntry.TASK_PCR_CODE === TASK_PCR_CODE &&
                        hourEntry.ROLE_PCR_CODE === ROLE_PCR_CODE
                    );
                    const quantity = quantityEntry
                      ? quantityEntry.QUANTITY
                      : null;
                    const LISTPRICE = role.UNITLISTPRICE * quantity;
                    const NETPRICE = role.UNITPRICE * quantity;
                    const DISCOUNT = ((LISTPRICE - NETPRICE) / LISTPRICE) * 100;
                    const COST = role.UNITCOST * quantity;
                    const MARGIN = ((NETPRICE - COST) / NETPRICE) * 100;

                    const totalDiscountPriceForRoless =
                      calculateTotalDiscountForRoles(
                        filteredData.roles,
                        service.SERVICE_PCR_CODE,
                        filteredData.hoursByDates
                      );

                    return (
                      <tr
                        key={`role_${roleIndex}`}
                        className="myTableTrPcr boldRow_roles"
                        style={{
                          display: expandedRoles1.includes(serviceIndex)
                            ? "table-row"
                            : "none", // Initially hide roles rows
                        }}
                      >
                        {columns.map((column, columnIndex) => (
                          <td
                            className="myTableTd"
                            key={columnIndex}
                            style={{
                              display: columnVisibility[column.field]
                                ? "none"
                                : "table-cell",
                              // paddingLeft: "80px",
                              fontFamily: "initial",
                            }}
                          >
                            {column.field === "QUANTITY" && quantity ? (
                              parseFloat(quantity).toFixed(2)
                            ) : column.field === "LIST PRICE" && LISTPRICE ? (
                              LISTPRICE.toFixed(2)
                            ) : column.field === "NET PRICE" && NETPRICE ? (
                              NETPRICE.toFixed(2)
                            ) : column.field === "DISCOUNT" &&
                              column.field === "DISCOUNT" ? (
                              `${DISCOUNT.toFixed(2)}%`
                            ) : column.field === "COST" && COST ? (
                              COST.toFixed(2)
                            ) : column.field === "MARGIN" && MARGIN ? (
                              `${MARGIN.toFixed(2)}%`
                            ) : column.field === "UNIT COST" &&
                              role.UNITCOST ? (
                              parseFloat(role.UNITCOST).toFixed(2)
                            ) : column.field === "UNIT PRICE" &&
                              role.UNITPRICE ? (
                              parseFloat(role.UNITPRICE).toFixed(2)
                            ) : column.field === "UNIT LIST PRICE" &&
                              role.UNITLISTPRICE ? (
                              parseFloat(role.UNITLISTPRICE).toFixed(2)
                            ) : column.field === "START DATE" &&
                              role.STARTDATE ? (
                              role.STARTDATE
                            ) : column.field === "END DATE" && role.ENDDATE ? (
                              role.ENDDATE
                            ) : column.field === "BILLABLE" ? (
                              <input
                                type="checkbox"
                                checked={calculateBillableForRole(role)}
                                style={{ accentColor: "#056289" }}
                              />
                            ) : (
                              role[column.field]
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}

                {/* render rows for items in expense  */}
                {filteredData.items.some(
                  (item) => item.SERVICE_PCR_CODE === service.SERVICE_PCR_CODE
                ) && (
                  <tr
                    className={`myTableTrPcr boldRow_items ${
                      !firstRowApplied ? "first-row" : ""
                    }`}
                    style={{
                      display: expandedServices.includes(serviceIndex)
                        ? "table-row"
                        : "none",
                    }}
                  >
                    {columns.map((column, columnIndex) => (
                      <td
                        className={`myTableTd ${
                          column.field === "NAME" && "labhourCell"
                        }`}
                        key={columnIndex}
                        style={{
                          // paddingLeft:"80px",
                          display:
                            expandedServices.includes(serviceIndex) &&
                            (column.field === "NAME" || columnIndex === 0),
                          // ?"table-cell":"none"
                        }}
                      >
                        {columnIndex === 0 && (
                          <FontAwesomeIcon
                            onClick={() => toggleRolesExpansion(serviceIndex)}
                            icon={
                              expandedRoles1.includes(serviceIndex)
                                ? faAngleDown
                                : faAngleRight
                            }
                            style={{ marginRight: "10px", cursor: "pointer" }}
                          />
                        )}
                        {column.field === "NAME" ? "Expenses" : null}

                        {/* Display "> .Roles" in NAME field column */}
                      </td>
                    ))}
                  </tr>
                )}
                {filteredData.items
                  .filter(
                    (item) => item.SERVICE_PCR_CODE === service.SERVICE_PCR_CODE
                  )
                  .map((item, itemIndex) => {
                    // const {  ITEM_PCR_CODE } =
                    //   item;

                    // const quantity = quantityEntry
                    //   ? quantityEntry.QUANTITY
                    //   : null;
                    // const LISTPRICE = role.UNITLISTPRICE * quantity;
                    // const NETPRICE = role.UNITPRICE * quantity;
                    // const DISCOUNT = ((LISTPRICE - NETPRICE) / LISTPRICE) * 100;
                    // const COST = role.UNITCOST * quantity;
                    // const MARGIN = ((NETPRICE - COST) / NETPRICE) * 100;

                    return (
                      <tr
                        key={`item_${itemIndex}`}
                        className="myTableTrPcr boldRow_items"
                        style={{
                          display: expandedRoles1.includes(serviceIndex)
                            ? "table-row"
                            : "none", // Initially hide roles rows
                        }}
                      >
                        {columns.map((column, columnIndex) => (
                          <td
                            className="myTableTd"
                            key={columnIndex}
                            style={{
                              display: columnVisibility[column.field]
                                ? "none"
                                : "table-cell",
                              // paddingLeft: "80px",
                              fontFamily: "initial",
                            }}
                          >
                            {column.field === "UNIT PRICE" && item.UNITPRICE
                              ? parseFloat(item.UNITPRICE).toFixed(2)
                              : column.field === "UNIT LIST PRICE" &&
                                item.UNITLISTPRICE
                              ? parseFloat(item.UNITLISTPRICE).toFixed(2)
                              : column.field === "UOM" && item.UOM
                              ? item.UOM
                              : column.field === "START DATE" && item.STARTDATE
                              ? item.STARTDATE
                              : column.field === "END DATE" && item.ENDDATE
                              ? item.ENDDATE
                              : item[column.field]}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GuidedSellingGrid;
