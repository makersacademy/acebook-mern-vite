import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signup } from "../../services/authentication";

import homepagePhoto from "../../assets/friends.png"


export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(email, password);
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
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
        <div className="col-5">
          <img
            className="image-circle pt-5"
            src={homepagePhoto}
            alt="people on a log eating watermelon"
            aria-label="picture of people on a log eating watermelon"
          />
        </div>
        <div className="col-1"></div>

        <div className="col-6 d-flex align-items-center">
          <form className="p-5 rounded border border-3 custom-border" onSubmit={handleSubmit}>
          <div className="row">
          <h2 className="darkest-text-color text-start">Welcome to Acebook!</h2>
          <div className="lead darkest-text-color text-start pb-2">Enter details below to sign up</div>
          </div>
            <div className="row ">
              <label aria-label="Email:" htmlFor="email" className="form-label col-3 g-3 mb-3">
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
              <label aria-label="Password:" htmlFor="email" className="form-label col-3 g-3 mb-3">
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
              <button role="submit-button" id="submit" type="submit" className="btn custom-button mb-3 col-11 darkest-bg-color">
                Create Account
              </button>
            </div>
            <div className="row justify-content-center">
              <hr />
              <p className="darkest-text-color">Already have an account? Click below to log in!</p>
              <Link to="/login" className="btn custom-button mb-3 col-11 darkest-bg-color lightest-text-color">Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
