
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../services/users";

export const ProfileUpdate = ({profile}) => {
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState(profile.password);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [bio, setBio] = useState(profile.bio);
//   const navigate = useNavigate();
console.log(profile)
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUserProfile(email, password, firstName, lastName, bio, profile._id);
    //   console.log("redirecting...:");
    //   navigate("/login");
    } catch (err) {
      console.error(err);
    //   navigate("/signup");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  return (
    <>
      <h2>Update Profile</h2>
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
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {/* <label htmlFor="firstName">First Name:</label>
        <input
          placeholder="first name"
          id="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
        /> */}
         <label htmlFor="lastName">Last Name:</label>
        <input
          placeholder="last name"
          id="lastName"
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
        />
         <input
          placeholder="bio"
          id="bio"
          type="text"
          value={bio}
          onChange={handleBioChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};

