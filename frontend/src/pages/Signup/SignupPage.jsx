import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";
import "./SignupPage.css";

export const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userExists, setUserExists] = useState("");

  const navigate = useNavigate();

  const matchPasswords = () => {return password === confirmPassword};

  const checkPasswordComplexity = () => {
    const specialChar = ["!","?","$","%","£"]
    const checkSpecialChar = (char) => {
      return password.includes(char)
    }
    return (specialChar.filter(checkSpecialChar).length !== 0 &&  password.length >=8 && /[A-Z]/.test(password) && /[0-9]/.test(password))
    }

  const handleSubmit = async (event) => {
    // Passwords must match
    if (!matchPasswords() || !checkPasswordComplexity()) {
      event.preventDefault();
      navigate("/signup");
    } else {
      event.preventDefault();
    try {
      await signup(username, email, password);
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
        setUserExists(err.message)
      console.error(err.message);
      navigate("/signup");
    }}
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }
  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        <br></br>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <br></br>
        <label htmlFor="password">Password: </label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br></br>
        <span>
        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input
          placeholder="Confirm Password"
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        /> <p>{!matchPasswords() && "Passwords must match"}</p>
        <p>{!checkPasswordComplexity() && "Password must contain a number, capital letter, be at least 8 characters, and contain one of the following ! ? $ % £"}</p>
        </span>
        <br></br>
        <input role="submit-button" id="submit" type="submit" value="Submit"/>
        <p>{userExists}</p>
      </form>
    </>
  );
};
