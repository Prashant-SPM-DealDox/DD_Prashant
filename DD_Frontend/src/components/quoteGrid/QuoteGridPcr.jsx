import React, { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faLessThan,
  faGreaterThan,
  faArrowUp,
  faArrowDown,
  faAlignJustify,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/pcrGrid/PcrGrid.css";
import { baseUrl } from "../../config";
import PcrGridDownload from "../../components/quoteGrid/PcrGridDownload";
import { Link } from "react-router-dom";
import { encryptData } from "../../utils/common";

const QuoteGrid = ({ permission }) => {
  const { user } = useAuthContext();

  const tableRef = useRef(null);
  const MIN_COLUMN_WIDTH = 250;
  let draggedColumnIndex = null;
  // const [initialData, setInitialData] = useState([]);

  // const [data, setData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [columnVisibility, setColumnVisibility] = useState({});

  const [dbAccountData, setDbAccountData] = useState([]);

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
  //=====================================

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
      field: "ACCOUNT",
      pinned: null,
      width: 100,
      icon: faBars,
      originalIndex: 0,
      showFilter: true,
    },
    {
      field: "ACCOUNT_OWNER",
      pinned: null,
      icon: faBars,
      originalIndex: 1,
      showFilter: true,
    },
    {
      field: "OPPORTUNITY",
      pinned: null,
      icon: faBars,
      originalIndex: 2,
      showFilter: true,
    },
    {
      field: "OPPORTUNITY_CREATED_DATE",
      pinned: null,
      icon: faBars,
      originalIndex: 3,
      showNumericalFilter: true,
    },
    {
      field: "OPPORTUNITY_LAST_MODIFIED",
      pinned: null,
      icon: faBars,
      originalIndex: 4,
      showNumericalFilter: true,
    },
    {
      field: "STAGE",
      pinned: null,
      icon: faBars,
      originalIndex: 5,
      showFilter: true,
    },
    {
      field: "QUOTE_NAME",
      pinned: null,
      icon: faBars,
      originalIndex: 6,
      showNumericalFilter: true,
    },
  ]);

  // reset columns

  // backend start

  const handleColumnSort = (field) => {
    setFilteredData((prevData) => {
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
        return filteredData;
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }
  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
    pageSize: 1,
    total: "",
    totalPages: "",
  });

  // Helper function to check if a cell value matches a filter condition
  useEffect(() => {
    const getQuoteGridData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/quoteGrid/getgriddata?page=${paginationDetails.page}&pageSize=${paginationDetails.pageSize}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const quotegridd = await response.json();

          // Create and display Quantity objects based on the length of account.data
          const updatedinitialData = quotegridd.data.flatMap(
            (QuoteGridData) => {
              if (QuoteGridData.Opportunities.length > 0) {
                return QuoteGridData.Opportunities.flatMap((opportunity) => {
                  if (opportunity.Quotes && opportunity.Quotes.length > 0) {
                    return opportunity.Quotes.map((quote) => {
                      // Rest of the code...

                      return {
                        ACCOUNT_ID: QuoteGridData._id,
                        ACCOUNT: QuoteGridData.accounts,
                        ACCOUNT_OWNER: `${QuoteGridData.owner.split(" ")[0]} ${
                          QuoteGridData.owner.split(" ")[1]
                        }`,
                        OPPORTUNITY_ID: opportunity._id,
                        OPPORTUNITY: opportunity.opportunity_name,
                        OPPORTUNITY_CREATED_DATE: formatDate(opportunity.start),
                        OPPORTUNITY_LAST_MODIFIED: formatDate(
                          opportunity.close
                        ),
                        STAGE: opportunity.stage,
                        QUOTE_ID: quote._id,
                        QUOTE_NAME: quote.quotes_name,
                        TEMPLATE_TYPE: quote.template_type,

                        // Add other quote properties as needed
                      };
                    });
                  } else {
                    // If there are no quotes
                    return {
                      ACCOUNT_ID: QuoteGridData._id,
                      ACCOUNT: QuoteGridData.accounts,
                      ACCOUNT_OWNER: `${QuoteGridData.owner.split(" ")[0]} ${
                        QuoteGridData.owner.split(" ")[1]
                      }`,
                      OPPORTUNITY_ID: opportunity._id,
                      OPPORTUNITY: opportunity.opportunity_name,
                      OPPORTUNITY_CREATED_DATE: formatDate(opportunity.start),
                      OPPORTUNITY_LAST_MODIFIED: formatDate(opportunity.close),
                      STAGE: opportunity.stage,
                      QUOTE_ID: " N/A",
                      QUOTE_NAME: " N/A ",
                      TEMPLATE_TYPE: " N/A ",

                      // Add other quote properties as needed
                    };
                  }
                });
              } else {
                // If there are no opportunities
                return {
                  ACCOUNT_ID: QuoteGridData._id,
                  ACCOUNT: QuoteGridData.accounts,
                  ACCOUNT_OWNER: `${QuoteGridData.owner.split(" ")[0]} ${
                    QuoteGridData.owner.split(" ")[1]
                  }`,
                  OPPORTUNITY_ID: "N/A",
                  OPPORTUNITY: "N/A",
                  OPPORTUNITY_CREATED_DATE: "N/A ",
                  OPPORTUNITY_LAST_MODIFIED: "N/A ",
                  STAGE: "N/A",
                  QUOTE_ID: "N/A ",
                  QUOTE_NAME: "N/A ",
                  TEMPLATE_TYPE: "N/A",
                  // Add other quote properties as needed
                };
              }
            }
          );

          setDbAccountData(quotegridd.data);
          setFilteredData(updatedinitialData);
          setPaginationDetails(quotegridd.pagination);
        } else {
          // console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getQuoteGridData(paginationDetails?.page);
  }, [user, paginationDetails?.page]);
  const handlePrevious = () => {
    if (paginationDetails.page > 1) {
      setPaginationDetails((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNext = () => {
    setPaginationDetails((prev) => {
      if (prev.page < prev.totalPages) {
        return { ...prev, page: prev.page + 1 };
      }
      return prev;
    });
  };

  const acc_opp_id = filteredData.map((row) => {
    return {
      acc_key: row.ACCOUNT_ID,
      acc_name: row.ACCOUNT,
      opp_id: row.OPPORTUNITY_ID,
      oppName: row.OPPORTUNITY,
      quoteID: row.QUOTE_ID,
      quotesName: row.QUOTE_NAME,
      template: row.TEMPLATE_TYPE,
    };
  });
  const handleClick = (id) => {
    const encryptId = encryptData(id);
    localStorage.setItem("personId", encryptId);
  };

  return (
    <>
      <div className="PcrGridQuotedDownload">
        <PcrGridDownload data={filteredData} />
      </div>
      <div className="table-container">
        <table ref={tableRef} className="myTable">
          <thead>
            <tr className="myTableTr">
              {columns.map((column, index) => (
                <th
                  className="myTableThQuote"
                  key={column.field}
                  style={{
                    display: columnVisibility[column.field]
                      ? "none"
                      : "table-cell",
                  }}
                >
                  {column.field}
                  <button
                    className="ascendingbutton"
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
                    style={{ display: "block" }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody id="myTable_tbody">
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex} className="myTableTr">
                {columns.map((column, columnIndex) => {
                  if (column.field === "ACCOUNT") {
                    // Link for ACCOUNT field
                    return (
                      <td className="myTableTd" key={columnIndex}>
                        {permission === "readOnly" || permission === "none" ? (
                          <span>{row.ACCOUNT}</span>
                        ) : (
                          <Link
                            className="hover-link"
                            onClick={() => handleClick(row.ACCOUNT_ID)}
                            to={`/accounts?id=${row.ACCOUNT_ID}`}
                          >
                            {row.ACCOUNT}
                          </Link>
                        )}
                      </td>
                    );
                  } else if (column.field === "OPPORTUNITY") {
                    // Link for OPPORTUNITY field
                    return (
                      <td className="myTableTd" key={columnIndex}>
                        {permission === "readOnly" || permission === "none" ? (
                          <span>{row.OPPORTUNITY}</span>
                        ) : (
                          <Link
                            to={`/opportunitiesdata?oppID=${row.OPPORTUNITY_ID}`}
                            state={{
                              acc_key: row.ACCOUNT_ID,
                              acc_name: row.ACCOUNT,
                              oppName: row.OPPORTUNITY,
                            }}
                            className="hover-link"
                          >
                            {row.OPPORTUNITY}
                          </Link>
                        )}
                      </td>
                    );
                  } else if (column.field === "QUOTE_NAME") {
                    // Link for QUOTE_NAME field
                    return (
                      <td className="myTableTd" key={columnIndex}>
                        {permission === "readOnly" || permission === "none" ? (
                          <span>{row.QUOTE_NAME}</span>
                        ) : (
                          <Link
                            to={`/guidedselling_new?&quotes=${row.QUOTE_ID}&quoteName=${row.QUOTE_NAME}&template=${row.TEMPLATE_TYPE}`}
                            className="hover-link"
                            state={{
                              acc_key: row.ACCOUNT_ID,
                              acc_name: row.ACCOUNT,
                              opp_id: row.OPPORTUNITY_ID,
                              oppName: row.OPPORTUNITY,
                              quoteID: row.QUOTE_ID,
                              quotesName: row.QUOTE_NAME,
                              template: row.TEMPLATE_TYPE,
                            }}
                          >
                            {row.QUOTE_NAME}
                          </Link>
                        )}
                      </td>
                    );
                  } else {
                    // Display other fields in their respective positions
                    return (
                      <td
                        className="myTableTd"
                        key={columnIndex}
                        style={{
                          display: columnVisibility[column.field]
                            ? "none"
                            : "table-cell",
                        }}
                      >
                        {row[column.field]}
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="quotesPagination">
        <FontAwesomeIcon
          className="previousBtn"
          onClick={handlePrevious}
          icon={faLessThan}
          style={{
            opacity: paginationDetails?.page === 1 ? 0.5 : 1,
          }}
        />

        <span style={{ color: "grey", fontSize: "14px" }}>Page</span>
        <span style={{ fontWeight: "bold", fontSize: "14px" }}>
          {paginationDetails?.page}
        </span>
        <span style={{ color: "grey", fontSize: "14px" }}>of</span>
        <span style={{ fontWeight: "bold", fontSize: "14px" }}>
          {paginationDetails?.totalPages}
        </span>

        <FontAwesomeIcon
          className="nextBtn"
          onClick={handleNext}
          icon={faGreaterThan}
          style={{
            opacity:
              paginationDetails?.page === paginationDetails?.totalPages ? 0.5 : 1,
          }}
        />
      </div>
    </>
  );
};
export default QuoteGrid;
