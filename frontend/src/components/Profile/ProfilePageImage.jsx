// import { useNavigate } from "react-router-dom";
// import { ProfileEditButton } from "./ProfileEditButton";


export const ProfilePageImage = (props) => {
  // const navigate = useNavigate()
  // const navigateToEditProfile = (event) => {
  //   event.preventDefault()
  //   navigate("/editprofile")
  // };

    return (
            <img
              className="image-circle-smaller p-2 mt-5 border border-1 custom-border-profile-pic"
              src={props.profileImage}
              alt="profile picture"
              aria-label="circular picture of profile picture"
            />

        )
  };
  

 


  
  