import { Link } from "react-router-dom";

import "./HomePage.css";

export const HomePage = () => {
  document.title = "Acebook"
  return (
    <div className="home">
      <h1 className="custom-h1">Welcome to Acebook!</h1>
      <h4>Log in to get connected!</h4>
      <div className="buttons">
      <Link to="/signup" className="sign-btn">Sign Up</Link>
      <Link to="/login" className="log-in-btn">Log In</Link>
      </div>
    </div>
  );
};
