import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";

export const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [profileImg, setProfileImg] = useState(null);
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

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const handleProfileImgChange = (event) => {
  //   setProfileImg(event.target.files[0]);
  // };

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          placeholder="First Name"
          id="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          placeholder="Last Name"
          id="lastName"
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <label htmlFor="email">Password:</label>
        <input
          placeholder="user@email.com"
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <label htmlFor="dob">DOB:</label>
        <input
          placeholder="DD-MM-YYYY"
          id="dob"
          type="text"
          value={dob}
          onChange={handleDobChange}
        />
        <label htmlFor="profileImg">Password:</label>
        <input
          placeholder=""
          id="profileImg"
          type="file"
          value={profileImg}
          onChange={handleProfileImgChange}
        />
        <label htmlFor="pronouns">Pronouns:</label>
        <input
          placeholder="pronouns"
          id="pronouns"
          type="text"
          value={pronouns}
          onChange={handlePronounsChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};
