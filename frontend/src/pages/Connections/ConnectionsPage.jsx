
import { Footer } from "../../components/Footer";
import { ProfileCircle } from "../../components/ProfileCircle";
import { profileImage } from "../../assets/profilePicture.jpg";
import "./ConnectionsPage.css";

export const ConnectionsPage = () => {
  return (
    <div className="connections">
      <h2 className="darkest-text-color">See your connections below...</h2>
      <ProfileCircle profileImage= {profileImage}/>
      <Footer/>
    </div>
  );
};
