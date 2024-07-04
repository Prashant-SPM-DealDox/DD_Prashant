import React, { createContext, useContext, useEffect, useState } from "react";
import { baseUrl } from "../config";
import { useAuthContext } from "../hooks/useAuthContext";

const globalSearchContext = createContext();

export const useGlobalSearch = () => useContext(globalSearchContext);
export const GlobalSearchDc = ({ childern }) => {
  const { user } = useAuthContext();
  const [quoteDataNav, setQuoteDataNav] = useState([]);
  console.log(quoteDataNav);
  const [quoteDataGS, setQuoteDataGS] = useState({});
  console.log(quoteDataGS);

  const getQuoteGridData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/quoteGrid/getgriddata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const quotegridd = await response.json();
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
      } else {
        // console.log("Error:", response.statusText);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getQuoteGridData( );
    }
  }, [user]);
  const value = { quoteDataNav, quoteDataGS };
  return (
    <globalSearchContext.Provider value={value}>
      {childern}
    </globalSearchContext.Provider>
  );
};

// import React, { useEffect, useState } from "react";
// import DataContext from "./DataContext";
// import { baseUrl } from "../config";
// import { useAuthContext } from "../hooks/useAuthContext";

// const GlobalSearchContext =

// const GlobalSearchSDc = (props) => {
//   const { user } = useAuthContext();
//   const [quoteDataNav, setQuoteDataNav] = useState([]);
//   const [quoteDataGS, setQuoteDataGS] = useState({});
//   //   console.log(quoteDataGS);

//   const getQuoteGridData = async () => {
//     try {
//       const response = await fetch(`${baseUrl}/api/quoteGrid/getgriddata`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: `Bearer ${user.token}`,
//         },
//       });
//       if (response.ok) {
//         const quotegridd = await response.json();
//         setQuoteDataNav(quotegridd.data);

//         const extractedaccIdName = quotegridd.data.map((account) => ({
//           ACCOUNT_ID: account._id,
//           account_name: account.accounts,
//         }));

//         const extractedoppIdName = quotegridd.data.flatMap((account) =>
//           account.Opportunities.map((opportunity) => ({
//             ACCOUNT_ID: opportunity.account_Id,
//             account_name: opportunity.accounts,
//             oppId: opportunity._id,
//             oppName: opportunity.opportunity_name,
//           }))
//         );

//         const extractedQuoteIdName = quotegridd.data.flatMap((account) =>
//           account.Opportunities.flatMap((opportunity) =>
//             opportunity.Quotes.map((quote) => ({
//               quoteId: quote._id,
//               quotes_name: quote.quotes_name,
//               account_id: quote.account_id,
//               account_name: quote.accounts,
//               opp_id: quote.opportunity_id,
//               oppName: quote.opportunity_name,
//               surveyId: quote.template_type,
//             }))
//           )
//         );

//         setQuoteDataGS({
//           extractedaccIdName,
//           extractedoppIdName,
//           extractedQuoteIdName,
//         });
//       } else {
//         // console.log("Error:", response.statusText);
//       }
//     } catch (error) {
//       // console.log(error);
//     }
//   };

//   useEffect(() => {
//     getQuoteGridData();
//   }, [user]);
// };
// const globalSearchContext = {
//   quoteDataGS,
// };

// return (
//   //   <DataContext.Provider value={globalSearchContext}>
//   //     {props.children}
//   //   </DataContext.Provider>
//   <DataContext.Provider value={globalSearchContext}>
//     {props.childern}
//   </DataContext.Provider>
// );

// export default GlobalSearchSDc;
