import React, {useContext, useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import "../../assets/css/quoteCreation/QuoteCreation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import CustomDropdown from "../../components/common/CustomDropdown";
import HelpRequest from "../../components/common/HelpRequest";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { baseUrl } from "../../config";
import { toast } from "react-hot-toast";
import DataContext from "../../dataContext/DataContext";
// import PromptUser from "../survey/PromptUser";

const QuoteCreation = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [template, setTemplate] = useState("");
  const data_state = useLocation();
  const acc_opp_id = data_state.state;
  const accKey = acc_opp_id?.acc_key;
  const accName = acc_opp_id?.acc_name;
  const oppName = acc_opp_id?.oppName;
  const oppID = acc_opp_id?.opp_id;

  const row = acc_opp_id;
  //  globalSearch

  const {setGlobalSearchUpdate } = useContext(DataContext);

  const [surveyNames, setSurveyNames] = useState([]);
  const [surveyData, setSurveyData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const isButtonDisabled = template.length === 0;
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelectTemplate = (selected) => {
    surveyData.forEach((item) => {
      if (item.title === selected) {
        setSelectedOption(item._id);
        setTemplate(item._id);
      }
    });
  };

  useEffect(() => {
    const getSurveyNames = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/survey/getSurveyGuidedSelling`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.ok) {
          const surveyNames = await response.json();
          setSurveyData(surveyNames.data);

          const surveyNamesWithTitles = surveyNames.data.map((item) => ({
            title: item.title,
            _id: item._id,
            update_type: item.update_type,
            notification: item.notification,
          }));
          setSurveyNames(surveyNamesWithTitles);
        } else {
          // console.log("Error: ", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (user !== "" && user !== null) {
      getSurveyNames();
    }
  }, [user]);

  const addQuotes = async (e) => {
    try {
      setButtonClicked(true);
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/quotes/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          acc_key: acc_opp_id.acc_key,
          opp_id: acc_opp_id.opp_id,
          survey_key: selectedOption,
          survey_name:
            surveyNames.find((item) => item._id === selectedOption)?.title ||
            "",
          accounts: acc_opp_id?.acc_name,
          opportunity_name: acc_opp_id?.oppName,
        }),
      });
      if (response.ok) {
        const quotes = await response.json();
        toast.success("Successfully created!");
        navigate(
          `/guidedselling_new?opportunity=${quotes.data.opportunity_id}&template=${quotes.data.template_type}&quotes=${quotes.data?._id}`,
          { state: acc_opp_id }
        );
        setGlobalSearchUpdate(true);
      } else {
        toast.error("Failed to create!");
      }
    } catch (error) {
      toast.error("Failed to create!");
    } finally {
      setLoading(false);
    }
  };

  const ForPropUser =
    surveyNames.find((item) => item._id === template)?.update_type ===
    "PROMPT USER";

  return (
    <div>
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
              // onClick={() => handleClick(accKey)}
              to={`/accounts?id=${accKey}`}
              className="breadcrumbs--link breadcrumbs--link_mid"
            >
              {accName}
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link
              to={`/opportunitiesdata?oppID=${oppID}`}
              state={row}
              className="breadcrumbs--link breadcrumbs--link_mid"
            >
              {oppName}
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link className="breadcrumbs--link breadcrumbs--link--active">
              New Quote
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />

      {/* {template && ForPropUser && (
        <PromptUser selectedSurveyId={template} surveyNames={surveyNames} />
      )} */}

      <div className="flex-container">
        <Sidebar />
        <div className="row-newquote">
          <div className="left-newquote">
            <div className="create_quote_header_div">
              <Link
                to="NewQuote.html"
                style={{ color: "white", textDecoration: "none" }}
              ></Link>
              <header className="createquoteheader">
                <Link
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "19px",
                  }}
                >
                  <FontAwesomeIcon icon={faAngleLeft} className="faAngleLeft" />
                </Link>
                <label className="guidedsellinglabel">USE GUIDED SELLING</label>
              </header>
            </div>
            {loading && (
              <div className="loader-container">
                <div className="loader"></div>
                <div className="showloding">Loading...</div>
              </div>
            )}
            {!loading && (
              <div className="template">
                <CustomDropdown
                  options={surveyNames.map((item) => item.title)}
                  onSelect={handleSelectTemplate}
                  label="GUIDED SELLING TEMPLATE"
                  customInput="guidedsellinginput"
                  value={
                    surveyNames.find((item) => item._id === template)?.title ||
                    ""
                  }
                  onChange={(value) => setTemplate(value)}
                  isBorderVisible={true}
                />

                <div className="createbtn">
                  {/* <Link> */}
                  <button
                    type="submit"
                    id="create"
                    // disabled={isButtonDisabled}
                    disabled={isButtonDisabled || buttonClicked}
                    onClick={(e) => {
                      addQuotes(e);
                    }}
                  >
                    CREATE
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCreation;
