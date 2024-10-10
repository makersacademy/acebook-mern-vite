import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogoutButton from "./LogoutButton";

export function NavbarComponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top">
      <Container className="p-0">
        <Navbar.Brand className="ms-2 me-4 fw-bolder" href="/posts">Acebook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-center text-center" id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="m-2" href="/posts">Home</Nav.Link>
            <Nav.Link className="m-2" href="/users/me">Profile</Nav.Link>
            <Nav.Link className="m-2" href="/createpost">Create Post</Nav.Link>
            <Nav.Link className="m-2" href="/viewAllUsers">View All Users</Nav.Link>
            {/* Added update page to navbar*/}
          </Nav>
          <Nav className="ms-auto align-items-center">
            <Nav.Link className="m-2" href="/users/me/update">Account Settings</Nav.Link>{" "}
            <div className="d-inline w-auto">
              <LogoutButton className="m-5"/>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
