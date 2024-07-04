import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import DataState from "./dataContext/DataState";
import { AuthInterceptor } from "./context/AuthInterceptor";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import { routes } from "./Routes/routes";
import { isAuthenticated } from "./utils/common";
import { ROUTES_CONSTANTS } from "./Routes/routesConstant";
import { ToastContainer } from "react-toastify";
import { GlobalSearchDc } from "./dataContext/GlobalSearchDc";
import SalesForceLoginUser from "./pages/SalesForceLogin/SalesForceLoginUser";

function App() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";

  const location = useLocation();
  const { pathname, search } = location;
  const storedPath = localStorage.getItem("currentPath");
  useEffect(() => {
    const searchparams = new URLSearchParams(search);
    AuthInterceptor();

    // If the stored path is different from the current path, remove the indexNumber
    if (storedPath !== pathname) {
      // if (
      //   !(
      //     (storedPath === "/quotes" && pathname === "/accounts") ||
      //     (storedPath === "/opportunities" && pathname === "/accounts") ||
      //     (storedPath === "/opportunitiesdata" && pathname === "/accounts") ||
      //     (storedPath === "/quotecreation" && pathname === "/accounts") ||
      //     (storedPath === "/guidedselling_new" && pathname === "/accounts")
      //   )
      // ) {
      //   localStorage.removeItem("personId");
      // }
      localStorage.removeItem("previousPersionId");
    }

    // Store the current path for future comparisons
    localStorage.setItem("currentPath", pathname);
  }, [storedPath, pathname]);

  return (
    // <BrowserRouter>
    <Suspense
      fallback={
        <div
          className="please_wait"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "800",
          }}
        >
          Please wait...
        </div>
      }
    >
      <>
        <DataState>
          <Toaster position="top-right" />
          <ToastContainer />
          <Routes>
            <Route
              path="/salesforceUserLogin"
              element={<SalesForceLoginUser />}
            />
            {routes.map((route, index) => {
              return route.protected ? (
                isAuthenticated() ? (
                  <Route
                    key={`${route.path}-${index}`}
                    path={route.path}
                    element={route.element}
                  />
                ) : (
                  <Route
                    path={route.path}
                    key={`${route.path}-${index}`}
                    element={<Navigate to={ROUTES_CONSTANTS.LOGIN} />}
                  />
                )
              ) : (
                <Route
                  key={`${route.path}-${index}-${index + 1}`}
                  path={route.path}
                  element={route.element}
                />
              );
            })}
            <Route
              path="*"
              element={
                <Navigate
                  to={
                    isAuthenticated()
                      ? ROUTES_CONSTANTS.HOME
                      : ROUTES_CONSTANTS.LOGIN
                  }
                />
              }
            />
          </Routes>
        </DataState>
      </>
    </Suspense>
    // </BrowserRouter>
  );
}
export default App;
