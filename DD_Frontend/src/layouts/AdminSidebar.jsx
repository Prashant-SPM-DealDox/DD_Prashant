import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import {
  FaBullhorn,
  FaEye,
  FaFileImport,
  FaGlobe,
  FaLock,
  FaStamp,
  FaUserCircle,
  FaLink,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import DataContext from "../dataContext/DataContext";
import { useContext } from "react";

const AdminSidebar = ({ children }) => {
  const [showHooksMenu, setShowHooksMenu] = useState(false);
  const loaction = useLocation();

  const { securityRoleData } = useContext(DataContext);

  const adminCompanyProfilePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_company
      : "";
  const adminPeoplePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_people
      : "";
  const adminAccessPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_access
      : "";
  const adminConfigPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_config
      : "";
  const adminLookupsPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_lookups
      : "";
  const adminSecurityPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_security
      : "";
  const adminAlertPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_alerts
      : "";
  const adminImportsPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_imports
      : "";
  const adminHooksPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_hooks_status
      : "";
  const adminConfigHooksPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin_hooks_config
      : "";

  const isAdminCompanyProfile = adminCompanyProfilePermission === "none";
  const isAdminPeople = adminPeoplePermission === "none";
  const isAdminAccess = adminAccessPermission === "none";
  const isAdminConfig = adminConfigPermission === "none";
  const isAdminLookup = adminLookupsPermission === "none";
  const isAdminSecurity = adminSecurityPermission === "none";
  const isAdminAlert = adminAlertPermission === "none";
  const isAdminImports = adminImportsPermission === "none";
  const isAdminHooks = adminHooksPermission === "none";
  const isAdminCongig = adminConfigHooksPermission === "none";

  const menuItem = [
    {
      path: "/home",
      name: <span style={{ marginLeft: "4px" }}>HOME</span>,
      icon: <AiFillHome style={{ marginLeft: "5px" }} />,
    },
    {
      path: "/admin-company-profile",
      name: <span style={{ marginLeft: "-2px" }}>COMPANY</span>,
      icon: <FaGlobe style={{ marginLeft: "-3px" }} />,
      hidden: isAdminCompanyProfile,
    },
    {
      path: "/admin-company-profile",
      name: <span style={{ marginLeft: "2px" }}>PROFILE</span>,
      hidden: isAdminCompanyProfile,
    },
    {
      path: "/companyorgs",
      name: <span style={{ marginLeft: "5px" }}>ORGS</span>,
      hidden: isAdminCompanyProfile,
    },
    {
      path: "/people-admin-list",
      name: <span style={{ marginLeft: "2px" }}>PEOPLE</span>,
      icon: <FaUserCircle style={{ marginLeft: "3px" }} />,
      hidden: isAdminPeople,
    },
    {
      path: "/access",
      name: <span style={{ marginLeft: "2px" }}>ACCESS</span>,
      icon: <FaStamp />,
      hidden: isAdminAccess,
    },
    {
      path: "/config",
      name: <span style={{ marginLeft: "3px" }}>CONFIG</span>,
      icon: <FiSettings />,
      hidden: isAdminConfig,
    },
    {
      path: "/lookups",
      name: <span style={{ marginLeft: "-2px" }}>LOOKUPS</span>,
      icon: <FaEye />,
      hidden: isAdminLookup,
    },

    {
      path: "/security",
      name: <span style={{ marginLeft: "-2px" }}>SECURITY</span>,
      icon: <FaLock style={{ marginLeft: "-4px" }} />,
      hidden: isAdminSecurity,
    },
    // {
    //   path: "/admin-alerts",
    //   name: <span style={{ marginLeft: "2px" }}>ALERT</span>,
    //   icon: <FaBullhorn style={{ marginLeft: "5px" }} />,
    //   hidden: isAdminAlert
    // },
    // {
    //   path: "/imports",
    //   name: <span style={{ marginLeft: "-2px" }}>IMPORTS</span>,
    //   icon: <FaFileImport style={{ marginLeft: "-4px" }} />,
    //   hidden: isAdminImports
    // },

    // {
    //   path: "/hookconfig",
    //   name: <span style={{ marginLeft: "5px" }}>HOOKS</span>,
    //   icon: <FaLink style={{ marginLeft: "2px" }} />,
    //   hidden: isAdminHooks
    // },

    // {
    //   path: "/hookconfig",
    //   name: (
    //     <span style={{ marginLeft: "4px", marginTop: "20px" }}>CONFIG</span>
    //   ),
    //   active: loaction.pathname === "/hookconfig",
    //   hidden: isAdminCongig
    // },
  ];

  return (
    <div className="container">
      <div className="sidebarfix">
        <div className="sidebar">
          <div className="top-section"></div>
          {menuItem.map((item, index) => {
            if (item.hidden) {
              return null;
            }
            if (item.onClick) {
              return (
                <div
                  key={index}
                  className={`link ${item.active ? "active" : ""}`}
                  onclick={item.onClick}
                >
                  <div className="link_text">
                    <div className="icon">{item.icon}</div>
                    <div className="link_text">{item.name}</div>
                  </div>
                </div>
              );
            } else {
              return (
                <NavLink
                  to={item.path}
                  key={index}
                  className={`link ${item.active ? "active" : ""}`}
                >
                  <div className="link_text">
                    <div className="icon">{item.icon}</div>
                    <div className="link_text">{item.name}</div>
                  </div>
                </NavLink>
              );
            }
          })}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default AdminSidebar;
