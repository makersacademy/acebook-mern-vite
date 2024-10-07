import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import "./HomePage.css";

export function HomePage() {
  return (
    <div className="home">
      <h1>Mernie Sanders Acebook</h1>
      <Stack gap={3}>
        <div className="p-2">
          <Button variant="outline-primary">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
        <div className="p-2">
          <Button variant="outline-primary">
            <Link to="/login">Log In</Link>
          </Button>
        </div>
      </Stack>
    </div>
  );
}
