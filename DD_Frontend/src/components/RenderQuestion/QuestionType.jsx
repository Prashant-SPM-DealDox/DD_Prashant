import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../constants";
import "../../assets/css/survey-new/survey-new.css";
import "../../assets/css/survey-new/QuestionType.css";
import { useLookupsData } from "../../constants";
import { useAuthContext } from "../../hooks/useAuthContext";
import { baseUrl } from "../../config";
import CustomDropdown from "../common/CustomDropdown";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";

const QuestionType = ({
  question,
  onChange,
  onBlur,
  propAnswer,
  showCancel,
  isForRules = false,
  operator = null,
}) => {
  const { lookupdatas, lookUpDataUpdated, setLookUpDataUpdated } =
    useContext(DataContext);

  const [value, setValue] = useState(question?.answer);

  const handleValueChange = (event) => {
    let newValue = typeof event === "object" ? event.target.value : event;

    if (
      question.questionType === "PERCENTAGE" &&
      newValue &&
      !isNaN(newValue)
    ) {
      newValue += "%";
    }

    setValue(newValue);
    if (event.type === "blur") {
      onBlur(question._id, newValue);
    } else {
      onChange(question._id, newValue);
    }
  };

  const handleValueChangeOnBlur = (event) => {
    // if (!isForRules) {
    //   onChange(
    //     question._id,
    //     typeof event === "object" ? event.target.value : event
    //   );
    // }
  };

  const handleValueChangeBetween = (event, value, index) => {
    if (value && typeof value !== "object") {
      let newValue = typeof event === "object" ? event.target.value : event;
      let splitValue = value.split("-");
      splitValue[index] = newValue;
      newValue = splitValue.join("-");
      setValue(newValue);
      onChange(question._id, newValue);
    }

    // if (
    //   question.questionType === "PERCENTAGE" &&
    //   newValue &&
    //   !isNaN(newValue)
    // ) {
    //   newValue += "%";
    // }
  };

  const getBetweenValue = (value, index) => {
    if (value && typeof value !== "object") {
      return value.split("-")[index];
    }
    return "";
  };

  const user = useAuthContext();

  if (lookUpDataUpdated) {
    setLookUpDataUpdated(false);
  }

  const getQuestionType = (questionType, answer, operator) => {
    if (typeof answer === "object") {
      answer = "";
    }

    switch (questionType) {
      case "NUMBER":
        if (operator === "BETWEEN") {
          return (
            <div className="between-container">
              <div className="same-width  first-input" id="input-container">
                <input
                  className="number_select"
                  type="number"
                  min={1}
                  max={9999999999}
                  value={getBetweenValue(answer, 0)}
                  onChange={(event) =>
                    handleValueChangeBetween(event, answer, 0)
                  }
                  onBlur={handleValueChangeOnBlur}
                  id="input-content-box"
                  onWheel={(e) => e.target.blur()}
                  autoComplete="new-password"
                />
              </div>
              <div
                className="same-width between-value-secondcontainer"
                id="input-container"
              >
                <input
                  className="number_select"
                  type="number"
                  min={1}
                  max={9999999999}
                  value={getBetweenValue(answer, 1)}
                  onChange={(event) =>
                    handleValueChangeBetween(event, answer, 1)
                  }
                  onBlur={handleValueChangeOnBlur}
                  id="input-content-box"
                  onWheel={(e) => e.target.blur()}
                  autoComplete="new-password"
                />
                <label className="between-second-label">Value</label>
              </div>
            </div>
          );
        } else {
          return (
            <div className="same-width" id="input-container">
              <input
                className="number_select"
                type="number"
                min={1}
                max={9999999999}
                value={answer}
                onChange={handleValueChange}
                onBlur={handleValueChange}
                id="input-content-box"
                onWheel={(e) => e.target.blur()}
                autoComplete="new-password"
              />
            </div>
          );
        }
      case "TOGGLE":
        return (
          <div className="toggle_selectbtn" id="input-container">
            <input
              className="toggle_select"
              type="checkbox"
              checked={answer === "true"}
              onChange={(e) =>
                handleValueChange(e.target.checked ? "true" : "")
              }
              onBlur={(e) =>
                handleValueChangeOnBlur(e.target.checked ? "true" : "")
              }
              id="input-content-box"
              autoComplete="new-password"
            />
          </div>
        );

      case "COUNTRIES":
        return (
          <CustomDropdown
            options={CONSTANTS.countryList.map((country) => {
              return country.name;
            })}
            onSelect={(value) => handleValueChange(value)}
            onBlur={(value) => handleValueChangeOnBlur(value)}
            value={answer}
            isBorderVisible={false}
            showCancel={showCancel}
            ID={"guidedSellingInputDropdowns"}
            DivID={"guidedSellingInputDiv"}
          />
        );

      case "YES/NO":
        return (
          <div style={{ height: "100%" }}>
            <div className="radio-group" id="survey-input-container">
              <CustomDropdown
                options={CONSTANTS.yesno.map((yesno) => {
                  return yesno;
                })}
                onSelect={(value) => handleValueChange(value)}
                onBlur={(value) => handleValueChangeOnBlur(value)}
                value={answer}
                isBorderVisible={false}
                showCancel={showCancel}
                ID={"guidedSellingInputDropdowns"}
                DivID={"guidedSellingInputDiv"}
              />
            </div>
          </div>
        );

      case "DATE":
        if (operator === "BETWEEN") {
          return (
            <div className="between-container">
              <div className="samw-width first-input" id="input-container">
                <input
                  className="date_select"
                  // style={{ width: "128%" }}
                  type={"date"}
                  value={getBetweenValue(answer, 0)}
                  onChange={(event) =>
                    handleValueChangeBetween(event, answer, 0)
                  }
                  onBlur={handleValueChangeOnBlur}
                  id="input-content-box"
                  autoComplete="new-password"
                />
              </div>
              <div
                className="samw-width between-value-secondcontainer"
                id="input-container"
              >
                <input
                  className="date_select"
                  // style={{ width: "128%" }}
                  type={"date"}
                  value={getBetweenValue(answer, 1)}
                  onChange={(event) =>
                    handleValueChangeBetween(event, answer, 1)
                  }
                  onBlur={handleValueChangeOnBlur}
                  id="input-content-box"
                  autoComplete="new-password"
                />
                <label className="between-second-label">Value</label>
              </div>
            </div>
          );
        } else {
          return (
            <div className="samw-width" id="input-container">
              <input
                className="date_select"
                // style={{ width: "128%" }}
                type={"date"}
                value={answer}
                onChange={handleValueChange}
                // onBlur={handleValueChange}
                id="input-content-box"
                autoComplete="new-password"
              />
            </div>
          );
        }

      case "NUMERIC (0-10)":
        if (operator === "BETWEEN") {
          return (
            <div className="between-container">
              <div className="same-width first-input" id="input-container">
                <CustomDropdown
                  options={CONSTANTS.number.map((number) => {
                    return number;
                  })}
                  onSelect={(value) =>
                    handleValueChangeBetween(value, answer, 0)
                  }
                  onBlur={(value) => handleValueChangeBetween(value, answer, 0)}
                  value={answer}
                  isBorderVisible={false}
                  showCancel={showCancel}
                  ID={"guidedSellingInputDropdowns"}
                  DivID={"guidedSellingInputDiv"}
                />
              </div>
              <div className="same-width" id="input-container">
                <CustomDropdown
                  options={CONSTANTS.number.map((number) => {
                    return number;
                  })}
                  onSelect={(value) =>
                    handleValueChangeBetween(value, answer, 1)
                  }
                  onBlur={(value) => handleValueChangeBetween(value, answer, 1)}
                  value={answer}
                  isBorderVisible={false}
                  showCancel={showCancel}
                  label={"Value"}
                  ID={"guidedSellingInputDropdowns"}
                  DivID={"guidedSellingInputDiv"}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div className="same-width" id="input-container">
              <CustomDropdown
                options={CONSTANTS.number.map((number) => {
                  return number;
                })}
                onSelect={(value) => handleValueChange(value)}
                onBlur={(value) => handleValueChangeOnBlur(value)}
                value={answer}
                isBorderVisible={false}
                showCancel={showCancel}
                ID={"guidedSellingInputDropdowns"}
                DivID={"guidedSellingInputDiv"}
              />
            </div>
          );
        }

      case "WHOLE NUMBER":
        return (
          <div className="same-width" id="input-container">
            <input
              className="number_select"
              type="number"
              min={0}
              max={9999999999}
              value={answer}
              onChange={handleValueChange}
              onBlur={handleValueChange}
              onWheel={(e) => e.target.blur()}
              autoComplete="new-password"
            />
          </div>
        );
      case "TEXT":
        return (
          <div className="same-width" id="input-container">
            <input
              type="text"
              value={answer}
              onChange={handleValueChange}
              onBlur={handleValueChangeOnBlur}
              className="number_select"
              id="input-content-box"
              autoComplete="off"
            />
          </div>
        );
      case "MULTITEXT":
        return (
          <div className="same-width" id="input-container">
            <textarea
              value={answer}
              onChange={handleValueChange}
              onBlur={handleValueChange}
              className="number_select"
              autoComplete="new-password"
            ></textarea>
          </div>
        );
      case "PERCENTAGE":
        const percentageValue = answer && answer.replace("%", "");
      
        return (
          <div className="same-width" id="input-container">
            <input
              type="number"
              value={percentageValue || ""}
              onChange={handleValueChange}
              onBlur={handleValueChange}
              className="number_select"
              id="input-content-box"
              onWheel={(e) => e.target.blur()}
              autoComplete="new-password"
            />
            {percentageValue && <span className="show-percentage">%</span>}
            
          </div>
        );

      case "CURRENCY":
        return (
          <CustomDropdown
            options={CONSTANTS.currencyList.map((currency) => {
              return currency.name;
            })}
            onSelect={(value) => handleValueChange(value)}
            onBlur={(value) => handleValueChangeOnBlur(value)}
            value={answer}
            isBorderVisible={false}
            showCancel={showCancel}
            ID={"guidedSellingInputDropdowns"}
            DivID={"guidedSellingInputDiv"}
          />
        );

      case "YES/NO/NOT SURE":
        return (
          <CustomDropdown
            options={CONSTANTS.yesNoNotSure.map((yesNoNotSure) => {
              return yesNoNotSure;
            })}
            onSelect={(value) => handleValueChange(value)}
            onBlur={(value) => handleValueChangeOnBlur(value)}
            value={answer}
            isBorderVisible={false}
            className={"boderhata"}
            showCancel={showCancel}
            ID={"guidedSellingInputDropdowns"}
            DivID={"guidedSellingInputDiv"}
          />
        );

      default:
        const matchingLookups = lookupdatas.filter(
          (lookup) => lookup.class_name === questionType
        );

        if (matchingLookups.length === 0) {
          return "No Question";
        }

        // Return the select element with options based on lookup data
        return matchingLookups.map((lookup, index) => (
          <div key={index}>
            <CustomDropdown
              options={lookup.lookupOptions
                .filter(option => option.disable === false)
                .map(option => option.lookups_name)}
              onSelect={(value) => handleValueChange(value)}
              onBlur={(value) => handleValueChangeOnBlur(value)}
              value={answer}
              isBorderVisible={false}
              // ID={`select-container-${className}`}
              showCancel={showCancel}
              ID={"guidedSellingInputDropdowns"}
              DivID={"guidedSellingInputDiv"}
            />
          </div>
        ));
    }
  };

  return getQuestionType(
    question.questionType,
    propAnswer !== null && propAnswer !== undefined ? propAnswer : value,
    operator
  );
};

export default QuestionType;
