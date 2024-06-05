import Navbar from "../../components/Navbar";
import Bio from "./Bio";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../../services/profile";

const ProfilePage = () => {
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getMyProfile(token)
        .then((data) => {
          console.log("checking data: ", data);
          setUsername(data.profile.author.username);
          setBio(data.profile.bio);

          // console.log("feedpage, data.posts: ", data.posts[0].author.username);

          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.log("error for getMyProfile");
          console.error(err);
          // navigate("/login");
        });
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <h1>Profile page</h1>
      <Bio bio={bio} setBio={setBio} username={username} />
    </div>
  );
};
export default ProfilePage;
