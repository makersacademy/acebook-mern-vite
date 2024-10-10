import { useState } from "react";
import { createPost } from "../services/posts";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";  // Import Container
import Row from "react-bootstrap/Row";  // Import Row
import Col from "react-bootstrap/Col";  // Import Col

const CreatePostForm = ({ whenPostCreated }) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => setMessage(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost(message);
    whenPostCreated(); // Triggers the createdPost function on FeedPage.jsx to run
    setMessage(""); // clears message field upon submit
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={10} md={12}>
          <Form onSubmit={handleSubmit} className="mx-auto">
            <Form.Group className="mb-3 text-center" controlId="createpostform">
              {/* <Form.Label className="fs-2 text-start">Enter Post</Form.Label> */}
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleMessageChange}
                value={message}
                className="message-box"
                name="message"
                placeholder="Create a new post..."
              />
            </Form.Group>
            <Button value="Submit" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePostForm;
