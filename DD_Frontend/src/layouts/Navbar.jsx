import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaSearch, FaTimes, FaUser } from "react-icons/fa";
import Modal from "react-modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DImage from "../assets/Images/DImage.png";
import "../assets/css/layout/layout.css";
import DataContext from "../dataContext/DataContext.js";
import { encryptData } from "../utils/common.js";
import useIdle from "../utils/useIdleTimer.js";
Modal.setAppElement("#root");

const Navbar = () => {
  const {
    quoteDataGS,
    globalSearchUpdate,
    setGlobalSearchUpdate,
    logo,
    selectedOptionGrouping07,
  } = useContext(DataContext);


  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [idleTime, setIdleTime] = useState(10);
  const [isActiveTimeout, setIsActiveTimeout] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [maintenanceVal, setMaintenanceVal] = useState(30000);
  const [activeRemainingTime, setActiveRemainingTime] = useState(0);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      padding: "0px",
      borderRadius: "10px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  let handleMaintenance = () => {
    navigate("/maintenance");
  };
  const handleIdle = () => {
    setShowModal(true); //show modal
    setIsOpen(true);
    setRemainingTime(15); //set 15 seconds as time remaining
  };
  const closeModal = () => {
    // console.log("closeModal--->");
    setIsOpen(false);
  };
  const closeActiveModal = () => {
    setActiveIsOpen(false);
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeModalIsOpen, setActiveIsOpen] = useState(false);
  const { isIdle, getLastActiveTime, getRemainingTime, start } = useIdle({
    onIdle: handleIdle,
    idleTime: idleTime,
  });
  const [searchTerm, setSearchTerm] = useState();
  const [searchActive, setSearchActive] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isRecentSearch, setRecentSearch] = useState(false); // Add state for recent searches
  const [recentSearches, setRecentSearches] = useState(() => {
    // Retrieve recent searches from local storage if available, otherwise initialize with an empty array
    const storedRecentSearches = localStorage.getItem("recentSearches");
    return storedRecentSearches ? JSON.parse(storedRecentSearches) : [];
  });
  const [isOpenNavSearch, setOpenNavSearch] = useState(false);

  const dropdownRef = useRef(null);
  const navSearchDropDownRef = useRef(null);
  const mainSearchDropRef = useRef(null);

  useEffect(() => {
    let interval;

    if (isIdle && showModal) {
      interval = setInterval(() => {
        setRemainingTime(
          (prevRemainingTime) =>
            prevRemainingTime > 0 ? prevRemainingTime - 1 : 0 //reduces the second by 1
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isIdle, showModal]);
  useEffect(() => {
    let interval;
    if (activeModalIsOpen) {
      interval = setInterval(() => {
        setActiveRemainingTime(
          (prevRemainingTime) =>
            prevRemainingTime > 0 ? prevRemainingTime - 1 : 0 //reduces the second by 1
        );
      }, 1000);
    }

    return () => {
      // logoutUser();
      clearInterval(interval);
    };
  }, [isActiveTimeout]);
  // useEffect( () => {
  //   let interval;
  //   if (maintenanceVal) {
  //     interval = setInterval(async () => {
  //       var data =await maintenanceService("/api/status","get",{});
  //       console.log("data....>>",data);
  //       // handleMaintenance();
  //       if(!data || data?.status !== 200){
  //         handleMaintenance();
  //       }
  //     }, maintenanceVal);
  //   }

  // }, [maintenanceVal]);
  useEffect(() => {
    if (remainingTime === 0 && showModal) {
      // alert("Time out!");
      logoutUser();
      setShowModal(false);
      setIsOpen(false);
      navigate("/");
    }
  }, [remainingTime, showModal, navigate]); // this is responsoble for logging user out after timer is down to zero and they have not clicked anything

  const handleLogOut = () => {
    setShowModal(false);
    setIsOpen(false);
    closeActiveModal();
    navigate("/");
    logoutUser();
  };

  const handleStayLoggedIn = () => {
    setShowModal(false);
    setIsOpen(false);
    setActiveIsOpen(false);
  };
  const handleStayActiveLoggedIn = () => {
    let userInfo = localStorage.getItem("user");
    let json = JSON.parse(userInfo);
    json.timestamp = new Date();
    localStorage.setItem("user", JSON.stringify(json));
    setShowModal(false);
    setIsOpen(false);
    setActiveIsOpen(false);
  };

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  const startActiveSessionTimeout = (value) => {
    let user = localStorage.getItem("user");
    if (user) {
      let TokenData = JSON.parse(user);
      let loggedinTime =
        new Date(TokenData.timestamp).getTime() + value * 60000;
      let currentRemainingTime = new Date().getTime();
      console.log(
        "startActiveSessionTimeout--->",
        value,
        loggedinTime,
        new Date(loggedinTime),
        currentRemainingTime,
        new Date(currentRemainingTime)
      );
      if (loggedinTime <= currentRemainingTime) {
        setIsActiveTimeout(true);
        setActiveIsOpen(true);
      }
    }
  };

  const logoutUser = () => {
    localStorage.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("config");
    window.location.href = "/";
    // const input = document.getElementById("mysearch");
    // if (input) {
    //   input.value = "";
    // }
  };

  const renderCompanyImage = () => {
    if (selectedOptionGrouping07 === "YES") {
      return (
        // Default rendering (without company logo)
        <div className="logo_image" id="image_add">
          <>
            <img
              src={logo}
              style={{
                height: "100%",
                padding: "4px 4px",
                minWidth: "70px"
              }}
            />
            <p
              style={{
                color: "whitesmoke",
                fontSize: "large",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  marginRight: "3px",
                  color: "white",
                }}
              >
                Powered By
              </span>
              <img
                src={DImage}
                alt=""
                id="Dimage"
                style={{
                  maxWidth: "45px",
                  maxHeight: "20px",
                  marginRight: "10px",
                }}
              />
            </p>
          </>
          <FontAwesomeIcon
            icon={faUserCircle}
            style={{
              width: "20px",
              height: "20px",
              color: "gray",
              display: "none",
            }}
          />
        </div>
      );
    }
  };
  // const handleLogoutClick = () => {
  //   // Clear local storage
  //   localStorage.clear();
  //   // Redirect or perform any other logout actions
  //   // For example, redirecting to the home page
  //   window.location.href = "/";
  // };
  const handleActiveCloseModal = () => {
    closeActiveModal();
    setActiveIsOpen(false);
  };

  // -----------global search--------------------------

  const handleIconClick = () => {
    // setRecentSearch(true);
    setOpenNavSearch(true);
    setSearchActive(true);
    // Toggle between recent searches and new search
    // if (!searchTerm) {
    //   setRecentSearch(true);
    // } else {
    //   setOpenNavSearch(!isOpenNavSearch);
    //   setSearchActive(true);
    // }
  };

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm) {
      setRecentSearch(false);
      setOpenNavSearch(true);
      setSearchActive(true);
    } else {
    }
  };

  const handleMouseOut = () => {
    if (searchTerm) {
      // Update recent searches
      const updatedRecentSearches = [
        searchTerm,
        ...recentSearches.filter((term) => term !== searchTerm),
      ].slice(0, 5);
      setRecentSearches(updatedRecentSearches);

      // Store recent searches in local storage
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedRecentSearches)
      );
    }
  };

  const handleClearClick = () => {
    const input = document.getElementById("mysearch");
    if (input) {
      input.value = "";
    }
    setOpenNavSearch(false);
    setSearchTerm("");
    setSearchActive(false);
    setRecentSearch(false);
  };
  const handleRecentSearchClick = (clickedSearchTerm) => {
    setSearchTerm(clickedSearchTerm);
    setOpenNavSearch(true);
    setSearchActive(true);
    setRecentSearch(false);
  };
  const handleDropdownClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Event listener to close the dropdown when clicking outside of it
  const handleClickOutside = (event) => {
    if (
      navSearchDropDownRef.current &&
      !navSearchDropDownRef.current.contains(event.target)
    ) {
      setOpenNavSearch(false);
      setSearchActive(false)
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const calculateDropdownHeight = () => {
    const totalItems =
      filteredQuoteDataGS.extractedaccIdName.length +
      filteredQuoteDataGS.extractedoppIdName.length +
      filteredQuoteDataGS.extractedQuoteIdName.length;
    const itemHeight = 100000000;
    const maxHeight = 300;
    return Math.min(totalItems * itemHeight, maxHeight);
  };

  const getFilteredData = () => {
    if (!searchTerm) return quoteDataGS; // Return all data if search term is empty

    const filterBySearchTermAccounts = (account) =>
      account.account_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const filterBySearchTermOpportunities = (opportunity) =>
      opportunity.oppName?.toLowerCase().includes(searchTerm.toLowerCase());

    const filterBySearchTermQuotes = (quote) =>
      quote.quotes_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const filteredData = {
      extractedaccIdName: quoteDataGS.extractedaccIdName.filter(
        filterBySearchTermAccounts
      ),
      extractedoppIdName: quoteDataGS.extractedoppIdName.filter(
        filterBySearchTermOpportunities
      ),
      extractedQuoteIdName: quoteDataGS.extractedQuoteIdName.filter(
        filterBySearchTermQuotes
      ),
    };

    return filteredData;
  };

  const filteredQuoteDataGS = getFilteredData();
  const isScrollNeeded =
    filteredQuoteDataGS &&
    (filteredQuoteDataGS.extractedaccIdName?.length > 2 ||
      filteredQuoteDataGS.extractedoppIdName?.length > 2 ||
      filteredQuoteDataGS.extractedQuoteIdName?.length > 2);
  const handleReload = (id) => {
    const encryptedId = encryptData(id);
    localStorage.setItem("personId", encryptedId);
    handleClearClick();
  };
  return (
    <div>
      <div className="navandbread">
        <nav>
          <div>
            <div
              ref={navSearchDropDownRef}
              className="search"
              style={{
                backgroundColor: searchActive ? "white" : "black",
                marginBottom: "4px",
              }}
            >
              <div
                className="icon"
                style={{
                  backgroundColor: searchActive ? "white" : "black",
                  marginBottom: "4px",
                }}
              >
                <FaSearch
                  onClick={handleIconClick}
                  id="fasearchicon"
                  style={{
                    color: searchActive ? "black" : "white",
                    marginBottom: "4px",
                  }}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Search..."
                  id="mysearch"
                  style={{
                    backgroundColor: searchActive ? "white" : "black",
                  }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onMouseOut={handleMouseOut}
                />
              </div>

              <span className="clear" onClick={handleClearClick}></span>
            </div>
            {/* {isRecentSearch && (
              <ul
                className={`searchRecentnav ${
                  isScrollNeeded ? "scrollable" : ""
                }`}
              >
                <div className="recentListsnav">
                  Recent Searches
                  <div
                    className="recentlist"
                    style={{ padding: "11px 5px 5px 5px" }}
                  >
                    {recentSearches.length > 0 ? (
                      recentSearches.map((item, index) => (
                        <li
                          ref={mainSearchDropRef}
                          className="dropdown-nav-content7"
                          key={index}
                          onClick={() => handleRecentSearchClick(item)}
                        >
                          {item}
                        </li>
                      ))
                    ) : (
                      <div
                        style={{
                          fontSize: "14px",
                          color: "black",
                          textAlign: "center",
                          padding: "50px 50px 50px 30px",
                        }}
                      >
                        No data found
                      </div>
                    )}
                  </div>
                </div>
              </ul>
            )} */}
          </div>

          {isOpenNavSearch && (
            <ul
              className={`searchdropdownnav ${isScrollNeeded ? "scrollable" : ""
                }`}
              style={{ maxHeight: calculateDropdownHeight() + "px" }} // Set the height dynamically
            >
              {filteredQuoteDataGS.extractedaccIdName.length > 0 ||
                filteredQuoteDataGS.extractedoppIdName.length > 0 ||
                filteredQuoteDataGS.extractedQuoteIdName.length > 0 ? (
                <>
                  <div>
                    <div className="accountsnavacc">ACCOUNTS</div>
                    <div className="acclist" style={{ padding: "5px" }}>
                      {filteredQuoteDataGS.extractedaccIdName.map(
                        (account) => (
                          <Link
                            onClick={() => {
                              handleReload(account.ACCOUNT_ID);
                            }}
                            to={`/accounts?id=${account.ACCOUNT_ID}`}
                            className="hover-link"
                            style={{ color: "black" }}
                            state={{
                              acc_key: account.ACCOUNT_ID,
                              acc_name: account.account_name,
                            }}
                          >
                            <li
                              className="dropdown-nav-content7"
                              key={account.ACCOUNT_ID}
                            >
                              {" "}
                              {account.account_name}
                            </li>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="accountsnavopp"> OPPORTUNITIES</div>
                    <div className="opplist" style={{ padding: "5px" }}>
                      {filteredQuoteDataGS.extractedoppIdName.map(
                        (opportunity) => (
                          <Link
                            className="hover-link"
                            style={{ color: "black" }}
                            to={`/opportunitiesdata?oppID=${opportunity.oppId}`}
                            state={{
                              acc_key: opportunity.ACCOUNT_ID,
                              acc_name: opportunity.account_name,
                              opp_id: opportunity.oppId,
                              oppName: opportunity.oppName,
                            }}
                            onClick={handleClearClick}
                          >
                            <li
                              className="dropdown-nav-content7"
                              key={opportunity.oppId}
                            >
                              {opportunity.oppName}
                            </li>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="accountsnavquotes"> QUOTES</div>
                    <div className="quoteslist" style={{ padding: "5px" }}>
                      {filteredQuoteDataGS.extractedQuoteIdName.map(
                        (quote) => (
                          <Link
                            className="hover-link"
                            style={{ color: "black" }}
                            to={`/guidedselling_new?&quotes=${quote.quoteId}&quoteName=${quote.quotes_name}&template=${quote.surveyId}`}
                            // to={`/guidedselling_new?opportunity=${quote.opp_id}&template=${quote.surveyId}&quoteId=${quote.quoteId}`}
                            state={{
                              acc_key: quote.account_id,
                              acc_name: quote.account_name,
                              opp_id: quote.opp_id,
                              oppName: quote.oppName,
                            }}
                            onClick={() => {
                              handleReload(quote.quoteId);
                              const delay = 10;
                              setTimeout(() => {
                                window.location.reload();
                              }, delay);
                            }}
                          >
                            <li
                              className="dropdown-nav-content7"
                              key={quote.quoteId}
                            >
                              {quote.quotes_name}
                            </li>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <li>No data found</li>
              )}
            </ul>
          )}

          {renderCompanyImage()}
          <div className="navset">
            <div className="dropdown" ref={dropdownRef}>
              <FaUser
                onClick={handleDropdownClick}
                id="profile"
                className="fa fa-user"
                style={{
                  fontSize: "20px",
                  color: dropdownVisible ? "#216c98" : "white",
                  marginRight: "20px",
                  color: "azure",
                }}
              />
              {dropdownVisible && (
                <div className="dropdown-content_navbar">
                  <Link to="/myprofile">My Profile</Link>
                  {/* <Link to="">What's New?</Link> */}
                  <span onClick={logoutUser}>
                    <Link to="/">Logout DealDox</Link>
                  </span>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
      {isIdle && showModal && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          overlayClassName={{
            base: "ReactModal__Overlay",
            afterOpen: "ReactModal__Overlay--after-open",
          }}
        >
          <span className="span_timeout">
            <label className="Header_Session_In_active_Timeout">
              In-Active Session Expiration Warning !
            </label>
          </span>
          <span className="Time_remaining">
            <p className="p_time">
              Your current session is about to expire due to inactivity.
            </p>
            <p className="p_time">
              Time remaining: {millisToMinutesAndSeconds(remainingTime * 1000)}
            </p>
          </span>
          <div className="modal-row">
            <button className="modal-btn" onClick={handleStayLoggedIn}>
              Stay Logged In
            </button>
            <button className="modal-btn" onClick={handleLogOut}>
              Logout Now
            </button>
          </div>
        </Modal>
      )}
      {isActiveTimeout && activeModalIsOpen && (
        <Modal
          isOpen={activeModalIsOpen}
          onRequestClose={closeActiveModal}
          style={customStyles}
          contentLabel="Active session timeout warning"
          overlayClassName={{
            base: "ReactModal__Overlay",
            afterOpen: "ReactModal__Overlay--after-open",
          }}
        >
          <div className="backgroundoverlay">
            <span className="span_timeout">
              <label className="Header_Session_Timeout">Session Timeout</label>
              <button className="close-btn" onClick={handleActiveCloseModal}>
                <FaTimes />
              </button>
            </span>
            <p className="Content_Time_msg">
              You're being timed out due to inactivity.
              <br />
              Please choose to stay signed in or log off.
              <br />
              Otherwise,you will be automatically logged off.
            </p>
            {/* Time remaining: {millisToMinutesAndSeconds(remainingTime * 1000)} */}

            <div className="modal-row">
              <button className="modal-btn" onClick={handleLogOut}>
                Log Off
              </button>
              <button className="modal-btn2" onClick={handleStayActiveLoggedIn}>
                Stay Logged In
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
