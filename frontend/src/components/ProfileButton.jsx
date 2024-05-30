import { useNavigate } from "react-router-dom";
const ProfileButton = () => {
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/profile");
  };
  return (
    <div>
      <button className="profile" onClick={handleProfile}>
        My Profile
      </button>
    </div>
  );
};
export default ProfileButton;
