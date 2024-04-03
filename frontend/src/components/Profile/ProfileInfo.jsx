import { useState, useEffect } from 'react';
import { fetchProfileData } from "../../services/profileService";


// imports the fetch request from services...


// the props ProfileInfo receives are the profile picture, email, age etc.
export const ProfileInfo = () => {

    // how can i give the service the id of the user?

    const [profileData, setProfileData] = useState([]); // Set state to store the profile data

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProfile = async (token) => {
      try {
        const data = await fetchProfileData(token); // Fetch profile data from backend API
        setProfileData(data.users); // Update the state with fetched data
      } catch (error) {
        console.error('Error fetching profile data:', error); // tell the user if there's an issue.
      }
    };

    fetchProfile(token); // Call fetchProfile function when component mounts
  }, []);




  // useEffect(() => {
  //   // const token = localStorage.getItem("token");
  //   if (token) {
  //     getPosts(token)
  //       .then((data) => {
  //         setPosts(data.posts);
  //         localStorage.setItem("token", data.token);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         navigate("/login");
  //       });
  //       // extra logic so that if the user does not have a token they will be redirected to the login endpoint
  //       if (!token) {
  //         navigate("/login");
  //         return;
  //       }
  //   }
  // }, [navigate]);








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

          { profileData.users.map((user) => (
            <ProfileInfo user={user} key={user._id} />))  };


            <h2 className="fw-light">
                {/* {profileData.username} */} what is going on?
            </h2>
            <p>{profileData}</p>
            {/* <p>{profileData.surname}</p>
            <p>{profileData.dob}</p>
            <p>{profileData.description}</p>
            <p>{profileData.location}</p> */}
        </div>
        </div>
    </div>
    );
};

 <div className="feed" role="feed">
        {profileData.users.map((user) => (
          <Post post={post} key={post._id} />
        ))} 