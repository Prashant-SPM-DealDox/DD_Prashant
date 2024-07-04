import React, { useState, useEffect } from "react";
import Sidebar from "../../layouts/Sidebar.jsx";
import Navbar from "../../layouts/Navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/home/Home.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { baseUrl } from "../../config";
import HelpRequest from "../../components/common/HelpRequest";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";

const Home = () => {

  const navigate = useNavigate();

  const { securityRoleData } = useContext(DataContext);

  const OpportunityPagePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].opportunity : "";


  const quotePagePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].quote : "";

  const [, setProjectOpen] = useState(false);
  const [, setOpportunitiesOpen] = useState(false);

  // const [homeSideBar, sethomeSidebar] = useState(false);
  // const [accountsOpen, setAccountsOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("MY RECENT QUOTES");
  const [activeButton1, setActiveButton1] = useState("REQUEST MY APPROVAL");
  const [isQuotesLoading, setIsQuotesLoading] = useState(false);
  const [isOpportunitiesLoading, setIsOpportunitiesLoading] = useState(false);

  const handleToggle = (setter, className) => {
    setter((prev) => !prev);
    setActiveButton(className);
  };
  const handleToggle1 = (setter, className) => {
    setter((prev) => !prev);
    setActiveButton1(className);
  };

  const [tableData, setTableData] = useState([]);
  const [tablesecondData, setTablesecondData] = useState([]);
  const [dbRecentData, setDbdRecentData] = useState([]);
  const { user } = useAuthContext();
  const acc_opp_ids = tableData.map((row) => {
    return {
      acc_id: row.ACCOUNT_ID,
      acc_name: row.ACCOUNT,
      opp_id: row.OPPORTUNITY_ID,
      oppName: row.OPPORTUNITY,
      quote_id: row.QUOTE_ID,
      template: row.TEMPLATE_TYPE,
      quotes: row.QUOTE_NAME,
    };
  });

  // ========================================================================================

  // Assuming this is part of your React component
  useEffect(() => {
    const getRecentQuotesData = async () => {
      setIsQuotesLoading(true);
      try {
        const response = await fetch(
          `${baseUrl}/api/quoteGrid/getgridrecentdata`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.ok) {
          const recentquote = await response.json();
          if (recentquote.data && recentquote.data.length > 0) {
            // Assuming data.data is an array of recent quotes with associated accounts and opportunities
            const updatedinitialData = recentquote.data.map((item) => ({
              ACCOUNT_ID: item.ACCOUNT_ID || item.Account?.acc_id,
              ACCOUNT: item.ACCOUNT || item.Account?.accounts,
              OPPORTUNITY_ID: item.OPPORTUNITY_ID || item.Opportunity?.opp_id,
              OPPORTUNITY: item.OPPORTUNITY || item.Opportunity?.opportunity_name,
              QUOTE_ID: item._id || item.quote?._id,
              QUOTE_NAME: item.quotes_name || item.quote?.quotes_name,
              TEMPLATE_TYPE: item.template_type || item.quote?.template_type,

              // Add other quote properties as needed
            }));

            setDbdRecentData(updatedinitialData);
            setTableData(updatedinitialData);
          }
          // Assuming setDbAccountData is used for recent quotes data
        } else {
          // console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.error(error);
        setIsQuotesLoading(false);
      }
      setIsQuotesLoading(false);
    };

    getRecentQuotesData(); // Call the function once the component mounts
  }, [user]);
  // =========================================================

  useEffect(() => {
    const getRecentOpportunitiesData = async () => {
      setIsOpportunitiesLoading(true);
      try {
        const response = await fetch(
          `${baseUrl}/api/quoteGrid/getopportunityrecentdata`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const recentopp = await response.json();
          if (recentopp.data && recentopp.data.length > 0) {
            const RecentOpportunitiesData = recentopp.data.map((item) => ({
              ACCOUNT_ID: item.ACCOUNT_ID || item.Account?.acc_id,
              ACCOUNT: item.ACCOUNT || item.Account?.accounts,
              OPPORTUNITY_ID: item._id || item.Opportunity?._id,
              OPPORTUNITY:
                item.opportunity_name || item.Opportunity?.opportunity_name,
              // Add other quote properties as needed
            }));
            setDbdRecentData(RecentOpportunitiesData);
            setTablesecondData(RecentOpportunitiesData);
          }
        } else {
          // console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.error(error);
        setIsOpportunitiesLoading(false);
      }
      setIsOpportunitiesLoading(false);
    };
    getRecentOpportunitiesData();
  }, [user]);

  // const handleOpenHomeSideBar = () => {
  //   sethomeSidebar(true);
  // };
  // const handleCloseHomeSideBar = () => {
  //   sethomeSidebar(false);
  // };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link to="./" className="breadcrumbs--link--active">
              Home
            </Link>
          </li>
        </ul>
        <hr className="hr" />
        <HelpRequest />
      </div>
      <div className="homeEntire">
        <div className="containerhome">
          <div className="main-contenthome">
            <div id="grid">
              <div className="home_grid1">
                <div className="btn">
                  <button
                    className={`bt ${activeButton === "MY RECENT QUOTES" ? "activeH" : ""
                      }`}
                    style={{ marginLeft: "30px" }}
                    onClick={() =>
                      handleToggle(setProjectOpen, "MY RECENT QUOTES")
                    }
                  >
                    RECENT QUOTES
                  </button>
                  {/* <button
                    className={`bt ${activeButton === "ALL RECENT" ? "activeH" : ""
                      }`}
                    onClick={() => handleToggle(setProjectOpen, "ALL RECENT")}
                  >
                    ALL RECENT
                  </button>  */}
                </div>

                <div
                  className="textData"
                  style={{ maxHeight: "500px", overflowY: "auto" }}
                >
                  <table className="myHome">
                    {isQuotesLoading ? (
                      <div className="spinner-container">
                        <div className="spinner"></div>
                        <div className="loading_page">Loading...</div>
                      </div>
                    ) : (
                      <tbody id="myHome_Tbody">
                        {tableData.map((row, index) => (
                          <tr key={index}>
                            <td className="myHomeTd">

                              {(quotePagePermission === 'readOnly') || (quotePagePermission === 'none') ? (
                                <span>{row.QUOTE_NAME}</span>
                              ) : (
                                <Link
                                  to={`/guidedselling_new?&quotes=${row.QUOTE_ID}&quoteName=${row.QUOTE_NAME}&template=${row.TEMPLATE_TYPE}`}
                                  state={{
                                    acc_key: row.ACCOUNT_ID,
                                    acc_name: row.ACCOUNT,
                                    opp_id: row.OPPORTUNITY_ID,
                                    oppName: row.OPPORTUNITY,
                                    quoteID: row.QUOTE_ID,
                                    quotesName: row.QUOTE_NAME,
                                    template: row.TEMPLATE_TYPE,
                                  }}
                                  id="hover-link"
                                >
                                  {row.QUOTE_NAME}
                                </Link>
                              )}
                              <br />{" "}
                              <span
                                style={{ color: "#216c98", fontWeight: "600" }}
                              >
                                {row.ACCOUNT} {row.OPPORTUNITY}
                              </span>
                            </td>
                            {/* Add more columns based on your data structure */}
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
              {/* <div className="home_grid2">
                <div className="btn">
                  <button className="btn2">ALERTS</button>
                </div>
                <div className="textData">
                  <textarea
                    name="recent"
                    id="box-2"
                    cols={30}
                    rows={15}
                    defaultValue={""}
                    readOnly
                  />
                </div>
              </div>
              <div className="home_grid3">
                <div className="btn">
                  <button
                    className={`bts ${
                      activeButton1 === "REQUEST MY APPROVAL" ? "activ" : ""
                    }`}
                    style={{ marginLeft: "20px" }}
                    onClick={() =>
                      handleToggle1(setOpportunitiesOpen, "REQUEST MY APPROVAL")
                    }
                  >
                    REQUEST MY APPROVAL
                  </button>
                  <button
                    className={`bts ${
                      activeButton1 === "MY SUBMISSIONS" ? "activ" : ""
                    }`}
                    onClick={() =>
                      handleToggle1(setOpportunitiesOpen, "MY SUBMISSIONS")
                    }
                  >
                    MY SUBMISSIONS
                  </button>
                </div>
                <div className="textData">
                  <textarea
                    name="recent"
                    id="box-3"
                    cols={30}
                    rows={15}
                    defaultValue={""}
                    readOnly
                  />
                </div>
              </div> */}
              <div className="home_grid4">
                <div className="btn">
                  <button className="btn2"> RECENT OPPORTUNITIES</button>
                </div>
                <div
                  className="textData"
                  style={{ maxHeight: "500px", overflowY: "auto" }}
                >
                  <table className="myHomeopp">
                    {isOpportunitiesLoading ? (
                      <div className="spinner-container">
                        <div className="spinner"></div>
                        <div className="loading_page">Loading...</div>
                      </div>
                    ) : (
                      <tbody id="myHomeopp_Tbody">
                        {tablesecondData.map((row, index) => (
                          <tr key={index}>
                            <td className="myHomeoppTd">
                              <div>
                                {(OpportunityPagePermission === 'readOnly') || (OpportunityPagePermission === 'none') ? (
                                  <span>{row.OPPORTUNITY}</span>
                                ) : (
                                  <Link
                                    to={`/opportunitiesdata?oppID=${row.OPPORTUNITY_ID}`}
                                    className="breadcrumbs--link_mid"
                                    id="hover-link"
                                    state={{
                                      acc_key: row.ACCOUNT_ID,
                                      acc_name: row.ACCOUNT,
                                      opp_id: row.OPPORTUNITY_ID,
                                      oppName: row.OPPORTUNITY,
                                    }}
                                  >
                                    {row.OPPORTUNITY}
                                  </Link>
                                )}


                                <br />
                                <span
                                  style={{
                                    color: "#216c98",
                                    fontWeight: "600",
                                  }}
                                >
                                  {" "}
                                  {row.ACCOUNT}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="sidepanel"
          style={{
            width: homeSideBar ? "20%" : "0%",
            position: homeSideBar ? "sticky" : "relative",
            top: homeSideBar ? "0px" : "2px",
            display: homeSideBar ? "block" : "none",
          }}
          id="sidepanel"
        >
          <SidePanel
            showTopAccounts={homeSideBar ? true : ""}
            showTopOpportuinity={homeSideBar ? true : ""}
            showTopProjects={homeSideBar ? true : ""}
            onClose={handleCloseHomeSideBar}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
