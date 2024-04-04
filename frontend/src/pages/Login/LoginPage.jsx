import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../../services/authentication";

import homepagePhoto from "../../assets/friends.png"
import { Footer } from "../../components/Footer";


export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-5 d-none d-lg-block">
          <img
            className="image-circle pt-5 "
            src={homepagePhoto}
            alt="people on a log eating watermelon"
            aria-label="picture of people on a log eating watermelon"
          />
        </div>
        <div className="col-1 d-none d-lg-block"></div>

        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <form className="p-5 rounded border border-3 custom-border" onSubmit={handleSubmit}>
          <div className="row">
          <h2 className="darkest-text-color text-start">Welcome to Acebook!</h2>
          <div className="lead darkest-text-color text-start pb-2">Enter details below to log in</div>
          </div>
            <div className="row ">
              <label htmlFor="email" className="form-label col-3 g-3 mb-3">
                Email
              </label>
              <div className="col-9">
                <input
                  type="email"
                  className="form-control "
                  id="email"
                  placeholder="whoever@wherever.com"
                  onChange={handleEmailChange}
                  value={email}
                ></input>
              </div>
            </div>
            <div className="row">
              <label htmlFor="email" className="form-label col-3 g-3 mb-3">
                Password
              </label>
              <div className="col-9">
                <input
                  type="password"
                  className="form-control "
                  id="password"
                  placeholder="yourpassword"
                  value={password}
                  onChange={handlePasswordChange}
                ></input>
              </div>
            </div>
            <div className="row justify-content-center">
              <button type="submit" className="btn custom-button mb-3 col-5 darkest-bg-color">
                Login
              </button>
              <div className="col-1"></div>
              <button type="submit" className="btn custom-button mb-3 col-5 darkest-bg-color">
                Forgot password
              </button>
            </div>
            <div className="row justify-content-center">
              <hr />
            <p className="darkest-text-color">New to Acebook? Click below to create an account!</p>
              <Link to="/signup" className="btn custom-button mb-3 col-11 darkest-bg-color lightest-text-color">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
