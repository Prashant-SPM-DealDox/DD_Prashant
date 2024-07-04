import React, { useState, useEffect } from "react";
import CustomDropdown from "../common/CustomDropdown";
import InputTypes from "../common/InputTypes";
import "../../assets/css/templatecomps/TemplateGuided.css";

import numeral from "numeral";

const TemplateGuided = ({
  guidedSellingtogglebtn,
  quotesName,
  readOnly = true,
  netPrice,
  listPrice,
  cost,
  discount,
  margin,
  guidedDetails,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { token } = user;
  const [avgRateExpenses] = useState({
    avgRate: "0.00",
    expenses: "0.00",
    duration: "0.00",
    salesOrg: "DEFAULT",
  });

  // State variables for currency selection, exchange rates, and symbols
  const [selectedCurrency, setSelectedCurrency] = useState(" ");
  const optioncurrency = [
    "American Samoa - US Dollar (USD)",
    "Andorra - Euro (EUR)",
    "Guernsey - Pound Sterling (GBP)",
    "Japan - Yen (JPY)",
    "India - Indian Rupee (INR)",
  ];
  const [exchangeRates, setExchangeRates] = useState({
    " ": 1,
    USD: 1,
    EUR: 1.09,
    GBP: 0.72,
    JPY: 110.95,
    INR: 82.88,
  });
  const [currencySymbols, setCurrencySymbols] = useState({
    " ": " ",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    INR: "₹",
  });

  // Function to handle currency selection
  const handleSelectCurrency = (currency) => {
    const currencyCode = currency.match(/\(([^)]+)\)/)[1]; // Extracts the currency code within parentheses
    setSelectedCurrency(currencyCode);
  };

  // Function to convert price based on selected currency
  const convertPrice = (price) => {
    const convertedPrice = price * exchangeRates[selectedCurrency];
    const formattedPrice = numeral(convertedPrice).format("0,0.00");
    const currencySymbol = currencySymbols[selectedCurrency];
    return `${currencySymbol}${formattedPrice}`;
  };

  return (
    <div>
      {guidedSellingtogglebtn && (
        <div className="quotempid">
          <div className="quotempid2">
            <div className="templeft">
              <div className="containertemp1">
                <div id="contenttemp1">
                  <InputTypes
                    type={"text"}
                    showFlagText={true}
                    TextLabel="QUOTE NAME"
                    value={quotesName}
                    readOnly={readOnly}
                  />
                </div>
              </div>
              <div className="containertemp2">
                {/* <div id="contentdownb1">
                  <InputTypes
                     type={"text"}
                    showFlagText={true}
                    TextLabel="SALES ORG"
                    value={avgRateExpenses.salesOrg}
                    readOnly={readOnly}
                  />
                </div> */}

                <div id="contentdownb2">
                  <CustomDropdown
                    options={optioncurrency}
                    onSelect={handleSelectCurrency}
                    label="CURRENCY"
                    value={selectedCurrency}
                  />
                </div>

                <div id="contentdownb3">
                  <InputTypes
                    type={"text"}
                    showFlagText={true}
                    TextLabel="DURATION"
                    value={avgRateExpenses.duration}
                    readOnly={readOnly}
                  />
                </div>
                <div id="contentdownb4">
                  <InputTypes
                    type={"text"}
                    showFlagText={true}
                    TextLabel="AVG RATE"
                    value={avgRateExpenses.avgRate}
                    readOnly={readOnly}
                  />
                </div>
              </div>
            </div>
            <div className="tempright">
              <div className="containerquoteGuide1">
                <div id="listpricedd">
                  <InputTypes
                    type={"text"}
                    TextLabel="LIST PRICE"
                    showFlagText={true}
                    value={convertPrice(listPrice)}
                    readOnly={readOnly}
                  />
                </div>
                <div id="discountdd">
                  <InputTypes
                    type={"text"}
                    TextLabel="DISCOUNT"
                    showFlagText={true}
                    value={`${discount}%`}
                    readOnly={readOnly}
                  />
                </div>
                <div id="netpricedd">
                  <InputTypes
                    type={"text"}
                    TextLabel="NET PRICE"
                    showFlagText={true}
                    value={convertPrice(netPrice)}
                    readOnly={readOnly}
                  />
                </div>
              </div>
              <div className="containerqoute2">
                <div id="expensesdd">
                  <InputTypes
                    type={"text"}
                    TextLabel="EXPENSES"
                    showFlagText={true}
                    value={convertPrice(avgRateExpenses.expenses)}
                    readOnly={readOnly}
                  />
                </div>
                <div id="margindd">
                  <InputTypes
                    type={"text"}
                    TextLabel="MARGIN"
                    showFlagText={true}
                    value={`${margin}%`}
                    readOnly={readOnly}
                  />
                </div>
                <div id="costdd">
                  <InputTypes
                    type={"text"}
                    TextLabel="COST"
                    showFlagText={true}
                    value={convertPrice(cost)}
                    readOnly={readOnly}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateGuided;
