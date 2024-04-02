import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updateUser } from "../../services/authentication";
import homepagePhoto from "../../assets/friends.png"

export const CreateProfilePage = () => {
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser(token, forename, surname, username, dob, description, location)
      localStorage.setItem("token", token); // handing the user a new token
      console.log("updated");
      navigate('/posts')
   
    } catch (err) {
      console.error(err);
    }
  };

  const handleForenameChange = (event) => {
    setForename(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleDobChange = (event) => {
    setDob(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-5">
          <img
            className="image-circle pt-5"
            src={homepagePhoto}
            alt="people on a log eating watermelon"
            aria-label="picture of people on a log eating watermelon"
          />
        </div>
        <div className="col-1"></div>
        <div className="col-6 d-flex align-items-center">
          <form className="p-5 rounded border border-3 custom-border" onSubmit={handleSubmit}>
            <div className="row">
                <h2 className="darkest-text-color text-start">Edit Profile</h2>
                    <div className="lead darkest-text-color text-start pb-2">Enter profile details</div>
            </div>
            <div className="row">
              <label aria-label="forename:" htmlFor="forename" className="form-label col-3 g-3 mb-3">
                Forename
              </label>
                <div className="col-9">
                    <input
                        type="forename"
                        className="form-control "
                        id="forename"
                        placeholder="John"
                        onChange={handleForenameChange}
                        value={forename}
                    ></input>
                </div>
            </div>
            <div className="row">
              <label aria-label="surname:" htmlFor="surname" className="form-label col-3 g-3 mb-3">
                Surname
              </label>
              <div className="col-9">
                <input
                  type="surname"
                  className="form-control "
                  id="surname"
                  placeholder="Doe"
                  value={surname}
                  onChange={handleSurnameChange}
                ></input>
              </div>
            </div>
            <div className="row ">
              <label aria-label="username:" htmlFor="username" className="form-label col-3 g-3 mb-3">
                Username
              </label>
              <div className="col-9">
                <input
                  type="username"
                  className="form-control "
                  id="username"
                  placeholder="JoDoe"
                  onChange={handleUsernameChange}
                  value={username}
                ></input>
              </div>
            </div>
            <div className="row">
              <label aria-label="dob:" htmlFor="dob" className="form-label col-3 g-3 mb-3">
                DOB
              </label>
              <div className="col-9">
                <input
                  type="dob"
                  className="form-control "
                  id="dob"
                  placeholder="7th April 2000"
                  value={dob}
                  onChange={handleDobChange}
                ></input>
              </div>
            </div>          
            <div className="row ">
              <label aria-label="description:" htmlFor="description" className="form-label col-3 g-3 mb-3">
                Description
              </label>
              <div className="col-9">
                <input
                  type="description"
                  className="form-control "
                  id="description"
                  placeholder="description here"
                  onChange={handleDescriptionChange}
                  value={description}
                ></input>
              </div>
            </div>
            <div className="row">
              <label aria-label="location:" htmlFor="location" className="form-label col-3 g-3 mb-3">
                Location
              </label>
              <div className="col-9">
                <input
                  type="location"
                  className="form-control "
                  id="location"
                  placeholder="Peak District"
                  value={location}
                  onChange={handleLocationChange}
                ></input>
              </div>
            </div>
            <div className="row justify-content-center">
              <button role="submit-button" id="submit" type="submit" className="btn custom-button mb-3 col-11 darkest-bg-color">
                Update Profile
              </button>
            </div>
            <div className="row justify-content-center">
              <hr />
              <p className="darkest-text-color">Already have an profile? Click to view!</p>
              <Link to="/profiles" className="btn custom-button mb-3 col-11 darkest-bg-color lightest-text-color">Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
