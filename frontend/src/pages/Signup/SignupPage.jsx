import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";
import UploadWidget from "../../components/Post/UploadWidget";

export const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageField, setImageField] = useState("")
  const [error, setError] = useState([])

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    try {

      setError([]);

      await signup(firstName, lastName, bio, email, password, imageField);

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

  const handleImageUpload = (imageLocation) => {
    console.log('IM IN HANDLE IMAGE UPLOAD')
    setImageField(imageLocation)
}

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
        <UploadWidget folder={'profiles'} buttonText = {'Upload a profile pic'} handleImageUpload={handleImageUpload}/>
        <input role="submit-button" id="submit" type="submit" value="Submit" />
        
      </form>
      <div>
         <p>{error}</p>
        </div>
      {/* {error.length > 0 && <ErrorMessage errMsg={error} />} */}
    </>
  );
};