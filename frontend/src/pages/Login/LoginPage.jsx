import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css'
import { FaUser, FaLock } from "react-icons/fa";



import { login } from "../../services/authentication";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await login(email, password);
      window.localStorage.setItem("token", token);
      navigate("/posts");
    } catch (err) {
      setLoginError(err.message)
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
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" 
          placeholder="Email" 
          required
          value={email}
          onChange={handleEmailChange} />
          <FaUser className="icon" />

        </div>
        <div className="input-box">
          <input type="password" 
          placeholder="Password" 
          required
          value={password}
          onChange={handlePasswordChange} />
          <FaLock className="icon" />
        </div>
        <input role="submit-button" id="submit" type="submit" value="Submit" />
        <p>{loginError}</p>
      </form>
    </div>
    /*<>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <br></br>
        <input
          id="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <br></br>
        <label htmlFor="password"></label>
        <br></br>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br></br>
        <input role="submit-button" id="submit" type="submit" value="Submit" />
        <p>{loginError}</p>
      </form>
    </>*/
  );
};
