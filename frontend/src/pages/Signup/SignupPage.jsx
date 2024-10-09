import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";


export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signup(email, password, username, firstName, lastName, gender, birthday);
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

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleGenderChange(event) {
    setGender(event.target.value);
  }

  function handleBirthdayChange(event) {
    setBirthday(event.target.value);
  }

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        {/* email */}
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />

        {/* password */}
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        {/* username */}
        <label htmlFor="username">Username:</label>
        <input
          placeholder="Username"
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />

        {/* first name */}
        <label htmlFor="firstName">First name:</label>
        <input
          placeholder="First Name"
          id="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
        />

         {/* last name */}
         <label htmlFor="lastName">Last name:</label>
        <input
          placeholder="Last name"
          id="lastName"
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
        />

         {/* gender */}
         <label htmlFor="gender">Gender:</label>
        <input
          placeholder="Gender"
          id="gender"
          type="text"
          value={gender}
          onChange={handleGenderChange}
        />

         {/* birthday */}
         <label htmlFor="birthday">Birthday:</label>
        <input
          placeholder="Birthday"
          id="birthday"
          type="text"
          value={birthday}
          onChange={handleBirthdayChange}
        />

        {/* submitting the form */}
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
}
