import ReactDOM from "react-dom/client";
import React from "react";
import 'tailwindcss/tailwind.css';
import App from "./App.jsx";
import "./index.css";

import { GoogleOAuthProvider } from '@react-oauth/google';

// Get the "root" div from index.html.
// The React application will be inserted into this div.
const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <GoogleOAuthProvider clientId="108211060185-rc1g9je54b5hsufug7fho331oerfrpk2.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
