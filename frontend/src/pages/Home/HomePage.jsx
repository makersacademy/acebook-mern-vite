import { Link } from "react-router-dom";
import { ImageCircle } from "../../components/ImageCircle";
import imageHomepage from "../../assets/friends.png"

import "./HomePage.css";

export const HomePage = () => {
  return (
    <div className="home">
      <h1>Welcome to Acebook!</h1>
      <ImageCircle image={imageHomepage}/>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
};
