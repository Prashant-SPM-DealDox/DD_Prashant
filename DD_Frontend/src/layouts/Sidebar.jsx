import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { IoBook } from "react-icons/io5";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdSupervisorAccount } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useAuthContext } from "../hooks/useAuthContext";
import { baseUrl } from "../config";
import DataContext from "../dataContext/DataContext";
import { useContext } from "react";

const Sidebar = ({ children }) => {
  const location = useLocation();

  //mapping of catalog pages path
  const pathMappingCatalog = {
    "catalog_roles": "catalog-roles",
    "catalog_content": "catalog-contents",
    "catalog_template": "template-quotes",
    "catalog_surevys": "setupnew",
    "catalog_doctypes": "doctypes",
    
  }

  const pathMappingAdmin = {

    "admin_company": "admin-company-profile",
    "admin_people": "people-admin-list",
    "admin_access":"access",
    "admin_config":"config",
    "admin_lookups":"lookups",
    "admin_security":"security"
  } 

  const { securityRoleData } = useContext(DataContext);

  const accountPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].account
      : "";
  const quotesPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].quote
      : "";
  const demandPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].demand_workbench
      : "";
  const forecastPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].forecast
      : "";
  const catalogPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].catalog
      : "";
  const adminPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].admin
      : "";

      const getCatlogDefaultPath = (x) => {
        let check = Object.keys(x).filter(x => x.includes("catalog")).filter(y=>((x[y]=='access')||((x[y]=='readOnly'))))
        return check.length > 0?check[1]:null
      }

      const getAdminDefaultPath = (x) => {
        let check = Object.keys(x).filter(x => x.includes("admin")).filter(y=>((x[y]=='access')||((x[y]=='readOnly'))))
        return check.length > 0?check[1]:null
      } 

  const isAccountHidden = accountPermission === "none";
  const isQuotesHidden = quotesPermission === "none";
  const isDemandHidden = demandPermission === "none";
  const isForecast = forecastPermission === "none";
  const isCatalogHidden = catalogPermission === "none";
  const isCatalogDefaultPath = securityRoleData[0]?getCatlogDefaultPath(securityRoleData[0]):"";
  const isAdminDefaultPath = securityRoleData[0]?getAdminDefaultPath(securityRoleData[0]):"";
  const isAdminHidden = adminPermission === "none";

  const menuItem = [
    {
      path: "/home",
      name: <span style={{ marginLeft: "5px" }}>HOME</span>,
      icon: <AiFillHome style={{ marginLeft: "5px" }} />,
    },
    {
      path: "/accounts",
      name: <span style={{ marginLeft: "-5px" }}>ACCOUNTS</span>,
      icon: <IoBook style={{ marginLeft: "-4px" }} />,
      hidden: isAccountHidden,
    },
    {
      path: "/quotes",
      name: "QUOTES",
      icon: <AiFillDollarCircle />,
      hidden: isQuotesHidden,
    },
    // {
    //   path: "/demand",
    //   name: "DEMAND",
    //   icon: <MdSupervisorAccount />,
    //   hidden: isDemandHidden
    // },
    // {
    //   path: "/forecast",
    //   name: <span style={{ marginLeft: "-3px" }}>FORECAST</span>,
    //   icon: <GoGraph />,
    //   hidden: isForecast
    // },

    {
      path: isCatalogDefaultPath?"/"+pathMappingCatalog[isCatalogDefaultPath]:"/catalog-roles",
      name: "CATALOG",
      icon: <FaEye />,
      hidden: isCatalogHidden,
    },
    // Conditionally add the "ADMIN" item based on isAdminUser
    {
      path: isAdminDefaultPath?"/"+pathMappingAdmin[isAdminDefaultPath]:"/admin-company-profile",
      name: <span style={{ marginLeft: "5px" }}>ADMIN</span>,
      icon: <FiSettings style={{ marginLeft: "5px" }} />,
      hidden: isAdminHidden,
    },
  ];
  const isActive = (path) => {
    if (location.pathname === path) {
      return true;
    }

    if (
      (location.pathname === "/opportunities" && path === "/accounts") ||
      (location.pathname === "/opportunitiesdata" && path === "/accounts") ||
      (location.pathname === "/guidedselling" && path === "/guidedselling") ||
      (location.pathname === "/guidedselling" && path === "/accounts") ||
      (location.pathname === "/quotecreation" && path === "/accounts") ||
      (location.pathname === "/guidedselling_new" && path === "/accounts") ||
      (location.pathname === "/opportunities" &&
        path === "/accounts/:accountIds")
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="container">
      <div className="sidebarfix">
        <div className="sidebar">
          {menuItem.map(
            (item, index) =>
              !item.hidden && (
                <NavLink
                  to={item.path}
                  key={index}
                  className={`link ${isActive(item.path) ? "active" : ""}`}
                >
                  <div className="link_text">
                    <div className="icon">{item.icon}</div>
                    <div className="link_text">{item.name}</div>
                  </div>
                </NavLink>
              )
          )}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
