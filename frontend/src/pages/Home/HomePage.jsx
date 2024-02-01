import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./HomePage.css";

export const HomePage = () => {
  document.title = "Acebook"
  useEffect(() => {
    document.body.style.backgroundImage = 'url(./home-3.jpg)'; // Set background image
    document.body.style.backgroundSize = 'cover'; // Optional: Set background size
    document.body.style.backgroundRepeat = 'no-repeat'; // Optional: Set background repeat
    return () => {
      document.body.style.backgroundImage = null; // Reset when component unmounts
      document.body.style.backgroundSize = null;
      document.body.style.backgroundRepeat = null;
    };
  }, []);
  

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
