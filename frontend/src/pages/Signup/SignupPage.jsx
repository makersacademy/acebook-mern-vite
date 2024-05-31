import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail, isStrongPassword } from "validator";
import { signup } from "../../services/authentication";
import "./Signup.css";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isStrongPassword(password)) {
      setError(
        "Password must be 8-12 characters long, with at least one special character,one uppercase and one lower case."
      );
      return;
    }

    try {
      await signup(email, password, username);
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <h2 className="signup">Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          placeholder="username"
          id="username"
          type="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          placeholder="email"
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />

        {error && <p className="error">{error}</p>}
        <hr />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};
