import React, { useEffect, useState, useMemo, useRef } from "react";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import SidePanel from "../../components/common/SidePanel";
import { GoPencil } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import {
  faAngleLeft,
  faCog,
  faPen,
  faScroll,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";

import {
  commonService,
  showErrorMessage,
  showSuccessMessage,
  baseToastConfig,
  encryptData,
} from "../../utils/common";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import SectionSetupNew from "../survey-new/SectionSetupNew";
import RenderQuestion from "../../components/RenderQuestion/RenderQuestion";
import BreadCrumbs from "../../components/BreadCrumbs";
import GSspreadSheet from "../../components/calcEngine/GSspreadsheet";
import "../../assets/css/guidedselling/GuidedSellingNew.css";
import HeaderBar from "../../components/common/HeaderBar";
import TemplateGuided from "../../components/templateComps/TemplateGuided";
import GuidedListing from "../../components/templateComps/GuidedListing";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";
import GuidedSellingGrid from "../../components/pcrgridguidedselling/GuidedSellingGrid";
import { baseUrl } from "../../config";
import { useAuthContext } from "../../hooks/useAuthContext";
import _ from "lodash";

const GuidedSellingNew = () => {
  const { user } = useAuthContext();
  const [searchParams] = useSearchParams();
  const [guidedDetails, setGuidedDetails] = useState(null);
  const [guidedSections, setGuidedSections] = useState(null);
  const [guidedQuestion, setGuidedQuestion] = useState([]);
  const [showConfig, setShowConfig] = useState(false);
  const [showrightguide, setshowrightguide] = useState(true);
  const [errors, setErrors] = useState([]);
  const [showCalc, setShowCalc] = useState(false);
  const [netPrice, setNetPrice] = useState(0);
  const [listPrice, setListPrice] = useState(0);
  const [cost, setCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [margin, setMargin] = useState(0);
  const quoteId = searchParams.get("quotes");
  const surveyId = searchParams.get("template");
  const [answers, setAnswers] = useState([]);
  const [allRules, setAllRules] = useState([]);
  const [GuidedGrid, setGuidedGrid] = useState(true);
  const [openGuidedSellingSideBar, setGuidedSellingSIdeBar] = useState(false);
  const [applyButtonPcr, setApplyButtonPcr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [unSavedChange, setUnSavedChange] = useState(false);
  const debounceTimer = useRef(null);

  //URL DATA
  const urlParams = new URLSearchParams(window.location.search);
  const quoteID = urlParams.get("quoteId");
  const quoteName = urlParams.get("quoteName");
  const templateId = urlParams.get("template");

  const data_state = useLocation();
  const acc_opp_id = data_state.state;
  const accKey = acc_opp_id?.acc_key;
  const oppName = acc_opp_id?.oppName;
  const opp_id = acc_opp_id?.opp_id;
  const accName = acc_opp_id?.acc_name;

  const handleClick = (id) => {
    const encryotionGsId = encryptData(id);
    localStorage.setItem("personId", encryotionGsId);
  };

  const quotesName = guidedDetails?.quotes_name || quoteName || "";

  const { securityRoleData } = useContext(DataContext);

  const configButton =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].quote_approval
      : "";

  const isReadOnly = configButton === "none" || configButton === "readOnly";

  const debounce = (func, delay) => {
    return function (...args) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const openingGuidedSellingSideBar = () => {
    setGuidedSellingSIdeBar(true);
  };

  const closeGuidedSellingSideBar = () => {
    setGuidedSellingSIdeBar(false);
  };

  const toggleConfig = () => {
    setShowConfig(!showConfig);
    setshowrightguide(false);
  };

  const validateGuidedSelling = () => {
    const checkInvalidObjects = guidedQuestion.filter(
      (x) =>
        x.isRequired &&
        ((typeof x.answer === "object" && Object.keys(x.answer).length === 0) ||
          !x.answer)
    );
    setErrors(checkInvalidObjects);
    return checkInvalidObjects.length > 0 ? false : true;
  };

  const deleteSectionOrQuestion = async (type, id) => {
    try {
      const response = await commonService(
        "/api/guidedselling/deleteGuidedSellingSectionOrQuestion",
        "delete",
        {
          type,
          id,
        }
      );

      if (response.status === 200) {
        showSuccessMessage(response.data.message);
        getQuoteSurvey();
      } else {
        showErrorMessage(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getQuoteSurvey = async () => {
    try {
      const quoteId = searchParams.get("quotes") || quoteID || quoteId;
      const tempId = searchParams.get("template") || templateId;

      const response = await commonService(
        `/api/guidedselling/getGuidedSectionsQuestions`,
        "post",
        {
          guidedId: quoteId,
          templateId: tempId,
        }
      );
      if (response.status === 200) {
        if (response.data.data) {
          setGuidedDetails(response.data.data.quoteDetail);
          getAllRules(response.data.data.quoteDetail._id);
          setGuidedSections(
            response.data.data.surveySections.map(
              ({ guidedId, ...section }) => ({
                ...section,
                guidedId: guidedId,
                sectionId: section._id,
              })
            )
          );
          setGuidedQuestion(
            response.data.data.surveyQuestions.map(
              ({ guidedId, ...question }) => ({
                ...question,
                guidedId,
              })
            )
          );
        } else {
          showErrorMessage(response.data.message);
        }
        //   setGuidedSurvey(response.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllRules = async (id) => {
    try {
      const response = await commonService(
        "/api/rules/getAllRule/" + id,
        "get"
      );
      if (response.status === 200) {
        setAllRules(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDoctypedata();
    getQuoteSurvey();
  }, [user]);

  useEffect(() => {
    if (guidedQuestion.length > 0) {
      validateGuidedSelling();
    }
  }, [guidedQuestion]);

  const sidebarScrollStyle = showConfig
    ? {}
    : {
        scrollBehavior: "smooth",
        scrollbarWidth: "thin",
      };

  const sidebarMainStyle = showConfig
    ? { border: "none" }
    : { border: "1px solid #ccc" };

  const handleCalcButtonClick = () => {
    if (showCalc) {
      setShowCalc(false);
    } else {
      setShowCalc(true);
      getQuoteSurvey();
      spreadsheetRef.current.addCalcData();
    }
  };
  const [guidedSellingListingVisible, setGuidedSellingListingVisible] =
    useState(false);
  const [headerBar, setHeaderBar] = useState(true);
  const [isWideLayout, setIsWideLayout] = useState(true);
  const [btnGuided, setbtnGuided] = useState(true);
  const [guidedSellingGridVisible, setGuidedSellingGridVisible] =
    useState(true);
  const handleScrollIconVisible = () => {
    setGuidedSellingListingVisible(true);
    setGuidedSellingGridVisible(false);
    setHeaderBar(false);
    setbtnGuided(false);
    setGuidedGrid(false);
  };

  const handlePenIconVisible = () => {
    setGuidedSellingListingVisible(false);
    setGuidedSellingGridVisible(true);
    setHeaderBar(true);
    setbtnGuided(true);
    setGuidedGrid(true);
  };
  const handleguidedSellingSideBarClick = () => {
    setGuidedSellingGridVisible(!guidedSellingGridVisible);
    setIsWideLayout(!isWideLayout);
  };

  //-----------------

  const handleAnswerClick = () => {
    setShowConfig(false);
    setShowCalc(false);
    window.location.reload();
  };

  const spreadsheetRef = React.useRef(null);

  const handleSaveCalcClick = () => {
    if (spreadsheetRef.current) {
      spreadsheetRef.current.addCalcData(null, true);
    }
  };

  const updateNetPrice = (newNetPrice) => {
    setNetPrice(newNetPrice);
  };
  const updateListPrice = (newListPrice) => {
    setListPrice(newListPrice);
  };
  const updateCost = (newCost) => {
    setCost(newCost);
  };
  const updateDiscount = (newDiscount) => {
    setDiscount(newDiscount);
  };
  const updateMargin = (newMargin) => {
    setMargin(newMargin);
  };
  const handleSpreadSheetBack = () => {
    setShowConfig(true);
    setShowCalc(false);
  };

  const updateAnswers = async (answerss) => {
    try {
      const response = await commonService(
        "/api/guidedselling/updateAnswers",
        "post",
        [answerss]
      );

      if (response.status === 200) {
        showSuccessMessage(response.data.message);
        // if (spreadsheetRef.current) {
        //   spreadsheetRef.current.addCalcData();
        //   // spreadsheetRef.current.getCalcData();
        // }
        let tempQuestions = [...guidedQuestion];
        const checkIndex = tempQuestions.findIndex(
          (x) => x._id === answerss.questionId
        );
        if (checkIndex > -1) {
          tempQuestions[checkIndex].answer = answerss.value;
          setGuidedQuestion(tempQuestions);
        }
      } else {
        showErrorMessage(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const debouncedAPICall = debounce(updateAnswers, 300);

  const handleAnswerChange = (answerObj) => {
    validateGuidedSelling();
    debouncedAPICall(answerObj);
  };

  // for template merge
  const [selectedOptionsContentdoctype, setSelectedOptionsContentdoctype] =
    useState([]);

  const extractedActions = useMemo(
    () =>
      allRules.flatMap((obj) =>
        obj.actions
          .filter((actionObj) => actionObj.actionType === "TEMPLATE MERGE")
          .map((actionObj) => actionObj.actionValue)
      ),
    [allRules]
  ); // Add dependencies if any
  // console.log(extractedActions);
  const [doc_tempData, setDocTempData] = useState([]);
  const [doctypePublished, setDoctypePublished] = useState([]);
  const gettemplinkedDocNames = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/template/getdoc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ extractedActions }),
      });
      if (response.ok) {
        const doctypeyeArray = await response.json();
        // console.log(doctypeyeArray.data);
        // console.log(doctypeyeArray);
        if (doctypeyeArray.data && doctypeyeArray.data.length > 0) {
          const allDocTempData = doctypeyeArray.data.map(
            (item) => item.doc_tempData
          );
          // console.log(allDocTempData);
          // Flatten the array and remove duplicates based on doc_name
          const uniqueDocTempData = []
            .concat(...allDocTempData)
            .reduce((acc, current) => {
              if (!acc.find((item) => item.doc_id === current.doc_id)) {
                acc.push(current);
              }
              return acc;
            }, []);
          // console.log(uniqueDocTempData);
          setDocTempData(uniqueDocTempData);
        }
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettemplinkedDocNames();
  }, [extractedActions]);
  useEffect(() => {
    const newDoctype = doc_tempData.map((item) => item.doc_id);
    setSelectedOptionsContentdoctype(newDoctype);
  }, [doc_tempData]);

  const updateDocTempData = (newData) => {
    setDocTempData(newData);
  };

  const getDoctypedata = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/doctype/get`, {
        method: "GET",
        headers: {
          "Doctype-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const doctype = await response.json();
        // console.log(doctype, "09090900");
        // setDbDoctypeData(doctype.data);
        // console.log(doctype.data.filter((item) => item.status === "PUBLISHED"));
        setDoctypePublished(
          doctype.data.filter((item) => item.status === "PUBLISHED")
        );
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateOptionsDoctype = (data) => {
    setSelectedOptionsContentdoctype(data);
  };

  //APPLY BUTTON
  const [docClick, setDocClick] = useState(false);
  const handleButtonClick = async () => {
    setIsLoading(true);
    setApplyButtonPcr(true);
    await spreadsheetRef.current.getCalcData();
    if (spreadsheetRef.current) {
      await spreadsheetRef.current.addCalcData(onApplyClick, false);
    }
    setDocClick(true);
    setTimeout(() => {
      setDocClick(false);
    }, 1000);
  };

  // ignore space
  function normalizeValue(value) {
    if (typeof value === "string") {
      return value.replace(/\s+/g, "");
    } else {
      return value?.toString() ?? "";
    }
  }
  const onApplyClick = async (spreadSheetState) => {
    try {
      const rulesResponse = await commonService(
        "/api/rules/getAllRule/" + guidedDetails._id,
        "get"
      );
      if (rulesResponse.status === 200) {
        let allRules = rulesResponse.data.data;
        allRules.forEach((ruleEle) => {
          if (ruleEle.actions.length > 0) {
            ruleEle.actions.forEach((x) => {
              if (x.actionType === "PROCESS CALC RANGE(PCR)") {
                // Parse JSON data

                const jsonData = spreadSheetState.toJSON();
                // Get sheet names
                const sheetNames = Object.keys(jsonData.sheets);
                // Initialize an object to store cell values by sheet name
                const cellValuesBySheet = {};
                // Iterate through sheets
                sheetNames.forEach((sheetName) => {
                  // Get sheet data
                  const sheetData = jsonData.sheets[sheetName].data.dataTable;

                  if (!sheetData) {
                    console.error(
                      `Sheet data for "${sheetName}" is missing or invalid.`
                    );
                    return; // Skip processing for this sheet
                  }
                  // Extract cell values with spreadsheet-style cell references
                  const cellValues = Object.entries(sheetData).reduce(
                    (acc, [row, row_data]) => {
                      Object.entries(row_data).forEach(([col, cell_value]) => {
                        const colIndex = parseInt(col);
                        const rowIndex = parseInt(row);

                        if (!acc[colIndex]) {
                          acc[colIndex] = [];
                        }

                        acc[colIndex].push({
                          cell: `${String.fromCharCode(65 + colIndex)}${
                            rowIndex + 1
                          }`,
                          value: cell_value.value,
                        });
                      });

                      return acc;
                    },
                    []
                  );
                  // Flatten the array of arrays into a single array
                  const flattenedCellValues = cellValues.flat();
                  // Store cell values in the object
                  cellValuesBySheet[sheetName] = flattenedCellValues;
                });
                const specifiedRange = x.actionValue.pcrCalcCell;
                // Get selected sheet name from the calcTab state
                const selectedSheetName = x.actionValue.pcrCalcTab;

                const selectedCalcTemplate = x.actionValue.calcTabTemplate;
                // Log cell values from the specified range in the selected sheet
                if (selectedSheetName && specifiedRange) {
                  const sheetValues = cellValuesBySheet[selectedSheetName];
                  if (sheetValues) {
                    const [startCell, endCell] = specifiedRange.split(":");
                    const startCol = startCell.charCodeAt(0) - 65;
                    const startRow = parseInt(startCell.slice(1)) - 1;
                    const endCol = endCell.charCodeAt(0) - 65;
                    const endRow = parseInt(endCell.slice(1)) - 1;
                    const specifiedRangeValues = sheetValues.filter((cell) => {
                      const colNum = cell.cell.charCodeAt(0) - 65;
                      const rowNum = parseInt(cell.cell.slice(1)) - 1;
                      return (
                        colNum >= startCol &&
                        colNum <= endCol &&
                        rowNum >= startRow &&
                        rowNum <= endRow
                      );
                    });
                    // console.log("ruleAction_a", specifiedRangeValues);
                    x.actionValue = {
                      ...x.actionValue,
                      cell_data: specifiedRangeValues.map(
                        ({ cell, value }) => ({
                          celldata: cell,
                          valuedata: value,
                        })
                      ),
                    };
                    // const delay = 3000;
                    // setTimeout(() => {
                    //   window.location.reload();
                    // }, delay);
                    if (selectedCalcTemplate === "01.SERVICES") {
                      const requiredValues = ["servicePcrCode", "display"];
                      const missingValues = requiredValues.filter(
                        (requiredValue) =>
                          !specifiedRangeValues.some(
                            (cell) =>
                              normalizeValue(cell.value) ===
                              normalizeValue(requiredValue)
                          )
                      );

                      if (missingValues.length > 0) {
                        baseToastConfig(
                          `IN ACTION ${x.actionIndex} ${
                            x.actionType
                          } of [ ${specifiedRange} ] does not have ${missingValues.join(
                            " and "
                          )}`
                        );
                      }
                    }

                    if (selectedCalcTemplate === "02.TASKS") {
                      const requiredValues = [
                        "servicePcrCode",
                        "taskPcrCode",
                        "display",
                      ];
                      const missingValues = requiredValues.filter(
                        (requiredValue) =>
                          !specifiedRangeValues.some(
                            (cell) =>
                              normalizeValue(cell.value) ===
                              normalizeValue(requiredValue)
                          )
                      );

                      if (missingValues.length > 0) {
                        baseToastConfig(
                          `IN ACTION ${x.actionIndex} ${
                            x.actionType
                          } of [ ${specifiedRange} ] does not have ${missingValues.join(
                            " and "
                          )}`
                        );
                      }
                    }
                    if (selectedCalcTemplate === "03.ROLES") {
                      const requiredValues = [
                        "servicePcrCode",
                        "rolePcrCode",
                        "display",
                        "uom",
                        "unitRate",
                        "unitStandardRate",
                        "unitCost",
                        "startDate",
                        "endDate",
                        "isBillable",
                      ];
                      const missingValues = requiredValues.filter(
                        (requiredValue) =>
                          !specifiedRangeValues.some(
                            (cell) =>
                              normalizeValue(cell.value) ===
                              normalizeValue(requiredValue)
                          )
                      );

                      if (missingValues.length > 0) {
                        baseToastConfig(
                          `IN ACTION ${x.actionIndex}  ${
                            x.actionType
                          } of [ ${specifiedRange} ] does not have ${missingValues.join(
                            " and "
                          )}`
                        );
                      }
                    }
                    if (selectedCalcTemplate === "04.HOURS BY DATES") {
                      const requiredValues = [
                        "servicePcrCode",
                        "taskPcrCode",
                        "rolePcrCode",
                        "units",
                      ];
                      const missingValues = requiredValues.filter(
                        (requiredValue) =>
                          !specifiedRangeValues.some(
                            (cell) =>
                              normalizeValue(cell.value) ===
                              normalizeValue(requiredValue)
                          )
                      );

                      if (missingValues.length > 0) {
                        baseToastConfig(
                          `IN ACTION ${x.actionIndex}  ${
                            x.actionType
                          } of [ ${specifiedRange} ] does not have ${missingValues.join(
                            " and "
                          )}`
                        );
                      }
                    }
                  } else {
                    console.warn(
                      `No data available for the selected sheet: ${selectedSheetName}`
                    );
                  }
                } else {
                  console.warn("No specified range or sheet name entered.");
                }
              }
            });
          }
        });
        const delay = 1000;
        setTimeout(() => {
          gettemplinkedDocNames();
        }, delay);

        setAllRules(allRules);
        //  console.log("ruleAction_b", allRules);
        const updateResponse = await commonService(
          "/api/rules/updateAllRules",
          "post",
          allRules
        );
        // if (updateResponse.status === 200) {
        //   if (spreadsheetRef.current) {
        //     spreadsheetRef.current.addCalcData();
        //   }
        // }
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="guided-selling">
        <Navbar />

        <div className="bread">
          <ul className="breadcrumbs">
            <li className="breadcrumbs--item">
              <Link
                to="/home"
                className="breadcrumbs--link breadcrumbs"
                style={{ display: "inline", textDecoration: "none" }}
              >
                HOME
              </Link>
            </li>
            <li className="breadcrumbs--item">
              <Link
                onClick={() => handleClick(accKey)}
                to={`/accounts?id=${accKey}`}
                className="breadcrumbs--link breadcrumbs--link_mid"
              >
                {accName}
                {/* {accountName} */}
              </Link>
            </li>
            <li className="breadcrumbs--item">
              <Link
                to={`/opportunitiesdata?oppID=${opp_id}`}
                className="breadcrumbs--link breadcrumbs--link_mid"
                state={acc_opp_id}
              >
                {oppName}
              </Link>
            </li>
            <li className="breadcrumbs--item">
              <Link
                className="breadcrumbs--link breadcrumbs--link--active"
                state={acc_opp_id}
              >
                {quotesName ? quotesName : ""}
              </Link>
            </li>
            <ol
              style={{ float: "right", listStyle: "none", height: "11px" }}
              className="pen_scroll_grid_icons"
            >
              <FontAwesomeIcon
                icon={faPen}
                className="guided_selling_icons"
                style={{
                  fontSize: "15px",
                  marginRight: "10px",
                  padding: "3px",
                  cursor: "pointer",
                }}
                onClick={handlePenIconVisible}
              />
              <FontAwesomeIcon
                icon={faScroll}
                className="guided_selling_icons"
                style={{
                  fontSize: "15px",
                  marginRight: "10px",
                  padding: "3px",
                  cursor: "pointer",
                }}
                onClick={handleScrollIconVisible}
              />
            </ol>
          </ul>
          <hr className="hr" />
        </div>

        <div className="gridcontainerguide">
          <div className="sidebarguideddiv">
            <Sidebar />
          </div>
          <div
            className="sidebar2"
            style={{ width: showConfig ? "100%" : "25%" }}
          >
            {" "}
            <div
              className={
                "expandedguided" + (showConfig ? "expandedguided" : "")
              }
              style={sidebarMainStyle}
            >
              <div className="guidedselling">
                <p>GUIDED SELLING</p>
              </div>
              <div
                className="survey-sidebar--main"
                style={sidebarScrollStyle}
                id="guidedSellingSideBar"
              >
                <div className="mainuideselling">
                  {/* */}
                  <div className="guided_Calc">
                    {showCalc ? (
                      <div className="guidedselling-expanded-container">
                        <div>
                          <button className="gs-export-button">EXPORT</button>
                        </div>
                        <div className="gs-save-resume-container">
                          <button
                            className="gs-save-button"
                            onClick={handleSaveCalcClick}
                          >
                            SAVE
                          </button>
                          <button className="gs-resume-button">
                            RESUME CALCULATIONS
                          </button>
                        </div>

                        <div
                          className="gs-back-button-container"
                          onClick={handleSpreadSheetBack}
                        >
                          <FontAwesomeIcon
                            icon={faAngleLeft}
                            id="spread-back-icon"
                          />
                          <button
                            className="back-button"
                            onClick={handleSpreadSheetBack}
                          >
                            BACK
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="gs-main-header">
                        <div className="cpq_div">
                          <h4 className="names_survey">
                            {guidedDetails?.template_name || "N/A"}
                          </h4>
                          <span className="names_surveycpq">CPQ</span>
                        </div>
                        {!showConfig ? (
                          <div>
                            {isReadOnly ? null : (
                              <button
                                className="config_button"
                                onClick={toggleConfig}
                                type="button"
                              >
                                <div className="iconconfig">
                                  <IoSettingsOutline id="settingicon" />
                                </div>
                                CONFIG
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="open-config-container">
                            <button
                              className="guided-back"
                              type="button"
                              style={{ marginLeft: "5px" }}
                              onClick={handleAnswerClick}
                            >
                              <GoPencil size={20} />
                              Answer
                            </button>
                            <button
                              className="guided-table"
                              type="button"
                              onClick={handleCalcButtonClick}
                            >
                              <FontAwesomeIcon
                                style={{ fontSize: "20px" }}
                                icon={showConfig ? faTable : ""}
                                id="settingicontable"
                              />
                              Calc
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="below_div" style={{ width: "100%" }}>
                {!showCalc &&
                  (showConfig ? (
                    <SectionSetupNew
                      surveyId={guidedDetails?._id || null}
                      isGuided={true}
                      data={guidedSections}
                      questionList={guidedQuestion}
                      onSectionChange={setGuidedSections}
                      onQuestionChange={(data) => {
                        setGuidedQuestion(data);
                      }}
                      rulesJson={allRules}
                      onDeleteQuestion={getQuoteSurvey}
                      onDeleteSection={getQuoteSurvey}
                    />
                  ) : (
                    <RenderQuestion
                      sections={guidedSections}
                      questions={guidedQuestion}
                      onAnswerChange={handleAnswerChange}
                      onAnswerChangeBlur={(answerObj) => {
                        validateGuidedSelling();
                        updateAnswers(answerObj);
                      }}
                      errors={errors}
                      rulesJson={allRules}
                      showCancel={true}
                    />
                  ))}

                <div style={{ display: showCalc ? "block" : "none" }}>
                  {/* {showCalc && */}
                  <GSspreadSheet
                    style={{ width: "100%", height: "100%" }}
                    quoteIds={quoteId}
                    surveyIds={surveyId}
                    ref={spreadsheetRef}
                    sectionsData={guidedSections}
                    questionsData={guidedQuestion}
                    showCalcs={showCalc}
                  />
                  {/* } */}
                </div>
              </div>
              {/* onClick={updateAnswers} */}
              {!showConfig && (
                <div className="apply-configguided">
                  <button
                    className="GuidedApplyButton"
                    onClick={handleButtonClick}
                    disabled={isLoading} // Disable the button while loading
                  >
                    {isLoading ? "Calculating..." : "APPLY"}
                  </button>
                </div>
              )}
            </div>
          </div>
          {!showConfig && (
            <div className="right-side-container">
              <div
                className="rightguided"
                style={{
                  width: openGuidedSellingSideBar ? "55%" : "100%",
                }}
              >
                <button
                  id="openbtn"
                  onClick={openingGuidedSellingSideBar}
                  style={{
                    display: openGuidedSellingSideBar ? "none" : "block",
                  }}
                >
                  {openGuidedSellingSideBar ? (
                    <FaGreaterThan />
                  ) : (
                    <FaLessThan />
                  )}
                </button>{" "}
                <div
                  className={
                    "survey-mainGuided" + (showConfig ? "collapsed" : "")
                  }
                >
                  <div className="survey-main--headerGuided">
                    {showConfig ? (
                      "Guided Configuration"
                    ) : (
                      <>
                        {headerBar && (
                          <HeaderBar headerlabel="GUIDED SELLING " />
                        )}

                        <div id="guided-container">
                          {btnGuided && (
                            <span className="btnguided">
                              {" "}
                              <button
                                className="btnguide"
                                id="leftBtn"
                                onClick={handleguidedSellingSideBarClick}
                              >
                                {guidedSellingGridVisible ? (
                                  <FaChevronUp size={20} />
                                ) : (
                                  <FaChevronDown size={20} />
                                )}
                              </button>
                            </span>
                          )}

                          {guidedSellingGridVisible && (
                            <div>
                              <TemplateGuided
                                guidedSellingtogglebtn={true}
                                netPrice={netPrice}
                                listPrice={listPrice}
                                cost={cost}
                                discount={
                                  discount ? discount.toFixed(2) : "0.00"
                                }
                                margin={margin ? margin.toFixed(2) : "0.00"}
                                quotesName={quotesName}
                              />
                            </div>
                          )}
                        </div>
                        {guidedSellingListingVisible && (
                          <GuidedListing
                            showFlagHeader={true}
                            showFlagButton={false}
                            options={doctypePublished
                              .filter((docType) =>
                                selectedOptionsContentdoctype.includes(
                                  docType._id
                                )
                              )
                              .map((docType) => docType.doc_name)}
                            doctypePublished={doctypePublished}
                            doc_tempData={doc_tempData}
                            updateDocTempData={updateDocTempData}
                            panelType={"account"}
                            isReadOnly={true}
                            docClicks={docClick}
                            setUnSavedChange={setUnSavedChange}
                          />
                        )}
                      </>
                    )}
                    {GuidedGrid && (
                      <div className="guidedSellinggrid1">
                        {guidedSections && guidedSections.length > 0 && (
                          <GuidedSellingGrid
                            sectionId={guidedSections}
                            isGuided={true}
                            surveyId={surveyId}
                            guidedIds={quoteId}
                            updateNetPrice={updateNetPrice}
                            updateListPrice={updateListPrice}
                            updateCost={updateCost}
                            updateDiscount={updateDiscount}
                            updateMargin={updateMargin}
                            applyButtonPcr={applyButtonPcr}
                            setApplyButtonPcr={setApplyButtonPcr}
                            allRulesData={allRules}
                            allRules={applyButtonPcr ? allRules : []}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className="sidepanel"
                style={{
                  width: openGuidedSellingSideBar ? "25%" : "0%",
                  display: openGuidedSellingSideBar ? "block" : "none",
                }}
              >
                <SidePanel
                  // showFlagExternal={openGuidedSellingSideBar ? true : ""}
                  // showFlagTimeStamp={openGuidedSellingSideBar ? true : ""}
                  // showFlagExchangeRates={openGuidedSellingSideBar ? true : ""}
                  showFlagDoctypeAll={openGuidedSellingSideBar ? true : ""}
                  // showFlagDocumentExport={openGuidedSellingSideBar ? true : ""}
                  // showFlagWorddocument={openGuidedSellingSideBar ? true : ""}
                  // showFlagPdfdocument={openGuidedSellingSideBar ? true : ""}
                  // showFlagRole={openGuidedSellingSideBar ? true : ""}
                  onClose={closeGuidedSellingSideBar}
                  doctypePublished={doctypePublished}
                  updateOptionsDoctype={updateOptionsDoctype}
                  selectedOptionsContentdoctype={selectedOptionsContentdoctype}
                  panelType={"account"}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GuidedSellingNew;
