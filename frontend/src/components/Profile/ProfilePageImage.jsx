import { useNavigate } from "react-router-dom";



export const ProfilePageImage = (props) => {
  const navigate = useNavigate()
  const navigateToEditProfile = (event) => {
    event.preventDefault()
    navigate("/editprofile")
  };

    return (
      <div className="container">
        <div className="row justify-content-start">
          <div className="col-4">
            <img
              className="image-circle-smaller mt-5"
              src={props.profileImage}
              alt="profile picture"
              aria-label="circular picture of profile picture"
            />
            <div className="row justify-content-center">
              <div className="col-4 pt-3">
                <button id="editProfileButton" onClick={navigateToEditProfile}>Edit profile</button>
              </div>
            </div>
            </div>
          </div>
        </div>
        
        )
  };
  

 

 