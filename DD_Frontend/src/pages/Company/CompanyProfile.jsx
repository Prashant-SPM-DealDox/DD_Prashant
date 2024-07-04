import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import AdminSidebar from "../../layouts/AdminSidebar";
import "../../assets/css/company/CompanyProfile.css";
import { Link } from "react-router-dom";
import HeaderBar from "../../components/common/HeaderBar";
import InputTypes from "../../components/common/InputTypes";
import CustomDropdown from "../../components/common/CustomDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../../config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import DataContext from "../../dataContext/DataContext";
import { CONSTANTS } from "../../constants";
import { useNavigate } from "react-router-dom";

const CompanyProfile = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();

  // // Below line of code is used to avoide jumping URL's
  // const validatedUser = localStorage.getItem("validated");

  // if (validatedUser != "true") {
  //   navigate("/auth");
  // }

  const { securityRoleData } = useContext(DataContext);

  const companyProfilePagePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_company
      : "";

  const isReadOnly = companyProfilePagePermission === "readOnly";

  //Block the url jump by the permission of the user
  if(companyProfilePagePermission === "none"){
    navigate('/home')
  }


  // const [selectedOptionLanguage, setSelectedOptionLanguage] = useState(null);
  const [logoSrc, setLogoSrc] = useState(null);

  const handleProfileLogoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Data = e.target.result;
        setCompanyProfileData((prevState) => ({
          ...prevState,
          companyLogo: base64Data,
        }));
        setLogoSrc(URL.createObjectURL(file));
      };

      reader.readAsDataURL(file);
    }
  };

  // backend code start
  const [mode, setMode] = useState("create"); // Initially set to 'create'
  //useState to save data of DB
  const [companyProfileData, setCompanyProfileData] = useState({
    companyId: "",
    companyLogo: "",
    companyName: "",
    searchValue: "",
    userAuthorizationDomain: "",
    companyDomain: "",
    contactPersonFirstName: "",
    contactPersonLastName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
  });
  const handleInputChange = (fieldName, value) => {
    setCompanyProfileData({ ...companyProfileData, [fieldName]: value });
  };
  const handleSelect = (fieldName, selectedOption) => {
    setCompanyProfileData({
      ...companyProfileData,
      [fieldName]: selectedOption,
    });
  };

  const labelText =
    logoSrc || companyProfileData.companyLogo ? "CHANGE LOGO" : "UPLOAD LOGO";

  // adding company
  const addCompany = () => {
    const newCompData = {
      ...companyProfileData,
    };

    fetch(`${baseUrl}/api/company/add`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        // "Authorization": `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ newCompData }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Profile added successfully");
          return response.json();
        } else {
          throw new Error("error adding account");
        }
      })
      .then((data) => {
        const delay = 1000;
        setTimeout(() => {
          window.location.reload();
        }, delay);
      })
      .catch((error) => {
        console.error("error adding account:", error);
      });
  };

  // ------------------GET Company DATA---------------------
  const [dbCompanyData, setDbCompanyData] = useState([]);

  useEffect(() => {
    if (user) {
      const getcompanydata = async () => {
        try {
          let ADMIN_ID = user?.admin ? user?.admin?._id : user?.people.admin_id;
          const response = await fetch(
            `${baseUrl}/api/company/get/${ADMIN_ID}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${user?.token}`,
              },
            }
          );
          if (response.ok) {
            const company = await response.json();
            let userData = company.data;
            setDbCompanyData(userData);
          } else {
            // console.log("Error:", response.statusText);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getcompanydata();
    }
  }, [user]);

  useEffect(() => {
    if (dbCompanyData && dbCompanyData.length > 0) {
      setCompanyProfileData({
        companyId: dbCompanyData[0]?._id || "",
        companyLogo: dbCompanyData[0]?.companyLogo || "",
        companyName: dbCompanyData[0]?.companyName || "",
        searchValue: dbCompanyData[0]?.searchValue || "",
        userAuthorizationDomain:
          dbCompanyData[0]?.userAuthorizationDomain || "",
        companyDomain: dbCompanyData[0]?.companyDomain || "",
        contactPersonFirstName: dbCompanyData[0]?.contactPersonFirstName || "",
        contactPersonLastName: dbCompanyData[0]?.contactPersonLastName || "",
        phone: dbCompanyData[0]?.phone || "",
        email: dbCompanyData[0]?.email || "",
        street: dbCompanyData[0]?.street || "",
        city: dbCompanyData[0]?.city || "",
        state: dbCompanyData[0]?.state || "",
        country: dbCompanyData[0]?.country || "",
      });
      setMode("update"); // If data exists, switch to 'update' mode
    }
  }, [dbCompanyData]);

  // update company data

  const [toastShown, setToastShown] = useState(false);
  const handleUpdateCompany = () => {
    const newCompData = {
      ...companyProfileData,
    };

    fetch(`${baseUrl}/api/company/update/${companyProfileData.companyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newCompData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error adding Account");
        }
      })
      .then((data) => {
        if (!toastShown) {
          toast.success("Profile updated successfully");
          const delay = 1000;
          setTimeout(() => {
            window.location.reload();
          }, delay);
        }
        setToastShown(true);
      })
      .catch((error) => {
        console.error("Error Updating Account:", error);
      });
  };

  return (
    <div>
      <Navbar logoSrc={companyProfileData.companyLogo} />
      <AdminSidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link to="/home" className="breadcrumbs--link_mid">
              Home
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="/admin-company-profile" className="breadcrumbs--link_mid">
              Admin
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="" className="breadcrumbs--link--active">
              Company Profile
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      {/* -------------------------- */}

      <div className="Companydiv">
        <div className="right_company">
          <HeaderBar headerlabel="COMPANY PROFILE" />
        </div>
        <div className="company_main_div">
          <div
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            <label htmlFor="logoInput" id="logo_update">
              <img
                alt=""
                src={logoSrc || companyProfileData.companyLogo}
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  marginTop: "10px",
                  display: "block",
                  margin: "0 auto",
                  fontSize: "1px",
                }}
                aria-disabled={companyProfilePagePermission === "readOnly"}
              />
              {!logoSrc && !companyProfileData.companyLogo && (
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ width: "100px", height: "100px", color: "#216c98" }}
                />
              )}
              <span className="uploadlogolabel">{labelText}</span>
            </label>
            <input
              type="file"
              id="logoInput"
              style={{ display: "none" }}
              onChange={handleProfileLogoChange}
              accept="image/*"
            />
          </div>

          <div className="bmc_grid">
            <InputTypes
              type={"text"}
              showFlagText={true}
              TextLabel="COMPANY NAME"
              value={companyProfileData.companyName}
              onChange={(value) => handleInputChange("companyName", value)}
              readOnly={companyProfilePagePermission === "readOnly"}
            />
            <div id="Language">
              <CustomDropdown
                label="LANGUAGE"
                options={CONSTANTS.languagesOptions}
                value={companyProfileData.searchValue}
                onChange={(value) => handleInputChange("searchValue", value)}
                onSelect={(selectedOption) =>
                  handleSelect("searchValue", selectedOption)
                }
                readOnly={companyProfilePagePermission === "readOnly"}
              />
            </div>
          </div>
          <div className="bmc_user">
            <InputTypes
              type={"text"}
              showFlagText={true}
              TextLabel="USER AUTHORIZATION DOMAIN"
              value={companyProfileData.userAuthorizationDomain}
              onChange={(value) =>
                handleInputChange("userAuthorizationDomain", value)
              }
              readOnly={companyProfilePagePermission === "readOnly"}
            />
            <div id="company_domain">
              <InputTypes
                type={"text"}
                showFlagText={true}
                TextLabel="COMPANY DOMAIN"
                value={companyProfileData.companyDomain}
                onChange={(value) =>
                  handleInputChange("companyProfileData", value)
                }
                readOnly={companyProfilePagePermission === "readOnly"}
              />
            </div>
          </div>
          <div className="contact">
            <h4>CONTACT</h4>
          </div>
          <div className="bmc_admin">
            <div id="user_admin_0">
              <InputTypes
                type={"text"}
                showFlagText={true}
                TextLabel="CONTACT PERSON FIRST NAME"
                textlabelcustom="user_admin_0_label"
                value={companyProfileData.contactPersonFirstName}
                onChange={(value) =>
                  handleInputChange("contactPersonFirstName", value)
                }
                readOnly={companyProfilePagePermission === "readOnly"}
              />
            </div>
            <div id="user_admin_1">
              <InputTypes
                type={"text"}
                showFlagText={true}
                TextLabel="CONTACT PERSON LAST NAME"
                textlabelcustom="user_admin_1_label"
                value={companyProfileData.contactPersonLastName}
                onChange={(value) =>
                  handleInputChange("contactPersonLastName", value)
                }
                readOnly={companyProfilePagePermission === "readOnly"}
              />
            </div>
            <div id="user_admin_2">
              <InputTypes
                type={"number"}
                showFlagText={true}
                TextLabel="PHONE"
                value={companyProfileData.phone}
                onChange={(value) => handleInputChange("phone", value)}
                readOnly={companyProfilePagePermission === "readOnly"}
              />
            </div>
            <div id="user_admin_3">
              <InputTypes
                type={"email"}
                showFlagText={true}
                TextLabel="EMAIL"
                value={companyProfileData.email}
                onChange={(value) => handleInputChange("email", value)}
                readOnly={companyProfilePagePermission === "readOnly"}
              />
            </div>
          </div>
          <div className="admin_add">
            <div id="user_admin_4">
              <InputTypes
                type={"text"}
                showFlagText={true}
                TextLabel="STREET"
                value={companyProfileData.street}
                onChange={(value) => handleInputChange("street", value)}
                readOnly={companyProfilePagePermission === "readOnly"}
              />
            </div>
            <div id="user_admin5">
              <InputTypes
                type={"text"}
                showFlagText={true}
                TextLabel="CITY"
                value={companyProfileData.city}
                onChange={(value) => handleInputChange("city", value)}
                readOnly={companyProfilePagePermission === "readOnly"}
              />
            </div>
            <div id="user_admin_6">
              <InputTypes
                type={"text"}
                showFlagText={true}
                TextLabel="STATE"
                value={companyProfileData.state}
                onChange={(value) => handleInputChange("state", value)}
                readOnly={companyProfilePagePermission === "readOnly"}
              />
            </div>
            <div id="user_admin_7">
              <InputTypes
                type={"text"}
                showFlagText={true}
                TextLabel="COUNTRY"
                value={companyProfileData.country}
                onChange={(value) => handleInputChange("country", value)}
                readOnly={companyProfilePagePermission === "readOnly"}
              />
            </div>
          </div>
          {!isReadOnly && (
            <div className="update_button">
              <button
                className="company_update_button"
                onClick={mode === "create" ? addCompany : handleUpdateCompany}
              >
                {mode === "create" ? "CREATE" : "UPDATE"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
