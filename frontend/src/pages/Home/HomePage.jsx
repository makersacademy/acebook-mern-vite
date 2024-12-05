import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import "./HomePage.css";

export function HomePage() {
  return (
    <div className="home">
      <NavBar />
      <h1>Welcome to Acebook!</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
}
