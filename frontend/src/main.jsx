import ReactDOM from "react-dom/client";
import React from "react";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// Import font library
import 'typicons.font/src/font/typicons.css';


import App from "./App.jsx";
import "./index.css";


// Get the "root" div from index.html.
// The React application will be inserted into this div.
const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
