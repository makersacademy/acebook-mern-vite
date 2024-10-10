import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import "./HomePage.css";

export function HomePage() {
  return (
    <Container>
      <div className="home d-flex flex-column justify-content-center align-items-center vh-100">
        <Row className="mb-4">
            <h2>Mernie Sanders Presents:</h2>
            <h1 className="my-2">Acebook</h1>
        </Row>
        <Row>
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
        </Row>
        <Row></Row>
      </div>
    </Container>
  );
}
