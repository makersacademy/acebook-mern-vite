import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { login } from "../services/authentication";


export const ImageCircle = (props) => {
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
        <div className="col-5">
          <img
            className="image-circle pt-5"
            src={props.image}
            alt="people on a log eating watermelon"
            aria-label="picture of people on a log eating watermelon"
          />
        </div>
        <div className="col-2"></div>

        <div className="col-5 d-flex align-items-center">
          <form className=" p-5 rounded border border-3 border-primary" onSubmit={handleSubmit}>
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
            <div className="row justify-content-between">
              <button type="submit" className="btn btn-primary custom-button mb-3 col-5 darkest-bg-color lightest-text-color">
                Login
              </button>
              <button type="submit" className="btn btn-primary custom-button mb-3 col-5 darkest-bg-color lightest-text-color">
                Forgot password
              </button>
            </div>
            <div className="row">
              <button type="submit" className="btn btn-primary custom-button mb-3 col-12 darkest-bg-color">
              <Link to="/signup" style={{ color: "#c3f2da" }}>Sign Up</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
