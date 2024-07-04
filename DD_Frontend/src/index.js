import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import GC from "@grapecity/spread-sheets";
GC.Spread.Sheets.LicenseKey =
  "uat.dealdox.io,944993251326122#B17bK9kesJ4RMZHO7pXVz36M9ZURiVVYY5GdopkWHhFN89WeUNkYpBnUUN4Q9UWboZ5VNZlQKxmcEFWRvB5SJV6a4RkaF94Z4FFR5EnRhVGNNtkWaFkQsFmb9ljNHNlTWp4Kvk5TPJTWiJ5c7Qld9kGewNGUaRVeP54TOd5MPZ7NkBHOyAXaWVUZ8plVHRFTHhXWCFGOQ94MHlXboRHaoV4S584ZPZjTXp6V7lDUNhUaL3mM8YmM5ckWvVkZM5UdG9kailTd4FnYFxmN99WV6dGMzJUMR94cOlTUzVlWwJFb9llZ5IDWKlXZ5l4LDxEZ4E7d9d6aiojITJCLiI4M4YzM6gjI0ICSiwyN6IzNyUTN9QTM0IicfJye35XX3JyVUNkWiojIDJCLiYTMuYHITpEIkFWZyB7UiojIOJyebpjIkJHUiwiI4QDO4MDMggjMyADNyAjMiojI4J7QiwiIvlmL83GZsFWZk9CdhVnI0IyctRkIsIycll6Zvx6buh6YlRFIsFmYvx6Rg4EUTJiOiEmTDJCLiIjMxYjMzETNyMTO9QDN9IiOiQWSiwSfdtlOicGbmJCLlNHbhZmOiI7ckJye0ICbuFkI1pjIEJCLi4TP7ZWTxAnVqt6ZK3iTQ3Sakp5Lm9GbJNkNspHWnJWZwkXRNpHS4IWTmpUbUljbo34a6k5Tz46cuRlRhlVTmdVRYZWcJJ5RnlXQDZDO9k5NO94ZzNzSlBlcRlTTV94RPtOawF";
window.GC = GC;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
