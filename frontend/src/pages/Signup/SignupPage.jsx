import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";

export const SignupPage = () => {
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(forename, surname, username, email, password);
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
      <h1>Acebook</h1>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="forename">Forename:</label>
        <input
          id="forename"
          type="text"
          value={forename}
          onChange={(event) => setForename(event.target.value)}
        />
        <br />
        <label htmlFor="surname">Surname:</label>
        <input
          id="surname"
          type="text"
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
        />
        <br />
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
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
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <div>
        <a href="/login">Already have an account? Log in here</a>
      </div>
    </>
  );
};
