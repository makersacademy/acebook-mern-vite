import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getPosts, updatePost } from "../../services/posts";
// import Post from "../../components/Post";
import CreatePostForm from "../../components/CreatePostForm";
import { getAllUsers } from "../../services/users";
import { getUser } from "../../services/users";
import UserProfile from "../../components/UserProfile";
import { NavbarComponent } from "../../components/NavbarComponent";
import AllPosts from "../../components/AllPosts";

export function FeedPage() {
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  // GET USERS
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getAllUsers(token)
        .then((data) => {
          setUsers(data.users);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

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

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <>
      <NavbarComponent />
      <h2>Posts</h2>
      <CreatePostForm />

      <AllPosts user={user} postFilter="all" />

      <h2>All User Profiles</h2>
      <div>
        {users.map((user, index) => (
          <UserProfile user={user} key={index} />
        ))}
      </div>
      <br />

      <h2>Current User Profile</h2>
      <div>
        <img src={user.imgURL}></img>{" "}
        {/* Displays the img from the imgURL property of current user*/}
        {user && <UserProfile user={user} key={user._id} />}
      </div>
    </>
  );
}
