import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogoutButton from "./LogoutButton";

export function NavbarComponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/posts">Acebook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/posts">Home</Nav.Link>
            <Nav.Link href="/users/me">Profile</Nav.Link>
            <Nav.Link href="/createpost">Create Post</Nav.Link>
            <Nav.Link href="/viewAllUsers">View All Users</Nav.Link>
            <Nav.Link href="/users/me/update">Account Settings</Nav.Link>{" "}
            {/* Added update page to navbar*/}
            <LogoutButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
