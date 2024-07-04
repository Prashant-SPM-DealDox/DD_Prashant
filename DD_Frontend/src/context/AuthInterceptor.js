import fetchIntercept from "fetch-intercept";
const ALLOW_EMPLOYEES = [
  "251-500 employees",
  "501-1000 employees",
  "1001-2000+ employees",
];

export const AuthInterceptor = () => {
  fetchIntercept.register({
    request: function (url, config) {
      // Modify the url or config here
      let user = localStorage.getItem("user");
      if (user) {
        let TokenData = JSON.parse(user);
        if (TokenData?.token) {
          config.headers.Authorization = `Bearer ${TokenData.token}`;
          if (
            Array.isArray(ALLOW_EMPLOYEES) &&
            ALLOW_EMPLOYEES.some(
              (check) => check == TokenData?.admin?.no_of_emp?.toLowerCase()
            )
          ) {
            config.headers["x-key-db"] = TokenData?.admin?.dbName;
          }
        } else {
          let urlpath = url.split("/");
          if (
            url.split("/")[urlpath.length - 1] !== "login" &&
            url.split("/")[urlpath.length - 1] !== "register"
          )
            window.location.href = "/";
        }
      }

      return [url, config];
    },

    requestError: function (error) {
      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error);
    },

    response: function (response) {
      // Modify the reponse object
      return response;
    },

    responseError: function (error) {
      // Handle an fetch error
      return Promise.reject(error);
    },
  });
};
