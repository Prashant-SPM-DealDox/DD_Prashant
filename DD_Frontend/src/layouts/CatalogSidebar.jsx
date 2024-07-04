import React from "react";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import {
  FaBook,
  FaClipboard,
  FaClone,
  FaEye,
  FaPenSquare,
  FaShoppingCart,
  FaStamp,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import DataContext from "../dataContext/DataContext";
import { useContext } from "react";

const CatalogSidebar = ({ children }) => {
  const [showRolesMenu, setShowRolesMenu] = useState(true);
  const location = useLocation();

  const { securityRoleData } = useContext(DataContext);

  const catalogRolesPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].catalog_roles
      : "";
  const catalogRateCardPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].catalog_ratecard
      : "";
  const catalogExchangePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].catalog_exchange
      : "";
  const catalogContentPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].catalog_content
      : "";
  const catalogTemplatePermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].catalog_template
      : "";
  const catalogSurveysPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].catalog_surevys
      : "";
  const catalogSurveysWhereusedPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].catalog_surevys_whereused
      : "";
  const catalogDoctypesPermission =
    securityRoleData && securityRoleData.length > 0
      ? securityRoleData[0].catalog_doctypes
      : "";

  const isCatalogRoles = catalogRolesPermission === "none";
  const isCatalogRateCard = catalogRateCardPermission === "none";
  const isCatalogExchange = catalogExchangePermission === "none";
  const isCatalogContent = catalogContentPermission === "none";
  const isCatalogTemplate = catalogTemplatePermission === "none";
  const isCatalogSurveys = catalogSurveysPermission === "none";
  const isCatalogSurveysWhereused =
    catalogSurveysWhereusedPermission === "none";
  const isCatalogDoctypes = catalogDoctypesPermission === "none";

  const menuItem = [
    {
      path: "/home",
      name: <span style={{ marginLeft: "4px" }}>HOME</span>,
      icon: <AiFillHome style={{ marginLeft: "5px" }} />,
    },
    {
      path: "/catalog-roles",
      name: <span style={{ marginLeft: "5px" }}>ROLES</span>,
      icon: <FaStamp style={{ marginLeft: "2px" }} />,

      hidden: isCatalogRoles,
    },
    {
      path: "/catalog-roles",
      name: <span style={{ marginLeft: "5px" }}>SETUP</span>,
      hidden: isCatalogRoles,
    },
    // {
    //   path: "/rolesratecards",
    //   name: <span style={{ marginLeft: "-5px" }}>RATECARDS</span>,
    //   hidden: isCatalogRateCard,
    // },
    // {
    //   path: "/rolesexchange",
    //   name: <span style={{ marginLeft: "-5px" }}>EXCHANGE</span>,
    //   hidden: isCatalogExchange,
    // },
    // {
    //   path: "/items",
    //   name: <span style={{ marginLeft: "5px" }}>ITEMS</span>,
    //   icon: <FaShoppingCart style={{ marginLeft: "2px" }} />,
    // },
    {
      path: "/catalog-contents",
      name: <span style={{ marginLeft: "-1px" }}>CONTENT</span>,
      icon: <FaEye style={{ marginLeft: "-1px" }} />,
      hidden: isCatalogContent,
    },
    // {
    //   path: "/asset",
    //   name: <span style={{ marginLeft: "6px" }}>ASSET</span>,
    //   icon: <FaClipboard style={{ marginLeft: "3px" }} />,
    // },
    {
      path: "/template-quotes",
      name: <span style={{ marginLeft: "-6px" }}>TEMPLATES</span>,
      icon: <FaClone style={{ marginLeft: "-7px" }} />,
      hidden: isCatalogTemplate,
    },
    {
      path: "/setupnew",
      name: <span style={{ marginLeft: "-1px" }}>SURVEYS</span>,
      icon: <FaPenSquare style={{ marginLeft: "-1px" }} />,
      hidden: isCatalogSurveys,
    },
    {
      path: "/setupnew",
      name: <span style={{ marginLeft: "4px", marginTop: "20px" }}>SETUP</span>,
      active: location.pathname === "/setup",
      hidden: isCatalogSurveys,
    },
    // {
    //   path: "/whereused",
    //   name: <span style={{ marginLeft: "1px" }}>WHERE USED</span>,
    //   hidden: isCatalogSurveysWhereused,
    // },
    {
      path: "/doctypes",
      name: <span style={{ marginLeft: "-4px" }}>DOCTYPES</span>,
      icon: <FaBook style={{ marginLeft: "-5px" }} />,
      hidden: isCatalogDoctypes,
    },
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
                  onClick={item.onClick}
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

export default CatalogSidebar;
