import 'react-datepicker/dist/react-datepicker.css';
import { ProfileInfo } from "../../components/Profile/ProfileInfo";
import profileImage from "../../assets/easterProfilePic.png"; // this is the image for the profile picture
import { ProfilePageImage } from "../../components/Profile/ProfilePageImage";
import { ProfilePosts } from "../../components/Profile/ProfilePosts";
import "./ProfilePage.css";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      console.log("Redirected to login, no token found")}
    })
 
  return (
    <div className="profile">
        {/* want to display the image and info associated with the user */}
        <ProfilePageImage profileImage = {profileImage} />
        {/* create another component that just holds the circular image */}
        
        <ProfileInfo/> 
        <ProfilePosts/>
        </div>)};