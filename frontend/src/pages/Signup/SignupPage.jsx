import { useState } from "react";
import { useNavigate } from "react-router-dom";


import "./../CSS.css"
import { NavBar } from "../../components/NavBar";

import axios from "axios";


import { signup } from "../../services/authentication";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isUnique, setIsUnique] = useState(true);
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
    // setUsername(event.target.value); // Comment out this line when reimplementing the username checking
    const enteredUsername = event.target.value
    setUsername(enteredUsername);
    if(enteredUsername.trim() === "") {
      setIsUnique(true); // reset if the field is empty
      return;
    }

    try {
      // Query the backend to check if the username is unique
      const response = await axios.get(`${BACKEND_URL}/users/checkusername`, {
        params: {username: enteredUsername }
      });

      if (response.data.unique) {
        setIsUnique(true);
        console.log("Username is unique.");
      } else{
        setIsUnique(false);
        alert("Username is already taken. Please choose another.");
      }
    } catch (error) {
      console.error("Error checking username:", error);
      alert("An error occurred while checking the username.");
    }
  }
  

  return (
    <>
    <NavBar />
    <body className="grid-container-1">
      {/* <div className="inner-container"> */}
      <div className="grid-container-2">
        <img className="login-photo" src="./public/joseph-pearson-Uj749Jv6Otw-unsplash.jpg"></img>
      </div>
      <div className="grid-container-3">
      {/* <img style={{width: "100px"}} src="../src/assets/placeholder_logo.png"></img> */}
        <div className="card">
          <h2>Sign Up</h2>
      <form className="form" onSubmit={handleSubmit}>
        
        <input
        placeholder="First Name"
          id="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
        />

          <input
          placeholder="Last Name"
            id="lastName"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
          />

          <input
            placeholder="Username"
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />

          <input
          placeholder="Email"
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />

          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />


      
        <input 
           className="submit-button" 
            role="submit-button" 
            id="submit" 
            type="submit" 
            value="Submit" 
            disabled={!isUnique} />

          <br></br>

      </form>
      <p>Already have an account? Log in <a href="/login"><u>here</u></a>.</p>
      </div>
        </div>
      </body>
    </>
  );
}
