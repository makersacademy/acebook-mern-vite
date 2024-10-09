import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { signup } from "../../services/authentication";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const passValidator = (string) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const uppercaseRegex = /[A-Z]/;
    return (
      specialCharRegex.test(string) &&
      uppercaseRegex.test(string) &&
      lowercaseRegex.test(string) &&
      numberRegex.test(string)
    );
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.length >= 7 && passValidator(password)) {
      try {
        await signup(email, password, username);
        navigate("/login");
      } catch (err) {
        console.error(err);
        navigate("/signup");
      }
    } else {
      alert("Your password is not valid");
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

  return (
    <>
      <h2 className="m-4 text-center">Signup</h2>
      <div className="custom-form rounded shadow">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 px-5" controlId="signupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Enter a username"
            onChange={handleUsernameChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 px-5" controlId="signupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 px-5" controlId="signupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            />
      <Form.Text id="passwordHelpBlock" muted>
        Your password must be 7 characters or longer, contain a combination of upper and lowercase letters, a special character and number
      </Form.Text>
        </Form.Group>

        <div className="d-flex justify-content-center">
        <Button
          role="submit-button"
          id="submit"
          variant="primary"
          type="submit"
          value="Submit"
        >
          Submit
        </Button>
        </div>

      </Form>
      </div>

      <p className="m-4 text-muted text-center">Already have an account? <a href='/login' className="">Login</a></p>

    </>
  );
}
