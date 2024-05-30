import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail, isStrongPassword } from "validator";
import { signup } from "../../services/authentication";


export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

  if (!isStrongPassword(password)) {
      setError("Password must be 8-12 characters long, with at least one special character,one uppercase and one lower case.");
      return;
    }

    try {
       
      await signup(email, password);
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

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {error && <p className="error">{error}</p>}
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};