import React, { useEffect, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { commonService, showErrorMessage } from "../../utils/common";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/survey-new/survey-new.css";

const WriteFlexNew = ({loading, permission,selected ,setSelected,surveyList,latestSurveyId, onUpdateSurveyList }) => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [visibleItems, setVisibleItems] = useState(11);

  const isReadOnly = permission === "readOnly";

  const filterOptions = (text) => {
    let sortedSurveyList = Array.isArray(surveyList)
      ? surveyList.sort((a, b) => a.title.localeCompare(b.title))
      : [];
    return text === ""
      ? sortedSurveyList
      : sortedSurveyList.filter((x) =>
        x.title.toLowerCase().includes(text.toLowerCase())
      );
  };


  useEffect(() => {
    onUpdateSurveyList();
  }, []);

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) =>
      Math.min(prevVisibleItems + 11, surveyList.length)
    );
  };

  return (
    <div className="write-flex--new relative h-full" id="write-flex-new-container">
      <div className="write-flex--search">
        <FaSearch style={{ color: "#216c98" }} id="search-icon" />
        <input type="text" onChange={(e) => setSearchText(e.target.value)} />
      </div>
      <div className="writeflex-div">
        <div className="write-flex--list">
          {loading ? (
            <p>Fetching data</p>
          ) : filterOptions(searchText).length > 0 ? (
            <div>
              <ul>
                {filterOptions(searchText).slice(0, visibleItems).map((survey, index) => {
                  return (
                    <li
                      key={`${survey.title}-${index}`}
                      onClick={() => {
                        setSelected(survey.title);
                        navigate(`/setupnew/${survey._id}`);
                      }}
                      className={`${selected === survey.title ? "active" : ""} ${survey._id === latestSurveyId ? "latest-survey" : ""}`}
                    >
                      {survey.title}
                    </li>
                  );
                })}
              </ul>
              {filterOptions(searchText).length > 11 && (
                <button onClick={handleShowMore} className="WriteFlexViewMoree">
                  VIEW MORE
                </button>
              )}
            </div>
          ) : (
            <p>No surveys</p>
          )}
        </div>
      </div>
      {!isReadOnly && (
        <div className="apply-config" id="addNewContainer">
          <button
            className="guideApply"
            onClick={() => navigate("/setupnew")}
          >
            <FaPlus size={20} style={{ color: "#056289" }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default WriteFlexNew;

