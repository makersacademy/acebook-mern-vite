import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../Signup/SignupPage.css"
import { NavBar } from "../../components/NavBar";


import { login } from "../../services/authentication";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      navigate("/posts");
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
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
          <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input placeholder="Email"
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <div className="container-body"></div>
        <input placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input className="submit-button" role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <p>Don't have an account? Sign up <a href="/signup"><u>here</u></a>.</p>
      </div>
        </div>
      </body>
    </>
  );
}
