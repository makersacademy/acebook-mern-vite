import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";

export const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([])

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    try {

      setError([]);

      await signup(firstName, lastName, bio, email, password);

      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError([err.message])
      
      navigate("/signup");
    }
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

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h2>Signup</h2>
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
        <label htmlFor="firstName">First Name:</label>
        <input
          placeholder="First name"
          id="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          placeholder="Last name"
          id="lastName"
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <label htmlFor="bio">Bio:</label>
        <input
          placeholder="Add a bio here"
          id="bio"
          type="text"
          value={bio}
          onChange={handleBioChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
        
      </form>
      <div>
         <p>{error}</p>
        </div>
      {/* {error.length > 0 && <ErrorMessage errMsg={error} />} */}
    </>
  );
};