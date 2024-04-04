import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"
import { login } from "../../services/authentication";
import socialmedia1 from "../../static/img/socialmedia1.jpg";
import socialmedia2 from "../../static/img/socialmedia2.jpg";


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
<section>
  <div className="imgBox">
    <img src={socialmedia1} />
    <div className="text-overlay">
        <h1>Welcome to Acebook</h1>
        <p>Connect, Share, Acebook!</p>
    </div>
  </div>

  <div className='contentBox'>
    <div className="formBox">
    <h2>Login</h2>

      {/* <div className="inputBox"> */}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="input-text" htmlFor="email">Email:</label>
          </div>
            <input
              className="inputBox"
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
        </form>
      {/* </div> */}

      {/* <div className="inputBox"> */}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="input-text" htmlFor="password">Password:</label>
          </div>
            <input
              className="inputBox"
              id="password"
              type={showPassword ? "text" : "password"} // Conditionally set input type
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
        </form>

      {/* </div> */}

      <div className="remember">
        <label><input type = "checkbox" name ="" /> Remember me</label>
      </div>

      <div className="passwordShow">
        <button className="showPassword"type="button" onClick={handleTogglePassword}>
          {showPassword ? "Hide Password" : "Show Password"}
        </button>
      </div>

      
        <form onSubmit={handleSubmit}>
          <input className="inputBox submit" role="submit-button" id="submit" type="submit" value="Log in" />
        </form>
      

      <div className="sign-up">
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>

      <div>
        {errorMessage && <p> {errorMessage} </p>}
      </div>

    </div>

    </div>
        
</section>
    </>

  );
};
