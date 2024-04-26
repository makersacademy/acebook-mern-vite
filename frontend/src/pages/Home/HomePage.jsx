import { Link } from "react-router-dom";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

import "./HomePage.css";



export const HomePage = () => {
  return (
    <div className="home">
      <h1>{"Let's get Kwizical!"}</h1>
      <Link to="/kwizical">Play as guest</Link>
      <div>
        <GoogleAuth/>
      </div>
    </div>
  );
};
