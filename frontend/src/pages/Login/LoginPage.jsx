import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { login } from "../../services/authentication";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_id", data.user_id); // Attaching user_id via authentication controller/services
      // const token = await login(email, password);
      // localStorage.setItem("token", token);
      // localStorage.setItem("email", email);  Attaching email as string upon login - probably chage to username eventually
      navigate("/posts");
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <h2 className="m-4 text-center">Login</h2>
    <div className="custom-form rounded shadow">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 px-5" controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 px-5" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            aria-describedby="passwordHelpBlock"
      />

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

      <p className="m-4 text-muted text-center">Dont have an account? <a href='/signup' className="">Sign up</a></p>

      {/*<form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>*/}
    </>
  );
}
