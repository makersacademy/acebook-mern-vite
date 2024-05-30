import { Link } from "react-router-dom";

import "./HomePage.css";

export const HomePage = () => {
  return (
    <div className="home">
      <div className="heading-banner">
        <h1>Acebook</h1>
        <h3>Brought to you by the Agile Avengers</h3>
      </div>
      <div className="welcome-banner">
        <h1>Welcome to Acebook!</h1>
      </div>
      <div className="button-holder">
      <button className="sign-up-btn"><Link to="/signup">Sign Up</Link></button> 
      <button className="login-btn"><Link to="/login">Log In</Link></button>
      </div>
    </div>
  );
};