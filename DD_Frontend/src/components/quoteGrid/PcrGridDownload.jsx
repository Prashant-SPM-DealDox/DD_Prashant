import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import { baseUrl } from "../../config";
// import '../../assets/css/quotes/Quotes.css';

const PcrGridDownload = () => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  const handleExcelDownload = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/quoteGrid/globalSearch`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.token}`, // Add authentication if needed
        },
      });

      if (response.ok) {
        const result = await response.json();
        const data = result.data;

        if (data && data.length > 0) {
          const dataWithoutAccountId = data.flatMap((QuoteGridData) => {
            if (QuoteGridData.Opportunities.length > 0) {
              return QuoteGridData.Opportunities.flatMap((opportunity) => {
                if (opportunity.Quotes && opportunity.Quotes.length > 0) {
                  return opportunity.Quotes.map((quote) => {
                    return {
                      ACCOUNT: QuoteGridData.accounts,
                      ACCOUNT_OWNER: `${QuoteGridData.owner.split(" ")[0]} ${
                        QuoteGridData.owner.split(" ")[1]
                      }`,
                      OPPORTUNITY: opportunity.opportunity_name,
                      OPPORTUNITY_CREATED_DATE: formatDate(opportunity.start),
                      OPPORTUNITY_LAST_MODIFIED: formatDate(opportunity.close),
                      STAGE: opportunity.stage,
                      QUOTE_NAME: quote.quotes_name,
                      TEMPLATE_TYPE: quote.template_type,
                    };
                  });
                } else {
                  return {
                    ACCOUNT: QuoteGridData.accounts,
                    ACCOUNT_OWNER: `${QuoteGridData.owner.split(" ")[0]} ${
                      QuoteGridData.owner.split(" ")[1]
                    }`,
                    OPPORTUNITY: opportunity.opportunity_name,
                    OPPORTUNITY_CREATED_DATE: formatDate(opportunity.start),
                    OPPORTUNITY_LAST_MODIFIED: formatDate(opportunity.close),
                    STAGE: opportunity.stage,
                    QUOTE_NAME: "N/A",
                    TEMPLATE_TYPE: "N/A",
                  };
                }
              });
            } else {
              return {
                ACCOUNT: QuoteGridData.accounts,
                ACCOUNT_OWNER: `${QuoteGridData.owner.split(" ")[0]} ${
                  QuoteGridData.owner.split(" ")[1]
                }`,
                OPPORTUNITY: "N/A",
                OPPORTUNITY_CREATED_DATE: "N/A",
                OPPORTUNITY_LAST_MODIFIED: "N/A",
                STAGE: "N/A",
                QUOTE_NAME: "N/A",
                TEMPLATE_TYPE: "N/A",
              };
            }
          });

          const ws = XLSX.utils.json_to_sheet(dataWithoutAccountId);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
          XLSX.writeFile(wb, "table_data.xlsx");
        } else {
          console.error("Data is empty or undefined.");
        }
      } else {
        console.error("Failed to fetch data for download.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button className="xlbuttnpeople" onClick={handleExcelDownload}>
        <FontAwesomeIcon icon={faFileExcel} id="downloadpeople" />
        <span id="xlpeopledowlabel">DOWNLOAD</span>
      </button>
    </div>
  );
};

export default PcrGridDownload;
