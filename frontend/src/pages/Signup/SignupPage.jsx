import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";
import {passwordValidator} from "../../../../api/utils/passwordValidator";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      passwordValidator(password)
    } catch (err) {
      alert(err)
    }

    try {
      await signup(fullname, email, password);
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div id="fullname">
          <label htmlFor="fullname">Full Name:</label>
          <input
            id="fullname"
            type="text"
            value={fullname}
            onChange={handleFullNameChange}
          />
        </div>
        <div id="email">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div id="password">
          <label htmlFor="password">Password:</label>
          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <p className= "password-requirements" id="length">Must be 8+ characters </p>
          <p className= "password-requirements" id="case">Must contain upper and lowercase</p>
          <p className= "password-requirements" id="number">Must contain at least one number</p>
        </div>
        <div id="submit">
          <input role="submit-button" id="submit" type="submit" value="Submit" />
          </div>
      </form>
    </>
  );
};
