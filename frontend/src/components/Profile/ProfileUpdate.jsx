
import { useState } from "react";
import { updateUserProfile } from "../../services/users";

export const ProfileUpdate = ({profile}) => {
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState(profile.password);
  const [fullName, setFullName] = useState(profile.fullName);
  const [bio, setBio] = useState(profile.bio);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUserProfile(email, password, fullName, bio, profile._id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  return (
    // should split this into separate forms
    // to be able to change just the info wanted to change,
    // not only all of them at the same time
    <>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          placeholder="Email"
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
        <label htmlFor="fullName">Last Name:</label>
        <input
          placeholder="Full Name"
          id="fullName"
          type="text"
          value={fullName}
          onChange={handleFullNameChange}
        />
        <input
          placeholder="Say something about you!"
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

