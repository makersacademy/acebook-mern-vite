import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/users";
import UserProfile from "../../components/UserProfile";
import { NavbarComponent } from "../../components/NavbarComponent";
import ProfilePost from "../../components/ProfilePosts";
import { getPosts } from "../../services/posts";
import { UploadProfilePic } from "../../components/uploadProfilePicture";


export function Profile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  // GET USER
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getUser(token)
        .then((data) => {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user)); // add all user data to local storage !! INCLUDES PASSWORD !!
          localStorage.setItem("username", data.user.username); // adds username to local storage
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  // GET POSTS
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate, posts]); // added posts argument to re-render page upon post

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  const currentuser = localStorage.getItem("username");

  const filteredPosts = posts.filter((post) => post.user === currentuser);

  return (
    <>

      <NavbarComponent />
      <h2>My Profile</h2>
      <img src={user.imgURL}></img>
      <UploadProfilePic></UploadProfilePic>
      <div>{user && <UserProfile user={user} key={user._id} />}</div>
      <div className="feed" role="feed">
        <h2>Posts you have submitted: </h2>
        {filteredPosts.map((post) => (
          <ProfilePost key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
