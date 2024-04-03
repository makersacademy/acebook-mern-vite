
import { ProfileInfo } from "../../components/Profile/ProfileInfo";
import profileImage from "../../assets/easterProfilePic.png"; // this is the image for the profile picture
import { ProfilePageImage } from "../../components/Profile/ProfilePageImage";


import "./ProfilePage.css";


export const ProfilePage = () => {
 
  return (
    <div className="profile">
        {/* want to display the image and info associated with the user */}
        <ProfilePageImage profileImage = {profileImage} />
        {/* create another component that just holds the circular image */}
        <ProfileInfo/>
    </div>
  );
};
