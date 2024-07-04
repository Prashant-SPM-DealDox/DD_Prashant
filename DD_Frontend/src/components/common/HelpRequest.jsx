import React, { useState } from "react";
import HelpIcon from "../../assets/Images/HelpIcon.png";
import "../../assets/css/common/HelpRequest.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import { useAuthContext } from "../../hooks/useAuthContext";
const HelpRequest = () => {
  const { user } = useAuthContext();

  const [helpRequest, setHelpRequest] = useState(false);

  // const userName = user ? user.admin.firstname || first_name : "";
  // const userEmail = user ? user.admin.email : "";


  const handleHelpRequest = () => {
    setHelpRequest(!helpRequest);
  };
  return (
    <div>
      <div className="helpbox" onClick={handleHelpRequest}>
        <button className="help">
          <img
            src={HelpIcon}
            alt="Help"
            style={{ height: "35px", width: "35px" }}
          />
        </button>

        {helpRequest &&
          window.location.replace(
            `https://spmglobaltech.atlassian.net/servicedesk/customer/portals`
          )}
      </div>
    </div>
  );
};

export default HelpRequest;
