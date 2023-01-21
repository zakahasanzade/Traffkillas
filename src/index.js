import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { createRoot } from "react-dom/client";
import '@fortawesome/fontawesome-free/css/all.min.css';

import App from "./App";

// ReactDOM.render(
//   // <React.StrictMode>
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   // </React.StrictMode>
//   document.getElementById("root")
// );
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
