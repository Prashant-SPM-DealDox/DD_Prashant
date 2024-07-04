// import React, { useState, useEffect } from "react";
// import "../../assets/css/addsection/AddAction.css";
// import CustomDropdown from "../../components/common/CustomDropdown";
// import DoctypeDropdown from "../../components/addsection/DoctypeDropdown";
// import CalcSheetPointer from "../../components/addsection/CalcSheetPointer";
// import ValueList from "../../components/addsection/ValueList";
// import DeleteAction from "../../components/addsection/DeleteAction";
// import "froala-editor/css/froala_editor.pkgd.min.css";
// import "froala-editor/css/froala_style.min.css";
// import FroalaEditorComponent from "react-froala-wysiwyg";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import ErrorMessage from "../../components/common/ErrorMessage";
// import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { baseUrl } from "../../config";
// import Cookies from "js-cookie";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaUserAlt } from "react-icons/fa";

// const Action = ({
//   survey_id,
//   sectionId,
//   rules_key,
//   key,
//   index,
//   sectionCount,
//   rulesectionCount,
//   actionCount,
//   onDelete,
//   surveySectionsData,
//   surveyQuestionsData,
//   optionshow,
//   optionQUE,
//   actionsData,
//   action,
// }) => {
//   const { user } = useAuthContext();
//   // const [actionSections, setActionSections] = useState([]);
//   const [savedSheetNames, setSavedSheetNames] = useState([]);
//   const [calc, setCalc] = useState(null);
//   const [calcTabTemplate, setCalcTabTemplate] = useState(action?action.calcTabTemplate?action.calcTabTemplate:"":"");
//   const [calcTab, setCalcTab] = useState(action?action.pcrCalcTab?action.pcrCalcTab:"":"");
//   const [calcCell, setCalcCell] = useState(action?action.pcrCalcCell?action.pcrCalcCell:"":"");
//   const [cellData, setCellData] = useState("");
//   const [valueData, setValueData] = useState("");
//   const [calcCellData, setCalcCellData] = useState([]);

//   const [, setDoctypeSelectoption] = useState([]);

//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedOption1, setSelectedOption1] = useState(null);

//   const [actionName, setActionName] = useState(action?action.survey_action_name?action.survey_action_name:"":"");
//   const [action_key, setAction_key] = useState(action?action._id?action._id:"":"");
//   const [actionSectionsQuestions, setActionSectionsQuestions] = useState(action?action.survey_actions_sections?action.survey_actions_sections:"":"");

//   const [displayCalcSheetPointer, setDisplayCalcSheetPointer] = useState(false);

//   const [margindisplayCalcSheetPointer, setMarginDisplayCalcSheetPointer] =
//     useState(false);
//   const [
//     displayCalcSheetPointerservicelevel,
//     setdisplayCalcSheetPointerservicelevel,
//   ] = useState(true);

//   const optionsaction = [
//     "SHOW SECTION",
//     "SHOW QUESTION",
//     "HIDE SECTION",
//     "HIDE QUESTION",
//     "SHOW VALIDATION",
//     "TEMPLATE MERGE",
//     "TEMPLATE OVERWRITE",
//     "QUOTE: UNMERGE",
//     "SURVEY: UNMERGE",
//     "QUOTE: REFRESH",
//     "SECTION: SET READ - ONLY",
//     "RESUME CALCULATIONS",
//     "STAGE: SET DURATION",
//     "STAGE: RESIZE +/- DAYS",
//     "STAGE: RESIZE +/-&",
//     "CONTENT: REMOVE",
//     "CONTENT: REMOVE DUPLICATES",
//     "STAGE: REMOVE",
//     "REFRESH FORMULAS",
//     "REFRESH CALCS & FORMULA ON APPLY",
//     "SURVEY: MERGE",
//     "DOCTYPES: SET DOCTYPES LIST",
//     "PROCESS CALC RANGE(PCR)",
//     "QUOTE: MERGE",
//     "SERVICE: REMOVE",
//     "BID TEAM: CLEAR",
//     "CONTENT: ADD CATALOG CONTENT",
//     "QUOTE:SET QUOTE NAME",
//     "QUOTE: SET DISCOUNT",
//     "QUOTE: SET ORG",
//     "SERVICE: ADD",
//     "SET CALC CELL",
//     "SET ANSWER ON APPLY",
//     "QUOTE: SET START DATE",
//     "STAGE: ADD",
//     "QUOTE: SET PRICING MODEL",
//     "CONTENT: ADD",
//     "CONTENT: REPLACE TAGGED CONTENT",
//     "CONTENT: REPLACE TAG",
//     "SERVICE: SET START DATE",
//     "SERVICE: UPDATE",
//     "STAGE: RESIZE +/-%",
//     "SET ANSWER",
//     "QUOTE: SET CUSTOM FIELD",
//     "QUOTE: SET CURRENCY",
//     "MAKE REQUIRED",
//   ];
//   const setAnswerQuestionOptions = ["item 1", "item 2", "item 3", "item 4"];

//   const optionHIDEQUE = [
//     "COMPANY",
//     "STRUCTURE",
//     "HOTEL",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const optionHIDESEC = [
//     "WATER",
//     "SKY",
//     "EARTH",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const removeDuplicatesOption = ["item 1", "item 2", "item 3"];
//   const optionTEMPLATEOVERIGHT = [
//     "RED",
//     "BLUE",
//     "YELLOW",
//     "ALWAYS",
//     "COMPLEX",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const pcrCalcTemplate = [
//     "01.SERVICES",
//     "03.TASKS",
//     "04.ROLES",
//     "05.ITEMS",
//     "13.HOURS BY DATES",
//     // "02.STAGES",
//     // "06.HOURS BY STAGE",
//     // "07.FTE BY STAGE",
//     // "08.HOURS BY MONTH",
//     // "09.FIXED MONTTHLY HOURS",
//     // "10.FTE BY MONTH",
//     // "11.HOURS BY WEEK",
//     // "12.FTE BY MONTH",
//     // "14.FTE BY DATES",
//     // "15.SET ANSWER",
//     // "16.SET ANSWER BY REFID",
//   ];
//   const optionQUOTEUNMERGE = [
//     "LOTUS",
//     "ROSE",
//     "SUNFLOWER",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const optionSURVEYUNMERGE = [
//     "LOTUS",
//     "ROSE",
//     "SUNFLOWER",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const optionQUOTEREFRESH = [
//     "LOTUS",
//     "ROSE",
//     "SUNFLOWER",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const optionSETDURATION = [
//     "CAR",
//     "BUS",
//     "BIKE",
//     "VANITA",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const optionSETREADONLY = [
//     "CAR",
//     "BUS",
//     "BIKE",
//     "VANITA",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const optionStagedays = [
//     "CAR",
//     "BUS",
//     "BIKE",
//     "VANITA",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const optionresize = [
//     "CAR",
//     "BUS",
//     "BIKE",
//     "VANITA",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const setCustomQuestionOptions = ["item 1", "item 2", "item 3", "item 4"];
//   const optioncontentremove = [
//     "CAR",
//     "BUS",
//     "BIKE",
//     "CAR",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const optionStageremove = [
//     "CAR",
//     "BUS",
//     "BIKE",
//     "BUS",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const optionssurveymerze = [
//     "vvvv",
//     "sssss",
//     "jjjjj",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const optionssurveymerzeAFTER = [
//     "bbbb",
//     "vvvvv",
//     "ggggg",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const optionsdoctype = [
//     "BAG",
//     "BOOK",
//     "HTML",
//     "REACTJS",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//   ];
//   const optionsdoctype1 = [
//     "BAG",
//     "BOOK",
//     "HTML",
//     "REACTJS",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//   ];
//   const optionsquotemerge1 = [
//     "HTML",
//     "REACTJS",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//   ];
//   const optionsquotemerge2 = [
//     "HTML",
//     "REACTJS",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//   ];
//   const optionsserviceremove1 = [
//     "HTML",
//     "REACTJS",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//   ];
//   const optionsserviceremove2 = [
//     "HTML",
//     "REACTJS",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//   ];
//   const makeRequiredOption = ["item 1", "item 2", "item 3", "item 4"];
//   const optioncatalogContent = [
//     "HTML",
//     "REACTJS",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//   ];

//   const optionSetAnswer = [
//     "HTML",
//     "REACTJS",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//   ];
//   const optionSetpricingmodel = [
//     "FIXED PRICE",
//     "MARGIN TARGET",
//     "SERVICE LEVEL",
//     "TIME AND MATERIALS",
//   ];
//   const optionReplaceTag = [
//     "BAG",
//     "BOOK",
//     "HTML",
//     "REACTJS",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//   ];
//   const optionTemplate = [
//     "BAG",
//     "BOOK",
//     "HTML",
//     "REACTJS",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//   ];
//   const optionService = [
//     "HOUSE",
//     "BUILDING",
//     "APARTMENT",
//     "OFFICE",
//     "CABIN",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const optionTemp = [
//     "BAG",
//     "BOOK",
//     "HTML",
//     "REACTJS",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//     "JAVA",
//     "PYTHON",
//   ];
//   const optionSer = ["CAR", "BUS", "BIKE", "BUS", "WHEN", "ALWAYS", "COMPLEX"];
//   const cataloglist = [
//     "HOUSE",
//     "BUILDING",
//     "APARTMENT",
//     "OFFICE",
//     "CABIN",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const cataloglist2 = [
//     "HOUSE",
//     "BUILDING",
//     "APARTMENT",
//     "OFFICE",
//     "CABIN",
//     "WHEN",
//     "ALWAYS",
//     "COMPLEX",
//   ];
//   const optionsetorg = ["ABC", "XYZ", "MNO", "PQR"];
//   const optionserviceadd = ["WINDOW", "DOOR", "GFD", "STU", "XML", "KML"];
//   const optionssetcalcell1 = ["AAA", "BBB", "CCC", "DDD", "EEE"];
//   // const pcrCalcTab = ["item 1", "item 2", "item 3"];
//   const optionssetcalctab2stageadd = ["AAA", "BBB", "CCC", "DDD", "EEE"];
//   const optionssetstageadd = ["AAA", "BBB", "CCC", "DDD", "EEE"];
//   const currencyList = [
//     "Afghanistan - Afghani (AFN)",
//     "Albania - Lek (ALL)",
//     "Algeria - Algerian Dinar (DZD)",
//     "American Samoa - US Dollar (USD)",
//     "Andorra - Euro (EUR)",
//     "Angola - Kwanza (AOA)",
//     "Anguilla - East Caribbean Dollar (XCD)",
//     "Antigua and Barbuda - East Caribbean Dollar (XCD)",
//     "Argentina - Argentine Peso (ARS)",
//     "Armenia - Armeniam Dram (AMD)",
//     "Aruba - Aruban Florin (AWG)",
//     "Australia - Australian Dollar (AUD)",
//     "Austria - Euro (EUR)",
//     "Azerbaijan - Azerbaijanian Manat (AZN)",
//     "Bahamas - Bahamian Dollar (BSD)",
//     "Bahrain - Bahraini Dinar (BHD)",
//     "Bangladesh - Taka (BDT)",
//     "Barbados - Barbados Dollar (BBD)",
//     "Belarus - Belarusian Ruble (BYN)",
//     "Belgium - Euro (EUR)",
//     "Belize - Belize Dollar (BZD)",
//     "Benin - CFA Franc (BCEAO) (XOF)",
//     "Bermuda - Bermudian Dollar (BMD)",
//     "Bhutan - Ngultrum (BTN)",
//     "Bolivia (Plurinat.State) - Boliviano (BOB)",
//     "Bonaire/S.Eustatius/Saba - US Dollar (USD)",
//     "Bosnia and Herzegovina - Convertible Mark (BAM)",
//     "Botswana - Pula (BWP)",
//     "Brazil - Brazilian Real (BRL)",
//     "British Indian Ocean Ter - US Dollar (USD)",
//     "British Virgin Islands - US Dollar (USD)",
//     "Brunei Darussalam - Brunei Dollar (BND)",
//     "Bulgaria - Bulgarian Lev (BGN)",
//     "Burkina Faso - CFA Franc (BCEAO) (XOF)",
//     "Burundi - Burundi Franc (BIF)",
//     "Cabo Verde - Cabo Verde Escudo (CVE)",
//     "Cambodia - Riel (KHR)",
//     "Cameroon - CFA Franc (BEAC) (XAF)",
//     "Canada - Canadian Dollar (CAD)",
//     "Cayman Islands - Cayman Islands Dollar (KYD)",
//     "Central African Republic - CFA Franc (BEAC) (XAF)",
//     "Chad - CFA Franc (BEAC) (XAF)",
//     "Channel Islands - Pound Sterling (GBP)",
//     "Chile - Chilean Peso (CLP)",
//     "China - Yuan Renminbi (CNY)",
//     "China, Hong Kong SAR - Hong Kong Dollar (HKD)",
//     "China, Macao SAR - Pataca (MOP)",
//     "Taiwan Province of China - New Taiwan Dollar (TWD)",
//     "Christmas Island - Australian Dollar (AUD)",
//     "Cocos (Keeling) Islands - Australian Dollar (AUD)",
//     "Colombia - Colombian Peso (COP)",
//     "Coordinating Working Party on Fishery Statistics (CWP)",
//     "Comoros - Comoro Franc (KMF)",
//     "Congo - CFA Franc (BEAC) (XAF)",
//     "Congo, Dem. Rep. of the - Congolese Franc (CDF)",
//     "Cook Islands - New Zealand Dollar (NZD)",
//     "Costa Rica - Costa Rican Colón (CRC)",
//     "Côte d'Ivoire - CFA Franc (BCEAO) (XOF)",
//     "Croatia - Croatian Kuna (HRK)",
//     "Cuba - Cuban Peso (CUP)",
//     "Curaçao - Netherlands Antillian Guilder (ANG)",
//     "Cyprus - Euro (EUR)",
//     "Czechia - Czech Koruna (CZK)",
//     "Denmark - Danish Krone (DKK)",
//     "Djibouti - Djibouti Franc (DJF)",
//     "Dominica - East Caribbean Dollar (XCD)",
//     "Dominican Republic - Dominican Peso (DOP)",
//     "Ecuador - US Dollar (USD)",
//     "Egypt - Egyptian Pound (EGP)",
//     "El Salvador - US Dollar (USD)",
//     "Equatorial Guinea - CFA Franc (BEAC) (XAF)",
//     "Eritrea - Nakfa (ERN)",
//     "Estonia - Euro (EUR)",
//     "Ethiopia - Ethiopian Birr (ETB)",
//     "Falkland Is.(Malvinas) - Falkland Islands Pound (FKP)",
//     "Faroe Islands - Danish Krone (DKK)",
//     "Fiji, Republic of - Fiji Dollar (FJD)",
//     "Finland - Euro (EUR)",
//     "France - Euro (EUR)",
//     "French Guiana - Euro (EUR)",
//     "French Polynesia - CFP Franc (XPF)",
//     "French Southern Terr - Euro (EUR)",
//     "Gabon - CFA Franc (BEAC) (XAF)",
//     "Gambia - Dalasi (GMD)",
//     "Georgia - Lari (GEL)",
//     "Germany - Euro (EUR)",
//     "Ghana - Ghana Cedi (GHS)",
//     "Gibraltar - Gibraltar Pound (GIP)",
//     "Greece - Euro (EUR)",
//     "Greenland - Danish Krone (DKK)",
//     "Grenada - East Caribbean Dollar (XCD)",
//     "Guadeloupe - Euro (EUR)",
//     "Guam - US Dollar (USD)",
//     "Guatemala - Quetzal (GTQ)",
//     "Guernsey - Pound Sterling (GBP)",
//     "Guinea - Guinea Franc (GNF)",
//     "Guinea-Bissau - CFA Franc (BCEAO) (XOF)",
//     "Guyana - Guyana Dollar (GYD)",
//     "Haiti - Gourde (HTG)",
//     "Honduras - Lempira (HNL)",
//     "Hungary - Forint (HUF)",
//     "Iceland - Iceland Króna (ISK)",
//     "India - Indian Rupee (INR)",
//     "Indonesia - Rupiah (IDR)",
//     "Iran (Islamic Rep. of) - Iranian Rial (IRR)",
//     "Iraq - Iraqi Dinar (IQD)",
//     "Ireland - Euro (EUR)",
//     "Isle of Man - Pound Sterling (GBP)",
//     "Israel - New Israeli Sheqel (ILS)",
//     "Italy - Euro (EUR)",
//     "Jamaica - Jamaican Dollar (JMD)",
//     "Japan - Yen (JPY)",
//     "Jersey - Pound Sterling (GBP)",
//     "Jordan - Jordanian Dinar (JOD)",
//     "Kazakhstan - Tenge (KZT)",
//     "Kenya - Kenyan Shilling (KES)",
//     "Kiribati - Australian Dollar (AUD)",
//     "Korea, Dem. People's Rep - North Korean Won (KPW)",
//     "Korea, Republic of - Won (KRW)",
//     "Kuwait - Kuwaiti Dinar (KWD)",
//     "Kyrgyzstan - Som (KGS)",
//     "Lao People's Dem. Rep. - Kip (LAK)",
//     "Latvia - Euro (EUR)",
//     "Lebanon - Lebanese Pound (LBP)",
//     "Lesotho - Loti (LSL)",
//     "Liberia - Liberian Dollar (LRD)",
//     "Libya - Libyan Dinar (LYD)",
//     "Liechtenstein - Swiss Franc (CHF)",
//     "Lithuania - Euro (EUR)",
//     "Luxembourg - Euro (EUR)",
//     "Macedonia, Fmr Yug Rp of - Denar (MKD)",
//     "Madagascar - Malagasy Ariary (MGA)",
//     "Malawi - Malawi Kwacha (MWK)",
//     "Malaysia - Malaysian Ringgit (MYR)",
//     "Maldives - Rufiyaa (MVR)",
//     "Mali - CFA Franc (BCEAO) (XOF)",
//     "Malta - Euro (EUR)",
//     "Marshall Islands - US Dollar (USD)",
//     "Martinique - Euro (EUR)",
//     "Mauritania - Ouguiya (MRO)",
//     "Mauritius - Mauritius Rupee (MUR)",
//     "Mayotte - Euro (EUR)",
//     "Mexico - Mexican Peso (MXN)",
//     "Micronesia,Fed.States of - US Dollar (USD)",
//     "Moldova, Republic of - Moldovan Leu (MDL)",
//     "Mongolia - Tugrik (MNT)",
//     "Montenegro - Euro (EUR)",
//     "Montserrat - East Caribbean Dollar (XCD)",
//     "Morocco - Moroccan Dirham (MAD)",
//     "Mozambique - Metical (MZN)",
//     "Myanmar - Kyat (MMK)",
//     "Namibia - Namibian Dollar (NAD)",
//     "Nauru - Australian Dollar (AUD)",
//     "Nepal - Nepalese Rupee (NPR)",
//     "Netherlands - Euro (EUR)",
//     "New Caledonia - CFP Franc (XPF)",
//     "New Zealand - New Zealand Dollar (NZD)",
//     "Nicaragua - Córdoba Oro (NIO)",
//     "Niger - CFA Franc (BCEAO) (XOF)",
//     "Nigeria - Naira (NGN)",
//     "Niue - New Zealand Dollar (NZD)",
//     "Northern Mariana Is. - US Dollar (USD)",
//     "Norway - Norwegian Krone (NOK)",
//     "Oman - Rial Omani (OMR)",
//     "Pakistan - Pakistan Rupee (PKR)",
//     "Palau - US Dollar (USD)",
//     "Panama - Balboa (PAB)",
//     "Papua New Guinea - Kina (PGK)",
//     "Paraguay - Guaraní (PYG)",
//     "Peru - Sol (PEN)",
//     "Philippines - Philippine Peso (PHP)",
//     "Pitcairn Islands - New Zealand Dollar (NZD)",
//     "Poland - Zloty (PLN)",
//     "Portugal - Euro (EUR)",
//     "Puerto Rico - US Dollar (USD)",
//     "Qatar - Qatari Rial (QAR)",
//     "Réunion - Euro (EUR)",
//     "Romania - Romanian Leu (RON)",
//     "Russian Federation - Russian Ruble (RUB)",
//     "Rwanda - Rwanda Franc (RWF)",
//     "Saint Barthélemy - Euro (EUR)",
//     "Saint Helena - Saint Helena Pound (SHP)",
//     "Saint Kitts and Nevis - East Caribbean Dollar (XCD)",
//     "Saint Lucia - East Caribbean Dollar (XCD)",
//     "Saint-Martin - Euro (EUR)",
//     "St. Pierre and Miquelon - Euro (EUR)",
//     "Saint Vincent/Grenadines - East Caribbean Dollar (XCD)",
//     "Samoa - Tala (WST)",
//     "Sao Tome and Principe - Dobra (STD)",
//     "Saudi Arabia - Saudi Riyal (SAR)",
//     "Senegal - CFA Franc (BCEAO) (XOF)",
//     "Serbia - Serbian Dinar (RSD)",
//     "Seychelles - Seychelles Rupee (SCR)",
//     "Sierra Leone - Leone (SLL)",
//     "Singapore - Singapore Dollar (SGD)",
//     "Sint Maarten - Netherlands Antillian Guilder (ANG)",
//     "Slovakia - Euro (EUR)",
//     "Slovenia - Euro (EUR)",
//     "Solomon Islands - Solomon Islands Dollar (SBD)",
//     "Somalia - Somali Shilling (SOS)",
//     "South Africa - Rand (ZAR)",
//     "South Sudan - South Sudanese Pound (SSP)",
//     "Spain - Euro (EUR)",
//     "Sri Lanka - Sri Lanka Rupee (LKR)",
//     "Sudan - Sudanese Pound (SDG)",
//     "Suriname - Suriname Dollar (SRD)",
//     "Swaziland - Lilangeni (SZL)",
//     "Sweden - Swedish Krona (SEK)",
//     "Switzerland - Swiss Franc (CHF)",
//     "Syrian Arab Republic - Syrian Pound (SYP)",
//     "Tajikistan - Somoni (TJS)",
//     "Tanzania, United Rep. of - Tanzanian Shilling (TZS)",
//     "Thailand - Baht (THB)",
//     "Timor-Leste - US Dollar (USD)",
//     "Togo - CFA Franc (BCEAO) (XOF)",
//     "Tokelau - New Zealand Dollar (NZD)",
//     "Tonga - Pa'anga (TOP)",
//     "Trinidad and Tobago - Trinidad and Tobago Dollar (TTD)",
//     "Tunisia - Tunisian Dinar (TND)",
//     "Turkey - Turkish Lira (TRY)",
//     "Turkmenistan - Turkmenistan New Manat",
//     "Country name Currency name Currency ISO code",
//     "Uganda Uganda Shilling UGX",
//     "Ukraine Hryvnia UAH",
//     "United Arab Emirates UAE Dirham AED",
//     "United Kingdom Pound Sterling GBP",
//     "United States of America US Dollar USD",
//     "US Virgin Islands US Dollar USD",
//     "Uruguay Peso Uruguayo UYU",
//     "Uzbekistan Uzbekistan Sum UZS",
//     "Vanuatu Vatu VUV",
//     "Venezuela, Boliv Rep of Bolívar VEF",
//     "VietNam Dong VND",
//     "Wallis and Futuna Is. CFP Franc XPF",
//     "Western Sahara Moroccan Dirham MAD",
//     "Yemen Yemeni Rial YER",
//     "Zambia Zambian Kwacha ZMW",
//     "Zimbabwe Zimbabwe Dollar ZWL",
//   ];

//   const [showAction, setShowAction] = useState(false);

//   const toggleDropdownaction = (index) => {
//     setShowAction(!showAction);

//   };
//   const handleActionSelect = async (option, index) => {
//     setActionName(option)
//     await actionSubmit(option, "");
//     setSelectedOption(option);

//     // setActionSections((prevSections) =>
//     //   prevSections.map((action, i) =>
//     //     i === index ? { ...action, selectedOption: option } : action
//     //   )
//     // );
//   };

//   const handleActionDoctype = (option) => {
//     setDoctypeSelectoption(option);
//   };

//   const handleModelChange = (model) => {
//   };

//   const editorConfig = {
//     toolbarButtons: [
//       [
//         "fontFamily",
//         "fontSize",
//         "textColor",
//         "backgroundColor",
//         "|",
//         "bold",
//         "italic",
//         "underline",
//         "|",
//         "formatOL",
//         "formatUL",
//         "paragraphFormat",
//         "paragraphStyle",
//         "|",
//         "align",
//         "indent",
//         "outdent",
//         "|",
//         "insertLink",
//         "insertImage",
//         "insertTable",
//         "|",
//         "specialCharacters",
//         "print",
//         "undo",
//         "redo",
//       ],
//     ],
//   };

//   const handleActionSelect1 = async (selectedOption, index) => {
//     setSelectedTemplate(selectedOption);
//     setActionSectionsQuestions(selectedOption);
//     // setCalcTab(selectedOption)
//     setCalcTabTemplate(selectedOption)
//     // setActionSections((prevSections) =>
//     //   prevSections.map((action, i) =>
//     //     i === index
//     //       ? {
//     //           ...action,
//     //           selectedTemplate: selectedOption,
//     //         }
//     //       : action
//     //   )
//     // );
//     if (selectedOption === "FIXED PRICE") {
//       setDisplayCalcSheetPointer(true);
//       setMarginDisplayCalcSheetPointer(false);
//       setdisplayCalcSheetPointerservicelevel(false);
//     } else if (selectedOption === "MARGIN TARGET") {
//       setDisplayCalcSheetPointer(false);
//       setMarginDisplayCalcSheetPointer(true);
//       setdisplayCalcSheetPointerservicelevel(false);
//     } else {
//       setDisplayCalcSheetPointer(false);
//       setMarginDisplayCalcSheetPointer(false);
//       setdisplayCalcSheetPointerservicelevel(true);
//     }
//     await actionSubmit(actionName, selectedOption);

//   };

//   const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);

//   const handleCalendarChange = (date) => {
//     setSelectedCalendarDate(date);
//   };

//   const handleOptionChange = (newOption) => {
//     setSelectedOption(newOption);
//   };

//   // ====================================actionSubmit  =======================

//   const actionSubmit = async (action_name, section_question) => {
//     var survey_key = survey_id;
//     var section_key = sectionId;

//     var section_data = {
//       survey_key,
//       section_key,
//       rule_key: rules_key,
//       action_key: action_key,
//       action_num: `${sectionCount}.${rulesectionCount}.${actionCount-1}`,
//       action_name: action_name,
//       actions_sections: actionName === action_name ? actionSectionsQuestions: "",
//       pcrCalcCell:actionName == "PROCESS CALC RANGE(PCR)" ? calcCell : "" ,
//       calcTab:actionName == "PROCESS CALC RANGE(PCR)" ? calcTab : "" ,
//       calcTabTemplate:actionName == "PROCESS CALC RANGE(PCR)" ? calcTabTemplate : "" ,
//       cell_data: calcCellData.map(({ cell, value }) => ({
//         celldata: cell,
//         valuedata: value,
//       })),
//     };
//     try {
//       const response = await fetch(`${baseUrl}/api/survey/addSurveyActions`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify(section_data),
//       });
//       if (response.ok) {
//         const survey = await response.json();
//         if (survey.status === "Success") {
//           setAction_key(survey.action_key);
//         }
//       }
//     } catch (error) {
//       alert(error);
//     }
//   };

//   // for template merge

//   const [templateId, setTemplateId] = useState("");
//   const [dbTemplateData, setDbTemplateData] = useState([]);
//   const [doctypePublished, setDoctypePublished] = useState([]);

//   const [selectedOptionsContentdoctype, setSelectedOptionsContentdoctype] =
//     useState([]);

//   useEffect(() => {
//     const gettemplatedata = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/api/template/get`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             // Authorization: `Bearer ${user.token}`,
//           },
//         });
//         if (response.ok) {
//           const template = await response.json();
//           setDbTemplateData(template.data);

//           if (dbTemplateData == null) {
//             try {
//               const tempDaata = template.data;
//             } catch (error) {
//               // console.log(error);
//             }
//           }
//         } else {
//           // console.log("Error:", response.statusText);
//         }
//       } catch (error) {
//         // console.log(error);
//       }
//     };

//     gettemplatedata();
//   }, [user,actionsData]);

//   useEffect(() => {
//     const getDoctypedata = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/api/doctype/get`, {
//           method: "GET",
//           headers: {
//             "Doctype-Type": "application/json",
//             // Authorization: `Bearer ${user.token}`,
//           },
//         });
//         if (response.ok) {
//           const doctype = await response.json();
//           // setDbDoctypeData(doctype.data);

//           setDoctypePublished(
//             doctype.data.filter((item) => item.status === "PUBLISHED")
//           );
//         } else {
//         }
//       } catch (error) {
//         // console.log(error);
//       }
//     };
//     getDoctypedata();
//   }, [user,actionsData]);
//   // Map dbTemplateData to create options for the dropdown

//   let templates =
//     dbTemplateData.length > 0
//       ? dbTemplateData.map((tempNames) => tempNames.quote_name)
//       : [];

//   const optionTEMPLATEMERGE = templates;

//   const [selectedTemplate, setSelectedTemplate] = useState(null);
// //  ================-------------------------------------========================
// //used UseEffect to set the Template Name to DB at First Select

// const handleActionSelectCalcTab = async (selectedOption) => {
//   setCalcTab(selectedOption);
//     await actionSubmit(actionName, selectedOption);

// };
// useEffect(() => {
//   if (calcTab !== null) {
//     actionSubmit(actionName, calcTab);
//   }
//   if (calcCell !== null) {
//     actionSubmit(actionName, calcCell);
//   }
//   if (calcTabTemplate !== null) {
//     actionSubmit(actionName, calcTabTemplate);
//   }
//   if (valueData !== null) {
//     actionSubmit(actionName, valueData);
//   }
//   if (calcCellData !== null) {
//     actionSubmit(actionName, calcCellData);
//   }
// }, [calcTab,calcCell,calcTabTemplate,,valueData,calcCellData]);

// const handleActionSelectTemplate =  (selectedOption) => {
//    setCalcTabTemplate(selectedOption);
// };

// const getCalcData = async () => {
//   const surveykey = survey_id;

//   try {
//     const response = await fetch(
//       `${baseUrl}/api/spread/display/data/getcalc`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify({
//           survey_key: survey_id,
//         }),
//       }
//     );

//     if (response.ok) {
//       const responseData = await response.json();

//       if (Array.isArray(responseData.data) && responseData.data.length > 0) {
//         const calcData = responseData.data[0];

//         if (calcData && calcData.data) {
//           // Parse JSON data
//           const jsonData = JSON.parse(calcData.data);
//           // Get sheet names
//           const sheetNames = Object.keys(jsonData.sheets);
//           setSavedSheetNames(sheetNames);

//           // Initialize an object to store cell values by sheet name
//           const cellValuesBySheet = {};

//           // Iterate through sheets
//           sheetNames.forEach((sheetName) => {
//             // Get sheet data
//             const sheetData = jsonData.sheets[sheetName].data.dataTable;

//             // Extract cell values with spreadsheet-style cell references
//             const cellValues = Object.entries(sheetData).reduce(
//               (acc, [row, row_data]) => {
//                 Object.entries(row_data).forEach(([col, cell_value]) => {
//                   const colIndex = parseInt(col);
//                   const rowIndex = parseInt(row);

//                   if (!acc[colIndex]) {
//                     acc[colIndex] = [];
//                   }

//                   acc[colIndex].push({
//                     cell: `${String.fromCharCode(65 + colIndex)}${
//                       rowIndex + 1
//                     }`,
//                     value: cell_value.value,
//                   });
//                 });

//                 return acc;
//               },
//               []
//             );

//             // Flatten the array of arrays into a single array
//             const flattenedCellValues = cellValues.flat();

//             // Store cell values in the object
//             cellValuesBySheet[sheetName] = flattenedCellValues;
//           });

//           // Optionally, update the spreadsheet
//           setCalc(jsonData); // Assuming jsonData is the spreadsheet data

//           // Get specified cell range from the calcCell state
//           const specifiedRange = calcCell;

//           // Get selected sheet name from the calcTab state
//           const selectedSheetName = calcTab;

//           // Log cell values from the specified range in the selected sheet
//           if (specifiedRange && selectedSheetName) {
//             const sheetValues = cellValuesBySheet[selectedSheetName];
//             if (sheetValues) {
//               const [startCell, endCell] = specifiedRange.split(":");
//               const startCol = startCell.charCodeAt(0) - 65;
//               const startRow = parseInt(startCell.slice(1)) - 1;
//               const endCol = endCell.charCodeAt(0) - 65;
//               const endRow = parseInt(endCell.slice(1)) - 1;

//               const specifiedRangeValues = sheetValues.filter((cell) => {
//                 const colNum = cell.cell.charCodeAt(0) - 65;
//                 const rowNum = parseInt(cell.cell.slice(1)) - 1;
//                 return (
//                   colNum >= startCol &&
//                   colNum <= endCol &&
//                   rowNum >= startRow &&
//                   rowNum <= endRow
//                 );
//               });

//               // Extract celldata and valuedata from specifiedRangeValues
//               const celldataValues = specifiedRangeValues.map(
//                 (cell) => cell.cell
//               );
//               const valuedataValues = specifiedRangeValues.map(
//                 (cell) => cell.value
//               );

//               // Set celldata and valuedata state
//               setCellData(celldataValues.join(", ")); // Assuming celldataValues is an array
//               setValueData(valuedataValues.join(", ")); // Assuming valuedataValues is an array

//               // Set calcCellData state
//               setCalcCellData(specifiedRangeValues);

//               setCalcCellData(specifiedRangeValues);

//             } else {

//             }
//           } else {
//           }
//         } else {

//         }
//       } else {
//       }
//     } else {
//     }
//   } catch (error) {
//     // console.error("Error fetching or processing data:", error);
//   }
// };
// useEffect(() => {
//   getCalcData();
// }, [survey_id, calcCell, calcTab]);
// // ==================----------------------------------===================
//   return (
//     <div key={action.key}>
//           <div className="actionmaindiv">
//             <button className="actionangle">
//               <FontAwesomeIcon
//                 icon={showAction ? faAngleUp : faAngleDown}
//                 id={`angledowaction-${action.key}`}
//                 onClick={() => toggleDropdownaction(index)}
//               />
//             </button>

//             <label className="labelaction">
//               Action - {sectionCount}.{rulesectionCount}.{action.actionCount}
//             </label>

//             <input
//               type="text"
//               className="inputaction"
//               value={
//                 actionName
//               }
//               onChange={(e) =>
//                 {setActionName(e.target.value)}
//               }
//               readOnly
//             />
//           </div>
//           {showAction && (
//             <div className="dropactionaction">
//               <div className="dropactionmain">
//                 <label className="labelaction2">
//                   {sectionCount}.{rulesectionCount}.{action.actionCount}
//                 </label>
//                 <CustomDropdown
//                   options={optionsaction}
//                   onSelect={(option) => handleActionSelect(option, index)}
//                   label="ACTION"
//                   value={
//                     actionName
//                   }
//                   onChange={(value) =>{setActionName(value)}}
//                     // setActionSections((prevSections) =>
//                     //   prevSections.map((a, i) =>
//                     //     i === index ? { ...a, selectedOption: value } : a
//                     //   )
//                     // )
//                 />
//                 {actionName === "SHOW SECTION" && (
//                   <div className="showsection">
//                     <CustomDropdown
//                       options={optionshow}
//                       onSelect={handleActionSelect1}
//                       label="SECTION"
//                       value={actionName == "SHOW SECTION" ? actionSectionsQuestions : ""}
//                       onChange={(value) =>{setActionSectionsQuestions(value)}}

//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}

//                 {actionName === "SHOW QUESTION" && (
//                   <div className="showquestion">
//                     <CustomDropdown
//                       options={optionQUE}
//                       onSelect={handleActionSelect1}
//                       label="QUESTION"
//                       value={actionName == "SHOW QUESTION" ? actionSectionsQuestions : ""}
//                       onChange={(value) =>{setActionSectionsQuestions(value)}}

//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "HIDE QUESTION" && (
//                   <div className="hidequestion">
//                     <CustomDropdown
//                       options={optionQUE}
//                       onSelect={handleActionSelect1}
//                       label="QUESTION"
//                       value={actionName == "HIDE QUESTION" ? actionSectionsQuestions : ""}
//                       onChange={(value) =>{setActionSectionsQuestions(value)}}

//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "HIDE SECTION" && (
//                   <div className="hidesection">
//                     <CustomDropdown
//                       options={optionshow}
//                       onSelect={handleActionSelect1}
//                       label="SECTION"
//                       value={actionName == "HIDE SECTION" ? actionSectionsQuestions : ""}
//                       onChange={(value) =>{setActionSectionsQuestions(value)}}

//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}

//                   {actionName === "TEMPLATE MERGE" && (
//                   <div className="templatemerge">
//                     <CustomDropdown
//                       options={optionTEMPLATEMERGE}
//                       onSelect={(value) => handleActionSelect1(value, index)}
//                       label="TEMPLATE"
//                       value={actionName == "TEMPLATE MERGE" ? actionSectionsQuestions : ""}
//                       onChange={(value) =>{setActionSectionsQuestions(value)}}
//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "TEMPLATE OVERWRITE" && (
//                   <div className="templateoveright">
//                     <CustomDropdown
//                       options={optionTEMPLATEOVERIGHT}
//                       onSelect={handleActionSelect1}
//                       label="TEMPLATE"
//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "QUOTE: UNMERGE" && (
//                   <div className="quoteunmerge">
//                     <CustomDropdown
//                       options={optionQUOTEUNMERGE}
//                       onSelect={handleActionSelect1}
//                       label="QUOTE"
//                       Placeholder={"View"}
//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "SURVEY: UNMERGE" && (
//                   <div className="surveyunmerge">
//                     <CustomDropdown
//                       options={optionSURVEYUNMERGE}
//                       onSelect={handleActionSelect1}
//                       label="SURVEY TEMPLATE"
//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "QUOTE: REFRESH" && (
//                   <div className="quoterefresh">
//                     <CustomDropdown
//                       options={optionQUOTEREFRESH}
//                       onSelect={handleActionSelect1}
//                       label="QUOTE"
//                       Placeholder={"View"}
//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "SECTION: SET READ - ONLY" && (
//                   <div className="setreadonly">
//                     <CustomDropdown
//                       options={optionSETREADONLY}
//                       onSelect={handleActionSelect1}
//                       label="SECTION"
//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "MAKE REQUIRED" && (
//                   <div className="makerequired">
//                     <CustomDropdown
//                       options={makeRequiredOption}
//                       onSelect={handleActionSelect1}
//                       label="VALUE"
//                       Placeholder={"Value"}
//                     />

//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "STAGE: SET DURATION" && (
//                   <>
//                     <div id="setDuration">
//                       <CustomDropdown
//                         options={optionSETDURATION}
//                         onSelect={handleActionSelect1}
//                         label="TEMPLATE"
//                       />
//                       <div className="setDurationdele">
//                         <DeleteAction
//                           onDelete={() => onDelete(index)}
//                         />
//                       </div>
//                     </div>
//                   </>
//                 )}
//                 {actionName === "STAGE: RESIZE +/- DAYS" && (
//                   <div className="stageresizedays">
//                     <CustomDropdown
//                       options={optionStagedays}
//                       onSelect={handleActionSelect1}
//                       label="TEMPLATE"
//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "STAGE: RESIZE +/-%" && (
//                   <div className="stageresize">
//                     <CustomDropdown
//                       options={optionresize}
//                       onSelect={handleActionSelect1}
//                       label="TEMPLATE"
//                     />
//                     <div className="resizedalestage">
//                       <DeleteAction
//                         onDelete={() => onDelete(index)}
//                       />
//                     </div>
//                   </div>
//                 )}
//                 {actionName === "CONTENT: REMOVE" && (
//                   <>
//                     <div id="contentremoveDuplicates">
//                       <CustomDropdown
//                         options={optioncontentremove}
//                         onSelect={handleActionSelect1}
//                         label="TEMPLATE"
//                       />
//                       <div className="delecontentremove">
//                         <DeleteAction
//                           onDelete={() => onDelete(index)}
//                         />
//                       </div>
//                     </div>
//                   </>
//                 )}
//                 {actionName === "CONTENT: REMOVE DUPLICATES" && (
//                   <div id="removeDuplicates">
//                     <CustomDropdown
//                       options={removeDuplicatesOption}
//                       onSelect={handleActionSelect1}
//                       label="CATALOG CONTENT"
//                     />
//                     <div className="cotentremovedele">
//                       {" "}
//                       <DeleteAction
//                         onDelete={() => onDelete(index)}
//                       />
//                     </div>
//                   </div>
//                 )}
//                 {actionName === "STAGE: REMOVE" && (
//                   <div className="stageremove">
//                     <CustomDropdown
//                       options={optionStageremove}
//                       onSelect={handleActionSelect1}
//                       label="TEMPLATE"
//                     />
//                     <div className="removedele">
//                       <DeleteAction
//                         onDelete={() => onDelete(index)}
//                       />
//                     </div>
//                   </div>
//                 )}
//                 {actionName ===
//                   "REFRESH CALCS & FORMULA ON APPLY" && (
//                     <div className="refreshcalc">
//                       <div className="inputresumecalc">
//                         <input type="checkbox" className="inputresume"></input>
//                         <label className="labelresume">
//                           ADD ADDITIONAL FORMULAS REFRESH BEFORE CALCS
//                         </label>
//                       </div>
//                       <DeleteAction onDelete={() => onDelete(index)} />
//                     </div>
//                   )}
//                 {actionName === "DOCTYPES: SET DOCTYPES LIST" && (
//                   <div className="setdoctypeslist">
//                     <DoctypeDropdown
//                       options={optionsdoctype}
//                       onSelect={handleActionDoctype}
//                       label="DOCTYPE LIST"
//                       placeholder={"No selected Items"}
//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "SURVEY: MERGE" && (
//                   <div className="survey-merge-grid">
//                     <div className="vanita">
//                       <CustomDropdown
//                         options={optionssurveymerze}
//                         onSelect={handleActionSelect1}
//                         label="SURVEY TEMPLATE"
//                       />
//                       <CustomDropdown
//                         options={optionssurveymerzeAFTER}
//                         onSelect={handleActionSelect1}
//                         label="MERGE AFTER"
//                       />
//                     </div>
//                   </div>
//                 )}
//                 {actionName === "QUOTE: MERGE" && (
//                   <div className="quote-merge-grid">
//                     <CustomDropdown
//                       options={optionsquotemerge1}
//                       onSelect={handleActionSelect1}
//                       label="QUOTE"
//                     />
//                     <CustomDropdown
//                       options={optionsquotemerge2}
//                       onSelect={handleActionSelect1}
//                       label="CONTENT OPTIONS"
//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "SERVICE: REMOVE" && (
//                   <div className="serviceremovegrid">
//                     <CustomDropdown
//                       options={optionsserviceremove1}
//                       onSelect={handleActionSelect1}
//                       label="TEMPLATE"
//                     />

//                     <CustomDropdown
//                       options={optionsserviceremove2}
//                       onSelect={handleActionSelectCalcTab}
//                       label="SERVICE"
//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}

// {actionName === "PROCESS CALC RANGE(PCR)" && (
//                   <div className="pcrgrid">
//                     <CustomDropdown
//                       options={savedSheetNames}
//                       onSelect={handleActionSelectCalcTab}
//                       label="CALC TAB"
//                       value={actionName === "PROCESS CALC RANGE(PCR)" ? calcTab : ""}
//                       onChange={(value) => {setCalcTab(value)}}
//                     />
//                     <div>
//                       <ErrorMessage
//                         showFlaxErrorMessageText={true}
//                         label="CALC CELL"
//                         value={calcCell}
//                         onChange={(value) => setCalcCell(value)}
//                         errormsg="PCR IS A REQUIRED FIELD"
//                       />
//                     </div>
//                     <CustomDropdown
//                       options={pcrCalcTemplate}
//                       onSelect={handleActionSelectTemplate}
//                       label="TEMPLATE"
//                       value={actionName == "PROCESS CALC RANGE(PCR)" ? calcTabTemplate : ""}
//                       onChange={(value)=> setCalcTabTemplate(value)}
//                     />
//                     <div className="setanswerdele">
//                       <DeleteAction
//                         onDelete={() => onDelete(index)}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {actionName === "SHOW VALIDATION" && (
//                   <div className="showvalidation">
//                     <ErrorMessage
//                       showFlaxErrorMessageText={true}
//                       label="MESSAGE"
//                       errormsg="MESSAGE IS A REQUIRED FIELD"
//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "CONTENT: ADD CATALOG CONTENT" && (
//                   <>
//                     <div id="catalogDiv">
//                       <CustomDropdown
//                         options={optioncatalogContent}
//                         onSelect={handleActionSelect1}
//                         label={"CATALOG CONTENT"}
//                       />
//                       <CalcSheetPointer
//                         atqLabel="DOC TYPE FROM QUESTION"
//                         valueLabel="DOC TYPE AS VALUE"
//                         tabLabel="DOC TYPE TAB"
//                         cellLabel="DOC TYPE CELL"
//                         optionValue={cataloglist2}
//                       />
//                     </div>
//                   </>
//                 )}
//                 {actionName === "QUOTE:SET QUOTE NAME" && (
//                   <div className="setquotename">
//                     <CalcSheetPointer
//                       atqLabel="QUOTE NAME FROM QUESTION"
//                       valueLabel="QUOTE NAME AS VALUE"
//                       tabLabel="QUOTE NAME TAB"
//                       cellLabel="QUOTE NAME CELL"
//                     />
//                     <div className="setquotedele">
//                       <DeleteAction
//                         onDelete={() => onDelete(index)}
//                       />
//                     </div>
//                   </div>
//                 )}
//                 {actionName === "QUOTE: SET START DATE" && (
//                   <div className="setstartdate">
//                     <ValueList
//                       atqLabel="QUOTE START DATE FROM QUESTION"
//                       valueLabel="QUOTE START FROM VALUE"
//                       tabLabel="QUOTE START TAB"
//                       cellLabel="QUOTE START CELL"
//                       inputType="CALENDAR"
//                       selectedCloseDate={selectedCalendarDate}
//                       onCalendarChange={handleCalendarChange}
//                       selectedOption={selectedOption}
//                       onOptionChange={handleOptionChange}
//                     />
//                     <div className="startdatedelee">
//                       <DeleteAction
//                         onDelete={() => onDelete(index)}
//                       />
//                     </div>
//                   </div>
//                 )}
//                 {actionName === "QUOTE: SET DISCOUNT" && (
//                   <div className="setdiscount">
//                     <CalcSheetPointer
//                       atqLabel="DISCOUNT FROM QUESTION"
//                       valueLabel="DISCOUNT AS VALUE"
//                       tabLabel="DISCOUNT TAB"
//                       cellLabel="DISCOUNT CELL"
//                     />
//                     <div className="setdiscountdele">
//                       <DeleteAction
//                         onDelete={() => onDelete(index)}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {actionName === "QUOTE: SET ORG" && (
//                   <div className="setorg">
//                     <CalcSheetPointer
//                       options={optionsetorg}
//                       onSelect={handleActionSelect1}
//                       anstoque="addstagewidthwidthservice"
//                       atqLabel="ORG FROM QUESTION"
//                       valueLabel="ORG AS VALUE"
//                       tabLabel="ORG TAB"
//                       cellLabel="ORG CELL"
//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "SERVICE: ADD" && (
//                   <div className="serviceadd">
//                     <CalcSheetPointer
//                       options={optionserviceadd}
//                       onSelect={handleActionSelect1}
//                       anstoque="addstagewidthwidthservice"
//                       atqLabel="NAME FROM QUESTION"
//                       valueLabel="NAME AS VALUE"
//                       tabLabel="NAME TAB"
//                       cellLabel="NAME CELL"
//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "SET ANSWER" && (
//                   <div id="setAnswerMainDiv">
//                     <CustomDropdown
//                       options={setAnswerQuestionOptions}
//                       onSelect={handleActionSelect1}
//                       label="QUESTION"
//                       Placeholder={"Question"}
//                     />

//                     <CalcSheetPointer
//                       atqLabel="SET ANSWER FROM QUESTION"
//                       valueLabel="SET ANSWER AS VALUE"
//                       tabLabel="SET ANSWER TAB"
//                       cellLabel="SET ANSWER CELL"
//                     />

//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}

//                 {actionName === "QUOTE: SET CURRENCY" && (
//                   <div className="setcurrency">
//                     <ValueList
//                       optionValue={currencyList}
//                       atqLabel="CURRENCY CODE FROM QUESTION"
//                       valueLabel="CURRENCY CODE AS VALUE"
//                       tabLabel="CURRENCY TAB"
//                       cellLabel="CURRENCY CELL"
//                       selectedCloseDate={selectedCalendarDate}
//                       onCalendarChange={handleCalendarChange}
//                       selectedOption={selectedOption}
//                       onOptionChange={handleOptionChange}
//                     />
//                     <div className="setcurrencydele">
//                       <DeleteAction
//                         onDelete={() => onDelete(index)}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {actionName === "QUOTE: SET CUSTOM FIELD" && (
//                   <div className="setcustomfield">
//                     <CustomDropdown
//                       options={setCustomQuestionOptions}
//                       onSelect={handleActionSelect1}
//                       label="CUSTOM FIELD"
//                     />
//                     <CalcSheetPointer
//                       atqLabel="SET CUSTOM FIELD 1 FROM QUESTION"
//                       valueLabel="SET CUSTOM FIELD 1 AS VALUE"
//                       tabLabel="SET CUSTOM FIELD 1 TAB"
//                       cellLabel="SET CUSTOM FIELD 1 CELL"
//                     />

//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "SET ANSWER ON APPLY" && (
//                   <div className="answapply">
//                     <CustomDropdown
//                       options={optionSetAnswer}
//                       onSelect={handleActionSelect1}
//                       label={"QUESTION"}
//                       Placeholder={"Question"}
//                     />
//                     <CalcSheetPointer
//                       atqLabel="SET ANSWER FROM QUESTION"
//                       doctypetab="addstagewidthwidthclac"
//                       valueLabel="SET ANSWER AS VALUE"
//                       tabLabel="SET ANSWER TAB"
//                       cellLabel="SET ANSWER CELL"
//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName === "STAGE: ADD" && (
//                   <div id="stageadddiv">
//                     <CalcSheetPointer
//                       atqLabel="STAGE NAME FROM QUESTION"
//                       valueLabel="STAGE NAME AS VALUE"
//                       tabLabel="STAGE NAME TAB"
//                       cellLabel="STAGE NAME CELL"
//                     />
//                     <CalcSheetPointer
//                       atqLabel="DEFAULT DURATION DAYS FROM QUESTION"
//                       valueLabel="DEFAULT DURATION DAYS AS VALUE"
//                       tabLabel="DEFAULT DURATION DAYS TAB"
//                       cellLabel="DEFAULT DURATION DAYS CELL"
//                     />
//                   </div>
//                 )}
//                 {actionName === "SET CALC CELL" && (
//                   <div id="setcalccell">
//                     <CustomDropdown
//                       options={optionssetcalcell1}
//                       onSelect={handleActionSelect1}
//                       label="CALC TAB"
//                     />
//                     <div>
//                       <ErrorMessage
//                         showFlaxErrorMessageText={true}
//                         label="CALC CELL"
//                         errormsg="CALC CELL IS REQUIRED FIELD"
//                       />
//                     </div>
//                     <CalcSheetPointer
//                       dropdownCustom="optiondropcell"
//                       atqLabel="VALUE FROM QUESTION"
//                       valueLabel="VALUE AS VALUE"
//                       tabLabel="VALUE TAB"
//                       cellLabel="VALUE CELL"
//                     />
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 )}
//                 {actionName ===
//                   "CONTENT: REPLACE TAGGED CONTENT" && (
//                     <>
//                       <ErrorMessage
//                         showFlaxErrorMessageText={true}
//                         label="FIND TAG"
//                         errormsg="FIND TAG REQUIRED FIELD"
//                       />
//                     </>
//                   )}
//                 {actionName === "CONTENT: REPLACE TAG" && (
//                   <>
//                     <ErrorMessage
//                       showFlaxErrorMessageText={true}
//                       label="FIND TAG"
//                       errormsg="FIND TAG IS A REQUIRED FIELD"
//                     />
//                   </>
//                 )}
//                 {actionName === "SERVICE: UPDATE" && (
//                   <div id="updateDiv">
//                     <CustomDropdown
//                       options={optionTemp}
//                       onSelect={handleActionSelect1}
//                       label="TEMPLATE"
//                     />

//                     <CustomDropdown
//                       options={optionSer}
//                       onSelect={handleActionSelect1}
//                       label="SERVICE"
//                     />
//                   </div>
//                 )}

//                 {actionName === "SERVICE: SET START DATE" && (
//                   <div id="setstartdateDiv">
//                     <CustomDropdown
//                       options={optionTemplate}
//                       onSelect={handleActionSelect1}
//                       label="TEMPLATE"
//                     />

//                     <CustomDropdown
//                       options={optionService}
//                       onSelect={handleActionSelect1}
//                       label="SERVICE"
//                     />
//                   </div>
//                 )}
//                 {actionName === "CONTENT: ADD" && (
//                   <>
//                     <div id="contentadddiv">
//                       <CalcSheetPointer
//                         atqLabel="DOCTYPE FROM QUESTION"
//                         valueLabel="DOCTYPE AS VALUE"
//                         tabLabel="DOCTYPE TAB"
//                         cellLabel="DOCTYPE CELL"
//                       />

//                       <CalcSheetPointer
//                         atqLabel="SECTION FROM QUESTION"
//                         valueLabel="SECTION AS VALUE"
//                         tabLabel="SECTION TAB"
//                         cellLabel="SECTION CELL"
//                       />
//                     </div>
//                   </>
//                 )}

//                 {actionName === "QUOTE: SET PRICING MODEL" && (
//                   <div id="setpricingmodeldiv">
//                     <CustomDropdown
//                       options={optionSetpricingmodel}
//                       onSelect={handleActionSelect1}
//                       label="PRICING MODEL"
//                       Placeholder={"Price Model"}
//                     />

//                     {displayCalcSheetPointer && (
//                       <div className="pricedele">
//                         <CalcSheetPointer
//                           atqLabel="PRICE FROM QUESTION"
//                           valueLabel="PRICE AS VALUE"
//                           tabLabel="PRICE TAB"
//                           cellLabel="PRICE CELL"
//                         />
//                         <div className="pricingdelee1">
//                           <DeleteAction
//                             onDelete={() => onDelete(index)}
//                           />
//                         </div>
//                       </div>
//                     )}

//                     {margindisplayCalcSheetPointer && (
//                       <div className="margindele">
//                         <CalcSheetPointer
//                           atqLabel="MARGIN FROM QUESTION"
//                           valueLabel="MARGIN AS VALUE"
//                           tabLabel="MARGIN TAB"
//                           cellLabel="MARGIN CELL"
//                         />
//                         <div className="pricingdelee1">
//                           <DeleteAction
//                             onDelete={() => onDelete(index)}
//                           />
//                         </div>
//                       </div>
//                     )}
//                     {displayCalcSheetPointerservicelevel && (
//                       <div className="pricingdelee">
//                         <DeleteAction
//                           onDelete={() => onDelete(index)}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//           {showAction && (
//             <>
//               {actionName === "CONTENT: ADD CATALOG CONTENT" && (
//                 <div className="addcatalog">
//                   <ValueList
//                     atqLabel="SECTION FROM QUESTION"
//                     valueLabel="SECTION AS VALUE"
//                     tabLabel="SECTION TAB"
//                     cellLabel="SECTION CELL"
//                     optionValue={cataloglist}
//                     selectedCloseDate={selectedCalendarDate}
//                     onCalendarChange={handleCalendarChange}
//                     selectedOption={selectedOption}
//                     onOptionChange={handleOptionChange}
//                   />
//                   <div className="addcatalogdele">
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 </div>
//               )}
//               {actionName === "CONTENT: REPLACE TAGGED CONTENT" && (
//                 <div className="replacetaggedcontentGrid">
//                   <CalcSheetPointer
//                     atqLabel="REPLACE WITH FROM QUESTION"
//                     valueLabel="REPLACE WITH AS VALUE"
//                     tabLabel="REPLACE WITH TAB"
//                     cellLabel="REPLACE WITH CELL"
//                   />
//                   <DeleteAction onDelete={() => onDelete(index)} />
//                 </div>
//               )}

//               {actionName === "CONTENT: REPLACE TAG" && (
//                 <div id="replacetagDiv2">
//                   <CalcSheetPointer
//                     atqLabel="REPLACE WITH FROM QUESTION"
//                     valueLabel="REPLACE WITH AS VALUE"
//                     tabLabel="REPLACE WITH TAB"
//                     cellLabel="REPLACE CELL"
//                   />

//                   <CustomDropdown
//                     options={optionReplaceTag}
//                     onSelect={handleActionSelect1}
//                     label="OR REPLACE WITH"
//                     dropdownClass="replacetaglist"
//                     Placeholder="Replace With Field"
//                   />
//                   <div className="replacetagdele">
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 </div>
//               )}

//               {actionName === "CONTENT: ADD" && (
//                 <div className="contentadderromsg">
//                   <ErrorMessage
//                     showFlaxErrorMessageText={true}
//                     label="CODE"
//                     errormsg="CODE IS A REQUIRED FIELD"
//                     style={{ width: "25%" }}
//                   />
//                 </div>
//               )}

//               {actionName === "CONTENT: ADD" && (
//                 <div id="contentaddDiv3">
//                   <FroalaEditorComponent
//                     tag="textarea"
//                     config={editorConfig}
//                     onModelChange={handleModelChange}
//                   />
//                   <DeleteAction onDelete={() => onDelete(index)} />
//                 </div>
//               )}

//               {actionName === "SERVICE: SET START DATE" && (
//                 <div id="setstartdateGrid">
//                   <CalcSheetPointer
//                     atqLabel="START DATE FROM QUESTION"
//                     valueLabel="START DATE AS VALUE"
//                     tabLabel="START DATE TAB"
//                     cellLabel="START DATE CELL"
//                     selectedOption={selectedOption}
//                     onOptionChange={handleOptionChange}
//                   />
//                   <DeleteAction onDelete={() => onDelete(index)} />
//                 </div>
//               )}
//               {actionName === "SERVICE: UPDATE" && (
//                 <div id="updateGrid">
//                   <CalcSheetPointer
//                     atqLabel="SERVICE NAME FROM QUESTION"
//                     valueLabel="SERVICE NAME AS VALUE"
//                     tabLabel="SERVICE NAME TAB"
//                     cellLabel="SERVICE NAME CELL"
//                   />

//                   <CalcSheetPointer
//                     atqLabel="SERVICE CATEGORY FROM QUESTION"
//                     valueLabel="SERVICE CATEGORY AS VALUE"
//                     tabLabel="SERVICE CATEGORY TAB"
//                     cellLabel="SERVICE CATEGORY CELL"
//                   />

//                   <CalcSheetPointer
//                     atqLabel="SERVICE LOCATION FROM QUESTION"
//                     valueLabel="SERVICE LOCATION AS VALUE"
//                     tabLabel="SERVICE LOCATION TAB"
//                     cellLabel="SERVICE LOCATION CELL"
//                   />
//                 </div>
//               )}

//               {actionName === "SERVICE: UPDATE" && (
//                 <div id="updateGrid2">
//                   <CalcSheetPointer
//                     atqLabel="SERVICE EXTERNAL SKU 1 FROM QUESTION"
//                     valueLabel="SERVICE EXTERNAL SKU 1 AS VALUE"
//                     tabLabel="SERVICE EXTERNAL SKU 1 TAB"
//                     cellLabel="SERVICE EXTERNAL SKU 1 CELL"
//                   />

//                   <CalcSheetPointer
//                     atqLabel="SERVICE EXTERNAL SKU 1 DESCRIPTION FROM QUESTION"
//                     valueLabel="SERVICE EXTERNAL 1 DESCRIPTION AS VALUE"
//                     tabLabel="SERVICE EXTERNAL SKU 1 DESCRIPTION TAB"
//                     cellLabel="SERVICE EXTERNAL SKU 1 DESCRIPTION CELL"
//                     labelforverticl="labelfortabclacUPDATEGRID2"
//                   />

//                   <CalcSheetPointer
//                     atqLabel="SERVICE EXTERNAL SKU 2 FROM QUESTION"
//                     valueLabel="SERVICE EXTERNAL SKU 2 AS VALUE"
//                     tabLabel="SERVICE EXTERNAL SKU 2 TAB"
//                     cellLabel="SERVICE EXTERNAL SKU 2 CELL"
//                   />
//                 </div>
//               )}

//               {actionName === "SERVICE: UPDATE" && (
//                 <div id="updateGrid3">
//                   <CalcSheetPointer
//                     atqLabel="SERVICE EXTERNAL SKU 2 DESCRIPTION FROM QUESTION"
//                     valueLabel="SERVICE EXTERNAL SKU 2 DESCRIPTION AS VALUE"
//                     tabLabel="SERVICE EXTERNAL SKU 2 DESCRIPTION TAB"
//                     cellLabel="SERVICE EXTERNAL SKU 2 DESCRIPTION CELL"
//                   />
//                   <CalcSheetPointer
//                     atqLabel="SERVICE EXTERNAL REF ID 1 FROM QUESTION "
//                     valueLabel="SERVICE EXTERNAL REF ID 1 AS VALUE"
//                     tabLabel="SERVICE EXTERNAL REF ID 1 TAB"
//                     cellLabel="SERVICE EXTERNAL REF ID 1 CELL"
//                   />
//                   <CalcSheetPointer
//                     atqLabel="SERVICE EXTERNAL REF ID 2 FROM QUESTION"
//                     valueLabel="SERVICE EXTERNAL REF ID 2 AS VALUE"
//                     tabLabel="SERVICE EXTERNAL REF ID 2 TAB"
//                     cellLabel="SERVICE EXTERNAL REF ID 2 CELL"
//                     labelforverticl="labelfortabclac"
//                   />
//                   <div className="deleserviceupdate">
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 </div>
//               )}

//               {actionName === "SURVEY: MERGE" && (
//                 <div className="vasundra">
//                   <DoctypeDropdown
//                     placeholder="Select tabs to merge?"
//                     label="CALC SHEET TABS"
//                     options={optionsdoctype1}
//                     onSelect={(selectedOptions) => {
//                     }}
//                     customInput="your-custom-input-class"
//                     customdropdowndoc="custom"
//                   />
//                   <div className="deletemergesurvey">
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 </div>
//               )}
//               {actionName === "STAGE: ADD" && (
//                 <div className="customdropdownv">
//                   <CustomDropdown
//                     options={optionssetcalctab2stageadd}
//                     onSelect={handleActionSelect1}
//                     label="TEMPLATE"
//                   />

//                   <CustomDropdown
//                     options={optionssetstageadd}
//                     onSelect={handleActionSelect1}
//                     label="SERVICE"
//                   />
//                   <div className="stageadddele">
//                     <DeleteAction onDelete={() => onDelete(index)} />
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//   );
// };
// export default Action;
