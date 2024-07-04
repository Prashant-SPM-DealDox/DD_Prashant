import React, { useState, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import QuestionType from "./QuestionType";
import "../../assets/css/guidedselling/GuidedSellingNew.css";

const RenderQuestion = ({
  sections,
  questions,
  onAnswerChange,
  onAnswerChangeBlur,
  errors,
  showCancel,
  rulesJson,
}) => {
  const [openSections, setOpenSections] = useState({});
  const [sectionList, setSectionList] = useState(sections);
  const [questionData, setQuestionData] = useState(questions);

  const handleChange = (questionId, value, type = "change") => {
    if (type === "blur") {
      onAnswerChangeBlur({ questionId, value });
    } else {
      onAnswerChange({ questionId, value });
    }
  };

  const handleSectionOpenClose = (sectionId) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [sectionId]: !prevOpenSections[sectionId],
    }));
  };

  const checkIsValid = (question) =>
    errors.findIndex(
      (error) =>
        (error?._id && error._id === question?._id) ||
        (error?.tempQuestionId &&
          error.tempQuestionId === question?.tempQuestionId)
    ) > -1;

  const checkIsValidSection = (sectionId) =>
    errors.filter((x) => x.surveySectionId === sectionId).length > 0;

  const compareValue = (compare, operator, value, question) => {
    const checkIsOperator = [">", "<", ">=", "<="];
    const forAirthmetic = [
      "NUMBERS",
      "WHOLE NUMBER",
      "PERCENTAGE",
      "NUMERIC (0-10)",
    ];
    compare =
      checkIsOperator.indexOf(operator) > -1
        ? forAirthmetic.indexOf(question.questionType)
          ? parseInt(compare)
          : question.questionType === "DATE"
          ? new Date(compare)
          : compare
        : compare;

    value =
      checkIsOperator.indexOf(operator) > -1
        ? forAirthmetic.indexOf(question.questionType)
          ? parseInt(value)
          : question.questionType === "DATE"
          ? new Date(value)
          : value
        : value;

    switch (operator) {
      case ">":
        return compare > value;
      case "<":
        return compare < value;
      case ">=":
        return compare >= value;
      case "<=":
        return compare <= value;
      case "EQUAL":
      case "TOGGLE":
        return compare == value;
      case "EMPTY":
        return (
          compare === "" ||
          compare === null ||
          (typeof compare === "object" && Object.keys(compare).length === 0)
        );
      case "NOT EMPTY":
        return (
          (compare !== "" && compare !== null) ||
          (typeof compare === "object" && Object.keys(compare).length !== 0)
        );
      case "CONTAIN":
        // return value.includes(compare);
        return compare == value;
      case "NOT CONTAIN":
        return compare != value;
    }
  };

  const renderSectionAsPerRules = (sectionId, sec) => {
    const filterRules = rulesJson.filter(
      (x) => x.actions.findIndex((x) => x.actionValue === sectionId) > -1
    );
    if (filterRules.length > 0) {
      const checkAnyAlways = filterRules.filter(
        (x) => x.condition.conditionType === "ALWAYS"
      );
      if (checkAnyAlways && checkAnyAlways.length > 0) {
        const alwaysObj = checkAnyAlways.at(-1);
        const actionRules = alwaysObj.actions.filter(
          (x) => x.actionValue === sectionId
        )[0];
        if (actionRules.actionType.includes("SHOW")) {
          return true;
        }
        return false;
      }
      const checkAnyWhen = filterRules.filter(
        (x) => x.condition.conditionType === "WHEN"
      );
      if (checkAnyWhen.length > 0) {
        let isRender = true;
        for (let index = 0; index < checkAnyWhen.length; index++) {
          const ruleElement = checkAnyWhen[index];
          const checkIsQuestionAnswered = questionData.filter(
            (x) =>
              x._id === ruleElement.condition.questionId &&
              typeof x.answer !== "object" &&
              x.answer !== null &&
              x.answer !== ""
          );
          const actionRules = ruleElement.actions
            .filter((x) => x.actionValue === sectionId)
            .at(-1);

          if (
            checkIsQuestionAnswered.length > 0 ||
            ruleElement.condition.operator === "EMPTY" ||
            ruleElement.condition.operator === "NOT CONTAIN"
          ) {
            const answeredQuestion =
              checkIsQuestionAnswered && checkIsQuestionAnswered.length > 0
                ? checkIsQuestionAnswered[0]
                : null;

            const isCondition = answeredQuestion
              ? compareValue(
                  answeredQuestion.answer,
                  ruleElement.condition.operator,
                  ruleElement.condition.questionValue,
                  answeredQuestion
                )
              : ruleElement.condition.operator === "EMPTY" ||
                (ruleElement.condition.operator === "NOT CONTAIN" &&
                  (answeredQuestion === null ||
                    answeredQuestion?.answer === "" ||
                    answeredQuestion?.answer === null ||
                    (typeof compare === "object" &&
                      Object.keys(compare).length === 0)))
              ? true
              : false;

            if (isCondition) {
              isRender = actionRules.actionType.includes("SHOW")
                ? true
                : actionRules.actionType.includes("HIDE")
                ? false
                : true;
            } else {
              isRender = actionRules.actionType.includes("SHOW")
                ? false
                : actionRules.actionType.includes("HIDE")
                ? true
                : false;
            }
          } else {
            isRender = actionRules.actionType.includes("SHOW")
              ? false
              : actionRules.actionType.includes("HIDE")
              ? true
              : true;
          }
        }
        return isRender;
      }
    }
    return !sec.isHide;
  };

  const renderQuestionAsPerRules = (questionId, ques) => {
    const filterRules = rulesJson.filter(
      (x) => x.actions.findIndex((x) => x.actionValue === questionId) > -1
    );

    if (filterRules.length > 0) {
      const checkAnyAlways = filterRules.filter(
        (x) => x.condition.conditionType === "ALWAYS"
      );
      if (checkAnyAlways && checkAnyAlways.length > 0) {
        const alwaysObj = checkAnyAlways.at(-1);
        const actionRules = alwaysObj.actions.filter(
          (x) => x.actionValue === questionId
        )[0];
        if (actionRules.actionType.includes("SHOW")) {
          return true;
        }
        return false;
      }
      const checkAnyWhen = filterRules.filter(
        (x) => x.condition.conditionType === "WHEN"
      );
      if (checkAnyWhen.length > 0) {
        let isRender = true;
        for (let index = 0; index < checkAnyWhen.length; index++) {
          const ruleElement = checkAnyWhen[index];
          const checkIsQuestionAnswered = questionData.filter(
            (x) =>
              x._id === ruleElement.condition.questionId &&
              typeof x.answer !== "object" &&
              x.answer !== null &&
              x.answer !== ""
          );
          const actionRules = ruleElement.actions
            .filter((x) => x.actionValue === questionId)
            .at(-1);
          if (
            checkIsQuestionAnswered.length > 0 ||
            ruleElement.condition.operator === "EMPTY"
          ) {
            const answeredQuestion =
              checkIsQuestionAnswered && checkIsQuestionAnswered.length > 0
                ? checkIsQuestionAnswered[0]
                : null;
            const isCondition = answeredQuestion
              ? compareValue(
                  answeredQuestion.answer,
                  ruleElement.condition.operator,
                  ruleElement.condition.questionValue,
                  answeredQuestion
                )
              : ruleElement.condition.operator === "EMPTY"
              ? true
              : false;

            if (isCondition) {
              isRender = actionRules.actionType.includes("SHOW")
                ? true
                : actionRules.actionType.includes("HIDE")
                ? false
                : true;
            } else {
              isRender = actionRules.actionType.includes("SHOW")
                ? false
                : actionRules.actionType.includes("HIDE")
                ? true
                : false;
            }
          } else {
            isRender = actionRules.actionType.includes("SHOW")
              ? false
              : actionRules.actionType.includes("HIDE")
              ? true
              : true;
          }
        }
        return isRender;
      }
    }
    return !ques.isHide;
  };

  const renderQuestion = () => {
    if (!sectionList || !questionData) {
      return null;
    }

    // Sort sectionList based on their position
    const sortedSections = sectionList
      .slice()
      .sort((a, b) => a.position - b.position || a._id.localeCompare(b._id));

    return sortedSections.map((sec, index) => {
      if (
        (rulesJson &&
          rulesJson.length > 0 &&
          renderSectionAsPerRules(sec._id, sec)) ||
        !rulesJson ||
        rulesJson.length === 0
      ) {
        return (
          <div key={index}>
            <div
              className={
                "render-section " +
                (checkIsValidSection(sec._id) ? "invalid-element" : "")
              }
              onClick={() => handleSectionOpenClose(sec._id)}
            >
              <div id="guidedUPDownIcon">
                {openSections[sec._id] ? (
                  <FaAngleUp size={16} />
                ) : (
                  <FaAngleDown size={16} />
                )}
              </div>
              {`${index + 1}. ${sec.sectionName}`}
            </div>

            {!openSections[sec._id] &&
              questionData
                .filter((ques) => ques.surveySectionId === sec._id)
                .sort((a, b) => a.questionPosition - b.questionPosition)
                .map((ques, quesIndex) => {
                  if (renderQuestionAsPerRules(ques._id, ques)) {
                    return (
                      <div
                        key={quesIndex}
                        className={
                          "render-question "
                          //  +
                          // (checkIsValid(ques) ? "invalid-element" : "")
                        }
                        id="render-question-grid"
                      >
                        <p className="question-title question-index">{`${
                          index + 1
                        }.${quesIndex + 1}`}</p>
                        <p
                          // className="question-title question-name"
                          className={
                            "question-title question-name " +
                            (checkIsValid(ques) ? "invalid-elementt" : "")
                          }
                          id="questionContent"
                        >
                          {ques.questionName}
                        </p>
                        <QuestionType
                          question={ques}
                          onChange={(questionId, value) =>
                            handleChange(questionId, value)
                          }
                          onBlur={(questionId, value) =>
                            handleChange(questionId, value, "blur")
                          }
                          showCancel={showCancel}
                        />
                      </div>
                    );
                  }
                })}
          </div>
        );
      }
    });
  };

  useEffect(() => {
    setSectionList(sections);
    setQuestionData(questions);
  }, [sections, questions]);

  return (
    <div className="render-question--main mb-[3.5rem] sectionandquestion">
      {renderQuestion()}
    </div>
  );
};

export default RenderQuestion;
