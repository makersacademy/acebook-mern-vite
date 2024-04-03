import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"
import { login } from "../../services/authentication";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      navigate("/posts");
    } catch (err) {
      if (err.message === "Email not registered, please sign up.") {
        setErrorMessage(<p>
          Email not registered, please{" "}
          <a href="/signup" style={{ color: "blue" }}>
            sign up
          </a>
          .
        </p>)
      } else if (err.message === "Incorrect password. Please try again.") {
        setErrorMessage("Incorrect password. Please try again.");
      } else {
      console.log('TEST CASE:');
      console.log(setErrorMessage);
      console.error(err);
      navigate("/login");
      console.log(err);
    }}
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword); // Toggle the state
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          className="forms"
          id="email"
          type="text"
          placeholder="Email"
          // required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          value={email}
          onChange={handleEmailChange}
          />
        <label htmlFor="password">Password:</label>
        <input
          className="forms"
          id="password"
          type={showPassword ? "text" : "password"} // Conditionally set input type
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
          <button type="button" onClick={handleTogglePassword}>
          {showPassword ? "Hide Password" : "Show Password"}
        </button>
        <input role="submit-button" id="submit" type="submit" value="Log in" />

        {errorMessage && <p> {errorMessage} </p>}

        </form>
    </>
  );
};
