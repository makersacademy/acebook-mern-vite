import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

import { signup } from "../../services/authentication";

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  // const [isUnique, setIsUnique] = useState(true)
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signup(firstName, lastName, username, email, password);
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
  }

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleUsernameChange(event) {
    setUsername(event.target.value); // Comment out this line when reimplementing the username checking
    // const enteredUsername = event.target.value
    // setUsername(enteredUsername);
    // if(enteredUsername.trim() === "") {
    //   setIsUnique(true); // reset if the field is empty
    //   return;
    // }

    // try {
    //   // Query the backend to check if the username is unique
    //   const response = await axios.get(`${BACKEND_URL}/checkUsername`, {
    //     params: {username: enteredUsername }
    //   });

    //   if (response.data.unique) {
    //     setIsUnique(true);
    //     console.log("Username is unique.");
    //   } else{
    //     setIsUnique(false);
    //     alert("Username is already taken. Please choose another.");
    //   }
    // } catch (error) {
    //   console.error("Error checking username:", error);
    //   alert("An error occurred while checking the username.");
    // }
  }
  

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First name:</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      <br></br>
      <label htmlFor="lastName">Last name:</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
          />
      <br></br>
      <label htmlFor="username">Username</label>
          <input
            placeholder="username"
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
      <br></br>
        <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        <br></br>
        <label htmlFor="password">Password:</label>
          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br></br>

        <input 
        role="submit-button" 
        id="submit" 
        type="submit" 
        value="Submit" 
        // disabled={!isUnique} 
        />
      </form>
    </>
  );
}
