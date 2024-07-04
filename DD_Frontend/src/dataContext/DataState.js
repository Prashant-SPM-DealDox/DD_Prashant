import React, { useEffect, useState } from "react";
import DataContext from "./DataContext";
import { baseUrl } from "../config";

const DataState = (props) => {

  //useState to get the user as soon has the user login's
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  //useState to save securityRoles Data`
  const [securityRoleData, setSecurityRoleData] = useState([]);

  //useState to save all the lookupsDatafrom database
  const [lookupdatas, setLookupDatas] = useState([]);

  //useStates of particular Lookup
  const [stageLookups, setStageLookups] = useState([]);
  const [practiceLookups, setPracticeLookups] = useState([]);
  const [regionLookups, setRegionLookups] = useState([]);
  const [industryLookups, setIndustryLookups] = useState([]);
  const [verticalLookups, setVerticalLookups] = useState([]);
  const [typeLookups, setTypeLookups] = useState([]);
  const [catalogCategoryLookups, setcatalogCategoryLookups] = useState([]);
  const [permissionTypeLookups, setPermissionTypeLookups] = useState([]);
  const [opportunityTypeLookups, setOpportunityTypeLookups] = useState([]);
  const [roleGroupLookups, setRoleGroupLookups] = useState([]);

  //useState for saving lookups classNames
  const [lookupClassNames, setLookUpClassNames] = useState([]);

  //usestate for getting updated LookUps Data
  const [lookUpDataUpdated, setLookUpDataUpdated] = useState(false);

  //useState to save image
  const [logo, setLogo] = useState(null);

  //useState to save the logo of the company
  const [dbCompanyData, setDbCompanyData] = useState(null);

  //useState to save data of config page
  const [dbConfigData, setDbConfigData] = useState([]);

  //useState to save value of the option that is selected in config page
  const [selectedOptionGrouping07, setSelectedOptionGrouping07] = useState(null);

  //useStates for Global Search
  const [quoteDataNav, setQuoteDataNav] = useState([]);
  const [quoteDataGS, setQuoteDataGS] = useState({});

  // usestate for updating in globalsearch
  const [globalSearchUpdate, setGlobalSearchUpdate] = useState([]);

  //useState to get the status of config about logo permission
  const [logoPermissionUpdate, setLogoPermissionUpdate] = useState(false);


  //below function for getting the user securityRole permissions
  let securityRole;

  securityRole = user?.securityRole;

  securityRole = user?.people?.securityRole;

  //API to get the data of the Security Role
  const getSecurityRoleData = async () => {
    try {
      let response = await fetch(
        `${baseUrl}/api/security/getSpecificRoleData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ role: securityRole }),
        }
      );

      const json = await response.json();
      if (json) {
        setSecurityRoleData(json.data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //below function for getting all the Lookups Datas
  const fetchLookupsData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/lookups/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setLookupDatas(data.data);
      } else {
        // console.log("No Data Found");
      }
    } catch (error) {
      console.log("Error Fetching LookupData", error);
    }
  };

  //below function for getting the company Data / image
  const getCompanyData = async () => {
    try {
      let ADMIN_ID = user?.admin ? user?.admin?._id : user?.people.admin_id;
      const response = await fetch(`${baseUrl}/api/company/get/${ADMIN_ID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${user?.token}`,
        },
      });
      if (response.ok) {
        const companyData1 = await response.json();
        const companyData = companyData1.data[0];
        setDbCompanyData(companyData);
      } else {
        // console.error("Failed to fetch company data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  //below function for getting the permission of the logo from the config Page
  const fetchConfigData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/config/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const config = await response.json();
        if (config && config.data && config.data.length > 0) {
          setSelectedOptionGrouping07(config.data[0].value7);
        }
        setDbConfigData(config.data);
      } else {
        // console.error("Error fetching config data:", response.statusText);
      }
    } catch (error) {
      console.error("Error in fetchConfigData:", error);
    }
  };

  //Global Search Api function Call
  const getQuoteGridData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/quoteGrid/globalSearch`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const quotegridd = await response.json();
        if (quotegridd.data && quotegridd.data.length > 0) {
          setQuoteDataNav(quotegridd.data);

          const extractedaccIdName = quotegridd.data.map((account) => ({
            ACCOUNT_ID: account._id,
            account_name: account.accounts,
          }));

          const extractedoppIdName = quotegridd.data.flatMap((account) =>
            account.Opportunities.map((opportunity) => ({
              ACCOUNT_ID: opportunity.account_Id,
              account_name: opportunity.accounts,
              oppId: opportunity._id,
              oppName: opportunity.opportunity_name,
            }))
          );

          const extractedQuoteIdName = quotegridd.data.flatMap((account) =>
            account.Opportunities.flatMap((opportunity) =>
              opportunity.Quotes.map((quote) => ({
                quoteId: quote._id,
                quotes_name: quote.quotes_name,
                account_id: quote.account_id,
                account_name: quote.accounts,
                opp_id: quote.opportunity_id,
                oppName: quote.opportunity_name,
                surveyId: quote.template_type,
              }))
            )
          );

          setQuoteDataGS({
            extractedaccIdName,
            extractedoppIdName,
            extractedQuoteIdName,
          });
        }
      } else {
        // console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //calls the requied the api function calls when the user log's in
  useEffect(() => {
    if (user) {
      const securityRole = user?.securityRole || user?.people?.securityRole;
      if (securityRole) {
        getSecurityRoleData(securityRole);
      }
      fetchLookupsData();
      fetchConfigData();
      getCompanyData();
    }

  }, [user]);

  //get the company logo
  useEffect(() => {
    if (dbCompanyData) {
      setLogo(dbCompanyData.companyLogo);
    }
  }, [dbCompanyData]);

  //called when there is a change in the lookup datas
  useEffect(() => {
    if (user && lookUpDataUpdated) {
      fetchLookupsData();
      setLookUpDataUpdated(false);
    }
  }, [user, lookUpDataUpdated]);

  //  globalsearch
  useEffect(() => {
    if (user && globalSearchUpdate) {
      getQuoteGridData();
      setGlobalSearchUpdate(false)
    }
  }, [user, globalSearchUpdate]);

  //used to get the instant changes in the permission of logo in config page
  useEffect(() => {
    if (user && logoPermissionUpdate) {
      fetchConfigData();
      setLogoPermissionUpdate(false);
    }
  }, [user, logoPermissionUpdate]);

  //used set all the static Lookups-datas into its appropriate Lookups
  useEffect(() => {
    setStageLookups(
      lookupdatas
        .filter(
          (item) => item.class_name && item.class_name.toLowerCase() === "stage"
        )
        .flatMap((item) =>
          item.lookupOptions
            .filter((option) => !option.disable)
            .sort((a, b) => parseInt(a.value1) - parseInt(b.value1))
            .map((option) => option.lookups_name)
        )
    );

    setPracticeLookups(
      lookupdatas
        .filter(
          (item) =>
            item.class_name && item.class_name.toLowerCase() === "practice"
        )
        .flatMap((item) =>
          item.lookupOptions
            .filter((option) => !option.disable)
            .sort((a, b) => parseInt(a.value1) - parseInt(b.value1))
            .map((option) => option.lookups_name)
        )
    );

    setRegionLookups(
      lookupdatas
        .filter(
          (item) =>
            item.class_name && item.class_name.toLowerCase() === "region"
        )
        .flatMap((item) =>
          item.lookupOptions
            .filter((option) => !option.disable)
            .sort((a, b) => parseInt(a.value1) - parseInt(b.value1))
            .map((option) => option.lookups_name)
        )
    );

    setIndustryLookups(
      lookupdatas
        .filter(
          (item) =>
            item.class_name && item.class_name.toLowerCase() === "industry"
        )
        .flatMap((item) =>
          item.lookupOptions
            .filter((option) => !option.disable)
            .sort((a, b) => parseInt(a.value1) - parseInt(b.value1))
            .map((option) => option.lookups_name)
        )
    );

    setVerticalLookups(
      lookupdatas
        .filter(
          (item) =>
            item.class_name && item.class_name.toLowerCase() === "vertical"
        )
        .flatMap((item) =>
          item.lookupOptions
            .filter((option) => !option.disable)
            .sort((a, b) => parseInt(a.value1) - parseInt(b.value1))
            .map((option) => option.lookups_name)
        )
    );

    setTypeLookups(
      lookupdatas
        .filter(
          (item) =>
            item.class_name &&
            item.class_name.toLowerCase() === "type" &&
            item.disable != true
        )
        .flatMap((item) =>
          item.lookupOptions
            .filter((option) => !option.disable)
            .sort((a, b) => parseInt(a.value1) - parseInt(b.value1))
            .map((option) => option.lookups_name)
        )
    );

    setcatalogCategoryLookups(
      lookupdatas
        .filter(
          (item) =>
            item.class_name &&
            item.class_name.toLowerCase() === "catalog category"
        )
        .flatMap((item) =>
          item.lookupOptions
            .filter((option) => !option.disable)
            .sort((a, b) => parseInt(a.value1) - parseInt(b.value1))
            .map((option) => option.lookups_name)
        )
    );

    setPermissionTypeLookups(
      lookupdatas
        .filter(
          (item) =>
            item.class_name &&
            item.class_name.toLowerCase() === "permission type"
        )
        .flatMap((item) =>
          item.lookupOptions
            .filter((option) => !option.disable)
            .sort((a, b) => parseInt(a.value1) - parseInt(b.value1))
            .map((option) => option.lookups_name)
        )
    );

    setOpportunityTypeLookups(
      lookupdatas
        .filter(
          (item) =>
            item.class_name &&
            item.class_name.toLowerCase() === "opportunity type"
        )
        .flatMap((item) =>
          item.lookupOptions
            .filter((option) => !option.disable)
            .sort((a, b) => parseInt(a.value1) - parseInt(b.value1))
            .map((option) => option.lookups_name)
        )
    );

    setRoleGroupLookups(
      lookupdatas
        .filter(
          (item) =>
            item.class_name && item.class_name.toLowerCase() === "role group"
        )
        .flatMap((item) =>
          item.lookupOptions
            .filter((option) => !option.disable)
            .sort((a, b) => parseInt(a.value1) - parseInt(b.value1))
            .map((option) => option.lookups_name)
        )
    );

    setLookUpClassNames(lookupdatas.map((item) => item.class_name));
  }, [lookupdatas]);


  const state = {
    securityRoleData,
    stageLookups,
    practiceLookups,
    regionLookups,
    industryLookups,
    verticalLookups,
    typeLookups,
    catalogCategoryLookups,
    permissionTypeLookups,
    opportunityTypeLookups,
    roleGroupLookups,
    lookupdatas,
    setLookUpDataUpdated,
    lookupClassNames,
    quoteDataGS,
    globalSearchUpdate,
    setGlobalSearchUpdate,
    logo,
    selectedOptionGrouping07,
    setUser,
    setLogoPermissionUpdate
  };

  return (
    <DataContext.Provider value={state}>{props.children}</DataContext.Provider>
  );
};

export default DataState;
