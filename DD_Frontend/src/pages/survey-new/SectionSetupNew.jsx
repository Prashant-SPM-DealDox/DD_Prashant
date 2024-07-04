import React, { Fragment, useEffect, useRef, useState } from "react";
import QuestionSetup from "./QuestionSetupNew";
import {
  commonService,
  showErrorMessage,
  showSuccessMessage,
} from "../../utils/common";
import "../../assets/css/survey-new/survey-new.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const initialSectionState = {
  sectionName: "",
  isHide: false,
};

const SurveyInputsTextField = ({
  className,
  placeholder,
  value,
  handleChange,
  name,

  index,
  readOnly = false,
}) => {
  const inputRef = useRef(null);
  const inputValue = value.sectionName;

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
      value={inputValue}
      name={name}
      onChange={(e) => handleChange(index, name, e.target.value, value)}
      id="section-input-box"
      readOnly={readOnly}
    />
  );
};

const SectionSetupNew = ({
  isGuided = false,
  surveyId,
  data,
  questionList,
  onSectionChange,
  onQuestionChange = undefined,
  onDeleteSection,
  onDeleteQuestion,
  rulesJson = [],
  surveyPermission,
}) => {
  const [loading, setLoading] = useState(false);
  const [sectionsAndQuestions, setSectionsAndQuestions] = useState(
    data ? data : []
  );
  const [openSections, setOpenSections] = useState({});
  const debounceTimer = useRef(null);

  const isReadOnly = surveyPermission === "readOnly";

  const handleSectionOpenClose = (index) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [index]: !prevOpenSections[index],
    }));
  };

  // Debounce function
  const debounce = (func, delay) => {
    return function (...args) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  useEffect(() => {
    setSectionsAndQuestions(data);
  }, [data]);

  const handleOnSectionChange = (index, key, value, section) => {
    let tempSectionsAndQuestions = [...sectionsAndQuestions];
    const checkQuestionIndex = tempSectionsAndQuestions.findIndex(
      (x) => x._id === section._id
    );
    if (checkQuestionIndex > -1) {
      tempSectionsAndQuestions[checkQuestionIndex] = {
        ...tempSectionsAndQuestions[checkQuestionIndex],
        [key]: value,
      };
    }

    debouncedAPICall(tempSectionsAndQuestions[checkQuestionIndex]);
    setSectionsAndQuestions(tempSectionsAndQuestions);
    onSectionChange(tempSectionsAndQuestions);
  };

  const addSectionAsync = async (sectionData) => {
    setLoading(true);
    try {
      const reqURI = isGuided
        ? "/api/guidedselling/addGuidedSellingSections"
        : "/api/survey/addSurveySections";
      const response = await commonService(reqURI, "post", sectionData);
      if (response.status === 200) {
        let tempSections = [...sectionsAndQuestions];
        const checkSectionIndex = tempSections.findIndex(
          (x) => sectionData.hasOwnProperty("_id") && x._id === sectionData._id
        );
        if (checkSectionIndex < 0) {
          onSectionChange([...tempSections, response.data.data]);
        }
      }
    } catch (err) {
      showErrorMessage("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedAPICall = debounce(addSectionAsync, 800);

  const handleAddSection = () => {
    if (isGuided) {
      addSectionAsync({
        guidedId: surveyId,
        sectionPosition: sectionsAndQuestions.length + 1,
        ...initialSectionState,
      });
    } else {
      addSectionAsync({
        surveyId,
        sectionPosition: sectionsAndQuestions.length + 1,
        ...initialSectionState,
      });
    }
  };

  const deleteSection = async (surveySectionId) => {
    try {
      const requestURI = isGuided
        ? "/api/guidedselling/deleteGuidedSellingSection"
        : "/api/survey/deleteSurveySection";
      const response = await commonService(requestURI, "delete", {
        id: surveySectionId,
        surveyId: surveyId,
      });
      if (response.status === 200) {
        onDeleteSection();
        showSuccessMessage(response.data.message);
      }
    } catch (err) {
      showErrorMessage(err);
    }
  };
  //Sorted Section in Guidedselling
  const sortedSurveySection = () => {
    const section_list =
      sectionsAndQuestions.length > 0
        ? sectionsAndQuestions.sort((a, b) => {
            return a.sectionPosition - b.sectionPosition;
          })
        : [];
    return section_list;
  };

  const filterRulesBySectionId = (sectionId) => {
    return rulesJson.filter((x) => x.sectionId === sectionId);
  };

  return (
    <div className="section-question--setup mt-3">
      <table className="table-container">
        <tbody>
          {sortedSurveySection().length > 0 &&
            sortedSurveySection().map((section, index) => {
              return (
                <Fragment>
                  <tr
                    key={`section-grid-${index}`}
                    className="section--setup"
                    id="section-row-container"
                  >
                    <td
                      className="section-buttons"
                      onClick={() => handleSectionOpenClose(index)}
                      id="section-button-container"
                    >
                      <span className="faAngleupanddown" id="section-content">
                        {openSections[index] ? <FaAngleUp /> : <FaAngleDown />}
                      </span>
                      <span className="section-numbs" id="section-content">
                        {" "}
                        {/* {section.sectionPosition} */}
                        {index + 1}
                      </span>
                    </td>
                    <td className="section-name">
                      <SurveyInputsTextField
                        placeholder={"Enter Section"}
                        value={section}
                        name={"sectionName"}
                        index={index}
                        handleChange={handleOnSectionChange}
                        readOnly={surveyPermission === "readOnly"}
                      />
                    </td>
                    <td className="section-buttons">
                      <label
                        className="custom-checkbox"
                        id="checkbox-container"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={section.isHide}
                          name="isHide"
                          onChange={(e) =>
                            handleOnSectionChange(
                              index,
                              "isHide",
                              e.target.checked,
                              section
                            )
                          }
                        />
                        <span className="checkmarkbox"></span>
                        <label className="checkboxlabel"> Hide</label>
                      </label>
                    </td>
                    <td className="section-buttons" id="react-icon-container">
                      <button
                        className="btn-icon-button"
                        onDoubleClick={() => deleteSection(section._id)}
                        id="trash-container"
                      >
                        {/* <i className="fa fa-trash text-red-600"></i> */}
                        <FaRegTrashCan size={20} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    {!openSections[index] && (
                      <td colSpan={12}>
                        <QuestionSetup
                          key={surveyId + section._id}
                          isGuided={isGuided}
                          surveyId={surveyId}
                          sectionIndex={index + 1}
                          sectionData={sectionsAndQuestions}
                          surveySectionId={section._id}
                          allRules={filterRulesBySectionId(section._id)}
                          // rulesSectionId={section._id}
                          onQuestionChange={(data) => {
                            if (onQuestionChange) {
                              onQuestionChange(data);
                            }
                          }}
                          data={questionList}
                          onDeleteQuestion={onDeleteQuestion}
                          surveyPermission={surveyPermission}
                        />
                      </td>
                    )}
                  </tr>
                </Fragment>
              );
            })}
        </tbody>
      </table>

      <div id="add-section-container">
        {!isReadOnly ? (
          <button
            className="btn-link block mx-auto my-5"
            onClick={handleAddSection}
            id="add-section-button"
          >
            +Add Section
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default SectionSetupNew;
