import { useState, useEffect } from 'react';
import { fetchProfileData } from "../../services/profileService";
import { User } from "./UserProfile"


// imports the fetch request from services...


// the props ProfileInfo receives are the profile picture, email, age etc.
export const ProfileInfo = () => {

    // how can i give the service the id of the user?

    const [profileData, setProfileData] = useState([]); // Set state to store the profile data

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token){fetchProfileData(token)
    .then((data) => {
  setProfileData(data.users);
  localStorage.setItem("token", data.token);
})
    // const fetchProfile = async (token) => {
    //   try {
    //     const data = await fetchProfileData(token); // Fetch profile data from backend API
        // setProfileData(data.users); // Update the state with fetched data
.catch((error) => {
        console.error('Error fetching profile data:', error); // tell the user if there's an issue.
      }
    ) // Call fetchProfile function when component mounts
  }}, []);

    return (
    <div className="container">
        <div className="row justify-content-start">
        <div className="col-4">

       
            {/* <img
            className="image-circle-smaller mt-5"
            src={profileData.image}
            alt="profile picture"
            aria-label="circular picture of profile picture"
            /> */}
        </div>
        <div className="col-8 mt-5 d-flex align-items-center justify-contents-center">
        <div className="feed" role="feed">
        {profileData.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
       
       
       <li>
        {/* key={user.id} */}
               {/* <p>Username: {Object.values(profileData[0])[0]}</p>
                 <p>Location: {Object.values(profileData[0])[7]}</p>
                  <p>Description: {Object.values(profileData[0])[6]}</p> */}
               </li>

          {/* { profileData[0])[0]};  */}
          {/* this get's to a specific array item */}


            {/* <h2 className="fw-light">
                {profileData.username} what is going on?
            </h2> */}
            {/* <p>{profileData.username}</p> */}
            {/* <p>{profileData.surname}</p>
            <p>{profileData.dob}</p>
            <p>{profileData.description}</p>
            <p>{profileData.location}</p> */}
        </div>
        </div>
    </div>
    );
};

// <ul>
//             {profileData.users.map((user) => {
//               return (
//                 <li key={user.id}>
//                   <p>Username: {user.username}</p>
//                   <p>Location: {user.location}</p>
//                   <p>Description: {user.description}</p>
//                 </li>
//               );
//             })}
//           </ul>