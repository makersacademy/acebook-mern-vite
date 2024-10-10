import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateUser } from "../services/users";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export function UpdateEmail() {
  const [newEmail, setNewEmail] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {};
    try {
      payload.newEmail = newEmail;
      UpdateUser(payload);
      navigate("/users/me");
    } catch (err) {
      console.log(err);
      navigate(0);
    }
  }

  function handleNewEmailChange(event) {
    setNewEmail(event.target.value);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Change Email Address</Form.Label>

          <InputGroup>
            <Form.Control
              type="email"
              value={newEmail}
              placeholder="Enter new email"
              onChange={handleNewEmailChange}
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
