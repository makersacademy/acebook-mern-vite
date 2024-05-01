import { Link } from "react-router-dom";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

import "./HomePage.css";
import { googleLogout } from "@react-oauth/google";

export const HomePage = () => {

  const handlePlayAsGuest = () => {
    googleLogout();
    localStorage.clear();
  }

  return (
    <div className="home">
      <h1>{"Let's get Kwizical!"}</h1>
      <div>
        <GoogleAuth/>
      </div>
      <div>or</div>
      <Link to="/kwizical" onClick={handlePlayAsGuest} >Play as guest</Link>
    </div>
  );
};
