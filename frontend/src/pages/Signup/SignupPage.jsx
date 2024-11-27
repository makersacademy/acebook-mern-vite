import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";

export function SignupPage() {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signup(name, birthday, email, username, password);
      navigate("/login");
    } catch (err) {
      console.error(err);
      const errorMessage = err.message;

      if (errorMessage === "username") {
        alert("pleaser enter a different username, already taken!");
      } else {
        if (errorMessage === "email") {
          alert("there is already an account with that email, please login");
        }
      }
      navigate("/signup");
    }
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleBirthdayChange(event) {
    setBirthday(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  const date18YearsAgo = new Date();
  date18YearsAgo.setFullYear(date18YearsAgo.getFullYear() - 18);
  const formattedDate = `${date18YearsAgo.getFullYear()}-${
    date18YearsAgo.getMonth() + 1
  }-${date18YearsAgo.getDate()}`;

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
        ></input>
        <label htmlFor="birthday">Birthday:</label>
        <input
          id="birthday"
          type="date"
          value={birthday}
          max={formattedDate}
          onChange={handleBirthdayChange}
        ></input>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
}
