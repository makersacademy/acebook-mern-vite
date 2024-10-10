import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateUser } from "../services/users";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export function UpdateUsername() {
  const [newUsername, setNewUsername] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {};
    try {
      payload.newUsername = newUsername;
      UpdateUser(payload);
      navigate('/users/me');
    } catch (err) {
      console.log(err);
      navigate(0);
    }
  }

  function handleNewUsernameChange(event) {
    setNewUsername(event.target.value);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label className="fw-bold">Change Username</Form.Label>

          <InputGroup>
            <Form.Control
              type="text"
              value={newUsername}
              placeholder="Enter new username"
              onChange={handleNewUsernameChange}
            />
            <Button
              className="btn-sm"
              role="submit-button"
              id="submit"
              variant="primary"
              type="submit"
              value="Submit"
            >
              Submit
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </>
  );
}
