import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authentication";

import { notEmpty } from "../../../../api/utils/fieldValidator";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fields = [email, password]

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      fields.forEach(field => {
        notEmpty(field);
      })
    } catch (err) {
      alert(err)
    }

    try {
      const data = await login(email, password);
      const token = data.token;
      const user_id = data.id;
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user_id);
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
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};
