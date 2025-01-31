import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n.js";
import App from "./App.jsx";
import { TokenProvider } from "./components/Context.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TokenProvider>
    <App />
  </TokenProvider>,
);
