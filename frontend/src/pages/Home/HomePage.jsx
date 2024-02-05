import { Link } from "react-router-dom";
import "./HomePage.css";
import Navbar from "../../components/NavBar/navbar";

export const HomePage = () => {
  return (
    <>
    <Navbar />
    <div className="home">

      <h1>Welcome to Acebook!</h1>
      <a href="/signup">
        <button id="sign-up-button" type="button">Sign up</button>
      </a>
      <a href="/login">
        <button id="log-in-button" type="button">Log in</button>
      </a>
    </div>
    </>
  );
};
