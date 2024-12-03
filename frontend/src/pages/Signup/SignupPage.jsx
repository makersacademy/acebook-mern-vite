import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./SignupPage.css"

import { signup } from "../../services/authentication";

export function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [image, setImage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signup(firstName, lastName, email, password);
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }

    // const formData = new FormData()
    // formData.append("firstName", firstName)
    // formData.append("lastName", lastName)
    // formData.append("email", email)
    // formData.append("password", password)
    // formData.append("image", image)
  }

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  // function handleImageChange(event) {
  //   const file = event.target.files[0]
  //   // console.log(file)
  //   if(file) {
  //   setImage(event.target.files[0]);
  //   }
  

  return (
    <>
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First name:</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <label htmlFor="lastName">Last name:</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
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
        {/* <label htmlFor="image">Profile Image:</label>
        <input
          placeholder="Image"
          id="image"
          type="file"
          // value={image ? image.name : ""}
          onChange={handleImageChange}
        /> */}
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      </div>
    </>
  );
}
