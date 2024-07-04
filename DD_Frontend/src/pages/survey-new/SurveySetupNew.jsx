import React, { useEffect, useState, useRef } from "react";
import {
  CustomDropDown,
  CustomTextField,
} from "../../components/CustomInputs/Custom.inputs";
import Navbar from "../../layouts/Navbar";
import CatalogSidebar from "../../layouts/CatalogSidebar";
import { Link, useNavigate } from "react-router-dom";
import WriteFlexNew from "../../components/common/WriteFlexNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faTable } from "@fortawesome/free-solid-svg-icons";
import { CONSTANTS } from "../../constants";
import SectionSetupNew from "./SectionSetupNew";
import "../../assets/css/survey-new/survey-new.css";
import { LuGrid } from "react-icons/lu";
import { FaLessThan } from "react-icons/fa6";
import {
  commonService,
  showErrorMessage,
  showSuccessMessage,
  showDeleteMessage,
} from "../../utils/common";
// import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import SpreadSheet from "../../components/calcEngine/SpreadSheet";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";
import { toast } from "react-toastify";

const validateFields = [
  {
    name: "title",
    type: "string",
  },
  {
    name: "catelogStatus",
    type: "string",
  },
  {
    name: "templateUpdateType",
    type: "string",
  },
];

const initialSurveyState = {
  title: "*New Survey*",
  catelogCategory: "",
  catelogStatus: "IN PROCESS",
  isGlobal: false,
  isWide: false,
  templateUpdateType: "NO UPDATE",
  updateNotification: "",
};

const SurveySetupNew = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [currentSurveyId, setCurrentSurveyId] = useState(null);
  const [surveySections, setSurveySections] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [showInputFields, setShowInputFields] = useState(true);
  const [deleteSurvey, setDeleteSurvey] = useState(false);
  const buttonRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [surveyList, setSurveyList] = useState([]);
  const [selected, setSelected] = useState("");
  const [latestSurveyId, setLatestSurveyId] = useState("");
  const [formData, setFormData] = useState(initialSurveyState);
  const [allRules, setAllRules] = useState([]);

  const {
    securityRoleData,
    catalogCategoryLookups
  } = useContext(DataContext);



  const surveyPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].catalog_surevys
      : "";

      if(surveyPermission === "none"){
        navigate('/home');
    }  


  const {
    catelogCategory,
    title,
    catelogStatus,
    isGlobal,
    isWide,
    templateUpdateType,
    updateNotification,
  } = formData;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.type === "checkbox" || event.target.type === "radio"
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleCalcEngine = () => {
    if (showInputFields) {
      setShowInputFields(false);
    } else {
      setShowInputFields(true);
    }
  };

  const validateForm = (event = null) => {
    let error = {};
    if (event) {
      error = { ...errors };
      if (event.target.value === "") {
        error[event.target.name] = "required";
      } else {
        delete error[event.target.name];
      }
    } else {
      validateFields.forEach((field) => {
        if (field.type === "string" && formData[field.name] === "") {
          error[field.name] = "required";
        }
      });
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const checkValidation = (name) => {
    return errors.hasOwnProperty(name) ? true : false;
  };

  useEffect(() => {
    if (!params.id) {
      setCurrentSurveyId(null);
      setFormData(initialSurveyState);
    }
  }, [params.id]);

  const getSurveyListAsync = async () => {
    try {
      const response = await commonService("/api/survey/getSurvey", "get", {});
      if (response.status === 200) {
        const surveys = response.data.data;
        surveys.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setSurveyList(surveys);
        setLoading(false);

        if (surveys.length > 0) {
          setLatestSurveyId(surveys[0]._id);
          setSelected(surveys[0].title);
          navigate(`/setupnew/${surveys[0]._id}`);
        } else {
          setFormData(initialSurveyState);
        }
      }
    } catch (err) {
      showErrorMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (validateForm(null)) {
        const response = await commonService("/api/survey/addSurvey", "post", {
          surveyId: currentSurveyId,
          ...formData,
        });
        if (response.status === 200) {
          setCurrentSurveyId(response.data.survey_key);
          getSurveyListAsync();
          toast.success(response.data.status);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      if (params.id) {
        const response = await commonService(
          `/api/survey/deleteSurvey/${params.id}`,
          "delete",
          {}
        );
        if (response.status === 200) {
          setCurrentSurveyId(null);
          getSurveyListAsync();
          showDeleteMessage("Survey deleted successfully");
        }
      }
    } catch (err) {
      console.log(err);
      showErrorMessage("Something went wrong");
    }
  };

  const getAllRules = async (id) => {
    try {
      const response = await commonService(
        `/api/rules/getAllRule/${id}?requestType=survey`,
        "get"
      );
      if (response.status === 200) {
        setAllRules(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSurveyDetailsById = async (id) => {
    try {
      const response = await commonService(
        `/api/survey/getSurveyDetailsById/${id}`,
        "get",
        {}
      );
      if (response.status === 200 && response.data.data) {
        setCurrentSurveyId(response.data.data.surveyDetails?._id);
        const formResponse = {
          title: response.data.data?.surveyDetails?.title,
          catelogCategory: response.data.data?.surveyDetails?.catelogCategory,
          catelogStatus: response.data.data?.surveyDetails?.catelogStatus,
          isGlobal: response.data.data?.surveyDetails?.isGlobal,
          isWide: response.data.data?.surveyDetails?.isWide,
          templateUpdateType:
            response.data.data?.surveyDetails?.templateUpdateType,
          updateNotification:
            response.data.data?.surveyDetails?.updateNotification,
        };
        setFormData(formResponse);
        setSurveySections(
          response.data.data?.surveySections.length > 0
            ? response.data.data?.surveySections.map((section) => ({
                ...section,
                sectionId: section._id,
              }))
            : response.data.data?.surveySections
        );
        setQuestionsList(response.data.data?.surveyQuestions);
      }
    } catch (err) {
      console.log(err);
      showErrorMessage("Something went wrong");
    }
  };

  useEffect(() => {
    if (params?.id) {
      getAllRules(params?.id);
      getSurveyDetailsById(params?.id);
    }
  }, [params?.id]);

  const spreadsheetRef = React.useRef(null);

  const handleSaveButtonClick = () => {
    if (spreadsheetRef.current) {
      spreadsheetRef.current.addCalcData();
    }
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setDeleteSurvey(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <CatalogSidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link
              to="/home"
              className="breadcrumbs--link_mid"
              style={{ display: "inline", textDecoration: "none" }}
            >
              Home
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link
              to="/catalog-roles"
              className="breadcrumbs--link_mid"
              style={{ display: "inline", textDecoration: "none" }}
            >
              Catalog
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="" className="breadcrumbs--link breadcrumbs--link--active">
              Survey Setup
            </Link>
          </li>
        </ul>
      </div>
      <div className="survey-setup--layout">
        <div className="container max-w-full">
          <div className="survey-sidebar" id="survey-sideBar-container">
            <WriteFlexNew
              permission={surveyPermission}
              surveyList={surveyList}
              loading={loading}
              latestSurveyId={latestSurveyId}
              selected={selected}
              setSelected={setSelected}
              onUpdateSurveyList={getSurveyListAsync}
            />
          </div>
          <div className="survey-main" id="survey-right-container">
            <div className="template-container-box">
              <div></div>
              <span className="survey-template-heading">SURVEY TEMPLATE</span>
              <div className="survey-template-container">
                <button className="greyout-template-button">
                  CREATE A COPY
                </button>
                <button className="greyout-template-button">OVERWRITE</button>
              </div>
            </div>
            {showInputFields ? (
              <div className="flex" id="survey-first-row">
                <CustomTextField
                  name={"title"}
                  onChange={(e) => {
                    handleChange(e);
                    validateForm(e);
                  }}
                  value={title}
                  label={"TITLE"}
                  error={checkValidation("title")}
                  readOnly={surveyPermission === "readOnly"}
                />

                <div className="grid-buttons grid-btn" id="default-container">
                  <FontAwesomeIcon
                    icon={faClipboardList}
                    id="iconclip"
                    style={{ color: "#ccc" }}
                  />
                  Defaults
                </div>
                <div
                  className="grid-buttons grid-btn"
                  onClick={handleCalcEngine}
                  id="calc-container"
                >
                  <LuGrid id="calcIcon" />
                  Calc
                </div>
              </div>
            ) : (
              <div className="calc-button-container">
                <div className="calc-subButtons">
                  <button className="calc-button-sub-container">EXPORT</button>
                  <button className="greyout-template-button">
                    IMPORT FROM LOCAL FILE
                  </button>
                </div>
                <div className="calc-subButtons">
                  <button
                    className="calc-button-sub-container"
                    onClick={handleSaveButtonClick}
                  >
                    {" "}
                    SAVE
                  </button>
                  <button className="calc-button-sub-container">
                    RESUME CALCULATIONS
                  </button>
                </div>

                <div
                  className="back-button-container"
                  onClick={handleCalcEngine}
                >
                  <FaLessThan />
                  <button className="back-button">BACK</button>
                </div>
              </div>
            )}

            <div className="flex" id="survey-second-container">
              <CustomDropDown
                name={"catelogCategory"}
                onChange={(e) => {
                  handleChange(e);
                }}
                value={catelogCategory}
                label={"CATALOG CATEGORY"}
                options={catalogCategoryLookups}
                className={`${
                  templateUpdateType === ""
                    ? "cssClassWhenInputOutlineIsPresent"
                    : "cssClassWhenInputOutlineIsNotPresent"
                }`}
                readOnly={surveyPermission === "readOnly"}
              />

              <CustomDropDown
                name={"catelogStatus"}
                onChange={(e) => {
                  handleChange(e);
                  validateForm(e);
                }}
                value={catelogStatus}
                label={"CATALOG STATUS"}
                options={CONSTANTS.catalogStatus_options}
                error={checkValidation("catelogStatus")}
              />
              <div className="grid-buttons" id="global-container">
                <label className="custom-checkbox" id="checkbox-container">
                  <input
                    type="checkbox"
                    // checked={isGlobal}
                    // name="isGlobal"
                    // onChange={handleChange}
                    disabled
                  />
                  <span className="checkmarkbox"></span>
                  <label id="global-label"> Globals</label>
                </label>
              </div>
              <div className="grid-buttons" id="global-container">
                <label className="custom-checkbox" id="checkbox-container">
                  <input
                    type="checkbox"
                    // checked={isWide}
                    // name="isWide"
                    // onChange={handleChange}
                    disabled
                  />
                  <span className="checkmarkbox"></span>
                  <label className="wide-label"> Wide</label>
                </label>
              </div>
            </div>

            {showInputFields && (
              <div className="flex" id="survey-third-container">
                <CustomDropDown
                  name={"templateUpdateType"}
                  onChange={(e) => {
                    handleChange(e);
                    validateForm(e);
                  }}
                  value={templateUpdateType}
                  label={"TEMPLATE UPDATE TYPE"}
                  options={CONSTANTS.catalogupdate_options}
                  error={checkValidation("templateUpdateType")}
                />
                {templateUpdateType === "PROMPT USER" && (
                  <CustomTextField
                    name={"updateNotification"}
                    onChange={handleChange}
                    value={updateNotification}
                    placeholder={"Enter a message"}
                    label={"UPDATE NOTIFICATION"}
                    readOnly={surveyPermission === "readOnly"}
                  />
                )}
              </div>
            )}

            {showInputFields ? (
              <>
                <div className="text-center" id="saveDeleteButton">
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="theme-button mt-3"
                    id="theme-button"
                  >
                    {Object.keys(params).length > 0
                      ? "SAVE SURVEY"
                      : "SAVE SURVEY"}
                  </button>
                  {Object.keys(params).length > 0 && (
                    <button
                      type="button"
                      className="theme-delete mt-3"
                      ref={buttonRef}
                      onClick={() => {
                        if (!deleteSurvey) {
                          setDeleteSurvey(true);
                        } else {
                          if (catelogStatus !== "PUBLISHED") {
                            handleDelete();
                          }
                        }
                      }}
                      disabled={catelogStatus === "PUBLISHED"}
                      id={`${
                        deleteSurvey
                          ? "theme-delete-highlighted"
                          : "theme-delete"
                      }`}
                      style={{
                        backgroundColor:
                          catelogStatus === "PUBLISHED" ? "white" : "",
                        border:
                          catelogStatus === "PUBLISHED" ? "1px solid red" : "",
                        color:
                          catelogStatus === "PUBLISHED"
                            ? "rgb(185 185 185)"
                            : "",
                        cursor:
                          catelogStatus === "PUBLISHED"
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      DELETE SURVEY
                    </button>
                  )}
                </div>
                {currentSurveyId && (
                  <SectionSetupNew
                    surveyId={currentSurveyId ? currentSurveyId : params?.id}
                    data={surveySections}
                    questionList={questionsList}
                    onQuestionChange={setQuestionsList}
                    onSectionChange={setSurveySections}
                    rulesJson={allRules}
                    surveyPermission={surveyPermission}
                    onDeleteSection={() => getSurveyDetailsById(params?.id)}
                    onDeleteQuestion={() => getSurveyDetailsById(params?.id)}
                  />
                )}
              </>
            ) : (
              <div>
                <SpreadSheet survey_id={currentSurveyId} ref={spreadsheetRef} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveySetupNew;
