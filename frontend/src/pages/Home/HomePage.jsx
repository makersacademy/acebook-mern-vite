import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import "./HomePage.css";

export function HomePage() {
  return (
    <div className="home ">
      <h1>Mernie Sanders Acebook</h1>
      <div className="d-flex p-4 justify-content-center align-items-center">
      <Stack direction="horizontal" gap={3} className="btn-group">
        <div className="p-2">
          <Button className="login-btn">
          <Link to="/login" className="login-link">Log In</Link>
          </Button>
        </div>
        <div className="p-2">
          <Button variant="outline-primary">
          <Link to="/signup" className="signup-link">Sign Up</Link>
          </Button>
        </div>
      </Stack>
      </div>
    </div>
  );
}
