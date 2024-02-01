// frontend/src/pages/Feed/FeedPage.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import Navbar from "../../components/Post/Navbar"; 
import "./FeedPage.css";
import CreateNewPost from "./CreateNewPost";
import { getUser } from "../../services/user";

export const FeedPage = () => {
  document.title = "Posts"
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const id = window.localStorage.getItem("id")

  useEffect(() => {
    if (token) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          setToken(data.token);
          window.localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.err(err);
        });
      getUser(token, id)
        .then((data) => {
            setUser(data.user)
        })
        .catch((error) => {
            console.error(error)
        })
    } else {
      navigate("/login");
    }
  }, [token, navigate, posts]); //Needed if useEffect is used anywhere else

  //<img src={user.profile_pic} alt="" />

  if (!token) {
    return;
  }

  return (
    <>
      <Navbar />
      <p>{user.full_name}</p>
      <img src={user.profile_pic} alt="" className="profile-pic"/>
      <div className="allposts">
      <br></br>
      <br></br>
      <CreateNewPost token={token}/>
      <br></br>
      <h2>Posts</h2>
      <div className="feed" role="feed">
      {[...posts].reverse().map((post) => (
          <Post post={post} key={post._id} token={token} />
        ))}
          </div>
        </div>
    </>
  );
};
