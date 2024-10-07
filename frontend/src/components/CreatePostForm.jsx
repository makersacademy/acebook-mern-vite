import { useState } from "react";
import { createPost } from "../services/posts";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CreatePostForm = () => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => setMessage(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost(message);
    setMessage(""); // clears message field upon submit
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter Post</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={handleMessageChange}
          value={message}
          name="message"
          placeholder="Your post..."
        />
      </Form.Group>

      <Button value="Submit" variant="primary" type="submit">
        Submit
      </Button>
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

export default CreatePostForm;
