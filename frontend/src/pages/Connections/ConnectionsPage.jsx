
import { Footer } from "../../components/Footer";
import profileImage from "../../assets/easterProfilePic.png"; // this is the image for the profile picture
import { ProfileCircle } from "../../components/ProfileCircle";
import { Connection } from "../../components/Connection";
import "./ConnectionsPage.css";

export const ConnectionsPage = () => {
  return (
    <div className="connections">
      <ProfileCircle profileImage= {profileImage}/>
      <Connection/>
      <Footer/>
    </div>
  );
};