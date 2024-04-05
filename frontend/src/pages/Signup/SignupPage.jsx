import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";
import '../../css/LoginPageBackground.css'
import { Link } from "react-router-dom";
import UploadWidget from "../../components/Post/UploadWidget";
import { Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME

export const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageField, setImageField] = useState("")
  const [error, setError] = useState([])
  const cld = new Cloudinary({cloud: {cloudName: CLOUD_NAME}});
  const [imagePreview, setImagePreview] = useState('')


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
    setImagePreview(cld.image(imageLocation));
}


  return (
    <div className="container-fluid p-0 neon-background">
      <div className="row m-0">
        <div className="col-md-12 p-0">
          <div className="neon-background d-flex align-items-center justify-content-center vh-200 vw-100">
            <div className="container">
              <div className="row justify-content-center">
              <div className="row justify-content-center"><img src="../../src/assets/Neonbook_logo.png" alt="Logo" style={{ display: 'flex', maxWidth: '20%', height: 'auto' }} /></div>
                <div className="col-md-4">
                  <div className="card-body">
                    <h2 className="card-title text-center mb-4">Sign Up</h2>
                    <div></div>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-4">
                        <label htmlFor="email" style={{ marginBottom: '10px',fontWeight: 'bold' }}>Email:</label>
                        <input
                          placeholder="Email"
                          id="email" 
                          className="form-control"
                          type="text"
                          value={email}
                          onChange={handleEmailChange}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label style={{ marginBottom: '10px',fontWeight: 'bold' }} htmlFor="password">Password:</label>
                        <input
                          placeholder="Password"
                          id="password"
                          className="form-control"
                          type="password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label style={{ marginBottom: '10px',fontWeight: 'bold' }} htmlFor="firstName">First Name:</label>
                        <input
                          placeholder="First name"
                          id="firstName"
                          className="form-control"
                          type="text"
                          value={firstName}
                          onChange={handleFirstNameChange}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label style={{ marginBottom: '10px',fontWeight: 'bold' }} htmlFor="lastName">Last Name:</label>
                        <input
                          placeholder="Last name"
                          id="lastName"
                          className="form-control"
                          type="text"
                          value={lastName}
                          onChange={handleLastNameChange}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label style={{ marginBottom: '10px',fontWeight: 'bold' }} htmlFor="bio">Bio:</label>
                        <input
                          placeholder="Add a bio here"
                          id="bio"
                          className="form-control"
                          type="text"
                          value={bio}
                          onChange={handleBioChange}
                        />
                      </div>
                      {imagePreview && <AdvancedImage style={{ height: "150px", width: "150px", objectFit: "cover", borderRadius: '50%'}} cldImg={imagePreview} />}
                      <UploadWidget folder={'profiles'} buttonText = {'Upload a profile pic'} handleImageUpload={handleImageUpload}/>
                      <button style={{ marginLeft: '15px' }} className="btn btn-primary btn-block neon-button mt-3" type="submit">Submit</button>
                    </form>
                    {error.length > 0 && (
                      <div style={{ color: 'white', marginTop: '0.5rem' }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <Link to="/login" className="btn btn-primary signup-button">Already have an account? Log in here.</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};