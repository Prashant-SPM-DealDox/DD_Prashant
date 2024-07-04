import React, { useEffect, useRef, useState } from "react";
import { CONSTANTS } from "../../constants";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import { BsInfo } from "react-icons/bs";
import "../../assets/css/survey-new/QuestionType.css";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import {
  commonService,
  showErrorMessage,
  showSuccessMessage,
} from "../../utils/common";
import RulesConfigurator from "./rules-configuration";
import "../../assets/css/survey-new/survey-new.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import CustomDropdown from "../../components/common/CustomDropdown";
import Formula from "../../components/RenderQuestion/Formula";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";

const initialQuestionState = {
  questionName: "",
  isNote: false,
  isRequired: false,
  questionType: "TOGGLE",
  questionCategory: "",
  questionNote: "",
  externalRefId: "",
  linkToQuestion: "",
};
const initialRules = {
  condition: {
    conditionType: "",
    questionId: "",
    operator: "",
    questionValue: "",
  },
  actions: [],
};

const SurveyInputsTextField = ({
  className,
  placeholder,
  value,
  handleChange,
  name,
  index,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <input
      className={className}
      autoComplete="off"
      type="text"
      ref={inputRef}
      placeholder={placeholder}
      value={value.questionName}
      name={name}
      id="question-input-box"
      onChange={(e) => handleChange(index, name, e.target.value, value)}
    />
  );
};

const QuestionSetup = ({
  isGuided = false,
  sectionIndex,
  data,
  onQuestionChange,
  surveySectionId,
  surveyId,
  onDeleteQuestion,
  sectionData,
  rulesSectionId,
  allRules,
}) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [questionsList, setQuestionsList] = useState(data);
  const [selectedElement, setSelectedElement] = useState("question");
  const [rulesJson, setRulesJson] = useState(allRules);
  const debounceTimer = useRef(null);

  const { lookUpDataUpdated, setLookUpDataUpdated, lookupClassNames } =
    useContext(DataContext);

  if (lookUpDataUpdated) {
    setLookUpDataUpdated(false);
  }
  // console.log(rulesJson);
  const questionOptions = [...CONSTANTS.questionTypes, ...lookupClassNames];

  useEffect(() => {
    setQuestionsList(data);
  }, [data]);

  useEffect(() => {
    setRulesJson(allRules);
  }, [allRules]);

  const handleOnQuestionChange = (index, key, value, question) => {
    let tempQuestion = [...questionsList];
    const checkQuestionIndex = tempQuestion.findIndex(
      (x) => x._id === question._id
    );

    if (checkQuestionIndex > -1) {
      tempQuestion[checkQuestionIndex] = {
        ...tempQuestion[checkQuestionIndex],
        [key]: value,
        isEdited: true,
      };
    }
    debouncedAPICall(tempQuestion[checkQuestionIndex]);
    setQuestionsList(tempQuestion);
    onQuestionChange(tempQuestion);
  };

  const addQuestionAsync = async (questionData = null) => {
    setLoading(true);
    try {
      const requestURI = isGuided
        ? "/api/guidedselling/addGuidedSellingQuestions"
        : "/api/survey/addSurveyQuestions";
      const response = await commonService(requestURI, "post", {
        ...questionData,
        sectionIndex,
      });
      if (response.status === 200) {
        let tempQuestions = [...questionsList];
        const checkQuestionIndex = tempQuestions.findIndex(
          (x) =>
            questionData.hasOwnProperty("_id") && x._id === questionData._id
        );
        if (checkQuestionIndex < 0) {
          onQuestionChange([...tempQuestions, response.data.data]);

          const newQuestion = response.data.data;
          const sectionIndex = sectionData.findIndex(
            (section) => section._id === newQuestion.surveySectionId
          );
          const guidedQuestions = tempQuestions.filter(
            (q) => q.guidedId === questionData.guidedId
          );

          let newPositionInSection = 0;
          if (sectionIndex >= 0) {
            const sectionQuestions = guidedQuestions.filter(
              (q) => q.surveySectionId === newQuestion.surveySectionId
            );

            newPositionInSection = sectionQuestions.length;

            for (let i = 0; i < sectionIndex; i++) {
              const otherSectionId = sectionData[i]._id;
              const otherSectionQuestions = guidedQuestions.filter(
                (q) => q.surveySectionId === otherSectionId
              );
              newPositionInSection += otherSectionQuestions.length;
            }
          } else {
            const lastSectionId = sectionData[sectionData.length - 1]._id;
            const lastSectionQuestions = guidedQuestions.filter(
              (q) => q.surveySectionId === lastSectionId
            );
            newPositionInSection = lastSectionQuestions.length;
          }

          newQuestion.questionPosition = newPositionInSection;

          guidedQuestions.forEach((question) => {
            if (question.surveySectionId !== newQuestion.surveySectionId) {
              if (
                sectionIndex >= 0 &&
                question.sectionPosition > sectionIndex
              ) {
                question.questionPosition += 1;
              }
            }
          });

          if (sectionIndex === -1) {
            const lastPosition = Math.max(
              ...guidedQuestions.map((q) => q.questionPosition),
              0
            );
            newQuestion.questionPosition = lastPosition + 1;
          }
        }
      }
    } catch (err) {
      showErrorMessage("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      const requestURI = isGuided
        ? "/api/guidedselling/deleteGuidedSellingQuestion"
        : "/api/survey/deleteSurveyQuestions";
      const response = await commonService(`${requestURI}/${id}`, "delete");
      if (response.status === 200) {
        showSuccessMessage(response.data.message);
        // window.location.reload();
      } else {
        showErrorMessage("Something went wrong");
      }
    } catch (err) {
      showErrorMessage(err);
    }
  };

  //debouce function i have implemented
  const debounce = (func, delay) => {
    return function (...args) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedAPICall = debounce(addQuestionAsync, 500);

  const handleAddQuestion = () => {
    if (isGuided) {
      addQuestionAsync({
        ...initialQuestionState,
        guidedId: surveyId,
        surveySectionId,
      });
    } else {
      addQuestionAsync({
        ...initialQuestionState,
        surveyId,
        surveySectionId,
      });
    }
  };

  const handleDuplicateQuestion = (question) => {
    const { _id, ...restQuestion } = question;
    let duplicateQuestion = { ...restQuestion };
    duplicateQuestion.questionName = `${duplicateQuestion.questionName} (copy)`;
    addQuestionAsync(duplicateQuestion, true);
  };

  const handleOndelete = (questionId, index) => {
    deleteQuestion(questionId);
    onQuestionChange(questionsList.filter((_) => _._id !== questionId));
  };
  const getCurrentQuestions = (sectionId) => {
    const list = questionsList.filter((x) => x.surveySectionId === sectionId);
    const questions_list =
      list.length > 0
        ? list.sort((a, b) => {
            return a - b;
          })
        : [];
    return questions_list;
  };

  const addRules = async (sectionIndex, index) => {
    try {
      const addRuleURI = isGuided
        ? "/api/guidedselling/addGuidedRules"
        : "/api/rules/addRules";
      let payload = {
        sectionId: surveySectionId,
        ruleIndex: `${sectionIndex}.${index}`,
        ruleName: `${sectionIndex}.${index}`,
        ...initialRules,
      };
      if (isGuided) {
        payload.guidedId = surveyId;
      } else {
        payload.surveyId = surveyId;
      }
      const response = await commonService(addRuleURI, "post", payload);
      if (response.status === 200) {
        setRulesJson([...rulesJson, response.data.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const getRulesData = async () => {
  //   try {
  //     const ruleURI = isGuided
  //       ? "/api/guidedselling/getGuidedRules"
  //       : "/api/rules/getRules";
  //     let payload = {
  //       sectionId: surveySectionId,
  //     };
  //     if (isGuided) {
  //       payload.guidedId = surveyId;
  //     } else {
  //       payload.surveyId = surveyId;
  //     }

  //     const response = await commonService(ruleURI, "post", payload);
  //     if (response.status === 200) {
  //       setRulesJson(response.data.data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getRulesData();
  // }, []);

  // Formula Input Type Frontend
  const [visibleFormulas, setVisibleFormulas] = useState({});

  const handleToggleFormula = (questionId) => {
    setVisibleFormulas({
      ...visibleFormulas,
      [questionId]: !visibleFormulas[questionId],
    });
  };

  return (
    <div className="section-question--setup">
      <div className="questionandrulescomponent">
        <div
          className={`question ${
            selectedElement === "question" ? "selected" : ""
          }`}
          onClick={() => setSelectedElement("question")}
        >
          <h5>QUESTION</h5>
        </div>
        <div
          className={`rules ${selectedElement === "rules" ? "selected" : ""}`}
          onClick={() => setSelectedElement("rules")}
        >
          <h5>RULES</h5>
        </div>
      </div>
      {selectedElement !== "rules" && (
        <table className="questionpart">
          <tbody>
            {getCurrentQuestions(surveySectionId) &&
              getCurrentQuestions(surveySectionId).length > 0 &&
              getCurrentQuestions(surveySectionId).map((question, index) => {
                return (
                  <>
                    <tr
                      key={`${sectionIndex}-${index}`}
                      className="section--setup"
                      id="survey-section-part"
                    >
                      <td className="drag section-buttons" id="question-id">
                        {question.questionType === "FORMULA" && (
                          <span
                            className="faAngleupanddown"
                            id="section-content"
                          >
                            <button
                              className="btn-icon-button"
                              onClick={() => handleToggleFormula(question._id)}
                            >
                              {visibleFormulas[question._id] ? (
                                <FaAngleUp />
                              ) : (
                                <FaAngleDown />
                              )}
                            </button>
                          </span>
                        )}

                        {`${sectionIndex}.${index + 1}`}
                      </td>
                      <td className="section-name">
                        <SurveyInputsTextField
                          className={"question_input"}
                          placeholder="Enter Question"
                          value={question}
                          name={"questionName"}
                          index={index}
                          handleChange={handleOnQuestionChange}
                          id="question-input"
                        />
                      </td>
                      <td className="section-buttons">
                        <button
                          className="btn-icon-button"
                          id="bs-info-container"
                        >
                          <BsInfo size={20} />
                        </button>
                      </td>
                      <td className="section-buttons" id="required-button">
                        <label
                          htmlFor={`required-${sectionIndex}-${index + 1}`}
                          id="checkbox-container"
                        >
                          <input
                            type="checkbox"
                            checked={question.isRequired}
                            onChange={(e) =>
                              handleOnQuestionChange(
                                index,
                                "isRequired",
                                e.target.checked,
                                question
                              )
                            }
                            id={`required-${sectionIndex}-${index + 1}`}
                          />
                          <span className="block" id="label-data">
                            {" "}
                            Required
                          </span>
                        </label>
                      </td>
                      <td className="section-buttons">
                        <CustomDropdown
                          options={questionOptions}
                          onSelect={(value) =>
                            handleOnQuestionChange(
                              index,
                              "questionType",
                              value,
                              question
                            )
                          }
                          value={question.questionType}
                          isBorderVisible={true}
                        />
                      </td>
                      <td
                        className="section-buttons"
                        id="react-icon-container"
                        style={{
                          border: "none",
                          borderTop: "0.1px solid #ccc",
                          borderBottom: "0.1px solid #ccc",
                        }}
                      >
                        <button
                          className="btn-icon-button"
                          onClick={() => handleDuplicateQuestion(question)}
                          id="bs-info-container"
                        >
                          <IoCopyOutline
                            size={20}
                            style={{ color: "#056289" }}
                          />
                        </button>
                      </td>
                      <td className="section-buttons" id="react-icon-container">
                        <button
                          className="btn-icon-button"
                          onDoubleClick={() =>
                            handleOndelete(question._id, index)
                          }
                          id="trash-container"
                        >
                          <FaRegTrashCan className="text-red-600" size={20} />
                        </button>
                      </td>
                    </tr>
                    {question.questionType === "FORMULA" &&
                      visibleFormulas[question._id] && (
                        <tr key={`formula-${sectionIndex}-${index}`}>
                          <td colSpan="7" className="formula-container">
                            <Formula />
                          </td>
                        </tr>
                      )}
                  </>
                );
              })}
          </tbody>
        </table>
      )}

      {selectedElement === "question" && (
        <button
          className="AddQue"
          onClick={handleAddQuestion}
          id="main-buttons"
        >
          + Add Question
        </button>
      )}

      {selectedElement === "rules" && (
        <div style={{ marginTop: "10px" }}>
          {rulesJson ? (
            <RulesConfigurator
              rulesJson={rulesJson}
              sectionIndex={sectionIndex}
              isGuided={isGuided}
              sectionData={sectionData}
              onRulesChange={setRulesJson}
              questions={questionsList}
            />
          ) : null}
          <div className="rules-box">
            <button
              onClick={() => addRules(sectionIndex, rulesJson.length + 1)}
              className="btn-linkk block mx-auto my-5"
              id="add-rules-button"
            >
              +Add Rules
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionSetup;
