import { NavbarComponent } from "../../components/NavbarComponent";
import { UpdateEmail } from "../../components/UpdateEmail";
import { UpdateUsername } from "../../components/UpdateUsername";
import { UploadProfilePic } from "../../components/uploadProfilePicture";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export function UpdateUser() {
  return (
    <>
      <NavbarComponent />
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Row className="w-100">
          <h2 className="fw-bold text-center">Edit Profile</h2>
          <Col lg={6} md={8} className="mx-auto">
            <Row className="mb-4">
              <Col className="d-flex justify-content-center flex-column">
                <UploadProfilePic className="w-100" />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col className="d-flex justify-content-center flex-column">
                <UpdateUsername className="w-100" />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col className="d-flex justify-content-center flex-column">
                <UpdateEmail className="w-100" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
