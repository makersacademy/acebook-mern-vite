import { useNavigate } from "react-router-dom";

export const ProfileEditButton = () => {
  const navigate = useNavigate();
  const navigateToEditProfile = (event) => {
    event.preventDefault();
    navigate("/editprofile");
  };

  return (
    <button id="editProfileButton" className="btn edit-button" onClick={navigateToEditProfile}>
      Edit profile
    </button>
  );
};


// className="btn custom-button mb-3 col-11 darkest-bg-color lightest-text-color"