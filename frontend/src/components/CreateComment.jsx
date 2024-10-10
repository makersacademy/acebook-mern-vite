import { useState } from "react";
import { createComment } from "../services/comments";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const CreateCommentForm = (props) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => setComment(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    createComment(comment);
    setComment(""); // clears COMMENT field upon submit
  };
  console.log(comment);

  const handleClick = () => {
    localStorage.setItem("post_id", props.post._id);
  };

  return (
<Form onSubmit={handleSubmit}>
      <Row>
        <Col sm={10}> {/* This makes the textarea take 10/12 of the row */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Enter Comment: </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleCommentChange}
              onClick={handleClick}
              value={comment}
              name="comment"
              placeholder="Your comment..."
            />
          </Form.Group>
        </Col>

        <Col sm={2} className="d-flex align-items-center justify-content-end"> {/* This makes the button take the remaining 2/12 of the row */}
          <Button value="Submit" variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
      <p>{props.post._id}</p> {/* Assuming this shows the post ID */}
    </Form>
  );
};

export default CreateCommentForm;
