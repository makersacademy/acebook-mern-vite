import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { signup } from "../../services/authentication";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [imgURL, setimgURL] = useState(""); // added state for imgURL submission
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(imgURL);
    try {
      await signup(email, password, username, imgURL);
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handleImgURLChange(event) {
    // added handle imgURL function
    setimgURL(event.target.value);
  }

  return (
    <>
      <h2>Signup</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Enter a username"
            onChange={handleUsernameChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImgURL">
          {" "}
          {/* added a box to enter your img URL to signup form*/}
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            value={imgURL}
            placeholder="Enter Image URL"
            onChange={handleImgURLChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Button
          role="submit-button"
          id="submit"
          variant="primary"
          type="submit"
          value="Submit"
        >
          Submit
        </Button>
      </Form>

    </>
  );
}
