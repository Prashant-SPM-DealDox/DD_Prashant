import React, { useEffect, useState, useRef, useMemo } from "react";
import { IoChevronDown, IoCopy, IoTrash } from "react-icons/io5";
import CustomDropdown from "../../components/common/CustomDropdown";
import QuestionType from "../../components/RenderQuestion/QuestionType";
import { FaRegTrashCan } from "react-icons/fa6";
import "../../assets/css/survey-new/rules-configuration.css";
import {
  commonService,
  showErrorMessage,
  showSuccessMessage,
} from "../../utils/common";
import { useParams, useSearchParams } from "react-router-dom";
import { baseUrl } from "../../config";
import ToggleComponent from "../../components/survey-new/ToggleComponent";
const conditionTypes = ["WHEN", "ALWAYS", "COMPLEX"];

const operatorTypes = [
  ">",
  "<",
  ">=",
  "<=",
  "BETWEEN",
  "CHANGED",
  "CONTAIN",
  "EQUAL",
  "NOT CONTAIN",
  "EMPTY",
  "NOT EMPTY",
];

const actionList = [
  "SHOW SECTION",
  "SHOW QUESTION",
  "HIDE SECTION",
  "HIDE QUESTION",
  "SHOW VALIDATION",
  "TEMPLATE MERGE",
  "TEMPLATE OVERWRITE",
  "QUOTE: UNMERGE",
  "SURVEY: UNMERGE",
  "QUOTE: REFRESH",
  "SECTION: SET READ - ONLY",
  "RESUME CALCULATIONS",
  "STAGE: SET DURATION",
  "STAGE: RESIZE +/- DAYS",
  "STAGE: RESIZE +/-&",
  "CONTENT: REMOVE",
  "CONTENT: REMOVE DUPLICATES",
  "STAGE: REMOVE",
  "REFRESH FORMULAS",
  "REFRESH CALCS & FORMULA ON APPLY",
  "SURVEY: MERGE",
  "DOCTYPES: SET DOCTYPES LIST",
  "PROCESS CALC RANGE(PCR)",
  "QUOTE: MERGE",
  "SERVICE: REMOVE",
  "BID TEAM: CLEAR",
  "CONTENT: ADD CATALOG CONTENT",
  "QUOTE:SET QUOTE NAME",
  "QUOTE: SET DISCOUNT",
  "QUOTE: SET ORG",
  "SERVICE: ADD",
  "SET CALC CELL",
  "SET ANSWER ON APPLY",
  "QUOTE: SET START DATE",
  "STAGE: ADD",
  "QUOTE: SET PRICING MODEL",
  "CONTENT: ADD",
  "CONTENT: REPLACE TAGGED CONTENT",
  "CONTENT: REPLACE TAG",
  "SERVICE: SET START DATE",
  "SERVICE: UPDATE",
  "STAGE: RESIZE +/-%",
  "SET ANSWER",
  "QUOTE: SET CUSTOM FIELD",
  "QUOTE: SET CURRENCY",
  "MAKE REQUIRED",
];
const pcrCalcTemplate = [
  "01.SERVICES",
  "02.TASKS",
  "03.ROLES",
  "04.HOURS BY DATES",
];
const RulesConfigurator = ({
  rulesJson,
  questions,
  sectionIndex,
  onRulesChange,
  sectionData,
  isGuided = false,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchParams] = useSearchParams();
  const quoteIds = searchParams.get("quotes");
  const surveyIds = searchParams.get("template");
  const [rulesData, setRulesData] = useState(rulesJson);
  const [showRules, setShowRules] = useState({});
  const [showConditions, setShowConditions] = useState({});
  const [showActions, setShowActions] = useState({});
  const [cellData, setCellData] = useState([]);
  const [valueData, setValueData] = useState([]);
  const [calc, setCalc] = useState(null);
  const debounceTimer = useRef(null);

  const getCurrentQuestionData = (id) => {
    const question = questions.filter((x) => x._id === id);
    return question.length > 0 ? question[0] : null;
  };

  const questionsOptions = useMemo(() => {
    let tempOptions = [];
    if (questions && questions.length > 0) {
      questions.forEach((ques) => {
        if (!JSON.stringify(tempOptions).includes(ques._id)) {
          let allQuestions = questions
            .filter((x) => x.sectionPosition === ques.sectionPosition)
            .sort((a, b) => a.questionIndex - b.questionIndex);
          allQuestions.forEach((y, qIndex) => {
            y.questionIndex = qIndex + 1;
          });
          tempOptions = tempOptions.concat(allQuestions);
        }
      });
      tempOptions.sort((a, b) => a.sectionPosition - b.sectionPosition);
    }
    return tempOptions;
  }, [questions]);

  const param = useParams();

  //Debounce function
  const debounce = (func, delay) => {
    return function (...args) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const addRules = async (payload, ruleId) => {
    try {
      const addRuleURI = isGuided
        ? "/api/guidedselling/addGuidedRules"
        : "/api/rules/addRules";
      const response = await commonService(addRuleURI, "post", payload);
      if (response.status === 200) {
        let tempRulesData = [...rulesData];
        const ruleIndex = tempRulesData.findIndex((x) => x._id === ruleId);
        if (ruleIndex > -1) {
          tempRulesData[ruleIndex] = response.data.data;
          onRulesChange(tempRulesData);
        }
      } else {
        showErrorMessage(response.data.message);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAction = (ruleIndex, actionIndex) => {
    let tempRules = [...rulesData];
    tempRules[ruleIndex].actions.splice(actionIndex, 1);
    debouncedAPICall(tempRules[ruleIndex]);
    onRulesChange(tempRules);
  };

  const debouncedAPICall = debounce(addRules, 800);

  const handleConditionChange = (ruleId, event) => {
    let tempRulesData = [...rulesData];
    const ruleIndex = tempRulesData.findIndex((x) => x._id === ruleId);
    if (ruleIndex > -1) {
      let currentRule = { ...tempRulesData[ruleIndex] };
      currentRule.condition[event.target.name] = event.target.value;
      if (event.target.name === "operator" && event.target.value === "EMPTY") {
        currentRule.condition.questionValue = "";
      }
      tempRulesData[ruleIndex] = currentRule;
      debouncedAPICall(tempRulesData[ruleIndex], ruleId);
      onRulesChange(tempRulesData);
    }
  };

  useEffect(() => {
    setRulesData(rulesJson);
  }, [rulesJson]);

  const addActions = (ruleId, index, actionIndex) => {
    let tempRulesData = [...rulesData];
    const ruleIndex = tempRulesData.findIndex((x) => x._id === ruleId);
    if (ruleIndex > -1) {
      let currentRule = { ...tempRulesData[ruleIndex] };
      currentRule.actions.push({
        actionIndex: `${sectionIndex}.${ruleIndex + 1}.${actionIndex + 1}`,
        actionType: "",
        actionValue: "",
      });
      tempRulesData[ruleIndex] = currentRule;
      onRulesChange(tempRulesData);
    }
  };

  const handleActionChange = (ruleIndex, actionIndex, name, value) => {
    let tempRules = [...rulesData];
    let tempActions = tempRules[ruleIndex].actions;
    let currentActions = tempActions[actionIndex];
    if (
      name === "pcrCalcTab" ||
      name === "pcrCalcCell" ||
      name === "calcTabTemplate"
    ) {
      currentActions.actionValue = {
        ...currentActions.actionValue,
        [name]: value,
      };
      currentActions.actionValue = {
        ...currentActions.actionValue,
        cell_data: calcCellData.map(({ cell, value }) => ({
          celldata: cell,
          valuedata: value,
        })),
      };
    } else {
      currentActions[name] = value;
    }

    tempActions[actionIndex] = currentActions;
    tempRules[ruleIndex].actions = tempActions;
    debouncedAPICall(tempRules[ruleIndex]);

    onRulesChange(tempRules);
  };

  const handleRuleName = (ruleIndex, value) => {
    let tempRules = [...rulesData];
    tempRules[ruleIndex].ruleName = value;
    debouncedAPICall(tempRules[ruleIndex]);
    onRulesChange(tempRules);
  };

  const createDuplicateRule = async (rules, sectionIndex, index) => {
    try {
      let payload = { ...rules };
      payload.ruleIndex = `${sectionIndex}.${index}`;
      payload.ruleName = payload.ruleName + " " + "(copy)";
      delete payload._id;

      const response = await commonService(
        "/api/rules/addRules",
        "post",
        payload
      );
      if (response.status === 200) {
        let tempRules = [...rulesData];
        tempRules.push(response.data.data);
        onRulesChange(tempRules);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRule = async (id) => {
    try {
      const requestURI = isGuided
        ? "/api/rules/deleteGuidedRule"
        : "/api/rules/deleteRule";
      const payload = {
        id: id,
      };

      const response = await commonService(requestURI, "delete", payload);
      if (response.status === 200) {
        showSuccessMessage(response.data.message);
        onRulesChange(rulesData.filter((x) => x._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleRule = (ruleId) => {
    setShowRules((prevShowRules) => ({
      ...prevShowRules,
      [ruleId]: !prevShowRules[ruleId],
    }));
  };

  const toggleCondition = (conditionIndex) => {
    setShowConditions((prevShowConditions) => ({
      ...prevShowConditions,
      [conditionIndex]: !prevShowConditions[conditionIndex],
    }));
  };

  const toggleAction = (ruleId, actionIndex) => {
    setShowActions((prevShowActions) => ({
      ...prevShowActions,
      [ruleId]: {
        ...prevShowActions[ruleId],
        [actionIndex]: !prevShowActions[ruleId]?.[actionIndex],
      },
    }));
  };

  const flatCalcCellArray = rulesData
    .map((item) => item.actions.map((items) => items.pcrCalcCell))
    .flat();
  const initialCalcCell =
    flatCalcCellArray.length > 0 ? flatCalcCellArray[0] : "";
  const [calcCell, setCalcCell] = useState(initialCalcCell);
  const flatCalcTabArray = rulesData
    .map((item) => item.actions.map((items) => items.pcrCalcTab))
    .flat();
  const initialCalcTab = flatCalcTabArray.length > 0 ? flatCalcTabArray[0] : "";
  const [calcTab, setCalcTab] = useState(initialCalcTab);
  const [savedSheetNames, setSavedSheetNames] = useState([]);
  const [calcCellData, setCalcCellData] = useState([]);

  // content replace tagged content start
  const [contentTag, setContentTag] = useState("");

  // content replace tagged content end
  useEffect(() => {
    setQuoteKey(quoteIds);
  }, [quoteIds]);
  const [quoteKey, setQuoteKey] = useState("");
  // const [surveyKey, setSurveyKey] = useState("");
  const spreadRef = useRef(null);

  const fetchData = async (url, params) => {
    const requestBody = {};
    if (params.survey_key) {
      requestBody.survey_key = params.survey_key;
    } else if (params.quoteId && params.surveyId) {
      requestBody.quoteId = params.quoteId;
      requestBody.surveyId = params.surveyId;
    } else {
      console.error(
        "No valid parameters provided to determine which API to call."
      );
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const responseData = await response.json();

      if (!Array.isArray(responseData.data) || responseData.data.length === 0) {
        throw new Error("Invalid or empty data array.");
      }

      const calcData = responseData.data[0];

      if (!calcData || !calcData.data) {
        throw new Error('Invalid data format. Missing "data" property.');
      }

      const jsonData = JSON.parse(calcData.data);
      const sheetNames = Object.keys(jsonData.sheets);
      setSavedSheetNames(sheetNames);

      const cellValuesBySheet = {};

      sheetNames.forEach((sheetName) => {
        const sheetData = jsonData.sheets[sheetName].data.dataTable;
        if (!sheetData) {
          console.error(`Sheet data for "${sheetName}" is missing or invalid.`);
          return;
        }
        const cellValues = Object.entries(sheetData).reduce(
          (acc, [row, row_data]) => {
            Object.entries(row_data).forEach(([col, cell_value]) => {
              const colIndex = parseInt(col);
              const rowIndex = parseInt(row);

              if (!acc[colIndex]) {
                acc[colIndex] = [];
              }

              acc[colIndex].push({
                cell: `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`,
                value: cell_value.value,
              });
            });

            return acc;
          },
          []
        );

        const flattenedCellValues = cellValues.flat();
        cellValuesBySheet[sheetName] = flattenedCellValues;
      });

      setCalc(jsonData);
      const specifiedRange = calcCell;
      const selectedSheetName = calcTab;

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

          const celldataValues = specifiedRangeValues.map((cell) => cell.cell);
          const valuedataValues = specifiedRangeValues.map(
            (cell) => cell.value
          );

          setCellData(celldataValues.join(", "));
          setValueData(valuedataValues.join(", "));
          setCalcCellData(specifiedRangeValues);
        } else {
          console.warn(
            `No data available for the selected sheet: ${selectedSheetName}`
          );
        }
      } else {
        console.warn("No specified range or sheet name entered.");
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

  useEffect(() => {
    const params = {
      survey_key: param?.id,
      quoteId: quoteIds,
      surveyId: surveyIds,
    };
    const url = params.survey_key
      ? `${baseUrl}/api/spread/display/data/getcalc`
      : `${baseUrl}/api/spreadgs/displaygs/data/getcalcgs`;
    fetchData(url, params);
  }, [calcTab, param?.id, quoteIds, surveyIds]);

  // ------------------------------------------------------------------
  const [templateId, setTemplateId] = useState("");
  const [dbTemplateData, setDbTemplateData] = useState([]);
  // console.log(dbTemplateData);

  const gettemplatedata = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/template/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const template = await response.json();
        setDbTemplateData(template.data);
        // console.log(template);
        if (dbTemplateData == null) {
          try {
            const tempDaata = template.data;
            // console.log(tempDaata);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
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
        // setDbDoctypeData(doctype.data);

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

  useEffect(() => {
    gettemplatedata();
    getDoctypedata();
  });
  // Map dbTemplateData to create options for the dropdown

  let templates =
    dbTemplateData.length > 0
      ? dbTemplateData.map((tempNames) => tempNames.quote_name)
      : [];

  const optionTEMPLATEMERGE = templates;

  return (
    rulesData.length > 0 &&
    rulesData.map((rules, index) => {
      const { condition } = rules;
      const isRuleVisible = showRules[rules._id] || false;
      return (
        <div className="rules--configurator" key={`${rules._id}-$${index}`}>
          <div className="rules-row" id="rules-first-row">
            <div className="rules-column" id="rules-container">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                id="rulesindex"
                onClick={() => toggleRule(rules._id)}
              >
                <IoChevronDown style={{ marginRight: 10 }} /> Rule{" "}
                {sectionIndex}.{index + 1}
              </div>
              <input
                type="text"
                value={rules.ruleName}
                onChange={(e) => handleRuleName(index, e.target.value)}
                style={{ marginLeft: 10 }}
                id="rulesInput"
              />
            </div>
            <div className="rules-column" id="copy-delete-container">
              <button
                onClick={() =>
                  createDuplicateRule(rules, sectionIndex, index + 1 + 1)
                }
                id="rules-button-container"
              >
                <IoCopy size={20} style={{ color: "#056289" }} />
              </button>
              <button
                onDoubleClick={() => deleteRule(rules._id)}
                id="rules-button-container"
              >
                <FaRegTrashCan style={{ color: "red" }} size={20} />
              </button>
            </div>
          </div>

          {isRuleVisible && (
            <div>
              <div className="rules-row" id="rules-second-row">
                <div className="rules-column">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      paddingLeft: "27px",
                    }}
                    onClick={() => toggleCondition(index)}
                  >
                    <IoChevronDown style={{ marginRight: 10 }} />
                    Condition {sectionIndex}.{index + 1}{" "}
                    {rules.condition.conditionType !== ""
                      ? `(${rules.condition.conditionType})`
                      : ""}
                  </div>
                </div>
              </div>
              {showConditions[index] && (
                <div className="rules-row" id="when-container">
                  <div className="rules-column">
                    <CustomDropdown
                      options={conditionTypes}
                      onSelect={(value) =>
                        handleConditionChange(rules._id, {
                          target: {
                            name: "conditionType",
                            value: value,
                          },
                        })
                      }
                      label="CONDITION"
                      value={rules.condition.conditionType}
                      Placeholder={"Condition"}
                      isBorderVisible={true}
                    />
                  </div>
                  {rules.condition.conditionType === "ALWAYS" ||
                    rules.condition.conditionType === "" ||
                    (rules.condition.conditionType !== "COMPLEX" && (
                      <div id="when-sub-container">
                        <div className="rules-column">
                          <CustomDropdown
                            options={questionsOptions}
                            onSelect={(value) => {
                              handleConditionChange(rules._id, {
                                target: {
                                  name: "questionId",
                                  value: value,
                                },
                              });
                            }}
                            value={rules.condition.questionId}
                            valueKey={"_id"}
                            valueText={"questionName"}
                            label="CHOOSE QUESTION"
                            Placeholder={"CHOOSE QUESTION"}
                            isBorderVisible={true}
                          />
                        </div>
                        <div className="rules-column">
                          <CustomDropdown
                            options={operatorTypes}
                            onSelect={(value) =>
                              handleConditionChange(rules._id, {
                                target: {
                                  name: "operator",
                                  value: value,
                                },
                              })
                            }
                            value={rules.condition.operator}
                            label="OPERATOR"
                            Placeholder={"OPERATOR"}
                            isBorderVisible={true}
                          />
                        </div>

                        {getCurrentQuestionData(rules.condition.questionId) &&
                          rules.condition.operator !== "EMPTY" &&
                          rules.condition.operator !== "NOT EMPTY" && (
                            <div className="rules-column" id="third-Container">
                              <div style={{ height: "100%" }}>
                                <QuestionType
                                  question={getCurrentQuestionData(
                                    rules.condition.questionId
                                  )}
                                  onChange={(questionId, value) =>
                                    handleConditionChange(rules._id, {
                                      target: {
                                        name: "questionValue",
                                        value: value,
                                      },
                                    })
                                  }
                                  isForRules={true}
                                  propAnswer={rules.condition.questionValue}
                                  operator={rules.condition.operator}
                                  id="when-question-container"
                                  dontshowcancle={false}
                                />
                                <label htmlFor="" id="when-question-label">
                                  Value
                                </label>
                              </div>
                            </div>
                          )}
                      </div>
                    ))}
                </div>
              )}
              {rules.actions &&
                rules.actions.length > 0 &&
                rules.actions.map((action, rIndex) => {
                  const isActionVisible =
                    showActions[rules._id]?.[rIndex] || false;
                  return (
                    <div className="">
                      <div className="rules-row">
                        <div className="rules-column" id="action-row-container">
                          <div
                            onClick={() => toggleAction(rules._id, rIndex)}
                            id="action-container-box"
                          >
                            <IoChevronDown style={{ marginRight: 10 }} />
                            Action {sectionIndex}.{index + 1}.{rIndex + 1}
                            <input
                              type="text"
                              value={action.actionType}
                              id="action-input"
                            />
                          </div>
                        </div>
                      </div>
                      {isActionVisible && (
                        <>
                          <div
                            className="rules-row"
                            key={`${action.actionType}-${index}`}
                            id="action-container"
                          >
                            <div className="rules-column">
                              <CustomDropdown
                                options={actionList}
                                onSelect={(value) =>
                                  handleActionChange(
                                    index,
                                    rIndex,
                                    "actionType",
                                    value
                                  )
                                }
                                value={action.actionType}
                                label="ACTION"
                                Placeholder={"ACTION"}
                                isBorderVisible={true}
                              />
                            </div>
                            <div className="action-second-item">
                              {action.actionType.includes("SECTION") && (
                                <div className="rules-column">
                                  <CustomDropdown
                                    options={sectionData}
                                    onSelect={(value) =>
                                      handleActionChange(
                                        index,
                                        rIndex,
                                        "actionValue",
                                        value
                                      )
                                    }
                                    valueKey={"_id"}
                                    valueText={"sectionName"}
                                    value={action.actionValue}
                                    label="CHOOSE SECTION"
                                    Placeholder={"CHOOSE SECTION"}
                                    isBorderVisible={true}
                                  />
                                </div>
                              )}
                              {action.actionType.includes("QUESTION") && (
                                <div className="rules-column">
                                  <CustomDropdown
                                    options={questionsOptions}
                                    onSelect={(value) =>
                                      handleActionChange(
                                        index,
                                        rIndex,
                                        "actionValue",
                                        value
                                      )
                                    }
                                    value={action.actionValue}
                                    valueKey={"_id"}
                                    valueText={"questionName"}
                                    label="CHOOSE QUESTION"
                                    Placeholder={"CHOOSE QUESTION"}
                                    isBorderVisible={true}
                                  />
                                </div>
                              )}
                              {action.actionType.includes(
                                "PROCESS CALC RANGE(PCR)"
                              ) && (
                                <div
                                  className="rules-column"
                                  id="pcr-container"
                                >
                                  <CustomDropdown
                                    options={savedSheetNames}
                                    onSelect={(value) => {
                                      // Update state with the new value
                                      setCalcTab(value);
                                      handleActionChange(
                                        index,
                                        rIndex,
                                        "pcrCalcTab",
                                        value
                                      );
                                    }}
                                    value={action.actionValue.pcrCalcTab}
                                    label="CALC TAB"
                                    Placeholder={""}
                                    isBorderVisible={true}
                                  />
                                  <div className="pcr-valuee-container">
                                    <input
                                      type="text"
                                      id="pcr-value-container"
                                      value={action.actionValue.pcrCalcCell}
                                      onChange={(e) => {
                                        setCalcCell(e.target.value);
                                        handleActionChange(
                                          index,
                                          rIndex,
                                          "pcrCalcCell",
                                          e.target.value
                                        );
                                      }}
                                    />
                                    <label htmlFor="" id="pcr-value-label">
                                      CALC RANGE
                                    </label>
                                  </div>
                                  <CustomDropdown
                                    options={pcrCalcTemplate}
                                    onSelect={(value) =>
                                      handleActionChange(
                                        index,
                                        rIndex,
                                        "calcTabTemplate",
                                        value
                                      )
                                    }
                                    value={action.actionValue.calcTabTemplate}
                                    label="TEMPLATE"
                                    Placeholder={""}
                                    isBorderVisible={true}
                                  />
                                </div>
                              )}

                              {action.actionType.includes("TEMPLATE MERGE") && (
                                <CustomDropdown
                                  onSelect={(value) =>
                                    handleActionChange(
                                      index,
                                      rIndex,
                                      "actionValue",
                                      value
                                    )
                                  }
                                  options={optionTEMPLATEMERGE}
                                  value={action.actionValue}
                                  label="TEMPLATE"
                                  Placeholder={""}
                                  isBorderVisible={true}
                                />
                              )}
                              {action.actionType.includes(
                                "CONTENT: REPLACE TAGGED CONTENT"
                              ) && (
                                <div className="rules-column">
                                  <input
                                    type="text"
                                    id="replace_tag_container"
                                    value={action.actionValue}
                                    onChange={(e) => {
                                      setContentTag(e.target.value);
                                      handleActionChange(
                                        index,
                                        rIndex,
                                        "actionValue",
                                        e.target.value
                                      );
                                    }}
                                  />
                                  <label htmlFor="" id="replace_tag_label">
                                    FIND TAG
                                  </label>
                                </div>
                              )}
                            </div>

                            {!action.actionType.includes(
                              "CONTENT: REPLACE TAGGED CONTENT"
                            ) && (
                              <button
                                onDoubleClick={() =>
                                  deleteAction(index, rIndex)
                                }
                                id="pcr-trash-icon"
                              >
                                <FaRegTrashCan
                                  style={{ color: "red" }}
                                  size={20}
                                />
                              </button>
                            )}
                          </div>

                          {action.actionType.includes(
                            "CONTENT: REPLACE TAGGED CONTENT"
                          ) && (
                            <div className="second-row">
                              <ToggleComponent />

                              <button
                                onDoubleClick={() =>
                                  deleteAction(index, rIndex)
                                }
                                id="second-trash-icon"
                              >
                                <FaRegTrashCan
                                  style={{ color: "red" }}
                                  size={20}
                                />
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              <div style={{ width: "100%", height: "30px" }}>
                <button
                  className="btn-linkk block mx-auto my-5"
                  onClick={() =>
                    addActions(rules._id, index, rules.actions.length)
                  }
                  id="add-action-button"
                >
                  +Add Action
                </button>
              </div>
            </div>
          )}
        </div>
      );
    })
  );
};

export default RulesConfigurator;
