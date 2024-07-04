import React, { useState } from "react";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import PcrGridQuote from "../../components/quoteGrid/QuoteGridPcr";
import "../../assets/css/quotes/Quotes.css";
import CustomDropdown from "../../components/common/CustomDropdown";
import { Link, useNavigate } from "react-router-dom";
import HelpRequest from "../../components/common/HelpRequest";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";


const Quotes = () => {

    const { securityRoleData } = useContext(DataContext);

    const quotePagePermission =
    securityRoleData && securityRoleData.length > 0 ? securityRoleData[0].quote : "";

    if(quotePagePermission === "none"){
      navigate('/home')
    }
  
  const optionQuoteHeader = ["PROJECT ", "QUOTE ", "TEAM VIEW "];
  const [, setOptionQuoteHeader] = useState(null);
  const handleQuoteHeaderOptions = (selectedOption) => {
    setOptionQuoteHeader(selectedOption);
  };
  // ag grid code end
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link to="/home" className="breadcrumbs--link_mid">
              Home
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link className="breadcrumbs--link--active">Quotes</Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />
      {/* -------------------------- */}
      <div className="row_quote">
        <div className="right_quote">
          <div className="quote_header">
            <div className="download_div">
              {/* <input className="downloadinput"></input>   */}
            </div>
            <CustomDropdown
              onSelect={handleQuoteHeaderOptions}
              options={optionQuoteHeader}
              content7Containerdiv="content7_Container_div"
              custuminput="header_input"
              value={"QUOTES"}
            />
            {/* <div className="refreshbtn">
              <button className="refreshbuttquote">
                <FontAwesomeIcon icon={faRefresh} id="refreshdownload" />
                <span id="refreshdownload_label">RELOAD</span>
              </button>
            </div> */}
          </div>

          <div className="pcrgridquotestart">
            <PcrGridQuote
            permission={quotePagePermission} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
