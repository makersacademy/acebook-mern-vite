import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css"

import { signup } from "../../services/authentication";

export const SignupPage = () => {
  document.title = "Sign Up"
  const [profile_pic, setProfilePic] = useState("");
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await signup(profile_pic, full_name, email, password);
  //     console.log("redirecting...:");
  //     navigate("/login");
  //   } catch (err) {
  //     console.error(err);
  //     navigate("/signup");
  //   }
  // };


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("profile_pic", profile_pic);
      formData.append("full_name", full_name);
      formData.append("email", email);
      formData.append("password", password);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      // Send the form data to the server using fetch or any HTTP library
      const response = await fetch(`${BACKEND_URL}/users`, {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        console.log("redirecting...:");
        navigate("/login");
      } else {
        console.error("Server error:", response.statusText);
        navigate("/signup");
      }
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    setProfilePic(file);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="sign-up">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        
        <div>
      <label htmlFor="profile_pic">Profile Pic:</label>
      <input
          id="profile_pic"
          type="file"
          onChange={handleProfilePicChange}
          />
        </div>

        <div>
      <label htmlFor="full_name">Full name:</label>
        <input
          id="full_name"
          type="text"
          value={full_name}
          onChange={handleFullNameChange}
        />
        </div>

        <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        </div>

        <div>
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        </div>

        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};
