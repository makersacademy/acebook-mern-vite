
import { useState } from "react";
import { updateUserProfile } from "../../services/users";

export const ProfileUpdate = ({profile}) => {
  const [email, setEmail] = useState(profile.email);
  const [fullName, setFullName] = useState(profile.fullName);
  const [bio, setBio] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedProfile = await updateUserProfile(token, email, fullName, bio, profile._id);
      console.log("updatedProfile", updatedProfile)
      setEmail(updatedProfile.email);
      setFullName(updatedProfile.fullName);
      setBio(updatedProfile.bio);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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
      <h3>Update Profile</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          placeholder="Email"
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        /><br/>
        <label htmlFor="fullName">Full Name:</label>
        <input
          placeholder="Full Name"
          id="fullName"
          type="text"
          value={fullName}
          onChange={handleFullNameChange}
        /><br/>
        <label htmlFor="bio">Bio:</label>
        <textarea
          placeholder="Say something about you!"
          id="bio"
          type="text"
          value={bio}
          onChange={handleBioChange}
        /><br/>
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};

