import { useState, useEffect } from "react";
import { fetchProfileData } from "../../services/profileService";
import { User } from "./UserProfile";
import { ProfilePageImage } from "./ProfilePageImage";
import profileImage from "../../assets/easterProfilePic.png"; // this is the image for the profile picture
import { ProfileEditButton } from "../../components/Profile/ProfileEditButton";

export const ProfileInfo = () => {


  const [profileData, setProfileData] = useState([]); // Set state to store the profile data

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfileData(token)
        .then((data) => {
          setProfileData(data.users);
          localStorage.setItem("token", data.token);
        })
        // const fetchProfile = async (token) => {
        //   try {
        //     const data = await fetchProfileData(token); // Fetch profile data from backend API
        // setProfileData(data.users); // Update the state with fetched data
        .catch((error) => {
          console.error("Error fetching profile data:", error); // tell the user if there's an issue.
        }); // Call fetchProfile function when component mounts
    }
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-start">
        <div className="col-4">
          <ProfilePageImage profileImage={profileImage} />
        </div>
        <div className="col-8 mt-5 d-flex  ">
            {profileData.map((user) => (
              <User user={user} key={user._id} />
            ))}
          </div>
          



          </div>

          <div className="row justify-content-start pt-4">
            <div className="col-4">
              <ProfileEditButton />
            </div>
          </div>
        </div>
      
  );
};


// className="feed" role="feed"
// justify-contents-center
// align-items-center