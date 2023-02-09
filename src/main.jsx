import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "@picocss/pico";
import "./main.css";

// Page load route fix for Hash Router
// https://github.com/remix-run/react-router/issues/8638
if (!window.location.hash.startsWith("#/")) {
  window.location.hash = "#/" + window.location.hash.substring(1);
}
// handle redirect from pkce flow
if (window.location.search || window.location.path) {
  window.location.href = "/#" + (window.location.path || '/') + window.location.search.substring(1);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);
