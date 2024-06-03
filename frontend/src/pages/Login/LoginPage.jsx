import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import the CSS file
import { login } from "../../services/authentication";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {token, user_id} = await login(email, password);/////////////////
      console.log(token)
      console.log(user_id)
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user_id);//////////////////////////
      navigate("/posts");
    } catch (err) {
      console.error(err);
      navigate("/login");
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
    <div>
        <div className="login-tile">
        <h2>Login</h2>
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
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input role="submit-button" id="submit" type="submit" value="login" />
        </form>
        </div>
      </div>
    </>
  );
};
