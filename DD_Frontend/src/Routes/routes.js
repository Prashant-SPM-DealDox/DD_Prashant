// import Auth from ".../loginSetups/Auth";
import { lazy } from "react";
import { isAuthenticated } from "../utils/common";
import { Navigate } from "react-router-dom";
import GuidedSellingNew from "../pages/guidedSellingNew/GuidedSellingNew";
import OtpVerification from "../loginSetups/OtpVerification";
import ForgotPassword from "../loginSetups/ForgotPassword";
import Stripes from "../pages/Stripe/Stripes";
import PasswordSucess from "../pages/SetPassword/PasswordSuccess";
import Maintenance from "../loginSetups/Maintenance";
// import People from "../pages/People/People";
// import Whereused from "../pages/Survey/WhereUsed";
import { ROUTES_CONSTANTS } from "./routesConstant";
// import Login from "../loginSetups/Login";
// import Register from "../loginSetups/Register";
const Myprofile = lazy(() => import("../components/myprofile/Myprofile"));
const Auth = lazy(() => import("../loginSetups/Auth"));
const LogAccount = lazy(() => import("../loginSetups/LogAccount"));
const Login = lazy(() => import("../loginSetups/Login"));
const Logout = lazy(() => import("../loginSetups/Logout"));
const RegSuccess = lazy(() => import("../loginSetups/RegSuccess"));
const Register = lazy(() => import("../loginSetups/Register"));
const ResetPassword = lazy(() => import("../loginSetups/ResetPassword"));
const Access = lazy(() => import("../pages/Access/Access"));
const Account = lazy(() => import("../pages/Accounts/Accounts"));
const Asset = lazy(() => import("../pages/Assets/Asset"));
const CompanyProfile = lazy(() => import("../pages/Company/CompanyProfile"));
const CompanyOrgs = lazy(() => import("../pages/Company/CompanyOrgs"));
const Config = lazy(() => import("../pages/Config/Config"));
const Alert = lazy(() => import("../pages/Alert/Alert"));
const Content = lazy(() => import("../pages/Content/Content"));
const Demand = lazy(() => import("../pages/Demand/Demand"));
const Forecast = lazy(() => import("../pages/Forecast/Forecast"));

const Home = lazy(() => import("../pages/Home/Home"));
const Hooks = lazy(() => import("../pages/Hooks/Hooks"));
const Items = lazy(() => import("../pages/Items/Items"));
const Lookups = lazy(() => import("../pages/Lookups/Lookups"));
const Opportunities = lazy(() => import("../pages/Opportunity/Opportunities"));
const OpportunitiesData = lazy(() => import("../pages/Opportunity/OpportunitiesData"));
const People = lazy(() => import("../pages/People/People"));
const QuoteCreation = lazy(() => import("../pages/QuoteCreation/QuoteCreation"));
const Quotes = lazy(() => import("../pages/Quotes/Quotes"));
const Rolessetup = lazy(() => import("../pages/Roles/Rolessetup"));
const Security = lazy(() => import("../pages/Security/Security"));
const SetPassword = lazy(() => import("../pages/SetPassword/SetPassword"));
const SurveySetupNew = lazy(() => import("../pages/survey-new/SurveySetupNew"));
const Whereused = lazy(() => import("../pages/Survey/WhereUsed"));
const Template = lazy(() => import("../pages/Template/Template"));
const Doctype = lazy(() => import("../pages/Doctypes/Doctype"));
const PasswordSuccess = lazy(() => import("../pages/SetPassword/PasswordSuccess"));
const NewLogin= lazy(()=>import('../common/NewLogin.jsx'))
const NewRegister = lazy(()=>import('../common/NewRegister.jsx'))



export const routes = [
  // {
  //   path: ROUTES_CONSTANTS.MAIN,
  //   component: <Login />,
  //   protected: false,
  // },
  {
    path: ROUTES_CONSTANTS.otpVarification,
    element: <OtpVerification />,
    protected: false,
  },
  {
    path: ROUTES_CONSTANTS.NEWLOGIN,
    element: <NewLogin />,
    protected: false,
  },
  {
    path: ROUTES_CONSTANTS.NEWREGISTER,
    element: <NewRegister />,
    protected: false,
  },
  {
    path: ROUTES_CONSTANTS.AUTH,
    element: <Auth />,
    protected: false,
  },
  {
    path: ROUTES_CONSTANTS.HOME,
    element: <Home />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.DOC_TYPES,
    element: <Doctype />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.TEMPLATES,
    element: <Template />,
    protected: true,
  },
  // {
  //   path: ROUTES_CONSTANTS.SETUP,
  //   element: <Surveysetup />,
  //   protected: true,
  // },
  {
    path: ROUTES_CONSTANTS.SETUP_NEW,
    element: <SurveySetupNew />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.SETUP_NEW_PARAM,
    element: <SurveySetupNew />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.CONFIG,
    element: <Config />,
    protected: true,
  },

  {
    path: ROUTES_CONSTANTS.LOOKUPS,
    element: <Lookups />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.SECURITY,
    element: <Security />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.ITEMS,
    element: <Items />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.LOGIN,
    element: isAuthenticated() ? (
      <Navigate to={ROUTES_CONSTANTS.HOME} />
    ) : (
      <Login />
    ),
    protected: false,
  },
  {
    path: ROUTES_CONSTANTS.REGISTER,
    element: <Register />,
    protected: false,
  },
  // {
  //   path: ROUTES_CONSTANTS.REG_SUCCESS,
  //   element: <RegSuccess />,
  //   protected: true,
  // },
  // {
  //   path: ROUTES_CONSTANTS.PROMPT_USER,
  //   element: <PromptUser />,
  //   protected: true,
  // },
  {
    path: ROUTES_CONSTANTS.PEOPLE,
    element: <People />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.WHEREUSED,
    element: <Whereused />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.QUOTES,
    element: <Quotes />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.QUOTES_CREATION,
    element: <QuoteCreation />,
    protected: true,
  },
  // {
  //   path: ROUTES_CONSTANTS.GUIDED_SELLING,
  //   element: <GuidedSelling />,
  //   protected: true,
  // },
  {
    path: ROUTES_CONSTANTS.GUIDED_SELLING_NEW,
    element: <GuidedSellingNew />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.DEMAND,
    element: <Demand />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.FORECAST,
    element: <Forecast />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.ROLE_SETUP,
    element: <Rolessetup />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.COMPANY_PROFILE,
    element: <CompanyProfile />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.COMPANY_ORGS,
    element: <CompanyOrgs />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.ALERT,
    element: <Alert />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.CONTENT,
    element: <Content />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.ACCOUNT,
    element: <Account />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.ACCOUNT_PARAM,
    element: <Account />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.ACCESS,
    element: <Access />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.MYPROFILE,
    element: <Myprofile />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.OPPORTUNITIES,
    element: <Opportunities />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.OPPORTUNITIES_DATA,
    element: <OpportunitiesData />,
    protected: true,
  },
  {
    path: ROUTES_CONSTANTS.SETPASSWORD,
    element: <SetPassword />
  },
  {
    path: ROUTES_CONSTANTS.FORGOTPASSWORD,
    element: <ForgotPassword />
  },
  {
    path: ROUTES_CONSTANTS.LOGACCOUNT,
    element: <LogAccount />
  },
  {
    path: ROUTES_CONSTANTS.RESETPASSWORD,
    element: <ResetPassword />
  },
  {
    path: ROUTES_CONSTANTS.STRIPE,
    element: <Stripes />
  },
  {
    path: ROUTES_CONSTANTS.PASSWORDSUCCESS,
    element: <PasswordSucess />
  },
  {
    path: ROUTES_CONSTANTS.MAINTENANCE,
    element: <Maintenance />
  },
];
