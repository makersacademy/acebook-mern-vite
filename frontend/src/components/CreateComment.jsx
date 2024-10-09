import { useState } from "react";
import { createComment } from "../services/comments";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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

      <Button value="Submit" variant="primary" type="submit">
        Submit
      </Button>

      <p>{props.post._id}</p>

      {/* <label htmlFor="message">Enter message:</label>
            <input
                type="text"
                name="message"
                value={message}
                onChange={handleMessageChange}
            /> */}

      {/* <input
                type="submit"
                value="Submit"
            /> */}
    </Form>
  );
};

export default CreateCommentForm;
