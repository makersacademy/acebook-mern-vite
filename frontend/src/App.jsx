import { useState } from "react";

import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";

import "./App.css";

const App = () => {
  const [currentPage, setPage] = useState("home");

  // This uses conditional rendering, using the && operator.
  // Read more here: https://react.dev/learn/conditional-rendering#logical-and-operator-
  return (
    <>
      {currentPage === "home" && <HomePage setPage={setPage} />}
      {currentPage === "login" && <LoginPage setPage={setPage} />}
      {currentPage === "signup" && <SignupPage setPage={setPage} />}
      {currentPage === "feed" && <FeedPage setPage={setPage} />}
    </>
  );
};

export default App;
